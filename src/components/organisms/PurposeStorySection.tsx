import React from "react"
import { ExternalLink } from "lucide-react"
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
      className="viewport-stage technology-story relative bg-[#111010] text-white"
    >
      <SectionCurtain variant="right" duration={0.94} />
      <ResponsiveImage
        pictureClassName="absolute inset-0 block h-full w-full"
        sources={[
          {
            srcSet:
              "/media/stories/fala-atipica-640.webp 640w, /media/stories/fala-atipica-1280.webp 1280w",
            type: "image/webp",
            sizes: "100vw",
          },
        ]}
        src="/TCC-img2.png"
        alt={
          isEn
            ? "Pedro presenting FalaAtípica at UniFOA"
            : "Pedro apresentando o FalaAtípica no UniFOA"
        }
        loading="lazy"
        decoding="async"
        width={1280}
        height={577}
        className="technology-image absolute inset-0 h-full w-full object-cover object-[58%_center]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/65 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/55" />
      <div className="absolute inset-0 bg-[#82aaff]/10 mix-blend-color" />

      <div className="editorial-container technology-stage-layout relative">
        <Reveal
          className="flex items-start justify-between border-b border-white/20 pb-4"
          distance={12}
        >
          <p className="editorial-label text-[#c7d3ff]">04 / FalaAtípica / UniFOA</p>
          <p className="editorial-label text-right text-white/70">
            {isEn ? "Assistive product" : "Produto assistivo"} / 2026
          </p>
        </Reveal>

        <Reveal
          className="technology-title-stage relative min-h-0"
          distance={32}
          amount={0.12}
          delay={0.08}
        >
          <h2 className="technology-title h-full font-black uppercase text-white">
            <span className="technology-title-first">{isEn ? "TECHNOLOGY" : "TECNOLOGIA"}</span>
            <span className="technology-title-last">
              {isEn ? "WITH PURPOSE." : "COM PROPÓSITO."}
            </span>
          </h2>
        </Reveal>

        <Reveal
          className="grid gap-3 border-t border-white/30 pt-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end sm:gap-6 sm:pt-6"
          distance={14}
          delay={0.16}
        >
          <div>
            <p className="editorial-label mb-2 text-[#c7d3ff]">
              {isEn ? "A real need / A useful response" : "Uma necessidade / Uma resposta útil"}
            </p>
            <p className="max-w-xl text-base leading-relaxed text-white/80 sm:text-xl">
              {isEn
                ? "A shared path for families and speech professionals."
                : "Um caminho compartilhado entre famílias e profissionais da fala."}
            </p>
          </div>
          <a
            href="https://www.unifoa.edu.br/noticias/egresso-plataforma-apoiar-criancas-fala/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 w-fit items-center gap-3 rounded-full border border-white/30 px-5 text-[9px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:border-white hover:bg-white hover:text-[#111010] sm:min-h-12 sm:px-6 sm:text-[10px]"
          >
            {isEn ? "Read the story" : "Ler a história"}
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}

export default PurposeStorySection
