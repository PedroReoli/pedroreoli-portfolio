import React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowDown, ArrowUpRight } from "lucide-react"
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

      <div className="relative grid h-[calc(100svh-4rem)] min-h-0 grid-rows-[auto_minmax(0,1fr)_auto_auto]">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: reduceMotion ? 0 : 0.46, ease: entranceEase }}
          className="editorial-container flex items-start justify-between pt-5"
        >
          <p className="editorial-label max-w-[11rem] text-white/70">
            {isEn ? "Creative software engineer" : "Engenheiro de software criativo"}
          </p>
          <p className="editorial-label whitespace-nowrap text-right text-white/70">
            Volta Redonda, BR<br />2026
          </p>
        </motion.div>

        <div className="editorial-container flex min-h-0 items-center">
          <h1 className="hero-video-title w-full font-black uppercase text-white" aria-label="Pedro Reoli">
            <AnimatedWord delay={0.48} reduceMotion={reduceMotion}>PEDRO</AnimatedWord>
            <AnimatedWord delay={0.62} reduceMotion={reduceMotion}>REOLI</AnimatedWord>
          </h1>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: reduceMotion ? 0 : 0.92, ease: entranceEase }}
          className="editorial-container grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 pb-5"
        >
          <p className="hero-statement max-w-xl font-medium leading-[1.08] tracking-[-0.04em] text-white/90">
            {isEn
              ? "I turn complex systems into digital products that feel clear, fast and human."
              : "Transformo sistemas complexos em produtos digitais claros, rápidos e humanos."}
          </p>

          <div className="flex items-end gap-3 sm:gap-6">
            <a
              href="#projetos-selecionados"
              className="group inline-flex items-center gap-2 border-b border-white pb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white sm:text-xs"
            >
              <span className="hero-project-label-long">{isEn ? "Selected work" : "Projetos selecionados"}</span>
              <span className="hero-project-label-short">{isEn ? "Work" : "Projetos"}</span>
              <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-1" />
            </a>
            <a
              href="mailto:pedrosousa2160@gmail.com"
              aria-label="Enviar e-mail para Pedro"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-[#111010] transition-transform hover:rotate-12 sm:h-14 sm:w-14"
            >
              <ArrowUpRight className="h-5 w-5" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: reduceMotion ? 0 : 1.06, ease: entranceEase }}
          className="hero-marquee overflow-hidden border-y border-white/20 bg-black/20 py-2.5 backdrop-blur-sm sm:py-3"
        >
          <div className="marquee-track flex w-max items-center gap-7 whitespace-nowrap text-xl font-medium italic tracking-[-0.04em] text-white/75 sm:text-3xl">
            {[0, 1].map((copy) => (
              <React.Fragment key={copy}>
                <span>PRODUCT ENGINEERING</span><span className="text-white">◆</span>
                <span>DESIGN SYSTEMS</span><span className="text-white">◆</span>
                <span>AI AGENTS</span><span className="text-white">◆</span>
                <span>FULL STACK</span><span className="text-white">◆</span>
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default StitchHeroProjects
