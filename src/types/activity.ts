export type ActivityType = "ligacao" | "email" | "reuniao" | "nota";

export interface Activity {
  id: string;
  leadId: string;
  type: ActivityType;
  description: string;
  authorName: string;
  createdAt: string;
}
