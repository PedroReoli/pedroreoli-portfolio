import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ArrowUpRight } from 'lucide-react'
import { interfaceContent } from '@/data/content'
import { useLanguage } from '@/context/LanguageContext'
import { useReveal } from '@/hooks/useReveal'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export function PurposeSection() {
  const { language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const mediaRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const purpose = interfaceContent.purpose
  const copy = purpose[language]
  useReveal(sectionRef)

  // The photo dims and the headline rises into it once the photo is properly in view.
  // The class is the only state: the animation itself is pure CSS.
  useGSAP(
    () => {
      const media = mediaRef.current
      if (!media) return

      const reveal = () => media.classList.add('is-revealed')
      if (reducedMotion) {
        reveal()
        return
      }

      const trigger = ScrollTrigger.create({
        trigger: media,
        start: 'top 75%',
        onEnter: reveal,
        onEnterBack: reveal,
      })

      // Safety net: arriving by anchor or a deep link must never leave the title invisible.
      const safety = window.setTimeout(() => {
        const rect = media.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) reveal()
      }, 900)

      return () => {
        trigger.kill()
        window.clearTimeout(safety)
      }
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  )

  return (
    <section ref={sectionRef} id={purpose.id} className="purpose-section">
      <div className="shell">
        <div className="section-kicker section-kicker--accent" data-reveal>
          <span>{purpose.sectionNumber}</span><p>{copy.eyebrow}</p><p>{purpose.metadata}</p>
        </div>
        <div className="purpose-section__grid">
          <figure ref={mediaRef} className="purpose-section__media" data-reveal>
            <img
              src={purpose.media.src}
              srcSet={purpose.media.srcSet}
              sizes="(max-width: 900px) 90vw, 34vw"
              alt={copy.imageAlt}
              loading="lazy"
            />
            {/* The headline lives on top of the photo and rises out of it. */}
            <figcaption className="purpose-section__overlay">
              <h2>
                {copy.title}
                <em>{copy.titleAccent}</em>
              </h2>
            </figcaption>
          </figure>

          <div className="purpose-section__copy" data-reveal>
            <p>{copy.summary}</p>
            <a href={purpose.articleHref} target="_blank" rel="noreferrer">
              {copy.action}
              <ArrowUpRight aria-hidden="true" />
            </a>
            <p className="purpose-section__credit">
              <span>{copy.imageCategory}</span>
              <span>{copy.imageContext}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
