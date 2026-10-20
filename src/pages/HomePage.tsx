import React from "react"
import SEOHead from "../components/atoms/SEOHead"
import StitchHeader from "../components/organisms/StitchHeader"
import StitchHeroProjects from "../components/organisms/StitchHeroProjects"
import StitchDossierSection from "../components/organisms/StitchDossierSection"
import StitchFooter from "../components/organisms/StitchFooter"
import TransitionEffect from "../components/atoms/TransitionEffect"
import CelestialHireMe from "../components/molecules/CelestialHireMe"
import { useLanguage } from "../i18n/useLanguage"

export const HomePage: React.FC = () => {
  const { language } = useLanguage()
  const isEn = language === "en"

  return (
    <div className="min-h-screen bg-[#0d1117] font-body text-[#f0f6fc] antialiased flex flex-col relative overflow-x-hidden">
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
      />

      {/* Efeito de Transição de Rota */}
      <TransitionEffect />

      {/* Header Fixo Sóbrio */}
      <StitchHeader />

      {/* Dobra 1: Hero Executiva com Foto e Prova Social de Imprensa */}
      <StitchHeroProjects />

      {/* Dobra 2: Dossiê Técnico, Stack em Grid e Trajetória */}
      <main className="flex-1 flex flex-col relative w-full px-4 sm:px-8 max-w-6xl mx-auto">
        <StitchDossierSection />
      </main>

      {/* Rodapé Executivo de Alto Padrão */}
      <StitchFooter />

      {/* Botão de Contato Flutuante Discreto */}
      <CelestialHireMe />
    </div>
  )
}

export default HomePage
