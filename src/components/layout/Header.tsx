import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { interfaceContent, siteContent } from '@/data/content'
import { useLanguage } from '@/context/LanguageContext'
import { useRouter } from '@/context/RouterContext'
import { AnimatePresence, m } from 'motion/react'

export function Header() {
  const { language, toggleLanguage } = useLanguage()
  const { pathname, navigate } = useRouter()
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const copy = interfaceContent.header[language]

  useEffect(() => {
    if (!open) return
    const focusable = menuRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []
    focusable[0]?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
      if (event.key === 'Tab' && focusable.length > 0) {
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    document.body.dataset.menuOpen = 'true'
    document.querySelector('main')?.setAttribute('inert', '')
    window.addEventListener('keydown', onKeyDown)
    return () => {
      delete document.body.dataset.menuOpen
      document.querySelector('main')?.removeAttribute('inert')
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

      <AnimatePresence>
      {open && <m.div ref={menuRef} id="mobile-menu" className="mobile-menu is-open" role="dialog" aria-modal="true" aria-label={copy.mobileNavigation} initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}>
        <nav aria-label={copy.mobileNavigation}>
          {interfaceContent.header.navigation.map((item, index) => (
            <a key={item.path} href={item.path} onClick={(event) => go(item.path, event)} tabIndex={open ? 0 : -1}>
              <span>0{index + 1}</span>
              {item.label[language]}
            </a>
          ))}
        </nav>
      </m.div>}
      </AnimatePresence>
    </header>
  )
}
