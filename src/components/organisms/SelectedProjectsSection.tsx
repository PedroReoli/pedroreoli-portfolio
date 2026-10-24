import React, { useRef, useState } from "react"
import { AnimatePresence, m, useMotionValueEvent, useScroll } from "framer-motion"
import { useReducedMotion } from "../../hooks/useReducedMotion"
import { ChevronDown } from "lucide-react"
import { Link } from "react-router-dom"
import { featuredProjects } from "../../content/homeContent"
import { useLanguage } from "../../i18n/useLanguage"
import Reveal from "../atoms/Reveal"
import FeaturedProjectSlide from "../molecules/FeaturedProjectSlide"
import SlideSection from "../atoms/SlideSection"

export const SelectedProjectsSection: React.FC = () => {
  const { language } = useLanguage()
  const isEn = language === "en"
  const reduceMotion = Boolean(useReducedMotion())
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.34) {
      setActiveStep(0)
    } else if (latest < 0.67) {
      setActiveStep(1)
    } else {
      setActiveStep(2)
    }
  })

  const scrollToStep = (stepIndex: number) => {
    if (!containerRef.current) return
    const container = containerRef.current
    const rect = container.getBoundingClientRect()
    const scrollTop = window.scrollY + rect.top
    const totalScroll = container.scrollHeight - window.innerHeight
    const targetScroll = scrollTop + (stepIndex / 2) * totalScroll
    window.scrollTo({ top: targetScroll, behavior: reduceMotion ? "auto" : "smooth" })
  }

  const activeProject = featuredProjects[activeStep]

  const stepsMeta = [
    ...featuredProjects.map((project) => ({
      number: project.number,
      label: project.title.toUpperCase(),
    })),
    { number: "03", label: isEn ? "MORE PROJECTS" : "MAIS PROJETOS" },
  ]

  return (
    <section
      id="projetos-selecionados"
      data-scroll-scene
      ref={containerRef}
      className="relative h-[calc(3*var(--viewport-height))] min-h-screen w-full bg-[#111010]"
    >
      {/* Sticky Fullscreen Stage (occupies 100% viewport height, matching Hero section) */}
      <SlideSection
        as="div"
        className="selected-projects-stage sticky top-0 h-screen min-h-screen w-full overflow-hidden bg-[#111010]"
      >
        {/* Background Atmospheric Glow */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_40%,rgba(130,170,255,0.06)_0%,transparent_70%)]"
          aria-hidden="true"
        />

        {/* Top Header */}
        <Reveal
          className="selected-projects-heading editorial-container relative z-10 flex items-center justify-between gap-2 border-b border-white/10 pb-3"
          distance={12}
        >
          <div>
            <p className="editorial-label text-[10px] text-[#82aaff] sm:text-xs">
              03 / {isEn ? "Selected work" : "Trabalhos selecionados"}
            </p>
            <h2 className="text-xl font-black uppercase tracking-tight text-[#edeae4] sm:text-3xl md:text-4xl">
              {isEn ? "Projects" : "Projetos"}
            </h2>
          </div>

          {/* Interactive Step Navigator with Spring Motion */}
          <nav
            className="flex items-center gap-1 sm:gap-1.5 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-md"
            aria-label={isEn ? "Projects navigation" : "Navegação dos projetos"}
          >
            {stepsMeta.map((step, idx) => (
              <button
                key={step.label}
                type="button"
                onClick={() => scrollToStep(idx)}
                className="relative flex min-h-11 min-w-11 items-center justify-center gap-1 sm:gap-1.5 rounded-full px-2.5 sm:px-3 py-1 text-[10px] font-mono uppercase tracking-[0.08em] transition-colors"
                aria-label={step.label}
                aria-current={activeStep === idx ? "step" : undefined}
              >
                {activeStep === idx && (
                  <m.span
                    layoutId="activeProjectsTab"
                    className="absolute inset-0 rounded-full bg-white shadow-md"
                    transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
                <span
                  className={`relative z-10 ${
                    activeStep === idx ? "text-[#111010] font-bold" : "text-[#82aaff]"
                  }`}
                >
                  {step.number}
                </span>
                <span
                  className={`relative z-10 hidden sm:inline ${
                    activeStep === idx
                      ? "text-[#111010] font-bold"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {step.label}
                </span>
              </button>
            ))}
          </nav>
        </Reveal>

        {/* Middle Stage: Pinned Content Slides */}
        <Reveal
          delay={0.2}
          distance={40}
          className="editorial-container relative z-10 flex h-full min-h-0 items-center justify-center"
        >
          <AnimatePresence mode="wait">
            {activeProject && (
              <m.div
                key={activeProject.number}
                initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={
                  reduceMotion
                    ? { opacity: 1 }
                    : { opacity: 0, y: -24, transition: { duration: 0.18 } }
                }
                transition={{ duration: reduceMotion ? 0 : 0.44, ease: [0.22, 1, 0.36, 1] }}
                className="selected-project-slide"
              >
                <FeaturedProjectSlide
                  project={activeProject}
                  isEn={isEn}
                  total={featuredProjects.length}
                />
              </m.div>
            )}

            {activeStep === 2 && (
              <m.div
                key="step-more-projects"
                initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={
                  reduceMotion
                    ? { opacity: 1 }
                    : { opacity: 0, y: -24, transition: { duration: 0.18 } }
                }
                transition={{ duration: reduceMotion ? 0 : 0.44, ease: [0.22, 1, 0.36, 1] }}
                className="flex h-full w-full items-center justify-center text-center"
              >
                <Link
                  to="/projetos"
                  className="group max-w-[12ch] font-black uppercase leading-[0.86] tracking-[-0.065em] text-[#edeae4] transition-colors duration-300 hover:text-[#82aaff] focus-visible:text-[#82aaff] focus-visible:outline-none text-[clamp(2.8rem,min(10vw,14vh),9rem)]"
                >
                  {isEn ? "See more projects" : "Ver mais projetos"}
                  <span
                    className="ml-[0.12em] inline-block text-[#82aaff] transition-transform duration-300 group-hover:-translate-y-[0.08em] group-hover:translate-x-[0.08em]"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </Link>
              </m.div>
            )}
          </AnimatePresence>
        </Reveal>

        {/* Bottom Status & Scroll Indicator */}
        <Reveal
          className="editorial-container relative z-10 flex items-center justify-between border-t border-white/10 pt-3"
          distance={10}
          delay={0.4}
        >
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-bold text-[#82aaff]">
              {stepsMeta[activeStep].number}
            </span>
            <span className="text-[10px] text-white/30">/</span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-white/60">
              03 / {stepsMeta[activeStep].label}
            </span>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.12em] text-white/40">
            <span>
              {activeStep === 2
                ? isEn
                  ? "Scroll for next section"
                  : "Role para a próxima seção"
                : isEn
                ? "Scroll to navigate"
                : "Role para navegar"}
            </span>
            <ChevronDown className="h-3.5 w-3.5 text-[#82aaff]" aria-hidden="true" />
          </div>
        </Reveal>
      </SlideSection>
    </section>
  )
}

export default SelectedProjectsSection
