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

const entranceEase = [0.16, 1, 0.3, 1] as const

export const Reveal: React.FC<RevealProps> = ({
  children,
  className,
  delay = 0,
  distance = 24,
  duration = 0.64,
  amount = 0.08,
  scale = 1,
  axis = "y",
  once = false,
  role,
  ariaLabel,
}) => {
  const reduceMotion = useReducedMotion()
  const sectionVisible = useContext(SlideEntranceContext)
  const [hasFocus, setHasFocus] = useState(false)
  const hidden = {
    opacity: 0,
    x: axis === "x" ? distance : 0,
    y: axis === "y" ? distance * (sectionVisible === null ? 1 : 2) : 0,
    scale,
  }
  const visible = { opacity: 1, x: 0, y: 0, scale: 1 }
  const showImmediately = Boolean(reduceMotion || hasFocus)

  return (
    <m.div
      className={className}
      role={role}
      aria-label={ariaLabel}
      initial={reduceMotion ? false : hidden}
      animate={
        showImmediately || sectionVisible === true
          ? visible
          : sectionVisible === false
          ? hidden
          : undefined
      }
      whileInView={sectionVisible === null && !showImmediately ? visible : undefined}
      viewport={{ once, amount }}
      onFocusCapture={() => setHasFocus(true)}
      transition={{
        duration: showImmediately ? 0 : duration,
        delay: showImmediately ? 0 : delay,
        ease: entranceEase,
      }}
    >
      {children}
    </m.div>
  )
}

export default Reveal
