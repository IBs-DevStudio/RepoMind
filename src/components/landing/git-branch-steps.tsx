"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Bot,
  Check,
  CheckCircle2,
  Database,
  FileCode2,
  FolderGit2,
  Users,
} from "lucide-react";

interface StepData {
  id: string;
  number: string;
  tabLabel: string;
  title: string;
  description: string;
  bullets: string[];
}

const STEPS: StepData[] = [
  {
    id: "step-1",
    number: "01",
    tabLabel: "Paste GitHub URL",
    title: "Paste any GitHub repository URL",
    description:
      "Link public or private repositories in seconds. Add an optional Personal Access Token (classic or fine-grained) to bypass rate limits and index private repos with encrypted storage.",
    bullets: [
      "Instant repository tree scanning & file discovery",
      "Automatic filtering of lockfiles, minified files, and blobs",
      "Exact file count and credit calculation upfront",
    ],
  },
  {
    id: "step-2",
    number: "02",
    tabLabel: "pgvector Indexing",
    title: "Engram indexes your codebase with pgvector",
    description:
      "Source code files are parsed, chunked, and converted into 768-dimensional vector embeddings stored directly in PostgreSQL with pgvector cosine similarity indexes.",
    bullets: [
      "Supports TypeScript, JavaScript, Python, Go, Rust, Java & 20+ langs",
      "768-dim vector representations for semantic understanding",
      "Instant resume if network connection is interrupted",
    ],
  },
  {
    id: "step-3",
    number: "03",
    tabLabel: "Ask & Remember",
    title: "Ask anything & preserve team memory forever",
    description:
      "Query your codebase copilot in plain English. Every generated answer cites exact source files and line ranges with syntax highlighting, automatically saved to your team's knowledge archive.",
    bullets: [
      "Verifiable file citations with syntax-highlighted code blocks",
      "AI commit summaries and meeting audio action items",
      "Permanent Q&A archive so teammates never re-ask solved problems",
    ],
  },
];

