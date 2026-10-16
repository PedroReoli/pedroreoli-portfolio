import React from "react"
import * as portfolioPT from "../../data/portfolio"
import * as portfolioEN from "../../data/portfolio.en"
import { FiGithub, FiLinkedin, FiMail, FiPhone, FiArrowUp } from "react-icons/fi"
import { useLanguage } from "../../i18n/useLanguage"

export const GitHubFooter: React.FC = () => {
  const { language } = useLanguage()
  const profile = language === "pt" ? portfolioPT.profile : portfolioEN.profile

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer id="contact" className="bg-[#07080b] border-t border-white/[0.06] py-12 sm:py-16 text-xs sm:text-sm text-zinc-400 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        
        {/* Left: Branding & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-4">
          <span className="font-heading font-extrabold text-white text-base tracking-tight">
            PedroReoli <span className="text-[#10b981] font-mono text-xs font-normal">/ dev</span>
          </span>
          <span className="hidden sm:inline text-white/20">|</span>
          <span className="text-xs font-mono text-zinc-500">
            © {new Date().getFullYear()} {profile.name}. {language === "pt" ? "Todos os direitos reservados." : "All rights reserved."}
          </span>
        </div>

        {/* Right: Social Action Links + Back to Top Button */}
        <div className="flex items-center gap-2.5">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="w-11 h-11 rounded-xl border border-white/10 bg-[#0c0f16] hover:border-white/30 hover:bg-white/[0.06] hover:text-white flex items-center justify-center text-zinc-300 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981]"
            title="GitHub"
            aria-label="GitHub"
          >
            <FiGithub className="text-base" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="w-11 h-11 rounded-xl border border-white/10 bg-[#0c0f16] hover:border-white/30 hover:bg-white/[0.06] hover:text-white flex items-center justify-center text-zinc-300 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981]"
            title="LinkedIn"
            aria-label="LinkedIn"
          >
            <FiLinkedin className="text-base" />
          </a>
          <a
            href={profile.phoneHref}
            target="_blank"
            rel="noreferrer"
            className="w-11 h-11 rounded-xl border border-white/10 bg-[#0c0f16] hover:border-[#10b981]/50 hover:bg-[#10b981]/10 hover:text-[#10b981] flex items-center justify-center text-zinc-300 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981]"
            title="WhatsApp"
            aria-label="WhatsApp"
          >
            <FiPhone className="text-base" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="w-11 h-11 rounded-xl border border-white/10 bg-[#0c0f16] hover:border-white/30 hover:bg-white/[0.06] hover:text-white flex items-center justify-center text-zinc-300 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981]"
            title="E-mail"
            aria-label="E-mail"
          >
            <FiMail className="text-base" />
          </a>

          <button
            type="button"
            onClick={scrollToTop}
            className="w-11 h-11 rounded-xl border border-white/10 bg-[#0c0f16] hover:border-white/40 hover:bg-white hover:text-black flex items-center justify-center text-zinc-300 transition-all ml-1.5 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981]"
            title={language === "pt" ? "Voltar ao topo" : "Back to top"}
            aria-label={language === "pt" ? "Voltar ao topo" : "Back to top"}
          >
            <FiArrowUp className="text-base" />
          </button>
        </div>

      </div>
    </footer>
  )
}

export default GitHubFooter
