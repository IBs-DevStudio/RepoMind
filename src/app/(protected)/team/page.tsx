"use client";

import {
  Check,
  Copy,
  Crown,
  FolderGit2,
  Loader2,
  Mail,
  ShieldAlert,
  Trash2,
  UserCheck,
  UserMinus,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
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

export default function TeamPage() {
  const { user } = useUser();
  const { project, projectId, projects, isLoading: projectLoading } = useProject();
  const refetch = useRefetch();

  const [copied, setCopied] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState<{
    userId: string;
    name: string;
  } | null>(null);

  const { data: members, isLoading: membersLoading } =
    api.project.getTeamMembers.useQuery(
      { projectId: projectId ?? "" },
      { enabled: !!projectId },
    );

  const removeMember = api.project.removeTeamMember.useMutation();

  const inviteLink =
    typeof window !== "undefined" && projectId
      ? `${window.location.origin}/join/${projectId}`
      : "";

  const handleCopyInvite = async () => {
    if (!inviteLink) return;
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      toast.success("Invite link copied to clipboard!");
      setTimeout(() => setCopied(false), 2200);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const handleConfirmRemove = () => {
    if (!memberToRemove || !projectId) return;
    removeMember.mutate(
      { projectId, memberUserId: memberToRemove.userId },
      {
        onSuccess: async () => {
          toast.success(`${memberToRemove.name} was removed from the team`);
          setMemberToRemove(null);
          await refetch();
        },
        onError: (err) => {
          toast.error(err.message || "Failed to remove member");
        },
      },
    );
  };

  const currentMember = members?.find((m) => m.userId === user?.id);
  const isOwner = currentMember?.role === "OWNER";

  if (projectLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-36 w-full rounded-2xl" />
        <Skeleton className="h-64 w-full rounded-2xl" />
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
          Select a project from the sidebar or create a new one to view and manage its team members.
        </p>
        <Link href="/create" className="mt-4">
          <Button>Create Project</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary/15 text-primary border border-primary/20">
              <Users className="size-5" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Team & Collaborators
            </h1>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage repository access, review member roles, and invite teammates to{" "}
            <span className="font-semibold text-foreground">{project.name}</span>.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="border-primary/30 bg-primary/5 text-primary px-3 py-1 text-xs"
          >
            {members?.length ?? 1} {members?.length === 1 ? "Member" : "Members"}
          </Badge>
          {isOwner && (
            <Badge
              variant="outline"
              className="border-amber-500/30 bg-amber-500/10 text-amber-500 px-3 py-1 text-xs gap-1"
            >
              <Crown className="size-3" />
              Project Owner
            </Badge>
          )}
        </div>
      </div>

      {/* Invite Link Card */}
      <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-gradient-to-r from-primary/10 via-card to-violet-500/10 p-5 shadow-xs">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1 max-w-xl">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-foreground">
                Shareable Invite Link
              </h2>
              <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Anyone with an Engram account who opens this link can instantly join{" "}
              <strong>{project.name}</strong> as a collaborator and explore Q&A and commits.
            </p>
          </div>

          <div className="flex w-full md:w-auto items-center gap-2">
            <div className="relative flex-1 md:w-80">
              <Input
                readOnly
                value={inviteLink}
                className="bg-background/80 pr-10 font-mono text-xs select-all border-border/80"
              />
            </div>
            <Button
              onClick={handleCopyInvite}
              className="gap-2 flex-none shadow-xs"
            >
              {copied ? (
                <>
                  <Check className="size-4 text-emerald-400" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="size-4" />
                  <span>Copy Link</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Members List Card */}
      <div className="rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm shadow-xs overflow-hidden">
        <div className="border-b border-border/70 px-5 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-foreground">Project Members</h2>
            <p className="text-xs text-muted-foreground">
              People who have access to this project’s repository index and intelligence.
            </p>
          </div>
        </div>

        <div className="divide-y divide-border/60">
          {membersLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 px-5">
                <div className="flex items-center gap-3">
                  <Skeleton className="size-10 rounded-full" />
                  <div className="space-y-1.5">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-48" />
                  </div>
                </div>
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            ))
          ) : members && members.length > 0 ? (
            members.map((member) => {
              const fullName =
                [member.user.firstName, member.user.lastName]
                  .filter(Boolean)
                  .join(" ") ||
                member.user.firstName ||
                "Team Member";
              const isCurrentUser = member.userId === user?.id;
              const isMemberOwner = member.role === "OWNER";

              return (
                <div
                  key={member.userId}
                  className="flex items-center justify-between p-4 px-5 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-3.5 min-w-0 pr-4">
                    {member.user.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={member.user.imageUrl}
                        alt={fullName}
                        className="size-10 rounded-full border border-border/80 object-cover flex-none bg-muted shadow-2xs"
                      />
                    ) : (
                      <div className="flex size-10 flex-none items-center justify-center rounded-full bg-primary/15 text-primary text-sm font-semibold border border-primary/25 shadow-2xs">
                        {fullName[0]?.toUpperCase()}
                      </div>
                    )}

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground truncate">
                          {fullName}
                        </span>
                        {isCurrentUser && (
                          <Badge
                            variant="secondary"
                            className="text-[10px] py-0 px-1.5 bg-muted text-muted-foreground border-border/60"
                          >
                            You
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5 truncate">
                        <Mail className="size-3 flex-none" />
                        <span className="truncate">{member.user.emailAddress}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-none">
                    {isMemberOwner ? (
                      <Badge
                        variant="outline"
                        className="border-amber-500/40 bg-amber-500/10 text-amber-500 gap-1.5 text-xs font-medium"
                      >
                        <Crown className="size-3" />
                        Owner
                      </Badge>
                    ) : (
                      <Badge
                        variant="secondary"
                        className="border-border/60 bg-muted/60 text-muted-foreground gap-1.5 text-xs font-normal"
                      >
                        <UserCheck className="size-3" />
                        Member
                      </Badge>
                    )}

                    {/* Owner can remove members (except themselves) */}
                    {isOwner && !isCurrentUser && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors"
                        title={`Remove ${fullName}`}
                        onClick={() =>
                          setMemberToRemove({
                            userId: member.userId,
                            name: fullName,
                          })
                        }
                      >
                        <UserMinus className="size-4" />
                        <span className="sr-only">Remove member</span>
                      </Button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-sm text-muted-foreground">
              No members found for this project.
            </div>
          )}
        </div>
      </div>

      {/* Remove Member Confirmation Dialog */}
      <Dialog
        open={!!memberToRemove}
        onOpenChange={(v) => {
          if (!v && !removeMember.isPending) setMemberToRemove(null);
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mb-2 flex size-12 items-center justify-center rounded-full bg-red-500/10 text-red-600">
              <ShieldAlert className="size-6" />
            </div>
            <DialogTitle>Remove {memberToRemove?.name}?</DialogTitle>
            <DialogDescription className="text-sm">
              This person will lose access to <strong>{project.name}</strong>, its
              indexed source files, Q&A records, and meeting summaries immediately.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="gap-2 sm:gap-2">
            <Button
              variant="outline"
              disabled={removeMember.isPending}
              onClick={() => setMemberToRemove(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={removeMember.isPending}
              onClick={handleConfirmRemove}
            >
              {removeMember.isPending ? (
                <Loader2 className="mr-1.5 size-4 animate-spin" />
              ) : (
                <Trash2 className="mr-1.5 size-4" />
              )}
              {removeMember.isPending ? "Removing..." : "Remove member"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
