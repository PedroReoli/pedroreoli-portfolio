import { describe, it, expect } from 'vitest'
import { fireEvent } from '@testing-library/react'
import { renderHome, sectionIds, css } from './home-fixture'

describe('leitura sem scroll trap', () => {
  it('gestos de roda não são cancelados pela Home', () => {
    const { container } = renderHome()
    const event = new WheelEvent('wheel', { deltaY: 800, bubbles: true, cancelable: true })
    container.querySelector('#experiencia')?.dispatchEvent(event)
    expect(event.defaultPrevented).toBe(false)
    expect(document.body.style.overflow).not.toBe('hidden')
  })
  it('rolar e retornar não oculta seções nem o fim da trajetória', () => {
    const { container } = renderHome()
    for (const y of [0, 900, 6000, 12000, 6000, 900, 0]) {
      fireEvent.scroll(window, { target: { scrollY: y } })
      sectionIds.forEach(id => expect(container.querySelector('#' + id)).toBeVisible())
    }
  })
  it('CSS de leitura não limita seções a telas nem cria painéis empilhados', () => {
    const styles = css('home') + css('film')
    expect(styles).not.toMatch(/height:\s*(?:calc\([^;]*svh|100svh)/)
    expect(styles).not.toMatch(/\.film-panel|\.film-content|overflow-y:\s*(?:scroll|auto)/)
  })
})
