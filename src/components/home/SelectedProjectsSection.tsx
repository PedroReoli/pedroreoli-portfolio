import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { homeContent, interfaceContent } from '@/data/content'
import { useLanguage } from '@/context/LanguageContext'
import { m } from 'motion/react'

/**
 * Três cards, nada de imagem: a seção era um screenshot gigante com fonte enorme e
 * não dava para ler nada. O card carrega número, categoria, ano, título, resumo e as
 * tecnologias — a leitura vira a protagonista.
 */
export function SelectedProjectsSection() {
  const { language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const section = interfaceContent.selectedProjects
  const copy = section[language]
  const projects = homeContent.featuredProjects

  return (
    <section ref={sectionRef} id={section.id} className="work-section section-dark">
      <div className="shell">
        <div className="section-kicker section-kicker--dark">
          <span>{section.sectionNumber}</span>
          <p>{copy.eyebrow}</p>
          <p>{projects.length.toString().padStart(2, '0')}</p>
        </div>

        <div className="work-section__heading">
          <h2>{copy.title}<em>.</em></h2>
          <a href={section.morePath}>{copy.moreAction}<ArrowUpRight aria-hidden="true" /></a>
        </div>

        <ul className="project-cards" aria-label={copy.eyebrow}>
          {projects.map((project) => (
            <m.li
              key={project.number}
              className="project-card"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
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
            </m.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
