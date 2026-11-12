import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Icon } from '@/components/common/Icon'
import type { Language } from '@/types/content'
import type { EditorialCase, EditorialScreenshot, EditorialGalleryGroup } from './projectEditorial'
import { projectsCopy } from './projectEditorial'

interface Props {
  project: EditorialCase
  language: Language
}

function GalleryGroupCarousel({ group, language, onSelect }: { group: EditorialGalleryGroup; language: Language; onSelect: (img: EditorialScreenshot) => void }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const total = group.items.length
  const current = group.items[currentIndex]

  const prev = () => setCurrentIndex((idx) => (idx - 1 + total) % total)
  const next = () => setCurrentIndex((idx) => (idx + 1) % total)

  return (
    <div className="projects-case__carousel-card">
      <div className="projects-case__carousel-header">
        <div className="projects-case__carousel-headline">
          <h4>{group.title[language]}</h4>
          <p className="projects-case__carousel-desc">{group.description[language]}</p>
        </div>
        <div className="projects-case__carousel-nav">
          <span className="projects-case__carousel-counter">{currentIndex + 1} / {total}</span>
          <button type="button" onClick={prev} aria-label="Imagem anterior" className="projects-case__carousel-btn">
            <ChevronLeft size={16} />
          </button>
          <button type="button" onClick={next} aria-label="Próxima imagem" className="projects-case__carousel-btn">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div
        className="projects-case__carousel-stage"
        onClick={() => onSelect(current)}
        role="button"
        tabIndex={0}
        aria-label={`${current.title[language]} - Clique para expandir`}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(current); } }}
      >
        <img src={current.src} alt={current.title[language]} loading="lazy" />
        <span className="projects-case__gallery-zoom">
          <Icon name="arrow-up-right" size={16} />
        </span>
      </div>

      <div className="projects-case__carousel-caption">
        <strong>{current.title[language]}</strong>
        <p>{current.caption[language]}</p>
      </div>
    </div>
  )
}

