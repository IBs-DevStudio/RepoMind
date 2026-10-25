"use client";

import { Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useProject } from "@/hooks/use-project";

export default function InviteButton() {
  const { projectId } = useProject();
  const [open, setOpen] = useState(false);

  const link = () => `${window.location.origin}/join/${projectId}`;

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite team members</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground text-sm">
            Anyone with this link can join the project once they sign in.
          </p>
          <div className="flex gap-2">
            <Input readOnly value={open ? link() : ""} />
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                void navigator.clipboard.writeText(link());
                toast.success("Copied to clipboard!");
              }}
            >
              <Copy className="size-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Button size="sm" disabled={!projectId} onClick={() => setOpen(true)}>
        Invite Members
      </Button>
    </>
  );
}