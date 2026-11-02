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

      ScrollTrigger.batch(elements, {
        start: 'top 90%',
        once: true,
        onEnter: (batch) => gsap.fromTo(batch, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: .68, stagger: .07, ease: 'power3.out', overwrite: true }),
      })
    },
    { scope, dependencies: [reducedMotion] },
  )
}
