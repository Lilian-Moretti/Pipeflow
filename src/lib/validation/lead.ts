export function validateLeadName(name: string): string | undefined {
  if (!name.trim()) return "Informe o nome.";
  if (name.trim().length < 2) return "O nome deve ter no mínimo 2 caracteres.";
  return undefined;
}

export function validateLeadEmail(email: string): string | undefined {
  if (!email.trim()) return "Informe o e-mail.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "E-mail inválido.";
  return undefined;
}

export function validateLeadCompany(company: string): string | undefined {
  if (!company.trim()) return "Informe a empresa.";
  return undefined;
}
