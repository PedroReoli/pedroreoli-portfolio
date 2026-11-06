import { useCallback } from 'react'
import { sceneClips } from '@/data/content'
import type { SceneClip } from '@/types/content'
import { useFrameScroll, type FrameState } from './useFrameScroll'

/**
 * A fita. Cada seção é um slide preso na viewport; a página rola a fita e o slide
 * mostra exatamente o frame que o scroll pede. Não existe imagem fixa atrás do
 * documento — era isso que virava paralaxe ("as seções parecem estar abaixo da hero").
 *
 * O frame é escrito direto no DOM: um "tick" de roda não deve re-renderizar oito seções.
 */
export function FilmSlide({ clip, index }: { clip: SceneClip; index: number }) {
  const show = useCallback((state: FrameState) => {
    // Only this slide writes: every slide listens to the scroll, so a global pass
    // would let the last one win and freeze the whole page on one clip.
    const video = document.querySelector<HTMLVideoElement>(`[data-film-slide][data-clip="${clip.id}"] [data-film-frame]`)
    const root = document.querySelector<HTMLElement>(`[data-film-slide][data-clip="${clip.id}"]`)
    if (!video || !root) return
    // Cada slide só está em cena durante a própria tela de rolagem: antes dela o
    // frame é 0, depois dela segura o último. O clipe troca exatamente no slide
    // seguinte — e é isso que faz a fita andar frame a frame, sem paralaxe.
    const start = index * window.innerHeight
    const y = window.scrollY
    // O último slide segura o frame também durante o painel de contato.
    const isLast = index === sceneClips.clips.length - 1
    const tail = isLast ? window.innerHeight * 2.5 : window.innerHeight * 1.5
    const active = y >= start - 2 && y < start + tail
    video.dataset.active = active ? 'true' : 'false'
    root.dataset.frameReady = active ? 'true' : 'false'
    if (!active) return

    // O painel de texto do mesmo trecho entra junto com o frame.
    document.querySelectorAll<HTMLElement>('[data-film-panel]').forEach((panel) => {
      const slot = Number(panel.dataset.filmPanel)
      const on = y >= slot * window.innerHeight && y < (slot + 1) * window.innerHeight
      panel.dataset.visible = on ? 'true' : 'false'
    })

    video.pause()
    if (video.readyState >= 1) video.currentTime = state.time
    document.documentElement.dataset.filmTime = state.time.toFixed(3)
  }, [clip.id, index])

  useFrameScroll(show, index)

  return (
    <div className="film-slide" data-film-slide data-clip={clip.id} aria-hidden="true">
      <div className="film-slide__sticky">
        <img
          className="film-slide__poster"
          src={index === 0 ? sceneClips.heroPoster : clip.poster}
          alt=""
          loading={index < 2 ? 'eager' : 'lazy'}
          decoding="async"
        />
        <video
          className="film-slide__video"
          data-film-frame={clip.id}
          data-active="false"
          src={clip.src}
          muted
          playsInline
          preload="auto"
        />
      </div>
    </div>
  )
}
