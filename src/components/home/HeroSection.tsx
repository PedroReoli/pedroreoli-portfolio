import { ArrowDown, ArrowUpRight, FileText } from 'lucide-react'
import { interfaceContent } from '@/data/content'
import { useLanguage } from '@/context/LanguageContext'
import { useRouter } from '@/context/RouterContext'

export function HeroSection() {
  const { language } = useLanguage()
  const { navigate } = useRouter()
  const hero = interfaceContent.hero
  const copy = hero[language]

  return (
    <section id={hero.id} className="hero">
      <div className="hero__background film-media" aria-hidden="true">
        <img
          src="/images/hero-bg.png"
          alt=""
          className="hero__background-image film-media__poster"
          width="1672"
          height="941"
          fetchPriority="high"
          loading="eager"
        />
        <div className="hero__background-overlay" />
      </div>

      <div className="shell hero__shell">
        <div className="hero__copy">
          <p className="hero__eyebrow">{copy.role}</p>
          <h1 className="hero__headline" aria-label="Pedro Reoli">
            <span>PEDRO</span><span>REOLI<span className="hero__dot">.</span></span>
          </h1>
          <p className="hero__description">
            {language === 'pt' ? 'Interfaces, sistemas e inteligência artificial aplicada.' : 'Interfaces, systems and applied artificial intelligence.'}
          </p>
          <div className="hero__actions-group">
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
        <a className="hero__scroll-indicator" href="#sobre">
          {copy.scroll}<ArrowDown size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
