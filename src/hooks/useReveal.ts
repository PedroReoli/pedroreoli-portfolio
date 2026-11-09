import { useEffect, type RefObject } from 'react'

type RevealType = 'smoke' | 'slide-left' | 'slide-right' | 'card' | 'scale' | 'default'

function getAnimationKeyframes(type: RevealType): Keyframe[] {
  switch (type) {
    case 'smoke':
      return [
        { opacity: 0, transform: 'translate3d(0, 38px, 0)', filter: 'blur(16px)' },
        { opacity: 0.8, transform: 'translate3d(0, 8px, 0)', filter: 'blur(3px)', offset: 0.7 },
        { opacity: 1, transform: 'translate3d(0, 0, 0)', filter: 'blur(0px)' },
      ]
    case 'slide-left':
      return [
        { opacity: 0, transform: 'translate3d(48px, 0, 0)', filter: 'blur(10px)' },
        { opacity: 1, transform: 'translate3d(0, 0, 0)', filter: 'blur(0px)' },
      ]
    case 'slide-right':
      return [
        { opacity: 0, transform: 'translate3d(-48px, 0, 0)', filter: 'blur(10px)' },
        { opacity: 1, transform: 'translate3d(0, 0, 0)', filter: 'blur(0px)' },
      ]
    case 'card':
      return [
        { opacity: 0, transform: 'translate3d(0, 42px, 0) scale(0.95)', filter: 'blur(10px)' },
        { opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)', filter: 'blur(0px)' },
      ]
    case 'scale':
      return [
        { opacity: 0, transform: 'translate3d(0, 24px, 0) scale(0.92)', filter: 'blur(12px)' },
        { opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)', filter: 'blur(0px)' },
      ]
    default:
      return [
        { opacity: 0, transform: 'translate3d(0, 24px, 0)', filter: 'blur(8px)' },
        { opacity: 1, transform: 'translate3d(0, 0, 0)', filter: 'blur(0px)' },
      ]
  }
}

/**
 * Revelação fluida progressiva por IntersectionObserver e Web Animations API.
 * O conteúdo permanece 100% legível por padrão (sem inline style inicial ocultando texto).
 * A animação é estritamente decorativa e respeita integralmente prefers-reduced-motion.
 */
export function useReveal<T extends HTMLElement>(scope: RefObject<T | null>) {
  useEffect(() => {
    const root = scope.current
    if (!root || typeof window === 'undefined') return

    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (query.matches || typeof IntersectionObserver === 'undefined') return

    const nodes = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'))
    const animations = new Set<Animation>()

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || !(entry.target instanceof HTMLElement)) return
        const element = entry.target
        observer.unobserve(element)

        if (typeof element.animate !== 'function' || query.matches) return

        const type = (element.dataset.reveal || 'default') as RevealType
        const delayStr = element.dataset.revealDelay
        const delay = delayStr ? Math.max(0, parseInt(delayStr, 10)) : 0

        const keyframes = getAnimationKeyframes(type)
        const animation = element.animate(keyframes, {
          duration: type === 'smoke' ? 820 : 640,
          delay,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          fill: 'none',
        })

        animations.add(animation)
        animation.onfinish = () => {
          animations.delete(animation)
        }
      })
    }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' })

    nodes.forEach((node) => observer.observe(node))

    const stop = () => {
      if (query.matches) {
        animations.forEach((animation) => animation.cancel())
        animations.clear()
      }
    }

    query.addEventListener('change', stop)

    return () => {
      observer.disconnect()
      animations.forEach((animation) => animation.cancel())
      animations.clear()
      query.removeEventListener('change', stop)
    }
  }, [scope])
}
