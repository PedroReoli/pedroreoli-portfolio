"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion"
import LazySection from "@/components/LazySection"
import Home from "./Home"
import About from "./About"
import Projects from "./Projects"
import Services from "./Services"
import Skills from "./Skills"
import FAQ from "./FAQ"
import BlogSection from "./BlogSection"
import End from "./End"
import Timeline from "./Timeline"
// Importe o componente SpaceSceneWithPlanets
import SpaceBackground from "./SpaceBackground"

const MainPage = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  // State to track screen width
  const [screenWidth, setScreenWidth] = useState(0)

  // Motion values for mouse parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth spring physics for mouse movement
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  // Scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Background parallax elements with different speeds
  const bgParallax1 = useTransform(scrollYProgress, [0, 1], [0, -300])
  const bgParallax2 = useTransform(scrollYProgress, [0, 1], [0, -150])
  const bgParallax3 = useTransform(scrollYProgress, [0, 1], [0, -450])

  // Mouse parallax transforms for different layers
  const mouseParallax1 = useTransform(smoothMouseX, [-500, 500], [-15, 15])
  const mouseParallax2 = useTransform(smoothMouseY, [-500, 500], [-15, 15])
  const mouseParallax3 = useTransform(smoothMouseX, [-500, 500], [-30, 30])
  const mouseParallax4 = useTransform(smoothMouseY, [-500, 500], [-30, 30])

  // Handle mouse movement for parallax effect and detect screen width
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window

      // Normalize mouse position to be centered (0,0) at the middle of the screen
      const normalizedX = clientX - innerWidth / 2
      const normalizedY = clientY - innerHeight / 2

      mouseX.set(normalizedX)
      mouseY.set(normalizedY)
    }

    // Set initial screen width
    setScreenWidth(window.innerWidth)

    // Update screen width on resize
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [mouseX, mouseY])

  // Generate meteor data
  const meteors = Array.from({ length: 10 }).map((_, i) => {
    const size = Math.random() * 2 + 1
    const opacity = Math.random() * 0.7 + 0.3
    const duration = Math.random() * 5 + 8
    const delay = Math.random() * 15
    const tailLength = Math.random() * 150 + 50
    const tailBlur = Math.random() * 1 + 0.3
    const startPositionX = Math.random() * 100
    const startPositionY = Math.random() * 100

    return {
      id: i,
      size,
      opacity,
      duration,
      delay,
      tailLength,
      tailBlur,
      startPositionX,
      startPositionY,
    }
  })

  // Generate star data with different layers for parallax
  const generateStars = (count: number, layer: number) => {
    return Array.from({ length: count }).map((_, i) => {
      const size = Math.random() * (layer === 1 ? 2 : layer === 2 ? 3 : 4) + 1
      const colors = ["var(--star-blue)", "var(--star-purple)", "var(--star-pink)", "var(--star-white)"]
      const color = colors[Math.floor(Math.random() * colors.length)]
      const twinkle = Math.random() > 0.7 // Only some stars twinkle
      const twinkleDuration = Math.random() * 5 + 2
      const twinkleDelay = Math.random() * 5
      const baseOpacity = Math.random() * 0.5 + 0.3
      const peakOpacity = baseOpacity + Math.random() * 0.5
      const peakScale = 1 + Math.random() * 0.5

      return {
        id: `star-${layer}-${i}`,
        size,
        color,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        twinkle,
        twinkleDuration,
        twinkleDelay,
        baseOpacity,
        peakOpacity,
        peakScale,
        layer,
      }
    })
  }

  // Generate stars for each layer
  const starsLayer1 = generateStars(100, 1) // Distant stars (slow parallax)
  const starsLayer2 = generateStars(70, 2) // Mid-distance stars
  const starsLayer3 = generateStars(40, 3) // Close stars (fast parallax)

  // Generate nebula data
  const nebulae = [
    {
      id: 1,
      width: 800,
      height: 800,
      background: "radial-gradient(circle, var(--nebula-blue) 0%, rgba(96, 165, 250, 0.1) 40%, transparent 70%)",
      top: "10%",
      left: "20%",
      duration: 25,
      delay: 0,
      minOpacity: 0.2,
      maxOpacity: 0.3,
      minScale: 0.95,
      maxScale: 1.05,
      minBlur: 80,
      maxBlur: 100,
      layer: 1,
    },
    {
      id: 2,
      width: 600,
      height: 600,
      background: "radial-gradient(circle, var(--nebula-purple) 0%, rgba(167, 139, 250, 0.08) 40%, transparent 70%)",
      top: "60%",
      left: "70%",
      duration: 30,
      delay: 5,
      minOpacity: 0.15,
      maxOpacity: 0.25,
      minScale: 0.9,
      maxScale: 1.1,
      minBlur: 70,
      maxBlur: 90,
      layer: 2,
    },
    {
      id: 3,
      width: 500,
      height: 500,
      background: "radial-gradient(circle, var(--nebula-pink) 0%, rgba(236, 72, 153, 0.07) 40%, transparent 70%)",
      top: "30%",
      left: "80%",
      duration: 20,
      delay: 10,
      minOpacity: 0.1,
      maxOpacity: 0.2,
      minScale: 0.92,
      maxScale: 1.08,
      minBlur: 60,
      maxBlur: 80,
      layer: 3,
    },
  ]

  // Generate cosmic dust particles
  const cosmicDust = Array.from({ length: 30 }).map((_, i) => {
    const size = Math.random() * 4 + 2
    const colors = ["rgba(147, 197, 253, 0.2)", "rgba(196, 181, 253, 0.2)", "rgba(249, 168, 212, 0.2)"]
    const color = colors[Math.floor(Math.random() * colors.length)]
    const floatDuration = Math.random() * 20 + 15
    const floatDelay = Math.random() * 10
    const floatY = (Math.random() * 30 + 10) * (Math.random() > 0.5 ? 1 : -1)
    const floatX = (Math.random() * 30 + 10) * (Math.random() > 0.5 ? 1 : -1)
    const floatYAlt = (Math.random() * 30 + 10) * (Math.random() > 0.5 ? 1 : -1)
    const floatXAlt = (Math.random() * 30 + 10) * (Math.random() > 0.5 ? 1 : -1)

    return {
      id: `dust-${i}`,
      size,
      color,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      floatDuration,
      floatDelay,
      floatY,
      floatX,
      floatYAlt,
      floatXAlt,
    }
  })

  return (
    <div ref={containerRef} className="relative">
      {/* Deep space background with enhanced gradient */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none deep-space-bg">
        {/* Base gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#040D21] via-[#0A1A35] to-[#061529] opacity-90"></div>

        {/* Layer 1: Distant stars (slow parallax) */}
        <motion.div
          className="absolute inset-0 parallax-layer-1"
          style={{
            y: bgParallax1,
            x: mouseParallax1,
          }}
        >
          {starsLayer1.map((star) => (
            <motion.div
              key={star.id}
              className={`absolute rounded-full ${star.twinkle ? "animate-twinkle" : ""}`}
              style={
                {
                  width: star.size,
                  height: star.size,
                  top: star.top,
                  left: star.left,
                  backgroundColor: star.color,
                  boxShadow: `0 0 ${star.size * 2}px ${star.size / 2}px ${star.color}`,
                  opacity: star.baseOpacity,
                  "--base-opacity": star.baseOpacity,
                  "--peak-opacity": star.peakOpacity,
                  "--peak-scale": star.peakScale,
                  "--twinkle-duration": `${star.twinkleDuration}s`,
                  "--twinkle-delay": `${star.twinkleDelay}s`,
                } as any
              }
            />
          ))}
        </motion.div>

        {/* Layer 2: Mid-distance stars */}
        <motion.div
          className="absolute inset-0 parallax-layer-2"
          style={{
            y: bgParallax2,
            x: mouseParallax2,
          }}
        >
          {starsLayer2.map((star) => (
            <motion.div
              key={star.id}
              className={`absolute rounded-full ${star.twinkle ? "animate-twinkle" : ""}`}
              style={
                {
                  width: star.size,
                  height: star.size,
                  top: star.top,
                  left: star.left,
                  backgroundColor: star.color,
                  boxShadow: `0 0 ${star.size * 3}px ${star.size}px ${star.color}`,
                  opacity: star.baseOpacity,
                  "--base-opacity": star.baseOpacity,
                  "--peak-opacity": star.peakOpacity,
                  "--peak-scale": star.peakScale,
                  "--twinkle-duration": `${star.twinkleDuration}s`,
                  "--twinkle-delay": `${star.twinkleDelay}s`,
                } as any
              }
            />
          ))}

          {/* Mid-distance nebulae */}
          {nebulae
            .filter((n) => n.layer === 2)
            .map((nebula) => (
              <motion.div
                key={nebula.id}
                className="absolute rounded-full animate-nebula-pulse"
                style={
                  {
                    width: nebula.width,
                    height: nebula.height,
                    background: nebula.background,
                    top: nebula.top,
                    left: nebula.left,
                    opacity: nebula.minOpacity,
                    filter: `blur(${nebula.minBlur}px)`,
                    "--nebula-min-opacity": nebula.minOpacity,
                    "--nebula-max-opacity": nebula.maxOpacity,
                    "--nebula-min-scale": nebula.minScale,
                    "--nebula-max-scale": nebula.maxScale,
                    "--nebula-min-blur": `${nebula.minBlur}px`,
                    "--nebula-max-blur": `${nebula.maxBlur}px`,
                    "--nebula-duration": `${nebula.duration}s`,
                    "--nebula-delay": `${nebula.delay}s`,
                  } as any
                }
              />
            ))}
        </motion.div>

        {/* Layer 3: Close stars and elements (fast parallax) */}
        <motion.div
          className="absolute inset-0 parallax-layer-3"
          style={{
            y: bgParallax3,
            x: mouseParallax3,
            rotateX: mouseParallax4,
          }}
        >
          {starsLayer3.map((star) => (
            <motion.div
              key={star.id}
              className={`absolute rounded-full ${star.twinkle ? "animate-twinkle" : ""}`}
              style={
                {
                  width: star.size,
                  height: star.size,
                  top: star.top,
                  left: star.left,
                  backgroundColor: star.color,
                  boxShadow: `0 0 ${star.size * 4}px ${star.size * 1.5}px ${star.color}`,
                  opacity: star.baseOpacity,
                  "--base-opacity": star.baseOpacity,
                  "--peak-opacity": star.peakOpacity,
                  "--peak-scale": star.peakScale,
                  "--twinkle-duration": `${star.twinkleDuration}s`,
                  "--twinkle-delay": `${star.twinkleDelay}s`,
                } as any
              }
            />
          ))}

          {/* Close nebulae */}
          {nebulae
            .filter((n) => n.layer === 3)
            .map((nebula) => (
              <motion.div
                key={nebula.id}
                className="absolute rounded-full animate-nebula-pulse"
                style={
                  {
                    width: nebula.width,
                    height: nebula.height,
                    background: nebula.background,
                    top: nebula.top,
                    left: nebula.left,
                    opacity: nebula.minOpacity,
                    filter: `blur(${nebula.minBlur}px)`,
                    "--nebula-min-opacity": nebula.minOpacity,
                    "--nebula-max-opacity": nebula.maxOpacity,
                    "--nebula-min-scale": nebula.minScale,
                    "--nebula-max-scale": nebula.maxScale,
                    "--nebula-min-blur": `${nebula.minBlur}px`,
                    "--nebula-max-blur": `${nebula.maxBlur}px`,
                    "--nebula-duration": `${nebula.duration}s`,
                    "--nebula-delay": `${nebula.delay}s`,
                  } as any
                }
              />
            ))}
        </motion.div>

        {/* Distant nebulae (slowest parallax) */}
        <motion.div
          className="absolute inset-0"
          style={{
            y: bgParallax1,
          }}
        >
          {nebulae
            .filter((n) => n.layer === 1)
            .map((nebula) => (
              <motion.div
                key={nebula.id}
                className="absolute rounded-full animate-nebula-pulse"
                style={
                  {
                    width: nebula.width,
                    height: nebula.height,
                    background: nebula.background,
                    top: nebula.top,
                    left: nebula.left,
                    opacity: nebula.minOpacity,
                    filter: `blur(${nebula.minBlur}px)`,
                    "--nebula-min-opacity": nebula.minOpacity,
                    "--nebula-max-opacity": nebula.maxOpacity,
                    "--nebula-min-scale": nebula.minScale,
                    "--nebula-max-scale": nebula.maxScale,
                    "--nebula-min-blur": `${nebula.minBlur}px`,
                    "--nebula-max-blur": `${nebula.maxBlur}px`,
                    "--nebula-duration": `${nebula.duration}s`,
                    "--nebula-delay": `${nebula.delay}s`,
                  } as any
                }
              />
            ))}
        </motion.div>

        {/* Cosmic dust particles with floating animation */}
        <div className="absolute inset-0">
          {cosmicDust.map((dust) => (
            <motion.div
              key={dust.id}
              className="absolute rounded-full animate-float"
              style={
                {
                  width: dust.size,
                  height: dust.size,
                  top: dust.top,
                  left: dust.left,
                  backgroundColor: dust.color,
                  filter: `blur(${dust.size / 2}px)`,
                  "--float-duration": `${dust.floatDuration}s`,
                  "--float-delay": `${dust.floatDelay}s`,
                  "--float-y": `${dust.floatY}px`,
                  "--float-x": `${dust.floatX}px`,
                  "--float-y-alt": `${dust.floatYAlt}px`,
                  "--float-x-alt": `${dust.floatXAlt}px`,
                } as any
              }
            />
          ))}
        </div>

        {/* Meteors with dynamic animation */}
        <AnimatePresence>
          {meteors.map((meteor) => (
            <motion.div
              key={`meteor-${meteor.id}`}
              className="animate-meteor"
              style={
                {
                  top: `${meteor.startPositionY}%`,
                  left: `${meteor.startPositionX}%`,
                  width: meteor.size,
                  height: meteor.size,
                  opacity: meteor.opacity,
                  "--meteor-duration": `${meteor.duration}s`,
                  "--meteor-delay": `${meteor.delay}s`,
                  "--tail-length": `${meteor.tailLength}px`,
                  "--tail-blur": `${meteor.tailBlur}px`,
                } as any
              }
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="meteor-tail"></div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Conditionally render SpaceBackground based on screen width */}
        {screenWidth > 1024 && <SpaceBackground />}
      </div>

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
          <BlogSection />
        </LazySection>

        <LazySection parallaxFactor={0.15}>
          <FAQ />
        </LazySection>

        <LazySection parallaxFactor={0.1}>
          <End />
        </LazySection>
      </div>
    </div>
  )
}

export default MainPage

