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

    // FLUIDEZ — como a passagem entre clipes funciona agora.
    //
    // Cada clipe é dono da própria janela e fica em opacidade 1 durante TODA ela.
    // A única coisa que mistura é o clipe ENTRANDO: nos primeiros OVERLAP px da
    // janela dele ele sobe de 0 a 1, por cima do anterior, que continua em 1 por
    // baixo. Resultado: na fronteira sempre existe imagem cheia (nunca os dois em
    // zero), e a troca é um dissolve de verdade em vez de um piscar para preto.
    //
    // A tentativa anterior fazia o clipe SAIR apagar antes da borda, e o entrar só
    // começar depois: nas duas pontas da janela a opacidade ia a 0, então bem na
    // emenda a tela ficava preta por um instante — o "não está fluido" que o Pedro viu.
    const OVERLAP = 220
    let opacity = 1
    // Quem entra sobe de 0 a 1 nos primeiros OVERLAP px da própria janela.
    if (index > 0) {
      const fadeIn = (y - start) / OVERLAP
      if (fadeIn < 1) opacity = Math.min(1, Math.max(0, fadeIn))
    }
    // Quem NÃO está mais ativo só continua a imagem cheia enquanto o próximo ainda
    // está subindo (`index + 1`). Sem esta cláusula o clipe que sai desligava no mesmo
    // tick em que o próximo marcava 0, e a fronteira 5→6 piscava preto — o vídeo não
    // trocava visivelmente e o topo da seção 6 sumia.
    if (!active) {
      const covering = index + 1
      const nextStart = covering * window.innerHeight
      const stillCovered = y >= nextStart && y < nextStart + OVERLAP
      opacity = stillCovered ? 1 : 0
    }
    video.dataset.active = active ? 'true' : 'false'
    video.style.opacity = String(opacity)
    // O pôster de um slide inativo PRECISA ficar escondido: os slides empilham no mesmo
    // ponto, então o pôster de um slide futuro pinta por cima do clipe atual. Era isso
    // que fazia o busto errado (e depois o pôster) dominar a hero, por mais que o clipe
    // estivesse certo. Só o slide ativo pode mostrar o próprio pôster.
    root.dataset.clipActive = active ? 'true' : 'false'
    root.dataset.frameReady = active ? 'true' : 'false'

    // O painel de texto do mesmo trecho entra junto com o frame. O que sai recebe um
    // handoff CURTO: ele só precisa cobrir o instante em que o vídeo ainda está
    // misturando. Se ficar os 220px inteiros do crossfade, o texto da seção anterior
    // continua por cima da próxima — era parte do "não vejo a troca nem o topo da S6".
    // O painel de texto do mesmo trecho entra junto com o frame. O que sai NÃO pode
    // ficar por cima do próximo: com 90px de handoff os dois ficavam visíveis ao
    // mesmo tempo e a S2 aparecia fantasma sobre a S3. Agora a fatia é exclusiva —
    // só um painel por vez — e a fluidez vem da própria animação de entrada/saída.
    document.querySelectorAll<HTMLElement>('[data-film-panel]').forEach((panel) => {
      const slot = Number(panel.dataset.filmPanel)
      const startSlot = slot * window.innerHeight
      const inSlot = y >= startSlot && y < startSlot + window.innerHeight
      panel.dataset.visible = inSlot ? 'true' : 'false'
      delete panel.dataset.leaving
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
