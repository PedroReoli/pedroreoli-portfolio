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

  // Brand logo is visible always on subpages, or when scrolled past hero on homepage
  const showBrandLogo = !isHomePage || scrolledPastHero

  return (
    <>
      {/* Acessibilidade: Skip link */}
      <a href="#main-content" className="skip-link">
        {isEn ? "Skip to content" : "Pular para o conteúdo"}
      </a>

      {/* ========================================================
          DESKTOP: Floating Brand Link (Top Left)
          Smoothly appears on scroll on Home, or always on subpages
          ======================================================== */}
      <AnimatePresence>
        {showBrandLogo && navigationVisible && (
          <m.div
            initial={reduceMotion ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:block fixed top-6 left-6 md:left-8 z-50"
          >
            <Link
              to="/"
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#161514]/80 px-4 py-2 text-xs font-bold tracking-tight text-[#edeae4] backdrop-blur-xl transition-all duration-300 hover:border-white/30 hover:bg-[#1f1e1c]/95 hover:shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
              aria-label={isEn ? "Go to home" : "Ir para o início"}
            >
              <span className="font-extrabold tracking-[-0.03em]">Pedro</span>
              <span
                className="text-[0.5rem] text-[#82aaff] transition-transform duration-300 group-hover:scale-125"
                aria-hidden="true"
              >
                ■
              </span>
              <span className="font-extrabold tracking-[-0.03em]">Reoli</span>
            </Link>
          </m.div>
        )}
      </AnimatePresence>

      {/* ========================================================
          DESKTOP: Floating Menu Fixed to the Right
          ======================================================== */}
      <m.aside
        initial={reduceMotion ? false : { opacity: 0, x: 24 }}
        animate={{ opacity: navigationVisible ? 1 : 0, x: navigationVisible ? 0 : 24 }}
        transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed right-6 top-1/2 z-50 hidden w-44 -translate-y-1/2 flex-col items-center gap-2 rounded-2xl border border-white/12 bg-[#141312]/85 p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-2xl md:flex ${
          navigationVisible ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-label={isEn ? "Floating navigation" : "Navegação flutuante"}
      >
        {/* Navigation Links */}
        <nav
          className="flex w-full flex-col gap-1"
          aria-label={isEn ? "Site links" : "Links do site"}
        >
          {navLinks.map((link) => {
            const isActive = link.path === "/" ? pathname === "/" : pathname.startsWith(link.path)
            const Icon = link.icon

            return (
              <Link
                key={link.path}
                to={link.path}
                aria-current={isActive ? "page" : undefined}
                className={`group flex h-10 w-full items-center justify-between rounded-xl px-3 text-[11px] font-mono uppercase tracking-[0.14em] transition-all duration-200 ${
                  isActive
                    ? "border border-white/15 bg-white/12 font-bold text-white shadow-sm"
                    : "border border-transparent text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={`h-4 w-4 shrink-0 transition-colors ${
                      isActive ? "text-[#82aaff]" : "opacity-60 group-hover:opacity-100"
                    }`}
                  />
                  <span className="whitespace-nowrap">{link.label}</span>
                </div>
                <span
                  className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? "scale-125 bg-[#82aaff] shadow-[0_0_8px_#82aaff]"
                      : "bg-white/20 group-hover:bg-white/40"
                  }`}
                  aria-hidden="true"
                />
              </Link>
            )
          })}
        </nav>

        {/* Subtle Divider */}
        <div className="h-[1px] w-full bg-white/10" aria-hidden="true" />

        {/* Language Switcher (Segmented Control with Vector Flags) */}
        <div className="flex w-full items-center rounded-xl border border-white/10 bg-white/5 p-1">
          <button
            type="button"
            onClick={() => language !== "pt" && toggleLanguage()}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-1.5 text-center font-mono text-[10px] font-bold tracking-wider transition-all duration-200 ${
              language === "pt"
                ? "bg-white text-[#111010] shadow-sm"
                : "text-white/50 hover:text-white"
            }`}
            aria-label="Mudar para Português"
          >
            <FlagIcon country="br" className="h-2.5 w-3.5 rounded-[2px]" />
            <span>PT</span>
          </button>
          <button
            type="button"
            onClick={() => language !== "en" && toggleLanguage()}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-1.5 text-center font-mono text-[10px] font-bold tracking-wider transition-all duration-200 ${
              language === "en"
                ? "bg-white text-[#111010] shadow-sm"
                : "text-white/50 hover:text-white"
            }`}
            aria-label="Switch to English"
          >
            <FlagIcon country="us" className="h-2.5 w-3.5 rounded-[2px]" />
            <span>EN</span>
          </button>
        </div>

        {/* Contact CTA */}
        <a
          href={getMailtoUrl()}
          className="group flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-white/10 px-3 text-[10px] font-mono font-bold uppercase tracking-[0.14em] text-white transition-all duration-200 hover:bg-white hover:text-[#111010]"
          title={isEn ? "Let's talk" : "Vamos conversar"}
        >
          <span>{isEn ? "Contact" : "Contato"}</span>
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </m.aside>

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
