import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { RefObject } from 'react'
import { useReducedMotion } from './useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export function useReveal<T extends HTMLElement>(scope: RefObject<T | null>) {
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (!scope.current) return
      const elements = gsap.utils.toArray<HTMLElement>('[data-reveal]', scope.current)

      if (reducedMotion) {
        gsap.set(elements, { opacity: 1, y: 0, clearProps: 'all' })
        return
      }

      // Initial clean state to avoid FOUC without layout shift
      gsap.set(elements, { opacity: 0, y: 24 })

      ScrollTrigger.batch(elements, {
        start: 'top 85%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.62,
            stagger: 0.1,
            ease: 'power3.out',
            overwrite: 'auto',
          }),
      })

      ScrollTrigger.refresh()

      // Safety net: arriving by anchor, reload or deep link used to leave whole
      // blocks at opacity 0, which reads as a black screen with empty panels.
      // Anything already on screen gets its final state after a moment.
      const safety = window.setTimeout(() => {
        elements.forEach((el) => {
          if (Number.parseFloat(getComputedStyle(el).opacity) > 0.01) return
          const rect = el.getBoundingClientRect()
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            gsap.to(el, { opacity: 1, y: 0, duration: 0.4, overwrite: 'auto' })
          }
        })
      }, 1200)

      return () => window.clearTimeout(safety)
    },
    { scope, dependencies: [reducedMotion] },
  )
}
