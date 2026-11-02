import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useRouter } from '@/context/RouterContext';
import { interfaceContent, homeContent, getLocalized } from '@/data/content';
import { Icon } from '@/components/common/Icon';
import type { FeaturedProjectImage, FeaturedProjectAgent } from '@/types/content';

export const SelectedProjectsSection: React.FC = () => {
  const { language } = useLanguage();
  const { navigate } = useRouter();
  const sec = interfaceContent.selectedProjects;
  const t = sec[language];
  const projects = homeContent.featuredProjects;

  const handleLinkClick = (href: string, external: boolean | undefined, e: React.MouseEvent) => {
    if (external || href.startsWith('http')) return;
    e.preventDefault();
    navigate(href);
  };

  return (
    <section
      id={sec.id}
      aria-labelledby="projects-heading"
      className="py-16 md:py-24 mx-3 sm:mx-6 lg:mx-8 my-3 sm:my-4 bg-paper border border-line/80 rounded-2xl sm:rounded-3xl lg:rounded-[32px] overflow-hidden shadow-xs"
    >
      <div className="container-editorial">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-line text-xs font-mono tracking-widest uppercase text-ink-muted">
          <div className="flex items-center gap-3">
            <span className="text-signal font-semibold">[{sec.sectionNumber}]</span>
            <span>{t.eyebrow}</span>
          </div>
          <a
            href={sec.morePath}
            onClick={(e) => handleLinkClick(sec.morePath, false, e)}
            className="flex items-center gap-1.5 text-cobalt hover:text-ink font-semibold transition-colors"
          >
            <span>{t.moreAction}</span>
            <Icon name="arrow-up-right" size={14} />
          </a>
        </div>

        <div className="pt-8 pb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h2 id="projects-heading" className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-ink">
            {t.title}
          </h2>
          <p className="text-sm font-mono text-ink-muted uppercase tracking-wider">
            {language === 'pt' ? 'Casos corporativos & Sistemas autônomos' : 'Enterprise cases & Autonomous systems'}
          </p>
        </div>

        {/* Custom Layout for Each Project */}
        <div className="space-y-16">
          {projects.map((project) => {
            if (project.visual === 'image') {
              const p = project as FeaturedProjectImage;
              return (
                <article
                  key={p.number}
                  className="group bg-paper-light border border-line/80 rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 lg:p-10">
                    {/* Media Column (Protagonist) */}
                    <div className="lg:col-span-7 order-2 lg:order-1">
                      <a
                        href={p.href}
                        onClick={(e) => handleLinkClick(p.href, p.external, e)}
                        className="block overflow-hidden rounded-lg sm:rounded-xl border border-line bg-ink/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt"
                        tabIndex={-1}
                        aria-hidden="true"
                      >
                        <img
                          src={p.image}
                          srcSet={p.imageSrcSet}
                          sizes="(max-width: 1024px) 100vw, 55vw"
                          alt={getLocalized(p.imageAlt, language)}
                          width={1440}
                          height={810}
                          loading="lazy"
                          className="w-full h-auto object-cover transform group-hover:scale-[1.015] transition-transform duration-500"
                        />
                      </a>
                    </div>

                    {/* Metadata & Description Column */}
                    <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between pb-3 border-b border-line text-xs font-mono text-ink-muted uppercase">
                          <span className="text-signal font-semibold">[{p.number}]</span>
                          <span>{getLocalized(p.category, language)}</span>
                          <span>{p.year}</span>
                        </div>

                        <h3 className="mt-4 font-display text-3xl sm:text-4xl text-ink">
                          {p.title}
                        </h3>

                        <p className="mt-3 text-base text-ink-soft leading-relaxed font-light">
                          {getLocalized(p.description, language)}
                        </p>

                        <div className="mt-6 flex flex-wrap gap-2">
                          {p.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 text-xs font-mono bg-paper border border-line/80 text-ink-soft rounded-full hover:border-cobalt transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-8 pt-6 border-t border-line">
                        <a
                          href={p.href}
                          onClick={(e) => handleLinkClick(p.href, p.external, e)}
                          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-semibold text-signal hover:text-signal-hover transition-colors min-h-[44px]"
                        >
                          <span>{getLocalized(p.action, language)}</span>
                          <Icon name={p.actionIcon} size={16} />
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              );
            }

            if (project.visual === 'agent') {
              const p = project as FeaturedProjectAgent;
              return (
                <article
                  key={p.number}
                  className="group bg-paper-light border border-line/80 rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 lg:p-10">
                    {/* Visual Agent Diagram Column */}
                    <div className="lg:col-span-7 order-2 lg:order-1">
                      <div className="p-8 sm:p-10 bg-ink text-paper rounded-xl sm:rounded-2xl border border-ink/20 flex flex-col justify-between shadow-inner">
                        <div className="flex items-center justify-between pb-6 border-b border-paper/15 text-xs font-mono uppercase text-paper/70">
                          <span className="text-signal font-semibold">{getLocalized(p.artwork.kicker, language)}</span>
                          <span>{p.artwork.subtitle}</span>
                        </div>

                        {/* Interactive Agent Process Architecture */}
                        <div className="py-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {p.artwork.steps.map((st) => (
                            <div
                              key={st.number}
                              className={`p-4 rounded-lg sm:rounded-xl border text-center transition-all ${
                                st.accent
                                  ? 'bg-signal/20 border-signal text-paper font-semibold'
                                  : 'bg-paper/5 border-paper/15 text-paper/90'
                              }`}
                            >
                              <span className="block text-xs font-mono text-paper/50 mb-1">
                                {st.number}
                              </span>
                              <span className="text-sm font-mono tracking-wider">
                                {getLocalized(st.label, language)}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="pt-4 border-t border-paper/15 flex items-center justify-between text-xs font-mono text-paper/60">
                          <span>Chrome DevTools Protocol (CDP)</span>
                          <span className="text-signal">Deterministic Automation</span>
                        </div>
                      </div>
                    </div>

                    {/* Metadata Column */}
                    <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between pb-3 border-b border-line text-xs font-mono text-ink-muted uppercase">
                          <span className="text-signal font-semibold">[{p.number}]</span>
                          <span>{getLocalized(p.category, language)}</span>
                          <span>{p.year}</span>
                        </div>

                        <h3 className="mt-4 font-display text-3xl sm:text-4xl text-ink">
                          {p.title}
                        </h3>

                        <p className="mt-3 text-base text-ink-soft leading-relaxed font-light">
                          {getLocalized(p.description, language)}
                        </p>

                        <div className="mt-6 flex flex-wrap gap-2">
                          {p.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 text-xs font-mono bg-paper border border-line/80 text-ink-soft rounded-full hover:border-cobalt transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-8 pt-6 border-t border-line">
                        <a
                          href={p.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-semibold text-cobalt hover:text-cobalt-hover transition-colors min-h-[44px]"
                          aria-label={`${getLocalized(p.action, language)} (abre em nova aba)`}
                        >
                          <span>{getLocalized(p.action, language)}</span>
                          <Icon name={p.actionIcon} size={16} />
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              );
            }

            return null;
          })}
        </div>
      </div>
    </section>
  );
};
