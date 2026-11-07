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

    const start = index * window.innerHeight
    const y = window.scrollY
    // A janela dura exatamente um viewport: o slide entra quando a fatia dele começa e
    // sai quando a próxima começa. Com folga de 1.5x uma seção mostrava dois quadros ao
    // mesmo tempo — o fundo do slide que saía vazava por baixo do texto da próxima, que
    // é o que o Pedro viu como "imagem repetida na segunda seção". O último clipe segura
    // o frame até o fim da página, porque o painel de contato é o quadro final da fita.
    const isLast = index === sceneClips.clips.length - 1
    const end = isLast ? Number.POSITIVE_INFINITY : start + window.innerHeight
    const active = y >= start && y < end

    // Fluidez: em vez de cortar seco na fronteira, os dois clipes se misturam numa
    // banda de sobreposição curta (os últimos ~220px de cada janela). O que está
    // saindo desce de opacidade enquanto o próximo sobe, então a passagem é um
    // crossfade e não um "clique" de troca. Fora dessa banda o comportamento é
    // idêntico ao binário (um só clipe visível, sem dois bustos).
    const OVERLAP = 220
    // Crossfade: a opacidade desce 1->0 enquanto o clipe sai (fim da janela) e sobe
    // 0->1 enquanto entra (início da janela). Como a janela de um termina onde a do
    // próximo começa, as duas rampas se cruzam na borda — é uma passagem suave, não
    // um corte seco.
    let opacity = 0
    if (active) {
      if (isLast) {
        opacity = 1
      } else {
        const fadeOut = Math.max(0, Math.min(1, (end - y) / OVERLAP))
        const fadeIn = Math.max(0, Math.min(1, (y - start) / OVERLAP))
        opacity = Math.min(fadeOut, fadeIn)
      }
    }
    video.dataset.active = active ? 'true' : 'false'
    video.style.opacity = String(opacity)
    // O pôster de um slide inativo PRECISA ficar escondido: os slides empilham no mesmo
    // ponto, então o pôster de um slide futuro pinta por cima do clipe atual. Era isso
    // que fazia o busto errado (e depois o pôster) dominar a hero, por mais que o clipe
    // estivesse certo. Só o slide ativo pode mostrar o próprio pôster.
    root.dataset.clipActive = active ? 'true' : 'false'
    root.dataset.frameReady = active ? 'true' : 'false'

    // O painel de texto do mesmo trecho entra junto com o frame — inclusive quando este
    // slide está saindo, senão o texto nunca apareceria no trecho em que o frame ainda é
    // o dele.
    document.querySelectorAll<HTMLElement>('[data-film-panel]').forEach((panel) => {
      const slot = Number(panel.dataset.filmPanel)
      const on = y >= slot * window.innerHeight && y < (slot + 1) * window.innerHeight
      panel.dataset.visible = on ? 'true' : 'false'
    })

    if (!active) return

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
