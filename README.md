# PipeFlow CRM

CRM SaaS multi-empresa focado em vendas: pipeline Kanban, gestão de leads/contatos, registro de atividades e monetização via assinatura.

Ver [CLAUDE.md](CLAUDE.md) para as convenções do projeto e [docs/PRD.md](docs/PRD.md) / [docs/PLAN.md](docs/PLAN.md) para o briefing de produto e o roteiro de execução.

## Stack

Next.js 14 (App Router) + TypeScript 5 + Tailwind CSS + shadcn/ui + Supabase + Stripe + Resend.

## Desenvolvimento

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — servidor de desenvolvimento
- `npm run build` — build de produção
- `npm run start` — servidor de produção
- `npm run lint` — ESLint
- `npm run format` — formata o código com Prettier
- `npm run format:check` — verifica formatação sem alterar arquivos
