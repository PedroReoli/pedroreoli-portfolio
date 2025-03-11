"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion"
import { useThrottle } from "@/hooks/use-throttle"

const SpaceBackground = () => {
  const [isClient, setIsClient] = useState(false)
  const [isLowPerfDevice, setIsLowPerfDevice] = useState(false)
  const [fullyLoaded, setFullyLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

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
    layoutEffect: false,
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

  // Throttled mouse move handler
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

  // Fix for opacity animation issues - ensure we're using integer values for opacity
  const fixOpacityValue = (value: number) => {
    return Math.round(value * 100) / 100
  }

  // Handle mouse movement for parallax effect and detect device performance
  useEffect(() => {
    setIsClient(true)

    // Check if device is likely low performance
    const checkPerformance = () => {
      if (
        window.innerWidth < 768 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      ) {
        setIsLowPerfDevice(true)
      }

      if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        setIsLowPerfDevice(true)
      }
    }

    checkPerformance()
    window.addEventListener("mousemove", throttledMouseMove)

    return () => {
      window.removeEventListener("mousemove", throttledMouseMove)
    }
  }, [throttledMouseMove])

  // Progressive loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setFullyLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Generate star data with different layers for parallax
  const generateStars = (count: number, layer: number) => {
    return Array.from({ length: count }).map((_, i) => {
      const size = Math.random() * (layer === 1 ? 2 : layer === 2 ? 3 : 4) + 1
      // More vivid star colors
      const colors = [
        "#93c5fd", // Soft blue
        "#a5b4fc", // Soft indigo
        "#c4b5fd", // Soft purple
        "#f0abfc", // Soft fuchsia
        "#ffffff", // White
        "#f1f5f9", // Slate 100
      ]
      const color = colors[Math.floor(Math.random() * colors.length)]
      const twinkle = Math.random() > 0.6 // More stars twinkle
      const twinkleDuration = Math.random() * 5 + 2
      const twinkleDelay = Math.random() * 5
      const baseOpacity = Math.random() * 0.5 + 0.5 // Higher base opacity
      const peakOpacity = Math.min(1, baseOpacity + Math.random() * 0.5) // Higher peak opacity
      const peakScale = 1 + Math.random() * 0.6 // More dramatic scale change

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
  const starsLayer1 = generateStars(80, 1)
  const starsLayer2 = generateStars(50, 2)
  const starsLayer3 = generateStars(30, 3)

  // Generate nebula data with more vivid colors
  const nebulae = [
    {
      id: 1,
      width: 800,
      height: 800,
      // Deeper blue nebula
      background: "radial-gradient(circle, rgba(37, 99, 235, 0.25) 0%, rgba(59, 130, 246, 0.1) 40%, transparent 70%)",
      top: "10%",
      left: "20%",
      duration: 25,
      delay: 0,
      minOpacity: 0.3,
      maxOpacity: 0.4,
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
      // Deeper purple nebula
      background: "radial-gradient(circle, rgba(109, 40, 217, 0.25) 0%, rgba(139, 92, 246, 0.1) 40%, transparent 70%)",
      top: "60%",
      left: "70%",
      duration: 30,
      delay: 5,
      minOpacity: 0.25,
      maxOpacity: 0.35,
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
      // Deeper pink/red nebula
      background: "radial-gradient(circle, rgba(190, 24, 93, 0.25) 0%, rgba(236, 72, 153, 0.1) 40%, transparent 70%)",
      top: "30%",
      left: "80%",
      duration: 20,
      delay: 10,
      minOpacity: 0.2,
      maxOpacity: 0.3,
      minScale: 0.92,
      maxScale: 1.08,
      minBlur: 60,
      maxBlur: 80,
      layer: 3,
    },
    {
      id: 4,
      width: 700,
      height: 700,
      // Deep teal nebula
      background: "radial-gradient(circle, rgba(15, 118, 110, 0.25) 0%, rgba(20, 184, 166, 0.1) 40%, transparent 70%)",
      top: "75%",
      left: "25%",
      duration: 28,
      delay: 7,
      minOpacity: 0.2,
      maxOpacity: 0.3,
      minScale: 0.93,
      maxScale: 1.07,
      minBlur: 75,
      maxBlur: 95,
      layer: 2,
    },
  ]

  // Generate cosmic dust particles with more vivid colors
  const cosmicDust = Array.from({ length: 15 }).map((_, i) => {
    const size = Math.random() * 4 + 2
    // More vivid dust colors
    const colors = [
      "rgba(96, 165, 250, 0.3)", // Brighter blue
      "rgba(129, 140, 248, 0.3)", // Brighter indigo
      "rgba(167, 139, 250, 0.3)", // Brighter purple
      "rgba(232, 121, 249, 0.3)", // Brighter fuchsia
      "rgba(244, 114, 182, 0.3)", // Brighter pink
      "rgba(45, 212, 191, 0.3)", // Teal
    ]
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

  // Generate meteor data with improved appearance and animation
  const meteors = Array.from({ length: 8 }).map((_, i) => {
    const size = Math.random() * 2.5 + 1.5 // Slightly larger meteors
    const opacity = Math.random() * 0.3 + 0.7 // Higher base opacity
    const duration = Math.random() * 4 + 6 // Slightly faster
    const delay = Math.random() * 20 // More varied delays
    const tailLength = Math.random() * 200 + 100 // Longer tails
    const tailBlur = Math.random() * 1.5 + 0.5 // More varied blur
    const startPositionX = Math.random() * 100
    const startPositionY = Math.random() * 100
    // Random angle between 215° and 235° for more natural variation
    const angle = 215 + Math.random() * 20
    // Random brightness for the meteor
    const brightness = Math.random() * 30 + 70 // 70-100% brightness

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
      angle,
      brightness,
    }
  })

  if (!isClient) {
    return null // Prevent hydration mismatch
  }

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Deep space background with more vivid gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#040D21] via-[#061529] to-[#050B18] opacity-100"></div>

      {/* Layer 1: Distant stars (slow parallax) */}
      {isLowPerfDevice ? (
        // Simpler version with fewer stars
        <div className="absolute inset-0">
          {starsLayer1.slice(0, 20).map((star) => (
            <div
              key={star.id}
              className="absolute rounded-full"
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

      {/* Improved meteors with better tails */}
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
                  backgroundColor: `rgba(255, 255, 255, ${meteor.opacity})`,
                  boxShadow: `0 0 ${meteor.size * 2}px rgba(255, 255, 255, 0.8)`,
                  opacity: fixOpacityValue(meteor.opacity),
                  "--meteor-duration": `${meteor.duration}s`,
                  "--meteor-delay": `${meteor.delay}s`,
                  "--meteor-angle": `${meteor.angle}deg`,
                } as any
              }
              initial={{ opacity: 0 }}
              animate={{ opacity: fixOpacityValue(meteor.opacity) }}
              exit={{ opacity: 0 }}
            >
              {/* Improved meteor tail */}
              <div
                className="absolute"
                style={{
                  width: `${meteor.tailLength}px`,
                  height: `${meteor.size * 1.5}px`,
                  background: `linear-gradient(to left, rgba(255, 255, 255, ${meteor.opacity}), rgba(255, 255, 255, 0.1), transparent)`,
                  right: 0,
                  top: `-${(meteor.size * 1.5 - meteor.size) / 2}px`,
                  filter: `blur(${meteor.tailBlur}px) brightness(${meteor.brightness}%)`,
                  transformOrigin: "right center",
                }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </div>
  )
}

export default SpaceBackground

