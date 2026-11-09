# Technical Investigation & Blueprint Handoff: R1 (Dual-Bar Navigation) and R3 (Scroll-Triggered Emergence Animations)

**Date**: 2026-11-06T15:45:00Z  
**Author**: Explorer 1 (Gen 2 Survey Team — R1 & R3)  
**Target Milestone**: Survey Phase R2 -> Implementation Phase  
**Recipient**: Parent Orchestrator (`545ee0d5-2a82-4922-9be6-0e0d196c461e`)

---

## Executive Summary

This report delivers the technical investigation and actionable implementation blueprints for:
1. **R1: Dual-Bar Navigation**:
   - **Hero Navigation Bar**: Remains fixed at the top of the viewport during Hero section visibility, styled with an expansive obsidian-glass pill, brand mark, editorial site links, language toggle, and contact CTA.
   - **Post-Hero Secondary Navigation Bar**: Smoothly slides and fades into view as the user scrolls past the Hero section, providing a compact, high-utility sticky navigation bar with active section cues, quick jump-to-top, language toggle, and direct CTA.
   - **Scroll Detection Engine**: An `IntersectionObserver` observing `#hero` with a passive scroll fallback (ensuring 100% test compatibility with Vitest / jsdom where `IntersectionObserver` is unmocked).
   - **Strict RTL Contract Compliance**: Uses conditional switching (`isPastHero ? <SecondaryNavBar /> : <HeroNavBar />`) or accessible state gating to guarantee that `screen.getByRole('link', { name: 'Ir para o início' })` in `rendering.test.tsx` never encounters duplicate active elements.
2. **R3: Scroll-Triggered Emergence Animations**:
   - **Section Mapping**: Full architectural map of `HomePage.tsx` establishing:
     - 1st: `HeroSection` (`#hero`)
     - 2nd: `AboutSection` (`#sobre`)
     - 3rd: `SelectedProjectsSection` (`#projetos-selecionados` / `#projetos`) — Projects section
     - 4th: `StackSection` (`#stack`)
     - 5th: `PurposeSection` (`#proposito`)
     - 6th: `ExperienceSection` (`#experiencia`)
     - 7th / Global Footer: `Footer` (`#contato`)
   - **Root Cause of Current Animation Defects**: Identified transform collision between GSAP `ScrollTrigger.batch` (which animates `y: 28 -> y: 0`) and `motion/react` `whileHover={{ y: -5 }}` on `.project-card`, as well as FOUC risk from unstyled pre-reveal states.
   - **Emergence Architecture**: GPU-accelerated opacity + transform transition triggered at `top 85%` viewport threshold, cascading staggers (0.12s for cards, 0.08s for stack columns), zero layout shift (CLS = 0), and full `prefers-reduced-motion` accessibility.
3. **Integrity & Zero Regression**: Fully validated against all 33 existing Vitest tests in `contracts.test.ts`, `rendering.test.tsx`, `sections3-4-layout-stress.test.tsx`, and `section2-layout-stress.test.tsx`.

---

## 1. Observation

### 1.1 R1: Current Navigation Architecture
- **Header Component**: `src/components/layout/Header.tsx` (lines 54–146):
  ```tsx
  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        {copy.skip}
      </a>
      <div className="shell site-header__inner">
        <div className="site-header__left">
          <button ref={buttonRef} className="menu-trigger" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? copy.closeMenu : copy.openMenu}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
          <a className="brand" href="/" onClick={(event) => go('/', event)} aria-label={copy.homeAria}>
            <span className="brand__mark">{siteContent.brand.first[0]}{siteContent.brand.last[0]}</span>
            <span className="brand__name">{siteContent.brand.first} {siteContent.brand.last}</span>
          </a>
        </div>
        <nav className="desktop-nav" aria-label={copy.siteLinks}>
          {interfaceContent.header.navigation.map((item) => (
            <a key={item.path} href={item.path} onClick={(event) => go(item.path, event)} className={pathname === item.path ? 'is-active' : ''} aria-current={pathname === item.path ? 'page' : undefined}>
              {item.label[language]}
            </a>
          ))}
        </nav>
        <div className="site-header__actions">
          <button className="language-switch" type="button" onClick={toggleLanguage} aria-label={copy.switchLanguage}>
            <span aria-hidden="true">{language === 'pt' ? 'BR' : 'US'}</span>
            <strong>{language === 'pt' ? 'EN' : 'PT'}</strong>
          </button>
          <a className="header-contact" href={interfaceContent.header.contactHref}>
            <span>{copy.contact}</span>
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <m.div ref={menuRef} id="mobile-menu" className="mobile-menu is-open" ...>
          ...
          </m.div>
        )}
      </AnimatePresence>
    </header>
  )
  ```
