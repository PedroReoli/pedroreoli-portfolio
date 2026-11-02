import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useRouter } from '@/context/RouterContext';
import { interfaceContent, projectsContent, getLocalized } from '@/data/content';
import { SEO } from '@/components/common/SEO';
import { Icon } from '@/components/common/Icon';
import { ProjectViewerModal } from '@/components/projects/ProjectViewerModal';

export const ProjectsPage: React.FC = () => {
  const { language } = useLanguage();
  const { searchParams, setSearchParam } = useRouter();

  // Active category filter: 'corporativo' or 'gerais'
  const currentTipo = searchParams.get('tipo');
  const [activeCategory, setActiveCategory] = useState<'corporativo' | 'gerais'>(
    currentTipo === 'gerais' ? 'gerais' : 'corporativo'
  );

  // Sync state if URL search param changes
  useEffect(() => {
    if (currentTipo === 'gerais' || currentTipo === 'corporativo') {
      setActiveCategory(currentTipo);
    }
  }, [currentTipo]);

  const handleSelectCategory = (catId: 'corporativo' | 'gerais') => {
    setActiveCategory(catId);
    setSearchParam('tipo', catId);
  };

  // Lightbox Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  const openModal = (index: number) => {
    setModalImageIndex(index);
    setModalOpen(true);
  };

  const tPage = interfaceContent.projectsPage[language];
  const tCategories = interfaceContent.projectCategories;
  const corp = interfaceContent.corporateProjects;
  const tCorp = corp[language];
  const indep = interfaceContent.independentProjects;
  const tIndep = indep[language];

  const corporateImages = projectsContent.corporateProjectImages;
  const independentProjects = projectsContent.independentProjects;

  return (
    <div className="py-12 md:py-20">
      <SEO pageKey="projects" />

      <div className="container-editorial">
        {/* Header Title */}
        <div className="pb-8 border-b border-line flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-signal font-semibold">
              {tPage.eyebrow}
            </span>
            <h1 className="mt-2 font-display text-4xl sm:text-6xl md:text-7xl font-normal text-ink">
              {tPage.title}
            </h1>
          </div>
          <p className="text-base text-ink-soft max-w-md font-light">
            {tPage.description}
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="py-8 flex items-center justify-between flex-wrap gap-4 border-b border-line">
          <div className="flex items-center gap-2" role="tablist" aria-label={getLocalized(tCategories.label, language)}>
            {tCategories.items.map((item) => {
              const isSelected = activeCategory === item.id;
              const label = getLocalized(item.label, language);
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleSelectCategory(item.id as 'corporativo' | 'gerais')}
                  className={`px-5 py-2.5 text-xs font-mono uppercase tracking-wider rounded border transition-all min-h-[44px] ${
                    isSelected
                      ? 'bg-ink text-paper-light border-ink font-semibold shadow-sm'
                      : 'bg-paper-light text-ink-soft border-line hover:border-ink/40 hover:text-ink'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <span className="text-xs font-mono text-ink-muted">
            {activeCategory === 'corporativo'
              ? `${corporateImages.length} ${language === 'pt' ? 'telas corporativas' : 'enterprise views'}`
              : `${independentProjects.length} ${language === 'pt' ? 'ferramentas' : 'tools'}`}
          </span>
        </div>

        {/* Corporate Projects Section */}
        {activeCategory === 'corporativo' && (
          <section aria-labelledby="corporate-title" className="py-12 animate-fadeIn">
            <div className="p-8 bg-paper-light border border-line rounded-lg mb-12">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-line text-xs font-mono text-ink-muted uppercase">
                <span className="text-signal font-semibold">{tCorp.category}</span>
                <span>{corp.period}</span>
              </div>
              <h2 id="corporate-title" className="mt-4 font-display text-3xl sm:text-4xl text-ink">
                {corp.title}
              </h2>
              <p className="mt-2 text-base text-ink-soft font-light max-w-2xl">
                {tCorp.description}
              </p>
            </div>

            {/* Asymmetrical Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {corporateImages.map((item, index) => {
                const altText = getLocalized(item.alt, language);
                const isWide = item.wide;

                return (
                  <div
                    key={item.src}
                    className={`group bg-paper-light border border-line rounded-lg overflow-hidden shadow-2xs hover:shadow-md transition-shadow ${
                      isWide ? 'md:col-span-2' : ''
                    }`}
                  >
                    <div className="relative overflow-hidden bg-paper-muted aspect-[16/10]">
                      <img
                        src={item.src}
                        srcSet={item.srcSet}
                        sizes={isWide ? '100vw' : '(max-width: 768px) 100vw, 50vw'}
                        alt={altText}
                        loading="lazy"
                        className="w-full h-full object-cover transform group-hover:scale-[1.015] transition-transform duration-500"
                      />
                      <button
                        type="button"
                        onClick={() => openModal(index)}
                        className="absolute bottom-4 right-4 p-3 bg-ink/80 hover:bg-ink text-paper-light rounded-full backdrop-blur-sm shadow-md transition-all flex items-center justify-center min-w-[44px] min-h-[44px]"
                        aria-label={`${tCorp.galleryAction}: ${altText}`}
                      >
                        <Icon name={corp.galleryIcon} size={16} />
                      </button>
                    </div>

                    <div className="p-4 sm:p-5 flex items-center justify-between border-t border-line text-xs font-mono">
                      <span className="text-ink font-medium">{altText}</span>
                      <button
                        type="button"
                        onClick={() => openModal(index)}
                        className="text-cobalt hover:text-ink font-semibold flex items-center gap-1 min-h-[44px]"
                      >
                        <span>{tCorp.galleryAction}</span>
                        <Icon name="arrow-up-right" size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Independent Projects Section */}
        {activeCategory === 'gerais' && (
          <section aria-labelledby="independent-title" className="py-12 animate-fadeIn">
            <div className="p-8 bg-paper-light border border-line rounded-lg mb-12">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-line text-xs font-mono text-ink-muted uppercase">
                <span className="text-signal font-semibold">{tIndep.sectionLabel}</span>
                <span>Open Source &amp; Tools</span>
              </div>
              <h2 id="independent-title" className="mt-4 font-display text-3xl sm:text-4xl text-ink">
                {tIndep.title}
              </h2>
              <p className="mt-2 text-base text-ink-soft font-light max-w-2xl">
                {tIndep.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {independentProjects.map((item) => {
                const title = item.title;
                const cat = getLocalized(item.category, language);
                const desc = getLocalized(item.description, language);

                return (
                  <article
                    key={item.number}
                    className="group flex flex-col justify-between p-8 bg-paper-light border border-line rounded-lg shadow-2xs hover:border-signal/50 hover:shadow-md transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-line text-xs font-mono text-ink-muted uppercase">
                        <span className="text-signal font-semibold">[{item.number}]</span>
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
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-semibold text-cobalt hover:text-ink transition-colors min-h-[44px]"
                        aria-label={`${title} - ${tIndep.externalLabel}`}
                      >
                        <span>GitHub</span>
                        <Icon name={item.icon} size={14} />
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </div>

      {/* Accessible Expanded Viewer Lightbox */}
      <ProjectViewerModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        images={corporateImages}
        currentIndex={modalImageIndex}
        onSelectIndex={(idx) => setModalImageIndex(idx)}
      />
    </div>
  );
};
