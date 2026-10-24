// src/app/(protected)/layout.tsx
import { UserButton } from "@clerk/nextjs";
import { type ReactNode } from "react";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";

export default function SidebarLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="m-2 w-full">
        <div className="border-sidebar-border bg-sidebar flex items-center gap-2 rounded-md border p-2 px-4 shadow">
          <div className="ml-auto" />
          <UserButton />
        </div>
        <div className="h-4" />
        <div className="border-sidebar-border bg-sidebar h-[calc(100vh-6rem)] overflow-y-scroll rounded-md border p-4 shadow">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}