"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Code, Database, Layout, Server, Zap, Layers } from "lucide-react"

// Dados das habilidades - mantendo a estrutura original
const skillsData = {
  frontend: {
    title: "Frontend",
    icon: <Layout className="w-6 h-6" />,
    color: "blue",
    skills: [
      { name: "React", level: 85 },
      { name: "Next.js", level: 80 },
      { name: "Tailwind CSS", level: 90 },
      { name: "JavaScript", level: 85 },
      { name: "TypeScript", level: 75 },
      { name: "HTML/CSS", level: 95 },
    ],
  },
  backend: {
    title: "Backend",
    icon: <Server className="w-6 h-6" />,
    color: "purple",
    skills: [
      { name: "Node.js", level: 80 },
      { name: "Express", level: 85 },
      { name: "MongoDB", level: 75 },
      { name: "PostgreSQL", level: 70 },
      { name: "REST API", level: 85 },
      { name: "GraphQL", level: 65 },
    ],
  },
  databases: {
    title: "Bancos de Dados",
    icon: <Database className="w-6 h-6" />,
    color: "green",
    skills: [
      { name: "MongoDB", level: 80 },
      { name: "PostgreSQL", level: 75 },
      { name: "MySQL", level: 70 },
      { name: "Firebase Firestore", level: 75 },
      { name: "Redis", level: 60 },
      { name: "SQL", level: 75 },
    ],
  },
  tools: {
    title: "Ferramentas & DevOps",
    icon: <Zap className="w-6 h-6" />,
    color: "orange",
    skills: [
      { name: "Git/GitHub", level: 90 },
      { name: "VS Code", level: 95 },
      { name: "Webpack", level: 70 },
      { name: "Jest", level: 65 },
      { name: "CI/CD", level: 60 },
      { name: "Vercel", level: 85 },
    ],
  },
  languages: {
    title: "Linguagens",
    icon: <Code className="w-6 h-6" />,
    color: "teal",
    skills: [
      { name: "JavaScript", level: 90 },
      { name: "TypeScript", level: 80 },
      { name: "Python", level: 70 },
      { name: "C#", level: 65 },
      { name: "HTML", level: 95 },
      { name: "CSS/SCSS", level: 90 },
    ],
  },
  other: {
    title: "Outras Habilidades",
    icon: <Layers className="w-6 h-6" />,
    color: "yellow",
    skills: [
      { name: "UI/UX Design", level: 75 },
      { name: "SEO", level: 70 },
      { name: "Acessibilidade", level: 80 },
      { name: "Metodologias Ágeis", level: 85 },
      { name: "Inglês", level: 85 },
      { name: "Comunicação", level: 90 },
    ],
  },
}

