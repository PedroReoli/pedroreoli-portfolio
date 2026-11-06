import { useRef } from 'react'
import { ArrowDownRight, Sparkles } from 'lucide-react'
import { interfaceContent } from '@/data/content'
import { useLanguage } from '@/context/LanguageContext'

export function AboutSection() {
  const { language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const about = interfaceContent.about
  const copy = about[language]

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
          {/* A foto real fica no vídeo de fundo desta seção: aqui só a plaquinha,
              senão o mesmo rosto aparece duas vezes na tela. */}
          <div className="about__col-frame">
            <div className="about__frame-stage">
              <div className="about__spotlight" aria-hidden="true" />
              <figure className="art-frame art-frame--plaque-only" aria-label={copy.portraitAlt}>
                <div className="art-frame__fillet">
                  <figcaption className="art-frame__plaque" data-about-plaque>
                    <div className="art-frame__plaque-body">
                      <span className="art-frame__plaque-name">{about.portrait.name}</span>
                      <span className="art-frame__plaque-meta">{copy.portraitRole} · {copy.areas}</span>
                    </div>
                    <span className="art-frame__plaque-cat">CAT. {about.sectionNumber}</span>
                  </figcaption>
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
