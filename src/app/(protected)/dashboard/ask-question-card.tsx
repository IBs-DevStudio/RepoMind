"use client";

import MDEditor from "@uiw/react-md-editor";
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
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [filesReferences, setFilesReferences] = useState<FileRef[]>([]);

  const saveAnswer = api.project.saveAnswer.useMutation();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!project) {
      toast.error("Select a project first");
      return;
    }

    setAnswer("");
    setFilesReferences([]);
    setLoading(true);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: project.id, question }),
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
        <DialogContent className="sm:max-w-[80vw]">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="logo" width={40} height={40} />
              <DialogTitle>Answer</DialogTitle>
              <Button
                className="ml-auto"
                variant="outline"
                disabled={saveAnswer.isPending || loading || !project}
                onClick={() =>
                  saveAnswer.mutate(
                    { projectId: project!.id, question, answer, filesReferences },
                    {
                      onSuccess: () => toast.success("Answer saved!"),
                      onError: () => toast.error("Failed to save answer!"),
                    },
                  )
                }
              >
                Save Answer
              </Button>
            </div>
          </DialogHeader>

          <div data-color-mode="light">
            <MDEditor.Markdown
              source={answer}
              className="max-h-[40vh] max-w-[70vw] overflow-auto rounded-md p-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6"
            />
          </div>
          <CodeReferences filesReferences={filesReferences} />

          <Button type="button" onClick={() => setOpen(false)}>
            Close
          </Button>
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