import type { LocalizedText } from "./homeContent"

export interface ProjectImage {
  src: string
  srcSet: string
  alt: LocalizedText
  wide?: boolean
}

export interface IndependentProject {
  number: string
  title: string
  category: LocalizedText
  description: LocalizedText
  href: string
}

export const corporateProjectImages: ProjectImage[] = [
  {
    src: "/portfolio-autocom3/01-painel-operacoes-visao-geral.png",
    srcSet:
      "/media/projects/autocom3-operations-720.webp 720w, /media/projects/autocom3-operations-1440.webp 1440w, /media/projects/autocom3-operations-2880.webp 2880w",
    alt: { pt: "Painel central de operações", en: "Operations command center" },
    wide: true,
  },
  {
    src: "/portfolio-autocom3/01-propostas-comerciais-listagem.png",
    srcSet:
      "/media/projects/autocom3-proposals-720.webp 720w, /media/projects/autocom3-proposals-1440.webp 1440w, /media/projects/autocom3-proposals-2880.webp 2880w",
    alt: {
      pt: "Gestão de propostas comerciais",
      en: "Commercial proposal management",
    },
  },
  {
    src: "/portfolio-autocom3/01-licencas-sgsh-painel-central.png",
    srcSet:
      "/media/projects/autocom3-licenses-720.webp 720w, /media/projects/autocom3-licenses-1440.webp 1440w, /media/projects/autocom3-licenses-2880.webp 2880w",
    alt: { pt: "Ciclo de vida de licenças", en: "License lifecycle" },
  },
  {
    src: "/portfolio-autocom3/01-catalogo-skus-tabela.png",
    srcSet:
      "/media/projects/autocom3-catalog-720.webp 720w, /media/projects/autocom3-catalog-1440.webp 1440w, /media/projects/autocom3-catalog-2880.webp 2880w",
    alt: { pt: "Catálogo corporativo de SKUs", en: "Enterprise SKU catalog" },
    wide: true,
  },
]

export const independentProjects: IndependentProject[] = [
  {
    number: "01",
    title: "Achilles CDP Agent",
    category: { pt: "Agentes & browser", en: "Agents & browser" },
    description: {
      pt: "Operação local de navegadores com CDP e ferramentas determinísticas.",
      en: "Local browser operation through CDP and deterministic tools.",
    },
    href: "https://github.com/PedroReoli/Achilles-CDP-Agent",
  },
  {
    number: "02",
    title: "Organon",
    category: { pt: "Conhecimento local-first", en: "Local-first knowledge" },
    description: {
      pt: "Planejamento e conhecimento conectados em um ambiente privado.",
      en: "Planning and knowledge connected in a private environment.",
    },
    href: "https://github.com/PedroReoli/organon",
  },
  {
    number: "03",
    title: "GeoAmbiental VR",
    category: { pt: "Computação espacial", en: "Spatial computing" },
    description: {
      pt: "Experiência imersiva para leitura e exploração ambiental.",
      en: "An immersive experience for environmental exploration.",
    },
    href: "https://github.com/PedroReoli/GeoAmbientalVR",
  },
]
