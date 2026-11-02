import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useRouter } from '@/context/RouterContext';
import { interfaceContent } from '@/data/content';
import { SEO } from '@/components/common/SEO';
import { Icon } from '@/components/common/Icon';

export const NotFoundPage: React.FC = () => {
  const { language } = useLanguage();
  const { navigate } = useRouter();
  const notFound = interfaceContent.notFound;
  const t = notFound[language];

  return (
    <div className="py-24 md:py-36">
      <SEO pageKey="notFound" />

      <div className="container-editorial max-w-3xl text-center">
        <div className="inline-block px-3 py-1 bg-paper-light border border-line rounded text-xs font-mono uppercase tracking-widest text-signal mb-6">
          [404] — {t.label}
        </div>

        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-normal text-ink leading-none">
          <span>{t.titleFirst} </span>
          <span className="italic text-ink-soft">{t.titleSecond}</span>
        </h1>

        <p className="mt-8 text-lg sm:text-xl text-ink-soft font-light max-w-xl mx-auto leading-relaxed">
          {t.description}
        </p>

        <nav aria-label={t.navLabel} className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <a
            href={notFound.homePath}
            onClick={(e) => {
              e.preventDefault();
              navigate(notFound.homePath);
            }}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-ink hover:bg-signal text-paper-light text-xs font-mono uppercase tracking-widest font-semibold rounded shadow-sm transition-colors min-h-[44px]"
          >
            <span>{t.homeAction}</span>
          </a>

          <a
            href={notFound.projectsPath}
            onClick={(e) => {
              e.preventDefault();
              navigate(notFound.projectsPath);
            }}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-paper-light hover:bg-paper-muted border border-line text-ink text-xs font-mono uppercase tracking-wider font-semibold rounded transition-colors min-h-[44px]"
          >
            <span>{t.projectsAction}</span>
            <Icon name={notFound.projectsIcon} size={15} />
          </a>
        </nav>
      </div>
    </div>
  );
};
