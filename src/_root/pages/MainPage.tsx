"use client"

import { useRef, Suspense, lazy } from "react"
import LazySection from "@/components/LazySection"
import Home from "./Home"
import About from "./About"
import Projects from "./Projects"
import Services from "./Services"
import Skills from "./Skills"
import Timeline from "./Timeline"
import SpaceBackground from "./SpaceBackground"

const BlogSection = lazy(() => import("./BlogSection"))
const FAQ = lazy(() => import("./FAQ"))
const End = lazy(() => import("./End"))

const MainPage = () => {
  // Ref para o container principal - necessário para cálculos de scroll corretos
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    // Removido width: 100vw implícito e garantido que o container tem position: relative
    <div ref={containerRef} className="relative w-full h-full overflow-x-hidden">
      {/* Space background component */}
      <SpaceBackground />

      {/* Content sections with parallax effect */}
      <div className="relative z-10 max-w-full">
        <LazySection parallaxFactor={0.1}>
          <Home />
        </LazySection>

        <LazySection parallaxFactor={0.15}>
          <About />
        </LazySection>

        <LazySection parallaxFactor={0.2}>
          <Timeline />
        </LazySection>

        <LazySection parallaxFactor={0.15}>
          <Projects />
        </LazySection>

        <LazySection parallaxFactor={0.2}>
          <Services />
        </LazySection>

        <LazySection parallaxFactor={0.15}>
          <Skills />
        </LazySection>

        <LazySection parallaxFactor={0.2}>
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Carregando...</div>}>
            <BlogSection />
          </Suspense>
        </LazySection>

        <LazySection parallaxFactor={0.15}>
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Carregando...</div>}>
            <FAQ />
          </Suspense>
        </LazySection>

        <LazySection parallaxFactor={0.1}>
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Carregando...</div>}>
            <End />
          </Suspense>
        </LazySection>
      </div>
    </div>
  )
}

export default MainPage

