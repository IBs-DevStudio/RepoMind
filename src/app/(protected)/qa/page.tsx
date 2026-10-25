"use client";

import MDEditor from "@uiw/react-md-editor";
import { MessageSquareText } from "lucide-react";
import { useState } from "react";

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

const formatDate = (d: Date) =>
  new Date(d).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export default function QAPage() {
  const { projectId } = useProject();
  const { data: questions, isLoading } = api.project.getQuestions.useQuery(
    { projectId },
    { enabled: !!projectId },
  );

  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = questions?.find((q) => q.id === selectedId);

  return (
    <div>
      <AskQuestionCard />

      <div className="mt-6 mb-3 flex items-center gap-2">
        <h1 className="text-xl font-semibold tracking-tight">Saved questions</h1>
        {questions && (
          <span className="bg-muted text-muted-foreground rounded-full px-2 py-0.5 text-xs font-medium">
            {questions.length}
          </span>
        )}
      </div>

      {isLoading && (
        <div className="space-y-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="bg-muted h-[74px] animate-pulse rounded-xl" />
          ))}
        </div>
      )}

      {questions?.length === 0 && (
        <div className="text-muted-foreground rounded-xl border border-dashed p-8 text-center text-sm">
          No saved questions yet. Ask something above and click Save.
        </div>
      )}

      <div className="flex flex-col gap-2">
        {questions?.map((q) => (
          <button
            key={q.id}
            onClick={() => {
              setSelectedId(q.id);
              setOpen(true);
            }}
            className="bg-card hover:border-primary/40 flex items-center gap-4 rounded-xl border p-4 text-left shadow-sm transition hover:shadow-md"
          >
            {q.user.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={q.user.imageUrl}
                alt={q.user.firstName ?? "User"}
                className="size-9 flex-none rounded-full"
              />
            ) : (
              <div className="bg-primary/10 text-primary flex size-9 flex-none items-center justify-center rounded-full text-sm font-medium">
                {q.user.firstName?.[0] ?? "U"}
              </div>
            )}

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="line-clamp-1 font-medium">{q.question}</p>
                <span className="text-muted-foreground text-xs whitespace-nowrap">
                  {formatDate(q.createdAt)}
                </span>
              </div>
              <p className="text-muted-foreground line-clamp-1 text-sm">
                {q.answer}
              </p>
            </div>

            <MessageSquareText className="text-muted-foreground size-4 flex-none" />
          </button>
        ))}
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-3xl">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle className="pr-8 text-lg leading-snug">
                  {selected.question}
                </SheetTitle>
                <p className="text-muted-foreground text-xs">
                  Asked by {selected.user.firstName ?? "a teammate"} on{" "}
                  {formatDate(selected.createdAt)}
                </p>
              </SheetHeader>

              <div className="space-y-6 p-4 pt-0">
                <div className="bg-card rounded-xl border p-5 shadow-sm">
                  <div data-color-mode="light">
                    <MDEditor.Markdown
                      source={selected.answer}
                      style={{
                        background: "transparent",
                        fontFamily: "inherit",
                        fontSize: "0.925rem",
                        lineHeight: 1.7,
                      }}
                      className="[&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6"
                    />
                  </div>
                </div>

                <CodeReferences
                  key={selected.id}
                  filesReferences={toFileRefs(selected.filesReferences)}
                />
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}