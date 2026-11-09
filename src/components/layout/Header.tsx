import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { interfaceContent } from '@/data/content'
import { useLanguage } from '@/context/LanguageContext'
import { useRouter } from '@/context/RouterContext'

export function Header() {
  const { language, toggleLanguage } = useLanguage()
  const { pathname, navigate } = useRouter()
  const [open, setOpen] = useState(false)
  const trigger = useRef<HTMLButtonElement>(null)
  const header = useRef<HTMLElement>(null)
  const copy = interfaceContent.header[language]
  const contact = pathname === '/' ? '#contato' : '/#contato'

  useEffect(() => {
    if (!open) return
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        trigger.current?.focus()
      }
    }
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !header.current?.contains(event.target)) setOpen(false)
    }
    window.addEventListener('keydown', escape)
    window.addEventListener('pointerdown', outside)
    const query = window.matchMedia('(min-width: 769px)')
    const close = () => { if (query.matches) setOpen(false) }
    query.addEventListener('change', close)
    return () => {
      window.removeEventListener('keydown', escape)
      window.removeEventListener('pointerdown', outside)
      query.removeEventListener('change', close)
    }
  }, [open])

  const go = (event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    setOpen(false)
    if (path.startsWith('#')) return
    event.preventDefault()
    navigate(path)
  }
  const links = interfaceContent.header.navigation.map(item => ({
    ...item,
    active: pathname === item.path || (item.path === '/midia-blog' && pathname === '/notas'),
  }))

  return (
    <header className="site-header" ref={header}>
      <a className="skip-link" href="#main-content">{copy.skip}</a>
      <div className="site-header__inner shell">
        <a className="brand" href="/" onClick={e => go(e, '/')} aria-label={copy.homeAria}>
          <span className="brand__mark" aria-hidden="true">pr.</span>
          <span className="brand__name">Pedro Reoli</span>
        </a>
        <nav className="desktop-nav" aria-label={copy.siteLinks}>
          {links.map(item => (
            <a key={item.path} href={item.path} onClick={e => go(e, item.path)}
              aria-current={item.active ? 'page' : undefined}>{item.label[language]}</a>
          ))}
        </nav>
        <div className="site-header__actions">
          <button className="language-switch" type="button" onClick={toggleLanguage} aria-label={copy.switchLanguage}>
            <span aria-hidden="true">{language === 'pt' ? 'PT' : 'EN'}</span>
            <span className="language-switch__next">{language === 'pt' ? 'EN' : 'PT'}</span>
          </button>
          <button ref={trigger} className="menu-trigger" type="button" aria-expanded={open}
            aria-controls="mobile-menu" aria-label={open ? copy.closeMenu : copy.openMenu}
            onClick={() => setOpen(value => !value)}>
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>
      <nav id="mobile-menu" className="mobile-menu shell" hidden={!open} aria-label={copy.mobileNavigation}>
        {links.map(item => (
          <a key={item.path} href={item.path} onClick={e => go(e, item.path)}
            aria-current={item.active ? 'page' : undefined}>{item.label[language]}</a>
        ))}
        <a href={contact} onClick={e => go(e, contact)}>{copy.contact}<ArrowUpRight size={18} aria-hidden="true" /></a>
      </nav>
    </header>
  )
}
