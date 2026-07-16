# PLAN — Roteiro de Execução do PipeFlow CRM

Abordagem **UI-first**: construímos toda a interface com dados mockados antes de conectar Supabase, Stripe e Resend. Isso permite validar fluxo e visual cedo, sem depender de infraestrutura de backend pronta.

**Fluxo de branches**: cada milestone parte de `main` atualizada. Ao final do milestone, a branch é revisada, testada e mergeada em `main` antes do próximo milestone começar.

---

## Fase 0 — Setup

### Milestone 1 — Setup Inicial
- **Branch**: `milestone/01-setup-inicial`
- **Objetivo**: preparar o projeto Next.js com toda a base técnica e estrutura de pastas antes de qualquer feature.
- **Entregas**:
  - [x] Projeto Next.js 14 (App Router) + TypeScript 5 inicializado
  - [x] Tailwind CSS configurado
  - [x] shadcn/ui inicializado com tema base
  - [x] ESLint + Prettier configurados
  - [x] Estrutura de pastas criada conforme `CLAUDE.md` (`src/app`, `src/components`, `src/lib`, `src/types`, `supabase/`)
  - [x] Repositório criado no GitHub e primeiro push de `main`
- **Commit final**: `chore: setup inicial do projeto Next.js, Tailwind e shadcn/ui`

---

## Fase 1 — Interface (dados mockados, sem Supabase real)

### Milestone 2 — Landing Page
- **Branch**: `milestone/02-landing-page-ui`
- **Objetivo**: página pública de apresentação do PipeFlow CRM.
- **Entregas**:
  - [ ] Seção hero
  - [ ] Seção de funcionalidades
  - [ ] Seção de planos/preços (Free vs Pro)
  - [ ] Seção de CTA
  - [ ] Layout responsivo (mobile/desktop)
- **Commit final**: `feat: landing page com hero, funcionalidades, planos e CTA`

### Milestone 3 — Autenticação & Onboarding (UI)
- **Branch**: `milestone/03-auth-onboarding-ui`
- **Objetivo**: telas de login, cadastro e onboarding, sem lógica de autenticação real.
- **Entregas**:
  - [ ] Tela de login
  - [ ] Tela de cadastro
  - [ ] Fluxo de onboarding (criação do primeiro workspace)
  - [ ] Validação de formulário client-side
  - [ ] Estados de loading/erro mockados
- **Commit final**: `feat: telas de login, cadastro e onboarding (UI mockada)`

### Milestone 4 — Shell da Aplicação Logada
- **Branch**: `milestone/04-app-shell-ui`
- **Objetivo**: layout base da área logada, compartilhado por todas as páginas internas.
- **Entregas**:
  - [ ] Sidebar de navegação
  - [ ] Dropdown de troca de workspace (com dados mockados)
  - [ ] Layout `/[workspace]/...` com rotas placeholder (dashboard, pipeline, leads, settings)
  - [ ] Header com informações do usuário logado
- **Commit final**: `feat: shell da aplicação logada com sidebar e troca de workspace`

### Milestone 5 — Leads & Contatos (UI)
- **Branch**: `milestone/05-leads-ui`
- **Objetivo**: telas de gestão de leads com dados mockados.
- **Entregas**:
  - [ ] Listagem de leads com busca
  - [ ] Filtros (status, responsável, data)
  - [ ] Formulário de cadastro de lead (nome, e-mail, telefone, empresa, cargo, status)
  - [ ] Página de detalhe do lead
  - [ ] Timeline de atividades no detalhe do lead (mockada)
- **Commit final**: `feat: listagem, cadastro e detalhe de leads com timeline (UI mockada)`

### Milestone 6 — Pipeline Kanban (UI)
- **Branch**: `milestone/06-pipeline-kanban-ui`
- **Objetivo**: pipeline visual de vendas com drag-and-drop funcional no client.
- **Entregas**:
  - [ ] Colunas fixas: Novo Lead, Contato Realizado, Proposta Enviada, Negociação, Fechado Ganho, Fechado Perdido
  - [ ] Cards de negócio (título, valor estimado, lead vinculado, responsável, prazo)
  - [ ] Drag-and-drop entre colunas com @dnd-kit (estado local, sem persistência)
  - [ ] Modal/painel de criação e edição de negócio (mockado)
- **Commit final**: `feat: pipeline kanban com drag-and-drop (UI mockada)`

### Milestone 7 — Dashboard de Métricas (UI)
- **Branch**: `milestone/07-dashboard-ui`
- **Objetivo**: dashboard com visão geral de vendas usando dados mockados.
- **Entregas**:
  - [ ] Cards: total de leads, negócios abertos, valor total do pipeline, taxa de conversão
  - [ ] Gráfico de funil de vendas com Recharts
  - [ ] Lista de negócios do usuário logado com prazo próximo
- **Commit final**: `feat: dashboard de métricas com gráfico de funil (UI mockada)`

### Milestone 8 — Configurações — Colaboradores & Planos (UI)
- **Branch**: `milestone/08-settings-ui`
- **Objetivo**: telas de administração de workspace (colaboradores e plano) sem integração real.
- **Entregas**:
  - [ ] Listagem de colaboradores com papel (Admin/Membro)
  - [ ] Formulário de convite por e-mail (mockado)
  - [ ] Tela de plano atual (Free/Pro) com comparação de limites
  - [ ] Botão de upgrade (mockado, sem checkout real)
