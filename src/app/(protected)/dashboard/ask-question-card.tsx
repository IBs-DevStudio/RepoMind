"use client";

import MDEditor from "@uiw/react-md-editor";
import { Bookmark, Check, Copy, Loader2 } from "lucide-react";
import Image from "next/image";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useProject } from "@/hooks/use-project";
import { api } from "@/trpc/react";
import CodeReferences, { type FileRef } from "./code-references";

type Msg =
  | { type: "files"; files: FileRef[] }
  | { type: "delta"; text: string }
  | { type: "error"; message: string };

export default function AskQuestionCard() {
  const { project } = useProject();
  const [question, setQuestion] = useState("");
  const [askedQuestion, setAskedQuestion] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [filesReferences, setFilesReferences] = useState<FileRef[]>([]);
  const [copied, setCopied] = useState(false);

  const saveAnswer = api.project.saveAnswer.useMutation();

  async function copyAnswer() {
    await navigator.clipboard.writeText(answer);
    setCopied(true);
    toast.success("Answer copied");
    setTimeout(() => setCopied(false), 1500);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!project) {
      toast.error("Select a project first");
      return;
    }

    const q = question.trim();
    setAskedQuestion(q);
    setAnswer("");
    setFilesReferences([]);
    setLoading(true);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: project.id, question: q }),
      });
      if (!res.ok || !res.body) {
        toast.error("Failed to ask the question");
        return;
      }

      setOpen(true);
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
          const msg = JSON.parse(line) as Msg;
          if (msg.type === "files") setFilesReferences(msg.files);
          else if (msg.type === "delta") setAnswer((prev) => prev + msg.text);
          else toast.error(msg.message);
        }
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex max-h-[90vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-5xl">
          <DialogHeader className="border-b p-5 pr-14">
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 flex size-10 flex-none items-center justify-center rounded-lg">
                <Image src="/logo.png" alt="logo" width={24} height={24} />
              </div>

              <div className="min-w-0 flex-1">
                <DialogTitle className="flex items-center gap-2 text-base">
                  Answer
                  {loading && (
                    <span className="bg-primary/10 text-primary inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium">
                      <Loader2 className="size-3 animate-spin" />
                      Generating
                    </span>
                  )}
                </DialogTitle>
                <p className="text-muted-foreground mt-0.5 line-clamp-2 text-sm">
                  {askedQuestion}
                </p>
              </div>

              <div className="flex flex-none gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!answer || loading}
                  onClick={copyAnswer}
                >
                  {copied ? <Check /> : <Copy />}
                  Copy
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
                        onSuccess: () => toast.success("Answer saved!"),
                        onError: () => toast.error("Failed to save answer!"),
                      },
                    )
                  }
                >
                  {saveAnswer.isPending ? <Loader2 className="animate-spin" /> : <Bookmark />}
                  Save
                </Button>
              </div>
            </div>
          </DialogHeader>

          <div className="flex-1 space-y-6 overflow-y-auto p-5">
            <div className="bg-card rounded-xl border p-5 shadow-sm">
              {answer ? (
                <div data-color-mode="light">
                  <MDEditor.Markdown
                    source={answer}
                    style={{
                      background: "transparent",
                      fontFamily: "inherit",
                      fontSize: "0.925rem",
                      lineHeight: 1.7,
                    }}
                    className="max-w-none [&_h1]:text-lg [&_h2]:text-base [&_h3]:text-base [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6"
                  />
                </div>
              ) : (
                <div className="animate-pulse space-y-3">
                  <div className="bg-muted h-4 w-3/4 rounded" />
                  <div className="bg-muted h-4 w-full rounded" />
                  <div className="bg-muted h-4 w-5/6 rounded" />
                </div>
              )}
            </div>

            <CodeReferences filesReferences={filesReferences} />
          </div>
        </DialogContent>
      </Dialog>

      <Card className="relative col-span-3">
        <CardHeader>
          <CardTitle>Ask a question</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <Textarea
              placeholder="Which file should I edit to change the home page?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <div className="h-4" />
            <Button type="submit" disabled={loading || !question.trim()}>
              {loading ? "Thinking..." : "Ask the codebase"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}