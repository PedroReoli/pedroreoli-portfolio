import React from "react"
import { corporateProjectImages } from "../../content/projectsContent"
import ResponsiveImage from "../atoms/ResponsiveImage"

interface CorporateProjectsSectionProps {
  isEn: boolean
}

export const CorporateProjectsSection: React.FC<CorporateProjectsSectionProps> = ({ isEn }) => (
  <section
    id="corporativo-projects"
    className="editorial-container pb-32"
    aria-label={isEn ? "Enterprise projects" : "Projetos corporativos"}
  >
    <div className="grid gap-12 border-b border-white/10 pb-16 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-8">
        <p className="editorial-label mb-4 text-[#8d8984]">
          2024 / 2026 / {isEn ? "Enterprise software" : "Software corporativo"}
        </p>
        <h2 className="section-display">AUTOCOM3</h2>
      </div>
      <p className="max-w-md text-lg leading-relaxed text-[#9a9690] lg:col-span-4">
        {isEn
          ? "An operating ecosystem for complex business routines, from commercial flows to licensing."
          : "Um ecossistema de operação para rotinas empresariais complexas, do comercial ao licenciamento."}
      </p>
    </div>

    <figure className="my-10 overflow-hidden rounded-xl bg-[#1b1a19] sm:my-16">
      <ResponsiveImage
        pictureClassName="block w-full"
        sources={[
          {
            srcSet: corporateProjectImages[0].srcSet,
            type: "image/webp",
            sizes:
              "(max-width: 639px) calc(100vw - 2rem), (max-width: 1536px) calc(100vw - 4rem), 1472px",
          },
        ]}
        src={corporateProjectImages[0].src}
        alt={isEn ? corporateProjectImages[0].alt.en : corporateProjectImages[0].alt.pt}
        loading="lazy"
        decoding="async"
        width={2880}
        height={1800}
        className="w-full object-cover object-top"
      />
    </figure>

    <div className="grid gap-5 sm:grid-cols-2">
      {corporateProjectImages.slice(1).map((image, index) => {
        const alt = isEn ? image.alt.en : image.alt.pt

        return (
          <figure
            key={image.src}
            className={`${
              image.wide ? "sm:col-span-2" : ""
            } group overflow-hidden rounded-lg bg-[#1b1a19]`}
          >
            <div className={`${image.wide ? "aspect-[16/7]" : "aspect-[4/3]"} overflow-hidden`}>
              <ResponsiveImage
                pictureClassName="block h-full w-full"
                sources={[
                  {
                    srcSet: image.srcSet,
                    type: "image/webp",
                    sizes: image.wide
                      ? "(max-width: 639px) calc(100vw - 2rem), (max-width: 1536px) calc(100vw - 4rem), 1472px"
                      : "(max-width: 639px) calc(100vw - 2rem), (max-width: 1536px) 48vw, 720px",
                  },
                ]}
                src={image.src}
                alt={alt}
                loading="lazy"
                decoding="async"
                width={2880}
                height={1800}
                className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </div>
            <figcaption className="editorial-label flex gap-4 border-t border-white/10 p-4 text-[#8d8984]">
              <span className="min-w-0 flex-1">{alt}</span>
              <span className="shrink-0">0{index + 2}</span>
            </figcaption>
          </figure>
        )
      })}
    </div>
  </section>
)

export default CorporateProjectsSection
