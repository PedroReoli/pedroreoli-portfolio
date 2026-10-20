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

const stackItems = [
  { name: "React", area: "Interface", icon: <SiReact />, color: "text-[#087ea4]" },
  { name: "TypeScript", area: "Language", icon: <SiTypescript />, color: "text-[#3178c6]" },
  { name: "Next.js", area: "Web", icon: <SiNextdotjs />, color: "text-[#111010]" },
  { name: "Tailwind", area: "Design", icon: <SiTailwindcss />, color: "text-[#06b6d4]" },
  { name: "Node.js", area: "Runtime", icon: <SiNodedotjs />, color: "text-[#339933]" },
  { name: "NestJS", area: "Back-end", icon: <SiNestjs />, color: "text-[#e0234e]" },
  { name: "PostgreSQL", area: "Data", icon: <SiPostgresql />, color: "text-[#4169e1]" },
  { name: "Docker", area: "Infra", icon: <SiDocker />, color: "text-[#2496ed]" },
  { name: "AWS", area: "Cloud", icon: <FaAws />, color: "text-[#ff9900]" },
  { name: "GitHub Actions", area: "CI / CD", icon: <SiGithubactions />, color: "text-[#2088ff]" },
  { name: "AI Agents", area: "Intelligence", icon: <Bot />, color: "text-[#705cf6]" },
  { name: "MCP", area: "Protocol", icon: <Network />, color: "text-[#111010]" },
]

export const StitchStackSection: React.FC = () => {
  const { language } = useLanguage()
  const isEn = language === "en"

  return (
    <section className="stack-stage h-[100svh] overflow-hidden bg-[#edeae4] text-[#111010]">
      <div className="editorial-container stack-stage-layout">
        <Reveal className="grid gap-5 border-b border-black/25 pb-6 sm:grid-cols-[1fr_auto] sm:items-end sm:pb-8">
          <div>
            <p className="editorial-label mb-4 text-[#5f5b56]">
              {isEn ? "Production toolkit" : "Ferramentas de produção"}
            </p>
            <h2 className="stack-index-title font-black uppercase">
              {isEn ? <>BUILT TO<br />SHIP.</> : <>STACK PARA<br />ENTREGAR.</>}
            </h2>
          </div>
          <p className="stack-intro-copy max-w-sm text-sm leading-relaxed text-[#5f5b56] sm:pb-1 sm:text-base">
            {isEn
              ? "Technologies chosen to take products from interface to infrastructure."
              : "Tecnologias escolhidas para levar produtos da interface à infraestrutura."}
          </p>
        </Reveal>

        <div className="stack-icon-grid grid min-h-0 grid-cols-3 sm:grid-cols-4">
          {stackItems.map((item, index) => (
            <Reveal
              key={item.name}
              delay={(index % 4) * 0.035}
              distance={18}
              className="stack-icon-item group relative flex min-h-0 flex-col justify-between border-b border-r border-black/20 p-3 sm:p-5"
            >
              <span className={`stack-brand-icon text-3xl transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110 sm:text-4xl lg:text-5xl ${item.color}`}>
                {item.icon}
              </span>
              <div className="mt-4">
                <strong className="block text-[11px] leading-tight tracking-[-0.02em] sm:text-sm">{item.name}</strong>
                <span className="editorial-label mt-1 block text-[8px] text-[#77716a] sm:text-[9px]">{item.area}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StitchStackSection
