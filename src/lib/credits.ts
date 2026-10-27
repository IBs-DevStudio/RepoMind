import { TRPCError } from "@trpc/server";

/** Counts every file (blob) in the repo's default branch with one GitHub call. */
export async function countRepoFiles(githubUrl: string, githubToken?: string) {
  let owner: string | undefined;
  let repo: string | undefined;
  try {
    const parts = new URL(githubUrl).pathname.split("/").filter(Boolean);
    owner = parts[0];
    repo = parts[1]?.replace(/\.git$/, "");
  } catch {
    // handled below
  }
  if (!owner || !repo) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid GitHub URL" });
  }

  const token = githubToken || process.env.GITHUB_TOKEN;
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/git/trees/HEAD?recursive=1`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    },
  );

  if (res.status === 404) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Repository not found. If it is private, add a GitHub token.",
    });
  }
  if (res.status === 403 || res.status === 429) {
    throw new TRPCError({
      code: "TOO_MANY_REQUESTS",
      message: "GitHub rate limit reached. Add a GitHub token and try again.",
    });
  }
  if (!res.ok) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Could not read the repository from GitHub",
    });
  }

  const data = (await res.json()) as { tree: { type: string }[] };
  return data.tree.filter((item) => item.type === "blob").length;
}