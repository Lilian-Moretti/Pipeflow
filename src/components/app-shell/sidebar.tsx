import { mockWorkspaces } from "@/lib/mock-data";
import { Logo } from "@/components/shared/logo";
import { SidebarNav } from "./sidebar-nav";
import { WorkspaceSwitcher } from "./workspace-switcher";

export function Sidebar({ workspaceSlug }: { workspaceSlug: string }) {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r bg-background md:flex">
      <div className="flex h-14 items-center gap-2 border-b px-4">
        <Logo size="sm" />
      </div>
      <div className="p-3">
        <WorkspaceSwitcher
          workspaces={mockWorkspaces}
          currentWorkspaceSlug={workspaceSlug}
        />
      </div>
      <SidebarNav workspaceSlug={workspaceSlug} />
    </aside>
  );
}
