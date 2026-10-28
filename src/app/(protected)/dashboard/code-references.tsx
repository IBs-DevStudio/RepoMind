"use client";

import { Check, Copy, FileCode2 } from "lucide-react";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

export type FileRef = { fileName: string; sourceCode: string };

const LANGS: Record<string, string> = {
  ts: "typescript", tsx: "tsx", js: "javascript", jsx: "jsx", mjs: "javascript",
  py: "python", go: "go", rs: "rust", java: "java", rb: "ruby", php: "php",
  cs: "csharp", cpp: "cpp", c: "c", css: "css", html: "html", json: "json",
  yml: "yaml", yaml: "yaml", sql: "sql", sh: "bash",
  // Markdown and unknown types render as plain text, which reads better than tokens.
  md: "text",
};

const extOf = (fileName: string) => fileName.split(".").pop()?.toLowerCase() ?? "";
const langOf = (fileName: string) => LANGS[extOf(fileName)] ?? "text";
const baseName = (fileName: string) => fileName.split("/").pop() ?? fileName;
const dirName = (fileName: string) => fileName.split("/").slice(0, -1).join("/");

export default function CodeReferences({ filesReferences }: { filesReferences: FileRef[] }) {
  const [tab, setTab] = useState("");
  const [copied, setCopied] = useState(false);

  if (filesReferences.length === 0) return null;
  const active = filesReferences.find((f) => f.fileName === tab) ?? filesReferences[0]!;

  async function copyCode() {
    await navigator.clipboard.writeText(active.sourceCode);
    setCopied(true);
    toast.success("Code copied");
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <section>
      <div className="mb-3 flex items-center gap-2">
        <h3 className="text-sm font-semibold">Referenced files</h3>
        <span className="bg-muted text-muted-foreground rounded-full px-2 py-0.5 text-xs font-medium">
          {filesReferences.length}
        </span>
      </div>

      <div className="bg-card overflow-hidden rounded-xl border shadow-sm">
        <div className="grid md:grid-cols-[250px_1fr]">
          {/* File list - Horizontal pills on mobile, vertical list on desktop */}
          <ul className="bg-muted/40 flex md:flex-col overflow-x-auto md:overflow-y-auto max-h-[160px] md:max-h-[340px] gap-1 p-2 border-b md:border-r md:border-b-0 touch-pan-x">
            {filesReferences.map((file) => {
              const isActive = active.fileName === file.fileName;
              return (
                <li key={file.fileName} className="shrink-0 md:shrink md:w-full">
                  <button
                    onClick={() => setTab(file.fileName)}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-2.5 py-1.5 md:py-2 text-left transition-colors touch-friendly w-full min-w-[140px] md:min-w-0",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "hover:bg-muted text-foreground",
                    )}
                  >
                    <FileCode2
                      className={cn(
                        "size-4 flex-none",
                        isActive ? "text-primary-foreground" : "text-muted-foreground",
                      )}
                    />
                    <span className="min-w-0">
                      <span className="block truncate text-xs md:text-sm font-medium">
                        {baseName(file.fileName)}
                      </span>
                      {dirName(file.fileName) && (
                        <span
                          className={cn(
                            "block truncate font-mono text-[10px] md:text-[11px]",
                            isActive ? "text-primary-foreground/70" : "text-muted-foreground",
                          )}
                        >
                          {dirName(file.fileName)}
                        </span>
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Code viewer */}
          <div className="min-w-0">
            <div className="bg-muted/40 flex items-center justify-between gap-2 sm:gap-3 border-b px-3 sm:px-4 py-2">
              <p className="text-muted-foreground truncate font-mono text-xs min-w-0">
                {active.fileName}
              </p>
              <div className="flex flex-none items-center gap-1.5 sm:gap-2">
                <span className="bg-background text-muted-foreground rounded-md border px-1.5 py-0.5 font-mono text-[10px] uppercase">
                  {extOf(active.fileName) || "txt"}
                </span>
                <button
                  onClick={copyCode}
                  className="text-muted-foreground hover:bg-background hover:text-foreground inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs transition-colors touch-friendly cursor-pointer active:scale-95"
                >
                  {copied ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>

            <div className="max-h-[300px] overflow-auto touch-pan-x">
              <SyntaxHighlighter
                language={langOf(active.fileName)}
                style={oneDark}
                showLineNumbers
                customStyle={{
                  margin: 0,
                  borderRadius: 0,
                  fontSize: "0.78rem",
                  lineHeight: 1.6,
                  minHeight: "100%",
                }}
              >
                {active.sourceCode}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}