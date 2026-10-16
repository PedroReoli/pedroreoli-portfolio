export const profile = {
  name: "Pedro Lucas Reis",
  role: "Full Stack Software Engineer",
  tagline: "Frontend Architecture • APIs REST • Cloud & AWS • AI Engineering",
  email: "pedrosousa2160@gmail.com",
  phoneLabel: "+55 24 99326-4040",
  phoneHref: "https://wa.me/5524993264040",
  location: "Volta Redonda, RJ - Brazil | Remote or Hybrid",
  website: "https://pedroreis.vercel.app/",
  linkedin: "https://www.linkedin.com/in/pedro-lucas-reis-a93945171/",
  github: "https://github.com/PedroReoli",
  summary: [
    "Full Stack Software Engineer with ~4 years of hands-on experience architecting and delivering enterprise ERP ecosystems, multi-tenant SaaS platforms, and high-performance desktop applications.",
    "Specialized in TypeScript, React, Next.js, Node.js, NestJS, and PostgreSQL, with proven mastery in scalable Design Systems (500+ reusable components, -70% dev cycle), Core Web Vitals optimization (-40% latency, Lighthouse ~100), and AI engineering via MCP servers and Local-First architecture.",
  ],
} as const

export const blogPosts = [] as const

export const projectsLabels = {
  kicker: "Selected Projects",
  title1: "TECHNICAL",
  title2: "PROJECTS",
  details: "Details",
  visit: "Visit project",
  stack: "Technologies",
  features: "Key deliverables",
  metrics: "Metrics",
  close: "Close",
  all: "All",
  types: {
    site: "Web",
    erp: "ERP",
    saas: "SaaS",
    mobile: "Mobile",
    internal: "Internal",
    ai: "AI / Automation",
  },
} as const

export const highlights = [
  {
    label: "Experience",
    value: "4+",
    suffix: "years",
    description: "SaaS, enterprise ERPs, cloud platforms, and applied AI",
  },
  {
    label: "Products",
    value: "10+",
    suffix: "in production",
    description: "High-impact production solutions operating daily",
  },
  {
    label: "Design System",
    value: "500+",
    suffix: "components",
    description: "Reusable component library reducing dev time by 70%",
  },
] as const

export const metricsData = [
  {
    id: "components",
    label: "Reusable Components",
    value: "500+",
    sub: "Unified Enterprise Design System",
    color: "from-[#1d68f2] to-[#00d4ff]",
    borderColor: "rgba(29, 104, 242, 0.4)",
    highlight: "-70% time to build new screens and modules",
  },
  {
    id: "dev-reduction",
    label: "Dev Cycle Reduction",
    value: "-70%",
    sub: "Engineering Velocity & Standardization",
    color: "from-[#10b981] to-[#34d399]",
    borderColor: "rgba(16, 185, 129, 0.4)",
    highlight: "Standardized tokens, reusable hooks, and modular UI",
  },
  {
    id: "products",
    label: "Products in Production",
    value: "10+",
    sub: "SaaS, ERPs, and B2B Tools",
    color: "from-[#f59e0b] to-[#fbbf24]",
    borderColor: "rgba(245, 158, 11, 0.4)",
    highlight: "Enterprise platforms actively used every day",
  },
  {
    id: "erp-pages",
    label: "ERP Pages & Modules",
    value: "100+",
    sub: "Web Enterprise Ecosystem",
    color: "from-[#1d68f2] to-[#60a5fa]",
    borderColor: "rgba(29, 104, 242, 0.4)",
    highlight: "RBAC authentication, analytics dashboards, and billing",
  },
  {
    id: "token-economy",
    label: "AI Token Savings",
    value: "92.2%",
    sub: "Achilles CDP Agent (AXTree Engine)",
    color: "from-[#8b5cf6] to-[#c084fc]",
    borderColor: "rgba(139, 92, 246, 0.4)",
    highlight: "Reduced from 80k to <2k context tokens per page",
  },
  {
    id: "lighthouse",
    label: "Lighthouse Score",
    value: "100",
    sub: "Performance, SEO, A11y & Best Practices",
    color: "from-[#10b981] to-[#06b6d4]",
    borderColor: "rgba(16, 185, 129, 0.4)",
    highlight: "Optimized web apps with top-tier Core Web Vitals",
  },
  {
    id: "organizations",
    label: "Organizations Served",
    value: "20+",
    sub: "Active Companies on the Platform",
    color: "from-[#00d4ff] to-[#38bdf8]",
    borderColor: "rgba(0, 212, 255, 0.4)",
    highlight: "Multi-tenant financial, billing, and ops management",
  },
  {
    id: "mentees",
    label: "Students & Mentees",
    value: "30+",
    sub: "Digital Upskilling & Applied AI",
    color: "from-[#ec4899] to-[#f43f5e]",
    borderColor: "rgba(236, 72, 153, 0.4)",
    highlight: "Tech & AI training programs (EvaTech / Sebrae)",
  },
] as const

