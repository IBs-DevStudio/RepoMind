"use client";

import {
  Archive,
  Check,
  ExternalLink,
  Eye,
  EyeOff,
  FolderGit2,
  Key,
  Loader2,
  Save,
  Settings,
  ShieldAlert,
  Trash2,
  TriangleAlert,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useProject } from "@/hooks/use-project";
import { useRefetch } from "@/hooks/use-refetch";
import { api } from "@/trpc/react";

export default function SettingsPage() {
  const router = useRouter();
  const { project, projectId, setProjectId, isLoading: projectLoading } = useProject();
  const refetch = useRefetch();

  const [projectName, setProjectName] = useState("");
  const [githubToken, setGithubToken] = useState("");
  const [showToken, setShowToken] = useState(false);
  const [archiveModalOpen, setArchiveModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  const { data: projectDetails, isLoading: detailsLoading } =
    api.project.getProjectDetails.useQuery(
      { projectId: projectId ?? "" },
      { enabled: !!projectId },
    );

  const updateProject = api.project.updateProject.useMutation();
  const archiveProject = api.project.archiveProject.useMutation();
  const deleteProject = api.project.deleteProject.useMutation();

  useEffect(() => {
    if (projectDetails) {
      setProjectName(projectDetails.name ?? "");
      setGithubToken(projectDetails.githubToken ?? "");
    } else if (project) {
      setProjectName(project.name);
    }
  }, [projectDetails, project]);

  const isOwner = projectDetails?.role === "OWNER";

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectId || !projectName.trim()) return;

    updateProject.mutate(
      { projectId, name: projectName.trim() },
      {
        onSuccess: () => {
          toast.success("Project name updated successfully");
          void refetch();
        },
        onError: (err) => toast.error(err.message || "Failed to update name"),
      },
    );
  };

  const handleSaveToken = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectId) return;

    updateProject.mutate(
      { projectId, githubToken: githubToken.trim() },
      {
        onSuccess: () => {
          toast.success("GitHub access token saved");
          void refetch();
        },
        onError: (err) => toast.error(err.message || "Failed to save token"),
      },
    );
  };

  const handleRemoveToken = () => {
    if (!projectId) return;

    updateProject.mutate(
      { projectId, githubToken: null },
      {
        onSuccess: () => {
          setGithubToken("");
          toast.success("Custom GitHub token removed");
          void refetch();
        },
        onError: (err) => toast.error(err.message || "Failed to remove token"),
      },
    );
  };

  const handleArchive = () => {
    if (!projectId) return;

    archiveProject.mutate(
      { projectId },
      {
        onSuccess: () => {
          toast.success("Project archived successfully");
          setArchiveModalOpen(false);
          void refetch();
          router.push("/dashboard");
        },
        onError: (err) => toast.error(err.message || "Failed to archive project"),
      },
    );
  };

  const handleDelete = () => {
    if (!projectId) return;

    deleteProject.mutate(
      { projectId },
      {
        onSuccess: () => {
          toast.success("Project permanently deleted");
          setDeleteModalOpen(false);
          setProjectId("");
          void refetch();
          router.push("/dashboard");
        },
        onError: (err) => toast.error(err.message || "Failed to delete project"),
      },
    );
  };

  if (projectLoading || detailsLoading) {
    return (
      <div className="space-y-6 max-w-4xl">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-44 w-full rounded-2xl" />
        <Skeleton className="h-44 w-full rounded-2xl" />
        <Skeleton className="h-44 w-full rounded-2xl" />
      </div>
    );
  }

  if (!projectId || !project) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center text-center">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <FolderGit2 className="size-7" />
        </div>
        <h2 className="mt-4 text-xl font-semibold">No project selected</h2>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          Select a project from the sidebar to view and manage its settings.
        </p>
        <Link href="/create" className="mt-4">
          <Button>Create Project</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary/15 text-primary border border-primary/20">
            <Settings className="size-5" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Project Settings
          </h1>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage repository credentials, access tokens, and project lifecycle for{" "}
          <span className="font-semibold text-foreground">{project.name}</span>.
        </p>
      </div>

      {!isOwner && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs text-amber-600 dark:text-amber-400">
          <strong>Notice:</strong> You are currently viewing this project as a team collaborator.
          Only the project owner can modify repository configurations or delete the project.
        </div>
      )}

      {/* General Settings */}
      <div className="rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm p-4 sm:p-6 shadow-xs space-y-6">
        <div>
          <h2 className="text-base font-semibold text-foreground">
            General Configuration
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Update the display name and review the linked GitHub repository.
          </p>
        </div>

        <form onSubmit={handleSaveName} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">
              Project Name
            </label>
            <div className="flex flex-col sm:flex-row gap-2.5">
              <Input
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Repository display name"
                disabled={!isOwner || updateProject.isPending}
                className="max-w-md bg-background/80"
                required
              />
              {isOwner && (
                <Button
                  type="submit"
                  disabled={
                    updateProject.isPending ||
                    !projectName.trim() ||
                    projectName === project.name
                  }
                  className="gap-1.5 w-full sm:w-fit active:scale-[0.98] touch-manipulation"
                >
                  {updateProject.isPending ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Save className="size-4" />
                  )}
                  Save Name
                </Button>
              )}
            </div>
          </div>
        </form>

        <div className="space-y-1.5 pt-2 border-t border-border/60">
          <label className="text-xs font-medium text-foreground">
            Connected GitHub Repository
          </label>
          <div className="flex items-center gap-2 max-w-md">
            <div className="flex flex-1 items-center gap-2 rounded-lg border border-border/70 bg-muted/40 px-3 py-2 text-xs font-mono text-muted-foreground truncate">
              <FaGithub className="size-4 flex-none text-foreground" />
              <span className="truncate">{project.githubUrl}</span>
            </div>
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-none"
            >
              <Button
                variant="outline"
                size="icon"
                className="size-9 active:scale-[0.98] touch-manipulation"
                title="Open GitHub"
              >
                <ExternalLink className="size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* GitHub Personal Access Token */}
      <div className="rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm p-4 sm:p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base font-semibold text-foreground">
                GitHub Access Token
              </h2>
              {projectDetails?.hasCustomToken ? (
                <Badge
                  variant="outline"
                  className="border-emerald-500/40 bg-emerald-500/10 text-emerald-500 text-[11px] gap-1"
                >
                  <Check className="size-3" />
                  Custom token active
                </Badge>
              ) : (
                <Badge
                  variant="secondary"
                  className="text-[11px] bg-muted text-muted-foreground"
                >
                  System default token
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1 max-w-xl leading-relaxed">
              Required for syncing private repositories and granting higher GitHub API rate
              limits (5,000 requests/hr vs 60 requests/hr). Tokens are encrypted and stored safely.
            </p>
          </div>
        </div>

        <form onSubmit={handleSaveToken} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
              <Key className="size-3.5 text-primary" />
              Personal Access Token (classic or fine-grained)
            </label>
            <div className="relative max-w-lg">
              <Input
                type={showToken ? "text" : "password"}
                value={githubToken}
                onChange={(e) => setGithubToken(e.target.value)}
                placeholder="ghp_xxxxxxxxxxxx or github_pat_xxxx..."
                disabled={!isOwner || updateProject.isPending}
                className="bg-background/80 pr-10 font-mono text-xs"
              />
              <button
                type="button"
                onClick={() => setShowToken((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors touch-manipulation"
                title={showToken ? "Hide token" : "Show token"}
              >
                {showToken ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
          </div>

          {isOwner && (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <Button
                type="submit"
                disabled={updateProject.isPending || !githubToken.trim()}
                className="gap-1.5 active:scale-[0.98] touch-manipulation"
              >
                {updateProject.isPending ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Save className="size-4" />
                )}
                Save Token
              </Button>

              {projectDetails?.hasCustomToken && (
                <Button
                  type="button"
                  variant="outline"
                  disabled={updateProject.isPending}
                  onClick={handleRemoveToken}
                  className="text-xs text-muted-foreground hover:text-red-500 hover:border-red-500/40 active:scale-[0.98] touch-manipulation"
                >
                  Remove Custom Token
                </Button>
              )}
            </div>
          )}
        </form>
      </div>

      {/* Danger Zone */}
      <div className="rounded-2xl border border-red-500/30 bg-red-500/5 backdrop-blur-sm p-4 sm:p-6 shadow-xs space-y-6">
        <div>
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <ShieldAlert className="size-5" />
            <h2 className="text-base font-semibold">Danger Zone</h2>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Irreversible and destructive actions for this project.
          </p>
        </div>

        <div className="divide-y divide-red-500/20">
          {/* Archive Option */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4 first:pt-0">
            <div className="space-y-0.5 max-w-lg">
              <p className="text-sm font-medium text-foreground">
                Archive Project
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Hide this project from your active dashboard and project list. Commits, Q&A
                records, and meeting analyses are kept safe and can be restored from the sidebar at any time.
              </p>
            </div>
            <Button
              variant="outline"
              disabled={!isOwner}
              onClick={() => setArchiveModalOpen(true)}
              className="border-red-500/30 text-red-600 hover:bg-red-500/10 hover:text-red-600 w-full sm:w-auto gap-1.5 flex-none active:scale-[0.98] touch-manipulation"
            >
              <Archive className="size-4" />
              Archive Project
            </Button>
          </div>

          {/* Delete Option */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4">
            <div className="space-y-0.5 max-w-lg">
              <p className="text-sm font-medium text-red-600 dark:text-red-400">
                Permanently Delete Project
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Delete all vector embeddings, commit index logs, AI question answers, and
                meetings. <strong>This action cannot be undone.</strong>
              </p>
            </div>
            <Button
              variant="destructive"
              disabled={!isOwner}
              onClick={() => {
                setDeleteConfirmText("");
                setDeleteModalOpen(true);
              }}
              className="w-full sm:w-auto gap-1.5 flex-none active:scale-[0.98] touch-manipulation"
            >
              <Trash2 className="size-4" />
              Delete Project
            </Button>
          </div>
        </div>
      </div>

      {/* Archive Modal */}
      <Dialog
        open={archiveModalOpen}
        onOpenChange={(v) => {
          if (!archiveProject.isPending) setArchiveModalOpen(v);
        }}
      >
        <DialogContent className="w-[94vw] max-w-md">
          <DialogHeader>
            <div className="mb-2 flex size-12 items-center justify-center rounded-full bg-amber-500/10 text-amber-600">
              <TriangleAlert className="size-6" />
            </div>
            <DialogTitle>Archive {project.name}?</DialogTitle>
            <DialogDescription className="text-sm leading-relaxed">
              The project will disappear from your active sidebar. You can restore it anytime
              from the &ldquo;Archived projects&rdquo; expandable section under Your Projects.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex-col-reverse sm:flex-row gap-2 sm:gap-2">
            <Button
              variant="outline"
              disabled={archiveProject.isPending}
              onClick={() => setArchiveModalOpen(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={archiveProject.isPending}
              onClick={handleArchive}
              className="w-full sm:w-auto"
            >
              {archiveProject.isPending ? (
                <Loader2 className="mr-1.5 size-4 animate-spin" />
              ) : (
                <Archive className="mr-1.5 size-4" />
              )}
              {archiveProject.isPending ? "Archiving..." : "Archive project"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog
        open={deleteModalOpen}
        onOpenChange={(v) => {
          if (!deleteProject.isPending) setDeleteModalOpen(v);
        }}
      >
        <DialogContent className="w-[94vw] max-w-md">
          <DialogHeader>
            <div className="mb-2 flex size-12 items-center justify-center rounded-full bg-red-500/10 text-red-600">
              <ShieldAlert className="size-6" />
            </div>
            <DialogTitle>Delete {project.name} permanently?</DialogTitle>
            <DialogDescription className="text-sm leading-relaxed">
              This action cannot be undone. All indexed code embeddings, commit history,
              questions, and meeting notes will be permanently erased.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2 py-2">
            <p className="text-xs text-muted-foreground">
              Please type <strong className="text-foreground">{project.name}</strong> to
              confirm deletion:
            </p>
            <Input
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              placeholder={project.name}
              className="bg-background/80 font-mono text-xs"
            />
          </div>

          <DialogFooter className="flex-col-reverse sm:flex-row gap-2 sm:gap-2">
            <Button
              variant="outline"
              disabled={deleteProject.isPending}
              onClick={() => setDeleteModalOpen(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={
                deleteProject.isPending ||
                deleteConfirmText.trim() !== project.name.trim()
              }
              onClick={handleDelete}
              className="w-full sm:w-auto"
            >
              {deleteProject.isPending ? (
                <Loader2 className="mr-1.5 size-4 animate-spin" />
              ) : (
                <Trash2 className="mr-1.5 size-4" />
              )}
              {deleteProject.isPending ? "Deleting..." : "Permanently delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
