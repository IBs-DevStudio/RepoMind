"use client";

import React, { useEffect, useRef, useState } from "react";
import { Bot, FileCode2, Search, Terminal } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DemoItem {
  id: number;
  shortLabel: string;
  question: string;
  answer: string;
  files: { name: string; lines: string }[];
}

const DEMO_QUESTIONS: DemoItem[] = [
  {
    id: 1,
    shortLabel: "Authentication",
    question: "How is authentication structured?",
    answer:
      "Authentication is managed via Clerk with clerkMiddleware protecting non-public routes. Client sessions sync to Postgres through /sync-user, and protected tRPC procedures verify ctx.userId on every request.",
    files: [
      { name: "auth.ts", lines: "L8-24" },
      { name: "middleware.ts", lines: "L3-14" },
      { name: "trpc.ts", lines: "L42-68" },
    ],
  },
  {
    id: 2,
    shortLabel: "Stripe Webhooks",
    question: "Where are Stripe webhook idempotency keys handled?",
    answer:
      "Idempotency checks occur inside the Stripe webhook handler before credit entries are appended: db.creditEntry.findUnique queries stripeSessionId to prevent double-crediting duplicate webhook payloads.",
    files: [
      { name: "webhook/route.ts", lines: "L24-48" },
      { name: "credits.ts", lines: "L12-19" },
      { name: "stripe.ts", lines: "L8-15" },
    ],
  },
  {
    id: 3,
    shortLabel: "pgvector Search",
    question: "How does the vector similarity search work?",
    answer:
      "Source files are chunked into 3,000-character windows and converted into 768-dim embeddings via Gemini, then queried with PostgreSQL pgvector cosine similarity distance (vector_cosine_ops).",
    files: [
      { name: "schema.prisma", lines: "L45-62" },
      { name: "ask/route.ts", lines: "L18-40" },
      { name: "github.ts", lines: "L55-80" },
    ],
  },
  {
    id: 4,
    shortLabel: "Member Roles",
    question: "How are project member permissions verified?",
    answer:
      "Project access uses composite keys [userId, projectId] in Prisma. Only members with role === 'OWNER' can archive projects, update GitHub PAT tokens, or manage workspace team members.",
    files: [
      { name: "project.ts", lines: "L260-272" },
      { name: "team-members.tsx", lines: "L37-55" },
    ],
  },
  {
    id: 5,
    shortLabel: "Meeting Audio",
    question: "How are meeting recordings converted into action items?",
    answer:
      "Uploaded meeting audio is transcribed with AssemblyAI, then Gemini parses chapter timestamps, key technical decisions, and issues which are saved directly into the project workspace.",
    files: [
      { name: "process-meeting/route.ts", lines: "L45-88" },
      { name: "assembly.ts", lines: "L12-34" },
    ],
  },
];

export function LiveDemoStrip() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questionText, setQuestionText] = useState("");
  const [answerText, setAnswerText] = useState("");
  const [showFiles, setShowFiles] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const activeItem = DEMO_QUESTIONS[currentIndex] ?? DEMO_QUESTIONS[0]!;
  const indexRef = useRef(currentIndex);
  indexRef.current = currentIndex;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setQuestionText(activeItem.question);
      setAnswerText(activeItem.answer);
      setShowFiles(true);
      return;
    }

    let isMounted = true;
    let timeoutId: NodeJS.Timeout;

    const runSequence = async () => {
      const item = DEMO_QUESTIONS[indexRef.current] ?? DEMO_QUESTIONS[0]!;

      // 1. Reset state
      setQuestionText("");
      setAnswerText("");
      setShowFiles(false);

      // 2. Type question character by character
      for (let i = 1; i <= item.question.length; i++) {
        if (!isMounted) return;
        setQuestionText(item.question.slice(0, i));
        await new Promise((resolve) => setTimeout(resolve, 28));
      }

      // Brief pause before streaming answer
      await new Promise((resolve) => setTimeout(resolve, 350));

      // 3. Stream answer word by word
      const words = item.answer.split(" ");
      let currentAnswer = "";
      for (let i = 0; i < words.length; i++) {
        if (!isMounted) return;
        currentAnswer += (i === 0 ? "" : " ") + words[i];
        setAnswerText(currentAnswer);
        await new Promise((resolve) => setTimeout(resolve, 32));
      }

      // 4. Reveal file chips smoothly
      if (isMounted) setShowFiles(true);

      // 5. Hold display for 4.5 seconds, then advance to next question in loop
      timeoutId = setTimeout(() => {
        if (isMounted) {
          setCurrentIndex((prev) => (prev + 1) % DEMO_QUESTIONS.length);
        }
      }, 4500);
    };

    void runSequence();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [currentIndex, prefersReducedMotion]);

  const handleSelectQuestion = (idx: number) => {
    if (idx !== currentIndex) {
      setCurrentIndex(idx);
    }
  };

  return (
    <div
      id="live-demo"
      className="relative mx-auto max-w-4xl rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-4 sm:p-7 shadow-xl backdrop-blur-xl transition-all"
    >
      {/* Background glow behind card */}
      <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-indigo-500/10 blur-3xl -z-10" />
      <div className="pointer-events-none absolute -left-16 -bottom-16 size-48 rounded-full bg-violet-500/10 blur-3xl -z-10" />

      {/* Terminal Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 border-b border-slate-200 pb-3 sm:pb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-red-400" />
            <span className="size-2.5 rounded-full bg-amber-400" />
            <span className="size-2.5 rounded-full bg-emerald-400" />
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs text-slate-600">
            <Terminal className="size-3.5 text-indigo-600 flex-none" />
            <span className="text-slate-900 font-semibold">engram-copilot</span>
            <span className="text-slate-400 hidden xs:inline">&bull;</span>
            <span className="hidden xs:inline">streaming 5 questions</span>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-[10px] sm:text-[11px] font-mono text-slate-400">
            Question {currentIndex + 1} of 5
          </span>
          <Badge
            variant="outline"
            className="border-indigo-200 bg-indigo-50 text-indigo-700 text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5"
          >
            Sample
          </Badge>
        </div>
      </div>

      {/* 5 Clickable Question Quick-Switch Pills */}
      <div className="mt-3 sm:mt-3.5 flex flex-wrap items-center gap-1.5">
        {DEMO_QUESTIONS.map((item, idx) => {
          const isActive = currentIndex === idx;
          return (
            <button
              key={item.id}
              onClick={() => handleSelectQuestion(idx)}
              className={`rounded-lg px-2.5 py-1 text-xs font-mono transition-all cursor-pointer touch-friendly active:scale-95 ${
                isActive
                  ? "bg-indigo-600 text-white font-semibold shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
              }`}
            >
              <span>{idx + 1}. {item.shortLabel}</span>
            </button>
          );
        })}
      </div>

      {/* Question Input Simulator - Device Friendly */}
      <div className="mt-3 sm:mt-3.5 flex items-center gap-2.5 sm:gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 sm:px-4 min-h-12 py-2.5">
        <Search className="size-4 text-indigo-600 flex-none" />
        <p className="flex-1 text-xs sm:text-sm font-medium text-slate-900 font-mono leading-snug break-words">
          {questionText}
          <span className="inline-block w-1.5 sm:w-2 h-3.5 sm:h-4 ml-1 align-middle bg-indigo-600 animate-pulse shadow-xs" />
        </p>
      </div>

      {/* Streaming Answer Box */}
      <div className="mt-3 sm:mt-3.5 rounded-2xl border border-indigo-200/80 bg-indigo-50/50 p-3.5 sm:p-5 flex flex-col justify-between min-h-[180px] sm:min-h-[175px]">
        {/* Top Answer Area */}
        <div className="flex items-start gap-2.5 sm:gap-3">
          <div className="flex size-7 flex-none items-center justify-center rounded-lg bg-indigo-600 text-white shadow-xs mt-0.5">
            <Bot className="size-4" />
          </div>
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed min-h-[64px] sm:min-h-[58px]">
            {answerText || (
              <span className="text-slate-400 italic text-xs font-mono">
                Synthesizing answer from codebase embeddings...
              </span>
            )}
          </p>
        </div>

        {/* Source File Citations */}
        <div
          className={`pt-3 border-t border-indigo-200/60 flex flex-wrap items-center gap-1.5 sm:gap-2 min-h-[38px] transition-all duration-300 ${
            showFiles ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 pointer-events-none"
          }`}
        >
          <span className="text-[10px] font-mono font-semibold tracking-wider text-slate-500 uppercase flex-none">
            Source Citations:
          </span>
          {activeItem.files.map((file) => (
            <span
              key={file.name}
              className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-200 bg-white px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-mono text-indigo-700 font-medium shadow-2xs hover:border-indigo-400 transition-colors"
            >
              <FileCode2 className="size-3 text-indigo-600 flex-none" />
              <span>{file.name}</span>
              <span className="text-slate-400 text-[10px]">({file.lines})</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
