export type WorkspacePlan = "free" | "pro";

export interface Workspace {
  id: string;
  slug: string;
  name: string;
  plan: WorkspacePlan;
}

export type UserRole = "admin" | "membro";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}
