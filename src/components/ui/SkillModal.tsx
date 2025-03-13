"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Star, Award, BookOpen, Info, ChevronRight, ArrowUpRight } from "lucide-react"
import type { Skill } from "@/constants/skillsData"

interface SkillModalProps {
  skill: Skill | null
  isOpen: boolean
  onClose: () => void
}

const SkillModal: React.FC<SkillModalProps> = ({ skill, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<"about" | "courses">("about")

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
      // Reset to about tab when opening
      setActiveTab("about")
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

    // Generate stars based on level
    const fullStars = Math.floor(level)
    const hasHalfStar = level % 1 >= 0.5
    const emptyStars = 3 - fullStars - (hasHalfStar ? 1 : 0)

    return (
      <div className="w-full">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-1.5">
            <Award className="h-4 w-4" style={{ color: skill.color }} />
            <span className="text-sm font-medium text-gray-300">Proficiência</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-400 mr-2">{level.toFixed(1)}/3</span>
            <div className="flex">
              {[...Array(fullStars)].map((_, i) => (
                <Star key={`full-${i}`} className="h-3.5 w-3.5 fill-current" style={{ color: skill.color }} />
              ))}
              {hasHalfStar && (
                <div className="relative h-3.5 w-3.5" style={{ color: skill.color }}>
                  <Star className="absolute inset-0 fill-current" style={{ clipPath: "inset(0 50% 0 0)" }} />
                  <Star className="absolute inset-0 opacity-30" />
                </div>
              )}
              {[...Array(emptyStars)].map((_, i) => (
                <Star key={`empty-${i}`} className="h-3.5 w-3.5 opacity-30" style={{ color: skill.color }} />
              ))}
            </div>
          </div>
        </div>
        <div className="w-full bg-gray-700/50 rounded-full h-2.5 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-2.5 rounded-full"
            style={{
              backgroundColor: skill.color,
            }}
          />
        </div>
      </div>
    )
  }

  const IconComponent = skill.icon

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
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
            className="relative bg-gray-900 rounded-3xl w-full max-w-md overflow-hidden shadow-xl"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative top gradient */}
            <div
              className="absolute top-0 left-0 right-0 h-2 rounded-t-xl"
              style={{ background: `linear-gradient(to right, ${skill.color}, ${skill.color}88)` }}
            />

            {/* Header */}
            <div className="relative p-6 pb-4">
              <div className="flex items-center gap-4">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: `${skill.color}15` }}
                >
                  <IconComponent className="w-9 h-9" style={{ color: skill.color }} />
                </motion.div>
                <div className="flex-1">
                  <motion.h3
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    className="text-2xl font-bold text-white"
                  >
                    {skill.title}
                  </motion.h3>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                    className="flex items-center gap-1.5 mt-1"
                  >
                    <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: skill.color }} />
                    <p className="text-gray-400 text-sm">{skill.area.charAt(0).toUpperCase() + skill.area.slice(1)}</p>
                  </motion.div>
                </div>
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Proficiency level */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="mt-6"
              >
                {renderLevel(skill.level)}
              </motion.div>
            </div>

            {/* Tab Navigation */}
            <div className="px-6">
              <div className="flex space-x-2 border-b border-gray-800/50">
                <button
                  onClick={() => setActiveTab("about")}
                  className={`relative px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors ${
                    activeTab === "about" ? "text-white" : "text-gray-400 hover:text-gray-300"
                  }`}
                  style={activeTab === "about" ? { color: skill.color } : {}}
                >
                  <span className="flex items-center gap-1.5">
                    <Info className="h-4 w-4" />
                    Sobre
                  </span>
                  {activeTab === "about" && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                      style={{ backgroundColor: skill.color }}
                    />
                  )}
                </button>

                {skill.courses.length > 0 && (
                  <button
                    onClick={() => setActiveTab("courses")}
                    className={`relative px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors ${
                      activeTab === "courses" ? "text-white" : "text-gray-400 hover:text-gray-300"
                    }`}
                    style={activeTab === "courses" ? { color: skill.color } : {}}
                  >
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="h-4 w-4" />
                      Cursos
                      <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium rounded-full bg-gray-800">
                        {skill.courses.length}
                      </span>
                    </span>
                    {activeTab === "courses" && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                        style={{ backgroundColor: skill.color }}
                      />
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 pt-5">
              <AnimatePresence mode="wait">
                {activeTab === "about" && skill.description && (
                  <motion.div
                    key="about"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div className="bg-gray-800/30 p-5 rounded-2xl border border-gray-800/50">
                      <p className="text-gray-300 text-sm leading-relaxed">{skill.description}</p>
                    </div>

                    {skill.courses.length > 0 && (
                      <button
                        onClick={() => setActiveTab("courses")}
                        className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-800/20 hover:bg-gray-800/30 transition-colors text-sm text-gray-300 hover:text-white group"
                      >
                        <span className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4" style={{ color: skill.color }} />
                          Ver cursos recomendados
                        </span>
                        <ChevronRight className="h-4 w-4 text-gray-500 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
                      </button>
                    )}
                  </motion.div>
                )}

                {activeTab === "courses" && skill.courses.length > 0 && (
                  <motion.div
                    key="courses"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3"
                  >
                    <div className="grid gap-3">
                      {skill.courses.map((course, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05, duration: 0.2 }}
                        >
                          <a
                            href={skill.coursesLinks[index]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block"
                          >
                            <div
                              className="flex items-center justify-between p-4 rounded-xl bg-gray-800/30 
                                        hover:bg-gray-800/50 transition-all group-hover:shadow-md"
                              style={{
                                borderLeft: `3px solid ${skill.color}`,
                              }}
                            >
                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                <div
                                  className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                                  style={{ backgroundColor: `${skill.color}15` }}
                                >
                                  <Star className="h-5 w-5" style={{ color: skill.color }} />
                                </div>
                                <span className="text-gray-300 group-hover:text-white transition-colors truncate text-sm">
                                  {course}
                                </span>
                              </div>
                              <div
                                className="flex-shrink-0 ml-2 p-2 rounded-full bg-gray-800/50 group-hover:bg-gray-700/50 transition-colors"
                                style={{ color: skill.color }}
                              >
                                <ArrowUpRight className="h-4 w-4" />
                              </div>
                            </div>
                          </a>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="p-4 flex justify-end border-t border-gray-800/30">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-full text-sm font-medium bg-gray-800 hover:bg-gray-700 text-white transition-colors"
              >
                Fechar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default SkillModal

