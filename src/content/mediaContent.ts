import type { LocalizedText } from "./contentTypes"

export interface MediaNote {
  number: string
  category: LocalizedText
  title: LocalizedText
  description: LocalizedText
  destination: LocalizedText
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
      pt: "Código e documentação do Achilles: automação de navegador com ferramentas observáveis.",
      en: "Achilles code and documentation: browser automation with observable tools.",
    },
    destination: { pt: "Repositório no GitHub", en: "GitHub repository" },
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
      pt: "Explore no código do Organon a organização de dados e o funcionamento local-first.",
      en: "Explore data organization and local-first behavior in the Organon codebase.",
    },
    destination: { pt: "Repositório no GitHub", en: "GitHub repository" },
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
      pt: "Meu perfil no GitHub reúne os repositórios públicos e os experimentos em andamento.",
      en: "My GitHub profile brings together public repositories and ongoing experiments.",
    },
    destination: { pt: "Perfil no GitHub", en: "GitHub profile" },
    href: "https://github.com/PedroReoli",
  },
]
