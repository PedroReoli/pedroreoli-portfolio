import React from "react"
import { Link, useLocation } from "react-router-dom"
import { useLanguage } from "../../i18n/useLanguage"

export interface StitchBottomNavProps {
  activeTab?: string
  onSelectTab?: (tabId: string) => void
}

export const StitchBottomNav: React.FC<StitchBottomNavProps> = () => {
  const { language } = useLanguage()
  const location = useLocation()
  const isEn = language === "en"
  const pathname = location.pathname

  const navItems = [
    {
      id: "home",
      path: "/",
      label: isEn ? "Home" : "Início",
      icon: "home",
      isActive: pathname === "/",
    },
    {
      id: "projetos",
      path: "/projetos",
      label: isEn ? "Projects" : "Projetos",
      icon: "grid_view",
      isActive: pathname.startsWith("/projetos"),
    },
    {
      id: "midia-blog",
      path: "/midia-blog",
      label: isEn ? "Media & Blog" : "Mídia & Blog",
      icon: "feed",
      isActive: pathname === "/midia-blog",
    },
    {
      id: "dossie-tecnico",
      path: "/dossie-tecnico",
      label: isEn ? "Dossier" : "Dossiê",
      icon: "data_object",
      isActive: pathname === "/dossie-tecnico",
    },
  ]

  return (
    <nav
      className="fixed bottom-0 w-full z-50 pb-[env(safe-area-inset-bottom,0px)] px-margin pointer-events-none"
      aria-label="Navegação Principal"
    >
      <div className="max-w-md mx-auto mb-3 p-1.5 rounded-2xl bg-surface-container/95 backdrop-blur-xl pointer-events-auto flex items-center justify-between shadow-[0_12px_32px_rgba(0,0,0,0.7)] border border-white/10">
        {navItems.map((item) => {
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex-1 min-h-[46px] flex flex-col items-center justify-center gap-0.5 rounded-xl px-1.5 py-1 transition-all ${
                item.isActive
                  ? "bg-emerald-500/15 text-emerald-300 font-bold border border-emerald-500/30 shadow-sm"
                  : "text-zinc-400 hover:text-white hover:bg-surface-container-high/60"
              }`}
            >
              <span className={`material-symbols-outlined text-[20px] ${item.isActive ? "text-emerald-400" : "text-zinc-400"}`}>
                {item.icon}
              </span>
              <span className={`font-label-caps text-[10px] tracking-wider uppercase truncate max-w-full ${item.isActive ? "text-emerald-300 font-semibold" : "text-zinc-400"}`}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default StitchBottomNav
