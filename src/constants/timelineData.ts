export interface TimelineItem {
  companyKey: string // Chave de tradução para a empresa
  roleKey: string // Chave de tradução para o cargo
  periodKey: string // Chave de tradução para o período
  statusKey: string // Chave de tradução para o status
  descriptionKey: string // Chave de tradução para a descrição
  detailsKey: string // Chave de tradução para os detalhes
  tags: string[]
  link: string
}

export const timelineData: TimelineItem[] = [
  {
    companyKey: "timeline.companies.autocom3.name",
    roleKey: "timeline.companies.autocom3.role",
    periodKey: "timeline.companies.autocom3.period",
    statusKey: "timeline.companies.autocom3.status",
    descriptionKey: "timeline.companies.autocom3.description",
    detailsKey: "timeline.companies.autocom3.details",
    tags: ["C#", ".NET", "Python", "Testes", "Automação"],
    link: "https://autocom3.com.br/",
  },
  {
    companyKey: "timeline.companies.devemdesenvolvimento.name",
    roleKey: "timeline.companies.devemdesenvolvimento.role",
    periodKey: "timeline.companies.devemdesenvolvimento.period",
    statusKey: "timeline.companies.devemdesenvolvimento.status",
    descriptionKey: "timeline.companies.devemdesenvolvimento.description",
    detailsKey: "timeline.companies.devemdesenvolvimento.details",
    tags: ["Educação", "Conteúdo Técnico", "Programação", "Comunidade"],
    link: "https://devemdesenvolvimento.vercel.app/",
  },
  {
    companyKey: "timeline.companies.evatech.name",
    roleKey: "timeline.companies.evatech.role",
    periodKey: "timeline.companies.evatech.period",
    statusKey: "timeline.companies.evatech.status",
    descriptionKey: "timeline.companies.evatech.description",
    detailsKey: "timeline.companies.evatech.details",
    tags: ["Ensino", "Mentoria", "Palestras", "Inteligência Artificial"],
    link: "https://evatech.org/",
  },
]

// Map of tag colors for consistency
export const tagColors: Record<string, string> = {
  "C#": "bg-green-500/10 text-green-400 border-green-500/20",
  ".NET": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Python: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Testes: "bg-red-500/10 text-red-400 border-red-500/20",
  Automação: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  Educação: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Conteúdo Técnico": "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  Programação: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  Comunidade: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  Ensino: "bg-teal-500/10 text-teal-400 border-teal-500/20",
  Mentoria: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  Palestras: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  "Inteligência Artificial": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
}
