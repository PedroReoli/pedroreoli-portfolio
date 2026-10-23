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
  axis?: "x" | "y"
  once?: boolean
  role?: React.AriaRole
  ariaLabel?: string
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  className,
  delay = 0,
  distance = 40,
  duration = 0.72,
  amount = 0.2,
  axis = "y",
  once = true,
  role,
  ariaLabel,
}) => {
  const reduceMotion = useReducedMotion()
  const sectionVisible = useContext(SlideEntranceContext)
  const [hasFocus, setHasFocus] = useState(false)
  const hidden = { opacity: 0, x: axis === "x" ? distance : 0, y: axis === "y" ? distance : 0 }
  const visible = { opacity: 1, x: 0, y: 0 }
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
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </m.div>
  )
}

export default Reveal
