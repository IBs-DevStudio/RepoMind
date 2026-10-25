import { after } from "next/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { parseGithubUrl, pollCommits } from "@/lib/github";
import { indexRepo } from "@/lib/indexer";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const projectRouter = createTRPCRouter({
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

      const project = await ctx.db.project.create({
        data: {
          name: input.name,
          githubUrl: input.githubUrl,
          members: { create: { userId: ctx.userId, role: "OWNER" } },
        },
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

      after(() => {
        pollCommits(input.projectId).catch(console.error);
        void indexRepo(input.projectId);
      });

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
});