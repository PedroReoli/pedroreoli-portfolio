"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import type { Project } from "@/constants/projectsData"
import { useTranslation } from "react-i18next"
import { Calendar, Code, Play } from "lucide-react"

interface ProjectCardProps {
  project: Project
  onClick: () => void
  index: number
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, index }) => {
  const { t } = useTranslation()
  const [isHovered, setIsHovered] = useState(false)

  // Verificar se o projeto tem vídeo (local ou YouTube)
  const hasVideo = project.videoUrl || project.youtubeUrl

  return (
    <motion.div
      className="group relative rounded-xl overflow-hidden cursor-pointer"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
    >
      {/* Thumbnail */}
      <div className="aspect-video relative overflow-hidden">
        <img
          src={project.thumbnails[0] || "/placeholder.svg?height=400&width=800"}
          alt={t(project.titleKey)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* Indicador de vídeo */}
        {hasVideo && (
          <div className="absolute top-2 right-2 bg-red-600 rounded-full p-1.5 backdrop-blur-sm">
            <Play className="h-3 w-3 text-white" />
          </div>
        )}

        {/* Conteúdo */}
        <div className="absolute inset-0 p-4 flex flex-col justify-end">
          <div className="flex flex-wrap gap-1.5 mb-2">
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-0.5">
              <Calendar className="h-2.5 w-2.5" />
              {t(`projects.status.${project.status}`)}
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-0.5">
              <Code className="h-2.5 w-2.5" />
              {t(`projects.type.${project.type}`)}
            </span>
          </div>

          <h3 className="text-sm font-bold text-white mb-1 line-clamp-1">{t(project.titleKey)}</h3>
          <p className="text-xs text-gray-300 line-clamp-2">{t(project.descriptionKey)}</p>

          {/* Tech stack */}
          <div className="mt-2 flex flex-wrap gap-1">
            {project.techStack.slice(0, 3).map((tech, idx) => (
              <span
                key={idx}
                className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-800/80 text-gray-300 border border-gray-700/50"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 3 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-800/80 text-gray-300 border border-gray-700/50">
                +{project.techStack.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Botão de ver mais - aparece no hover */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center bg-blue-500/0 opacity-0 group-hover:opacity-100 transition-all duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
      >
        <div className="bg-blue-500/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-white text-xs font-medium">
          {t("projects.viewDetails")}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ProjectCard
