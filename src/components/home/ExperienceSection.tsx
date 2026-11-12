import { useRef, useState } from 'react'
import { X } from 'lucide-react'
import { homeContent, interfaceContent } from '@/data/content'
import { useLanguage } from '@/context/LanguageContext'
import { useReveal } from '@/hooks/useReveal'
import { useScrollChapters } from '@/hooks/useScrollChapters'

export function ExperienceSection() {
  const { language } = useLanguage()
  const ref = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const detailsRef = useRef<HTMLDialogElement>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const section = interfaceContent.experience
  const copy = section[language]
  const items = homeContent.experienceItems
  const selected = items[selectedIndex]
  useReveal(ref)
  useScrollChapters(trackRef, pinRef, viewportRef)

  return (
    <section ref={ref} id={section.id} className="experience-section">
      <div className="scroll-chapters experience-track" ref={trackRef}>
        <div className="shell scroll-chapters__pin experience-track__pin" ref={pinRef}>
          <div className="section-kicker" data-reveal>
            <p>{copy.eyebrow}</p>
          </div>
          <div className="experience-header" data-reveal data-reveal-delay="55">
            <h2>{copy.title}</h2>
            <p className="experience-scroll-hint">{language === 'pt' ? 'Role para percorrer a trajetória' : 'Scroll to explore the timeline'}</p>
          </div>

          <div className="experience-dates" aria-hidden="true">
            {items.map(item => (
              <span className="experience-dates__date" key={item.period.pt} data-experience-date data-scroll-chapter-marker>
                {item.period[language].split(' / ')[0]}
              </span>
            ))}
          </div>

          <div className="scroll-chapters__viewport experience-track__viewport" ref={viewportRef} data-reveal data-reveal-delay="110">
            <ol className="timeline-v" aria-label={copy.chaptersLabel}>
              {items.map((item, index) => (
                <li className="timeline-v__item" key={item.company + item.period.pt} data-scroll-chapter>
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
                    {item.details?.length ? (
                      <button className="timeline-card__more" type="button" aria-haspopup="dialog" onClick={() => {
                        setSelectedIndex(index)
                        detailsRef.current?.showModal()
                      }}>
                        {language === 'pt' ? 'Ver mais detalhes' : 'See more details'}
                      </button>
                    ) : null}
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
      <dialog className="timeline-details" ref={detailsRef} aria-labelledby="timeline-details-title">
        <div className="timeline-details__header">
          <h3 id="timeline-details-title">{selected.company}</h3>
          <button type="button" onClick={() => detailsRef.current?.close()} aria-label={language === 'pt' ? 'Fechar detalhes' : 'Close details'}><X size={20} aria-hidden="true" /></button>
        </div>
        <p>{selected.role[language]}</p>
        <ul>
          {selected.details?.map(detail => <li key={detail.pt}>{detail[language]}</li>)}
        </ul>
      </dialog>
    </section>
  )
}
