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
    <section
      id="proposito"
      className="viewport-stage purpose-stage min-h-screen min-h-[100svh] min-h-[100dvh] bg-[#111010] text-[#edeae4]"
    >
      <SectionCurtain variant="right" duration={0.9} />

      <div className="editorial-container purpose-stage-layout">
        <Reveal className="purpose-stage-heading flex items-center justify-between border-b border-white/15 pb-3">
          <p className="editorial-label text-[#82aaff]">
            05 / {isEn ? "Technology with purpose" : "Tecnologia com propósito"}
          </p>
          <p className="editorial-label text-right text-white/45">FalaAtípica / UniFOA / 2026</p>
        </Reveal>

        <Reveal
          className="purpose-media-shell min-h-0"
          axis="x"
          distance={28}
          delay={0.06}
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
                  sizes: "calc(100vw - 2rem)",
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
              className="h-full w-full object-cover object-center"
            />
            <figcaption className="framed-media-caption">
              <span>{isEn ? "Assistive technology" : "Tecnologia assistiva"}</span>
              <span>{isEn ? "Presentation / UniFOA" : "Apresentação / UniFOA"}</span>
            </figcaption>
          </figure>
        </Reveal>

        <div className="purpose-statement">
          <Reveal distance={24} amount={0.08}>
            <h2 className="purpose-title font-black uppercase">
              {isEn ? "Technology" : "Tecnologia"}
              <span>{isEn ? "is access." : "é acesso."}</span>
            </h2>
          </Reveal>

          <div className="purpose-statement-copy">
            <Reveal delay={0.1} distance={16} amount={0.06}>
              <p className="purpose-summary">
                {isEn
                  ? "FalaAtípica brings families, children and speech professionals closer through clearer communication."
                  : "O FalaAtípica aproxima famílias, crianças e profissionais da fala por meio de uma comunicação mais clara."}
              </p>
            </Reveal>

            <Reveal delay={0.16} distance={12} amount={0.04}>
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
        </div>
      </div>
    </section>
  )
}

export default PurposeStorySection
