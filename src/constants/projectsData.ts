export interface Project {
  title: string
  description: string
  link: string
  repo: string
  techStack: string[]
  status: "Finalizado" | "Beta" | "Em Desenvolvimento"
  thumbnails: string[]
  type: "Pessoal" | "Colaborativo" | "Freelance"
  detailedDescription?: string
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
      "O Evatech visa capacitar mães através de cursos, workshops e mentorias na área de tecnologia. O sistema possui autenticação, dashboard personalizado e fóruns de discussão. A plataforma foi desenvolvida com foco em acessibilidade e facilidade de uso, permitindo que as usuárias possam aprender em seu próprio ritmo e de acordo com sua disponibilidade.",
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
    detailedDescription:
      "Peoplelly é uma rede social que conecta pessoas com interesses similares, facilitando a formação de comunidades e o compartilhamento de conhecimento. A plataforma utiliza um algoritmo inteligente para sugerir conexões relevantes e possui recursos de chat em tempo real, grupos temáticos e compartilhamento de conteúdo.",
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
    detailedDescription:
      "DevEmDesenvolvimento é uma plataforma que combina blog técnico com recursos educacionais para desenvolvedores iniciantes. O site oferece artigos, tutoriais, projetos práticos e uma comunidade de suporte para ajudar novos programadores a avançarem em suas carreiras. O conteúdo é organizado por níveis de dificuldade e áreas de interesse.",
  },
]

// We're not using these color maps anymore since we're using consistent blue styling
export const statusColors: Record<string, string> = {}
export const typeColors: Record<string, string> = {}
export const techColors: Record<string, string> = {}

