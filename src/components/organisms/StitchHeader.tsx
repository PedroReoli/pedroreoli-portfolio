import React from "react"
import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
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
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="fixed top-0 w-full z-50 pt-safe bg-[#154c94]/80 backdrop-blur-xl shadow-[0_4px_24px_rgba(8,28,68,0.3)] border-b border-white/20 select-none"
    >
      <div className="h-16 px-4 sm:px-8 max-w-7xl mx-auto flex items-center justify-between gap-3 text-white">
        
        {/* Identidade Esquerda: Monograma + Nome com Micro-Bounce */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2.5 group">
            <motion.div
              whileHover={{ scale: 1.12, rotate: 5 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 450, damping: 20 }}
              className="w-8 h-8 rounded-full bg-white/20 border border-white/40 flex items-center justify-center text-white font-serif font-bold text-sm tracking-tight shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            >
              P
            </motion.div>
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

        {/* Centro: Links de Navegação em Pílula de Vidro Fosco + Moon Badge */}
        <div className="flex items-center gap-2">
          <nav className="flex items-center gap-1 p-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-inner">
            {navLinks.map((link) => (
              <motion.div
                key={link.path}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 450, damping: 22 }}
              >
                <Link
                  to={link.path}
                  className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer block ${
                    link.isActive
                      ? "bg-white text-[#144b91] font-bold shadow-md shadow-blue-950/20"
                      : "text-white/80 hover:text-white hover:bg-white/15"
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>

        {/* Lado Direito: Visualizador de Áudio / Telemetria, Idioma e Botão Contato */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Micro Visualizador de Áudio / Onda Sonora (Inspirado no print Lué Studio) */}
          <div
            className="hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-sm"
            title="Audio & Telemetry Link: Online"
          >
            <span className="material-symbols-outlined text-[14px] text-sky-300">graphic_eq</span>
            <div className="flex items-center gap-0.5 h-3">
              {[4, 10, 6, 12, 5].map((_, i) => (
                <motion.span
                  key={i}
                  className="w-0.5 bg-white/80 rounded-full"
                  animate={{
                    height: ["3px", "11px", "5px", "13px", "3px"],
                  }}
                  transition={{
                    duration: 1.1 + i * 0.15,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Seletor de Idioma Pílula com Micro-Spring */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 450, damping: 22 }}
            type="button"
            onClick={toggleLanguage}
            className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-code-inline text-[11px] transition-all border border-white/25 flex items-center gap-1 cursor-pointer"
            title={language === "pt" ? "Switch to English" : "Mudar para Português"}
            aria-label="Alternar Idioma"
          >
            <span className={language === "pt" ? "text-white font-bold" : "text-white/50"}>PT</span>
            <span className="text-white/40">/</span>
            <span className={language === "en" ? "text-white font-bold" : "text-white/50"}>EN</span>
          </motion.button>

          {/* Botão "Get in Touch / Contato" estilo Lué Studio */}
          <motion.a
            whileHover={{ scale: 1.06, y: -1 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring", stiffness: 450, damping: 22 }}
            href="https://wa.me/5524993264040?text=Ol%C3%A1%20Pedro,%20vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar."
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1.5 rounded-full bg-white hover:bg-sky-50 text-[#144b91] hover:text-[#0f3c78] font-bold text-xs transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap border border-white/40"
          >
            {isEn ? "Get in touch" : "Contato"}
          </motion.a>
        </div>
      </div>
    </motion.header>
  )
}

export default StitchHeader
