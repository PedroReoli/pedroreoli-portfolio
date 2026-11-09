import { useRef } from 'react'
import { homeContent, interfaceContent } from '@/data/content'
import { useLanguage } from '@/context/LanguageContext'
import { useReveal } from '@/hooks/useReveal'

export function ExperienceSection() {
  const { language } = useLanguage()
  const ref = useRef<HTMLElement>(null)
  const section = interfaceContent.experience
  const copy = section[language]
  const items = homeContent.experienceItems
  useReveal(ref)

  return (
    <section ref={ref} id={section.id} className="experience-section">
      <div className="shell">
        <div className="section-kicker" data-reveal="smoke">
          <p>{copy.eyebrow}</p>
          <p>{language === 'pt' ? 'Da ideia à produção' : 'From idea to production'}</p>
        </div>
        <div className="experience-header" data-reveal="smoke">
          <h2>{copy.title}</h2>
        </div>

        <div className="timeline-wrap">
          <ol className="timeline-v" aria-label={copy.chaptersLabel}>
            {items.map((item, index) => {
              const isEven = index % 2 === 0
              const sideClass = isEven ? 'timeline-v__item--left' : 'timeline-v__item--right'
              return (
                <li
                  className={`timeline-v__item ${sideClass}`}
                  key={item.company + item.period.pt}
                  data-reveal={isEven ? 'slide-right' : 'slide-left'}
                  data-reveal-delay={String(100 + (index % 4) * 100)}
                >
                  <div className="timeline-node" aria-hidden="true">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                  </div>

                  <article className="timeline-card">
                    <div className="timeline-v__period">
                      <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                      <p>{item.period[language]}</p>
                    </div>

                    <div className="timeline-card__heading">
                      <h3>{item.company}</h3>
                      <h4>{item.role[language]}</h4>
                    </div>

                    <p className="timeline-card__desc">{item.description[language]}</p>

                    {item.highlights?.[language]?.length > 0 && (
                      <ul className="timeline-card__highlights">
                        {item.highlights[language].map(highlight => (
                          <li key={highlight}>{highlight}</li>
                        ))}
                      </ul>
                    )}

                    <p className="timeline__tech" aria-label={language === 'pt' ? 'Tecnologias' : 'Technologies'}>
                      {item.technologies.map(tech => typeof tech === 'string' ? tech : tech[language]).join(' · ')}
                    </p>
                  </article>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
