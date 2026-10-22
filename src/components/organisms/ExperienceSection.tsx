import React, { useState } from "react"
import { AnimatePresence, m, useReducedMotion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { experienceItems } from "../../content/homeContent"
import { useLanguage } from "../../i18n/useLanguage"
import Reveal from "../atoms/Reveal"
import SectionCurtain from "../atoms/SectionCurtain"

export const ExperienceSection: React.FC = () => {
  const { language } = useLanguage()
  const isEn = language === "en"
  const reduceMotion = Boolean(useReducedMotion())
  const [activeExperience, setActiveExperience] = useState(0)
  const activeItem = experienceItems[activeExperience]

  return (
    <section
      id="experiencia"
      className="viewport-stage trajectory-stage bg-[#111010] text-[#edeae4]"
    >
      <SectionCurtain />
      <div className="editorial-container experience-stage-layout">
        <Reveal className="experience-stage-heading flex items-end justify-between gap-5 border-b border-white/15 pb-4">
          <div>
            <p className="editorial-label mb-2 text-[#82aaff]">
              05 / {isEn ? "Experience" : "Experiência"}
            </p>
            <h2 className="experience-stage-title font-black uppercase tracking-[-0.065em]">
              {isEn ? "JOURNEY." : "TRAJETÓRIA."}
            </h2>
          </div>
          <p className="hidden max-w-sm text-right text-sm leading-relaxed text-[#96918b] sm:block">
            {isEn
              ? "Five contexts that shaped how I decide, collaborate and build."
              : "Cinco contextos que moldaram minha forma de decidir, colaborar e construir."}
          </p>
        </Reveal>

        <div className="experience-stage-content min-h-0">
          <Reveal
            className="experience-index min-h-0 border-b border-white/10 lg:border-b-0 lg:border-r lg:pr-8"
            amount={0.12}
            delay={0.08}
          >
            <div className="grid h-full grid-rows-5" role="list">
              {experienceItems.map((item, index) => {
                const isActive = activeExperience === index

                return (
                  <div
                    key={`${item.company}-${item.period.pt}`}
                    role="listitem"
                    className="min-h-0"
                  >
                    <button
                      type="button"
                      aria-pressed={isActive}
                      aria-controls="experience-detail"
                      onClick={() => setActiveExperience(index)}
                      onMouseEnter={() => setActiveExperience(index)}
                      className="experience-index-row group grid h-full w-full min-h-0 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b border-white/10 text-left"
                    >
                      <span
                        className={`h-2 w-2 rounded-full transition-colors duration-200 ${
                          isActive ? "bg-[#82aaff] shadow-[0_0_10px_#82aaff]" : "bg-white/25"
                        }`}
                        aria-hidden="true"
                      />
                      <span className="min-w-0">
                        <strong
                          className={`experience-index-company block truncate font-bold tracking-[-0.035em] transition-colors duration-200 ${
                            isActive ? "text-white" : "text-white/65 group-hover:text-white"
                          }`}
                        >
                          {item.company}
                        </strong>
                        <span className="experience-index-role block truncate text-[#8d8984]">
                          {isEn ? item.role.en : item.role.pt}
                        </span>
                      </span>
                      <span className="editorial-label whitespace-nowrap text-[#8d8984]">
                        {isEn ? item.period.en : item.period.pt}
                      </span>
                    </button>
                  </div>
                )
              })}
            </div>
          </Reveal>

          <Reveal
            className="experience-detail-shell min-h-0"
            axis="x"
            distance={22}
            amount={0.12}
            delay={0.16}
          >
            <AnimatePresence mode="wait" initial={false}>
              <m.article
                id="experience-detail"
                key={`${activeItem.company}-${language}`}
                initial={reduceMotion ? false : { opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, x: -10 }}
                transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="flex h-full min-h-0 flex-col justify-center"
                aria-live="polite"
              >
                <p className="editorial-label text-[#82aaff]">
                  0{activeExperience + 1} / {isEn ? activeItem.period.en : activeItem.period.pt}
                </p>
                <h3 className="experience-detail-company mt-2 font-black tracking-[-0.055em] text-white">
                  {activeItem.company}
                </h3>
                <p className="experience-detail-role mt-1 text-[#a39e98]">
                  {isEn ? activeItem.role.en : activeItem.role.pt}
                </p>
                <p className="experience-detail-copy mt-3 max-w-xl leading-relaxed text-white/75">
                  {isEn ? activeItem.description.en : activeItem.description.pt}
                </p>

                {activeItem.technologies && (
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 border-t border-white/10 pt-3">
                    {activeItem.technologies.slice(0, 4).map((technology) => (
                      <span
                        key={technology}
                        className="editorial-label inline-flex items-center gap-2 text-[#9b9690]"
                      >
                        <span className="text-[#82aaff]" aria-hidden="true">
                          •
                        </span>
                        {technology}
                      </span>
                    ))}
                  </div>
                )}

                <span className="mt-4 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-white/45">
                  {isEn ? "Select another chapter" : "Selecione outro capítulo"}
                  <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                </span>
              </m.article>
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection
