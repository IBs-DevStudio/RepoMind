"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  ArrowRight,
  CreditCard,
  HelpCircle,
  Layers,
  Menu,
  Sparkles,
} from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface NavbarProps {
  isSignedIn?: boolean;
}

export function Navbar({ isSignedIn = false }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Features", href: "#features", icon: Sparkles },
    { label: "How it works", href: "#how-it-works", icon: Layers },
    { label: "Pricing", href: "#pricing", icon: CreditCard },
    { label: "FAQ", href: "#faq", icon: HelpCircle },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/85 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <Image
            src="/logo.svg"
            alt="Engram logo"
            width={32}
            height={32}
            className="size-7 sm:size-8 rounded-lg transition-transform group-hover:scale-105"
            priority
          />
          <div className="flex items-center gap-1.5">
            <span className="font-brand font-bold text-lg sm:text-xl tracking-tight text-slate-950">
              Engram
            </span>
            <span className="size-1.5 rounded-full bg-indigo-600 animate-pulse" />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-slate-950 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-indigo-600 hover:after:w-full after:transition-all after:duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />

          {isSignedIn ? (
            <Link href="/dashboard">
              <Button size="sm" className="gap-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-xs cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all">
                <span>Open dashboard</span>
                <ArrowRight className="size-3.5" />
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/sign-in">
                <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-950 cursor-pointer">
                  Sign in
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button size="sm" className="gap-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-xs cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all">
                  <span>Get started</span>
                  <ArrowRight className="size-3.5" />
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex items-center gap-1.5 sm:gap-2 md:hidden">
          <ThemeToggle />

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  className="size-9 rounded-xl border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-2xs touch-manipulation cursor-pointer active:scale-95"
                  aria-label="Open mobile navigation menu"
                />
              }
            >
              <Menu className="size-4.5" />
            </SheetTrigger>

            <SheetContent side="right" className="w-[85vw] max-w-[340px] p-5 sm:p-6 flex flex-col justify-between bg-white text-slate-900 border-l border-slate-200 shadow-2xl">
              <div>
                <SheetHeader className="text-left pb-4 border-b border-slate-200/80">
                  <div className="flex items-center gap-2.5">
                    <Image
                      src="/logo.svg"
                      alt="Engram logo"
                      width={30}
                      height={30}
                      className="size-7 rounded-lg"
                    />
                    <div>
                      <SheetTitle className="font-brand font-bold text-lg text-slate-950 leading-tight">
                        Engram
                      </SheetTitle>
                      <p className="text-[11px] text-slate-500 font-mono">
                        Your codebase&apos;s memory
                      </p>
                    </div>
                  </div>
                </SheetHeader>

                <nav className="mt-5 flex flex-col gap-1.5">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/70 active:scale-[0.98] transition-all touch-manipulation"
                      >
                        <div className="flex size-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600 group-hover:bg-indigo-100 group-hover:text-indigo-600">
                          <Icon className="size-4" />
                        </div>
                        <span>{link.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-5 border-t border-slate-200/80 space-y-2.5">
                {isSignedIn ? (
                  <Link href="/dashboard" onClick={() => setIsOpen(false)} className="block">
                    <Button className="w-full h-11 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl shadow-md gap-2 touch-manipulation font-semibold">
                      <span>Open dashboard</span>
                      <ArrowRight className="size-4" />
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link href="/sign-in" onClick={() => setIsOpen(false)} className="block">
                      <Button variant="outline" className="w-full h-11 border-slate-200 rounded-xl text-slate-800 touch-manipulation font-medium">
                        Sign in
                      </Button>
                    </Link>
                    <Link href="/sign-up" onClick={() => setIsOpen(false)} className="block">
                      <Button className="w-full h-11 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl shadow-md gap-2 touch-manipulation font-semibold">
                        <span>Get started</span>
                        <ArrowRight className="size-4" />
                      </Button>
                    </Link>
                  </>
                )}
                <p className="text-center text-[10px] text-slate-400 font-mono pt-1">
                  150 free credits on sign up
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
