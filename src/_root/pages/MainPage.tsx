"use client"

import { useRef, useEffect, useState, useCallback, Suspense, lazy } from "react"
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion"
import LazySection from "@/components/LazySection"
import Home from "./Home"
import About from "./About"
import Projects from "./Projects"
import Services from "./Services"
import Skills from "./Skills"
import Timeline from "./Timeline"
import SpaceBackground from "./SpaceBackground"
import { useThrottle } from "@/hooks/use-throttle"

const BlogSection = lazy(() => import('./BlogSection'))
const FAQ = lazy(() => import('./FAQ'))
const End = lazy(() => import('./End'))

const MainPage = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [screenWidth, setScreenWidth] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const [isLowPerfDevice, setIsLowPerfDevice] = useState(false)
  const [fullyLoaded, setFullyLoaded] = useState(false)

  // Add this to your component
  const fpsLimit = 30 // Limit to 30 FPS for smoother performance
  const lastFrameTime = useRef(0)

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
    layoutEffect: false, // Add this line
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

  // Throttled mouse move and resize handlers using useCallback and useThrottle
  const throttledMouseMove = useThrottle(
    useCallback(
      (e: MouseEvent) => {
        const { clientX, clientY } = e
        const { innerWidth, innerHeight } = window

        // Normalize mouse position to be centered (0,0) at the middle of the screen
        const normalizedX = clientX - innerWidth / 2
        const normalizedY = clientY - innerHeight / 2

        mouseX.set(normalizedX)
        mouseY.set(normalizedY)
      },
      [mouseX, mouseY],
    ),
    16,
  )

  const throttledResize = useThrottle(
    useCallback(() => {
      setScreenWidth(window.innerWidth)
    }, []),
    100,
  )

  // Handle mouse movement for parallax effect and detect screen width
  useEffect(() => {
    setIsClient(true)
    setScreenWidth(window.innerWidth)

    // Check if device is likely low performance
    const checkPerformance = () => {
      // Mobile devices or devices with small screens are likely lower performance
      if (
        window.innerWidth < 768 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      ) {
        setIsLowPerfDevice(true)
      }

      // You could also check for CPU cores if available
      if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        setIsLowPerfDevice(true)
      }
    }

    checkPerformance()

    window.addEventListener("mousemove", throttledMouseMove)
    window.addEventListener("resize", throttledResize)

    return () => {
      window.removeEventListener("mousemove", throttledMouseMove)
      window.removeEventListener("resize", throttledResize)
    }
  }, [throttledMouseMove, throttledResize])

  // Fix for opacity animation issues - ensure we're using integer values for opacity
  const fixOpacityValue = (value: number) => {
    return Math.round(value * 100) / 100
  }

  // Generate meteor data
  const meteors = Array.from({ length: 5 }).map((_, i) => {
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

  // Generate stars for each layer - reduce count for better performance
  const starsLayer1 = generateStars(30, 1) // Reduced from 100
  const starsLayer2 = generateStars(20, 2) // Reduced from 70
  const starsLayer3 = generateStars(10, 3) // Reduced from 40

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

  // Generate cosmic dust particles - reduced count for better performance
  const cosmicDust = Array.from({ length: 8 }).map((_, i) => {
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

  // Then in your animation frames or motion components:
  useEffect(() => {
    let animationFrameId: number

    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate)

      // Limit frame rate
      if (time - lastFrameTime.current < 1000 / fpsLimit) {
        return
      }

      lastFrameTime.current = time

      // Your animation code here
      // ...
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  useEffect(() => {
    // Start with basic elements, then progressively add more complex ones
    const timer = setTimeout(() => {
      setFullyLoaded(true)
    }, 1000) // Wait 1 second after initial render to add complex elements

    return () => clearTimeout(timer)
  }, [])

  if (!isClient) {
    return null // Prevent hydration mismatch
  }

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {/* Deep space background with enhanced gradient */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none deep-space-bg">
        {/* Base gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#040D21] via-[#0A1A35] to-[#061529] opacity-90"></div>

        {/* Layer 1: Distant stars (slow parallax) */}
        {isLowPerfDevice ? (
          // Simpler version with fewer stars
          <div className="absolute inset-0">
            {starsLayer1.slice(0, 10).map((star) => (
              <div
                key={star.id}
                className={`absolute rounded-full`}
                style={
                  {
                    width: star.size,
                    height: star.size,
                    top: star.top,
                    left: star.left,
                    backgroundColor: star.color,
                    boxShadow: `0 0 ${star.size * 2}px ${star.size / 2}px ${star.color}`,
                    opacity: fixOpacityValue(star.baseOpacity),
                  } as any
                }
              />
            ))}
          </div>
        ) : (
          // Full version with all effects
          <motion.div
            className="absolute inset-0"
            style={{
              y: bgParallax1,
              x: mouseParallax1,
            }}
          >
            {starsLayer1.map((star) => (
              <div
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
                    opacity: fixOpacityValue(star.baseOpacity),
                    "--base-opacity": fixOpacityValue(star.baseOpacity),
                    "--peak-opacity": fixOpacityValue(star.peakOpacity),
                    "--peak-scale": star.peakScale.toFixed(2),
                    "--twinkle-duration": `${star.twinkleDuration}s`,
                    "--twinkle-delay": `${star.twinkleDelay}s`,
                  } as any
                }
              />
            ))}
          </motion.div>
        )}

        {/* Layer 2: Mid-distance stars */}
        <motion.div
          className="absolute inset-0"
          style={{
            y: bgParallax2,
            x: mouseParallax2,
          }}
        >
          {starsLayer2.map((star) => (
            <div
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
                  opacity: fixOpacityValue(star.baseOpacity),
                  "--base-opacity": fixOpacityValue(star.baseOpacity),
                  "--peak-opacity": fixOpacityValue(star.peakOpacity),
                  "--peak-scale": star.peakScale.toFixed(2),
                  "--twinkle-duration": `${star.twinkleDuration}s`,
                  "--twinkle-delay": `${star.twinkleDelay}s`,
                } as any
              }
            />
          ))}

          {/* Mid-distance nebulae */}
          {fullyLoaded && (
            <>
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
                        opacity: fixOpacityValue(nebula.minOpacity),
                        filter: `blur(${nebula.minBlur}px)`,
                        "--nebula-min-opacity": fixOpacityValue(nebula.minOpacity),
                        "--nebula-max-opacity": fixOpacityValue(nebula.maxOpacity),
                        "--nebula-min-scale": nebula.minScale.toFixed(2),
                        "--nebula-max-scale": nebula.maxScale.toFixed(2),
                        "--nebula-min-blur": `${nebula.minBlur}px`,
                        "--nebula-max-blur": `${nebula.maxBlur}px`,
                        "--nebula-duration": `${nebula.duration}s`,
                        "--nebula-delay": `${nebula.delay}s`,
                      } as any
                    }
                  />
                ))}
            </>
          )}
        </motion.div>

        {/* Layer 3: Close stars and elements (fast parallax) */}
        <motion.div
          className="absolute inset-0"
          style={{
            y: bgParallax3,
            x: mouseParallax3,
            rotateX: mouseParallax4,
          }}
        >
          {starsLayer3.map((star) => (
            <div
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
                  opacity: fixOpacityValue(star.baseOpacity),
                  "--base-opacity": fixOpacityValue(star.baseOpacity),
                  "--peak-opacity": fixOpacityValue(star.peakOpacity),
                  "--peak-scale": star.peakScale.toFixed(2),
                  "--twinkle-duration": `${star.twinkleDuration}s`,
                  "--twinkle-delay": `${star.twinkleDelay}s`,
                } as any
              }
            />
          ))}

          {/* Close nebulae */}
          {fullyLoaded && (
            <>
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
                        opacity: fixOpacityValue(nebula.minOpacity),
                        filter: `blur(${nebula.minBlur}px)`,
                        "--nebula-min-opacity": fixOpacityValue(nebula.minOpacity),
                        "--nebula-max-opacity": fixOpacityValue(nebula.maxOpacity),
                        "--nebula-min-scale": nebula.minScale.toFixed(2),
                        "--nebula-max-scale": nebula.maxScale.toFixed(2),
                        "--nebula-min-blur": `${nebula.minBlur}px`,
                        "--nebula-max-blur": `${nebula.maxBlur}px`,
                        "--nebula-duration": `${nebula.duration}s`,
                        "--nebula-delay": `${nebula.delay}s`,
                      } as any
                    }
                  />
                ))}
            </>
          )}
        </motion.div>

        {/* Distant nebulae (slowest parallax) */}
        <motion.div
          className="absolute inset-0"
          style={{
            y: bgParallax1,
          }}
        >
          {fullyLoaded && (
            <>
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
                        opacity: fixOpacityValue(nebula.minOpacity),
                        filter: `blur(${nebula.minBlur}px)`,
                        "--nebula-min-opacity": fixOpacityValue(nebula.minOpacity),
                        "--nebula-max-opacity": fixOpacityValue(nebula.maxOpacity),
                        "--nebula-min-scale": nebula.minScale.toFixed(2),
                        "--nebula-max-scale": nebula.maxScale.toFixed(2),
                        "--nebula-min-blur": `${nebula.minBlur}px`,
                        "--nebula-max-blur": `${nebula.maxBlur}px`,
                        "--nebula-duration": `${nebula.duration}s`,
                        "--nebula-delay": `${nebula.delay}s`,
                      } as any
                    }
                  />
                ))}
            </>
          )}
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

        {/* Meteors with dynamic animation - using integer values for opacity */}
        {fullyLoaded && !isLowPerfDevice && (
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
                    opacity: fixOpacityValue(meteor.opacity),
                    "--meteor-duration": `${meteor.duration}s`,
                    "--meteor-delay": `${meteor.delay}s`,
                    "--tail-length": `${meteor.tailLength}px`,
                    "--tail-blur": `${meteor.tailBlur}px`,
                  } as any
                }
                initial={{ opacity: 0 }}
                animate={{ opacity: fixOpacityValue(meteor.opacity) }}
                exit={{ opacity: 0 }}
              >
                <div className="meteor-tail"></div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}

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

