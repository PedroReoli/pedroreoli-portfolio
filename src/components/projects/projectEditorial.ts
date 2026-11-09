import type { Language } from '@/types/content'

export type ProjectCategory = 'corporativo' | 'gerais'

type Localized = Record<Language, string>

export interface EditorialCase {
  id: string
  category: ProjectCategory
  name: string
  type: Localized
  introduction: Localized
  contextLabel: Localized
  context: Localized
  approachLabel: Localized
  approach: Localized
  diagramLabel: Localized
  diagram: Localized[]
  evidence?: { href: string; label: Localized }
  note?: Localized
}

// Conteúdo editorial baseado no catálogo existente e nos READMEs públicos.
export const projectCases: EditorialCase[] = [
  {
    id: 'autocom3', category: 'corporativo', name: 'Autocom3',
    type: { pt: 'Software corporativo', en: 'Enterprise software' },
    introduction: {
      pt: 'Interfaces para propostas, licenciamento e gestão de catálogo em uma plataforma corporativa.',
      en: 'Interfaces for proposals, licensing and catalog management in an enterprise platform.',
    },
    contextLabel: { pt: 'O contexto', en: 'The context' },
    context: {
      pt: 'Reunir rotinas de operações e áreas diferentes em uma experiência web de gestão.',
      en: 'Bring operational workflows and different areas together in a web management experience.',
    },
    approachLabel: { pt: 'As frentes', en: 'The areas' },
    approach: {
      pt: 'O trabalho apresentado conecta operações, propostas comerciais, licenças e catálogo.',
      en: 'The work presented connects operations, commercial proposals, licenses and catalog management.',
    },
    diagramLabel: { pt: 'Áreas da plataforma', en: 'Platform areas' },
    diagram: [
      { pt: 'Operações', en: 'Operations' },
      { pt: 'Propostas', en: 'Proposals' },
      { pt: 'Licenças', en: 'Licensing' },
      { pt: 'Catálogo', en: 'Catalog' },
    ],
    evidence: { href: 'https://www.autocom3.com.br/', label: { pt: 'Conhecer a Autocom3', en: 'Visit Autocom3' } },
    note: { pt: 'As interfaces não são exibidas aqui para preservar informações corporativas.', en: 'Interfaces are not shown here to protect business information.' },
  },
  {
    id: 'achilles', category: 'gerais', name: 'Achilles CDP Agent',
    type: { pt: 'Agentes e automação', en: 'Agents and automation' },
    introduction: {
      pt: 'Automação de navegador para agentes de IA, com integração MCP e leitura semântica de páginas.',
      en: 'Browser automation for AI agents, with MCP integration and semantic page reading.',
    },
    contextLabel: { pt: 'O contexto', en: 'The context' },
    context: {
      pt: 'Conectar agentes a uma sessão de navegador usando o Chrome DevTools Protocol.',
      en: 'Connect agents to a browser session using the Chrome DevTools Protocol.',
    },
    approachLabel: { pt: 'A abordagem', en: 'The approach' },
    approach: {
      pt: 'O projeto reúne uma interface MCP e um modo de leitura que extrai conteúdo estruturado da página.',
      en: 'The project combines an MCP interface with a reading mode that extracts structured page content.',
    },
    diagramLabel: { pt: 'Fluxo conceitual', en: 'Conceptual flow' },
    diagram: [
      { pt: 'Agente', en: 'Agent' }, { pt: 'MCP', en: 'MCP' },
      { pt: 'Navegador', en: 'Browser' }, { pt: 'Conteúdo', en: 'Content' },
    ],
    evidence: { href: 'https://github.com/PedroReoli/Achilles-CDP-Agent', label: { pt: 'Código e documentação', en: 'Code and documentation' } },
  },
  {
    id: 'geoambiental', category: 'gerais', name: 'GeoAmbiental',
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
    evidence: { href: 'https://github.com/PedroReoli/showcase-geoambiental-vr', label: { pt: 'Código e documentação', en: 'Code and documentation' } },
    note: {
      pt: 'As camadas geográficas são ilustrativas, conforme informado no repositório.',
      en: 'The geographic layers are illustrative, as stated in the repository.',
    },
  },
]

export const projectsCopy = {
  pt: {
    introduction: 'Sistemas e ferramentas para organizar operações e explorar novas formas de interagir com a tecnologia.',
    index: 'Explorar projetos', diagram: 'Diagrama conceitual', external: 'Abre em nova aba',
    empty: 'Nenhum projeto disponível nesta categoria.',
    other: 'Ver outra categoria',
  },
  en: {
    introduction: 'Systems and tools for organizing operations and exploring new ways to interact with technology.',
    index: 'Explore projects', diagram: 'Conceptual diagram', external: 'Opens in a new tab',
    empty: 'No projects are available in this category.',
    other: 'View the other category',
  },
} as const

