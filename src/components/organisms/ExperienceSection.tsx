import React, { useRef, useState } from "react"
import { AnimatePresence, m, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion"
import { ArrowDown, ArrowUpRight } from "lucide-react"
import { experienceItems } from "../../content/homeContent"
import { useLanguage } from "../../i18n/useLanguage"
import Reveal from "../atoms/Reveal"
import SlideSection from "../atoms/SlideSection"

const getExperienceProgress = (index: number) =>
  experienceItems.length <= 1 ? 0 : index / (experienceItems.length - 1)

export const ExperienceSection: React.FC = () => {
  const { language } = useLanguage()
  const isEn = language === "en"
  const reduceMotion = Boolean(useReducedMotion())
  const containerRef = useRef<HTMLElement>(null)
  const [activeExperience, setActiveExperience] = useState(0)
  const activeItem = experienceItems[activeExperience]

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const nextIndex = Math.min(
      experienceItems.length - 1,
      Math.floor(latest * experienceItems.length),
    )

    setActiveExperience((current) => (current === nextIndex ? current : nextIndex))
  })

  const scrollToExperience = (index: number) => {
    if (!containerRef.current) return

    const section = containerRef.current
    const sectionTop = window.scrollY + section.getBoundingClientRect().top
    const scrollableDistance = section.scrollHeight - window.innerHeight
    const target = sectionTop + scrollableDistance * getExperienceProgress(index)

    window.scrollTo({ top: target, behavior: reduceMotion ? "auto" : "smooth" })
  }

  return (
    <section
      id="experiencia"
      ref={containerRef}
      className="experience-scroll-stage relative min-h-screen bg-[#111010] text-[#edeae4]"
      style={{ "--experience-steps": experienceItems.length } as React.CSSProperties}
    >
      <SlideSection as="div" className="viewport-stage trajectory-stage sticky top-0 min-h-screen">
        <div className="editorial-container experience-stage-layout">
          <Reveal className="experience-stage-heading flex items-end justify-between gap-5 border-b border-white/15 pb-4">
            <div>
              <p className="editorial-label mb-2 text-[#82aaff]">
                06 / {isEn ? "Experience" : "Experiência"}
              </p>
              <h2 className="experience-stage-title font-black uppercase tracking-[-0.065em]">
                {isEn ? "JOURNEY." : "TRAJETÓRIA."}
              </h2>
            </div>
            <div className="experience-scroll-hint hidden items-center gap-3 sm:flex">
              <span>{isEn ? "Scroll through each chapter" : "Role por cada capítulo"}</span>
              <ArrowDown aria-hidden="true" />
            </div>
          </Reveal>

          <div className="experience-stage-content min-h-0">
            <Reveal
              className="experience-index min-h-0 border-b border-white/10 lg:border-b-0 lg:border-r lg:pr-8"
              delay={0.18}
              role="list"
              ariaLabel={isEn ? "Career chapters" : "Capítulos da trajetória"}
            >
              <div className="grid h-full grid-rows-5">
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
                        onClick={() => scrollToExperience(index)}
                        className="experience-index-row group grid h-full w-full min-h-0 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b border-white/10 text-left"
                      >
                        <span className="experience-step-number">0{index + 1}</span>
                        <span className="min-w-0">
                          <strong
                            className={`experience-index-company block truncate font-bold tracking-[-0.035em] transition-colors duration-200 ${
                              isActive ? "text-white" : "text-white/45 group-hover:text-white/75"
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
              distance={64}
              amount={0.12}
              delay={0.36}
            >
              <AnimatePresence mode="wait" initial={false}>
                <m.article
                  id="experience-detail"
                  key={`${activeItem.company}-${language}`}
                  initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x: 64 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduceMotion ? { opacity: 1 } : { opacity: 0, x: -48 }}
                  transition={{ duration: reduceMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
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
                      {activeItem.technologies.slice(0, 5).map((technology) => (
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
                    {activeExperience === experienceItems.length - 1
                      ? isEn
                        ? "End of journey"
                        : "Fim da trajetória"
                      : isEn
                      ? "Keep scrolling"
                      : "Continue rolando"}
                    <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                  </span>
                </m.article>
              </AnimatePresence>
            </Reveal>
          </div>

          <div className="experience-progress" aria-hidden="true">
            {experienceItems.map((item, index) => (
              <span
                key={`${item.company}-${index}`}
                className={index <= activeExperience ? "is-complete" : ""}
              />
            ))}
          </div>
        </div>
      </SlideSection>
    </section>
  )
}

export default ExperienceSection
