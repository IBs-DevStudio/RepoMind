"use client";

import Link from "next/link";

import { useProject } from "@/hooks/use-project";
import { api } from "@/trpc/react";

export default function TeamMembers() {
  const { projectId } = useProject();
  const { data: members } = api.project.getTeamMembers.useQuery(
    { projectId },
    { enabled: !!projectId },
  );

  return (
    <Link
      href="/team"
      className="group flex items-center -space-x-2 transition-transform hover:scale-105"
      title="View full team members & invite link"
    >
      {members?.map((m) =>
        m.user.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={m.userId}
            src={m.user.imageUrl}
            alt={m.user.firstName ?? "Member"}
            className="ring-background size-8 rounded-full ring-2 shadow-2xs group-hover:ring-primary/40 transition-all object-cover"
          />
        ) : (
          <div
            key={m.userId}
            className="bg-primary/15 text-primary ring-background flex size-8 items-center justify-center rounded-full text-xs font-semibold ring-2 shadow-2xs group-hover:ring-primary/40 transition-all"
          >
            {m.user.firstName?.[0] ?? "U"}
          </div>
        ),
      )}
    </Link>
  );
}