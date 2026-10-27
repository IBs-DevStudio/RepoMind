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

async function getLatestCommits(owner: string, repo: string, client: Octokit = octokit) {
  const { data } = await client.rest.repos.listCommits({
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

async function summarizeCommit(owner: string, repo: string, sha: string, client: Octokit = octokit) {
  const res = await client.request("GET /repos/{owner}/{repo}/commits/{ref}", {
    owner,
    repo,
    ref: sha,
    headers: { accept: "application/vnd.github.diff" },
  });
  return aiSummariseCommit(String(res.data));
}

async function runPoll(projectId: string) {
  const project = await db.project.findUnique({
    where: { id: projectId },
    select: { githubUrl: true, githubToken: true },
  });
  if (!project) throw new Error("Project not found");

  const client = project.githubToken ? new Octokit({ auth: project.githubToken }) : octokit;
  const { owner, repo } = parseGithubUrl(project.githubUrl);
  const latest = await getLatestCommits(owner, repo, client);

  const existing = await db.commit.findMany({
    where: { projectId, commitHash: { in: latest.map((c) => c.commitHash) } },
    select: { commitHash: true },
  });
  const seen = new Set(existing.map((e) => e.commitHash));
  const fresh = latest.filter((c) => !seen.has(c.commitHash));

  // Free models are rate limited, so summarize one commit at a time and save
  // each one right away. Commits that fail are retried on the next poll.
  for (const c of fresh) {
    try {
      const summary = await summarizeCommit(owner, repo, c.commitHash);
      await db.commit.createMany({
        data: [
          {
            projectId,
            commitHash: c.commitHash,
            commitMessage: c.commitMessage,
            commitAuthorName: c.commitAuthorName,
            commitAuthorAvatar: c.commitAuthorAvatar,
            commitDate: new Date(c.commitDate),
            summary,
          },
        ],
        skipDuplicates: true,
      });
    } catch (e) {
      console.error("commit summary failed", c.commitHash, e);
    }
  }
}

// Only one poll per project at a time, so overlapping page loads
// don't multiply the requests to the free models.
const running = new Set<string>();

export async function pollCommits(projectId: string) {
  if (running.has(projectId)) return;
  running.add(projectId);
  try {
    await runPoll(projectId);
  } finally {
    running.delete(projectId);
  }
}