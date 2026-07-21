export function validateDealTitle(title: string): string | undefined {
  if (!title.trim()) return "Informe o título do negócio.";
  if (title.trim().length < 3) return "O título deve ter no mínimo 3 caracteres.";
  return undefined;
}

export function validateDealValue(value: string): string | undefined {
  if (!value.trim()) return "Informe o valor estimado.";
  const parsed = Number(value);
  if (Number.isNaN(parsed) || parsed <= 0) return "Informe um valor válido.";
  return undefined;
}

export function validateDealLead(leadId: string): string | undefined {
  if (!leadId) return "Selecione o lead vinculado.";
  return undefined;
}
