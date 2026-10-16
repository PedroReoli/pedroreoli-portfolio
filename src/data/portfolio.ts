export const profile = {
  name: "Pedro Lucas Reis",
  role: "Full Stack Software Engineer",
  tagline: "Frontend Architecture • APIs REST • Cloud & AWS • AI Engineering",
  email: "pedrosousa2160@gmail.com",
  phoneLabel: "+55 24 99326-4040",
  phoneHref: "https://wa.me/5524993264040",
  location: "Volta Redonda, RJ | Remoto ou Híbrido",
  website: "https://pedroreis.vercel.app/",
  linkedin: "https://www.linkedin.com/in/pedro-lucas-reis-a93945171/",
  github: "https://github.com/PedroReoli",
  summary: [
    "Full Stack Software Engineer com cerca de 4 anos de experiência prática na arquitetura e desenvolvimento de ecossistemas corporativos ERP, plataformas SaaS multi-tenant e aplicações desktop de alta performance.",
    "Especialista em TypeScript, React, Next.js, Node.js, NestJS e PostgreSQL, com forte domínio de Design Systems escaláveis (500+ componentes, -70% no ciclo dev), otimização Core Web Vitals (-40% latência, Lighthouse ~100) e engenharia de IA com automações via MCP e arquitetura Local-First.",
  ],
} as const

export const blogPosts = [] as const

export const projectsLabels = {
  kicker: "Projetos Selecionados",
  title1: "PROJETOS",
  title2: "TÉCNICOS",
  details: "Detalhes",
  visit: "Acessar projeto",
  stack: "Tecnologias",
  features: "Entregas principais",
  metrics: "Indicadores",
  close: "Fechar",
  all: "Todos",
  types: {
    site: "Web",
    erp: "ERP",
    saas: "SaaS",
    mobile: "Mobile",
    internal: "Interno",
    ai: "IA / Automação",
  },
} as const

export const highlights = [
  {
    label: "Experiência",
    value: "4+",
    suffix: "anos",
    description: "SaaS, ERPs corporativos, plataformas web e IA aplicada",
  },
  {
    label: "Produtos",
    value: "10+",
    suffix: "em produção",
    description: "Soluções de alto impacto operando diariamente",
  },
  {
    label: "Design System",
    value: "500+",
    suffix: "componentes",
    description: "Biblioteca reutilizável que reduz o tempo de dev em 70%",
  },
] as const

export const metricsData = [
  {
    id: "components",
    label: "Componentes Reutilizáveis",
    value: "500+",
    sub: "Design System Corporativo Unificado",
    color: "from-[#1d68f2] to-[#00d4ff]",
    borderColor: "rgba(29, 104, 242, 0.4)",
    highlight: "-70% no tempo de criação de novas telas",
  },
  {
    id: "dev-reduction",
    label: "Redução no Ciclo de Dev",
    value: "-70%",
    sub: "Eficiência de Engenharia & Padrões",
    color: "from-[#10b981] to-[#34d399]",
    borderColor: "rgba(16, 185, 129, 0.4)",
    highlight: "Padronização de tokens, hooks e fluxos modulares",
  },
  {
    id: "products",
    label: "Produtos em Produção",
    value: "10+",
    sub: "SaaS, ERPs e Ferramentas B2B",
    color: "from-[#f59e0b] to-[#fbbf24]",
    borderColor: "rgba(245, 158, 11, 0.4)",
    highlight: "Sistemas corporativos utilizados diariamente",
  },
  {
    id: "erp-pages",
    label: "Páginas & Módulos ERP",
    value: "100+",
    sub: "Ecossistema Corporativo Web",
    color: "from-[#1d68f2] to-[#60a5fa]",
    borderColor: "rgba(29, 104, 242, 0.4)",
    highlight: "Autenticação RBAC, relatórios e dashboards",
  },
  {
    id: "token-economy",
    label: "Economia de Tokens IA",
    value: "92.2%",
    sub: "Achilles CDP Agent (AXTree Engine)",
    color: "from-[#8b5cf6] to-[#c084fc]",
    borderColor: "rgba(139, 92, 246, 0.4)",
    highlight: "Redução de 80.000 para < 2.000 tokens por página",
  },
  {
    id: "lighthouse",
    label: "Pontuação Lighthouse",
    value: "100",
    sub: "Performance, SEO, A11y & Best Practices",
    color: "from-[#10b981] to-[#06b6d4]",
    borderColor: "rgba(16, 185, 129, 0.4)",
    highlight: "Aplicações otimizadas com Core Web Vitals perfeitos",
  },
  {
    id: "organizations",
    label: "Organizações Atendidas",
    value: "20+",
    sub: "Empresas Ativas na Plataforma",
    color: "from-[#00d4ff] to-[#38bdf8]",
    borderColor: "rgba(0, 212, 255, 0.4)",
    highlight: "Gestão financeira, fiscal e operacional multi-tenant",
  },
  {
    id: "mentees",
    label: "Alunos & Mentorados",
    value: "30+",
    sub: "Inclusão Digital & IA Aplicada",
    color: "from-[#ec4899] to-[#f43f5e]",
    borderColor: "rgba(236, 72, 153, 0.4)",
    highlight: "Capacitação em desenvolvimento e IA (EvaTech / Sebrae)",
  },
] as const

