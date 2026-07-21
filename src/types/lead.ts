export type LeadStatus =
  | "novo"
  | "contatado"
  | "qualificado"
  | "convertido"
  | "perdido";

export interface Lead {
  id: string;
  workspaceId: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  status: LeadStatus;
  ownerId: string;
  createdAt: string;
}