export const skills = [
  {
    category: "Frontend Architecture",
    items: [
      { name: "React & Next.js", icon: "SiReact", usage: "App Router, SSR, SSG, Server Actions, selective hydration, and high-scale UI." },
      { name: "TypeScript", icon: "SiTypescript", usage: "Strict typing for domain contracts, UI components, and API integrations." },
      { name: "Design Systems", icon: "FiLayers", usage: "500+ accessible components with Tailwind CSS, Radix UI, and semantic design tokens." },
      { name: "Tailwind CSS & Styling", icon: "SiTailwindcss", usage: "Design tokens, fluid responsiveness, micro-interactions, and dark mode." },
      { name: "HTML5 & Core Web Vitals", icon: "FiZap", usage: "Semantic structure, technical SEO, Lighthouse 100, and fast rendering." },
      { name: "React Query & Zustand", icon: "SiReactquery", usage: "Server state caching, optimistic UI updates, and synchronization." },
    ],
  },
  {
    category: "Backend & APIs",
    items: [
      { name: "Node.js & NestJS", icon: "SiNodedotjs", usage: "Enterprise REST APIs, layered architecture, Clean Architecture, and microservices." },
      { name: "Fastify & Express", icon: "SiExpress", usage: "Low-latency HTTP services, secure middleware, and JWT authentication." },
      { name: "Authentication & RBAC", icon: "FiShield", usage: "Granular access control, secure sessions, rate limiting, and multi-tenancy." },
      { name: "Webhooks & Event-Driven", icon: "SiOpenapiinitiative", usage: "Event pipelines, async messaging, and cross-system integrations." },
      { name: "GraphQL & REST", icon: "FiCode", usage: "Standardized contract modeling for scalable data exchange." },
      { name: "C# & .NET", icon: "SiDotnet", usage: "Sustaining and connecting services with legacy enterprise backends." },
    ],
  },
  {
    category: "Databases & Cloud",
    items: [
      { name: "PostgreSQL", icon: "SiPostgresql", usage: "Relational modeling, migrations, indexing, query optimization, and procedures." },
      { name: "Supabase & SQLite", icon: "SiSupabase", usage: "Local offline-first persistence (SQLite) and serverless cloud infrastructure." },
      { name: "SQL Server & MySQL", icon: "FiDatabase", usage: "Transactional ERP databases and business analytics reporting." },
      { name: "AWS & Docker", icon: "FiCloud", usage: "Lambda, API Gateway, S3 Storage, containerization, and continuous deployment." },
      { name: "Git & CI/CD", icon: "SiGithub", usage: "Repository governance, automated testing, and continuous delivery." },
      { name: "Web Scraping & Puppeteer", icon: "SiPuppeteer", usage: "Browser automation, resilient data extraction, and scheduled pipelines." },
    ],
  },
  {
    category: "Desktop, Automation & AI",
    items: [
      { name: "Electron & Tauri", icon: "SiTauri", usage: "Industrial-grade desktop software with total data sovereignty (Organon v6.23.2)." },
      { name: "Achilles CDP Agent", icon: "FiCpu", usage: "Autonomous AI web agent using Chrome DevTools Protocol, AXTree, and native MCP." },
      { name: "Model Context Protocol", icon: "FiCode", usage: "Native stdio MCP servers for Claude Code, Cursor, and autonomous agent loops." },
      { name: "Whisper AI & LLMs", icon: "SiOpenai", usage: "Smart offline audio transcription and integrated natural language processing." },
      { name: "Playwright & CDP", icon: "SiPuppeteer", usage: "Browser observation and automation with semantic Reader Mode and token savings." },
      { name: "Local-First Architecture", icon: "FiLayers", usage: "Resilient systems with zero network latency, data ownership, and ACID guarantees." },
    ],
  },
] as const

