import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react'
import { homeContent, interfaceContent } from '@/data/content'
import { useLanguage } from '@/context/LanguageContext'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export function ExperienceSection() {
  const { language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLOListElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const [activeChapter, setActiveChapter] = useState(1)
  const reducedMotion = useReducedMotion()

  const section = interfaceContent.experience
  const copy = section[language]
  const totalChapters = homeContent.experienceItems.length

  // Horizontal scroll timeline with GSAP pinning on desktop
  useGSAP(
    () => {
      if (!sectionRef.current || !trackRef.current || reducedMotion) return

      const mm = gsap.matchMedia()

      mm.add('(min-width: 1025px)', () => {
        const track = trackRef.current
        if (!track) return

        const getScrollDistance = () => {
          return track.scrollWidth - window.innerWidth + 140
        }

        const tween = gsap.to(track, {
          x: () => -Math.max(0, getScrollDistance()),
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${Math.max(window.innerHeight * 1.5, getScrollDistance() + 400)}`,
            pin: pinRef.current,
            scrub: 0.85,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressBarRef.current) {
                progressBarRef.current.style.width = `${Math.min(100, Math.max(0, self.progress * 100)).toFixed(1)}%`
              }
              const current = Math.min(
                totalChapters,
                Math.max(1, Math.ceil(self.progress * totalChapters))
              )
              setActiveChapter(current)
            },
          },
        })

        return () => {
          tween.kill()
        }
      })

      return () => mm.revert()
    },
    { scope: sectionRef, dependencies: [reducedMotion, language] }
  )

  return (
    <section ref={sectionRef} id={section.id} className="experience-section section-dark">
      <div ref={pinRef} className="experience-pin">
        <div className="shell experience-pin__shell">
          {/* Top Kicker Row */}
          <div className="section-kicker section-kicker--dark">
            <span className="section-kicker__num">{section.sectionNumber}</span>
            <p className="section-kicker__eyebrow">{copy.eyebrow}</p>
            <div className="experience-kicker__counter" aria-live="polite">
              <span className="experience-counter__pill">
                {language === 'pt' ? 'Capítulo' : 'Chapter'} {activeChapter.toString().padStart(2, '0')} / {totalChapters.toString().padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Heading & Progress Rail */}
          <div className="experience-header">
            <div className="experience-header__main">
              <h2>{copy.title}</h2>
              <div className="experience-header__cue">
                <p>{copy.continue}</p>
                <div className="cue-scroll-hint">
                  <span>{copy.scrollHint}</span>
                  <ArrowRight size={13} className="cue-arrow-motion" aria-hidden="true" />
                </div>
              </div>
            </div>

            {/* Interactive Progress Bar */}
            <div className="timeline-progress-track" aria-hidden="true">
              <div ref={progressBarRef} className="timeline-progress-fill" />
            </div>
          </div>

          {/* Horizontal Timeline Track */}
          <div className="timeline-viewport">
            {/* Continuous Golden Timeline Rail */}
            <div className="timeline-rail" aria-hidden="true">
              <div className="timeline-rail__line" />
            </div>

            <ol ref={trackRef} className="timeline timeline--horizontal" aria-label={copy.chaptersLabel}>
              {homeContent.experienceItems.map((item, index) => {
                const chapterNum = (index + 1).toString().padStart(2, '0')
                const isCurrent = activeChapter === index + 1
                return (
                  <li
                    key={`${item.company}-${item.period.pt}`}
                    className={`timeline-card-wrapper ${isCurrent ? 'timeline-card-wrapper--active' : ''}`}
                  >
                    {/* Timeline Milestone Station Node */}
                    <div className="timeline-station" aria-hidden="true">
                      <div className="timeline-station__node">
                        <span className="timeline-station__pulse" />
                        <span className="timeline-station__dot" />
                      </div>
                      <div className="timeline-station__stem" />
                    </div>

                    {/* Timeline Station Card */}
                    <article className="timeline-card">
                      {/* Top Bar with Number and Period */}
                      <div className="timeline-card__top">
                        <span className="timeline-card__chapter">
                          <Sparkles size={11} aria-hidden="true" />
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
                          {item.highlights[language].slice(0, 3).map((highlight, hIdx) => (
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
                    </article>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
