"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { timelineData } from "@/constants/timelineData"
import { ExternalLink, Briefcase } from "lucide-react"
import { useTranslation } from "react-i18next"


const Timeline = () => {
  const { t } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })

  return (
    <section className="relative min-h-screen py-16 md:py-24 bg-transparent">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.h2
          className="section-title font-bold text-center text-blue-500 mb-10 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {t("timeline.title")}
          <span className="text-white">;</span>
        </motion.h2>

        <div ref={containerRef} className="relative">
          {/* Modern Timeline center line */}
          <div
            className="absolute top-0 bottom-0 left-4 md:left-1/2 md:-ml-[1px]
                      w-[2px] bg-gradient-to-b from-blue-400 via-blue-500 to-purple-500 timeline-line
                      after:absolute after:inset-0 after:blur-sm after:bg-gradient-to-b 
                      after:from-blue-400/50 after:via-blue-500/50 after:to-purple-500/50"
          ></div>

          {/* Timeline items */}
          <div className="relative">
            {timelineData.map((item, index) => (
              <div
                key={index}
                className={`
                  flex mb-10 md:mb-20 
                  justify-start
                  ${index % 2 === 0 ? "md:justify-start" : "md:justify-end"}
                `}
              >
                {/* Card */}
                <motion.div
                  className={`
                    w-[calc(100%-30px)] md:w-[calc(50%-20px)] 
                    bg-gray-900/30 backdrop-blur-sm rounded-xl 
                    overflow-hidden transition-all duration-300 
                    hover:bg-gray-900/40 hover:shadow-lg hover:shadow-blue-500/5
                    group ml-8 md:ml-0
                    border border-gray-700/20
                  `}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20, y: 10 }}
                  animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: index % 2 === 0 ? -20 : 20, y: 10 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  whileHover={{ y: -3 }}
                >
                  {/* Card header with company info */}
                  <div className="p-4 md:p-5 border-b border-gray-800/20">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className="flex-shrink-0 size-8 md:size-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 transition-colors group-hover:bg-blue-500/20">
                          {/* Usando o nome da empresa da chave de tradução para o ícone */}
                          <Briefcase className="size-4 md:size-5" />
                        </div>
                        <div>
                          <h3 className="title font-bold text-white group-hover:text-blue-400 transition-colors">
                            {t(item.companyKey)}
                          </h3>
                          <p className="text text-gray-300">{t(item.roleKey)}</p>
                        </div>
                      </div>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 transition-colors p-1 rounded-full hover:bg-blue-500/10"
                        aria-label={`Visitar ${t(item.companyKey)}`}
                      >
                        <ExternalLink className="size-3.5 md:size-4" />
                      </a>
                    </div>
                  </div>

                  {/* Card content */}
                  <div className="p-4 md:p-5">
                    <div className="flex flex-wrap items-center gap-2 mb-3 md:mb-4">
                      <span className="text text-gray-400">{t(item.periodKey)}</span>
                      <span className="text-small px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {t(item.statusKey)}
                      </span>
                    </div>

                    <p className="text text-gray-300 mb-3 md:mb-4 leading-relaxed">{t(item.descriptionKey)}</p>

                    {item.detailsKey && (
                      <p className="text text-gray-400 mb-3 md:mb-4 leading-relaxed">{t(item.detailsKey)}</p>
                    )}

                    <div className="flex flex-wrap gap-1 md:gap-1.5 mt-3 md:mt-4">
                      {item.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="text-small px-1.5 md:px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Modern Timeline dot with enhanced pulse effect */}
                <div className="absolute left-4 md:left-1/2 top-4 md:top-6 -ml-[6px] md:-ml-[7px] z-10">
                  <div className="relative">
                    <div
                      className="size-3 md:size-3.5 bg-blue-400 rounded-full z-10 relative 
                                  shadow-[0_0_10px_rgba(59,130,246,0.5)] 
                                  border border-blue-300/30"
                    />
                    <div className="absolute inset-0 size-3 md:size-3.5 bg-blue-400 rounded-full animate-ping opacity-60" />
                  </div>
                </div>

                {/* Connector line from dot to card - only visible on desktop */}
                {index % 2 === 0 ? (
                  <div className="hidden md:block absolute left-1/2 top-6 h-[1px] w-[20px] bg-gradient-to-r from-blue-500 to-transparent"></div>
                ) : (
                  <div className="hidden md:block absolute left-1/2 top-6 h-[1px] w-[20px] bg-gradient-to-l from-blue-500 to-transparent transform -translate-x-full"></div>
                )}
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
