import { useEffect, type RefObject } from 'react'

/** Conteúdo fica legível sem JS/observer; a entrada decora, nunca libera leitura. */
export function useReveal<T extends HTMLElement>(scope: RefObject<T | null>) {
  useEffect(() => {
    const root = scope.current
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!root || query.matches || typeof IntersectionObserver === 'undefined') return
    const nodes = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'))
    const animations = new Set<Animation>()
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting || !(entry.target instanceof HTMLElement)) return
        const element = entry.target
        observer.unobserve(element)
        if (typeof element.animate !== 'function' || query.matches) return
        const animation = element.animate(
          [{ transform: 'translateY(12px)' }, { transform: 'translateY(0)' }],
          { duration: 480, easing: 'cubic-bezier(.2,.7,.2,1)' },
        )
        animations.add(animation)
        animation.onfinish = () => animations.delete(animation)
      })
    }, { threshold: 0.08 })
    nodes.forEach(node => observer.observe(node))
    const stop = () => { if (query.matches) animations.forEach(animation => animation.cancel()) }
    query.addEventListener('change', stop)
    return () => {
      observer.disconnect()
      animations.forEach(animation => animation.cancel())
      query.removeEventListener('change', stop)
    }
  }, [scope])
}
