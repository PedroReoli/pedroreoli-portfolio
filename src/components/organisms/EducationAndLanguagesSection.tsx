import React from "react"
import { motion } from "framer-motion"
import * as portfolioPT from "../../data/portfolio"
import * as portfolioEN from "../../data/portfolio.en"
import { FiBookOpen, FiGlobe, FiAward, FiCheckCircle, FiArrowRight } from "react-icons/fi"
import { FaWhatsapp } from "react-icons/fa"
import { useLanguage } from "../../i18n/useLanguage"

export const EducationAndLanguagesSection: React.FC = () => {
  const { language } = useLanguage()
  const data = language === "pt" ? portfolioPT : portfolioEN
  const { languages, educationList, academicLeadership, profile } = data

  const labels = language === "pt"
    ? {
        kicker: "FORMAÇÃO & COMUNICAÇÃO // BASE TÉCNICA",
        title: "Formação & Idiomas",
        description: "Fundamentos sólidos em Sistemas de Informação, especialização técnica em engenharia de front-end e comunicação profissional.",
        educationTitle: "Formação Acadêmica & Especializações",
        languagesTitle: "Idiomas & Liderança Técnica",
        workingLanguages: "Idiomas de Trabalho",
        ctaTitle: "Buscando liderança técnica ou engenharia de alta complexidade?",
        ctaDesc: "Disponível para engenharia de ecossistemas corporativos ERP, arquitetura de front-end e plataformas SaaS.",
        ctaBtn: "Conversar no WhatsApp",
      }
    : {
        kicker: "ACADEMIC FOUNDATION & COMMUNICATION",
        title: "Education & Languages",
        description: "Solid foundations in Information Systems, frontend engineering specialization, and global technical communication.",
        educationTitle: "Academic Background & Specializations",
        languagesTitle: "Languages & Technical Leadership",
        workingLanguages: "Working Languages",
        ctaTitle: "Looking for technical leadership or high-complexity engineering?",
        ctaDesc: "Available for enterprise ERP ecosystems, frontend architecture, and production SaaS platforms.",
        ctaBtn: "Chat on WhatsApp",
      }

  return (
    <section 
      id="education" 
      className="w-full min-h-[100dvh] flex flex-col justify-center py-20 sm:py-28 bg-[#07080b] text-[#ffffff] border-b border-white/[0.06] relative overflow-hidden scroll-mt-16 sm:scroll-mt-20"
    >
      {/* Luz ambiente sutil monocromática */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-500/[0.03] rounded-full blur-[160px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10 w-full my-auto">
        
        {/* Cabeçalho da Seção */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#10b981] uppercase tracking-wider font-semibold mb-2">
            <FiBookOpen className="text-sm" />
            <span>{labels.kicker}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white tracking-tight">
            {labels.title}
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mt-2 font-sans leading-relaxed">
            {labels.description}
          </p>
        </motion.div>

        {/* Grid de 2 Colunas Simétricas e Elegantes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch mb-10">
          
          {/* =========================================================================
              COLUNA ESQUERDA: FORMAÇÃO ACADÊMICA & ESPECIALIZAÇÕES
              ========================================================================= */}
          <div className="flex flex-col space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-wider font-semibold">
              <FiAward className="text-[#10b981] text-sm" />
              <span>{labels.educationTitle}</span>
            </div>

            {educationList.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.35, delay: idx * 0.05, ease: "easeOut" }}
                className="p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-[#0c0f16] border border-white/[0.08] hover:border-white/20 transition-all shadow-xl flex-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span className="text-xs font-mono text-[#10b981] font-semibold">
                      {item.period} • {item.status}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-heading font-extrabold text-white leading-snug">
                    {item.degree}
                  </h3>

                  <p className="text-xs font-mono text-zinc-400 mt-1 mb-4">
                    {item.institution}
                  </p>
                </div>

                {item.details && item.details.length > 0 && (
                  <div className="pt-4 border-t border-white/[0.06] space-y-2 text-xs text-zinc-300 font-sans">
                    {item.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2.5">
                        <FiCheckCircle className="text-[#10b981] w-3.5 h-3.5 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{detail}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* =========================================================================
              COLUNA DIREITA: IDIOMAS & LIDERANÇA TÉCNICA
              ========================================================================= */}
          <div className="flex flex-col space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-wider font-semibold">
              <FiGlobe className="text-[#10b981] text-sm" />
              <span>{labels.languagesTitle}</span>
            </div>

            {/* Card 1: Idiomas & Fluência */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-[#0c0f16] border border-white/[0.08] hover:border-white/20 transition-all shadow-xl flex-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="text-xs font-mono text-[#10b981] font-semibold">
                    Global Communication
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-heading font-extrabold text-white leading-snug mb-1">
                  {labels.workingLanguages}
                </h3>
                <p className="text-xs font-mono text-zinc-400 mb-4">
                  Comunicação técnica e documentação formal de arquitetura
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.06] space-y-4">
                {languages.map((lang, lIdx) => (
                  <div key={lIdx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <strong className="text-white text-sm font-heading">{lang.name}</strong>
                      <span className="text-[#10b981] font-semibold">{lang.level}</span>
                    </div>
                    <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                      {lang.info}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Card 2: Liderança Técnica & Mentoria SEBRAE */}
            {academicLeadership.map((lead, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.35, delay: 0.08, ease: "easeOut" }}
                className="p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-[#0c0f16] border border-white/[0.08] hover:border-white/20 transition-all shadow-xl flex-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span className="text-xs font-mono text-[#10b981] font-semibold">
                      {lead.period}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-heading font-extrabold text-white leading-snug">
                    {lead.title}
                  </h3>

                  <p className="text-xs font-mono text-zinc-400 mt-1 mb-3">
                    {lead.organization}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] text-xs text-zinc-300 font-sans leading-relaxed">
                  {lead.info}
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Faixa Inferior de Conversão Executiva */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#0c0f16] border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-5 shadow-2xl"
        >
          <div className="max-w-2xl">
            <h3 className="text-base sm:text-lg font-heading font-bold text-white mb-1">
              {labels.ctaTitle}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
              {labels.ctaDesc}
            </p>
          </div>

          <a
            href={profile.phoneHref}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3.5 rounded-xl bg-[#10b981] hover:bg-[#059669] text-black font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] shrink-0"
          >
            <FaWhatsapp className="text-black text-lg" />
            <span>{labels.ctaBtn}</span>
            <FiArrowRight className="text-black text-sm" />
          </a>
        </motion.div>

      </div>
    </section>
  )
}

export default EducationAndLanguagesSection
