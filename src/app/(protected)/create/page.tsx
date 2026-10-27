"use client";

import { GitBranch, Info, Key, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRefetch } from "@/hooks/use-refetch";
import { api } from "@/trpc/react";

type FormInput = {
  repoUrl: string;
  projectName: string;
  githubToken?: string;
};

export default function CreatePage() {
  const { register, handleSubmit, reset, watch } = useForm<FormInput>();
  const createProject = api.project.createProject.useMutation();
  const checkCredits = api.project.checkCredits.useMutation();
  const refetch = useRefetch();

  // Any edit to the URL or token invalidates the previous credit check
  const repoUrl = watch("repoUrl");
  const token = watch("githubToken");
  const resetCheck = checkCredits.reset;
  useEffect(() => {
    resetCheck();
  }, [repoUrl, token, resetCheck]);

  const check = checkCredits.data;
  const hasEnough = check ? check.userCredits >= check.fileCount : true;
  const busy = createProject.isPending || checkCredits.isPending;

  function onSubmit(data: FormInput) {
    if (!check) {
      checkCredits.mutate(
        { githubUrl: data.repoUrl, githubToken: data.githubToken || undefined },
        { onError: (e) => toast.error(e.message || "Could not check credits") },
      );
      return;
    }

    createProject.mutate(
      {
        githubUrl: data.repoUrl,
        name: data.projectName,
        githubToken: data.githubToken || undefined,
      },
      {
        onSuccess: async () => {
          toast.success("Project created successfully");
          await refetch();
          reset();
        },
        onError: (e) => toast.error(e.message || "Failed to create project"),
      },
    );
  }

  const label = !check
    ? "Check credits"
    : hasEnough
      ? "Create project"
      : "Not enough credits";

  return (
    <div className="flex h-full items-center justify-center gap-12">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/download-2.png"
        alt="GitHub illustration"
        className="h-80 w-auto"
      />

      <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold">Link your GitHub Repository</h1>
        <p className="text-muted-foreground text-sm">
          Enter the URL of your repository to link it to the app
        </p>
        <div className="h-4" />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <Input
            {...register("projectName", { required: true })}
            placeholder="Project Name"
            required
          />

          <div className="relative">
            <GitBranch className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <Input
              {...register("repoUrl", { required: true })}
              placeholder="GitHub Repository URL"
              type="url"
              className="pl-9"
              required
            />
          </div>

          <div className="relative">
            <Key className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <Input
              {...register("githubToken")}
              placeholder="GitHub Token (Optional)"
              type="password"
              className="pl-9"
            />
          </div>

          {check && (
            <div
              className={`rounded-md border px-4 py-3 text-sm ${
                hasEnough
                  ? "border-primary/30 bg-primary/5"
                  : "border-red-500/30 bg-red-500/5 text-red-600"
              }`}
            >
              <div className="flex items-center gap-2">
                <Info className="size-4 flex-none" />
                <p>
                  This repository will cost <strong>{check.fileCount}</strong>{" "}
                  credits.
                </p>
              </div>
              <p className="mt-1 pl-6">
                You have <strong>{check.userCredits}</strong> credits
                {hasEnough
                  ? ` (${check.userCredits - check.fileCount} left after).`
                  : "."}
              </p>
            </div>
          )}

          <div className="h-2" />
          <Button
            className="btn-gradient hover-glow w-full"
            type="submit"
            disabled={busy || !hasEnough}
          >
            {busy && <Loader2 className="mr-2 size-4 animate-spin" />}
            {label}
          </Button>
        </form>
      </div>
    </div>
  );
}