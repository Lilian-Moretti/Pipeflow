export default function LeadDetailPage({
  params,
}: {
  params: { leadId: string };
}) {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-semibold tracking-tight">
        Lead #{params.leadId}
      </h1>
      <p className="text-muted-foreground">
        Timeline de atividades (em breve).
      </p>
    </div>
  );
}
