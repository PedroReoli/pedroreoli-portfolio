import React, { useEffect, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { useSearchParams } from "react-router-dom"
import SEOHead from "../components/atoms/SEOHead"
import TransitionEffect from "../components/atoms/TransitionEffect"
import ResponsiveImage from "../components/atoms/ResponsiveImage"
import StitchFooter from "../components/organisms/StitchFooter"
import StitchHeader from "../components/organisms/StitchHeader"
import {
  corporateProjectImages,
  independentProjects,
} from "../content/projectsContent"
import { useLanguage } from "../i18n/useLanguage"

export const ProjectsPage: React.FC = () => {
  const { language } = useLanguage()
  const isEn = language === "en"
  const [searchParams, setSearchParams] = useSearchParams()
  const queryTab = searchParams.get("tipo")
  const [activeTab, setActiveTab] = useState<"corporativo" | "gerais">(
    queryTab === "gerais" ? "gerais" : "corporativo",
  )

  useEffect(() => {
    if (queryTab === "gerais") setActiveTab("gerais")
    if (queryTab === "corporativo" || queryTab === "corporativos")
      setActiveTab("corporativo")
  }, [queryTab])

  const changeTab = (tab: "corporativo" | "gerais") => {
    setActiveTab(tab)
    setSearchParams({ tipo: tab }, { replace: true })
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#111010] text-[#edeae4]">
      <SEOHead
        title={
          isEn
            ? "Selected Work | Pedro Reoli"
            : "Projetos selecionados | Pedro Reoli"
        }
        description={
          isEn
            ? "A selection of software products and systems built by Pedro Reoli."
            : "Uma seleção de produtos digitais e sistemas construídos por Pedro Reoli."
        }
        canonicalUrl="https://pedroreis.vercel.app/projetos"
        locale={isEn ? "en_US" : "pt_BR"}
      />
      <TransitionEffect />
      <StitchHeader />

      <main id="main-content" className="pt-16">
        <section className="editorial-container pb-16 pt-20 sm:pb-24 sm:pt-28">
          <p className="editorial-label mb-5 text-[#82aaff]">
            {isEn
              ? "Archive / Selected work"
              : "Arquivo / Trabalhos selecionados"}
          </p>
          <h1 className="text-[clamp(4rem,17vw,16rem)] font-black leading-[0.72] tracking-[-0.085em]">
            {isEn ? "WORK" : "PROJETOS"}
          </h1>
          <div
            className="mt-16 flex flex-wrap gap-8 border-b border-white/10 sm:mt-24"
            role="group"
            aria-label={isEn ? "Project categories" : "Categorias de projetos"}
          >
            <button
              type="button"
              aria-pressed={activeTab === "corporativo"}
              aria-controls="corporate-projects"
              onClick={() => changeTab("corporativo")}
              className={`pb-4 text-sm font-semibold uppercase tracking-[0.1em] ${
                activeTab === "corporativo"
                  ? "border-b-2 border-[#82aaff] text-white"
                  : "text-[#77736f] hover:text-[#edeae4]"
              }`}
            >
              {isEn ? "Enterprise" : "Corporativo"}
            </button>
            <button
              type="button"
              aria-pressed={activeTab === "gerais"}
              aria-controls="independent-projects"
              onClick={() => changeTab("gerais")}
              className={`pb-4 text-sm font-semibold uppercase tracking-[0.1em] ${
                activeTab === "gerais"
                  ? "border-b-2 border-[#82aaff] text-white"
                  : "text-[#77736f] hover:text-[#edeae4]"
              }`}
            >
              {isEn ? "Independent" : "Independentes"}
            </button>
          </div>
        </section>

        {activeTab === "corporativo" ? (
          <section
            id="corporate-projects"
            className="editorial-container pb-32"
          >
            <div className="grid gap-12 border-b border-white/10 pb-16 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <p className="editorial-label mb-4 text-[#77736f]">
                  2024—2026 / Software corporativo
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
                    sizes: "(max-width: 1536px) calc(100vw - 4rem), 1472px",
                  },
                ]}
                src={corporateProjectImages[0].src}
                alt={
                  isEn
                    ? corporateProjectImages[0].alt.en
                    : corporateProjectImages[0].alt.pt
                }
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
                    <div
                      className={`${
                        image.wide ? "aspect-[16/7]" : "aspect-[4/3]"
                      } overflow-hidden`}
                    >
                      <ResponsiveImage
                        pictureClassName="block h-full w-full"
                        sources={[
                          {
                            srcSet: image.srcSet,
                            type: "image/webp",
                            sizes: image.wide
                              ? "(max-width: 1536px) calc(100vw - 4rem), 1472px"
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
                    <figcaption className="editorial-label flex justify-between border-t border-white/10 p-4 text-[#8d8984]">
                      <span>{alt}</span>
                      <span>0{index + 2}</span>
                    </figcaption>
                  </figure>
                )
              })}
            </div>
          </section>
        ) : (
          <section
            id="independent-projects"
            className="editorial-container pb-32"
          >
            <div className="grid gap-8 border-y border-white/10 py-10 sm:py-14 lg:grid-cols-12 lg:items-end">
              <h2 className="section-display lg:col-span-8">
                {isEn ? (
                  <>
                    INDEPENDENT
                    <br />
                    SYSTEMS
                  </>
                ) : (
                  <>
                    SISTEMAS
                    <br />
                    INDEPENDENTES
                  </>
                )}
              </h2>
              <p className="max-w-md text-base leading-relaxed text-[#9a9690] sm:text-lg lg:col-span-4">
                {isEn
                  ? "Open tools built around autonomy, privacy and direct control."
                  : "Ferramentas abertas construídas em torno de autonomia, privacidade e controle direto."}
              </p>
            </div>
            {independentProjects.map((project) => (
              <a
                key={project.title}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 border-b border-white/10 py-7 sm:grid-cols-[4rem_minmax(12rem,0.8fr)_minmax(14rem,1fr)_auto] sm:py-10"
              >
                <span className="editorial-label text-[#77736f]">
                  {project.number}
                </span>
                <div>
                  <strong className="block text-3xl leading-none tracking-[-0.05em] text-[#edeae4] sm:text-5xl">
                    {project.title}
                  </strong>
                  <span className="editorial-label mt-3 block text-[#82aaff] sm:hidden">
                    {isEn ? project.category.en : project.category.pt}
                  </span>
                </div>
                <div className="hidden sm:block">
                  <span className="editorial-label text-[#82aaff]">
                    {isEn ? project.category.en : project.category.pt}
                  </span>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#8d8984]">
                    {isEn ? project.description.en : project.description.pt}
                  </p>
                </div>
                <ArrowUpRight className="h-5 w-5 text-[#82aaff] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </a>
            ))}
          </section>
        )}
      </main>
      <StitchFooter />
    </div>
  )
}

export default ProjectsPage
