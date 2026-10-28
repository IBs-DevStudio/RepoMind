import Link from "next/link";
import React from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroBeamProps {
  isSignedIn?: boolean;
}

export function HeroBeam({ isSignedIn = false }: HeroBeamProps) {
  return (
    <div className="relative pt-6 pb-10 sm:pt-10 sm:pb-16 overflow-hidden">
      {/* Soft Indigo Ambient Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-[320px] -z-10 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.15),transparent_70%)] blur-[80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
        {/* 1. Announcement Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/80 px-4 py-1.5 text-xs font-semibold text-indigo-700 backdrop-blur-md shadow-2xs transition-all hover:border-indigo-300">
          <span className="flex size-2 rounded-full bg-indigo-600 animate-pulse" />
          <span className="font-sans font-medium text-indigo-900">Your codebase&apos;s memory</span>
          <ChevronRight className="size-3.5 text-indigo-500" />
        </div>

        {/* 2. Headline: Space Grotesk with Indigo-Violet Gradient */}
        <h1 className="mt-7 text-4xl sm:text-6xl lg:text-7xl font-extrabold font-brand tracking-tight text-slate-950 leading-[1.1]">
          Your code has answers.
          <br />
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent">
            Engram finds them.
          </span>
        </h1>

        {/* 3. Subhead */}
        <p className="mt-6 text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Ask questions about any repository, get AI commit summaries, and turn meetings into action items. Engram remembers it all.
        </p>
        <p className="mt-1 text-xs sm:text-sm font-semibold tracking-wide text-slate-700 font-mono">
          Every answer cites the exact files it came from.
        </p>

        {/* 4. High-Contrast CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Link href={isSignedIn ? "/dashboard" : "/sign-up"} className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto h-12 px-8 text-sm font-semibold rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-lg shadow-indigo-500/25 gap-2 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>{isSignedIn ? "Open dashboard" : "Start free with 150 credits"}</span>
              <ArrowRight className="size-4" />
            </Button>
          </Link>

          <Link href="#how-it-works" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto h-12 px-7 text-sm font-medium rounded-xl border-slate-200 bg-white hover:bg-slate-50 text-slate-800 shadow-xs transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>See how it works</span>
            </Button>
          </Link>
        </div>

        {/* Micro-copy badge */}
        <p className="mt-3 text-xs text-slate-500 flex items-center justify-center gap-2">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          <span>150 free credits</span>
          <span className="text-slate-300">&bull;</span>
          <span>No credit card needed</span>
          <span className="text-slate-300">&bull;</span>
          <span>Pay once, never a subscription</span>
        </p>

        {/* 5. Bottom Feature Matrix Pill Row */}
        <div className="mt-10 inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 rounded-full border border-slate-200 bg-white/90 p-2 sm:px-5 sm:py-2 backdrop-blur-xl shadow-xs">
          <span className="rounded-full bg-slate-100 border border-slate-200/80 px-3 py-1 text-xs font-mono text-slate-700">
            Semantic Code Search
          </span>
          <span className="rounded-full bg-slate-100 border border-slate-200/80 px-3 py-1 text-xs font-mono text-slate-700">
            150 Free Credits
          </span>
          <span className="rounded-full bg-slate-100 border border-slate-200/80 px-3 py-1 text-xs font-mono text-slate-700">
            Verifiable Citations
          </span>
          <span className="rounded-full bg-slate-100 border border-slate-200/80 px-3 py-1 text-xs font-mono text-slate-700">
            Zero Subscriptions
          </span>
          <span className="rounded-full bg-slate-100 border border-slate-200/80 px-3 py-1 text-xs font-mono text-slate-700">
            20+ Languages
          </span>
          <span className="rounded-full bg-slate-100 border border-slate-200/80 px-3 py-1 text-xs font-mono text-slate-700">
            GitHub Synced
          </span>
        </div>
      </div>
    </div>
  );
}
