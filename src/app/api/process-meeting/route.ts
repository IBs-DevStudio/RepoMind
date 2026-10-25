import { auth } from "@clerk/nextjs/server";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { processMeeting } from "@/lib/assembly";
import { db } from "@/server/db";

// Allow up to 5 minutes on Vercel
export const maxDuration = 300;

const bodyParser = z.object({ meetingId: z.string() });

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { meetingId } = bodyParser.parse(await req.json());

    const meeting = await db.meeting.findUnique({
      where: { id: meetingId },
      select: { id: true, meetingUrl: true, projectId: true },
    });
    if (!meeting) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const member = await db.projectMember.findUnique({
      where: { userId_projectId: { userId, projectId: meeting.projectId } },
    });
    if (!member) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const summaries = await processMeeting(meeting.meetingUrl);

    if (summaries.length > 0) {
      await db.issue.createMany({
        data: summaries.map((s) => ({
          start: s.start,
          end: s.end,
          gist: s.gist,
          headline: s.headline,
          summary: s.summary,
          meetingId,
        })),
      });
    }

    await db.meeting.update({
      where: { id: meetingId },
      data: {
        status: "COMPLETED",
        ...(summaries[0] ? { name: summaries[0].headline } : {}),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}