export const skills = [
  {
    category: "Frontend Architecture",
    items: [
      { name: "React & Next.js", icon: "SiReact", usage: "App Router, SSR, SSG, Server Actions, hidratação seletiva e alta escala." },
      { name: "TypeScript", icon: "SiTypescript", usage: "Tipagem estrita de contratos de domínio, interfaces e integrações de API." },
      { name: "Design Systems", icon: "FiLayers", usage: "500+ componentes acessíveis com Tailwind CSS, Radix UI e design tokens semânticos." },
      { name: "Tailwind CSS & Styling", icon: "SiTailwindcss", usage: "Design tokens, responsividade fluida, microinterações e dark mode." },
      { name: "HTML5 & Core Web Vitals", icon: "FiZap", usage: "Estruturas semânticas, SEO técnico, métricas Lighthouse e carregamento otimizado." },
      { name: "React Query & Zustand", icon: "SiReactquery", usage: "Gerenciamento de estado de servidor, cache, invalidação e optimistic UI." },
    ],
  },
  {
    category: "Backend & APIs",
    items: [
      { name: "Node.js & NestJS", icon: "SiNodedotjs", usage: "APIs REST corporativas, arquitetura em camadas, Clean Architecture e microsserviços." },
      { name: "Fastify & Express", icon: "SiExpress", usage: "Serviços de baixa latência, middlewares, autenticação JWT e rotas seguras." },
      { name: "Autenticação & RBAC", icon: "FiShield", usage: "Controle de permissões granular, sessões seguras, rate limiting e multi-tenancy." },
      { name: "Webhooks & Event-Driven", icon: "SiOpenapiinitiative", usage: "Pipelines de eventos, mensageria e integrações assíncronas entre sistemas." },
      { name: "GraphQL & REST", icon: "FiCode", usage: "Modelagem de contratos padronizados de comunicação e consumo de dados." },
      { name: "C# & .NET", icon: "SiDotnet", usage: "Integração e sustentação de serviços conectados a ecossistemas ERP corporativos." },
    ],
  },
  {
    category: "Bancos de Dados & Cloud",
    items: [
      { name: "PostgreSQL", icon: "SiPostgresql", usage: "Modelagem relacional, migrations, índices, queries otimizadas e procedures." },
      { name: "Supabase & SQLite", icon: "SiSupabase", usage: "Arquitetura offline-first local (SQLite) e infraestrutura serverless (Supabase)." },
      { name: "SQL Server & MySQL", icon: "FiDatabase", usage: "Bases transacionais de ERPs e relatórios de inteligência de negócios." },
      { name: "AWS & Docker", icon: "FiCloud", usage: "Lambda, API Gateway, S3 Storage, conteinerização e pipelines de deploy contínuo." },
      { name: "Git & CI/CD", icon: "SiGithub", usage: "Governança de repositórios, automação de testes e entrega contínua." },
      { name: "Web Scraping & Puppeteer", icon: "SiPuppeteer", usage: "Automação de navegação, extração de dados e fluxos de dados remotos." },
    ],
  },
  {
    category: "Desktop, Automação & IA",
    items: [
      { name: "Electron & Tauri", icon: "SiTauri", usage: "Aplicações desktop de nível industrial com soberania de dados (Organon v6.23.2)." },
      { name: "Achilles CDP Agent", icon: "FiCpu", usage: "Agente de IA autônomo via Chrome DevTools Protocol, AXTree e servidor MCP nativo." },
      { name: "Model Context Protocol", icon: "FiCode", usage: "Servidores MCP stdio nativos para Claude Code, Cursor e ecossistemas de agentes." },
      { name: "Whisper AI & LLMs", icon: "SiOpenai", usage: "Transcrição offline inteligente e processamento de linguagem natural integrado." },
      { name: "Playwright & CDP", icon: "SiPuppeteer", usage: "Navegação e observação de browsers com Reader Mode semântico e token economy." },
      { name: "Local-First Architecture", icon: "FiLayers", usage: "Sistemas resilientes com latência zero, soberania de dados e persistência ACID." },
    ],
  },
] as const

