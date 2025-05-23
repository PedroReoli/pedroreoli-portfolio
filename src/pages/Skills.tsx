"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { skillsByArea } from "@/constants/skillsData"
import type { Skill } from "@/constants/skillsData"
import SkillModal from "@/components/SkillModal"
import { useTranslation } from "react-i18next"
import { ChevronLeft, ChevronRight } from "lucide-react"

const Skills = () => {
  const { t } = useTranslation()
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  // Reorganizar áreas em 2x2
  const areaOrder = ["frontend", "backend", "database", "tools"]

  return (
    <section className="relative min-h-screen py-16 md:py-24 bg-transparent">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.h2
          className="section-title font-bold text-center text-blue-500 mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t("skills.title")}
          <span className="text-white">;</span>
        </motion.h2>

        {/* Grid layout 2x2 para categorias de habilidades */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {areaOrder.map((area, areaIndex) => (
            <SkillCategory
              key={area}
              area={area}
              skills={skillsByArea[area]}
              isInView={isInView}
              onSelectSkill={setSelectedSkill}
              index={areaIndex}
            />
          ))}
        </div>
      </div>

      <SkillModal skill={selectedSkill} isOpen={!!selectedSkill} onClose={() => setSelectedSkill(null)} />
    </section>
  )
}

interface SkillCategoryProps {
  area: string
  skills: Skill[]
  isInView: boolean
  onSelectSkill: (skill: Skill) => void
  index: number
}

const SkillCategory: React.FC<SkillCategoryProps> = ({ area, skills, isInView, onSelectSkill, index }) => {
  const { t } = useTranslation()
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 6 // 3 colunas x 2 linhas
  const totalPages = Math.ceil(skills.length / itemsPerPage)

  // Resetar a página quando a área muda
  useEffect(() => {
    setCurrentPage(0)
  }, [area])

  const nextPage = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1))
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
  }

  const visibleSkills = skills.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
  const hasMultiplePages = skills.length > itemsPerPage

  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
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
      className="bg-gray-900/20 backdrop-blur-sm rounded-xl p-5 border border-gray-800/30 relative"
      variants={categoryVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={index}
    >
      <div className="flex items-center mb-4">
        <h3 className="title font-bold text-blue-500">{t(`skills.areas.${area}`)}</h3>
        <motion.div
          className="h-0.5 flex-1 ml-3 bg-blue-500/20 rounded-full"
          initial={{ width: 0 }}
          animate={isInView ? { width: "100%" } : { width: 0 }}
          transition={{ duration: 0.5, delay: 0.2 + 0.1 * index }}
        />
      </div>

      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-3"
          >
            {visibleSkills.map((skill, skillIndex) => (
              <SkillCard
                key={skill.title}
                skill={skill}
                index={skillIndex}
                isInView={isInView}
                onClick={() => onSelectSkill(skill)}
                categoryIndex={index}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Navegação do carrossel */}
        {hasMultiplePages && (
          <>
            <button
              onClick={prevPage}
              className="absolute -left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gray-800/70 backdrop-blur-sm flex items-center justify-center text-white hover:bg-blue-500/70 transition-colors z-10"
              aria-label="Página anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextPage}
              className="absolute -right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gray-800/70 backdrop-blur-sm flex items-center justify-center text-white hover:bg-blue-500/70 transition-colors z-10"
              aria-label="Próxima página"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Indicadores de página */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-1 mt-4">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i === currentPage ? "bg-blue-500" : "bg-gray-600 hover:bg-gray-500"
                    }`}
                    aria-label={`Ir para página ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  )
}

interface SkillCardProps {
  skill: Skill
  index: number
  isInView: boolean
  onClick: () => void
  categoryIndex: number
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, index, isInView, onClick, categoryIndex }) => {
  const IconComponent = skill.icon

  const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.03 * i + 0.1 * categoryIndex,
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  // Função para renderizar os pontos de nível de forma compacta
  const renderLevelDots = (level: number) => {
    const fullDots = Math.floor(level)
    const hasHalfDot = level % 1 >= 0.5
    const emptyDots = 3 - fullDots - (hasHalfDot ? 1 : 0)

    return (
      <div className="flex justify-center mt-1">
        {[...Array(fullDots)].map((_, i) => (
          <div key={`full-${i}`} className="w-1.5 h-1.5 mx-0.5 rounded-full bg-blue-500"></div>
        ))}
        {hasHalfDot && <div className="w-1.5 h-1.5 mx-0.5 rounded-full bg-blue-500/50"></div>}
        {[...Array(emptyDots)].map((_, i) => (
          <div key={`empty-${i}`} className="w-1.5 h-1.5 mx-0.5 rounded-full bg-gray-700"></div>
        ))}
      </div>
    )
  }

  return (
    <motion.div
      className="bg-gray-900/30 backdrop-blur-sm rounded-lg overflow-hidden cursor-pointer transition-all duration-300 border border-gray-800/30 hover:border-blue-500/30 hover:bg-blue-500/5 group"
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={index}
      onClick={onClick}
      whileHover={{ y: -3, scale: 1.02 }}
    >
      <div className="p-3 flex flex-col items-center justify-center text-center">
        <div
          className="mb-2 w-10 h-10 flex items-center justify-center rounded-lg"
          style={{
            background: `${skill.color}15`,
            boxShadow: `0 0 10px ${skill.color}20`,
          }}
        >
          <IconComponent className="w-6 h-6" style={{ color: skill.color }} />
        </div>
        <h3 className="text-xs text-white font-medium mb-0.5">{skill.title}</h3>

        {/* Indicador de nível com pontos */}
        {renderLevelDots(skill.level)}
      </div>
    </motion.div>
  )
}

export default Skills