// Mapeamento de cores para classes do Tailwind - simplificado
const colorMap = {
  blue: {
    light: "bg-blue-400/10",
    border: "border-blue-400/30",
    text: "text-blue-400",
    bar: "bg-blue-400",
  },
  purple: {
    light: "bg-purple-400/10",
    border: "border-purple-400/30",
    text: "text-purple-400",
    bar: "bg-purple-400",
  },
  green: {
    light: "bg-emerald-400/10",
    border: "border-emerald-400/30",
    text: "text-emerald-400",
    bar: "bg-emerald-400",
  },
  orange: {
    light: "bg-orange-400/10",
    border: "border-orange-400/30",
    text: "text-orange-400",
    bar: "bg-orange-400",
  },
  teal: {
    light: "bg-teal-400/10",
    border: "border-teal-400/30",
    text: "text-teal-400",
    bar: "bg-teal-400",
  },
  yellow: {
    light: "bg-amber-400/10",
    border: "border-amber-400/30",
    text: "text-amber-400",
    bar: "bg-amber-400",
  },
}

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState<keyof typeof skillsData>("frontend")
  const [expandedSkills, setExpandedSkills] = useState<Record<string, boolean>>({})
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1120]/90 via-[#0F172A]/80 to-[#0A1120]/90 backdrop-blur-sm"></div>

      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] bg-repeat opacity-5"></div>

        {/* Glowing orb */}
        <motion.div
          className="absolute rounded-full blur-3xl opacity-20"
          style={{
            background: `radial-gradient(circle, rgba(96, 165, 250, 0.8) 0%, rgba(59, 130, 246, 0.4) 50%, transparent 80%)`,
            width: "40rem",
            height: "40rem",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.2, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-12 sm:mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Habilidades<span className="text-blue-400">;</span>
          </h2>
          <motion.p
            className="mt-4 text-blue-200/80 max-w-2xl mx-auto text-base sm:text-lg"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Conheça minhas habilidades técnicas e competências
          </motion.p>
        </motion.div>

        {/* Desktop layout - Tabs and content side by side */}
        <div className="hidden lg:grid grid-cols-12 gap-8">
          {/* Category tabs */}
          <motion.div
            className="col-span-3"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="sticky top-24 space-y-2">
              {Object.entries(skillsData).map(([key, category]) => {
                const colors = colorMap[category.color as keyof typeof colorMap]
                return (
                  <motion.button
                    key={key}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                      activeCategory === key
                        ? `${colors.light} ${colors.border} border`
                        : "bg-blue-900/10 border border-blue-500/10 hover:border-blue-500/20"
                    }`}
                    onClick={() => setActiveCategory(key as keyof typeof skillsData)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg ${colors.light} ${colors.border} border flex items-center justify-center ${colors.text}`}
                      >
                        {category.icon}
                      </div>
                      <span className={`font-medium ${activeCategory === key ? colors.text : "text-white"}`}>
                        {category.title}
                      </span>
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>

          {/* Skills content */}
          <motion.div
            className="col-span-9"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {Object.entries(skillsData).map(([key, category]) => {
              if (key !== activeCategory) return null

              const colors = colorMap[category.color as keyof typeof colorMap]

              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-blue-900/10 backdrop-blur-sm rounded-2xl border border-blue-500/20 overflow-hidden"
                >
                  {/* Category header */}
                  <div className="p-6 border-b border-blue-500/20">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl ${colors.light} ${colors.border} border flex items-center justify-center ${colors.text}`}
                      >
                        {category.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{category.title}</h3>
                      </div>
                    </div>
                  </div>

                  {/* Skills list */}
                  <div className="p-6">
                    <div className="space-y-6">
                      {category.skills.map((skill, idx) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.05 }}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <h4 className="font-medium text-white">{skill.name}</h4>
                            <span className={`text-sm ${colors.text}`}>{skill.level}%</span>
                          </div>
                          <div className="h-2 bg-blue-900/30 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full ${colors.bar} rounded-full`}
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ duration: 1, delay: 0.2 + idx * 0.05, ease: "easeOut" }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* Mobile layout - Simplified */}
        <div className="lg:hidden space-y-6">
          {Object.entries(skillsData).map(([key, category], index) => {
            const colors = colorMap[category.color as keyof typeof colorMap]

            return (
              <motion.div
                key={key}
                className="bg-blue-900/10 backdrop-blur-sm rounded-xl border border-blue-500/20 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Category header */}
                <div className="p-4 border-b border-blue-500/20">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg ${colors.light} ${colors.border} border flex items-center justify-center ${colors.text}`}
                    >
                      {category.icon}
                    </div>
                    <h3 className="font-medium text-white">{category.title}</h3>
                  </div>
                </div>

                {/* Skills content */}
                <div className="p-4">
                  <div className="space-y-4">
                    {category.skills.map((skill, idx) => (
                      <div key={skill.name}>
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="font-medium text-white text-sm">{skill.name}</h4>
                          <span className={`text-xs ${colors.text}`}>{skill.level}%</span>
                        </div>
                        <div className="h-1.5 bg-blue-900/30 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full ${colors.bar} rounded-full`}
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${skill.level}%` } : {}}
                            transition={{ duration: 0.8, delay: 0.1 + idx * 0.05, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Skills

