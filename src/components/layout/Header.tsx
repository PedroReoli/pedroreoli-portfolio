import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { interfaceContent, siteContent } from '@/data/content'
import { useLanguage } from '@/context/LanguageContext'
import { useRouter } from '@/context/RouterContext'

export function Header() {
  const { language, toggleLanguage } = useLanguage()
  const { pathname, navigate } = useRouter()
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const copy = interfaceContent.header[language]

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    document.body.dataset.menuOpen = 'true'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      delete document.body.dataset.menuOpen
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const go = (path: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    setOpen(false)
    navigate(path)
  }

  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">{copy.skip}</a>
      <div className="shell site-header__inner">
        <a className="brand" href="/" onClick={(event) => go('/', event)} aria-label={copy.homeAria}>
          <span className="brand__mark">{siteContent.brand.first[0]}{siteContent.brand.last[0]}</span>
          <span className="brand__name">{siteContent.brand.first} {siteContent.brand.last}</span>
        </a>

        <nav className="desktop-nav" aria-label={copy.siteLinks}>
          {interfaceContent.header.navigation.map((item) => (
            <a
              key={item.path}
              href={item.path}
              onClick={(event) => go(item.path, event)}
              className={pathname === item.path ? 'is-active' : ''}
              aria-current={pathname === item.path ? 'page' : undefined}
            >
              {item.label[language]}
            </a>
          ))}
        </nav>

        <div className="site-header__actions">
          <button className="language-switch" type="button" onClick={toggleLanguage} aria-label={copy.switchLanguage}>
            <span aria-hidden="true">{language === 'pt' ? 'BR' : 'US'}</span>
            <strong>{language === 'pt' ? 'EN' : 'PT'}</strong>
          </button>
          <a className="header-contact" href={interfaceContent.header.contactHref}>{copy.contact}</a>
          <button
            ref={buttonRef}
            className="menu-trigger"
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? copy.closeMenu : copy.openMenu}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={`mobile-menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <nav aria-label={copy.mobileNavigation}>
          {interfaceContent.header.navigation.map((item, index) => (
            <a key={item.path} href={item.path} onClick={(event) => go(item.path, event)} tabIndex={open ? 0 : -1}>
              <span>0{index + 1}</span>
              {item.label[language]}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
