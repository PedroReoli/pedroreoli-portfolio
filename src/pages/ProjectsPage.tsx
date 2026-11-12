import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { interfaceContent } from '@/data/content'
import { useLanguage } from '@/context/LanguageContext'
import { useRouter } from '@/context/RouterContext'
import { SEO } from '@/components/common/SEO'
import { ProjectCase } from '@/components/projects/ProjectCase'
import { ProjectContents } from '@/components/projects/ProjectContents'
import { projectCases, projectsCopy, resolveProjectCategory } from '@/components/projects/projectEditorial'
import '@/styles/projects-page.css'

function subscribeToHash(onChange: () => void) {
  window.addEventListener('hashchange', onChange)
  window.addEventListener('popstate', onChange)
  return () => {
    window.removeEventListener('hashchange', onChange)
    window.removeEventListener('popstate', onChange)
  }
}

const getHash = () => window.location.hash

export function ProjectsPage() {
  const { language } = useLanguage()
  const { searchParams, setSearchParam } = useRouter()
  const hash = useSyncExternalStore(subscribeToHash, getHash)
  const casesRef = useRef<HTMLDivElement>(null)
  const category = resolveProjectCategory(searchParams.get('tipo'), hash)
  const page = interfaceContent.projectsPage[language]
  const categories = interfaceContent.projectCategories
  const copy = projectsCopy[language]
  const cases = projectCases.filter((project) => project.categories.includes(category))
  const [observedTopic, setObservedTopic] = useState({ category, hash, href: '' })
  const activeTopic = observedTopic.category === category && observedTopic.hash === hash && observedTopic.href
    ? observedTopic.href
    : hash || (cases[0] ? `#${cases[0].id}` : '')

  useEffect(() => {
    const targets = [...(casesRef.current?.querySelectorAll<HTMLElement>('[data-project-topic]') ?? [])]
    if (!targets.length) return

    let frame = 0
    let previousHref = ''
    const update = () => {
      frame = 0
      const headerHeight = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 0
      const readingLine = headerHeight + 28
      let active = targets[0]
      let activeTop = -Infinity

      for (const target of targets) {
        const top = target.getBoundingClientRect().top
        if (top > readingLine) continue
        if (top > activeTop + 1 || (Math.abs(top - activeTop) <= 1 && `#${target.id}` === hash)) {
          active = target
          activeTop = top
        }
      }

      const href = `#${active.id}`
      if (href === previousHref) return
      previousHref = href
      setObservedTopic({ category, hash, href })
    }
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    const resize = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(schedule) : undefined
    const list = casesRef.current
    if (list) resize?.observe(list)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    schedule()

    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      resize?.disconnect()
      window.cancelAnimationFrame(frame)
    }
  }, [category, hash])

  return (
    <div className="projects-page">
      <SEO pageKey="projects" />
      <div className="projects-page__shell">
        <header className="projects-page__header">
          <p className="projects-page__eyebrow">{page.eyebrow}</p>
          <div className="projects-page__heading">
            <h1>{page.title}</h1>
            <p>{page.description}</p>
          </div>
        </header>

        <div className="projects-page__navigation">
          <div className="projects-page__filters" role="group" aria-label={categories.label[language]}>
            {categories.items.map((item) => (
              <button key={item.id} type="button" aria-pressed={category === item.id}
                onClick={() => setSearchParam('tipo', item.id)}>
                {item.label[language]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div key={category} className="projects-page__layout">
        {cases.length > 0 && <ProjectContents projects={cases} language={language} activeTopic={activeTopic} />}
        <div className="projects-page__cases" ref={casesRef}>
          {cases.length ? cases.map((project) => <ProjectCase key={project.id} project={project} language={language} />) : (
            <div className="projects-page__empty" role="status">
              <p>{copy.empty}</p>
              <button type="button" onClick={() => setSearchParam('tipo', 'corporativo')}>{copy.other}</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
