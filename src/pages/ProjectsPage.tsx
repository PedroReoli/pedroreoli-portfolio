import React from "react"
import { useSearchParams } from "react-router-dom"
import SEOHead from "../components/atoms/SEOHead"
import CorporateProjectsSection from "../components/organisms/CorporateProjectsSection"
import IndependentProjectsSection from "../components/organisms/IndependentProjectsSection"
import ProjectCategoryTabs, {
  type ProjectCategory,
} from "../components/organisms/ProjectCategoryTabs"
import SiteFooter from "../components/organisms/SiteFooter"
import { getSiteUrl, siteConfig } from "../config/site"
import { useLanguage } from "../i18n/useLanguage"

export const ProjectsPage: React.FC = () => {
  const { language } = useLanguage()
  const isEn = language === "en"
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory: ProjectCategory =
    searchParams.get("tipo") === "gerais" ? "gerais" : "corporativo"

  const changeCategory = (category: ProjectCategory) => {
    setSearchParams({ tipo: category }, { replace: true })
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#111010] text-[#edeae4]">
      <SEOHead
        title={
          isEn ? `Selected Work | ${siteConfig.name}` : `Projetos selecionados | ${siteConfig.name}`
        }
        description={
          isEn
            ? "A selection of software products and systems built by Pedro Reoli."
            : "Uma seleção de produtos digitais e sistemas construídos por Pedro Reoli."
        }
        canonicalUrl={getSiteUrl("/projetos")}
        locale={isEn ? "en_US" : "pt_BR"}
      />
      <main id="main-content" tabIndex={-1} className="pt-16 focus:outline-none">
        <section className="editorial-container pb-16 pt-20 sm:pb-24 sm:pt-28">
          <p className="editorial-label mb-5 text-[#82aaff]">
            {isEn ? "Archive / Selected work" : "Arquivo / Trabalhos selecionados"}
          </p>
          <h1 className="text-[clamp(4rem,17vw,16rem)] font-black leading-[0.72] tracking-[-0.085em]">
            {isEn ? "WORK" : "PROJETOS"}
          </h1>
          <ProjectCategoryTabs
            activeCategory={activeCategory}
            isEn={isEn}
            onChange={changeCategory}
          />
        </section>

        {activeCategory === "corporativo" ? (
          <CorporateProjectsSection isEn={isEn} />
        ) : (
          <IndependentProjectsSection isEn={isEn} />
        )}
      </main>

      <SiteFooter />
    </div>
  )
}

export default ProjectsPage
