import React from "react"
import { Link, useLocation } from "react-router-dom"
import { useLanguage } from "../../i18n/useLanguage"

export const StitchHeader: React.FC = () => {
  const { language, toggleLanguage } = useLanguage()
  const location = useLocation()
  const isEn = language === "en"
  const pathname = location.pathname

  const navLinks = [
    { path: "/", label: isEn ? "Home" : "Início", isActive: pathname === "/" },
    { path: "/projetos", label: isEn ? "Projects" : "Projetos", isActive: pathname.startsWith("/projetos") },
    { path: "/midia-blog", label: isEn ? "Media & Blog" : "Mídia & Blog", isActive: pathname.startsWith("/midia") },
  ]

  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-[#154c94]/75 backdrop-blur-xl shadow-[0_4px_24px_rgba(8,28,68,0.3)] border-b border-white/20">
      <div className="h-16 px-4 sm:px-8 max-w-7xl mx-auto flex items-center justify-between gap-3 text-white">
        
        {/* Identidade Esquerda (Inspirada no Lué Studio: Studio Name ® • Design & Dev • Time) */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full bg-white/20 border border-white/35 flex items-center justify-center text-white font-serif font-bold text-sm tracking-tight shadow-[0_0_15px_rgba(255,255,255,0.25)] group-hover:scale-105 transition-transform">
              P
            </div>
            <div className="flex flex-col">
              <span className="font-serif tracking-tight font-bold text-sm sm:text-base text-white drop-shadow-sm flex items-center gap-1">
                Pedro Lucas Reis
                <span className="text-[10px] text-white/70 font-sans">®</span>
              </span>
              <span className="text-[10px] text-sky-200/80 font-code-inline tracking-wider uppercase hidden sm:inline">
                {isEn ? "Full Stack & AI Architect" : "Engenharia & Arquitetura"}
              </span>
            </div>
          </Link>

          <span className="hidden lg:inline text-white/30 text-xs">•</span>
          <span className="hidden lg:inline text-[11px] text-sky-100/70 font-code-inline">
            VR - BR (UTC-3)
          </span>
        </div>

        {/* Centro: Links de Navegação com Pílulas de Vidro Fosco */}
        <nav className="flex items-center gap-1 sm:gap-1.5 p-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-inner">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer ${
                link.isActive
                  ? "bg-white text-[#144b91] font-bold shadow-md shadow-blue-950/20"
                  : "text-white/80 hover:text-white hover:bg-white/15"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Lado Direito: Coordenadas, Seletor de Idioma e Botão "Get in Touch" */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Coordenadas Estilo Lué Studio */}
          <span className="hidden xl:inline text-[10px] text-sky-200/70 font-code-inline tracking-wider">
            22.5235° S, 44.1041° W
          </span>

          {/* Seletor de Idioma Pílula */}
          <button
            type="button"
            onClick={toggleLanguage}
            className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-code-inline text-[11px] transition-all border border-white/25 flex items-center gap-1 cursor-pointer"
            title={language === "pt" ? "Switch to English" : "Mudar para Português"}
            aria-label="Alternar Idioma"
          >
            <span className={language === "pt" ? "text-white font-bold" : "text-white/50"}>PT</span>
            <span className="text-white/40">/</span>
            <span className={language === "en" ? "text-white font-bold" : "text-white/50"}>EN</span>
          </button>

          {/* Botão "Get in Touch" estilo Lué Studio */}
          <a
            href="https://wa.me/5524993264040?text=Ol%C3%A1%20Pedro,%20vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar."
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1.5 rounded-full bg-white hover:bg-sky-50 text-[#144b91] hover:text-[#0f3c78] font-bold text-xs sm:text-xs transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap"
          >
            {isEn ? "Get in touch" : "Contato"}
          </a>
        </div>
      </div>
    </header>
  )
}

export default StitchHeader
