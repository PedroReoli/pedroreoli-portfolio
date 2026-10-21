import React from "react"
import { workingPrinciples } from "../../content/homeContent"
import { useLanguage } from "../../i18n/useLanguage"
import Reveal from "../atoms/Reveal"

export const WorkingMethodSection: React.FC = () => {
  const { language } = useLanguage()
  const isEn = language === "en"

  return (
    <section
      className="viewport-stage method-stage border-y border-white/10"
      aria-label={isEn ? "Working principles" : "Princípios de trabalho"}
    >
      <div className="editorial-container method-stage-layout">
        <Reveal className="method-intro flex flex-col justify-between border-b border-white/15 pb-5 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-10">
          <div className="flex items-start justify-between gap-5 lg:block">
            <p className="editorial-label text-[#82aaff]">
              06 / {isEn ? "How I deliver" : "Como eu entrego"}
            </p>
            <p className="editorial-label text-right text-[#77736f] lg:mt-4 lg:text-left">
              04 / {isEn ? "principles" : "princípios"}
            </p>
          </div>
          <div>
            <h2 className="method-heading font-black uppercase text-[#edeae4]">
              {isEn ? (
                <>
                  BUILD<br />
                  <span className="text-outline">WITH RIGOR.</span>
                </>
              ) : (
                <>
                  CONSTRUIR<br />
                  <span className="text-outline">COM RIGOR.</span>
                </>
              )}
            </h2>
            <p className="method-summary mt-4 max-w-md text-[#96918b]">
              {isEn
                ? "Four principles from the problem to production."
                : "Quatro princípios entre o problema e a produção."}
            </p>
          </div>
        </Reveal>

        <div className="method-list min-h-0" role="list">
          {workingPrinciples.map((item, index) => (
            <Reveal
              key={item.title.en}
              className="method-row group"
              delay={index * 0.05}
              distance={18}
              role="listitem"
            >
              <span className="editorial-label text-[#77736f] transition-colors group-hover:text-[#82aaff]">
                0{index + 1}
              </span>
              <h3 className="method-title font-bold tracking-[-0.055em] text-[#edeae4] transition-transform duration-300 group-hover:translate-x-2">
                {isEn ? item.title.en : item.title.pt}
              </h3>
              <p className="method-description text-[#8f8a84]">
                {isEn ? item.description.en : item.description.pt}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WorkingMethodSection