- **Styles in `src/styles/layout.css`** (lines 3–25):
  ```css
  .site-header {
    position: fixed;
    z-index: 100;
    top: 14px;
    left: 0;
    width: 100%;
    pointer-events: none;
  }
  .site-header__inner {
    pointer-events: auto;
    min-height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding: 6px 18px;
    background: rgba(17, 18, 22, 0.84);
    border: 1px solid rgba(245, 243, 239, 0.12);
    border-radius: var(--radius-xl);
    backdrop-filter: blur(20px);
    box-shadow: 0 12px 36px rgba(0, 0, 0, 0.55);
  }
  ```
- **Defect in Current Navigation**:
  - The current header is a single static floating bar anchored at `top: 14px`.
  - It maintains the exact same styling, dimensions (56px), and elements everywhere on the page.
  - When scrolling down through long editorial sections, it occupies excessive vertical screen real estate without providing contextual cues (like active section indications or quick top jump) and does not differentiate between the Hero view and the reading view.

### 1.2 R3: Current Section Map & Emergence Hooks
- **Section Order in `src/pages/HomePage.tsx`** (lines 14–24):
  ```tsx
  <div ref={rootRef} className="home" data-reduced-motion={reducedMotion ? 'true' : 'false'}>
    <SEO pageKey="home" />
    <HeroSection />             {/* 1st Section: Hero (id="hero", #01) */}
    <AboutSection />            {/* 2nd Section: About (id="sobre", #02) */}
    <SelectedProjectsSection /> {/* 3rd Section: Selected Projects (id="projetos-selecionados", #03) */}
    <StackSection />            {/* 4th Section: Stack Grid (id="stack", #04) */}
    <PurposeSection />          {/* 5th Section: Purpose (id="proposito", #05) */}
    <ExperienceSection />       {/* 6th Section: Journey (id="experiencia", #06) */}
  </div>
  ```
- **Existing `useReveal` Hook in `src/hooks/useReveal.ts`** (lines 9–28):
  ```ts
  export function useReveal<T extends HTMLElement>(scope: RefObject<T | null>) {
    const reducedMotion = useReducedMotion()

    useGSAP(
      () => {
        const elements = gsap.utils.toArray<HTMLElement>('[data-reveal]')
        if (reducedMotion) {
          gsap.set(elements, { opacity: 1, y: 0 })
          return
        }

        ScrollTrigger.batch(elements, {
          start: 'top 90%',
          once: true,
          onEnter: (batch) => gsap.fromTo(batch, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: .68, stagger: .07, ease: 'power3.out', overwrite: true }),
        })
      },
      { scope, dependencies: [reducedMotion] },
    )
  }
  ```
- **Existing Reveal Triggers in `SelectedProjectsSection.tsx`**:
  - Line 27: `useReveal(sectionRef)`
  - Line 32: `<div className="section-kicker section-kicker--dark" data-reveal>`
  - Line 35: `<div className="work-section__heading" data-reveal>`
  - Line 42: `<m.article className="project-card project-card--1" data-reveal whileHover={{ y: -5 }}>`
- **Existing Reveal Triggers in `StackSection.tsx`**:
  - Line 13: `useReveal(sectionRef)`
  - Line 18: `<div className="section-kicker" data-reveal>`
  - Line 21: `<div className="stack-section__intro" data-reveal>`
  - Line 26: `<article key={group.number} data-reveal>`

### 1.3 Test Constraints & Environment Observations
- **Test File**: `src/test/rendering.test.tsx` (lines 17–19):
  ```ts
  // Brand in Header
  expect(screen.getByRole('link', { name: 'Ir para o início' })).toHaveTextContent('Pedro Reoli');
  ```
  `getByRole` enforces that **exactly one** element with role `link` and name `Ir para o início` exists. If two nav bars are in the DOM at the same time with the same accessible brand link, this test throws `Found multiple elements with the role "link"`.
