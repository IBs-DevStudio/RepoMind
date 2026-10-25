"use client";

import MDEditor from "@uiw/react-md-editor";
import {
  Bookmark,
  Bot,
  Check,
  Copy,
  CornerDownLeft,
  FileCode2,
  Loader2,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { type FormEvent, useRef, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useProject } from "@/hooks/use-project";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import CodeReferences, { type FileRef } from "./code-references";

type Msg =
  | { type: "files"; files: FileRef[] }
  | { type: "delta"; text: string }
  | { type: "error"; message: string };

const QUICK_PROMPTS = [
  "How is user authentication & session handled?",
  "Explain the data flow from API endpoints to the database",
  "Where are database models and Prisma schemas defined?",
  "What third-party libraries and SDK integrations are used?",
];

interface AskQuestionCardProps {
  className?: string;
  showQuickPrompts?: boolean;
}

export default function AskQuestionCard({
  className,
  showQuickPrompts = true,
}: AskQuestionCardProps) {
  const { project } = useProject();
  const [question, setQuestion] = useState("");
  const [askedQuestion, setAskedQuestion] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [filesReferences, setFilesReferences] = useState<FileRef[]>([]);
  const [copied, setCopied] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const utils = api.useUtils();
  const saveAnswer = api.project.saveAnswer.useMutation();

  async function copyAnswer() {
    if (!answer) return;
    await navigator.clipboard.writeText(answer);
    setCopied(true);
    toast.success("Answer copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  }

  async function executeAsk(queryText: string) {
    if (!project) {
      toast.error("Please select a project first");
      return;
    }

    const q = queryText.trim();
    if (!q) return;

    setAskedQuestion(q);
    setAnswer("");
    setFilesReferences([]);
    setLoading(true);
    setOpen(true);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: project.id, question: q }),
      });

      if (!res.ok || !res.body) {
        toast.error("Failed to query codebase intelligence");
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const msg = JSON.parse(line) as Msg;
            if (msg.type === "files") setFilesReferences(msg.files);
            else if (msg.type === "delta") setAnswer((prev) => prev + msg.text);
            else if (msg.type === "error") toast.error(msg.message);
          } catch {
            // Ignore malformed chunk
          }
        }
      }
    } catch {
      toast.error("An unexpected error occurred while querying");
    } finally {
      setLoading(false);
    }
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await executeAsk(question);
  }

  function handleQuickPrompt(prompt: string) {
    setQuestion(prompt);
  }

  return (
    <>
      {/* Larger Than Life Synthesis Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex max-h-[92vh] w-full flex-col gap-0 overflow-hidden border border-border/80 p-0 shadow-2xl sm:max-w-5xl lg:max-w-6xl">
          {/* Dialog Header with Tagline & High-Tech Accents */}
          <DialogHeader className="bg-gradient-to-b from-muted/50 via-muted/20 to-background border-b p-6 pr-14">
            <div className="flex flex-col gap-4">
              {/* Badge & Engine Meta */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary">
                  <Sparkles className="size-3.5 animate-pulse text-primary" />
                  <span>REPO-MIND NEURAL SYNTHESIS</span>
                  <span className="text-muted-foreground/60">•</span>
                  <span className="text-muted-foreground font-normal">AST & Embeddings Active</span>
                </div>

                <div className="flex items-center gap-2">
                  {loading ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400">
                      <Loader2 className="size-3 animate-spin" />
                      Synthesizing Response...
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                      <ShieldCheck className="size-3.5" />
                      Zero-Hallucination Grounded
                    </span>
                  )}
                </div>
              </div>

              {/* Title, Tagline & Action Buttons */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-1">
                  <DialogTitle className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Image src="/logo.png" alt="logo" width={22} height={22} />
                    </div>
                    Architectural Code Intelligence
                  </DialogTitle>
                  {/* The requested prominent Tagline / Sentence */}
                  <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl font-normal leading-relaxed">
                    Synthesizing high-precision architectural insights directly from your repository&apos;s
                    abstract syntax trees, semantic vector embeddings, and commit graph.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!answer || loading}
                    onClick={copyAnswer}
                    className="h-8 gap-1.5 text-xs font-medium hover:bg-muted"
                  >
                    {copied ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
                    {copied ? "Copied" : "Copy"}
                  </Button>

                  <Button
                    size="sm"
                    disabled={saveAnswer.isPending || loading || !project || !answer}
                    onClick={() =>
                      saveAnswer.mutate(
                        {
                          projectId: project!.id,
                          question: askedQuestion,
                          answer,
                          filesReferences,
                        },
                        {
                          onSuccess: () => {
                            toast.success("Answer permanently saved to Project Q&A!");
                            if (project?.id) {
                              void utils.project.getQuestions.invalidate({
                                projectId: project.id,
                              });
                            }
                          },
                          onError: () => toast.error("Failed to save answer to knowledge base"),
                        },
                      )
                    }
                    className="h-8 gap-1.5 bg-primary text-primary-foreground text-xs font-medium shadow-sm hover:opacity-90"
                  >
                    {saveAnswer.isPending ? (
                      <Loader2 className="size-3.5 animate-spin" />
                    ) : (
                      <Bookmark className="size-3.5" />
                    )}
                    Save to Archive
                  </Button>
                </div>
              </div>

              {/* Inquired Question Spotlight Box */}
              <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-primary/[0.03] p-3.5 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 text-primary flex size-6 flex-none items-center justify-center rounded-md font-mono text-xs font-bold">
                    ?
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                      Inquired Question
                    </span>
                    <p className="mt-0.5 text-sm font-medium text-foreground line-clamp-2">
                      {askedQuestion}
                    </p>
                  </div>
                  {filesReferences.length > 0 && (
                    <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-md border">
                      <FileCode2 className="size-3 text-primary" />
                      <span>{filesReferences.length} files cited</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </DialogHeader>

          {/* Dialog Body */}
          <div className="flex-1 space-y-6 overflow-y-auto p-6">
            {/* Answer Box */}
            <div className="relative rounded-2xl border bg-card p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-2">
                  <div className="flex size-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Bot className="size-3.5" />
                  </div>
                  <h3 className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                    Synthesis & Analysis
                  </h3>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1 text-[11px]">
                    <Zap className="size-3 text-amber-500" />
                    Gemini Neural Reasoning
                  </span>
                </div>
              </div>

              {answer ? (
                <div data-color-mode="light" className="relative">
                  <MDEditor.Markdown
                    source={answer}
                    style={{
                      background: "transparent",
                      fontFamily: "inherit",
                      fontSize: "0.95rem",
                      lineHeight: 1.75,
                    }}
                    className="max-w-none text-foreground [&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_h1]:text-xl [&_h2]:text-lg [&_h3]:text-base [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6"
                  />
                  {loading && (
                    <span className="inline-block size-2 animate-pulse rounded-full bg-primary ml-1" />
                  )}
                </div>
              ) : (
                <div className="space-y-4 py-6">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Loader2 className="size-4 animate-spin text-primary" />
                    <span>Analyzing repository AST and vector index...</span>
                  </div>
                  <div className="space-y-2.5">
                    <div className="h-3.5 w-3/4 animate-pulse rounded bg-muted/80" />
                    <div className="h-3.5 w-full animate-pulse rounded bg-muted/60" />
                    <div className="h-3.5 w-5/6 animate-pulse rounded bg-muted/70" />
                  </div>
                </div>
              )}
            </div>

            {/* Referenced Files View */}
            <div className="space-y-3">
              <CodeReferences filesReferences={filesReferences} />
            </div>
          </div>

          {/* High-Tech Dialog Footer */}
          <div className="flex items-center justify-between border-t bg-muted/30 px-6 py-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5 font-mono text-[11px]">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              RepoMind Intelligence • Live Project Grounding
            </span>
            <span className="hidden sm:inline text-[11px]">
              Saved answers become permanent team knowledge
            </span>
          </div>
        </DialogContent>
      </Dialog>

      {/* Main Ask Card UI */}
      <Card
        className={cn(
          "relative overflow-hidden border border-border/80 bg-gradient-to-br from-card via-card to-primary/[0.02] shadow-sm transition-all hover:shadow-md",
          className ?? "col-span-3",
        )}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Sparkles className="size-4" />
              </div>
              <div>
                <CardTitle className="text-base sm:text-lg font-semibold tracking-tight">
                  Ask Codebase Intelligence
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  Ask in plain English. RepoMind synthesizes answers directly from repository source code.
                </p>
              </div>
            </div>

            <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 text-[11px] font-medium text-primary">
              <Zap className="size-3" />
              Semantic AST
            </span>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <form ref={formRef} onSubmit={onSubmit} className="space-y-3">
            <div className="relative">
              <Textarea
                placeholder="e.g. Which file should I edit to change the home page? How is authentication structured?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                    e.preventDefault();
                    if (!loading && question.trim()) {
                      formRef.current?.requestSubmit();
                    }
                  }
                }}
                rows={3}
                className="min-h-[90px] resize-none border-muted-foreground/20 bg-background/50 pr-4 text-sm leading-relaxed transition-all focus-visible:border-primary/50 focus-visible:ring-1 focus-visible:ring-primary/40"
              />
            </div>

            {/* Quick Starters Tray */}
            {showQuickPrompts && (
              <div className="space-y-1.5 pt-1">
                <p className="text-[11px] font-medium text-muted-foreground flex items-center gap-1">
                  <span>Suggested inquiries:</span>
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => handleQuickPrompt(prompt)}
                      className="rounded-lg border border-border/80 bg-muted/40 px-2.5 py-1 text-left text-xs font-normal text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-foreground"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-1">
              <span className="hidden sm:flex items-center gap-1 text-[11px] text-muted-foreground">
                <CornerDownLeft className="size-3" />
                Press <kbd className="rounded border bg-muted px-1 py-0.5 font-mono text-[10px]">Ctrl</kbd> + <kbd className="rounded border bg-muted px-1 py-0.5 font-mono text-[10px]">Enter</kbd> to ask
              </span>

              <Button
                type="submit"
                disabled={loading || !question.trim()}
                className="ml-auto gap-2 bg-primary text-primary-foreground shadow-sm hover:opacity-90"
              >
                {loading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>Reasoning...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="size-4" />
                    <span>Ask the codebase</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}