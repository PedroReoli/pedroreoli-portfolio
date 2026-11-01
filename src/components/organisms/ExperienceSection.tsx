import React, { useEffect, useRef, useState } from "react"
import { ArrowDown } from "lucide-react"
import { experienceItems } from "../../content/homeContent"
import { useLanguage } from "../../i18n/useLanguage"
import Reveal from "../atoms/Reveal"
import SlideSection from "../atoms/SlideSection"
import ExperienceChapter from "../molecules/ExperienceChapter"

export const ExperienceSection: React.FC = () => {
  const { language } = useLanguage()
  const isEn = language === "en"
  const containerRef = useRef<HTMLElement>(null)
  const [{ index: activeExperience, direction }, setSelection] = useState({
    index: 0,
    direction: 1,
  })
  const activeItem = experienceItems[activeExperience]

  useEffect(() => {
    const handleSetChapter = (e: Event) => {
      const customEvent = e as CustomEvent<{ index: number }>
      if (typeof customEvent.detail?.index === "number") {
        const nextIdx = customEvent.detail.index
        setSelection((current) => ({
          index: nextIdx,
          direction: nextIdx > current.index ? 1 : -1,
        }))
      }
    }
    window.addEventListener("set-experience-chapter", handleSetChapter)
    return () => window.removeEventListener("set-experience-chapter", handleSetChapter)
  }, [])

  const scrollToExperience = (index: number) => {
    setSelection((current) => ({
      index,
      direction: index > current.index ? 1 : -1,
    }))
    window.dispatchEvent(
      new CustomEvent("experience-chapter-synced", { detail: { index } })
    )
  }

  return (
    <section
      id="experiencia"
      data-scroll-scene
      ref={containerRef}
      className="relative min-h-screen bg-[#111010] text-[#edeae4]"
    >
      <SlideSection as="div" className="viewport-stage trajectory-stage relative min-h-screen bg-[#111010]">
        <div className="editorial-container experience-stage-layout">
          <Reveal
            distance={14}
            duration={0.32}
            className="experience-stage-heading flex items-end justify-between gap-5 border-b border-white/15 pb-4"
          >
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
              delay={0.06}
              distance={14}
              duration={0.34}
              role="list"
              ariaLabel={isEn ? "Career chapters" : "Capítulos da trajetória"}
            >
              <div className="grid h-full grid-rows-5">
                {experienceItems.map((item, index) => {
                  const isActive = activeExperience === index

                  return (
                    <Reveal
                      key={`${item.company}-${item.period.pt}`}
                      role="listitem"
                      className="min-h-0"
                      distance={10}
                      delay={0.08 + index * 0.035}
                      duration={0.28}
                    >
                      <button
                        type="button"
                        aria-pressed={isActive}
                        aria-label={`${item.company}, ${isEn ? item.role.en : item.role.pt}, ${
                          isEn ? item.period.en : item.period.pt
                        }`}
                        aria-controls="experience-detail"
                        onClick={() => scrollToExperience(index)}
                        className="experience-index-row group grid h-full w-full min-h-0 grid-cols-[auto_minmax(0,1fr)] content-center items-center gap-x-3 gap-y-1 border-b border-white/10 text-left"
                      >
                        <span className="experience-step-number">0{index + 1}</span>
                        <span className="min-w-0">
                          <strong
                            className={`experience-index-company block font-bold tracking-[-0.035em] transition-colors duration-200 ${
                              isActive ? "text-white" : "text-white/45 group-hover:text-white/75"
                            }`}
                          >
                            {item.company}
                          </strong>
                          <span className="experience-index-role block truncate text-[#8d8984]">
                            {isEn ? item.role.en : item.role.pt}
                          </span>
                        </span>
                        <span className="experience-index-period editorial-label col-start-2 text-[#8d8984]">
                          {isEn ? item.period.en : item.period.pt}
                        </span>
                      </button>
                    </Reveal>
                  )
                })}
              </div>
            </Reveal>

            <Reveal
              className="experience-detail-shell min-h-0"
              axis="x"
              distance={14}
              amount={0.06}
              delay={0.12}
              duration={0.34}
            >
              <ExperienceChapter
                item={activeItem}
                index={activeExperience}
                direction={direction}
                total={experienceItems.length}
              />
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
