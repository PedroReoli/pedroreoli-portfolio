import React from "react"
import { expertiseItems } from "../../content/homeContent"
import { useLanguage } from "../../i18n/useLanguage"
import Reveal from "../atoms/Reveal"

export const ExpertiseSection: React.FC = () => {
  const { language } = useLanguage()
  const isEn = language === "en"

  return (
    <section className="viewport-stage expertise-stage border-y border-white/10" aria-label={isEn ? "Areas of expertise" : "Áreas de atuação"}>
      <div className="editorial-container expertise-stage-layout">
        <Reveal className="expertise-intro flex flex-col justify-between border-b border-white/15 pb-5 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-10">
          <div className="flex items-start justify-between gap-5 lg:block">
            <p className="editorial-label text-[#82aaff]">06 / {isEn ? "What I connect" : "O que eu conecto"}</p>
            <p className="editorial-label text-right text-[#77736f] lg:mt-4 lg:text-left">04 / {isEn ? "disciplines" : "disciplinas"}</p>
          </div>
          <div>
            <h2 className="expertise-heading font-black uppercase text-[#edeae4]">
              {isEn ? <>FROM CODE<br /><span className="text-outline">TO PRODUCT.</span></> : <>DO CÓDIGO<br /><span className="text-outline">AO PRODUTO.</span></>}
            </h2>
            <p className="expertise-summary mt-4 max-w-md text-[#96918b]">
              {isEn ? "Four disciplines, connected as one delivery." : "Quatro disciplinas conectadas em uma só entrega."}
            </p>
          </div>
        </Reveal>

        <div className="expertise-list min-h-0" role="list">
          {expertiseItems.map((item, index) => (
            <Reveal key={item.title.en} className="expertise-row group" delay={index * 0.05} distance={18} role="listitem">
              <span className="editorial-label text-[#77736f] transition-colors group-hover:text-[#82aaff]">0{index + 1}</span>
              <h3 className="expertise-title font-bold tracking-[-0.055em] text-[#edeae4] transition-transform duration-300 group-hover:translate-x-2">{isEn ? item.title.en : item.title.pt}</h3>
              <p className="expertise-description text-[#8f8a84]">{isEn ? item.description.en : item.description.pt}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExpertiseSection
