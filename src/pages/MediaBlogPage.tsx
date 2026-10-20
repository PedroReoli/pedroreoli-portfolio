import React from "react"
import SEOHead from "../components/atoms/SEOHead"
import StitchHeader from "../components/organisms/StitchHeader"
import StitchMediaBlogSection from "../components/organisms/StitchMediaBlogSection"
import StitchFooter from "../components/organisms/StitchFooter"
import TransitionEffect from "../components/atoms/TransitionEffect"
import CelestialHireMe from "../components/molecules/CelestialHireMe"
import { useLanguage } from "../i18n/useLanguage"

export const MediaBlogPage: React.FC = () => {
  const { language } = useLanguage()
  const isEn = language === "en"

  return (
    <div className="min-h-screen bg-[#0d1117] font-body text-[#f0f6fc] antialiased flex flex-col relative overflow-x-hidden">
      {/* Metatags e SEO Dinâmico */}
      <SEOHead
        title={
          isEn
            ? "Technical Publications & Media | Pedro Lucas Reis"
            : "Mídia & Publicações Técnicas | Pedro Lucas Reis"
        }
        description={
          isEn
            ? "Technical essays, open-source architecture documentation, and press recognition of software engineer Pedro Lucas Reis."
            : "Ensaios técnicos de engenharia de software, documentação de sistemas de código aberto e cobertura na imprensa sobre Pedro Lucas Reis."
        }
        canonicalUrl="https://pedroreis.vercel.app/midia-blog"
      />

      <TransitionEffect />
      <StitchHeader />

      <main className="flex-1 flex flex-col relative w-full pt-24 pb-8 px-4 sm:px-8 max-w-6xl mx-auto">
        <StitchMediaBlogSection />
      </main>

      <StitchFooter />
      <CelestialHireMe />
    </div>
  )
}

export default MediaBlogPage
