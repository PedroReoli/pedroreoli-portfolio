import React, { useContext, useState } from "react"
import { m } from "framer-motion"
import { useReducedMotion } from "../../hooks/useReducedMotion"
import { SlideEntranceContext } from "./slideEntranceContext"

interface RevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  distance?: number
  duration?: number
  amount?: number
  scale?: number
  axis?: "x" | "y"
  once?: boolean
  role?: React.AriaRole
  ariaLabel?: string
}

const entranceEase = [0.22, 1, 0.36, 1] as const

export const Reveal: React.FC<RevealProps> = ({
  children,
  className,
  delay = 0,
  distance = 16,
  duration = 0.36,
  amount = 0.05,
  scale = 1,
  axis = "y",
  once = true,
  role,
  ariaLabel,
}) => {
  const reduceMotion = useReducedMotion()
  const sectionVisible = useContext(SlideEntranceContext)
  const [hasFocus, setHasFocus] = useState(false)
  const [hasEntered, setHasEntered] = useState(false)

  const hidden = {
    opacity: 0,
    x: axis === "x" ? distance : 0,
    y: axis === "y" ? distance : 0,
    scale: scale * 0.98,
  }
  const visible = { opacity: 1, x: 0, y: 0, scale: 1 }
  const isVisible = Boolean(reduceMotion || hasFocus || hasEntered || sectionVisible === true)

  return (
    <m.div
      className={className}
      role={role}
      aria-label={ariaLabel}
      initial={reduceMotion ? false : hidden}
      animate={isVisible ? visible : hidden}
      whileInView={!isVisible ? visible : undefined}
      viewport={{ once, amount }}
      onViewportEnter={() => setHasEntered(true)}
      onFocusCapture={() => setHasFocus(true)}
      transition={{
        duration: reduceMotion ? 0 : Math.min(0.38, duration),
        delay: reduceMotion ? 0 : delay * 0.6,
        ease: entranceEase,
      }}
    >
      {children}
    </m.div>
  )
}

export default Reveal
