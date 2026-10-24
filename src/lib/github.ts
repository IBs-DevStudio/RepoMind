import "server-only";
import { Octokit } from "@octokit/rest";

import { db } from "@/server/db";
import { aiSummariseCommit } from "./ai";

export const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export function parseGithubUrl(githubUrl: string) {
  const m = /github\.com\/([^/]+)\/([^/#?]+?)(?:\.git)?\/?$/.exec(githubUrl.trim());
  if (!m?.[1] || !m[2]) throw new Error("Invalid GitHub URL");
  return { owner: m[1], repo: m[2] };
}

async function getLatestCommits(owner: string, repo: string) {
  const { data } = await octokit.rest.repos.listCommits({
    owner,
    repo,
    per_page: 10,
  });

  return data.map((c) => ({
    commitHash: c.sha,
    commitMessage: c.commit.message,
    commitAuthorName: c.commit.author?.name ?? "",
    commitAuthorAvatar: c.author?.avatar_url ?? "",
    commitDate: c.commit.author?.date ?? new Date().toISOString(),
  }));
}

async function summarizeCommit(owner: string, repo: string, sha: string) {
  const res = await octokit.request("GET /repos/{owner}/{repo}/commits/{ref}", {
    owner,
    repo,
    ref: sha,
    headers: { accept: "application/vnd.github.diff" },
  });
  return aiSummariseCommit(String(res.data));
}

type NewCommit = {
  projectId: string;
  commitHash: string;
  commitMessage: string;
  commitAuthorName: string;
  commitAuthorAvatar: string;
  commitDate: Date;
  summary: string;
};

export async function pollCommits(projectId: string) {
  const project = await db.project.findUnique({
    where: { id: projectId },
    select: { githubUrl: true },
  });
  if (!project) throw new Error("Project not found");

  const { owner, repo } = parseGithubUrl(project.githubUrl);
  const latest = await getLatestCommits(owner, repo);

  const existing = await db.commit.findMany({
    where: { projectId, commitHash: { in: latest.map((c) => c.commitHash) } },
    select: { commitHash: true },
  });
  const seen = new Set(existing.map((e) => e.commitHash));
  const fresh = latest.filter((c) => !seen.has(c.commitHash));
  if (fresh.length === 0) return;

  // Free models are rate limited, so summarize one commit at a time.
  // Commits that fail are not stored, so they are retried on the next poll.
  const rows: NewCommit[] = [];
  for (const c of fresh) {
    try {
      const summary = await summarizeCommit(owner, repo, c.commitHash);
      rows.push({
        projectId,
        commitHash: c.commitHash,
        commitMessage: c.commitMessage,
        commitAuthorName: c.commitAuthorName,
        commitAuthorAvatar: c.commitAuthorAvatar,
        commitDate: new Date(c.commitDate),
        summary,
      });
    } catch (e) {
      console.error("commit summary failed", c.commitHash, e);
      if (String(e).includes("429")) break; // rate limited, retry on next poll
    }
  }

  if (rows.length > 0) {
    await db.commit.createMany({ data: rows, skipDuplicates: true });
  }
}