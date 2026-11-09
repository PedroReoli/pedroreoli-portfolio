import { Icon } from '@/components/common/Icon'
import { interfaceContent } from '@/data/content'
import type { Language, MediaNote } from '@/types/content'
import { notesCopy } from './notesEditorial'

interface Props { references: MediaNote[]; language: Language }

export function ReferenceList({ references, language }: Props) {
  const copy = notesCopy[language]
  const externalLabel = interfaceContent.mediaArchive[language].externalLabel
  if (!references.length) return <p className="notes-page__empty" role="status">{copy.empty}</p>
  return (
    <ul className="notes-references">
      {references.map((note) => {
        const id = `notes-reference-${note.number}`
        return (
          <li key={note.href}><article>
            <p className="notes-references__category">{note.category[language]}</p>
            <a href={note.href} target="_blank" rel="noopener noreferrer" aria-labelledby={`${id}-title ${id}-destination`} aria-describedby={`${id}-external`}>
              <div>
                <h3 id={`${id}-title`}>{note.title[language]}</h3>
                <p className="notes-references__description">{note.description[language]}</p>
                <span id={`${id}-destination`} className="notes-references__destination">{note.destination[language]}<Icon name={note.icon} size={20} /></span>
                <small id={`${id}-external`}>{externalLabel}</small>
              </div>
              <span className="notes-references__kind">{copy.repositoryKind}</span>
            </a>
          </article></li>
        )
      })}
    </ul>
  )
}
