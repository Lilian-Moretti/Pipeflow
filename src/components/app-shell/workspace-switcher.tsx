"use client";

import { useRouter } from "next/navigation";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Workspace } from "@/types/workspace";

interface WorkspaceSwitcherProps {
  workspaces: Workspace[];
  currentWorkspaceSlug: string;
}

export function WorkspaceSwitcher({
  workspaces,
  currentWorkspaceSlug,
}: WorkspaceSwitcherProps) {
  const router = useRouter();
  const current =
    workspaces.find((workspace) => workspace.slug === currentWorkspaceSlug) ??
    workspaces[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between px-3">
          <span className="truncate">{current.name}</span>
          <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-[--radix-dropdown-menu-trigger-width]"
      >
        <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {workspaces.map((workspace) => (
          <DropdownMenuItem
            key={workspace.id}
            className="justify-between"
            onSelect={() => router.push(`/${workspace.slug}/dashboard`)}
          >
            <span className="truncate">{workspace.name}</span>
            {workspace.slug === current.slug && <Check className="size-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
