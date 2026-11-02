import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { interfaceContent } from '@/data/content';
import { Icon } from '@/components/common/Icon';

export const PurposeSection: React.FC = () => {
  const { language } = useLanguage();
  const purpose = interfaceContent.purpose;
  const t = purpose[language];

  return (
    <section
      id={purpose.id}
      aria-labelledby="purpose-heading"
      className="py-20 md:py-28 border-b border-line bg-paper"
    >
      <div className="container-editorial">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-line text-xs font-mono tracking-widest uppercase text-ink-muted">
          <div className="flex items-center gap-3">
            <span className="text-signal font-semibold">[{purpose.sectionNumber}]</span>
            <span>{t.eyebrow}</span>
          </div>
          <span>{purpose.metadata}</span>
        </div>

        {/* Editorial Layout with Image & Context */}
        <div className="pt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 text-xs font-mono uppercase bg-mint/50 text-mint-dark border border-mint rounded mb-4">
                <span>{t.imageCategory}</span>
              </div>

              <h2 id="purpose-heading" className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-ink leading-tight">
                <span>{t.title} </span>
                <span className="italic text-cobalt">{t.titleAccent}</span>
              </h2>

              <p className="mt-6 text-lg text-ink-soft leading-relaxed font-light">
                {t.summary}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-line">
              <a
                href={purpose.articleHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-semibold text-cobalt hover:text-ink transition-colors min-h-[44px]"
                aria-label={`${t.action} — ${purpose.articleHref} (abre em nova aba)`}
              >
                <span>{t.action}</span>
                <Icon name={purpose.actionIcon} size={16} />
              </a>
            </div>
          </div>

          {/* Media Column */}
          <div className="lg:col-span-7">
            <figure className="m-0 p-3 bg-paper-light border border-line rounded shadow-sm">
              <div className="overflow-hidden rounded bg-paper-muted aspect-[16/9]">
                <img
                  src={purpose.media.src}
                  srcSet={purpose.media.srcSet}
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  alt={t.imageAlt}
                  width={purpose.media.width}
                  height={purpose.media.height}
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-[1.015] transition-transform duration-500"
                />
              </div>
              <figcaption className="mt-3 flex items-center justify-between text-xs font-mono text-ink-muted">
                <span>{t.imageContext}</span>
                <span className="text-cobalt">UniFOA / 2026</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};
