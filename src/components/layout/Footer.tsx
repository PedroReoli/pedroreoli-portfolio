import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { interfaceContent, siteContent, getLocalized } from '@/data/content';
import { Icon } from '@/components/common/Icon';

export const Footer: React.FC = () => {
  const { language } = useLanguage();
  const footerContent = interfaceContent.footer;
  const t = footerContent[language];

  const handleBackToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <footer id={footerContent.id} className="relative bg-ink text-paper rounded-t-[32px] sm:rounded-t-[48px] overflow-hidden -mt-8 sm:-mt-12 pt-20 pb-16 z-20 shadow-2xl border-t border-ink/40">
      <div className="container-editorial">
        {/* Top Header / Section Number */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-12 border-b border-paper/15 text-xs font-mono tracking-widest text-paper-muted uppercase">
          <div className="flex items-center gap-3">
            <span className="text-signal font-semibold">[{footerContent.sectionNumber}]</span>
            <span>{t.eyebrow}</span>
          </div>
          <div>
            <span>{siteContent.profile.address.locality}, {siteContent.profile.address.region} / {siteContent.profile.address.country}</span>
          </div>
        </div>

        {/* Main CTA Editorial Block */}
        <div className="py-16 max-w-4xl">
          <p className="text-sm md:text-base font-mono uppercase tracking-wider text-paper/70 mb-4">
            {t.prompt}
          </p>
          <a
            href={footerContent.ctaHref}
            className="group inline-block"
            aria-label={`${t.ctaFirst} ${t.ctaSecond} — ${footerContent.ctaHref}`}
          >
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal leading-[0.95] tracking-tight text-paper group-hover:text-signal transition-colors">
              <span>{t.ctaFirst} </span>
              <span className="italic underline underline-offset-8 decoration-line group-hover:decoration-signal transition-colors">
                {t.ctaSecond}
              </span>
            </h2>
          </a>
          <p className="mt-8 text-base md:text-lg text-paper/80 font-light leading-relaxed max-w-2xl">
            {t.description}
          </p>
        </div>

        {/* Contact Links Grid */}
        <div className="pt-8 pb-16 border-t border-paper/15">
          <h3 className="sr-only">{t.linksLabel}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {footerContent.contacts.map((contact) => {
              const detail = getLocalized(contact.detail, language);
              return (
                <a
                  key={contact.label}
                  href={contact.href}
                  target={contact.external ? '_blank' : undefined}
                  rel={contact.external ? 'noopener noreferrer' : undefined}
                  className="group relative flex flex-col p-6 rounded-xl sm:rounded-2xl bg-ink/60 border border-paper/15 hover:border-signal/50 hover:bg-paper/5 transition-all min-h-[44px]"
                  aria-label={`${contact.label} - ${detail}${contact.external ? t.externalLabel : ''}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="flex items-center justify-center w-10 h-10 rounded-lg sm:rounded-xl border border-paper/20 group-hover:border-signal group-hover:text-signal transition-colors">
                      <Icon name={contact.icon} size={18} />
                    </span>
                    <Icon
                      name="arrow-up-right"
                      size={16}
                      className="text-paper/40 group-hover:text-signal group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                    />
                  </div>
                  <span className="text-lg font-medium text-paper group-hover:text-signal transition-colors">
                    {contact.label}
                  </span>
                  <span className="text-xs font-mono text-paper/60 mt-1">
                    {detail}
                  </span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom Credits & Back to Top */}
        <div className="pt-8 border-t border-paper/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-paper/60">
          <div>
            <p className="m-0">
              © {new Date().getFullYear()} {siteContent.legalName} ({siteContent.name}).
            </p>
          </div>
          <button
            type="button"
            onClick={handleBackToTop}
            className="flex items-center gap-2 px-3 py-2 text-paper/70 hover:text-paper border border-paper/20 hover:border-paper/40 rounded-full transition-colors min-h-[44px]"
            aria-label={t.backToTop}
          >
            <span>{t.backToTop}</span>
            <Icon name={footerContent.backToTopIcon} size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};
