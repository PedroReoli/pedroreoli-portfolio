import React from "react"
import { ArrowDownRight } from "lucide-react"
import { useLanguage } from "../../i18n/useLanguage"
import Reveal from "../atoms/Reveal"
import SectionCurtain from "../atoms/SectionCurtain"

const aboutStats = [
  { value: "04", pt: "anos de experiência", en: "years of experience" },
  { value: "10+", pt: "produtos digitais", en: "digital products" },
  { value: "20+", pt: "organizações atendidas", en: "organizations served" },
  { value: "500+", pt: "componentes de Design System", en: "Design System components" },
]

export const AboutSection: React.FC = () => {
  const { language } = useLanguage()
  const isEn = language === "en"

  return (
    <section
      id="sobre"
      className="viewport-stage about-stage min-h-screen bg-[#edeae4] text-[#111010]"
    >
      <SectionCurtain background="#edeae4" accent="#111010" variant="split" duration={0.88} once />

      <div className="editorial-container about-stage-layout">
        <Reveal
          once
          className="about-stage-heading flex items-center justify-between border-b border-black/20 pb-3"
        >
          <p className="editorial-label text-[#5f5b56]">02 / {isEn ? "About" : "Sobre mim"}</p>
          <p className="editorial-label text-right text-[#5f5b56]">
            {isEn ? "Volta Redonda / Brazil" : "Volta Redonda / Brasil"}
          </p>
        </Reveal>

        <div className="about-stage-content min-h-0">
          <Reveal
            once
            className="about-portrait-shell min-h-0"
            axis="x"
            distance={-32}
            amount={0.08}
          >
            <figure className="about-portrait-frame relative h-full overflow-hidden">
              <img
                src="/eu-profissional.png"
                alt={
                  isEn
                    ? "Portrait of Pedro Lucas Reis, Full Stack Software Engineer"
                    : "Retrato de Pedro Lucas Reis, Engenheiro de Software Full Stack"
                }
                loading="lazy"
                decoding="async"
                width={1254}
                height={1254}
                className="h-full w-full object-cover object-center"
              />
              <figcaption className="framed-media-caption">
                <span>Pedro Lucas Reis</span>
                <span>{isEn ? "Software engineer" : "Engenheiro de software"}</span>
              </figcaption>
            </figure>
          </Reveal>

          <div className="about-copy min-h-0">
            <Reveal once distance={24} delay={0.08} amount={0.08}>
              <p className="editorial-label mb-2 text-[#5f5b56]">
                {isEn ? "Full Stack / Architecture / AI" : "Full Stack / Arquitetura / IA"}
              </p>
              <h2 className="about-title font-black uppercase">
                {isEn ? "Who I am" : "Quem eu sou"}
              </h2>
            </Reveal>

            <Reveal once delay={0.14} distance={20} amount={0.08}>
              <p className="about-summary">
                {isEn
                  ? "I work on SaaS, ERP and corporate platforms with TypeScript, React, Node.js, PostgreSQL and AWS. From visual architecture to APIs, data and deployment."
                  : "Atuo em SaaS, ERPs e plataformas corporativas com TypeScript, React, Node.js, PostgreSQL e AWS. Da arquitetura visual às APIs, banco e deploy."}
              </p>
            </Reveal>

            <div
              className="about-stats"
              role="list"
              aria-label={isEn ? "Career highlights" : "Destaques da carreira"}
            >
              {aboutStats.map((stat, index) => (
                <Reveal
                  key={stat.value}
                  className="about-stat"
                  role="listitem"
                  delay={0.18 + index * 0.045}
                  distance={16}
                  amount={0.04}
                  once
                >
                  <strong>{stat.value}</strong>
                  <span>{isEn ? stat.en : stat.pt}</span>
                </Reveal>
              ))}
            </div>

            <Reveal once className="about-direction" delay={0.26} distance={14} amount={0.04}>
              <ArrowDownRight aria-hidden="true" />
              <span>
                {isEn
                  ? "TypeScript · React · Node.js · PostgreSQL · AWS"
                  : "TypeScript · React · Node.js · PostgreSQL · AWS"}
              </span>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
