import { ArrowDown, ArrowUpRight, FileDown } from 'lucide-react'
import { interfaceContent, sceneClips } from '@/data/content'
import { useLanguage } from '@/context/LanguageContext'
import { FilmSlide } from '@/components/scene/FilmSlide'

export function HeroSection() {
  const { language } = useLanguage()
  const hero = interfaceContent.hero
  const copy = hero[language]
  const resumeHref = language === 'pt' ? '/resume/Pedro_Lucas_Reis_Frontend.pdf' : '/resume/Pedro_Lucas_Reis_Fullstack.pdf'
  return (
    <section id={hero.id} className="hero">
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
            <a className="hero__btn-primary" href={hero.actionHref}>{copy.action}<ArrowUpRight size={18} aria-hidden="true" /></a>
            <a className="hero__btn-secondary" href={resumeHref}
              download={language === 'pt' ? 'Pedro_Lucas_Reis_Curriculo.pdf' : 'Pedro_Lucas_Reis_Resume.pdf'} target="_blank" rel="noopener noreferrer"
              aria-label={language === 'pt' ? 'Baixar currículo (PDF)' : 'Download resume (PDF)'}>
              <FileDown size={18} aria-hidden="true" />{language === 'pt' ? 'Currículo' : 'Resume'}
            </a>
          </div>
        </div>
        <div className="hero__artwork">
          <FilmSlide clip={sceneClips.clips[0]} index={0} />
          <p className="hero__art-caption">{hero.location}<span>{language === 'pt' ? 'Engenharia com identidade.' : 'Engineering with identity.'}</span></p>
        </div>
        <a className="hero__scroll-indicator" href="#sobre">{copy.scroll}<ArrowDown size={16} aria-hidden="true" /></a>
      </div>
    </section>
  )
}
