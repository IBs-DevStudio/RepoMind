"use client";

import { Folder, GitBranch, Key, Loader2 } from "lucide-react";
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
  const { register, handleSubmit, reset } = useForm<FormInput>();
  const createProject = api.project.createProject.useMutation();
  const refetch = useRefetch();

  function onSubmit(data: FormInput) {
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
        onError: (e) => {
          toast.error(e.message || "Failed to create project");
        },
      },
    );
  }

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
          <div className="relative">
          <Folder className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            {...register("projectName", { required: true })}
            placeholder="Project Name"
            className="pl-9"
            required
          />
          </div>

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

          <div className="h-2" />
          <Button
            className="btn-gradient hover-glow w-full"
            type="submit"
            disabled={createProject.isPending}
          >
            {createProject.isPending && (
              <Loader2 className="mr-2 size-4 animate-spin" />
            )}
            {createProject.isPending ? "Creating..." : "Create Project"}
          </Button>
        </form>
      </div>
    </div>
  );
}