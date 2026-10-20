import React, { useEffect, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { useSearchParams } from "react-router-dom"
import SEOHead from "../components/atoms/SEOHead"
import TransitionEffect from "../components/atoms/TransitionEffect"
import StitchFooter from "../components/organisms/StitchFooter"
import StitchHeader from "../components/organisms/StitchHeader"
import { useLanguage } from "../i18n/useLanguage"

interface ProjectsPageProps {
  defaultTab?: "corporativo" | "gerais"
}

const corporateImages = [
  ["/portfolio-autocom3/01-painel-operacoes-visao-geral.png", "Painel central de operações"],
  ["/portfolio-autocom3/01-propostas-comerciais-listagem.png", "Gestão de propostas comerciais"],
  ["/portfolio-autocom3/01-licencas-sgsh-painel-central.png", "Ciclo de vida de licenças"],
  ["/portfolio-autocom3/01-catalogo-skus-tabela.png", "Catálogo corporativo de SKUs"],
]

const independentProjects = [
  ["01", "FalaAtípica", "Saúde assistiva", "https://github.com/PedroReoli/Fala-Atipica"],
  ["02", "Achilles CDP Agent", "Browser automation", "https://github.com/PedroReoli/Achilles-CDP-Agent"],
  ["03", "Organon", "Conhecimento local-first", "https://github.com/PedroReoli/organon"],
  ["04", "GeoAmbiental VR", "Computação espacial", "https://github.com/PedroReoli/GeoAmbientalVR"],
]

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ defaultTab }) => {
  const { language } = useLanguage()
  const isEn = language === "en"
  const [searchParams, setSearchParams] = useSearchParams()
  const queryTab = searchParams.get("tipo")
  const [activeTab, setActiveTab] = useState<"corporativo" | "gerais">(
    defaultTab || (queryTab === "gerais" ? "gerais" : "corporativo"),
  )

  useEffect(() => {
    if (queryTab === "gerais") setActiveTab("gerais")
    if (queryTab === "corporativo" || queryTab === "corporativos") setActiveTab("corporativo")
  }, [queryTab])

  const changeTab = (tab: "corporativo" | "gerais") => {
    setActiveTab(tab)
    setSearchParams({ tipo: tab })
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#111010] text-[#edeae4]">
      <SEOHead
        title={isEn ? "Selected Work | Pedro Reoli" : "Projetos selecionados | Pedro Reoli"}
        description={isEn ? "A selection of software products and systems built by Pedro Reoli." : "Uma seleção de produtos digitais e sistemas construídos por Pedro Reoli."}
        canonicalUrl="https://pedroreis.vercel.app/projetos"
      />
      <TransitionEffect />
      <StitchHeader />

      <main className="pt-16">
        <section className="editorial-container pb-16 pt-20 sm:pb-24 sm:pt-28">
          <p className="editorial-label mb-5 text-[#82aaff]">{isEn ? "Archive / Selected work" : "Arquivo / Trabalhos selecionados"}</p>
          <h1 className="text-[clamp(4.5rem,17vw,16rem)] font-black leading-[0.72] tracking-[-0.085em]">WORK</h1>
          <div className="mt-16 flex flex-wrap gap-8 border-b border-white/10 sm:mt-24">
            <button type="button" onClick={() => changeTab("corporativo")} className={`pb-4 text-sm font-semibold uppercase tracking-[0.1em] ${activeTab === "corporativo" ? "border-b-2 border-[#82aaff] text-white" : "text-[#77736f]"}`}>
              {isEn ? "Enterprise" : "Corporativo"}
            </button>
            <button type="button" onClick={() => changeTab("gerais")} className={`pb-4 text-sm font-semibold uppercase tracking-[0.1em] ${activeTab === "gerais" ? "border-b-2 border-[#82aaff] text-white" : "text-[#77736f]"}`}>
              {isEn ? "Independent" : "Independentes"}
            </button>
          </div>
        </section>

        {activeTab === "corporativo" ? (
          <section className="editorial-container pb-32">
            <div className="grid gap-12 border-b border-white/10 pb-16 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <p className="editorial-label mb-4 text-[#77736f]">2024—2026 / Software corporativo</p>
                <h2 className="section-display">AUTOCOM3</h2>
              </div>
              <p className="max-w-md text-lg leading-relaxed text-[#9a9690] lg:col-span-4">
                {isEn ? "An operating ecosystem for complex business routines, from commercial flows to licensing." : "Um ecossistema de operação para rotinas empresariais complexas, do comercial ao licenciamento."}
              </p>
            </div>

            <figure className="my-10 overflow-hidden bg-[#1b1a19] sm:my-16">
              <img src={corporateImages[0][0]} alt={corporateImages[0][1]} className="w-full object-cover object-top" />
            </figure>

            <div className="grid gap-5 sm:grid-cols-2">
              {corporateImages.slice(1).map(([src, alt], index) => (
                <figure key={src} className={`${index === 2 ? "sm:col-span-2" : ""} group overflow-hidden bg-[#1b1a19]`}>
                  <div className={`${index === 2 ? "aspect-[16/7]" : "aspect-[4/3]"} overflow-hidden`}>
                    <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]" />
                  </div>
                  <figcaption className="editorial-label flex justify-between border-t border-white/10 p-4 text-[#8d8984]">
                    <span>{alt}</span><span>0{index + 2}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        ) : (
          <section className="editorial-container pb-32">
            <img src="/TCC-img2.png" alt="Apresentação do projeto FalaAtípica" className="mb-10 aspect-[16/7] w-full object-cover sm:mb-16" />
            {independentProjects.map(([number, title, category, href]) => (
              <a key={title} href={href} target="_blank" rel="noopener noreferrer" className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 border-b border-white/10 py-7 sm:grid-cols-[4rem_1fr_1fr_auto] sm:py-10">
                <span className="editorial-label text-[#77736f]">{number}</span>
                <strong className="text-3xl tracking-[-0.05em] text-[#edeae4] sm:text-6xl">{title}</strong>
                <span className="hidden text-sm text-[#8d8984] sm:block">{category}</span>
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
