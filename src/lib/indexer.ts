import "server-only";
import { randomUUID } from "node:crypto";
import { Octokit } from "@octokit/rest";

import { db } from "@/server/db";
import { octokit, parseGithubUrl } from "@/lib/github";
import { embedTexts, toVector } from "@/lib/embeddings";

const MAX_FILES = 120;
const EMBED_CHARS = 3_000; // how much of each file is embedded
const OK_EXT = /\.(ts|tsx|js|jsx|mjs|py|go|rs|java|kt|rb|php|cs|cpp|c|h|swift|md|json|ya?ml|toml|sql|prisma|css|html|sh)$/i;
const SKIP = /(^|\/)(node_modules|dist|build|\.next|\.git|vendor|coverage|generated)\//;
const LOCK = /(lock\.json|lock\.yaml|\.lock|\.min\.\w+)$/;

async function listFiles(owner: string, repo: string, client: Octokit = octokit) {
  const { data: info } = await client.rest.repos.get({ owner, repo });
  const { data: tree } = await client.rest.git.getTree({
    owner,
    repo,
    tree_sha: info.default_branch,
    recursive: "true",
  });
  return tree.tree
    .filter(
      (f) =>
        f.type === "blob" &&
        !!f.path &&
        !!f.sha &&
        (f.size ?? 0) < 100_000 &&
        OK_EXT.test(f.path) &&
        !SKIP.test(f.path) &&
        !LOCK.test(f.path),
    )
    .slice(0, MAX_FILES) as { path: string; sha: string }[];
}

// Projects fully indexed since the server started.
const completed = new Set<string>();

async function runIndex(projectId: string) {
  if (completed.has(projectId)) return;

  // Drop half-written rows (no vector yet) left by an interrupted run.
  await db.$executeRaw`DELETE FROM "SourceCodeEmbedding" WHERE "projectId" = ${projectId} AND embedding IS NULL`;

  const project = await db.project.findUnique({
    where: { id: projectId },
    select: { githubUrl: true, githubToken: true },
  });
  if (!project) return;

  const client = project.githubToken ? new Octokit({ auth: project.githubToken }) : octokit;
  const { owner, repo } = parseGithubUrl(project.githubUrl);
  const files = await listFiles(owner, repo, client);

  // Resume: only index files that don't have a vector yet.
  const existing = await db.sourceCodeEmbedding.findMany({
    where: { projectId },
    select: { fileName: true },
  });
  const have = new Set(existing.map((e) => e.fileName));
  const todo = files.filter((f) => !have.has(f.path));

  for (let i = 0; i < todo.length; i += 10) {
    const batch = todo.slice(i, i + 10);
    const loaded = await Promise.all(
      batch.map(async (f) => {
        const { data } = await client.rest.git.getBlob({ owner, repo, file_sha: f.sha });
        return {
          fileName: f.path,
          sourceCode: Buffer.from(data.content, "base64").toString("utf8").slice(0, 30_000),
        };
      }),
    );
    const usable = loaded.filter((f) => f.sourceCode.trim().length > 0);
    if (usable.length === 0) continue;

    const vectors = await embedTexts(
      usable.map((f) => `File: ${f.fileName}\n${f.sourceCode.slice(0, EMBED_CHARS)}`),
      "RETRIEVAL_DOCUMENT",
    );

    const rows = usable.map((f) => ({ id: randomUUID(), projectId, ...f }));
    await db.sourceCodeEmbedding.createMany({ data: rows });
    for (let j = 0; j < rows.length; j++) {
      const v = vectors[j];
      if (!v) continue;
      await db.$executeRaw`UPDATE "SourceCodeEmbedding" SET embedding = ${toVector(v)}::vector WHERE id = ${rows[j]!.id}`;
    }
  }

  completed.add(projectId);
}

// One index run per project at a time.
const running = new Set<string>();

export async function indexRepo(projectId: string) {
  if (running.has(projectId)) return;
  running.add(projectId);
  try {
    await runIndex(projectId);
  } catch (e) {
    // Keep finished files. The next dashboard load resumes from here.
    console.error("indexing failed", projectId, e);
  } finally {
    running.delete(projectId);
  }
}