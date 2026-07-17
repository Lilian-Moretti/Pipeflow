import { LayoutDashboard, KanbanSquare, Users, Settings } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  { label: "Dashboard", href: "dashboard", icon: LayoutDashboard },
  { label: "Pipeline", href: "pipeline", icon: KanbanSquare },
  { label: "Leads", href: "leads", icon: Users },
  { label: "Configurações", href: "settings", icon: Settings },
];
