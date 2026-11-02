import { ArrowUp, ArrowUpRight } from 'lucide-react'
import { interfaceContent, siteContent } from '@/data/content'
import { useLanguage } from '@/context/LanguageContext'

export function Footer() {
  const { language } = useLanguage()
  const footer = interfaceContent.footer
  const copy = footer[language]

  return (
    <footer id={footer.id} className="contact-section">
      <div className="shell">
        <div className="section-kicker section-kicker--dark">
          <span>{footer.sectionNumber}</span>
          <p>{copy.eyebrow}</p>
          <p>{siteContent.profile.address.locality} / {siteContent.profile.address.country}</p>
        </div>

        <div className="contact-section__main">
          <p className="contact-section__prompt">{copy.prompt}</p>
          <a className="contact-section__headline" href={footer.ctaHref}>
            <span>{copy.ctaFirst}</span>
            <em>{copy.ctaSecond}</em>
            <ArrowUpRight aria-hidden="true" />
          </a>
          <p className="contact-section__description">{copy.description}</p>
        </div>

        <nav className="contact-grid" aria-label={copy.linksLabel}>
          {footer.contacts.map((contact) => (
            <a
              key={contact.label}
              href={contact.href}
              target={contact.external ? '_blank' : undefined}
              rel={contact.external ? 'noreferrer' : undefined}
              style={{ '--contact-color': contact.color } as React.CSSProperties}
            >
              <span>{contact.detail[language]}</span>
              <strong>{contact.label}</strong>
              <ArrowUpRight aria-hidden="true" />
            </a>
          ))}
        </nav>

        <div className="contact-section__bottom">
          <p>© {new Date().getFullYear()} {siteContent.legalName}</p>
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            {copy.backToTop}<ArrowUp aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  )
}
