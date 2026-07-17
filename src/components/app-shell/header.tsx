import { mockUser, mockWorkspaces } from "@/lib/mock-data";
import { MobileNav } from "./mobile-nav";
import { UserMenu } from "./user-menu";

export function Header({ workspaceSlug }: { workspaceSlug: string }) {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-6">
      <div className="flex items-center gap-2">
        <MobileNav workspaceSlug={workspaceSlug} workspaces={mockWorkspaces} />
      </div>
      <UserMenu user={mockUser} />
    </header>
  );
}
