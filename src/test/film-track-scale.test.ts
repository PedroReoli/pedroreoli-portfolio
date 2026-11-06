import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { frameAt, buildGates, measureAnchors, STEP_PX, type Gate } from '../components/scene/useFrameScroll'
import { sceneClips } from '../data/content'

function gate(steps: number, span = steps * STEP_PX): Gate {
  return { clip: sceneClips.clips[0], steps, span }
}

describe('Film track — uma rolagem move um frame', () => {
  const gates = [gate(24), gate(24)]

  it('um passo de scroll avança exatamente um frame', () => {
    const a = frameAt(gates, 0)
    const b = frameAt(gates, STEP_PX)
    const c = frameAt(gates, STEP_PX * 2)
    expect(a.frame).toBe(0)
    expect(b.frame).toBe(1)
    expect(c.frame).toBe(2)
  })

  it('scroll entre dois degraus fica no mesmo frame (frame inteiro, nunca fractional)', () => {
    const inside = frameAt(gates, STEP_PX + STEP_PX / 2)
    expect(inside.frame).toBe(1)
    expect(inside.time).toBeCloseTo(gates[0].clip.holdAt / gates[0].steps, 5)
  })

  it('voltar rewind para exatamente o mesmo frame', () => {
    const down = frameAt(gates, STEP_PX * 5)
    const up = frameAt(gates, STEP_PX * 5)
    expect(up.frame).toBe(down.frame)
    expect(up.time).toBeCloseTo(down.time, 6)
  })

  it('o frame nunca passa do último frame do clipe', () => {
    const last = gate(24)
    const end = frameAt([last], last.span + 5000)
    expect(end.frame).toBe(24)
    expect(end.time).toBeLessThanOrEqual(last.clip.holdAt)
  })

  it('o tempo acompanha o frame proporcionalmente ao holdAt', () => {
    const first = gate(10)
    const mid = frameAt([first], first.span / 2)
    expect(mid.frame).toBe(5)
    expect(mid.time).toBeCloseTo((5 / 10) * first.clip.holdAt, 5)
  })

  it('os gates cobrem a fita inteira sem buraco', () => {
    const built = buildGates([
      { clip: sceneClips.clips[0], y: 0 },
      { clip: sceneClips.clips[1], y: 900 },
      { clip: sceneClips.clips[2], y: 1800 },
    ])
    expect(built).toHaveLength(3)
    expect(built.every((g) => g.steps >= 1 && g.span > 0)).toBe(true)
  })
})

/**
 * Regressão medida no navegador: com as seções reais (6 slides sticky de 1 viewport),
 * o trilho inteiro era lido como 6 gates de 7 frames, então a primeira rolagem já
 * consumia o clipe 01 inteiro e o tempo saltava para ~5,5s.
 */
describe('Film track — escala de viewport real', () => {
  const original = { innerHeight: window.innerHeight }

  beforeEach(() => {
    Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true, writable: true })
  })

  afterEach(() => {
    Object.defineProperty(window, 'innerHeight', {
      value: original.innerHeight,
      configurable: true,
      writable: true,
    })
    document.body.innerHTML = ''
  })

  it('cada clipe cobre o próprio slide de 1 viewport, não a fita inteira', () => {
    const built = buildGates(
      sceneClips.clips.map((clip, index) => ({ clip, y: index * window.innerHeight })),
    )
    // O clipe é AMOSTRADO no percurso: um passo de scroll (~STEP_PX) = um frame. Foi
    // isso que o Pedro pediu ("cada scrollagem move um frame"); mapear os 188 frames
    // do arquivo em 900px fazia um tico de roda consumir ~1s de vídeo.
    expect(built[0].steps).toBe(Math.round(window.innerHeight / STEP_PX))
    const lastFrameOfFirst = frameAt(built, window.innerHeight - 1)
    expect(lastFrameOfFirst.clip?.id).toBe(sceneClips.clips[0].id)
    expect(lastFrameOfFirst.time).toBeLessThanOrEqual(sceneClips.clips[0].holdAt)
  })

  it('o clipe 01 só termina quando o slide dele termina', () => {
    const built = buildGates(
      sceneClips.clips.map((clip, index) => ({ clip, y: index * window.innerHeight })),
    )
    const atSeam = frameAt(built, window.innerHeight)
    expect(atSeam.clip?.id).toBe(sceneClips.clips[1].id)
    expect(atSeam.frame).toBe(0)
  })

  it('roleta de um degrau nunca volta a 0 depois de sair do primeiro frame', () => {
    const built = buildGates(
      sceneClips.clips.map((clip, index) => ({ clip, y: index * window.innerHeight })),
    )
    const times = [STEP_PX, STEP_PX * 2, STEP_PX * 3].map((y) => frameAt(built, y).time)
    expect(times[0]).toBeGreaterThan(0)
    expect(times[1]).toBeGreaterThan(times[0])
    expect(times[2]).toBeGreaterThan(times[1])
  })

  it('measureAnchors ancora cada slide no offsetTop dele (sticky, não empilhado em 0)', () => {
    let top = 0
    sceneClips.clips.forEach((clip) => {
      const slide = document.createElement('div')
      slide.dataset.filmSlide = ''
      slide.dataset.clip = clip.id
      Object.defineProperty(slide, 'offsetTop', { value: top, configurable: true })
      top += window.innerHeight
      document.body.appendChild(slide)
    })
    const anchors = measureAnchors()
    expect(anchors).toHaveLength(sceneClips.clips.length)
    expect(new Set(anchors.map((a) => a.y)).size).toBe(sceneClips.clips.length)
    expect(anchors[1].y - anchors[0].y).toBe(window.innerHeight)
  })
})

// Mantém o import do vitest usado quando o arquivo roda isolado.
void vi