export const experiences = [
  {
    company: "Autocom3 Tecnologia",
    role: "Full Stack Software Engineer",
    context: "Evolução e desenvolvimento de ecossistema ERP, portais corporativos unificados e aplicações de retaguarda utilizadas por mais de 20 organizações.",
    period: "Nov/2024 - Atual",
    location: "Volta Redonda, RJ | Remoto / Híbrido",
    stack: ["TypeScript", "React", "Next.js", "Node.js", "NestJS", "PostgreSQL", "AWS", "Tauri", "Tailwind CSS", "Design Systems"],
    achievements: [
      "Arquitetou e liderou a biblioteca de componentes e Design System corporativo com mais de 500 itens reutilizáveis, padronizando a interface e acelerando em até 70% o ciclo de desenvolvimento de novos módulos.",
      "Desenvolveu APIs REST e serviços de backend em Node.js e NestJS, implementando autenticação JWT, permissões granulares RBAC, rate limiting e Webhooks assíncronos para operações cadastrais e financeiras.",
      "Otimizou o pipeline de renderização e carregamento de telas densas de ERP, reduzindo em até 40% a latência percebida pelo usuário em produção para 20+ organizações.",
      "Colaborou na infraestrutura cloud em AWS e na transição de ferramentas corporativas desktop de Electron para Tauri.",
    ],
  },
  {
    company: "Domus - Sua Solução Digital",
    role: "Full Stack Engineer & Tech Lead",
    context: "Engenharia de software ponta a ponta de produtos digitais, plataformas SaaS B2B, dashboards e automação com agentes de IA.",
    period: "Out/2025 - Atual",
    location: "Remoto",
    stack: ["TypeScript", "React", "Next.js", "Node.js", "Fastify", "PostgreSQL", "Supabase", "APIs REST", "IA Aplicada", "MCP"],
    achievements: [
      "Conduziu o ciclo completo de engenharia de ponta a ponta: levantamento de requisitos com clientes, modelagem de dados, desenvolvimento de front-end responsivo e deploy.",
      "Idealizou e desenvolveu o Organon Ecosystem (v6.23.2), plataforma local-first com 19 telas operacionais integrando editor TipTap, canvas Excalidraw e Whisper IA.",
      "Construiu o motor autônomo Achilles CDP Agent com servidor MCP integrado, reduzindo o consumo de tokens em 92.2% via AXTree.",
      "Desenvolveu o Propose SaaS, gerador NoCode de propostas comerciais com editor drag-and-drop e renderização baseada em esquemas dinâmicos JSON.",
    ],
  },
  {
    company: "SIVIS Tecnologia",
    role: "Software Engineer (Full Stack & Integrações)",
    context: "Desenvolvimento de módulos de gestão, dashboards analíticos e integrações de sistemas para associações e empresas de proteção veicular.",
    period: "Ago/2022 - Jun/2024 e Nov/2025 - Atual",
    location: "Volta Redonda, RJ | Remoto",
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "MySQL", "APIs REST", "Git", "PHP"],
    achievements: [
      "Desenvolveu mais de 30 interfaces web em produção (React, TypeScript) e construiu mais de 20 endpoints REST (Node.js, PHP, C#) para processos operacionais reais.",
      "Implementou rotinas de faturamento, controle cadastral e cobrança financeira, garantindo integridade de dados em bancos relacionais PostgreSQL e MySQL.",
      "Construiu conectores e integrações seguras com gateways de pagamento, emissão de boletos e mensageria externa.",
      "Refatorou módulos legados para arquitetura componentizada, elevando a manutenibilidade do código e reduzindo em 35% o tempo de resposta.",
    ],
  },
  {
    company: "UniFOA / EvaTech (SEBRAE)",
    role: "Mentor de Tecnologia & Inteligência Artificial",
    context: "Programa de formação técnica e inclusão digital em parceria com o SEBRAE voltado à capacitação em tecnologia, desenvolvimento e IA.",
    period: "Jun/2024 - Dez/2024",
    location: "Volta Redonda, RJ",
    stack: ["JavaScript", "TypeScript", "React", "Prompt Engineering", "Ferramentas de IA", "Mentoria Técnica"],
    achievements: [
      "Capacitou e mentoreou mais de 30 profissionais em competências digitais, desenvolvimento de aplicações web e boas práticas com ferramentas de IA.",
      "Elaborou trilhas práticas de aprendizagem técnica e liderou workshops sobre TypeScript, React e automação com LLMs.",
      "Contribuiu ativamente na execução de workshops de formação digital em parceria com o SEBRAE Regional.",
    ],
  },
] as const

