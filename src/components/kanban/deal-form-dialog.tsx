"use client";

import { useEffect, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import type { MockMember } from "@/lib/mock-data";
import {
  validateDealLead,
  validateDealTitle,
  validateDealValue,
} from "@/lib/validation/deal";
import type { Deal, DealStage } from "@/types/deal";
import type { Lead } from "@/types/lead";

import { pipelineStageLabels, pipelineStageOrder } from "./pipeline-stage";

export interface DealFormValues {
  title: string;
  value: string;
  leadId: string;
  ownerId: string;
  dueDate: string;
  stage: DealStage;
}

interface FormErrors {
  title?: string;
  value?: string;
  leadId?: string;
}

function emptyValues(stage: DealStage, leads: Lead[], members: MockMember[]): DealFormValues {
  return {
    title: "",
    value: "",
    leadId: leads[0]?.id ?? "",
    ownerId: members[0]?.id ?? "",
    dueDate: "",
    stage,
  };
}

export function DealFormDialog({
  open,
  onOpenChange,
  deal,
  defaultStage,
  leads,
  members,
  onSubmit,
  onDelete,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  deal: Deal | null;
  defaultStage: DealStage;
  leads: Lead[];
  members: MockMember[];
  onSubmit: (values: DealFormValues) => void;
  onDelete: (dealId: string) => void;
}) {
  const [values, setValues] = useState<DealFormValues>(() =>
    emptyValues(defaultStage, leads, members),
  );
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (!open) return;
    setErrors({});
    setValues(
      deal
        ? {
            title: deal.title,
            value: String(deal.value),
            leadId: deal.leadId,
            ownerId: deal.ownerId,
            dueDate: deal.dueDate,
            stage: deal.stage,
          }
        : emptyValues(defaultStage, leads, members),
    );
  }, [open, deal, defaultStage, leads, members]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: FormErrors = {
      title: validateDealTitle(values.title),
      value: validateDealValue(values.value),
      leadId: validateDealLead(values.leadId),
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    onSubmit(values);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{deal ? "Editar negócio" : "Novo negócio"}</DialogTitle>
          <DialogDescription>
            {deal
              ? "Atualize as informações do negócio."
              : "Preencha os dados para cadastrar um novo negócio."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="deal-title">Título</Label>
            <Input
              id="deal-title"
              placeholder="Ex: Implantação CRM — Empresa X"
              value={values.title}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, title: event.target.value }))
              }
              aria-invalid={Boolean(errors.title)}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="deal-value">Valor estimado (R$)</Label>
              <Input
                id="deal-value"
                type="number"
                min="0"
                step="100"
                placeholder="0"
                value={values.value}
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, value: event.target.value }))
                }
                aria-invalid={Boolean(errors.value)}
              />
              {errors.value && (
                <p className="text-sm text-destructive">{errors.value}</p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="deal-due-date">Prazo</Label>
              <Input
                id="deal-due-date"
                type="date"
                value={values.dueDate}
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, dueDate: event.target.value }))
                }
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="deal-lead">Lead vinculado</Label>
            <Select
              id="deal-lead"
              value={values.leadId}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, leadId: event.target.value }))
              }
              aria-invalid={Boolean(errors.leadId)}
            >
              {leads.map((lead) => (
                <option key={lead.id} value={lead.id}>
                  {lead.name} — {lead.company}
                </option>
              ))}
            </Select>
            {errors.leadId && (
              <p className="text-sm text-destructive">{errors.leadId}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="deal-owner">Responsável</Label>
              <Select
                id="deal-owner"
                value={values.ownerId}
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, ownerId: event.target.value }))
                }
              >
                {members.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="deal-stage">Etapa</Label>
              <Select
                id="deal-stage"
                value={values.stage}
                onChange={(event) =>
                  setValues((prev) => ({
                    ...prev,
                    stage: event.target.value as DealStage,
                  }))
                }
              >
                {pipelineStageOrder.map((stage) => (
                  <option key={stage} value={stage}>
                    {pipelineStageLabels[stage]}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <DialogFooter className="sm:justify-between">
            {deal ? (
              <Button
                type="button"
                variant="ghost"
                className="text-destructive hover:text-destructive"
                onClick={() => {
                  onDelete(deal.id);
                  onOpenChange(false);
                }}
              >
                Excluir negócio
              </Button>
            ) : (
              <span />
            )}
            <Button type="submit">
              {deal ? "Salvar alterações" : "Cadastrar negócio"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
