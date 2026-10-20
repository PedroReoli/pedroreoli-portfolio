import React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowDown, ArrowUpRight, Play } from "lucide-react"
import { useLanguage } from "../../i18n/useLanguage"

const heroVideoSrc = import.meta.env.VITE_HERO_VIDEO_SRC?.trim()

export const StitchHeroProjects: React.FC = () => {
  const { language } = useLanguage()
  const isEn = language === "en"
  const reduceMotion = useReducedMotion()

  const reveal = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 42 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] as const },
  })

  return (
    <section id="hero" className="relative min-h-[100svh] overflow-hidden pt-16">
      <div className="editorial-container relative flex min-h-[calc(100svh-4rem)] flex-col justify-between py-8 sm:py-10">
        <motion.div {...reveal(0.05)} className="flex items-center justify-between">
          <p className="editorial-label max-w-[11rem] text-[#8d8984]">
            {isEn ? "Creative software engineer" : "Engenheiro de software criativo"}
          </p>
          <p className="editorial-label text-right text-[#8d8984]">
            Volta Redonda, BR<br />2026
          </p>
        </motion.div>

        <div className="relative z-10 my-12 sm:my-16">
          <motion.h1
            {...reveal(0.12)}
            className="hero-display pointer-events-none relative z-20 text-[#edeae4]"
          >
            <span className="block">PEDRO</span>
            <span className="block text-right text-outline sm:pr-[3vw]">REOLI</span>
          </motion.h1>

          <motion.figure
            initial={reduceMotion ? false : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            transition={{ duration: 1.15, delay: 0.25, ease: [0.76, 0, 0.24, 1] }}
            className="relative z-10 -mt-[4vw] ml-auto aspect-[4/5] w-[72%] overflow-hidden bg-[#1b1a19] sm:-mt-[8vw] sm:mr-[8vw] sm:w-[38%]"
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
                className="h-full w-full object-cover grayscale contrast-110"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#111010]/65 via-transparent to-transparent" />
            <figcaption className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 text-[#edeae4]">
              <span className="editorial-label">{heroVideoSrc ? "Motion portrait" : "Portrait / 2026"}</span>
              {!heroVideoSrc && (
                <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-[#b8b4ae]">
                  <Play className="h-3 w-3" /> Video ready
                </span>
              )}
            </figcaption>
          </motion.figure>
        </div>

        <motion.div {...reveal(0.36)} className="relative z-20 grid gap-8 sm:grid-cols-12 sm:items-end">
          <p className="max-w-xl text-xl font-medium leading-[1.18] tracking-[-0.035em] text-[#d2cec8] sm:col-span-7 sm:text-3xl lg:text-4xl">
            {isEn
              ? "I turn complex systems into digital products that feel clear, fast and human."
              : "Transformo sistemas complexos em produtos digitais claros, rápidos e humanos."}
          </p>

          <div className="flex items-end justify-between gap-6 sm:col-span-5 sm:justify-end">
            <a
              href="#projetos-selecionados"
              className="group inline-flex items-center gap-3 border-b border-[#edeae4] pb-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#edeae4]"
            >
              {isEn ? "Selected work" : "Projetos selecionados"}
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
            </a>
            <a
              href="mailto:pedrosousa2160@gmail.com"
              aria-label="Enviar e-mail para Pedro"
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#82aaff] text-[#111010] transition-transform hover:rotate-12 sm:h-16 sm:w-16"
            >
              <ArrowUpRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </a>
          </div>
        </motion.div>
      </div>

      <div className="overflow-hidden border-y border-white/10 py-4">
        <div className="marquee-track flex w-max items-center gap-7 whitespace-nowrap text-2xl font-medium italic tracking-[-0.04em] text-[#b8b4ae] sm:text-4xl">
          {[0, 1].map((copy) => (
            <React.Fragment key={copy}>
              <span>PRODUCT ENGINEERING</span><span className="text-[#82aaff]">◆</span>
              <span>DESIGN SYSTEMS</span><span className="text-[#82aaff]">◆</span>
              <span>AI AGENTS</span><span className="text-[#82aaff]">◆</span>
              <span>FULL STACK</span><span className="text-[#82aaff]">◆</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StitchHeroProjects
