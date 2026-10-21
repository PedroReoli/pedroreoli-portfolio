import React from "react"
import { m, useReducedMotion } from "framer-motion"

interface RevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  distance?: number
  role?: React.AriaRole
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  className,
  delay = 0,
  distance = 36,
  role,
}) => {
  const reduceMotion = useReducedMotion()

  return (
    <m.div
      className={className}
      role={role}
      initial={reduceMotion ? false : { opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </m.div>
  )
}

export default Reveal
