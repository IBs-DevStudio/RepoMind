"use client";

import { VideoIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { api, type RouterOutputs } from "@/trpc/react";

type Issue = NonNullable<RouterOutputs["project"]["getMeetingById"]>["issues"][number];

export default function IssuesList({ meetingId }: { meetingId: string }) {
  const { data: meeting, isLoading } = api.project.getMeetingById.useQuery(
    { meetingId },
    { refetchInterval: 4000 },
  );

  if (isLoading || !meeting) {
    return <p className="text-muted-foreground p-8 text-sm">Loading...</p>;
  }

  return (
    <div className="p-8">
      <div className="flex items-center gap-x-6 border-b pb-6">
        <div className="bg-card rounded-full border p-3">
          <VideoIcon className="h-6 w-6" />
        </div>
        <div>
          <div className="text-muted-foreground text-sm">
            Meeting on {meeting.createdAt.toLocaleDateString()}
          </div>
          <h1 className="mt-1 text-base font-semibold">{meeting.name}</h1>
        </div>
      </div>

      {meeting.status === "PROCESSING" && (
        <p className="text-muted-foreground mt-6 text-sm">
          Still processing. Issues will appear here automatically.
        </p>
      )}

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {meeting.issues.map((issue) => (
          <IssueCard key={issue.id} issue={issue} />
        ))}
      </div>
    </div>
  );
}

function IssueCard({ issue }: { issue: Issue }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{issue.gist}</DialogTitle>
            <DialogDescription>
              {issue.createdAt.toLocaleDateString()}
            </DialogDescription>
            <p className="text-muted-foreground">{issue.headline}</p>
            <blockquote className="bg-muted/50 mt-2 border-l-4 p-4">
              <span className="text-muted-foreground text-sm">
                {issue.start} - {issue.end}
              </span>
              <p className="leading-relaxed font-medium italic">{issue.summary}</p>
            </blockquote>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Card className="relative">
        <CardHeader>
          <CardTitle className="text-xl">{issue.gist}</CardTitle>
          <div className="border-b" />
          <CardDescription>{issue.headline}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => setOpen(true)}>Details</Button>
        </CardContent>
      </Card>
    </>
  );
}