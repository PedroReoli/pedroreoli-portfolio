import React, { useState } from "react"
import { AnimatePresence, m, useReducedMotion } from "framer-motion"
import { experienceItems } from "../../content/homeContent"
import { useLanguage } from "../../i18n/useLanguage"
import Reveal from "../atoms/Reveal"

export const ExperienceSection: React.FC = () => {
  const { language } = useLanguage()
  const isEn = language === "en"
  const reduceMotion = useReducedMotion()
  const [activeExperience, setActiveExperience] = useState<number | null>(null)

  return (
    <section className="viewport-stage trajectory-stage">
      <div className="editorial-container trajectory-stage-layout">
        <Reveal className="trajectory-intro flex min-h-0 flex-col justify-between border-b border-white/15 pb-4 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-10">
          <div>
            <p className="editorial-label text-[#82aaff]">05 / {isEn ? "Experience" : "Experiência"}</p>
            <p className="editorial-label mt-3 text-[#8d8984]">04 / {isEn ? "chapters" : "capítulos"}</p>
          </div>
          <div>
            <h2 className="trajectory-title font-black uppercase text-[#edeae4]">
              {isEn ? <>JOUR<span className="text-outline">NEY.</span></> : <>TRAJE<span className="text-outline">TÓRIA.</span></>}
            </h2>
            <p className="trajectory-summary mt-4 max-w-md leading-relaxed text-[#8d8984]">
              {isEn ? "Four contexts that shaped how I decide, collaborate and build." : "Quatro contextos que moldaram minha forma de decidir, colaborar e construir."}
            </p>
          </div>
        </Reveal>

        <div className="trajectory-list min-h-0">
          {experienceItems.map((item, index) => (
            <Reveal key={`${item.period.pt}-${item.company}`} delay={index * 0.05} distance={20}>
              <div className="trajectory-row group relative border-b border-white/10" onMouseEnter={() => setActiveExperience(index)} onMouseLeave={() => setActiveExperience(null)} onFocus={() => setActiveExperience(index)} onBlur={() => setActiveExperience(null)}>
                <button type="button" className="trajectory-row-button relative grid w-full text-left" aria-expanded={activeExperience === index} onClick={() => setActiveExperience((current) => current === index ? null : index)}>
                  <span className={`trajectory-dot ${activeExperience === index ? "trajectory-dot-active" : ""}`} aria-hidden="true" />
                  <span className="editorial-label text-[#8d8984]">{isEn ? item.period.en : item.period.pt}</span>
                  <span className="min-w-0">
                    <strong className="trajectory-company block tracking-[-0.045em] text-[#edeae4] transition-transform duration-300 group-hover:translate-x-2">{item.company}</strong>
                    <span className="trajectory-role mt-1 block text-[#8d8984]">{isEn ? item.role.en : item.role.pt}</span>
                  </span>
                  <span className="editorial-label text-[#82aaff]" aria-hidden="true">{activeExperience === index ? "×" : "+"}</span>
                </button>

                <AnimatePresence>
                  {activeExperience === index && (
                    <m.aside
                      initial={reduceMotion ? false : { opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.22 }}
                      className={`experience-popover z-20 bg-[#edeae4] p-4 text-[#111010] shadow-2xl ${index > 1 ? "experience-popover-up" : ""}`}
                    >
                      <p className="editorial-label mb-2 text-[#5f5b56]">{item.company} / {isEn ? item.period.en : item.period.pt}</p>
                      <p className="text-sm leading-relaxed">{isEn ? item.description.en : item.description.pt}</p>
                    </m.aside>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection
