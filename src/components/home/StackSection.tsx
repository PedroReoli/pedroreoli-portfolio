import { useRef } from 'react'
import { technologyContent, interfaceContent } from '@/data/content'
import { useLanguage } from '@/context/LanguageContext'
import { useReveal } from '@/hooks/useReveal'
import { Icon } from '@/components/common/Icon'
import { m } from 'motion/react'

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
                {group.tools.map((tool) => (
                  <m.li key={tool.name} whileHover={{ y: -2 }} transition={{ duration: 0.18 }}>
                    <span className="stack-icon"><Icon name={tool.icon} image={tool.image} size={15} /></span>
                    <strong>{tool.name}</strong>
                  </m.li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
