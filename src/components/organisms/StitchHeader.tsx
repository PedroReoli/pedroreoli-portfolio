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
    <header className="fixed top-0 w-full z-50 pt-safe bg-[#0d0f15]/90 backdrop-blur-xl shadow-[0_1px_12px_rgba(0,0,0,0.5)] border-b border-white/[0.08]">
      <div className="h-16 px-4 sm:px-8 max-w-6xl mx-auto flex items-center justify-between gap-4">
        {/* Identidade: PR Logo + Nome */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-surface-container-high group-hover:bg-emerald-500/20 text-white group-hover:text-emerald-300 font-headline-sm text-base font-bold tracking-tighter border border-white/10 group-hover:border-emerald-500/40 transition-all shadow-sm">
            PR
          </div>
          <div className="flex flex-col">
            <span className="font-headline-sm text-white font-bold tracking-tight text-sm group-hover:text-emerald-300 transition-colors">
              Pedro Lucas Reis
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-telemetry-tag text-emerald-400 uppercase tracking-wider text-[10px] font-semibold">
                FULL STACK &amp; AI ARCHITECT
              </span>
            </div>
          </div>
        </Link>

        {/* 3 Links de Navegação Limpos */}
        <nav className="flex items-center gap-1 sm:gap-2 bg-surface-container/70 p-1 rounded-xl border border-white/5">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-headline-sm transition-all cursor-pointer ${
                link.isActive
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold"
                  : "text-zinc-400 hover:text-white hover:bg-white/5 font-medium"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Seletor de Idioma & Avatar */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleLanguage}
            className="px-2.5 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-zinc-300 hover:text-white font-code-inline text-[11px] transition-all border border-white/10 hover:border-white/20 flex items-center gap-1 cursor-pointer"
            title={language === "pt" ? "Alternar para Inglês (EN)" : "Switch to Portuguese (PT)"}
            aria-label="Alternar Idioma"
          >
            <span className={language === "pt" ? "text-emerald-400 font-bold" : "text-zinc-500"}>PT</span>
            <span className="text-zinc-600">/</span>
            <span className={language === "en" ? "text-emerald-400 font-bold" : "text-zinc-500"}>EN</span>
          </button>

          <Link to="/" title="Pedro Lucas Reis">
            <img
              alt="Pedro Lucas Reis"
              className="w-9 h-9 rounded-full object-cover object-top border border-emerald-500/30 shadow-sm hover:scale-105 transition-transform"
              src="/eu-profissional.png"
              onError={(e) => {
                const target = e.currentTarget
                target.onerror = null
                target.src =
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuBtxYDrcM1Qy-1E_8i5XEtqLBXfxC-nfmr2bWSoBDeLxNRDIKnqG6Cb0HjTebAtdmDlKV2pgKz4RrFg1jPQki67K4EAM5K2Ns5qoSobeVk95EbeCRrlRVt1OqVKSgrkYWPjpsJP7OIGFYL-S8r_E97TiZxs194cTKwJuTeArEUiwXQDFnF63JyHrVPm1jBLV9KNi_Bc2l0F1yL8Q5dY1X8ZdIiumZ_CgKvfcmQKWp8--BYN_AHNaTV9"
              }}
            />
          </Link>
        </div>
      </div>
    </header>
  )
}

export default StitchHeader
