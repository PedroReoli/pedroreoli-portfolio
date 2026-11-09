import { Icon } from '@/components/common/Icon'
import type { Language } from '@/types/content'
import type { EditorialCase } from './projectEditorial'
import { projectsCopy } from './projectEditorial'

interface Props {
  project: EditorialCase
  language: Language
}

export function ProjectCase({ project, language }: Props) {
  const copy = projectsCopy[language]
  return (
    <article className="projects-case" id={project.id} aria-labelledby={`${project.id}-title`}>
      <div className="projects-case__header">
        <div>
          <p className="projects-case__type">{project.type[language]}</p>
          <h2 id={`${project.id}-title`}>{project.name}</h2>
        </div>
        <p className="projects-case__intro">{project.introduction[language]}</p>
      </div>

      <div className={`projects-case__visual projects-case__visual--${project.id}`}>
        <div className="projects-case__visual-head">
          <span>{project.name}</span><span>{copy.diagram}</span>
        </div>
        <div className="projects-case__diagram" role="group" aria-label={project.diagramLabel[language]}>
          {project.diagram.map((item, index) => (
            <div className="projects-case__node" key={item.pt}>
              <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <strong>{item[language]}</strong>
            </div>
          ))}
        </div>
        <span className="projects-case__visual-caption">{project.diagramLabel[language]}</span>
      </div>

      <div className="projects-case__body">
        <div className="projects-case__detail">
          <h3>{project.contextLabel[language]}</h3>
          <p>{project.context[language]}</p>
        </div>
        <div className="projects-case__detail">
          <h3>{project.approachLabel[language]}</h3>
          <p>{project.approach[language]}</p>
        </div>
        <div className="projects-case__evidence">
          {project.note && <p className="projects-case__note">{project.note[language]}</p>}
          {project.evidence && (
            <a href={project.evidence.href} target="_blank" rel="noopener noreferrer" aria-label={`${project.evidence.label[language]} — ${project.name} (${copy.external})`}>
              {project.evidence.label[language]} <Icon name="arrow-up-right" size={20} />
              <span className="sr-only"> ({copy.external})</span>
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

