import type { LocalizedText } from "./contentTypes"

export interface FeaturedProject {
  number: string
  title: string
  category: LocalizedText
  year: string
  description: LocalizedText
  href: string
  external?: boolean
  image?: string
  imageSrcSet?: string
  imageAlt?: LocalizedText
  visual?: "agent"
}

export interface ExperienceItem {
  period: LocalizedText
  company: string
  role: LocalizedText
  description: LocalizedText
  highlights?: {
    pt: string[]
    en: string[]
  }
  technologies?: string[]
}

export const featuredProjects: FeaturedProject[] = [
  {
    number: "01",
    title: "Autocom3",
    category: { pt: "Software corporativo", en: "Enterprise software" },
    year: "2024 / 26",
    description: {
      pt: "Operação comercial, licenças e catálogo reunidos em uma experiência corporativa.",
      en: "Commercial operations, licensing and catalog workflows brought into one enterprise experience.",
    },
    image: "/portfolio-autocom3/01-painel-operacoes-visao-geral.png",
    imageSrcSet:
      "/media/projects/autocom3-operations-720.webp 720w, /media/projects/autocom3-operations-1440.webp 1440w, /media/projects/autocom3-operations-2880.webp 2880w",
    imageAlt: {
      pt: "Interface do painel de operações da Autocom3",
      en: "Autocom3 operations dashboard interface",
    },
    href: "/projetos?tipo=corporativo",
  },
  {
    number: "02",
    title: "Achilles",
    category: { pt: "Agentes & browser", en: "Agents & browser" },
    year: "2026",
    description: {
      pt: "Um agente local que opera navegadores por CDP com ferramentas observáveis e determinísticas.",
      en: "A local agent that operates browsers through CDP with observable, deterministic tools.",
    },
    visual: "agent",
    href: "https://github.com/PedroReoli/Achilles-CDP-Agent",
    external: true,
  },
]

