"use client";

import MDEditor from "@uiw/react-md-editor";
import {
  ArrowRight,
  FileCode2,
  MessageSquareText,
  Quote,
  Search,
  Sparkles,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

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

const QUOTES = [
  { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
  {
    text: "Programs must be written for people to read, and only incidentally for machines to execute.",
    author: "Abelson & Sussman",
  },
  {
    text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    author: "Martin Fowler",
  },
  {
    text: "Code is read much more often than it is written.",
    author: "Guido van Rossum",
  },
];

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

function stripMarkdown(md: string) {
  return md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]*)`/g, "$1")
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s*/gm, "")
    .replace(/(\*\*|__|\*|_)/g, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/\s+/g, " ")
    .trim();
}

const formatDate = (d: Date) =>
  new Date(d).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

function Avatar({
  src,
  name,
  size = "size-10",
}: {
  src?: string | null;
  name?: string | null;
  size?: string;
}) {
  return src ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={name ?? "User"}
      className={`${size} flex-none rounded-full ring-2 ring-background`}
    />
  ) : (
    <div
      className={`${size} bg-primary/10 text-primary flex flex-none items-center justify-center rounded-full text-sm font-semibold`}
    >
      {name?.[0] ?? "U"}
    </div>
  );
}

export default function QAPage() {
  const { projectId } = useProject();
  const { data: questions, isLoading } = api.project.getQuestions.useQuery(
    { projectId },
    { enabled: !!projectId },
  );

  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [quoteIdx, setQuoteIdx] = useState(0);

  useEffect(() => {
    setQuoteIdx(Math.floor(Math.random() * QUOTES.length));
  }, []);
  const quote = QUOTES[quoteIdx]!;

  const selected = questions?.find((q) => q.id === selectedId);

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s || !questions) return questions;
    return questions.filter(
      (q) =>
        q.question.toLowerCase().includes(s) ||
        q.answer.toLowerCase().includes(s),
    );
  }, [questions, search]);

  return (
    <div className="space-y-8">
      {/* HERO */}
      <section className="from-primary/15 via-primary/5 relative overflow-hidden rounded-3xl border bg-gradient-to-br to-transparent p-8">
        <div className="bg-primary/20 pointer-events-none absolute -top-16 -right-16 size-64 rounded-full blur-3xl" />
        <div className="relative">
          <div className="bg-primary/10 text-primary mb-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold">
            <Sparkles className="size-3.5" />
            Team Knowledge Base
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Your codebase, answered once.{" "}
            <span className="from-primary bg-gradient-to-r to-violet-500 bg-clip-text text-transparent">
              Remembered forever.
            </span>
          </h1>
          <p className="text-muted-foreground mt-3 max-w-2xl text-sm sm:text-base">
            Ask anything about your repository, save the answers that matter,
            and give every teammate instant context.
          </p>

          <div className="mt-6 flex max-w-2xl items-start gap-3 border-l-2 border-primary/40 pl-4">
            <Quote className="text-primary/60 mt-0.5 size-5 flex-none" />
            <div>
              <p className="text-sm font-medium italic sm:text-base">
                “{quote.text}”
              </p>
              <p className="text-muted-foreground mt-1 text-xs">
                — {quote.author}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ASK */}
      <AskQuestionCard />

      {/* SAVED QUESTIONS */}
      <section>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold tracking-tight">
              Saved questions
            </h2>
            {questions && (
              <span className="bg-primary/10 text-primary rounded-full px-2.5 py-0.5 text-xs font-semibold">
                {questions.length}
              </span>
            )}
          </div>

          {!!questions?.length && (
            <div className="relative w-full sm:w-72">
              <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search questions..."
                className="bg-card focus:ring-primary/30 focus:border-primary/50 w-full rounded-full border py-2 pr-4 pl-9 text-sm outline-none transition focus:ring-4"
              />
            </div>
          )}
        </div>

        {isLoading && (
          <div className="space-y-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="bg-muted h-24 animate-pulse rounded-2xl"
              />
            ))}
          </div>
        )}

        {questions?.length === 0 && (
          <div className="rounded-2xl border border-dashed p-12 text-center">
            <div className="bg-primary/10 text-primary mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl">
              <MessageSquareText className="size-6" />
            </div>
            <p className="font-semibold">No saved questions yet</p>
            <p className="text-muted-foreground mt-1 text-sm">
              Ask something above and click Save. It will live here for your
              whole team.
            </p>
          </div>
        )}

        {filtered && questions && questions.length > 0 && filtered.length === 0 && (
          <p className="text-muted-foreground rounded-2xl border border-dashed p-8 text-center text-sm">
            No questions match “{search}”.
          </p>
        )}

        <div className="flex flex-col gap-3">
          {filtered?.map((q) => {
            const fileCount = toFileRefs(q.filesReferences).length;
            return (
              <button
                key={q.id}
                onClick={() => {
                  setSelectedId(q.id);
                  setOpen(true);
                }}
                className="bg-card hover:border-primary/50 group relative flex items-center gap-4 overflow-hidden rounded-2xl border p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                <span className="bg-primary absolute inset-y-0 left-0 w-1 origin-top scale-y-0 transition-transform group-hover:scale-y-100" />

                <Avatar src={q.user.imageUrl} name={q.user.firstName} />

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <p className="line-clamp-1 text-base font-semibold">
                      {q.question}
                    </p>
                    <span className="text-muted-foreground text-xs whitespace-nowrap">
                      {formatDate(q.createdAt)}
                    </span>
                  </div>
                  <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
                    {stripMarkdown(q.answer)}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    {fileCount > 0 && (
                      <span className="bg-muted text-muted-foreground inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium">
                        <FileCode2 className="size-3" />
                        {fileCount} {fileCount === 1 ? "file" : "files"}
                      </span>
                    )}
                    <span className="text-muted-foreground text-[11px]">
                      by {q.user.firstName ?? "a teammate"}
                    </span>
                  </div>
                </div>

                <ArrowRight className="text-muted-foreground group-hover:text-primary size-5 flex-none transition-all group-hover:translate-x-1" />
              </button>
            );
          })}
        </div>
      </section>

      {/* DRAWER */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-full gap-0 overflow-y-auto p-0 sm:!max-w-5xl lg:!w-[70vw]">
          {selected && (
            <div className="flex min-h-full flex-col">
              <SheetHeader className="from-primary/10 space-y-3 border-b bg-gradient-to-br to-transparent p-6 pr-14">
                <SheetTitle className="text-xl leading-snug font-semibold tracking-tight">
                  {selected.question}
                </SheetTitle>
                <div className="text-muted-foreground flex items-center gap-2 text-xs">
                  <Avatar
                    src={selected.user.imageUrl}
                    name={selected.user.firstName}
                    size="size-5"
                  />
                  <span>
                    Asked by{" "}
                    <span className="text-foreground font-medium">
                      {selected.user.firstName ?? "a teammate"}
                    </span>
                  </span>
                  <span>•</span>
                  <span>{formatDate(selected.createdAt)}</span>
                </div>
              </SheetHeader>

              <div className="min-w-0 flex-1 space-y-8 p-6">
                <section>
                  <h3 className="text-muted-foreground mb-3 text-xs font-semibold tracking-wider uppercase">
                    Answer
                  </h3>
                  <div className="bg-card rounded-2xl border p-6 shadow-sm">
                    <div data-color-mode="light">
                      <MDEditor.Markdown
                        source={selected.answer}
                        style={{
                          background: "transparent",
                          fontFamily: "inherit",
                          fontSize: "0.95rem",
                          lineHeight: 1.75,
                        }}
                        className="[&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6"
                      />
                    </div>
                  </div>
                </section>

                <section className="min-w-0">
                  <div className="overflow-hidden rounded-2xl border shadow-sm">
                    <CodeReferences
                      key={selected.id}
                      filesReferences={toFileRefs(selected.filesReferences)}
                    />
                  </div>
                </section>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}