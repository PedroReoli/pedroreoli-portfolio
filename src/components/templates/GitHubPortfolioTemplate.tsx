import React from "react"
import HeroCleanExecutive from "../organisms/HeroCleanExecutive"
import GitHubProjectsSection from "../organisms/GitHubProjectsSection"
import GitHubExperienceSection from "../organisms/GitHubExperienceSection"
import EducationAndLanguagesSection from "../organisms/EducationAndLanguagesSection"
import SkillsSection from "../organisms/SkillsSection"
import GitHubFooter from "../organisms/GitHubFooter"
import FloatingSectionNav from "../molecules/FloatingSectionNav"
import { useLanguage } from "../../i18n/useLanguage"

export const GitHubPortfolioTemplate: React.FC = () => {
  const { language, toggleLanguage } = useLanguage()

  return (
    <div className="min-h-screen bg-[#07080b] text-[#ffffff] font-sans antialiased selection:bg-white selection:text-black overflow-x-clip relative">
      
      {/* Floating Side Index (Desktop Only) */}
      <FloatingSectionNav />

      {/* Discreet Language Switcher (Top Right) */}
      <div className="fixed top-5 right-5 sm:top-6 sm:right-8 z-40">
        <button
          type="button"
          onClick={toggleLanguage}
          className="px-3.5 py-1.5 rounded-full bg-[#0c0f16]/85 hover:bg-[#0c0f16] border border-white/10 hover:border-white/20 text-xs font-mono font-bold text-zinc-300 hover:text-white transition-all backdrop-blur-md shadow-lg flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981]"
          title={language === "pt" ? "Alternar idioma (PT / EN)" : "Switch language (PT / EN)"}
          aria-label={language === "pt" ? "Alternar idioma (PT / EN)" : "Switch language (PT / EN)"}
        >
          <span className={language === "pt" ? "text-[#10b981]" : "text-zinc-500"}>PT</span>
          <span className="text-zinc-600">/</span>
          <span className={language === "en" ? "text-[#10b981]" : "text-zinc-500"}>EN</span>
        </button>
      </div>

      {/* Main Content */}
      <main className="w-full overflow-x-clip relative bg-[#07080b]">
        {/* Section 1: Executive Clean Hero (Monumental Typography & Focus) */}
        <HeroCleanExecutive />

        {/* Section 2: Flagship Systems, Corporate Projects with Video Slots & Freelance Web */}
        <GitHubProjectsSection />

        {/* Section 3: Engineering Career & Timeline */}
        <GitHubExperienceSection />

        {/* Section 4: Education, Certifications & Languages */}
        <EducationAndLanguagesSection />

        {/* Section 5: Architecture, Cloud & Tech Stack */}
        <SkillsSection />

        {/* Footer / Contact */}
        <GitHubFooter />
      </main>

    </div>
  )
}

export default GitHubPortfolioTemplate
