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
  imageSrcSet?: string
  imageAlt?: LocalizedText
  visual?: "agent"
}

export interface ExperienceItem {
  period: LocalizedText
  company: string
  role: LocalizedText
  description: LocalizedText
}

export interface WorkingPrinciple {
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
    period: { pt: "2024—Agora", en: "2024—Now" },
    company: "Autocom3 Tecnologia",
    role: {
      pt: "Engenheiro de Software Full Stack",
      en: "Full Stack Software Engineer",
    },
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

export const workingPrinciples: WorkingPrinciple[] = [
  {
    title: { pt: "Contexto", en: "Context" },
    description: {
      pt: "Entender a operação, o risco e o que realmente precisa mudar.",
      en: "Understand the operation, the risk and what truly needs to change.",
    },
  },
  {
    title: { pt: "Decisão", en: "Decision" },
    description: {
      pt: "Escolher a solução mais simples que sustenta o próximo passo.",
      en: "Choose the simplest solution that can support the next step.",
    },
  },
  {
    title: { pt: "Produção", en: "Production" },
    description: {
      pt: "Entregar com qualidade, observabilidade e documentação útil.",
      en: "Ship with quality, observability and useful documentation.",
    },
  },
  {
    title: { pt: "Evolução", en: "Evolution" },
    description: {
      pt: "Medir, aprender e melhorar sem recomeçar do zero.",
      en: "Measure, learn and improve without starting over.",
    },
  },
]
