import React from "react"
import type { LucideIcon } from "lucide-react"

// Função helper para criar componente de ícone
const createDevIcon = (iconPath: string): React.FC<{ className?: string }> => {
  return function DevIcon({ className = "w-4 h-4" }) {
    return React.createElement("img", {
      src: `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${iconPath}`,
      alt: iconPath.split("/")[0],
      className,
    })
  }
}

export interface Skill {
  title: string
  level: number
  area: "frontend" | "backend" | "database" | "tools"
  courses: string[]
  coursesLinks: string[]
  icon: React.FC<{ className?: string }> | LucideIcon
  description?: string // Descrição curta da habilidade
  color?: string // Cor personalizada para cada habilidade
}

export const skillsData: Skill[] = [
  {
    title: "HTML",
    level: 2.5,
    area: "frontend",
    icon: createDevIcon("html5/html5-original.svg"),
    courses: ["Curso de HTML Básico", "HTML Avançado e Semântico"],
    coursesLinks: [
      "https://www.udemy.com/course/curso-web-design-fundamentos-aprenda-html-css-e-javascript",
      "https://www.udemy.com/course/html-semantico",
    ],
    description: "Linguagem de marcação para estruturar conteúdo web",
    color: "#E34F26",
  },
  {
    title: "CSS",
    level: 2,
    area: "frontend",
    icon: createDevIcon("css3/css3-original.svg"),
    courses: ["CSS Moderno", "CSS Flexbox e Grid"],
    coursesLinks: ["https://www.udemy.com/course/css-moderno", "https://www.udemy.com/course/css-flexbox-grid"],
    description: "Linguagem de estilização para design web",
    color: "#1572B6",
  },
  {
    title: "JS",
    level: 2.5,
    area: "frontend",
    icon: createDevIcon("javascript/javascript-original.svg"),
    courses: ["JavaScript Completo", "JavaScript ES6+"],
    coursesLinks: ["https://www.udemy.com/course/javascript-completo", "https://www.udemy.com/course/javascript-es6"],
    description: "Linguagem de programação para web interativa",
    color: "#F7DF1E",
  },
  {
    title: "React",
    level: 2,
    area: "frontend",
    icon: createDevIcon("react/react-original.svg"),
    courses: ["React do Zero", "React Avançado"],
    coursesLinks: ["https://www.udemy.com/course/react-do-zero", "https://www.udemy.com/course/react-avancado"],
    description: "Biblioteca JavaScript para construção de interfaces",
    color: "#61DAFB",
  },
  {
    title: "Next",
    level: 2,
    area: "frontend",
    icon: createDevIcon("nextjs/nextjs-original.svg"),
    courses: ["Next.js na Prática", "Next.js com TypeScript"],
    coursesLinks: ["https://www.udemy.com/course/nextjs-na-pratica", "https://www.udemy.com/course/nextjs-typescript"],
    description: "Framework React para aplicações web completas",
    color: "#000000",
  },
  {
    title: "Node",
    level: 1.5,
    area: "backend",
    icon: createDevIcon("nodejs/nodejs-original.svg"),
    courses: ["Node.js Básico", "Node.js com Express"],
    coursesLinks: ["https://www.udemy.com/course/nodejs-basico", "https://www.udemy.com/course/nodejs-express"],
    description: "Ambiente de execução JavaScript server-side",
    color: "#339933",
  },
  {
    title: "C#",
    level: 2,
    area: "backend",
    icon: createDevIcon("csharp/csharp-original.svg"),
    courses: ["C# Completo", "C# Avançado"],
    coursesLinks: ["https://www.udemy.com/course/csharp-completo", "https://www.udemy.com/course/csharp-avancado"],
    description: "Linguagem de programação orientada a objetos",
    color: "#239120",
  },
  {
    title: "SQL",
    level: 1.5,
    area: "database",
    icon: createDevIcon("mysql/mysql-original.svg"),
    courses: ["SQL Básico", "SQL Avançado"],
    coursesLinks: ["https://www.udemy.com/course/sql-basico", "https://www.udemy.com/course/sql-avancado"],
    description: "Linguagem para gerenciamento de bancos de dados",
    color: "#4479A1",
  },
  {
    title: "Git",
    level: 2.5,
    area: "tools",
    icon: createDevIcon("git/git-original.svg"),
    courses: ["Git Essencial", "Git Avançado"],
    coursesLinks: ["https://www.udemy.com/course/git-essencial", "https://www.udemy.com/course/git-avancado"],
    description: "Sistema de controle de versão distribuído",
    color: "#F05032",
  },
  {
    title: "Docker",
    level: 1,
    area: "tools",
    icon: createDevIcon("docker/docker-original.svg"),
    courses: ["Docker Básico", "Docker na Prática"],
    coursesLinks: ["https://www.udemy.com/course/docker-basico", "https://www.udemy.com/course/docker-na-pratica"],
    description: "Plataforma para desenvolvimento e implantação em contêineres",
    color: "#2496ED",
  },
]
