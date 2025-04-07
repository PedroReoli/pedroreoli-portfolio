"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import Home from "./Home"
import About from "./About"
import Timeline from "./Timeline"
import Projects from "./Projects"
import Services from "./Services"
import Skills from "./Skills"
import BlogSection from "./BlogSection"
import FAQ from "./FAQ"
import End from "./End"
import Background from "./Background"
import LazySection from "@/components/LazySection"

// Tradução das seções para português
const sectionLabels = {
  home: "Início",
  about: "Sobre Mim",
  timeline: "Experiência",
  projects: "Projetos",
  services: "Serviços",
  skills: "Habilidades",
  blog: "Blog",
  faq: "FAQ",
  end: "Contato",
}

const MainPage = () => {
  const [activeSection, setActiveSection] = useState<string>("home")
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({
    home: null,
    about: null,
    timeline: null,
    projects: null,
    services: null,
    skills: null,
    blog: null,
    faq: null,
    end: null,
  })

  // Scroll progress indicator
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 50 // Pequeno offset para melhor detecção

      // Find the current active section
      Object.entries(sectionsRef.current).forEach(([section, ref]) => {
        if (!ref) return

        const offsetTop = ref.offsetTop
        const offsetHeight = ref.offsetHeight

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section)
        }
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initialize on mount

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll to section function
  const scrollToSection = (section: string) => {
    const ref = sectionsRef.current[section]
    if (ref) {
      window.scrollTo({
        top: ref.offsetTop,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="relative w-full">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <Background />
      </div>

      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#60A5FA] z-50"
        style={{ scaleX, transformOrigin: "0%" }}
      />

      {/* Navigation dots - Traduzidos para português */}
      <div className="fixed right-4 xxs:right-5 sm:right-6 md:right-8 top-1/2 transform -translate-y-1/2 z-40 hidden md:block">
        <div className="flex flex-col items-center space-y-4">
          {Object.keys(sectionsRef.current).map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className="group relative flex items-center"
              aria-label={`Rolar para a seção ${sectionLabels[section as keyof typeof sectionLabels]}`}
            >
              <span
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeSection === section ? "bg-[#60A5FA] w-3 h-3" : "bg-white/30 group-hover:bg-white/60"
                }`}
              />
              <span
                className={`absolute right-full mr-2 px-2 py-1 rounded text-xs font-medium whitespace-nowrap transition-all duration-300 ${
                  activeSection === section
                    ? "opacity-100 translate-x-0 bg-[#60A5FA]/10 text-[#60A5FA]"
                    : "opacity-0 translate-x-2 bg-[#0F172A]/80 text-white/70"
                } group-hover:opacity-100 group-hover:translate-x-0`}
              >
                {sectionLabels[section as keyof typeof sectionLabels]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Content sections */}
      <div className="relative z-10">
        {/* Home Section - Ajustado para ficar no topo absoluto */}
        <section
          ref={(el) => (sectionsRef.current.home = el)}
          id="home"
          className="min-h-screen w-full"
          style={{ marginTop: 0, paddingTop: 0 }}
        >
          <Home />
        </section>

        {/* About Section */}
        <section ref={(el) => (sectionsRef.current.about = el)} id="about" className="min-h-screen w-full">
          <LazySection threshold={0.05}>
            <About />
          </LazySection>
        </section>

        {/* Timeline Section */}
        <section ref={(el) => (sectionsRef.current.timeline = el)} id="timeline" className="min-h-screen w-full">
          <LazySection threshold={0.05}>
            <Timeline />
          </LazySection>
        </section>

        {/* Projects Section */}
        <section ref={(el) => (sectionsRef.current.projects = el)} id="projects" className="min-h-screen w-full">
          <LazySection threshold={0.05}>
            <Projects />
          </LazySection>
        </section>

        {/* Services Section */}
        <section ref={(el) => (sectionsRef.current.services = el)} id="services" className="min-h-screen w-full">
          <LazySection threshold={0.05}>
            <Services />
          </LazySection>
        </section>

        {/* Skills Section */}
        <section ref={(el) => (sectionsRef.current.skills = el)} id="skills" className="min-h-screen w-full">
          <LazySection threshold={0.05}>
            <Skills />
          </LazySection>
        </section>

        {/* Blog Section */}
        <section ref={(el) => (sectionsRef.current.blog = el)} id="blog" className="min-h-screen w-full">
          <LazySection threshold={0.05}>
            <BlogSection />
          </LazySection>
        </section>

        {/* FAQ Section */}
        <section ref={(el) => (sectionsRef.current.faq = el)} id="faq" className="min-h-screen w-full">
          <LazySection threshold={0.05}>
            <FAQ />
          </LazySection>
        </section>

        {/* End Section */}
        <section ref={(el) => (sectionsRef.current.end = el)} id="end" className="min-h-screen w-full">
          <LazySection threshold={0.05}>
            <End />
          </LazySection>
        </section>
      </div>
    </div>
  )
}

export default MainPage

