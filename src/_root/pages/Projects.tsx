"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { type Project, projectsData } from "@/constants/projectsData"
import ProjectModal from "@/components/ProjectModal"
import { ExternalLink, Github, ChevronLeft, ChevronRight, Eye } from "lucide-react"

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section className="relative min-h-screen py-16 md:py-24 bg-transparent">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.h2
          className="section-title font-bold text-center text-blue-500 mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Projetos<span className="text-white">;</span>
        </motion.h2>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              index={index}
              isInView={isInView}
              onOpenModal={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      <ProjectModal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  )
}

interface ProjectCardProps {
  project: Project
  index: number
  isInView: boolean
  onOpenModal: () => void
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, isInView, onOpenModal }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev === project.thumbnails.length - 1 ? 0 : prev + 1))
  }

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev === 0 ? project.thumbnails.length - 1 : prev - 1))
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  return (
    <motion.div
      className="group bg-gray-900/40 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800/30 hover:border-blue-500/30 transition-all duration-300"
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={index}
      whileHover={{ y: -5 }}
    >
      {/* Thumbnail with navigation */}
      <div className="aspect-video relative overflow-hidden">
        <div
          className="flex w-full h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
        >
          {project.thumbnails.map((thumbnail, idx) => (
            <div key={idx} className="w-full h-full flex-shrink-0">
              <img
                src={thumbnail || "/placeholder.svg?height=200&width=400"}
                alt={`${project.title} screenshot ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Image navigation arrows */}
        {project.thumbnails.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Image indicators */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {project.thumbnails.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    idx === currentImageIndex ? "bg-white" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>

        {/* Status and Type badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
            {project.status}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
            {project.type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="title font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{project.title}</h3>
        <p className="text-gray-300 text-small mb-4 line-clamp-2">{project.description}</p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.techStack.slice(0, 3).map((tech, techIndex) => (
            <span key={techIndex} className="text-xs px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded-full">
              {tech}
            </span>
          ))}
          {project.techStack.length > 3 && (
            <span className="text-xs px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded-full">
              +{project.techStack.length - 3}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-small text-blue-400 hover:text-blue-300 transition-colors"
              aria-label={`Ver projeto ${project.title}`}
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Demo
            </a>
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-small text-blue-400 hover:text-blue-300 transition-colors"
              aria-label={`Ver repositório de ${project.title}`}
            >
              <Github className="h-3.5 w-3.5" />
              Repo
            </a>
          </div>

          <button
            onClick={onOpenModal}
            className="flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-full transition-colors border border-blue-500/20"
            aria-label={`Ver mais detalhes sobre ${project.title}`}
          >
            <Eye className="h-3.5 w-3.5" />
            Ver mais
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default Projects

