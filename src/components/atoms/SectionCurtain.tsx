import React, { useRef } from "react"
import { m, useInView, useReducedMotion } from "framer-motion"

type CurtainVariant = "up" | "left" | "right" | "split"

interface SectionCurtainProps {
  background?: string
  accent?: string
  duration?: number
  once?: boolean
  variant?: CurtainVariant
}

export const SectionCurtain: React.FC<SectionCurtainProps> = ({
  background = "#111010",
  accent = "#82aaff",
  duration = 0.92,
  once = false,
  variant = "up",
}) => {
  const reduceMotion = Boolean(useReducedMotion())
  const observerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(observerRef, { once, amount: 0.08 })

  const transition = {
    duration: reduceMotion ? 0.24 : duration,
    ease: [0.76, 0, 0.24, 1] as const,
  }

  if (variant === "split" && !reduceMotion) {
    return (
      <div
        ref={observerRef}
        className="pointer-events-none absolute inset-0 z-40"
        aria-hidden="true"
      >
        <m.div
          className="absolute inset-y-0 left-0 w-1/2 will-change-transform"
          style={{ backgroundColor: background }}
          initial={false}
          animate={{ x: isInView ? "-101%" : "0%" }}
          transition={transition}
        >
          <span className="absolute inset-y-0 right-0 w-px" style={{ backgroundColor: accent }} />
        </m.div>
        <m.div
          className="absolute inset-y-0 right-0 w-1/2 will-change-transform"
          style={{ backgroundColor: background }}
          initial={false}
          animate={{ x: isInView ? "101%" : "0%" }}
          transition={transition}
        >
          <span className="absolute inset-y-0 left-0 w-px" style={{ backgroundColor: accent }} />
        </m.div>
      </div>
    )
  }

  const hiddenPosition = { x: "0%", y: "0%" }
  const visiblePosition =
    variant === "left"
      ? { x: "-101%", y: "0%" }
      : variant === "right"
      ? { x: "101%", y: "0%" }
      : { x: "0%", y: "-101%" }

  return (
    <div ref={observerRef} className="pointer-events-none absolute inset-0 z-40" aria-hidden="true">
      <m.div
        className="absolute inset-0 will-change-transform"
        style={{ backgroundColor: background }}
        initial={false}
        animate={
          reduceMotion ? { opacity: isInView ? 0 : 1 } : isInView ? visiblePosition : hiddenPosition
        }
        transition={transition}
      >
        <span
          className={`absolute bg-current shadow-[0_0_24px_currentColor] ${
            variant === "up" || variant === "split"
              ? "inset-x-0 bottom-0 h-[2px]"
              : "inset-y-0 w-[2px]"
          } ${variant === "left" ? "right-0" : variant === "right" ? "left-0" : ""}`}
          style={{ color: accent }}
        />
      </m.div>
    </div>
  )
}

export default SectionCurtain
