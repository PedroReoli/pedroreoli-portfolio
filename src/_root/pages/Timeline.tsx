"use client"

import type React from "react"
import { useRef, useEffect } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { timelineData, tagColors } from "@/constants/timelineData"
import { ExternalLink, Briefcase, Code, BookOpen } from "lucide-react"

// Icon mapping for companies
const companyIcons: Record<string, React.ReactNode> = {
  AutoCom3: <Code className="h-5 w-5" />,
  DevEmDesenvolvimento: <BookOpen className="h-5 w-5" />,
  EvaTech: <Briefcase className="h-5 w-5" />,
}

const Timeline = () => {
  return (
    <section className="relative min-h-screen py-16 md:py-24 bg-transparent">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center text-blue-500 mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Experiência<span className="text-white">;</span>
        </motion.h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-px bg-gradient-to-b from-blue-500/50 via-blue-500/30 to-blue-500/10"></div>

          {/* Timeline items */}
          <div className="space-y-12">
            {timelineData.map((item, index) => (
              <TimelineItem key={index} item={item} index={index} isLeft={index % 2 === 0} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

interface TimelineItemProps {
  item: (typeof timelineData)[0]
  index: number
  isLeft: boolean
}

const TimelineItem: React.FC<TimelineItemProps> = ({ item, index, isLeft }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const variants = {
    hidden: {
      opacity: 0,
      x: isLeft ? -20 : 20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.1,
      },
    },
  }

  const statusVariant =
    item.status === "Em Andamento"
      ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
      : "bg-green-500/10 text-green-400 border-green-500/20"

  return (
    <div ref={ref} className={`flex flex-col md:flex-row items-center ${isLeft ? "md:flex-row-reverse" : ""}`}>
      {/* Timeline dot */}
      <div className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 z-10">
        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
      </div>

      {/* Card */}
      <motion.div
        className={`w-full md:w-[calc(50%-2rem)] p-5 rounded-lg border border-gray-800 bg-gray-900/30 backdrop-blur-sm shadow-lg ${isLeft ? "md:mr-8" : "md:ml-8"}`}
        variants={variants}
        initial="hidden"
        animate={controls}
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-blue-500 inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/10">
                {companyIcons[item.empresa] || <Briefcase className="h-5 w-5" />}
              </span>
              {item.empresa}
            </h3>
            <p className="text-gray-300 font-medium">{item.cargo}</p>
          </div>
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors"
            aria-label={`Visitar ${item.empresa}`}
          >
            <ExternalLink className="h-5 w-5" />
          </a>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-sm text-gray-400">{item.periodo}</span>
          <span className={`text-xs px-2 py-1 rounded-full border ${statusVariant}`}>{item.status}</span>
        </div>

        <p className="text-gray-300 mb-3">{item.descricao}</p>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {item.tags.map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className={`text-xs px-2 py-0.5 rounded-full border ${tagColors[tag] || "bg-gray-700/50 text-gray-300 border-gray-600/30"}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Timeline

