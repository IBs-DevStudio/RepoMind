import { after } from "next/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { countRepoFiles } from "@/lib/credits";
import { parseGithubUrl, pollCommits } from "@/lib/github";
import { indexRepo } from "@/lib/indexer";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

const lastPoll = new Map<string, number>();
const POLL_COOLDOWN_MS = 5 * 60 * 1000;

export const projectRouter = createTRPCRouter({
  getMyCredits: protectedProcedure.query(async ({ ctx }) => {
    const { _sum } = await ctx.db.creditEntry.aggregate({
      where: { userId: ctx.userId },
      _sum: { delta: true },
    });
    return _sum.delta ?? 0;
  }),

  checkCredits: protectedProcedure
    .input(
      z.object({
        githubUrl: z.string().url(),
        githubToken: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const fileCount = await countRepoFiles(input.githubUrl, input.githubToken);
      const { _sum } = await ctx.db.creditEntry.aggregate({
        where: { userId: ctx.userId },
        _sum: { delta: true },
      });
      return { fileCount, userCredits: _sum.delta ?? 0 };
    }),

  createProject: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        githubUrl: z.string().url(),
        githubToken: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        parseGithubUrl(input.githubUrl);
      } catch {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid GitHub URL" });
      }

      const fileCount = await countRepoFiles(input.githubUrl, input.githubToken);

      const project = await ctx.db.$transaction(async (tx) => {
        const { _sum } = await tx.creditEntry.aggregate({
          where: { userId: ctx.userId },
          _sum: { delta: true },
        });
        const balance = _sum.delta ?? 0;
        if (balance < fileCount) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: `Insufficient credits: this repo costs ${fileCount}, you have ${balance}.`,
          });
        }

        const created = await tx.project.create({
          data: {
            name: input.name,
            githubUrl: input.githubUrl,
            githubToken: input.githubToken || null,
            members: { create: { userId: ctx.userId, role: "OWNER" } },
          },
        });

        if (fileCount > 0) {
          await tx.creditEntry.create({
            data: { userId: ctx.userId, delta: -fileCount, reason: "USAGE" },
          });
        }
        return created;
      });

      after(() => {
        pollCommits(project.id).catch(console.error);
        void indexRepo(project.id);
      });

      return project;
    }),

  getProjects: protectedProcedure.query(({ ctx }) =>
    ctx.db.project.findMany({
      where: {
        deletedAt: null,
        members: { some: { userId: ctx.userId } },
      },
    }),
  ),

  getCommits: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ ctx, input }) => {
      const member = await ctx.db.projectMember.findUnique({
        where: {
          userId_projectId: { userId: ctx.userId, projectId: input.projectId },
        },
      });
      if (!member) throw new TRPCError({ code: "FORBIDDEN" });

      const now = Date.now();
      if (now - (lastPoll.get(input.projectId) ?? 0) > POLL_COOLDOWN_MS) {
        lastPoll.set(input.projectId, now);
        after(() => {
          pollCommits(input.projectId).catch(console.error);
          void indexRepo(input.projectId);
        });
      }

      return ctx.db.commit.findMany({
        where: { projectId: input.projectId },
        orderBy: { commitDate: "desc" },
      });
    }),

  saveAnswer: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        question: z.string(),
        answer: z.string(),
        filesReferences: z.array(
          z.object({ fileName: z.string(), sourceCode: z.string() }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const member = await ctx.db.projectMember.findUnique({
        where: {
          userId_projectId: { userId: ctx.userId, projectId: input.projectId },
        },
      });
      if (!member) throw new TRPCError({ code: "FORBIDDEN" });

      return ctx.db.question.create({
        data: {
          projectId: input.projectId,
          userId: ctx.userId,
          question: input.question,
          answer: input.answer,
          filesReferences: input.filesReferences,
        },
      });
    }),

  getQuestions: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ ctx, input }) => {
      const member = await ctx.db.projectMember.findUnique({
        where: {
          userId_projectId: { userId: ctx.userId, projectId: input.projectId },
        },
      });
      if (!member) throw new TRPCError({ code: "FORBIDDEN" });

      return ctx.db.question.findMany({
        where: { projectId: input.projectId },
        include: { user: { select: { firstName: true, imageUrl: true } } },
        orderBy: { createdAt: "desc" },
      });
    }),

  uploadMeeting: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        meetingUrl: z.string().url(),
        name: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const member = await ctx.db.projectMember.findUnique({
        where: {
          userId_projectId: { userId: ctx.userId, projectId: input.projectId },
        },
      });
      if (!member) throw new TRPCError({ code: "FORBIDDEN" });

      return ctx.db.meeting.create({
        data: {
          meetingUrl: input.meetingUrl,
          projectId: input.projectId,
          name: input.name,
          status: "PROCESSING",
        },
      });
    }),

  getMeetings: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ ctx, input }) => {
      const member = await ctx.db.projectMember.findUnique({
        where: {
          userId_projectId: { userId: ctx.userId, projectId: input.projectId },
        },
      });
      if (!member) throw new TRPCError({ code: "FORBIDDEN" });

      return ctx.db.meeting.findMany({
        where: { projectId: input.projectId },
        include: { issues: true },
        orderBy: { createdAt: "desc" },
      });
    }),

  deleteMeeting: protectedProcedure
    .input(z.object({ meetingId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const meeting = await ctx.db.meeting.findUnique({
        where: { id: input.meetingId },
        select: { projectId: true },
      });
      if (!meeting) throw new TRPCError({ code: "NOT_FOUND" });

      const member = await ctx.db.projectMember.findUnique({
        where: {
          userId_projectId: { userId: ctx.userId, projectId: meeting.projectId },
        },
      });
      if (!member) throw new TRPCError({ code: "FORBIDDEN" });

      return ctx.db.meeting.delete({ where: { id: input.meetingId } });
    }),

  getMeetingById: protectedProcedure
    .input(z.object({ meetingId: z.string() }))
    .query(async ({ ctx, input }) => {
      const meeting = await ctx.db.meeting.findUnique({
        where: { id: input.meetingId },
        include: { issues: true },
      });
      if (!meeting) throw new TRPCError({ code: "NOT_FOUND" });

      const member = await ctx.db.projectMember.findUnique({
        where: {
          userId_projectId: { userId: ctx.userId, projectId: meeting.projectId },
        },
      });
      if (!member) throw new TRPCError({ code: "FORBIDDEN" });

      return meeting;
    }),

  archiveProject: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const member = await ctx.db.projectMember.findUnique({
        where: {
          userId_projectId: { userId: ctx.userId, projectId: input.projectId },
        },
      });
      if (!member) throw new TRPCError({ code: "FORBIDDEN" });
      if (member.role !== "OWNER") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Only the project owner can archive it",
        });
      }

      return ctx.db.project.update({
        where: { id: input.projectId },
        data: { deletedAt: new Date() },
      });
    }),

  getArchivedProjects: protectedProcedure.query(({ ctx }) =>
    ctx.db.project.findMany({
      where: {
        deletedAt: { not: null },
        members: { some: { userId: ctx.userId } },
      },
      orderBy: { updatedAt: "desc" },
    }),
  ),

  restoreProject: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const member = await ctx.db.projectMember.findUnique({
        where: {
          userId_projectId: { userId: ctx.userId, projectId: input.projectId },
        },
      });
      if (!member) throw new TRPCError({ code: "FORBIDDEN" });
      if (member.role !== "OWNER") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Only the project owner can restore it",
        });
      }

      return ctx.db.project.update({
        where: { id: input.projectId },
        data: { deletedAt: null },
      });
    }),

  getProjectDetails: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ ctx, input }) => {
      const member = await ctx.db.projectMember.findUnique({
        where: {
          userId_projectId: { userId: ctx.userId, projectId: input.projectId },
        },
      });
      if (!member) throw new TRPCError({ code: "FORBIDDEN" });

      const project = await ctx.db.project.findUnique({
        where: { id: input.projectId },
        select: {
          id: true,
          name: true,
          githubUrl: true,
          githubToken: true,
          deletedAt: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      if (!project) throw new TRPCError({ code: "NOT_FOUND" });

      return {
        ...project,
        role: member.role,
        hasCustomToken: Boolean(project.githubToken),
      };
    }),

  updateProject: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        name: z.string().min(1).optional(),
        githubToken: z.string().nullable().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const member = await ctx.db.projectMember.findUnique({
        where: {
          userId_projectId: { userId: ctx.userId, projectId: input.projectId },
        },
      });
      if (!member) throw new TRPCError({ code: "FORBIDDEN" });
      if (member.role !== "OWNER") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Only the project owner can update project settings",
        });
      }

      const data: { name?: string; githubToken?: string | null } = {};
      if (input.name !== undefined) data.name = input.name.trim();
      if (input.githubToken !== undefined) {
        data.githubToken =
          input.githubToken && input.githubToken.trim().length > 0
            ? input.githubToken.trim()
            : null;
      }

      return ctx.db.project.update({
        where: { id: input.projectId },
        data,
      });
    }),

  deleteProject: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const member = await ctx.db.projectMember.findUnique({
        where: {
          userId_projectId: { userId: ctx.userId, projectId: input.projectId },
        },
      });
      if (!member) throw new TRPCError({ code: "FORBIDDEN" });
      if (member.role !== "OWNER") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Only the project owner can delete this project",
        });
      }

      return ctx.db.project.delete({
        where: { id: input.projectId },
      });
    }),

  getTeamMembers: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ ctx, input }) => {
      const member = await ctx.db.projectMember.findUnique({
        where: {
          userId_projectId: { userId: ctx.userId, projectId: input.projectId },
        },
      });
      if (!member) throw new TRPCError({ code: "FORBIDDEN" });

      return ctx.db.projectMember.findMany({
        where: { projectId: input.projectId },
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              emailAddress: true,
              imageUrl: true,
            },
          },
        },
        orderBy: { role: "asc" },
      });
    }),

  removeTeamMember: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        memberUserId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const currentMember = await ctx.db.projectMember.findUnique({
        where: {
          userId_projectId: { userId: ctx.userId, projectId: input.projectId },
        },
      });
      if (!currentMember || currentMember.role !== "OWNER") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Only the project owner can remove team members",
        });
      }
      if (input.memberUserId === ctx.userId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You cannot remove yourself as owner",
        });
      }

      return ctx.db.projectMember.delete({
        where: {
          userId_projectId: {
            userId: input.memberUserId,
            projectId: input.projectId,
          },
        },
      });
    }),
});