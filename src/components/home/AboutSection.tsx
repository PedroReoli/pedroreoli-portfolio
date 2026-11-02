import { useRef } from 'react'
import { ArrowDownRight } from 'lucide-react'
import { interfaceContent } from '@/data/content'
import { useLanguage } from '@/context/LanguageContext'
import { useReveal } from '@/hooks/useReveal'

export function AboutSection() {
  const { language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const about = interfaceContent.about
  const copy = about[language]
  useReveal(sectionRef)

  return (
    <section ref={sectionRef} id={about.id} className="about section-light">
      <div className="shell">
        <div className="section-kicker" data-reveal>
          <span>{about.sectionNumber}</span><p>{copy.eyebrow}</p><p>{copy.location}</p>
        </div>

        <div className="about__grid">
          <div className="about__portrait" data-reveal>
            <img
              src={about.portrait.src}
              width={about.portrait.width}
              height={about.portrait.height}
              alt={copy.portraitAlt}
              loading="lazy"
            />
            <div><span>{copy.portraitRole}</span><strong>{copy.areas}</strong></div>
          </div>

          <div className="about__copy">
            <p className="overline" data-reveal>{copy.title}</p>
            <h2 data-reveal>{copy.summary}</h2>
            <a href="#projetos-selecionados" className="text-link" data-reveal>
              {interfaceContent.hero[language].action}<ArrowDownRight aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="stats-grid" aria-label={copy.statsLabel} data-reveal>
          {about.stats.map((stat) => (
            <div key={stat.value}>
              <strong>{stat.value}</strong><span>{stat[language]}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
