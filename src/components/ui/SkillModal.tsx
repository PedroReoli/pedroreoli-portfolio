"use client"

import type React from "react"
import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ExternalLink, Star } from "lucide-react"
import type { Skill } from "@/constants/skillsData"

interface SkillModalProps {
  skill: Skill | null
  isOpen: boolean
  onClose: () => void
}

const SkillModal: React.FC<SkillModalProps> = ({ skill, isOpen, onClose }) => {
  // Close modal on ESC key press
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [onClose])

  // Better scroll handling
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow

    if (isOpen) {
      // Store scroll position and prevent body scroll
      document.body.style.overflow = "hidden"
      document.body.style.paddingRight = "var(--scrollbar-width)"
    }

    return () => {
      // Restore original scroll behavior
      document.body.style.overflow = originalStyle
      document.body.style.paddingRight = "0"
    }
  }, [isOpen])

  if (!skill) return null

  // Convert level to progress bar
  const renderLevel = (level: number) => {
    const percentage = (level / 3) * 100

    return (
      <div className="w-full">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-300">Proficiência</span>
          <span className="text-sm text-gray-400">{level.toFixed(1)}/3</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <div
            className="h-2.5 rounded-full"
            style={{
              width: `${percentage}%`,
              backgroundColor: skill.color,
            }}
          ></div>
        </div>
      </div>
    )
  }

  const IconComponent = skill.icon

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-gray-900 rounded-2xl w-full max-w-md overflow-hidden shadow-xl"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative top gradient */}
            <div
              className="absolute top-0 left-0 right-0 h-1 rounded-t-xl"
              style={{ background: `linear-gradient(to right, ${skill.color}, ${skill.color}88)` }}
            />

            {/* Header */}
            <div className="relative p-6">
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${skill.color}15` }}
                >
                  <IconComponent className="w-8 h-8" style={{ color: skill.color }} />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white">{skill.title}</h3>
                  <p className="text-gray-400 text-sm">{skill.area.charAt(0).toUpperCase() + skill.area.slice(1)}</p>
                </div>
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Proficiency level */}
              <div className="mt-6">{renderLevel(skill.level)}</div>
            </div>

            {/* Content */}
            <div className="px-6 pb-6">
              {skill.description && (
                <div className="mb-6 bg-gray-800/50 p-4 rounded-lg">
                  <p className="text-gray-300">{skill.description}</p>
                </div>
              )}

              {skill.courses.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                    Cursos Recomendados
                  </h4>
                  <div className="space-y-2">
                    {skill.courses.map((course, index) => (
                      <a
                        key={index}
                        href={skill.coursesLinks[index]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-all group"
                        style={{
                          borderLeft: `2px solid ${skill.color}`,
                        }}
                      >
                        <span className="text-gray-300 group-hover:text-white transition-colors">{course}</span>
                        <ExternalLink
                          className="h-4 w-4 text-gray-500 group-hover:text-white transition-colors"
                          style={{ color: skill.color }}
                        />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default SkillModal

