import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { homeContent, interfaceContent } from '@/data/content'
import { useLanguage } from '@/context/LanguageContext'
import { useReveal } from '@/hooks/useReveal'

// Seleção editorial da Home: sem promover métricas/destinos públicos não verificados.
const summaries: Record<string, { pt: string; en: string }> = {
  Autocom3: {
    pt: 'Interfaces e fluxos corporativos para operações de ERP, com integrações e componentes reutilizáveis.',
    en: 'Corporate interfaces and workflows for ERP operations, with integrations and reusable components.',
  },
  Achilles: {
    pt: 'Automação de navegador via Chrome DevTools Protocol, ferramentas MCP e extração semântica de páginas.',
    en: 'Browser automation through Chrome DevTools Protocol, MCP tools and semantic page extraction.',
  },
  Organon: {
    pt: 'Projeto independente de produtividade e organização. Conheça o contexto na seleção de projetos.',
    en: 'An independent productivity and organization project. Explore its context in the project selection.',
  },
}

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
  useReveal(sectionRef)

  return (
    <section ref={sectionRef} id={section.id} className="work-section section-dark">
      <div className="shell">
        <div className="section-kicker section-kicker--dark" data-reveal="smoke">
          <span>{section.sectionNumber}</span>
          <p>{copy.eyebrow}</p>
          <p>{projects.length.toString().padStart(2, '0')}</p>
        </div>

        <div className="work-section__heading" data-reveal="smoke">
          <h2>{copy.title}<em>.</em></h2>
          <a href={section.morePath}>{copy.moreAction}<ArrowUpRight aria-hidden="true" /></a>
        </div>

        <ul className="home-projects" aria-label={copy.eyebrow}>
          {projects.map((project, index) => (
            <li
              key={project.number}
              className="home-project"
              data-reveal="card"
              data-reveal-delay={String(index * 120)}
            >
              <a
                href={project.title === 'Organon' ? section.morePath : project.href}
                target={project.external && project.title !== 'Organon' ? '_blank' : undefined}
                rel={project.external && project.title !== 'Organon' ? 'noreferrer' : undefined}
              >
                <div className="project-card__top">
                  <span className="project-card__index">{project.number}</span>
                  <span className="project-card__meta">{project.category[language]}</span>
                  <span className="project-card__year">{project.year}</span>
                </div>

                <h3>{project.title}</h3>
                <p className="project-card__desc">{summaries[project.title]?.[language] ?? project.description[language]}</p>

                <ul className="project-card__tech" aria-label={interfaceContent.featuredProject[language].technologiesLabel}>
                  {project.technologies.filter(tech => project.title !== 'Achilles' || tech !== 'Windows UIA').map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>

                <span className="project-card__action">
                  {project.title === 'Organon' ? (language === 'pt' ? 'Conhecer projeto' : 'Explore project') : project.action[language]}
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
