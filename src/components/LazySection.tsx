"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface LazySectionProps {
  children: ReactNode
  parallaxFactor?: number
}

const LazySection = ({ children, parallaxFactor = 0.2 }: LazySectionProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [opacity, setOpacity] = useState(0.6)

  // Substituindo useScroll por um listener de scroll nativo
  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const elementHeight = rect.height

        // Calcula a posição relativa do elemento na tela
        const elementTop = rect.top
        const elementBottom = rect.bottom

        // Calcula o progresso do scroll (0 quando o topo do elemento está no fundo da tela,
        // 1 quando o fundo do elemento está no topo da tela)
        const scrollProgress = 1 - (elementTop + elementHeight) / (windowHeight + elementHeight)
        setScrollPosition(scrollProgress)

        // Calcula a opacidade baseada na posição do elemento
        let newOpacity = 1
        if (scrollProgress < 0.2) {
          newOpacity = 0.6 + (scrollProgress / 0.2) * 0.4
        } else if (scrollProgress > 0.8) {
          newOpacity = 1 - ((scrollProgress - 0.8) / 0.2) * 0.4
        }

        setOpacity(newOpacity)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Inicializa com a posição atual

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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

  // Calcula o valor de y baseado na posição de scroll
  const y = (scrollPosition - 0.5) * 200 * parallaxFactor

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

