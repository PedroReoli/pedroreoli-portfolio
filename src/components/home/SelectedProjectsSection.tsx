import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { homeContent, interfaceContent } from '@/data/content'
import { useLanguage } from '@/context/LanguageContext'
import { useReveal } from '@/hooks/useReveal'
import { m } from 'motion/react'

function AchillesArtwork({ project, language }: { project: (typeof homeContent.featuredProjects)[number]; language: 'pt' | 'en' }) {
  if (project.visual !== 'agent') return null
  return (
    <div className="agent-art" role="img" aria-label={project.artwork.alt[language]}>
      <div className="agent-art__radar"><span /><span /><span /></div>
      <div className="agent-art__core">{project.artwork.name[0]}</div>
      <p>{project.artwork.name}</p>
      <div className="agent-art__steps">
        {project.artwork.steps.map((step) => <span key={step.number}>{step.number}</span>)}
      </div>
    </div>
  )
}

export function SelectedProjectsSection() {
  const { language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const section = interfaceContent.selectedProjects
  const copy = section[language]
  useReveal(sectionRef)

  return (
    <section ref={sectionRef} id={section.id} className="work-section section-dark">
      <div className="shell">
        <div className="section-kicker section-kicker--dark" data-reveal>
          <span>{section.sectionNumber}</span><p>{copy.eyebrow}</p><p>{homeContent.featuredProjects.length.toString().padStart(2, '0')}</p>
        </div>
        <div className="work-section__heading" data-reveal>
          <h2>{copy.title}<em>.</em></h2>
          <a href={section.morePath}>{copy.moreAction}<ArrowUpRight aria-hidden="true" /></a>
        </div>

        <div className="project-showcase">
          {homeContent.featuredProjects.map((project, index) => (
            <m.article className={`project-card project-card--${index + 1}`} key={project.number} data-reveal whileHover={{ y: -5 }} transition={{ duration: 0.22 }}>
              <a href={project.href} target={project.external ? '_blank' : undefined} rel={project.external ? 'noreferrer' : undefined}>
                <div className="project-card__visual">
                  {project.visual === 'image' ? (
                    <img src={project.image} srcSet={project.imageSrcSet} sizes="(max-width: 800px) 100vw, 65vw" alt={project.imageAlt[language]} />
                  ) : <AchillesArtwork project={project} language={language} />}
                  <span className="project-card__index">{project.number}</span>
                </div>
                <div className="project-card__body">
                  <div className="project-card__meta"><span>{project.category[language]}</span><span>{project.year}</span></div>
                  <h3>{project.title}</h3>
                  <p>{project.description[language]}</p>
                  <p className="project-card__technologies" aria-label={interfaceContent.featuredProject[language].technologiesLabel}>{project.technologies.join(' · ')}</p>
                  <span className="project-card__action">{project.action[language]}<ArrowUpRight aria-hidden="true" /></span>
                </div>
              </a>
            </m.article>
          ))}
        </div>
      </div>
    </section>
  )
}
