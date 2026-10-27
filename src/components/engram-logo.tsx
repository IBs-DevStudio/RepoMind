"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface EngramLogoProps {
  className?: string;
  collapsed?: boolean;
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
}

export function EngramIcon({
  className,
  size = 34,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("flex-none shadow-xs transition-transform hover:scale-105", className)}
    >
      <defs>
        <linearGradient id="engram-grad-dynamic" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="45%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#4F46E5" />
        </linearGradient>
      </defs>

      {/* Emblem Background Squircle */}
      <rect width="40" height="40" rx="10" fill="url(#engram-grad-dynamic)" />

      {/* Subtle Memory Circuit Trace Ring */}
      <circle
        cx="20"
        cy="20"
        r="14"
        stroke="#FFFFFF"
        strokeWidth="1"
        strokeDasharray="2 3"
        strokeOpacity="0.35"
      />

      {/* Synaptic Pathway Lines */}
      <line x1="20" y1="10" x2="20" y2="15.5" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.9" />
      <line x1="20" y1="24.5" x2="20" y2="30" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.9" />
      <line x1="12" y1="14" x2="16.5" y2="17.2" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.9" />
      <line x1="23.5" y1="22.8" x2="28" y2="26" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.9" />
      <line x1="28" y1="14" x2="23.5" y2="17.2" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.9" />
      <line x1="16.5" y1="22.8" x2="12" y2="26" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.9" />

      {/* Outer Nodes */}
      <circle cx="20" cy="10" r="2.3" fill="#FFFFFF" />
      <circle cx="28" cy="14" r="2.3" fill="#FFFFFF" />
      <circle cx="28" cy="26" r="2.3" fill="#FFFFFF" />
      <circle cx="20" cy="30" r="2.3" fill="#FFFFFF" />
      <circle cx="12" cy="26" r="2.3" fill="#FFFFFF" />
      <circle cx="12" cy="14" r="2.3" fill="#FFFFFF" />

      {/* Central Memory Core Node */}
      <circle cx="20" cy="20" r="4.8" fill="#FFFFFF" />
      <circle cx="20" cy="20" r="2.3" fill="#2563EB" />
    </svg>
  );
}

export function EngramLogo({
  className,
  collapsed = false,
  showTagline = true,
  size = "md",
}: EngramLogoProps) {
  const iconSizes = {
    sm: 22,
    md: 26,
    lg: 32,
  };

  if (collapsed) {
    return (
      <div className={cn("flex items-center justify-center", className)}>
        <EngramIcon size={iconSizes[size]} />
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col min-w-0 select-none group", className)}>
      {/* Top Row: Logo Icon and Engram side-by-side, perfectly aligned */}
      <div className="flex items-center gap-2 leading-none">
        <EngramIcon size={iconSizes[size]} />
        <div className="flex items-center gap-1.5">
          <span className="font-brand font-extrabold text-[19.5px] tracking-[-0.03em] bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Engram
          </span>
          <span className="size-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.65)] animate-pulse flex-none" />
        </div>
      </div>

      {/* Bottom Row: Tagline below */}
      {showTagline && (
        <span className="font-brand text-[10.5px] font-medium tracking-[0.015em] text-blue-600/90 dark:text-blue-400 mt-1 pl-0.5 truncate">
          Find your way through code
        </span>
      )}
    </div>
  );
}
