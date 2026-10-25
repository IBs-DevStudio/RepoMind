"use client";

import { useProject } from "@/hooks/use-project";
import { api } from "@/trpc/react";

export default function TeamMembers() {
  const { projectId } = useProject();
  const { data: members } = api.project.getTeamMembers.useQuery(
    { projectId },
    { enabled: !!projectId },
  );

  return (
    <div className="flex items-center -space-x-2">
      {members?.map((m) =>
        m.user.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={m.userId}
            src={m.user.imageUrl}
            alt={m.user.firstName ?? "Member"}
            title={m.user.firstName ?? "Member"}
            className="ring-background size-8 rounded-full ring-2"
          />
        ) : (
          <div
            key={m.userId}
            title={m.user.firstName ?? "Member"}
            className="bg-primary/10 text-primary ring-background flex size-8 items-center justify-center rounded-full text-xs font-semibold ring-2"
          >
            {m.user.firstName?.[0] ?? "U"}
          </div>
        ),
      )}
    </div>
  );
}