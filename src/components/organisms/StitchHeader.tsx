import React, { useEffect, useState } from "react"
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion"
import { Link, useLocation } from "react-router-dom"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { useLanguage } from "../../i18n/useLanguage"

export const StitchHeader: React.FC = () => {
  const { language, toggleLanguage } = useLanguage()
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [headerVisible, setHeaderVisible] = useState(true)
  const { scrollY } = useScroll()
  const reduceMotion = useReducedMotion()
  const isEn = language === "en"

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? current

    if (menuOpen || current < 80) {
      setHeaderVisible(true)
      return
    }

    if (current > previous && current > 120) {
      setHeaderVisible(false)
      return
    }

    if (current < previous) setHeaderVisible(true)
  })

  useEffect(() => {
    if (menuOpen) setHeaderVisible(true)
  }, [menuOpen])

  const navLinks = [
    { path: "/", label: isEn ? "Home" : "Início" },
    { path: "/projetos", label: isEn ? "Work" : "Projetos" },
    { path: "/midia-blog", label: isEn ? "Notes" : "Notas" },
  ]

  return (
    <motion.header
      initial={false}
      animate={{ y: headerVisible ? 0 : "-100%" }}
      transition={{ duration: reduceMotion ? 0 : 0.32, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#111010]/80 backdrop-blur-xl"
    >
      <div className="editorial-container flex h-16 items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-[-0.04em] text-[#edeae4]"
          aria-label={isEn ? "Go to home" : "Ir para o início"}
        >
          Pedro<span className="text-[#82aaff]">■</span>Reoli
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Navegação principal">
          {navLinks.map((link) => {
            const isActive = link.path === "/" ? pathname === "/" : pathname.startsWith(link.path)
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`editorial-label transition-colors ${
                  isActive ? "text-[#edeae4]" : "text-[#77736f] hover:text-[#edeae4]"
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={toggleLanguage}
            className="editorial-label text-[#a5a19c] transition-colors hover:text-[#edeae4]"
            aria-label={isEn ? "Mudar idioma para português" : "Switch language to English"}
          >
            {language === "pt" ? "PT / EN" : "EN / PT"}
          </button>

          <a
            href="mailto:pedrosousa2160@gmail.com"
            className="hidden items-center gap-1.5 border-b border-[#82aaff] pb-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#edeae4] sm:inline-flex"
          >
            {isEn ? "Let's talk" : "Vamos conversar"}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            className="grid h-9 w-9 place-items-center border border-white/15 text-[#edeae4] md:hidden"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/10 bg-[#111010] md:hidden"
            aria-label="Navegação mobile"
          >
            <div className="editorial-container flex flex-col py-5">
              {navLinks.map((link, index) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between border-b border-white/10 py-4 text-2xl font-bold tracking-[-0.04em] text-[#edeae4]"
                >
                  <span>{link.label}</span>
                  <span className="editorial-label text-[#77736f]">0{index + 1}</span>
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default StitchHeader
