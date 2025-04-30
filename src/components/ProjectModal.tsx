"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { Project } from "@/constants/projectsData"
import { X, ExternalLink, Github, ChevronLeft, ChevronRight, Calendar, Code, Layers, Info, Play } from "lucide-react"
import { useTranslation } from "react-i18next"

interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  const { t } = useTranslation()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<"info" | "tech">("info")
  const modalRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement | null>(null)

  // Reset image index when project changes
  useEffect(() => {
    setCurrentImageIndex(0)
    setActiveTab("info")
  }, [project])

  // Close modal on ESC key press
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      window.addEventListener("keydown", handleEsc)
    }

    return () => {
      window.removeEventListener("keydown", handleEsc)
    }
  }, [isOpen, onClose])

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  // Find the parent section and close modal when scrolling away
  useEffect(() => {
    if (isOpen && modalRef.current) {
      // Find the parent section
      let element = modalRef.current.parentElement
      while (element && element.tagName !== "SECTION") {
        element = element.parentElement
      }
      sectionRef.current = element as HTMLElement

      // Function to check if we've scrolled away from the section
      const handleScroll = () => {
        if (sectionRef.current) {
          const rect = sectionRef.current.getBoundingClientRect()
          // If the section is no longer visible (or mostly not visible)
          if (rect.bottom < 0 || rect.top > window.innerHeight) {
            onClose()
          }
        }
      }

      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [isOpen, onClose])

  if (!project) return null

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === project.thumbnails.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? project.thumbnails.length - 1 : prev - 1))
  }

  // Determinar se temos um vídeo para mostrar
  const hasVideo = project.youtubeUrl || project.videoUrl

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
          {/* Modal */}
          <motion.div
            ref={modalRef}
            className="relative bg-gray-900/90 backdrop-blur-md rounded-2xl overflow-hidden w-full max-w-4xl shadow-xl border border-gray-800/50 pointer-events-auto"
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ duration: 0.2, type: "spring", damping: 25 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-10 bg-black/50 rounded-full p-1.5 text-white hover:bg-black/70 transition-colors"
              aria-label="Fechar modal"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex flex-col md:flex-row max-h-[80vh]">
              {/* Image gallery - Lado esquerdo */}
              <div className="md:w-1/2 relative bg-gray-950">
                <div className="aspect-video md:aspect-auto md:h-full">
                  {project.thumbnails.map((thumbnail, idx) => (
                    <div
                      key={idx}
                      className={`absolute inset-0 transition-opacity duration-300 ${
                        idx === currentImageIndex ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <img
                        src={thumbnail || "/placeholder.svg?height=400&width=800"}
                        alt={`${t(project.titleKey)} screenshot ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* Image navigation - only show if multiple images */}
                {project.thumbnails.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-1.5 text-white hover:bg-black/70 transition-colors"
                      aria-label="Imagem anterior"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-1.5 text-white hover:bg-black/70 transition-colors"
                      aria-label="Próxima imagem"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>

                    {/* Image indicators */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                      {project.thumbnails.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`w-1.5 h-1.5 rounded-full ${idx === currentImageIndex ? "bg-white" : "bg-white/40"}`}
                          aria-label={`Ir para imagem ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Content - Lado direito */}
              <div className="md:w-1/2 flex flex-col overflow-hidden">
                {/* Header */}
                <div className="p-4 pb-2 border-b border-gray-800/30">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {t(`projects.status.${project.status}`)}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center gap-1">
                      <Code className="h-3 w-3" />
                      {t(`projects.type.${project.type}`)}
                    </span>
                  </div>

                  <h2 className="title font-bold text-blue-500">{t(project.titleKey)}</h2>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-800/30">
                  <button
                    onClick={() => setActiveTab("info")}
                    className={`flex items-center gap-1 px-4 py-2 text-xs font-medium relative ${
                      activeTab === "info" ? "text-blue-500" : "text-gray-400 hover:text-gray-300"
                    }`}
                  >
                    <Info className="h-3.5 w-3.5" />
                    {t("projects.information")}
                    {activeTab === "info" && (
                      <motion.div
                        layoutId="activeProjectTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                      />
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab("tech")}
                    className={`flex items-center gap-1 px-4 py-2 text-xs font-medium relative ${
                      activeTab === "tech" ? "text-blue-500" : "text-gray-400 hover:text-gray-300"
                    }`}
                  >
                    <Layers className="h-3.5 w-3.5" />
                    {t("projects.technologies")}
                    {activeTab === "tech" && (
                      <motion.div
                        layoutId="activeProjectTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                      />
                    )}
                  </button>
                </div>

                {/* Tab content */}
                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                  <AnimatePresence mode="wait">
                    {activeTab === "info" && (
                      <motion.div
                        key="info"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="prose prose-sm prose-invert max-w-none">
                          <p className="text-xs text-gray-300 leading-relaxed">
                            {project.detailedDescriptionKey
                              ? t(project.detailedDescriptionKey)
                              : t(project.descriptionKey)}
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === "tech" && (
                      <motion.div
                        key="tech"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <h3 className="text-xs font-semibold text-white mb-3">{t("projects.techStack")}</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {project.techStack.map((tech, index) => (
                            <div
                              key={index}
                              className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-2 text-center"
                            >
                              <span className="text-xs text-blue-400">{tech}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Footer with links */}
                <div className="p-3 border-t border-gray-800/30">
                  <div className="flex gap-2">
                    {project.link && project.link !== "#" ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-xs flex-1 justify-center"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        {t("projects.viewApp")}
                      </a>
                    ) : (
                      <div className="flex items-center gap-1 px-3 py-1.5 bg-blue-500/50 text-gray-200 rounded-lg text-xs flex-1 justify-center cursor-not-allowed">
                        <ExternalLink className="h-3.5 w-3.5" />
                        {t("projects.privateApp")}
                      </div>
                    )}

                    {project.repo ? (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors text-xs flex-1 justify-center"
                      >
                        <Github className="h-3.5 w-3.5" />
                        {t("projects.repository")}
                      </a>
                    ) : (
                      <div className="flex items-center gap-1 px-3 py-1.5 bg-gray-800 text-gray-400 rounded-lg text-xs flex-1 justify-center cursor-not-allowed">
                        <Github className="h-3.5 w-3.5" />
                        {t("projects.privateCode")}
                      </div>
                    )}
                  </div>

                  {/* Botão de vídeo - apenas se houver um vídeo */}
                  {hasVideo && (
                    <div className="mt-2">
                      <a
                        href={project.youtubeUrl || project.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-xs w-full justify-center"
                      >
                        <Play className="h-3.5 w-3.5" />
                        {t("projects.watchVideo")}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default ProjectModal
