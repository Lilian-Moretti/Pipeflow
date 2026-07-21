import type { LeadStatus } from "@/types/lead";

export const leadStatusLabels: Record<LeadStatus, string> = {
  novo: "Novo",
  contatado: "Contatado",
  qualificado: "Qualificado",
  convertido: "Convertido",
  perdido: "Perdido",
};

export const leadStatusOrder: LeadStatus[] = [
  "novo",
  "contatado",
  "qualificado",
  "convertido",
  "perdido",
];

export const leadStatusBadgeClasses: Record<LeadStatus, string> = {
  novo: "border-transparent bg-blue-100 text-blue-700",
  contatado: "border-transparent bg-amber-100 text-amber-700",
  qualificado: "border-transparent bg-purple-100 text-purple-700",
  convertido: "border-transparent bg-emerald-100 text-emerald-700",
  perdido: "border-transparent bg-red-100 text-red-700",
};
