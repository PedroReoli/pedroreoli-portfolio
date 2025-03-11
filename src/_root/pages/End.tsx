"use client"

import type React from "react"

import { useRef, useMemo, useState } from "react"
import { motion, useInView, useMotionValue, AnimatePresence } from "framer-motion"
import { ArrowUp } from "lucide-react"

const End = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [isHovering, setIsHovering] = useState(false)

  // Mouse parallax effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Parallax values for nebulae
  const [parallaxX, setParallaxX] = useState(0)
  const [parallaxY, setParallaxY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = (clientX - left - width / 2) / 25
    const y = (clientY - top - height / 2) / 25

    mouseX.set(x)
    mouseY.set(y)

    // Set parallax values directly
    setParallaxX(x * -2)
    setParallaxY(y * -2)
  }

  // Pre-calculate stars for better performance
  const starsData = useMemo(() => {
    // Reduzido o número de estrelas para melhorar performance
    return Array.from({ length: 50 }).map((_, i) => {
      const size = Math.random() * 2 + 1
      const colors = ["#F9A8D4", "#C4B5FD", "#93C5FD", "#FFFFFF"]
      const color = colors[i % colors.length]
      const depth = Math.random() * 5 + 1 // For parallax effect
      const initialOpacity = Math.random() * 0.7 + 0.3

      return {
        id: i,
        size,
        color,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        depth,
        animationDuration: Math.random() * 4 + 2,
        animationDelay: Math.random() * 5,
        initialOpacity,
      }
    })
  }, [])

  // Pre-calculate nebula effects - Reduzido para melhorar performance
  const nebulae = useMemo(() => {
    return [
      {
        width: 600,
        height: 600,
        background: "radial-gradient(circle, rgba(96, 165, 250, 0.3) 0%, rgba(96, 165, 250, 0.1) 40%, transparent 70%)",
        x: -100,
        y: -50,
        duration: 15,
      },
      {
        width: 500,
        height: 500,
        background:
          "radial-gradient(circle, rgba(196, 181, 253, 0.25) 0%, rgba(196, 181, 253, 0.08) 40%, transparent 70%)",
        x: 150,
        y: 100,
        duration: 18,
      },
    ]
  }, [])

  // Pre-calculate constellation points
  const constellationPoints = useMemo(() => {
    const points = []
    const numPoints = 7
    const centerX = 50
    const centerY = 50
    const radius = 40

    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * Math.PI * 2
      const x = centerX + Math.cos(angle) * radius * (0.8 + Math.random() * 0.4)
      const y = centerY + Math.sin(angle) * radius * (0.8 + Math.random() * 0.4)
      points.push({ x: `${x}%`, y: `${y}%` })
    }

    return points
  }, [])

  return (
    <section
      ref={ref}
      className="text-white min-h-screen py-6 xxs:py-8 xs:py-10 sm:py-12 md:py-14 lg:py-16 xl:py-20 px-3 xxs:px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 relative overflow-hidden flex flex-col items-center justify-center"
      onMouseMove={handleMouseMove}
      style={{ position: "relative" }} // Garantindo position: relative explicitamente
    >
      {/* Enhanced background with depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-cosmic-bg/90 via-cosmic-bg/80 to-cosmic-bg/90 backdrop-blur-sm"></div>

      {/* Animated stars with parallax effect - Reduzido para melhorar performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {starsData.slice(0, 30).map((star) => {
          return (
            <motion.div
              key={`end-star-${star.id}`}
              className="absolute rounded-full"
              style={{
                width: star.size,
                height: star.size,
                top: star.top,
                left: star.left,
                backgroundColor: star.color,
                boxShadow: `0 0 ${star.size * 3}px ${star.size}px ${star.color}`,
                opacity: star.initialOpacity,
              }}
              animate={{
                opacity: [star.initialOpacity, star.initialOpacity + 0.2, star.initialOpacity],
                scale: [1, 1.2, 1],
                // Removido transformações baseadas em mouseX/mouseY para melhorar performance
              }}
              transition={{
                duration: star.animationDuration,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: star.animationDelay,
              }}
            />
          )
        })}
      </div>

      {/* Constellation effect - Simplificado para melhorar performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute w-full h-full" style={{ opacity: 0.15 }}>
          {constellationPoints.map((point, i, points) => {
            // Connect each point to the next one
            if (i < points.length - 1) {
              return (
                <motion.line
                  key={`constellation-line-${i}`}
                  x1={point.x}
                  y1={point.y}
                  x2={points[i + 1].x}
                  y2={points[i + 1].y}
                  stroke="rgba(var(--cosmic-accent-rgb), 0.6)"
                  strokeWidth="0.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={
                    isInView
                      ? {
                          pathLength: 1,
                          opacity: 0.6,
                        }
                      : {}
                  }
                  transition={{
                    duration: 1.5,
                    delay: 0.5 + i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              )
            }
            return null
          })}

          {constellationPoints.map((point, i) => (
            <motion.circle
              key={`constellation-point-${i}`}
              cx={point.x}
              cy={point.y}
              r="1.5"
              fill="rgba(var(--cosmic-accent-rgb), 0.8)"
              initial={{ scale: 0, opacity: 0 }}
              animate={
                isInView
                  ? {
                      scale: [0, 1.5, 1],
                      opacity: 0.8,
                    }
                  : {}
              }
              transition={{
                duration: 0.8,
                delay: 0.3 + i * 0.15,
                ease: "easeOut",
              }}
            />
          ))}
        </svg>
      </div>

      {/* Enhanced animated nebulae with parallax - Reduzido para melhorar performance */}
      {nebulae.map((nebula, i) => (
        <motion.div
          key={`nebula-${i}`}
          className="absolute rounded-full opacity-20 filter blur-[100px] pointer-events-none"
          style={{
            width: nebula.width,
            height: nebula.height,
            background: nebula.background,
            left: `calc(50% + ${nebula.x}px)`,
            top: `calc(50% + ${nebula.y}px)`,
            transform: `translate(${parallaxX}px, ${parallaxY}px)`, // Usando transform diretamente em vez de useTransform
          }}
          animate={{
            scale: [1, 1.1, 0.95, 1.05, 1],
            opacity: [0.2, 0.25, 0.15, 0.25, 0.2],
          }}
          transition={{
            duration: nebula.duration,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Shooting star animation that appears occasionally - Reduzido para melhorar performance */}
      <AnimatePresence>
        {isInView && (
          <motion.div
            className="absolute pointer-events-none"
            initial={{
              top: "10%",
              left: "-5%",
              opacity: 0,
              rotate: 15,
              scale: 0.8,
            }}
            animate={{
              top: "70%",
              left: "105%",
              opacity: [0, 1, 0],
              scale: 1.2,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 2.5,
              ease: "easeOut",
              delay: 1.5,
              repeat: 1, // Reduzido para melhorar performance
              repeatDelay: 8,
            }}
          >
            <div className="relative">
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="absolute top-0 right-0 w-20 h-[1px] bg-gradient-to-l from-transparent via-white to-transparent transform -translate-x-full"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle cosmic dust particles - Reduzido para melhorar performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 10 }).map((_, i) => {
          const size = Math.random() * 3 + 2
          const duration = Math.random() * 15 + 20
          const delay = Math.random() * 10

          return (
            <motion.div
              key={`dust-${i}`}
              className="absolute rounded-full bg-cosmic-accent/10"
              style={{
                width: size,
                height: size,
                filter: "blur(1px)",
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100],
                opacity: [0, 0.3, 0],
                scale: [0, 1, 0.5],
              }}
              transition={{
                duration,
                repeat: Number.POSITIVE_INFINITY,
                delay,
                ease: "linear",
              }}
            />
          )
        })}
      </div>

      <motion.div
        className="text-center w-full max-w-[240px] xxs:max-w-[280px] xs:max-w-[320px] sm:max-w-[360px] md:max-w-[420px] lg:max-w-[480px] xl:max-w-2xl relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        {/* Enhanced profile image with elegant animation */}
        <motion.div
          className="flex justify-center mb-4 xxs:mb-5 xs:mb-6 sm:mb-7 md:mb-8"
          initial={{ scale: 0.8 }}
          animate={isInView ? { scale: 1 } : { scale: 0.8 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onHoverStart={() => setIsHovering(true)}
          onHoverEnd={() => setIsHovering(false)}
        >
          <div className="relative group cursor-pointer">
            {/* Elegant orbital ring animation */}
            <motion.div
              className="absolute -inset-2 xxs:-inset-3 rounded-full pointer-events-none opacity-30"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="orbitalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(var(--cosmic-accent-rgb), 0)" />
                    <stop offset="50%" stopColor="rgba(var(--cosmic-accent-rgb), 0.6)" />
                    <stop offset="100%" stopColor="rgba(var(--cosmic-accent-rgb), 0)" />
                  </linearGradient>
                </defs>
                <ellipse cx="50" cy="50" rx="48" ry="48" fill="none" stroke="url(#orbitalGradient)" strokeWidth="0.5" />
              </svg>
            </motion.div>

            {/* Enhanced glow effect */}
            <motion.div
              className="absolute -inset-1 rounded-full bg-gradient-to-r from-cosmic-accent via-[#93C5FD] to-cosmic-accent opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-500"
              animate={
                isHovering
                  ? {
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }
                  : {}
              }
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            />

            <img
              src="/assets/Eu.svg"
              alt="Despedida"
              className="relative w-20 h-20 xxs:w-24 xxs:h-24 xs:w-28 xs:h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full object-cover border-2 border-cosmic-border group-hover:border-cosmic-accent transition-colors duration-300"
            />
          </div>
        </motion.div>

        {/* Enhanced title with animated accent */}
        <motion.h2
          className="text-lg xxs:text-xl xs:text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold mb-2 xxs:mb-3 sm:mb-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Obrigado por visitar
          <motion.span
            className="ml-1 xxs:ml-2 text-cosmic-accent inline-block"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 3,
            }}
          >
            !
          </motion.span>
        </motion.h2>

        {/* Enhanced text with better typography */}
        <motion.p
          className="text-cosmic-text text-xs xxs:text-sm xs:text-base sm:text-lg mb-4 xxs:mb-6 xs:mb-8 sm:mb-10 md:mb-12 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Espero que tenha gostado do meu portfólio! Fique à vontade para voltar ao início ou visitar novamente sempre
          que desejar. Desejo tudo de melhor em seus projetos!
        </motion.p>

        {/* Enhanced button with interactive effects */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group relative inline-flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          onHoverStart={() => setIsHovering(true)}
          onHoverEnd={() => setIsHovering(false)}
        >
          {/* Enhanced glow effect */}
          <motion.div
            className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            style={{
              background:
                "linear-gradient(45deg, rgba(var(--cosmic-accent-rgb), 0.4) 0%, rgba(147, 197, 253, 0.4) 50%, rgba(var(--cosmic-accent-rgb), 0.4) 100%)",
              backgroundSize: "200% 200%",
              filter: "blur(8px)",
            }}
          />

          {/* Button background with subtle animation */}
          <div className="relative px-2.5 xxs:px-3 xs:px-4 sm:px-5 md:px-6 py-1.5 xxs:py-2 xs:py-2.5 sm:py-3 bg-cosmic-card rounded-full border border-cosmic-accent/50 group-hover:border-cosmic-accent transition-all duration-300 overflow-hidden">
            {/* Subtle background animation */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-20"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
              style={{
                background:
                  "linear-gradient(45deg, transparent 0%, rgba(var(--cosmic-accent-rgb), 0.6) 50%, transparent 100%)",
                backgroundSize: "200% 200%",
              }}
            />

            {/* Button content with enhanced animation */}
            <div className="flex items-center gap-1 xxs:gap-1.5 xs:gap-2 relative">
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 1,
                }}
              >
                <ArrowUp className="w-3 xxs:w-3.5 xs:w-4 h-3 xxs:h-3.5 xs:h-4 text-cosmic-accent group-hover:text-white transition-colors duration-300" />
              </motion.div>
              <span className="text-xs xxs:text-sm xs:text-base text-cosmic-accent group-hover:text-white transition-colors duration-300">
                Voltar ao Início
              </span>
            </div>
          </div>
        </motion.button>

        {/* Linha decorativa simples sem texto */}
        <motion.div
          className="mt-12 xxs:mt-14 xs:mt-16 opacity-60"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 0.6, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div className="h-px w-full bg-gradient-to-r from-transparent via-cosmic-accent to-transparent"></div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default End

