import React from "react"
import { AnimatePresence, m } from "framer-motion"
import { useReducedMotion } from "../hooks/useReducedMotion"
import { filmEase } from "../motion/choreography"
import { useSearchParams } from "react-router-dom"
import SEOHead from "../components/atoms/SEOHead"
import ArchiveHeading from "../components/molecules/ArchiveHeading"
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
  const reduceMotion = useReducedMotion()
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory: ProjectCategory =
    searchParams.get("tipo") === "gerais" ? "gerais" : "corporativo"

  const changeCategory = (category: ProjectCategory) => {
    setSearchParams(
      (current) => {
        const next = new URLSearchParams(current)
        next.set("tipo", category)
        return next
      },
      { replace: true },
    )
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
        <ArchiveHeading
          eyebrow={isEn ? "Selected work" : "Trabalhos selecionados"}
          title={isEn ? "WORK" : "PROJETOS"}
          description={
            isEn
              ? "Explore enterprise interfaces and independent tools."
              : "Explore interfaces corporativas e ferramentas independentes."
          }
        >
          <ProjectCategoryTabs
            activeCategory={activeCategory}
            isEn={isEn}
            onChange={changeCategory}
          />
        </ArchiveHeading>

        <AnimatePresence mode="wait">
          <m.div
            key={activeCategory}
            className="project-category-scene"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
            transition={{ duration: reduceMotion ? 0 : 0.24, ease: filmEase }}
          >
            {activeCategory === "corporativo" ? (
              <CorporateProjectsSection isEn={isEn} />
            ) : (
              <IndependentProjectsSection isEn={isEn} />
            )}
          </m.div>
        </AnimatePresence>
      </main>

      <SiteFooter compact />
    </div>
  )
}

export default ProjectsPage
