import React from "react"
import { Link } from "react-router-dom"
import SEOHead from "../components/atoms/SEOHead"
import { ArrowUpRight } from "lucide-react"
import Reveal from "../components/atoms/Reveal"
import SlideSection from "../components/atoms/SlideSection"
import { getSiteUrl, siteConfig } from "../config/site"
import { useLanguage } from "../i18n/useLanguage"

export const NotFoundPage: React.FC = () => {
  const { language } = useLanguage()
  const isEn = language === "en"

  return (
    <div className="bg-[#111010] text-[#edeae4] antialiased">
      <SEOHead
        title={
          isEn
            ? `404 | Page Not Found | ${siteConfig.legalName}`
            : `404 | Página Não Encontrada | ${siteConfig.legalName}`
        }
        description={
          isEn
            ? "The page you are looking for does not exist or has moved."
            : "A página que você está procurando não existe ou foi movida."
        }
        canonicalUrl={getSiteUrl("/404")}
        noIndex={true}
        locale={isEn ? "en_US" : "pt_BR"}
      />
      <main
        id="main-content"
        tabIndex={-1}
        className="not-found-page archive-container focus:outline-none"
      >
        <SlideSection as="div" className="not-found-layout">
          <Reveal distance={12} duration={0.5} className="not-found-label editorial-label">
            <span className="text-[#82aaff]">
              404 / {isEn ? "Page not found" : "Página não encontrada"}
            </span>
            <span aria-hidden="true" className="text-[#8d8984]">
              PEDRO REOLI
            </span>
          </Reveal>
          <div className="not-found-content">
            <div className="not-found-title-mask">
              <Reveal distance={36} duration={0.8} delay={0.06}>
                <h1 className="not-found-title">
                  <span>{isEn ? "OFF" : "FORA"}</span> <span>{isEn ? "ROUTE." : "DE ROTA."}</span>
                </h1>
              </Reveal>
            </div>
            <Reveal distance={18} delay={0.18} className="not-found-detail">
              <p>
                {isEn
                  ? "This address is unavailable. You can return home or explore my work."
                  : "Este endereço não está disponível. Você pode voltar ao início ou conhecer meus projetos."}
              </p>
              <nav
                aria-label={isEn ? "Continue browsing" : "Continuar navegando"}
                className="not-found-actions"
              >
                <Link to="/">{isEn ? "Back home" : "Voltar ao início"}</Link>
                <Link to="/projetos">
                  {isEn ? "View projects" : "Ver projetos"}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </nav>
            </Reveal>
          </div>
        </SlideSection>
      </main>
    </div>
  )
}

export default NotFoundPage
