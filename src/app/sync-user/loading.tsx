import React from "react";
import { EngramIcon } from "@/components/engram-logo";

export default function SyncUserLoading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center selection:bg-indigo-500/20">
      {/* Soft Ambient Glow */}
      <div className="pointer-events-none absolute size-96 rounded-full bg-gradient-to-tr from-indigo-500/15 to-violet-500/15 blur-3xl -z-10" />

      <div className="relative flex flex-col items-center max-w-sm">
        {/* Animated Emblem */}
        <div className="relative mb-6">
          <div className="absolute -inset-2 rounded-2xl bg-indigo-500/20 blur-lg animate-pulse" />
          <div className="relative rounded-2xl p-2 bg-white shadow-lg border border-indigo-100">
            <EngramIcon size={52} />
          </div>
        </div>

        <h2 className="text-xl font-extrabold font-brand tracking-tight text-slate-950">
          Entering Engram
        </h2>
        <p className="mt-1.5 text-xs text-slate-500">
          Syncing your workspace &amp; allocating 150 free credits...
        </p>

        {/* Polished Animated Progress Bar */}
        <div className="mt-6 w-56 h-1.5 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
          <div className="h-full bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full animate-pulse w-3/4" />
        </div>

        <span className="mt-4 font-mono text-[11px] text-slate-400">
          Redirecting to dashboard...
        </span>
      </div>
    </div>
  );
}
