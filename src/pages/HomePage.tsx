import { SEO } from '@/components/common/SEO'
import { HeroSection } from '@/components/home/HeroSection'
import { AboutSection } from '@/components/home/AboutSection'
import { SelectedProjectsSection } from '@/components/home/SelectedProjectsSection'
import { StackSection } from '@/components/home/StackSection'
import { PurposeSection } from '@/components/home/PurposeSection'
import { ExperienceSection } from '@/components/home/ExperienceSection'
import { TechnicalProductionSection } from '@/components/home/TechnicalProductionSection'

export function HomePage() {
  return (
    <div className="home">
      <SEO pageKey="home" />
      <HeroSection />
      <AboutSection />
      <SelectedProjectsSection />
      <StackSection />
      <PurposeSection />
      <ExperienceSection />
      <TechnicalProductionSection />
    </div>
  )
}
