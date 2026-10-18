import React from "react"
import StitchHeader from "../components/organisms/StitchHeader"
import StitchHeroProjects from "../components/organisms/StitchHeroProjects"
import StitchPressFeature from "../components/organisms/StitchPressFeature"
import StitchDossierSection from "../components/organisms/StitchDossierSection"

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#154c94] via-[#1a5ab3] to-[#14488a] font-body-md text-white antialiased flex flex-col selection:bg-white selection:text-[#144b91] relative overflow-x-hidden">
      {/* Navbar Superior Celestial Fosca (Início, Projetos, Mídia & Blog) */}
      <StitchHeader />

      {/* Dobra 1: Hero Executivo Puro Widescreen (Full Viewport Width & Height) */}
      <StitchHeroProjects />

      {/* Conteúdo Abaixo: Seções com Container Centralizado (max-w-6xl) */}
      <main className="flex-1 flex flex-col relative w-full px-4 sm:px-8 max-w-6xl mx-auto gap-12 sm:gap-16 pb-16">
        {/* Dobra 2: Seção de Destaques de Imprensa & Reconhecimento */}
        <StitchPressFeature />

        {/* Dobra 3 & 4: Dossiê Técnico Integrado (Matriz, Trajetória, Formação Stacked & Contato) */}
        <StitchDossierSection />
      </main>
    </div>
  )
}

export default HomePage
