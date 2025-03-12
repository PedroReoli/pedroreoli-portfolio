"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Briefcase,
  GraduationCap,
  Code,
  Database,
  Star,
  Clock,
  ArrowRight,
} from "lucide-react"

// Dados do timeline
const timelineEvents = [
  {
    empresa: "AutoCom3",
    cargo: "Desenvolvedor Júnior",
    periodo: "2023 - Atual",
    status: "Em Andamento",
    descricao: "Desenvolvimento e automação de testes com foco em .NET, C# e Python.",
    detalhes: "Implementação de soluções para garantir a qualidade e eficiência dos sistemas.",
    tags: ["C#", ".NET", "Python", "Testes", "Automação"],
    link: "https://autocom3.com.br/",
  },
  {
    empresa: "Freelancer",
    cargo: "Desenvolvedor FullStack",
    periodo: "2022 - Atual",
    status: "Em Andamento",
    descricao: "Criação de interfaces modernas e intuitivas, desenvolvimento de APIs e integração com bancos de dados.",
    detalhes:
      "Trabalho com diversos clientes em projetos variados, utilizando tecnologias como React, Node.js e MongoDB.",
    tags: ["React", "Node.js", "MongoDB", "API", "Freelance"],
    link: "https://github.com/PedroReoli",
  },
  {
    empresa: "Descomplica",
    cargo: "Estudante de ADS",
    periodo: "2022 - 2024",
    status: "Em Andamento",
    descricao: "Análise e Desenvolvimento de Sistemas, com foco em desenvolvimento web e mobile.",
    detalhes: "Aprendizado de tecnologias e metodologias modernas para o desenvolvimento de software.",
    tags: ["Educação", "Programação", "Banco de Dados", "Sistemas"],
    link: "https://descomplica.com.br/",
  },
  {
    empresa: "Projetos Pessoais",
    cargo: "Desenvolvedor & Criador",
    periodo: "2021 - Atual",
    status: "Em Andamento",
    descricao: "Desenvolvimento de projetos pessoais visando renda passiva e compartilhamento de conhecimento.",
    detalhes: "Criação de conteúdo educacional e projetos open-source para a comunidade de desenvolvedores.",
    tags: ["Blog", "Open Source", "Educação", "Conteúdo"],
    link: "https://devemdesenvolvimento.netlify.app/",
  },
]

