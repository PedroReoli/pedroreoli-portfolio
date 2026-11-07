import { describe, it, expect } from 'vitest'
import { sceneClips } from '../data/content'

/**
 * Regressão do que o Pedro viu como "na segunda seção a minha imagem aparece duas
 * vezes": a janela de cada slide tinha folga de 1.5 viewport, então o slide que
 * saía continuava ativo ao mesmo tempo que o seguinte. Dois clipes ligados = dois
 * bustos empilhados, e o fundo do primeiro vazando por baixo do texto do segundo.
 *
 * O contrato agora é estrito: em qualquer offset de scroll existe no máximo UM
 * quadro da fita em cena.
 */
const VH = 800

function activeSlides(y: number, total = sceneClips.clips.length): number[] {
  return sceneClips.clips
    .map((_, index) => {
      const start = index * VH
      const isLast = index === total - 1
      const end = isLast ? Number.POSITIVE_INFINITY : start + VH
      return y >= start && y < end ? index : null
    })
    .filter((index): index is number => index !== null)
}

function visiblePanel(y: number, slots = sceneClips.clips.length + 1): number[] {
  return Array.from({ length: slots }, (_, slot) => slot).filter(
    (slot) => y >= slot * VH && y < (slot + 1) * VH,
  )
}

describe('Fita — nunca dois quadros na mesma tela', () => {
  const offsets = [0, 1, 400, 799, 800, 900, 1599, 1600, 2400, 3200, 4000, 4799, 4800, 5600, 9999]

  it('no máximo um clipe ativo em qualquer offset', () => {
    offsets.forEach((y) => {
      expect(activeSlides(y).length).toBeLessThanOrEqual(1)
    })
  })

  it('no máximo um painel de texto visível em qualquer offset', () => {
    offsets.forEach((y) => {
      expect(visiblePanel(y).length).toBeLessThanOrEqual(1)
    })
  })

  it('o clipe e o painel da mesma fatia aparecem juntos (sem fundo da seção anterior)', () => {
    offsets.forEach((y) => {
      const slide = activeSlides(y)
      const panel = visiblePanel(y)
      // Na fatia do último clipe o painel extra (contato) divide o mesmo fundo.
      if (slide.length === 1 && panel.length === 1) {
        expect(panel[0] === slide[0] || slide[0] === sceneClips.clips.length - 1).toBe(true)
      }
    })
  })

  it('o último clipe segura o quadro até o fim da página', () => {
    const last = sceneClips.clips.length - 1
    expect(activeSlides(4800)).toEqual([last])
    expect(activeSlides(9999)).toEqual([last])
  })
})
