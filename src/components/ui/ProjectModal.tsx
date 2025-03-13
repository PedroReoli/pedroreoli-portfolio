"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { Project } from "@/constants/projectsData"
import { X, ExternalLink, Github, ChevronLeft, ChevronRight, Calendar, Tag, Code, Info } from "lucide-react"

interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Reset image index when project changes
  useEffect(() => {
    setCurrentImageIndex(0)
  }, [project])

  // Close modal on ESC key press
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      window.addEventListener("keydown", handleEsc)
      // Prevent body scroll
      document.body.style.overflow = "hidden"
    }

    return () => {
      window.removeEventListener("keydown", handleEsc)
      // Restore body scroll
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  if (!project) return null

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === project.thumbnails.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? project.thumbnails.length - 1 : prev - 1))
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-gray-900 rounded-xl overflow-hidden w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl border border-gray-800/50"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with title and close button */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800/50 bg-gray-900/80 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-blue-500">{project.title}</h2>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-gray-400 hover:text-white hover:bg-gray-800/80 transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content area with scrolling */}
            <div className="flex flex-col md:flex-row overflow-hidden flex-grow">
              {/* Image gallery - fixed height on mobile, flexible on desktop */}
              <div className="relative w-full md:w-3/5 h-64 md:h-auto bg-gray-950 flex-shrink-0">
                {project.thumbnails.map((thumbnail, idx) => (
                  <div
                    key={idx}
                    className={`absolute inset-0 transition-opacity duration-300 ${
                      idx === currentImageIndex ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <img
                      src={thumbnail || "/placeholder.svg?height=400&width=800"}
                      alt={`${project.title} screenshot ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}

                {/* Image navigation */}
                {project.thumbnails.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-2 text-white hover:bg-black/70 transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-2 text-white hover:bg-black/70 transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>

                    {/* Image indicators */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                      {project.thumbnails.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`w-2.5 h-2.5 rounded-full transition-all ${
                            idx === currentImageIndex ? "bg-blue-500 scale-110" : "bg-white/40 hover:bg-white/60"
                          }`}
                          aria-label={`Go to image ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Project details - scrollable */}
              <div className="flex-grow overflow-y-auto p-5 md:p-6">
                {/* Status badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    <Tag className="h-3 w-3" />
                    <span>{project.status}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    <Calendar className="h-3 w-3" />
                    <span>{project.type}</span>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="h-4 w-4 text-blue-400" />
                    <h3 className="text-sm font-semibold text-white">Sobre o projeto</h3>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {project.detailedDescription || project.description}
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Code className="h-4 w-4 text-blue-400" />
                    <h3 className="text-sm font-semibold text-white">Tecnologias</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, index) => (
                      <span
                        key={index}
                        className="text-xs px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm font-medium flex-1"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Ver Projeto
                  </a>
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm font-medium flex-1 border border-gray-700"
                  >
                    <Github className="h-4 w-4" />
                    Repositório
                  </a>
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

