export interface Project {
  titleKey: string // Chave de tradução para o título
  descriptionKey: string // Chave de tradução para a descrição
  link: string
  repo: string
  techStack: string[]
  status: "finished" | "beta" | "inProgress" // Chaves de status padronizadas
  thumbnails: string[]
  type: "personal" | "collaborative" | "freelance" | "work" // Adicionado "work"
  detailedDescriptionKey?: string // Chave de tradução para a descrição detalhada
  videoUrl?: string // URL do vídeo local (opcional)
  youtubeUrl?: string // URL do vídeo do YouTube (opcional)
}

export const projectsData: Project[] = [
  {
    titleKey: "projects.items.autocom3.title",
    descriptionKey: "projects.items.autocom3.description",
    link: "https://autocom3.com.br",
    repo: "",
    techStack: ["HTML", "CSS", "Framer Motion", "HTML Tilt", "JavaScript"],
    status: "finished",
    thumbnails: ["/projects/autocom1.jpg", "/projects/autocom2.jpg", "/projects/autocom3.jpg"],
    type: "work",
    detailedDescriptionKey: "projects.items.autocom3.detailedDescription",
    youtubeUrl : "https://www.youtube.com/watch?v=wn0DBp2nYWg",
  },
  
  {
    titleKey: "projects.items.autoPonto.title",
    descriptionKey: "projects.items.autoPonto.description",
    link: "#",
    repo: "https://github.com/PedroReoli/RegistroDePonto",
    techStack: ["React", "APIRest", "Supabase", "Node.js"],
    status: "inProgress",
    thumbnails: ["/projects/ponto1.jpg", "/projects/ponto2.jpg", "/projects/ponto3.jpg"],
    type: "work",
    detailedDescriptionKey: "projects.items.autoPonto.detailedDescription",
    youtubeUrl : "https://youtu.be/3LhKdtr1fOY",
  },
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
    youtubeUrl : "https://youtu.be/ICdA0rHeRIs",
  },
]

// We're not using these color maps anymore since we're using consistent blue styling
export const statusColors: Record<string, string> = {}
export const typeColors: Record<string, string> = {}
export const techColors: Record<string, string> = {}
