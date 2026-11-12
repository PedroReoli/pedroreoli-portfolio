import { useLayoutEffect, type RefObject } from 'react'

export function useReveal<T extends HTMLElement>(scope: RefObject<T | null>) {
  useLayoutEffect(() => {
    const root = scope.current
    if (!root || typeof IntersectionObserver === 'undefined') return

    const nodes = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'))
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) reveal(entry.target)
      }
    })

    function reveal(node: Element) {
      node.classList.add('is-revealed')
      observer.unobserve(node)
    }

    function revealFocused(event: FocusEvent) {
      const node = event.target instanceof Element && event.target.closest('[data-reveal]')
      if (node && root?.contains(node)) {
        node.classList.add('is-revealed-immediately')
        reveal(node)
      }
    }

    for (const node of nodes) {
      const delay = Number(node.dataset.revealDelay)
      if (Number.isFinite(delay) && delay > 0) {
        node.style.setProperty('--reveal-delay', `${delay}ms`)
      }
      node.classList.add('is-reveal-observed')
      observer.observe(node)
    }
    root.addEventListener('focusin', revealFocused)

    return () => {
      observer.disconnect()
      root.removeEventListener('focusin', revealFocused)
      for (const node of nodes) {
        node.classList.remove('is-reveal-observed', 'is-revealed', 'is-revealed-immediately')
        node.style.removeProperty('--reveal-delay')
      }
    }
  }, [scope])
}
