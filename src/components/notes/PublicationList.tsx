import { Icon } from '@/components/common/Icon'
import { interfaceContent } from '@/data/content'
import type { Language, TechnicalPublication } from '@/types/content'

interface PublicationListProps {
  publications: TechnicalPublication[]
  language: Language
}

export function PublicationList({ publications, language }: PublicationListProps) {
  const externalLabel = interfaceContent.mediaArchive[language].externalLabel

  return (
    <div className="notes-publications">
      <span className="sr-only" id="notes-publication-external">{externalLabel}</span>
      {publications.map(({ id, category, title, highlights, links }) => (
        <article className="notes-publication" id={id} key={id} aria-labelledby={`${id}-title`}>
          <p className="notes-references__category">{category[language]}</p>
          <h3 id={`${id}-title`}>{title[language]}</h3>
          <ul className="notes-publication__highlights">
            {highlights.map(highlight => <li key={highlight.pt}>{highlight[language]}</li>)}
          </ul>
          <ul className="notes-publication__links">
            {links.map(({ href, label }) => (
              <li key={href}>
                <a href={href} target="_blank" rel="noopener noreferrer" aria-describedby="notes-publication-external">
                  {label[language]}<Icon name="arrow-up-right" size={16} />
                </a>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  )
}
