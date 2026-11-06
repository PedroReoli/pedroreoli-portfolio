import { useEffect, useRef } from 'react'
import { sceneClips } from '@/data/content'
import type { SceneClip } from '@/types/content'

/**
 * One scroll = one frame.
 *
 * The page is a film strip: each section is a sticky slide pinned to the viewport,
 * and the scroll between two anchors is one "gate". Advancing the scroll by
 * `STEP_PX` moves exactly one frame of the clip that belongs to that gate, so a
 * notched wheel step or a touch flick lands on a whole frame instead of a float.
 * Scrolling back rewinds the very same frames, because the frame is a function of
 * the scroll offset only — nothing eases, nothing drifts, no parallax.
 */
export const STEP_PX = 120

/** 24fps source: one frame of the clip is 1/24s of its hold. */
const FPS = 24

export function effectiveHold(clip: SceneClip): number {
  return Math.min(clip.holdAt, clip.duration)
}

export interface Gate {
  clip: SceneClip
  /** Frame count for this gate, at least 1. */
  steps: number
  /** Scroll distance covered by the gate. */
  span: number
}

export interface FrameState {
  clip: SceneClip | null
  /** Whole frame number inside the clip. */
  frame: number
  /** Time in seconds for that frame. */
  time: number
  /** 0..1 position of the playhead across the whole take. */
  progress: number
}

export interface SceneAnchor {
  clip: SceneClip
  y: number
}

/**
 * Reads the sticky track from the DOM. Each `.film-slide` reports the scroll offset
 * at which its sticky frame is pinned; the offset of the next slide closes the gate.
 */
export function measureAnchors(): SceneAnchor[] {
  if (typeof document === 'undefined') return []
  const slides = Array.from(document.querySelectorAll<HTMLElement>('[data-film-slide]'))
  const trackTop = (document.querySelector<HTMLElement>('.film-track')?.offsetTop) ?? 0
  const anchors: SceneAnchor[] = []
  slides.forEach((slide) => {
    const id = slide.dataset.clip
    const clip = sceneClips.clips.find((c) => c.id === id)
    if (!clip) return
    // `offsetTop` de um elemento sticky colapsa para 0 quando ele já gruda, então a
    // posição na fita vem da soma com o offsetParent (os slides têm o mesmo pai).
    const parentTop = slide.offsetParent instanceof HTMLElement ? slide.offsetParent.offsetTop : 0
    const y = Math.max(0, slides.indexOf(slide) * window.innerHeight + trackTop + parentTop)
    anchors.push({ clip, y })
  })
  return anchors
}

export function buildGates(anchors: SceneAnchor[]): Gate[] {
  return anchors.map((anchor, index) => {
    const next = anchors[index + 1]
    const span = Math.max(STEP_PX, (next ? next.y : anchor.y + window.innerHeight) - anchor.y)
    const hold = effectiveHold(anchor.clip)
    // A gate never shows more frames than it has scroll room for, and never fewer
    // than the clip's own frame count so the whole clip is reachable.
    const clipFrames = Math.max(1, Math.round(hold * FPS))
    const steps = Math.max(1, Math.min(clipFrames, Math.round(span / STEP_PX)))
    return { clip: anchor.clip, steps, span }
  })
}

/** Pure: scroll offset -> the exact frame that offset represents. */
export function frameAt(gates: Gate[], y: number): FrameState {
  if (gates.length === 0) return { clip: null, frame: 0, time: 0, progress: 0 }

  const total = gates.reduce((sum, g) => sum + g.span, 0)
  const progress = Math.min(1, Math.max(0, y / Math.max(1, total)))

  let offset = 0
  for (const gate of gates) {
    const end = offset + gate.span
    if (y < end) {
      const local = Math.max(0, y - offset)
      const frame = Math.min(gate.steps, Math.floor(local / (gate.span / gate.steps)))
      const hold = effectiveHold(gate.clip)
      return { clip: gate.clip, frame, time: (frame / gate.steps) * hold, progress }
    }
    offset = end
  }

  const last = gates[gates.length - 1]
  const hold = effectiveHold(last.clip)
  return { clip: last.clip, frame: last.steps, time: hold, progress }
}

/**
 * Binds the scroll to the frame. There is no easing loop: the frame is written once
 * per scroll event, inside the same animation frame, so the picture never trails
 * behind the gesture.
 */
export function useFrameScroll(
  onFrame: (state: FrameState) => void,
  clipIndex: number,
) {
  const handlerRef = useRef(onFrame)

  useEffect(() => {
    handlerRef.current = onFrame
  }, [onFrame])

  useEffect(() => {
    if (typeof window === 'undefined') return

    // One screen of scroll belongs to this slide: the frames are spread across
    // that single viewport of scroll, so a step of STEP_PX is a step of frames.
    const clip = sceneClips.clips[clipIndex]
    if (!clip) return
    const gates = buildGates([{ clip, y: 0 }])

    const write = () => {
      const local = window.scrollY - clipIndex * window.innerHeight
      handlerRef.current(frameAt(gates, local))
    }

    const remeasure = () => write()

    write()
    window.addEventListener('scroll', write, { passive: true })
    window.addEventListener('resize', remeasure)
    const late = window.setTimeout(remeasure, 300)

    return () => {
      window.removeEventListener('scroll', write)
      window.removeEventListener('resize', remeasure)
      window.clearTimeout(late)
    }
  }, [clipIndex])
}
