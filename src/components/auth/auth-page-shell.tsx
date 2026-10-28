"use client";

import Link from "next/link";
import React, { useState } from "react";
import { CheckCircle2, Sparkles, X } from "lucide-react";
import { EngramIcon } from "@/components/engram-logo";

interface AuthPageShellProps {
  children: React.ReactNode;
  mode: "sign-in" | "sign-up";
}

export function AuthPageShell({ children, mode }: AuthPageShellProps) {
  const isSignIn = mode === "sign-in";
  const [showDemoModal, setShowDemoModal] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col bg-white text-slate-900 selection:bg-indigo-500/20 selection:text-indigo-900">
      {/* 1. Full-Width Top Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 transition-transform hover:scale-[1.02]"
          >
            <EngramIcon size={32} />
            <div className="flex items-center gap-1.5">
              <span className="font-brand font-extrabold text-xl tracking-tight text-slate-950">
                Engram
              </span>
              <span className="size-2 rounded-full bg-indigo-600 animate-pulse" />
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="flex items-center gap-5 sm:gap-7 text-sm font-medium text-slate-600">
            <Link
              href="/"
              className="hover:text-slate-950 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/#features"
              className="hover:text-slate-950 transition-colors hidden sm:inline-block"
            >
              Features
            </Link>
            <Link
              href="/#how-it-works"
              className="hover:text-slate-950 transition-colors hidden sm:inline-block"
            >
              How It Works
            </Link>
            <Link
              href="/#pricing"
              className="hover:text-slate-950 transition-colors hidden md:inline-block"
            >
              Pricing
            </Link>
            <Link
              href="/#faq"
              className="hover:text-slate-950 transition-colors hidden md:inline-block"
            >
              FAQ
            </Link>

            {/* Top Right Auth Action Button */}
            <Link
              href={isSignIn ? "/sign-up" : "/sign-in"}
              className="rounded-xl bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 text-xs font-semibold shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {isSignIn ? "Sign Up" : "Sign In"}
            </Link>
          </nav>
        </div>
      </header>

      {/* 2. Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-start pt-8 pb-16 px-4">
        {/* Subtle Ambient Glow */}
        <div className="pointer-events-none absolute top-40 left-1/2 -translate-x-1/2 size-[500px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.07),transparent_70%)] blur-[90px] -z-10" />

        <div className="w-full max-w-[540px] flex flex-col items-center">
          {/* Top Banner: DEMO CREDENTIALS & QUICK ACCESS */}
          <div className="w-full mb-8 rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Sparkles className="size-3 text-indigo-600" />
                DEMO CREDENTIALS
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Use a ready-made demo account (for recruiters or reviewers) to quickly explore Engram&apos;s primary features.
              </p>
            </div>

            <button
              onClick={() => setShowDemoModal(true)}
              className="rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 px-3.5 py-1.5 text-xs font-semibold text-slate-800 transition-all shrink-0 cursor-pointer shadow-2xs"
            >
              View demo details
            </button>
          </div>

          {/* Centered Clerk Component */}
          <div className="w-full flex justify-center">
            {children}
          </div>
        </div>
      </main>

      {/* Demo Details Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <EngramIcon size={24} />
                <h3 className="text-sm font-bold font-brand text-slate-900">
                  Engram Demo &amp; Reviewer Guide
                </h3>
              </div>
              <button
                onClick={() => setShowDemoModal(false)}
                className="rounded-lg p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="space-y-3 py-4 text-xs text-slate-600 leading-relaxed">
              <p>
                Recruiters and reviewers can sign in with any GitHub or Google account to test the complete platform:
              </p>
              <ul className="space-y-2 pt-1 font-sans">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-3.5 text-emerald-600 mt-0.5 flex-none" />
                  <span><strong>150 free credits</strong> automatically provisioned on sign-up.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-3.5 text-emerald-600 mt-0.5 flex-none" />
                  <span><strong>Instant Repo Indexing</strong>: Paste any public GitHub repo (e.g. <code>facebook/react</code> or <code>shadcn-ui/ui</code>).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-3.5 text-emerald-600 mt-0.5 flex-none" />
                  <span><strong>Verifiable Citations</strong>: Ask plain-English questions with syntax-highlighted source citations.</span>
                </li>
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setShowDemoModal(false)}
                className="rounded-xl bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 text-xs font-semibold transition-colors cursor-pointer"
              >
                Got it, continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