export const experienceItems: ExperienceItem[] = [
  {
    period: { pt: "Out/2025 / Presente", en: "Oct/2025 / Present" },
    company: "Domus | Sua Solução Digital",
    role: {
      pt: "Engenheiro Full Stack (Autônomo / Freelance)",
      en: "Full Stack Engineer (Freelance / Products)",
    },
    description: {
      pt: "Desenvolvimento de produtos digitais, soluções SaaS e plataformas personalizadas de ponta a ponta.",
      en: "End-to-end development of digital products, SaaS solutions, and tailored web platforms.",
    },
    highlights: {
      pt: [
        "Desenvolveu o propose-saas: gerador NoCode de propostas comerciais com editor drag-and-drop e renderização dinâmica JSON.",
        "Ciclo completo de produto: levantamento de requisitos de negócio, arquitetura técnica, frontend, backend, banco de dados e integrações com IA.",
        "Arquitetura escalável com APIs REST, caching, autenticação e banco de dados relacional gerenciado.",
      ],
      en: [
        "Built propose-saas: a NoCode commercial proposal generator with drag-and-drop editor and dynamic JSON rendering.",
        "Complete product lifecycle: business requirements, architecture, frontend, backend, database and AI integrations.",
        "Scalable architecture featuring REST APIs, caching, modern authentication, and managed databases.",
      ],
    },
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express",
      "Fastify",
      "PostgreSQL",
      "Supabase",
      "AI Applied",
    ],
  },
  {
    period: { pt: "Nov/2025 / Presente", en: "Nov/2025 / Present" },
    company: "SIVIS Tecnologia",
    role: {
      pt: "Engenheiro Full Stack (Frontend & Integrações)",
      en: "Full Stack Engineer (Frontend & Integrations)",
    },
    description: {
      pt: "Atuação consultiva com foco em arquitetura frontend, integração de APIs e otimização de interfaces corporativas críticas.",
      en: "Consulting role focused on frontend architecture, enterprise API integrations, and mission-critical UX performance.",
    },
    highlights: {
      pt: [
        "Construção e evolução de módulos corporativos de alta fidelidade em React, Next.js e Angular.",
        "Integrações robustas entre camadas de frontend, gateways corporativos e APIs REST externas.",
        "Reorganização arquitetural e refatoração com foco em usabilidade e performance em produção.",
      ],
      en: [
        "Building and evolving high-fidelity enterprise modules in React, Next.js, and Angular.",
        "Robust integrations between frontend layers, corporate gateways, and external REST APIs.",
        "Architectural reorganization and refactoring focused on production usability and speed.",
      ],
    },
    technologies: [
      "React",
      "Next.js",
      "Angular",
      "TypeScript",
      "REST APIs",
      "Web Performance",
      "Enterprise Systems",
    ],
  },
  {
    period: { pt: "Nov/2024 / Presente", en: "Nov/2024 / Present" },
    company: "Autocom3 Tecnologia",
    role: {
      pt: "Engenheiro de Software Full Stack",
      en: "Full Stack Software Engineer",
    },
    description: {
      pt: "Desenvolvimento e evolução de ecossistema ERP com 100+ páginas, portais corporativos e ferramentas administrativas unificadas.",
      en: "Engineering and evolving a 100+ page ERP ecosystem, corporate portals, and unified administrative tooling.",
    },
    highlights: {
      pt: [
        "Liderança e evolução de Design System escalável com mais de 500 componentes reutilizáveis, reduzindo o tempo de dev em até 70%.",
        "APIs REST em Node.js, NestJS e C#, autenticação JWT, controle de acesso granular RBAC, rate limiting e Webhooks assíncronos orientados a eventos.",
        "Deploy e infraestrutura em nuvem na AWS (API Gateway, Lambda), além de evolução de aplicações desktop de Electron para Tauri.",
        "Otimização de performance com redução de até 40% no tempo de carregamento de páginas ERP.",
      ],
      en: [
        "Lead and evolved scalable Design System with 500+ reusable components, cutting dev cycles by up to 70%.",
        "Engineered REST APIs in Node.js, NestJS, and C# with JWT auth, granular RBAC permissions, rate limiting, and event-driven Webhooks.",
        "Cloud deployments on AWS (API Gateway), and desktop app modernization from Electron to Tauri.",
        "Performance optimization achieving up to 40% faster load times across ERP systems.",
      ],
    },
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "NestJS",
      "Node.js",
      "C# / .NET",
      "PostgreSQL",
      "AWS",
      "Tauri",
      "Design Systems",
    ],
  },
  {
    period: { pt: "Jun/2024 / Dez/2024", en: "Jun/2024 / Dec/2024" },
    company: "UniFOA / SEBRAE (EvaTech)",
    role: {
      pt: "Mentor de Tecnologia & Inteligência Artificial",
      en: "Technology & AI Mentor",
    },
    description: {
      pt: "Mentoria técnica em inovação digital, inteligência artificial e resolução prática de problemas tecnológicos.",
      en: "Technical mentoring in digital innovation, artificial intelligence, and hands-on technological problem solving.",
    },
    highlights: {
      pt: [
        "Capacitou mais de 30 participantes em competências digitais avançadas, ferramentas de IA e desenvolvimento prático.",
        "Conduziu workshops práticos de ideação, prototipação rápida e implementação orientada a produto.",
      ],
      en: [
        "Trained over 30 participants in digital skills, modern AI tooling, and hands-on development.",
        "Led practical workshops on product ideation, rapid prototyping, and software engineering.",
      ],
    },
    technologies: [
      "Inteligência Artificial",
      "Prototipação",
      "Inclusão Digital",
      "Educação Tecnológica",
      "Mentoria",
    ],
  },
  {
    period: { pt: "Ago/2022 / Jun/2024", en: "Aug/2022 / Jun/2024" },
    company: "SIVIS Tecnologia",
    role: {
      pt: "Engenheiro Full Stack Júnior",
      en: "Junior Full Stack Engineer",
    },
    description: {
      pt: "Desenvolvimento e sustentação de sistemas ERP, dashboards e plataformas de gestão para associações, clubes e proteção veicular.",
      en: "Building and maintaining ERP systems, analytics dashboards, and management platforms for associations and enterprises.",
    },
    highlights: {
      pt: [
        "Desenvolveu dashboards operacionais, fluxos financeiros e relatórios analíticos em tempo real.",
        "Integrações com APIs REST e serviços de terceiros (pagamentos, consultas cadastrais, mensageria).",
        "Modelagem e manutenção de bancos de dados relacionais PostgreSQL e MySQL.",
      ],
      en: [
        "Built operational dashboards, financial workflows, and real-time analytical reporting.",
        "Third-party REST API integrations (payment processors, registry services, messaging).",
        "Relational database modeling and querying with PostgreSQL and MySQL.",
      ],
    },
    technologies: ["React", "TypeScript", "C#", "PHP", "PostgreSQL", "MySQL", "REST APIs"],
  },
]
