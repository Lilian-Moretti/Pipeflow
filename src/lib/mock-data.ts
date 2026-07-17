import type { AuthUser, Workspace } from "@/types/workspace";

export const mockWorkspaces: Workspace[] = [
  { id: "1", slug: "acme", name: "Acme Vendas", plan: "pro" },
  { id: "2", slug: "startup-x", name: "Startup X", plan: "free" },
];

export const mockUser: AuthUser = {
  id: "1",
  name: "Lilian Moretti",
  email: "lilian@pipeflow.com",
  role: "admin",
};
