import Image from "next/image";
import Link from "next/link";
import React from "react";
import { auth } from "@clerk/nextjs/server";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Coins,
  FileCode2,
  GitCommit,
  Headphones,
  MessageSquare,
  ShieldCheck,
  Users,
} from "lucide-react";

import { Navbar } from "@/components/landing/navbar";
import { HeroBeam } from "@/components/landing/hero-beam";
import { HeroInteractiveIDE } from "@/components/landing/hero-interactive-ide";
import { LiveDemoStrip } from "@/components/landing/live-demo-strip";
import { GitBranchSteps } from "@/components/landing/git-branch-steps";
import { PricingSlider } from "@/components/landing/pricing-slider";
import {
  CommitsMockup,
  MeetingsMockup,
  QaMockup,
  TeamKnowledgeMockup,
} from "@/components/landing/ui-mockups";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default async function HomePage() {
  const { userId } = await auth();
  const isSignedIn = Boolean(userId);

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased selection:bg-indigo-500/20 selection:text-indigo-900">
      {/* 1. STICKY NAVBAR */}
      <Navbar isSignedIn={isSignedIn} />

      <main className="relative">
        {/* Faint Dotted Grid on Clean White Canvas */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(79,70,229,0.12),transparent_70%)]" />
        <div className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)] opacity-40" />

        {/* 2. HERO SECTION WITH CLEAN WHITE SCHEME & NO MIDDLE LOGO */}
        <section className="relative overflow-hidden pt-6 pb-20 md:pt-10 md:pb-28">
          <HeroBeam isSignedIn={isSignedIn} />

          {/* Interactive Multi-Tab IDE Showcase */}
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10 sm:mt-14">
            <HeroInteractiveIDE />
          </div>
        </section>

        {/* 3. LIVE DEMO STRIP */}
        <section className="relative py-16 sm:py-20 border-y border-slate-200 bg-slate-50/70">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 font-brand">
                Interactive Codebase Retrieval
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-brand text-slate-950 mt-1">
                See plain-English query retrieval in real-time
              </h2>
            </div>
            <LiveDemoStrip />
          </div>
        </section>

        {/* 4. FEATURES SECTION (Bento Grid on White) */}
        <section id="features" className="py-16 sm:py-24 lg:py-32 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <Badge variant="outline" className="border-indigo-200 bg-indigo-50/80 text-indigo-700 text-xs font-semibold px-3 py-1 mb-3">
                Core Capabilities
              </Badge>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-brand text-slate-950">
                Everything you need to master any codebase
              </h2>
              <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-slate-600 leading-relaxed px-2">
                From indexing source files with pgvector to transcribing meeting decisions, Engram captures the full context of your software.
              </p>
            </div>

            {/* Three Feature Cards with Clean White Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Feature 1: Ask your code */}
              <div className="group flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-sm transition-all duration-300 hover:border-indigo-500/40 hover:shadow-xl hover:-translate-y-1">
                <div>
                  <div className="flex size-11 sm:size-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 mb-4 sm:mb-5 border border-indigo-100 shadow-xs">
                    <Bot className="size-5 sm:size-6" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight font-brand text-slate-950">
                    Ask your code
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Ask questions in plain English and receive instant answers citing exact source files and line numbers.
                  </p>
                </div>
                <div className="mt-5 sm:mt-6 pt-4 border-t border-slate-100">
                  <QaMockup />
                </div>
              </div>

              {/* Feature 2: Commit summaries */}
              <div className="group flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-sm transition-all duration-300 hover:border-violet-500/40 hover:shadow-xl hover:-translate-y-1">
                <div>
                  <div className="flex size-11 sm:size-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 mb-4 sm:mb-5 border border-violet-100 shadow-xs">
                    <GitCommit className="size-5 sm:size-6" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight font-brand text-slate-950">
                    Commit summaries
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Automatically generates concise, intelligent commit summaries with every code change synced from GitHub.
                  </p>
                </div>
                <div className="mt-5 sm:mt-6 pt-4 border-t border-slate-100">
                  <CommitsMockup />
                </div>
              </div>

              {/* Feature 3: Meeting notes */}
              <div className="group flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-sm transition-all duration-300 hover:border-emerald-500/40 hover:shadow-xl hover:-translate-y-1">
                <div>
                  <div className="flex size-11 sm:size-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 mb-4 sm:mb-5 border border-emerald-100 shadow-xs">
                    <Headphones className="size-5 sm:size-6" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight font-brand text-slate-950">
                    Meeting notes
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Upload meeting audio to automatically extract timestamped issues, summaries, and action items.
                  </p>
                </div>
                <div className="mt-5 sm:mt-6 pt-4 border-t border-slate-100">
                  <MeetingsMockup />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. HOW IT WORKS SECTION (Signature Git Branch Line with Memory Rings) */}
        <section id="how-it-works" className="py-16 sm:py-24 lg:py-32 border-t border-slate-200 bg-slate-50/60">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <Badge variant="outline" className="border-indigo-200 bg-indigo-50/80 text-indigo-700 text-xs font-semibold px-3 py-1 mb-3">
                Simple 3-Step Flow
              </Badge>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-brand text-slate-950">
                How Engram builds your codebase memory
              </h2>
              <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-slate-600 leading-relaxed px-2">
                Connect your repository in under thirty seconds. We handle parsing, vector indexing, and synchronization automatically.
              </p>
            </div>

            <GitBranchSteps />
          </div>
        </section>

        {/* 6. TEAM KNOWLEDGE SECTION */}
        <section className="py-16 sm:py-24 lg:py-32 border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
              {/* Left Column: Headline, bullets */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/80 px-3.5 py-1 text-xs font-semibold text-indigo-700">
                  <Users className="size-3.5" />
                  <span>Shared Team Intelligence</span>
                </div>

                <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-brand text-slate-950 leading-tight">
                  Answer once.
                  <br />
                  <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent">
                    Remember forever.
                  </span>
                </h2>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                  Every question answered by Engram becomes part of your team&apos;s collective memory. New engineers onboard faster, and senior developers stop answering the same architectural questions repeatedly.
                </p>

                <div className="space-y-4 pt-2">
                  <div className="flex items-start gap-3.5">
                    <div className="flex size-8 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 flex-none mt-0.5 border border-indigo-100">
                      <CheckCircle2 className="size-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Shareable project invite links</h4>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                        Generate instant join links so teammates and contractors can access the project workspace without manual configuration.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="flex size-8 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 flex-none mt-0.5 border border-indigo-100">
                      <ShieldCheck className="size-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Owner &amp; Member roles</h4>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                        Repository owners manage GitHub tokens, settings, and credit balances. Members search code, ask questions, and review commit summaries.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="flex size-8 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 flex-none mt-0.5 border border-indigo-100">
                      <MessageSquare className="size-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Permanent Q&amp;A archive</h4>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                        All answered questions are saved directly alongside code references for the entire team to search and learn from.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: High-fidelity Team Mockup */}
              <div className="lg:col-span-6">
                <div className="relative mx-auto max-w-lg lg:max-w-none">
                  <div className="pointer-events-none absolute -inset-2 rounded-3xl bg-gradient-to-tr from-violet-500/15 to-indigo-500/15 blur-2xl -z-10" />
                  <div className="rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-2 sm:p-3 shadow-xl">
                    <TeamKnowledgeMockup />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. TRUST SECTION (Three Honest Developer-First Points) */}
        <section className="py-16 sm:py-24 lg:py-32 border-t border-slate-200 bg-slate-50/70">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <Badge variant="outline" className="border-indigo-200 bg-indigo-50/80 text-indigo-700 text-xs font-semibold px-3 py-1 mb-3">
                Honest Engineering
              </Badge>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-brand text-slate-950">
                Built on transparency developers trust
              </h2>
              <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-slate-600 leading-relaxed px-2">
                No marketing exaggerations. Here is exactly how Engram handles your code, security, and billing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {/* Trust Point 1 */}
              <div className="rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs space-y-3.5 hover:border-indigo-500/40 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                <div className="flex size-11 sm:size-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-xs">
                  <FileCode2 className="size-5 sm:size-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight font-brand text-slate-950">
                  Answers cite their source files
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Every answer references the exact source files and line numbers it was retrieved from, with syntax-highlighted code blocks for instant verification.
                </p>
              </div>

              {/* Trust Point 2 */}
              <div className="rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs space-y-3.5 hover:border-violet-500/40 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                <div className="flex size-11 sm:size-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 border border-violet-100 shadow-xs">
                  <ShieldCheck className="size-5 sm:size-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight font-brand text-slate-950">
                  Role-based access per project
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Granular Owner and Member roles enforce strict project isolation. Personal Access Tokens and billing controls stay securely locked to authorized owners.
                </p>
              </div>

              {/* Trust Point 3 */}
              <div className="rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs space-y-3.5 hover:border-emerald-500/40 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                <div className="flex size-11 sm:size-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-xs">
                  <Coins className="size-5 sm:size-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight font-brand text-slate-950">
                  Pay per use with visible balance
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Pay only 1 credit per indexed file with transparent $1 = 50 credits one-time purchases. No hidden subscription fees, lock-ins, or surprise bills.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 8. PRICING SECTION */}
        <section id="pricing" className="py-16 sm:py-24 lg:py-32 border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
              <Badge variant="outline" className="border-indigo-200 bg-indigo-50/80 text-indigo-700 text-xs font-semibold px-3 py-1 mb-3">
                Simple &amp; Predictable
              </Badge>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-brand text-slate-950">
                One-time credits. Zero subscriptions.
              </h2>
              <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-slate-600 leading-relaxed px-2">
                Get 150 free credits upon signup. Purchase additional credits on demand via Stripe whenever your codebase grows.
              </p>
            </div>

            <PricingSlider isSignedIn={isSignedIn} />
          </div>
        </section>

        {/* 9. FAQ SECTION */}
        <section id="faq" className="py-16 sm:py-24 lg:py-32 border-t border-slate-200 bg-slate-50/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
              <Badge variant="outline" className="border-indigo-200 bg-indigo-50/80 text-indigo-700 text-xs font-semibold px-3 py-1 mb-3">
                Got Questions?
              </Badge>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-brand text-slate-950">
                Frequently Asked Questions
              </h2>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-600 leading-relaxed px-2">
                Clear answers on tokens, supported languages, credit consumption, and data privacy.
              </p>
            </div>

            <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-9 shadow-sm">
              <Accordion>
                {/* FAQ 1: Private Repos */}
                <AccordionItem value="faq-1">
                  <AccordionTrigger className="text-sm sm:text-base font-semibold text-slate-900 hover:text-indigo-600 text-left">
                    Can I index private GitHub repositories?
                  </AccordionTrigger>
                  <AccordionContent className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Yes. When connecting a private repository, provide a GitHub Personal Access Token (classic or fine-grained with <code className="text-indigo-700 font-mono bg-indigo-50 px-1 py-0.5 rounded">repo</code> read permissions). Your token is stored encrypted per project and allows Engram to access source code and git commits securely without hitting public GitHub rate limits.
                  </AccordionContent>
                </AccordionItem>

                {/* FAQ 2: Which Languages */}
                <AccordionItem value="faq-2">
                  <AccordionTrigger className="text-sm sm:text-base font-semibold text-slate-900 hover:text-indigo-600 text-left">
                    Which programming languages are supported?
                  </AccordionTrigger>
                  <AccordionContent className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Engram indexes any text-based source files across TypeScript, JavaScript, Python, Go, Rust, Java, C/C++, Ruby, PHP, Swift, Kotlin, SQL, HTML/CSS, and more. Non-text assets, binary files, lockfiles (such as <code className="font-mono text-indigo-700">package-lock.json</code>), and vendor packages are automatically filtered out to save you credits.
                  </AccordionContent>
                </AccordionItem>

                {/* FAQ 3: What a credit buys */}
                <AccordionItem value="faq-3">
                  <AccordionTrigger className="text-sm sm:text-base font-semibold text-slate-900 hover:text-indigo-600 text-left">
                    What does a credit buy?
                  </AccordionTrigger>
                  <AccordionContent className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    One credit indexes one source code file. You receive 150 free credits upon signup. Additional credits are purchased as a one-time top-up ($1 gives you 50 credits). Asking questions, reviewing commit summaries, and collaborating with team members do not consume any credits.
                  </AccordionContent>
                </AccordionItem>

                {/* FAQ 4: Is code stored */}
                <AccordionItem value="faq-4">
                  <AccordionTrigger className="text-sm sm:text-base font-semibold text-slate-900 hover:text-indigo-600 text-left">
                    Is my source code stored?
                  </AccordionTrigger>
                  <AccordionContent className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Embeddings (vector representations) and indexed file text are stored in your database with PostgreSQL pgvector to perform semantic similarity search and synthesize answers with accurate source citations. Your code is never used to train public foundational AI models.
                  </AccordionContent>
                </AccordionItem>

                {/* FAQ 5: Who can see answers */}
                <AccordionItem value="faq-5">
                  <AccordionTrigger className="text-sm sm:text-base font-semibold text-slate-900 hover:text-indigo-600 text-left">
                    Who can see saved questions and answers?
                  </AccordionTrigger>
                  <AccordionContent className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Only authorized members of your project workspace can view repository data, ask questions, and browse saved answers. Project owners can invite collaborators via invite links or revoke member access at any time.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* 10. FINAL CTA BAND WITH GRADIENT */}
        <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32 border-t border-slate-200 bg-white">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(79,70,229,0.08),transparent_70%)]" />

          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="rounded-2xl sm:rounded-3xl border border-indigo-900/20 bg-gradient-to-r from-indigo-950 via-slate-900 to-violet-950 p-6 sm:p-12 md:p-16 shadow-2xl relative overflow-hidden text-white">
              <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-indigo-500/20 blur-3xl" />
              <div className="pointer-events-none absolute -left-24 -bottom-24 size-72 rounded-full bg-violet-600/20 blur-3xl" />

              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight font-brand text-white leading-tight">
                Give your codebase a memory.
              </h2>
              <p className="mt-4 text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed px-2">
                Connect your repository in seconds, search in plain English, and preserve engineering knowledge forever.
              </p>

              <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 max-w-md sm:max-w-none mx-auto">
                <Link href={isSignedIn ? "/dashboard" : "/sign-up"} className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto h-12 sm:h-13 px-7 sm:px-9 text-sm sm:text-base font-semibold rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white shadow-xl shadow-indigo-500/30 gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98] touch-friendly"
                  >
                    <span>{isSignedIn ? "Open dashboard" : "Start free with 150 credits"}</span>
                    <ArrowRight className="size-4.5" />
                  </Button>
                </Link>

                <Link href="#how-it-works" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto h-12 sm:h-13 px-6 sm:px-8 text-sm sm:text-base font-semibold rounded-xl border border-white/20 bg-white/10 text-white hover:bg-white/20 shadow-xl cursor-pointer hover:scale-[1.02] active:scale-[0.98] touch-friendly"
                  >
                    <span>See how it works</span>
                  </Button>
                </Link>
              </div>

              <p className="mt-5 text-[11px] sm:text-xs text-slate-400">
                150 free credits on signup &bull; No credit card required &bull; One-time purchases only
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* 11. FOOTER */}
      <footer className="border-t border-slate-200 bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-10 border-b border-slate-200">
            {/* Logo and Tagline */}
            <div className="flex flex-col items-center md:items-start gap-2">
              <Link href="/" className="flex items-center gap-2.5">
                <Image
                  src="/logo.svg"
                  alt="Engram logo"
                  width={28}
                  height={28}
                  className="size-7 rounded-lg"
                />
                <span className="font-brand font-bold text-lg text-slate-900">
                  Engram
                </span>
              </Link>
              <p className="text-xs text-slate-500 text-center md:text-left">
                Your codebase&apos;s memory. Answer once. Remember forever.
              </p>
            </div>

            {/* Links */}
            <nav className="flex flex-wrap items-center justify-center gap-8 text-sm font-medium text-slate-600">
              <Link href="#features" className="hover:text-slate-900 transition-colors">
                Features
              </Link>
              <Link href="#how-it-works" className="hover:text-slate-900 transition-colors">
                How it works
              </Link>
              <Link href="#pricing" className="hover:text-slate-900 transition-colors">
                Pricing
              </Link>
              <Link href="#faq" className="hover:text-slate-900 transition-colors">
                FAQ
              </Link>
              <Link href={isSignedIn ? "/dashboard" : "/sign-in"} className="hover:text-slate-900 transition-colors">
                {isSignedIn ? "Dashboard" : "Sign in"}
              </Link>
            </nav>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>&copy; 2026 Engram. All rights reserved.</p>
            <div className="flex items-center gap-2 font-mono text-[11px]">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>All Systems Operational &bull; pgvector vector engine</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}