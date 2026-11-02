import React from 'react';
import { SEO } from '@/components/common/SEO';
import { HeroSection } from '@/components/home/HeroSection';
import { AboutSection } from '@/components/home/AboutSection';
import { SelectedProjectsSection } from '@/components/home/SelectedProjectsSection';
import { StackSection } from '@/components/home/StackSection';
import { PurposeSection } from '@/components/home/PurposeSection';
import { ExperienceSection } from '@/components/home/ExperienceSection';
import { Icon } from '@/components/common/Icon';
import { useLanguage } from '@/context/LanguageContext';

interface SectionBridgeProps {
  labelPt: string;
  labelEn: string;
}

const SectionBridge: React.FC<SectionBridgeProps> = ({ labelPt, labelEn }) => {
  const { language } = useLanguage();
  return (
    <div className="flex items-center justify-center -my-3 sm:-my-4 relative z-20 pointer-events-none" aria-hidden="true">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-paper border border-line/80 shadow-xs text-[11px] font-mono uppercase tracking-wider text-ink-muted backdrop-blur-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse" />
        <span>{language === 'pt' ? labelPt : labelEn}</span>
        <Icon name="arrow-down" size={12} className="text-ink-muted/80" />
      </div>
    </div>
  );
};

export const HomePage: React.FC = () => {
  return (
    <div className="relative space-y-2 sm:space-y-4 pb-12 sm:pb-16">
      <SEO pageKey="home" />

      {/* 01. Hero Section */}
      <HeroSection />

      {/* Inter-Section Fluid Transition Connector: 01 -> 02 */}
      <SectionBridge labelPt="02 // Sobre Mim" labelEn="02 // About Me" />

      {/* 02. About Section */}
      <AboutSection />

      {/* Inter-Section Fluid Transition Connector: 02 -> 03 */}
      <SectionBridge labelPt="03 // Projetos Selecionados" labelEn="03 // Selected Projects" />

      {/* 03. Selected Projects Section */}
      <SelectedProjectsSection />

      {/* Inter-Section Fluid Transition Connector: 03 -> 04 */}
      <SectionBridge labelPt="04 // Ferramentas & Stack" labelEn="04 // Tools & Stack" />

      {/* 04. Stack Section */}
      <StackSection />

      {/* Inter-Section Fluid Transition Connector: 04 -> 05 */}
      <SectionBridge labelPt="05 // Tecnologia com Propósito" labelEn="05 // Purpose & Impact" />

      {/* 05. Purpose Section */}
      <div className="mx-3 sm:mx-6 lg:mx-8 my-3 sm:my-4 rounded-2xl sm:rounded-3xl lg:rounded-[32px] overflow-hidden border border-line/80 shadow-xs bg-paper [&>section]:border-b-0 [&>section]:py-16 [&>section]:md:py-24">
        <PurposeSection />
      </div>

      {/* Inter-Section Fluid Transition Connector: 05 -> 06 */}
      <SectionBridge labelPt="06 // Trajetória Profissional" labelEn="06 // Career Trajectory" />

      {/* 06. Experience Section */}
      <ExperienceSection />
    </div>
  );
};
