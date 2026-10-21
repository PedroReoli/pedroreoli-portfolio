import React from "react"
import { Bot, Network } from "lucide-react"
import { FaAws } from "react-icons/fa6"
import {
  SiDocker,
  SiGithubactions,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si"
import Reveal from "../atoms/Reveal"
import { useLanguage } from "../../i18n/useLanguage"

const stackGroups = [
  {
    number: "01",
    titlePt: "Interfaces",
    titleEn: "Interfaces",
    items: [
      { name: "React", icon: <SiReact />, color: "text-[#087ea4]" },
      { name: "TypeScript", icon: <SiTypescript />, color: "text-[#3178c6]" },
      { name: "Next.js", icon: <SiNextdotjs />, color: "text-[#111010]" },
      { name: "Tailwind", icon: <SiTailwindcss />, color: "text-[#06b6d4]" },
    ],
  },
  {
    number: "02",
    titlePt: "Back-end",
    titleEn: "Back-end",
    items: [
      { name: "Node.js", icon: <SiNodedotjs />, color: "text-[#339933]" },
      { name: "NestJS", icon: <SiNestjs />, color: "text-[#e0234e]" },
      { name: "PostgreSQL", icon: <SiPostgresql />, color: "text-[#4169e1]" },
    ],
  },
  {
    number: "03",
    titlePt: "Entrega",
    titleEn: "Delivery",
    items: [
      { name: "Docker", icon: <SiDocker />, color: "text-[#2496ed]" },
      { name: "AWS", icon: <FaAws />, color: "text-[#ff9900]" },
      { name: "GitHub Actions", icon: <SiGithubactions />, color: "text-[#2088ff]" },
    ],
  },
  {
    number: "04",
    titlePt: "Inteligência",
    titleEn: "Intelligence",
    items: [
      { name: "AI Agents", icon: <Bot />, color: "text-[#705cf6]" },
      { name: "MCP", icon: <Network />, color: "text-[#111010]" },
    ],
  },
]

export const TechnologyStackSection: React.FC = () => {
  const { language } = useLanguage()
  const isEn = language === "en"

  return (
    <section className="viewport-stage stack-stage bg-[#edeae4] text-[#111010]">
      <div className="editorial-container stack-stage-layout">
        <Reveal className="stack-stage-heading grid gap-5 border-b border-black/25 pb-5 sm:grid-cols-[1fr_auto] sm:items-end sm:pb-7">
          <div>
            <p className="editorial-label mb-3 text-[#5f5b56]">
              03 / {isEn ? "Production toolkit" : "Ferramentas de produção"}
            </p>
            <h2 className="stack-index-title font-black uppercase">
              {isEn ? <>BUILT TO <span className="stack-title-outline">SHIP.</span></> : <>STACK PARA <span className="stack-title-outline">ENTREGAR.</span></>}
            </h2>
          </div>
          <div className="flex items-end justify-between gap-6 sm:block sm:text-right">
            <p className="editorial-label text-[#5f5b56]">12 / {isEn ? "tools" : "ferramentas"}</p>
            <p className="stack-intro-copy mt-2 max-w-xs text-sm leading-relaxed text-[#5f5b56]">
              {isEn ? "Choices that keep the work moving." : "Escolhas que mantêm o trabalho em movimento."}
            </p>
          </div>
        </Reveal>

        <div className="stack-lanes min-h-0" role="list" aria-label={isEn ? "Technology stack" : "Stack de tecnologia"}>
          {stackGroups.map((group, index) => (
            <Reveal key={group.number} delay={index * 0.045} distance={18} className="stack-lane group" role="listitem">
              <div className="stack-lane-heading">
                <span className="editorial-label text-[#5f5b56]">{group.number}</span>
                <h3 className="stack-lane-title font-bold tracking-[-0.05em]">{isEn ? group.titleEn : group.titlePt}</h3>
              </div>
              <div className="stack-lane-tools">
                {group.items.map((item) => (
                  <div key={item.name} className="stack-tool">
                    <span className={`stack-brand-icon ${item.color}`} aria-hidden="true">{item.icon}</span>
                    <strong>{item.name}</strong>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechnologyStackSection
