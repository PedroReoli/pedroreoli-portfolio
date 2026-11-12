import type { Language } from '@/types/content'

const projectCategories = ['corporativo', 'ia', 'clientes', 'proprios'] as const

export type ProjectCategory = typeof projectCategories[number]

type Localized = Record<Language, string>

export interface EditorialStarStory {
  title: Localized
  tag: Localized
  metric: Localized
  summary: Localized
}

export interface EditorialArchitecture {
  title: Localized
  tech: Localized
  description: Localized
}

export interface EditorialScreenshot {
  src: string
  title: Localized
  tag: string
  caption: Localized
}

export interface EditorialGalleryGroup {
  id: string
  title: Localized
  tag: string
  description: Localized
  items: EditorialScreenshot[]
}

export interface EditorialCase {
  id: string
  categories: ProjectCategory[]
  name: string
  type: Localized
  introduction: Localized
  contextLabel: Localized
  context: Localized
  approachLabel: Localized
  approach: Localized
  diagramLabel: Localized
  diagram: Localized[]
  metrics?: { label: Localized; value: string }[]
  starStories?: EditorialStarStory[]
  architectures?: EditorialArchitecture[]
  galleryGroups?: EditorialGalleryGroup[]
  gallery?: EditorialScreenshot[]
  evidence?: { href: string; label: Localized }[]
  note?: Localized
}

