import React from "react"
import type { LucideIcon } from "lucide-react"

// Função helper para criar ícones a partir do Devicons CDN
// Esta abordagem é mais confiável pois usa ícones SVG oficiais de cada tecnologia
const createDevIcon = (iconPath: string): React.FC<{ className?: string }> => {
  return function DevIcon({ className = "w-6 h-6" }) {
    return React.createElement("img", {
      src: `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${iconPath}`,
      alt: iconPath.split("/")[0],
      className,
    })
  }
}

// Função helper para criar ícones a partir do Simple Icons CDN
// Simple Icons tem uma coleção mais ampla de logos de marcas e tecnologias
const createSimpleIcon = (iconName: string, color: string): React.FC<{ className?: string }> => {
  return function SimpleIcon({ className = "w-6 h-6" }) {
    return React.createElement("img", {
      src: `https://cdn.simpleicons.org/${iconName}/${color.replace("#", "")}`,
      alt: iconName,
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
  color: string // Cor para o hover effect
}

export const skillsData: Skill[] = [
  // Frontend
  {
    title: "React",
    level: 3,
    area: "frontend",
    icon: createDevIcon("react/react-original.svg"),
    courses: ["React do Zero", "React Avançado"],
    coursesLinks: ["https://www.udemy.com/course/react-do-zero", "https://www.udemy.com/course/react-avancado"],
    description: "Biblioteca JavaScript para criação de interfaces dinâmicas e reativas com componentes reutilizáveis.",
    color: "#61DAFB", // React blue
  },
  {
    title: "Next.js",
    level: 2.5,
    area: "frontend",
    icon: createDevIcon("nextjs/nextjs-original.svg"),
    courses: ["Next.js na Prática", "Next.js com TypeScript"],
    coursesLinks: ["https://www.udemy.com/course/nextjs-na-pratica", "https://www.udemy.com/course/nextjs-typescript"],
    description: "Framework React para aplicações web otimizadas com SSR, SSG e rotas API integradas.",
    color: "#000000", // Next.js black
  },
  {
    title: "TypeScript",
    level: 2.8,
    area: "frontend",
    icon: createDevIcon("typescript/typescript-original.svg"),
    courses: ["TypeScript Essencial", "TypeScript Avançado"],
    coursesLinks: [
      "https://www.udemy.com/course/typescript-essencial",
      "https://www.udemy.com/course/typescript-avancado",
    ],
    description: "Superset JavaScript que adiciona tipagem estática, interfaces e recursos avançados de OOP.",
    color: "#3178C6", // TypeScript blue
  },
  {
    title: "Tailwind CSS",
    level: 3,
    area: "frontend",
    // Corrigindo o ícone do Tailwind usando Simple Icons
    icon: createSimpleIcon("tailwindcss", "06B6D4"),
    courses: ["Tailwind CSS do Zero", "Tailwind CSS Avançado"],
    coursesLinks: [
      "https://www.udemy.com/course/tailwindcss-do-zero",
      "https://www.udemy.com/course/tailwindcss-avancado",
    ],
    description: "Framework CSS utilitário para desenvolvimento rápido com classes pré-definidas e customizáveis.",
    color: "#06B6D4", // Tailwind teal
  },

  // Backend
  {
    title: "Node.js",
    level: 2.5,
    area: "backend",
    icon: createDevIcon("nodejs/nodejs-original.svg"),
    courses: ["Node.js Básico", "Node.js com Express"],
    coursesLinks: ["https://www.udemy.com/course/nodejs-basico", "https://www.udemy.com/course/nodejs-express"],
    description: "Ambiente de execução JavaScript server-side baseado no motor V8 do Chrome.",
    color: "#339933", // Node.js green
  },
  {
    title: "C#",
    level: 3,
    area: "backend",
    icon: createDevIcon("csharp/csharp-original.svg"),
    courses: ["C# Completo", "C# Avançado"],
    coursesLinks: ["https://www.udemy.com/course/csharp-completo", "https://www.udemy.com/course/csharp-avancado"],
    description: "Linguagem de programação orientada a objetos e altamente performática da Microsoft.",
    color: "#239120", // C# green
  },
  {
    title: "Python",
    level: 2.2,
    area: "backend",
    icon: createDevIcon("python/python-original.svg"),
    courses: ["Python Básico", "Python para Data Science"],
    coursesLinks: ["https://www.udemy.com/course/python-basico", "https://www.udemy.com/course/python-data-science"],
    description: "Linguagem de programação de alto nível, interpretada e versátil para diversos domínios.",
    color: "#3776AB", // Python blue
  },
  {
    title: "Appwrite",
    level: 2.4,
    area: "backend",
    icon: createSimpleIcon("appwrite", "F02E65"),
    courses: ["Appwrite Fundamentals", "Appwrite para Desenvolvedores"],
    coursesLinks: [
      "https://www.udemy.com/course/appwrite-fundamentals",
      "https://www.udemy.com/course/appwrite-para-desenvolvedores",
    ],
    description: "Backend-as-a-Service open source com autenticação, banco de dados, storage e funções serverless.",
    color: "#F02E65", // Appwrite pink
  },

  // Database
  {
    title: "SQL",
    level: 2.5,
    area: "database",
    icon: createDevIcon("mysql/mysql-original.svg"),
    courses: ["SQL Básico", "SQL Avançado"],
    coursesLinks: ["https://www.udemy.com/course/sql-basico", "https://www.udemy.com/course/sql-avancado"],
    description: "Linguagem para gerenciamento de bancos de dados relacionais com consultas estruturadas.",
    color: "#4479A1", // MySQL blue
  },
  {
    title: "MongoDB",
    level: 2.3,
    area: "database",
    icon: createDevIcon("mongodb/mongodb-original.svg"),
    courses: ["MongoDB Básico", "MongoDB Avançado"],
    coursesLinks: ["https://www.udemy.com/course/mongodb-basico", "https://www.udemy.com/course/mongodb-avancado"],
    description: "Banco de dados NoSQL orientado a documentos com alta escalabilidade e flexibilidade.",
    color: "#47A248", // MongoDB green
  },
  {
    title: "PostgreSQL",
    level: 2.6,
    area: "database",
    icon: createSimpleIcon("postgresql", "336791"),
    courses: ["PostgreSQL Essencial", "PostgreSQL Avançado"],
    coursesLinks: [
      "https://www.udemy.com/course/postgresql-essencial",
      "https://www.udemy.com/course/postgresql-avancado",
    ],
    description: "Sistema de banco de dados relacional de código aberto com recursos avançados e extensibilidade.",
    color: "#336791", // PostgreSQL blue
  },

  // Tools
  {
    title: "Git",
    level: 3,
    area: "tools",
    icon: createDevIcon("git/git-original.svg"),
    courses: ["Git Essencial", "Git Avançado"],
    coursesLinks: ["https://www.udemy.com/course/git-essencial", "https://www.udemy.com/course/git-avancado"],
    description: "Sistema de controle de versão distribuído para rastreamento de alterações no código-fonte.",
    color: "#F05032", // Git orange
  },
  {
    title: "Docker",
    level: 2.2,
    area: "tools",
    icon: createDevIcon("docker/docker-original.svg"),
    courses: ["Docker Básico", "Docker Avançado"],
    coursesLinks: ["https://www.udemy.com/course/docker-basico", "https://www.udemy.com/course/docker-avancado"],
    description: "Plataforma para desenvolvimento, envio e execução de aplicações em containers isolados.",
    color: "#2496ED", // Docker blue
  },
  {
    title: "VS Code",
    level: 3,
    area: "tools",
    icon: createDevIcon("vscode/vscode-original.svg"),
    courses: ["VS Code Produtivo", "VS Code Extensions"],
    coursesLinks: ["https://www.udemy.com/course/vscode-produtivo", "https://www.udemy.com/course/vscode-extensions"],
    description: "Editor de código-fonte leve e poderoso com extenso ecossistema de extensões.",
    color: "#007ACC", // VS Code blue
  },
  
]

// Agrupar habilidades por área
export const skillsByArea = skillsData.reduce(
  (acc, skill) => {
    if (!acc[skill.area]) {
      acc[skill.area] = []
    }
    acc[skill.area].push(skill)
    return acc
  },
  {} as Record<string, Skill[]>,
)

// Mapeamento de áreas para títulos legíveis
export const areaLabels: Record<string, string> = {
  frontend: "Frontend",
  backend: "Backend",
  database: "Database",
  tools: "Tools & DevOps",
}

