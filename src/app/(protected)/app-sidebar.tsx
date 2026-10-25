"use client";

import { Bot, CreditCard, LayoutDashboard, Plus, Presentation } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Sidebar,
  SidebarContent,
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
import { useProject } from "@/hooks/use-project";
import { cn } from "@/lib/utils";

const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Q&A", url: "/qa", icon: Bot },
  { title: "Meetings", url: "/meetings", icon: Presentation },
  { title: "Billing", url: "/billing", icon: CreditCard },
];

export function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { open } = useSidebar();
  const { projects, projectId, setProjectId, isLoading } = useProject();

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="logo" width={40} height={40} />
          {open && (
            <>
              <h1 className="text-primary/80 text-xl font-bold">
                Repo<span className="text-white">Logue</span>
              </h1>
              <SidebarTrigger className="ml-auto" />
            </>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
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

        <SidebarGroup>
          <SidebarGroupLabel>Your Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {isLoading &&
                Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-8 w-full" />
                ))}

              {projects?.map((project) => (
                <SidebarMenuItem key={project.id}>
                  <SidebarMenuButton
                    onClick={() => {
                      setProjectId(project.id);
                      router.push("/dashboard");
                    }}
                  >
                    <div
                      className={cn(
                        "flex size-6 items-center justify-center rounded-sm border text-sm",
                        project.id === projectId
                          ? "bg-primary text-primary-foreground"
                          : "bg-background text-primary",
                      )}
                    >
                      {project.name[0]}
                    </div>
                    <span>{project.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <div className="h-2" />
              {open && (
                <SidebarMenuItem>
                  <Link href="/create">
                    <Button size="sm" variant="outline" className="w-fit">
                      <Plus />
                      Create Project
                    </Button>
                  </Link>
                </SidebarMenuItem>
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
    </Sidebar>
  );
}