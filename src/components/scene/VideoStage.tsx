import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { sceneClips } from '@/data/content'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { SceneClip } from '@/types/content'
import { useScrollScene, type SceneSample } from './useScrollScene'

const SECTION_IDS = [
  'hero',
  'sobre',
  'projetos-selecionados',
  'stack',
  'proposito',
  'experiencia',
] as const

const DEFAULT_FALLBACK_POSTER = '/images/pedro-bust-cyber.jpg'

/** How fast the frame chases the scroll target (per 60fps frame). */
const EASE = 0.2

export function VideoStage() {
  const reducedMotion = useReducedMotion()
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(max-width: 768px)').matches
  })
  const [saveData, setSaveData] = useState<boolean>(() => {
    if (typeof navigator === 'undefined') return false
    const conn = (navigator as unknown as { connection?: { saveData?: boolean } }).connection
    return Boolean(conn?.saveData)
  })
  const [failedClips, setFailedClips] = useState<string[]>([])
  const [section, setSection] = useState<string>('hero')
  const [activeClipId, setActiveClipId] = useState<string | null>(null)
  const [posterFallbackActive, setPosterFallbackActive] = useState<boolean>(false)
  const [showPedroPhoto, setShowPedroPhoto] = useState<boolean>(false)

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const photoRef = useRef(false)
  const targetTimeRef = useRef(0)
  // The element we write the frame to: whichever <video> we just mounted.
  const loadedRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mql = window.matchMedia('(max-width: 768px)')
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (typeof navigator === 'undefined') return
    const nav = navigator as unknown as {
      connection?: {
        saveData?: boolean
        addEventListener?: (type: string, listener: () => void) => void
        removeEventListener?: (type: string, listener: () => void) => void
      }
    }
    const updateSaveData = () => setSaveData(Boolean(nav.connection?.saveData))
    if (nav.connection?.addEventListener) {
      nav.connection.addEventListener('change', updateSaveData)
      return () => nav.connection?.removeEventListener?.('change', updateSaveData)
    }
  }, [])

  // The backdrop is the product, not decoration: it keeps running when the OS asks
  // for reduced motion. Only data saver and narrow screens get the still poster.
  const isStaticOnly = saveData || isMobile

  const handleSample = useCallback((sample: SceneSample) => {
    targetTimeRef.current = sample.time
    const nextId = sample.clip?.id ?? null
    setActiveClipId((prev) => (prev === nextId ? prev : nextId))
    setSection((prev) => (prev === sample.section ? prev : sample.section))

    // The real-photo beat of the About transition comes from clip markers, and it
    // now works going down and coming back up, since time is scroll-positional.
    const clip = sample.clip
    const photo = clip?.markers?.find((m) => m.name === 'pedro-photo')
    const back = clip?.markers?.find((m) => m.name === 'statue-back')
    const visible = Boolean(
      photo && sample.time >= photo.at && sample.time < (back ? back.at : photo.at + 1.8),
    )
    if (visible !== photoRef.current) {
      photoRef.current = visible
      setShowPedroPhoto(visible)
    }
  }, [])

  useScrollScene(SECTION_IDS, { enabled: !isStaticOnly, onSample: handleSample })

  const activeClip: SceneClip | null = useMemo(
    () => sceneClips.clips.find((c) => c.id === activeClipId) || null,
    [activeClipId],
  )

  const clipFailed = activeClip ? failedClips.includes(activeClip.id) : false
  const clipVisible = Boolean(activeClip) && !clipFailed && !isStaticOnly

  const arrivingClip = sceneClips.clips.find((c) => c.to === section)
  const basePoster =
    section === 'hero'
      ? sceneClips.heroPoster || DEFAULT_FALLBACK_POSTER
      : arrivingClip?.poster || DEFAULT_FALLBACK_POSTER
  const posterSrc = posterFallbackActive ? DEFAULT_FALLBACK_POSTER : basePoster

  // Load the clip the scroll asks for, then keep it paused: scroll is the clock.
  useEffect(() => {
    const video = videoRef.current
    if (!video || !clipVisible || !activeClip) return
    if (video.getAttribute('src') !== activeClip.src) video.src = activeClip.src
    video.pause()
    loadedRef.current = video
    video.currentTime = targetTimeRef.current
    // activeClip is the only re-load trigger; the time itself lives in the rAF loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeClip?.src, clipVisible])

  // Ease the visible frame toward the scroll target in both directions.
  useEffect(() => {
    if (!clipVisible) return
    let raf = 0
    const tick = () => {
      const video = loadedRef.current
      if (video && video.readyState >= 1) {
        const delta = targetTimeRef.current - video.currentTime
        if (Math.abs(delta) > 0.015) {
          video.currentTime = video.currentTime + delta * EASE
        }
      }
      raf = window.requestAnimationFrame(tick)
    }
    raf = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(raf)
  }, [clipVisible])

  const handleVideoError = useCallback(() => {
    const failedId = activeClipId
    if (failedId) {
      setFailedClips((prev) => (prev.includes(failedId) ? prev : [...prev, failedId]))
    }
  }, [activeClipId])

  const handlePosterError = useCallback(() => {
    if (!posterFallbackActive) setPosterFallbackActive(true)
  }, [posterFallbackActive])

  return (
    <div
      className="video-stage"
      aria-hidden="true"
      data-section={section}
      data-clip={activeClipId ?? 'none'}
      data-reduced-motion={reducedMotion ? 'true' : 'false'}
      data-failed={failedClips.join(',') || 'none'}
      data-mode={clipVisible ? 'video' : 'poster'}
    >
      <img
        key={posterSrc}
        className="video-stage__poster"
        src={posterSrc}
        onError={handlePosterError}
        alt=""
        loading="eager"
        decoding="async"
      />

      {!isStaticOnly && (
        <video
          ref={videoRef}
          className="video-stage__video"
          data-active={clipVisible ? 'true' : 'false'}
          src={clipVisible ? activeClip?.src : undefined}
          muted
          playsInline
          preload="auto"
          onError={handleVideoError}
        />
      )}

      <div
        className="video-stage__pedro-overlay"
        data-visible={showPedroPhoto && clipVisible ? 'true' : 'false'}
      >
        <img src="/eu-profissional.png" alt="" className="video-stage__pedro-img" loading="lazy" />
      </div>

      <div className="video-stage__scrim" />
    </div>
  )
}
