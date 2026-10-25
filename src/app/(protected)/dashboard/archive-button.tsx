"use client";

import { Archive, Loader2, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useProject } from "@/hooks/use-project";
import { useRefetch } from "@/hooks/use-refetch";
import { api } from "@/trpc/react";

export default function ArchiveButton() {
  const { projectId } = useProject();
  const refetch = useRefetch();
  const [open, setOpen] = useState(false);
  const archiveProject = api.project.archiveProject.useMutation();

  const handleArchive = () => {
    archiveProject.mutate(
      { projectId },
      {
        onSuccess: () => {
          toast.success("Project archived");
          setOpen(false);
          void refetch();
        },
        onError: (e) => toast.error(e.message || "Failed to archive project"),
      },
    );
  };

  return (
    <>
      <Button
        size="sm"
        variant="destructive"
        disabled={!projectId}
        onClick={() => setOpen(true)}
      >
        Archive
      </Button>

      <Dialog
        open={open}
        onOpenChange={(v) => {
          if (!archiveProject.isPending) setOpen(v);
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="items-center text-center sm:items-start sm:text-left">
            <div className="mb-2 flex size-12 items-center justify-center rounded-full bg-red-500/10 text-red-600">
              <TriangleAlert className="size-6" />
            </div>
            <DialogTitle className="text-lg font-semibold">
              Archive this project?
            </DialogTitle>
            <DialogDescription className="text-sm leading-relaxed">
              It will disappear from your sidebar and dashboard. Your commits,
              questions and meetings are kept, so it can be restored later.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="gap-2 sm:gap-2">
            <Button
              variant="outline"
              disabled={archiveProject.isPending}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={archiveProject.isPending}
              onClick={handleArchive}
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
    </>
  );
}