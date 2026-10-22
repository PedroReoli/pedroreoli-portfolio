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
        eyebrow={isEn ? "Writing / Press / Ideas" : "Escrita / Imprensa / Ideias"}
        title={isEn ? "NOTES" : "NOTAS"}
        description={
          isEn
            ? "Technical notes, project decisions and press coverage."
            : "Notas técnicas, decisões de projeto e participações na imprensa."
        }
      />

      <section className="archive-container archive-section">
        <Reveal distance={32}>
          <article className="grid gap-6 border-y border-white/10 py-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <p className="editorial-label mb-5 text-[#82aaff]">
                {isEn ? "In the press" : "Na imprensa"}
              </p>
              <h2 className="text-[clamp(2rem,4vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.045em]">
                {isEn ? "FalaAtípica featured by UniFOA." : "FalaAtípica em destaque no UniFOA."}
              </h2>
              <a
                href="https://www.unifoa.edu.br/noticias/egresso-plataforma-apoiar-criancas-fala/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex min-h-11 items-center gap-2 border-b border-white pb-2 text-xs font-semibold uppercase tracking-[0.13em]"
              >
                {isEn ? "Read article" : "Ler reportagem"}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
            <figure className="aspect-[16/10] overflow-hidden rounded-xl bg-[#1b1a19] lg:col-span-7">
              <ResponsiveImage
                pictureClassName="block h-full w-full"
                sources={[
                  {
                    srcSet:
                      "/media/stories/fala-atipica-640.webp 640w, /media/stories/fala-atipica-1280.webp 1280w",
                    type: "image/webp",
                    sizes:
                      "(max-width: 639px) calc(100vw - 2rem), (max-width: 1023px) calc(100vw - 4rem), (max-width: 1279px) 55vw, 696px",
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
          </article>
        </Reveal>
      </section>

      <section className="archive-container archive-section">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="archive-section-title">{isEn ? "Open notebook" : "Caderno aberto"}</h2>
          <span className="editorial-label hidden text-[#8d8984] sm:block">
            03 / {isEn ? "notes" : "notas"}
          </span>
        </div>
        {mediaNotes.map((note, index) => (
          <Reveal key={note.number} distance={24} delay={index * 0.06}>
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
