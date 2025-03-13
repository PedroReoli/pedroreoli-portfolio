"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { timelineData } from "@/constants/timelineData"
import { ExternalLink, Briefcase, Code, BookOpen } from "lucide-react"

// Icon mapping for companies
const companyIcons: Record<string, React.ReactNode> = {
  AutoCom3: <Code className="h-5 w-5" />,
  DevEmDesenvolvimento: <BookOpen className="h-5 w-5" />,
  EvaTech: <Briefcase className="h-5 w-5" />,
}

const Timeline = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

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

        <div ref={ref} className="relative">
          {/* Timeline center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-blue-500 transform -translate-x-1/2"></div>

          {/* Timeline items */}
          <div className="relative">
            {timelineData.map((item, index) => (
              <div key={index} className={`flex mb-20 ${index % 2 === 0 ? "justify-start" : "justify-end"}`}>
                {/* Card */}
                <motion.div
                  className="w-[calc(50%-20px)] bg-gray-900/30 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300 hover:bg-gray-900/40 group"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -3 }}
                >
                  {/* Card header with company info */}
                  <div className="p-5 border-b border-gray-800/20">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                          {companyIcons[item.empresa] || <Briefcase className="h-5 w-5" />}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                            {item.empresa}
                          </h3>
                          <p className="text-gray-300 text-sm">{item.cargo}</p>
                        </div>
                      </div>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 transition-colors p-1 rounded-full hover:bg-blue-500/10"
                        aria-label={`Visitar ${item.empresa}`}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>

                  {/* Card content */}
                  <div className="p-5">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span className="text-sm text-gray-400">{item.periodo}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {item.status}
                      </span>
                    </div>

                    <p className="text-gray-300 mb-4 text-sm leading-relaxed">{item.descricao}</p>

                    {item.detalhes && <p className="text-gray-400 text-xs mb-4 leading-relaxed">{item.detalhes}</p>}

                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {item.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Timeline dot */}
                <div className="absolute left-1/2 top-6 w-3 h-3 bg-blue-500 rounded-full transform -translate-x-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animated gradient border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-[length:200%_auto] animate-gradient"></div>
    </section>
  )
}

export default Timeline

