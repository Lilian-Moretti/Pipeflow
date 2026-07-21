import { notFound } from "next/navigation";

import { LeadsManager } from "@/components/leads/leads-manager";
import { mockLeads, mockMembers, mockWorkspaces } from "@/lib/mock-data";

export default function LeadsPage({
  params,
}: {
  params: { workspace: string };
}) {
  const workspace = mockWorkspaces.find(
    (item) => item.slug === params.workspace,
  );
  if (!workspace) notFound();

  const leads = mockLeads.filter((lead) => lead.workspaceId === workspace.id);

  return (
    <LeadsManager
      workspaceSlug={workspace.slug}
      workspaceId={workspace.id}
      initialLeads={leads}
      members={mockMembers}
    />
  );
}
