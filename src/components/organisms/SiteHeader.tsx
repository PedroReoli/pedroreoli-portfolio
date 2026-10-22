import React, { useEffect, useRef, useState } from "react"
import { AnimatePresence, m, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion"
import { Link, useLocation } from "react-router-dom"
import { ArrowUpRight, Menu, X, Home, Briefcase, FileText } from "lucide-react"
import { getMailtoUrl } from "../../config/site"
import { useLanguage } from "../../i18n/useLanguage"
import FlagIcon from "../atoms/FlagIcon"

export const SiteHeader: React.FC = () => {
  const { language, toggleLanguage } = useLanguage()
  const { pathname } = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolledPastHero, setScrolledPastHero] = useState(false)
  const [navigationVisible, setNavigationVisible] = useState(true)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const { scrollY } = useScroll()
  const reduceMotion = Boolean(useReducedMotion())
  const isEn = language === "en"
  const isHomePage = pathname === "/"

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? latest
    setScrolledPastHero(latest > 120)

    if (mobileMenuOpen || latest < 80) {
      setNavigationVisible(true)
      return
    }

    if (latest > previous && latest > 120) {
      setNavigationVisible(false)
      return
    }

    if (latest < previous) setNavigationVisible(true)
  })

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (mobileMenuOpen) setNavigationVisible(true)
  }, [mobileMenuOpen])

  useEffect(() => {
    if (!mobileMenuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return
      setMobileMenuOpen(false)
      window.requestAnimationFrame(() => menuButtonRef.current?.focus())
    }

    window.addEventListener("keydown", closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", closeOnEscape)
    }
  }, [mobileMenuOpen])

  const navLinks = [
    {
      path: "/",
      label: isEn ? "Home" : "Início",
      icon: Home,
    },
    {
      path: "/projetos",
      label: isEn ? "Work" : "Projetos",
      icon: Briefcase,
    },
    {
      path: "/midia-blog",
      label: isEn ? "Notes" : "Notas",
      icon: FileText,
    },
  ]

  return (
    <>
      {/* Acessibilidade: Skip link */}
      <a href="#main-content" className="skip-link">
        {isEn ? "Skip to content" : "Pular para o conteúdo"}
      </a>

      <m.header
        initial={false}
        animate={{ y: navigationVisible ? 0 : "-110%" }}
        transition={{ duration: reduceMotion ? 0 : 0.32, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 hidden h-16 items-center border-b transition-colors duration-300 md:flex ${
          scrolledPastHero || !isHomePage
            ? "border-white/10 bg-[#111010]/88 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="editorial-container grid grid-cols-[1fr_auto_1fr] items-center gap-6">
          <Link
            to="/"
            className="group inline-flex w-fit items-center gap-2 text-xs font-extrabold uppercase tracking-[-0.03em] text-[#edeae4]"
            aria-label={isEn ? "Go to home" : "Ir para o início"}
          >
            <span>Pedro</span>
            <span className="text-[0.48rem] text-[#82aaff]" aria-hidden="true">
              ■
            </span>
            <span>Reoli</span>
          </Link>

          <nav
            className="flex items-center gap-7"
            aria-label={isEn ? "Site links" : "Links do site"}
          >
            {navLinks.map((link) => {
              const isActive = link.path === "/" ? pathname === "/" : pathname.startsWith(link.path)

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                    isActive ? "text-white" : "text-white/50 hover:text-white"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute inset-x-0 bottom-0 h-px origin-left bg-[#82aaff] transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                    aria-hidden="true"
                  />
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={toggleLanguage}
              className="inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-white/60 transition-colors hover:text-white"
              aria-label={isEn ? "Switch language to Portuguese" : "Mudar idioma para inglês"}
            >
              <FlagIcon country={language === "pt" ? "br" : "us"} className="h-2.5 w-3.5" />
              <span>{language === "pt" ? "PT" : "EN"}</span>
            </button>
            <a
              href={getMailtoUrl()}
              className="group inline-flex items-center gap-2 border-b border-[#82aaff] pb-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-white"
            >
              <span>{isEn ? "Let's talk" : "Vamos conversar"}</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </m.header>

      {/* ========================================================
          MOBILE: Standard Fixed Top Navbar
          ======================================================== */}
      <m.header
        initial={false}
        animate={{ y: navigationVisible ? 0 : "-100%" }}
        transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between border-b border-white/10 bg-[#111010]/90 px-4 backdrop-blur-xl md:hidden"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[-0.03em] text-[#edeae4]"
          aria-label={isEn ? "Go to home" : "Ir para o início"}
        >
          Pedro
          <span className="text-[0.5rem] text-[#82aaff]" aria-hidden="true">
            ■
          </span>
          Reoli
        </Link>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.1em] text-white/90 transition-colors hover:text-white"
            aria-label={isEn ? "Switch language to Portuguese" : "Mudar idioma para inglês"}
          >
            <FlagIcon
              country={language === "pt" ? "br" : "us"}
              className="h-2.5 w-3.5 rounded-[2px]"
            />
            <span>{language === "pt" ? "PT" : "EN"}</span>
          </button>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileMenuOpen((current) => !current)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-white/15 text-[#edeae4] transition-colors hover:bg-white/10"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={
              mobileMenuOpen
                ? isEn
                  ? "Close menu"
                  : "Fechar menu"
                : isEn
                ? "Open menu"
                : "Abrir menu"
            }
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </m.header>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <m.nav
            id="mobile-navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-14 z-40 border-b border-white/10 bg-[#111010]/98 px-5 py-6 shadow-2xl backdrop-blur-2xl md:hidden"
            aria-label={isEn ? "Mobile navigation" : "Navegação mobile"}
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link, index) => {
                const isActive =
                  link.path === "/" ? pathname === "/" : pathname.startsWith(link.path)
                const Icon = link.icon

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between rounded-xl border border-transparent p-3.5 text-lg font-bold tracking-[-0.02em] transition-all ${
                      isActive
                        ? "border-white/15 bg-white/10 text-white"
                        : "text-[#8d8984] hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="h-4 w-4 opacity-70" />
                      <span>{link.label}</span>
                    </span>
                    <span
                      className={`text-xs font-mono ${
                        isActive ? "text-[#82aaff]" : "text-[#8d8984]"
                      }`}
                    >
                      0{index + 1}
                    </span>
                  </Link>
                )
              })}

              <a
                href={getMailtoUrl()}
                className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-white p-3.5 text-xs font-mono font-bold uppercase tracking-[0.14em] text-[#111010] shadow-lg transition-transform active:scale-95"
              >
                <span>{isEn ? "Let's talk" : "Vamos conversar"}</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </m.nav>
        )}
      </AnimatePresence>
    </>
  )
}

export default SiteHeader
