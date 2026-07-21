import { PipelineBoard } from "@/components/kanban/pipeline-board";
import { mockDeals, mockLeads, mockMembers, mockWorkspaces } from "@/lib/mock-data";

export default function PipelinePage({
  params,
}: {
  params: { workspace: string };
}) {
  const workspace = mockWorkspaces.find((item) => item.slug === params.workspace);
  const workspaceId = workspace?.id ?? mockWorkspaces[0].id;

  const deals = mockDeals.filter((deal) => deal.workspaceId === workspaceId);
  const leads = mockLeads.filter((lead) => lead.workspaceId === workspaceId);

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="font-display text-2xl font-bold tracking-tight">
          Pipeline
        </h1>
        <p className="text-muted-foreground">
          Kanban de negócios por etapa de venda. Arraste os cards entre as
          colunas para atualizar a etapa.
        </p>
      </div>
      <PipelineBoard initialDeals={deals} leads={leads} members={mockMembers} />
    </div>
  );
}