export function GitBranchSteps() {
  const [activeStep, setActiveStep] = useState(0);

  const currentStep: StepData = (STEPS[activeStep] ?? STEPS[0])!;

  return (
    <div className="mx-auto max-w-5xl py-4">
      {/* 1. Step Navigation Tabs (Step 01 active by default, clean borders, no floating lines) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {STEPS.map((step, idx) => {
          const isActive = activeStep === idx;
          return (
            <button
              key={step.id}
              onClick={() => setActiveStep(idx)}
              className={`group text-left rounded-2xl p-4 sm:p-5 border-2 transition-all duration-200 cursor-pointer touch-friendly active:scale-[0.99] ${
                isActive
                  ? "bg-white border-indigo-600 shadow-md shadow-indigo-500/10 ring-1 ring-indigo-600/30"
                  : "bg-slate-50/80 border-slate-200 hover:border-slate-300 hover:bg-white"
              }`}
            >
              <div className="flex items-center justify-between mb-2 sm:mb-2.5">
                <span
                  className={`text-xs font-mono font-bold uppercase tracking-wider rounded-md px-2 py-0.5 transition-colors ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                      : "bg-slate-200/70 text-slate-600"
                  }`}
                >
                  Step {step.number}
                </span>
                <span
                  className={`size-2.5 rounded-full transition-colors ${
                    isActive ? "bg-indigo-600 animate-pulse" : "bg-slate-300"
                  }`}
                />
              </div>

              <h4 className={`text-sm sm:text-base font-bold font-brand transition-colors ${
                isActive ? "text-slate-950" : "text-slate-700 group-hover:text-slate-900"
              }`}>
                {step.tabLabel}
              </h4>

              <p className="mt-1 text-xs text-slate-500 line-clamp-1">
                {idx === 0 && "Repository link & tree scan"}
                {idx === 1 && "PostgreSQL 768-dim embeddings"}
                {idx === 2 && "File citations & shared Q&A"}
              </p>
            </button>
          );
        })}
      </div>

      {/* 2. Main Interactive Showcase Panel for the Active Step */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-4 sm:p-8 lg:p-10 shadow-xl overflow-hidden relative">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -top-20 -right-20 size-72 rounded-full bg-indigo-500/10 blur-3xl -z-10" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 size-72 rounded-full bg-violet-500/10 blur-3xl -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          {/* Left Column: Step Description & Bullets */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-1 text-xs font-semibold text-indigo-700 font-mono">
              <span>WORKFLOW STEP {currentStep.number} OF 03</span>
            </div>

            <h3 className="text-xl sm:text-3xl font-extrabold tracking-tight font-brand text-slate-950 leading-tight">
              {currentStep.title}
            </h3>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {currentStep.description}
            </p>

            <ul className="space-y-2.5 pt-2 border-t border-slate-100">
              {currentStep.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <div className="size-5 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center flex-none mt-0.5 border border-indigo-200">
                    <Check className="size-3" />
                  </div>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Quick Step Switcher Links */}
            <div className="pt-2 sm:pt-4 flex items-center gap-3">
              <button
                onClick={() => setActiveStep((prev) => (prev - 1 + STEPS.length) % STEPS.length)}
                className="text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors cursor-pointer touch-friendly py-1"
              >
                &larr; Previous step
              </button>
              <span className="text-slate-300">&bull;</span>
              <button
                onClick={() => setActiveStep((prev) => (prev + 1) % STEPS.length)}
                className="text-xs font-medium text-indigo-600 hover:text-indigo-700 font-semibold transition-colors cursor-pointer flex items-center gap-1 touch-friendly py-1"
              >
                <span>Next step</span>
                <ArrowRight className="size-3" />
              </button>
            </div>
          </div>

          {/* Right Column: Custom Animated Graphic for each Step */}
          <div className="lg:col-span-6">
            {/* Step 1 Animation: Repository Ingestion & Tree Scanner */}
            {activeStep === 0 && (
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3.5 sm:p-5 space-y-3.5 sm:space-y-4 shadow-sm animate-in fade-in duration-300">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2">
                    <FolderGit2 className="size-4 text-indigo-600 flex-none" />
                    <span className="text-xs font-bold text-slate-900 font-brand">Repository Connect</span>
                  </div>
                  <span className="rounded-full bg-indigo-100 text-indigo-800 text-[10px] font-mono px-2 py-0.5 font-semibold">
                    Tree Scanner Active
                  </span>
                </div>

                {/* Input Simulation */}
                <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-1">
                  <span className="text-[10px] uppercase font-mono text-slate-500 font-bold">GitHub Repository URL</span>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-900 font-medium">
                    <span className="text-slate-400">https://</span>
                    <span className="truncate">github.com/acme-corp/api-core</span>
                    <span className="size-2 rounded-full bg-indigo-600 animate-pulse ml-auto flex-none" />
                  </div>
                </div>

                {/* Live Scanning Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-600">Scanning repository tree...</span>
                    <span className="text-indigo-600 font-bold">142 source files</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-600 w-4/5 animate-pulse rounded-full" />
                  </div>
                </div>

                {/* File Inspection Checklist */}
                <div className="space-y-1.5 pt-1 font-mono text-xs text-slate-700">
                  <div className="flex items-center justify-between gap-2 rounded-lg bg-white p-2 border border-slate-200">
                    <span className="flex items-center gap-2 text-slate-800 min-w-0">
                      <FileCode2 className="size-3.5 text-indigo-600 flex-none" />
                      <span className="truncate">src/server/api/routers/project.ts</span>
                    </span>
                    <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 flex-none">
                      1 credit
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2 rounded-lg bg-white p-2 border border-slate-200">
                    <span className="flex items-center gap-2 text-slate-800 min-w-0">
                      <FileCode2 className="size-3.5 text-indigo-600 flex-none" />
                      <span className="truncate">src/app/api/webhook/stripe/route.ts</span>
                    </span>
                    <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 flex-none">
                      1 credit
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2 rounded-lg bg-white p-2 border border-slate-200 text-slate-400">
                    <span className="flex items-center gap-2 min-w-0">
                      <FileCode2 className="size-3.5 text-slate-400 flex-none" />
                      <span className="truncate">package-lock.json (Lockfile)</span>
                    </span>
                    <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded flex-none">
                      Filtered (0 credits)
                    </span>
                  </div>
                </div>

                <div className="rounded-xl border border-indigo-200 bg-indigo-50/70 p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                  <span className="text-indigo-950 font-medium">Estimated credits to index:</span>
                  <span className="font-mono font-bold text-indigo-700 bg-white px-2 py-0.5 rounded border border-indigo-200 shadow-2xs self-start sm:self-auto">
                    142 Credits ($2.84)
                  </span>
                </div>
              </div>
            )}

            {/* Step 2 Animation: Vector Embedding Pipeline with pgvector */}
            {activeStep === 1 && (
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 space-y-4 shadow-sm animate-in fade-in duration-300">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2">
                    <Database className="size-4 text-indigo-600" />
                    <span className="text-xs font-bold text-slate-900 font-brand">Vector Pipeline</span>
                  </div>
                  <span className="rounded-full bg-indigo-100 text-indigo-800 text-[10px] font-mono px-2 py-0.5 font-semibold">
                    PostgreSQL pgvector
                  </span>
                </div>

                {/* Parsing & Chunking Graphic */}
                <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-500">Chunking source code:</span>
                    <span className="text-indigo-600 font-bold">3,000 char windows</span>
                  </div>
                  <div className="rounded-lg bg-slate-900 text-slate-200 p-2.5 font-mono text-[11px] space-y-0.5">
                    <div className="text-slate-500">&#47;&#47; Chunk #24 &bull; auth middleware</div>
                    <div>
                      <span className="text-purple-400">const</span> isAuth = <span className="text-cyan-400">await</span> verifyToken(req);
                    </div>
                  </div>
                </div>

                {/* Vector Flow Arrow */}
                <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-indigo-600 font-mono text-[11px] sm:text-xs">
                  <span className="size-1.5 rounded-full bg-indigo-600 animate-ping" />
                  <span>Converting into 768-dim embeddings</span>
                  <ArrowRight className="size-3.5 flex-none" />
                </div>

                {/* Vector Array Output Box */}
                <div className="rounded-xl border border-indigo-200 bg-indigo-50/60 p-3 space-y-2 font-mono text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-1 text-[11px] text-indigo-900 font-semibold">
                    <span>pgvector column: embedding</span>
                    <span className="text-[10px] text-indigo-700">cosine distance (vector_cosine_ops)</span>
                  </div>
                  <div className="rounded bg-white p-2 border border-indigo-100 text-[10px] sm:text-[11px] text-indigo-800 break-all leading-relaxed">
                    [0.0421, -0.1984, 0.5120, -0.0134, 0.8841, 0.1290, -0.3421, 0.4012, ... +760 dims]
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-1 text-xs text-slate-600 pt-1">
                  <span className="flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="size-3.5 text-emerald-600 flex-none" />
                    Indexed into Postgres Database
                  </span>
                  <span className="font-mono text-[11px] text-slate-500">IVFFlat Index</span>
                </div>
              </div>
            )}

            {/* Step 3 Animation: Querying & Shared Team Memory */}
            {activeStep === 2 && (
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3.5 sm:p-5 space-y-3.5 sm:space-y-4 shadow-sm animate-in fade-in duration-300">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2">
                    <Bot className="size-4 text-indigo-600 flex-none" />
                    <span className="text-xs font-bold text-slate-900 font-brand">Instant Code Recall</span>
                  </div>
                  <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono px-2 py-0.5 font-semibold">
                    Saved to Team Archive
                  </span>
                </div>

                {/* Question */}
                <div className="rounded-xl border border-indigo-200 bg-indigo-50/60 p-3">
                  <p className="text-[10px] font-mono font-bold uppercase text-indigo-700">Teammate Question</p>
                  <p className="text-xs font-semibold text-slate-900 mt-0.5 leading-snug">
                    &ldquo;Where are Stripe webhook idempotency keys handled?&rdquo;
                  </p>
                </div>

                {/* Answer with citations */}
                <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
                  <p className="text-xs text-slate-700 leading-relaxed">
                    Idempotency is verified using <code className="text-indigo-600 font-mono text-[11px] bg-indigo-50 px-1 py-0.2 rounded break-all">stripeSessionId</code> inside the webhook handler before credits are granted:
                  </p>
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="inline-flex items-center gap-1 rounded bg-indigo-50 border border-indigo-200 px-2 py-0.5 text-[10px] font-mono text-indigo-700 font-medium">
                      <FileCode2 className="size-2.5 flex-none" />
                      <span className="truncate max-w-[200px]">src/app/api/webhook/stripe/route.ts:L24</span>
                    </span>
                    <span className="inline-flex items-center gap-1 rounded bg-slate-50 border border-slate-200 px-2 py-0.5 text-[10px] font-mono text-slate-600">
                      <FileCode2 className="size-2.5 flex-none" />
                      <span>src/lib/credits.ts:L12</span>
                    </span>
                  </div>
                </div>

                {/* Team Archive Banner */}
                <div className="rounded-xl border border-slate-200 bg-white p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <Users className="size-4 text-indigo-600 flex-none" />
                    <div>
                      <p className="font-bold text-slate-900">Shared with Team</p>
                      <p className="text-[10px] text-slate-500">Accessible to all workspace members</p>
                    </div>
                  </div>
                  <span className="self-start sm:self-auto rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 font-mono text-[10px] font-semibold">
                    Verified
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