export const education = {
  degree: "Bacharelado em Sistemas de Informação",
  institution: "Centro Universitário de Volta Redonda (UniFOA)",
  period: "2022 - 2025",
  status: "Concluído",
  highlights: [
    "Foco em Engenharia de Software, Estrutura de Dados, Banco de Dados Relacionais e Segurança da Informação.",
    "Participação ativa em projetos de extensão universitária e mentoria tecnológica em parceria com o SEBRAE.",
  ],
} as const

export const educationList = [
  {
    degree: "Bacharelado em Sistemas de Informação",
    institution: "Centro Universitário de Volta Redonda (UniFOA)",
    period: "2022 - 2025",
    status: "Concluído",
    details: [
      "Foco em Engenharia de Software, Arquitetura de Sistemas, Banco de Dados Relacionais e Segurança da Informação.",
      "Participação ativa em projetos de extensão universitária e pesquisa aplicada.",
    ],
  },
  {
    degree: "Especialização Front-end Engineering & UI/UX (200h)",
    institution: "Origamid",
    period: "2026",
    status: "Concluído",
    details: [
      "Domínio aprofundado de ecossistemas React, Design Systems unificados, Acessibilidade WCAG e Core Web Vitals.",
      "Arquitetura de interfaces modernas, animações de alta performance e tipagem rigorosa TypeScript.",
    ],
  },
] as const

export const languages = [
  { 
    name: "Português", 
    level: "Nativo", 
    info: "Comunicação executiva, liderança técnica, facilitação e documentação formal de software." 
  },
  { 
    name: "Inglês", 
    level: "Intermediário Funcional (B2)", 
    info: "Leitura técnica fluida, redação de documentações de arquitetura e conversação profissional." 
  },
] as const

export const academicLeadership = [
  {
    title: "Mentoria Técnica & Inteligência Artificial",
    organization: "EvaTech / SEBRAE & UniFOA",
    period: "Jun/2024 - Dez/2024",
    info: "Capacitação e mentoria técnica de 30+ profissionais em TypeScript, React, boas práticas e automações com LLMs.",
  },
] as const

