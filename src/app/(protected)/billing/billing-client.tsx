"use client";

import { CreditCard, Info, Loader2 } from "lucide-react";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { createCheckoutSession } from "./actions";

export default function BillingClient({
  success,
  canceled,
}: {
  success: boolean;
  canceled: boolean;
}) {
  const [credits, setCredits] = useState(100);
  const [pending, startTransition] = useTransition();

  // After paying, poll briefly until the webhook has added the credits
  const { data: balance } = api.project.getMyCredits.useQuery(undefined, {
    refetchInterval: success ? 2000 : false,
  });

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Billing</h1>
        <p className="text-muted-foreground text-sm">
          Credits are used to index repositories: 1 credit per file.
        </p>
      </div>

      {success && (
        <div className="bg-primary/5 border-primary/30 flex items-center gap-2 rounded-md border px-4 py-3 text-sm">
          <Info className="size-4" />
          Payment received. Your credits update in a few seconds.
        </div>
      )}
      {canceled && (
        <div className="text-muted-foreground rounded-md border px-4 py-3 text-sm">
          Checkout canceled. You have not been charged.
        </div>
      )}

      <div className="bg-card rounded-2xl border p-5 sm:p-6 shadow-sm">
        <p className="text-muted-foreground text-xs sm:text-sm">Your balance</p>
        <p className="text-3xl sm:text-4xl font-bold tracking-tight mt-1">
          {balance ?? "..."}{" "}
          <span className="text-muted-foreground text-sm sm:text-base font-medium">credits</span>
        </p>
      </div>

      <div className="bg-card space-y-4 rounded-2xl border p-5 sm:p-6 shadow-sm">
        <div className="flex items-baseline justify-between">
          <p className="font-semibold text-sm sm:text-base">Buy credits</p>
          <p className="text-xs sm:text-sm">
            <strong className="text-primary font-bold">{credits}</strong> credits · ${(credits / 50).toFixed(2)}
          </p>
        </div>
        <input
          type="range"
          min={50}
          max={1000}
          step={50}
          value={credits}
          onChange={(e) => setCredits(Number(e.target.value))}
          className="accent-primary w-full h-3 rounded-lg bg-muted appearance-none cursor-pointer touch-friendly py-1"
          aria-label="Select credits amount"
        />
        <div className="flex justify-between text-[10px] sm:text-[11px] font-mono text-muted-foreground">
          <span>50 credits ($1)</span>
          <span>500 credits ($10)</span>
          <span>1,000 credits ($20)</span>
        </div>
        <Button
          className="w-full h-11 touch-friendly font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-md active:scale-[0.99] transition-all"
          disabled={pending}
          onClick={() => startTransition(() => createCheckoutSession(credits))}
        >
          {pending ? (
            <Loader2 className="mr-2 size-4 animate-spin" />
          ) : (
            <CreditCard className="mr-2 size-4" />
          )}
          Buy {credits} credits
        </Button>
      </div>
    </div>
  );
}