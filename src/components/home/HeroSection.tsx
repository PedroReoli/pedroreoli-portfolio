import { useRef, useCallback } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ArrowUpRight, Play, ArrowDownRight } from 'lucide-react'
import { interfaceContent } from '@/data/content'
import { useLanguage } from '@/context/LanguageContext'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function HeroSection() {
  const { language } = useLanguage()
  const reducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const hero = interfaceContent.hero
  const copy = hero[language]

  // Interactive subtle 3D parallax on Pedro's marble bust
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (reducedMotion || !bgRef.current) return
      const { innerWidth, innerHeight } = window
      const x = (e.clientX / innerWidth - 0.5) * 16
      const y = (e.clientY / innerHeight - 0.5) * 16
      bgRef.current.style.transform = `scale(1.03) translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`
    },
    [reducedMotion],
  )

  const handlePointerLeave = useCallback(() => {
    if (!bgRef.current) return
    bgRef.current.style.transform = 'scale(1) translate3d(0, 0, 0)'
  }, [])

  useGSAP(
    () => {
      if (!sectionRef.current || reducedMotion) return
      gsap.from('[data-hero-line]', {
        yPercent: 100,
        opacity: 0,
        duration: 1.1,
        stagger: 0.1,
        ease: 'power4.out',
      })
      gsap.from('[data-hero-bg]', {
        scale: 1.1,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out',
      })
      gsap.from('[data-hero-meta]', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.08,
        delay: 0.35,
        ease: 'power2.out',
      })
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  )

  const resumeHref =
    language === 'pt'
      ? '/resume/Pedro_Lucas_Reis_Frontend.pdf'
      : '/resume/Pedro_Lucas_Reis_Fullstack.pdf'

  return (
    <section
      ref={sectionRef}
      id={hero.id}
      className="hero hero--fullscreen"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* PEDRO LUCAS REIS MARBLE BUST BACKGROUND */}
      <div className="hero__background-wrap" aria-hidden="true">
        <div ref={bgRef} className="hero__background-inner" data-hero-bg>
          <img
            src="/images/pedro-bust-cyber.jpg"
            alt=""
            className="hero__background-img"
            loading="eager"
          />
        </div>
        <div className="hero__vignette-overlay" />
      </div>

      <div className="shell hero__shell">
        {/* TOP EYEBROW - CREATIVE ENGINEERING ━ */}
        <div className="hero__top-meta" data-hero-meta>
          <span className="hero__eyebrow-text">
            {language === 'pt' ? 'ENGENHARIA & SISTEMAS' : 'SOFTWARE & AI ARCHITECTURE'}
          </span>
          <span className="hero__eyebrow-dash" aria-hidden="true" />
        </div>

        {/* HERO CENTER HEADLINE - REAL PEDRO REOLI */}
        <div className="hero__center-content">
          <p className="hero__editorial-role" data-hero-meta>
            {copy.role}
          </p>

          <h1 className="hero__headline" aria-label="Pedro Lucas Reis — Full Stack & AI Systems Architect">
            <span className="hero__line">
              <span data-hero-line>{hero.name.firstLine}</span>
            </span>
            <span className="hero__line hero__line--accent">
              <span data-hero-line>{hero.name.secondLine}</span>
            </span>
          </h1>

          <p className="hero__editorial-sub" data-hero-meta>
            {copy.statement}
          </p>
        </div>

        {/* BOTTOM ACTION BUTTONS */}
        <div className="hero__bottom-bar">
          <div className="hero__actions-group" data-hero-meta>
            <a className="hero__btn-primary" href={hero.actionHref}>
              <span>{copy.action}</span>
              <ArrowUpRight aria-hidden="true" />
            </a>
            <a
              className="hero__btn-secondary"
              href={resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={language === 'pt' ? 'Ver Currículo ATS' : 'View ATS Resume'}
            >
              <Play className="hero__btn-play-icon" aria-hidden="true" />
              <span>{language === 'pt' ? 'Currículo ATS' : 'ATS Resume'}</span>
            </a>
          </div>

          <a className="hero__scroll-indicator" href="#sobre" data-hero-meta>
            <span>{copy.scroll}</span>
            <ArrowDownRight aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
