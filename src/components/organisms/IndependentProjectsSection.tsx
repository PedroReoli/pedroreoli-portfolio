import React from "react"
import { ArrowUpRight } from "lucide-react"
import { independentProjects } from "../../content/projectsContent"

interface IndependentProjectsSectionProps {
  isEn: boolean
}

export const IndependentProjectsSection: React.FC<IndependentProjectsSectionProps> = ({
  isEn,
}) => (
  <section
    id="gerais-projects"
    className="editorial-container pb-32"
    aria-label={isEn ? "Independent projects" : "Projetos independentes"}
  >
    <div className="grid gap-8 border-y border-white/10 py-10 sm:py-14 lg:grid-cols-12 lg:items-end">
      <h2 className="section-display lg:col-span-8">
        {isEn ? (
          <>
            INDEPENDENT
            <br />
            SYSTEMS
          </>
        ) : (
          <>
            SISTEMAS
            <br />
            INDEPENDENTES
          </>
        )}
      </h2>
      <p className="max-w-md text-base leading-relaxed text-[#9a9690] sm:text-lg lg:col-span-4">
        {isEn
          ? "Open tools built around autonomy, privacy and direct control."
          : "Ferramentas abertas construídas em torno de autonomia, privacidade e controle direto."}
      </p>
    </div>

    {independentProjects.map((project) => (
      <a
        key={project.title}
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 border-b border-white/10 py-7 sm:grid-cols-[4rem_minmax(12rem,0.8fr)_minmax(14rem,1fr)_auto] sm:py-10"
      >
        <span className="editorial-label text-[#8d8984]">{project.number}</span>
        <div>
          <strong className="block text-3xl leading-none tracking-[-0.05em] text-[#edeae4] sm:text-5xl">
            {project.title}
          </strong>
          <span className="editorial-label mt-3 block text-[#82aaff] sm:hidden">
            {isEn ? project.category.en : project.category.pt}
          </span>
        </div>
        <div className="hidden sm:block">
          <span className="editorial-label text-[#82aaff]">
            {isEn ? project.category.en : project.category.pt}
          </span>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#8d8984]">
            {isEn ? project.description.en : project.description.pt}
          </p>
        </div>
        <ArrowUpRight className="h-5 w-5 text-[#82aaff] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
      </a>
    ))}
  </section>
)

export default IndependentProjectsSection
