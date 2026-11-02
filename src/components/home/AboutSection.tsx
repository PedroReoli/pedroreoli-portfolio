import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { interfaceContent, getLocalized } from '@/data/content';

export const AboutSection: React.FC = () => {
  const { language } = useLanguage();
  const about = interfaceContent.about;
  const t = about[language];

  return (
    <section
      id={about.id}
      aria-labelledby="about-heading"
      className="py-16 md:py-24 mx-3 sm:mx-6 lg:mx-8 my-3 sm:my-4 bg-paper-light/50 border border-line/80 rounded-2xl sm:rounded-3xl lg:rounded-[32px] overflow-hidden shadow-xs"
    >
      <div className="container-editorial">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-line text-xs font-mono tracking-widest uppercase text-ink-muted">
          <div className="flex items-center gap-3">
            <span className="text-signal font-semibold">[{about.sectionNumber}]</span>
            <span>{t.eyebrow}</span>
          </div>
          <span>{t.location}</span>
        </div>

        {/* Editorial Content Grid */}
        <div className="pt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Portrait Column */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <figure className="relative m-0 p-3 sm:p-4 bg-paper border border-line/80 rounded-xl sm:rounded-2xl shadow-xs">
              <div className="overflow-hidden rounded-lg sm:rounded-xl aspect-square bg-paper-muted">
                <img
                  src={about.portrait.src}
                  alt={t.portraitAlt}
                  width={about.portrait.width}
                  height={about.portrait.height}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale contrast-105 hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <figcaption className="mt-3 flex items-center justify-between text-xs font-mono text-ink-muted">
                <span>{about.portrait.name}</span>
                <span className="text-cobalt font-semibold">{t.portraitRole}</span>
              </figcaption>
            </figure>
          </div>

          {/* Text & Stats Column */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-paper border border-line/80 text-xs font-mono uppercase tracking-wider text-cobalt font-semibold mb-3 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-cobalt" />
              <span>{t.areas}</span>
            </div>

            <h2 id="about-heading" className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-ink leading-tight">
              {t.title}
            </h2>

            <p className="mt-6 text-lg sm:text-xl text-ink-soft leading-relaxed font-light">
              {t.summary}
            </p>

            {/* Editorial Stats - Designed as document citations, not generic dashboard cards */}
            <div className="mt-12 pt-8 border-t border-line">
              <h3 className="sr-only">{t.statsLabel}</h3>
              <dl className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-0 m-0">
                {about.stats.map((stat) => (
                  <div key={stat.value} className="flex flex-col border-l-2 border-line pl-4">
                    <dt className="order-2 mt-1 text-xs font-mono uppercase text-ink-muted leading-tight">
                      {getLocalized(stat, language)}
                    </dt>
                    <dd className="order-1 m-0 font-display text-3xl sm:text-4xl text-ink font-semibold">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
