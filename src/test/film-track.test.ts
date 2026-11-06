import { describe, it, expect } from 'vitest'
import { frameAt, buildGates, STEP_PX, type Gate } from '../components/scene/useFrameScroll'
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
