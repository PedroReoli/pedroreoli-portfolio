import { interfaceContent } from '@/data/content'
import { useLanguage } from '@/context/LanguageContext'

/**
 * S2 — Sobre. Pedro: "tire o card que fale Pedro Lucas Reis... e deixe apenas o texto
 * quem eu sou, e o texto abaixo e as 4 partes falando de exp 70% etc. ai o texto fica
 * centralizado e na parte do meio, e as informacoes abaixo".
 *
 * Sem plaquinha, sem moldura, sem pills e sem CTA: o rosto já está no vídeo de fundo,
 * então a seção é só tipografia centralizada e os quatro números embaixo.
 */
export function AboutSection() {
  const { language } = useLanguage()
  const about = interfaceContent.about
  const copy = about[language]

  return (
    <section id={about.id} className="about section-light about--centered">
      <div className="shell about__shell">
        <div className="section-kicker">
          <span>{about.sectionNumber}</span>
          <p>{copy.eyebrow}</p>
          <p>{copy.location}</p>
        </div>

        <div className="about__center">
          <h2 className="about__heading">{copy.title}</h2>
          <p className="about__summary">{copy.summary}</p>

          <div className="about__metrics-card" aria-label={copy.statsLabel}>
            <div className="stats-grid">
              {about.stats.map((stat) => (
                <div key={stat.value}>
                  <strong>{stat.value}</strong>
                  <span>{stat[language]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
