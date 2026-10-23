import React from "react"
import { ArrowUpRight } from "lucide-react"
import { independentProjects } from "../../content/projectsContent"
import Reveal from "../atoms/Reveal"

interface IndependentProjectsSectionProps {
  isEn: boolean
}

export const IndependentProjectsSection: React.FC<IndependentProjectsSectionProps> = ({ isEn }) => (
  <section
    id="gerais-projects"
    className="archive-container archive-section"
    aria-label={isEn ? "Independent projects" : "Projetos independentes"}
  >
    <Reveal
      distance={24}
      duration={0.65}
      className="archive-section-heading grid gap-4 border-b border-white/10 pb-6 lg:grid-cols-12 lg:items-end"
    >
      <h2 className="archive-section-title lg:col-span-7">
        {isEn ? "Independent tools" : "Ferramentas independentes"}
      </h2>
      <p className="max-w-md text-sm leading-relaxed text-[#aaa6a0] sm:text-base lg:col-span-5">
        {isEn
          ? "Open each project's repository on GitHub."
          : "Abra o repositório de cada projeto no GitHub."}
      </p>
    </Reveal>

    {independentProjects.map((project, index) => (
      <Reveal
        key={project.title}
        distance={20}
        duration={0.65}
        amount={0.12}
        delay={(index % 2) * 0.06}
      >
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="project-archive-row group"
        >
          <span className="editorial-label text-[#8d8984]">{project.number}</span>
          <div className="min-w-0">
            <h3 className="project-archive-title text-[#edeae4]">{project.title}</h3>
            <span className="editorial-label mt-2 block text-[#82aaff]">
              {isEn ? project.category.en : project.category.pt}
            </span>
          </div>
          <p className="project-archive-description">
            {isEn ? project.description.en : project.description.pt}
          </p>
          <ArrowUpRight className="project-archive-arrow" aria-hidden="true" />
          <span className="sr-only">
            {isEn ? "Opens on GitHub in a new tab" : "Abre no GitHub em nova aba"}
          </span>
        </a>
      </Reveal>
    ))}
  </section>
)

export default IndependentProjectsSection
