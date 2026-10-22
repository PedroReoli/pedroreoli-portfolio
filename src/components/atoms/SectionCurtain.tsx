import React from "react"
import { m, useReducedMotion } from "framer-motion"

interface SectionCurtainProps {
  background?: string
  accent?: string
  duration?: number
  once?: boolean
}

export const SectionCurtain: React.FC<SectionCurtainProps> = ({
  background = "#111010",
  accent = "#82aaff",
  duration = 0.92,
  once = false,
}) => {
  const reduceMotion = Boolean(useReducedMotion())

  return (
    <m.div
      className="pointer-events-none absolute inset-0 z-40 will-change-transform"
      style={{ backgroundColor: background }}
      initial={reduceMotion ? { opacity: 1 } : { y: "0%" }}
      whileInView={reduceMotion ? { opacity: 0 } : { y: "-101%" }}
      viewport={{ once, amount: 0.08 }}
      transition={{
        duration: reduceMotion ? 0.28 : duration,
        ease: [0.76, 0, 0.24, 1],
      }}
      aria-hidden="true"
    >
      <span
        className="absolute inset-x-0 bottom-0 h-[3px] shadow-[0_0_24px_currentColor]"
        style={{ backgroundColor: accent, color: accent }}
      />
    </m.div>
  )
}

export default SectionCurtain
