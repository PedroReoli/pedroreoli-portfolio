import React, { useCallback, useState } from "react"
import { Expand } from "lucide-react"
import { corporateProjectImages } from "../../content/projectsContent"
import ResponsiveImage from "../atoms/ResponsiveImage"
import Reveal from "../atoms/Reveal"
import ProjectImageViewer from "../molecules/ProjectImageViewer"

interface CorporateProjectsSectionProps {
  isEn: boolean
}

export const CorporateProjectsSection: React.FC<CorporateProjectsSectionProps> = ({ isEn }) => {
  const [activeImage, setActiveImage] = useState<number | null>(null)
  const closeImage = useCallback(() => setActiveImage(null), [])
  const openImage = (event: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      return
    event.preventDefault()
    setActiveImage(index)
  }
  return (
    <section
      id="corporativo-projects"
      className="archive-container archive-section"
      aria-label={isEn ? "Enterprise projects" : "Projetos corporativos"}
    >
      <Reveal
        distance={24}
        duration={0.65}
        className="archive-section-heading grid gap-5 border-b border-white/10 pb-6 lg:grid-cols-12 lg:items-end"
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

      <Reveal distance={24} duration={0.75} amount={0.1} className="my-6 sm:my-8">
        <a
          href={corporateProjectImages[0].src}
          target="_blank"
          rel="noopener noreferrer"
          className="project-gallery-link group"
          onClick={(event) => openImage(event, 0)}
          aria-haspopup="dialog"
          aria-label={
            isEn ? "View operations dashboard in gallery" : "Ampliar painel de operações na galeria"
          }
        >
          <figure>
            <ResponsiveImage
              pictureClassName="project-gallery-frame block w-full"
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
              loading="eager"
              decoding="async"
              width={2880}
              height={1800}
              className="project-overview-image"
            />
            <figcaption className="project-gallery-caption">
              <span className="editorial-label text-[#82aaff]">01</span>
              <span>
                {isEn ? corporateProjectImages[0].alt.en : corporateProjectImages[0].alt.pt}
              </span>
              <Expand aria-hidden="true" />
            </figcaption>
          </figure>
        </a>
      </Reveal>

      <div className="project-gallery">
        {corporateProjectImages.slice(1).map((image, index) => {
          const alt = isEn ? image.alt.en : image.alt.pt

          return (
            <Reveal
              key={image.src}
              className={image.wide ? "project-gallery-wide" : undefined}
              distance={24}
              duration={0.7}
              amount={0.1}
              delay={(index % 2) * 0.08}
            >
              <a
                href={image.src}
                target="_blank"
                rel="noopener noreferrer"
                className="project-gallery-link group"
                onClick={(event) => openImage(event, index + 1)}
                aria-haspopup="dialog"
                aria-label={`${
                  isEn ? "View image in gallery" : "Ampliar imagem na galeria"
                }: ${alt}`}
              >
                <figure>
                  <div className="project-gallery-frame aspect-[16/10]">
                    <ResponsiveImage
                      pictureClassName="block h-full w-full"
                      sources={[
                        {
                          srcSet: image.srcSet,
                          type: "image/webp",
                          sizes: image.wide
                            ? "(max-width: 639px) calc(100vw - 2rem), (max-width: 1279px) calc(100vw - 4rem), 1216px"
                            : "(max-width: 639px) calc(100vw - 2rem), (max-width: 1279px) 46vw, 590px",
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
                  <figcaption className="project-gallery-caption">
                    <span className="editorial-label text-[#82aaff]">0{index + 2}</span>
                    <span>{alt}</span>
                    <Expand aria-hidden="true" />
                  </figcaption>
                </figure>
              </a>
            </Reveal>
          )
        })}
      </div>
      {activeImage !== null && (
        <ProjectImageViewer
          images={corporateProjectImages}
          initialIndex={activeImage}
          onClose={closeImage}
        />
      )}
    </section>
  )
}

export default CorporateProjectsSection
