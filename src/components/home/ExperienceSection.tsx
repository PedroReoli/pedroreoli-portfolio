import { useRef } from 'react'
import { homeContent, interfaceContent } from '@/data/content'
import { useLanguage } from '@/context/LanguageContext'
import { useReveal } from '@/hooks/useReveal'
import { useExperienceTimeline } from '@/hooks/useExperienceTimeline'

export function ExperienceSection() {
  const { language } = useLanguage()
  const ref = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const section = interfaceContent.experience
  const copy = section[language]
  const items = homeContent.experienceItems
  useReveal(ref)
  useExperienceTimeline(trackRef, pinRef, viewportRef)

  return (
    <section ref={ref} id={section.id} className="experience-section">
      <div className="experience-track" ref={trackRef}>
        <div className="shell experience-track__pin" ref={pinRef}>
          <div className="section-kicker" data-reveal>
            <p>{copy.eyebrow}</p>
          </div>
          <div className="experience-header" data-reveal data-reveal-delay="55">
            <h2>{copy.title}</h2>
            <p className="experience-scroll-hint">{language === 'pt' ? 'Role para percorrer a trajetória' : 'Scroll to explore the timeline'}</p>
          </div>

          <div className="experience-dates" aria-hidden="true">
            {items.map(item => (
              <span className="experience-dates__date" key={item.period.pt} data-experience-date>
                {item.period[language].split(' / ')[0]}
              </span>
            ))}
          </div>

          <div className="experience-track__viewport" ref={viewportRef} data-reveal data-reveal-delay="110">
            <ol className="timeline-v" aria-label={copy.chaptersLabel}>
              {items.map(item => (
                <li className="timeline-v__item" key={item.company + item.period.pt}>
                  <article className="timeline-card">
                    <header className="timeline-card__heading">
                      <p className="timeline-v__period">{item.period[language]}</p>
                      <h3>{item.company}</h3>
                      <h4>{item.role[language]}</h4>
                    </header>
                    <p className="timeline-card__desc">{item.description[language]}</p>
                    <ul className="timeline-card__highlights">
                      {item.highlights[language].map(highlight => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
