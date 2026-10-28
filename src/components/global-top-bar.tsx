"use client";


import {
  Bot,
  Command,
  CreditCard,
  ExternalLink,
  FolderGit2,
  LayoutDashboard,
  Plus,
  Presentation,
  Search,
  Settings,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FaGithub } from "react-icons/fa";

import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useProject } from "@/hooks/use-project";
import { api } from "@/trpc/react";

interface NavigationItem {
  title: string;
  url: string;
  icon: typeof LayoutDashboard;
  description: string;
}

const NAV_ITEMS: NavigationItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    description: "Main workspace & AI repository copilot",
  },
  {
    title: "Q&A Archive",
    url: "/qa",
    icon: Bot,
    description: "Saved questions & AI explanations",
  },
  {
    title: "Meeting Intelligence",
    url: "/meetings",
    icon: Presentation,
    description: "Audio uploads, meeting chapters & action issues",
  },
  {
    title: "Team & Collaborators",
    url: "/team",
    icon: Users,
    description: "Manage project members and shareable invite link",
  },
  {
    title: "Billing & Plans",
    url: "/billing",
    icon: CreditCard,
    description: "Manage subscription & API usage limits",
  },
  {
    title: "Project Settings",
    url: "/settings",
    icon: Settings,
    description: "Configure repository tokens, project name, or archive",
  },
  {
    title: "Create Project",
    url: "/create",
    icon: Plus,
    description: "Index and connect a new GitHub repository",
  },
];

