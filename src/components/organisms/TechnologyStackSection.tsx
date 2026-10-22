import React from "react"
import { Network } from "lucide-react"
import { FaAws } from "react-icons/fa6"
import {
  SiAnthropic,
  SiDocker,
  SiDotnet,
  SiGithubactions,
  SiGooglegemini,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenai,
  SiPostgresql,
  SiReact,
  SiTailwindcss,
  SiTauri,
  SiTypescript,
} from "react-icons/si"
import { useLanguage } from "../../i18n/useLanguage"
import Reveal from "../atoms/Reveal"
import SectionCurtain from "../atoms/SectionCurtain"

interface StackTool {
  name: string
  icon: React.ReactNode
  color: string
}

interface StackGroup {
  number: string
  title: { pt: string; en: string }
  tools: StackTool[]
}

const stackGroups: StackGroup[] = [
  {
    number: "01",
    title: { pt: "Interfaces", en: "Interfaces" },
    tools: [
      { name: "React", icon: <SiReact />, color: "text-[#087ea4]" },
      { name: "TypeScript", icon: <SiTypescript />, color: "text-[#3178c6]" },
      { name: "Next.js", icon: <SiNextdotjs />, color: "text-[#111010]" },
      { name: "Tailwind", icon: <SiTailwindcss />, color: "text-[#06b6d4]" },
    ],
  },
  {
    number: "02",
    title: { pt: "Back-end", en: "Back-end" },
    tools: [
      { name: "Node.js", icon: <SiNodedotjs />, color: "text-[#339933]" },
      { name: "NestJS", icon: <SiNestjs />, color: "text-[#e0234e]" },
      { name: "PostgreSQL", icon: <SiPostgresql />, color: "text-[#4169e1]" },
      { name: ".NET", icon: <SiDotnet />, color: "text-[#512bd4]" },
    ],
  },
  {
    number: "03",
    title: { pt: "Entrega", en: "Delivery" },
    tools: [
      { name: "AWS", icon: <FaAws />, color: "text-[#d97706]" },
      { name: "Docker", icon: <SiDocker />, color: "text-[#2496ed]" },
      { name: "Actions", icon: <SiGithubactions />, color: "text-[#2088ff]" },
      { name: "Tauri", icon: <SiTauri />, color: "text-[#168a96]" },
    ],
  },
  {
    number: "04",
    title: { pt: "Engenharia de IA", en: "AI engineering" },
    tools: [
      { name: "OpenAI", icon: <SiOpenai />, color: "text-[#087f5b]" },
      { name: "Claude", icon: <SiAnthropic />, color: "text-[#b45309]" },
      { name: "Gemini", icon: <SiGooglegemini />, color: "text-[#1a73e8]" },
      { name: "MCP", icon: <Network />, color: "text-[#705cf6]" },
    ],
  },
]

export const TechnologyStackSection: React.FC = () => {
  const { language } = useLanguage()
  const isEn = language === "en"

  return (
    <section id="stack" className="viewport-stage stack-stage bg-[#edeae4] text-[#111010]">
      <SectionCurtain background="#edeae4" accent="#111010" />
      <div className="editorial-container stack-stage-layout">
        <Reveal className="stack-stage-heading grid gap-4 border-b border-black/25 pb-4 sm:grid-cols-[1fr_auto] sm:items-end sm:pb-6">
          <div>
            <p className="editorial-label mb-2 text-[#5f5b56]">
              03 / {isEn ? "Production toolkit" : "Ferramentas de produção"}
            </p>
            <h2 className="stack-index-title font-black uppercase">
              {isEn ? (
                <>
                  BUILT TO <span className="stack-title-outline">SHIP.</span>
                </>
              ) : (
                <>
                  STACK PARA <span className="stack-title-outline">ENTREGAR.</span>
                </>
              )}
            </h2>
          </div>
          <p className="stack-intro-copy max-w-xs text-sm leading-relaxed text-[#5f5b56] sm:text-right">
            {isEn
              ? "A concise toolkit for interfaces, systems and agents."
              : "Um conjunto direto para interfaces, sistemas e agentes."}
          </p>
        </Reveal>

        <Reveal
          className="stack-lanes min-h-0"
          role="list"
          ariaLabel={isEn ? "Technology stack" : "Stack de tecnologia"}
          amount={0.12}
          delay={0.1}
        >
          {stackGroups.map((group) => (
            <article key={group.number} className="stack-lane" role="listitem">
              <div className="stack-lane-heading">
                <span className="editorial-label text-[#5f5b56]">{group.number}</span>
                <h3 className="stack-lane-title font-bold tracking-[-0.05em]">
                  {isEn ? group.title.en : group.title.pt}
                </h3>
              </div>
              <div className="stack-lane-tools">
                {group.tools.map((tool) => (
                  <div key={tool.name} className="stack-tool">
                    <span className={`stack-brand-icon ${tool.color}`} aria-hidden="true">
                      {tool.icon}
                    </span>
                    <strong>{tool.name}</strong>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

export default TechnologyStackSection
