"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Code, Database, Layout, Smartphone, Server, Zap } from "lucide-react"

// Dados dos serviços - simplificados
const servicesData = [
  {
    id: 1,
    title: "Desenvolvimento Frontend",
    description: "Criação de interfaces modernas, responsivas e otimizadas para diferentes dispositivos.",
    icon: <Layout className="w-6 h-6" />,
    color: "blue",
    technologies: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    id: 2,
    title: "Desenvolvimento Backend",
    description: "Construção de APIs robustas, seguras e escaláveis para suportar aplicações web e mobile.",
    icon: <Server className="w-6 h-6" />,
    color: "purple",
    technologies: ["Node.js", "Express", "MongoDB"],
  },
  {
    id: 3,
    title: "Desenvolvimento Mobile",
    description: "Desenvolvimento de aplicativos móveis nativos e híbridos para iOS e Android.",
    icon: <Smartphone className="w-6 h-6" />,
    color: "green",
    technologies: ["React Native", "Expo", "Firebase"],
  },
  {
    id: 4,
    title: "Banco de Dados",
    description: "Modelagem, otimização e administração de bancos de dados relacionais e não-relacionais.",
    icon: <Database className="w-6 h-6" />,
    color: "orange",
    technologies: ["MongoDB", "PostgreSQL", "MySQL"],
  },
  {
    id: 5,
    title: "Desenvolvimento Fullstack",
    description: "Soluções completas que integram frontend, backend e banco de dados em um único projeto.",
    icon: <Code className="w-6 h-6" />,
    color: "teal",
    technologies: ["MERN Stack", "Next.js", "Prisma"],
  },
  {
    id: 6,
    title: "Otimização de Performance",
    description: "Análise e melhoria de performance em aplicações web e mobile para melhor experiência do usuário.",
    icon: <Zap className="w-6 h-6" />,
    color: "yellow",
    technologies: ["Lighthouse", "WebVitals", "Webpack"],
  },
]

// Mapeamento de cores para classes do Tailwind - simplificado
const colorMap = {
  blue: {
    light: "bg-blue-400/10",
    border: "border-blue-400/30",
    text: "text-blue-400",
  },
  purple: {
    light: "bg-purple-400/10",
    border: "border-purple-400/30",
    text: "text-purple-400",
  },
  green: {
    light: "bg-emerald-400/10",
    border: "border-emerald-400/30",
    text: "text-emerald-400",
  },
  orange: {
    light: "bg-orange-400/10",
    border: "border-orange-400/30",
    text: "text-orange-400",
  },
  teal: {
    light: "bg-teal-400/10",
    border: "border-teal-400/30",
    text: "text-teal-400",
  },
  yellow: {
    light: "bg-amber-400/10",
    border: "border-amber-400/30",
    text: "text-amber-400",
  },
}

const Services = () => {
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
            Serviços<span className="text-blue-400">;</span>
          </h2>
          <motion.p
            className="mt-4 text-blue-200/80 max-w-2xl mx-auto text-base sm:text-lg"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Conheça os serviços que ofereço como desenvolvedor fullstack
          </motion.p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicesData.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} isInView={isInView} />
          ))}
        </div>

        {/* Contact CTA - simplified */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.a
            href="mailto:pedrosousa2160@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600/20 border border-blue-500/30 backdrop-blur-sm text-blue-300 hover:text-white hover:bg-blue-600/30 transition-colors"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Entre em contato</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

interface ServiceCardProps {
  service: (typeof servicesData)[0]
  index: number
  isInView: boolean
}

const ServiceCard = ({ service, index, isInView }: ServiceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const colors = colorMap[service.color as keyof typeof colorMap]

  return (
    <motion.div
      ref={cardRef}
      className="group relative"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="relative bg-blue-900/20 backdrop-blur-sm rounded-2xl border border-blue-500/20 overflow-hidden h-full"
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-6">
          {/* Service icon */}
          <div className="mb-5">
            <div
              className={`w-14 h-14 rounded-2xl ${colors.light} ${colors.border} border flex items-center justify-center transition-colors relative overflow-hidden`}
            >
              <div className={colors.text}>{service.icon}</div>
            </div>
          </div>

          {/* Service content */}
          <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors mb-2">
            {service.title}
          </h3>

          <p className="text-blue-200/80 text-sm sm:text-base mb-4">{service.description}</p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {service.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-400/10 text-blue-300 border border-blue-400/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Services

