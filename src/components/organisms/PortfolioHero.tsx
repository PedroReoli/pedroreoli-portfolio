import React, { useRef } from "react"
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { useLanguage } from "../../i18n/useLanguage"

const entranceEase = [0.16, 1, 0.3, 1] as const
const heroVideoEnabled = import.meta.env.VITE_HERO_VIDEO_ENABLED === "true"

export const PortfolioHero: React.FC = () => {
  const { language } = useLanguage()
  const isEn = language === "en"
  const reduceMotion = Boolean(useReducedMotion())
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })
  const exitOpacity = useTransform(scrollYProgress, [0, 0.72, 1], [1, 1, 0])
  const exitY = useTransform(scrollYProgress, [0, 1], [0, -28])

  return (
    <section
      id="hero"
      ref={heroRef}
      className="viewport-stage hero-shell relative bg-[#111010] pt-14 md:pt-0"
    >
      {/* Background Video (if enabled) */}
      {heroVideoEnabled && (
        <m.video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay={!reduceMotion}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          initial={reduceMotion ? false : { opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: reduceMotion ? 0 : 0.3, ease: entranceEase }}
        >
          <source src="/videos/hero-mobile.mp4" media="(max-width: 767px)" type="video/mp4" />
          <source src="/videos/hero-desktop.mp4" type="video/mp4" />
        </m.video>
      )}

      {/* Atmospheric Background Layers (Deep, rich aesthetic) */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_50%_45%,rgba(130,170,255,0.08)_0%,transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/85"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.03)_0%,transparent_50%)]"
        aria-hidden="true"
      />

      <m.div
        className="hero-frame relative grid min-h-0 grid-rows-[auto_minmax(0,1fr)_auto]"
        style={{ opacity: reduceMotion ? 1 : exitOpacity, y: reduceMotion ? 0 : exitY }}
      >
        {/* Top Info Metadata */}
        <m.div
          initial={reduceMotion ? false : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: reduceMotion ? 0 : 0.35, ease: entranceEase }}
          className="editorial-container flex items-start justify-between pt-5 md:pt-7"
        >
          <p className="editorial-label max-w-[11rem] text-white/70">
            {isEn ? "Portfolio" : "Portfólio"} / ©2026
          </p>
          <p className="editorial-label whitespace-nowrap text-right text-white/70">
            Volta Redonda, BR
            <br />
            2026
          </p>
        </m.div>

        {/* Center Hero Stage: Staggered Diagonal Lockup with Motion Convergence */}
        <div className="editorial-container hero-name-stage flex min-h-0 flex-col items-center justify-center py-2 sm:py-4">
          <h1
            className="hero-diagonal-stage relative flex w-full flex-col items-center justify-center"
            aria-label="Pedro Reoli"
          >
            <span className="hero-diagonal-item hero-diagonal-pedro" aria-hidden="true">
              <m.span
                className="hero-mega-text"
                initial={reduceMotion ? false : { x: -120, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.72, delay: reduceMotion ? 0 : 0.16, ease: entranceEase }}
              >
                PEDRO
              </m.span>
            </span>

            <span className="hero-diagonal-item hero-diagonal-reoli" aria-hidden="true">
              <m.span
                className="hero-mega-text hero-text-hollow"
                initial={reduceMotion ? false : { x: 120, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.72, delay: reduceMotion ? 0 : 0.24, ease: entranceEase }}
              >
                REOLI
              </m.span>
            </span>
          </h1>

          {/* Cargo / Role under the name */}
          <m.div
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: reduceMotion ? 0 : 0.55, ease: entranceEase }}
            className="mt-4 flex items-center justify-center gap-2 sm:mt-6"
          >
            <span
              className="h-1.5 w-1.5 rounded-full bg-[#82aaff] shadow-[0_0_8px_#82aaff]"
              aria-hidden="true"
            />
            <p className="editorial-label text-[11px] font-bold tracking-[0.16em] text-[#82aaff] uppercase sm:text-xs">
              {isEn
                ? "Full Stack Software Engineer & Systems Architect"
                : "Engenheiro de Software Full Stack & Arquiteto de Sistemas"}
            </p>
          </m.div>
        </div>

        {/* Bottom Hero Statement and Action */}
        <m.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: reduceMotion ? 0 : 0.75, ease: entranceEase }}
          className="editorial-container grid grid-cols-[minmax(0,1fr)_auto] items-end gap-5 pb-7 md:pb-9"
        >
          <p className="hero-statement max-w-md font-medium leading-[1.15] tracking-[-0.03em] text-white/90">
            {isEn
              ? "I turn complex systems into digital products that feel clear, fast and human."
              : "Sistemas complexos. Experiências digitais claras, rápidas e humanas."}
          </p>

          <a
            href="#projetos-selecionados"
            className="group inline-flex h-12 items-center gap-3 rounded-full border border-white/25 px-5 text-[9px] font-semibold uppercase tracking-[0.13em] text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-[#111010] sm:h-14 sm:px-7 sm:text-[10px]"
          >
            <span className="hero-project-label-long">
              {isEn ? "See the work" : "Ver projetos"}
            </span>
            <span className="hero-project-label-short">{isEn ? "Work" : "Projetos"}</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </m.div>
      </m.div>
    </section>
  )
}

export default PortfolioHero
