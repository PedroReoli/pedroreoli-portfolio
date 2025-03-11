"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import {
  Eye,
  ArrowRight,
  ArrowLeft,
  Calendar,
  GitBranch,
  Folder,
  Tag,
  Users,
  ChevronDown,
  CheckCircle2,
  Star,
  Clock,
} from "lucide-react"
import { projectsData, type Project } from "@/constants/projectsData"
import { useSwipeable } from "react-swipeable"
import ProjectModal from "@/components/ui/ProjectModal"

const Projects = () => {
  // State for image navigation and expanded projects
  const [currentImageIndices, setCurrentImageIndices] = useState<{ [key: number]: number }>(
    projectsData.reduce((acc, _, index) => ({ ...acc, [index]: 0 }), {}),
  )
  const [expandedProject, setExpandedProject] = useState<number | null>(null)
  const [scrollY, setScrollY] = useState(0)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  // Parallax effect for background elements - Otimizado para evitar problemas de performance
  useEffect(() => {
    const handleScroll = () => {
      // Usando requestAnimationFrame para melhorar performance
      requestAnimationFrame(() => {
        setScrollY(window.scrollY)
      })
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle image navigation
  const handleImageNavigation = useCallback((projectIndex: number, direction: "next" | "prev") => {
    setCurrentImageIndices((prev) => {
      const thumbnails = projectsData[projectIndex].thumbnails
      return {
        ...prev,
        [projectIndex]:
          direction === "next"
            ? (prev[projectIndex] + 1) % thumbnails.length
            : (prev[projectIndex] - 1 + thumbnails.length) % thumbnails.length,
      }
    })
  }, [])

  // Toggle project expansion
  const toggleProjectExpand = (index: number) => {
    setExpandedProject(expandedProject === index ? null : index)
  }

  return (
    <section
      ref={ref}
      className="text-white min-h-screen py-10 xxs:py-12 xs:py-14 sm:py-16 px-3 xxs:px-4 sm:px-6 md:px-8 lg:px-12 relative overflow-hidden"
      id="projects"
    >
      {/* Enhanced cosmic background with parallax */}
      <div className="absolute inset-0 bg-cosmic-bg/80 backdrop-blur-sm"></div>

      {/* Animated nebula clouds with parallax - Reduzido para melhorar performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 3 }).map((_, i) => {
          const colors = [
            "radial-gradient(circle, rgba(147, 197, 253, 0.15) 0%, rgba(96, 165, 250, 0.05) 50%, transparent 80%)",
            "radial-gradient(circle, rgba(196, 181, 253, 0.15) 0%, rgba(167, 139, 250, 0.05) 50%, transparent 80%)",
            "radial-gradient(circle, rgba(249, 168, 212, 0.15) 0%, rgba(236, 72, 153, 0.05) 50%, transparent 80%)",
          ]

          const parallaxFactor = 0.05 * ((i % 3) + 1)

          return (
            <motion.div
              key={`project-nebula-${i}`}
              className="absolute rounded-full"
              style={{
                background: colors[i % colors.length],
                width: Math.random() * 600 + 400,
                height: Math.random() * 600 + 400,
                top: `${20 + i * 20}%`,
                left: `${20 + i * 20}%`,
                opacity: 0.4,
                filter: "blur(80px)",
                transform: `translateY(${scrollY * parallaxFactor}px)`,
                // Removido will-change para melhorar performance
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

      {/* Animated stars with parallax - Reduzido para melhorar performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 25 }).map((_, i) => {
          const size = Math.random() * 2 + 1
          const colors = ["#F9A8D4", "#C4B5FD", "#93C5FD", "#FFFFFF"]
          const color = colors[i % colors.length]
          const parallaxFactor = 0.02 * ((i % 3) + 1)

          return (
            <motion.div
              key={`project-star-${i}`}
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
                // Removido will-change para melhorar performance
              }}
              animate={{
                opacity: [Math.random() * 0.7 + 0.3, Math.random() * 0.9 + 0.5, Math.random() * 0.7 + 0.3],
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

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-8 xxs:mb-10 sm:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl xxs:text-3xl sm:text-4xl font-bold text-white">
            Meus Projetos<span className="text-cosmic-accent">;</span>
          </h2>
          <p className="mt-3 xxs:mt-4 text-cosmic-text max-w-2xl mx-auto text-sm xxs:text-base">
            Conheça alguns dos projetos que desenvolvi, desde aplicações web até plataformas educacionais.
          </p>
        </motion.div>

        {/* Projects grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
          }}
          className="grid grid-cols-1 gap-4 xxs:gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-5 lg:gap-6"
        >
          {projectsData.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              currentImageIndex={currentImageIndices[index]}
              onImageNavigation={(direction) => handleImageNavigation(index, direction)}
              index={index}
              isExpanded={expandedProject === index}
              onToggleExpand={() => toggleProjectExpand(index)}
              isHovered={hoveredProject === index}
              onHover={() => setHoveredProject(index)}
              onLeave={() => setHoveredProject(null)}
            />
          ))}
        </motion.div>
      </div>

      {/* Project Modal */}
      {expandedProject !== null && (
        <ProjectModal
          project={projectsData[expandedProject]}
          isOpen={expandedProject !== null}
          onClose={() => setExpandedProject(null)}
          currentImageIndex={currentImageIndices[expandedProject]}
          onImageNavigation={(direction) => handleImageNavigation(expandedProject, direction)}
        />
      )}
    </section>
  )
}

const ProjectCard = ({
  project,
  currentImageIndex,
  onImageNavigation,
  index,
  onToggleExpand,
  isHovered,
  onHover,
  onLeave,
}: {
  project: Project
  currentImageIndex: number
  onImageNavigation: (direction: "next" | "prev") => void
  index: number
  isExpanded: boolean
  onToggleExpand: () => void
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
}) => {
  const cardRef = useRef<HTMLDivElement>(null)

  // Swipe handlers for mobile image navigation
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => onImageNavigation("next"),
    onSwipedRight: () => onImageNavigation("prev"),
    trackMouse: true,
  })

  // Status color and icon mapping
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "Finalizado":
        return {
          color: "bg-green-500/10 text-green-400 border-green-500/20",
          icon: <CheckCircle2 className="w-3 h-3" />,
          glow: "rgba(74, 222, 128, 0.5)",
        }
      case "Beta":
        return {
          color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
          icon: <Star className="w-3 h-3" />,
          glow: "rgba(96, 165, 250, 0.5)",
        }
      case "Em Desenvolvimento":
        return {
          color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
          icon: <Clock className="w-3 h-3" />,
          glow: "rgba(250, 204, 21, 0.5)",
        }
      default:
        return {
          color: "bg-gray-500/10 text-gray-400 border-gray-500/20",
          icon: <Tag className="w-3 h-3" />,
          glow: "rgba(156, 163, 175, 0.5)",
        }
    }
  }

  // Type icon mapping
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Colaborativo":
        return <Users className="w-3.5 h-3.5 xxs:w-4 xxs:h-4" />
      case "Freelance":
        return <GitBranch className="w-3.5 h-3.5 xxs:w-4 xxs:h-4" />
      case "Pessoal":
      default:
        return <Tag className="w-3.5 h-3.5 xxs:w-4 xxs:h-4" />
    }
  }

  const statusInfo = getStatusInfo(project.status)

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: "easeOut",
            delay: index * 0.1,
          },
        },
      }}
      className="group relative h-full"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      ref={cardRef}
    >
      {/* Card with hover effects */}
      <motion.div
        className="relative h-full bg-cosmic-card/80 backdrop-blur-sm rounded-xl overflow-hidden border border-cosmic-border hover:border-cosmic-accent/50 transition-all duration-500"
        whileHover={{
          y: -8,
          boxShadow: "0 10px 30px -10px rgba(96, 165, 250, 0.2)",
        }}
      >
        {/* Image section */}
        <div className="relative aspect-video overflow-hidden" {...swipeHandlers}>
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={project.thumbnails[currentImageIndex]}
              alt={project.title}
              className="w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            />
          </AnimatePresence>

          {/* Image overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-cosmic-card via-cosmic-card/20 to-transparent opacity-80" />

          {/* Navigation arrows */}
          {project.thumbnails.length > 1 && (
            <>
              <div className="absolute inset-0 flex items-center justify-between px-2 xxs:px-3">
                <motion.button
                  onClick={(e) => {
                    e.preventDefault()
                    onImageNavigation("prev")
                  }}
                  className="p-1.5 xxs:p-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/50"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ArrowLeft className="w-3 h-3 xxs:w-3.5 xxs:h-3.5 text-white" />
                </motion.button>
                <motion.button
                  onClick={(e) => {
                    e.preventDefault()
                    onImageNavigation("next")
                  }}
                  className="p-1.5 xxs:p-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/50"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ArrowRight className="w-3 h-3 xxs:w-3.5 xxs:h-3.5 text-white" />
                </motion.button>
              </div>

              {/* Image indicators */}
              <div className="absolute bottom-2 xxs:bottom-3 left-1/2 -translate-x-1/2 flex gap-1 xxs:gap-1.5">
                {project.thumbnails.map((_, idx) => (
                  <motion.div
                    key={idx}
                    className={`h-1 xxs:h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentImageIndex ? "w-4 xxs:w-6 bg-cosmic-accent" : "w-1 xxs:w-1.5 bg-white/40"
                    }`}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => {
                      const direction = idx > currentImageIndex ? "next" : "prev"
                      // Navigate to the specific index by calling onImageNavigation multiple times
                      for (let i = 0; i < Math.abs(idx - currentImageIndex); i++) {
                        onImageNavigation(direction)
                      }
                    }}
                    style={{ cursor: "pointer" }}
                  />
                ))}
              </div>
            </>
          )}

          {/* Status badge */}
          <div className="absolute top-2 xxs:top-3 right-2 xxs:right-3">
            <motion.span
              className={`inline-flex items-center gap-1 xxs:gap-1.5 px-1.5 xxs:px-2 py-0.5 xxs:py-1 rounded-md text-[10px] xxs:text-xs font-medium border ${statusInfo.color}`}
              whileHover={{ scale: 1.05 }}
              animate={
                isHovered
                  ? {
                      boxShadow: ["0 0 0 rgba(0, 0, 0, 0)", `0 0 8px ${statusInfo.glow}`, "0 0 0 rgba(0, 0, 0, 0)"],
                    }
                  : {}
              }
              transition={{
                duration: 2,
                repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
                repeatType: "reverse",
              }}
            >
              {statusInfo.icon}
              <span>{project.status}</span>
            </motion.span>
          </div>

          {/* Project type badge */}
          <div className="absolute top-2 xxs:top-3 left-2 xxs:left-3">
            <motion.span
              className="inline-flex items-center gap-1 xxs:gap-1.5 px-1.5 xxs:px-2 py-0.5 xxs:py-1 rounded-md text-[10px] xxs:text-xs font-medium bg-black/40 backdrop-blur-sm text-white border border-white/10"
              whileHover={{ scale: 1.05 }}
            >
              {getTypeIcon(project.type)}
              <span className="ml-0.5 xxs:ml-1">{project.type}</span>
            </motion.span>
          </div>

          {/* Project title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-3 xxs:p-4">
            <h3 className="text-base xxs:text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-cosmic-accent transition-colors duration-300">
              {project.title}
            </h3>

            {/* Category badge */}
            <div className="flex flex-wrap items-center gap-1.5 xxs:gap-2">
              <span className="inline-flex items-center gap-0.5 xxs:gap-1 px-1.5 xxs:px-2 py-0.5 rounded-md text-[10px] xxs:text-xs font-medium bg-black/30 backdrop-blur-sm text-white border border-white/10">
                <Folder className="w-3 h-3 xxs:w-3.5 xxs:h-3.5" />
                <span className="ml-0.5 xxs:ml-1">{project.category}</span>
              </span>

              {project.duration && (
                <span className="inline-flex items-center gap-0.5 xxs:gap-1 px-1.5 xxs:px-2 py-0.5 rounded-md text-[10px] xxs:text-xs font-medium bg-black/30 backdrop-blur-sm text-white border border-white/10">
                  <Calendar className="w-3 h-3 xxs:w-3.5 xxs:h-3.5" />
                  <span className="ml-0.5 xxs:ml-1">{project.duration}</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Content section */}
        <div className="p-3 xxs:p-4">
          {/* Description - truncated */}
          <p className="text-xs xxs:text-sm text-cosmic-text line-clamp-2 mb-3 xxs:mb-4">{project.description}</p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1 xxs:gap-1.5 mb-3 xxs:mb-4">
            {project.techStack.slice(0, 3).map((tech, idx) => (
              <span
                key={idx}
                className="px-1.5 xxs:px-2 py-0.5 xxs:py-1 text-[10px] xxs:text-xs font-medium bg-cosmic-accent/10 text-cosmic-accent rounded-md border border-cosmic-accent/20"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 3 && (
              <span className="px-1.5 xxs:px-2 py-0.5 xxs:py-1 text-[10px] xxs:text-xs font-medium bg-cosmic-text/5 text-cosmic-text rounded-md border border-cosmic-text/10">
                +{project.techStack.length - 3}
              </span>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between">
            <motion.button
              onClick={onToggleExpand}
              className="flex items-center gap-1 xxs:gap-1.5 text-[10px] xxs:text-xs font-medium text-cosmic-accent hover:text-white transition-colors duration-300"
              whileHover={{ scale: 1.05, x: 2 }}
              whileTap={{ scale: 0.95 }}
            >
              Ver detalhes
              <ChevronDown className="w-3 h-3 xxs:w-3.5 xxs:h-3.5" />
            </motion.button>

            <div className="flex items-center gap-1.5 xxs:gap-2">
              <motion.a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 xxs:p-2 rounded-md bg-cosmic-text/5 text-cosmic-text hover:bg-cosmic-text/10 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <GitBranch className="w-3 h-3 xxs:w-3.5 xxs:h-3.5" />
              </motion.a>

              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 xxs:p-2 rounded-md bg-cosmic-accent/10 text-cosmic-accent hover:bg-cosmic-accent/20 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Eye className="w-3 h-3 xxs:w-3.5 xxs:h-3.5" />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Highlight indicator for featured projects */}
        {project.highlight && (
          <div className="absolute -top-1 -right-1">
            <div
              className="w-12 xxs:w-16 h-12 xxs:h-16 overflow-hidden"
              style={{
                clipPath: "polygon(0 0, 100% 100%, 100% 0)",
              }}
            >
              <div className="w-full h-full transform rotate-45 origin-top-right flex items-center justify-center bg-cosmic-accent">
                <Star className="w-2.5 h-2.5 xxs:w-3 xxs:h-3 text-white transform -rotate-45" />
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default Projects

