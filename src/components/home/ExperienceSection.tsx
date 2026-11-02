import { useRef } from 'react'
import { m } from 'motion/react'
import { homeContent, interfaceContent } from '@/data/content'
import { useLanguage } from '@/context/LanguageContext'
import { useReveal } from '@/hooks/useReveal'

export function ExperienceSection() {
  const { language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const section = interfaceContent.experience
  const copy = section[language]
  useReveal(sectionRef)

  return (
    <section ref={sectionRef} id={section.id} className="experience-section section-dark">
      <div className="shell">
        <div className="section-kicker section-kicker--dark" data-reveal>
          <span>{section.sectionNumber}</span><p>{copy.eyebrow}</p><p>{copy.scrollHint}</p>
        </div>
        <div className="experience-section__layout">
          <div className="experience-section__heading" data-reveal>
            <h2>{copy.title}</h2><p>{copy.continue}</p>
          </div>
          <ol className="timeline" aria-label={copy.chaptersLabel}>
            {homeContent.experienceItems.map((item, index) => (
              <m.li key={`${item.company}-${item.period.pt}`} data-reveal whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
                <article>
                  <div className="timeline__meta"><span>{(index + 1).toString().padStart(2, '0')}</span><span>{item.period[language]}</span></div>
                  <h3>{item.company}</h3><h4>{item.role[language]}</h4><p>{item.description[language]}</p>
                  <p className="timeline__tech">{item.technologies.map((technology) => typeof technology === 'string' ? technology : technology[language]).join(' · ')}</p>
                </article>
              </m.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
