"use client";

import { ExternalLink } from "lucide-react";
import Link from "next/link";

import { useProject } from "@/hooks/use-project";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";

export default function CommitLog() {
  const { projectId, project } = useProject();
  const { data: commits } = api.project.getCommits.useQuery(
    { projectId },
    { enabled: !!projectId },
  );

  const repoUrl = project?.githubUrl.replace(/(\.git)?\/?$/, "");

  return (
    <ul className="space-y-6">
      {commits?.map((commit, idx) => (
        <li key={commit.id} className="relative flex gap-x-4">
          <div
            className={cn(
              idx === commits.length - 1 ? "h-6" : "-bottom-6",
              "absolute top-0 left-0 flex w-6 justify-center",
            )}
          >
            <div className="bg-border w-px translate-x-1" />
          </div>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={commit.commitAuthorAvatar}
            alt="commit author avatar"
            className="bg-muted relative mt-3 size-8 flex-none rounded-full"
          />

          <div className="bg-background ring-border flex-auto rounded-md p-3 ring-1 ring-inset">
            <div className="flex justify-between gap-x-4">
              <Link
                target="_blank"
                href={`${repoUrl}/commit/${commit.commitHash}`}
                className="text-muted-foreground py-0.5 text-xs leading-5"
              >
                <span className="text-foreground font-medium">
                  {commit.commitAuthorName}
                </span>{" "}
                <span className="inline-flex items-center">
                  committed
                  <ExternalLink className="ml-1 size-4" />
                </span>
              </Link>
            </div>
            <span className="font-semibold">{commit.commitMessage}</span>
            <pre className="text-muted-foreground mt-2 text-sm leading-6 whitespace-pre-wrap">
              {commit.summary}
            </pre>
          </div>
        </li>
      ))}
    </ul>
  );
}