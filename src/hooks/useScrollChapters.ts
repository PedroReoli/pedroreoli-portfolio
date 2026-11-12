import { useLayoutEffect, type RefObject } from 'react'
import { animate } from 'motion/mini'

type DivRef = RefObject<HTMLDivElement | null>

export function useScrollChapters(trackRef: DivRef, pinRef: DivRef, viewportRef: DivRef, scrollPerChapter?: number) {
  useLayoutEffect(() => {
    const track = trackRef.current
    const pin = pinRef.current
    const viewport = viewportRef.current
    if (!track || !pin || !viewport || typeof ResizeObserver === 'undefined' || typeof Element.prototype.animate !== 'function') return

    const cards = [...viewport.querySelectorAll<HTMLElement>('[data-scroll-chapter]')]
    const markers = [...track.querySelectorAll<HTMLElement>('[data-scroll-chapter-marker]')]
    if (cards.length < 2) return
    const motionPreference = window.matchMedia('(prefers-reduced-motion: no-preference)')
    let distance = 0
    let pinned = false
    let stickyTop = 0
    let frame = 0
    let current = -1
    const animations = new Map<HTMLElement, ReturnType<typeof animate>>()

    function clearStyles(card: HTMLElement) {
      card.style.removeProperty('opacity')
      card.style.removeProperty('translate')
    }

    function stopTransitions() {
      for (const [card, animation] of animations) {
        animation.cancel()
        clearStyles(card)
      }
      animations.clear()
    }

    function transition(card: HTMLElement, opacity: number[], translate: string[], duration: number) {
      const animation = animate(card, { opacity, translate }, { duration, ease: [.22, .65, .28, 1] })
      animations.set(card, animation)
      void animation.then(() => {
        if (animations.get(card) !== animation) return
        clearStyles(card)
        animations.delete(card)
      })
    }

    function selectCard(index: number, withTransition: boolean) {
      if (current === index) return
      stopTransitions()
      const outgoing = cards[current]
      const incoming = cards[index]
      outgoing?.removeAttribute('data-current')
      if (outgoing) outgoing.inert = true
      markers[current]?.removeAttribute('data-current')
      incoming.setAttribute('data-current', '')
      incoming.inert = false
      markers[index]?.setAttribute('data-current', '')

      if (outgoing && withTransition) {
        const direction = index > current ? 1 : -1
        transition(outgoing, [1, 0], ['0 0', `${-direction * 14}% 0`], .28)
        transition(incoming, [0, 1], [`${direction * 16}% 0`, '0 0'], .42)
      }
      current = index
    }

    const updatePosition = (withTransition = true) => {
      frame = 0
      if (!pinned) return
      const progress = Math.max(0, Math.min(1, (stickyTop - track.getBoundingClientRect().top) / distance))
      selectCard(Math.round(progress * (cards.length - 1)), withTransition)
    }
    const schedulePosition = () => {
      if (!frame) frame = window.requestAnimationFrame(() => updatePosition())
    }
    const measure = () => {
      track.classList.toggle('scroll-chapters--pinned', motionPreference.matches)
      const scrollPerCard = scrollPerChapter ?? Math.min(520, Math.max(260, viewport.clientWidth * .45))
      distance = scrollPerCard * (cards.length - 1)
      stickyTop = Number.parseFloat(getComputedStyle(pin).top)
      pinned = motionPreference.matches && pin.offsetHeight + stickyTop + 8 <= window.innerHeight
      track.classList.toggle('scroll-chapters--pinned', pinned)
      if (pinned) {
        track.style.setProperty('--scroll-chapters-height', `${pin.offsetHeight + distance}px`)
        window.cancelAnimationFrame(frame)
        updatePosition(false)
        cards.forEach((card, index) => { card.inert = index !== current })
      } else {
        stopTransitions()
        cards.forEach(card => { card.inert = false })
        track.style.removeProperty('--scroll-chapters-height')
      }
    }

    const observer = new ResizeObserver(measure)
    observer.observe(pin)
    observer.observe(viewport)
    motionPreference.addEventListener('change', measure)
    window.addEventListener('scroll', schedulePosition, { passive: true })
    window.addEventListener('resize', measure)
    measure()

    return () => {
      observer.disconnect()
      motionPreference.removeEventListener('change', measure)
      window.removeEventListener('scroll', schedulePosition)
      window.removeEventListener('resize', measure)
      window.cancelAnimationFrame(frame)
      stopTransitions()
      cards.forEach(card => { card.inert = false })
      cards[current]?.removeAttribute('data-current')
      markers[current]?.removeAttribute('data-current')
      track.classList.remove('scroll-chapters--pinned')
      track.style.removeProperty('--scroll-chapters-height')
    }
  }, [trackRef, pinRef, viewportRef, scrollPerChapter])
}
