import { auth } from "@clerk/nextjs/server";

import { embedTexts, toVector } from "@/lib/embeddings";
import { db } from "@/server/db";

export const maxDuration = 60;

type FileRef = { fileName: string; sourceCode: string };

async function* streamTokens(body: ReadableStream<Uint8Array>) {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      const data = line.slice(6).trim();
      if (data === "[DONE]") return;
      try {
        const json = JSON.parse(data) as {
          choices?: { delta?: { content?: string | null } }[];
        };
        const text = json.choices?.[0]?.delta?.content;
        if (text) yield text;
      } catch {
        // ignore keep-alive or partial lines
      }
    }
  }
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const body = (await req.json()) as { projectId?: string; question?: string };
  const projectId = body.projectId;
  const question = body.question?.trim();
  if (!projectId || !question) return new Response("Bad request", { status: 400 });

  const member = await db.projectMember.findUnique({
    where: { userId_projectId: { userId, projectId } },
  });
  if (!member) return new Response("Forbidden", { status: 403 });

  const [qv] = await embedTexts([question], "RETRIEVAL_QUERY");
  if (!qv) return new Response("Embedding failed", { status: 500 });
  const vec = toVector(qv);

  const files = await db.$queryRaw<FileRef[]>`
    SELECT "fileName", "sourceCode"
    FROM "SourceCodeEmbedding"
    WHERE "projectId" = ${projectId} AND embedding IS NOT NULL
    ORDER BY embedding <=> ${vec}::vector
    LIMIT 8`;

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (o: unknown) =>
        controller.enqueue(encoder.encode(JSON.stringify(o) + "\n"));

      try {
        send({ type: "files", files });

        if (files.length === 0) {
          send({
            type: "delta",
            text: "This repository is still being indexed. Try again in a minute or two.",
          });
          return;
        }

        const context = files
          .map((f) => `FILE: ${f.fileName}\n${f.sourceCode.slice(0, 6_000)}`)
          .join("\n\n---\n\n");

        const upstream = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: process.env.OPENROUTER_MODEL ?? "openrouter/free",
            stream: true,
            max_tokens: 3000,
            temperature: 0.2,
            messages: [
              {
                role: "user",
                content: `You are a code assistant answering questions about a codebase for a technical intern.
Use only the code context below. If it does not contain the answer, say "I'm sorry, but I don't know the answer to that."
Do not invent files or code. Name the files you rely on. Answer in markdown, with short code snippets if useful. Be concise.

CONTEXT:
${context}

QUESTION:
${question}`,
              },
            ],
          }),
        });

        if (!upstream.ok || !upstream.body) {
          send({ type: "error", message: `Model error ${upstream.status}. Please try again.` });
          return;
        }

        let received = 0;
        for await (const text of streamTokens(upstream.body)) {
          received++;
          send({ type: "delta", text });
        }
        if (received === 0) {
          send({ type: "error", message: "The model returned no answer. Please try again." });
        }
      } catch (e) {
        console.error("ask failed", e);
        send({ type: "error", message: "Something went wrong. Please try again." });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });
}