export interface LocalizedText {
  pt: string
  en: string
}

export interface FeaturedProject {
  number: string
  title: string
  category: LocalizedText
  year: string
  description: LocalizedText
  href: string
  external?: boolean
  image?: string
  imageAlt?: LocalizedText
  visual?: "agent"
}

export interface ExperienceItem {
  period: LocalizedText
  company: string
  role: LocalizedText
  description: LocalizedText
}

export interface ExpertiseItem {
  title: LocalizedText
  description: LocalizedText
}

export const featuredProjects: FeaturedProject[] = [
  {
    number: "01",
    title: "Autocom3",
    category: { pt: "Software corporativo", en: "Enterprise software" },
    year: "2024—26",
    description: {
      pt: "Operação comercial, licenças e catálogo reunidos em uma experiência corporativa.",
      en: "Commercial operations, licensing and catalog workflows brought into one enterprise experience.",
    },
    image: "/portfolio-autocom3/01-painel-operacoes-visao-geral.png",
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
    period: { pt: "2024—Agora", en: "2024—Now" },
    company: "Autocom3 Tecnologia",
    role: { pt: "Engenheiro de Software Full Stack", en: "Full Stack Software Engineer" },
    description: {
      pt: "Evolução de fluxos críticos em um ecossistema corporativo, da interface à arquitetura.",
      en: "Evolving critical flows across interface and architecture in an enterprise ecosystem.",
    },
  },
  {
    period: { pt: "2025—Agora", en: "2025—Now" },
    company: "Domus",
    role: { pt: "Engenheiro Full Stack", en: "Full Stack Engineer" },
    description: {
      pt: "Construção de experiências digitais e serviços orientados a produto.",
      en: "Building product-led digital experiences and services.",
    },
  },
  {
    period: { pt: "2022—2025", en: "2022—2025" },
    company: "SIVIS Tecnologia",
    role: { pt: "Engenheiro de Software", en: "Software Engineer" },
    description: {
      pt: "Desenvolvimento de sistemas web, integrações e bases técnicas para produção.",
      en: "Developing web systems, integrations and technical foundations for production.",
    },
  },
  {
    period: { pt: "2024", en: "2024" },
    company: "UniFOA",
    role: { pt: "Mentor de tecnologia", en: "Technology mentor" },
    description: {
      pt: "Mentoria prática para transformar problemas reais em protótipos digitais.",
      en: "Hands-on mentoring to turn real problems into digital prototypes.",
    },
  },
]

export const expertiseItems: ExpertiseItem[] = [
  {
    title: { pt: "Interfaces", en: "Interfaces" },
    description: {
      pt: "Clareza visual, acessibilidade e interação consistente.",
      en: "Visual clarity, accessibility and consistent interaction.",
    },
  },
  {
    title: { pt: "Back-end", en: "Back-end" },
    description: {
      pt: "APIs, integrações e dados preparados para escala real.",
      en: "APIs, integrations and data foundations ready for real scale.",
    },
  },
  {
    title: { pt: "Agentes de IA", en: "AI agents" },
    description: {
      pt: "Automação observável conectada às ferramentas certas.",
      en: "Observable automation connected to the right tools.",
    },
  },
  {
    title: { pt: "Sistemas", en: "Systems" },
    description: {
      pt: "Arquitetura que transforma complexidade em fluxo.",
      en: "Architecture that turns complexity into flow.",
    },
  },
]
