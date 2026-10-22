import React from "react"
import { ArrowUpRight } from "lucide-react"
import { useLanguage } from "../../i18n/useLanguage"
import ResponsiveImage from "../atoms/ResponsiveImage"
import Reveal from "../atoms/Reveal"
import SectionCurtain from "../atoms/SectionCurtain"

export const PurposeStorySection: React.FC = () => {
  const { language } = useLanguage()
  const isEn = language === "en"

  return (
    <section id="proposito" className="viewport-stage purpose-stage bg-[#111010] text-[#edeae4]">
      <SectionCurtain variant="right" duration={0.9} />

      <div className="editorial-container purpose-stage-layout">
        <Reveal className="purpose-stage-heading flex items-center justify-between border-b border-white/15 pb-3">
          <p className="editorial-label text-[#82aaff]">
            05 / {isEn ? "Technology with purpose" : "Tecnologia com propósito"}
          </p>
          <p className="editorial-label text-right text-white/45">FalaAtípica / UniFOA / 2026</p>
        </Reveal>

        <div className="purpose-stage-content min-h-0">
          <div className="purpose-copy min-h-0">
            <Reveal distance={28} amount={0.08}>
              <p className="editorial-label mb-3 text-white/45">
                {isEn ? "Real need / Useful response" : "Necessidade real / Resposta útil"}
              </p>
              <h2 className="purpose-title font-black uppercase">
                {isEn ? "Technology" : "Tecnologia"}
                <span>{isEn ? "that includes." : "que inclui."}</span>
              </h2>
            </Reveal>

            <Reveal delay={0.12} distance={18} amount={0.08}>
              <p className="purpose-summary">
                {isEn
                  ? "FalaAtípica connects families and speech professionals through clearer, more accessible communication."
                  : "O FalaAtípica aproxima famílias e profissionais da fala por meio de uma comunicação mais clara e acessível."}
              </p>
            </Reveal>

            <Reveal delay={0.2} distance={14} amount={0.05}>
              <a
                href="https://www.unifoa.edu.br/noticias/egresso-plataforma-apoiar-criancas-fala/"
                target="_blank"
                rel="noopener noreferrer"
                className="purpose-link group"
              >
                <span>{isEn ? "Read the story" : "Conhecer a história"}</span>
                <ArrowUpRight aria-hidden="true" />
              </a>
            </Reveal>
          </div>

          <Reveal
            className="purpose-media-shell min-h-0"
            axis="x"
            distance={34}
            delay={0.08}
            amount={0.08}
          >
            <figure className="purpose-media-frame relative h-full overflow-hidden">
              <ResponsiveImage
                pictureClassName="block h-full w-full"
                sources={[
                  {
                    srcSet:
                      "/media/stories/fala-atipica-640.webp 640w, /media/stories/fala-atipica-1280.webp 1280w",
                    type: "image/webp",
                    sizes: "(max-width: 767px) calc(100vw - 2rem), 58vw",
                  },
                ]}
                src="/TCC-img2.png"
                alt={
                  isEn
                    ? "Pedro presenting the FalaAtípica project at UniFOA"
                    : "Pedro apresentando o projeto FalaAtípica no UniFOA"
                }
                loading="lazy"
                decoding="async"
                width={1280}
                height={577}
                className="h-full w-full object-cover object-[58%_center]"
              />
              <figcaption className="framed-media-caption">
                <span>{isEn ? "Assistive product" : "Produto assistivo"}</span>
                <span>01 / 01</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default PurposeStorySection
