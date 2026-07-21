import { FileText, Mail, Phone, Users } from "lucide-react";

import type { Activity, ActivityType } from "@/types/activity";

const activityIcons: Record<ActivityType, typeof Phone> = {
  ligacao: Phone,
  email: Mail,
  reuniao: Users,
  nota: FileText,
};

const activityLabels: Record<ActivityType, string> = {
  ligacao: "Ligação",
  email: "E-mail",
  reuniao: "Reunião",
  nota: "Nota",
};

export function ActivityTimeline({ activities }: { activities: Activity[] }) {
  const sorted = [...activities].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  if (sorted.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Nenhuma atividade registrada para este lead ainda.
      </p>
    );
  }

  return (
    <ol className="flex flex-col gap-6">
      {sorted.map((activity, index) => {
        const Icon = activityIcons[activity.type];
        const isLast = index === sorted.length - 1;
        return (
          <li key={activity.id} className="relative flex gap-3">
            <div className="flex flex-col items-center">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <Icon className="h-4 w-4" />
              </span>
              {!isLast && <span className="mt-1 w-px flex-1 bg-border" />}
            </div>
            <div className="flex flex-1 flex-col gap-0.5 pb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  {activityLabels[activity.type]}
                </span>
                <span className="text-xs text-muted-foreground">
                  {new Date(activity.createdAt).toLocaleString("pt-BR", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {activity.description}
              </p>
              <span className="text-xs text-muted-foreground">
                por {activity.authorName}
              </span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
