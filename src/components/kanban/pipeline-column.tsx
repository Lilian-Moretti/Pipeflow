import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn, formatCurrency } from "@/lib/utils";
import type { MockMember } from "@/lib/mock-data";
import type { Deal, DealStage } from "@/types/deal";
import type { Lead } from "@/types/lead";

import { DealCard } from "./deal-card";
import { pipelineStageClasses, pipelineStageLabels } from "./pipeline-stage";

export function PipelineColumn({
  stage,
  deals,
  leadsById,
  membersById,
  index,
  onAddDeal,
  onSelectDeal,
}: {
  stage: DealStage;
  deals: Deal[];
  leadsById: Map<string, Lead>;
  membersById: Map<string, MockMember>;
  index: number;
  onAddDeal: (stage: DealStage) => void;
  onSelectDeal: (deal: Deal) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: stage });
  const classes = pipelineStageClasses[stage];
  const total = deals.reduce((sum, deal) => sum + deal.value, 0);

  return (
    <div
      className="animate-fade-slide-up flex w-72 shrink-0 flex-col gap-3"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex items-center justify-between px-0.5">
        <div className="flex items-center gap-2">
          <span className={cn("size-2 rounded-full", classes.dot)} />
          <h2 className="text-sm font-semibold text-foreground">
            {pipelineStageLabels[stage]}
          </h2>
          <span className="text-xs text-muted-foreground">{deals.length}</span>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-6"
          onClick={() => onAddDeal(stage)}
        >
          <Plus className="size-4" />
          <span className="sr-only">Novo negócio</span>
        </Button>
      </div>

      <p className="px-0.5 font-mono text-xs text-muted-foreground">
        {formatCurrency(total)}
      </p>

      <div
        ref={setNodeRef}
        className={cn(
          "flex min-h-24 flex-1 flex-col gap-2 rounded-xl border border-dashed border-transparent p-1.5 transition-colors",
          isOver && cn("border-current", classes.text, classes.bgSoft),
        )}
      >
        <SortableContext
          items={deals.map((deal) => deal.id)}
          strategy={verticalListSortingStrategy}
        >
          {deals.map((deal) => (
            <DealCard
              key={deal.id}
              deal={deal}
              lead={leadsById.get(deal.leadId)}
              owner={membersById.get(deal.ownerId)}
              onClick={() => onSelectDeal(deal)}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
