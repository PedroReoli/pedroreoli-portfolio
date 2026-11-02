import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { interfaceContent, mediaContent, getLocalized } from '@/data/content';
import { SEO } from '@/components/common/SEO';
import { Icon } from '@/components/common/Icon';

export const MediaPage: React.FC = () => {
  const { language } = useLanguage();
  const archive = interfaceContent.mediaArchive;
  const t = archive[language];
  const notes = mediaContent.mediaNotes;

  return (
    <div className="py-12 md:py-20">
      <SEO pageKey="media" />

      <div className="container-editorial">
        {/* Header Title */}
        <div className="pb-8 border-b border-line flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-signal font-semibold">
              {t.eyebrow}
            </span>
            <h1 className="mt-2 font-display text-4xl sm:text-6xl md:text-7xl font-normal text-ink">
              {t.title}
            </h1>
          </div>
          <p className="text-base text-ink-soft max-w-md font-light">
            {t.description}
          </p>
        </div>

        {/* Featured Press Article */}
        <section aria-labelledby="press-highlight-title" className="py-12">
          <div className="p-8 sm:p-12 bg-paper-light border border-line rounded-lg shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Media image */}
              <div className="lg:col-span-7 order-2 lg:order-1">
                <div className="overflow-hidden rounded border border-line bg-paper-muted aspect-[16/9]">
                  <img
                    src={archive.feature.image.src}
                    srcSet={archive.feature.image.srcSet}
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    alt={t.imageAlt}
                    width={archive.feature.image.width}
                    height={archive.feature.image.height}
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-[1.015] transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Text & Action */}
              <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 text-xs font-mono uppercase bg-mint/50 text-mint-dark border border-mint rounded mb-4">
                    <span>{t.pressLabel}</span>
                  </div>

                  <h2 id="press-highlight-title" className="font-display text-3xl sm:text-4xl text-ink leading-tight">
                    {t.pressTitle}
                  </h2>

                  <p className="mt-4 text-base text-ink-soft font-light leading-relaxed">
                    {language === 'pt'
                      ? 'Cobertura sobre a concepção e apresentação do projeto FalaAtípica, desenvolvido para conectar crianças com dificuldades de fala a terapeutas e familiares.'
                      : 'Coverage on the ideation and presentation of the FalaAtípica project, designed to connect children with speech challenges to therapists and families.'}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-line">
                  <a
                    href={archive.feature.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-semibold text-cobalt hover:text-ink transition-colors min-h-[44px]"
                    aria-label={`${t.pressAction} — ${archive.feature.href} (abre em nova aba)`}
                  >
                    <span>{t.pressAction}</span>
                    <Icon name={archive.feature.actionIcon} size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical References & Code Notes */}
        <section aria-labelledby="references-heading" className="py-12 border-t border-line">
          <div className="pb-8 flex items-baseline justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase text-cobalt font-semibold">
                [{archive.referenceCount} {t.referencesCount}]
              </span>
              <h2 id="references-heading" className="mt-2 font-display text-3xl sm:text-4xl text-ink">
                {t.referencesTitle}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {notes.map((note) => {
              const cat = getLocalized(note.category, language);
              const title = getLocalized(note.title, language);
              const desc = getLocalized(note.description, language);
              const dest = getLocalized(note.destination, language);

              return (
                <article
                  key={note.number}
                  className="group flex flex-col justify-between p-8 bg-paper-light border border-line rounded-lg shadow-2xs hover:border-signal/50 hover:shadow-md transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-line text-xs font-mono text-ink-muted uppercase">
                      <span className="text-signal font-semibold">[{note.number}]</span>
                      <span>{cat}</span>
                    </div>

                    <h3 className="mt-4 font-display text-2xl sm:text-3xl text-ink group-hover:text-signal transition-colors">
                      {title}
                    </h3>

                    <p className="mt-3 text-sm text-ink-soft leading-relaxed font-light">
                      {desc}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-line">
                    <a
                      href={note.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-semibold text-cobalt hover:text-ink transition-colors min-h-[44px]"
                      aria-label={`${dest} - ${note.href} (abre em nova aba)`}
                    >
                      <span>{dest}</span>
                      <Icon name={note.icon} size={14} />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};
