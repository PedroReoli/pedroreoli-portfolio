import { useRef } from 'react'
import { ArrowUp, ArrowUpRight } from 'lucide-react'
import { interfaceContent, siteContent } from '@/data/content'
import { useLanguage } from '@/context/LanguageContext'
import { useReveal } from '@/hooks/useReveal'

export function Footer({ embedded = false }: { embedded?: boolean } = {}) {
  const { language } = useLanguage()
  const ref = useRef<HTMLElement>(null)
  const footer = interfaceContent.footer
  const copy = footer[language]
  useReveal(ref)

  return (
    <footer ref={ref} id={footer.id} className={embedded ? 'contact-section contact-section--embedded' : 'contact-section'}>
      <div className="shell">
        <div className="section-kicker section-kicker--dark" data-reveal="smoke">
          <span>{footer.sectionNumber}</span>
          <p>{copy.eyebrow}</p>
          <p>{siteContent.profile.address.locality} / {siteContent.profile.address.country}</p>
        </div>

        <div className="contact-section__main" data-reveal="smoke">
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
              data-reveal="card"
            >
              <span>{contact.detail[language]}</span>
              <strong>{contact.label}</strong>
              <ArrowUpRight aria-hidden="true" />
            </a>
          ))}
        </nav>

        <div className="contact-section__bottom">
          <p>© {new Date().getFullYear()} {siteContent.legalName}</p>
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })}>
            {copy.backToTop}<ArrowUp aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  )
}
