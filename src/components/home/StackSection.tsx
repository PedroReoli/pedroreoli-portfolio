import { useRef } from 'react'
import { technologyContent, interfaceContent } from '@/data/content'
import { useLanguage } from '@/context/LanguageContext'
import { useReveal } from '@/hooks/useReveal'
import { Icon } from '@/components/common/Icon'

export function StackSection() {
  const { language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const section = interfaceContent.stack
  const copy = section[language]
  useReveal(sectionRef)

  return (
    <section ref={sectionRef} id={section.id} className="stack-section section-light">
      <div className="shell">
        <div className="section-kicker" data-reveal>
          <span>{section.sectionNumber}</span><p>{copy.eyebrow}</p><p>{technologyContent.groups.length.toString().padStart(2, '0')}</p>
        </div>
        <div className="stack-section__intro" data-reveal>
          <h2>{copy.title}<em>{section.titleAccent}</em></h2><p>{copy.description}</p>
        </div>
        <div className="stack-grid" aria-label={copy.ariaLabel}>
          {technologyContent.groups.map((group) => (
            <article key={group.number} data-reveal className="stack-column-revealed">
              <header><span>{group.number}</span><h3>{group.title[language]}</h3></header>
              <ul>
                {group.tools.map((tool) => {
                  const usageText = (tool as unknown as { usage?: { pt: string; en: string } }).usage?.[language]
                  const whereText = (tool as unknown as { where?: { pt: string; en: string } }).where?.[language]
                  const ariaDesc = [
                    tool.name,
                    whereText ? `(Em: ${whereText})` : '',
                    usageText ? usageText : ''
                  ].filter(Boolean).join(' - ')

                  return (
                    <li key={tool.name} tabIndex={0} role="tooltip" aria-label={ariaDesc}>
                      <span className="stack-icon"><Icon name={tool.icon} image={tool.image} size={15} /></span>
                      <strong className="stack-grid__label">{tool.name}</strong>
                      {(whereText || usageText) && (
                        <div className="stack-tooltip" role="note">
                          {whereText && (
                            <span className="stack-tooltip__where">
                              {whereText}
                            </span>
                          )}
                          {usageText && (
                            <span className="stack-tooltip__usage">
                              {usageText}
                            </span>
                          )}
                        </div>
                      )}
                    </li>
                  )
                })}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
