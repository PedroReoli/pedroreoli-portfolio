"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { faqData } from "@/constants/FAQData"
import { ChevronDown, Mail, Instagram, Github, Linkedin, ExternalLink, HelpCircle, Sparkles } from "lucide-react"
import { useTranslation } from "react-i18next"

const FAQ = () => {
  const { t } = useTranslation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Auto-open first question after a delay for better UX
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setActiveIndex(0)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [isInView])

  const toggleQuestion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  // Function to render the appropriate icon based on iconType
  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case "mail":
        return <Mail className="w-4 h-4 md:w-5 md:h-5" />
      case "instagram":
        return <Instagram className="w-4 h-4 md:w-5 md:h-5" />
      case "github":
        return <Github className="w-4 h-4 md:w-5 md:h-5" />
      case "linkedin":
        return <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
      default:
        return <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
    }
  }

  return (
    <section className="relative min-h-screen py-12 md:py-16 lg:py-24 bg-transparent overflow-hidden">
      {/* Enhanced decorative elements */}
      <div className="absolute top-40 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-40 right-10 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        {/* Enhanced header with decorative elements */}
        <div className="relative mb-12 md:mb-16">
          <motion.div
            className="absolute -top-10 left-1/2 transform -translate-x-1/2 opacity-10 text-blue-400"
            initial={{ scale: 0, rotate: -20, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 0.1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <HelpCircle className="w-40 h-40" />
          </motion.div>

          <motion.h2
            className="section-title font-bold text-center text-blue-500 relative z-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            FAQ<span className="text-white">;</span>
          </motion.h2>

          <motion.div
            className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "6rem", opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="w-full h-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent rounded-full"></div>
          </motion.div>
        </div>

        {/* Enhanced FAQ Items */}
        <div ref={ref} className="space-y-4 md:space-y-5">
          {faqData.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
              index={index}
              isActive={activeIndex === index}
              isHovered={hoveredIndex === index}
              toggleQuestion={() => toggleQuestion(index)}
              onHover={() => setHoveredIndex(index)}
              onLeave={() => setHoveredIndex(null)}
              isInView={isInView}
              renderIcon={renderIcon}
              totalItems={faqData.length}
            />
          ))}
        </div>

        {/* Enhanced footer note */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="text-xs text-gray-400 flex items-center justify-center gap-2">
            <Sparkles className="h-3 w-3 text-blue-400" />
            {t("faq.notFound")}
            <Sparkles className="h-3 w-3 text-blue-400" />
          </p>
        </motion.div>
      </div>
    </section>
  )
}

interface FAQItemProps {
  item: {
    question: string
    answer: string
    contacts?: {
      type: string
      link: string
      iconType: string
      label: string
    }[]
  }
  index: number
  isActive: boolean
  isHovered: boolean
  toggleQuestion: () => void
  onHover: () => void
  onLeave: () => void
  isInView: boolean
  renderIcon: (iconType: string) => React.ReactNode
  totalItems: number
}

const FAQItem: React.FC<FAQItemProps> = ({
  item,
  index,
  isActive,
  isHovered,
  toggleQuestion,
  onHover,
  onLeave,
  isInView,
  renderIcon,
  totalItems,
}) => {
  const { t } = useTranslation()
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  return (
    <motion.div
      className="relative group"
      variants={itemVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={index}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Card with enhanced styling */}
      <div
        className={`bg-gray-900/40 backdrop-blur-sm rounded-2xl overflow-hidden border transition-all duration-300 ${
          isActive
            ? "border-blue-500/40 shadow-lg shadow-blue-500/10"
            : isHovered
              ? "border-blue-500/20 shadow-md shadow-blue-500/5"
              : "border-gray-800/50"
        }`}
      >
        {/* Question header with enhanced styling */}
        <button
          className="w-full text-left p-5 md:p-6 flex justify-between items-center"
          onClick={toggleQuestion}
          aria-expanded={isActive}
        >
          <h3
            className={`title font-medium pr-3 transition-colors duration-300 ${
              isActive ? "text-blue-400" : "text-white group-hover:text-blue-300"
            }`}
          >
            {item.question}
          </h3>

          <div
            className={`relative flex-shrink-0 ml-2 transition-colors duration-300 ${
              isActive ? "text-blue-400" : "text-gray-400 group-hover:text-blue-400"
            }`}
          >
            {/* Enhanced animated circle background on active */}
            {isActive && (
              <motion.div
                className="absolute inset-0 bg-blue-500/10 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1.5 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.3 }}
              />
            )}

            <motion.div
              className="relative z-10 w-8 h-8 flex items-center justify-center rounded-full"
              animate={{ rotate: isActive ? 180 : 0 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </div>
        </button>

        {/* Answer content with enhanced animations */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="overflow-hidden"
            >
              <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
                {/* Enhanced divider with animation */}
                <motion.div
                  className="h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent mb-4"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />

                {/* Answer text with enhanced animation */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <p className="text text-gray-300">{item.answer}</p>
                </motion.div>

                {/* Enhanced contacts list if available */}
                {item.contacts && (
                  <motion.div
                    className="mt-5 space-y-3"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <h4 className="text-sm font-medium text-blue-400 mb-2 flex items-center gap-2">
                      <div className="w-4 h-px bg-blue-500/50"></div>
                      {t("faq.contactChannels")}
                      <div className="w-4 h-px bg-blue-500/50"></div>
                    </h4>

                    <div className="flex flex-wrap gap-3">
                      {item.contacts.map((contact, contactIndex) => (
                        <a
                          key={contactIndex}
                          href={contact.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative"
                          aria-label={contact.label}
                        >
                          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:border-blue-500/30 hover:bg-blue-500/10 transition-all duration-300">
                            <div className="text-blue-400 group-hover:text-blue-300 transition-colors">
                              {renderIcon(contact.iconType)}
                            </div>
                            <span className="text-xs text-gray-300 group-hover:text-white transition-colors">
                              {contact.label}
                            </span>
                          </div>

                          {/* Enhanced hover glow effect */}
                          <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md bg-blue-500/20 rounded-lg"></div>
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Enhanced connection line between items */}
      {index < totalItems - 1 && (
        <div className="absolute left-1/2 top-full h-4 md:h-5 w-px bg-gradient-to-b from-blue-500/20 to-transparent"></div>
      )}
    </motion.div>
  )
}

export default FAQ
