import { useCallback, useState } from 'react'
import { ArrowUpRight, Expand } from 'lucide-react'
import { interfaceContent, projectsContent } from '@/data/content'
import { useLanguage } from '@/context/LanguageContext'
import { SEO } from '@/components/common/SEO'
import { ProjectViewerModal } from '@/components/projects/ProjectViewerModal'

export function ProjectsPage() {
  const { language } = useLanguage()
  const [category, setCategory] = useState<'corporativo' | 'gerais'>(() => new URLSearchParams(window.location.search).get('tipo') === 'gerais' ? 'gerais' : 'corporativo')
  const [viewerIndex, setViewerIndex] = useState<number | null>(null)
  const setViewer = useCallback((index: number | null) => setViewerIndex(index), [])
  const page = interfaceContent.projectsPage[language]
  const categories = interfaceContent.projectCategories
  const corporate = interfaceContent.corporateProjects
  const corporateCopy = corporate[language]
  const independent = interfaceContent.independentProjects[language]

  const selectCategory = (value: 'corporativo' | 'gerais') => {
    setCategory(value)
    window.history.replaceState(null, '', `/projetos?tipo=${value}`)
  }

  return (
    <div className="archive-page">
      <SEO pageKey="projects" />
      <header className="archive-hero">
        <div className="shell">
          <p>{page.eyebrow}</p><h1>{page.title}</h1><span>{page.description}</span>
          <div className="archive-tabs" role="tablist" aria-label={categories.label[language]}>
            {categories.items.map((item) => (
              <button key={item.id} type="button" role="tab" aria-selected={category === item.id} onClick={() => selectCategory(item.id as 'corporativo' | 'gerais')}>
                {item.label[language]}
              </button>
            ))}
          </div>
        </div>
      </header>

      {category === 'corporativo' ? (
        <section className="project-archive section-light">
          <div className="shell">
            <div className="archive-title"><span>{corporateCopy.sectionLabel} / {corporate.period}</span><h2>{corporate.title}</h2><p>{corporateCopy.description}</p></div>
            <div className="gallery-grid">
              {projectsContent.corporateProjectImages.map((image, index) => (
                <button key={image.src} type="button" className={image.wide ? 'is-wide' : ''} onClick={() => setViewerIndex(index)} aria-label={`${corporateCopy.galleryAction}: ${image.alt[language]}`}>
                  <img src={image.src} srcSet={image.srcSet} alt={image.alt[language]} loading="lazy" /><span>{image.alt[language]}<Expand /></span>
                </button>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="project-archive section-light">
          <div className="shell">
            <div className="archive-title"><span>{independent.sectionLabel}</span><h2>{independent.title}</h2><p>{independent.description}</p></div>
            <div className="independent-grid">
              {projectsContent.independentProjects.map((project) => (
                <a key={project.number} href={project.href} target="_blank" rel="noreferrer">
                  <span>{project.number} / {project.category[language]}</span><h3>{project.title}</h3><p>{project.description[language]}</p><ArrowUpRight />
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
      <ProjectViewerModal images={projectsContent.corporateProjectImages} index={viewerIndex} onChange={setViewer} />
    </div>
  )
}
