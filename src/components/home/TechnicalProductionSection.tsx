import { useRef } from 'react'
import content from '@content/technicalProductionContent.json'
import { Icon } from '@/components/common/Icon'
import { useLanguage } from '@/context/LanguageContext'
import { useReveal } from '@/hooks/useReveal'
import '@/styles/technical-production.css'

export function TechnicalProductionSection() {
  const { language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  useReveal(sectionRef)

  return (
    <section ref={sectionRef} id="producao-tecnica-academica" className="technical-production" aria-labelledby="technical-production-title">
      <div className="shell">
        <header className="technical-production__intro">
          <h2 id="technical-production-title" data-reveal>{content.title[language]}</h2>
          <p data-reveal data-reveal-delay="55">{content.description[language]}</p>
        </header>
        <ul className="technical-production__grid">
          {content.items.map((item, index) => (
            <li key={item.href} data-reveal="card" data-reveal-delay={String(110 + index * 55)}>
              <p className="technical-production__category">{item.category[language]}</p>
              <h3>{item.title[language]}</h3>
              <p className="technical-production__description">{item.description[language]}</p>
              <a href={item.href} target={item.external ? '_blank' : undefined} rel={item.external ? 'noopener noreferrer' : undefined} className="text-link">
                {item.action[language]}
                <Icon name={item.external ? 'arrow-up-right' : 'arrow-right'} size={16} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
