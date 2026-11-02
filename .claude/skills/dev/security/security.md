# ReoliOS Dashboard — Especificação Técnica

> Interface web para controlar o ReoliOS sem precisar do terminal.

---

## 1. Visão Geral

A Dashboard transforma o ReoliOS numa aplicação web onde o usuário pode:
- Executar comandos via interface visual
- Ver histórico de ações
- Gerar relatórios visuais
- Agendar tarefas
- Gerenciar múltiplos projetos

---

## 2. Arquitetura

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Browser    │────▶│   Express    │────▶│  Claude CLI  │
│   (React)    │◀────│   Server     │◀────│  (child_process) │
└──────────────┘     └──────────────┘     └──────────────┘
                           │
                           ▼
                    ┌──────────────┐
                    │   SQLite/    │
                    │  PostgreSQL  │
                    └──────────────┘
```

### Stack
- **Frontend**: React 18 + TailwindCSS + Lucide Icons
- **Terminal**: xterm.js + websocket
- **Backend**: Node.js + Express
- **Database**: SQLite (MVP) / PostgreSQL (Pro)
- **Realtime**: Socket.io

---

## 3. Telas

### 3.1 Login/Registro
- Email + senha
- OAuth (Google, GitHub)
- "Esqueci minha senha"

### 3.2 Home/Dashboard
```
┌─────────────────────────────────────────────────────┐
│  ☰  ReoliOS              [user@email] [⚙️] [🚪]     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────┐ │
│  │ 📊 Tarefas │  │ 📝 Posts │  │ 💰 Spend │  │ 📈  │ │
│  │    5      │  │   12     │  │  R$ 2.4k │  │ +23%│ │
│  │ pendentes │  │  Draft   │  │  mês     │  │      │ │
│  └──────────┘  └──────────┘  └──────────┘  └──────┘ │
│                                                     │
│  ┌─────────────────────────────────────────────────┐│
│  │ 📋 Atividade Recente                          ▼ ││
│  ├─────────────────────────────────────────────────┤│
│  │ • /carrossel "lançamento" — há 2h               ││
│  │ • /relatorio-ads semanal — há 1d               ││
│  │ • /publicar-tema "seo" — há 3d                 ││
│  └─────────────────────────────────────────────────┘│
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 3.3 Terminal
```
┌─────────────────────────────────────────────────────┐
│  🖥️ Terminal                         [history] [?] │
├─────────────────────────────────────────────────────┤
│  > claude                                         │
│  ┌───────────────────────────────────────────────┐│
│  │ $ ./carrossel                                  ││
│  │                                               ││
│  │ ✓ Tema detectado: "lançamento"                 ││
│  │ ✓ Identidade visual carregada                  ││
│  │                                               ││
│  │ 📝 Gerar carrossel para Instagram? (s/n)      ││
│  │                                               ││
│  │ $                                             ││
│  └───────────────────────────────────────────────┘│
│  ┌───────────────────────────────────────────────┐│
│  │ > /carrossel tema=lançamento format=instagram   ││
│  │ [Enter para executar]              [Cancel]   ││
│  └───────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────┘
```

