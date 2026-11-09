import { useState } from 'react'
import { Icon } from '@/components/common/Icon'
import { interfaceContent } from '@/data/content'
import type { InterfaceContent, Language } from '@/types/content'
import { notesCopy } from './notesEditorial'

interface Props { feature: InterfaceContent['mediaArchive']['feature']; language: Language }

export function PressFeature({ feature, language }: Props) {
  const [imageFailed, setImageFailed] = useState(false)
  const copy = interfaceContent.mediaArchive[language]
  const editorial = notesCopy[language]
  return (
    <article className="notes-feature">
      <a href={feature.href} target="_blank" rel="noopener noreferrer" aria-labelledby="notes-feature-title notes-feature-action" aria-describedby="notes-feature-external">
        <div className="notes-feature__visual" style={{ aspectRatio: `${feature.image.width} / ${feature.image.height}` }}>
          {imageFailed ? <p className="notes-feature__fallback" role="status">{editorial.imageUnavailable}</p> : (
            <img src={feature.image.src} srcSet={feature.image.srcSet}
              sizes="(max-width: 899px) calc(100vw - 32px), (max-width: 1300px) calc(100vw - 272px), 960px"
              width={feature.image.width} height={feature.image.height} alt={copy.imageAlt}
              decoding="async" onError={() => setImageFailed(true)} />
          )}
        </div>
        <div className="notes-feature__body">
          <div><p className="notes-feature__source">{editorial.pressSource}</p><h3 id="notes-feature-title">{copy.pressTitle}</h3></div>
          <div className="notes-feature__summary">
            <p>{editorial.pressSummary}</p>
            <span id="notes-feature-action" className="notes-feature__action">{copy.pressAction}<Icon name={feature.actionIcon} size={20} /></span>
            <small id="notes-feature-external">{copy.externalLabel}</small>
          </div>
        </div>
      </a>
    </article>
  )
}
