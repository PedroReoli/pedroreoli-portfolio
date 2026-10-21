import React, { Suspense, lazy } from "react"
import SEOHead from "../components/atoms/SEOHead"
import SiteHeader from "../components/organisms/SiteHeader"
import PortfolioHero from "../components/organisms/PortfolioHero"
import SiteFooter from "../components/organisms/SiteFooter"
import TransitionEffect from "../components/atoms/TransitionEffect"
import { useLanguage } from "../i18n/useLanguage"

const HomeSections = lazy(() => import("../components/organisms/HomeSections"))

export const HomePage: React.FC = () => {
  const { language } = useLanguage()
  const isEn = language === "en"

  return (
    <div className="min-h-screen bg-[#111010] text-[#edeae4] antialiased overflow-x-hidden">
      {/* Metatags e SEO Dinâmico */}
      <SEOHead
        title={
          isEn
            ? "Pedro Lucas Reis | Full Stack Software Engineer & Systems Architect"
            : "Pedro Lucas Reis | Engenheiro de Software Full Stack & Arquiteto de Sistemas"
        }
        description={
          isEn
            ? "Portfolio of Pedro Lucas Reis — Full Stack Software Engineer specializing in high-density frontend architectures, distributed systems, and AI agents."
            : "Portfólio de Pedro Lucas Reis — Engenheiro de Software Full Stack especializado em arquiteturas web de alta densidade, sistemas distribuídos e engenharia de agentes de IA."
        }
        canonicalUrl="https://pedroreis.vercel.app/"
        locale={isEn ? "en_US" : "pt_BR"}
      />

      {/* Efeito de Transição de Rota */}
      <TransitionEffect />

      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        <PortfolioHero />
        <Suspense
          fallback={(
            <section className="grid min-h-[100svh] place-items-center border-y border-white/10" role="status">
              <span className="editorial-label text-[#8d8984]">
                {isEn ? "Loading selected work" : "Carregando projetos selecionados"}
              </span>
            </section>
          )}
        >
          <HomeSections />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  )
}

export default HomePage
