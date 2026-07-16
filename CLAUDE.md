# PipeFlow CRM

CRM SaaS multi-empresa focado em vendas: pipeline Kanban, gestão de leads/contatos, registro de atividades e monetização via assinatura. Ver [docs/PRD.md](docs/PRD.md) para o briefing completo de produto (contexto, personas, requisitos).

## Stack

- **Frontend**: Next.js 14 (App Router) + React 18 + TypeScript 5
- **UI**: Tailwind CSS + shadcn/ui
- **Backend/API**: Next.js API Routes / Server Components (sem backend separado)
- **Banco de dados + Auth**: Supabase (PostgreSQL + Row Level Security + Auth)
- **Pagamento**: Stripe (Checkout + Webhooks via Supabase Edge Function + Customer Portal)
- **E-mail transacional**: Resend (convites de colaboradores)
- **Drag-and-drop**: @dnd-kit (pipeline Kanban)
- **Gráficos**: Recharts (dashboard, funil de vendas)
- **Deploy**: Vercel (frontend) + Supabase (backend/DB)

## Conceitos de domínio

- **Workspace** = uma empresa/time. Todo dado (leads, negócios, atividades) pertence a um workspace e é isolado via RLS no Supabase — nunca confiar apenas em filtro client-side, a policy do banco é a fonte de verdade de isolamento.
- **Papéis**: `admin` (acesso completo, billing, convites) e `membro` (leads e negócios apenas).
- **Lead/Contato**: nome, e-mail, telefone, empresa, cargo, status.
- **Negócio (deal)**: título, valor estimado (R$), lead vinculado, responsável, prazo, etapa do pipeline.
- **Etapas do pipeline** (ordem fixa): Novo Lead → Contato Realizado → Proposta Enviada → Negociação → Fechado Ganho / Fechado Perdido.
- **Atividade**: ligação, e-mail, reunião ou nota — sempre vinculada a um lead, com autor, descrição e data, exibida como timeline cronológica.
- **Planos**: Free (até 2 colaboradores, 50 leads) e Pro (ilimitado, R$49/mês). Estado do plano é ativado/desativado via webhook do Stripe, nunca setado manualmente pelo client.

## Estrutura de pastas (Next.js App Router)

```
pipeflow-crm/
├── docs/
│   └── PRD.md
├── src/
│   ├── app/
│   │   ├── (marketing)/          # landing page pública (hero, features, pricing, CTA)
│   │   ├── (auth)/               # login, cadastro, onboarding
│   │   ├── (app)/                # área logada, sempre sob /[workspace]/
│   │   │   ├── [workspace]/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── pipeline/     # kanban
│   │   │   │   ├── leads/
│   │   │   │   │   └── [leadId]/ # detalhe + timeline de atividades
│   │   │   │   └── settings/     # colaboradores, plano, billing
│   │   ├── api/
│   │   │   └── webhooks/
│   │   │       └── stripe/
│   ├── components/
│   │   ├── ui/                   # shadcn/ui primitives
│   │   ├── kanban/
│   │   ├── leads/
│   │   └── dashboard/
│   ├── lib/
│   │   ├── supabase/              # clients (server/browser), tipos gerados
│   │   ├── stripe/
│   │   └── resend/
│   └── types/
├── supabase/
│   ├── migrations/
│   └── functions/                 # Edge Functions (ex: stripe-webhook)
└── CLAUDE.md
```

## Convenções

- **TypeScript estrito** em todo o projeto — sem `any` implícito, tipos do banco gerados via Supabase CLI (`supabase gen types typescript`).
- **Server Components por padrão**; `"use client"` apenas onde há interatividade real (Kanban drag-and-drop, formulários, dropdowns).
- **Mutações de dados** via Server Actions quando possível; API Routes reservadas para webhooks (Stripe) e integrações externas.
- **RLS é obrigatória** em toda tabela nova — nenhuma tabela multi-tenant deve depender de checagem apenas na aplicação.
- **Nomenclatura**: arquivos e pastas em `kebab-case`, componentes React em `PascalCase`, funções/variáveis em `camelCase`. Termos de domínio em português no PRD, mas código (variáveis, tipos, nomes de tabelas/colunas) em inglês.
- **Componentes shadcn/ui** como base; customizar via Tailwind, evitar CSS solto.
- **Um milestone por incremento entregável**, abordagem UI-first: construir toda a interface com dados mockados primeiro (landing page → auth/onboarding → shell da app → leads → pipeline kanban → dashboard → configurações), depois conectar o backend na mesma ordem (Supabase/RLS → auth real → workspaces/convites → leads/atividades → pipeline → dashboard → Stripe), e por fim o deploy. Ver roteiro completo em [docs/PLAN.md](docs/PLAN.md). Testar cada milestone antes de avançar (ver seção 7 do PRD).

## Visual / Design Language

Inspirado em HubSpot CRM e Pipedrive, mas mais simples e enxuto (foco só em vendas, sem marketing automation):

- Interface limpa, orientada a ação (activities-driven como o Pipedrive), sem excesso de opções configuráveis.
- Pipeline Kanban é a peça central visual — colunas claras por etapa, cards de negócio escaneáveis (título, valor, responsável, prazo em destaque).
- Dashboard com cards de métricas objetivos + gráfico de funil (Recharts), sem poluição visual.
- Paleta e componentes via shadcn/ui + Tailwind, priorizando clareza e densidade de informação sem parecer complexo demais para quem está começando (PME/freelancer, não enterprise).
- Landing page simples: hero, funcionalidades, planos/preços, CTA — tom direto, sem jargão de marketing pesado.

## Integrações externas (requerem autorização do usuário antes de uso)

- **Supabase**: banco, auth, RLS, Edge Functions.
- **Stripe**: checkout, assinaturas, webhooks, customer portal.
- **Resend**: envio de e-mails de convite.
