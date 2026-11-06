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
  const [failedClips, setFailedClips] = useState<string[]>([])
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
  const isStaticOnly = reducedMotion || saveData || isMobile

  // 4. Section + clip tracking driven by scroll position.
  // The outgoing clip runs during the last stretch of the current section and
  // freezes on the poster frame once the next section fills the screen.
  useEffect(() => {
    if (typeof window === 'undefined') return

    let frame = 0
    let lastScrollY = window.scrollY

    const update = () => {
      frame = 0
      const vh = window.innerHeight
      const y = window.scrollY
      const mid = y + vh / 2
      const goingDown = y >= lastScrollY
      lastScrollY = y

      let index = 0
      let sectionTop = 0
      let sectionHeight = vh
      SECTION_IDS.forEach((id, i) => {
        const el = document.getElementById(id)
        if (!el) return
        const top = el.offsetTop
        const height = el.offsetHeight
        if (mid >= top && mid < top + height) {
          index = i
          sectionTop = top
          sectionHeight = height
        }
      })

      const currentId = SECTION_IDS[index]
      const nextId = SECTION_IDS[index + 1]
      setCurrentSection(currentId)

      const progress = sectionHeight > 0 ? (mid - sectionTop) / sectionHeight : 1
      const clip = nextId
        ? sceneClips.clips.find((c) => c.from === currentId && c.to === nextId)
        : undefined

      if (clip && progress > 0.55 && goingDown) {
        setActiveClipId((prev) => (prev === clip.id ? prev : clip.id))
      } else if (!goingDown) {
        // Scrolling back up always shows the section freeze frame instead of
        // rewinding the clip (and never leaves the photo overlay on screen).
        setActiveClipId((prev) => (prev === null ? prev : null))
      }
    }

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  // 5. Derived clip and poster from the transition in progress
  const activeClip: SceneClip | null =
    sceneClips.clips.find((c) => c.id === activeClipId) || null

  // A missing clip only disables that clip; the others keep working.
  const clipFailed = activeClip ? failedClips.includes(activeClip.id) : false
  const isPosterOnly = isStaticOnly || clipFailed

  const arrivingClip = sceneClips.clips.find((c) => c.to === currentSection)
  const basePoster =
    currentSection === 'hero'
      ? sceneClips.heroPoster || DEFAULT_FALLBACK_POSTER
      : arrivingClip?.poster || DEFAULT_FALLBACK_POSTER

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
      // A blocked autoplay is transient, not a broken asset: keep the video mounted
      // (poster stays behind it) and try again on the next clip change.
      playPromise.catch(() => {})
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
    // This clip's file is missing or undecodable -> poster for this clip only.
    const failedId = activeClipRef.current?.id
    if (failedId) {
      setFailedClips((prev) => (prev.includes(failedId) ? prev : [...prev, failedId]))
    }
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
      data-failed={failedClips.join(',') || 'none'}
      data-mode={isPosterOnly ? 'poster' : 'video'}
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
      {!isPosterOnly && activeClip && (
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
