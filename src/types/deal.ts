export type DealStage =
  | "novo_lead"
  | "contato_realizado"
  | "proposta_enviada"
  | "negociacao"
  | "fechado_ganho"
  | "fechado_perdido";

export interface Deal {
  id: string;
  workspaceId: string;
  title: string;
  value: number;
  leadId: string;
  ownerId: string;
  dueDate: string;
  stage: DealStage;
  createdAt: string;
}
