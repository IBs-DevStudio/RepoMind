import { type ReactNode } from "react";

import { GlobalTopBar } from "@/components/global-top-bar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";

export default function SidebarLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="m-1 sm:m-2 w-full flex flex-col min-w-0">
        <GlobalTopBar />
        <div className="h-2 sm:h-3" />
        <div className="border-sidebar-border bg-card/60 backdrop-blur-sm h-[calc(100dvh-4.5rem)] sm:h-[calc(100dvh-5.25rem)] overflow-y-auto rounded-xl border p-3 sm:p-5 md:p-6 shadow-xs">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
