import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { interfaceContent, technologyContent, getLocalized } from '@/data/content';
import { Icon } from '@/components/common/Icon';

export const StackSection: React.FC = () => {
  const { language } = useLanguage();
  const stack = interfaceContent.stack;
  const t = stack[language];
  const groups = technologyContent.groups;

  return (
    <section
      id={stack.id}
      aria-labelledby="stack-heading"
      className="py-16 md:py-24 mx-3 sm:mx-6 lg:mx-8 my-3 sm:my-4 bg-paper-light/40 border border-line/80 rounded-2xl sm:rounded-3xl lg:rounded-[32px] overflow-hidden shadow-xs"
    >
      <div className="container-editorial">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-line text-xs font-mono tracking-widest uppercase text-ink-muted">
          <div className="flex items-center gap-3">
            <span className="text-signal font-semibold">[{stack.sectionNumber}]</span>
            <span>{t.eyebrow}</span>
          </div>
          <span>Engineering &amp; Architecture Toolkit</span>
        </div>

        {/* Section Title & Thesis */}
        <div className="pt-8 pb-12 max-w-2xl">
          <h2 id="stack-heading" className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-ink leading-tight">
            <span>{t.title} </span>
            <span className="italic underline underline-offset-8 decoration-cobalt/40">{stack.titleAccent}</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-ink-soft leading-relaxed font-light">
            {t.description}
          </p>
        </div>

        {/* Index of Materials / Capability Map */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {groups.map((group) => {
            const groupTitle = getLocalized(group.title, language);
            return (
              <div
                key={group.number}
                className="flex flex-col bg-paper border border-line/80 rounded-xl sm:rounded-2xl p-6 shadow-xs hover:border-ink/30 hover:shadow-sm transition-all duration-300"
              >
                <div className="flex items-center justify-between pb-4 border-b border-line text-xs font-mono text-ink-muted uppercase">
                  <span className="text-signal font-semibold">[{group.number}]</span>
                  <span className="font-semibold text-ink">{groupTitle}</span>
                </div>

                <ul className="mt-4 space-y-3 list-none p-0 m-0">
                  {group.tools.map((tool) => (
                    <li
                      key={tool.name}
                      className="group flex items-center justify-between p-2 rounded-lg hover:bg-paper-light transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="flex items-center justify-center w-7 h-7 rounded-lg border border-line bg-white/70 shadow-2xs group-hover:scale-105 transition-transform"
                          style={{ color: tool.color }}
                        >
                          <Icon name={tool.icon} image={tool.image} size={16} />
                        </span>
                        <span className="text-sm font-medium text-ink group-hover:text-cobalt transition-colors">
                          {tool.name}
                        </span>
                      </div>
                      <span
                        className="w-1.5 h-1.5 rounded-full opacity-30 group-hover:opacity-100 transition-opacity"
                        style={{ backgroundColor: tool.color }}
                        aria-hidden="true"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
