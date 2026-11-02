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
      const elements = gsap.utils.toArray<HTMLElement>('[data-reveal]')
      if (reducedMotion) {
        gsap.set(elements, { opacity: 1, y: 0 })
        return
      }

      elements.forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 42 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 88%',
              once: true,
            },
          },
        )
      })
    },
    { scope, dependencies: [reducedMotion] },
  )
}
