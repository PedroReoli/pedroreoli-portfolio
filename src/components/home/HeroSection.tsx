import { lazy, Suspense, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { interfaceContent } from '@/data/content'
import { useLanguage } from '@/context/LanguageContext'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const HeroScene = lazy(() => import('@/components/scene/HeroScene').then((module) => ({ default: module.HeroScene })))

export function HeroSection() {
  const { language } = useLanguage()
  const reducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const hero = interfaceContent.hero
  const copy = hero[language]

  useEffect(() => {
    if (!sectionRef.current || reducedMotion) return
    const context = gsap.context(() => {
      gsap.from('[data-hero-line]', { yPercent: 115, duration: 1, stagger: 0.08, ease: 'power4.out' })
      gsap.from('[data-hero-meta]', { opacity: 0, y: 14, duration: 0.7, stagger: 0.06, delay: 0.45 })
    }, sectionRef)
    return () => context.revert()
  }, [reducedMotion])

  return (
    <section ref={sectionRef} id={hero.id} className="hero">
      <div className="hero__grid" aria-hidden="true" />
      <div className="shell hero__shell">
        <div className="hero__meta" data-hero-meta>
          <span>{copy.eyebrow} / {hero.sectionNumber}</span>
          <span className="hero__status"><i />{copy.availability}</span>
          <span>{hero.location}</span>
        </div>

        <div className="hero__content">
          <div className="hero__copy">
            <p className="hero__role" data-hero-meta>{copy.role}</p>
            <h1 aria-label={hero.name.accessible}>
              <span className="hero__line"><span data-hero-line>{hero.name.firstLine}</span></span>
              <span className="hero__line hero__line--accent"><span data-hero-line>{hero.name.secondLine}</span></span>
            </h1>
            <p className="hero__statement" data-hero-meta>{copy.statement}</p>
            <a className="hero__cta" href={hero.actionHref} data-hero-meta>
              <span>{copy.action}</span><ArrowUpRight aria-hidden="true" />
            </a>
          </div>

          <div className="hero__visual" data-hero-meta>
            <Suspense fallback={<div className="hero-scene hero-scene--fallback" aria-hidden="true"><span /></div>}>
              <HeroScene topLabel={hero.scene.topLabel} bottomLabel={hero.scene.bottomLabel} />
            </Suspense>
          </div>
        </div>

        <a className="hero__scroll" href="#sobre" data-hero-meta>
          <span>{copy.scroll}</span>
          <ArrowDownRight aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
