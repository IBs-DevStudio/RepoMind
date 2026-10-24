import { useLocalStorage } from "usehooks-ts";

import { api } from "@/trpc/react";

export const useProject = () => {
  const { data: projects, isLoading } = api.project.getProjects.useQuery();
  const [projectId, setProjectId] = useLocalStorage("codebase-ai-projectId", "", {
    initializeWithValue: false,
  });
  const project = projects?.find((p) => p.id === projectId);

  return { projects, project, projectId, setProjectId, isLoading };
};