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
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {/* Space background component */}
      <SpaceBackground />

      {/* Content sections with parallax effect */}
      <div className="relative z-10">
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
          <Suspense fallback={<div>Carregando...</div>}>
            <BlogSection />
          </Suspense>
        </LazySection>

        <LazySection parallaxFactor={0.15}>
          <Suspense fallback={<div>Carregando...</div>}>
            <FAQ />
          </Suspense>
        </LazySection>

        <LazySection parallaxFactor={0.1}>
          <Suspense fallback={<div>Carregando...</div>}>
            <End />
          </Suspense>
        </LazySection>
      </div>
    </div>
  )
}

export default MainPage

