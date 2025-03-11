"use client"

import type React from "react"

import { useState, useRef, useEffect, useMemo } from "react" // Adicionado useMemo para otimização
import { motion, AnimatePresence, useInView, useMotionValue } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Database, Server, Globe, Workflow, ExternalLink, Star, BookOpen, ChevronRight } from "lucide-react"
import { Tilt } from "react-tilt"
import { skillsData, type Skill } from "@/constants/skillsData"

const defaultTiltOptions = {
  reverse: false,
  max: 12,
  perspective: 1000,
  scale: 1.02,
  speed: 1000,
  transition: true,
  axis: null,
  reset: true,
  easing: "cubic-bezier(.03,.98,.52,.99)",
}

const Skills = () => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [scrollY, setScrollY] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Parallax effect otimizado com throttle para melhor performance
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

  // Mouse move effect otimizado para melhor performance
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e
    const { left, top } = (e.currentTarget as HTMLElement).getBoundingClientRect()

    // Usando requestAnimationFrame para otimizar atualizações
    requestAnimationFrame(() => {
      mouseX.set(clientX - left)
      mouseY.set(clientY - top)
    })
  }

  // Usando useMemo para evitar recálculos desnecessários
  const technologies = useMemo(
    () => [
      {
        category: "Front-End",
        icon: <Globe className="w-5 h-5 sm:w-6 sm:h-6" />,
        skills: skillsData.filter((skill) => skill.area === "frontend"),
        color: "#3B82F6",
      },
      {
        category: "Back-End",
        icon: <Server className="w-5 h-5 sm:w-6 sm:h-6" />,
        skills: skillsData.filter((skill) => skill.area === "backend"),
        color: "#2563EB",
      },
      {
        category: "Banco de Dados",
        icon: <Database className="w-5 h-5 sm:w-6 sm:h-6" />,
        skills: skillsData.filter((skill) => skill.area === "database"),
        color: "#1D4ED8",
      },
      {
        category: "Ferramentas",
        icon: <Workflow className="w-5 h-5 sm:w-6 sm:h-6" />,
        skills: skillsData.filter((skill) => skill.area === "tools"),
        color: "#60A5FA",
      },
    ],
    [],
  )

  const getLevelBars = (level: number, color?: string) => {
    const activeColor = color || "#60A5FA"

    return (
      <div className="flex gap-1.5">
        {[1, 2, 3].map((bar) => (
          <div
            key={bar}
            className="h-1.5 xxs:h-2 w-6 xxs:w-8 rounded-full relative overflow-hidden"
            style={{ backgroundColor: "rgba(30, 41, 59, 0.5)" }}
          >
            {bar <= Math.floor(level) && (
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: activeColor }}
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.5, delay: 0.1 * bar }}
              />
            )}
            {bar === Math.ceil(level) && level % 1 !== 0 && (
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: activeColor }}
                initial={{ width: 0 }}
                animate={{ width: `${(level % 1) * 100}%` }}
                transition={{ duration: 0.5, delay: 0.1 * bar }}
              />
            )}
          </div>
        ))}
      </div>
    )
  }

  const getLevelText = (level: number) => {
    if (level <= 1) return "Conhecimentos básicos"
    if (level <= 2) return "Conhecimentos intermediários"
    return "Conhecimentos avançados"
  }

  return (
    <section
      ref={ref}
      className="text-white min-h-screen py-10 xxs:py-12 xs:py-14 sm:py-16 px-3 xxs:px-4 sm:px-6 md:px-8 lg:px-12 relative overflow-hidden"
      id="skills"
      onMouseMove={handleMouseMove}
    >
      {/* Interactive background gradient com position relative para cálculo correto de scroll offset */}
      <motion.div
        className="absolute inset-0 bg-cosmic-bg/80 backdrop-blur-sm"
        style={{
          // Usando backgroundImage em vez de background para evitar conflitos
          backgroundImage: "radial-gradient(circle at 50% 50%, rgba(15, 23, 42, 0.8), rgba(10, 17, 32, 0.9))",
        }}
      />

      {/* Enhanced animated stars com parallax - Reduzido número de elementos para melhor performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 25 }).map((_, i) => {
          // Reduzido de 40 para 25 estrelas
          const size = Math.random() * 2 + 1
          const colors = ["#93C5FD", "#60A5FA", "#3B82F6", "#DBEAFE"]
          const color = colors[i % colors.length]
          const parallaxFactor = 0.02 * ((i % 3) + 1)

          return (
            <motion.div
              key={`skill-star-${i}`}
              className="absolute rounded-full"
              style={{
                width: size,
                height: size,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                backgroundColor: color,
                boxShadow: `0 0 ${size * 3}px ${size}px ${color}`,
                opacity: Math.random() * 0.7 + 0.3,
                transform: `translateY(${scrollY * parallaxFactor}px)`,
              }}
              animate={{
                opacity: [Math.random() * 0.7 + 0.3, Math.random() * 0.9 + 0.5, Math.random() * 0.7 + 0.3],
                scale: [1, Math.random() * 0.3 + 1.1, 1],
              }}
              transition={{
                duration: Math.random() * 4 + 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: Math.random() * 5,
              }}
            />
          )
        })}
      </div>

      {/* Enhanced nebula clouds com parallax - Reduzido para melhor performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 3 }).map((_, i) => {
          const colors = [
            "radial-gradient(circle, rgba(96, 165, 250, 0.15) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 80%)",
            "radial-gradient(circle, rgba(37, 99, 235, 0.12) 0%, rgba(29, 78, 216, 0.04) 50%, transparent 80%)",
            "radial-gradient(circle, rgba(147, 197, 253, 0.10) 0%, rgba(191, 219, 254, 0.03) 50%, transparent 80%)",
          ]

          const parallaxFactor = 0.05 * ((i % 3) + 1)

          return (
            <motion.div
              key={`skill-nebula-${i}`}
              className="absolute rounded-full"
              style={{
                // Separando backgroundImage de outras propriedades para evitar conflitos
                backgroundImage: colors[i % colors.length],
                width: Math.random() * 600 + 400,
                height: Math.random() * 600 + 400,
                top: `${20 + i * 30}%`,
                left: `${20 + i * 20}%`,
                opacity: 0.4,
                filter: "blur(80px)",
                transform: `translateY(${scrollY * parallaxFactor}px)`,
              }}
              animate={{
                scale: [1, 1.1, 0.95, 1.05, 1],
                opacity: [0.4, 0.5, 0.3, 0.45, 0.4],
              }}
              transition={{
                duration: 25 + i * 5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          )
        })}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative inline-block">
            <motion.div
              className="absolute -inset-1 rounded-full blur-xl opacity-60"
              style={{
                // Separando backgroundImage de outras propriedades para evitar conflitos
                backgroundImage: "linear-gradient(90deg, #3B82F6, #60A5FA, #3B82F6)",
              }}
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
                scale: [0.8, 1.2, 0.8],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{
                backgroundPosition: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                scale: { duration: 6, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" },
                opacity: { duration: 4, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" },
              }}
            />
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
                Habilidades
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
          </div>

          <motion.p
            className="mt-4 text-cosmic-text max-w-2xl mx-auto text-base sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Tecnologias e ferramentas que utilizo para criar soluções digitais
          </motion.p>
        </motion.div>

        {/* Ultra modern skills grid com layout responsivo melhorado */}
        <motion.div
          className="grid gap-6 xxs:gap-7 sm:gap-8 md:gap-10 grid-cols-1 sm:grid-cols-2"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 },
            },
          }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {technologies.map((tech, techIndex) => (
            <motion.div
              key={tech.category}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    ease: "easeOut",
                    delay: techIndex * 0.1,
                  },
                },
              }}
              onMouseEnter={() => setHoveredCategory(techIndex)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <Tilt options={defaultTiltOptions}>
                <motion.div
                  className="relative group h-full"
                  whileHover={{ y: -10 }}
                  animate={{
                    y: hoveredCategory === techIndex ? -5 : 0,
                  }}
                  transition={{
                    duration: 0.4,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                  {/* Enhanced card glow effect - Simplificado para melhor performance */}
                  <motion.div
                    className="absolute -inset-0.5 rounded-2xl blur-md z-0"
                    style={{
                      // Separando backgroundImage de outras propriedades para evitar conflitos
                      backgroundImage: `linear-gradient(45deg, ${tech.color}66, ${tech.color}33)`,
                      opacity: 0,
                    }}
                    animate={
                      hoveredCategory === techIndex
                        ? {
                            opacity: 1,
                            backgroundImage: `linear-gradient(45deg, ${tech.color}66, ${tech.color}33)`,
                          }
                        : {
                            opacity: 0,
                            backgroundImage: `linear-gradient(45deg, ${tech.color}33, ${tech.color}11)`,
                          }
                    }
                    transition={{ duration: 0.3 }}
                  />

                  {/* Card content com glassmorphism effect e layout responsivo melhorado */}
                  <div className="relative flex flex-col h-full p-4 xxs:p-5 xs:p-6 sm:p-8 bg-cosmic-card/80 backdrop-blur-xl rounded-2xl border border-cosmic-border/50 z-10 overflow-hidden">
                    {/* Animated background pattern - Simplificado para melhor performance */}
                    <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
                      <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id={`grid-${techIndex}`} width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke={tech.color} strokeWidth="0.5" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill={`url(#grid-${techIndex})`} />
                      </svg>
                      <motion.div
                        className="absolute inset-0"
                        animate={{
                          backgroundPosition: ["0% 0%", "100% 100%"],
                        }}
                        transition={{
                          duration: 20,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                        style={{
                          // Separando backgroundImage de outras propriedades para evitar conflitos
                          backgroundImage: `radial-gradient(circle at 50% 50%, ${tech.color}11 0%, transparent 70%)`,
                          backgroundSize: "100% 100%",
                        }}
                      />
                    </div>

                    {/* Enhanced category header com icon */}
                    <div className="relative flex items-center gap-2 xxs:gap-3 mb-4 xxs:mb-5 sm:mb-6">
                      <div className="relative w-12 h-12">
                        <motion.div
                          className="absolute inset-0 rounded-xl blur-md"
                          style={{ backgroundColor: tech.color }}
                          animate={{
                            opacity: hoveredCategory === techIndex ? [0.3, 0.5, 0.3] : [0.2, 0.3, 0.2],
                            scale: hoveredCategory === techIndex ? [1, 1.2, 1] : [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                          }}
                        />
                        <div className="relative flex items-center justify-center w-full h-full bg-cosmic-card/80 backdrop-blur-sm rounded-xl border border-cosmic-border/50">
                          <motion.div
                            className="text-cosmic-accent"
                            style={{ color: tech.color }}
                            animate={
                              hoveredCategory === techIndex
                                ? {
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 5, -5, 0],
                                  }
                                : {}
                            }
                            transition={{
                              duration: 1.5,
                              repeat: hoveredCategory === techIndex ? Number.POSITIVE_INFINITY : 0,
                              repeatType: "reverse",
                            }}
                          >
                            {tech.icon}
                          </motion.div>
                        </div>
                      </div>
                      <div>
                        <h3
                          className="text-xl sm:text-2xl font-bold text-white group-hover:text-cosmic-accent transition-colors duration-300"
                          style={{
                            color: hoveredCategory === techIndex ? tech.color : "white",
                          }}
                        >
                          {tech.category}
                        </h3>
                        <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-transparent via-cosmic-accent to-transparent transition-all duration-700 mt-1" />
                      </div>
                    </div>

                    {/* Enhanced skills grid com hover effects e layout responsivo melhorado */}
                    <div className="grid grid-cols-1 xxs:grid-cols-2 gap-2 xxs:gap-3">
                      {tech.skills.map((skill, skillIndex) => {
                        const SkillIcon = skill.icon
                        return (
                          <motion.button
                            key={skill.title}
                            onClick={() => setSelectedSkill(skill)}
                            className="relative group/skill"
                            whileHover={{ scale: 1.05, x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            onMouseEnter={() => setHoveredSkill(skill.title)}
                            onMouseLeave={() => setHoveredSkill(null)}
                            variants={{
                              hidden: { opacity: 0, y: 10 },
                              visible: {
                                opacity: 1,
                                y: 0,
                                transition: {
                                  duration: 0.4,
                                  delay: skillIndex * 0.05 + techIndex * 0.1,
                                },
                              },
                            }}
                          >
                            {/* Enhanced skill button glow - Simplificado para melhor performance */}
                            <motion.div
                              className="absolute -inset-0.5 rounded-xl blur-sm"
                              style={{
                                // Separando backgroundImage de outras propriedades para evitar conflitos
                                backgroundImage: `linear-gradient(45deg, ${skill.color || tech.color}66, ${skill.color || tech.color}33)`,
                                opacity: 0,
                              }}
                              animate={{
                                opacity: hoveredSkill === skill.title ? 1 : 0,
                              }}
                              transition={{ duration: 0.2 }}
                            />

                            {/* Skill button com glassmorphism e layout responsivo melhorado */}
                            <div className="relative p-3 bg-cosmic-bg/50 backdrop-blur-sm rounded-xl border border-cosmic-border/50 group-hover/skill:border-opacity-0 transition-all duration-300">
                              <div className="flex items-center gap-2">
                                <div className="relative">
                                  <motion.div
                                    className="absolute inset-0 rounded-full blur-sm"
                                    style={{ backgroundColor: skill.color || tech.color }}
                                    animate={{
                                      opacity: hoveredSkill === skill.title ? 0.5 : 0,
                                      scale: hoveredSkill === skill.title ? 1.5 : 1,
                                    }}
                                    transition={{ duration: 0.2 }}
                                  />
                                  <SkillIcon
                                    className="w-5 h-5 relative z-10"
                                    style={{ color: skill.color || tech.color }}
                                  />
                                </div>
                                <span
                                  className="text-sm font-medium text-cosmic-text group-hover/skill:text-white transition-colors"
                                  style={{
                                    color: hoveredSkill === skill.title ? skill.color || tech.color : undefined,
                                  }}
                                >
                                  {skill.title}
                                </span>
                              </div>
                            </div>
                          </motion.button>
                        )
                      })}
                    </div>

                    {/* Enhanced decorative elements - Simplificado para melhor performance */}
                    <motion.div
                      className="absolute bottom-3 right-3 w-16 h-16 opacity-10 pointer-events-none"
                      animate={{
                        rotate: [0, 360],
                        opacity: hoveredCategory === techIndex ? 0.2 : 0.1,
                      }}
                      transition={{
                        rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                        opacity: { duration: 0.3 },
                      }}
                    >
                      <div className="w-full h-full border-2 rounded-full" style={{ borderColor: tech.color }}></div>
                      <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 border-2 rounded-full"
                        style={{ borderColor: tech.color }}
                      ></div>
                      <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border-2 rounded-full"
                        style={{ borderColor: tech.color }}
                      ></div>
                    </motion.div>
                  </div>
                </motion.div>
              </Tilt>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action buttons */}
        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.button
            className="relative group px-6 py-3 bg-cosmic-card/80 backdrop-blur-sm rounded-xl border border-cosmic-accent/50 flex items-center gap-2 text-cosmic-accent hover:text-white transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              // Scroll to projects section
              const projectsSection = document.getElementById("projects")
              if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: "smooth" })
              }
            }}
          >
            <motion.div className="absolute -inset-0.5 rounded-xl blur-sm bg-cosmic-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10">Ver projetos</span>
            <ChevronRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.button>
        </motion.div>

        {/* Enhanced skill detail modal */}
        <AnimatePresence>
          {selectedSkill && (
            <Dialog open={!!selectedSkill} onOpenChange={() => setSelectedSkill(null)}>
              <DialogContent className="bg-cosmic-card/90 backdrop-blur-xl border-cosmic-border/50 text-white max-w-[90vw] xxs:max-w-[85vw] sm:max-w-lg">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", duration: 0.5 }}
                >
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold flex items-center gap-2">
                      <div className="relative">
                        <motion.div
                          className="absolute inset-0 rounded-full blur-md"
                          style={{ backgroundColor: selectedSkill.color || "#60A5FA" }}
                          animate={{
                            opacity: [0.3, 0.5, 0.3],
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                          }}
                        />
                        <selectedSkill.icon
                          className="w-6 h-6 relative z-10"
                          style={{ color: selectedSkill.color || "#60A5FA" }}
                        />
                      </div>
                      <span>{selectedSkill.title}</span>
                    </DialogTitle>
                  </DialogHeader>

                  <div className="space-y-4 xxs:space-y-5 sm:space-y-6 mt-4 xxs:mt-5 sm:mt-6">
                    {/* Description com animated underline */}
                    {selectedSkill.description && (
                      <motion.div
                        className="space-y-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 }}
                      >
                        <p className="text-sm leading-relaxed text-cosmic-text">{selectedSkill.description}</p>
                        <motion.div
                          className="h-px w-0 bg-gradient-to-r from-transparent via-cosmic-accent to-transparent"
                          animate={{ width: "100%" }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </motion.div>
                    )}

                    {/* Enhanced skill level visualization */}
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <h4 className="text-sm font-medium text-cosmic-text flex items-center gap-1.5">
                        <Star className="w-4 h-4" style={{ color: selectedSkill.color || "#60A5FA" }} />
                        <span>Nível de Proficiência</span>
                      </h4>
                      <div className="pl-1">{getLevelBars(selectedSkill.level, selectedSkill.color)}</div>
                      <p className="text-xs text-cosmic-text/80 pl-1 pt-1">{getLevelText(selectedSkill.level)}</p>
                    </motion.div>

                    {/* Enhanced courses list com staggered animation */}
                    <motion.div
                      className="space-y-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h4 className="text-sm font-medium text-cosmic-text flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4" style={{ color: selectedSkill.color || "#60A5FA" }} />
                        <span>Cursos e Certificações</span>
                      </h4>
                      <div className="grid gap-2">
                        {selectedSkill.courses.map((course, idx) => (
                          <motion.a
                            key={idx}
                            href={selectedSkill.coursesLinks[idx]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative group/link"
                            whileHover={{ scale: 1.02, x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + idx * 0.1 }}
                          >
                            <div
                              className="absolute -inset-0.5 rounded-xl blur-sm opacity-0 group-hover/link:opacity-100 transition duration-300"
                              style={{
                                // Separando backgroundImage de outras propriedades para evitar conflitos
                                backgroundImage: `linear-gradient(to right, ${selectedSkill.color || "#60A5FA"}66, ${selectedSkill.color || "#60A5FA"}33)`,
                              }}
                            />
                            <div className="relative p-4 bg-cosmic-bg/50 backdrop-blur-sm rounded-xl border border-cosmic-border/50 group-hover/link:border-opacity-0 transition-all duration-300">
                              <div className="flex justify-between items-center">
                                <p className="text-sm text-cosmic-text group-hover/link:text-white transition-colors">
                                  {course}
                                </p>
                                <ExternalLink className="w-4 h-4 text-cosmic-text group-hover/link:text-white transition-colors" />
                              </div>
                            </div>
                          </motion.a>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </DialogContent>
            </Dialog>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Skills

