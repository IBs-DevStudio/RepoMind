"use client";

import MDEditor from "@uiw/react-md-editor";
import {
  ArrowRight,
  BookOpen,
  Check,
  Clock,
  Copy,
  FileCode2,
  Filter,
  MessageSquareText,
  Search,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useProject } from "@/hooks/use-project";
import { api } from "@/trpc/react";
import AskQuestionCard from "../dashboard/ask-question-card";
import CodeReferences, { type FileRef } from "../dashboard/code-references";

function toFileRefs(value: unknown): FileRef[] {
  if (!Array.isArray(value)) return [];
  return value.filter(
    (x): x is FileRef =>
      typeof x === "object" &&
      x !== null &&
      typeof (x as FileRef).fileName === "string" &&
      typeof (x as FileRef).sourceCode === "string",
  );
}

const formatDate = (d: Date | string) =>
  new Date(d).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

function cleanSnippet(text: string): string {
  return text
    .replace(/[#*`_[\]()>-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export default function QAPage() {
  const { projectId } = useProject();
  const { data: questions, isLoading } = api.project.getQuestions.useQuery(
    { projectId },
    { enabled: !!projectId },
  );

  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "files" | "recent">("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [sheetCopied, setSheetCopied] = useState(false);

  const selected = questions?.find((q) => q.id === selectedId);

  const filteredQuestions = useMemo(() => {
    if (!questions) return [];

    return questions.filter((q) => {
      // Filter tab logic
      if (activeFilter === "files") {
        const refs = toFileRefs(q.filesReferences);
        if (refs.length === 0) return false;
      } else if (activeFilter === "recent") {
        const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
        if (new Date(q.createdAt).getTime() < sevenDaysAgo) return false;
      }

      // Search query logic
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      const questionMatch = q.question.toLowerCase().includes(query);
      const answerMatch = q.answer.toLowerCase().includes(query);
      const fileMatch = toFileRefs(q.filesReferences).some((f) =>
        f.fileName.toLowerCase().includes(query),
      );

      return questionMatch || answerMatch || fileMatch;
    });
  }, [questions, searchQuery, activeFilter]);

  async function handleCopyQuestion(e: React.MouseEvent, id: string, text: string) {
    e.stopPropagation();
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("Answer copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  }

  async function handleCopySheet(text: string) {
    await navigator.clipboard.writeText(text);
    setSheetCopied(true);
    toast.success("Full solution copied!");
    setTimeout(() => setSheetCopied(false), 2000);
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Header Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-gradient-to-br from-card via-card to-primary/[0.04] p-6 sm:p-8 shadow-sm">
        {/* Subtle Ambient Decorative Gradient Circles */}
        <div className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 size-80 rounded-full bg-blue-500/5 blur-2xl" />

        <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary">
              <Sparkles className="size-3.5 text-primary" />
              <span>CODEBASE INTELLIGENCE HUB</span>
              <span className="text-muted-foreground/60">•</span>
              <span className="text-muted-foreground font-normal">Repository Knowledge Engine</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Deep Architectural Q&A
            </h1>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Ask architectural questions, trace complex execution paths across files, and build
              a permanent repository knowledge archive for your entire engineering team.
            </p>

            {/* Quick Metrics Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-medium text-muted-foreground">
              <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2.5 py-1">
                <BookOpen className="size-3.5 text-primary" />
                <span className="font-semibold text-foreground">{questions?.length ?? 0}</span> Saved Answers
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2.5 py-1">
                <ShieldCheck className="size-3.5 text-emerald-500" />
                <span>Zero Hallucination Grounding</span>
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2.5 py-1">
                <Zap className="size-3.5 text-amber-500" />
                <span>AST & Vector Index Active</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Ask Card */}
      <AskQuestionCard className="w-full col-span-full shadow-md" />

      {/* Saved Questions Section */}
      <div className="space-y-4">
        {/* Header & Search / Filter Controls */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Saved Repository Insights
            </h2>
            {questions && (
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                {filteredQuestions.length}
                {filteredQuestions.length !== questions.length && ` of ${questions.length}`}
              </span>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setActiveFilter("all")}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                activeFilter === "all"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              All Inquiries
            </button>
            <button
              onClick={() => setActiveFilter("files")}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                activeFilter === "files"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              With Source Files
            </button>
            <button
              onClick={() => setActiveFilter("recent")}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                activeFilter === "recent"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              Last 7 Days
            </button>
          </div>
        </div>

        {/* Real-time Search Input */}
        <div className="relative">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search saved questions, answers, or referenced files..."
            className="h-10 pl-9 pr-9 text-sm border-border/80 bg-card/60 focus-visible:ring-primary/30"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-32 animate-pulse rounded-xl border bg-muted/40 p-4 space-y-3"
              >
                <div className="h-4 w-1/3 rounded bg-muted/80" />
                <div className="h-4 w-3/4 rounded bg-muted/60" />
                <div className="h-3 w-1/2 rounded bg-muted/50" />
              </div>
            ))}
          </div>
        )}

        {/* Empty State - No Questions Saved Yet */}
        {!isLoading && questions?.length === 0 && (
          <div className="relative overflow-hidden rounded-2xl border border-dashed border-border/90 bg-muted/10 p-10 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-inner">
              <Sparkles className="size-6" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-foreground">
              No questions archived yet
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
              Ask anything above about your repository&apos;s architecture, APIs, or data flow.
              Save answers to permanently build your team&apos;s codebase intelligence.
            </p>
          </div>
        )}

        {/* Empty State - Search Produced No Results */}
        {!isLoading && questions && questions.length > 0 && filteredQuestions.length === 0 && (
          <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
            <p>No questions matched your search query &ldquo;{searchQuery}&rdquo;.</p>
            <Button
              variant="link"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("all");
              }}
              className="mt-2 text-primary"
            >
              Clear filters and show all
            </Button>
          </div>
        )}

        {/* Saved Questions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filteredQuestions.map((q) => {
            const fileRefs = toFileRefs(q.filesReferences);
            const isCopied = copiedId === q.id;

            return (
              <div
                key={q.id}
                onClick={() => {
                  setSelectedId(q.id);
                  setOpen(true);
                }}
                className="group relative flex cursor-pointer flex-col justify-between rounded-xl border border-border/80 bg-card p-5 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md"
              >
                <div>
                  {/* Card Header: Author, Date & File Badges */}
                  <div className="flex items-center justify-between gap-2 pb-3 border-b border-border/50">
                    <div className="flex items-center gap-2 min-w-0">
                      {q.user.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={q.user.imageUrl}
                          alt={q.user.firstName ?? "User"}
                          className="size-6 flex-none rounded-full ring-1 ring-border"
                        />
                      ) : (
                        <div className="bg-primary/10 text-primary flex size-6 flex-none items-center justify-center rounded-full text-[11px] font-semibold">
                          {q.user.firstName?.[0] ?? "U"}
                        </div>
                      )}
                      <span className="truncate text-xs font-medium text-foreground">
                        {q.user.firstName ?? "Teammate"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 flex-none">
                      {fileRefs.length > 0 && (
                        <span className="inline-flex items-center gap-1 rounded-md border border-primary/20 bg-primary/5 px-2 py-0.5 text-[10px] font-medium text-primary">
                          <FileCode2 className="size-3" />
                          {fileRefs.length} files
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                        <Clock className="size-3" />
                        {formatDate(q.createdAt)}
                      </span>
                    </div>
                  </div>

                  {/* Question Title */}
                  <h3 className="mt-3 text-sm sm:text-base font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                    {q.question}
                  </h3>

                  {/* Clean Markdown Snippet Preview */}
                  <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {cleanSnippet(q.answer)}
                  </p>
                </div>

                {/* Card Action Footer */}
                <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-3">
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-primary group-hover:underline">
                    <span>View Architecture & Code</span>
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </span>

                  <button
                    type="button"
                    onClick={(e) => handleCopyQuestion(e, q.id, q.answer)}
                    className="inline-flex items-center gap-1 rounded-md p-1.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    title="Copy Answer"
                  >
                    {isCopied ? (
                      <Check className="size-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="size-3.5" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Larger Than Life Solution Sheet Modal */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-full gap-0 overflow-y-auto p-0 border-l border-border/80 shadow-2xl sm:!max-w-5xl lg:!w-[70vw]">
          {selected && (
            <div className="flex min-h-full flex-col">
              {/* Sheet Header with Tagline & High-Tech Styling */}
              <SheetHeader className="bg-gradient-to-b from-muted/50 via-muted/20 to-background border-b p-6 pr-14 space-y-4">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary w-fit">
                  <Sparkles className="size-3.5 text-primary" />
                  <span>ARCHIVED CODE INTELLIGENCE • REPOSITORY RECORD</span>
                </div>

                <div className="space-y-1">
                  <SheetTitle className="text-xl sm:text-2xl font-bold leading-snug tracking-tight text-foreground">
                    {selected.question}
                  </SheetTitle>
                  <p className="text-xs sm:text-sm text-muted-foreground font-normal">
                    Archived engineering intelligence synthesized directly from repository syntax trees and dependencies.
                  </p>
                </div>

                {/* Team Member Attribution & Copy Action */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-border/50">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    {selected.user.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={selected.user.imageUrl}
                        alt={selected.user.firstName ?? "User"}
                        className="size-6 rounded-full ring-1 ring-border"
                      />
                    ) : (
                      <div className="bg-primary/10 text-primary flex size-6 items-center justify-center rounded-full text-[10px] font-semibold">
                        {selected.user.firstName?.[0] ?? "U"}
                      </div>
                    )}
                    <span>
                      Asked by{" "}
                      <span className="font-semibold text-foreground">
                        {selected.user.firstName ?? "a teammate"}
                      </span>
                    </span>
                    <span>•</span>
                    <span>{formatDate(selected.createdAt)}</span>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopySheet(selected.answer)}
                    className="h-8 gap-1.5 text-xs font-medium"
                  >
                    {sheetCopied ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
                    {sheetCopied ? "Copied" : "Copy Solution"}
                  </Button>
                </div>
              </SheetHeader>

              {/* Sheet Body: Answer & Code References */}
              <div className="min-w-0 flex-1 space-y-8 p-6">
                <section>
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-xs font-bold tracking-wider text-muted-foreground uppercase flex items-center gap-1.5">
                      <Sparkles className="size-3.5 text-primary" />
                      <span>Synthesized Analysis</span>
                    </h3>
                    <span className="text-[11px] text-muted-foreground">
                      Grounded in AST & commit history
                    </span>
                  </div>

                  <div className="rounded-2xl border bg-card p-6 shadow-sm">
                    <div data-color-mode="light">
                      <MDEditor.Markdown
                        source={selected.answer}
                        style={{
                          background: "transparent",
                          fontFamily: "inherit",
                          fontSize: "0.95rem",
                          lineHeight: 1.75,
                        }}
                        className="max-w-none text-foreground [&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_h1]:text-xl [&_h2]:text-lg [&_h3]:text-base [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6"
                      />
                    </div>
                  </div>
                </section>

                <section className="min-w-0">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-xs font-bold tracking-wider text-muted-foreground uppercase flex items-center gap-1.5">
                      <FileCode2 className="size-3.5 text-primary" />
                      <span>Referenced Source Files</span>
                    </h3>
                  </div>

                  <div className="min-w-0 overflow-hidden rounded-2xl border shadow-sm">
                    <CodeReferences
                      key={selected.id}
                      filesReferences={toFileRefs(selected.filesReferences)}
                    />
                  </div>
                </section>
              </div>

              {/* High-Tech Sheet Footer */}
              <div className="flex items-center justify-between border-t bg-muted/30 px-6 py-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5 font-mono text-[11px]">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  RepoMind Permanent Knowledge Record
                </span>
                <span className="text-[11px]">
                  Preserved across repository iterations
                </span>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}