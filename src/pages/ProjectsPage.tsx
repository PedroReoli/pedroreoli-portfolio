import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { ChevronDown, List } from 'lucide-react'
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
const mobileCategoryLabels: Record<string, { pt: string; en: string }> = {
  ia: { pt: 'IA aplicada', en: 'Applied AI' },
}

export function ProjectsPage() {
  const { language } = useLanguage()
  const { searchParams, setSearchParam } = useRouter()
  const hash = useSyncExternalStore(subscribeToHash, getHash)
  const casesRef = useRef<HTMLDivElement>(null)
  const contentsTrigger = useRef<HTMLButtonElement>(null)
  const [mobileContentsOpen, setMobileContentsOpen] = useState(false)
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
      const anchorOffset = Number.parseFloat(getComputedStyle(targets[0]).scrollMarginTop) || 0
      const readingLine = anchorOffset + 12
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

      <div className="projects-mobile-controls" onKeyDown={event => {
        if (event.key === 'Escape' && mobileContentsOpen) {
          setMobileContentsOpen(false)
          contentsTrigger.current?.focus()
        }
      }}>
        <div className="projects-mobile-controls__bar">
          <div className="projects-mobile-controls__category">
            <select
              aria-label={categories.label[language]}
              value={category}
              onChange={event => {
                setMobileContentsOpen(false)
                setSearchParam('tipo', event.target.value)
                window.scrollTo({ top: 0, behavior: 'instant' })
              }}
            >
              {categories.items.map(item => <option key={item.id} value={item.id}>{(mobileCategoryLabels[item.id] ?? item.label)[language]}</option>)}
            </select>
            <ChevronDown size={16} aria-hidden="true" />
          </div>
          {cases.length > 0 && (
            <button ref={contentsTrigger} type="button" aria-controls="mobile-project-contents" aria-expanded={mobileContentsOpen} onClick={() => setMobileContentsOpen(open => !open)}>
              <List size={16} aria-hidden="true" />{language === 'pt' ? 'Sumário' : 'Contents'}
            </button>
          )}
        </div>
        {cases.length > 0 && <ProjectContents projects={cases} language={language} activeTopic={activeTopic} compact open={mobileContentsOpen} onNavigate={() => setMobileContentsOpen(false)} />}
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