export const projects = [
  // =========================================================================
  // TIER 1: SISTEMAS FLAGSHIP / GRANDES PLATAFORMAS (3 ATIVOS)
  // =========================================================================
  {
    id: "organon-ecosystem",
    name: "Organon Desktop & Ecosystem v6.23.2",
    href: "https://github.com/PedroReoli/organon",
    githubUrl: "https://github.com/PedroReoli/organon",
    liveUrl: undefined,
    isProprietary: false,
    accessBadge: "Open Source // Desktop App",
    domain: "github.com/PedroReoli/organon",
    type: "ai",
    category: "Flagship • Business OS & IA",
    image: "/Domus.png",
    flagship: true,
    group: "flagship",
    shortDescription:
      "Hub de produtividade local-first com 19 telas operacionais, editor rico TipTap, canvas visual Excalidraw, transcrição inteligente Whisper IA offline e servidor MCP.",
    stack: ["Electron", "React 18", "TypeScript", "Vite", "TipTap", "Excalidraw", "Radix UI", "Whisper AI", "Fastify", "SQLite", "MCP Protocol"],
    features: [
      "Ambiente AI-Friendly com servidor MCP integrado para interação autônoma com Claude Code e Cursor.",
      "Arquitetura 100% Local-First com latência zero e persistência transacional ACID em SQLite.",
      "Editor de texto rico estruturado com TipTap integrado a quadro branco infinito com Excalidraw.",
      "Motor local de inteligência de áudio com Whisper IA para transcrição automática offline de reuniões.",
    ],
    metrics: [
      { label: "Arquitetura", value: "100% Local-First + ACID" },
      { label: "Integração IA", value: "Servidor MCP Integrado" },
    ],
  },
  {
    id: "achilles-cdp-agent",
    name: "Achilles CDP Agent",
    href: "https://github.com/PedroReoli/Achilles-CDP-Agent",
    githubUrl: "https://github.com/PedroReoli/Achilles-CDP-Agent",
    liveUrl: undefined,
    isProprietary: false,
    accessBadge: "Open Source // MCP Server",
    domain: "github.com/PedroReoli/Achilles-CDP-Agent",
    type: "ai",
    category: "Engenharia de IA & Automação",
    image: "/nexus.png",
    flagship: true,
    group: "flagship",
    shortDescription:
      "Motor autônomo de navegação e observação web para agentes de IA via CDP e semântica AXTree, com 92.2% de economia de tokens e servidor MCP nativo.",
    stack: ["Python", "Playwright", "CDP", "AXTree", "MCP Protocol", "FastAPI", "Asyncio", "Pydantic v2"],
    features: [
      "Reader Mode semântico via AXTree reduzindo árvores DOM gigantescas de 80.000 para < 2.000 tokens de contexto.",
      "Servidor MCP stdio nativo para conexão direta com Claude Code e ecossistemas de agentes autônomos.",
      "Bypass robusto de proteções antibot e controle de sessões persistentes com autenticação assistida (2FA/CAPTCHA).",
      "Sanitização e redação automática de credenciais e tokens sensíveis antes do envio ao modelo de linguagem.",
    ],
    metrics: [
      { label: "Economia de Tokens", value: "92.2% (Reader Mode AXTree)" },
      { label: "Protocolo", value: "Servidor MCP Nativo stdio" },
    ],
  },
  // =========================================================================
  // TIER 2: PROJETOS FREELANCERS (SITES & FRONT-END COM BACKEND MÍNIMO)
  // =========================================================================
  {
    id: "fala-atipica",
    name: "Fala Atípica – Tríade",
    href: "https://github.com/PedroReoli/FalaAtipica-Triade",
    githubUrl: "https://github.com/PedroReoli/FalaAtipica-Triade",
    liveUrl: undefined,
    isProprietary: false,
    accessBadge: "Front-end & Acessibilidade",
    domain: "falaatipica.com.br",
    type: "site",
    category: "Plataforma Institucional & Acolhimento",
    image: "/Domus.png",
    flagship: false,
    group: "freelance",
    shortDescription:
      "Plataforma institucional inclusiva e espaço de acolhimento para indivíduos autistas e famílias atípicas, desenvolvida com diretrizes de acessibilidade (WCAG) e arquitetura leve.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Vite", "Acessibilidade (a11y)", "REST API"],
    features: [
      "Interface responsiva com alto contraste e design acolhedor adaptado a diretrizes de neurodiversidade.",
      "Formulários acessíveis com validação em tempo real e envio direto para equipe multidisciplinar.",
      "Front-end modular com carregamento veloz em dispositivos móveis e tablets.",
    ],
    metrics: [
      { label: "Acessibilidade", value: "WCAG & Inclusão" },
      { label: "Arquitetura", value: "Front-end + Backend Mínimo" },
    ],
  },
  {
    id: "geoambiental-vr",
    name: "GeoAmbiental VR – Mapa Interativo",
    href: "https://github.com/PedroReoli/GeoAmbiental-VR-Mapa-Ambiental-de-Volta-Redonda",
    githubUrl: "https://github.com/PedroReoli/GeoAmbiental-VR-Mapa-Ambiental-de-Volta-Redonda",
    liveUrl: undefined,
    isProprietary: false,
    accessBadge: "Geoprocessamento Web",
    domain: "geoambientalvr.com.br",
    type: "site",
    category: "Geoprocessamento & Dados Ambientais",
    image: "/nexus.png",
    flagship: false,
    group: "freelance",
    shortDescription:
      "Portal interativo e mapa ambiental de Volta Redonda para visualização de camadas geoespaciais, indicadores ecológicos e áreas de preservação com renderização fluida no navegador.",
    stack: ["React", "TypeScript", "Maps API", "Tailwind CSS", "GeoJSON", "Vite"],
    features: [
      "Visualização interativa de camadas geoespaciais e pontos de interesse com renderização vetorial rápida.",
      "Filtros de dados por bacia hidrográfica, zonas de amortecimento e dados ambientais.",
      "Consumo de dados georreferenciados com cache local para navegação veloz mesmo em conexões móveis.",
    ],
    metrics: [
      { label: "Segmento", value: "GIS & Meio Ambiente" },
      { label: "Visualização", value: "Mapas Vetoriais Interativos" },
    ],
  },

  // =========================================================================
  // TIER 3: PROJETOS CORPORATIVOS (AUTOCOM3)
  // 1. Portal do Contador, 2. Portal do Cliente, 3. Mobile, 4. AC3 Flex, 5. Gestão de Propostas, 6. Admin
  // =========================================================================
  {
    id: "portal-contador",
    name: "Portal do Contador",
    href: undefined,
    githubUrl: undefined,
    liveUrl: undefined,
    isProprietary: true,
    accessBadge: "Módulo Fiscal & Contábil",
    domain: "autocom3.com.br/contador",
    type: "erp",
    category: "Plataforma Contábil & Fiscal",
    image: "/portal-contador.png",
    videoUrl: undefined,
    flagship: false,
    group: "modules",
    shortDescription:
      "Plataforma contábil integrada para exportação de XMLs, SPED fiscal, conciliação e relatórios corporativos automatizados para contadores parceiros.",
    stack: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
    features: [
      "Módulo de fechamento contábil e conferência fiscal com exportação em lote de notas fiscais.",
      "Autenticação RBAC isolada por escritório contábil e empresas clientes vinculadas.",
      "Redução no tempo de fechamento mensal para contadores parceiros através da automação fiscal.",
    ],
    metrics: [
      { label: "Segmento", value: "Fiscal & Contábil" },
      { label: "Integração", value: "SPED / XML / ERP" },
    ],
  },
  {
    id: "portal-cliente",
    name: "Portal do Cliente",
    href: "https://www.autocom3.com.br/autocom3clientes",
    githubUrl: undefined,
    liveUrl: "https://www.autocom3.com.br/autocom3clientes",
    isProprietary: true,
    accessBadge: "Portal Corporativo Web",
    domain: "autocom3.com.br/clientes",
    type: "erp",
    category: "Autoatendimento & Gestão",
    image: "/portal-cliente.png",
    videoUrl: undefined,
    flagship: false,
    group: "modules",
    shortDescription:
      "Hub corporativo ERP de autoatendimento com 100+ telas atendendo 20+ organizações ativas, centralizando faturamento, suporte e pedidos.",
    stack: ["React", "Next.js", "TypeScript", "Node.js", "NestJS", "PostgreSQL", "AWS", "Tailwind CSS"],
    features: [
      "Hub corporativo unificado com módulos de autoatendimento, gestão financeira, contábil e operacional.",
      "Design System autoral escalável com 500+ componentes tipados que reduziram em 70% o tempo de criação de novas telas.",
      "Otimizações de queries e renderização com ganho de 40% no carregamento de páginas críticas.",
      "Autenticação com JWT, controle de permissões granular (RBAC) e integrações seguras via Webhooks.",
    ],
    metrics: [
      { label: "Escala", value: "100+ Telas • 20+ Orgs" },
      { label: "Design System", value: "500+ Componentes (-70%)" },
    ],
  },
  {
    id: "autocom3-mobile",
    name: "Mobile (Aplicativo Autocom3)",
    href: undefined,
    githubUrl: undefined,
    liveUrl: undefined,
    isProprietary: true,
    accessBadge: "Aplicativo Mobile Corporativo",
    domain: "autocom3.com.br/mobile",
    type: "mobile",
    category: "Mobile & Força de Vendas",
    image: "/autocom3.png",
    videoUrl: undefined,
    flagship: false,
    group: "modules",
    shortDescription:
      "Aplicativo mobile corporativo integrado ao ERP Autocom3 para equipes comerciais, consulta ágil de estoque e pedidos em tempo real.",
    stack: ["React Native", "Expo", "TypeScript", "REST APIs", "Zustand", "Offline Sync"],
    features: [
      "Consulta instantânea de catálogo de produtos, tabelas de preço e estoque para equipes comerciais externas.",
      "Emissão e sincronização ágil de pedidos com suporte a operação offline e reconciliação automática.",
      "Autenticação corporativa com perfis e permissões integradas ao ERP central.",
    ],
    metrics: [
      { label: "Plataforma", value: "iOS & Android (Expo)" },
      { label: "Operação", value: "Offline-First & Sincronismo" },
    ],
  },
  {
    id: "ac3-flex",
    name: "AC3 Flex",
    href: undefined,
    githubUrl: undefined,
    liveUrl: undefined,
    isProprietary: true,
    accessBadge: "Sincronização & Microsserviços",
    domain: "autocom3.com.br/flex",
    type: "erp",
    category: "Sincronização & Microsserviços",
    image: "/ac3-flex.png",
    videoUrl: undefined,
    flagship: false,
    group: "modules",
    shortDescription:
      "Módulo de integração e sincronização bidirecional entre ERP de retaguarda e ecossistemas web corporativos com arquitetura orientada a eventos.",
    stack: ["Node.js", "TypeScript", "NestJS", "AWS", "PostgreSQL", "Docker"],
    features: [
      "Camada de abstração e sincronização bidirecional entre bases de retaguarda e portais corporativos modernos.",
      "Arquitetura baseada em eventos com mensageria para operações assíncronas de alto volume.",
      "Monitoramento contínuo de conectividade e alta disponibilidade para operações diárias.",
    ],
    metrics: [
      { label: "Infra", value: "AWS & Docker" },
      { label: "Arquitetura", value: "Event-Driven & Cache" },
    ],
  },
  {
    id: "propostas-ac3",
    name: "Gestão de Propostas",
    href: undefined,
    githubUrl: undefined,
    liveUrl: undefined,
    isProprietary: true,
    accessBadge: "Automação Comercial",
    domain: "autocom3.com.br/propostas",
    type: "saas",
    category: "Automação Comercial & Faturamento",
    image: "/propostas-ac3.png",
    videoUrl: undefined,
    flagship: false,
    group: "modules",
    shortDescription:
      "Módulo inteligente de geração, precificação dinâmica e assinatura digital de orçamentos e propostas comerciais integradas ao faturamento.",
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
    features: [
      "Geração instantânea de propostas em PDF com tabelas de preço dinâmicas por perfil de cliente.",
      "Rastreamento em tempo real de visualização e assinatura da proposta comercial.",
      "Integração direta com o módulo de contratos do ERP Autocom3.",
    ],
    metrics: [
      { label: "Conversão", value: "Agilidade Comercial" },
      { label: "Documentos", value: "PDF & Assinatura" },
    ],
  },
  {
    id: "portal-admin",
    name: "Admin (Portal Admin & RBAC)",
    href: undefined,
    githubUrl: undefined,
    liveUrl: undefined,
    isProprietary: true,
    accessBadge: "Painel Restrito Administrativo",
    domain: "autocom3.com.br/admin",
    type: "internal",
    category: "Segurança & Multi-Tenant",
    image: "/portal-admin.png",
    videoUrl: undefined,
    flagship: false,
    group: "modules",
    shortDescription:
      "Painel administrativo central com gestão de tenants, auditoria de acessos, faturamento e controle de permissões corporativas.",
    stack: ["React", "TypeScript", "Node.js", "NestJS", "PostgreSQL", "Radix UI"],
    features: [
      "Gestão centralizada de clientes corporativos com controle granular de permissões e perfis de acesso.",
      "Dashboard executivo com métricas de uso em tempo real e monitoramento de contratos ativos.",
      "Logs de auditoria e trilhas de conformidade com segurança de ponta a ponta.",
    ],
    metrics: [
      { label: "Controle", value: "RBAC Granular" },
      { label: "Multi-tenant", value: "20+ Organizações" },
    ],
  },
] as const

