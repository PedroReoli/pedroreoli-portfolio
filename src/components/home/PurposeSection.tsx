import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { interfaceContent } from '@/data/content'
import { useLanguage } from '@/context/LanguageContext'
import { useReveal } from '@/hooks/useReveal'

export function PurposeSection() {
  const { language } = useLanguage()
  const ref = useRef<HTMLElement>(null)
  const purpose = interfaceContent.purpose
  const copy = purpose[language]
  useReveal(ref)
  return (
    <section ref={ref} id={purpose.id} className="purpose-section">
      <div className="shell">
        <div className="section-kicker"><p>{copy.eyebrow}</p><p>{purpose.metadata}</p></div>
        <div className="purpose-section__grid">
          <figure className="purpose-section__media" data-reveal>
            <img src={purpose.media.src} srcSet={purpose.media.srcSet} sizes="(max-width: 760px) 90vw, 45vw"
              width="480" height="216" alt={copy.imageAlt} loading="lazy" />
            <figcaption>{copy.imageCategory}<span>{copy.imageContext}</span></figcaption>
          </figure>
          <div className="purpose-section__copy" data-reveal>
            <h2><span>{copy.title}</span><em>{copy.titleAccent}</em></h2>
            <p>{copy.summary}</p>
            <a className="text-link" href={purpose.articleHref} target="_blank" rel="noreferrer">
              {copy.action}<ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
