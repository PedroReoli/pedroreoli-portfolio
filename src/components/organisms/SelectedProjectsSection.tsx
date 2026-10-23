import React, { useRef, useState } from "react"
import { AnimatePresence, m, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion"
import { ArrowUpRight, ChevronDown } from "lucide-react"
import { Link } from "react-router-dom"
import { featuredProjects, type FeaturedProject } from "../../content/homeContent"
import { useLanguage } from "../../i18n/useLanguage"
import Reveal from "../atoms/Reveal"
import ResponsiveImage from "../atoms/ResponsiveImage"
import SlideSection from "../atoms/SlideSection"

const ProjectArtwork: React.FC<{ project: FeaturedProject; isEn: boolean }> = ({
  project,
  isEn,
}) => {
  if (project.image && project.imageSrcSet && project.imageAlt) {
    return (
      <ResponsiveImage
        pictureClassName="absolute inset-0 block h-full w-full"
        sources={[
          {
            srcSet: project.imageSrcSet,
            type: "image/webp",
            sizes: "(max-width: 639px) calc(100vw - 2rem), (max-width: 1536px) 68vw, 1024px",
          },
        ]}
        src={project.image}
        alt={isEn ? project.imageAlt.en : project.imageAlt.pt}
        loading="lazy"
        decoding="async"
        width={2880}
        height={1800}
        className="project-feature-image absolute inset-0 h-full w-full object-cover"
      />
    )
  }

  return (
    <div
      className="project-agent-visual absolute inset-0 flex flex-col justify-between p-6 sm:p-8"
      role="img"
      aria-label={
        isEn ? "Achilles browser agent system diagram" : "Diagrama do agente de navegador Achilles"
      }
    >
      <div className="flex items-center justify-between">
        <span className="project-agent-kicker font-mono text-[10px] tracking-[0.2em] text-[#82aaff] uppercase">
          {isEn ? "LOCAL AGENT / CDP" : "AGENTE LOCAL / CDP"}
        </span>
        <span className="h-2 w-2 rounded-full bg-[#82aaff] shadow-[0_0_8px_#82aaff] animate-pulse" />
      </div>
      <div className="my-auto py-4 text-center">
        <span
          className="project-agent-word block font-black uppercase text-white/90 text-4xl sm:text-6xl md:text-7xl tracking-[-0.04em]"
          aria-hidden="true"
        >
          ACHILLES
        </span>
        <p className="mt-2 text-xs font-mono uppercase tracking-[0.18em] text-white/50">
          Autonomous Browser Agent
        </p>
      </div>
      <div
        className="project-agent-flow grid grid-cols-3 gap-2 border-t border-white/10 pt-4 text-center font-mono text-[9px] sm:text-[10px] tracking-wider text-white/70"
        aria-hidden="true"
      >
        <span className="rounded bg-white/5 py-1.5">01 / {isEn ? "OBSERVE" : "OBSERVAR"}</span>
        <span className="rounded bg-white/5 py-1.5">02 / {isEn ? "DECIDE" : "DECIDIR"}</span>
        <span className="rounded bg-white/5 py-1.5 text-[#82aaff] font-bold">
          03 / {isEn ? "OPERATE" : "OPERAR"}
        </span>
      </div>
    </div>
  )
}

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

  // The two flagship projects
  const autocomProject = featuredProjects[0]
  const achillesProject = featuredProjects[1]

  const stepsMeta = [
    { number: "01", label: "AUTOCOM3" },
    { number: "02", label: "ACHILLES" },
    { number: "03", label: isEn ? "MORE PROJECTS" : "MAIS PROJETOS" },
  ]

  return (
    <section
      id="projetos-selecionados"
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
            {/* ========================================================
                SLIDE 0: AUTOCOM3
                ======================================================== */}
            {activeStep === 0 && (
              <m.div
                key="step-autocom"
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
                {/* Artwork Frame */}
                <figure className="project-image-frame relative h-full min-h-0 overflow-hidden rounded-xl border border-white/10 bg-[#191817]">
                  <ProjectArtwork project={autocomProject} isEn={isEn} />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                  <span className="editorial-label absolute right-3 top-3 sm:right-4 sm:top-4 rounded bg-black/60 px-2 py-1 text-[10px] text-white/80 backdrop-blur-md">
                    01 / 02
                  </span>
                  <span className="editorial-label absolute bottom-3 left-3 sm:bottom-4 sm:left-4 text-[10px] text-white">
                    {isEn ? autocomProject.category.en : autocomProject.category.pt} /{" "}
                    {autocomProject.year}
                  </span>
                </figure>

                {/* Details & CTA */}
                <div className="selected-project-copy flex flex-col justify-center">
                  <div className="mb-1 sm:mb-2 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#82aaff] shadow-[0_0_8px_#82aaff]" />
                    <span className="editorial-label text-[10px] sm:text-xs tracking-[0.14em] text-[#82aaff]">
                      {isEn ? "Enterprise System" : "Software Corporativo"} • 2024 / 26
                    </span>
                  </div>

                  <h3 className="text-2xl font-black uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
                    Autocom3
                  </h3>

                  <p className="mt-1.5 sm:mt-3 leading-snug sm:leading-relaxed text-white/80 text-xs sm:text-base">
                    {isEn
                      ? "Proposals, licenses and catalogs in one corporate platform."
                      : "Propostas, licenças e catálogo em uma plataforma corporativa."}
                  </p>

                  <div className="mt-2.5 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] font-mono text-white/60">
                    <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 sm:px-2.5 sm:py-1">
                      React
                    </span>
                    <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 sm:px-2.5 sm:py-1">
                      TypeScript
                    </span>
                    <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 sm:px-2.5 sm:py-1">
                      Clean Architecture
                    </span>
                  </div>

                  {/* Button Requested: "Ver projeto mais a fundo" */}
                  <div className="mt-3.5 sm:mt-6">
                    <Link
                      to="/projetos?tipo=corporativo"
                      className="group inline-flex items-center gap-2 sm:gap-3 rounded-full border border-white/30 bg-white/10 px-4 py-2 sm:px-6 sm:py-3 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.14em] text-white backdrop-blur-md transition-all duration-300 hover:border-white hover:bg-white hover:text-[#111010] shadow-lg"
                    >
                      <span>{isEn ? "Explore the interfaces" : "Explorar interfaces"}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </m.div>
            )}

            {/* ========================================================
                SLIDE 1: ACHILLES
                ======================================================== */}
            {activeStep === 1 && (
              <m.div
                key="step-achilles"
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
                {/* Artwork Frame */}
                <figure className="project-image-frame relative h-full min-h-0 overflow-hidden rounded-xl border border-white/10 bg-[#191817]">
                  <ProjectArtwork project={achillesProject} isEn={isEn} />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                  <span className="editorial-label absolute right-3 top-3 sm:right-4 sm:top-4 rounded bg-black/60 px-2 py-1 text-[10px] text-white/80 backdrop-blur-md">
                    02 / 02
                  </span>
                  <span className="editorial-label absolute bottom-3 left-3 sm:bottom-4 sm:left-4 text-[10px] text-white">
                    {isEn ? achillesProject.category.en : achillesProject.category.pt} /{" "}
                    {achillesProject.year}
                  </span>
                </figure>

                {/* Details & CTA */}
                <div className="selected-project-copy flex flex-col justify-center">
                  <div className="mb-1 sm:mb-2 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#82aaff] shadow-[0_0_8px_#82aaff]" />
                    <span className="editorial-label text-[10px] sm:text-xs tracking-[0.14em] text-[#82aaff]">
                      {isEn ? "Autonomous Agents" : "Agentes Autônomos"} • 2026
                    </span>
                  </div>

                  <h3 className="text-2xl font-black uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
                    Achilles
                  </h3>

                  <p className="mt-1.5 sm:mt-3 leading-snug sm:leading-relaxed text-white/80 text-xs sm:text-base">
                    {isEn
                      ? "A local agent for browser automation with CDP and observable tools."
                      : "Agente local para automatizar navegadores com CDP e ferramentas observáveis."}
                  </p>

                  <div className="mt-2.5 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] font-mono text-white/60">
                    <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 sm:px-2.5 sm:py-1">
                      CDP Protocol
                    </span>
                    <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 sm:px-2.5 sm:py-1">
                      TypeScript
                    </span>
                    <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 sm:px-2.5 sm:py-1">
                      Node.js
                    </span>
                  </div>

                  <div className="mt-3.5 sm:mt-6">
                    <a
                      href={achillesProject.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 sm:gap-3 rounded-full border border-white/30 bg-white/10 px-4 py-2 sm:px-6 sm:py-3 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.14em] text-white backdrop-blur-md transition-all duration-300 hover:border-white hover:bg-white hover:text-[#111010] shadow-lg"
                    >
                      <span>{isEn ? "View on GitHub" : "Ver no GitHub"}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  </div>
                </div>
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