export function GlobalTopBar() {
  const router = useRouter();
  const { project, projects, projectId, setProjectId } = useProject();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"all" | "commits" | "navigation" | "projects">("all");

  const { data: commits } = api.project.getCommits.useQuery(
    { projectId: projectId ?? "" },
    { enabled: !!projectId && open },
  );

  // Global keyboard shortcut: Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const repoUrl = project?.githubUrl?.replace(/(\.git)?\/?$/, "");

  // Filtered Commits
  const filteredCommits = useMemo(() => {
    if (!commits || !query.trim()) return (commits ?? []).slice(0, 5);
    const q = query.toLowerCase();
    return commits
      .filter(
        (c) =>
          c.commitMessage.toLowerCase().includes(q) ||
          c.commitAuthorName.toLowerCase().includes(q) ||
          c.commitHash.toLowerCase().includes(q) ||
          c.summary.toLowerCase().includes(q),
      )
      .slice(0, 8);
  }, [commits, query]);

  // Filtered Navigation
  const filteredNav = useMemo(() => {
    if (!query.trim()) return NAV_ITEMS;
    const q = query.toLowerCase();
    return NAV_ITEMS.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q),
    );
  }, [query]);

  // Filtered Projects
  const filteredProjects = useMemo(() => {
    if (!projects || !query.trim()) return (projects ?? []).slice(0, 4);
    const q = query.toLowerCase();
    return projects
      .filter((p) => p.name.toLowerCase().includes(q) || p.githubUrl.toLowerCase().includes(q))
      .slice(0, 4);
  }, [projects, query]);

  const handleAskAI = (promptText: string) => {
    setOpen(false);
    setQuery("");
    router.push("/dashboard");
    // Dispatch custom event to load prompt into AskQuestionCard
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("ask-repo-question", {
          detail: { question: promptText },
        }),
      );
    }, 150);
  };

  const handleSelectNav = (url: string) => {
    setOpen(false);
    setQuery("");
    router.push(url);
  };

  const handleSelectProject = (id: string) => {
    setProjectId(id);
    setOpen(false);
    setQuery("");
    router.push("/dashboard");
  };

  return (
    <>
      <header className="relative flex items-center justify-between gap-2 sm:gap-3 rounded-xl border border-border/80 bg-card/80 px-2.5 py-2 sm:px-4 sm:py-2.5 backdrop-blur-xl shadow-xs transition-all">
        {/* Left Side: Sidebar trigger + Active Project badge */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <SidebarTrigger className="text-muted-foreground transition-colors hover:text-foreground touch-friendly" />

          {project && (
            <div className="hidden sm:flex items-center gap-2 rounded-lg border border-border/70 bg-muted/30 px-2.5 py-1 text-xs font-medium text-foreground transition-colors">
              <FolderGit2 className="size-3.5 text-primary" />
              <span className="max-w-[140px] truncate md:max-w-[200px]">
                {project.name}
              </span>
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          )}
        </div>

        {/* Center: Search Bar Trigger */}
        <div className="flex flex-1 justify-center max-w-xl px-1 sm:px-2 min-w-0">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="group relative flex h-9 sm:h-9.5 w-full items-center justify-between gap-2 sm:gap-3 rounded-xl border border-border/80 bg-background/50 px-2.5 sm:px-3 text-xs text-muted-foreground transition-all hover:border-primary/50 hover:bg-background/80 hover:text-foreground hover:shadow-xs touch-friendly"
          >
            <div className="flex items-center gap-2 truncate min-w-0">
              <Search className="size-3.5 sm:size-4 text-muted-foreground transition-colors group-hover:text-primary flex-none" />
              <span className="truncate hidden sm:inline">
                Search commits, projects, or ask Engram...
              </span>
              <span className="truncate sm:hidden text-[11px]">
                Search or ask AI...
              </span>
            </div>

            <div className="flex items-center gap-1.5 flex-none">
              <kbd className="pointer-events-none hidden items-center gap-0.5 rounded-md border border-border/80 bg-muted/60 px-1.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground sm:inline-flex">
                <Command className="size-2.5" /> K
              </kbd>
            </div>
          </button>
        </div>

        {/* Right Side: GitHub link, Theme Toggle, Clerk Profile */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {project?.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex"
            >
              <Button
                variant="ghost"
                size="icon"
                className="size-8.5 rounded-lg border border-border/70 bg-background/50 text-muted-foreground transition-colors hover:border-primary/40 hover:bg-accent hover:text-foreground touch-friendly"
                title="Open GitHub Repository"
              >
                <FaGithub className="size-4" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
          )}

          <ThemeToggle />
        </div>
      </header>

      {/* Global Command / Search Palette Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[94vw] max-w-2xl max-h-[88dvh] overflow-hidden p-0 gap-0 border-border/80 bg-card/95 backdrop-blur-2xl shadow-2xl rounded-2xl">
          <DialogHeader className="sr-only">
            <DialogTitle>Search Repository & Workspace</DialogTitle>
          </DialogHeader>

          {/* Search Input Bar */}
          <div className="relative flex items-center border-b border-border/70 px-4 py-3">
            <Search className="size-4.5 text-primary mr-3 flex-none" />
            <input
              autoFocus
              type="text"
              placeholder="Search commits, projects, or type to ask AI..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && query.trim()) {
                  e.preventDefault();
                  handleAskAI(query.trim());
                }
              }}
              className="h-7 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-1.5 border-b border-border/50 bg-muted/20 px-4 py-2">
            {(
              [
                { id: "all", label: "All" },
                { id: "commits", label: "Commits" },
                { id: "navigation", label: "Navigation" },
                { id: "projects", label: "Projects" },
              ] as const
            ).map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                  category === cat.id
                    ? "bg-primary text-primary-foreground shadow-2xs"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Results Area */}
          <div className="max-h-[380px] overflow-y-auto p-3 space-y-4">
            {/* Ask AI Option */}
            {query.trim().length > 0 && (
              <div>
                <p className="px-2 pb-1.5 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                  Engram Codebase Copilot
                </p>
                <button
                  type="button"
                  onClick={() => handleAskAI(query.trim())}
                  className="flex w-full items-center justify-between rounded-xl border border-primary/20 bg-primary/5 p-3 text-left transition-all hover:border-primary/50 hover:bg-primary/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-7 items-center justify-center rounded-lg bg-primary/20 text-primary">
                      <Sparkles className="size-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Ask Engram: &ldquo;<span className="text-primary font-semibold">{query}</span>&rdquo;
                      </p>
                      <p className="text-xs text-muted-foreground">
                        our codebase’s memory &bull; search indexed codebase embeddings & generate answers
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-primary/30 text-primary text-[10px]">
                    Press Enter
                  </Badge>
                </button>
              </div>
            )}

            {/* Commits Section */}
            {(category === "all" || category === "commits") && filteredCommits.length > 0 && (
              <div>
                <p className="px-2 pb-1.5 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                  Commits ({filteredCommits.length})
                </p>
                <div className="space-y-1">
                  {filteredCommits.map((commit) => {
                    const firstLine = commit.commitMessage.split("\n")[0] ?? "";
                    return (
                      <div
                        key={commit.id}
                        className="group flex items-center justify-between rounded-lg p-2 text-left transition-colors hover:bg-muted/50"
                      >
                        <div className="flex items-center gap-2.5 min-w-0 pr-2">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={commit.commitAuthorAvatar}
                            alt={commit.commitAuthorName}
                            className="size-6 rounded-full border border-border/80 bg-muted flex-none"
                          />
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-foreground truncate">
                              {firstLine}
                            </p>
                            <p className="text-[11px] text-muted-foreground">
                              {commit.commitAuthorName} &bull;{" "}
                              {new Date(commit.commitDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        {repoUrl && (
                          <Link
                            href={`${repoUrl}/commit/${commit.commitHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-none items-center gap-1 rounded bg-muted/60 px-2 py-0.5 font-mono text-[11px] text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                          >
                            <span>{commit.commitHash.slice(0, 7)}</span>
                            <ExternalLink className="size-2.5" />
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Navigation Section */}
            {(category === "all" || category === "navigation") && filteredNav.length > 0 && (
              <div>
                <p className="px-2 pb-1.5 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                  Navigation
                </p>
                <div className="space-y-1">
                  {filteredNav.map((item) => (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => handleSelectNav(item.url)}
                      className="flex w-full items-center justify-between rounded-lg p-2 text-left transition-colors hover:bg-muted/50"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="flex size-7 items-center justify-center rounded-md bg-muted/70 text-foreground">
                          <item.icon className="size-3.5" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-foreground">
                            {item.title}
                          </p>
                          <p className="text-[11px] text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono text-muted-foreground">
                        {item.url}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Projects Section */}
            {(category === "all" || category === "projects") && filteredProjects.length > 0 && (
              <div>
                <p className="px-2 pb-1.5 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                  Switch Projects
                </p>
                <div className="space-y-1">
                  {filteredProjects.map((p) => {
                    const isActive = p.id === projectId;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => handleSelectProject(p.id)}
                        className={`flex w-full items-center justify-between rounded-lg p-2 text-left transition-colors ${
                          isActive ? "bg-primary/10 border border-primary/20" : "hover:bg-muted/50"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0 pr-2">
                          <div
                            className={`flex size-6 items-center justify-center rounded border text-xs font-semibold ${
                              isActive
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-muted text-foreground border-border/80"
                            }`}
                          >
                            {p.name[0]?.toUpperCase()}
                          </div>
                          <span className="text-xs font-medium text-foreground truncate">
                            {p.name}
                          </span>
                        </div>
                        {isActive && (
                          <Badge variant="outline" className="border-primary/40 text-primary text-[10px]">
                            Active
                          </Badge>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Empty State */}
            {query.trim().length > 0 &&
              filteredCommits.length === 0 &&
              filteredNav.length === 0 &&
              filteredProjects.length === 0 && (
                <div className="py-8 text-center">
                  <p className="text-sm font-medium text-foreground">
                    No results found for &ldquo;{query}&rdquo;
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Try searching for commit messages, author names, or press Enter to ask AI.
                  </p>
                </div>
              )}
          </div>

          {/* Footer Shortcuts */}
          <div className="flex items-center justify-between border-t border-border/60 bg-muted/30 px-4 py-2 text-[11px] text-muted-foreground">
            <span>
              Tip: Press <kbd className="rounded border bg-muted px-1 font-mono text-[10px]">Enter</kbd> to ask the AI model directly
            </span>
            <span>
              <kbd className="rounded border bg-muted px-1 font-mono text-[10px]">Esc</kbd> to close
            </span>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
