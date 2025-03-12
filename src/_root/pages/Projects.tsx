"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ExternalLink, Github, Code, Star } from "lucide-react"

// Dados dos projetos - simplificados
const projectsData = [
  {
    id: 1,
    title: "Dev em Desenvolvimento",
    description: "Blog pessoal com artigos sobre programação, desenvolvimento web e carreira em tecnologia.",
    image: "/assets/projects/blog.png",
    tags: ["React", "Next.js", "Tailwind CSS"],
    liveUrl: "https://devemdesenvolvimento.netlify.app/",
    githubUrl: "https://github.com/PedroReoli/blog",
    featured: true,
  },
  {
    id: 2,
    title: "Portfolio Pessoal",
    description: "Site de portfolio para mostrar projetos e habilidades, com design moderno e responsivo.",
    image: "/assets/projects/portfolio.png",
    tags: ["React", "Framer Motion", "Tailwind CSS"],
    liveUrl: "https://pedroreoli.vercel.app/",
    githubUrl: "https://github.com/PedroReoli/portfolio",
    featured: true,
  },
  {
    id: 3,
    title: "Task Manager",
    description: "Aplicativo de gerenciamento de tarefas com recursos de organização, priorização e lembretes.",
    image: "/assets/projects/taskmanager.png",
    tags: ["React", "Node.js", "Express"],
    liveUrl: "https://task-manager-demo.netlify.app/",
    githubUrl: "https://github.com/PedroReoli/task-manager",
    featured: false,
  },
  {
    id: 4,
    title: "Weather App",
    description: "Aplicativo de previsão do tempo com dados em tempo real e visualizações interativas.",
    image: "/assets/projects/weatherapp.png",
    tags: ["JavaScript", "API", "CSS"],
    liveUrl: "https://weather-app-demo.netlify.app/",
    githubUrl: "https://github.com/PedroReoli/weather-app",
    featured: false,
  },
  {
    id: 5,
    title: "E-commerce Dashboard",
    description: "Painel administrativo para gerenciamento de loja online com análises e relatórios.",
    image: "/assets/projects/ecommerce.png",
    tags: ["React", "Redux", "Node.js"],
    liveUrl: "https://ecommerce-dashboard-demo.netlify.app/",
    githubUrl: "https://github.com/PedroReoli/ecommerce-dashboard",
    featured: true,
  },
  {
    id: 6,
    title: "Music Player",
    description: "Reprodutor de música com interface moderna e recursos de playlist e equalização.",
    image: "/assets/projects/musicplayer.png",
    tags: ["React", "Web Audio API", "CSS"],
    liveUrl: "https://music-player-demo.netlify.app/",
    githubUrl: "https://github.com/PedroReoli/music-player",
    featured: false,
  },
]

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all")
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })

  // Filtrar projetos com base no filtro ativo
  const filteredProjects =
    activeFilter === "all"
      ? projectsData
      : activeFilter === "featured"
        ? projectsData.filter((project) => project.featured)
        : projectsData.filter((project) => project.tags.includes(activeFilter))

  // Categorias de filtro únicas
  const filterCategories = ["all", "featured", ...Array.from(new Set(projectsData.flatMap((project) => project.tags)))]

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
            Projetos<span className="text-blue-400">;</span>
          </h2>
          <motion.p
            className="mt-4 text-blue-200/80 max-w-2xl mx-auto text-base sm:text-lg"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Conheça alguns dos meus projetos pessoais e profissionais
          </motion.p>
        </motion.div>

        {/* Filter tabs - simplified */}
        <motion.div
          className="flex justify-center mb-10 overflow-x-auto pb-2 hide-scrollbar"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="flex space-x-2 p-1 rounded-full bg-blue-900/20 backdrop-blur-sm border border-blue-500/20">
            {filterCategories.slice(0, 5).map((category, index) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`relative px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-300 ${
                  activeFilter === category ? "text-white" : "text-blue-300/70 hover:text-blue-200"
                }`}
              >
                {activeFilter === category && (
                  <motion.div
                    layoutId="activeFilterIndicator"
                    className="absolute inset-0 rounded-full bg-blue-500/20 border border-blue-400/30 backdrop-blur-sm"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
                <span className="relative z-10 capitalize">
                  {category === "all" ? "Todos" : category === "featured" ? "Destaques" : category}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.4,
              },
            },
          }}
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isHovered={hoveredProject === project.id}
              onHover={() => setHoveredProject(project.id)}
              onLeave={() => setHoveredProject(null)}
            />
          ))}
        </motion.div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Code className="w-16 h-16 mx-auto text-blue-400/50 mb-4" />
            <h3 className="text-xl font-medium text-blue-200">Nenhum projeto encontrado</h3>
            <p className="text-blue-300/70 mt-2">Tente selecionar outra categoria de filtro</p>
          </motion.div>
        )}

        {/* View all projects button */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.a
            href="https://github.com/PedroReoli"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600/20 border border-blue-500/30 backdrop-blur-sm text-blue-300 hover:text-white hover:bg-blue-600/30 transition-colors"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Ver todos no GitHub</span>
            <Github className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

interface ProjectCardProps {
  project: (typeof projectsData)[0]
  index: number
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
}

const ProjectCard = ({ project, index, isHovered, onHover, onLeave }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.2 })

  return (
    <motion.div
      ref={cardRef}
      className="group relative"
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Simple glow effect */}
      <motion.div
        className="absolute -inset-0.5 rounded-2xl blur-md z-0"
        animate={{
          opacity: isHovered ? 0.6 : 0,
          background: isHovered ? "rgba(96, 165, 250, 0.3)" : "transparent",
        }}
        transition={{ duration: 0.3 }}
      />

      <motion.div
        className="relative bg-blue-900/20 backdrop-blur-sm rounded-2xl border border-blue-500/20 overflow-hidden cursor-pointer h-full"
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
      >
        {/* Featured badge - simplified */}
        {project.featured && (
          <div className="absolute top-4 right-4 z-10">
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-blue-500/20 backdrop-blur-md border border-blue-400/30">
              <Star className="w-3 h-3 text-blue-300" />
              <span className="text-xs font-medium text-blue-300">Destaque</span>
            </div>
          </div>
        )}

        {/* Project image with overlay */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={project.image || `/placeholder.svg?height=200&width=400&text=${encodeURIComponent(project.title)}`}
            alt={project.title}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/80 to-transparent opacity-60 group-hover:opacity-80" />
        </div>

        {/* Project content */}
        <div className="p-5 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
            {project.title}
          </h3>

          <p className="mt-2 text-blue-200/80 text-sm sm:text-base line-clamp-2">{project.description}</p>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-400/10 text-blue-300 border border-blue-400/20"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="mt-5 flex justify-between">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-white transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Projects

