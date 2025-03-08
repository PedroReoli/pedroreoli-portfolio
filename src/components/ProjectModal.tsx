"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ArrowLeft, X, ExternalLink, Code, Calendar, GitBranch, Tag, Users, CheckCircle2, Layers, Star, Clock } from 'lucide-react'
import { type Project } from "@/constants/projectsData"

interface ProjectModalProps {
  project: Project
  isOpen: boolean
  onClose: () => void
  currentImageIndex: number
  onImageNavigation: (direction: "next" | "prev") => void
}

const ProjectModal = ({
  project,
  isOpen,
  onClose,
  currentImageIndex,
  onImageNavigation
}: ProjectModalProps) => {
  // Status color and icon mapping
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "Finalizado":
        return {
          color: "bg-green-500/10 text-green-400 border-green-500/20",
          icon: <CheckCircle2 className="w-3 h-3" />,
        }
      case "Beta":
        return {
          color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
          icon: <Star className="w-3 h-3" />,
        }
      case "Em Desenvolvimento":
        return {
          color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
          icon: <Clock className="w-3 h-3" />,
        }
      default:
        return {
          color: "bg-gray-500/10 text-gray-400 border-gray-500/20",
          icon: <Tag className="w-3 h-3" />,
        }
    }
  }

  // Type icon mapping
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Colaborativo":
        return <Users className="w-3.5 h-3.5" />
      case "Freelance":
        return <GitBranch className="w-3.5 h-3.5" />
      case "Pessoal":
      default:
        return <Tag className="w-3.5 h-3.5" />
    }
  }

  const statusInfo = getStatusInfo(project.status)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-2xl bg-cosmic-card rounded-xl border border-cosmic-accent/20 overflow-hidden"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <motion.button
              className="absolute top-3 right-3 z-20 p-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white/80 hover:text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
            >
              <X className="w-4 h-4" />
            </motion.button>
            
            {/* Image gallery */}
            <div className="relative aspect-video">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={project.thumbnails[currentImageIndex]}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>
              
              {/* Image overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-cosmic-card via-transparent to-transparent opacity-70" />
              
              {/* Image navigation */}
              {project.thumbnails.length > 1 && (
                <>
                  <div className="absolute inset-0 flex items-center justify-between px-4">
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        onImageNavigation("prev");
                      }}
                      className="p-1.5 rounded-full bg-black/30 backdrop-blur-sm text-white/80 hover:text-white"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        onImageNavigation("next");
                      }}
                      className="p-1.5 rounded-full bg-black/30 backdrop-blur-sm text-white/80 hover:text-white"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                  
                  {/* Image indicators */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
                    {project.thumbnails.map((_, idx) => (
                      <motion.div
                        key={idx}
                        className={`h-1 rounded-full transition-all duration-300 ${
                          idx === currentImageIndex ? "w-5 bg-cosmic-accent" : "w-1 bg-white/40"
                        }`}
                        whileHover={{ scale: 1.2 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          const direction = idx > currentImageIndex ? "next" : "prev";
                          for (let i = 0; i < Math.abs(idx - currentImageIndex); i++) {
                            onImageNavigation(direction);
                          }
                        }}
                        style={{ cursor: "pointer" }}
                      />
                    ))}
                  </div>
                </>
              )}
              
              {/* Project title overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
                
                {/* Status badges */}
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium border ${statusInfo.color}`}>
                    {statusInfo.icon}
                    <span>{project.status}</span>
                  </span>
                  
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-cosmic-accent/10 text-cosmic-accent border border-cosmic-accent/20">
                    <Calendar className="w-3 h-3" />
                    <span>{project.duration}</span>
                  </span>
                  
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-cosmic-accent/10 text-cosmic-accent border border-cosmic-accent/20">
                    {getTypeIcon(project.type)}
                    <span>{project.type}</span>
                  </span>
                </div>
              </div>
            </div>
            
            {/* Project details */}
            <div className="p-4 space-y-3">
              {/* Description */}
              <p className="text-sm text-cosmic-text">
                {project.detailedDescription || project.description}
              </p>
              
              {/* Tech stack */}
              <div>
                <h4 className="text-xs font-medium text-cosmic-text mb-2 flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-cosmic-accent" />
                  <span>TECNOLOGIAS</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md text-xs font-medium bg-cosmic-accent/10 text-cosmic-accent border border-cosmic-accent/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Features - if available */}
              {project.features && project.features.length > 0 && (
                <div>
                  <h4 className="text-xs font-medium text-cosmic-text mb-2 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-cosmic-accent" />
                    <span>FUNCIONALIDADES</span>
                  </h4>
                  <div className="grid grid-cols-2 gap-1.5">
                    {project.features.slice(0, 4).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 p-1.5 rounded-md bg-cosmic-bg/30 border border-cosmic-border">
                        <CheckCircle2 className="w-3 h-3 shrink-0 text-cosmic-accent" />
                        <span className="text-xs text-cosmic-text truncate">{feature}</span>
                      </div>
                    ))}
                    {project.features.length > 4 && (
                      <div className="flex items-center justify-center p-1.5 rounded-md bg-cosmic-bg/20 border border-cosmic-border/50">
                        <span className="text-xs text-cosmic-text">+{project.features.length - 4} mais</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Action buttons */}
              <div className="flex justify-between items-center pt-1">
                <motion.a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-medium text-cosmic-text hover:text-cosmic-accent transition-colors"
                  whileHover={{ x: -3 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <GitBranch className="w-3.5 h-3.5" />
                  <span>Repositório</span>
                </motion.a>
                
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-medium text-cosmic-accent hover:text-white transition-colors"
                  whileHover={{ x: 3 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span>Ver projeto</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ProjectModal
