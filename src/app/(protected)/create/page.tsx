"use client";

import Image from "next/image";
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
        onError: () => {
          toast.error("Failed to create project");
        },
      },
    );
  }

  return (
    <div className="flex h-full items-center justify-center gap-12">
      <Image
        src="/undraw_github.svg"
        alt="github"
        width={224}
        height={224}
        className="h-56 w-auto"
      />
      <div>
        <h1 className="text-2xl font-semibold">Link your GitHub Repository</h1>
        <p className="text-muted-foreground text-sm">
          Enter the URL of your repository to link it to the app
        </p>
        <div className="h-4" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("projectName", { required: true })}
            placeholder="Project Name"
            required
          />
          <div className="h-2" />
          <Input
            {...register("repoUrl", { required: true })}
            type="url"
            placeholder="GitHub URL"
            required
          />
          <div className="h-2" />
          <Input
            {...register("githubToken")}
            placeholder="GitHub Token (Optional)"
          />
          <div className="h-4" />
          <Button type="submit" disabled={createProject.isPending}>
            Create Project
          </Button>
        </form>
      </div>
    </div>
  );
}