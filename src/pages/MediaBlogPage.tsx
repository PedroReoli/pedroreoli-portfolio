import React from "react"
import SEOHead from "../components/atoms/SEOHead"
import StitchHeader from "../components/organisms/StitchHeader"
import StitchMediaBlogSection from "../components/organisms/StitchMediaBlogSection"
import StitchFooter from "../components/organisms/StitchFooter"
import TransitionEffect from "../components/atoms/TransitionEffect"
import { useLanguage } from "../i18n/useLanguage"

export const MediaBlogPage: React.FC = () => {
  const { language } = useLanguage()
  const isEn = language === "en"

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#111010] text-[#edeae4] antialiased">
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

      <main className="pt-16">
        <StitchMediaBlogSection />
      </main>

      <StitchFooter />
    </div>
  )
}

export default MediaBlogPage
