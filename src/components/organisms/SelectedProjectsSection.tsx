import React, { useRef, useState } from "react"
import { AnimatePresence, m, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion"
import { ArrowUpRight, ChevronDown } from "lucide-react"
import { Link } from "react-router-dom"
import { featuredProjects, type FeaturedProject } from "../../content/homeContent"
import { useLanguage } from "../../i18n/useLanguage"
import ResponsiveImage from "../atoms/ResponsiveImage"

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
        <span className="project-agent-word block font-black uppercase text-white/90 text-4xl sm:text-6xl md:text-7xl tracking-[-0.04em]" aria-hidden="true">
          ACHILLES
        </span>
        <p className="mt-2 text-xs font-mono uppercase tracking-[0.18em] text-white/50">
          Autonomous Browser Agent
        </p>
      </div>
      <div className="project-agent-flow grid grid-cols-3 gap-2 border-t border-white/10 pt-4 text-center font-mono text-[9px] sm:text-[10px] tracking-wider text-white/70" aria-hidden="true">
        <span className="rounded bg-white/5 py-1.5">01 / {isEn ? "OBSERVE" : "OBSERVAR"}</span>
        <span className="rounded bg-white/5 py-1.5">02 / {isEn ? "DECIDE" : "DECIDIR"}</span>
        <span className="rounded bg-white/5 py-1.5 text-[#82aaff] font-bold">03 / {isEn ? "OPERATE" : "OPERAR"}</span>
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
    if (latest < 0.36) {
      setActiveStep(0)
    } else if (latest < 0.72) {
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
    window.scrollTo({ top: targetScroll, behavior: "smooth" })
  }

  // The two flagship projects
  const autocomProject = featuredProjects[0]
  const achillesProject = featuredProjects[1]

  const stepsMeta = [
    { number: "01", label: "AUTOCOM3" },
    { number: "02", label: "ACHILLES" },
    { number: "03", label: isEn ? "MORE WORK" : "VER MAIS" },
  ]

  return (
    <section
      id="projetos-selecionados"
      ref={containerRef}
      className="relative h-[320vh] w-full bg-[#111010]"
    >
      {/* Sticky Fullscreen Stage (occupies 100% viewport height, matching Hero section) */}
      <div className="sticky top-0 flex h-screen h-[100svh] h-[100dvh] w-full flex-col justify-between overflow-hidden bg-[#111010] pt-16 pb-3 sm:py-5 md:py-8">
        
        {/* Background Atmospheric Glow */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_40%,rgba(130,170,255,0.06)_0%,transparent_70%)]"
          aria-hidden="true"
        />

        {/* Top Header */}
        <div className="editorial-container relative z-10 flex items-center justify-between border-b border-white/10 pb-3 sm:pb-4">
          <div>
            <p className="editorial-label text-[10px] text-[#82aaff] sm:text-xs">
              02 / {isEn ? "Selected work" : "Trabalhos selecionados"}
            </p>
            <h2 className="text-xl font-black uppercase tracking-tight text-[#edeae4] sm:text-3xl md:text-4xl">
              {isEn ? "Projects" : "Projetos"}
            </h2>
          </div>

          {/* Interactive Step Navigator */}
          <nav
            className="flex items-center gap-1 sm:gap-1.5 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-md"
            aria-label={isEn ? "Projects navigation" : "Navegação dos projetos"}
          >
            {stepsMeta.map((step, idx) => (
              <button
                key={step.label}
                type="button"
                onClick={() => scrollToStep(idx)}
                className={`flex items-center gap-1 sm:gap-1.5 rounded-full px-2.5 py-1 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.12em] transition-all duration-300 ${
                  activeStep === idx
                    ? "bg-white text-[#111010] font-bold shadow-md"
                    : "text-white/50 hover:text-white"
                }`}
                aria-current={activeStep === idx ? "step" : undefined}
              >
                <span className={activeStep === idx ? "text-[#111010]" : "text-[#82aaff]"}>
                  {step.number}
                </span>
                <span className="hidden sm:inline">{step.label}</span>
              </button>
            ))}
          </nav>

          {/* Direct Link to Archive */}
          <Link
            to="/projetos"
            className="group hidden items-center gap-1.5 border-b border-white/20 pb-0.5 text-[10px] font-mono uppercase tracking-[0.14em] text-[#edeae4] transition-colors hover:border-white sm:inline-flex"
          >
            <span>{isEn ? "View all" : "Ver todos"}</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Middle Stage: Pinned Content Slides */}
        <div className="editorial-container relative z-10 my-auto flex h-full max-h-[70vh] sm:max-h-[72vh] w-full items-center justify-center py-1 sm:py-2">
          <AnimatePresence mode="wait">
            {/* ========================================================
                SLIDE 0: AUTOCOM3
                ======================================================== */}
            {activeStep === 0 && (
              <m.div
                key="step-autocom"
                initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -24, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="grid h-full w-full grid-cols-1 items-center gap-3 sm:gap-6 md:grid-cols-[1.3fr_1fr] lg:grid-cols-[1.55fr_1fr] lg:gap-10"
              >
                {/* Artwork Frame */}
                <figure className="project-image-frame relative h-[180px] sm:h-full sm:min-h-[220px] overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-[#191817] shadow-[0_16px_40px_rgba(0,0,0,0.6)]">
                  <ProjectArtwork project={autocomProject} isEn={isEn} />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                  <span className="editorial-label absolute right-3 top-3 sm:right-4 sm:top-4 rounded bg-black/60 px-2 py-1 text-[10px] text-white/80 backdrop-blur-md">
                    01 — 02
                  </span>
                  <span className="editorial-label absolute bottom-3 left-3 sm:bottom-4 sm:left-4 text-[10px] text-white">
                    {isEn ? autocomProject.category.en : autocomProject.category.pt} / {autocomProject.year}
                  </span>
                </figure>

                {/* Details & CTA */}
                <div className="flex flex-col justify-center">
                  <div className="mb-1 sm:mb-2 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#82aaff] shadow-[0_0_8px_#82aaff]" />
                    <span className="editorial-label text-[10px] sm:text-xs tracking-[0.14em] text-[#82aaff]">
                      {isEn ? "Enterprise System" : "Software Corporativo"} • 2024—26
                    </span>
                  </div>

                  <h3 className="text-2xl font-black uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
                    Autocom3
                  </h3>

                  <p className="mt-1.5 sm:mt-3 leading-snug sm:leading-relaxed text-white/80 text-xs sm:text-base">
                    {isEn
                      ? "Commercial operations, licensing and catalog workflows unified into a mission-critical enterprise experience built for high-density speed and stability."
                      : "Operação comercial, licenças e catálogo reunidos em uma experiência corporativa. Plataforma robusta desenvolvida para operações críticas em tempo real com alta densidade de dados e estabilidade."}
                  </p>

                  <div className="mt-2.5 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] font-mono text-white/60">
                    <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 sm:px-2.5 sm:py-1">React</span>
                    <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 sm:px-2.5 sm:py-1">TypeScript</span>
                    <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 sm:px-2.5 sm:py-1">Clean Architecture</span>
                    <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 sm:px-2.5 sm:py-1">Mission Critical</span>
                  </div>

                  {/* Button Requested: "Ver projeto mais a fundo" */}
                  <div className="mt-3.5 sm:mt-6">
                    <Link
                      to="/projetos?tipo=corporativo"
                      className="group inline-flex items-center gap-2 sm:gap-3 rounded-full border border-white/30 bg-white/10 px-4 py-2 sm:px-6 sm:py-3 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.14em] text-white backdrop-blur-md transition-all duration-300 hover:border-white hover:bg-white hover:text-[#111010] shadow-lg"
                    >
                      <span>{isEn ? "Explore project in-depth" : "Ver projeto mais a fundo"}</span>
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
                initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -24, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="grid h-full w-full grid-cols-1 items-center gap-3 sm:gap-6 md:grid-cols-[1.3fr_1fr] lg:grid-cols-[1.55fr_1fr] lg:gap-10"
              >
                {/* Artwork Frame */}
                <figure className="project-image-frame relative h-[180px] sm:h-full sm:min-h-[220px] overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-[#161514] shadow-[0_16px_40px_rgba(0,0,0,0.6)]">
                  <ProjectArtwork project={achillesProject} isEn={isEn} />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                  <span className="editorial-label absolute right-3 top-3 sm:right-4 sm:top-4 rounded bg-black/60 px-2 py-1 text-[10px] text-white/80 backdrop-blur-md">
                    02 — 02
                  </span>
                  <span className="editorial-label absolute bottom-3 left-3 sm:bottom-4 sm:left-4 text-[10px] text-white">
                    {isEn ? achillesProject.category.en : achillesProject.category.pt} / {achillesProject.year}
                  </span>
                </figure>

                {/* Details & CTA */}
                <div className="flex flex-col justify-center">
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
                      ? "A local autonomous agent that operates web browsers via Chrome DevTools Protocol (CDP), with observable, type-safe tools and anti-bot resilience."
                      : "Um agente local que opera navegadores por CDP com ferramentas observáveis e determinísticas. Automatiza fluxos complexos na web mantendo total transparência e controle de execução."}
                  </p>

                  <div className="mt-2.5 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] font-mono text-white/60">
                    <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 sm:px-2.5 sm:py-1">CDP Protocol</span>
                    <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 sm:px-2.5 sm:py-1">TypeScript</span>
                    <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 sm:px-2.5 sm:py-1">Node.js</span>
                    <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 sm:px-2.5 sm:py-1">100% Local</span>
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

            {/* ========================================================
                SLIDE 2: "Quer ver mais projetos? Clique aqui"
                (Center Stage Callout Card requested by User)
                ======================================================== */}
            {activeStep === 2 && (
              <m.div
                key="step-more-projects"
                initial={reduceMotion ? false : { opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex w-full max-w-3xl flex-col items-center justify-center rounded-2xl sm:rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-transparent p-6 sm:p-14 text-center shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl"
              >
                {/* Glow accent */}
                <div
                  className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#82aaff]/20 via-transparent to-[#82aaff]/20 opacity-50 blur-xl"
                  aria-hidden="true"
                />

                <span className="editorial-label text-xs tracking-[0.2em] text-[#82aaff]">
                  03 / {isEn ? "Full Archive" : "Arquivo Completo"}
                </span>

                <h3 className="mt-3 text-3xl font-black uppercase tracking-tight text-white sm:text-5xl md:text-6xl">
                  {isEn ? "Want to see more work?" : "Quer ver mais projetos?"}
                </h3>

                <p className="mt-4 max-w-lg text-sm sm:text-base leading-relaxed text-white/70">
                  {isEn
                    ? "Explore the complete archive of corporate systems, AI agents, open source tools and user interfaces built by Pedro Reoli."
                    : "Explore o acervo completo de sistemas corporativos, agentes de IA, soluções de infraestrutura e projetos independentes construídos por Pedro Reoli."}
                </p>

                {/* Big Magnetic Center Button */}
                <Link
                  to="/projetos"
                  className="group mt-8 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-xs font-mono font-bold uppercase tracking-[0.16em] text-[#111010] shadow-[0_0_35px_rgba(255,255,255,0.3)] transition-all duration-300 hover:scale-105 hover:bg-[#82aaff] hover:text-[#111010]"
                >
                  <span>
                    {isEn
                      ? "Click here to see all projects"
                      : "Clique aqui para ver todos os projetos"}
                  </span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </m.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Status & Scroll Indicator */}
        <div className="editorial-container relative z-10 flex items-center justify-between border-t border-white/10 pt-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-bold text-[#82aaff]">
              {stepsMeta[activeStep].number}
            </span>
            <span className="text-[10px] text-white/30">/</span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-white/60">
              03 — {stepsMeta[activeStep].label}
            </span>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.12em] text-white/40">
            <span>
              {activeStep === 2
                ? (isEn ? "Scroll for next section" : "Role para a próxima seção")
                : (isEn ? "Scroll to navigate" : "Role para navegar")}
            </span>
            <ChevronDown className="h-3.5 w-3.5 animate-bounce text-[#82aaff]" />
          </div>
        </div>

      </div>
    </section>
  )
}

export default SelectedProjectsSection

