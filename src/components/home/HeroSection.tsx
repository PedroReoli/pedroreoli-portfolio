import { useRef } from 'react'
import { ArrowDown, ArrowUpRight, FileText } from 'lucide-react'
import { interfaceContent } from '@/data/content'
import { useLanguage } from '@/context/LanguageContext'
import { useRouter } from '@/context/RouterContext'
import { useReveal } from '@/hooks/useReveal'

export function HeroSection() {
  const { language } = useLanguage()
  const { navigate } = useRouter()
  const ref = useRef<HTMLElement>(null)
  const hero = interfaceContent.hero
  const copy = hero[language]
  useReveal(ref)

  return (
    <section ref={ref} id={hero.id} className="hero">
      <div className="hero__background film-media" aria-hidden="true">
        <picture>
          <source
            type="image/webp"
            srcSet="/images/hero-bg-480.webp 480w, /images/hero-bg-640.webp 640w, /images/hero-bg-800.webp 800w, /images/hero-bg-1200.webp 1200w, /images/hero-bg-1672.webp 1672w"
            sizes="(max-width: 1320px) 100vw, 1320px"
          />
          <img
            src="/images/hero-bg.png"
            alt=""
            className="hero__background-image film-media__poster"
            width="1672"
            height="941"
            fetchPriority="high"
            loading="eager"
          />
        </picture>
      </div>

      <div className="shell hero__shell">
        <div className="hero__copy">
          <p className="hero__eyebrow" data-reveal>{copy.role}</p>
          <h1 className="hero__headline" aria-label="Pedro Reoli" data-reveal data-reveal-delay="55">
            <span>PEDRO</span><span>REOLI<span className="hero__dot">.</span></span>
          </h1>
          <p className="hero__description" data-reveal data-reveal-delay="110">
            {copy.statement}
            <span className="hero__availability">{copy.availability}</span>
          </p>
          <div className="hero__actions-group" data-reveal data-reveal-delay="165">
            <a className="hero__btn-primary" href={hero.actionHref}>
              {copy.action}<ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a
              className="hero__btn-secondary"
              href="/curriculo"
              onClick={(e) => {
                if (navigate) {
                  e.preventDefault()
                  navigate('/curriculo')
                }
              }}
              aria-label={language === 'pt' ? 'Ver currículo' : 'View resume'}
            >
              <FileText size={18} aria-hidden="true" />
              {language === 'pt' ? 'Currículo' : 'Resume'}
            </a>
          </div>
        </div>
        <a className="hero__scroll-indicator" href="#sobre" data-reveal data-reveal-delay="220">
          {copy.scroll}<ArrowDown size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