// Conteúdo editorial baseado no catálogo existente e nos READMEs públicos.
export const projectCases: EditorialCase[] = [
  {
    id: 'autocom3',
    categories: ['corporativo'],
    name: 'Autocom3',
    type: { pt: 'Ecossistema ERP & Plataforma Web B2B', en: 'ERP Ecosystem & Enterprise Web Platform' },
    introduction: {
      pt: 'Portal Unificado em Next.js com 120+ páginas e um Design System de 500+ componentes. A base atende 20+ organizações em operações comerciais, fiscais e administrativas.',
      en: 'A unified Next.js portal with 120+ pages and a design system with 500+ components. The platform supports commercial, tax, and administrative workflows at 20+ organizations.',
    },
    contextLabel: { pt: 'O contexto & escopo', en: 'Context & scope' },
    context: {
      pt: 'Unificar rotinas de mais de 30 ferramentas dispersas, faturamento societário, governança de senhas diárias e licenciamento para redes de varejo farmacêutico e geral.',
      en: 'Consolidate 30+ scattered internal tools, multi-entity corporate billing, daily rotating passwords and license governance for pharmaceutical and retail chains.',
    },
    approachLabel: { pt: 'Arquitetura & Engenharia', en: 'Architecture & Engineering' },
    approach: {
      pt: 'Next.js, React e TypeScript no Portal Unificado, com TanStack Query para carga de dados e cache. Serviços em Node.js, NestJS e C# integram PostgreSQL e SQL Server, com deploy na AWS via API Gateway.',
      en: 'Next.js, React, and TypeScript power the unified portal, with TanStack Query for data fetching and caching. Node.js, NestJS, and C# services integrate PostgreSQL and SQL Server and deploy to AWS via API Gateway.',
    },
    diagramLabel: { pt: 'Pilares da Solução', en: 'Solution pillars' },
    diagram: [
      { pt: 'Portal 120+ Telas', en: '120+ Screens Portal' },
      { pt: 'Design System 500+', en: 'Design System 500+' },
      { pt: 'ERP Local NestJS', en: 'Local ERP NestJS' },
      { pt: 'Mobile B2B Expo', en: 'Mobile B2B Expo' },
    ],
    metrics: [
      { label: { pt: 'Telas operacionais unificadas', en: 'Unified operational screens' }, value: '120+' },
      { label: { pt: 'Componentes reutilizáveis governados', en: 'Governed reusable components' }, value: '500+' },
      { label: { pt: 'Menos tempo para criar novas telas', en: 'Less time to build new screens' }, value: '≤ 70%' },
      { label: { pt: 'Carregamento mais rápido', en: 'Faster loading' }, value: '≤ 40%' },
      { label: { pt: 'Tempo no atendimento de senhas técnicas', en: 'Support time for daily passwords' }, value: '-80%' },
      { label: { pt: 'Redução de retrabalho na conciliação', en: 'Rework reduction in reconciliation' }, value: '-60%' },
    ],
    starStories: [
      {
        title: { pt: 'Grupos de Faturamento & Controle Societário', en: 'Billing Groups & Corporate Entity Control' },
        tag: { pt: 'FINANCEIRO & COMPLIANCE', en: 'FINANCE & COMPLIANCE' },
        metric: { pt: '-60% de retrabalho', en: '-60% rework' },
        summary: {
          pt: 'Centralização de redes e franquias sob CNPJs faturadores únicos, com validação síncrona obrigatória na Receita Federal, prévia analítica com mascaramento de privacidade e prevenção de inadimplência com soft-delete auditado.',
          en: 'Consolidated commercial chains under single billing entities, requiring synchronous IRS (Receita Federal) validation, analytical previews with privacy toggles, and soft-delete audit trails.',
        },
      },
      {
        title: { pt: 'Central de Licenças SGSH & Senhas Técnicas Diárias', en: 'SGSH License Hub & Daily Technical Passwords' },
        tag: { pt: 'SUPORTE & SEGURANÇA', en: 'SUPPORT & SECURITY' },
        metric: { pt: '-80% no suporte em campo', en: '-80% field support time' },
        summary: {
          pt: 'Motor de normalização em lote para migração massiva de licenças legadas, ordenação determinística de redes (Loja Central e filiais), classificação por faturamento (1 a 5 estrelas) e senhas técnicas rotativas com desbloqueio justificado.',
          en: 'Batch normalization engine for legacy license migration, deterministic network ordering, star-rating by revenue, and daily rotating technical passwords with mandatory unlock justifications.',
        },
      },
      {
        title: { pt: 'Hub Canônico de Operações & CRM Comercial', en: 'Operations Master Hub & Sales CRM' },
        tag: { pt: 'OPERAÇÕES & VENDAS', en: 'OPERATIONS & SALES' },
        metric: { pt: '+40% visibilidade no funil', en: '+40% pipeline visibility' },
        summary: {
          pt: 'Catálogo modular (ALL_CARDS) organizando mais de 30 ferramentas com busca instantânea, favoritos e RBAC restrito. Esteira de leads comerciais com alertas sonoros e visuais em tempo real via WebSockets e funil Kanban.',
          en: 'Modular catalog (ALL_CARDS) centralizing 30+ tools with instant search, favorites and RBAC. Real-time WebSocket lead broadcast with sound/toast alerts and dynamic Kanban funnel.',
        },
      },
      {
        title: { pt: 'Gerador NoCode de Propostas & Conversão Contratual', en: 'NoCode Proposal Generator & Contract Engine' },
        tag: { pt: 'COMERCIAL & JURÍDICO', en: 'COMMERCIAL & LEGAL' },
        metric: { pt: 'De 45 min para < 5 min', en: 'From 45 min to < 5 min' },
        summary: {
          pt: 'Interface NoCode dinâmica com 8 categorias canônicas de negociação, catálogo oficial de SKUs, sanitização de tags órfãs, prompting estruturado para IA e geração automática de minutas jurídicas com hash SHA-256 ao fechar.',
          en: 'Dynamic NoCode form with 8 negotiation categories, official SGSH SKU catalog, prompt structuring for AI, and automated SHA-256 signed legal contracts upon deal closing.',
        },
      },
      {
        title: { pt: 'Central de Avisos e Comunicados Segmentados', en: 'Broadcast Notification & Alert Center' },
        tag: { pt: 'COMUNICAÇÃO & SEFAZ', en: 'COMMUNICATION & TAX' },
        metric: { pt: 'Queda drástica de chamados', en: 'Drastic ticket drop' },
        summary: {
          pt: 'Broadcast instantâneo para caixas PDV e retaguarda durante manutenções ou instabilidades da SEFAZ, com editor Markdown, links seguros, agendamento de publicação e segmentação por perfil (Admin, Caixa, Vendedor, Contador).',
          en: 'Instant broadcast alerts to POS terminals and back-office during tax/SEFAZ maintenance windows, featuring rich Markdown, safe link parsing, scheduled publishing and role-based audience filters.',
        },
      },
    ],
    architectures: [
      {
        title: { pt: 'Portal Unificado (Web Master)', en: 'Unified Portal (Web Master)' },
        tech: { pt: 'Next.js · React · TypeScript · TanStack Query', en: 'Next.js · React · TypeScript · TanStack Query' },
        description: {
          pt: '120+ telas operacionais, governança de Design System atômico, Time to Interactive (TTI) < 1.2s e redução de 60% em requisições de rede com cache inteligente.',
          en: '120+ operational screens, atomic Design System governance, TTI < 1.2s and 60% network request reduction through smart caching.',
        },
      },
      {
        title: { pt: 'ERP Desktop Local & Frente de Caixa', en: 'Local Desktop ERP & POS Engine' },
        tech: { pt: 'React 18 · Electron 28 · NestJS 11 · edge-js · SQL Server', en: 'React 18 · Electron 28 · NestJS 11 · edge-js · SQL Server' },
        description: {
          pt: 'Microsserviço embarcado na porta 3789 com pooling MSSQL, bridge C#/FoxPro via edge-js, banco particionado por ano fiscal e regra de soft delete auditada.',
          en: 'Embedded microservice on port 3789 with MSSQL pooling, C#/FoxPro bridge via edge-js, partitioned multi-database schema by fiscal year and audited soft deletes.',
        },
      },
      {
        title: { pt: 'Motor de Governança & Releases', en: 'Engineering Governance & Release Engine' },
        tech: { pt: 'Python 3.11+ · Clean Architecture · Notion API · GPT-4o · Slack', en: 'Python 3.11+ · Clean Architecture · Notion API · GPT-4o · Slack' },
        description: {
          pt: 'CLI para registro de demandas e hotfixes com fila offline resiliente, estruturação técnica via LLM e emissão automatizada de notas de versão e changelogs.',
          en: 'CLI for issue logging and hotfixes with offline resilience queue, LLM-assisted technical scoping and automated changelog generation.',
        },
      },
      {
        title: { pt: 'Portal do Cliente Mobile B2B', en: 'Mobile B2B Customer Portal' },
        tech: { pt: 'React Native 0.81 · Expo SDK 54 · Biometria · EAS OTA Updates', en: 'React Native 0.81 · Expo SDK 54 · Biometrics · EAS OTA Updates' },
        description: {
          pt: 'App mobile multi-persona para gestores e técnicos com autenticação biométrica (Face ID / Touch ID), tokens criptografados e updates OTA contínuos.',
          en: 'Multi-persona mobile app for managers and field techs featuring biometric auth (Face ID / Touch ID), encrypted token vault and seamless OTA updates.',
        },
      },
    ],
    galleryGroups: [
      {
        id: 'faturamento',
        title: { pt: 'Gestão Financeira & Faturamento', en: 'Financial Management & Billing' },
        tag: 'FINANCEIRO & COMPLIANCE',
        description: {
          pt: 'Telas de conciliação mensal, auditoria de valores, grupos societários sob a Receita Federal e vínculos com filiais.',
          en: 'Monthly reconciliation, financial auditing, corporate entities validated with the IRS and branch relations.',
        },
        items: [
          {
            src: '/portfolio-autocom3/prints-16x9/sistema-faturamento-mensal.png',
            tag: 'FINANCEIRO & AUDITORIA',
            title: { pt: 'Faturamento Mensal & Prévia', en: 'Monthly Billing & Audit Preview' },
            caption: { pt: 'Conciliação contábil entre competências, detecção de divergências e botão de privacidade para mascarar valores.', en: 'Cross-period reconciliation, value discrepancy alerts and privacy toggle to mask sensitive numbers.' },
          },
          {
            src: '/portfolio-autocom3/prints-16x9/grupos-faturamento-visao-geral.png',
            tag: 'RECEITA FEDERAL & REDES',
            title: { pt: 'Grupos de Faturamento Societários', en: 'Corporate Billing Groups' },
            caption: { pt: 'Centralização de cobrança em CNPJ faturador único com consulta síncrona na Receita Federal e soft delete fiscal.', en: 'Centralized chain billing under a single taxpayer ID with synchronous IRS validation and soft-delete.' },
          },
          {
            src: '/portfolio-autocom3/prints-16x9/grupos-faturamento-detalhe.png',
            tag: 'GESTÃO SOCIETÁRIA',
            title: { pt: 'Dossiê do Grupo & Filiais Vinculadas', en: 'Entity Dossier & Linked Branches' },
            caption: { pt: 'Gestão detalhada de lojas centralizadas, adimplência contratual e regras unificadas de faturamento.', en: 'Detailed view of managed stores, compliance status and unified multi-branch billing policies.' },
          },
        ],
      },
      {
        id: 'licencas',
        title: { pt: 'Central de Licenças & Redes', en: 'License Hub & Network Hierarchy' },
        tag: 'LICENCIAMENTO & TERMINAIS',
        description: {
          pt: 'Painel mestre SGSH com hierarquia de lojas, classificação por faturamento mensal e dossiê de hardware.',
          en: 'SGSH master panel with multi-store hierarchy, revenue star ratings and terminal hardware dossier.',
        },
        items: [
          {
            src: '/portfolio-autocom3/prints-16x9/central-licencas-sgsh-painel.png',
            tag: 'LICENCIAMENTO SGSH',
            title: { pt: 'Central de Licenças SGSH & Estrelas', en: 'SGSH License Hub & Star Ratings' },
            caption: { pt: 'Listagem determinística com Loja Central no topo, filiais por número e classificação por faturamento mensal.', en: 'Deterministic hierarchy placing Central Store first, branches by number and revenue star ratings.' },
          },
          {
            src: '/portfolio-autocom3/prints-16x9/central-licencas-sgsh-detalhe.png',
            tag: 'TERMINAIS & HARDWARE',
            title: { pt: 'Dossiê Técnico da Licença', en: 'Technical License Dossier' },
            caption: { pt: 'Mapeamento de direitos contratuais, identificadores de hardware dos PDVs e suporte a licenças de sistemas legados.', en: 'Contract entitlements, POS hardware IDs and direct download links for legacy system licenses.' },
          },
          {
            src: '/portfolio-autocom3/prints-16x9/gestao-redes-lojas.png',
            tag: 'REDES & PARCEIROS',
            title: { pt: 'Gestão Hierárquica de Redes & Canais', en: 'Multi-Store Chains & Partner Networks' },
            caption: { pt: 'Estrutura multinível de redes comerciais e canais parceiros white-label vinculados à Autocom3.', en: 'Multilevel commercial hierarchy for retail chains and white-label partner networks.' },
          },
        ],
      },
      {
        id: 'comercial',
        title: { pt: 'Propostas Comerciais, NoCode & Contratos', en: 'Commercial Proposals, NoCode & Contracts' },
        tag: 'CRM & CONVERSÃO CONTRATUAL',
        description: {
          pt: 'Formulários dinâmicos com prompting para IA, tabela oficial de SKUs, pipeline comercial e emissão de contratos com assinatura digital.',
          en: 'Dynamic forms with AI prompt structuring, official SKU tables, sales pipeline and digital contract emission.',
        },
        items: [
          {
            src: '/portfolio-autocom3/prints-16x9/gerador-propostas-comerciais-painel.png',
            tag: 'OPORTUNIDADES & SKUS',
            title: { pt: 'Painel de Propostas Comerciais', en: 'Commercial Proposals Dashboard' },
            caption: { pt: 'Acompanhamento de propostas em aberto, ganhas e perdidas com base no catálogo de SKUs e planos do SGSH.', en: 'Proposals lifecycle tracking connected to official SGSH SKU pricing and system plans.' },
          },
          {
            src: '/portfolio-autocom3/prints-16x9/gerador-propostas-editor-view.png',
            tag: 'NO-CODE & IA',
            title: { pt: 'Formulário NoCode & Editor Dinâmico', en: 'NoCode Dynamic Proposal Form' },
            caption: { pt: 'Renderização condicional por tipo de operação, sanitização de dados, prompt de IA e conversão contratual SHA-256.', en: 'Conditional form rendering, data sanitization, AI prompts and automated SHA-256 contract generation.' },
          },
          {
            src: '/portfolio-autocom3/prints-16x9/gestao-contratos-clientes.png',
            tag: 'JURÍDICO & CONTRATOS',
            title: { pt: 'Gestão de Contratos & Assinatura', en: 'Contract Lifecycle & Digital Signature' },
            caption: { pt: 'Emissão e auditoria de minutas contratuais vinculadas às licenças ativas do SGSH com validação jurídica.', en: 'Drafting and audit trail of legal contracts tied to active SGSH licenses with signature compliance.' },
          },
        ],
      },
      {
        id: 'operacoes',
        title: { pt: 'Operações, CRM & Comunicação do Sistema', en: 'Operations, CRM & Broadcast Center' },
        tag: 'ECOSSISTEMA & PRODUTIVIDADE',
        description: {
          pt: 'Cockpit operacional com catálogo de +30 ferramentas, ingestão e qualificação de leads e comunicados em tempo real.',
          en: 'Operational cockpit with 30+ categorized tools, sales lead tracking and real-time broadcast messaging.',
        },
        items: [
          {
            src: '/portfolio-autocom3/prints-16x9/sistema-dashboard-geral.png',
            tag: 'DASHBOARD & KPIS',
            title: { pt: 'Dashboard Executivo Geral', en: 'Executive Command Center' },
            caption: { pt: 'Visão gerencial consolidada com indicadores operacionais, certificados a vencer e monitoramento de clientes.', en: 'Consolidated executive metrics, certificate expiration alerts and client deployment tracking.' },
          },
          {
            src: '/portfolio-autocom3/prints-16x9/crm-operacoes-comerciais.png',
            tag: 'CATÁLOGO MODULAR',
            title: { pt: 'Hub Canônico de Operações & CRM', en: 'Operations Master Hub & CRM' },
            caption: { pt: 'Mais de 30 ferramentas agrupadas por setor com busca rápida, favoritos no storage e controle restrito por perfis.', en: '30+ departmental tools with instantaneous search, local storage favorites and strict RBAC.' },
          },
          {
            src: '/portfolio-autocom3/prints-16x9/crm-operacoes-detalhe-registro.png',
            tag: 'PIPELINE DE VENDAS',
            title: { pt: 'Dossiê de Lead & Interações', en: 'Lead Dossier & Sales Pipeline' },
            caption: { pt: 'Histórico de interações, qualificação técnica (PDVs, regime tributário) e trilha de auditoria do funil.', en: 'Interaction records, technical qualifications (POS counts, tax regime) and sales funnel audit logs.' },
          },
          {
            src: '/portfolio-autocom3/prints-16x9/central-avisos-comunicados.png',
            tag: 'BROADCAST & SEFAZ',
            title: { pt: 'Central de Avisos e Comunicados', en: 'Notification & Broadcast Center' },
            caption: { pt: 'Comunicados ricos em Markdown para PDVs e retaguarda com segmentação por perfil e agendamento de vigência.', en: 'Rich Markdown announcements for POS and back-office with role segmentation and scheduled visibility.' },
          },
        ],
      },
    ],
    evidence: [{ href: 'https://www.autocom3.com.br/', label: { pt: 'Conhecer a Autocom3', en: 'Visit Autocom3' } }],
    note: {
      pt: 'As capturas acima apresentam dados operacionais fictícios e mascarados pelo motor de privacidade para preservar sigilo corporativo.',
      en: 'The captures above present mock and masked data generated by the privacy engine to protect corporate confidentiality.',
    },
  },
  {
    id: 'propose', categories: ['corporativo'], name: 'Propose',
    type: { pt: 'SaaS · Domus', en: 'SaaS · Domus' },
    introduction: {
      pt: 'SaaS de propostas comerciais com editor visual drag-and-drop e renderização de formulários por JSON Schema.',
      en: 'A commercial proposal SaaS with a drag-and-drop visual editor and JSON Schema form rendering.',
    },
    contextLabel: { pt: 'O contexto', en: 'The context' },
    context: {
      pt: 'Construí o Propose na Domus para permitir que equipes montem e personalizem propostas sem escrever código.',
      en: 'I built Propose at Domus to let teams assemble and customize proposals without writing code.',
    },
    approachLabel: { pt: 'A abordagem', en: 'The approach' },
    approach: {
      pt: 'A aplicação integra Next.js, PostgreSQL, Supabase e pagamentos. Usei SSR e SSG conforme as necessidades de cada página.',
      en: 'The application integrates Next.js, PostgreSQL, Supabase, and payments. I used SSR and SSG according to each page’s needs.',
    },
    diagramLabel: { pt: 'Componentes da plataforma', en: 'Platform components' },
    diagram: [
      { pt: 'Editor visual', en: 'Visual editor' }, { pt: 'JSON Schema', en: 'JSON Schema' },
      { pt: 'Propostas', en: 'Proposals' }, { pt: 'Pagamentos', en: 'Payments' },
    ],
  },
  {
    id: 'argos', categories: ['ia'], name: 'Argos-Action-1.5B',
    type: { pt: 'Pesquisa aberta · Computer Use', en: 'Open research · Computer Use' },
    introduction: {
      pt: 'Protótipo aberto de um modelo pequeno que lê a árvore de acessibilidade da interface e propõe uma ação estruturada por vez.',
      en: 'An open research prototype that reads an interface accessibility tree and proposes one structured action at a time.',
    },
    contextLabel: { pt: 'Como avaliei o modelo', en: 'How I evaluated the model' },
    context: {
      pt: 'O primeiro script validava os rótulos do dataset. Na avaliação posterior, em 132 casos inéditos, 92% das respostas do adaptador seguiram o schema, frente a 0% do modelo base. O Argos deixou de escalar para uma pessoa nos 28 casos em que deveria parar.',
      en: 'The first script checked the dataset labels. In a later evaluation on 132 unseen cases, 92% of the adapter’s responses matched the schema, compared with 0% for the base model. Argos failed to escalate in all 28 cases where it should have stopped.',
    },
    approachLabel: { pt: 'Adaptação e integração', en: 'Adaptation and integration' },
    approach: {
      pt: 'Treinei um adaptador LoRA sobre Qwen 2.5 1.5B Instruct com dados sintéticos. A saída é JSON estruturado, que uma ponte experimental traduz para MCP. O playground exibe exemplos do protocolo.',
      en: 'I trained a LoRA adapter on Qwen 2.5 1.5B Instruct using synthetic data. An experimental bridge translates the structured JSON output to MCP. The playground displays protocol examples.',
    },
    diagramLabel: { pt: 'Da interface à ação proposta', en: 'From the interface to a proposed action' },
    diagram: [
      { pt: 'Objetivo', en: 'Goal' }, { pt: 'AXTree', en: 'AXTree' },
      { pt: 'Argos-Action', en: 'Argos-Action' }, { pt: 'Ação em JSON', en: 'JSON action' },
    ],
    evidence: [
      { href: 'https://medium.com/@pedrosousa2160/meu-script-disse-100-ele-s%C3%B3-tinha-validado-o-gerador-d7433b381927', label: { pt: 'Artigo sobre a avaliação', en: 'Evaluation article' } },
      { href: 'https://github.com/PedroReoli/argos-action', label: { pt: 'Código do protótipo', en: 'Prototype code' } },
      { href: 'https://huggingface.co/pedroreoli/argos-action-1.5b', label: { pt: 'Adaptador LoRA', en: 'LoRA adapter' } },
    ],
    note: {
      pt: 'Os resultados medem formato e escalonamento no conjunto avaliado. Bloqueios no executor e validação ponta a ponta seguem como próximos passos.',
      en: 'The results measure schema adherence and escalation on the evaluation set. Executor-side safeguards and end-to-end validation are next steps.',
    },
  },
  {
    id: 'achilles', categories: ['proprios', 'ia'], name: 'Achilles CDP Agent',
    type: { pt: 'Agentes e automação', en: 'Agents and automation' },
    introduction: {
      pt: 'Servidor MCP em Python para automação e QA no navegador e em aplicativos Windows. Projeto pessoal de código aberto, sob licença MIT.',
      en: 'A Python MCP server for browser and Windows app automation and QA. An open-source personal project under the MIT license.',
    },
    contextLabel: { pt: 'O contexto', en: 'The context' },
    context: {
      pt: 'Desenvolvi o Achilles como projeto pessoal e o usei em operações de produto e testes de qualidade.',
      en: 'I developed Achilles as a personal project and used it for product operations and quality assurance.',
    },
    approachLabel: { pt: 'A abordagem', en: 'The approach' },
    approach: {
      pt: 'Combina CDP e Playwright no Chrome e Edge com UI Automation no Windows. Etapas de login, CAPTCHA e 2FA são entregues a uma pessoa.',
      en: 'It combines CDP and Playwright on Chrome and Edge with UI Automation on Windows. A person takes over for login, CAPTCHA, and two-factor authentication.',
    },
    diagramLabel: { pt: 'Fluxo conceitual', en: 'Conceptual flow' },
    diagram: [
      { pt: 'Agente', en: 'Agent' }, { pt: 'MCP', en: 'MCP' },
      { pt: 'Navegador e Windows', en: 'Browser and Windows' }, { pt: 'Supervisão humana', en: 'Human oversight' },
    ],
    evidence: [{ href: 'https://github.com/PedroReoli/Achilles-CDP-Agent', label: { pt: 'Código e documentação', en: 'Code and documentation' } }],
  },
  {
    id: 'organon', categories: ['proprios', 'ia'], name: 'Organon',
    type: { pt: 'Orquestração de agentes · Suíte Reoli', en: 'Agent orchestration · Reoli suite' },
    introduction: {
      pt: 'Aplicativo desktop local-first da suíte Reoli para coordenar sessões de trabalho com múltiplos modelos e aprovações humanas.',
      en: 'A local-first desktop application in the Reoli suite for coordinating work sessions across multiple models with human approval.',
    },
    contextLabel: { pt: 'O contexto', en: 'The context' },
    context: {
      pt: 'Centraliza a execução e o acompanhamento de sessões de agentes em um mesmo ambiente de trabalho.',
      en: 'It brings agent session execution and oversight into one workspace.',
    },
    approachLabel: { pt: 'A abordagem', en: 'The approach' },
    approach: {
      pt: 'O cockpit reúne a orquestração de sessões com vários modelos e um painel para a pessoa responsável revisar e aprovar ações.',
      en: 'The cockpit combines multi-model session orchestration with a panel for an operator to review and approve actions.',
    },
    diagramLabel: { pt: 'Organização das sessões', en: 'Session organization' },
    diagram: [
      { pt: 'Sessão local', en: 'Local session' }, { pt: 'Múltiplos modelos', en: 'Multiple models' },
      { pt: 'Painel de revisão', en: 'Review panel' }, { pt: 'Aprovação humana', en: 'Human approval' },
    ],
    note: { pt: 'Projeto próprio com repositório privado.', en: 'Personal project with a private repository.' },
  },
  {
    id: 'geoambiental', categories: ['proprios'], name: 'GeoAmbiental',
    type: { pt: 'Mapa ambiental interativo', en: 'Interactive environmental map' },
    introduction: {
      pt: 'Uma aplicação web para explorar camadas ambientais e dados geoespaciais de Volta Redonda.',
      en: 'A web application for exploring environmental layers and geospatial data for Volta Redonda.',
    },
    contextLabel: { pt: 'O contexto', en: 'The context' },
    context: {
      pt: 'O mapa reúne camadas selecionáveis e informações sobre os elementos representados.',
      en: 'The map brings together selectable layers and information about the represented features.',
    },
    approachLabel: { pt: 'A abordagem', en: 'The approach' },
    approach: {
      pt: 'O repositório descreve uma interface React e TypeScript com OpenLayers e consulta a dados do IBGE.',
      en: 'The repository describes a React and TypeScript interface with OpenLayers and IBGE data queries.',
    },
    diagramLabel: { pt: 'Elementos da aplicação', en: 'Application elements' },
    diagram: [
      { pt: 'Camadas', en: 'Layers' }, { pt: 'Mapa', en: 'Map' },
      { pt: 'Detalhes', en: 'Details' }, { pt: 'Dados IBGE', en: 'IBGE data' },
    ],
    evidence: [{ href: 'https://github.com/PedroReoli/showcase-geoambiental-vr', label: { pt: 'Código e documentação', en: 'Code and documentation' } }],
    note: {
      pt: 'As camadas geográficas são ilustrativas, conforme informado no repositório.',
      en: 'The geographic layers are illustrative, as stated in the repository.',
    },
  },
  {
    id: 'falaatipica', categories: ['proprios'], name: 'FalaAtípica',
    type: { pt: 'Tecnologia assistiva · TCC UniFOA', en: 'Assistive technology · UniFOA capstone' },
    introduction: {
      pt: 'Projeto acadêmico de uma plataforma que aproxima famílias e profissionais no acompanhamento de crianças com atraso de fala.',
      en: 'An academic platform project that connects families and professionals who support children with speech delays.',
    },
    contextLabel: { pt: 'Origem do projeto', en: 'Project origin' },
    context: {
      pt: 'O trabalho começou como TCC de Sistemas de Informação no UniFOA, com revisão bibliográfica e contato com profissionais.',
      en: 'The work began as an Information Systems capstone at UniFOA and included a literature review and discussions with practitioners.',
    },
    approachLabel: { pt: 'O que a plataforma propõe', en: 'What the platform proposes' },
    approach: {
      pt: 'Módulos para cuidadores, crianças e profissionais, com atividades lúdicas e acompanhamento das interações como complemento ao trabalho terapêutico.',
      en: 'Modules for caregivers, children, and practitioners combine playful activities and interaction tracking to complement therapy.',
    },
    diagramLabel: { pt: 'Participantes e atividades', en: 'Participants and activities' },
    diagram: [
      { pt: 'Criança', en: 'Child' }, { pt: 'Atividades', en: 'Activities' },
      { pt: 'Família', en: 'Family' }, { pt: 'Profissionais', en: 'Practitioners' },
    ],
    evidence: [
      { href: 'https://conferencias.unifoa.edu.br/tc/article/view/2519', label: { pt: 'Publicação acadêmica', en: 'Academic publication' } },
      { href: 'https://www.unifoa.edu.br/noticias/egresso-plataforma-apoiar-criancas-fala/', label: { pt: 'Reportagem do UniFOA', en: 'UniFOA coverage' } },
    ],
  },
  {
    id: 'loog', categories: ['clientes'], name: 'Loog Proteção Veicular',
    type: { pt: 'Plataforma Web & Cotações', en: 'Web Platform & Quotes' },
    introduction: {
      pt: 'Portal institucional e motor de captura de cotações para proteção veicular com alta taxa de conversão.',
      en: 'Institutional portal and conversion-optimized quotation engine for vehicle protection.',
    },
    contextLabel: { pt: 'O desafio', en: 'The challenge' },
    context: {
      pt: 'Agilizar o funil de simulações com formulário dinâmico, validações em tempo real e tempo de resposta instantâneo.',
      en: 'Streamline client lead acquisition with dynamic multi-step simulation forms and instant response times.',
    },
    approachLabel: { pt: 'Engenharia de entrega', en: 'Delivery engineering' },
    approach: {
      pt: 'Arquitetura web moderna com carregamento rápido, SEO técnico, integração a webhooks de CRM e design responsivo.',
      en: 'Modern responsive architecture, core web vitals optimization, SEO, and CRM webhook integrations.',
    },
    diagramLabel: { pt: 'Fluxo comercial', en: 'Business flow' },
    diagram: [
      { pt: 'Visitante', en: 'Visitor' }, { pt: 'Simulação', en: 'Simulation' },
      { pt: 'Webhook CRM', en: 'CRM Webhook' }, { pt: 'Conversão', en: 'Conversion' },
    ],
    evidence: [{ href: 'https://loogprotecaoveicular.com.br/', label: { pt: 'Acessar website', en: 'Visit website' } }],
  },
  {
    id: 'nexus', categories: ['clientes'], name: 'Nexus Brazil',
    type: { pt: 'Sistemas & Integrações', en: 'Systems & Integrations' },
    introduction: {
      pt: 'Solução corporativa digital e presença institucional conectando serviços e tecnologia de ponta.',
      en: 'Enterprise digital presence and integration solutions connecting specialized operational services.',
    },
    contextLabel: { pt: 'O contexto', en: 'The context' },
    context: {
      pt: 'Posicionar a autoridade da marca com layout refinado, alta performance e pontos de contato diretos.',
      en: 'Strengthen enterprise brand presence with polished visual aesthetics and instant engagement channels.',
    },
    approachLabel: { pt: 'Tecnologias', en: 'Technologies' },
    approach: {
      pt: 'Desenvolvimento focado em experiência do usuário (UX), acessibilidade e carregamento resiliente.',
      en: 'Focused user experience, strict semantic structure, accessibility compliance, and fast asset delivery.',
    },
    diagramLabel: { pt: 'Estrutura da solução', en: 'Solution architecture' },
    diagram: [
      { pt: 'Brand', en: 'Brand' }, { pt: 'Interface', en: 'Interface' },
      { pt: 'Segurança', en: 'Security' }, { pt: 'Suporte', en: 'Support' },
    ],
    evidence: [{ href: 'https://www.nexusbrazil.com.br/', label: { pt: 'Acessar website', en: 'Visit website' } }],
  },
]

export function resolveProjectCategory(type: string | null, hash: string): ProjectCategory {
  const category = projectCategories.find((item) => item === type)
  if (category) return category

  const linkedProject = projectCases.find((project) => `#${project.id}` === hash)
  return linkedProject?.categories[0] ?? (type === 'gerais' ? 'clientes' : 'corporativo')
}

export const projectsCopy = {
  pt: {
    index: 'Explorar projetos', diagram: 'Diagrama conceitual', external: 'Abre em nova aba',
    metrics: 'Resultados do projeto',
    empty: 'Nenhum projeto disponível nesta categoria.',
    other: 'Ver projetos corporativos',
  },
  en: {
    index: 'Explore projects', diagram: 'Conceptual diagram', external: 'Opens in a new tab',
    metrics: 'Project results',
    empty: 'No projects are available in this category.',
    other: 'View enterprise projects',
  },
} as const

