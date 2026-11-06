import { useRef } from 'react'
import { SEO } from '@/components/common/SEO'
import { sceneClips } from '@/data/content'
import { FilmSlide } from '@/components/scene/FilmSlide'
import { HeroSection } from '@/components/home/HeroSection'
import { AboutSection } from '@/components/home/AboutSection'
import { SelectedProjectsSection } from '@/components/home/SelectedProjectsSection'
import { StackSection } from '@/components/home/StackSection'
import { PurposeSection } from '@/components/home/PurposeSection'
import { ExperienceSection } from '@/components/home/ExperienceSection'
import { Footer } from '@/components/layout/Footer'

/** Uma seção por slide, na mesma ordem dos clipes: o frame debaixo acompanha o texto. */
const SECTIONS = [
  HeroSection,
  AboutSection,
  SelectedProjectsSection,
  StackSection,
  PurposeSection,
  ExperienceSection,
] as const


export function HomePage() {
  const rootRef = useRef<HTMLDivElement>(null)
  return (
    <div ref={rootRef} className="home">
      <SEO pageKey="home" />

      {/* A fita: uma tela de rolagem por slide. Fica presa atrás do texto. */}
      <div className="film-track">
        {sceneClips.clips.map((clip, index) => (
          <FilmSlide key={clip.id} clip={clip} index={index} />
        ))}
      </div>

      {/* Os textos entram por cima, cada um no seu trecho da fita. */}
      <div className="film-content">
        {SECTIONS.map((Section, index) => (
          <div key={index} className="film-panel" data-film-panel={index}>
            <Section />
          </div>
        ))}
        <div className="film-panel" data-film-panel={SECTIONS.length}>
          <Footer embedded />
        </div>
      </div>
    </div>
  )
}
