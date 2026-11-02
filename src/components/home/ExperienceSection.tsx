import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { interfaceContent, homeContent, getLocalized } from '@/data/content';
import { Icon } from '@/components/common/Icon';

export const ExperienceSection: React.FC = () => {
  const { language } = useLanguage();
  const experience = interfaceContent.experience;
  const t = experience[language];
  const items = homeContent.experienceItems;

  return (
    <section
      id={experience.id}
      aria-labelledby="experience-heading"
      className="py-16 md:py-24 mx-3 sm:mx-6 lg:mx-8 my-4 bg-paper-light/40 border border-line/80 rounded-2xl sm:rounded-3xl lg:rounded-[32px] overflow-hidden shadow-sm"
    >
      <div className="container-editorial">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-line text-xs font-mono tracking-widest uppercase text-ink-muted">
          <div className="flex items-center gap-3">
            <span className="text-signal font-semibold">[{experience.sectionNumber}]</span>
            <span>{t.eyebrow}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-signal animate-pulse" aria-hidden="true" />
            <span>{language === 'pt' ? 'Storytelling Contínuo' : 'Chronological Narrative'}</span>
          </div>
        </div>

        {/* Section Title & Intro */}
        <div className="pt-8 pb-14 max-w-3xl">
          <h2 id="experience-heading" className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-ink">
            {t.title}
          </h2>
          <p className="mt-3 text-sm font-mono text-ink-muted uppercase tracking-wider flex items-center gap-2">
            <Icon name="arrow-down" size={14} className="text-signal" />
            <span>{t.chaptersLabel}</span>
          </p>
          <p className="mt-4 text-base sm:text-lg text-ink-soft font-light leading-relaxed">
            {language === 'pt'
              ? 'Uma linha temporal de evolução técnica: da fundação em bancos de dados e interfaces corporativas à arquitetura distribuída e produtos SaaS orientados a IA.'
              : 'A continuous timeline of technical growth: from database foundations and enterprise dashboards to distributed architecture and AI-driven SaaS.'}
          </p>
        </div>

        {/* Storytelling Timeline Track with Interconnected Nodes */}
        <div className="relative ml-3 sm:ml-8 md:ml-12 pl-6 sm:pl-10 md:pl-14 border-l-2 border-line">
          {/* Continuous Vertical Gradient Progress Rail */}
          <div
            className="absolute -left-[2px] top-6 bottom-10 w-[2px] bg-gradient-to-b from-signal via-cobalt to-line pointer-events-none"
            aria-hidden="true"
          />

          <div className="space-y-12 sm:space-y-16">
            {items.map((item, index) => {
              const role = getLocalized(item.role, language);
              const period = getLocalized(item.period, language);
              const description = getLocalized(item.description, language);
              const highlights = language === 'en' ? item.highlights.en : item.highlights.pt;
              const isCurrent = period.toLowerCase().includes('presente') || period.toLowerCase().includes('present');

              return (
                <div key={`${item.company}-${index}`} className="relative group">
                  {/* Glowing Milestone Node */}
                  <div
                    className="absolute -left-6 sm:-left-10 md:-left-14 top-7 sm:top-9 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <div
                      className={`relative w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-paper border-2 ${
                        isCurrent ? 'border-signal' : 'border-line'
                      } flex items-center justify-center shadow-sm group-hover:border-signal transition-colors`}
                    >
                      {isCurrent && (
                        <span className="absolute -inset-1 rounded-full bg-signal/25 animate-ping" />
                      )}
                      <span
                        className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${
                          isCurrent ? 'bg-signal' : 'bg-line-strong group-hover:bg-signal'
                        } transition-colors`}
                      />
                    </div>
                  </div>

                  {/* Horizontal Connector Arm */}
                  <div
                    className="absolute -left-6 sm:-left-10 md:-left-14 top-7 sm:top-9 -translate-y-1/2 w-6 sm:w-10 md:w-14 h-[2px] bg-line group-hover:bg-signal/50 transition-colors"
                    aria-hidden="true"
                  />

                  {/* Narrative Chapter Card */}
                  <article className="p-5 sm:p-8 lg:p-10 bg-paper border border-line/80 rounded-2xl md:rounded-3xl shadow-sm group-hover:shadow-md group-hover:border-cobalt/40 transition-all duration-300">
                    {/* Chapter & Meta Row */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-line text-xs font-mono uppercase">
                      <div className="flex items-center gap-2.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-paper-light border border-line text-signal font-semibold">
                          {language === 'pt' ? `Capítulo 0${index + 1}` : `Chapter 0${index + 1}`}
                        </span>
                        <span className="font-semibold text-ink text-sm sm:text-base font-sans">{item.company}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {isCurrent && (
                          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 border border-emerald-500/30 text-[11px] font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span>{language === 'pt' ? 'Ativo' : 'Current'}</span>
                          </span>
                        )}
                        <span className="bg-paper-light px-2.5 py-1 border border-line rounded-full text-ink-muted">
                          {period}
                        </span>
                      </div>
                    </div>

                    {/* Role & Summary */}
                    <div className="mt-4">
                      <h3 className="font-display text-2xl sm:text-3xl text-ink font-normal">
                        {role}
                      </h3>
                      <p className="mt-2 text-base text-ink-soft leading-relaxed font-light max-w-3xl">
                        {description}
                      </p>
                    </div>

                    {/* Key Highlights */}
                    <div className="mt-6 pt-6 border-t border-line-subtle">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-ink-muted mb-3 flex items-center gap-2">
                        <span className="text-cobalt font-bold">#</span>
                        <span>{language === 'pt' ? 'Atuação & Entregas Chave' : 'Key Deliverables & Scope'}</span>
                      </h4>
                      <ul className="space-y-2.5 list-none p-0 m-0">
                        {highlights.map((highlight, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-3 text-sm text-ink-soft">
                            <span className="text-cobalt mt-0.5 shrink-0 font-mono text-sm font-bold">→</span>
                            <span className="leading-relaxed">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies Pills */}
                    <div className="mt-6 pt-4 border-t border-line-subtle flex flex-wrap gap-2">
                      {item.technologies.map((tech, tIdx) => {
                        const techName = typeof tech === 'string' ? tech : getLocalized(tech, language);
                        return (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 text-xs font-mono bg-paper-light border border-line text-ink-muted rounded-full hover:text-ink hover:border-cobalt transition-colors"
                          >
                            {techName}
                          </span>
                        );
                      })}
                    </div>
                  </article>
                </div>
              );
            })}
          </div>

          {/* Timeline Destination Anchor */}
          <div className="pt-10 flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-ink-muted">
            <span className="w-3 h-3 rounded-full bg-cobalt" />
            <span>
              {t.end} • {language === 'pt' ? 'Sistemas Autônomos & IA' : 'Autonomous Systems & AI'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
