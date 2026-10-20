import React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowDown, ArrowUpRight, Play } from "lucide-react"
import { useLanguage } from "../../i18n/useLanguage"

const heroVideoSrc = import.meta.env.VITE_HERO_VIDEO_SRC?.trim()
const entranceEase = [0.16, 1, 0.3, 1] as const

interface AnimatedWordProps {
  children: string
  delay: number
  outline?: boolean
  reduceMotion: boolean
  className?: string
}

const AnimatedWord: React.FC<AnimatedWordProps> = ({
  children,
  delay,
  outline = false,
  reduceMotion,
  className = "",
}) => (
  <span
    className={`block w-fit overflow-hidden ${outline ? "text-outline" : ""} ${className}`}
    aria-hidden="true"
  >
    {children.split("").map((letter, index) => (
      <motion.span
        key={`${letter}-${index}`}
        initial={reduceMotion ? false : { y: "115%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{
          duration: 0.92,
          delay: reduceMotion ? 0 : delay + index * 0.055,
          ease: entranceEase,
        }}
        className="inline-block"
      >
        {letter}
      </motion.span>
    ))}
  </span>
)

export const StitchHeroProjects: React.FC = () => {
  const { language } = useLanguage()
  const isEn = language === "en"
  const reduceMotion = Boolean(useReducedMotion())

  return (
    <section id="hero" className="hero-shell overflow-hidden bg-[#111010] pt-16">
      <div className="grid h-[calc(100svh-4rem)] min-h-0 grid-rows-[minmax(0,1fr)_auto]">
        <div className="editorial-container hero-content-grid min-h-0 py-4 sm:py-5">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: reduceMotion ? 0 : 0.38, ease: entranceEase }}
            className="flex items-start justify-between"
          >
            <p className="editorial-label max-w-[11rem] text-[#8d8984]">
              {isEn ? "Creative software engineer" : "Engenheiro de software criativo"}
            </p>
            <p className="editorial-label whitespace-nowrap text-right text-[#8d8984]">
              Volta Redonda, BR<br />2026
            </p>
          </motion.div>

          <div className="hero-stage relative min-h-0">
            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: reduceMotion ? 0 : 0.44, ease: entranceEase }}
              className="hero-display pointer-events-none absolute left-0 top-1/2 z-20 -translate-y-1/2 text-[#edeae4]"
              aria-label="Pedro Reoli"
            >
              <AnimatedWord delay={0.46} reduceMotion={reduceMotion}>PEDRO</AnimatedWord>
              <AnimatedWord className="hero-word-outline" delay={0.62} outline reduceMotion={reduceMotion}>REOLI</AnimatedWord>
            </motion.h1>

            <motion.figure
              initial={reduceMotion ? false : { opacity: 0, clipPath: "inset(100% 0 0 0)", scale: 1.12 }}
              animate={{ opacity: 1, clipPath: "inset(0% 0 0 0)", scale: 1 }}
              transition={{ duration: 1.15, delay: reduceMotion ? 0 : 0.68, ease: entranceEase }}
              className="hero-media absolute bottom-0 right-[6%] z-10 overflow-hidden bg-[#1b1a19]"
            >
              {heroVideoSrc ? (
                <video
                  src={heroVideoSrc}
                  className="h-full w-full object-cover grayscale"
                  autoPlay={!reduceMotion}
                  muted
                  loop
                  playsInline
                  poster="/eu-profissional.png"
                  aria-label="Pedro Reoli em seu ambiente de trabalho"
                />
              ) : (
                <img
                  src="/eu-profissional.png"
                  alt="Pedro Lucas Reis, engenheiro de software"
                  loading="eager"
                  decoding="async"
                  className="h-full w-full object-cover grayscale contrast-110"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#111010]/65 via-transparent to-transparent" />
              <figcaption className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3 text-[#edeae4] sm:bottom-4 sm:left-4 sm:right-4">
                <span className="editorial-label">{heroVideoSrc ? "Motion portrait" : "Portrait / 2026"}</span>
                {!heroVideoSrc && (
                  <span className="video-ready inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.12em] text-[#b8b4ae]">
                    <Play className="h-3 w-3" /> Video ready
                  </span>
                )}
              </figcaption>
            </motion.figure>
          </div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: reduceMotion ? 0 : 1.08, ease: entranceEase }}
            className="hero-bottom grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4"
          >
            <p className="hero-statement max-w-xl font-medium leading-[1.08] tracking-[-0.04em] text-[#d2cec8]">
              {isEn
                ? "I turn complex systems into digital products that feel clear, fast and human."
                : "Transformo sistemas complexos em produtos digitais claros, rápidos e humanos."}
            </p>

            <div className="flex items-end gap-3 sm:gap-6">
              <a
                href="#projetos-selecionados"
                className="hero-project-link group inline-flex items-center gap-2 border-b border-[#edeae4] pb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#edeae4] sm:text-xs"
              >
                <span className="hero-project-label-long">{isEn ? "Selected work" : "Projetos selecionados"}</span>
                <span className="hero-project-label-short">{isEn ? "Work" : "Projetos"}</span>
                <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-1" />
              </a>
              <a
                href="mailto:pedrosousa2160@gmail.com"
                aria-label="Enviar e-mail para Pedro"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#82aaff] text-[#111010] transition-transform hover:rotate-12 sm:h-14 sm:w-14"
              >
                <ArrowUpRight className="h-5 w-5" />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: reduceMotion ? 0 : 1.18, ease: entranceEase }}
          className="hero-marquee overflow-hidden border-y border-white/10 py-2.5 sm:py-3"
        >
          <div className="marquee-track flex w-max items-center gap-7 whitespace-nowrap text-xl font-medium italic tracking-[-0.04em] text-[#b8b4ae] sm:text-3xl">
            {[0, 1].map((copy) => (
              <React.Fragment key={copy}>
                <span>PRODUCT ENGINEERING</span><span className="text-[#82aaff]">◆</span>
                <span>DESIGN SYSTEMS</span><span className="text-[#82aaff]">◆</span>
                <span>AI AGENTS</span><span className="text-[#82aaff]">◆</span>
                <span>FULL STACK</span><span className="text-[#82aaff]">◆</span>
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default StitchHeroProjects
