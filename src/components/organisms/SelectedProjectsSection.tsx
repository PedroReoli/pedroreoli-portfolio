import React, { useState } from "react"
import { AnimatePresence, m, useReducedMotion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router-dom"
import { featuredProjects, type FeaturedProject } from "../../content/homeContent"
import { useLanguage } from "../../i18n/useLanguage"
import Reveal from "../atoms/Reveal"
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
    <m.div
      key={project.title}
      className="project-agent-visual absolute inset-0"
      role="img"
      aria-label={
        isEn ? "Achilles browser agent system diagram" : "Diagrama do agente de navegador Achilles"
      }
    >
      <span className="project-agent-kicker">
        {isEn ? "LOCAL AGENT / CDP" : "AGENTE LOCAL / CDP"}
      </span>
      <span className="project-agent-word" aria-hidden="true">
        ACHILLES
      </span>
      <div className="project-agent-flow" aria-hidden="true">
        <span>01 / {isEn ? "OBSERVE" : "OBSERVAR"}</span>
        <span>02 / {isEn ? "DECIDE" : "DECIDIR"}</span>
        <span>03 / {isEn ? "OPERATE" : "OPERAR"}</span>
      </div>
    </m.div>
  )
}

export const SelectedProjectsSection: React.FC = () => {
  const { language } = useLanguage()
  const isEn = language === "en"
  const reduceMotion = useReducedMotion()
  const [activeProject, setActiveProject] = useState(0)
  const project = featuredProjects[activeProject]

  return (
    <section id="projetos-selecionados" className="viewport-stage project-stage">
      <div className="editorial-container project-stage-layout">
        <Reveal className="project-stage-heading flex items-end justify-between border-b border-white/10 pb-3 sm:pb-4">
          <div>
            <p className="editorial-label mb-2 text-[#82aaff]">
              02 / {isEn ? "Selected work" : "Trabalhos selecionados"}
            </p>
            <h2 className="project-stage-title font-black uppercase text-[#edeae4]">PROJETOS</h2>
          </div>
          <Link
            to="/projetos"
            className="group mb-1 inline-flex min-h-11 items-center gap-2 border-b border-[#edeae4] pb-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#edeae4] sm:text-xs"
          >
            {isEn ? "View all" : "Ver todos"}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <div className="project-switcher flex items-center overflow-x-auto border-b border-white/10">
          {featuredProjects.map((item, index) => (
            <button
              key={item.title}
              type="button"
              onClick={() => setActiveProject(index)}
              className={`project-switcher-button editorial-label relative min-h-11 shrink-0 py-3 text-left transition-colors ${
                activeProject === index ? "text-[#edeae4]" : "text-[#66625e] hover:text-[#aaa6a0]"
              }`}
              aria-pressed={activeProject === index}
            >
              <span className="mr-2 text-[#82aaff]">{item.number}</span>
              {item.title}
            </button>
          ))}
        </div>

        <div className="project-feature min-h-0">
          <figure className="project-image-frame group relative min-h-0 overflow-hidden rounded-xl bg-[#1b1a19]">
            <AnimatePresence mode="wait">
              <m.div
                key={project.title}
                className="absolute inset-0"
                initial={reduceMotion ? false : { opacity: 0, scale: 1.035 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.985 }}
                transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectArtwork project={project} isEn={isEn} />
              </m.div>
            </AnimatePresence>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <span className="editorial-label absolute right-3 top-3 text-white/75 sm:right-5 sm:top-5">
              {project.number} — 0{featuredProjects.length}
            </span>
            <span className="editorial-label absolute bottom-3 left-3 text-white sm:bottom-5 sm:left-5">
              {isEn ? project.category.en : project.category.pt} / {project.year}
            </span>
          </figure>

          <AnimatePresence mode="wait">
            <m.article
              key={project.title}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="project-feature-copy flex min-h-0 flex-col justify-end"
              aria-live="polite"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="h-px w-8 bg-[#82aaff]" />
                <p className="editorial-label text-[#8d8984]">
                  {project.number} / {project.year}
                </p>
              </div>
              <h3 className="project-feature-title font-bold text-[#edeae4]">{project.title}</h3>
              <p className="project-feature-description mt-3 max-w-lg leading-relaxed text-[#9a9690]">
                {isEn ? project.description.en : project.description.pt}
              </p>
              {project.external ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-feature-link mt-5 inline-flex h-11 w-fit items-center gap-3 rounded-full border border-white/25 px-5 text-[9px] font-semibold uppercase tracking-[0.12em] transition-colors hover:border-white hover:bg-white hover:text-[#111010]"
                >
                  {isEn ? "Open project" : "Abrir projeto"}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              ) : (
                <Link
                  to={project.href}
                  className="project-feature-link mt-5 inline-flex h-11 w-fit items-center gap-3 rounded-full border border-white/25 px-5 text-[9px] font-semibold uppercase tracking-[0.12em] transition-colors hover:border-white hover:bg-white hover:text-[#111010]"
                >
                  {isEn ? "Open project" : "Abrir projeto"}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              )}
            </m.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default SelectedProjectsSection
