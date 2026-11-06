import { useEffect, useRef, useState } from 'react'
import { Menu, X, ArrowUpRight, ArrowUp } from 'lucide-react'
import { interfaceContent } from '@/data/content'
import { useLanguage } from '@/context/LanguageContext'
import { useRouter } from '@/context/RouterContext'
import { AnimatePresence, m } from 'motion/react'

export function Header() {
  const { language, toggleLanguage } = useLanguage()
  const { pathname, navigate } = useRouter()
  const [open, setOpen] = useState(false)
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const copy = interfaceContent.header[language]
  const isHome = pathname === '/'
  const isPastHero = !isHome || isScrolledPastHero

  // Resilient scroll detection: IntersectionObserver with fallback
  useEffect(() => {
    if (!isHome) return

    const heroEl = document.getElementById('hero')
    if (!heroEl) return

    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver(
        ([entry]) => {
          // Secondary bar triggers as hero scrolls out of top viewport
          setIsScrolledPastHero(!entry.isIntersecting)
        },
        { threshold: 0.1, rootMargin: '-70px 0px 0px 0px' }
      )
      observer.observe(heroEl)
      return () => observer.disconnect()
    } else {
      const handleScroll = () => {
        if (typeof window !== 'undefined' && window.scrollY === 0) {
          setIsScrolledPastHero(false)
          return
        }
        const rect = heroEl.getBoundingClientRect()
        setIsScrolledPastHero(rect.bottom <= 80)
      }
      window.addEventListener('scroll', handleScroll, { passive: true })
      handleScroll()
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [isHome])

  // Accessible keyboard trap for mobile drawer
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
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        }
        if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
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

  const scrollToTop = () => {
    if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <header className={`site-header ${isPastHero ? 'site-header--scrolled' : 'site-header--hero'}`}>
      <a className="skip-link" href="#main-content">
        {copy.skip}
      </a>

      {/* FIXED HERO NAVIGATION BAR (Active during Hero visibility) */}
      {!isPastHero ? (
        <div key="hero-nav" className="shell site-header__inner site-header__hero-bar">
          {/* Mobile-only Hamburger Menu */}
          <button
            ref={buttonRef}
            className="menu-trigger"
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? copy.closeMenu : copy.openMenu}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>

          {/* Accessible brand anchor without visible text (sem Pedro Reoli na navbar) */}
          <a className="brand brand--sr-only" href="/" onClick={(event) => go('/', event)} aria-label={copy.homeAria}>
            <span className="sr-only">Pedro Reoli</span>
          </a>

          {/* Centered Desktop Navigation - Itens mais coladinhos */}
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
            <button
              className="language-switch"
              type="button"
              onClick={toggleLanguage}
              aria-label={copy.switchLanguage}
            >
              <span aria-hidden="true">{language === 'pt' ? 'BR' : 'US'}</span>
              <strong>{language === 'pt' ? 'EN' : 'PT'}</strong>
            </button>
            <a className="header-contact" href={interfaceContent.header.contactHref}>
              <span>{copy.contact}</span>
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </div>
        </div>
      ) : (
        /* SECONDARY POST-HERO NAVIGATION BAR (Brota com efeito blob) */
        <div key="secondary-nav" className="shell site-header__inner site-header__secondary-bar">
          {/* Mobile-only Hamburger Menu */}
          <button
            ref={buttonRef}
            className="menu-trigger"
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? copy.closeMenu : copy.openMenu}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>

          {/* Accessible brand anchor without visible text (sem Pedro Reoli na navbar) */}
          <a className="brand brand--sr-only" href="/" onClick={(event) => go('/', event)} aria-label={copy.homeAria}>
            <span className="sr-only">Pedro Reoli</span>
          </a>

          {/* Centered Desktop Navigation - Itens mais coladinhos */}
          <nav className="desktop-nav desktop-nav--secondary" aria-label={copy.siteLinks}>
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

          <div className="site-header__actions site-header__actions--secondary">
            {/* Quick Top Jump Button */}
            <button
              className="nav-top-btn"
              type="button"
              onClick={scrollToTop}
              title={language === 'pt' ? 'Voltar ao topo' : 'Back to top'}
              aria-label={language === 'pt' ? 'Voltar ao topo' : 'Back to top'}
            >
              <ArrowUp size={13} aria-hidden="true" />
            </button>

            <button
              className="language-switch language-switch--compact"
              type="button"
              onClick={toggleLanguage}
              aria-label={copy.switchLanguage}
            >
              <span aria-hidden="true">{language === 'pt' ? 'BR' : 'US'}</span>
              <strong>{language === 'pt' ? 'EN' : 'PT'}</strong>
            </button>

            <a className="header-contact header-contact--compact" href={interfaceContent.header.contactHref}>
              <span>{copy.contact}</span>
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </div>
        </div>
      )}

      {/* SHARED MOBILE MENU DRAWER */}
      <AnimatePresence>
        {open && (
          <m.div
            ref={menuRef}
            id="mobile-menu"
            className="mobile-menu is-open"
            role="dialog"
            aria-modal="true"
            aria-label={copy.mobileNavigation}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <nav aria-label={copy.mobileNavigation}>
              {interfaceContent.header.navigation.map((item, index) => (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(event) => go(item.path, event)}
                  tabIndex={open ? 0 : -1}
                >
                  <span>0{index + 1}</span>
                  {item.label[language]}
                </a>
              ))}
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  )
}
