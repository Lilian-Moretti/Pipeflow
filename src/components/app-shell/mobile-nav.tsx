"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/shared/logo";
import type { Workspace } from "@/types/workspace";
import { SidebarNav } from "./sidebar-nav";
import { WorkspaceSwitcher } from "./workspace-switcher";

interface MobileNavProps {
  workspaceSlug: string;
  workspaces: Workspace[];
}

export function MobileNav({ workspaceSlug, workspaces }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="size-5" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0">
        <div className="flex h-14 items-center gap-2 border-b px-4">
          <Logo size="sm" />
        </div>
        <div className="p-3">
          <WorkspaceSwitcher
            workspaces={workspaces}
            currentWorkspaceSlug={workspaceSlug}
          />
        </div>
        <SidebarNav
          workspaceSlug={workspaceSlug}
          onNavigate={() => setOpen(false)}
        />
      </SheetContent>
    </Sheet>
  );
}
