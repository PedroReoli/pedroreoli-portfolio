import { useLayoutEffect, type RefObject } from 'react'
import { animate } from 'motion/mini'

export function useReveal<T extends HTMLElement>(scope: RefObject<T | null>) {
  useLayoutEffect(() => {
    const root = scope.current
    if (!root || typeof IntersectionObserver === 'undefined' || typeof Element.prototype.animate !== 'function') return

    const nodes = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'))
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (preference.matches) return

    const animations = new Map<Element, ReturnType<typeof animate>>()
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting || !(entry.target instanceof HTMLElement)) continue
        const node = entry.target
        show(node)
        const delay = Math.max(0, Number(node.dataset.revealDelay) || 0)
        const animation = animate(node, { opacity: [0, 1], translate: ['0 22px', '0 0'] }, {
          duration: .46,
          delay: delay / 1000,
          ease: [.2, .65, .25, 1],
        })
        animations.set(node, animation)
        void animation.then(() => {
          node.style.removeProperty('opacity')
          node.style.removeProperty('translate')
          animations.delete(node)
        })
      }
    })

    function show(node: Element) {
      node.classList.remove('is-reveal-observed')
      observer.unobserve(node)
    }

    function revealFocused(event: FocusEvent) {
      const node = event.target instanceof Element && event.target.closest('[data-reveal]')
      if (node && root?.contains(node)) {
        animations.get(node)?.cancel()
        animations.delete(node)
        show(node)
      }
    }

    function revealWithoutMotion() {
      if (!preference.matches) return
      observer.disconnect()
      animations.forEach(animation => animation.cancel())
      animations.clear()
      nodes.forEach(node => node.classList.remove('is-reveal-observed'))
    }

    for (const node of nodes) {
      node.classList.add('is-reveal-observed')
      observer.observe(node)
    }
    root.addEventListener('focusin', revealFocused)
    preference.addEventListener('change', revealWithoutMotion)

    return () => {
      observer.disconnect()
      root.removeEventListener('focusin', revealFocused)
      preference.removeEventListener('change', revealWithoutMotion)
      animations.forEach(animation => animation.cancel())
      nodes.forEach(node => node.classList.remove('is-reveal-observed'))
    }
  }, [scope])
}
