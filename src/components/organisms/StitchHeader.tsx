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
    {
      path: "/projetos",
      label: isEn ? "Projects" : "Projetos",
      isActive: pathname.startsWith("/projetos"),
    },
    {
      path: "/midia-blog",
      label: isEn ? "Media & Blog" : "Mídia & Blog",
      isActive: pathname.startsWith("/midia"),
    },
  ]

  return (
    <header className="fixed top-2 sm:top-4 left-0 right-0 z-50 px-2 sm:px-6 max-w-6xl mx-auto flex items-center justify-between pointer-events-none">
      {/* 1. Lado Esquerdo: Identidade (Monograma + Nome) */}
      <div className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg bg-[#161b22]/90 backdrop-blur-md border border-[#30363d] shadow-sm">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#238636] text-white font-mono font-bold text-xs flex items-center justify-center">
            P
          </div>
          <span className="font-semibold text-xs sm:text-sm text-[#f0f6fc] tracking-tight truncate max-w-[120px] xs:max-w-none">
            Pedro Lucas Reis
          </span>
        </Link>
      </div>

      {/* 2. Centro: Navegação Compacta */}
      <nav className="pointer-events-auto flex items-center gap-1 p-1 rounded-lg bg-[#161b22]/90 backdrop-blur-md border border-[#30363d] shadow-sm">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`px-2.5 sm:px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              link.isActive
                ? "bg-[#21262d] text-[#f0f6fc] font-semibold border border-[#30363d]"
                : "text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d]/50"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* 3. Lado Direito: Ações (Idioma & Contato) */}
      <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 px-2 py-1.5 rounded-lg bg-[#161b22]/90 backdrop-blur-md border border-[#30363d] shadow-sm">
        {/* Alternador de Idioma */}
        <button
          type="button"
          onClick={toggleLanguage}
          className="px-2 py-1 rounded-md bg-[#0d1117] hover:bg-[#21262d] text-xs font-mono text-[#8b949e] hover:text-[#f0f6fc] transition-colors border border-[#30363d] flex items-center gap-1 cursor-pointer"
          title={language === "pt" ? "Alternar para Inglês (Switch to English)" : "Switch to Portuguese"}
          aria-label={language === "pt" ? "PT / EN - Alternar para Inglês" : "EN / PT - Switch to Portuguese"}
        >
          <span className={language === "pt" ? "text-[#f0f6fc] font-bold" : "text-[#8b949e]"}>
            PT
          </span>
          <span className="text-[#30363d]">/</span>
          <span className={language === "en" ? "text-[#f0f6fc] font-bold" : "text-[#8b949e]"}>
            EN
          </span>
        </button>

        {/* Botão de Contato Rápido */}
        <a
          href="https://wa.me/5524993264040?text=Ol%C3%A1%20Pedro,%20vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar."
          target="_blank"
          rel="noopener noreferrer"
          className="hidden xs:inline-flex px-3 py-1 rounded-md bg-[#238636] hover:bg-[#2ea043] text-white font-medium text-xs transition-colors shadow-sm whitespace-nowrap"
        >
          {isEn ? "Contact" : "Contato"}
        </a>
      </div>
    </header>
  )
}

export default StitchHeader
