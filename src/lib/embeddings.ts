import "server-only";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// 768-dim output isn't pre-normalized, so normalize it ourselves.
const normalize = (v: number[]) => {
  const n = Math.sqrt(v.reduce((s, x) => s + x * x, 0)) || 1;
  return v.map((x) => x / n);
};

export const toVector = (v: number[]) => `[${v.join(",")}]`;

// Free tier allows 30,000 embedding tokens per minute. Stay under it.
// If your key has a higher quota, set EMBED_TOKENS_PER_MINUTE in .env.
const TOKENS_PER_MINUTE = Number(process.env.EMBED_TOKENS_PER_MINUTE ?? 25_000);
let windowStart = Date.now();
let used = 0;

async function reserve(tokens: number) {
  const now = Date.now();
  if (now - windowStart >= 60_000) {
    windowStart = now;
    used = 0;
  }
  if (used + tokens > TOKENS_PER_MINUTE) {
    await sleep(windowStart + 60_000 - now + 1_000);
    windowStart = Date.now();
    used = 0;
  }
  used += tokens;
}

export async function embedTexts(
  texts: string[],
  taskType: "RETRIEVAL_DOCUMENT" | "RETRIEVAL_QUERY",
) {
  const out: number[][] = [];
  for (let i = 0; i < texts.length; i += 10) {
    const batch = texts.slice(i, i + 10);

    // Only bulk indexing is paced. A single question is tiny.
    if (taskType === "RETRIEVAL_DOCUMENT") {
      await reserve(batch.reduce((s, t) => s + Math.ceil(t.length / 3.5), 0));
    }

    let lastError: unknown;
    let done = false;
    for (let attempt = 0; attempt < 4 && !done; attempt++) {
      try {
        const res = await ai.models.embedContent({
          model: "gemini-embedding-001",
          contents: batch,
          config: { outputDimensionality: 768, taskType },
        });
        const vectors = (res.embeddings ?? []).map((e) => normalize(e.values ?? []));
        if (vectors.length !== batch.length) throw new Error("Embedding count mismatch");
        out.push(...vectors);
        done = true;
      } catch (e) {
        lastError = e;
        await sleep(15_000 * (attempt + 1));
      }
    }
    if (!done) throw lastError;
  }
  return out;
}