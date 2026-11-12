import { useSyncExternalStore } from 'react'
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
  const category = resolveProjectCategory(searchParams.get('tipo'), hash)
  const page = interfaceContent.projectsPage[language]
  const categories = interfaceContent.projectCategories
  const copy = projectsCopy[language]
  const cases = projectCases.filter((project) => project.categories.includes(category))

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

        <div key={category} className="projects-page__layout">
          {cases.length > 0 && <ProjectContents projects={cases} language={language} hash={hash} />}
          <div className="projects-page__cases">
            {cases.length ? cases.map((project) => <ProjectCase key={project.id} project={project} language={language} />) : (
              <div className="projects-page__empty" role="status">
                <p>{copy.empty}</p>
                <button type="button" onClick={() => setSearchParam('tipo', 'corporativo')}>{copy.other}</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
