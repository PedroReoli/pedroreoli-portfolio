import { useRef, useCallback, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ArrowDownRight, Sparkles } from 'lucide-react'
import { interfaceContent } from '@/data/content'
import { useLanguage } from '@/context/LanguageContext'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export function AboutSection() {
  const { language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  const reducedMotion = useReducedMotion()
  const about = interfaceContent.about
  const copy = about[language]

  // Interactive 3D cursor-tracking tilt & glare effect
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || !frameRef.current) return
    const rect = frameRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    frameRef.current.style.setProperty('--tilt-x', (x * 2).toFixed(3))
    frameRef.current.style.setProperty('--tilt-y', (-y * 2).toFixed(3))
    frameRef.current.style.setProperty('--glare-x', `${((x + 0.5) * 100).toFixed(1)}%`)
    frameRef.current.style.setProperty('--glare-y', `${((y + 0.5) * 100).toFixed(1)}%`)
  }, [reducedMotion])

  const handlePointerLeave = useCallback(() => {
    if (!frameRef.current) return
    frameRef.current.style.setProperty('--tilt-x', '0')
    frameRef.current.style.setProperty('--tilt-y', '0')
    frameRef.current.style.setProperty('--glare-x', '35%')
    frameRef.current.style.setProperty('--glare-y', '35%')
  }, [])

  // GSAP ScrollTrigger Entrance Reveal
  useGSAP(
    () => {
      if (!sectionRef.current) return

      // Strict reduced motion fallback
      if (reducedMotion) {
        gsap.set(
          [
            '[data-about-kicker]',
            '[data-about-frame]',
            '[data-about-img]',
            '[data-about-plaque]',
            '[data-about-eyebrow]',
            '[data-about-heading]',
            '[data-about-summary]',
            '[data-about-pills]',
            '[data-about-action]',
            '[data-about-stat]',
          ],
          { opacity: 1, y: 0, x: 0, scale: 1, clearProps: 'all' }
        )
        return
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })

      // 1. Kicker reveal
      tl.fromTo(
        '[data-about-kicker]',
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      )

      // 2. Art Frame elevation & reveal
      tl.fromTo(
        '[data-about-frame]',
        { opacity: 0, y: 36, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.85, ease: 'power3.out' },
        '-=0.25'
      )

      tl.fromTo(
        '[data-about-img]',
        { scale: 1.1, filter: 'saturate(0.6) contrast(1.1)' },
        { scale: 1, filter: 'saturate(0.92) contrast(1.05)', duration: 1.1, ease: 'power3.out' },
        '-=0.6'
      )

      tl.fromTo(
        '[data-about-plaque]',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
        '-=0.4'
      )

      // 3. Editorial Copy: masked typography & badges
      tl.fromTo(
        '[data-about-eyebrow]',
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' },
        '-=0.8'
      )

      tl.fromTo(
        '[data-about-heading]',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' },
        '-=0.6'
      )

      tl.fromTo(
        '[data-about-summary]',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' },
        '-=0.5'
      )

      tl.fromTo(
        '[data-about-pills]',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
        '-=0.4'
      )

      tl.fromTo(
        '[data-about-action]',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' },
        '-=0.3'
      )

      // 4. Staggered Stats Sequence
      tl.fromTo(
        '[data-about-stat]',
        { opacity: 0, y: 18, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.08, ease: 'power3.out' },
        '-=0.25'
      )
      // Same safety net as useReveal: the single timeline above only fires when the
      // trigger crosses 80%, so a jump straight into the section left 10 nodes at
      // opacity 0 (heading, summary, pills, CTA, plaque).
      const targets = [
        '[data-about-kicker]',
        '[data-about-frame]',
        '[data-about-img]',
        '[data-about-plaque]',
        '[data-about-eyebrow]',
        '[data-about-heading]',
        '[data-about-summary]',
        '[data-about-pills]',
        '[data-about-action]',
        '[data-about-stat]',
      ]
      const safety = window.setTimeout(() => {
        targets.forEach((selector) => {
          gsap.utils.toArray<HTMLElement>(selector, sectionRef.current).forEach((el) => {
            if (Number.parseFloat(getComputedStyle(el).opacity) > 0.01) return
            const rect = el.getBoundingClientRect()
            if (rect.top < window.innerHeight && rect.bottom > 0) {
              gsap.to(el, { opacity: 1, y: 0, x: 0, scale: 1, duration: 0.4, overwrite: 'auto' })
            }
          })
        })
      }, 1200)

      return () => window.clearTimeout(safety)
    },
    { scope: sectionRef, dependencies: [reducedMotion, language] }
  )

  const focusPills = language === 'pt' ? [
    'Frontend UI & Arquitetura',
    'Enterprise SaaS & ERPs',
    'APIs & Microsserviços',
    'Workflows de IA Aplicada',
  ] : [
    'Frontend UI & Architecture',
    'Enterprise SaaS & ERPs',
    'APIs & Microservices',
    'Applied AI Workflows',
  ]

  return (
    <section ref={sectionRef} id={about.id} className="about section-light">
      <div className="shell about__shell">
        <div className="section-kicker" data-about-kicker>
          <span>{about.sectionNumber}</span>
          <p>{copy.eyebrow}</p>
          <p>{copy.location}</p>
        </div>

        <div className="about__layout">
          {/* Left Column: Museum Picture Frame */}
          <div className="about__col-frame">
            <div className="about__frame-stage">
              <div className="about__spotlight" aria-hidden="true" />
              <figure
                ref={frameRef}
                className="art-frame"
                onPointerMove={handlePointerMove}
                onPointerLeave={handlePointerLeave}
                data-about-frame
                aria-label={copy.portraitAlt}
              >
                <div className="art-frame__fillet">
                  <div className="art-frame__mat">
                    <div className="art-frame__canvas">
                      <img
                        data-about-img
                        src={about.portrait.src}
                        width={about.portrait.width}
                        height={about.portrait.height}
                        alt={copy.portraitAlt}
                        loading="lazy"
                        decoding="async"
                        onLoad={() => setImageLoaded(true)}
                        style={{ opacity: imageLoaded ? 1 : 0.6 }}
                      />
                      <div className="art-frame__glare" aria-hidden="true" />
                    </div>

                    {/* Museum Exhibition Plaque / Cartellino */}
                    <figcaption className="art-frame__plaque" data-about-plaque>
                      <div className="art-frame__plaque-body">
                        <span className="art-frame__plaque-name">{about.portrait.name}</span>
                        <span className="art-frame__plaque-meta">{copy.portraitRole} · {copy.areas}</span>
                      </div>
                      <span className="art-frame__plaque-cat">CAT. {about.sectionNumber}</span>
                    </figcaption>
                  </div>
                </div>
              </figure>
            </div>
          </div>

          {/* Right Column: Unified Narrative Dock */}
          <div className="about__col-narrative">
            <div className="about__narrative-header">
              <div className="about__eyebrow-badge" data-about-eyebrow>
                <Sparkles size={11} aria-hidden="true" />
                <span>{copy.eyebrow}</span>
              </div>
              <h2 className="about__heading" data-about-heading>
                {copy.title}
              </h2>
            </div>

            <p className="about__summary" data-about-summary>
              {copy.summary}
            </p>

            {/* Architecture Focus Pills */}
            <div className="about__focus-pills" data-about-pills>
              {focusPills.map((pill) => (
                <span key={pill} className="about__pill">
                  <span className="about__pill-dot" aria-hidden="true" />
                  {pill}
                </span>
              ))}
            </div>

            {/* Action Callout */}
            <div className="about__action" data-about-action>
              <a href="#projetos-selecionados" className="text-link">
                {interfaceContent.hero[language].action}
                <ArrowDownRight aria-hidden="true" />
              </a>
            </div>

            {/* Integrated 4-Metric Stats Grid */}
            <div className="about__metrics-card" aria-label={copy.statsLabel}>
              <div className="stats-grid">
                {about.stats.map((stat) => (
                  <div key={stat.value} data-about-stat>
                    <strong>{stat.value}</strong>
                    <span>{stat[language]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
