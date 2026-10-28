"use client";

import Link from "next/link";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useProject } from "@/hooks/use-project";
import { useRefetch } from "@/hooks/use-refetch";
import { api } from "@/trpc/react";
import MeetingCard from "../dashboard/meeting-card";

export default function MeetingsPage() {
  const { projectId } = useProject();
  const { data: meetings, isLoading } = api.project.getMeetings.useQuery(
    { projectId },
    { enabled: !!projectId, refetchInterval: 4000 },
  );

  const refetch = useRefetch();
  const deleteMeeting = api.project.deleteMeeting.useMutation();

  return (
    <div className="space-y-6">
      <MeetingCard />

      <h1 className="text-xl font-semibold">Meetings</h1>

      {isLoading && <p className="text-muted-foreground text-sm">Loading...</p>}
      {meetings?.length === 0 && (
        <p className="text-muted-foreground text-sm">No meetings found</p>
      )}

      <ul className="divide-y divide-border/60">
        {meetings?.map((meeting) => (
          <li
            key={meeting.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4 hover:bg-muted/30 transition-colors px-2 sm:px-3 rounded-xl"
          >
            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={`/meetings/${meeting.id}`}
                  className="text-sm font-semibold hover:text-primary transition-colors truncate max-w-full"
                >
                  {meeting.name}
                </Link>
                {meeting.status === "PROCESSING" && (
                  <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 text-[10px]">Processing...</Badge>
                )}
              </div>
              <div className="text-muted-foreground flex items-center gap-x-2 text-xs">
                <p>{meeting.createdAt.toLocaleDateString()}</p>
                <span>&bull;</span>
                <p>{meeting.issues.length} issues</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 self-end sm:self-auto flex-none">
              <Link href={`/meetings/${meeting.id}`}>
                <Button size="sm" variant="outline" className="h-8 text-xs touch-friendly">
                  View Meeting
                </Button>
              </Link>
              <Button
                size="sm"
                variant="destructive"
                className="h-8 text-xs touch-friendly"
                disabled={deleteMeeting.isPending}
                onClick={() =>
                  deleteMeeting.mutate(
                    { meetingId: meeting.id },
                    {
                      onSuccess: () => {
                        toast.success("Meeting deleted");
                        void refetch();
                      },
                      onError: () => toast.error("Could not delete meeting"),
                    },
                  )
                }
              >
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}