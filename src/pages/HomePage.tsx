import React from "react"
import StitchHeader from "../components/organisms/StitchHeader"
import StitchHeroProjects from "../components/organisms/StitchHeroProjects"
import StitchPressFeature from "../components/organisms/StitchPressFeature"
import StitchDossierSection from "../components/organisms/StitchDossierSection"

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0d0f15] font-body-md text-zinc-100 antialiased flex flex-col selection:bg-emerald-400 selection:text-zinc-950 relative overflow-x-hidden">
      {/* Navbar Superior Limpa (Início, Projetos, Mídia & Blog) */}
      <StitchHeader />

      {/* Container Principal Widescreen (max-w-6xl) */}
      <main className="flex-1 flex flex-col relative w-full pt-16 px-4 sm:px-8 max-w-6xl mx-auto">
        {/* Dobra 1: Hero Executivo Puro (100dvh) */}
        <StitchHeroProjects />

        {/* Dobra 2: Seção de Destaques de Imprensa & Reconhecimento */}
        <StitchPressFeature />

        {/* Dobra 3 & 4: Dossiê Técnico Integrado (Matriz, Trajetória, Formação Stacked & Contato) */}
        <StitchDossierSection />
      </main>
    </div>
  )
}

export default HomePage
