import React from "react"
import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router-dom"
import type { FeaturedProject } from "../../content/homeContent"
import ResponsiveImage from "../atoms/ResponsiveImage"

const ProjectArtwork: React.FC<{ project: FeaturedProject; isEn: boolean }> = ({
  project,
  isEn,
}) => {
  if (project.visual === "image") {
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

interface FeaturedProjectSlideProps {
  project: FeaturedProject
  isEn: boolean
  total: number
}

const actionClassName =
  "group inline-flex min-h-11 items-center gap-2 sm:gap-3 rounded-full border border-white/30 bg-white/10 px-4 py-2 sm:px-6 sm:py-3 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.14em] text-white backdrop-blur-md transition-colors duration-300 hover:border-white hover:bg-white hover:text-[#111010] shadow-lg"

/** Apresentação de um projeto. A seção pai controla scroll e transições. */
export default function FeaturedProjectSlide({ project, isEn, total }: FeaturedProjectSlideProps) {
  const language = isEn ? "en" : "pt"
  const action = (
    <>
      <span>{project.action[language]}</span>
      <ArrowUpRight
        className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </>
  )

  return (
    <>
      <figure className="project-image-frame relative h-full min-h-0 overflow-hidden rounded-xl border border-white/10 bg-[#191817]">
        <ProjectArtwork project={project} isEn={isEn} />
        <span className="editorial-label absolute right-3 top-3 sm:right-4 sm:top-4 rounded bg-black/60 px-2 py-1 text-[10px] text-white/80 backdrop-blur-md">
          {project.number} / {String(total).padStart(2, "0")}
        </span>
      </figure>
      <div className="selected-project-copy flex flex-col justify-center">
        <div className="mb-1 sm:mb-2 flex items-center gap-2">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#82aaff]" aria-hidden="true" />
          <span className="editorial-label text-[10px] sm:text-xs tracking-[0.14em] text-[#82aaff]">
            {project.category[language]} • {project.year}
          </span>
        </div>
        <h3 className="text-2xl font-black uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
          {project.title}
        </h3>
        <p className="mt-1.5 sm:mt-3 leading-snug sm:leading-relaxed text-white/80 text-xs sm:text-base">
          {project.description[language]}
        </p>
        <ul
          className="mt-2.5 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] font-mono text-white/60"
          aria-label={isEn ? "Project technologies" : "Tecnologias do projeto"}
        >
          {project.technologies.map((technology) => (
            <li
              key={technology}
              className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 sm:px-2.5 sm:py-1"
            >
              {technology}
            </li>
          ))}
        </ul>
        <div className="mt-3.5 sm:mt-6">
          {project.external ? (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className={actionClassName}
            >
              {action}
              <span className="sr-only">{isEn ? "Opens in a new tab" : "Abre em nova aba"}</span>
            </a>
          ) : (
            <Link to={project.href} className={actionClassName}>
              {action}
            </Link>
          )}
        </div>
      </div>
    </>
  )
}
