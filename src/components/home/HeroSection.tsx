import { useRef, useCallback, useState, useEffect } from 'react'
import { ArrowUpRight, ArrowDownRight, FileDown } from 'lucide-react'
import { interfaceContent } from '@/data/content'
import { useLanguage } from '@/context/LanguageContext'

export function HeroSection() {
  const { language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const hero = interfaceContent.hero
  const copy = hero[language]

  const [downloading, setDownloading] = useState(false)
  const downloadTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (downloadTimeoutRef.current) clearTimeout(downloadTimeoutRef.current)
    }
  }, [])

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
    >
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

          {copy.statement && (
            <p className="hero__editorial-sub" data-hero-meta>
              {copy.statement}
            </p>
          )}
        </div>

        {/* AÇÕES: exatamente 2 botões (Ver projetos + Currículo), fora do círculo */}
        <div className="hero__actions-dock" data-hero-actions>
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
        </div>

        <div className="hero__scroll-dock">
          <a className="hero__scroll-indicator" href="#sobre" aria-label={copy.scroll}>
            <span>{copy.scroll}</span>
            <ArrowDownRight aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
