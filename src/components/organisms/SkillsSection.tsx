import React from "react"
import { motion } from "framer-motion"
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiRadixui,
  SiReactquery,
  SiNodedotjs,
  SiExpress,
  SiDotnet,
  SiOpenapiinitiative,
  SiPostgresql,
  SiMysql,
  SiSupabase,
  SiDocker,
  SiGithub,
  SiElectron,
  SiTauri,
  SiOpenai,
  SiPuppeteer,
} from "react-icons/si"
import { FiCpu, FiCode, FiDatabase, FiLayers, FiZap, FiShield, FiCloud } from "react-icons/fi"
import { useLanguage } from "../../i18n/useLanguage"
import * as portfolioPT from "../../data/portfolio"
import * as portfolioEN from "../../data/portfolio.en"

const renderIcon = (iconName: string) => {
  const props = { className: "w-4 h-4 shrink-0 text-[#10b981]" }
  switch (iconName) {
    case "SiTauri":
      return <SiTauri {...props} />
    case "SiReact":
      return <SiReact {...props} />
    case "SiNextdotjs":
      return <SiNextdotjs {...props} />
    case "SiTypescript":
      return <SiTypescript {...props} />
    case "SiTailwindcss":
      return <SiTailwindcss {...props} />
    case "SiRadixui":
      return <SiRadixui {...props} />
    case "SiReactquery":
      return <SiReactquery {...props} />
    case "SiNodedotjs":
      return <SiNodedotjs {...props} />
    case "SiExpress":
      return <SiExpress {...props} />
    case "SiDotnet":
      return <SiDotnet {...props} />
    case "SiOpenapiinitiative":
      return <SiOpenapiinitiative {...props} />
    case "SiPostgresql":
      return <SiPostgresql {...props} />
    case "SiMysql":
      return <SiMysql {...props} />
    case "SiSupabase":
      return <SiSupabase {...props} />
    case "SiDocker":
      return <SiDocker {...props} />
    case "SiGithub":
      return <SiGithub {...props} />
    case "SiElectron":
      return <SiElectron {...props} />
    case "SiOpenai":
      return <SiOpenai {...props} />
    case "SiPuppeteer":
      return <SiPuppeteer {...props} />
    case "FiDatabase":
      return <FiDatabase {...props} />
    case "FiLayers":
      return <FiLayers {...props} />
    case "FiCpu":
      return <FiCpu {...props} />
    case "FiZap":
      return <FiZap {...props} />
    case "FiShield":
      return <FiShield {...props} />
    case "FiCloud":
      return <FiCloud {...props} />
    default:
      return <FiCode {...props} />
  }
}

export const SkillsSection: React.FC = () => {
  const { language } = useLanguage()
  const skills = language === "pt" ? portfolioPT.skills : portfolioEN.skills

  const labels = language === "pt"
    ? {
        kicker: "STACK TÉCNICA & ENGENHARIA",
        title: "Tecnologias & Especialidades",
        description: "Domínio prático de ferramentas, linguagens, bancos e frameworks utilizados em ecossistemas corporativos de alta escala.",
      }
    : {
        kicker: "TECH STACK & ENGINEERING",
        title: "Technologies & Core Specialties",
        description: "Hands-on mastery of frameworks, databases, and engineering tools applied across enterprise production ecosystems.",
      }

  return (
    <section 
      id="skills" 
      className="w-full min-h-[100dvh] flex flex-col justify-center py-20 sm:py-28 bg-[#07080b] text-[#ffffff] border-b border-white/[0.06] relative overflow-hidden scroll-mt-16 sm:scroll-mt-20"
    >
      {/* Luz ambiente sutil */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-500/[0.025] rounded-full blur-[160px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10 w-full my-auto">
        
        {/* Cabeçalho da Seção */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#10b981] uppercase tracking-wider font-semibold mb-2">
            <FiCpu className="text-[#10b981]" />
            <span>{labels.kicker}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white tracking-tight">
            {labels.title}
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mt-2 font-sans leading-relaxed">
            {labels.description}
          </p>
        </motion.div>

        {/* Grid Simétrico de 4 Colunas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {skills.map((group, groupIdx) => (
            <motion.div
              key={groupIdx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.35, delay: groupIdx * 0.05, ease: "easeOut" }}
              className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#0c0f16] border border-white/[0.08] hover:border-white/20 transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4 pb-3 border-b border-white/[0.08] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                  <span>{group.category}</span>
                </h3>

                <div className="space-y-3">
                  {group.items.map((item, itemIdx) => (
                    <div 
                      key={itemIdx} 
                      className="p-3 rounded-xl bg-black/40 border border-white/[0.05] hover:border-white/15 transition-colors"
                    >
                      <div className="flex items-center gap-2.5 mb-1">
                        {renderIcon(item.icon)}
                        <strong className="text-xs font-heading font-bold text-white tracking-tight">
                          {item.name}
                        </strong>
                      </div>
                      <p className="text-[11px] text-zinc-400 font-sans leading-relaxed pl-6">
                        {item.usage}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default SkillsSection
