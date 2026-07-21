import type { DealStage } from "@/types/deal";

export const pipelineStageOrder: DealStage[] = [
  "novo_lead",
  "contato_realizado",
  "proposta_enviada",
  "negociacao",
  "fechado_ganho",
  "fechado_perdido",
];

export const pipelineStageLabels: Record<DealStage, string> = {
  novo_lead: "Novo Lead",
  contato_realizado: "Contato Realizado",
  proposta_enviada: "Proposta Enviada",
  negociacao: "Negociação",
  fechado_ganho: "Fechado Ganho",
  fechado_perdido: "Fechado Perdido",
};

interface StageClasses {
  text: string;
  border: string;
  hoverBorder: string;
  bgSoft: string;
  dot: string;
}

// Class names are spelled out in full (no template interpolation) so Tailwind's
// content scanner can detect them at build time.
export const pipelineStageClasses: Record<DealStage, StageClasses> = {
  novo_lead: {
    text: "text-stage-1",
    border: "border-stage-1/30",
    hoverBorder: "hover:border-stage-1/60",
    bgSoft: "bg-stage-1/10",
    dot: "bg-stage-1",
  },
  contato_realizado: {
    text: "text-stage-2",
    border: "border-stage-2/30",
    hoverBorder: "hover:border-stage-2/60",
    bgSoft: "bg-stage-2/10",
    dot: "bg-stage-2",
  },
  proposta_enviada: {
    text: "text-stage-3",
    border: "border-stage-3/30",
    hoverBorder: "hover:border-stage-3/60",
    bgSoft: "bg-stage-3/10",
    dot: "bg-stage-3",
  },
  negociacao: {
    text: "text-stage-4",
    border: "border-stage-4/30",
    hoverBorder: "hover:border-stage-4/60",
    bgSoft: "bg-stage-4/10",
    dot: "bg-stage-4",
  },
  fechado_ganho: {
    text: "text-stage-5",
    border: "border-stage-5/30",
    hoverBorder: "hover:border-stage-5/60",
    bgSoft: "bg-stage-5/10",
    dot: "bg-stage-5",
  },
  fechado_perdido: {
    text: "text-stage-6",
    border: "border-stage-6/30",
    hoverBorder: "hover:border-stage-6/60",
    bgSoft: "bg-stage-6/10",
    dot: "bg-stage-6",
  },
};
