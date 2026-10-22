import React from "react"
import { m, useReducedMotion } from "framer-motion"

interface RevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  distance?: number
  duration?: number
  amount?: number
  axis?: "x" | "y"
  role?: React.AriaRole
  ariaLabel?: string
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  className,
  delay = 0,
  distance = 28,
  duration = 0.62,
  amount = 0.2,
  axis = "y",
  role,
  ariaLabel,
}) => {
  const reduceMotion = useReducedMotion()
  const hidden = reduceMotion
    ? { opacity: 0 }
    : axis === "x"
    ? { opacity: 0, x: distance }
    : { opacity: 0, y: distance }
  const visible = axis === "x" ? { opacity: 1, x: 0 } : { opacity: 1, y: 0 }

  return (
    <m.div
      className={className}
      role={role}
      aria-label={ariaLabel}
      initial={hidden}
      whileInView={visible}
      viewport={{ once: false, amount, margin: "-6% 0px -6% 0px" }}
      transition={{
        duration: reduceMotion ? 0.2 : duration,
        delay: reduceMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </m.div>
  )
}

export default Reveal
