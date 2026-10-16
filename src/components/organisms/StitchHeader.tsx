import React from "react"
import { Link, useLocation } from "react-router-dom"
import { useLanguage } from "../../i18n/useLanguage"

interface StitchHeaderProps {
  activeTab?: string
  onOpenDiagnostics?: () => void
}

export const StitchHeader: React.FC<StitchHeaderProps> = ({ onOpenDiagnostics }) => {
  const { language, toggleLanguage } = useLanguage()
  const location = useLocation()
  const isEn = language === "en"
  const pathname = location.pathname

  const navLinks = [
    { path: "/", label: isEn ? "Home" : "Início", isActive: pathname === "/" },
    { path: "/projetos", label: isEn ? "Projects" : "Projetos", isActive: pathname.startsWith("/projetos") },
    { path: "/midia-blog", label: isEn ? "Media & Blog" : "Mídia & Blog", isActive: pathname === "/midia-blog" },
    { path: "/dossie-tecnico", label: isEn ? "Dossier" : "Dossiê", isActive: pathname === "/dossie-tecnico" },
  ]

  const getPageTitle = () => {
    if (pathname.startsWith("/projetos")) return isEn ? "Projects & Architecture" : "Projetos & Arquitetura"
    if (pathname === "/midia-blog") return isEn ? "Media & Engineering Blog" : "Mídia & Blog Técnico"
    if (pathname === "/dossie-tecnico") return isEn ? "Technical Dossier" : "Dossiê Técnico"
    return isEn ? "Executive Portfolio" : "Portfólio Executivo"
  }

  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-[#0d0f15]/90 backdrop-blur-xl shadow-[0_1px_12px_rgba(0,0,0,0.5)] border-b border-white/[0.08]">
      <div className="h-16 px-4 sm:px-8 max-w-6xl mx-auto flex items-center justify-between gap-4">
        {/* Identidade e Status do Sistema */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-surface-container-high hover:bg-emerald-500/20 text-white hover:text-emerald-300 font-headline-sm text-base font-bold tracking-tighter border border-white/10 hover:border-emerald-500/40 transition-all cursor-pointer shadow-sm"
            title="Ir para o Início"
          >
            PR
          </Link>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-telemetry-tag text-emerald-400 uppercase tracking-wider text-[10px] font-semibold">
                SYS_VERIFIED // 2026
              </span>
            </div>
            <span className="font-headline-sm text-white tracking-tight font-medium text-xs sm:text-sm">
              {getPageTitle()}
            </span>
          </div>
        </div>

        {/* Links de Navegação Desktop */}
        <nav className="hidden md:flex items-center gap-1 bg-surface-container/70 p-1 rounded-xl border border-white/5">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-1.5 rounded-lg text-xs font-headline-sm font-medium transition-all ${
                link.isActive
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Controles: Idioma, Diagnóstico e Avatar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Seletor de Idioma */}
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

          {/* Terminal / HUD Diagnostics */}
          <button
            type="button"
            onClick={onOpenDiagnostics}
            aria-label="Diagnostics Status"
            className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-surface-container hover:bg-surface-container-high text-zinc-400 hover:text-emerald-300 border border-white/10 hover:border-emerald-500/30 transition-all cursor-pointer"
            title="Telemetria de Sistema"
          >
            <span className="material-symbols-outlined text-[19px]">terminal</span>
          </button>

          {/* Retrato em Miniatura */}
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
