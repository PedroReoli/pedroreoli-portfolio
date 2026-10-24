import React, { useRef, useState } from "react"
import { useInView } from "framer-motion"
import { useReducedMotion } from "../../hooks/useReducedMotion"
import { SlideEntranceContext } from "./slideEntranceContext"

type SlideSectionProps = React.HTMLAttributes<HTMLElement> & {
  as?: "section" | "div" | "footer"
  amount?: number | "some" | "all"
}

/** Observa a seção imóvel para que os filhos não alterem o próprio gatilho. */
export default function SlideSection({
  as = "section",
  amount = 0.06,
  children,
  ...props
}: SlideSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { amount, once: true })
  const reduceMotion = useReducedMotion()
  const [hasFocus, setHasFocus] = useState(false)

  return React.createElement(
    as,
    {
      ...props,
      ref,
      onFocusCapture: (event: React.FocusEvent<HTMLElement>) => {
        setHasFocus(true)
        props.onFocusCapture?.(event)
      },
    },
    <SlideEntranceContext.Provider value={Boolean(reduceMotion || inView || hasFocus)}>
      {children}
    </SlideEntranceContext.Provider>,
  )
}
