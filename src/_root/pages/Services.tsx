"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion"
import { Tilt } from "react-tilt"
import { Code2, Layout, Users } from "lucide-react"

const defaultTiltOptions = {
  reverse: false,
  max: 10, // Reduzido para um efeito mais sutil
  perspective: 1000,
  scale: 1.02,
  speed: 1200,
  transition: true,
  axis: null,
  reset: true,
  easing: "cubic-bezier(.03,.98,.52,.99)",
}

const Services = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const controls = useAnimation()
  const [scrollY, setScrollY] = useState(0)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  // Parallax effect for background elements - Otimizado com throttle para melhor performance
  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true }) // Adicionado passive: true para melhor performance
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const services = [
    {
      icon: Layout,
      title: "UX / UI Design",
      description: "Desenho interfaces claras, objetivas e intuitivas, priorizando a experiência do usuário.",
      delay: 0.1,
      features: ["Wireframes", "Protótipos", "Design Systems", "Testes de Usabilidade"],
    },
    {
      icon: Code2,
      title: "Desenvolvimento FullStack",
      description: "Construo soluções completas, desde interfaces até back-ends robustos e escaláveis.",
      delay: 0.3,
      features: ["Front-end Responsivo", "APIs RESTful", "Bancos de Dados", "Integração de Sistemas"],
    },
    {
      icon: Users,
      title: "Mentoria e Aulas",
      description: "Orientação personalizada para estudos, carreiras e projetos na área de programação.",
      delay: 0.5,
      features: ["Revisão de Código", "Planejamento de Carreira", "Projetos Práticos", "Acompanhamento Contínuo"],
    },
  ]

  return (
    <section
      ref={ref}
      className="text-white min-h-screen py-10 xxs:py-12 xs:py-14 sm:py-16 px-3 xxs:px-4 sm:px-6 md:px-8 lg:px-12 relative overflow-hidden"
      id="services"
    >
      {/* Enhanced background com position relative para cálculo correto de scroll offset */}
      <div className="absolute inset-0 bg-cosmic-bg/80 backdrop-blur-sm"></div>

      {/* Animated nebula clouds com parallax - Reduzido número de elementos para melhor performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 3 }).map((_, i) => {
          const colors = [
            "radial-gradient(circle, rgba(147, 197, 253, 0.15) 0%, rgba(96, 165, 250, 0.05) 50%, transparent 80%)",
            "radial-gradient(circle, rgba(147, 197, 253, 0.12) 0%, rgba(96, 165, 250, 0.04) 50%, transparent 80%)",
            "radial-gradient(circle, rgba(147, 197, 253, 0.10) 0%, rgba(96, 165, 250, 0.03) 50%, transparent 80%)",
          ]

          const parallaxFactor = 0.05 * ((i % 3) + 1)

          return (
            <motion.div
              key={`service-nebula-${i}`}
              className="absolute rounded-full"
              style={{
                // Separando background de outras propriedades para evitar conflitos
                backgroundImage: colors[i % colors.length],
                width: Math.random() * 800 + 400,
                height: Math.random() * 800 + 400,
                top: `${20 + i * 30}%`,
                left: `${20 + i * 20}%`,
                opacity: 0.4,
                filter: "blur(100px)",
                transform: `translateY(${scrollY * parallaxFactor}px)`,
              }}
              animate={{
                scale: [1, 1.1, 0.95, 1.05, 1],
                opacity: [0.4, 0.5, 0.3, 0.45, 0.4],
              }}
              transition={{
                duration: 15 + i * 5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          )
        })}
      </div>

      {/* Enhanced floating particles com parallax - Reduzido para melhorar performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => {
          // Reduzido de 30 para 20 partículas
          const size = Math.random() * 3 + 1
          const color = "#93C5FD"
          const parallaxFactor = 0.03 * ((i % 3) + 1)

          return (
            <motion.div
              key={`service-particle-${i}`}
              className="absolute rounded-full"
              style={{
                width: size,
                height: size,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                backgroundColor: color,
                boxShadow: `0 0 ${size * 3}px ${size}px ${color}`,
                opacity: Math.random() * 0.5 + 0.2,
                transform: `translateY(${scrollY * parallaxFactor}px)`,
              }}
              animate={{
                y: [0, Math.random() * -100 - 50],
                x: [0, (Math.random() - 0.5) * 50],
                opacity: [Math.random() * 0.5 + 0.2, 0],
              }}
              transition={{
                duration: Math.random() * 15 + 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
                delay: Math.random() * 5,
              }}
            />
          )
        })}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced section header with animated title */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >
            <motion.h2
              className="text-xl xxs:text-2xl xs:text-3xl sm:text-4xl font-bold relative inline-block"
              animate={
                isInView
                  ? {
                      transition: { staggerChildren: 0.1 },
                    }
                  : {}
              }
            >
              <span className="relative">
                Serviços
                <motion.span
                  className="text-cosmic-accent"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                >
                  ;
                </motion.span>
                <motion.span
                  className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-transparent via-cosmic-accent to-transparent"
                  initial={{ width: 0, opacity: 0 }}
                  animate={isInView ? { width: "100%", opacity: 1 } : { width: 0, opacity: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                />
              </span>
            </motion.h2>
          </motion.div>

          <motion.p
            className="mt-4 text-cosmic-text max-w-2xl mx-auto text-sm xxs:text-base sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Soluções personalizadas para transformar suas ideias em realidade digital
          </motion.p>
        </div>

        {/* Enhanced services grid com layout responsivo melhorado */}
        <motion.div
          className="grid grid-cols-1 gap-6 xxs:gap-7 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 md:gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {services.map((service, serviceIndex) => (
            <ServiceCard
              key={service.title}
              service={service}
              isHovered={hoveredCard === serviceIndex}
              onHover={() => setHoveredCard(serviceIndex)}
              onLeave={() => setHoveredCard(null)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

interface ServiceCardProps {
  service: {
    icon: React.ElementType
    title: string
    description: string
    delay: number
    features: string[]
  }
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, isHovered, onHover, onLeave }) => {
  const { icon: Icon, title, description, delay, features } = service
  const cardRef = useRef(null)

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1], // Custom easing for smoother animation
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="h-full"
    >
      <Tilt options={defaultTiltOptions} className="h-full">
        <motion.div
          className="group relative h-full flex flex-col"
          whileHover={{ y: -8, x: 0 }}
          animate={{
            y: isHovered ? -4 : 0,
          }}
          transition={{
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {/* Enhanced glow effect - Simplificado para melhor performance */}
          <motion.div
            className="absolute -inset-0.5 rounded-2xl blur-md z-0 bg-gradient-to-r from-cosmic-accent/40 to-cosmic-accent/20"
            animate={
              isHovered
                ? {
                    opacity: 0.8,
                    // Usando backgroundImage em vez de background para evitar conflitos
                    backgroundImage: "linear-gradient(45deg, rgba(96, 165, 250, 0.6), rgba(96, 165, 250, 0.4))",
                  }
                : {
                    opacity: 0,
                    backgroundImage: "linear-gradient(45deg, rgba(96, 165, 250, 0.4), rgba(96, 165, 250, 0.2))",
                  }
            }
            transition={{ duration: 0.3 }}
          />

          {/* Card content com layout responsivo melhorado */}
          <div className="relative flex flex-col h-full p-6 sm:p-8 bg-cosmic-card rounded-2xl border border-cosmic-border backdrop-blur-xl z-10">
            {/* Enhanced icon container com animação otimizada */}
            <div className="relative w-14 xxs:w-16 h-14 xxs:h-16 mx-auto mb-4 xxs:mb-5 sm:mb-6">
              <motion.div
                className="absolute inset-0 rounded-xl blur-md bg-cosmic-accent"
                animate={{
                  opacity: isHovered ? [0.3, 0.5, 0.3] : [0.15, 0.25, 0.15],
                  scale: isHovered ? [1, 1.2, 1] : [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
              <div className="relative flex items-center justify-center w-full h-full bg-cosmic-card rounded-xl border border-cosmic-border group-hover:border-cosmic-accent/50 transition-all duration-300">
                <motion.div
                  animate={
                    isHovered
                      ? {
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0],
                        }
                      : {}
                  }
                  transition={{
                    duration: 1,
                    repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
                    repeatType: "reverse",
                  }}
                >
                  <Icon className="w-8 h-8 text-cosmic-accent" />
                </motion.div>
              </div>
            </div>

            {/* Enhanced title com animação */}
            <motion.h3
              className="text-lg xxs:text-xl sm:text-2xl font-bold text-center text-white mb-2 xxs:mb-3 group-hover:text-cosmic-accent transition-colors duration-300"
              animate={isHovered ? { y: -3 } : { y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {title}
            </motion.h3>

            {/* Enhanced description */}
            <p className="text-sm xxs:text-base text-cosmic-text text-center leading-relaxed mb-4 xxs:mb-5 sm:mb-6">
              {description}
            </p>

            {/* Features list com animação otimizada */}
            <div className="mt-auto">
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    className="grid grid-cols-1 xxs:grid-cols-2 gap-2 mt-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {features.map((feature, idx) => (
                      <motion.div
                        key={feature}
                        className="flex items-center justify-center p-2 rounded-lg bg-cosmic-bg/30 border border-cosmic-border/50"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2, delay: idx * 0.05 }}
                      >
                        <span className="text-xs text-cosmic-text">{feature}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Decorative element com animação simplificada */}
            <motion.div
              className="absolute bottom-3 right-3 w-16 h-16 opacity-10 pointer-events-none"
              animate={{
                rotate: [0, 360],
                opacity: isHovered ? 0.2 : 0.1,
              }}
              transition={{
                rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                opacity: { duration: 0.3 },
              }}
            >
              <div className="w-full h-full border-2 border-cosmic-accent rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 border-2 border-cosmic-accent rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border-2 border-cosmic-accent rounded-full"></div>
            </motion.div>
          </div>
        </motion.div>
      </Tilt>
    </motion.div>
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
  },
}

export default Services

