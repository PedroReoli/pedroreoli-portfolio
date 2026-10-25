import { useEffect, useRef, type ReactNode } from "react"
import { m, useIsPresent } from "framer-motion"
import { useReducedMotion } from "../../hooks/useReducedMotion"
import { filmEase } from "../../motion/choreography"

export default function PageTransition({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion()
  const present = useIsPresent()
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (ref.current) ref.current.inert = !present
  }, [present])

  return (
    <m.div
      ref={ref}
      className="route-scene"
      data-page-state={present ? "present" : "exiting"}
      aria-hidden={!present || undefined}
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
      transition={{ duration: reduceMotion ? 0 : present ? 0.36 : 0.14, ease: filmEase }}
    >
      {children}
    </m.div>
  )
}
