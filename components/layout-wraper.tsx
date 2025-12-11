"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { usePathname } from "next/navigation";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hideSidebar = pathname === "/login"; // 🔥 página de login SEM sidebar

  return (
    <div className="flex h-screen w-full">
      <div>{!hideSidebar && <AppSidebar />}</div>
      <div className="w-full ml-15">
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}
