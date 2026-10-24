import "server-only";

const INSTRUCTIONS = `You are a senior engineer summarizing a git diff for a commit history page.

How to read the diff:
- Lines starting with "diff --git" and "+++ b/" name the file that changed.
- Lines starting with "+" were added, lines starting with "-" were removed.
- Other lines are unchanged context and are not part of the change.

Output rules:
- Write at most 5 short bullet points, each starting with "* ".
- Say what changed and name the file in parentheses, e.g. "* Fixed the redirect loop on login (routes/auth.ts)".
- The last bullet must be a one-line overall summary of the commit.
- Do not add anything before or after the bullets.`;

type ChatResponse = {
  choices?: { message?: { content?: string | null } }[];
};

export async function aiSummariseCommit(diff: string) {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENROUTER_MODEL ?? "openrouter/free",
      max_tokens: 400,
      temperature: 0.2,
      messages: [
        {
          role: "user",
          content: `${INSTRUCTIONS}\n\nDiff:\n\n${diff.slice(0, 20_000)}`,
        },
      ],
    }),
  });

  if (!res.ok) {
    throw new Error(`OpenRouter ${res.status}: ${(await res.text()).slice(0, 200)}`);
  }

  const data = (await res.json()) as ChatResponse;
  const text = data.choices?.[0]?.message?.content?.trim();
  if (!text) throw new Error("OpenRouter returned an empty summary");
  return text;
}