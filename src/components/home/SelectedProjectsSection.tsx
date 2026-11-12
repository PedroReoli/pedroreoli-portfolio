import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { homeContent, interfaceContent } from '@/data/content'
import { useLanguage } from '@/context/LanguageContext'
import { useReveal } from '@/hooks/useReveal'

export function SelectedProjectsSection() {
  const { language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const section = interfaceContent.selectedProjects
  const copy = section[language]
  const projects = homeContent.featuredProjects
  useReveal(sectionRef)

  return (
    <section ref={sectionRef} id={section.id} className="work-section section-dark">
      <div className="shell">
        <div className="section-kicker section-kicker--dark" data-reveal>
          <span>{section.sectionNumber}</span>
          <p>{copy.eyebrow}</p>
          <p>{projects.length.toString().padStart(2, '0')}</p>
        </div>

        <div className="work-section__heading">
          <h2 data-reveal>{copy.title}<em>.</em></h2>
          <a href={section.morePath} data-reveal data-reveal-delay="55">{copy.moreAction}<ArrowUpRight aria-hidden="true" /></a>
        </div>

        <ul className="home-projects" aria-label={copy.eyebrow}>
          {projects.map((project, index) => (
            <li
              key={project.number}
              className="home-project"
              data-reveal
              data-reveal-delay={110 + index * 55}
            >
              <a
                href={project.href}
                target={project.external ? '_blank' : undefined}
                rel={project.external ? 'noreferrer' : undefined}
              >
                <div className="project-card__top">
                  <span className="project-card__index">{project.number}</span>
                  <span className="project-card__meta">{project.category[language]}</span>
                  <span className="project-card__year">{project.year}</span>
                </div>

                <h3>{project.title}</h3>
                <p className="project-card__desc">{project.description[language]}</p>

                <ul className="project-card__tech" aria-label={interfaceContent.featuredProject[language].technologiesLabel}>
                  {project.technologies.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>

                <span className="project-card__action">
                  {project.action[language]}
                  <ArrowUpRight aria-hidden="true" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
