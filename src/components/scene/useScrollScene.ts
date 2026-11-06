import { useEffect, useRef } from 'react'
import { sceneClips } from '@/data/content'
import type { SceneClip } from '@/types/content'

/**
 * The page is one continuous scroll = one continuous take.
 *
 * Every clip owns a slice of the document: a clip goes from `from` to `to`, so it
 * covers the scroll that starts when `from` fills the viewport and ends when `to`
 * fills it. Inside its slice, scroll position 0 -> 1 is clip time 0 -> holdAt.
 * Scrolling down advances the take, scrolling up rewinds it, with no jumps because
 * a clip ends exactly where the next one begins.
 */
export interface SceneRange {
  clip: SceneClip
  start: number
  end: number
}

export interface SceneSample {
  /** Clip under the playhead, null before the first section seam. */
  clip: SceneClip | null
  /** Time inside that clip, already clamped by holdAt. */
  time: number
  /** Section currently filling the viewport. */
  section: string
  /** 0..1 position of the playhead inside the whole take. */
  progress: number
}

export function effectiveHold(clip: SceneClip): number {
  return Math.min(clip.holdAt, clip.duration)
}

/** Reads the document layout. Cheap enough to re-run on resize only. */
export function buildRanges(): SceneRange[] {
  if (typeof document === 'undefined') return []
  return sceneClips.clips
    .map((clip) => {
      const from = document.getElementById(clip.from)
      const to = document.getElementById(clip.to)
      if (!from || !to) return null
      // A clip that stays in place (experience-loop) is scrubbed across its own
      // height instead of a transition.
      const start = from.offsetTop
      const end = from === to ? start + from.offsetHeight : to.offsetTop
      return { clip, start, end: Math.max(end, start + 1) }
    })
    .filter((range): range is SceneRange => range !== null)
}

export function sectionAt(sectionIds: readonly string[], y: number): string {
  let current = sectionIds[0] ?? 'hero'
  for (const id of sectionIds) {
    const el = document.getElementById(id)
    if (!el) continue
    if (y >= el.offsetTop) current = id
  }
  return current
}

/** Pure mapping from a scroll offset to the frame that offset represents. */
export function sampleScene(ranges: SceneRange[], sectionIds: readonly string[], y: number): SceneSample {
  const section = sectionAt(sectionIds, y)
  if (ranges.length === 0) return { clip: null, time: 0, section, progress: 0 }

  const first = ranges[0]
  const last = ranges[ranges.length - 1]
  const span = Math.max(1, last.end - first.start)
  const progress = Math.min(1, Math.max(0, (y - first.start) / span))

  if (y < first.start) return { clip: null, time: 0, section, progress }

  for (const range of ranges) {
    if (y < range.end) {
      const local = (y - range.start) / (range.end - range.start)
      const time = Math.min(1, Math.max(0, local)) * effectiveHold(range.clip)
      return { clip: range.clip, time, section, progress }
    }
  }

  return { clip: last.clip, time: effectiveHold(last.clip), section, progress }
}

/**
 * Wires the scroll to the scene. Playback stays paused forever: `onSample` receives the
 * frame that the scroll asks for, and the component eases the <video> toward it.
 * With `frozen` the take stops following the scroll and holds the first frame, so
 * nothing on screen moves for people who asked for less motion.
 */
export function useScrollScene(
  sectionIds: readonly string[],
  options: { enabled: boolean; frozen?: boolean; onSample: (sample: SceneSample) => void },
) {
  const { enabled, frozen = false, onSample } = options
  const sampleRef = useRef(onSample)

  useEffect(() => {
    sampleRef.current = onSample
  }, [onSample])

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return

    const ranges = buildRanges()
    let frame = 0

    const emit = () => {
      frame = 0
      const y = frozen ? ranges[0]?.start ?? 0 : window.scrollY
      sampleRef.current(sampleScene(ranges, sectionIds, y))
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(emit)
    }

    const onResize = () => {
      // Ranges are rebuilt lazily: same sections, new document height.
      ranges.splice(0, ranges.length, ...buildRanges())
      onScroll()
    }

    emit()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    // Sections mount their content after the first paint; re-measure once laid out.
    const remeasure = window.setTimeout(onResize, 400)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      window.clearTimeout(remeasure)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [enabled, frozen, sectionIds])
}
