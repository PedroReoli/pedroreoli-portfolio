import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
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

  function step(direction: number) {
    const track = trackRef.current
    const pin = pinRef.current
    const viewport = viewportRef.current
    if (!track || !pin || !viewport) return

    const [first, second] = viewport.querySelectorAll<HTMLElement>('.timeline-v__item')
    if (!first || !second) return
    const distance = viewport.scrollWidth - viewport.clientWidth
    const itemStep = second.offsetLeft - first.offsetLeft
    const left = Math.max(0, Math.min(distance, viewport.scrollLeft + direction * itemStep))
    if (track.classList.contains('experience-track--pinned')) {
      if (left === viewport.scrollLeft) return
      const stickyTop = Number.parseFloat(getComputedStyle(pin).top)
      window.scrollTo({ top: window.scrollY + track.getBoundingClientRect().top - stickyTop + left, behavior: 'smooth' })
    } else {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      viewport.scrollTo({ left, behavior: reduceMotion ? 'instant' : 'smooth' })
    }
  }

  return (
    <section ref={ref} id={section.id} className="experience-section">
      <div className="experience-track" ref={trackRef}>
        <div className="shell experience-track__pin" ref={pinRef}>
          <div className="section-kicker" data-reveal>
            <p>{copy.eyebrow}</p>
          </div>
          <div className="experience-header" data-reveal data-reveal-delay="55">
            <h2>{copy.title}</h2>
            <div className="experience-controls">
              <button type="button" onClick={() => step(-1)} aria-controls="experience-viewport" aria-label={language === 'pt' ? 'Experiência anterior' : 'Previous experience'}>
                <ChevronLeft size={20} aria-hidden="true" />
              </button>
              <button type="button" onClick={() => step(1)} aria-controls="experience-viewport" aria-label={language === 'pt' ? 'Próxima experiência' : 'Next experience'}>
                <ChevronRight size={20} aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="experience-track__viewport" id="experience-viewport" ref={viewportRef}>
            <ol className="timeline-v" aria-label={copy.chaptersLabel}>
              {items.map((item, index) => (
                <li
                  className="timeline-v__item"
                  key={item.company + item.period.pt}
                  data-reveal
                  data-reveal-delay={110 + Math.min(index, 3) * 55}
                >
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
