import "server-only";

const INSTRUCTIONS = `You write release-note style summaries of a code change for a commit history page.

How to read the input:
- Lines starting with "diff --git" and "+++ b/" name the file that changed.
- Lines starting with "+" were added, lines starting with "-" were removed.
- Other lines are unchanged context.

Rules:
- Put your final answer inside <summary></summary> tags and write nothing outside them.
- Inside the tags write 3 to 5 bullets, each starting with "* ".
- Describe what changed directly, in past tense, and name the file in parentheses, e.g. "* Added a 3-step progress indicator (components/ScanProgressSteps.tsx)".
- Never mention "the diff", "this commit", yourself, or these instructions.
- The last bullet is a one-line overall summary of the change.`;

type ChatResponse = {
  choices?: { message?: { content?: string | null } }[];
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Bullets that are the model talking about its task, not about the code.
const META =
  /\b(the diff|this diff|this commit|i need to|i should|i will|let me|at most 5|bullet points?)\b/i;

function cleanSummary(raw: string) {
  const tagged =
    [...raw.matchAll(/<summary>([\s\S]*?)<\/summary>/gi)].at(-1)?.[1] ?? raw;
  const bullets = tagged
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => /^[*\-•]\s+/.test(l))
    .filter((l) => !META.test(l));
  return bullets.length >= 2 ? bullets.join("\n") : "";
}

async function requestSummary(diff: string) {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENROUTER_MODEL ?? "openrouter/free",
      max_tokens: 2000,
      temperature: 0.2,
      messages: [
        {
          role: "user",
          content: `${INSTRUCTIONS}\n\nChange:\n\n${diff.slice(0, 20_000)}`,
        },
      ],
    }),
  });

  if (!res.ok) {
    throw new Error(`OpenRouter ${res.status}: ${(await res.text()).slice(0, 200)}`);
  }

  const data = (await res.json()) as ChatResponse;
  const raw = data.choices?.[0]?.message?.content?.trim();
  if (!raw) throw new Error("OpenRouter returned an empty summary");

  const summary = cleanSummary(raw);
  if (!summary) throw new Error("OpenRouter returned an unusable summary");
  return summary;
}

// The free router picks a random model each call, so a retry often succeeds.
export async function aiSummariseCommit(diff: string) {
  let lastError: unknown;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      return await requestSummary(diff);
    } catch (e) {
      lastError = e;
      await sleep(1500 * (attempt + 1));
    }
  }
  throw lastError;
}