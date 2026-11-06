import { useRef, useCallback, useState, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ArrowUpRight, ArrowDownRight, FileDown } from 'lucide-react'
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

  const [downloading, setDownloading] = useState(false)
  const downloadTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (downloadTimeoutRef.current) clearTimeout(downloadTimeoutRef.current)
    }
  }, [])

  // Interactive subtle 3D parallax on Pedro's marble bust
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (reducedMotion || !bgRef.current) return
      const { innerWidth, innerHeight } = window
      const x = (e.clientX / innerWidth - 0.5) * 16
      const y = (e.clientY / innerHeight - 0.5) * 16
      bgRef.current.style.transform = `scale(1.02) translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`
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
      gsap.from('[data-hero-meta]', {
        opacity: 0,
        y: -14,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power2.out',
      })
      gsap.from('[data-hero-bg]', {
        scale: 1.08,
        opacity: 0,
        duration: 1.4,
        ease: 'power3.out',
      })
      gsap.from('[data-hero-actions]', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.35,
        ease: 'power2.out',
      })
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  )

  const handleDownloadResume = useCallback(() => {
    setDownloading(true)
    if (downloadTimeoutRef.current) clearTimeout(downloadTimeoutRef.current)
    downloadTimeoutRef.current = setTimeout(() => {
      setDownloading(false)
    }, 2000)
  }, [])

  const resumeHref =
    language === 'pt'
      ? '/resume/Pedro_Lucas_Reis_Frontend.pdf'
      : '/resume/Pedro_Lucas_Reis_Fullstack.pdf'

  const downloadFilename =
    language === 'pt'
      ? 'Pedro_Lucas_Reis_Curriculo.pdf'
      : 'Pedro_Lucas_Reis_Resume.pdf'

  return (
    <section
      ref={sectionRef}
      id={hero.id}
      className="hero hero--fullscreen"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* PEDRO LUCAS REIS MARBLE BUST BACKGROUND IN LOWER HALF */}
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
        {/* TOP EDITORIAL CONTENT: Eyebrow + Headline + Subtitle (Above statue) */}
        <div className="hero__header-content">
          {/* Eyebrow: CREATIVE STUDIO ━━ */}
          <div className="hero__eyebrow" data-hero-meta>
            <span className="hero__eyebrow-text">
              {copy.role}
            </span>
            <span className="hero__eyebrow-dash" aria-hidden="true" />
          </div>

          {/* Headline: Design Beyond Limits. */}
          <h1 className="hero__headline" data-hero-meta aria-label="Pedro Reoli">
            <span className="hero__headline-name">
              <span data-hero-line>PEDRO</span> <span data-hero-line>REOLI</span>
            </span>
            <span className="hero__dot">.</span>
          </h1>

          {/* Subtitle: A creative space for designers, artists... */}
          <p className="hero__editorial-sub" data-hero-meta>
            {copy.statement}
          </p>
        </div>

        {/* BOTTOM ACTION BUTTONS: Exactly 2 buttons (Ver projetos + Currículo) */}
        <div className="hero__bottom-bar" data-hero-actions>
          <div className="hero__actions-group">
            {/* Primary Action: Ver projetos */}
            <a className="hero__btn-primary" href={hero.actionHref}>
              <span>{copy.action}</span>
              <ArrowUpRight aria-hidden="true" />
            </a>

            {/* Secondary Action: Currículo (sem a palavra ATS) */}
            <a
              className="hero__btn-secondary"
              href={resumeHref}
              download={downloadFilename}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleDownloadResume}
              aria-label={
                language === 'pt'
                  ? 'Baixar currículo (PDF)'
                  : 'Download resume (PDF)'
              }
            >
              <FileDown
                className="hero__btn-icon"
                aria-hidden="true"
              />
              <span>
                {downloading
                  ? language === 'pt'
                    ? 'Baixando...'
                    : 'Downloading...'
                  : language === 'pt'
                    ? 'Currículo'
                    : 'Resume'}
              </span>
            </a>
          </div>

          <a className="hero__scroll-indicator" href="#sobre" aria-label={copy.scroll}>
            <span>{copy.scroll}</span>
            <ArrowDownRight aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
