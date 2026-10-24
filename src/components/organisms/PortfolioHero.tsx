import React, { useRef } from "react"
import { m, useScroll, useTransform } from "framer-motion"
import { useReducedMotion } from "../../hooks/useReducedMotion"
import { ArrowUpRight } from "lucide-react"
import { useLanguage } from "../../i18n/useLanguage"

const entranceEase = [0.16, 1, 0.3, 1] as const

export const PortfolioHero: React.FC = () => {
  const { language } = useLanguage()
  const isEn = language === "en"
  const reduceMotion = Boolean(useReducedMotion())
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })
  const exitOpacity = useTransform(scrollYProgress, [0, 0.12, 0.55], [1, 1, 0])
  const exitY = useTransform(scrollYProgress, [0, 1], [0, -28])
  const atmosphereOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])

  return (
    <section
      id="hero"
      data-scroll-scene
      ref={heroRef}
      className="viewport-stage hero-shell relative min-h-screen pt-14 md:pt-0"
    >
      {/* Atmospheric Background Layers (Deep, rich aesthetic) */}
      <m.div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_50%_45%,rgba(130,170,255,0.08)_0%,transparent_70%)]"
        style={{ opacity: reduceMotion ? 1 : atmosphereOpacity }}
        aria-hidden="true"
      />
      <m.div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/85"
        style={{ opacity: reduceMotion ? 1 : atmosphereOpacity }}
        aria-hidden="true"
      />
      <m.div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.03)_0%,transparent_50%)]"
        style={{ opacity: reduceMotion ? 1 : atmosphereOpacity }}
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
          transition={{
            duration: reduceMotion ? 0.2 : 0.6,
            delay: reduceMotion ? 0 : 0.1,
            ease: entranceEase,
          }}
          className="editorial-container flex items-start justify-between pt-5 md:pt-24"
        >
          <p className="editorial-label max-w-[11rem] text-white/70">
            {isEn ? "Portfolio" : "Portfólio"}
          </p>
          <p className="editorial-label whitespace-nowrap text-right text-white/70">
            Volta Redonda, BR
            <br />
            {new Date().getFullYear()}
          </p>
        </m.div>

        {/* Center Hero Stage: Staggered Diagonal Lockup with Motion Convergence */}
        <div className="editorial-container hero-name-stage flex min-h-0 flex-col items-center justify-center py-2 sm:py-4">
          <h1
            className="hero-diagonal-stage relative flex w-full flex-col items-center justify-center"
            aria-label="Pedro Reoli"
          >
            <span
              className="hero-diagonal-item hero-line-mask hero-diagonal-pedro"
              aria-hidden="true"
            >
              <m.span
                className="hero-mega-text"
                initial={reduceMotion ? false : { y: "110%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.88,
                  delay: reduceMotion ? 0 : 0.18,
                  ease: entranceEase,
                }}
              >
                PEDRO
              </m.span>
            </span>

            <span
              className="hero-diagonal-item hero-line-mask hero-diagonal-reoli"
              aria-hidden="true"
            >
              <m.span
                className="hero-mega-text hero-text-hollow"
                initial={reduceMotion ? false : { y: "110%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.88,
                  delay: reduceMotion ? 0 : 0.34,
                  ease: entranceEase,
                }}
              >
                REOLI
              </m.span>
            </span>
          </h1>

          {/* Cargo / Role under the name */}
          <m.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.65,
              delay: reduceMotion ? 0 : 0.5,
              ease: entranceEase,
            }}
            className="hero-role mt-3 flex items-center justify-center gap-3 sm:mt-5"
          >
            <span
              className="h-1.5 w-1.5 rounded-full bg-[#82aaff] shadow-[0_0_8px_#82aaff] animate-pulse"
              aria-hidden="true"
            />
            <p className="font-semibold tracking-[-0.025em] text-[#b8ccff]">
              {isEn ? "Full Stack Software Engineer" : "Engenheiro de Software Full Stack"}
            </p>
          </m.div>
        </div>

        {/* Bottom action */}
        <m.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduceMotion ? 0.2 : 0.65,
            delay: reduceMotion ? 0 : 0.66,
            ease: entranceEase,
          }}
          className="editorial-container flex justify-end pb-7 md:pb-9"
        >
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
