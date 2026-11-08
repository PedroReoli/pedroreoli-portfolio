import { useCallback, useEffect, useRef, useState } from 'react'
import { sceneClips } from '@/data/content'
import type { SceneClip } from '@/types/content'
import { useFrameScroll, effectiveHold, type FrameState } from './useFrameScroll'
import { sliceStart, sliceHeight } from './slices'

/**
 * A fita. Cada seção é um slide preso na viewport; a página rola a fita e o slide
 * mostra exatamente o frame que o scroll pede. Não existe imagem fixa atrás do
 * documento — era isso que virava paralaxe ("as seções parecem estar abaixo da hero").
 *
 * O frame é escrito direto no DOM: um "tick" de roda não deve re-renderizar oito seções.
 */
export function FilmSlide({ clip, index }: { clip: SceneClip; index: number }) {
  const [videoReady, setVideoReady] = useState(false)
  const isHero = index === 0
  const heroVisualRef = useRef<HTMLDivElement>(null)

  // Surgimento cinematográfico da imagem da hero ao carregar a página
  useEffect(() => {
    if (!isHero) return
    const el = heroVisualRef.current
    if (!el) return

    // Se a página já foi rolada além da hero no momento do mount, mantém assentado
    if (typeof window !== 'undefined' && window.scrollY > 20) {
      el.style.opacity = '1'
      el.style.transform = 'none'
      el.style.filter = 'none'
      return
    }

    const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const duration = reduce ? 600 : 1400
    const startY = reduce ? 12 : 32
    const startScale = reduce ? 1.03 : 1.08
    const startBlur = reduce ? 8 : 22
    const startBrightness = reduce ? 1.1 : 1.25

    let rafId = 0
    let startTime: number | null = null

    // Estado inicial de materialização cinematográfica
    el.style.opacity = '0'
    el.style.transform = `translate3d(0, ${startY}px, 0) scale(${startScale})`
    el.style.filter = `blur(${startBlur}px) brightness(${startBrightness})`
    el.style.willChange = 'transform, opacity, filter'

    const step = (now: number) => {
      if (!startTime) startTime = now
      const elapsed = now - startTime
      const progress = Math.min(1, elapsed / duration)

      // Quartic ease-out para assentamento orgânico e suave
      const ease = 1 - Math.pow(1 - progress, 4)

      const opacity = ease
      const translateY = (startY * (1 - ease)).toFixed(1)
      const scale = (startScale - (startScale - 1) * ease).toFixed(4)
      const blur = (startBlur * (1 - ease)).toFixed(1)
      const brightness = (1 + (startBrightness - 1) * (1 - ease)).toFixed(2)

      el.style.opacity = String(opacity)
      el.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`
      el.style.filter = Number(blur) < 0.3 ? 'none' : `blur(${blur}px) brightness(${brightness})`

      if (progress < 1 && window.scrollY <= 10) {
        rafId = requestAnimationFrame(step)
      } else {
        el.style.opacity = '1'
        el.style.transform = 'none'
        el.style.filter = 'none'
        el.style.willChange = ''
      }
    }

    rafId = requestAnimationFrame(step)

    const onScroll = () => {
      if (window.scrollY > 10) {
        cancelAnimationFrame(rafId)
        el.style.opacity = '1'
        el.style.transform = 'none'
        el.style.filter = 'none'
        el.style.willChange = ''
        window.removeEventListener('scroll', onScroll)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
    }
  }, [isHero])

  const show = useCallback((state: FrameState) => {
    // Only this slide writes: every slide listens to the scroll, so a global pass
    // would let the last one win and freeze the whole page on one clip.
    const video = document.querySelector<HTMLVideoElement>(`[data-film-slide][data-clip="${clip.id}"] [data-film-frame]`)
    const root = document.querySelector<HTMLElement>(`[data-film-slide][data-clip="${clip.id}"]`)
    if (!video || !root) return

    const ids = sceneClips.clips.map((c) => c.id)
    const start = sliceStart(ids, index, window.innerHeight)
    const sliceH = sliceHeight(ids, index, window.innerHeight)
    const y = window.scrollY
    // A janela dura exatamente um viewport: o slide entra quando a fatia dele começa e
    // sai quando a próxima começa. Com folga de 1.5x uma seção mostrava dois quadros ao
    // mesmo tempo — o fundo do slide que saía vazava por baixo do texto da próxima, que
    // é o que o Pedro viu como "imagem repetida na segunda seção". O último clipe segura
    // o frame até o fim da página, porque o painel de contato é o quadro final da fita.
    const isLast = index === sceneClips.clips.length - 1
    const end = isLast ? Number.POSITIVE_INFINITY : start + sliceH
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
    const covering = index + 1
    const nextStart = sliceStart(ids, covering, window.innerHeight)
    const stillCovered = !active && y >= nextStart && y < nextStart + OVERLAP
    if (!active) {
      opacity = stillCovered ? 1 : 0
    }
    video.dataset.active = active ? 'true' : 'false'
    video.style.opacity = String(opacity)
    // O pôster de um slide inativo PRECISA ficar escondido: os slides empilham no mesmo
    // ponto, então o pôster de um slide futuro pinta por cima do clipe atual. Era isso
    // que fazia o busto errado (e depois o pôster) dominar a hero, por mais que o clipe
    // estivesse certo. Só o slide ativo pode mostrar o próprio pôster.
    const isFrameReady = video.readyState >= 2 || videoReady
    root.dataset.clipActive = active ? 'true' : 'false'
    root.dataset.frameReady = (active && isFrameReady) ? 'true' : 'false'

    // O painel de texto do mesmo trecho entra junto com o frame, dirigido pela POSIÇÃO
    // do scroll — não por `transition`. Medido com `prefers-reduced-motion: reduce`
    // ativo (o caso desta máquina): o `!important` do base.css zera
    // `transition-duration` E `animation-duration`, e até WAAPI fica em currentTime 0.
    // Só estilo inline escrito a cada scroll anima de verdade.
    //
    // Entrada e saída apontam para lados DIFERENTES de propósito: quem entra sobe e
    // desfoca de 14px até 0; quem sai sobe de leve (-12px) com blur 6px e janela mais
    // curta. Espelhar a entrada fazia as duas seções ficarem semitransparentes juntas.
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const exitScale = reduce ? 0.45 : 1
    // Janelas em px de rolagem: entrada 460, saída 55% disso.
    const ENTER_PX = 460 * exitScale
    const EXIT_PX = Math.round(ENTER_PX * 0.55)
    const smoothstep = (t: number) => {
      const x = Math.min(1, Math.max(0, t))
      return x * x * (3 - 2 * x)
    }

    if (index === 0) {
      document.querySelectorAll<HTMLElement>('[data-film-panel]').forEach((panel) => {
        const slot = Number(panel.dataset.filmPanel)
        const isLastSlot = slot === ids.length - 1
        const startSlot = sliceStart(ids, slot, window.innerHeight)
        const endSlot = startSlot + sliceHeight(ids, slot, window.innerHeight)
        // Entra nos primeiros ENTER_PX da fatia; continua 1 até começar a sair.
        const entering = smoothstep((y - startSlot) / ENTER_PX)
        const leaving = smoothstep((y - (endSlot - EXIT_PX)) / EXIT_PX) * (isLastSlot ? 0 : 1)
        const visible = y >= startSlot && y < endSlot || (isLastSlot && y >= startSlot)
        const p = entering * (1 - leaving)

        panel.dataset.visible = visible ? 'true' : 'false'
        if (!visible) {
          // Fora da fatia: some sem custo de pintura.
          panel.style.opacity = '0'
          panel.style.filter = 'none'
          panel.style.transform = 'none'
          panel.style.zIndex = ''
          panel
            .querySelectorAll<HTMLElement>(':scope > section > .shell > *')
            .forEach((kid) => {
              kid.style.opacity = '0'
              kid.style.transform = 'none'
            })
          return
        }

        const blurIn = 14 * (1 - entering)
        // Na saída o desfoque volta a crescer, mas menor (6px) e para cima.
        const blurOut = 6 * leaving
        const blur = Math.max(blurIn, blurOut)
        const rise = 18 * (1 - entering) - 12 * leaving
        const scale = 1

        panel.style.opacity = p.toFixed(3)
        panel.style.filter = blur < 0.5 ? 'none' : `blur(${blur.toFixed(2)}px)`
        panel.style.transform = `translate3d(0, ${rise.toFixed(1)}px, 0) scale(${scale.toFixed(4)})`
        // Quem está saindo fica por baixo; quem entra, por cima.
        panel.style.zIndex = leaving > 0 && entering < 0.999 ? '1' : '2'

        // Escalonamento do conteúdo: o kicker chega antes do título, e os cards por
        // último. Cada filho tem a própria janela dentro dos primeiros 70% da entrada,
        // então a leitura acontece na ordem em que se olha a seção. Escrito inline pelo
        // mesmo motivo do painel: `transition` aqui é zerado pelo base.css.
        const kids = panel.querySelectorAll<HTMLElement>(':scope > section > .shell > *')
        const total = kids.length
        kids.forEach((kid, i) => {
          const start = total > 1 ? (i / total) * 0.7 : 0
          const local = smoothstep((entering - start) / 0.3)
          kid.style.opacity = visible ? local.toFixed(3) : '0'
          kid.style.transform = visible
            ? `translate3d(0, ${((1 - local) * (reduce ? 5 : 10)).toFixed(1)}px, 0)`
            : 'none'
        })
      })
    }

    if (!active) {
      if (stillCovered && video.readyState >= 1) {
        const hold = effectiveHold(clip)
        if (Math.abs(video.currentTime - hold) > 0.05) {
          video.currentTime = hold
        }
      }
      return
    }

    video.pause()
    if (video.readyState >= 1) {
      if (video.currentTime === 0 || Math.abs(video.currentTime - state.time) > 0.02) {
        video.currentTime = state.time
      }
    }
    document.documentElement.dataset.filmTime = state.time.toFixed(3)
  }, [clip, index, videoReady])

  useFrameScroll(show, index)

  return (
    <div
      className={`film-slide ${isHero ? 'film-slide--hero' : ''}`}
      data-film-slide
      data-clip={clip.id}
      aria-hidden="true"
    >
      <div className="film-slide__sticky">
        {isHero && <div className="hero-cyber-aura" aria-hidden="true" />}
        <div ref={isHero ? heroVisualRef : undefined} className="film-slide__visual">
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
            onLoadedData={() => setVideoReady(true)}
            onCanPlay={() => setVideoReady(true)}
          />
        </div>
      </div>
    </div>
  )
}
