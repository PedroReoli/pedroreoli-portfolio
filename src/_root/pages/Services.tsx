"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { servicesData } from "@/constants/ServicesData"
import { FaPalette, FaCode, FaGraduationCap } from "react-icons/fa"

const Services = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section className="relative min-h-screen py-16 md:py-24 bg-transparent">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center text-blue-500 mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Serviços<span className="text-white">;</span>
        </motion.h2>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface ServiceCardProps {
  service: {
    title: string
    description: string
    iconType: "design" | "code" | "education"
  }
  index: number
  isInView: boolean
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index, isInView }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.2 + 0.1 * index,
        duration: 0.5,
        type: "spring",
        stiffness: 200,
      },
    },
  }

  // Render the appropriate icon based on the iconType
  const renderIcon = () => {
    switch (service.iconType) {
      case "design":
        return <FaPalette size={40} className="text-blue-500" />
      case "code":
        return <FaCode size={40} className="text-blue-500" />
      case "education":
        return <FaGraduationCap size={40} className="text-blue-500" />
      default:
        return null
    }
  }

  return (
    <motion.div
      className="bg-gray-900/40 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg shadow-blue-500/5 hover:shadow-blue-500/10 transition-all duration-300"
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={index}
      whileHover={{ y: -5 }}
    >
      <div className="p-8 h-full flex flex-col items-center text-center">
        {/* Centered Icon */}
        <motion.div
          className="mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-blue-500/10"
          variants={iconVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {renderIcon()}
        </motion.div>

        <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>

        <p className="text-gray-300">{service.description}</p>
      </div>
    </motion.div>
  )
}

export default Services

