import { useRef } from 'react'
import { SEO } from '@/components/common/SEO'
import { VideoStage } from '@/components/scene/VideoStage'
import { HeroSection } from '@/components/home/HeroSection'
import { AboutSection } from '@/components/home/AboutSection'
import { SelectedProjectsSection } from '@/components/home/SelectedProjectsSection'
import { StackSection } from '@/components/home/StackSection'
import { PurposeSection } from '@/components/home/PurposeSection'
import { ExperienceSection } from '@/components/home/ExperienceSection'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function HomePage() {
  const rootRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  return (
    <div ref={rootRef} className="home" data-reduced-motion={reducedMotion ? 'true' : 'false'}>
      <SEO pageKey="home" />
      <VideoStage />
      <HeroSection />
      <AboutSection />
      <SelectedProjectsSection />
      <StackSection />
      <PurposeSection />
      <ExperienceSection />
    </div>
  )
}
