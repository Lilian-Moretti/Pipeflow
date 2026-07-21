"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { navItems } from "./nav-items";

interface SidebarNavProps {
  workspaceSlug: string;
  onNavigate?: () => void;
}

export function SidebarNav({ workspaceSlug, onNavigate }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1 px-3">
      {navItems.map((item) => {
        const href = `/${workspaceSlug}/${item.href}`;
        const isActive = pathname === href || pathname?.startsWith(`${href}/`);
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-gradient-to-r from-primary/10 to-transparent text-foreground"
                : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
            )}
          >
            <Icon className="size-4 shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