### 3.4 Projetos
```
┌─────────────────────────────────────────────────────┐
│  📁 Projetos                 [+ Novo] [Filtros ▼] │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌─────────────────┐ ┌─────────────────┐            │
│  │ 🟢 Cliente A    │ │ 🟡 Cliente B    │            │
│  │ Site institucional│ │ E-commerce     │            │
│  │ Ativo • 3 tasks │ │ Pausado • 1    │            │
│  │ [Abrir]         │ │ [Abrir]         │            │
│  └─────────────────┘ └─────────────────┘            │
│                                                     │
│  ┌─────────────────┐ ┌─────────────────┐            │
│  │ 🔴 Cliente C    │ │ 🟢 Freelancer X │            │
│  │ App mobile      │ │ Landing page    │            │
│  │ Finalizado      │ │ Ativo • 5 tasks│            │
│  │ [Abrir]         │ │ [Abrir]         │            │
│  └─────────────────┘ └─────────────────┘            │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 3.5 Relatórios
```
┌─────────────────────────────────────────────────────┐
│  📊 Relatórios              [Gerar] [Export ▼]   │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Filtros: [Tipo ▼] [Projeto ▼] [Data ▼] [Buscar]  │
│                                                     │
│  ┌─────────────────────────────────────────────────┐│
│  │ 📈 Relatório Semanal — Google Ads              ││
│  │ Cliente: Cliente A • Gerado: 15/01/2025         ││
│  │ [Ver] [Exportar PDF] [Exportar CSV] [Agendar]  ││
│  └─────────────────────────────────────────────────┘│
│                                                     │
│  ┌─────────────────────────────────────────────────┐│
│  │ 📝 Análise de Dados — Janeiro 2025             ││
│  │ Cliente: Cliente B • Gerado: 12/01/2025         ││
│  │ [Ver] [Exportar PDF] [Exportar CSV] [Agendar]  ││
│  └─────────────────────────────────────────────────┘│
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 3.6 Agenda
```
┌─────────────────────────────────────────────────────┐
│  📅 Agenda                    [Hoje] [Semana] [Mês]│
├─────────────────────────────────────────────────────┤
│                                                     │
│  Janeiro 2025                         ◀ ▶          │
│                                                     │
│  Seg   Ter   Qua   Qui   Sex   Sáb   Dom           │
│  13    14    15    16    17    18    19            │
│                                                     │
│  ┌───────────────────────────────┐                 │
│  │ 09:00  📝 Publicar blog       │                 │
│  │ 10:00  📊 Relatório ads       │                 │
│  │ 14:00  📱 Carrossel Instagram │                 │
│  │ 16:00  📧 Newsletter          │                 │
│  └───────────────────────────────┘                 │
│                                                     │
│  + Adicionar tarefa                                 │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 4. Funcionalidades

### 4.1 Terminal Web
- Conexão websocket com xterm.js
- Streaming de output em tempo real
- Auto-complete de comandos e skills
- Historial navegável (↑↓)
- Compartilhar sessão (link temporário)
- Exportar transcript

### 4.2 Execução de Skills
- Interface visual para cada skill
- Formulário com campos pré-definidos
- Preview do resultado
- Download dos outputs (PNG, PDF, etc)
- Histórico de execuções

### 4.3 Relatórios
- Cards com métricas principais
- Gráficos interativos (Chart.js)
- Filtros avançados
- Export multi-formato (PDF, PNG, CSV)
- Agendar geração automática

### 4.4 Gerenciamento de Projetos
- CRUD completo
- Pasta automática no filesystem
- Status (ativo, pausado, finalizado)
- Tags e categorias
- Acesso rápido ao diretório

### 4.5 Agenda
- Calendário visual
- Tarefas recorrentes
- Lembretes (email, push)
- Integração com Google Calendar

### 4.6 Configurações
- Perfil da empresa
- Identidade visual
- API keys (Meta, Google, Anthropic)
- Preferências do sistema
- Team members (Business)

---

## 5. API Endpoints

```yaml
# Auth
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/logout
POST   /api/v1/auth/refresh

# Projects
GET    /api/v1/projects
POST   /api/v1/projects
GET    /api/v1/projects/:id
PUT    /api/v1/projects/:id
DELETE /api/v1/projects/:id

# Skills
GET    /api/v1/skills
GET    /api/v1/skills/:name
POST   /api/v1/skills/:name/execute
GET    /api/v1/skills/executions

# Reports
GET    /api/v1/reports
GET    /api/v1/reports/:id
POST   /api/v1/reports/generate
GET    /api/v1/reports/:id/export

# Scheduler
GET    /api/v1/scheduler/jobs
POST   /api/v1/scheduler/jobs
PUT    /api/v1/scheduler/jobs/:id
DELETE /api/v1/scheduler/jobs/:id

# Integrations
GET    /api/v1/integrations
POST   /api/v1/integrations/connect
GET    /api/v1/integrations/:provider/status
POST   /api/v1/webhooks/:provider
```

---

## 6. Segurança

- HTTPS obrigatório
- JWT com refresh token
- Rate limiting (100 req/min)
- Input sanitization
- CORS configurado
- Helmet.js headers
- SQL injection prevention
- XSS prevention

---

## 7. Deploy

### Local (MVP)
```bash
npm run dev  # React + Express
```

### Production
```bash
# Docker
docker-compose up -d

# Vercel (frontend) + Railway (backend)
vercel deploy
railway up
```

---

## 8. Roadmap

### Fase 1 — MVP (2 semanas)
- [ ] Autenticação básica
- [ ] Terminal web funcional
- [ ] Dashboard com cards
- [ ] Projeto simples (CRUD)

### Fase 2 — Core (3 semanas)
- [ ] Execução de skills
- [ ] Relatórios visuais
- [ ] Agenda básica
- [ ] Integração filesystem

### Fase 3 — Pro (4 semanas)
- [ ] Agendador completo
- [ ] Integrações (Meta, Google)
- [ ] Notificações push
- [ ] Export multi-formato

### Fase 4 — Business (4 semanas)
- [ ] API REST completa
- [ ] White-label
- [ ] Multitenancy
- [ ] SSO/Enterprise

---

## 9. Cores e Design

```css
/* Light Theme */
--bg-primary: #FFFFFF;
--bg-secondary: #F8FAFC;
--bg-tertiary: #F1F5F9;
--text-primary: #0F172A;
--text-secondary: #475569;
--accent: #6366F1; /* Indigo */
--success: #22C55E;
--warning: #F59E0B;
--danger: #EF4444;

/* Dark Theme */
--bg-primary: #0F172A;
--bg-secondary: #1E293B;
--bg-tertiary: #334155;
--text-primary: #F8FAFC;
--text-secondary: #94A3B8;
--accent: #818CF8;
```

---

*Especificação v1.0 — Pedro Reoli — 2025*