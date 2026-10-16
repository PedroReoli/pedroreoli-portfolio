import React from "react"
import { motion } from "framer-motion"
import * as portfolioPT from "../../data/portfolio"
import * as portfolioEN from "../../data/portfolio.en"
import { 
  FiBriefcase, 
  FiCalendar, 
  FiMapPin, 
  FiCheckCircle, 
} from "react-icons/fi"
import { useLanguage } from "../../i18n/useLanguage"

export const GitHubExperienceSection: React.FC = () => {
  const { language } = useLanguage()
  const data = language === "pt" ? portfolioPT : portfolioEN
  const { experiences } = data

  const labels = language === "pt"
    ? {
        kicker: "TRAJETÓRIA PROFISSIONAL // ENGENHARIA",
        title: "Experiência de Engenharia",
        description: "Mais de 4 anos atuando na concepção de ecossistemas corporativos ERP, arquitetura frontend e plataformas SaaS em produção.",
      }
    : {
        kicker: "CAREER TIMELINE // ENGINEERING",
        title: "Engineering Experience",
        description: "Over 4 years engineering enterprise ERP ecosystems, frontend architecture, and SaaS platforms deployed to production.",
      }

  return (
    <section 
      id="experience" 
      className="w-full min-h-[100dvh] flex flex-col justify-center py-20 sm:py-28 bg-[#07080b] text-[#ffffff] border-b border-white/[0.06] relative overflow-hidden scroll-mt-16 sm:scroll-mt-20"
    >
      {/* Luz ambiente sutil monocromática */}
      <div 
        className="absolute top-1/3 left-0 w-[500px] h-[400px] bg-emerald-500/[0.03] rounded-full blur-[160px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10 w-full my-auto">
        
        {/* Cabeçalho da Seção */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4 }}
          className="mb-14 sm:mb-18"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#10b981] uppercase tracking-wider font-semibold mb-2">
            <FiBriefcase className="text-sm" />
            <span>{labels.kicker}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white tracking-tight">
            {labels.title}
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mt-2 font-sans leading-relaxed">
            {labels.description}
          </p>
        </motion.div>

        {/* Linha do Tempo Vertical Limpa e Contínua (Paleta Unificada Esmeralda, Zero Cores Conflitantes) */}
        <div className="relative pl-7 sm:pl-10 before:absolute before:left-2 sm:before:left-3 before:top-4 before:bottom-4 before:w-[2px] before:bg-white/[0.08] space-y-10 sm:space-y-12">
          
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="relative group"
            >
              {/* Marcador luminoso na linha do tempo */}
              <div className="absolute -left-[32px] sm:-left-[43px] top-6 w-3.5 h-3.5 rounded-full bg-[#10b981] ring-4 ring-[#07080b] shadow-[0_0_12px_rgba(16,185,129,0.8)] transition-transform group-hover:scale-125" />

              {/* Card Executivo com Espaçamento Amplo e Sem Poluição de Badges */}
              <div className="p-7 sm:p-9 rounded-2xl sm:rounded-3xl bg-[#0c0f16] border border-white/[0.08] hover:border-white/20 transition-all duration-300 shadow-xl">
                
                {/* Cabeçalho do Card */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-white tracking-tight">
                      {exp.company}
                    </h3>
                    <p className="text-sm sm:text-base font-heading font-semibold text-[#10b981] mt-0.5">
                      {exp.role}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-zinc-300">
                      <FiCalendar className="text-[#10b981] text-xs" />
                      <span>{exp.period}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-zinc-400">
                      <FiMapPin className="text-zinc-500 text-xs" />
                      <span>{exp.location}</span>
                    </span>
                  </div>
                </div>

                {/* Contexto da Posição */}
                <p className="text-sm text-zinc-300 leading-relaxed font-sans mb-6">
                  {exp.context}
                </p>

                {/* Entregas Técnicas de Alto Impacto */}
                <div className="space-y-3 mb-7">
                  {exp.achievements.map((ach, aIdx) => (
                    <div key={aIdx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                      <FiCheckCircle className="text-[#10b981] w-4 h-4 shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>

                {/* Stack Tecnológica - Tipografia Linear Limpa sem Badges Poluídos */}
                <div className="pt-5 border-t border-white/[0.06] flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono">
                  <span className="text-zinc-500 uppercase tracking-wider text-[11px] font-semibold mr-1">
                    Stack:
                  </span>
                  <span className="text-zinc-300 font-medium">
                    {exp.stack.join(" • ")}
                  </span>
                </div>

              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  )
}

export default GitHubExperienceSection