export const experiences = [
  {
    company: "Autocom3 Technology",
    role: "Full Stack Software Engineer",
    context: "Architecture and evolution of the ERP ecosystem, unified corporate portals, and backend services used by 20+ organizations.",
    period: "Nov/2024 - Present",
    location: "Volta Redonda, RJ - Brazil | Remote / Hybrid",
    stack: ["TypeScript", "React", "Next.js", "Node.js", "NestJS", "PostgreSQL", "AWS", "Tauri", "Tailwind CSS", "Design Systems"],
    achievements: [
      "Architected and led the corporate Design System with 500+ reusable items, standardizing interfaces and speeding up new module delivery by 70%.",
      "Engineered REST APIs and backend services in Node.js and NestJS with JWT authentication, granular RBAC, rate limiting, and async Webhooks.",
      "Optimized the rendering pipeline and page load of dense ERP interfaces, reducing perceived latency by up to 40% across 20+ active organizations.",
      "Collaborated on AWS cloud infrastructure and the strategic transition of desktop tools from Electron to Tauri.",
    ],
  },
  {
    company: "Domus - Digital Solutions",
    role: "Full Stack Engineer & Tech Lead",
    context: "End-to-end software engineering of custom digital products, B2B SaaS platforms, analytics dashboards, and AI agents.",
    period: "Oct/2025 - Present",
    location: "Remote",
    stack: ["TypeScript", "React", "Next.js", "Node.js", "Fastify", "PostgreSQL", "Supabase", "REST APIs", "Applied AI", "MCP"],
    achievements: [
      "Led the full software lifecycle from discovery and relational data modeling to high-performance responsive frontend and deployment.",
      "Conceived and developed the Organon Ecosystem (v6.23.2), a local-first platform with 19 screens, TipTap rich text, Excalidraw, and Whisper AI.",
      "Engineered the autonomous Achilles CDP Agent with integrated MCP server, achieving 92.2% context token savings via AXTree semantic trees.",
      "Built Propose SaaS, a NoCode proposal engine with a drag-and-drop editor and dynamic JSON schema-driven rendering.",
    ],
  },
  {
    company: "SIVIS Technology",
    role: "Software Engineer (Full Stack & Integrations)",
    context: "Development of management modules, analytical dashboards, and mission-critical integrations for vehicle protection associations.",
    period: "Aug/2022 - Jun/2024 & Nov/2025 - Present",
    location: "Volta Redonda, RJ - Brazil | Remote",
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "MySQL", "REST APIs", "Git", "PHP"],
    achievements: [
      "Engineered 30+ production web interfaces (React, TypeScript) and 20+ REST API endpoints (Node.js, PHP, C#) for operational core workflows.",
      "Implemented financial billing, member management, and automated invoicing routines ensuring data integrity across PostgreSQL and MySQL.",
      "Built resilient integration connectors for payment gateways, bank slips (boletos), and external messaging platforms.",
      "Refactored legacy codebases into componentized architectures, enhancing maintainability and slashing API response times by 35%.",
    ],
  },
  {
    company: "UniFOA / EvaTech (SEBRAE)",
    role: "Technology & AI Mentor",
    context: "Technical training and digital inclusion program partnered with SEBRAE to upskill professionals in software and applied AI.",
    period: "Jun/2024 - Dec/2024",
    location: "Volta Redonda, RJ - Brazil",
    stack: ["JavaScript", "TypeScript", "React", "Prompt Engineering", "AI Productivity Tools", "Technical Mentorship"],
    achievements: [
      "Mentored and upskilled 30+ professionals in digital capabilities, modern web development, and productive AI workflows.",
      "Designed practical learning paths and delivered hands-on workshops covering TypeScript, React, and LLM automation.",
      "Actively contributed to regional tech empowerment and digital inclusion initiatives alongside SEBRAE Regional.",
    ],
  },
] as const

export const education = {
  degree: "Bachelor of Science in Information Systems",
  institution: "Centro Universitário de Volta Redonda (UniFOA)",
  period: "2022 - 2025",
  status: "Completed",
  highlights: [
    "Core focus on Software Engineering, Data Structures, Relational Databases, and Information Security.",
    "Active participation in academic outreach programs and tech mentorship in partnership with SEBRAE.",
  ],
} as const

export const educationList = [
  {
    degree: "Bachelor of Science in Information Systems",
    institution: "Centro Universitário de Volta Redonda (UniFOA)",
    period: "2022 - 2025",
    status: "Completed",
    details: [
      "Core focus on Software Engineering, Systems Architecture, Relational Databases, and Information Security.",
      "Active participation in academic outreach programs and applied software research.",
    ],
  },
  {
    degree: "Frontend Engineering & UI/UX Specialization (200h)",
    institution: "Origamid",
    period: "2026",
    status: "Completed",
    details: [
      "In-depth mastery of React ecosystems, unified Design Systems, WCAG Accessibility, and Core Web Vitals.",
      "Modern UI architecture, high-performance web animations, and strict TypeScript domain modeling.",
    ],
  },
] as const

