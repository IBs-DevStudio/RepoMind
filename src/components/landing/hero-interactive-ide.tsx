"use client";

import React, { useState } from "react";
import {
  Bot,
  Check,
  Copy,
  FileCode2,
  GitBranch,
  GitCommit,
  Headphones,
  Play,
  Sparkles,
} from "lucide-react";
import { GitHubIcon } from "@/components/landing/ui-mockups";

export function HeroInteractiveIDE() {
  const [activeTab, setActiveTab] = useState<"copilot" | "commits" | "meetings">("copilot");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative mx-auto w-full max-w-5xl rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white shadow-2xl">
      {/* Soft Indigo Glow behind */}
      <div className="pointer-events-none absolute -inset-3 rounded-3xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-violet-500/10 blur-2xl -z-10" />

      <div className="overflow-hidden rounded-2xl sm:rounded-3xl text-slate-900">
        {/* Window Chrome / Titlebar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50/90 px-4 py-3 sm:px-6">
          {/* Traffic Lights */}
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-red-400 shadow-xs" />
            <span className="size-3 rounded-full bg-amber-400 shadow-xs" />
            <span className="size-3 rounded-full bg-emerald-400 shadow-xs" />

            <div className="ml-3 hidden sm:flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-mono text-slate-600 shadow-2xs">
              <GitHubIcon className="size-3.5 text-slate-700" />
              <span className="text-slate-900 font-semibold">acme-corp</span>
              <span className="text-slate-400">/</span>
              <span className="text-indigo-600 font-semibold">api-core</span>
              <span className="text-slate-400">&bull;</span>
              <span className="flex items-center gap-1 text-[11px] text-slate-600">
                <GitBranch className="size-3 text-indigo-600" /> main
              </span>
            </div>
          </div>

          {/* Interactive Mode Tabs */}
          <div className="flex items-center rounded-xl border border-slate-200 bg-white p-1 shadow-2xs">
            <button
              onClick={() => setActiveTab("copilot")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                activeTab === "copilot"
                  ? "bg-indigo-600 text-white shadow-xs font-semibold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Bot className="size-3.5" />
              <span>Ask Code</span>
            </button>
            <button
              onClick={() => setActiveTab("commits")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                activeTab === "commits"
                  ? "bg-indigo-600 text-white shadow-xs font-semibold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <GitCommit className="size-3.5" />
              <span>Commit Memory</span>
            </button>
            <button
              onClick={() => setActiveTab("meetings")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                activeTab === "meetings"
                  ? "bg-indigo-600 text-white shadow-xs font-semibold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Headphones className="size-3.5" />
              <span>Meeting Audio</span>
            </button>
          </div>

          {/* Status Badge */}
          <div className="hidden lg:flex items-center gap-2 text-xs font-mono">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate-500">pgvector:</span>
            <span className="text-emerald-700 font-semibold">142 files indexed</span>
          </div>
        </div>

        {/* Tab 1: Codebase Copilot (Q&A with verifiable file citations) */}
        {activeTab === "copilot" && (
          <div className="p-5 sm:p-7 space-y-5 animate-in fade-in duration-200">
            {/* Question Bar */}
            <div className="rounded-2xl border border-indigo-200/90 bg-indigo-50/60 p-4 sm:p-5 relative overflow-hidden shadow-2xs">
              <div className="flex items-start gap-3.5">
                <div className="flex size-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/25 flex-none">
                  <Sparkles className="size-4.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-indigo-700">
                      Querying Repository Vector Index
                    </span>
                    <span className="rounded-full bg-indigo-100 border border-indigo-200 px-2 py-0.2 text-[10px] font-mono text-indigo-800 font-semibold">
                      cosine: 0.94
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-medium text-slate-950 mt-1">
                    &ldquo;Where are Stripe webhook idempotency keys handled in the billing pipeline?&rdquo;
                  </h4>
                </div>
              </div>
            </div>

            {/* AI Synthesized Answer with exact citations */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2 text-xs">
                  <Bot className="size-4 text-indigo-600" />
                  <span className="font-semibold text-slate-900">Engram Synthesized Answer</span>
                  <span className="text-slate-300">&bull;</span>
                  <span className="text-slate-500 font-mono text-[11px]">retrieved from 2 source files</span>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-600 hover:text-slate-900 transition-colors cursor-pointer shadow-2xs"
                >
                  {copied ? <Check className="size-3 text-emerald-600" /> : <Copy className="size-3" />}
                  <span>{copied ? "Copied" : "Copy citation"}</span>
                </button>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed">
                Stripe webhook idempotency is handled directly in <code className="text-indigo-700 bg-indigo-100/70 px-1.5 py-0.5 rounded font-mono text-xs font-semibold">src/app/api/webhook/stripe/route.ts</code>. Before adding credits, the endpoint queries <code className="text-violet-700 bg-violet-100/70 px-1.5 py-0.5 rounded font-mono text-xs font-semibold">db.creditEntry</code> using the unique <code className="text-slate-900 font-mono text-xs font-medium">stripeSessionId</code> to prevent double-crediting duplicate webhook payloads.
              </p>

              {/* Developer Syntax Highlighted Code Box */}
              <div className="rounded-xl border border-slate-800 bg-[#0d1117] text-slate-100 overflow-hidden font-mono text-xs shadow-md">
                <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/80 px-3.5 py-2 text-[11px]">
                  <div className="flex items-center gap-2 text-indigo-400">
                    <FileCode2 className="size-3.5 text-indigo-400" />
                    <span className="font-semibold">src/app/api/webhook/stripe/route.ts</span>
                    <span className="text-slate-400">Lines 24-38</span>
                  </div>
                  <span className="text-slate-400 text-[10px]">TypeScript</span>
                </div>
                <div className="p-4 space-y-1 text-slate-300 overflow-x-auto leading-relaxed">
                  <div className="text-slate-500">&#47;&#47; Verify session idempotency to prevent duplicate grants</div>
                  <div>
                    <span className="text-purple-400 font-semibold">const</span> session = <span className="text-cyan-400 font-semibold">await</span> db.creditEntry.<span className="text-amber-300">findUnique</span>(&#123;
                  </div>
                  <div className="pl-4">
                    where: &#123; stripeSessionId: event.data.object.id &#125;,
                  </div>
                  <div>&#125;);</div>
                  <div className="pt-1">
                    <span className="text-purple-400 font-semibold">if</span> (session) &#123;
                  </div>
                  <div className="pl-4 text-emerald-300">
                    <span className="text-purple-400 font-semibold">return</span> NextResponse.json(&#123; received: <span className="text-amber-300">true</span>, duplicate: <span className="text-amber-300">true</span> &#125;);
                  </div>
                  <div>&#125;</div>
                </div>
              </div>

              {/* Cited Files Footer */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200">
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500">
                  Source Citations:
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-200 bg-indigo-50 px-2.5 py-1 text-xs font-mono text-indigo-700 font-medium">
                  <FileCode2 className="size-3 text-indigo-600" />
                  <span>src/app/api/webhook/stripe/route.ts</span>
                  <span className="text-slate-500 text-[10px]">(L24-38)</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-mono text-slate-700 shadow-2xs">
                  <FileCode2 className="size-3 text-violet-600" />
                  <span>src/lib/credits.ts</span>
                  <span className="text-slate-500 text-[10px]">(L12-19)</span>
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Commit Memory */}
        {activeTab === "commits" && (
          <div className="p-5 sm:p-7 space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <GitCommit className="size-4 text-violet-600" />
                <span className="text-sm font-semibold text-slate-900">Automated Commit Summaries</span>
              </div>
              <span className="rounded-full bg-violet-50 border border-violet-200 px-2.5 py-0.5 text-xs font-mono text-violet-700 font-semibold">
                GitHub Webhook Synced
              </span>
            </div>

            <div className="space-y-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">
                      7a3f89c
                    </span>
                    <span className="text-sm font-semibold text-slate-900">
                      feat: add pgvector cosine distance embeddings for code search
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-500">2 hours ago</span>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-700 space-y-1.5 leading-relaxed shadow-2xs">
                  <p className="font-semibold text-indigo-700 flex items-center gap-1.5">
                    <Sparkles className="size-3 text-indigo-600" />
                    AI Commit Summary:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
                    <li>Added 768-dimension vector column to Prisma schema with pgvector extension</li>
                    <li>Created automated batch indexing job with 1 credit per source file metering</li>
                    <li>Integrated cosine similarity query helper with fallback threshold</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-violet-700 bg-violet-100 px-2 py-0.5 rounded">
                      e4b9012
                    </span>
                    <span className="text-sm font-semibold text-slate-900">
                      refactor: fine-grained GitHub PAT encryption per project
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-500">yesterday</span>
                </div>
                <p className="text-xs text-slate-600 pl-1 leading-relaxed">
                  Enables repository owners to store personal access tokens securely in Postgres to index private repositories without rate limit throttling.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Meeting Audio */}
        {activeTab === "meetings" && (
          <div className="p-5 sm:p-7 space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <Headphones className="size-4 text-emerald-600" />
                <span className="text-sm font-semibold text-slate-900">Meeting Audio to Action Items</span>
              </div>
              <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-xs font-mono text-emerald-700 font-semibold">
                AssemblyAI + Gemini
              </span>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Architecture Sprint &bull; Q3 Vector Strategy.mp3</h4>
                  <p className="text-xs text-slate-500 mt-0.5">38 mins audio &bull; Transcribed &amp; indexed</p>
                </div>
                <span className="rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs px-2.5 py-1 font-mono font-semibold">
                  Processed
                </span>
              </div>

              {/* Audio Waveform Simulator */}
              <div className="rounded-xl border border-slate-200 bg-white p-3 flex items-center gap-3 shadow-2xs">
                <button className="size-8 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-none hover:bg-emerald-700 transition-colors cursor-pointer shadow-xs">
                  <Play className="size-3.5 fill-white ml-0.5" />
                </button>
                <div className="flex-1 flex items-center gap-1 h-6">
                  {[40, 65, 80, 45, 90, 75, 50, 100, 60, 40, 85, 95, 70, 50, 30, 75, 90, 60, 40, 70, 85, 45, 30, 95, 80, 60, 40].map((h, i) => (
                    <span
                      key={i}
                      style={{ height: `${h}%` }}
                      className={`flex-1 rounded-full ${i < 12 ? "bg-emerald-500" : "bg-slate-200"}`}
                    />
                  ))}
                </div>
                <span className="text-xs font-mono text-slate-500">14:22 / 38:00</span>
              </div>

              {/* Timestamped Action Items */}
              <div className="space-y-2 pt-1">
                <div className="rounded-xl border border-slate-200 bg-white p-3 text-xs space-y-1 shadow-2xs">
                  <div className="flex items-center justify-between text-emerald-700 font-mono text-[11px] font-semibold">
                    <span>08:24 &bull; Chapter: Vector Embedding Strategy</span>
                    <span className="text-slate-400 font-normal">Decision</span>
                  </div>
                  <p className="text-slate-600">
                    Team agreed to embed the first 3,000 characters of each source file with Gemini embeddings and store directly in pgvector.
                  </p>
                </div>

                <div className="rounded-xl border border-indigo-200 bg-indigo-50/70 p-3 text-xs space-y-1 shadow-2xs">
                  <div className="flex items-center justify-between text-indigo-800 font-mono text-[11px]">
                    <span className="font-semibold">18:40 &bull; Generated Action Issue #4</span>
                    <span className="text-indigo-700 font-bold">Created</span>
                  </div>
                  <p className="text-slate-900 font-medium">
                    Enforce max 120 files indexing threshold to respect project credit limits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
