import { useState, useEffect, useRef, useCallback } from 'react'
import { sceneClips } from '@/data/content'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { SceneClip } from '@/types/content'

const SECTION_IDS = [
  'hero',
  'sobre',
  'projetos-selecionados',
  'stack',
  'proposito',
  'experiencia',
] as const

const DEFAULT_FALLBACK_POSTER = '/images/pedro-bust-cyber.jpg'

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
  const [videoError, setVideoError] = useState<boolean>(false)
  const [currentSection, setCurrentSection] = useState<string>('hero')
  const [activeClipId, setActiveClipId] = useState<string | null>(null)
  const [posterFallbackActive, setPosterFallbackActive] = useState<boolean>(false)
  const [showPedroPhoto, setShowPedroPhoto] = useState<boolean>(false)

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const activeClipRef = useRef<SceneClip | null>(null)
  const resetPhotoRef = useRef(false)

  // 1. Detection of Mobile <= 768px
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mql = window.matchMedia('(max-width: 768px)')
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  // 2. Detection of navigator.connection.saveData
  useEffect(() => {
    if (typeof navigator === 'undefined') return
    const nav = navigator as unknown as {
      connection?: {
        saveData?: boolean
        addEventListener?: (type: string, listener: () => void) => void
        removeEventListener?: (type: string, listener: () => void) => void
      }
    }
    const updateSaveData = () => {
      setSaveData(Boolean(nav.connection?.saveData))
    }
    if (nav.connection?.addEventListener) {
      nav.connection.addEventListener('change', updateSaveData)
      return () => nav.connection?.removeEventListener?.('change', updateSaveData)
    }
  }, [])

  // 3. Static Only check: reduced motion, save data, mobile <= 768px, or video error
  const isStaticOnly = reducedMotion || saveData || isMobile || videoError

  // 4. Section tracking via IntersectionObserver
  useEffect(() => {
    if (typeof window === 'undefined') return

    const visibleRatios = new Map<string, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleRatios.set(entry.target.id, entry.intersectionRatio)
        })

        let bestId = 'hero'
        let maxRatio = 0
        SECTION_IDS.forEach((id) => {
          const ratio = visibleRatios.get(id) || 0
          if (ratio > maxRatio) {
            maxRatio = ratio
            bestId = id
          }
        })

        if (maxRatio > 0.15) {
          setCurrentSection(bestId)
        }

        // Transition trigger: run the clip N -> N+1 as soon as the next section
        // starts entering the viewport, so the animation happens while scrolling
        // from one section to the next (and freezes when the section fills the screen).
        const bestIndex = SECTION_IDS.indexOf(bestId as (typeof SECTION_IDS)[number])
        const nextId = SECTION_IDS[bestIndex + 1]
        const prevId = SECTION_IDS[bestIndex - 1]
        const nextRatio = nextId ? visibleRatios.get(nextId) ?? 0 : 0
        const prevRatio = prevId ? visibleRatios.get(prevId) ?? 0 : 0

        if (nextId && nextRatio > 0.04 && maxRatio < 0.92) {
          const clip = sceneClips.clips.find((c) => c.from === bestId && c.to === nextId)
          if (clip) setActiveClipId(clip.id)
        } else if (prevId && prevRatio > 0.04 && maxRatio < 0.92) {
          // Scrolling back up: hold the poster instead of rewinding the clip.
          setActiveClipId(null)
        }
      },
      {
        root: null,
        threshold: [0.04, 0.15, 0.35, 0.5, 0.75, 0.92],
      },
    )

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  // 5. Derived clip and poster from the transition in progress
  const activeClip: SceneClip | null =
    sceneClips.clips.find((c) => c.id === activeClipId) || null

  const basePoster =
    currentSection === 'hero'
      ? sceneClips.heroPoster || DEFAULT_FALLBACK_POSTER
      : activeClip?.poster || DEFAULT_FALLBACK_POSTER

  const posterSrc = posterFallbackActive ? DEFAULT_FALLBACK_POSTER : basePoster

  // 6. Synchronize ref and video playback when clip changes
  useEffect(() => {
    activeClipRef.current = activeClip
    resetPhotoRef.current = true

    if (isStaticOnly || !activeClip) {
      if (videoRef.current) {
        videoRef.current.pause()
      }
      return
    }

    const video = videoRef.current
    if (!video) return

    // <source> children changed: the browser only re-reads them after load()
    video.load()
    video.currentTime = 0
    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        setVideoError(true)
      })
    }
  }, [activeClip, isStaticOnly])

  // 7. Video TimeUpdate handling (freeze at holdAt + markers)
  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current
    const clip = activeClipRef.current
    if (!video || !clip) return

    const current = video.currentTime

    if (resetPhotoRef.current) {
      resetPhotoRef.current = false
      setShowPedroPhoto(false)
    }

    // Check holdAt freeze
    if (typeof clip.holdAt === 'number' && current >= clip.holdAt) {
      video.pause()
    }

    // Check markers (e.g. pedro-photo for Section 2 crossfade)
    if (clip.markers && clip.markers.length > 0) {
      const photoMarker = clip.markers.find((m) => m.name === 'pedro-photo')
      const backMarker = clip.markers.find((m) => m.name === 'statue-back')
      if (photoMarker) {
        const start = photoMarker.at
        const end = backMarker ? backMarker.at : start + 1.8
        setShowPedroPhoto(current >= start && current < end)
      } else {
        setShowPedroPhoto(false)
      }
    } else {
      setShowPedroPhoto(false)
    }
  }, [])

  const handleVideoError = useCallback(() => {
    // Video failed (file missing or decoding error) -> fallback to poster immediately
    setVideoError(true)
  }, [])

  const handlePosterError = useCallback(() => {
    // MediaForge backdrop poster not yet generated -> fallback to existing hero image
    if (!posterFallbackActive) {
      setPosterFallbackActive(true)
    }
  }, [posterFallbackActive])

  return (
    <div
      className="video-stage"
      aria-hidden="true"
      data-section={currentSection}
      data-clip={activeClipId ?? 'none'}
      data-mode={isStaticOnly ? 'poster' : 'video'}
    >
      {/* 1. Base Poster Layer (Always available as background/fallback) */}
      <img
        key={posterSrc}
        className="video-stage__poster"
        src={posterSrc}
        onError={handlePosterError}
        alt=""
        loading="eager"
        decoding="async"
      />

      {/* 2. Video Player Layer (Only rendered if video playback is allowed and functional) */}
      {!isStaticOnly && activeClip && (
        <video
          ref={videoRef}
          className="video-stage__video"
          muted
          playsInline
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          onError={handleVideoError}
        >
          {activeClip.webm && <source src={activeClip.webm} type="video/webm" />}
          <source src={activeClip.src} type="video/mp4" />
        </video>
      )}

      {/* 3. Pedro Professional Crossfade Overlay (Activated by clip markers in Section 2) */}
      <div
        className="video-stage__pedro-overlay"
        style={{
          opacity: showPedroPhoto ? 1 : 0,
        }}
      >
        <img
          src="/eu-profissional.png"
          alt=""
          className="video-stage__pedro-img"
          loading="lazy"
        />
      </div>

      {/* 4. Editorial Readability Scrims & Tint Overlay */}
      <div className="video-stage__scrim" />
    </div>
  )
}
