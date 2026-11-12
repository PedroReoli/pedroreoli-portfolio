import { useLayoutEffect, type RefObject } from 'react'

type DivRef = RefObject<HTMLDivElement | null>

export function useExperienceTimeline(trackRef: DivRef, pinRef: DivRef, viewportRef: DivRef) {
  useLayoutEffect(() => {
    const track = trackRef.current
    const pin = pinRef.current
    const viewport = viewportRef.current
    if (!track || !pin || !viewport || typeof ResizeObserver === 'undefined') return

    const motionPreference = window.matchMedia('(prefers-reduced-motion: no-preference)')
    let distance = 0
    let pinned = false
    let stickyTop = 0
    let frame = 0

    const updatePosition = () => {
      frame = 0
      if (!pinned) return
      viewport.scrollLeft = Math.max(0, Math.min(distance, stickyTop - track.getBoundingClientRect().top))
    }
    const schedulePosition = () => {
      if (!frame) frame = window.requestAnimationFrame(updatePosition)
    }
    const measure = () => {
      track.classList.toggle('experience-track--pinned', motionPreference.matches)
      distance = viewport.scrollWidth - viewport.clientWidth
      stickyTop = Number.parseFloat(getComputedStyle(pin).top)
      pinned = motionPreference.matches && distance > 0 && pin.offsetHeight + stickyTop + 8 <= window.innerHeight
      track.classList.toggle('experience-track--pinned', pinned)
      if (pinned) {
        track.style.setProperty('--experience-track-height', `${pin.offsetHeight + distance}px`)
      } else {
        viewport.scrollLeft = 0
        track.style.removeProperty('--experience-track-height')
      }
      schedulePosition()
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
      track.classList.remove('experience-track--pinned')
      track.style.removeProperty('--experience-track-height')
    }
  }, [trackRef, pinRef, viewportRef])
}
