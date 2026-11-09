import { interfaceContent } from '@/data/content'
import { useLanguage } from '@/context/LanguageContext'
import { useRouter } from '@/context/RouterContext'
import { SEO } from '@/components/common/SEO'
import { ProjectCase } from '@/components/projects/ProjectCase'
import { projectCases, projectsCopy, type ProjectCategory } from '@/components/projects/projectEditorial'
import '@/styles/projects-page.css'

export function ProjectsPage() {
  const { language } = useLanguage()
  const { searchParams, setSearchParam } = useRouter()
  const category: ProjectCategory = searchParams.get('tipo') === 'gerais' ? 'gerais' : 'corporativo'
  const page = interfaceContent.projectsPage[language]
  const categories = interfaceContent.projectCategories
  const copy = projectsCopy[language]
  const cases = projectCases.filter((project) => project.category === category)

  return (
    <div className="projects-page">
      <SEO pageKey="projects" />
      <div className="projects-page__shell">
        <header className="projects-page__header">
          <p className="projects-page__eyebrow">{page.eyebrow}</p>
          <div className="projects-page__heading">
            <h1>{page.title}</h1>
            <p>{copy.introduction}</p>
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
          <nav className="projects-page__index" aria-label={copy.index}>
            {cases.map((project) => <a key={project.id} href={`#${project.id}`}>{project.name}</a>)}
          </nav>
        </div>

        <div className="projects-page__cases">
          {cases.length ? cases.map((project) => <ProjectCase key={project.id} project={project} language={language} />) : (
            <div className="projects-page__empty" role="status">
              <p>{copy.empty}</p>
              <button type="button" onClick={() => setSearchParam('tipo', category === 'corporativo' ? 'gerais' : 'corporativo')}>{copy.other}</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