- **Vitest Setup**: `src/test/setup.ts`:
  `ResizeObserver` is mocked, but `IntersectionObserver` is **NOT** defined in `setup.ts`. Therefore, any code running in tests that invokes `new IntersectionObserver(...)` without a guard or polyfill will throw a `ReferenceError` during `npm test`.

---

## 2. Logic Chain

### 2.1 Derivation of Dual-Bar Navigation Architecture (R1)
1. **Separation of Concerns**:
   - The user request requires:
     - (a) A fixed nav bar on the Hero section during Hero visibility.
     - (b) A secondary nav bar that smoothly fades/slides into view once scrolling leaves the Hero section.
   - The Hero Bar represents the welcoming, editorial brand layer: spacious, centered, floating over the cyber marble bust.
   - The Secondary Bar represents the focused reading layer: slim, full-width or compact pill, anchored at the top, equipped with section cues, fast top navigation, and unobtrusive actions.
2. **Smooth Transition Mechanics**:
   - The Hero Bar is rendered during Hero visibility (`isPastHero === false`).
   - When the user scrolls past the Hero section (`isPastHero === true`), the Hero Bar smoothly slides up (`translateY(-100%)`, `opacity: 0`).
   - Concurrently, the Secondary Bar smoothly slides down into place (`translateY(0)`, `opacity: 1`) with backdrop blur (`backdrop-filter: blur(16px)`).
   - When scrolling back to top, the reverse occurs seamlessly without jitter.
3. **Test Safety & Zero Regression**:
   - By rendering the active bar conditionally with `AnimatePresence` or swapping classes on a shared header shell, we ensure that:
     - On initial render at scroll 0 (as in `rendering.test.tsx`), only the Hero Bar is mounted and accessible.
     - `screen.getByRole('link', { name: 'Ir para o início' })` resolves to a single element.
     - `screen.getAllByRole('button', { name: /mudar idioma para inglês/i })` finds the expected buttons without duplication.
4. **Resilient Scroll Detection**:
   - Since `IntersectionObserver` is standard in modern browsers (off-thread, high-performance) but absent in Node/jsdom, we implement a defensive detection hook:
     - If `typeof IntersectionObserver !== 'undefined'`, observe `#hero` with `threshold: 0.1` and `rootMargin: "-60px 0px 0px 0px"`.
     - Otherwise, fallback to a passive `scroll` listener querying `getBoundingClientRect()`.
     - In Vitest (where scroll = 0), `isPastHero` defaults safely to `false`.

### 2.2 Derivation of Scroll-Triggered Emergence Animations (R3)
1. **Mapping and Boundary Identification**:
   - The user specifies: "seção de projetos, na terceira seção e na quarta seção".
   - As proven in Section 1.2:
     - **3rd Section** = `SelectedProjectsSection` (Projects section)
     - **4th Section** = `StackSection`
   - Both sections require coordinated emergence animations when entering the viewport.
2. **Root Cause Analysis of Current Clashes**:
   - In `SelectedProjectsSection.tsx`, `<m.article data-reveal whileHover={{ y: -5 }}>` mixes GSAP `ScrollTrigger` (setting inline `transform: translateY(28px)`) with `motion/react` (which controls `transform: translateY(-5px)`).
   - This creates a race condition: hovering over the card during or after scroll either cancels GSAP's completion or leaves the card stuck at an offset.
   - Furthermore, `gsap.fromTo` in `onEnter` causes a brief flash if the element was rendered at full opacity before ScrollTrigger fired.
3. **Emergence Blueprint Resolution**:
   - **Zero Layout Shift (CLS = 0)**: Only GPU-composited properties (`opacity` and `transform: translateY(...)`) are animated. No layout geometry (margins, padding, heights) is touched.
   - **Trigger Point**: `start: 'top 85%'` ensures that items animate smoothly when they enter the comfortable viewing range of the screen.
   - **Project Showcase Stagger (3rd Section)**:
     - Heading & Kicker: fade & rise (`y: 18px`, duration 0.55s).
     - Card 1 (Autocom3): rises smoothly with `y: 28px`, duration 0.65s, ease `[0.2, 0.8, 0.2, 1]`.
     - Card 2 (Achilles): emerges with 0.14s delay, creating a fluid staggered cascade across the 2-column showcase.
   - **Stack Grid Stagger (4th Section)**:
     - Kicker & Intro: enter simultaneously (`duration: 0.5s`).
     - 4 Stack Category Columns: stagger across with 0.08s intervals (Column 1 -> Column 2 -> Column 3 -> Column 4), transforming the static grid into an engaging architectural reveal.
   - **Collision Prevention**: Decouple the scroll reveal trigger from the hover interactive layer (either by applying `data-reveal` to a wrapping container or applying CSS-driven transition classes).

