import type { ReactNode } from "react";

import { Header } from "@/components/app-shell/header";
import { Sidebar } from "@/components/app-shell/sidebar";

export default function WorkspaceLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { workspace: string };
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar workspaceSlug={params.workspace} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header workspaceSlug={params.workspace} />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
