"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useSpring, useInView, AnimatePresence } from "framer-motion"
import {
  Calendar,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Briefcase,
  GraduationCap,
  Code,
  Database,
  Star,
  Clock,
} from "lucide-react"
import { Tilt } from "react-tilt"
import { timelineEvents } from "@/constants/timelineData"

const defaultTiltOptions = {
  reverse: false,
  max: 15,
  perspective: 1000,
  scale: 1.02,
  speed: 1000,
  transition: true,
  axis: null,
  reset: true,
  easing: "cubic-bezier(.03,.98,.52,.99)",
}

// Function to get icon based on tags and company name
const getEventIcon = (tags: string[], empresa: string) => {
  // AutoCom3 should always have a work/briefcase icon
  if (empresa === "AutoCom3") return <Briefcase className="w-5 h-5" />

  // For other companies, determine by tags
  if (tags.includes("Educação")) return <GraduationCap className="w-5 h-5" />
  if (tags.includes("Programação") || tags.includes("Blog")) return <Code className="w-5 h-5" />
  if (tags.includes("Banco de Dados")) return <Database className="w-5 h-5" />
  return <Briefcase className="w-5 h-5" />
}

const Timeline = () => {
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null)
  const [activeEvent, setActiveEvent] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Parallax effect for background elements
  const [scrollY, setScrollY] = useState(0)
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section
      ref={containerRef}
      className="py-16 sm:py-20 overflow-hidden min-h-screen relative"
      onMouseLeave={() => setActiveEvent(null)}
    >
      {/* Section background with enhanced cosmic theme */}
      <div className="absolute inset-0 bg-cosmic-bg/90 backdrop-blur-sm"></div>

      {/* Animated nebula clouds with parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 3 }).map((_, i) => {
          const colors = [
            "radial-gradient(circle, rgba(147, 197, 253, 0.15) 0%, rgba(96, 165, 250, 0.05) 50%, transparent 80%)",
            "radial-gradient(circle, rgba(196, 181, 253, 0.15) 0%, rgba(167, 139, 250, 0.05) 50%, transparent 80%)",
            "radial-gradient(circle, rgba(249, 168, 212, 0.15) 0%, rgba(236, 72, 153, 0.05) 50%, transparent 80%)",
          ]

          const parallaxFactor = 0.05 * ((i % 3) + 1)

          return (
            <motion.div
              key={`timeline-nebula-${i}`}
              className="absolute rounded-full"
              style={{
                background: colors[i % colors.length],
                width: Math.random() * 800 + 400,
                height: Math.random() * 800 + 400,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: 0.2 + Math.random() * 0.2,
                filter: "blur(100px)",
                transform: `translateY(${scrollY * parallaxFactor}px)`,
              }}
              animate={{
                scale: [1, 1.1, 0.95, 1.05, 1],
                opacity: [
                  0.2 + Math.random() * 0.2,
                  0.25 + Math.random() * 0.25,
                  0.18 + Math.random() * 0.18,
                  0.22 + Math.random() * 0.22,
                  0.2 + Math.random() * 0.2,
                ],
              }}
              transition={{
                duration: 15 + Math.random() * 10,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          )
        })}
      </div>

      {/* Animated particles with parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => {
          const size = Math.random() * 3 + 1
          const colors = ["#93C5FD", "#C4B5FD", "#F9A8D4"]
          const color = colors[i % colors.length]
          const parallaxFactor = 0.03 * ((i % 3) + 1)

          return (
            <motion.div
              key={`timeline-particle-${i}`}
              className="absolute rounded-full"
              style={{
                width: size,
                height: size,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                backgroundColor: color,
                boxShadow: `0 0 ${size * 3}px ${size}px ${color}`,
                opacity: Math.random() * 0.5 + 0.2,
                transform: `translateY(${scrollY * parallaxFactor}px)`,
              }}
              animate={{
                y: [0, Math.random() * -100 - 50],
                x: [0, (Math.random() - 0.5) * 50],
                opacity: [Math.random() * 0.5 + 0.2, 0],
              }}
              transition={{
                duration: Math.random() * 15 + 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
                delay: Math.random() * 5,
              }}
            />
          )
        })}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Jornada Profissional<span className="text-cosmic-accent">;</span>
          </h2>
          <motion.p
            className="mt-4 text-cosmic-text max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Conheça minha trajetória profissional e acadêmica, com os principais marcos e experiências que moldaram
            minha carreira.
          </motion.p>
        </motion.div>

        <div className="relative" ref={timelineRef}>
          {/* Enhanced timeline line with animated particles - visible on larger screens */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full hidden md:block overflow-hidden">
            {/* Base line with glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-cosmic-accent/10 via-cosmic-accent/30 to-cosmic-accent/10"
              style={{ scaleY: scaleX }}
            />

            {/* Animated particles along the line */}
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={`line-particle-${i}`}
                className="absolute w-2 h-2 left-1/2 -translate-x-1/2 rounded-full bg-cosmic-accent"
                style={{
                  boxShadow: "0 0 8px 2px rgba(96, 165, 250, 0.5)",
                }}
                initial={{ top: "-10%", opacity: 0 }}
                animate={{
                  top: ["0%", "100%"],
                  opacity: [0, 1, 1, 0],
                  scale: [0.5, 1, 1, 0.5],
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                  delay: i * 3,
                }}
              />
            ))}
          </div>

          {/* Timeline nodes for larger screens */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full">
            {timelineEvents.map((_, index) => (
              <motion.div
                key={`node-${index}`}
                className={`absolute w-4 h-4 left-0 -translate-x-1/2 rounded-full border-2 border-cosmic-accent bg-cosmic-bg`}
                style={{
                  top: `${(index / (timelineEvents.length - 1)) * 100}%`,
                  boxShadow:
                    activeEvent === index
                      ? "0 0 15px 5px rgba(96, 165, 250, 0.5)"
                      : "0 0 5px 2px rgba(96, 165, 250, 0.3)",
                }}
                animate={{
                  scale: activeEvent === index ? 1.3 : 1,
                  borderColor: activeEvent === index ? "rgba(147, 197, 253, 1)" : "rgba(96, 165, 250, 1)",
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>

          <div className="relative z-10 space-y-12 md:space-y-20">
            {timelineEvents.map((event, index) => (
              <TimelineEvent
                key={event.empresa}
                event={event}
                index={index}
                isExpanded={expandedEvent === index}
                isActive={activeEvent === index}
                onToggle={() => setExpandedEvent(expandedEvent === index ? null : index)}
                onHover={() => setActiveEvent(index)}
                onLeave={() => setActiveEvent(null)}
                totalEvents={timelineEvents.length}
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
}: {
  event: (typeof timelineEvents)[0]
  index: number
  isExpanded: boolean
  isActive: boolean
  onToggle: () => void
  onHover: () => void
  onLeave: () => void
  totalEvents: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const eventIcon = getEventIcon(event.tags, event.empresa)

  // Calculate parallax offset based on index
  const parallaxOffset = index % 2 === 0 ? 20 : -20

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col md:flex-row justify-between items-center w-full 
        ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
      initial={{ opacity: 0, y: 50, x: parallaxOffset }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              x: 0,
              filter: "blur(0px)",
            }
          : {
              opacity: 0,
              y: 50,
              x: parallaxOffset,
              filter: "blur(4px)",
            }
      }
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Timeline connector for mobile */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-cosmic-accent/20 md:hidden">
        {index < totalEvents - 1 && (
          <motion.div
            className="absolute top-8 bottom-0 w-full"
            initial={{ scaleY: 0, originY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        )}
      </div>

      {/* Mobile timeline node */}
      <div
        className="absolute left-4 top-8 w-4 h-4 rounded-full border-2 border-cosmic-accent bg-cosmic-bg md:hidden"
        style={{
          transform: "translateX(-50%)",
          boxShadow: "0 0 10px 2px rgba(96, 165, 250, 0.3)",
        }}
      />

      {/* Left spacer for desktop layout */}
      <div className="hidden md:block md:w-5/12" />

      {/* Event card */}
      <div className="w-full pl-10 md:pl-0 md:w-5/12">
        <Tilt options={defaultTiltOptions}>
          <motion.div
            className="group relative"
            whileHover={{ y: -8, x: index % 2 === 0 ? -4 : 4 }}
            animate={{
              y: isActive ? -4 : 0,
              x: isActive ? (index % 2 === 0 ? -2 : 2) : 0,
            }}
            transition={{
              duration: 0.4,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {/* Enhanced glow effect */}
            <motion.div
              className="absolute -inset-0.5 rounded-2xl blur-md z-0"
              animate={{
                opacity: isActive || isExpanded ? 0.6 : 0,
                background:
                  isActive || isExpanded
                    ? "linear-gradient(45deg, rgba(96, 165, 250, 0.6), rgba(147, 197, 253, 0.6), rgba(59, 130, 246, 0.6))"
                    : "linear-gradient(45deg, rgba(96, 165, 250, 0.3), rgba(147, 197, 253, 0.3), rgba(59, 130, 246, 0.3))",
              }}
              transition={{ duration: 0.3 }}
            />

            <motion.div
              className="absolute -inset-0.5 bg-gradient-to-r from-cosmic-accent to-cosmic-accent/70 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-300"
              animate={{
                opacity: isActive ? 0.3 : "0",
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                opacity: { duration: 0.3 },
                backgroundPosition: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
              }}
            />

            <div className="relative bg-cosmic-card rounded-2xl border border-cosmic-border overflow-hidden z-10">
              <div className="p-5">
                {/* Header with company and role */}
                <div className="mb-4">
                  {/* Header with icon and title */}
                  <div className="flex items-start gap-3 mb-2">
                    {/* Icon with animated background */}
                    <div className="relative shrink-0 w-10 h-10 rounded-full overflow-hidden">
                      <motion.div
                        className="absolute inset-0 bg-cosmic-accent opacity-20"
                        animate={{
                          opacity: [0.1, 0.3, 0.1],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center text-cosmic-accent">
                        {eventIcon}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-cosmic-accent transition-colors">
                        {event.empresa}
                      </h3>
                      <p className="text-cosmic-accent/80 font-medium mt-1">{event.cargo}</p>
                    </div>
                  </div>

                  {/* Status and period in the same row */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 ml-13">
                    {/* Enhanced status badge */}
                    <motion.span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        event.status === "Finalizado"
                          ? "bg-green-500/10 text-green-400 border border-green-500/20"
                          : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      animate={
                        isActive
                          ? {
                              boxShadow: [
                                "0 0 0 rgba(0, 0, 0, 0)",
                                event.status === "Finalizado"
                                  ? "0 0 8px rgba(74, 222, 128, 0.5)"
                                  : "0 0 8px rgba(250, 204, 21, 0.5)",
                                "0 0 0 rgba(0, 0, 0, 0)",
                              ],
                            }
                          : {}
                      }
                      transition={{
                        duration: 2,
                        repeat: isActive ? Number.POSITIVE_INFINITY : 0,
                        repeatType: "reverse",
                      }}
                    >
                      {event.status === "Finalizado" ? <Star className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      <span>{event.status}</span>
                    </motion.span>

                    {/* Period with enhanced icon */}
                    <div className="flex items-center gap-2 text-cosmic-text">
                      <div className="flex items-center justify-center w-4 h-4 rounded-full bg-cosmic-accent/10">
                        <Calendar className="w-3 h-3 text-cosmic-accent" />
                      </div>
                      <span className="text-xs">{event.periodo}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-cosmic-text mb-4 text-sm leading-relaxed">{event.descricao}</p>

                {/* Enhanced toggle button with microinteractions */}
                <motion.button
                  onClick={onToggle}
                  className="w-full flex items-center justify-center gap-2 text-xs font-medium text-cosmic-accent hover:text-white transition-colors py-1"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>{isExpanded ? "Ver menos" : "Ver mais"}</span>
                  <motion.div
                    animate={{
                      rotate: isExpanded ? 180 : 0,
                      y: isExpanded ? 0 : [0, 3, 0],
                    }}
                    transition={{
                      rotate: { duration: 0.3 },
                      y: {
                        duration: 1.5,
                        repeat: isExpanded ? 0 : Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      },
                    }}
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </motion.div>
                </motion.button>

                {/* Expanded content with improved animations */}
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
                        transition: {
                          height: { duration: 0.3 },
                          opacity: { duration: 0.2 },
                        },
                      }}
                      transition={{
                        height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] },
                        opacity: { duration: 0.3, delay: 0.1 },
                      }}
                      className="overflow-hidden"
                    >
                      <motion.div
                        className="pt-4 space-y-4 border-t border-cosmic-border mt-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        {/* Details with subtle animation */}
                        <motion.p
                          className="text-cosmic-text text-sm leading-relaxed"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.3 }}
                        >
                          {event.detalhes}
                        </motion.p>

                        {/* Tags with staggered animation */}
                        <motion.div
                          className="flex flex-wrap gap-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.4 }}
                        >
                          {event.tags.map((tag, idx) => (
                            <motion.span
                              key={idx}
                              className="px-3 py-1.5 rounded-full text-xs font-medium bg-cosmic-accent/5 text-cosmic-accent border border-cosmic-accent/20"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: 0.4 + idx * 0.1 }}
                              whileHover={{
                                scale: 1.05,
                                backgroundColor: "rgba(96, 165, 250, 0.15)",
                                borderColor: "rgba(96, 165, 250, 0.4)",
                              }}
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </motion.div>

                        {/* Link with enhanced animation */}
                        {event.link && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.5 }}
                          >
                            <motion.a
                              href={event.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-sm font-medium text-cosmic-accent hover:text-white transition-colors relative group/link"
                              whileHover={{ x: 4 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <span className="relative">
                                Visitar
                                <motion.span
                                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-cosmic-accent"
                                  animate={{ width: "0%" }}
                                  whileHover={{ width: "100%" }}
                                  transition={{ duration: 0.3 }}
                                />
                              </span>
                              <ExternalLink className="w-4 h-4" />
                            </motion.a>
                          </motion.div>
                        )}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </Tilt>
      </div>
    </motion.div>
  )
}

export default Timeline

