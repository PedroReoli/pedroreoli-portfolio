import type { LocalizedText } from "./homeContent"

export interface MediaNote {
  number: string
  category: LocalizedText
  title: LocalizedText
  description: LocalizedText
  href: string
}

export const mediaNotes: MediaNote[] = [
  {
    number: "01",
    category: { pt: "Agentes locais", en: "Local agents" },
    title: {
      pt: "Agentes que operam, não só respondem",
      en: "Agents that operate, not only respond",
    },
    description: {
      pt: "Decisões por trás de uma automação de navegador observável e determinística.",
      en: "Decisions behind observable, deterministic browser automation.",
    },
    href: "https://github.com/PedroReoli/Achilles-CDP-Agent",
  },
  {
    number: "02",
    category: { pt: "Produto local-first", en: "Local-first product" },
    title: {
      pt: "Privacidade como escolha de arquitetura",
      en: "Privacy as an architecture choice",
    },
    description: {
      pt: "O que muda quando dados, planejamento e contexto continuam sob controle do usuário.",
      en: "What changes when data, planning and context remain under user control.",
    },
    href: "https://github.com/PedroReoli/organon",
  },
  {
    number: "03",
    category: { pt: "Código aberto", en: "Open source" },
    title: {
      pt: "Projetos como laboratório público",
      en: "Projects as a public laboratory",
    },
    description: {
      pt: "Experimentos, ferramentas e decisões técnicas disponíveis para inspeção.",
      en: "Experiments, tools and technical decisions available for inspection.",
    },
    href: "https://github.com/PedroReoli",
  },
]
