"use client";

import { useMemo, useState } from "react";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import type { MockMember } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import type { Deal, DealStage } from "@/types/deal";
import type { Lead } from "@/types/lead";

import { DealCard } from "./deal-card";
import { DealFormDialog, type DealFormValues } from "./deal-form-dialog";
import { PipelineColumn } from "./pipeline-column";
import { pipelineStageOrder } from "./pipeline-stage";

export function PipelineBoard({
  initialDeals,
  leads,
  members,
}: {
  initialDeals: Deal[];
  leads: Lead[];
  members: MockMember[];
}) {
  const [deals, setDeals] = useState<Deal[]>(initialDeals);
  const [activeDeal, setActiveDeal] = useState<Deal | null>(null);
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);
  const [createStage, setCreateStage] = useState<DealStage>("novo_lead");
  const [dialogOpen, setDialogOpen] = useState(false);

  const leadsById = useMemo(() => new Map(leads.map((lead) => [lead.id, lead])), [leads]);
  const membersById = useMemo(
    () => new Map(members.map((member) => [member.id, member])),
    [members],
  );

  const dealsByStage = useMemo(() => {
    const grouped = new Map<DealStage, Deal[]>();
    for (const stage of pipelineStageOrder) grouped.set(stage, []);
    for (const deal of deals) grouped.get(deal.stage)?.push(deal);
    return grouped;
  }, [deals]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  function handleDragStart(event: DragStartEvent) {
    const deal = deals.find((item) => item.id === event.active.id);
    setActiveDeal(deal ?? null);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeDealId = active.id as string;
    const overStage = (over.data.current?.stage as DealStage | undefined) ?? (over.id as DealStage);
    if (!pipelineStageOrder.includes(overStage)) return;

    setDeals((prev) => {
      const current = prev.find((deal) => deal.id === activeDealId);
      if (!current || current.stage === overStage) return prev;
      return prev.map((deal) =>
        deal.id === activeDealId ? { ...deal, stage: overStage } : deal,
      );
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveDeal(null);
    if (!over || active.id === over.id) return;

    const overIsDeal = over.data.current?.type === "deal";
    if (!overIsDeal) return;

    setDeals((prev) => {
      const oldIndex = prev.findIndex((deal) => deal.id === active.id);
      const newIndex = prev.findIndex((deal) => deal.id === over.id);
      if (oldIndex === -1 || newIndex === -1) return prev;
      return arrayMove(prev, oldIndex, newIndex);
    });
  }

  function openCreateDialog(stage: DealStage) {
    setEditingDeal(null);
    setCreateStage(stage);
    setDialogOpen(true);
  }

  function openEditDialog(deal: Deal) {
    setEditingDeal(deal);
    setDialogOpen(true);
  }

  function handleSubmit(values: DealFormValues) {
    if (editingDeal) {
      setDeals((prev) =>
        prev.map((deal) =>
          deal.id === editingDeal.id
            ? {
                ...deal,
                title: values.title,
                value: Number(values.value),
                leadId: values.leadId,
                ownerId: values.ownerId,
                dueDate: values.dueDate,
                stage: values.stage,
              }
            : deal,
        ),
      );
      return;
    }

    const newDeal: Deal = {
      id: crypto.randomUUID(),
      workspaceId: leads[0]?.workspaceId ?? "1",
      title: values.title,
      value: Number(values.value),
      leadId: values.leadId,
      ownerId: values.ownerId,
      dueDate: values.dueDate,
      stage: values.stage,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setDeals((prev) => [...prev, newDeal]);
  }

  function handleDelete(dealId: string) {
    setDeals((prev) => prev.filter((deal) => deal.id !== dealId));
  }

  const pipelineTotal = deals.reduce((sum, deal) => sum + deal.value, 0);

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {deals.length} negócios · {formatCurrency(pipelineTotal)} em pipeline
        </p>
      </div>

      <DndContext
        id="pipeline-board"
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex flex-1 gap-4 overflow-x-auto pb-4">
          {pipelineStageOrder.map((stage, index) => (
            <PipelineColumn
              key={stage}
              stage={stage}
              deals={dealsByStage.get(stage) ?? []}
              leadsById={leadsById}
              membersById={membersById}
              index={index}
              onAddDeal={openCreateDialog}
              onSelectDeal={openEditDialog}
            />
          ))}
        </div>

        <DragOverlay>
          {activeDeal && (
            <DealCard
              deal={activeDeal}
              lead={leadsById.get(activeDeal.leadId)}
              owner={membersById.get(activeDeal.ownerId)}
              onClick={() => {}}
            />
          )}
        </DragOverlay>
      </DndContext>

      <DealFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        deal={editingDeal}
        defaultStage={createStage}
        leads={leads}
        members={members}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
      />
    </div>
  );
}
