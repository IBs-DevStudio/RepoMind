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
    <div className="flex min-h-full flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-14 py-4 sm:py-8 px-2 sm:px-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/download-2.png"
        alt="GitHub illustration"
        className="hidden md:block h-44 sm:h-60 lg:h-80 w-auto object-contain animate-float"
      />

      <div className="w-full max-w-md space-y-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Link your GitHub Repository
          </h1>
          <p className="text-muted-foreground text-xs sm:text-sm mt-1">
            Enter the URL of your repository to link it to the app
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <Input
            {...register("projectName", { required: true })}
            placeholder="Project Name"
            className="h-10 text-sm"
            required
          />

          <div className="relative">
            <GitBranch className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <Input
              {...register("repoUrl", { required: true })}
              placeholder="GitHub Repository URL"
              type="url"
              className="pl-9 h-10 text-sm"
              required
            />
          </div>

          <div className="relative">
            <Key className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <Input
              {...register("githubToken")}
              placeholder="GitHub Token (Optional for private repos)"
              type="password"
              className="pl-9 h-10 text-sm"
            />
          </div>

          {check && (
            <div
              className={`rounded-xl border p-3.5 text-xs sm:text-sm ${
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

          <div className="pt-1">
            <Button
              className="w-full h-11 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold shadow-md touch-friendly cursor-pointer active:scale-[0.99] transition-all"
              type="submit"
              disabled={busy || !hasEnough}
            >
              {busy && <Loader2 className="mr-2 size-4 animate-spin" />}
              {label}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
