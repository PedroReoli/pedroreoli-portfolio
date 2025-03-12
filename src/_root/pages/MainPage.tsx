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
      const scrollPosition = window.scrollY + window.innerHeight / 3

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
    <div className="relative">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <Background />
      </div>

      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#60A5FA] z-50"
        style={{ scaleX, transformOrigin: "0%" }}
      />

      {/* Navigation dots */}
      <div className="fixed right-4 xxs:right-5 sm:right-6 md:right-8 top-1/2 transform -translate-y-1/2 z-40 hidden md:block">
        <div className="flex flex-col items-center space-y-4">
          {Object.keys(sectionsRef.current).map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className="group relative flex items-center"
              aria-label={`Scroll to ${section} section`}
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
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Content sections */}
      <div className="relative z-10">
        {/* Home Section */}
        <section ref={(el) => (sectionsRef.current.home = el)} id="home">
          <Home />
        </section>

        {/* About Section */}
        <section ref={(el) => (sectionsRef.current.about = el)} id="about">
          <LazySection>
            <About />
          </LazySection>
        </section>

        {/* Timeline Section */}
        <section ref={(el) => (sectionsRef.current.timeline = el)} id="timeline">
          <LazySection>
            <Timeline />
          </LazySection>
        </section>

        {/* Projects Section */}
        <section ref={(el) => (sectionsRef.current.projects = el)} id="projects">
          <LazySection>
            <Projects />
          </LazySection>
        </section>

        {/* Services Section */}
        <section ref={(el) => (sectionsRef.current.services = el)} id="services">
          <LazySection>
            <Services />
          </LazySection>
        </section>

        {/* Skills Section */}
        <section ref={(el) => (sectionsRef.current.skills = el)} id="skills">
          <LazySection>
            <Skills />
          </LazySection>
        </section>

        {/* Blog Section */}
        <section ref={(el) => (sectionsRef.current.blog = el)} id="blog">
          <LazySection>
            <BlogSection />
          </LazySection>
        </section>

        {/* FAQ Section */}
        <section ref={(el) => (sectionsRef.current.faq = el)} id="faq">
          <LazySection>
            <FAQ />
          </LazySection>
        </section>

        {/* End Section */}
        <section ref={(el) => (sectionsRef.current.end = el)} id="end">
          <LazySection>
            <End />
          </LazySection>
        </section>
      </div>
    </div>
  )
}

export default MainPage

