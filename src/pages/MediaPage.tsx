import { Icon } from '@/components/common/Icon'
import { NotesSectionNav } from '@/components/notes/NotesSectionNav'
import { PressFeature } from '@/components/notes/PressFeature'
import { ReferenceList } from '@/components/notes/ReferenceList'
import { notesCopy, selectPublicReferences } from '@/components/notes/notesEditorial'
import '@/styles/notes.css'
import { interfaceContent, mediaContent } from '@/data/content'
import { useLanguage } from '@/context/LanguageContext'
import { SEO } from '@/components/common/SEO'

export function MediaPage() {
  const { language } = useLanguage()
  const archive = interfaceContent.mediaArchive
  const copy = archive[language]
  const editorial = notesCopy[language]
  const { references, profile } = selectPublicReferences(mediaContent.mediaNotes)
  const hasPress = Boolean(archive.feature.href)
  return (
    <div className="notes-page">
      <SEO pageKey="media" />
      <div className="notes-page__shell">
        <header className="notes-page__header">
          <p className="notes-page__eyebrow">{copy.eyebrow}</p>
          <h1>{copy.title}</h1>
          <p className="notes-page__intro">{editorial.intro}</p>
        </header>
        <div className="notes-page__layout">
          <NotesSectionNav label={editorial.indexLabel} sections={[
            ...(hasPress ? [{ id: 'imprensa', label: copy.pressLabel }] : []),
            { id: 'referencias', label: editorial.referencesNav },
          ]} />
          <div className="notes-page__content">
            {hasPress && (
              <section id="imprensa" className="notes-page__section" aria-labelledby="notes-press-heading" tabIndex={-1}>
                <div className="notes-page__section-heading">
                  <h2 id="notes-press-heading">{copy.pressLabel}</h2><span>{editorial.pressKind}</span>
                </div>
                <PressFeature key={archive.feature.image.src} feature={archive.feature} language={language} />
              </section>
            )}
            <section id="referencias" className="notes-page__section" aria-labelledby="notes-references-heading" tabIndex={-1}>
              <div className="notes-page__section-heading">
                <h2 id="notes-references-heading">{copy.referencesTitle}</h2>
                <span>{references.length} {references.length === 1 ? editorial.referenceSingular : copy.referencesCount}</span>
              </div>
              <ReferenceList references={references} language={language} />
              {profile && (
                <a className="notes-page__profile" href={profile.href} target="_blank" rel="noopener noreferrer" aria-describedby="notes-profile-external">
                  <Icon name="github" size={22} /><span>{editorial.profileAction}</span><Icon name="arrow-up-right" size={20} />
                  <small id="notes-profile-external">{copy.externalLabel}</small>
                </a>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
