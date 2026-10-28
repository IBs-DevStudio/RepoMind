import React from "react";
import {
  Bot,
  Copy,
  FileCode2,
  FolderGit2,
  GitBranch,
  GitCommit,
  Headphones,
  MessageSquare,
  Play,
  Sparkles,
  Users,
} from "lucide-react";

// Inline GitHub SVG as required (no brand icons package)
export function GitHubIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

// 1. Dashboard Mockup (Hero fallback if screenshot not present)
export function DashboardMockup() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white text-slate-900 shadow-2xl backdrop-blur-xl">
      {/* Window Titlebar */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/90 px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-red-400" />
          <span className="size-2.5 rounded-full bg-amber-400" />
          <span className="size-2.5 rounded-full bg-emerald-400" />
        </div>
        <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-0.5 text-[11px] font-mono text-slate-600 shadow-2xs">
          <GitHubIcon className="size-3 text-slate-600" />
          <span>acme-corp / api-core</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-medium hidden sm:inline">150 credits</span>
        </div>
      </div>

      <div className="p-4 sm:p-5 space-y-4">
        {/* Repo Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-gradient-to-r from-indigo-50/70 via-white to-indigo-50/40 p-3.5">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-200">
              <FolderGit2 className="size-4.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold font-brand tracking-tight text-slate-900">acme-corp / api-core</span>
                <span className="rounded-full bg-emerald-100 border border-emerald-200 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">
                  Synced
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-mono flex items-center gap-1 mt-0.5">
                <GitBranch className="size-3 text-indigo-600" />
                main &bull; 142 files indexed
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex -space-x-1.5">
              <span className="size-6 rounded-full bg-indigo-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                JD
              </span>
              <span className="size-6 rounded-full bg-violet-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                AK
              </span>
              <span className="size-6 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                +3
              </span>
            </div>
          </div>
        </div>

        {/* Ask Question Card */}
        <div className="rounded-xl border border-indigo-200 bg-indigo-50/60 p-4 shadow-sm relative overflow-hidden">
          <div className="flex items-start gap-3">
            <div className="flex size-8 rounded-lg bg-indigo-100 text-indigo-700 items-center justify-center flex-none">
              <Sparkles className="size-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-indigo-700 uppercase tracking-wider font-mono">
                Ask Your Codebase Copilot
              </p>
              <p className="text-sm font-medium mt-1 text-slate-900">
                &ldquo;Where are Stripe webhook idempotency keys handled in the billing pipeline?&rdquo;
              </p>
            </div>
          </div>

          {/* AI Response Preview */}
          <div className="mt-3 rounded-lg border border-slate-200 bg-white p-3 text-xs leading-relaxed text-slate-700 shadow-2xs">
            <p className="text-slate-900 font-medium mb-1.5">
              Idempotency checks occur inside the Stripe webhook handler before credit entries are appended:
            </p>
            <div className="rounded-md bg-slate-50 border border-slate-200 p-2 font-mono text-[11px] text-slate-800">
              <span className="text-indigo-600 font-semibold">const</span> session = <span className="text-indigo-600 font-semibold">await</span> db.creditEntry.findUnique(&#123; where: &#123; stripeSessionId &#125; &#125;);
            </div>
            {/* Cited files */}
            <div className="mt-2.5 flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider font-mono">Citations:</span>
              <span className="inline-flex items-center gap-1 rounded bg-indigo-50 border border-indigo-200 px-2 py-0.5 text-[10px] font-mono font-medium text-indigo-700">
                <FileCode2 className="size-2.5" />
                src/app/api/webhook/stripe/route.ts : L24-48
              </span>
              <span className="inline-flex items-center gap-1 rounded bg-slate-50 border border-slate-200 px-2 py-0.5 text-[10px] font-mono text-slate-600">
                <FileCode2 className="size-2.5" />
                src/lib/credits.ts : L12
              </span>
            </div>
          </div>
        </div>

        {/* Recent Commit AI Summary Preview */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <GitCommit className="size-4 text-violet-600 flex-none" />
            <div className="min-w-0">
              <p className="font-medium text-slate-900 truncate">
                feat: add pgvector cosine distance embeddings for code search
              </p>
              <p className="text-[11px] text-slate-500">
                AI Summary: Configured 768-dim vector embeddings and automated batch indexing.
              </p>
            </div>
          </div>
          <span className="font-mono text-[10px] text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded flex-none hidden sm:inline">
            7a3f89c
          </span>
        </div>
      </div>
    </div>
  );
}

// 2. Q&A Mockup
export function QaMockup() {
  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-3.5 sm:p-5 shadow-lg space-y-3.5 text-slate-900 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Bot className="size-4 text-indigo-600 flex-none" />
          <span className="text-xs font-semibold font-brand text-slate-900">Codebase Q&amp;A Intelligence</span>
        </div>
        <span className="text-[10px] font-mono bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full font-medium border border-indigo-200 flex-none">
          pgvector Retrieval
        </span>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3 space-y-2">
        <div className="flex items-start gap-2 text-xs font-medium text-slate-900">
          <span className="size-2 rounded-full bg-indigo-600 flex-none mt-1" />
          <span className="leading-snug">&ldquo;How does the project membership role check work?&rdquo;</span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          The application uses composite keys <code className="text-indigo-700 font-mono bg-indigo-100/70 px-1 py-0.5 rounded">[userId, projectId]</code> in Prisma. Owner permissions are verified before allowing project archiving, deletion, or team removals.
        </p>
      </div>

      {/* Code reference pill stack */}
      <div className="space-y-1.5 pt-1">
        <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider font-mono">
          Referenced Source Code
        </p>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-2.5 font-mono text-[11px] space-y-1 text-slate-800 overflow-x-auto touch-pan-x">
          <div className="flex flex-wrap items-center justify-between gap-1 text-slate-500 border-b border-slate-200 pb-1 mb-1">
            <span className="text-indigo-600 font-medium truncate max-w-[190px]">src/server/api/routers/project.ts</span>
            <span className="text-[10px]">Lines 260-272</span>
          </div>
          <p>
            <span className="text-indigo-600 font-semibold">if</span> (member.role !== <span className="text-emerald-600">&quot;OWNER&quot;</span>) &#123;
          </p>
          <p className="pl-3">
            <span className="text-indigo-600 font-semibold">throw new</span> TRPCError(&#123; code: <span className="text-emerald-600">&quot;FORBIDDEN&quot;</span> &#125;);
          </p>
          <p>&#125;</p>
        </div>
      </div>
    </div>
  );
}

// 3. Commits Mockup
export function CommitsMockup() {
  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-3.5 sm:p-5 shadow-lg space-y-3.5 text-slate-900 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <GitCommit className="size-4 text-violet-600 flex-none" />
          <span className="text-xs font-semibold font-brand text-slate-900">Automated Commit Summaries</span>
        </div>
        <span className="text-[10px] font-mono bg-violet-50 text-violet-700 px-2 py-0.5 rounded-full font-medium border border-violet-200 flex-none">
          GitHub Synced
        </span>
      </div>

      <div className="space-y-3">
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-bold text-slate-900 truncate">feat: billing checkout &amp; webhook credits</p>
            <span className="text-[10px] font-mono text-slate-500 flex-none">today</span>
          </div>
          <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
            <li>Integrated Stripe Checkout sessions for one-time credit top-ups</li>
            <li>Stored <code className="font-mono text-indigo-600">stripeSessionId</code> on <code className="font-mono text-indigo-600">CreditEntry</code> to prevent duplicate grants</li>
            <li>Real-time client balance refetch upon payment completion</li>
          </ul>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-bold text-slate-900 truncate">refactor: per-project token authentication</p>
            <span className="text-[10px] font-mono text-slate-500 flex-none">yesterday</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Allows repository owners to provide fine-grained GitHub PATs for private repos and 5,000 req/hr rate limits.
          </p>
        </div>
      </div>
    </div>
  );
}

