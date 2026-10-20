import React from "react"
import { useLanguage } from "../../i18n/useLanguage"
import {
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiNestjs,
  SiPostgresql,
  SiDocker,
  SiGithubactions,
  SiLinux,
  SiSqlite,
  SiSupabase,
  SiFastify,
} from "react-icons/si"
import { FaAws } from "react-icons/fa6"
import { Layers, Server, Cloud, Bot, Code, Cpu } from "lucide-react"

interface StackItem {
  name: string
  icon: React.ReactNode
}

interface StackCategory {
  title: string
  categoryIcon: React.ReactNode
  items: StackItem[]
}

export const TechStackGrid: React.FC = () => {
  const { language } = useLanguage()
  const isEn = language === "en"

  const stackCategories: StackCategory[] = [
    {
      title: isEn ? "Frontend & Interfaces" : "Frontend & Interfaces",
      categoryIcon: <Layers className="w-4 h-4 text-[#58a6ff]" />,
      items: [
        { name: "React 19", icon: <SiReact className="w-4 h-4 text-[#58a6ff]" /> },
        { name: "TypeScript", icon: <SiTypescript className="w-4 h-4 text-[#3178c6]" /> },
        { name: "Next.js", icon: <SiNextdotjs className="w-4 h-4 text-[#f0f6fc]" /> },
        { name: "Tailwind CSS", icon: <SiTailwindcss className="w-4 h-4 text-[#38bdf8]" /> },
        { name: "Design Systems (500+)", icon: <Code className="w-4 h-4 text-[#7ee787]" /> },
      ],
    },
    {
      title: isEn ? "Backend & Architecture" : "Backend & Arquitetura",
      categoryIcon: <Server className="w-4 h-4 text-[#3fb950]" />,
      items: [
        { name: "Node.js", icon: <SiNodedotjs className="w-4 h-4 text-[#3fb950]" /> },
        { name: "NestJS", icon: <SiNestjs className="w-4 h-4 text-[#ea2845]" /> },
        { name: "Fastify & Express", icon: <SiFastify className="w-4 h-4 text-[#f0f6fc]" /> },
        { name: "PostgreSQL", icon: <SiPostgresql className="w-4 h-4 text-[#336791]" /> },
        { name: "SQLite WAL", icon: <SiSqlite className="w-4 h-4 text-[#003b57]" /> },
        { name: "APIs REST & GraphQL", icon: <Server className="w-4 h-4 text-[#58a6ff]" /> },
      ],
    },
    {
      title: isEn ? "Cloud, DevOps & Infra" : "Cloud, DevOps & Infra",
      categoryIcon: <Cloud className="w-4 h-4 text-[#a371f7]" />,
      items: [
        { name: "Docker", icon: <SiDocker className="w-4 h-4 text-[#2496ed]" /> },
        { name: "AWS (S3, Lambda, API GW)", icon: <FaAws className="w-4 h-4 text-[#ff9900]" /> },
        { name: "GitHub Actions CI/CD", icon: <SiGithubactions className="w-4 h-4 text-[#2088ff]" /> },
        { name: "Linux & Bash", icon: <SiLinux className="w-4 h-4 text-[#f0f6fc]" /> },
        { name: "Supabase & MySQL", icon: <SiSupabase className="w-4 h-4 text-[#3ecf8e]" /> },
      ],
    },
    {
      title: isEn ? "AI Engineering & Desktop" : "Engenharia de IA & Desktop",
      categoryIcon: <Bot className="w-4 h-4 text-[#f0883e]" />,
      items: [
        { name: "Model Context Protocol (MCP)", icon: <Bot className="w-4 h-4 text-[#f0883e]" /> },
        { name: "Chrome CDP & Playwright", icon: <Cpu className="w-4 h-4 text-[#58a6ff]" /> },
        { name: "Tauri & Electron", icon: <Code className="w-4 h-4 text-[#7ee787]" /> },
        { name: "OpenAI & Gemini APIs", icon: <Server className="w-4 h-4 text-[#3fb950]" /> },
        { name: "Clean Architecture / DDD", icon: <Layers className="w-4 h-4 text-[#c9d1d9]" /> },
      ],
    },
  ]

  return (
    <section id="stack" className="w-full flex flex-col my-4">
      {/* Cabeçalho da Seção */}
      <div className="flex flex-col mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[#f0f6fc] tracking-tight">
          {isEn ? "My Stack" : "Minha Stack"}
        </h2>
        <p className="text-[#8b949e] text-xs sm:text-sm mt-0.5">
          {isEn
            ? "Core technologies and platforms used across production systems."
            : "Linguagens, frameworks e ferramentas que utilizo no dia a dia em produção."}
        </p>
      </div>

      {/* Grid de 4 Categorias */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full">
        {stackCategories.map((cat, idx) => (
          <div
            key={idx}
            className="flex flex-col bg-[#161b22] border border-[#30363d] rounded-xl p-4 hover:border-[#58a6ff]/40 transition-colors"
          >
            {/* Cabeçalho da Categoria */}
            <div className="flex items-center gap-2 mb-3 pb-2.5 border-b border-[#21262d]">
              <div className="p-1.5 rounded-md bg-[#0d1117] border border-[#30363d]">
                {cat.categoryIcon}
              </div>
              <h3 className="font-semibold text-xs sm:text-sm text-[#f0f6fc]">
                {cat.title}
              </h3>
            </div>

            {/* Lista Limpa das Tecnologias: Apenas Ícone + Nome */}
            <div className="flex flex-wrap gap-1.5">
              {cat.items.map((tech, techIdx) => (
                <div
                  key={techIdx}
                  className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#0d1117] border border-[#21262d] hover:border-[#30363d] transition-colors"
                >
                  <span className="shrink-0">{tech.icon}</span>
                  <span className="text-xs font-medium text-[#f0f6fc]">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TechStackGrid
