"use client";

import { ExternalLink, Sparkles } from "lucide-react";
import Link from "next/link";

import { useProject } from "@/hooks/use-project";
import { api } from "@/trpc/react";

function timeAgo(input: Date | string) {
  const date = new Date(input);
  const diff = (date.getTime() - Date.now()) / 1000;
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 31_536_000],
    ["month", 2_592_000],
    ["day", 86_400],
    ["hour", 3_600],
    ["minute", 60],
  ];
  for (const [unit, secs] of units) {
    if (Math.abs(diff) >= secs) return rtf.format(Math.round(diff / secs), unit);
  }
  return "just now";
}

// Turns the model's "* text (file)" bullets into clean lines.
const META =
  /\b(the diff|this diff|i need to|i should|let me|at most 5|bullet points?)\b/i;

function parseSummary(summary: string) {
  return summary
    .split("\n")
    .map((l) => l.replace(/^\s*[*\-•]\s*/, "").trim())
    .filter(Boolean)
    .filter((l) => !META.test(l))
    .map((line) => {
      const m = /^(.*?)\s*\(([^()]*[./][^()]*)\)\.?$/.exec(line);
      return m?.[1] && m[2]
        ? { text: m[1], file: m[2] }
        : { text: line, file: null };
    });
}

export default function CommitLog() {
  const { projectId, project } = useProject();
  const { data: commits, isLoading } = api.project.getCommits.useQuery(
    { projectId },
    { enabled: !!projectId },
  );

  const repoUrl = project?.githubUrl.replace(/(\.git)?\/?$/, "");

  if (!projectId) return null;

  return (
    <section>
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Commit history</h2>
          <p className="text-muted-foreground text-sm">
            Latest commits with AI-generated summaries
          </p>
        </div>
      </div>

      {!isLoading && commits?.length === 0 && (
        <div className="text-muted-foreground rounded-xl border border-dashed p-8 text-center text-sm">
          No commits yet. Summaries appear here as they are generated, so
          refresh in a few seconds.
        </div>
      )}

      <ol className="before:bg-border relative space-y-4 before:absolute before:top-4 before:bottom-4 before:left-4 before:w-px">
        {commits?.map((commit) => {
          const title = commit.commitMessage.split("\n")[0] ?? "";
          const points = parseSummary(commit.summary);
          const overall = points.length > 1 ? points[points.length - 1] : null;
          const details = overall ? points.slice(0, -1) : points;

          return (
            <li key={commit.id} className="relative flex gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={commit.commitAuthorAvatar}
                alt={commit.commitAuthorName}
                className="bg-muted ring-background relative z-10 size-8 flex-none rounded-full ring-4"
              />

              <div className="bg-card min-w-0 flex-1 rounded-xl border p-4 shadow-sm transition-shadow hover:shadow-md">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-muted-foreground truncate text-xs">
                    <span className="text-foreground font-medium">
                      {commit.commitAuthorName}
                    </span>{" "}
                    committed {timeAgo(commit.commitDate)}
                  </p>
                  <Link
                    target="_blank"
                    href={`${repoUrl}/commit/${commit.commitHash}`}
                    className="bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground inline-flex flex-none items-center gap-1 rounded-md px-2 py-1 font-mono text-xs transition-colors"
                  >
                    {commit.commitHash.slice(0, 7)}
                    <ExternalLink className="size-3" />
                  </Link>
                </div>

                <h3 className="mt-2 text-[15px] leading-snug font-semibold">
                  {title}
                </h3>

                {details.length > 0 && (
                  <ul className="mt-3 space-y-1.5">
                    {details.map((p, i) => (
                      <li key={i} className="flex gap-2 text-sm leading-6">
                        <span className="bg-primary/60 mt-2.5 size-1.5 flex-none rounded-full" />
                        <span className="text-muted-foreground">
                          {p.text}
                          {p.file && (
                            <code className="bg-muted text-foreground/80 ml-1.5 rounded px-1.5 py-0.5 font-mono text-xs break-all">
                              {p.file}
                            </code>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {overall && (
                  <div className="bg-primary/5 mt-3 flex gap-2 rounded-lg p-3 text-sm leading-6">
                    <Sparkles className="text-primary mt-1 size-4 flex-none" />
                    <p>{overall.text}</p>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}