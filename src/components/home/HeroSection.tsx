import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { interfaceContent, siteContent } from '@/data/content';
import { Icon } from '@/components/common/Icon';

export const HeroSection: React.FC = () => {
  const { language } = useLanguage();
  const hero = interfaceContent.hero;
  const t = hero[language];

  return (
    <section
      id={hero.id}
      aria-labelledby="hero-title"
      className="relative pt-12 pb-20 md:pt-20 md:pb-28 mx-3 sm:mx-6 lg:mx-8 my-3 sm:my-4 bg-paper border border-line/80 rounded-2xl sm:rounded-3xl lg:rounded-[32px] overflow-hidden shadow-xs"
    >
      <div className="container-editorial">
        {/* Top Metadata Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-line text-xs font-mono tracking-widest uppercase text-ink-muted">
          <div className="flex items-center gap-3">
            <span className="text-signal font-semibold">[{hero.sectionNumber}]</span>
            <span>{t.eyebrow}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-mint-dark animate-pulse" aria-hidden="true" />
            <span>{hero.location}</span>
          </div>
        </div>

        {/* Asymmetrical Editorial Composition */}
        <div className="pt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Title & Role Column */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div>
              <div className="inline-block px-3.5 py-1 bg-paper-light border border-line/80 rounded-full text-xs font-mono tracking-wider uppercase text-ink-soft mb-6">
                {t.role}
              </div>

              <h1 id="hero-title" className="font-display text-5xl sm:text-7xl lg:text-8xl font-normal leading-[0.92] tracking-tight text-ink">
                <span>{hero.name.firstLine} </span>
                <span className="italic text-ink-soft">{hero.name.secondLine}</span>
              </h1>

              <p className="mt-8 text-lg sm:text-xl md:text-2xl text-ink-soft font-light leading-relaxed max-w-2xl">
                {language === 'pt' ? (
                  <>
                    Engenharia de software focada em <strong className="font-semibold text-ink">interfaces de alta densidade</strong>, arquiteturas distribuídas e <strong className="font-semibold text-ink">agentes de IA aplicados</strong> a produtos reais.
                  </>
                ) : (
                  <>
                    Software engineering focused on <strong className="font-semibold text-ink">high-density interfaces</strong>, distributed systems, and <strong className="font-semibold text-ink">applied AI agents</strong> for real-world products.
                  </>
                )}
              </p>
            </div>

            {/* CTAs & Quick Route */}
            <div className="mt-12 flex flex-wrap items-center gap-4">
              <a
                href={hero.actionHref}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-signal hover:bg-signal-hover text-white text-xs uppercase font-mono tracking-widest font-semibold rounded-lg shadow-xs hover:shadow transition-all min-h-[44px]"
              >
                <span>{t.action}</span>
                <Icon name={hero.actionIcon} size={16} />
              </a>

              <a
                href={`mailto:${siteContent.email}`}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-paper-light hover:bg-paper-muted border border-line text-ink text-xs uppercase font-mono tracking-wider font-semibold rounded-lg transition-colors min-h-[44px]"
              >
                <span>{siteContent.email}</span>
              </a>
            </div>
          </div>

          {/* Side Editorial Capsule / Specimen */}
          <div className="lg:col-span-4 flex flex-col gap-6 pt-4 lg:pt-0 lg:border-l lg:border-line lg:pl-10">
            <div className="p-6 bg-paper-light border border-line/80 rounded-xl sm:rounded-2xl shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-line-subtle text-xs font-mono uppercase text-ink-muted">
                <span>{language === 'pt' ? 'Atuação' : 'Focus Areas'}</span>
                <span className="text-cobalt font-semibold">2026</span>
              </div>
              <ul className="mt-4 space-y-2.5 text-sm text-ink-soft list-none p-0 m-0">
                <li className="flex items-start gap-2">
                  <span className="text-signal mt-1 font-mono text-xs">01.</span>
                  <span><strong>Frontend & Design Systems</strong>: React, Next.js, TypeScript.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cobalt mt-1 font-mono text-xs">02.</span>
                  <span><strong>Back-end & Cloud</strong>: Node.js, NestJS, AWS, PostgreSQL.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-mint-dark mt-1 font-mono text-xs">03.</span>
                  <span><strong>Sistemas Autônomos</strong>: Model Context Protocol & CDP Agents.</span>
                </li>
              </ul>
            </div>

            <div className="p-5 bg-paper-muted/60 border border-line/80 rounded-xl sm:rounded-2xl flex items-center justify-between text-xs font-mono text-ink-soft">
              <div>
                <span className="block text-ink font-semibold">{siteContent.legalName}</span>
                <span className="text-ink-muted">{siteContent.profile.address.locality}, {siteContent.profile.address.region}</span>
              </div>
              <div className="w-8 h-8 rounded-full border border-line flex items-center justify-center bg-paper-light">
                <Icon name="check" size={14} className="text-mint-dark" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
