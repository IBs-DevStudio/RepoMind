"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { ArrowRight, Menu } from "lucide-react";

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
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image
            src="/logo.svg"
            alt="Engram logo"
            width={32}
            height={32}
            className="size-8 rounded-lg transition-transform group-hover:scale-105"
            priority
          />
          <div className="flex items-center gap-1.5">
            <span className="font-brand font-bold text-xl tracking-tight text-slate-950">
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
              className="hover:text-slate-950 transition-colors"
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
              <Button size="sm" className="gap-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-xs">
                <span>Open dashboard</span>
                <ArrowRight className="size-3.5" />
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/sign-in">
                <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-950">
                  Sign in
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button size="sm" className="gap-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-xs">
                  <span>Get started</span>
                  <ArrowRight className="size-3.5" />
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  className="size-9 rounded-lg border-slate-200"
                  aria-label="Open mobile navigation menu"
                />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>

            <SheetContent side="right" className="w-[300px] sm:w-[350px] p-6 flex flex-col justify-between bg-white text-slate-900">
              <div>
                <SheetHeader className="text-left pb-4 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/logo.svg"
                      alt="Engram logo"
                      width={28}
                      height={28}
                      className="size-7"
                    />
                    <SheetTitle className="font-brand font-bold text-lg text-slate-950">
                      Engram
                    </SheetTitle>
                  </div>
                </SheetHeader>

                <nav className="mt-6 flex flex-col gap-4 text-base font-medium">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-slate-600 hover:text-slate-950 transition-colors py-1"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="pt-6 border-t border-slate-200 space-y-3">
                {isSignedIn ? (
                  <Link href="/dashboard" onClick={() => setIsOpen(false)} className="block">
                    <Button className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white gap-2">
                      <span>Open dashboard</span>
                      <ArrowRight className="size-4" />
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link href="/sign-in" onClick={() => setIsOpen(false)} className="block">
                      <Button variant="outline" className="w-full border-slate-200">
                        Sign in
                      </Button>
                    </Link>
                    <Link href="/sign-up" onClick={() => setIsOpen(false)} className="block">
                      <Button className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white gap-2">
                        <span>Get started</span>
                        <ArrowRight className="size-4" />
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
