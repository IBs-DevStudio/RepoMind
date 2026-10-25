"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { lucario } from "react-syntax-highlighter/dist/esm/styles/prism";

import { cn } from "@/lib/utils";

export type FileRef = { fileName: string; sourceCode: string };

const LANGS: Record<string, string> = {
  ts: "typescript", tsx: "tsx", js: "javascript", jsx: "jsx", mjs: "javascript",
  py: "python", go: "go", rs: "rust", java: "java", rb: "ruby", php: "php",
  cs: "csharp", cpp: "cpp", c: "c", css: "css", html: "html", json: "json",
  md: "markdown", yml: "yaml", yaml: "yaml", sql: "sql", sh: "bash",
};

const langOf = (fileName: string) =>
  LANGS[fileName.split(".").pop()?.toLowerCase() ?? ""] ?? "text";

export default function CodeReferences({ filesReferences }: { filesReferences: FileRef[] }) {
  const [tab, setTab] = useState("");

  if (filesReferences.length === 0) return null;
  const active = filesReferences.find((f) => f.fileName === tab) ?? filesReferences[0]!;

  return (
    <div className="max-w-[70vw]">
      <div className="bg-muted flex gap-2 overflow-x-auto rounded-md p-1">
        {filesReferences.map((file) => (
          <button
            key={file.fileName}
            onClick={() => setTab(file.fileName)}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors",
              active.fileName === file.fileName
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-background",
            )}
          >
            {file.fileName}
          </button>
        ))}
      </div>
      <div className="mt-2 max-h-[40vh] overflow-auto rounded-md">
        <SyntaxHighlighter language={langOf(active.fileName)} style={lucario}>
          {active.sourceCode}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}