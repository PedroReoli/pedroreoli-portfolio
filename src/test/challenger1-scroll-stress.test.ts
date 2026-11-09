import { describe, it, expect } from 'vitest'
import { fireEvent } from '@testing-library/react'
import { renderHome, sectionIds } from './home-fixture'

describe('stress: acesso ao conteúdo independente de posição/altura', () => {
  it.each([320, 390, 768, 1886, 1920])('resize para %ipx preserva seções e âncoras', width => {
    const { container } = renderHome()
    const previous = window.innerWidth
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: width })
    fireEvent.resize(window)
    sectionIds.forEach(id => expect(container.querySelector('#' + id)).toBeVisible())
    expect(container.querySelector('a[href="#projetos-selecionados"]')).toBeInTheDocument()
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: previous })
  })
  it('início, meio, fim e retorno mantêm a mesma árvore de leitura', () => {
    const { container } = renderHome()
    const text = container.querySelector('main')!.textContent
    for (const y of [0, 914, 1828, 4570, 15000, 4570, 1828, 0]) {
      fireEvent.scroll(window, { target: { scrollY: y } })
      expect(container.querySelector('main')!.textContent).toBe(text)
      expect(container.querySelector('[data-visible="false"]')).toBeNull()
    }
  })
})
