import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { CalendarDays } from "lucide-react";

import { cn, formatCurrency } from "@/lib/utils";
import type { MockMember } from "@/lib/mock-data";
import type { Deal } from "@/types/deal";
import type { Lead } from "@/types/lead";

import { pipelineStageClasses } from "./pipeline-stage";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function formatDueDate(dueDate: string) {
  return new Date(`${dueDate}T00:00:00`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
  });
}

export function DealCard({
  deal,
  lead,
  owner,
  onClick,
}: {
  deal: Deal;
  lead: Lead | undefined;
  owner: MockMember | undefined;
  onClick: () => void;
}) {
  const stage = pipelineStageClasses[deal.stage];
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: deal.id, data: { type: "deal", stage: deal.stage } });

  return (
    <button
      ref={setNodeRef}
      type="button"
      onClick={onClick}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className={cn(
        "group w-full rounded-lg border bg-card p-3 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg",
        stage.hoverBorder,
        isDragging && "opacity-40",
      )}
      {...attributes}
      {...listeners}
    >
      <p className="text-sm font-medium leading-snug text-foreground">
        {deal.title}
      </p>
      <p className={cn("mt-1.5 font-display text-base font-bold", stage.text)}>
        {formatCurrency(deal.value)}
      </p>
      {lead && (
        <p className="mt-1 truncate text-xs text-muted-foreground">
          {lead.name} · {lead.company}
        </p>
      )}
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <CalendarDays className="size-3.5" />
          {formatDueDate(deal.dueDate)}
        </div>
        {owner && (
          <div
            className="flex size-6 items-center justify-center rounded-full bg-secondary font-mono text-[10px] font-medium text-secondary-foreground"
            title={owner.name}
          >
            {getInitials(owner.name)}
          </div>
        )}
      </div>
    </button>
  );
}
