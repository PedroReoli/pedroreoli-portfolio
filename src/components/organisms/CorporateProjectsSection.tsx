import React from "react"
import { corporateProjectImages } from "../../content/projectsContent"
import ResponsiveImage from "../atoms/ResponsiveImage"
import Reveal from "../atoms/Reveal"

interface CorporateProjectsSectionProps {
  isEn: boolean
}

export const CorporateProjectsSection: React.FC<CorporateProjectsSectionProps> = ({ isEn }) => (
  <section
    id="corporativo-projects"
    className="archive-container archive-section"
    aria-label={isEn ? "Enterprise projects" : "Projetos corporativos"}
  >
    <Reveal
      distance={24}
      className="grid gap-5 border-b border-white/10 pb-6 lg:grid-cols-12 lg:items-end"
    >
      <div className="lg:col-span-8">
        <p className="editorial-label mb-3 text-[#aaa6a0]">
          2024 / 2026 / {isEn ? "Enterprise software" : "Software corporativo"}
        </p>
        <h2 className="archive-section-title">AUTOCOM3</h2>
      </div>
      <p className="max-w-md text-sm leading-relaxed text-[#aaa6a0] sm:text-base lg:col-span-4">
        {isEn
          ? "Proposals, licensing and catalog management in one corporate platform."
          : "Propostas, licenciamento e gestão de catálogo em uma plataforma corporativa."}
      </p>
    </Reveal>

    <Reveal distance={32} className="my-6 sm:my-8">
      <a
        href={corporateProjectImages[0].src}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-xl"
        aria-label={
          isEn
            ? "Open the operations dashboard image in a new tab"
            : "Ampliar painel de operações em nova aba"
        }
      >
        <figure className="overflow-hidden rounded-xl border border-white/10 bg-[#1b1a19]">
          <ResponsiveImage
            pictureClassName="block w-full"
            sources={[
              {
                srcSet: corporateProjectImages[0].srcSet,
                type: "image/webp",
                sizes:
                  "(max-width: 639px) calc(100vw - 2rem), (max-width: 1279px) calc(100vw - 4rem), 1216px",
              },
            ]}
            src={corporateProjectImages[0].src}
            alt={isEn ? corporateProjectImages[0].alt.en : corporateProjectImages[0].alt.pt}
            loading="lazy"
            decoding="async"
            width={2880}
            height={1800}
            className="project-overview-image"
          />
        </figure>
      </a>
    </Reveal>

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {corporateProjectImages.slice(1).map((image, index) => {
        const alt = isEn ? image.alt.en : image.alt.pt

        return (
          <Reveal key={image.src} distance={24} delay={index * 0.06}>
            <a
              href={image.src}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg"
              aria-label={`${
                isEn ? "Open image in a new tab" : "Ampliar imagem em nova aba"
              }: ${alt}`}
            >
              <figure className="overflow-hidden rounded-lg border border-white/10 bg-[#1b1a19]">
                <div className="aspect-[16/10] overflow-hidden">
                  <ResponsiveImage
                    pictureClassName="block h-full w-full"
                    sources={[
                      {
                        srcSet: image.srcSet,
                        type: "image/webp",
                        sizes:
                          "(max-width: 639px) calc(100vw - 2rem), (max-width: 1023px) 46vw, (max-width: 1279px) 30vw, 395px",
                      },
                    ]}
                    src={image.src}
                    alt={alt}
                    loading="lazy"
                    decoding="async"
                    width={2880}
                    height={1800}
                    className="h-full w-full object-contain"
                  />
                </div>
                <figcaption className="flex gap-3 border-t border-white/10 p-3 text-xs leading-relaxed text-[#aaa6a0]">
                  <span className="min-w-0 flex-1">{alt}</span>
                  <span className="shrink-0 text-[#82aaff]">0{index + 2} ↗</span>
                </figcaption>
              </figure>
            </a>
          </Reveal>
        )
      })}
    </div>
  </section>
)

export default CorporateProjectsSection
