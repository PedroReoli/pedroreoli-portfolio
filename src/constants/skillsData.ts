// Mantendo a parte inicial do arquivo que cria os ícones
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
  descriptionKey?: string // Chave de tradução para a descrição
  color: string // Cor para o hover effect
  showCourses?: boolean // Nova propriedade para controlar a exibição de cursos
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
    descriptionKey: "skills.items.react.description",
    color: "#61DAFB", // React blue
    showCourses: false,
  },
  {
    title: "Next.js",
    level: 2.5,
    area: "frontend",
    icon: createDevIcon("nextjs/nextjs-original.svg"),
    courses: ["Next.js na Prática", "Next.js com TypeScript"],
    coursesLinks: ["https://www.udemy.com/course/nextjs-na-pratica", "https://www.udemy.com/course/nextjs-typescript"],
    descriptionKey: "skills.items.nextjs.description",
    color: "#000000", // Next.js black
    showCourses: false,
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
    descriptionKey: "skills.items.typescript.description",
    color: "#3178C6", // TypeScript blue
    showCourses: false,
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
    descriptionKey: "skills.items.tailwind.description",
    color: "#06B6D4", // Tailwind teal
    showCourses: false,
  },
  {
    title: "Vite",
    level: 2.7,
    area: "frontend",
    icon: createSimpleIcon("vite", "646CFF"),
    courses: ["Vite para Desenvolvedores React", "Vite Avançado"],
    coursesLinks: [
      "https://www.udemy.com/course/vite-para-desenvolvedores-react",
      "https://www.udemy.com/course/vite-avancado",
    ],
    descriptionKey: "skills.items.vite.description",
    color: "#646CFF", // Vite purple
    showCourses: false,
  },
  {
    title: "Three.js",
    level: 2.2,
    area: "frontend",
    icon: createSimpleIcon("threedotjs", "000000"),
    courses: ["Three.js Fundamentos", "Gráficos 3D na Web"],
    coursesLinks: [
      "https://www.udemy.com/course/threejs-fundamentos",
      "https://www.udemy.com/course/graficos-3d-na-web",
    ],
    descriptionKey: "skills.items.threejs.description",
    color: "#000000", // Three.js black
    showCourses: false,
  },
  {
    title: "Shadcn/UI",
    level: 2.5,
    area: "frontend",
    icon: createSimpleIcon("shadcnui", "000000"),
    courses: ["Shadcn/UI com Tailwind", "Componentes Reutilizáveis"],
    coursesLinks: [
      "https://www.udemy.com/course/shadcn-ui-com-tailwind",
      "https://www.udemy.com/course/componentes-reutilizaveis",
    ],
    descriptionKey: "skills.items.shadcn.description",
    color: "#000000", // Shadcn black
    showCourses: false,
  },
  {
    title: "Framer Motion",
    level: 2.6,
    area: "frontend",
    icon: createSimpleIcon("framer", "0055FF"),
    courses: ["Animações com Framer Motion", "UX com Animações"],
    coursesLinks: [
      "https://www.udemy.com/course/animacoes-com-framer-motion",
      "https://www.udemy.com/course/ux-com-animacoes",
    ],
    descriptionKey: "skills.items.framermotion.description",
    color: "#0055FF", // Framer blue
    showCourses: false,
  },
  {
    title: "Blazor",
    level: 2.0,
    area: "frontend",
    icon: createSimpleIcon("blazor", "512BD4"),
    courses: ["Blazor WebAssembly", "Blazor com .NET"],
    coursesLinks: ["https://www.udemy.com/course/blazor-webassembly", "https://www.udemy.com/course/blazor-com-dotnet"],
    descriptionKey: "skills.items.blazor.description",
    color: "#512BD4", // Blazor purple
    showCourses: false,
  },

  // Backend
  {
    title: "Node.js",
    level: 2.5,
    area: "backend",
    icon: createDevIcon("nodejs/nodejs-original.svg"),
    courses: ["Node.js Básico", "Node.js com Express"],
    coursesLinks: ["https://www.udemy.com/course/nodejs-basico", "https://www.udemy.com/course/nodejs-express"],
    descriptionKey: "skills.items.nodejs.description",
    color: "#339933", // Node.js green
    showCourses: false,
  },
  {
    title: "C#",
    level: 3,
    area: "backend",
    icon: createDevIcon("csharp/csharp-original.svg"),
    courses: ["C# Completo", "C# Avançado"],
    coursesLinks: ["https://www.udemy.com/course/csharp-completo", "https://www.udemy.com/course/csharp-avancado"],
    descriptionKey: "skills.items.csharp.description",
    color: "#239120", // C# green
    showCourses: false,
  },
  {
    title: "Python",
    level: 2.2,
    area: "backend",
    icon: createDevIcon("python/python-original.svg"),
    courses: ["Python Básico", "Python para Data Science"],
    coursesLinks: ["https://www.udemy.com/course/python-basico", "https://www.udemy.com/course/python-data-science"],
    descriptionKey: "skills.items.python.description",
    color: "#3776AB", // Python blue
    showCourses: false,
  },
  {
    title: "Supabase",
    level: 2.4,
    area: "backend",
    icon: createSimpleIcon("supabase", "3ECF8E"),
    courses: ["Supabase Fundamentals", "Supabase para Desenvolvedores"],
    coursesLinks: [
      "https://www.udemy.com/course/supabase-fundamentals",
      "https://www.udemy.com/course/supabase-para-desenvolvedores",
    ],
    descriptionKey: "skills.items.supabase.description",
    color: "#3ECF8E", // Supabase green
    showCourses: false,
  },
  {
    title: "Express.js",
    level: 2.5,
    area: "backend",
    icon: createSimpleIcon("express", "000000"),
    courses: ["Express.js Básico", "APIs com Express"],
    coursesLinks: ["https://www.udemy.com/course/expressjs-basico", "https://www.udemy.com/course/apis-com-express"],
    descriptionKey: "skills.items.express.description",
    color: "#000000", // Express black
    showCourses: false,
  },
  {
    title: "Prisma ORM",
    level: 2.3,
    area: "backend",
    icon: createSimpleIcon("prisma", "2D3748"),
    courses: ["Prisma ORM Básico", "Prisma com TypeScript"],
    coursesLinks: [
      "https://www.udemy.com/course/prisma-orm-basico",
      "https://www.udemy.com/course/prisma-com-typescript",
    ],
    descriptionKey: "skills.items.prisma.description",
    color: "#2D3748", // Prisma dark blue
    showCourses: false,
  },
  {
    title: "JWT",
    level: 2.6,
    area: "backend",
    icon: createSimpleIcon("jsonwebtokens", "000000"),
    courses: ["Autenticação com JWT", "Segurança em APIs"],
    coursesLinks: [
      "https://www.udemy.com/course/autenticacao-com-jwt",
      "https://www.udemy.com/course/seguranca-em-apis",
    ],
    descriptionKey: "skills.items.jwt.description",
    color: "#000000", // JWT black
    showCourses: false,
  },
  {
    title: "Socket.IO",
    level: 2.2,
    area: "backend",
    icon: createSimpleIcon("socketdotio", "010101"),
    courses: ["WebSockets Básico", "Aplicações em Tempo Real"],
    coursesLinks: [
      "https://www.udemy.com/course/websockets-basico",
      "https://www.udemy.com/course/aplicacoes-em-tempo-real",
    ],
    descriptionKey: "skills.items.socketio.description",
    color: "#010101", // Socket.IO black
    showCourses: false,
  },
  {
    title: "Postman",
    level: 2.8,
    area: "backend",
    icon: createSimpleIcon("postman", "FF6C37"),
    courses: ["Testes de API com Postman", "Automação com Postman"],
    coursesLinks: [
      "https://www.udemy.com/course/testes-de-api-com-postman",
      "https://www.udemy.com/course/automacao-com-postman",
    ],
    descriptionKey: "skills.items.postman.description",
    color: "#FF6C37", // Postman orange
    showCourses: false,
  },
  {
    title: "Swagger",
    level: 2.4,
    area: "backend",
    icon: createSimpleIcon("swagger", "85EA2D"),
    courses: ["Documentação de API com Swagger", "OpenAPI Specification"],
    coursesLinks: [
      "https://www.udemy.com/course/documentacao-de-api-com-swagger",
      "https://www.udemy.com/course/openapi-specification",
    ],
    descriptionKey: "skills.items.swagger.description",
    color: "#85EA2D", // Swagger green
    showCourses: false,
  },

  // Database
  {
    title: "SQL",
    level: 2.5,
    area: "database",
    icon: createDevIcon("mysql/mysql-original.svg"),
    courses: ["SQL Básico", "SQL Avançado"],
    coursesLinks: ["https://www.udemy.com/course/sql-basico", "https://www.udemy.com/course/sql-avancado"],
    descriptionKey: "skills.items.sql.description",
    color: "#4479A1", // MySQL blue
    showCourses: false,
  },
  {
    title: "MongoDB",
    level: 2.3,
    area: "database",
    icon: createDevIcon("mongodb/mongodb-original.svg"),
    courses: ["MongoDB Básico", "MongoDB Avançado"],
    coursesLinks: ["https://www.udemy.com/course/mongodb-basico", "https://www.udemy.com/course/mongodb-avancado"],
    descriptionKey: "skills.items.mongodb.description",
    color: "#47A248", // MongoDB green
    showCourses: false,
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
    descriptionKey: "skills.items.postgresql.description",
    color: "#336791", // PostgreSQL blue
    showCourses: false,
  },

  // Tools
  {
    title: "Git",
    level: 3,
    area: "tools",
    icon: createDevIcon("git/git-original.svg"),
    courses: ["Git Essencial", "Git Avançado"],
    coursesLinks: ["https://www.udemy.com/course/git-essencial", "https://www.udemy.com/course/git-avancado"],
    descriptionKey: "skills.items.git.description",
    color: "#F05032", // Git orange
    showCourses: false,
  },
  {
    title: "Docker",
    level: 2.2,
    area: "tools",
    icon: createDevIcon("docker/docker-original.svg"),
    courses: ["Docker Básico", "Docker Avançado"],
    coursesLinks: ["https://www.udemy.com/course/docker-basico", "https://www.udemy.com/course/docker-avancado"],
    descriptionKey: "skills.items.docker.description",
    color: "#2496ED", // Docker blue
    showCourses: false,
  },
  {
    title: "VS Code",
    level: 3,
    area: "tools",
    icon: createDevIcon("vscode/vscode-original.svg"),
    courses: ["VS Code Produtivo", "VS Code Extensions"],
    coursesLinks: ["https://www.udemy.com/course/vscode-produtivo", "https://www.udemy.com/course/vscode-extensions"],
    descriptionKey: "skills.items.vscode.description",
    color: "#007ACC", // VS Code blue
    showCourses: false,
  },
  {
    title: "Vercel",
    level: 2.7,
    area: "tools",
    icon: createSimpleIcon("vercel", "000000"),
    courses: ["Deploy com Vercel", "CI/CD na Vercel"],
    coursesLinks: ["https://www.udemy.com/course/deploy-com-vercel", "https://www.udemy.com/course/cicd-na-vercel"],
    descriptionKey: "skills.items.vercel.description",
    color: "#000000", // Vercel black
    showCourses: false,
  },
  {
    title: "ESLint + Prettier",
    level: 2.8,
    area: "tools",
    icon: createSimpleIcon("eslint", "4B32C3"),
    courses: ["Padrões de Código", "Linting e Formatação"],
    coursesLinks: [
      "https://www.udemy.com/course/padroes-de-codigo",
      "https://www.udemy.com/course/linting-e-formatacao",
    ],
    descriptionKey: "skills.items.eslint.description",
    color: "#4B32C3", // ESLint purple
    showCourses: false,
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
