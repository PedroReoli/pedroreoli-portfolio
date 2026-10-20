import React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { useLanguage } from "../../i18n/useLanguage"

const entranceEase = [0.16, 1, 0.3, 1] as const
const heroVideoEnabled = import.meta.env.VITE_HERO_VIDEO_ENABLED === "true"

interface AnimatedWordProps {
  children: string
  delay: number
  reduceMotion: boolean
}

const AnimatedWord: React.FC<AnimatedWordProps> = ({ children, delay, reduceMotion }) => (
  <span className="block overflow-hidden" aria-hidden="true">
    <motion.span
      className="block"
      initial={reduceMotion ? false : { y: "110%", opacity: 0 }}
      animate={{ y: "0%", opacity: 1 }}
      transition={{ duration: 1, delay: reduceMotion ? 0 : delay, ease: entranceEase }}
    >
      {children}
    </motion.span>
  </span>
)

export const StitchHeroProjects: React.FC = () => {
  const { language } = useLanguage()
  const isEn = language === "en"
  const reduceMotion = Boolean(useReducedMotion())

  return (
    <section id="hero" className="hero-shell relative overflow-hidden bg-[#111010] pt-16">
      {heroVideoEnabled && (
        <motion.video
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
        </motion.video>
      )}

      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/10 to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-black/20" />

      <div className="hero-frame relative grid h-[calc(100svh-4rem)] min-h-0 grid-rows-[auto_minmax(0,1fr)_auto]">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: reduceMotion ? 0 : 0.46, ease: entranceEase }}
          className="editorial-container grid grid-cols-[1fr_auto_1fr] items-start pt-5"
        >
          <p className="editorial-label max-w-[11rem] text-white/70">
            Portfolio / ©2026
          </p>
          <p className="editorial-label hidden text-center text-white/70 sm:block">
            {isEn ? "Creative developer" : "Desenvolvedor criativo"}
          </p>
          <p className="editorial-label col-start-3 whitespace-nowrap text-right text-white/70">
            Volta Redonda, BR<br />2026
          </p>
        </motion.div>

        <div className="editorial-container hero-name-stage min-h-0">
          <h1 className="hero-video-title w-full font-black uppercase text-white" aria-label="Pedro Reoli">
            <span className="hero-name-word hero-name-word-first">
              <AnimatedWord delay={0.48} reduceMotion={reduceMotion}>PEDRO</AnimatedWord>
            </span>
            <span className="hero-name-word hero-name-word-last">
              <AnimatedWord delay={0.62} reduceMotion={reduceMotion}>REOLI</AnimatedWord>
            </span>
          </h1>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: reduceMotion ? 0 : 0.92, ease: entranceEase }}
          className="editorial-container grid grid-cols-[minmax(0,1fr)_auto] items-end gap-5 pb-7"
        >
          <p className="hero-statement max-w-md font-medium leading-[1.12] tracking-[-0.04em] text-white/90">
            {isEn
              ? "I turn complex systems into digital products that feel clear, fast and human."
              : "Transformo sistemas complexos em produtos digitais claros, rápidos e humanos."}
          </p>

          <a
            href="#projetos-selecionados"
            className="group inline-flex h-12 items-center gap-3 rounded-full border border-white/25 px-5 text-[9px] font-semibold uppercase tracking-[0.13em] text-white transition-colors hover:border-white hover:bg-white hover:text-[#111010] sm:h-14 sm:px-7 sm:text-[10px]"
          >
            <span className="hero-project-label-long">{isEn ? "See the work" : "Ver projetos"}</span>
            <span className="hero-project-label-short">{isEn ? "Work" : "Projetos"}</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default StitchHeroProjects
