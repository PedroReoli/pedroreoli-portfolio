import React from "react"
import SEOHead from "../components/atoms/SEOHead"
import MediaArchiveSection from "../components/organisms/MediaArchiveSection"
import SiteFooter from "../components/organisms/SiteFooter"
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
            ? "Open-source projects, technical notes and press coverage about software engineer Pedro Lucas Reis."
            : "Projetos de código aberto, notas técnicas e cobertura na imprensa sobre o engenheiro de software Pedro Lucas Reis."
        }
        canonicalUrl="https://pedroreis.vercel.app/midia-blog"
        locale={isEn ? "en_US" : "pt_BR"}
      />

      <main id="main-content" tabIndex={-1} className="pt-16 focus:outline-none">
        <MediaArchiveSection />
      </main>

      <SiteFooter />
    </div>
  )
}

export default MediaBlogPage
