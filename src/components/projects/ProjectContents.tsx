import { List } from 'lucide-react'
import type { Language } from '@/types/content'
import type { EditorialCase } from './projectEditorial'

const copy = {
  pt: { title: 'Sumário', overview: 'Visão geral', results: 'Resultados', diagram: 'Diagrama', challenges: 'Desafios e soluções', architecture: 'Arquitetura', gallery: 'Galeria', references: 'Referências e próximos passos' },
  en: { title: 'Contents', overview: 'Overview', results: 'Results', diagram: 'Diagram', challenges: 'Challenges and solutions', architecture: 'Architecture', gallery: 'Gallery', references: 'References and next steps' },
}

export function ProjectContents({ projects, language, activeTopic }: { projects: EditorialCase[]; language: Language; activeTopic: string }) {
  const text = copy[language]

  return (
    <aside className="projects-contents">
      <nav aria-label={text.title}>
        <p className="projects-contents__title"><List size={17} aria-hidden="true" />{text.title}</p>
        {projects.map(project => {
          const isCurrent = activeTopic === `#${project.id}` || activeTopic.startsWith(`#${project.id}-`)
          const topics = [
            { href: `#${project.id}`, label: text.overview, visible: true },
            { href: `#${project.id}-resultados`, label: text.results, visible: Boolean(project.metrics?.length) },
            { href: `#${project.id}-diagrama`, label: text.diagram, visible: true },
            { href: `#${project.id}-desafios`, label: text.challenges, visible: Boolean(project.starStories?.length) },
            { href: `#${project.id}-arquitetura`, label: text.architecture, visible: Boolean(project.architectures?.length) },
            { href: `#${project.id}-galeria`, label: text.gallery, visible: Boolean(project.galleryGroups?.length) },
            { href: `#${project.id}-contexto`, label: project.contextLabel[language], visible: true },
            { href: `#${project.id}-abordagem`, label: project.approachLabel[language], visible: true },
            { href: `#${project.id}-referencias`, label: text.references, visible: Boolean(project.note || project.evidence) },
          ]

          return (
            <details key={project.id} open={isCurrent} data-current={isCurrent || undefined}>
              <summary>{project.name}</summary>
              <ul>
                {topics.filter(topic => topic.visible).map(topic => (
                  <li key={topic.href}>
                    <a href={topic.href} aria-current={activeTopic === topic.href ? 'location' : undefined}>{topic.label}</a>
                  </li>
                ))}
              </ul>
            </details>
          )
        })}
      </nav>
    </aside>
  )
}
