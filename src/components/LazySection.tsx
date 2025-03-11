"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion" // Removido useScroll e useTransform
import type { ReactNode } from "react"

interface LazySectionProps {
  children: ReactNode
  parallaxFactor?: number
}

const LazySection = ({ children, parallaxFactor = 0.2 }: LazySectionProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)

  // Substituindo useScroll por um listener de scroll nativo
  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        const scrollProgress = 1 - (rect.top + rect.height) / (window.innerHeight + rect.height)
        setScrollPosition(scrollProgress)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Inicializa com a posição atual

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Calculando os valores de y e opacity manualmente
  const y = scrollPosition * 100 * parallaxFactor - 100 * parallaxFactor
  const opacity =
    scrollPosition < 0.2
      ? 0.6 + (scrollPosition / 0.2) * 0.4
      : scrollPosition > 0.8
        ? 1 - ((scrollPosition - 0.8) / 0.2) * 0.4
        : 1

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: "200px 0px",
        threshold: 0.01,
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <motion.div
      ref={ref}
      style={{
        y,
        opacity,
        position: "relative",
        zIndex: 10,
      }}
      className="relative"
    >
      {isVisible && children}
    </motion.div>
  )
}

export default LazySection

