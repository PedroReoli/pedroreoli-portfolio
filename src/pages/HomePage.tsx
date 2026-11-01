import React, { useRef } from "react"
import SEOHead from "../components/atoms/SEOHead"
import HomeIntro from "../components/organisms/HomeIntro"
import HomeSections from "../components/organisms/HomeSections"
import SiteFooter from "../components/organisms/SiteFooter"
import { getSiteUrl, siteConfig } from "../config/site"
import { useLanguage } from "../i18n/useLanguage"
import ContentBoundary from "../components/molecules/ContentBoundary"
import ContentStatus from "../components/molecules/ContentStatus"
import { useHomeSceneGSAP } from "../hooks/useHomeSceneGSAP"

export const HomePage: React.FC = () => {
  const { language } = useLanguage()
  const isEn = language === "en"
  const pageRef = useRef<HTMLDivElement>(null)
  useHomeSceneGSAP(pageRef)

  return (
    <div
      ref={pageRef}
      className="home-page min-h-screen bg-[#111010] text-[#edeae4] antialiased overflow-x-clip"
      style={{ backgroundColor: "var(--page-bg, #111010)" }}
    >
      {/* Camada global de fundo com transição de cor fluida entre seções via GSAP */}
      <div
        className="home-backdrop pointer-events-none fixed inset-0 -z-10"
        style={{ backgroundColor: "var(--page-bg, #111010)" }}
        aria-hidden="true"
      />
      {/* Metatags e SEO Dinâmico */}
      <SEOHead
        title={
          isEn
            ? `${siteConfig.legalName} | Full Stack Software Engineer & Systems Architect`
            : `${siteConfig.legalName} | Engenheiro de Software Full Stack & Arquiteto de Sistemas`
        }
        description={
          isEn
            ? "Portfolio of Pedro Lucas Reis. Full Stack Software Engineer specializing in high-density frontend architectures, distributed systems, and AI agents."
            : "Portfólio de Pedro Lucas Reis. Engenheiro de Software Full Stack especializado em arquiteturas web de alta densidade, sistemas distribuídos e engenharia de agentes de IA."
        }
        canonicalUrl={getSiteUrl()}
        locale={isEn ? "en_US" : "pt_BR"}
      />

      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        <HomeIntro />
        <ContentBoundary fallback={<ContentStatus status="error" scope="section" />}>
          <HomeSections />
        </ContentBoundary>
      </main>
      <SiteFooter />
    </div>
  )
}

export default HomePage