export const parallaxProducts = [
  {
    title: "Organon Desktop OS v6.23.2",
    link: "https://github.com/PedroReoli/organon",
    thumbnail: "/Domus.png",
    category: "Desktop & Local-First AI",
    id: "organon-ecosystem",
  },
  {
    title: "Achilles CDP Agent (MCP Server)",
    link: "https://github.com/PedroReoli/Achilles-CDP-Agent",
    thumbnail: "/nexus.png",
    category: "AI Web Automation Engine",
    id: "achilles-cdp-agent",
  },
  {
    title: "Portal Unificado ERP Autocom3",
    link: "https://www.autocom3.com.br/autocom3clientes",
    thumbnail: "/portal-cliente.png",
    category: "Enterprise ERP & 500+ Design System",
    id: "portal-unificado-autocom3",
  },
  {
    title: "Propose SaaS – NoCode Engine",
    link: "https://github.com/PedroReoli",
    thumbnail: "/propose.png",
    category: "B2B SaaS & Dynamic JSON Schemas",
    id: "propose-saas",
  },
  {
    title: "Autocom3 Portal do Contador",
    link: "https://www.autocom3.com.br",
    thumbnail: "/portal-contador.png",
    category: "Accounting & Tax Platform",
    id: "portal-contador",
  },
  {
    title: "Autocom3 Portal Admin & RBAC",
    link: "https://www.autocom3.com.br",
    thumbnail: "/portal-admin.png",
    category: "Multi-Tenant Enterprise Security",
    id: "portal-admin",
  },
  {
    title: "Autocom3 Gestão de Propostas",
    link: "https://www.autocom3.com.br",
    thumbnail: "/propostas-ac3.png",
    category: "Billing & Proposal Automation",
    id: "propostas-ac3",
  },
  {
    title: "AC3 Flex Cloud Architecture",
    link: "https://www.autocom3.com.br",
    thumbnail: "/ac3-flex.png",
    category: "Cloud ERP & Microservices",
    id: "ac3-flex",
  },
] as const

