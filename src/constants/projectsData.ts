export interface Project {
  title: string
  description: string
  link: string
  repo: string
  techStack: string[]
  status: "Finalizado" | "Beta" | "Em Desenvolvimento"
  thumbnails: string[]
  type: "Pessoal" | "Colaborativo" | "Freelance"
  detailedDescription?: string // Exibe detalhes no modal
}

export const projectsData: Project[] = [
  {
    title: "Evatech",
    description: "Plataforma educacional para empoderamento de mães através da tecnologia.",
    link: "https://evatech2024.netlify.app",
    repo: "https://github.com/PedroReoli/Evatech",
    techStack: ["React", "TailwindCSS", "AppwriteDB", "Node.js"],
    status: "Finalizado",
    thumbnails: ["/projects/eva1.jpg", "/projects/eva2.jpg", "/projects/eva3.jpg"],
    type: "Colaborativo",
    detailedDescription:
      "O Evatech visa capacitar mães através de cursos, workshops e mentorias na área de tecnologia. O sistema possui autenticação, dashboard personalizado e fóruns de discussão.",
  },
  {
    title: "Peoplelly",
    description: "Rede social inovadora para conectar pessoas com interesses em comum.",
    link: "https://peoplelly.netlify.app",
    repo: "https://github.com/PedroReoli/peoplelly",
    techStack: ["React", "WebSocket", "Redux", "AppwriteDB"],
    status: "Beta",
    thumbnails: ["/projects/peop1.jpg", "/projects/peop2.jpg", "/projects/peop3.jpg"],
    type: "Pessoal",
  },
  {
    title: "DevEmDesenvolvimento",
    description: "Blog técnico e plataforma educacional para novos desenvolvedores.",
    link: "https://devemdesenvolvimento.com.br",
    repo: "https://github.com/PedroReoli/BlogDevInDevelopment",
    techStack: ["Next.js", "MDX", "AppwriteDB"],
    status: "Beta",
    thumbnails: ["/projects/blog1.png", "/projects/blog2.png", "/projects/blog3.png"],
    type: "Pessoal",
  },
]

// Map of status colors for consistency
export const statusColors: Record<string, string> = {
  Finalizado: "bg-green-500/10 text-green-400 border-green-500/20",
  Beta: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  "Em Desenvolvimento": "bg-blue-500/10 text-blue-400 border-blue-500/20",
}

// Map of type colors for consistency
export const typeColors: Record<string, string> = {
  Pessoal: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Colaborativo: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Freelance: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
}

// Map of tech stack colors for consistency
export const techColors: Record<string, string> = {
  React: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  TailwindCSS: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  AppwriteDB: "bg-red-500/10 text-red-400 border-red-500/20",
  "Node.js": "bg-green-500/10 text-green-400 border-green-500/20",
  WebSocket: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Redux: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  "Next.js": "bg-gray-500/10 text-gray-400 border-gray-500/20",
  MDX: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
}

