import { ArrowUpRight } from 'lucide-react'
import { interfaceContent, mediaContent } from '@/data/content'
import { useLanguage } from '@/context/LanguageContext'
import { SEO } from '@/components/common/SEO'

export function MediaPage() {
  const { language } = useLanguage()
  const archive = interfaceContent.mediaArchive
  const copy = archive[language]
  return (
    <div className="archive-page archive-page--media">
      <SEO pageKey="media" />
      <header className="archive-hero"><div className="shell"><p>{copy.eyebrow}</p><h1>{copy.title}</h1><span>{copy.description}</span></div></header>
      <section className="media-feature section-light"><div className="shell">
        <a href={archive.feature.href} target="_blank" rel="noreferrer">
          <img src={archive.feature.image.src} srcSet={archive.feature.image.srcSet} sizes="(max-width: 900px) 100vw, 62vw" alt={copy.imageAlt} />
          <div><span>{copy.pressLabel}</span><h2>{copy.pressTitle}</h2><strong>{copy.pressAction}<ArrowUpRight /></strong></div>
        </a>
      </div></section>
      <section className="notes-section section-light"><div className="shell">
        <div className="archive-title"><span>{archive.referenceCount} {copy.referencesCount}</span><h2>{copy.referencesTitle}</h2></div>
        <div className="notes-grid">
          {mediaContent.mediaNotes.map((note) => (
            <a key={note.number} href={note.href} target="_blank" rel="noreferrer">
              <span>{note.number} / {note.category[language]}</span><h3>{note.title[language]}</h3><p>{note.description[language]}</p><strong>{note.destination[language]}<ArrowUpRight /></strong>
            </a>
          ))}
        </div>
      </div></section>
    </div>
  )
}