- **Commit final**: `feat: telas de colaboradores e planos em configurações (UI mockada)`

---

## Fase 2 — Backend (Supabase, Stripe, Resend)

### Milestone 9 — Supabase Setup — Schema & RLS
- **Branch**: `milestone/09-supabase-schema`
- **Objetivo**: base de dados real com isolamento multi-tenant garantido no banco.
- **Entregas**:
  - [ ] Projeto Supabase criado e conectado ao repositório
  - [ ] Migrations: `workspaces`, `workspace_members`, `leads`, `deals`, `activities`
  - [ ] Policies de RLS para isolamento por workspace em todas as tabelas
  - [ ] Tipos TypeScript gerados via `supabase gen types typescript`
  - [ ] Clients Supabase (server e browser) configurados em `src/lib/supabase`
- **Commit final**: `feat: schema do banco e RLS multi-tenant no Supabase`

### Milestone 10 — Autenticação & Onboarding (Backend)
- **Branch**: `milestone/10-auth-backend`
- **Objetivo**: conectar as telas do Milestone 3 ao Supabase Auth real.
- **Entregas**:
  - [ ] Login e cadastro via Supabase Auth
  - [ ] Gerenciamento de sessão (Server Components + middleware)
  - [ ] Rotas protegidas para área logada
  - [ ] Onboarding cria workspace real vinculado ao usuário
- **Commit final**: `feat: autenticação real com Supabase Auth e onboarding funcional`

### Milestone 11 — Workspaces, Membros & Convites (Backend)
- **Branch**: `milestone/11-workspaces-backend`
- **Objetivo**: colaboração multi-empresa funcionando de ponta a ponta.
- **Entregas**:
  - [ ] Troca real de workspace (dropdown da sidebar)
  - [ ] Aplicação de papéis Admin/Membro nas permissões de rotas e ações
  - [ ] Convite de colaborador por e-mail via Resend
  - [ ] Aceite de convite e vínculo do usuário ao workspace
- **Commit final**: `feat: workspaces, papéis e convite de colaboradores via Resend`

### Milestone 12 — Leads & Atividades (Backend)
- **Branch**: `milestone/12-leads-activities-backend`
- **Objetivo**: conectar as telas do Milestone 5 a dados reais.
- **Entregas**:
  - [ ] CRUD real de leads/contatos via Server Actions
  - [ ] Busca e filtros server-side
  - [ ] CRUD real de atividades (ligação, e-mail, reunião, nota)
  - [ ] Timeline do lead consumindo dados reais
- **Commit final**: `feat: CRUD real de leads e atividades com persistência no Supabase`

### Milestone 13 — Pipeline Kanban (Backend)
- **Branch**: `milestone/13-pipeline-backend`
- **Objetivo**: persistir o pipeline do Milestone 6 no banco.
- **Entregas**:
  - [ ] CRUD real de negócios (deals)
  - [ ] Persistência da etapa do negócio ao mover entre colunas
  - [ ] Vínculo real do negócio ao lead e ao responsável
- **Commit final**: `feat: persistência real do pipeline kanban no Supabase`

### Milestone 14 — Dashboard (Backend)
- **Branch**: `milestone/14-dashboard-backend`
- **Objetivo**: substituir os dados mockados do Milestone 7 por métricas reais.
- **Entregas**:
  - [ ] Query agregada de total de leads e negócios abertos
  - [ ] Query de valor total do pipeline e taxa de conversão
  - [ ] Dados reais do gráfico de funil
  - [ ] Negócios do usuário logado com prazo próximo, via query real
- **Commit final**: `feat: dashboard consumindo métricas reais do Supabase`

### Milestone 15 — Monetização — Stripe
- **Branch**: `milestone/15-billing-stripe`
- **Objetivo**: viabilizar a cobrança do plano Pro e aplicar limites do plano Free.
- **Entregas**:
  - [ ] Checkout do plano Pro via Stripe Checkout
  - [ ] Webhook (Supabase Edge Function) para ativar/desativar plano automaticamente
  - [ ] Customer Portal do Stripe integrado em Configurações
  - [ ] Aplicação dos limites do plano Free (2 colaboradores, 50 leads) no backend
- **Commit final**: `feat: checkout, webhook e customer portal do Stripe com limites de plano`

---

## Fase 3 — Deploy

### Milestone 16 — Deploy em Produção
- **Branch**: `milestone/16-deploy-producao`
- **Objetivo**: colocar o PipeFlow CRM no ar em ambiente de produção.
- **Entregas**:
  - [ ] Projeto Supabase de produção configurado (migrations aplicadas)
  - [ ] Projeto Vercel conectado ao repositório
  - [ ] Variáveis de ambiente de produção configuradas (Supabase, Stripe, Resend)
  - [ ] Domínio configurado
  - [ ] Teste fumaça ponta a ponta: cadastro → onboarding → lead → negócio no kanban → dashboard → upgrade de plano
- **Commit final**: `chore: configuração de deploy em produção (Vercel + Supabase)`
