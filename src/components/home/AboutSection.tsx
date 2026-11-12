import { useRef } from 'react'
import { interfaceContent } from '@/data/content'
import { useLanguage } from '@/context/LanguageContext'
import { useReveal } from '@/hooks/useReveal'
import { useScrollChapters } from '@/hooks/useScrollChapters'

export function AboutSection() {
  const { language } = useLanguage()
  const ref = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const about = interfaceContent.about
  const copy = about[language]
  useReveal(ref)
  useScrollChapters(trackRef, pinRef, viewportRef, 220)
  const groups = [about.stats.slice(0, 4), about.stats.slice(4)]

  return (
    <section ref={ref} id={about.id} className="about section-light about--centered">
      <div className="scroll-chapters about__track" ref={trackRef}>
        <div className="shell scroll-chapters__pin about__shell" ref={pinRef}>
          <div className="section-kicker" data-reveal>
            <span>{about.sectionNumber}</span>
            <p>{copy.eyebrow}</p>
            <p>{copy.location}</p>
          </div>

          <div className="about__center">
            <h2 className="about__heading" data-reveal>{copy.title}</h2>
            <p className="about__summary" data-reveal data-reveal-delay="65">{copy.summary}</p>

            <div className="about__metrics-card" role="region" aria-label={copy.statsLabel}>
              <div className="scroll-chapters__viewport about__metrics" ref={viewportRef}>
                {groups.map((group, index) => (
                  <div className="stats-grid" data-scroll-chapter key={group[0].value}>
                    {group.map((stat, position) => (
                      <div key={stat.value} data-reveal data-reveal-delay={130 + index * 55 + position * 55}>
                        <strong>{stat.value}</strong>
                        <span>{stat[language]}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div className="about__progress" aria-hidden="true">
                <span data-scroll-chapter-marker />
                <span data-scroll-chapter-marker />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
