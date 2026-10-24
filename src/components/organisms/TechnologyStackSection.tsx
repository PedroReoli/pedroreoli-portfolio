import React from "react"
import { Component, Network } from "lucide-react"
import { FaAws } from "react-icons/fa6"
import {
  SiAmazonapigateway,
  SiAngular,
  SiDocker,
  SiDotnet,
  SiExpress,
  SiFastify,
  SiGraphql,
  SiGithubactions,
  SiGooglegemini,
  SiJsonwebtokens,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenai,
  SiPostgresql,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTauri,
  SiTypescript,
} from "react-icons/si"
import { useLanguage } from "../../i18n/useLanguage"
import Reveal from "../atoms/Reveal"
import SlideSection from "../atoms/SlideSection"

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
      { name: "Angular", icon: <SiAngular />, color: "text-[#dd0031]" },
      { name: "Tailwind", icon: <SiTailwindcss />, color: "text-[#06b6d4]" },
      { name: "Design System", icon: <Component />, color: "text-[#514c47]" },
    ],
  },
  {
    number: "02",
    title: { pt: "Back-end", en: "Back-end" },
    tools: [
      { name: "Node.js", icon: <SiNodedotjs />, color: "text-[#339933]" },
      { name: "NestJS", icon: <SiNestjs />, color: "text-[#e0234e]" },
      { name: "Express", icon: <SiExpress />, color: "text-[#111010]" },
      { name: "Fastify", icon: <SiFastify />, color: "text-[#111010]" },
      { name: "PostgreSQL", icon: <SiPostgresql />, color: "text-[#4169e1]" },
      { name: "Supabase", icon: <SiSupabase />, color: "text-[#3ecf8e]" },
    ],
  },
  {
    number: "03",
    title: { pt: "Cloud & apps", en: "Cloud & apps" },
    tools: [
      { name: "AWS", icon: <FaAws />, color: "text-[#d97706]" },
      { name: "API Gateway", icon: <SiAmazonapigateway />, color: "text-[#ff4f8b]" },
      { name: "Docker", icon: <SiDocker />, color: "text-[#2496ed]" },
      { name: "Actions", icon: <SiGithubactions />, color: "text-[#2088ff]" },
      { name: "Tauri", icon: <SiTauri />, color: "text-[#168a96]" },
      { name: ".NET", icon: <SiDotnet />, color: "text-[#512bd4]" },
    ],
  },
  {
    number: "04",
    title: { pt: "IA & APIs", en: "AI & APIs" },
    tools: [
      { name: "OpenAI", icon: <SiOpenai />, color: "text-[#087f5b]" },
      {
        name: "Claude",
        icon: (
          <img src="/brands/claude.svg" alt="" width={24} height={24} className="h-[1em] w-[1em]" />
        ),
        color: "text-[#b45309]",
      },
      { name: "Gemini", icon: <SiGooglegemini />, color: "text-[#1a73e8]" },
      { name: "MCP", icon: <Network />, color: "text-[#705cf6]" },
      { name: "JWT / RBAC", icon: <SiJsonwebtokens />, color: "text-[#6b21a8]" },
      { name: "GraphQL", icon: <SiGraphql />, color: "text-[#e10098]" },
    ],
  },
]

export const TechnologyStackSection: React.FC = () => {
  const { language } = useLanguage()
  const isEn = language === "en"

  return (
    <SlideSection
      id="stack"
      data-scroll-scene
      className="viewport-stage stack-stage min-h-screen bg-[#edeae4] text-[#111010]"
    >
      <div className="editorial-container stack-stage-layout">
        <Reveal
          distance={14}
          duration={0.55}
          className="stack-stage-heading grid gap-4 border-b border-black/25 pb-4 sm:grid-cols-[1fr_auto] sm:items-end sm:pb-6"
        >
          <div>
            <p className="editorial-label mb-2 text-[#5f5b56]">
              04 / {isEn ? "Production toolkit" : "Ferramentas de produção"}
            </p>
            <h2 className="stack-index-title font-black uppercase">
              {isEn ? (
                <>
                  MY <span className="stack-title-outline">STACK.</span>
                </>
              ) : (
                <>
                  MINHA <span className="stack-title-outline">STACK.</span>
                </>
              )}
            </h2>
          </div>
          <p className="stack-intro-copy max-w-xs text-sm leading-relaxed text-[#5f5b56] sm:text-right">
            {isEn
              ? "Frontend, APIs, cloud and AI tools used in my work."
              : "Frontend, APIs, cloud e ferramentas de IA que uso no trabalho."}
          </p>
        </Reveal>

        <div
          className="stack-lanes min-h-0"
          role="list"
          aria-label={isEn ? "Technology stack" : "Stack de tecnologia"}
        >
          {stackGroups.map((group, index) => (
            <Reveal
              key={group.number}
              className="min-h-0"
              role="listitem"
              amount={0.04}
              delay={0.08 + index * 0.07}
              distance={18}
              duration={0.58}
            >
              <article className="stack-lane h-full">
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
            </Reveal>
          ))}
        </div>
      </div>
    </SlideSection>
  )
}

export default TechnologyStackSection
