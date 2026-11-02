import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { interfaceContent } from '@/data/content'
import { useLanguage } from '@/context/LanguageContext'
import { useReveal } from '@/hooks/useReveal'

export function PurposeSection() {
  const { language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const purpose = interfaceContent.purpose
  const copy = purpose[language]
  useReveal(sectionRef)

  return (
    <section ref={sectionRef} id={purpose.id} className="purpose-section">
      <div className="shell">
        <div className="section-kicker section-kicker--accent" data-reveal>
          <span>{purpose.sectionNumber}</span><p>{copy.eyebrow}</p><p>{purpose.metadata}</p>
        </div>
        <div className="purpose-section__grid">
          <div className="purpose-section__copy" data-reveal>
            <h2>{copy.title}<em>{copy.titleAccent}</em></h2>
            <p>{copy.summary}</p>
            <a href={purpose.articleHref} target="_blank" rel="noreferrer">{copy.action}<ArrowUpRight aria-hidden="true" /></a>
          </div>
          <figure data-reveal>
            <img src={purpose.media.src} srcSet={purpose.media.srcSet} sizes="(max-width: 900px) 100vw, 54vw" alt={copy.imageAlt} loading="lazy" />
            <figcaption><span>{copy.imageCategory}</span><span>{copy.imageContext}</span></figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
