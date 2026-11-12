import { useLayoutEffect, type RefObject } from 'react'

type DivRef = RefObject<HTMLDivElement | null>

export function useExperienceTimeline(trackRef: DivRef, pinRef: DivRef, viewportRef: DivRef) {
  useLayoutEffect(() => {
    const track = trackRef.current
    const pin = pinRef.current
    const viewport = viewportRef.current
    if (!track || !pin || !viewport || typeof ResizeObserver === 'undefined') return

    const canPin = window.matchMedia('(min-width: 900px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)')
    let distance = 0
    let pinned = false
    let frame = 0

    const updatePosition = () => {
      frame = 0
      if (!pinned) return
      const stickyTop = Number.parseFloat(getComputedStyle(pin).top)
      viewport.scrollLeft = Math.max(0, Math.min(distance, stickyTop - track.getBoundingClientRect().top))
    }
    const schedulePosition = () => {
      if (!frame) frame = window.requestAnimationFrame(updatePosition)
    }
    const measure = () => {
      distance = viewport.scrollWidth - viewport.clientWidth
      const headerHeight = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height'))
      pinned = canPin.matches && distance > 0 && pin.offsetHeight + headerHeight + 24 < window.innerHeight
      track.classList.toggle('experience-track--pinned', pinned)
      if (pinned) track.style.setProperty('--experience-track-height', `${pin.offsetHeight + distance}px`)
      else track.style.removeProperty('--experience-track-height')
      schedulePosition()
    }

    const observer = new ResizeObserver(measure)
    observer.observe(pin)
    observer.observe(viewport)
    canPin.addEventListener('change', measure)
    window.addEventListener('scroll', schedulePosition, { passive: true })
    window.addEventListener('resize', measure)
    measure()

    return () => {
      observer.disconnect()
      canPin.removeEventListener('change', measure)
      window.removeEventListener('scroll', schedulePosition)
      window.removeEventListener('resize', measure)
      window.cancelAnimationFrame(frame)
      track.classList.remove('experience-track--pinned')
      track.style.removeProperty('--experience-track-height')
    }
  }, [trackRef, pinRef, viewportRef])
}
