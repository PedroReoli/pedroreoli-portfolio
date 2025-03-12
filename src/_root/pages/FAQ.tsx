"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { faqData } from "@/constants/FAQData"
import { ChevronDown, Mail, Instagram, Github, Linkedin } from "lucide-react"

const FAQ = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  // Function to render the appropriate icon based on iconType
  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case "mail":
        return <Mail size={18} />
      case "instagram":
        return <Instagram size={18} />
      case "github":
        return <Github size={18} />
      case "linkedin":
        return <Linkedin size={18} />
      default:
        return null
    }
  }

  return (
    <section className="relative min-h-screen py-16 md:py-24 bg-transparent">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center text-blue-500 mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          FAQ<span className="text-white">;</span>
        </motion.h2>

        <div ref={ref} className="space-y-4">
          {faqData.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
              index={index}
              isActive={activeIndex === index}
              toggleQuestion={() => toggleQuestion(index)}
              isInView={isInView}
              renderIcon={renderIcon}
            />
          ))}
        </div>
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
  toggleQuestion: () => void
  isInView: boolean
  renderIcon: (iconType: string) => React.ReactNode
}

const FAQItem: React.FC<FAQItemProps> = ({ item, index, isActive, toggleQuestion, isInView, renderIcon }) => {
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
      className="bg-gray-900/40 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800/50 transition-all duration-300"
      variants={itemVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={index}
      style={{
        borderColor: isActive ? "rgba(59, 130, 246, 0.3)" : "rgba(31, 41, 55, 0.5)",
        boxShadow: isActive ? "0 4px 20px -5px rgba(59, 130, 246, 0.2)" : "none",
      }}
    >
      {/* Question header */}
      <button
        className="w-full text-left p-5 flex justify-between items-center"
        onClick={toggleQuestion}
        aria-expanded={isActive}
      >
        <h3 className="text-lg font-medium text-white">{item.question}</h3>
        <motion.div
          animate={{ rotate: isActive ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-blue-400 flex-shrink-0 ml-4"
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>

      {/* Answer content */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-5 pt-0 text-gray-300 border-t border-gray-800/50">
              <p>{item.answer}</p>

              {/* Contacts list if available */}
              {item.contacts && (
                <div className="mt-4 space-y-3">
                  {item.contacts.map((contact, contactIndex) => (
                    <a
                      key={contactIndex}
                      href={contact.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors group"
                    >
                      <div className="text-blue-400 group-hover:text-blue-300 transition-colors">
                        {renderIcon(contact.iconType)}
                      </div>
                      <span className="text-gray-300 group-hover:text-white transition-colors">{contact.label}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default FAQ

