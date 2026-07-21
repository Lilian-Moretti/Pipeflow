import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { LeadStatus } from "@/types/lead";

import { leadStatusBadgeClasses, leadStatusLabels } from "./lead-status";

export function LeadStatusBadge({
  status,
  className,
}: {
  status: LeadStatus;
  className?: string;
}) {
  return (
    <Badge className={cn(leadStatusBadgeClasses[status], className)}>
      {leadStatusLabels[status]}
    </Badge>
  );
}
