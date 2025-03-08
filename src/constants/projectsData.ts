export interface Project {
  title: string
  description: string
  detailedDescription?: string
  link: string
  repo: string
  techStack: string[]
  status: "Finalizado" | "Beta" | "Em Desenvolvimento"
  thumbnails: string[]
  type: "Pessoal" | "Colaborativo" | "Freelance"
  duration: string
  category: "Web" | "Mobile" | "Desktop" | "Blog" | "E-commerce"
  difficulty: "Iniciante" | "Intermediário" | "Avançado"
  features?: string[]
  teamSize?: number
  role?: string
  color?: string // Added for custom project color theming
  year?: string // Added to show project year
  highlight?: boolean // Added to mark featured projects
}

export const projectsData: Project[] = [
  {
    title: "Evatech",
    description:
      "Plataforma educacional focada em empoderar mães através da tecnologia, oferecendo cursos e workshops em desenvolvimento web.",
    detailedDescription:
      "Projeto social que visa capacitar mães em situação de vulnerabilidade, fornecendo conhecimentos em programação e desenvolvimento web. A plataforma inclui sistema de gerenciamento de cursos, fórum de discussão e área de mentoria.",
    link: "https://evatech2024.netlify.app",
    repo: "https://github.com/PedroReoli/Evatech",
    techStack: ["React", "Tailwind CSS", "AppwriteDB", "JavaScript", "Node.js", "Express"],
    status: "Finalizado",
    thumbnails: ["/projects/eva1.jpg", "/projects/eva2.jpg", "/projects/eva3.jpg", "/projects/eva4.jpg"],
    type: "Colaborativo",
    duration: "6 meses",
    category: "Web",
    difficulty: "Avançado",
    features: [
      "Sistema de autenticação",
      "Dashboard personalizado",
      "Gerenciamento de cursos",
      "Fórum de discussão",
      "Sistema de mentoria",
    ],
    teamSize: 4,
    role: "Tech Lead & Desenvolvedor Full Stack",
    color: "#8C429D",
    year: "2024",
    highlight: true
  },
  {
    title: "Peoplelly",
    description:
      "Rede social inovadora focada em conectar pessoas através de interesses em comum e compartilhamento de conhecimento.",
    detailedDescription:
      "Plataforma que permite aos usuários criar perfis, compartilhar conteúdo, participar de grupos de interesse e estabelecer conexões profissionais. Inclui sistema de mensagens em tempo real e feed personalizado.",
    link: "https://peoplelly.netlify.app",
    repo: "https://github.com/PedroReoli/peoplelly",
    techStack: ["React", "Tailwind CSS", "AppwriteDB", "JavaScript", "WebSocket", "Redux"],
    status: "Beta",
    thumbnails: ["/projects/peop1.jpg", "/projects/peop2.jpg", "/projects/peop3.jpg"],
    type: "Pessoal",
    duration: "3 meses",
    category: "Web",
    difficulty: "Intermediário",
    features: [
      "Autenticação social",
      "Chat em tempo real",
      "Feed personalizado",
      "Sistema de grupos",
      "Compartilhamento de conteúdo",
    ],
    color: "#60A5FA",
    year: "2023",
    highlight: true
  },
  {
    title: "DevEmDesenvolvimento",
    description:
      "Blog técnico e plataforma educacional focada em compartilhar conhecimento sobre desenvolvimento de software e tecnologia.",
    detailedDescription:
      "Espaço dedicado ao compartilhamento de conhecimento em programação, com artigos técnicos, tutoriais práticos e recursos educacionais. Inclui sistema de newsletter, área de membros e conteúdo premium.",
    link: "https://devemdesenvolvimento.com.br",
    repo: "https://github.com/PedroReoli/BlogDevInDevelopment",
    techStack: ["React", "Tailwind CSS", "AppwriteDB", "JavaScript", "MDX", "Next.js"],
    status: "Beta",
    thumbnails: ["/projects/blog1.png", "/projects/blog2.png", "/projects/blog3.png"],
    type: "Pessoal",
    duration: "Atual",
    category: "Blog",
    difficulty: "Intermediário",
    features: [
      "Sistema de blog",
      "Newsletter automática",
      "Área de membros",
      "Conteúdo premium",
      "Integração com redes sociais",
    ],
    color: "#F59E0B",
    year: "2023",
    highlight: false
  },
]