export const languages = [
  { 
    name: "Portuguese", 
    level: "Native", 
    info: "Executive communication, engineering leadership, facilitation, and formal software documentation." 
  },
  { 
    name: "English", 
    level: "Working Proficiency (B2)", 
    info: "Fluent technical reading, architectural documentation writing, and professional speaking." 
  },
] as const

export const academicLeadership = [
  {
    title: "Tech Mentorship & Applied AI",
    organization: "EvaTech / SEBRAE & UniFOA",
    period: "Jun/2024 - Dec/2024",
    info: "Hands-on mentorship and technical training for 30+ participants in TypeScript, React, and LLM automation.",
  },
] as const

export const projects = [
  // =========================================================================
  // TIER 1: FLAGSHIP SYSTEMS / CORE PLATFORMS (3 ACTIVE)
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
    category: "Flagship • Business OS & AI",
    image: "/Domus.png",
    flagship: true,
    group: "flagship",
    shortDescription:
      "Local-first productivity hub with 19 operational screens, TipTap rich text, Excalidraw infinite canvas, Whisper AI smart offline transcription, and MCP server.",
    stack: ["Electron", "React 18", "TypeScript", "Vite", "TipTap", "Excalidraw", "Radix UI", "Whisper AI", "Fastify", "SQLite", "MCP Protocol"],
    features: [
      "AI-Friendly environment with an integrated MCP server for autonomous execution with Claude Code and Cursor.",
      "100% Local-First architecture featuring zero network latency and ACID transactional guarantees in SQLite.",
      "Structured rich-text editor powered by TipTap integrated with an infinite whiteboard canvas powered by Excalidraw.",
      "Local audio intelligence engine using Whisper AI for automated offline meeting notes and action items.",
    ],
    metrics: [
      { label: "Architecture", value: "100% Local-First + ACID" },
      { label: "AI Integration", value: "Integrated Native MCP Server" },
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
    category: "AI Engineering & Automation",
    image: "/nexus.png",
    flagship: true,
    group: "flagship",
    shortDescription:
      "Autonomous browser automation and observation engine for AI agents via CDP and AXTree semantics, with 92.2% token savings and native MCP server.",
    stack: ["Python", "Playwright", "CDP", "AXTree", "MCP Protocol", "FastAPI", "Asyncio", "Pydantic v2"],
    features: [
      "Semantic Reader Mode via AXTree shrinking massive 80k DOM trees down to <2k context tokens per interaction.",
      "Native stdio MCP server for direct bridge to Claude Code and autonomous multi-agent environments.",
      "Robust bot mitigation bypass with assisted 2FA/CAPTCHA workflows and persistent session state.",
      "Automatic redaction and sanitization of secrets, tokens, and credentials before forwarding to LLMs.",
    ],
    metrics: [
      { label: "Token Savings", value: "92.2% (AXTree Reader Mode)" },
      { label: "Protocol", value: "Native stdio MCP Server" },
    ],
  },
  // =========================================================================
  // TIER 2: FREELANCE PROJECTS (SITES & FRONTEND WITH MINIMAL BACKEND)
  // =========================================================================
  {
    id: "fala-atipica",
    name: "Fala Atípica – Tríade",
    href: "https://github.com/PedroReoli/FalaAtipica-Triade",
    githubUrl: "https://github.com/PedroReoli/FalaAtipica-Triade",
    liveUrl: undefined,
    isProprietary: false,
    accessBadge: "Frontend & Accessibility",
    domain: "falaatipica.com.br",
    type: "site",
    category: "Institutional Platform & Welcoming",
    image: "/Domus.png",
    flagship: false,
    group: "freelance",
    shortDescription:
      "Inclusive institutional web portal and supportive hub for autistic individuals and atypical families, developed with WCAG accessibility guidelines and lightweight architecture.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Vite", "Accessibility (a11y)", "REST API"],
    features: [
      "Accessible responsive interface with thoughtful high-contrast theme honoring neurodiversity guidelines.",
      "Real-time validated contact and screening forms connected to multidisciplinary coordinators.",
      "Modular frontend codebase optimized for fast mobile rendering.",
    ],
    metrics: [
      { label: "Accessibility", value: "WCAG & Inclusion" },
      { label: "Architecture", value: "Frontend + Minimal Backend" },
    ],
  },
  {
    id: "geoambiental-vr",
    name: "GeoAmbiental VR – Interactive Map",
    href: "https://github.com/PedroReoli/GeoAmbiental-VR-Mapa-Ambiental-de-Volta-Redonda",
    githubUrl: "https://github.com/PedroReoli/GeoAmbiental-VR-Mapa-Ambiental-de-Volta-Redonda",
    liveUrl: undefined,
    isProprietary: false,
    accessBadge: "Web GIS & Geo Data",
    domain: "geoambientalvr.com.br",
    type: "site",
    category: "GIS & Environmental Analytics",
    image: "/nexus.png",
    flagship: false,
    group: "freelance",
    shortDescription:
      "Interactive portal and environmental map of Volta Redonda rendering geospatial layers, ecological indicators, and conservation zones fluidly in-browser.",
    stack: ["React", "TypeScript", "Maps API", "Tailwind CSS", "GeoJSON", "Vite"],
    features: [
      "Dynamic rendering of geospatial layers and environmental points of interest with smooth vector paths.",
      "Interactive data filtering across river basins, buffer zones, and ecological metrics.",
      "Georeferenced data consumption with local caching for seamless responsiveness over mobile networks.",
    ],
    metrics: [
      { label: "Domain", value: "GIS & Environment" },
      { label: "Visualization", value: "Interactive Vector Maps" },
    ],
  },

  // =========================================================================
  // TIER 3: CORPORATE PROJECTS (AUTOCOM3)
  // 1. Accountant Portal, 2. Client Portal, 3. Mobile, 4. AC3 Flex, 5. Proposals, 6. Admin
  // =========================================================================
  {
    id: "portal-contador",
    name: "Accountant Portal (Portal do Contador)",
    href: undefined,
    githubUrl: undefined,
    liveUrl: undefined,
    isProprietary: true,
    accessBadge: "Tax & Accounting Module",
    domain: "autocom3.com.br/contador",
    type: "erp",
    category: "Tax & Accounting Platform",
    image: "/portal-contador.png",
    videoUrl: undefined,
    flagship: false,
    group: "modules",
    shortDescription:
      "Integrated accounting portal for automated XML exports, SPED fiscal compliance, and corporate financial reconciliation for partner accounting firms.",
    stack: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
    features: [
      "Tax reconciliation and batch invoice export module for corporate accountants.",
      "Isolated RBAC authentication per accounting firm and connected client enterprises.",
      "Faster month-end tax filing and reduced closing cycle time.",
    ],
    metrics: [
      { label: "Segment", value: "Tax & Accounting" },
      { label: "Integration", value: "SPED / XML / ERP" },
    ],
  },
  {
    id: "portal-cliente",
    name: "Client Portal (Portal do Cliente)",
    href: "https://www.autocom3.com.br/autocom3clientes",
    githubUrl: undefined,
    liveUrl: "https://www.autocom3.com.br/autocom3clientes",
    isProprietary: true,
    accessBadge: "Corporate Web Portal",
    domain: "autocom3.com.br/clients",
    type: "erp",
    category: "Self-Service & ERP Hub",
    image: "/portal-cliente.png",
    videoUrl: undefined,
    flagship: false,
    group: "modules",
    shortDescription:
      "Enterprise ERP self-service hub spanning 100+ screens across 20+ active organizations, unifying billing, support, and order dispatching.",
    stack: ["React", "Next.js", "TypeScript", "Node.js", "NestJS", "PostgreSQL", "AWS", "Tailwind CSS"],
    features: [
      "Unified enterprise portal with self-service, financial management, accounting, and operations modules.",
      "Proprietary 500+ component Design System that cut screen creation cycles by up to 70%.",
      "Query and rendering optimizations delivering a 40% reduction in critical page load times.",
      "JWT authentication, granular RBAC access controls, and secure asynchronous Webhook integrations.",
    ],
    metrics: [
      { label: "Scale", value: "100+ Screens • 20+ Orgs" },
      { label: "Design System", value: "500+ Components (-70%)" },
    ],
  },
  {
    id: "autocom3-mobile",
    name: "Mobile (Autocom3 Mobile App)",
    href: undefined,
    githubUrl: undefined,
    liveUrl: undefined,
    isProprietary: true,
    accessBadge: "Enterprise Mobile App",
    domain: "autocom3.com.br/mobile",
    type: "mobile",
    category: "Mobile & Field Sales",
    image: "/autocom3.png",
    videoUrl: undefined,
    flagship: false,
    group: "modules",
    shortDescription:
      "Enterprise mobile application integrated with the Autocom3 ERP ecosystem for field sales representatives, real-time inventory queries, and orders.",
    stack: ["React Native", "Expo", "TypeScript", "REST APIs", "Zustand", "Offline Sync"],
    features: [
      "Instant catalog lookup, real-time price tiers, and inventory checks for field sales representatives.",
      "High-velocity pre-order generation with offline queueing and automatic sync upon connection.",
      "Enterprise authentication with permission levels synced to ERP branch and operator roles.",
    ],
    metrics: [
      { label: "Platform", value: "iOS & Android (Expo)" },
      { label: "Operation", value: "Offline-First & Auto Sync" },
    ],
  },
  {
    id: "ac3-flex",
    name: "AC3 Flex",
    href: undefined,
    githubUrl: undefined,
    liveUrl: undefined,
    isProprietary: true,
    accessBadge: "Synchronization & Microservices",
    domain: "autocom3.com.br/flex",
    type: "erp",
    category: "Synchronization & Microservices",
    image: "/ac3-flex.png",
    videoUrl: undefined,
    flagship: false,
    group: "modules",
    shortDescription:
      "Enterprise data synchronization and messaging layer connecting on-premise ERP databases with modern cloud-based web portals.",
    stack: ["Node.js", "TypeScript", "NestJS", "AWS", "PostgreSQL", "Docker"],
    features: [
      "Bidirectional abstraction and sync bridge between legacy database engines and cloud web portals.",
      "Event-driven architecture with message queues for high-throughput asynchronous operations.",
      "Continuous connectivity monitoring, distributed caching, and 99.9% service uptime.",
    ],
    metrics: [
      { label: "Infra", value: "AWS & Docker" },
      { label: "Architecture", value: "Event-Driven & Cache" },
    ],
  },
  {
    id: "propostas-ac3",
    name: "Commercial Proposal Engine",
    href: undefined,
    githubUrl: undefined,
    liveUrl: undefined,
    isProprietary: true,
    accessBadge: "Commercial Automation",
    domain: "autocom3.com.br/propostas",
    type: "saas",
    category: "Billing & Proposal Automation",
    image: "/propostas-ac3.png",
    videoUrl: undefined,
    flagship: false,
    group: "modules",
    shortDescription:
      "Dynamic commercial proposal and quote generator with pricing matrix rules, contract templates, and digital workflows.",
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
    features: [
      "Instant PDF proposal generation with dynamic pricing tables based on customer tiering.",
      "Real-time tracking of proposal viewing and digital signature status.",
      "Direct automated bridge to the Autocom3 ERP contract management module.",
    ],
    metrics: [
      { label: "Conversion", value: "Sales Velocity" },
      { label: "Output", value: "PDF & Digital Sign" },
    ],
  },
  {
    id: "portal-admin",
    name: "Admin (Admin Console & RBAC)",
    href: undefined,
    githubUrl: undefined,
    liveUrl: undefined,
    isProprietary: true,
    accessBadge: "Restricted Admin Console",
    domain: "autocom3.com.br/admin",
    type: "internal",
    category: "Security & Multi-Tenant",
    image: "/portal-admin.png",
    videoUrl: undefined,
    flagship: false,
    group: "modules",
    shortDescription:
      "Centralized administrative console with tenant management, access auditing, billing metrics, and role-based access control.",
    stack: ["React", "TypeScript", "Node.js", "NestJS", "PostgreSQL", "Radix UI"],
    features: [
      "Centralized client enterprise management with granular permission schemes and access control.",
      "Executive real-time usage dashboard and active contract lifecycle monitoring.",
      "Comprehensive audit logs and compliance trails with end-to-end security.",
    ],
    metrics: [
      { label: "Control", value: "Granular RBAC" },
      { label: "Multi-tenant", value: "20+ Organizations" },
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
    title: "Autocom3 Unified Client Portal",
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
    title: "Autocom3 Accountant Portal",
    link: "https://www.autocom3.com.br",
    thumbnail: "/portal-contador.png",
    category: "Accounting & Tax Platform",
    id: "portal-contador",
  },
  {
    title: "Autocom3 Admin Portal & RBAC",
    link: "https://www.autocom3.com.br",
    thumbnail: "/portal-admin.png",
    category: "Multi-Tenant Enterprise Security",
    id: "portal-admin",
  },
  {
    title: "Autocom3 Commercial Proposal Engine",
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
