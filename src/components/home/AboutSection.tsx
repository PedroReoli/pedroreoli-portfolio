import { useRef } from 'react'
import { interfaceContent } from '@/data/content'
import { useLanguage } from '@/context/LanguageContext'
import { useReveal } from '@/hooks/useReveal'

export function AboutSection() {
  const { language } = useLanguage()
  const ref = useRef<HTMLElement>(null)
  const about = interfaceContent.about
  const copy = about[language]
  useReveal(ref)

  return (
    <section ref={ref} id={about.id} className="about section-light about--centered">
      <div className="shell about__shell">
        <div className="section-kicker" data-reveal="smoke">
          <span>{about.sectionNumber}</span>
          <p>{copy.eyebrow}</p>
          <p>{copy.location}</p>
        </div>

        <div className="about__center">
          <h2 className="about__heading" data-reveal="smoke">{copy.title}</h2>
          <p className="about__summary" data-reveal="smoke">{copy.summary}</p>

          <div className="about__metrics-card" aria-label={copy.statsLabel}>
            <div className="stats-grid">
              {about.stats.map((stat) => (
                <div key={stat.value} data-reveal="card">
                  <strong>{stat.value}</strong>
                  <span>{stat[language]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