const Timeline = () => {
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null)
  const [activeEvent, setActiveEvent] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })

  // Toggle event expansion
  const toggleEvent = (index: number) => {
    setExpandedEvent(expandedEvent === index ? null : index)
  }

  return (
    <section ref={containerRef} className="py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden min-h-screen relative">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1120]/90 via-[#0F172A]/80 to-[#0A1120]/90 backdrop-blur-sm"></div>

      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] bg-repeat opacity-5"></div>

        {/* Vertical lines */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute top-0 bottom-0 w-px bg-blue-500/10"
            style={{
              left: `${20 + i * 15}%`,
              height: "120%",
              top: "-10%",
            }}
            animate={{
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              opacity: { duration: 8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" },
            }}
          />
        ))}

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-12 sm:mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Jornada Profissional<span className="text-blue-400">;</span>
          </h2>
          <motion.p
            className="mt-4 text-blue-200/80 max-w-2xl mx-auto text-base sm:text-lg"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Conheça minha trajetória profissional e acadêmica, com os principais marcos e experiências que moldaram
            minha carreira.
          </motion.p>
        </motion.div>

        <div className="relative">
          {/* Main timeline line */}
          <div className="absolute left-4 sm:left-1/2 transform sm:-translate-x-1/2 w-0.5 h-full bg-blue-500/20 hidden sm:block"></div>

          <div className="relative z-10 space-y-12 sm:space-y-16">
            {timelineEvents.map((event, index) => (
              <TimelineEvent
                key={event.empresa}
                event={event}
                index={index}
                isExpanded={expandedEvent === index}
                isActive={activeEvent === index}
                onToggle={() => toggleEvent(index)}
                onHover={() => setActiveEvent(index)}
                onLeave={() => setActiveEvent(null)}
                totalEvents={timelineEvents.length}
                isInView={isInView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TimelineEvent({
  event,
  index,
  isExpanded,
  isActive,
  onToggle,
  onHover,
  onLeave,
  totalEvents,
  isInView,
}: {
  event: (typeof timelineEvents)[0]
  index: number
  isExpanded: boolean
  isActive: boolean
  onToggle: () => void
  onHover: () => void
  onLeave: () => void
  totalEvents: number
  isInView: boolean
}) {
  // Get icon based on tags and company name
  const getEventIcon = () => {
    // AutoCom3 should always have a work/briefcase icon
    if (event.empresa === "AutoCom3") return <Briefcase className="w-5 h-5" />

    // For other companies, determine by tags
    if (event.tags.includes("Educação")) return <GraduationCap className="w-5 h-5" />
    if (event.tags.includes("Programação") || event.tags.includes("Blog")) return <Code className="w-5 h-5" />
    if (event.tags.includes("Banco de Dados")) return <Database className="w-5 h-5" />
    return <Briefcase className="w-5 h-5" />
  }

  return (
    <motion.div
      className={`flex flex-col sm:flex-row justify-between items-start w-full 
        ${index % 2 === 0 ? "sm:flex-row-reverse" : ""}`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Timeline node for desktop */}
      <div
        className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full border-2 border-blue-400 bg-[#0F172A]"
        style={{ top: `calc(${index / (totalEvents - 1)} * 100%)` }}
      ></div>

      {/* Left spacer for desktop layout */}
      <div className="hidden sm:block sm:w-5/12" />

      {/* Event card */}
      <div className="w-full pl-10 sm:pl-0 sm:w-5/12 relative">
        {/* Mobile timeline node */}
        <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-blue-900/30 border border-blue-500/30 flex items-center justify-center sm:hidden">
          <div className="text-blue-400">{getEventIcon()}</div>
        </div>

        <motion.div
          className="bg-blue-900/20 backdrop-blur-sm rounded-xl border border-blue-500/20 overflow-hidden"
          whileHover={{ y: -8 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-5 sm:p-6">
            {/* Header with company and role */}
            <div className="mb-4">
              {/* Header with icon and title */}
              <div className="flex items-start gap-3 mb-2">
                {/* Icon with animated background */}
                <div className="relative hidden sm:block shrink-0 w-10 h-10 rounded-full overflow-hidden bg-blue-900/30 border border-blue-500/30">
                  <div className="absolute inset-0 flex items-center justify-center text-blue-400">
                    {getEventIcon()}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">{event.empresa}</h3>
                  <p className="text-blue-300/80 font-medium mt-1 text-sm sm:text-base">{event.cargo}</p>
                </div>
              </div>

              {/* Status and period in the same row */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 ml-0 sm:ml-13">
                {/* Status badge */}
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                    event.status === "Finalizado"
                      ? "bg-green-500/10 text-green-400 border border-green-500/20"
                      : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                  }`}
                >
                  {event.status === "Finalizado" ? <Star className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                  <span>{event.status}</span>
                </span>

                {/* Period with icon */}
                <div className="flex items-center gap-2 text-blue-200/80">
                  <div className="flex items-center justify-center w-4 h-4 rounded-full bg-blue-400/10">
                    <Calendar className="w-3 h-3 text-blue-400" />
                  </div>
                  <span className="text-xs">{event.periodo}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-blue-100/80 mb-4 text-sm sm:text-base leading-relaxed">{event.descricao}</p>

            {/* Toggle button */}
            <button
              onClick={onToggle}
              className="w-full flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-blue-400 hover:text-white transition-colors py-1"
            >
              <span>{isExpanded ? "Ver menos" : "Ver mais"}</span>
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {/* Expanded content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: "auto",
                    opacity: 1,
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                  }}
                  transition={{
                    height: { duration: 0.3 },
                    opacity: { duration: 0.3 },
                  }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 space-y-4 border-t border-blue-500/20 mt-3">
                    {/* Details */}
                    <p className="text-blue-100/80 text-sm leading-relaxed">{event.detalhes}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {event.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-full text-xs font-medium bg-blue-400/5 text-blue-300 border border-blue-400/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Link */}
                    {event.link && (
                      <div>
                        <a
                          href={event.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-white transition-colors relative"
                        >
                          <span>Visitar</span>
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Timeline

