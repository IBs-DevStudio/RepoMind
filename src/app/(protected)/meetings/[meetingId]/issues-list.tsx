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
    <div className="p-2 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
      <div className="flex items-center gap-3 sm:gap-6 border-b pb-4 sm:pb-6">
        <div className="bg-card rounded-2xl border p-2.5 sm:p-3 shadow-2xs flex-none">
          <VideoIcon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
        </div>
        <div className="min-w-0">
          <div className="text-muted-foreground text-xs sm:text-sm">
            Meeting on {meeting.createdAt.toLocaleDateString()}
          </div>
          <h1 className="mt-0.5 text-base sm:text-lg font-semibold truncate">{meeting.name}</h1>
        </div>
      </div>

      {meeting.status === "PROCESSING" && (
        <p className="text-muted-foreground text-xs sm:text-sm">
          Still processing. Issues will appear here automatically.
        </p>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
        <DialogContent className="w-[94vw] max-w-lg p-5 sm:p-6 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-base sm:text-lg">{issue.gist}</DialogTitle>
            <DialogDescription className="text-xs">
              {issue.createdAt.toLocaleDateString()}
            </DialogDescription>
            <p className="text-muted-foreground text-xs sm:text-sm mt-1">{issue.headline}</p>
            <blockquote className="bg-muted/50 mt-3 border-l-4 border-primary p-3 sm:p-4 rounded-r-lg">
              <span className="text-muted-foreground text-xs font-mono">
                {issue.start} - {issue.end}
              </span>
              <p className="leading-relaxed font-medium italic text-xs sm:text-sm mt-1">{issue.summary}</p>
            </blockquote>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Card className="relative overflow-hidden transition-all hover:shadow-md">
        <CardHeader className="p-4 sm:p-5">
          <CardTitle className="text-base sm:text-lg font-bold">{issue.gist}</CardTitle>
          <div className="border-b my-2" />
          <CardDescription className="text-xs line-clamp-2">{issue.headline}</CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-5 pt-0 sm:pt-0">
          <Button size="sm" onClick={() => setOpen(true)} className="h-8 text-xs touch-friendly">
            Details
          </Button>
        </CardContent>
      </Card>
    </>
  );
}