"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import {
  Archive,
  Bot,
  ChevronDown,
  ChevronsUpDown,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Plus,
  Presentation,
  RotateCcw,
  Settings,
  User as UserIcon,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { EngramLogo } from "@/components/engram-logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

import { useProject } from "@/hooks/use-project";
import { useRefetch } from "@/hooks/use-refetch";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";

const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Q&A", url: "/qa", icon: Bot },
  { title: "Meetings", url: "/meetings", icon: Presentation },
  { title: "Team", url: "/team", icon: Users },
  { title: "Billing", url: "/billing", icon: CreditCard },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { open } = useSidebar();
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();
  const { projects, projectId, setProjectId, isLoading } = useProject();
  const refetch = useRefetch();

  const [showArchived, setShowArchived] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Credits data
  const { data: creditsBalance } = api.project.getMyCredits.useQuery();
  const credits = creditsBalance ?? 0;
  // Progress bar scale (assumes 100 base or dynamic threshold)
  const maxCredits = Math.max(100, Math.ceil(credits / 50) * 50);
  const progressPct = Math.min(100, Math.max(0, (credits / maxCredits) * 100));

  // Archived projects
  const { data: archivedProjects, isLoading: archivedLoading } =
    api.project.getArchivedProjects.useQuery();
  const restoreProject = api.project.restoreProject.useMutation();

  const handleRestore = (id: string, name: string) => {
    restoreProject.mutate(
      { projectId: id },
      {
        onSuccess: async () => {
          toast.success(`Restored "${name}"`);
          setProjectId(id);
          await refetch();
        },
        onError: (err) => {
          toast.error(err.message || "Failed to restore project");
        },
      },
    );
  };

  const displayName = user?.fullName || user?.firstName || "Developer";
  const userEmail = user?.primaryEmailAddress?.emailAddress || "";

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader className="py-2.5 px-3">
        <div className="flex items-start justify-between gap-2">
          {open ? (
            <>
              <EngramLogo size="md" showTagline />
              <SidebarTrigger className="size-7 flex-none ml-auto text-muted-foreground hover:text-foreground mt-0.5" />
            </>
          ) : (
            <div className="flex w-full items-center justify-center min-h-[36px]">
              <EngramLogo collapsed size="sm" />
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Main Application Nav */}
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      render={<Link href={item.url} />}
                      isActive={active}
                      className={cn(
                        active &&
                          "data-[active=true]:bg-primary! data-[active=true]:text-primary-foreground! hover:bg-primary! hover:text-primary-foreground!",
                      )}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Your Projects Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Your Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {isLoading &&
                Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-8 w-full" />
                ))}

              {projects?.map((p) => (
                <SidebarMenuItem key={p.id}>
                  <SidebarMenuButton
                    onClick={() => {
                      setProjectId(p.id);
                      router.push("/dashboard");
                    }}
                    isActive={p.id === projectId}
                  >
                    <div
                      className={cn(
                        "flex size-6 items-center justify-center rounded-sm border text-sm font-semibold",
                        p.id === projectId
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background text-primary border-border/80",
                      )}
                    >
                      {p.name[0]?.toUpperCase()}
                    </div>
                    <span>{p.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

                {open && (
                  <div className="pt-2">
                    <SidebarMenuItem>
                      <Link href="/create">
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full justify-start gap-2 border-dashed border-border/80 text-muted-foreground hover:text-foreground"
                        >
                          <Plus className="size-4" />
                          <span>Create Project</span>
                        </Button>
                      </Link>
                    </SidebarMenuItem>
                  </div>
                )}

                {/* Archived Projects (Collapsible Link) */}
                {open && archivedProjects && archivedProjects.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-sidebar-border/70">
                    <button
                      type="button"
                      onClick={() => setShowArchived((prev) => !prev)}
                      className="flex w-full items-center justify-between px-2 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-sidebar-accent/50 cursor-pointer"
                    >
                      <div className="flex items-center gap-1.5">
                        <Archive className="size-3.5 text-muted-foreground" />
                        <span>Archived projects</span>
                        <span className="rounded-full bg-muted/80 px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
                          {archivedProjects.length}
                        </span>
                      </div>
                      <ChevronDown
                        className={cn(
                          "size-3.5 transition-transform duration-200 text-muted-foreground",
                          showArchived && "rotate-180",
                        )}
                      />
                    </button>

                    {showArchived && (
                      <div className="mt-1.5 space-y-1 pl-1">
                        {archivedProjects.map((p) => (
                          <div
                            key={p.id}
                            className="flex items-center justify-between rounded-lg border border-sidebar-border/60 bg-sidebar-accent/25 px-2 py-1.5 text-xs transition-colors hover:bg-sidebar-accent/50"
                          >
                            <div className="flex items-center gap-2 min-w-0 pr-1.5">
                              <div className="flex size-5 flex-none items-center justify-center rounded bg-muted/70 text-[10px] font-semibold text-muted-foreground">
                                {p.name[0]?.toUpperCase()}
                              </div>
                              <span className="truncate text-xs font-medium text-muted-foreground">
                                {p.name}
                              </span>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 px-1.5 text-[11px] font-medium text-primary hover:text-primary hover:bg-primary/10 gap-1 flex-none"
                              disabled={restoreProject.isPending}
                              onClick={() => handleRestore(p.id, p.name)}
                              title="Restore project to active list"
                            >
                              <RotateCcw className="size-3" />
                              <span>Restore</span>
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {!open && (
            <>
              <SidebarSeparator />
              <SidebarTrigger className="self-center" />
            </>
          )}
        </SidebarContent>

        {/* Sidebar Footer: Credits Meter + User Profile Row */}
        <SidebarFooter className="p-2.5 gap-2.5 border-t border-sidebar-border/70 bg-sidebar/50">
          {/* 1. Credits Meter */}
          {open ? (
            <div className="rounded-xl border border-sidebar-border/80 bg-sidebar-accent/40 p-3 shadow-2xs transition-all">
              <div className="flex items-center justify-between gap-1.5 mb-2">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                  <Zap className="size-3.5 text-amber-500 fill-amber-500/20" />
                  <span>{credits} credits left</span>
                </div>
                <Link href="/billing">
                  <span className="text-[11px] font-semibold text-primary hover:underline cursor-pointer">
                    Upgrade
                  </span>
                </Link>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted/70">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-violet-500 transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          ) : (
            <Link
              href="/billing"
              title={`${credits} credits left — Click to upgrade`}
              className="flex size-9 items-center justify-center rounded-lg border border-sidebar-border/70 bg-sidebar-accent/40 text-foreground hover:bg-sidebar-accent hover:text-primary transition-colors mx-auto"
            >
              <Zap className="size-4 text-amber-500 fill-amber-500/20" />
            </Link>
          )}

          {/* 2. User Profile Row with Dropdown Sign-Out Menu */}
          {!mounted ? (
            open ? (
              <div className="flex w-full items-center gap-2.5 rounded-xl border border-sidebar-border/70 bg-sidebar-accent/20 p-2">
                <div className="size-8 rounded-full bg-muted/60 animate-pulse" />
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="h-3 w-20 rounded bg-muted/60 animate-pulse" />
                  <div className="h-2.5 w-28 rounded bg-muted/60 animate-pulse" />
                </div>
              </div>
            ) : (
              <div className="size-9 rounded-lg border border-sidebar-border/70 bg-muted/40 animate-pulse mx-auto" />
            )
          ) : open ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <button
                    type="button"
                    className="flex w-full items-center justify-between rounded-xl border border-sidebar-border/70 bg-sidebar-accent/30 p-2 text-left hover:bg-sidebar-accent/70 transition-colors group cursor-pointer outline-hidden"
                  />
                }
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                  {user?.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={user.imageUrl}
                      alt={displayName}
                      className="size-8 rounded-full border border-border/80 object-cover flex-none bg-muted shadow-2xs"
                    />
                  ) : (
                    <div className="flex size-8 flex-none items-center justify-center rounded-full bg-primary/15 text-primary text-xs font-semibold">
                      {displayName[0]?.toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-foreground">
                      {displayName}
                    </p>
                    <p className="truncate text-[11px] text-muted-foreground">
                      {userEmail}
                    </p>
                  </div>
                </div>
                <ChevronsUpDown className="size-4 text-muted-foreground group-hover:text-foreground flex-none transition-colors" />
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" sideOffset={8} className="w-60">
                <DropdownMenuLabel className="normal-case">
                  <div className="flex items-center gap-2.5 py-1">
                    {user?.imageUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={user.imageUrl}
                        alt=""
                        className="size-8 rounded-full border border-border/80 object-cover"
                      />
                    )}
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-foreground truncate">
                        {displayName}
                      </p>
                      <p className="text-[11px] text-muted-foreground font-normal truncate">
                        {userEmail}
                      </p>
                    </div>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => openUserProfile()}>
                  <UserIcon className="size-4" />
                  <span>Manage Account</span>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => router.push("/billing")}>
                  <CreditCard className="size-4" />
                  <span>Billing & Credits</span>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => router.push("/settings")}>
                  <Settings className="size-4" />
                  <span>Project Settings</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() => signOut({ redirectUrl: "/sign-in" })}
                  className="text-red-600 focus:text-red-600 focus:bg-red-500/10 dark:text-red-400"
                >
                  <LogOut className="size-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <button
                    type="button"
                    className="flex size-9 items-center justify-center rounded-lg border border-sidebar-border/70 hover:bg-sidebar-accent transition-colors mx-auto cursor-pointer outline-hidden"
                    title={displayName}
                  />
                }
              >
                {user?.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.imageUrl}
                    alt={displayName}
                    className="size-7 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex size-7 items-center justify-center rounded-full bg-primary/15 text-primary text-xs font-semibold">
                    {displayName[0]?.toUpperCase()}
                  </div>
                )}
              </DropdownMenuTrigger>

              <DropdownMenuContent align="start" sideOffset={8} className="w-56">
                <DropdownMenuLabel className="normal-case">
                  <p className="text-xs font-semibold text-foreground truncate">
                    {displayName}
                  </p>
                  <p className="text-[11px] text-muted-foreground font-normal truncate">
                    {userEmail}
                  </p>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => openUserProfile()}>
                  <UserIcon className="size-4" />
                  <span>Manage Account</span>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => router.push("/billing")}>
                  <CreditCard className="size-4" />
                  <span>Billing & Credits</span>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => router.push("/settings")}>
                  <Settings className="size-4" />
                  <span>Settings</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() => signOut({ redirectUrl: "/sign-in" })}
                  className="text-red-600 focus:text-red-600 focus:bg-red-500/10 dark:text-red-400"
                >
                  <LogOut className="size-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </SidebarFooter>
      </Sidebar>
  );
}