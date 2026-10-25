import "server-only";
import { randomUUID } from "node:crypto";

import { db } from "@/server/db";
import { octokit, parseGithubUrl } from "@/lib/github";
import { embedTexts, toVector } from "@/lib/embeddings";

const MAX_FILES = 300;
const OK_EXT = /\.(ts|tsx|js|jsx|mjs|py|go|rs|java|kt|rb|php|cs|cpp|c|h|swift|md|json|ya?ml|toml|sql|prisma|css|html|sh)$/i;
const SKIP = /(^|\/)(node_modules|dist|build|\.next|\.git|vendor|coverage|generated)\//;
const LOCK = /(lock\.json|lock\.yaml|\.lock|\.min\.\w+)$/;

async function listFiles(owner: string, repo: string) {
  const { data: info } = await octokit.rest.repos.get({ owner, repo });
  const { data: tree } = await octokit.rest.git.getTree({
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

async function runIndex(projectId: string) {
  const already = await db.sourceCodeEmbedding.count({ where: { projectId } });
  if (already > 0) return;

  const project = await db.project.findUnique({
    where: { id: projectId },
    select: { githubUrl: true },
  });
  if (!project) return;

  const { owner, repo } = parseGithubUrl(project.githubUrl);
  const files = await listFiles(owner, repo);

  for (let i = 0; i < files.length; i += 20) {
    const batch = files.slice(i, i + 20);
    const loaded = await Promise.all(
      batch.map(async (f) => {
        const { data } = await octokit.rest.git.getBlob({ owner, repo, file_sha: f.sha });
        return {
          fileName: f.path,
          sourceCode: Buffer.from(data.content, "base64").toString("utf8").slice(0, 30_000),
        };
      }),
    );
    const usable = loaded.filter((f) => f.sourceCode.trim().length > 0);
    if (usable.length === 0) continue;

    const vectors = await embedTexts(
      usable.map((f) => `File: ${f.fileName}\n${f.sourceCode.slice(0, 8_000)}`),
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
}

// One index run per project at a time.
const running = new Set<string>();

export async function indexRepo(projectId: string) {
  if (running.has(projectId)) return;
  running.add(projectId);
  try {
    await runIndex(projectId);
  } catch (e) {
    console.error("indexing failed", projectId, e);
    // Remove partial data so the next load starts a clean re-index.
    await db.sourceCodeEmbedding.deleteMany({ where: { projectId } }).catch(() => undefined);
  } finally {
    running.delete(projectId);
  }
}