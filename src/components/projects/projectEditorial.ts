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
  {
    id: 'argos', category: 'gerais', name: 'Argos-Action-1.5B',
    type: { pt: 'Small Language Model & MCP', en: 'Small Language Model & MCP' },
    introduction: {
      pt: 'Edge Policy SLM baseado em Qwen 2.5 1.5B com fine-tuning QLoRA para Computer Use sobre AXTree e emissão de contratos MCP.',
      en: 'Edge Policy SLM fine-tuned via QLoRA on Qwen 2.5 1.5B for single-turn Computer Use over AXTree emitting MCP contracts.',
    },
    contextLabel: { pt: 'Métricas e eficiência', en: 'Metrics & efficiency' },
    context: {
      pt: 'Sub-150ms de latência em inferência local, 99.69% de acurácia de ação e -92.2% de tokens em relação ao DOM bruto.',
      en: 'Sub-150ms local inference latency, 99.69% action accuracy, and 92.2% context token savings vs raw DOM.',
    },
    approachLabel: { pt: 'Arquitetura de pesos', en: 'Weight architecture' },
    approach: {
      pt: 'Adaptação LoRA em 7 projeções com rank r=16 em BF16 (~36.9MB), dataset sintético estruturado e HuggingFace Hub.',
      en: 'LoRA adapters across 7 projection modules with r=16 in BF16 (~36.9MB), structured dataset, and HuggingFace Hub delivery.',
    },
    diagramLabel: { pt: 'Pipeline agêntico', en: 'Agentic pipeline' },
    diagram: [
      { pt: 'AXTree', en: 'AXTree' }, { pt: 'Argos-1.5B', en: 'Argos-1.5B' },
      { pt: 'Contrato MCP', en: 'MCP Contract' }, { pt: 'UIA / Chrome', en: 'UIA / Chrome' },
    ],
    evidence: { href: 'https://huggingface.co/pedroreoli/argos-action-1.5b', label: { pt: 'Modelo no HuggingFace', en: 'HuggingFace Model' } },
  },
  {
    id: 'loog', category: 'corporativo', name: 'Loog Proteção Veicular',
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
    evidence: { href: 'https://loogprotecaoveicular.com.br/', label: { pt: 'Acessar website', en: 'Visit website' } },
  },
  {
    id: 'nexus', category: 'corporativo', name: 'Nexus Brazil',
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
    evidence: { href: 'https://www.nexusbrazil.com.br/', label: { pt: 'Acessar website', en: 'Visit website' } },
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

