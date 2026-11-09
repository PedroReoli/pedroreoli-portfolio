import { useEffect, useRef, useState } from 'react'
import type { SceneClip } from '@/types/content'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/** Superfície de mídia independente: nunca escreve no conteúdo ou no scroll. */
export function FilmSlide({ clip, index }: { clip: SceneClip; index: number }) {
  const reducedMotion = useReducedMotion()
  const video = useRef<HTMLVideoElement>(null)
  const frame = useRef<HTMLDivElement>(null)
  const [playing, setPlaying] = useState(false)
  const [failed, setFailed] = useState(false)
  const [posterFailed, setPosterFailed] = useState(false)
  const [desktop, setDesktop] = useState(() => window.matchMedia('(min-width: 900px)').matches)
  const enabled = desktop && !reducedMotion && !failed

  useEffect(() => {
    const query = window.matchMedia('(min-width: 900px)')
    const update = () => setDesktop(query.matches)
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const media = video.current
    if (!enabled || !media) return
    const play = () => {
      if (media.ended) return
      const result = media.play()
      result?.catch(() => setFailed(true))
    }
    if (typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && document.visibilityState === 'visible') play()
      else media.pause()
    }, { threshold: 0.1 })
    if (frame.current) observer.observe(frame.current)
    const visibility = () => {
      if (document.visibilityState !== 'visible') media.pause()
      else if (frame.current && frame.current.getBoundingClientRect().bottom > 0) play()
    }
    document.addEventListener('visibilitychange', visibility)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', visibility)
      media.pause()
    }
  }, [enabled])

  return (
    <div ref={frame} className="film-media" data-scene={clip.id} aria-hidden="true">
      {!posterFailed && <img className="film-media__poster" src={clip.poster} alt=""
        width="1920" height="1080" fetchPriority={index === 0 ? 'high' : 'auto'}
        loading={index === 0 ? 'eager' : 'lazy'} onError={() => setPosterFailed(true)} />}
      {enabled && <video ref={video} className="film-media__video" src={clip.src}
        muted playsInline preload="metadata" tabIndex={-1}
        data-playing={playing}
        onLoadStart={() => setPlaying(false)}
        onPlaying={() => setPlaying(true)} onError={() => setFailed(true)} />}
    </div>
  )
}
