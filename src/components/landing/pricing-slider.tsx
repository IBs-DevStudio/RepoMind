"use client";

import Link from "next/link";
import React, { useState } from "react";
import { ArrowRight, Check, Coins, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PricingSliderProps {
  isSignedIn?: boolean;
}

export function PricingSlider({ isSignedIn = false }: PricingSliderProps) {
  const [credits, setCredits] = useState(200);

  const price = (credits / 50).toFixed(2);
  const repoExampleCost = Math.round(200 / 50);

  return (
    <div className="relative mx-auto max-w-xl overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-8 shadow-xl">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute -top-24 -left-24 size-64 rounded-full bg-indigo-500/10 blur-3xl -z-10" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 size-64 rounded-full bg-violet-600/10 blur-3xl -z-10" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 sm:pb-6 border-b border-slate-100">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 font-brand">
            Transparent Pricing
          </span>
          <h3 className="text-lg sm:text-2xl font-bold tracking-tight text-slate-950 mt-0.5">
            Pay only for what you index
          </h3>
        </div>
        <Badge
          variant="outline"
          className="self-start sm:self-auto border-indigo-200 bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1 gap-1.5 shadow-2xs"
        >
          <Sparkles className="size-3 text-indigo-600" />
          150 free credits on signup
        </Badge>
      </div>

      {/* Main Dynamic Calculator */}
      <div className="py-5 sm:py-6 space-y-5 sm:space-y-6">
        <div className="flex items-baseline justify-between">
          <div>
            <p className="text-xs sm:text-sm font-medium text-slate-500">Select Repository Capacity</p>
            <p className="text-2xl sm:text-5xl font-black tracking-tight font-brand text-slate-950 mt-1">
              {credits}{" "}
              <span className="text-sm sm:text-lg font-semibold text-slate-500 font-sans">
                credits
              </span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-[11px] sm:text-xs font-medium text-slate-500">One-time payment</p>
            <p className="text-2xl sm:text-5xl font-black tracking-tight font-brand bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent mt-1">
              ${price}
            </p>
          </div>
        </div>

        {/* Range Slider - Enhanced for Touch Screens */}
        <div className="space-y-2.5">
          <input
            type="range"
            min={50}
            max={1000}
            step={50}
            value={credits}
            onChange={(e) => setCredits(Number(e.target.value))}
            className="w-full h-3 rounded-lg bg-slate-200 appearance-none cursor-pointer accent-indigo-600 focus:outline-hidden touch-friendly py-1"
            aria-label="Select credits amount"
          />
          <div className="flex justify-between text-[10px] sm:text-[11px] font-mono text-slate-500">
            <span>50 credits ($1)</span>
            <span>500 credits ($10)</span>
            <span>1,000 credits ($20)</span>
          </div>
        </div>

        {/* Example Line */}
        <div className="rounded-xl border border-indigo-200 bg-indigo-50/70 px-3.5 py-3 text-xs sm:text-sm text-slate-800 flex items-center gap-2.5">
          <Coins className="size-4 text-indigo-600 flex-none" />
          <p>
            A <strong>200-file repository</strong> costs 200 credits (about ${repoExampleCost}).
          </p>
        </div>
      </div>

      {/* Features checklist */}
      <div className="py-4 border-t border-slate-100 space-y-2.5 text-xs text-slate-600">
        <div className="flex items-center gap-2.5">
          <Check className="size-4 text-emerald-600 flex-none" />
          <span><strong>1 credit per file indexed</strong> &bull; no charge for queries or commits</span>
        </div>
        <div className="flex items-center gap-2.5">
          <Check className="size-4 text-emerald-600 flex-none" />
          <span><strong>150 free credits</strong> immediately added upon initial account signup</span>
        </div>
        <div className="flex items-center gap-2.5">
          <Check className="size-4 text-emerald-600 flex-none" />
          <span><strong>One-time purchases</strong> via Stripe &bull; zero recurring monthly subscriptions</span>
        </div>
        <div className="flex items-center gap-2.5">
          <Check className="size-4 text-emerald-600 flex-none" />
          <span><strong>Unlimited team members</strong> per repository workspace</span>
        </div>
      </div>

      {/* CTA Button */}
      <div className="pt-4">
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"} className="block">
          <Button
            size="lg"
            className="w-full text-sm font-semibold h-12 shadow-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white gap-2 transition-all cursor-pointer shadow-indigo-500/25 hover:scale-[1.01] active:scale-[0.99] touch-friendly"
          >
            <span>{isSignedIn ? "Open Dashboard" : "Start free with 150 credits"}</span>
            <ArrowRight className="size-4" />
          </Button>
        </Link>
        <p className="text-center text-[11px] text-slate-500 mt-2.5">
          {isSignedIn ? "Access your projects and credit balance" : "No credit card required to get started"}
        </p>
      </div>
    </div>
  );
}