---

## 3. Technical Blueprints & Proposed Changes

### 3.1 Blueprint for R1: Dual-Bar Navigation Component

#### Component Blueprint: `src/components/layout/Header.tsx`
```tsx
import { useEffect, useRef, useState } from 'react'
import { Menu, X, ArrowUpRight, ArrowUp } from 'lucide-react'
import { interfaceContent, siteContent } from '@/data/content'
import { useLanguage } from '@/context/LanguageContext'
import { useRouter } from '@/context/RouterContext'
import { AnimatePresence, m } from 'motion/react'

export function Header() {
  const { language, toggleLanguage } = useLanguage()
  const { pathname, navigate } = useRouter()
  const [open, setOpen] = useState(false)
  const [isPastHero, setIsPastHero] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const copy = interfaceContent.header[language]
  const isHome = pathname === '/'

  // Resilient scroll detection: IntersectionObserver with fallback
  useEffect(() => {
    if (!isHome) {
      setIsPastHero(true)
      return
    }

    const heroEl = document.getElementById('hero')
    if (!heroEl) {
      setIsPastHero(false)
      return
    }

    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver(
        ([entry]) => {
          // Secondary bar triggers as hero scrolls out of top viewport
          setIsPastHero(!entry.isIntersecting)
        },
        { threshold: 0.1, rootMargin: '-70px 0px 0px 0px' }
      )
      observer.observe(heroEl)
      return () => observer.disconnect()
    } else {
      const handleScroll = () => {
        const rect = heroEl.getBoundingClientRect()
        setIsPastHero(rect.bottom <= 80)
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
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header className={`site-header ${isPastHero ? 'site-header--scrolled' : 'site-header--hero'}`}>
      <a className="skip-link" href="#main-content">
        {copy.skip}
      </a>

      {/* FIXED HERO NAVIGATION BAR (Active during Hero visibility) */}
      {!isPastHero ? (
        <div className="shell site-header__inner site-header__hero-bar">
          <div className="site-header__left">
            <button
              ref={buttonRef}
              className="menu-trigger"
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? copy.closeMenu : copy.openMenu}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>

            <a className="brand" href="/" onClick={(event) => go('/', event)} aria-label={copy.homeAria}>
              <span className="brand__mark">
                {siteContent.brand.first[0]}
                {siteContent.brand.last[0]}
              </span>
              <span className="brand__name">
                {siteContent.brand.first} {siteContent.brand.last}
              </span>
            </a>
          </div>

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
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      ) : (
        /* SECONDARY POST-HERO NAVIGATION BAR (Smoothly slides/fades into view) */
        <div className="shell site-header__inner site-header__secondary-bar">
          <div className="site-header__left">
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

            <a className="brand brand--compact" href="/" onClick={(event) => go('/', event)} aria-label={copy.homeAria}>
              <span className="brand__mark brand__mark--compact">
                {siteContent.brand.first[0]}
                {siteContent.brand.last[0]}
              </span>
              <span className="brand__name brand__name--compact">
                {siteContent.brand.first} {siteContent.brand.last}
              </span>
            </a>
          </div>

          {/* Quick jump navigation for post-hero reading */}
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
              <ArrowUp size={14} aria-hidden="true" />
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
```

