"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { skillsByArea, areaLabels } from "@/constants/skillsData"
import type { Skill } from "@/constants/skillsData"
import SkillModal from "@/components/ui/SkillModal"

const Skills = () => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section className="relative min-h-screen py-16 md:py-24 bg-transparent">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center text-blue-500 mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Habilidades<span className="text-white">;</span>
        </motion.h2>

        {/* Grid layout for skill categories */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.keys(skillsByArea).map((area) => (
            <motion.div
              key={area}
              className="bg-gray-900/20 backdrop-blur-sm rounded-xl p-5 border border-gray-800/30"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.5,
                delay: area === "frontend" ? 0 : area === "backend" ? 0.1 : area === "database" ? 0.2 : 0.3,
              }}
            >
              <motion.h3
                className="text-xl font-bold text-blue-500 mb-3"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                {areaLabels[area]}
              </motion.h3>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {skillsByArea[area].map((skill, index) => (
                  <SkillCard
                    key={skill.title}
                    skill={skill}
                    index={index}
                    isInView={isInView}
                    onClick={() => setSelectedSkill(skill)}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <SkillModal skill={selectedSkill} isOpen={!!selectedSkill} onClose={() => setSelectedSkill(null)} />
    </section>
  )
}

interface SkillCardProps {
  skill: Skill
  index: number
  isInView: boolean
  onClick: () => void
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, index, isInView, onClick }) => {
  const IconComponent = skill.icon

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.05 * i,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  return (
    <motion.div
      className="bg-gray-900/40 backdrop-blur-sm rounded-lg overflow-hidden cursor-pointer transition-all duration-300 border border-gray-800/30 hover:border-blue-500/30 hover:bg-blue-500/10"
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={index}
      onClick={onClick}
      whileHover={{ y: -3 }}
    >
      <div className="p-2 flex flex-col items-center text-center">
        <div className="mb-1 w-8 h-8 flex items-center justify-center text-blue-400">
          <IconComponent className="w-6 h-6" />
        </div>
        <h3 className="text-white text-sm font-medium">{skill.title}</h3>
      </div>
    </motion.div>
  )
}

export default Skills

