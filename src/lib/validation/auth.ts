export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function validateEmail(email: string): string | undefined {
  if (!email.trim()) return "Informe o e-mail.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "E-mail inválido.";
  return undefined;
}

export function validatePassword(password: string): string | undefined {
  if (!password) return "Informe a senha.";
  if (password.length < 6) return "A senha deve ter no mínimo 6 caracteres.";
  return undefined;
}

export function validateName(name: string): string | undefined {
  if (!name.trim()) return "Informe o nome.";
  if (name.trim().length < 2) return "O nome deve ter no mínimo 2 caracteres.";
  return undefined;
}

export function validateWorkspaceName(name: string): string | undefined {
  if (!name.trim()) return "Informe o nome do workspace.";
  if (name.trim().length < 2)
    return "O nome do workspace deve ter no mínimo 2 caracteres.";
  return undefined;
}