// 4. Meetings Mockup
export function MeetingsMockup() {
  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-3.5 sm:p-5 shadow-lg space-y-3.5 text-slate-900 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Headphones className="size-4 text-emerald-600 flex-none" />
          <span className="text-xs font-semibold font-brand text-slate-900">Meeting Audio Intelligence</span>
        </div>
        <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-medium border border-emerald-200 flex-none">
          AssemblyAI + Gemini
        </span>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs font-semibold text-slate-900 truncate">Architecture Sprint Discussion.mp3</span>
          <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded flex-none">
            Processed
          </span>
        </div>

        <div className="space-y-2">
          <div className="rounded-lg border border-slate-200 bg-white p-2 text-xs">
            <div className="flex items-center gap-2 font-mono text-[10px] text-emerald-700">
              <Play className="size-2.5 fill-emerald-600 flex-none" />
              <span>08:24 &bull; Chapter: Vector Embedding Strategy</span>
            </div>
            <p className="mt-1 text-slate-600 leading-relaxed">
              Team agreed to embed the first 3,000 characters of each source file with Gemini embeddings and pgvector.
            </p>
          </div>

          <div className="rounded-lg border border-indigo-200 bg-indigo-50/70 p-2 text-xs">
            <div className="flex items-center gap-2 font-mono text-[10px] text-indigo-700">
              <Play className="size-2.5 fill-indigo-600 flex-none" />
              <span>18:40 &bull; Action Issue Created</span>
            </div>
            <p className="mt-1 font-medium text-slate-900 leading-relaxed">
              Issue #4: Enforce max 120 files indexing threshold to respect API credits
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 5. Team Knowledge Mockup
export function TeamKnowledgeMockup() {
  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-3.5 sm:p-5 shadow-lg space-y-3.5 text-slate-900 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Users className="size-4 text-indigo-600 flex-none" />
          <span className="text-xs font-semibold font-brand text-slate-900">Shared Team Workspace</span>
        </div>
        <span className="text-[10px] font-mono bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full font-medium border border-indigo-200 flex-none">
          Owner &bull; Member Roles
        </span>
      </div>

      {/* Shareable Invite Pill */}
      <div className="rounded-xl border border-indigo-200 bg-indigo-50/60 p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="min-w-0">
          <p className="text-xs font-bold text-slate-900">Shareable Project Invite</p>
          <p className="text-[11px] text-slate-600 leading-snug">Anyone with this link joins the repository workspace instantly</p>
        </div>
        <div className="flex items-center justify-between gap-2 bg-white border border-slate-200 px-2.5 py-1 rounded-md text-xs font-mono text-slate-600 shadow-2xs self-start sm:self-auto shrink-0">
          <span className="truncate max-w-[140px]">/join/cmvmc...</span>
          <Copy className="size-3 text-indigo-600 flex-none" />
        </div>
      </div>

      {/* Saved Team Questions Stack */}
      <div className="space-y-2 pt-1">
        <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider font-mono">
          Saved Questions Archive
        </p>

        <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-2.5 flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <MessageSquare className="size-3.5 text-indigo-600 flex-none" />
            <div className="min-w-0">
              <p className="font-medium text-slate-900 truncate">How do background webhooks handle retries?</p>
              <p className="text-[10px] text-slate-500">Asked by Alex &bull; 3 code citations</p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200 flex-none">
            Verified
          </span>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-2.5 flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <MessageSquare className="size-3.5 text-violet-600 flex-none" />
            <div className="min-w-0">
              <p className="font-medium text-slate-900 truncate">Where is the Gemini embedding vector dimension configured?</p>
              <p className="text-[10px] text-slate-500">Asked by Sarah &bull; 2 code citations</p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200 flex-none">
            Verified
          </span>
        </div>
      </div>
    </div>
  );
}
