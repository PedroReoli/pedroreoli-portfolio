"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { type Project, projectsData } from "@/constants/projectsData"
import ProjectModal from "@/components/ProjectModal"
import { ExternalLink, Github, ChevronLeft, ChevronRight, Eye, Code, Calendar, Play } from "lucide-react"
import { useTranslation } from "react-i18next"

const Projects = () => {
  const { t } = useTranslation()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section className="relative min-h-screen py-16 md:py-24 bg-transparent">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.h2
          className="section-title font-bold text-center text-blue-500 mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t("projects.title")}
          <span className="text-white">;</span>
        </motion.h2>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
  const { t } = useTranslation()
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
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  return (
    <motion.div
      className="group bg-gray-900/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800/30 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 flex flex-col h-full"
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={index}
      whileHover={{ y: -5 }}
    >
      {/* Imagem do projeto */}
      <div className="relative aspect-video overflow-hidden">
        <div
          className="flex w-full h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
        >
          {project.thumbnails.map((thumbnail, idx) => (
            <div key={idx} className="w-full h-full flex-shrink-0">
              <img
                src={thumbnail || "/placeholder.svg?height=200&width=400"}
                alt={`${t(project.titleKey)} screenshot ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Indicador de vídeo */}
        {project.videoUrl && (
          <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full p-1.5 text-white">
            <Play className="h-4 w-4 fill-current" />
          </div>
        )}

        {/* Navegação do carrossel */}
        {project.thumbnails.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
              aria-label="Imagem anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
              aria-label="Próxima imagem"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            {/* Indicadores de imagem */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
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

        {/* Status badges */}
        <div className="absolute top-2 left-2 flex gap-1.5">
          <span className="text-xs px-1.5 py-0.5 rounded-full bg-black/50 backdrop-blur-sm text-blue-400 border border-blue-500/20 flex items-center gap-1">
            <Calendar className="h-2.5 w-2.5" />
            <span className="text-xs">{t(`projects.status.${project.status}`)}</span>
          </span>
          <span className="text-xs px-1.5 py-0.5 rounded-full bg-black/50 backdrop-blur-sm text-blue-400 border border-blue-500/20 flex items-center gap-1">
            <Code className="h-2.5 w-2.5" />
            <span className="text-xs">{t(`projects.type.${project.type}`)}</span>
          </span>
        </div>

        {/* Overlay gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
      </div>

      {/* Conteúdo do projeto */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Título */}
        <h3 className="title font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
          {t(project.titleKey)}
        </h3>

        {/* Descrição */}
        <p className="text-xs text-gray-300 mb-3 line-clamp-2">{t(project.descriptionKey)}</p>

        {/* Tech stack */}
        <div className="mt-auto">
          <div className="flex flex-wrap gap-1 mb-3">
            {project.techStack.slice(0, 3).map((tech, techIndex) => (
              <span key={techIndex} className="text-xs px-1.5 py-0.5 bg-blue-500/10 text-blue-400 rounded-full">
                {tech}
              </span>
            ))}
            {project.techStack.length > 3 && (
              <span className="text-xs px-1.5 py-0.5 bg-gray-800/50 text-gray-400 rounded-full">
                +{project.techStack.length - 3}
              </span>
            )}
          </div>

          {/* Ações */}
          <div className="flex items-center gap-2">
            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-xs flex-1"
                aria-label={`Ver demonstração de ${t(project.titleKey)}`}
              >
                <ExternalLink className="h-3 w-3" />
                {t("projects.viewApp")}
              </a>
            ) : (
              <div
                className="flex items-center justify-center gap-1 px-3 py-1.5 bg-blue-500/50 text-gray-200 rounded-lg text-xs flex-1 cursor-not-allowed"
                aria-label={`App privado de ${t(project.titleKey)}`}
              >
                <ExternalLink className="h-3 w-3" />
                {t("projects.privateApp")}
              </div>
            )}
            {project.repo ? (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors text-xs flex-1"
                aria-label={`Ver repositório de ${t(project.titleKey)}`}
              >
                <Github className="h-3 w-3" />
                {t("projects.repository")}
              </a>
            ) : (
              <div
                className="flex items-center justify-center gap-1 px-3 py-1.5 bg-gray-800 text-gray-400 rounded-lg text-xs flex-1 cursor-not-allowed"
                aria-label={`Código privado de ${t(project.titleKey)}`}
              >
                <Github className="h-3 w-3" />
                {t("projects.privateCode")}
              </div>
            )}
            <button
              onClick={onOpenModal}
              className="flex items-center justify-center p-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors border border-blue-500/20"
              aria-label={`Ver mais detalhes sobre ${t(project.titleKey)}`}
            >
              <Eye className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Projects
