import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Building2, Mail, Phone, User } from "lucide-react";

import { ActivityTimeline } from "@/components/leads/activity-timeline";
import { LeadStatusBadge } from "@/components/leads/lead-status-badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  mockActivities,
  mockLeads,
  mockMembers,
  mockWorkspaces,
} from "@/lib/mock-data";

export default function LeadDetailPage({
  params,
}: {
  params: { workspace: string; leadId: string };
}) {
  const workspace = mockWorkspaces.find(
    (item) => item.slug === params.workspace,
  );
  if (!workspace) notFound();

  const lead = mockLeads.find(
    (item) => item.id === params.leadId && item.workspaceId === workspace.id,
  );
  if (!lead) notFound();

  const owner = mockMembers.find((member) => member.id === lead.ownerId);
  const activities = mockActivities.filter(
    (activity) => activity.leadId === lead.id,
  );

  return (
    <div className="flex flex-col gap-4">
      <Link
        href={`/${workspace.slug}/leads`}
        className="flex w-fit items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar para leads
      </Link>

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight">
            {lead.name}
          </h1>
          <LeadStatusBadge status={lead.status} />
        </div>
        <p className="text-muted-foreground">{lead.jobTitle}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Dados do lead</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span>{lead.company}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <a href={`mailto:${lead.email}`} className="hover:underline">
                {lead.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <a href={`tel:${lead.phone}`} className="hover:underline">
                {lead.phone}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span>Responsável: {owner?.name ?? "—"}</span>
            </div>
            <div className="pt-2 text-xs text-muted-foreground">
              Criado em{" "}
              {new Date(lead.createdAt).toLocaleDateString("pt-BR")}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Timeline de atividades</CardTitle>
          </CardHeader>
          <CardContent>
            <ActivityTimeline activities={activities} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
