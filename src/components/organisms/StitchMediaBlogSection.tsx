import React from "react"
import { ArrowUpRight, ExternalLink } from "lucide-react"
import { useLanguage } from "../../i18n/useLanguage"
import ResponsiveImage from "../atoms/ResponsiveImage"

const notes = [
  {
    number: "01",
    categoryPt: "Agentes & browser",
    categoryEn: "Agents & browser",
    title: "Achilles CDP Agent",
    descriptionPt:
      "Automação local orientada por CDP e ferramentas determinísticas.",
    descriptionEn: "Local automation shaped by CDP and deterministic tools.",
    href: "https://github.com/PedroReoli/Achilles-CDP-Agent",
  },
  {
    number: "02",
    categoryPt: "Conhecimento local-first",
    categoryEn: "Local-first knowledge",
    title: "Organon",
    descriptionPt:
      "Planejamento e conhecimento em um ambiente privado e conectado.",
    descriptionEn:
      "Planning and knowledge in a private, connected environment.",
    href: "https://github.com/PedroReoli/organon",
  },
  {
    number: "03",
    categoryPt: "Código aberto",
    categoryEn: "Open source",
    title: "Outros experimentos",
    descriptionPt: "Ferramentas, estudos e sistemas publicados no GitHub.",
    descriptionEn: "Tools, studies and systems published on GitHub.",
    href: "https://github.com/PedroReoli",
  },
]

export const StitchMediaBlogSection: React.FC = () => {
  const { language } = useLanguage()
  const isEn = language === "en"

  return (
    <div className="w-full">
      <section className="editorial-container pb-16 pt-20 sm:pb-24 sm:pt-28">
        <p className="editorial-label mb-5 text-[#82aaff]">
          {isEn ? "Writing / Press / Ideas" : "Escrita / Imprensa / Ideias"}
        </p>
        <h1 className="text-[clamp(4rem,17vw,16rem)] font-black leading-[0.72] tracking-[-0.085em]">
          {isEn ? "NOTES" : "NOTAS"}
        </h1>
        <p className="mt-12 max-w-2xl text-xl leading-tight tracking-[-0.035em] text-[#aaa6a0] sm:mt-20 sm:text-4xl">
          {isEn
            ? "Software, systems and applied automation — without the noise."
            : "Software, sistemas e automação aplicada — sem ruído."}
        </p>
      </section>

      <section className="editorial-container pb-24">
        <article className="grid gap-8 border-y border-white/10 py-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <p className="editorial-label mb-5 text-[#82aaff]">
              {isEn ? "In the press" : "Na imprensa"}
            </p>
            <h2 className="text-[clamp(2.5rem,6vw,5.7rem)] font-bold leading-[0.9] tracking-[-0.065em]">
              {isEn
                ? "Technology that helps children find their voice."
                : "Tecnologia para ajudar crianças a encontrar sua voz."}
            </h2>
            <a
              href="https://www.unifoa.edu.br/noticias/egresso-plataforma-apoiar-criancas-fala/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 border-b border-white pb-2 text-xs font-semibold uppercase tracking-[0.13em]"
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
                  sizes: "(max-width: 767px) calc(100vw - 2rem), 58vw",
                },
              ]}
              src="/TCC-img2.png"
              alt={
                isEn
                  ? "Pedro presenting FalaAtípica"
                  : "Pedro apresentando o FalaAtípica"
              }
              loading="lazy"
              decoding="async"
              width={1280}
              height={577}
              className="h-full w-full object-cover"
            />
          </figure>
        </article>
      </section>

      <section className="editorial-container pb-32">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="section-display">
            {isEn ? "OPEN SOURCE" : "CÓDIGO ABERTO"}
          </h2>
          <span className="editorial-label hidden text-[#77736f] sm:block">
            03 / {isEn ? "projects" : "projetos"}
          </span>
        </div>
        {notes.map((note) => (
          <a
            key={note.number}
            href={note.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group grid grid-cols-[2.5rem_1fr_auto] gap-3 border-b border-white/10 py-7 sm:grid-cols-[4rem_minmax(0,0.8fr)_minmax(14rem,1fr)_auto] sm:items-center sm:py-10"
          >
            <span className="editorial-label text-[#77736f]">
              {note.number}
            </span>
            <div>
              <p className="editorial-label mb-3 text-[#82aaff]">
                {isEn ? note.categoryEn : note.categoryPt}
              </p>
              <h3 className="max-w-4xl text-2xl font-bold leading-tight tracking-[-0.045em] sm:text-4xl">
                {note.title}
              </h3>
            </div>
            <p className="hidden max-w-md text-sm leading-relaxed text-[#8d8984] sm:block">
              {isEn ? note.descriptionEn : note.descriptionPt}
            </p>
            <ArrowUpRight className="h-5 w-5 text-[#82aaff] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </a>
        ))}
      </section>
    </div>
  )
}

export default StitchMediaBlogSection