export function ProjectCase({ project, language }: Props) {
  const copy = projectsCopy[language]
  const [modalIndex, setModalIndex] = useState<number | null>(null)

  // Flatten all gallery screenshots across groups for linear lightbox browsing
  const allScreenshots: EditorialScreenshot[] = project.galleryGroups
    ? project.galleryGroups.flatMap((g) => g.items)
    : project.gallery || []

  const selectedScreenshot = modalIndex !== null && allScreenshots[modalIndex] ? allScreenshots[modalIndex] : null

  const handleSelectScreenshot = (img: EditorialScreenshot) => {
    const idx = allScreenshots.findIndex((s) => s.src === img.src)
    setModalIndex(idx !== -1 ? idx : 0)
  }

  const prevModal = () => {
    if (allScreenshots.length <= 1) return
    setModalIndex((idx) => (idx !== null ? (idx - 1 + allScreenshots.length) % allScreenshots.length : 0))
  }

  const nextModal = () => {
    if (allScreenshots.length <= 1) return
    setModalIndex((idx) => (idx !== null ? (idx + 1) % allScreenshots.length : 0))
  }

  return (
    <article className="projects-case" id={project.id} aria-labelledby={`${project.id}-title`} tabIndex={-1} data-project-topic>
      <div className="projects-case__header">
        <div>
          <p className="projects-case__type">{project.type[language]}</p>
          <h2 id={`${project.id}-title`}>{project.name}</h2>
        </div>
        <p className="projects-case__intro">{project.introduction[language]}</p>
      </div>

      {project.metrics && project.metrics.length > 0 && (
        <div className="projects-case__metrics" id={`${project.id}-resultados`} tabIndex={-1} data-project-topic aria-label={copy.metrics}>
          {project.metrics.map((m) => (
            <div key={m.value + m.label.pt} className="projects-case__metric-card">
              <span className="projects-case__metric-val">{m.value}</span>
              <span className="projects-case__metric-lbl">{m.label[language]}</span>
            </div>
          ))}
        </div>
      )}

      <div className={`projects-case__visual projects-case__visual--${project.id}`} id={`${project.id}-diagrama`} tabIndex={-1} data-project-topic>
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
        <div className="projects-case__star-section" id={`${project.id}-desafios`} tabIndex={-1} data-project-topic>
          <header className="projects-case__sub-header">
            <h3>{language === 'pt' ? 'Histórias de Desafios & Soluções' : 'Key Challenges & Solutions'}</h3>
            <p>{language === 'pt' ? 'Desafios críticos de arquitetura e entregas em produção' : 'Critical architecture challenges and production deliverables'}</p>
          </header>
          <div className="projects-case__star-grid">
            {project.starStories.map((story, idx) => (
              <div
                key={story.title.pt}
                className={`projects-case__star-card ${idx === 4 ? 'projects-case__star-card--centered' : ''}`}
              >
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
        <div className="projects-case__arch-section" id={`${project.id}-arquitetura`} tabIndex={-1} data-project-topic>
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

      {project.galleryGroups && project.galleryGroups.length > 0 && (
        <div className="projects-case__gallery-section" id={`${project.id}-galeria`} tabIndex={-1} data-project-topic>
          <header className="projects-case__sub-header">
            <h3>{language === 'pt' ? 'Galeria por Sistemas & Módulos' : 'Systems & Modules Gallery'}</h3>
            <p>{language === 'pt' ? 'Capturas organizadas por contexto operacional com dados sensíveis mascarados' : 'Screens categorized by business context with privacy-masked operational data'}</p>
          </header>
          <div className="projects-case__carousels-grid">
            {project.galleryGroups.map((group) => (
              <GalleryGroupCarousel
                key={group.id}
                group={group}
                language={language}
                onSelect={handleSelectScreenshot}
              />
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
          onClick={() => setModalIndex(null)}
        >
          <div className="projects-case__modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="projects-case__modal-close"
              onClick={() => setModalIndex(null)}
              aria-label="Fechar visualização"
            >
              ✕
            </button>
            <div className="projects-case__modal-stage">
              <button
                type="button"
                className="projects-case__modal-nav projects-case__modal-nav--prev"
                onClick={prevModal}
                aria-label="Imagem anterior"
              >
                <ChevronLeft size={24} />
              </button>
              <img src={selectedScreenshot.src} alt={selectedScreenshot.title[language]} />
              <button
                type="button"
                className="projects-case__modal-nav projects-case__modal-nav--next"
                onClick={nextModal}
                aria-label="Próxima imagem"
              >
                <ChevronRight size={24} />
              </button>
            </div>
            <div className="projects-case__modal-footer">
              <div>
                <span className="projects-case__gallery-tag">{selectedScreenshot.tag}</span>
                <h3>{selectedScreenshot.title[language]}</h3>
              </div>
              <div className="projects-case__modal-info">
                <span className="projects-case__modal-counter">
                  {(modalIndex ?? 0) + 1} / {allScreenshots.length}
                </span>
                <p>{selectedScreenshot.caption[language]}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="projects-case__body">
        <div className="projects-case__detail" id={`${project.id}-contexto`} tabIndex={-1} data-project-topic>
          <h3>{project.contextLabel[language]}</h3>
          <p>{project.context[language]}</p>
        </div>
        <div className="projects-case__detail" id={`${project.id}-abordagem`} tabIndex={-1} data-project-topic>
          <h3>{project.approachLabel[language]}</h3>
          <p>{project.approach[language]}</p>
        </div>
        {(project.note || project.evidence) && (
          <div className="projects-case__evidence" id={`${project.id}-referencias`} tabIndex={-1} data-project-topic>
            {project.note && <p className="projects-case__note">{project.note[language]}</p>}
            {project.evidence?.map(({ href, label }) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label[language]} — ${project.name} (${copy.external})`}>
                {label[language]} <Icon name="arrow-up-right" size={20} />
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

