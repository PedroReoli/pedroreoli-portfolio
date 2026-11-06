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
    },
    { scope, dependencies: [reducedMotion] },
  )
}
