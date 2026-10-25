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

      <ul className="divide-y">
        {meetings?.map((meeting) => (
          <li
            key={meeting.id}
            className="flex items-center justify-between gap-x-6 py-5"
          >
            <div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/meetings/${meeting.id}`}
                  className="text-sm font-semibold hover:underline"
                >
                  {meeting.name}
                </Link>
                {meeting.status === "PROCESSING" && (
                  <Badge className="bg-yellow-500 text-white">Processing...</Badge>
                )}
              </div>
              <div className="text-muted-foreground flex items-center gap-x-2 text-xs">
                <p>{meeting.createdAt.toLocaleDateString()}</p>
                <p>{meeting.issues.length} issues</p>
              </div>
            </div>

            <div className="flex flex-none items-center gap-x-3">
              <Link href={`/meetings/${meeting.id}`}>
                <Button size="sm" variant="outline">
                  View Meeting
                </Button>
              </Link>
              <Button
                size="sm"
                variant="destructive"
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