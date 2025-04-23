export interface Project {
  titleKey: string     // Chave de tradução para o título
  descriptionKey: string  // Chave de tradução para a descrição
  link: string
  repo: string
  techStack: string[]
  status: "finished" | "beta" | "inProgress"  // Chaves de status padronizadas
  thumbnails: string[]
  type: "personal" | "collaborative" | "freelance"  // Chaves de tipo padronizadas
  detailedDescriptionKey?: string  // Chave de tradução para a descrição detalhada
}

export const projectsData: Project[] = [
  {
    titleKey: "projects.items.evatech.title",
    descriptionKey: "projects.items.evatech.description",
    link: "https://evatech2024.vercel.app",
    repo: "https://github.com/PedroReoli/Evatech",
    techStack: ["React", "TailwindCSS", "AppwriteDB", "Node.js"],
    status: "finished",
    thumbnails: ["/projects/eva1.jpg", "/projects/eva2.jpg", "/projects/eva3.jpg"],
    type: "collaborative",
    detailedDescriptionKey: "projects.items.evatech.detailedDescription",
  },
  {
    titleKey: "projects.items.peoplelly.title",
    descriptionKey: "projects.items.peoplelly.description",
    link: "https://peoplelly.vercel.app",
    repo: "https://github.com/PedroReoli/peoplelly",
    techStack: ["React", "WebSocket", "Redux", "AppwriteDB"],
    status: "beta",
    thumbnails: ["/projects/peop1.jpg", "/projects/peop2.jpg", "/projects/peop3.jpg"],
    type: "personal",
    detailedDescriptionKey: "projects.items.peoplelly.detailedDescription",
  },
  {
    titleKey: "projects.items.devEmDesenvolvimento.title",
    descriptionKey: "projects.items.devEmDesenvolvimento.description",
    link: "https://devemdesenvolvimento.com.br",
    repo: "https://github.com/PedroReoli/BlogDevInDevelopment",
    techStack: ["Next.js", "MDX", "AppwriteDB"],
    status: "beta",
    thumbnails: ["/projects/blog1.png", "/projects/blog2.png", "/projects/blog3.png"],
    type: "personal",
    detailedDescriptionKey: "projects.items.devEmDesenvolvimento.detailedDescription",
  },
]

// We're not using these color maps anymore since we're using consistent blue styling
export const statusColors: Record<string, string> = {}
export const typeColors: Record<string, string> = {}
export const techColors: Record<string, string> = {}
