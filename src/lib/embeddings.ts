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

export async function embedTexts(
  texts: string[],
  taskType: "RETRIEVAL_DOCUMENT" | "RETRIEVAL_QUERY",
) {
  const out: number[][] = [];
  for (let i = 0; i < texts.length; i += 20) {
    const batch = texts.slice(i, i + 20);
    let lastError: unknown;
    let done = false;
    for (let attempt = 0; attempt < 3 && !done; attempt++) {
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
        await sleep(2000 * (attempt + 1));
      }
    }
    if (!done) throw lastError;
  }
  return out;
}