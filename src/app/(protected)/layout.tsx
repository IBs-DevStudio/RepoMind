import { type ReactNode } from "react";

import { GlobalTopBar } from "@/components/global-top-bar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";

export default function SidebarLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="m-2 w-full flex flex-col min-w-0">
        <GlobalTopBar />
        <div className="h-3" />
        <div className="border-sidebar-border bg-card/60 backdrop-blur-sm h-[calc(100vh-5.25rem)] overflow-y-auto rounded-xl border p-4 sm:p-6 shadow-xs">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}