import { useState } from 'react'
import { Icon } from '@/components/common/Icon'
import type { Language } from '@/types/content'
import type { EditorialCase, EditorialScreenshot } from './projectEditorial'
import { projectsCopy } from './projectEditorial'

interface Props {
  project: EditorialCase
  language: Language
}

export function ProjectCase({ project, language }: Props) {
  const copy = projectsCopy[language]
  const [selectedScreenshot, setSelectedScreenshot] = useState<EditorialScreenshot | null>(null)

  return (
    <article className="projects-case" id={project.id} aria-labelledby={`${project.id}-title`}>
      <div className="projects-case__header">
        <div>
          <p className="projects-case__type">{project.type[language]}</p>
          <h2 id={`${project.id}-title`}>{project.name}</h2>
        </div>
        <p className="projects-case__intro">{project.introduction[language]}</p>
      </div>

      {project.metrics && project.metrics.length > 0 && (
        <div className="projects-case__metrics" aria-label="Métricas de impacto">
          {project.metrics.map((m) => (
            <div key={m.value + m.label.pt} className="projects-case__metric-card">
              <span className="projects-case__metric-val">{m.value}</span>
              <span className="projects-case__metric-lbl">{m.label[language]}</span>
            </div>
          ))}
        </div>
      )}

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

      {project.starStories && project.starStories.length > 0 && (
        <div className="projects-case__star-section">
          <header className="projects-case__sub-header">
            <h3>{language === 'pt' ? 'Histórias de Impacto STAR' : 'STAR Impact Stories'}</h3>
            <p>{language === 'pt' ? 'Desafios críticos de arquitetura e soluções em produção' : 'Critical architectural challenges and production solutions'}</p>
          </header>
          <div className="projects-case__star-grid">
            {project.starStories.map((story) => (
              <div key={story.title.pt} className="projects-case__star-card">
                <div className="projects-case__star-top">
                  <span className="projects-case__star-tag">{story.tag[language]}</span>
                  <span className="projects-case__star-metric">{story.metric[language]}</span>
                </div>
                <h4>{story.title[language]}</h4>
                <p>{story.summary[language]}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {project.architectures && project.architectures.length > 0 && (
        <div className="projects-case__arch-section">
          <header className="projects-case__sub-header">
            <h3>{language === 'pt' ? 'Arquitetura dos 4 Projetos do Ecossistema' : 'Ecosystem Architecture (4 Projects)'}</h3>
            <p>{language === 'pt' ? 'Portal Web, ERP Desktop, Engine de Dev e App Mobile B2B' : 'Web Portal, Desktop ERP, Dev Engine and B2B Mobile App'}</p>
          </header>
          <div className="projects-case__arch-grid">
            {project.architectures.map((arch) => (
              <div key={arch.title.pt} className="projects-case__arch-card">
                <h4>{arch.title[language]}</h4>
                <code className="projects-case__arch-tech">{arch.tech[language]}</code>
                <p>{arch.description[language]}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {project.gallery && project.gallery.length > 0 && (
        <div className="projects-case__gallery-section">
          <header className="projects-case__sub-header">
            <h3>{language === 'pt' ? 'Galeria de Telas & Evidências Técnicas (16:9)' : 'Technical 16:9 Screen Gallery & Evidence'}</h3>
            <p>{language === 'pt' ? '13 capturas de alta resolução com dados sensíveis mascarados' : '13 high-resolution screens with privacy-masked operational data'}</p>
          </header>
          <div className="projects-case__gallery-grid">
            {project.gallery.map((screen) => (
              <figure
                key={screen.src}
                className="projects-case__gallery-item"
                onClick={() => setSelectedScreenshot(screen)}
                tabIndex={0}
                role="button"
                aria-label={`${screen.title[language]} - Clique para ampliar`}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedScreenshot(screen); } }}
              >
                <div className="projects-case__gallery-thumb">
                  <img src={screen.src} alt={screen.title[language]} loading="lazy" />
                  <span className="projects-case__gallery-zoom">
                    <Icon name="arrow-up-right" size={16} />
                  </span>
                </div>
                <figcaption>
                  <span className="projects-case__gallery-tag">{screen.tag}</span>
                  <strong>{screen.title[language]}</strong>
                  <p>{screen.caption[language]}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}

      {selectedScreenshot && (
        <div
          className="projects-case__modal"
          role="dialog"
          aria-modal="true"
          aria-label={selectedScreenshot.title[language]}
          onClick={() => setSelectedScreenshot(null)}
        >
          <div className="projects-case__modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="projects-case__modal-close"
              onClick={() => setSelectedScreenshot(null)}
              aria-label="Fechar visualização"
            >
              ✕
            </button>
            <img src={selectedScreenshot.src} alt={selectedScreenshot.title[language]} />
            <div className="projects-case__modal-footer">
              <div>
                <span className="projects-case__gallery-tag">{selectedScreenshot.tag}</span>
                <h3>{selectedScreenshot.title[language]}</h3>
              </div>
              <p>{selectedScreenshot.caption[language]}</p>
            </div>
          </div>
        </div>
      )}

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

