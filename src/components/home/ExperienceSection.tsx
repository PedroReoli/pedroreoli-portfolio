import { useRef } from 'react'
import { CheckCircle2, ArrowDown } from 'lucide-react'
import { homeContent, interfaceContent } from '@/data/content'
import { useLanguage } from '@/context/LanguageContext'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { m } from 'motion/react'

export function ExperienceSection() {
  const { language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  const section = interfaceContent.experience
  const copy = section[language]
  const items = homeContent.experienceItems

  return (
    <section ref={sectionRef} id={section.id} className="experience-section section-dark">
      <div className="shell experience-vertical__shell">
        {/* Section Header */}
        <div className="section-kicker section-kicker--dark">
          <span className="section-kicker__num">{section.sectionNumber}</span>
          <p className="section-kicker__eyebrow">{copy.eyebrow}</p>
          <div className="experience-kicker__counter" aria-live="polite">
            <span className="experience-counter__pill">
              {items.length.toString().padStart(2, '0')} {language === 'pt' ? 'Marcos de Carreira' : 'Career Milestones'}
            </span>
          </div>
        </div>

        <div className="experience-header experience-header--vertical">
          <div className="experience-header__main">
            <h2>{copy.title}</h2>
            <div className="experience-header__cue">
              <p>{copy.continue}</p>
              <div className="cue-scroll-hint">
                <span>{copy.scrollHint}</span>
                <ArrowDown size={13} className="cue-arrow-motion--down" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>

        {/* Alternating Vertical Timeline */}
        <div className="timeline-v" role="list" aria-label={copy.chaptersLabel}>
          {/* Continuous Central Glowing Spine */}
          <div className="timeline-v__spine" aria-hidden="true">
            <div className="timeline-v__spine-glow" />
          </div>

          {items.map((item, index) => {
            const isLeft = index % 2 === 0
            const chapterNum = (index + 1).toString().padStart(2, '0')
            return (
              <div
                key={`${item.company}-${item.period.pt}`}
                className={`timeline-v__item ${isLeft ? 'timeline-v__item--left' : 'timeline-v__item--right'}`}
                role="listitem"
              >
                {/* Central Station Node */}
                <div className="timeline-v__node" aria-hidden="true">
                  <span className="timeline-v__node-pulse" />
                  <span className="timeline-v__node-ring" />
                  <span className="timeline-v__node-core" />
                </div>

                {/* Horizontal Connector Stem */}
                <div className="timeline-v__connector" aria-hidden="true" />

                {/* Individual Card Scroll Reveal with motion */}
                <div className="timeline-card-reveal-wrapper">
                  <m.article
                    className="timeline-card timeline-v__card"
                    initial={reducedMotion ? false : { opacity: 0, y: 28 }}
                    whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    whileHover={{ y: -4 }}
                    transition={{
                      duration: 0.52,
                      ease: [0.22, 1, 0.36, 1],
                      delay: reducedMotion ? 0 : 0.08,
                    }}
                  >
                    {/* Top Bar with Number (No Sparkles icon) and Period */}
                    <div className="timeline-card__top">
                      <span className="timeline-card__chapter">
                        #{chapterNum}
                      </span>
                      <span className="timeline-card__period">{item.period[language]}</span>
                    </div>

                    {/* Company & Role */}
                    <div className="timeline-card__heading">
                      <h3>{item.company}</h3>
                      <h4>{item.role[language]}</h4>
                    </div>

                    {/* Description */}
                    <p className="timeline-card__desc">{item.description[language]}</p>

                    {/* Highlights */}
                    {item.highlights && item.highlights[language]?.length > 0 && (
                      <ul className="timeline-card__highlights">
                        {item.highlights[language].map((highlight, hIdx) => (
                          <li key={hIdx}>
                            <CheckCircle2 size={12} className="highlight-icon" aria-hidden="true" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Technologies */}
                    <div className="timeline-card__footer">
                      <p className="timeline__tech" aria-label="Tecnologias">
                        {item.technologies
                          .map((tech) => (typeof tech === 'string' ? tech : tech[language]))
                          .join(' · ')}
                      </p>
                    </div>
                  </m.article>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
