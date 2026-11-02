import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useRouter } from '@/context/RouterContext';
import { interfaceContent, siteContent, getLocalized } from '@/data/content';
import { Icon } from '@/components/common/Icon';

export const Header: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();
  const { pathname, navigate } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);

  const headerStrings = interfaceContent.header[language];
  const flagInfo = language === 'pt' ? siteContent.flags.br : siteContent.flags.us;
  const targetFlagInfo = language === 'pt' ? siteContent.flags.us : siteContent.flags.br;

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    if (mobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-paper/95 backdrop-blur-md border-b border-line transition-colors">
      <div className="container-editorial flex items-center justify-between h-20">
        {/* Brand */}
        <a
          href={interfaceContent.header.brand.homePath}
          onClick={(e) => handleNavClick(interfaceContent.header.brand.homePath, e)}
          className="group flex items-baseline gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt rounded px-1 py-0.5"
          aria-label={headerStrings.homeAria}
        >
          <span className="font-display text-2xl font-semibold tracking-tight text-ink group-hover:text-signal transition-colors">
            {siteContent.brand.first}
          </span>
          <span className="font-sans text-xs uppercase tracking-widest text-ink-muted group-hover:text-ink transition-colors font-semibold">
            {siteContent.brand.last}
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav aria-label={headerStrings.siteLinks} className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-1 list-none p-0 m-0">
            {interfaceContent.header.navigation.map((item) => {
              const label = getLocalized(item.label, language);
              const isActive =
                item.path === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.path);

              return (
                <li key={item.path}>
                  <a
                    href={item.path}
                    onClick={(e) => handleNavClick(item.path, e)}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors rounded ${
                      isActive
                        ? 'text-ink font-semibold'
                        : 'text-ink-soft hover:text-ink hover:bg-paper-light'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className="flex items-center gap-2">
                      <Icon name={item.icon} size={15} className={isActive ? 'text-cobalt' : 'text-ink-muted'} />
                      <span>{label}</span>
                    </span>
                    {isActive && (
                      <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-cobalt rounded-full" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="h-4 w-[1px] bg-line" aria-hidden="true" />

          {/* Language Switcher */}
          <button
            type="button"
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-ink-soft hover:text-ink hover:bg-paper-light border border-line rounded transition-colors min-h-[44px] min-w-[44px]"
            aria-label={headerStrings.switchLanguage}
            title={headerStrings.switchLanguage}
          >
            <img
              src={targetFlagInfo.default}
              alt={targetFlagInfo.alt}
              className="w-4 h-3 object-cover rounded-sm shadow-sm"
            />
            <span className="font-semibold">{language === 'pt' ? 'EN' : 'PT'}</span>
          </button>

          {/* Contact CTA */}
          <a
            href={interfaceContent.header.contactHref}
            className="inline-flex items-center justify-center px-4 py-2 text-xs uppercase tracking-widest font-mono font-semibold bg-ink text-paper-light hover:bg-signal hover:text-white rounded transition-colors shadow-sm min-h-[44px]"
          >
            {headerStrings.contact}
          </a>
        </nav>

        {/* Mobile Actions: Language & Hamburger Button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            type="button"
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono uppercase text-ink-soft border border-line rounded min-h-[44px]"
            aria-label={headerStrings.switchLanguage}
          >
            <img src={flagInfo.default} alt={flagInfo.alt} className="w-4 h-3 object-cover rounded-sm" />
            <span className="font-semibold">{language.toUpperCase()}</span>
          </button>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center justify-center p-2 text-ink hover:text-signal border border-line rounded min-w-[44px] min-h-[44px]"
            aria-label={mobileMenuOpen ? headerStrings.closeMenu : headerStrings.openMenu}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            <Icon name={mobileMenuOpen ? interfaceContent.header.closeIcon : interfaceContent.header.menuIcon} size={22} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          ref={mobileNavRef}
          className="md:hidden border-b border-line bg-paper-light px-6 py-6 shadow-xl animate-fadeIn"
          role="dialog"
          aria-label={headerStrings.mobileNavigation}
          aria-modal="true"
        >
          <nav className="flex flex-col gap-4">
            <ul className="flex flex-col gap-2 list-none p-0 m-0">
              {interfaceContent.header.navigation.map((item) => {
                const label = getLocalized(item.label, language);
                const isActive =
                  item.path === '/'
                    ? pathname === '/'
                    : pathname.startsWith(item.path);

                return (
                  <li key={item.path}>
                    <a
                      href={item.path}
                      onClick={(e) => handleNavClick(item.path, e)}
                      className={`flex items-center justify-between px-4 py-3 text-base rounded border transition-colors min-h-[44px] ${
                        isActive
                          ? 'border-cobalt bg-cobalt/5 text-ink font-semibold'
                          : 'border-transparent text-ink-soft hover:bg-paper hover:text-ink'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <span className="flex items-center gap-3">
                        <Icon name={item.icon} size={18} className={isActive ? 'text-cobalt' : 'text-ink-muted'} />
                        <span>{label}</span>
                      </span>
                      {isActive && <Icon name="check" size={16} className="text-cobalt" />}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="pt-2">
              <a
                href={interfaceContent.header.contactHref}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center w-full py-3.5 text-center text-sm uppercase tracking-widest font-mono font-semibold bg-signal text-white hover:bg-signal-hover rounded min-h-[44px]"
              >
                {headerStrings.contact}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
