import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { interfaceContent } from '@/data/content'
import { useLanguage } from '@/context/LanguageContext'
import { useRouter } from '@/context/RouterContext'
import { SEO } from '@/components/common/SEO'

export function NotFoundPage() {
  const { language } = useLanguage()
  const { navigate } = useRouter()
  const page = interfaceContent.notFound
  const copy = page[language]
  const go = (path: string, event: React.MouseEvent<HTMLAnchorElement>) => { event.preventDefault(); navigate(path) }
  return <section className="not-found"><SEO pageKey="notFound" /><div className="shell">
    <span>404 / {copy.label}</span><h1>{copy.titleFirst}<em>{copy.titleSecond}</em></h1><p>{copy.description}</p>
    <nav aria-label={copy.navLabel}><a href={page.homePath} onClick={(event) => go(page.homePath, event)}><ArrowLeft />{copy.homeAction}</a><a href={page.projectsPath} onClick={(event) => go(page.projectsPath, event)}>{copy.projectsAction}<ArrowUpRight /></a></nav>
  </div></section>
}