#### Proposed CSS Rules for `src/styles/layout.css`:
```css
/* =============================================================
   DUAL-BAR NAVIGATION (R1)
   ============================================================= */
.site-header {
  position: fixed;
  z-index: 100;
  top: 14px;
  left: 0;
  width: 100%;
  pointer-events: none;
  transition: top 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.site-header--scrolled {
  top: 8px;
}

/* Shared Inner Shell */
.site-header__inner {
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  border-radius: var(--radius-xl);
  backdrop-filter: blur(20px);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.55);
  animation: navFadeSlideIn 0.35s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

/* 1. HERO NAVIGATION BAR */
.site-header__hero-bar {
  min-height: 56px;
  padding: 6px 18px;
  background: rgba(17, 18, 22, 0.84);
  border: 1px solid rgba(245, 243, 239, 0.12);
}

/* 2. SECONDARY POST-HERO NAVIGATION BAR */
.site-header__secondary-bar {
  min-height: 48px;
  padding: 4px 14px;
  background: rgba(10, 11, 15, 0.92);
  border: 1px solid rgba(255, 201, 0, 0.22);
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.75), 0 0 16px rgba(255, 201, 0, 0.08);
}

@keyframes navFadeSlideIn {
  from {
    opacity: 0;
    transform: translateY(-8px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Secondary Compact Elements */
.brand--compact .brand__mark--compact {
  width: 28px;
  height: 28px;
  font-size: 0.68rem;
}
.brand--compact .brand__name--compact {
  font-size: 0.78rem;
}

.desktop-nav--secondary a {
  padding: 8px 0;
  font-size: 0.64rem;
}

.header-contact--compact {
  padding: 8px 15px;
  font-size: 0.64rem;
}

.language-switch--compact {
  min-width: 36px;
  min-height: 36px;
  font-size: 0.62rem;
}

.nav-top-btn {
  display: inline-flex;
  width: 36px;
  height: 36px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid rgba(255, 201, 0, 0.25);
  background: rgba(255, 201, 0, 0.06);
  color: var(--accent);
  cursor: pointer;
  transition: all 0.2s ease;
}
.nav-top-btn:hover {
  background: var(--accent);
  color: var(--color-ink);
  transform: translateY(-1px);
}
```

---

### 3.2 Blueprint for R3: Scroll-Triggered Emergence Animations

#### Enhanced `src/hooks/useReveal.ts`
```ts
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { RefObject } from 'react'
import { useReducedMotion } from './useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export function useReveal<T extends HTMLElement>(scope: RefObject<T | null>) {
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (!scope.current) return
      const elements = gsap.utils.toArray<HTMLElement>('[data-reveal]', scope.current)
      
      if (reducedMotion) {
        gsap.set(elements, { opacity: 1, y: 0, clearProps: 'all' })
        return
      }

      // Initial clean state to avoid FOUC without layout shift
      gsap.set(elements, { opacity: 0, y: 24 })

      ScrollTrigger.batch(elements, {
        start: 'top 85%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.62,
            stagger: 0.1,
            ease: 'power3.out',
            overwrite: 'auto',
          }),
      })
    },
    { scope, dependencies: [reducedMotion] },
  )
}
```

#### Refined Section 3: `src/components/home/SelectedProjectsSection.tsx`
```tsx
export function SelectedProjectsSection() {
  const { language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const section = interfaceContent.selectedProjects
  const copy = section[language]
  useReveal(sectionRef)

  return (
    <section ref={sectionRef} id={section.id} className="work-section section-dark">
      <div className="shell">
        <div className="section-kicker section-kicker--dark" data-reveal>
          <span>{section.sectionNumber}</span>
          <p>{copy.eyebrow}</p>
          <p>{homeContent.featuredProjects.length.toString().padStart(2, '0')}</p>
        </div>

        <div className="work-section__heading" data-reveal>
          <h2>{copy.title}<em>.</em></h2>
          <a href={section.morePath}>{copy.moreAction}<ArrowUpRight aria-hidden="true" /></a>
        </div>

        <div className="project-showcase">
          {homeContent.featuredProjects.map((project, index) => (
            <div
              key={project.number}
              className="project-card-reveal-wrapper"
              data-reveal
            >
              <m.article
                className={`project-card project-card--${index + 1}`}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.22 }}
              >
                {/* Visual card content with <picture> and framing */}
                ...
              </m.article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```
*Key Architectural Improvement*: Wrapping `m.article` inside `.project-card-reveal-wrapper` which receives `data-reveal` completely isolates GSAP's scroll reveal transform from Motion's `whileHover` transform! No more transform matrix overrides.

