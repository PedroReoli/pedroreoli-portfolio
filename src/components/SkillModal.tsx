"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Star, Award, BookOpen, Info, ChevronRight, ExternalLink } from "lucide-react"
import type { Skill } from "@/constants/skillsData"
import { useTranslation } from "react-i18next"

interface SkillModalProps {
  skill: Skill | null
  isOpen: boolean
  onClose: () => void
}

const SkillModal: React.FC<SkillModalProps> = ({ skill, isOpen, onClose }) => {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<"about" | "courses">("about")
  const modalRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement | null>(null)

  // Reset to about tab when opening
  useEffect(() => {
    if (isOpen) {
      setActiveTab("about")
    }
  }, [isOpen])

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

  if (!skill) return null

  // Convert level to stars
  const renderStars = (level: number) => {
    const fullStars = Math.floor(level)
    const hasHalfStar = level % 1 >= 0.5
    const emptyStars = 3 - fullStars - (hasHalfStar ? 1 : 0)

    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="h-4 w-4 fill-current text-blue-500" />
        ))}
        {hasHalfStar && (
          <div className="relative h-4 w-4 text-blue-500">
            <Star className="absolute inset-0 fill-current" style={{ clipPath: "inset(0 50% 0 0)" }} />
            <Star className="absolute inset-0 opacity-30" />
          </div>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="h-4 w-4 opacity-30 text-blue-500" />
        ))}
      </div>
    )
  }

  const IconComponent = skill.icon

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
          {/* Modal */}
          <motion.div
            ref={modalRef}
            className="relative bg-gray-900/90 backdrop-blur-md rounded-xl w-full max-w-sm overflow-hidden shadow-xl border border-gray-800/50 pointer-events-auto"
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Decorative top gradient */}
            <div className="absolute top-0 left-0 right-0 h-1 rounded-t-xl bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600" />

            {/* Header */}
            <div className="relative p-4">
              <div className="flex items-center gap-3">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{
                    background: `${skill.color}15`,
                    boxShadow: `0 0 15px ${skill.color}10`,
                  }}
                >
                  <IconComponent className="w-7 h-7" style={{ color: skill.color }} />
                </motion.div>
                <div className="flex-1">
                  <motion.h3
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    className="title font-bold text-white"
                  >
                    {skill.title}
                  </motion.h3>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                    className="flex items-center gap-1.5 mt-0.5"
                  >
                    <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: skill.color }} />
                    <p className="text-gray-400 text-xs">{skill.area.charAt(0).toUpperCase() + skill.area.slice(1)}</p>
                  </motion.div>
                </div>
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                  aria-label="Fechar modal"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Proficiency level */}
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="mt-4 bg-gray-800/30 p-3 rounded-lg border border-gray-800/50"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5">
                    <Award className="h-4 w-4 text-blue-500" />
                    <span className="text-xs font-medium text-gray-300">{t("skills.modal.proficiency")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">{skill.level.toFixed(1)}/3</span>
                    {renderStars(skill.level)}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Tab Navigation */}
            <div className="px-4">
              <div className="flex space-x-2 border-b border-gray-800/50">
                <button
                  onClick={() => setActiveTab("about")}
                  className={`relative px-3 py-2 text-xs font-medium rounded-t-lg transition-colors ${
                    activeTab === "about" ? "text-blue-500" : "text-gray-400 hover:text-gray-300"
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <Info className="h-3.5 w-3.5" />
                    {t("skills.modal.about")}
                  </span>
                  {activeTab === "about" && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-blue-500"
                    />
                  )}
                </button>

                {skill.courses.length > 0 && (
                  <button
                    onClick={() => setActiveTab("courses")}
                    className={`relative px-3 py-2 text-xs font-medium rounded-t-lg transition-colors ${
                      activeTab === "courses" ? "text-blue-500" : "text-gray-400 hover:text-gray-300"
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3.5 w-3.5" />
                      {t("skills.modal.courses")}
                      <span className="inline-flex items-center justify-center w-4 h-4 text-[10px] font-medium rounded-full bg-gray-800">
                        {skill.courses.length}
                      </span>
                    </span>
                    {activeTab === "courses" && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-blue-500"
                      />
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-4 pt-3 max-h-60 overflow-y-auto custom-scrollbar">
              <AnimatePresence mode="wait">
                {activeTab === "about" && skill.description && (
                  <motion.div
                    key="about"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3"
                  >
                    <div className="bg-gray-800/30 p-3 rounded-lg border border-gray-800/50">
                      <p className="text-gray-300 text-xs leading-relaxed">{skill.description}</p>
                    </div>

                    {skill.courses.length > 0 && (
                      <button
                        onClick={() => setActiveTab("courses")}
                        className="w-full flex items-center justify-between p-2 rounded-lg bg-gray-800/20 hover:bg-gray-800/30 transition-colors text-xs text-gray-300 hover:text-white group"
                      >
                        <span className="flex items-center gap-1.5">
                          <BookOpen className="h-3.5 w-3.5 text-blue-500" />
                          {t("skills.modal.viewCourses")}
                        </span>
                        <ChevronRight className="h-3.5 w-3.5 text-gray-500 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
                      </button>
                    )}
                  </motion.div>
                )}

                {activeTab === "courses" && skill.courses.length > 0 && (
                  <motion.div
                    key="courses"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-2"
                  >
                    <div className="grid gap-2">
                      {skill.courses.map((course, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 5 }}
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
                              className="flex items-center justify-between p-2.5 rounded-lg bg-gray-800/30 
                                        hover:bg-gray-800/50 transition-all group-hover:shadow-md
                                        border-l-2 border-blue-500"
                            >
                              <div className="flex items-center gap-2 flex-1 min-w-0">
                                <div className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center bg-blue-500/15">
                                  <Star className="h-3.5 w-3.5 text-blue-500" />
                                </div>
                                <span className="text-gray-300 group-hover:text-white transition-colors truncate text-xs">
                                  {course}
                                </span>
                              </div>
                              <div className="flex-shrink-0 ml-1.5 p-1 rounded-full bg-gray-800/50 group-hover:bg-gray-700/50 transition-colors text-blue-500">
                                <ExternalLink className="h-3 w-3" />
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
            <div className="p-3 flex justify-end border-t border-gray-800/30">
              <button
                onClick={onClose}
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-gray-800 hover:bg-gray-700 text-white transition-colors"
              >
                {t("skills.modal.close")}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default SkillModal
