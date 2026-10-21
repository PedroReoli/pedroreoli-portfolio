import React from "react"
import { m, useReducedMotion } from "framer-motion"

export const TransitionEffect: React.FC = () => {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) return null

  return (
    <m.div
      className="pointer-events-none fixed inset-0 z-[100] origin-top bg-[#82aaff]"
      initial={{ scaleY: 1 }}
      animate={{ scaleY: 0 }}
      transition={{ duration: 0.48, ease: [0.76, 0, 0.24, 1] }}
      aria-hidden="true"
    />
  )
}

export default TransitionEffect