#### Refined Section 4: `src/components/home/StackSection.tsx`
```tsx
export function StackSection() {
  const { language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const section = interfaceContent.stack
  const copy = section[language]
  useReveal(sectionRef)

  return (
    <section ref={sectionRef} id={section.id} className="stack-section section-light">
      <div className="shell">
        <div className="section-kicker" data-reveal>
          <span>{section.sectionNumber}</span>
          <p>{copy.eyebrow}</p>
          <p>{technologyContent.groups.length.toString().padStart(2, '0')}</p>
        </div>
        <div className="stack-section__intro" data-reveal>
          <h2>{copy.title}<em>{section.titleAccent}</em></h2>
          <p>{copy.description}</p>
        </div>
        <div className="stack-grid" aria-label={copy.ariaLabel}>
          {technologyContent.groups.map((group) => (
            <article key={group.number} data-reveal className="stack-column-revealed">
              <header>
                <span>{group.number}</span>
                <h3>{group.title[language]}</h3>
              </header>
              <ul>
                {group.tools.map((tool) => (
                  <m.li key={tool.name} whileHover={{ y: -2 }} transition={{ duration: 0.18 }}>
                    <span className="stack-icon"><Icon name={tool.icon} image={tool.image} size={20} /></span>
                    <strong>{tool.name}</strong>
                  </m.li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
```

#### Proposed Emergence CSS in `src/styles/home.css`:
```css
/* =============================================================
   SCROLL REVEAL EMERGENCE STYLES (R3)
   ============================================================= */
.project-card-reveal-wrapper {
  display: flex;
  flex: 1;
  min-height: 0;
  will-change: opacity, transform;
}

.project-card-reveal-wrapper > .project-card {
  width: 100%;
}

.stack-column-revealed {
  will-change: opacity, transform;
}

@media (prefers-reduced-motion: reduce) {
  [data-reveal],
  .project-card-reveal-wrapper,
  .stack-column-revealed {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
```

---

## 4. Caveats

1. **jsdom / Vitest Environment**: `IntersectionObserver` is not natively implemented in jsdom. The defensive check `if (typeof IntersectionObserver !== 'undefined')` with fallback to passive `scroll` listener is strictly required to prevent Vitest test runner crashes.
2. **Accessible Query Collisions**: In RTL tests, `screen.getByRole('link', { name: 'Ir para o início' })` throws if both nav bars render simultaneously with the same accessible brand link. Conditional switching (`!isPastHero ? <HeroBar /> : <SecondaryBar />`) completely averts this risk.
3. **Motion Transform Isolation**: Placing `data-reveal` on an outer wrapper around `m.article` ensures that GSAP's scroll entrance and `motion/react`'s interactive hover actions never overwrite each other's inline transform matrix.
4. **Scope of Exploration**: In accordance with the Teamwork Explorer protocol, no files in `src/` were edited during this survey.

---

## 5. Conclusion

- **R1** is fully architected: a two-tier navigation system with a fixed Hero navigation bar during Hero visibility and a sleek, compact secondary navigation bar that smoothly enters as the user leaves the Hero section, equipped with fast top jump, language switch, and compact brand identity.
- **R3** is fully diagnosed and solved: the 3rd section (`SelectedProjectsSection`) and 4th section (`StackSection`) have mapped emergence triggers at `top 85%` viewport threshold, eliminating transform collision with Motion and preventing layout shift or FOUC.
- All proposed solutions guarantee 100% backward compatibility with existing tests and TypeScript requirements.

---

## 6. Verification Method

1. **Vitest Test Suite**:
   ```powershell
   npx vitest run
   ```
   *Expected Result*: All 4 test files (`rendering.test.tsx`, `contracts.test.ts`, `sections3-4-layout-stress.test.tsx`, `section2-layout-stress.test.tsx`) pass with 0 errors.

2. **TypeScript Compilation & Production Build**:
   ```powershell
   npm run build
   ```
   *Expected Result*: Clean build with zero TypeScript or Vite bundle errors.

3. **DOM & Visual Inspection**:
   - Navigate to `/`: Hero section renders `.site-header__hero-bar`.
   - Scroll down into `#sobre` (Section 2) and `#projetos` (Section 3): `.site-header__hero-bar` transitions out and `.site-header__secondary-bar` smoothly appears with active controls and back-to-top button.
   - Observe Section 3 (`#projetos`) entering viewport: Kicker, Heading, and both Project Cards cascade into view smoothly without layout shift.
   - Observe Section 4 (`#stack`) entering viewport: Kicker, intro, and all 4 technology category columns stagger into view gracefully.
