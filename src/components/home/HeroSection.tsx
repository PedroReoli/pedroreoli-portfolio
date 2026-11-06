import { useRef, useCallback, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ArrowUpRight, Play, Share2, CornerUpLeft, MessageSquare, Bookmark, Check } from 'lucide-react'
import { interfaceContent } from '@/data/content'
import { useLanguage } from '@/context/LanguageContext'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function HeroSection() {
  const { language } = useLanguage()
  const reducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const hero = interfaceContent.hero
  const copy = hero[language]

  // Interactive subtle 3D parallax on the Apollo bust background
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (reducedMotion || !bgRef.current) return
      const { innerWidth, innerHeight } = window
      const x = (e.clientX / innerWidth - 0.5) * 18
      const y = (e.clientY / innerHeight - 0.5) * 18
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

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.origin)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleBookmark = () => {
    setBookmarked((prev) => !prev)
  }

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
      {/* APOLLO CYBER BUST BACKGROUND - EXACT TO REFERENCE */}
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
        {/* TOP EYEBROW - CREATIVE STUDIO ━ */}
        <div className="hero__top-meta" data-hero-meta>
          <span className="hero__eyebrow-text">CREATIVE STUDIO</span>
          <span className="hero__eyebrow-dash" aria-hidden="true" />
        </div>

        {/* HERO CENTER HEADLINE - DESIGN BEYOND LIMITS. */}
        <div className="hero__center-content">
          <p className="hero__editorial-role" data-hero-meta>
            {copy.role}
          </p>

          <h1 className="hero__headline" aria-label="Pedro Reoli — Design Beyond Limits">
            <span className="hero__headline-display" data-hero-line>
              Design Beyond Limits<span className="hero__dot">.</span>
            </span>
            <span className="sr-only">
              <span data-hero-line>{hero.name.firstLine}</span>
              <span data-hero-line>{hero.name.secondLine}</span>
            </span>
          </h1>

          <p className="hero__editorial-sub" data-hero-meta>
            {language === 'pt'
              ? 'Um espaço criativo para engenharia de software de alta performance, interfaces imersivas e sistemas inteligentes.'
              : 'A creative space for designers, artists, and curious minds to explore, create, and grow together.'}
          </p>
        </div>

        {/* OVERLAPPING ACTION BUTTONS OVER LOWER CHEST */}
        <div className="hero__bottom-bar">
          <div className="hero__actions-group" data-hero-meta>
            <a className="hero__btn-primary" href={hero.actionHref}>
              <span>{language === 'pt' ? 'Explorar Projetos' : 'Explore Tools'}</span>
              <ArrowUpRight aria-hidden="true" />
            </a>
            <a
              className="hero__btn-secondary"
              href={resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={language === 'pt' ? 'Assistir Apresentação & Currículo' : 'Watch Intro & Resume'}
            >
              <Play className="hero__btn-play-icon" aria-hidden="true" />
              <span>{language === 'pt' ? 'Assistir Apresentação' : 'Watch Intro'}</span>
            </a>
          </div>
        </div>
      </div>

      {/* RIGHT EDGE VERTICAL DOCK - EXACT TO REFERENCE */}
      <aside className="hero__dock" aria-label="Quick metrics & actions" data-hero-meta>
        <div className="hero__dock-item hero__dock-avatar" title="Pedro Lucas Reis">
          <div className="hero__dock-avatar-inner">
            <span className="hero__dock-avatar-initials">PR</span>
          </div>
        </div>

        <div className="hero__dock-item">
          <span className="hero__dock-count">21k</span>
        </div>

        <button
          className="hero__dock-item hero__dock-btn"
          type="button"
          title={copied ? 'Link copiado!' : 'Compartilhar / Share'}
          aria-label="Compartilhar"
          onClick={handleShare}
        >
          {copied ? <Check size={18} className="hero__dock-icon-active" /> : <Share2 size={18} />}
        </button>

        <a
          className="hero__dock-item hero__dock-btn"
          href="#projetos-selecionados"
          title="Ver Projetos / Projects"
          aria-label="Ver Projetos"
        >
          <CornerUpLeft size={18} />
        </a>

        <div className="hero__dock-item">
          <span className="hero__dock-count">13k</span>
        </div>

        <a
          className="hero__dock-item hero__dock-btn"
          href="#contato"
          title="Enviar Mensagem / Contact"
          aria-label="Enviar Mensagem"
        >
          <MessageSquare size={18} />
        </a>

        <div className="hero__dock-item">
          <span className="hero__dock-count">3.15k</span>
        </div>

        <button
          className="hero__dock-item hero__dock-btn"
          type="button"
          title={bookmarked ? 'Salvo nos favoritos!' : 'Salvar Favorito'}
          aria-label="Favoritar"
          onClick={handleBookmark}
        >
          <Bookmark size={18} className={bookmarked ? 'hero__dock-icon-active' : ''} />
        </button>
      </aside>
    </section>
  )
}
