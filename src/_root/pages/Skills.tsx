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
          className="text-4xl md:text-5xl font-bold text-center text-blue-500 mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Habilidades<span className="text-white">;</span>
        </motion.h2>

        <div ref={ref} className="space-y-16">
          {Object.keys(skillsByArea).map((area) => (
            <div key={area} className="space-y-6">
              <motion.h3
                className="text-2xl font-bold text-white"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                {areaLabels[area]}
              </motion.h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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
            </div>
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
      className="bg-gray-900/40 backdrop-blur-sm rounded-xl overflow-hidden cursor-pointer transition-all duration-300"
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={index}
      onClick={onClick}
      whileHover={{
        y: -5,
        boxShadow: `0 10px 25px -5px ${skill.color}20`,
        backgroundColor: `${skill.color}15`,
        borderColor: `${skill.color}30`,
      }}
      style={{
        border: "1px solid transparent",
      }}
    >
      <div className="p-4 flex flex-col items-center text-center">
        <div className="mb-3 w-12 h-12 flex items-center justify-center">
          <IconComponent className="w-8 h-8" />
        </div>
        <h3 className="text-white font-medium">{skill.title}</h3>
      </div>
    </motion.div>
  )
}

export default Skills

