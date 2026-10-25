"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useProject } from "@/hooks/use-project";
import { useRefetch } from "@/hooks/use-refetch";
import { api } from "@/trpc/react";

export default function ArchiveButton() {
  const { projectId } = useProject();
  const refetch = useRefetch();
  const archiveProject = api.project.archiveProject.useMutation();

  return (
    <Button
      size="sm"
      variant="destructive"
      disabled={archiveProject.isPending || !projectId}
      onClick={() => {
        if (!window.confirm("Are you sure you want to archive this project?")) {
          return;
        }
        archiveProject.mutate(
          { projectId },
          {
            onSuccess: () => {
              toast.success("Project archived");
              void refetch();
            },
            onError: (e) =>
              toast.error(e.message || "Failed to archive project"),
          },
        );
      }}
    >
      Archive
    </Button>
  );
}