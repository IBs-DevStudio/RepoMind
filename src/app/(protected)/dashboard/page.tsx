"use client";

import { Check, Copy, ExternalLink, GitBranch } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { useProject } from "@/hooks/use-project";
import ArchiveButton from "./archive-button";
import AskQuestionCard from "./ask-question-card";
import CommitLog from "./commit-log";
import InviteButton from "./invite-button";
import TeamMembers from "./team-members";

export default function DashboardPage() {
  const { project } = useProject();
  const [copied, setCopied] = useState(false);

  const handleCopyUrl = async () => {
    if (!project?.githubUrl) return;
    await navigator.clipboard.writeText(project.githubUrl);
    setCopied(true);
    toast.success("Repository URL copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Project Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-gradient-to-r from-primary/10 via-card to-primary/5 p-4 sm:p-5 shadow-xs transition-all">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary border border-primary/25 shadow-2xs flex-none">
              <FaGithub className="size-6 text-foreground" />
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
                  {project?.name ?? "Connected Repository"}
                </h1>
                <Badge
                  variant="outline"
                  className="flex items-center gap-1.5 border-emerald-500/30 bg-emerald-500/10 text-emerald-500 text-[11px] font-medium"
                >
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Synced & Indexed
                </Badge>
              </div>

              {project?.githubUrl && (
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <GitBranch className="size-3 text-primary" />
                    Linked repository:
                  </span>
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-foreground/80 hover:text-primary hover:underline transition-colors"
                  >
                    {project.githubUrl.replace(/^https?:\/\/(www\.)?github\.com\//, "")}
                    <ExternalLink className="size-3 ml-0.5" />
                  </Link>
                  <button
                    type="button"
                    onClick={handleCopyUrl}
                    className="inline-flex items-center gap-1 rounded-md border border-border/70 bg-muted/40 px-1.5 py-0.5 text-[10px] text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
                    title="Copy GitHub URL"
                  >
                    {copied ? (
                      <>
                        <Check className="size-2.5 text-emerald-500" />
                        <span className="text-emerald-500">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-2.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 self-start lg:self-center">
            <TeamMembers />
            <InviteButton />
            <ArchiveButton />
          </div>
        </div>
      </div>

      {/* Main Hero Card: Ask Your Repo Copilot (Full Width) */}
      <div>
        <AskQuestionCard className="w-full" />
      </div>

      {/* Commit History */}
      <div className="pt-2">
        <CommitLog />
      </div>
    </div>
  );
}