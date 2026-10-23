import React from "react"
import { ArrowUpRight, ExternalLink } from "lucide-react"
import { mediaNotes } from "../../content/mediaContent"
import { useLanguage } from "../../i18n/useLanguage"
import ResponsiveImage from "../atoms/ResponsiveImage"
import Reveal from "../atoms/Reveal"
import ArchiveHeading from "../molecules/ArchiveHeading"

export const MediaArchiveSection: React.FC = () => {
  const { language } = useLanguage()
  const isEn = language === "en"

  return (
    <div className="w-full">
      <ArchiveHeading
        eyebrow={isEn ? "Press / Code / References" : "Imprensa / Código / Referências"}
        title={isEn ? "NOTES" : "NOTAS"}
        description={
          isEn
            ? "A press feature and references to explore my projects in more detail."
            : "Uma reportagem e referências para conhecer meus projetos por dentro."
        }
      />

      <section className="archive-container archive-section">
        <article className="media-feature">
          <Reveal
            className="media-feature-copy"
            distance={24}
            duration={0.7}
            delay={0.12}
            amount={0.1}
          >
            <p className="editorial-label mb-5 text-[#82aaff]">
              {isEn ? "In the press" : "Na imprensa"}
            </p>
            <h2 className="media-feature-title">
              {isEn ? "FalaAtípica featured by UniFOA." : "FalaAtípica em destaque no UniFOA."}
            </h2>
            <a
              href="https://www.unifoa.edu.br/noticias/egresso-plataforma-apoiar-criancas-fala/"
              target="_blank"
              rel="noopener noreferrer"
              className="media-feature-link"
            >
              {isEn ? "Read article" : "Ler reportagem"}
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </Reveal>
          <Reveal className="media-feature-image" distance={28} duration={0.75} amount={0.1}>
            <figure className="aspect-[16/10] overflow-hidden rounded-xl bg-[#1b1a19]">
              <ResponsiveImage
                pictureClassName="block h-full w-full"
                sources={[
                  {
                    srcSet:
                      "/media/stories/fala-atipica-640.webp 640w, /media/stories/fala-atipica-1280.webp 1280w",
                    type: "image/webp",
                    sizes:
                      "(max-width: 639px) calc(100vw - 2rem), (max-width: 899px) calc(100vw - 4rem), (max-width: 1279px) 55vw, 696px",
                  },
                ]}
                src="/TCC-img2.png"
                alt={isEn ? "Pedro presenting FalaAtípica" : "Pedro apresentando o FalaAtípica"}
                loading="lazy"
                decoding="async"
                width={1280}
                height={577}
                className="h-full w-full object-cover"
              />
            </figure>
          </Reveal>
        </article>
      </section>

      <section className="archive-container archive-section">
        <Reveal distance={20} duration={0.65} className="archive-reference-heading">
          <h2 className="archive-section-title">
            {isEn ? "Inside the code" : "Por dentro do código"}
          </h2>
          <span className="editorial-label hidden text-[#8d8984] sm:block">
            03 / {isEn ? "references" : "referências"}
          </span>
        </Reveal>
        {mediaNotes.map((note, index) => (
          <Reveal
            key={note.number}
            distance={20}
            duration={0.65}
            amount={0.12}
            delay={(index % 2) * 0.06}
          >
            <a
              href={note.href}
              target="_blank"
              rel="noopener noreferrer"
              className="project-archive-row group"
            >
              <span className="editorial-label text-[#8d8984]">{note.number}</span>
              <div className="min-w-0">
                <p className="editorial-label mb-3 text-[#82aaff]">
                  {isEn ? note.category.en : note.category.pt}
                </p>
                <h3 className="project-archive-title">{isEn ? note.title.en : note.title.pt}</h3>
                <span className="mt-2 block text-xs text-[#aaa6a0]">
                  {isEn ? note.destination.en : note.destination.pt}
                </span>
              </div>
              <p className="project-archive-description">
                {isEn ? note.description.en : note.description.pt}
              </p>
              <ArrowUpRight className="project-archive-arrow" aria-hidden="true" />
              <span className="sr-only">{isEn ? "Opens in a new tab" : "Abre em nova aba"}</span>
            </a>
          </Reveal>
        ))}
      </section>
    </div>
  )
}

export default MediaArchiveSection
