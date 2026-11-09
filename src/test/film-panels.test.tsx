import { describe, it, expect } from 'vitest'
import { homeContent } from '../data/content'
import { renderHome, sectionIds } from './home-fixture'

describe('Home: leitura em fluxo normal substitui painéis sincronizados', () => {
  it('monta as seis seções na ordem de leitura do documento', () => {
    const { container } = renderHome()
    expect([...container.querySelectorAll('.home > section')].map(s => s.id)).toEqual(sectionIds)
    expect(container.querySelector('[data-film-panel], .film-content, .film-track')).toBeNull()
  })
  it('oferece todo o conteúdo antes de qualquer evento de scroll', () => {
    const { container } = renderHome()
    sectionIds.forEach(id => {
      const section = container.querySelector('#' + id)
      expect(section).toBeVisible()
      expect(section).not.toHaveAttribute('hidden')
      expect(section).not.toHaveAttribute('aria-hidden', 'true')
    })
    homeContent.experienceItems.forEach(item => expect(container).toHaveTextContent(item.description.pt))
  })
  it('contato fecha o documento fora da experiência, uma única vez', () => {
    const { container } = renderHome()
    expect(container.querySelectorAll('footer#contato')).toHaveLength(1)
    expect(container.querySelector('#experiencia footer')).toBeNull()
    expect(container.querySelector('main')?.nextElementSibling?.tagName).toBe('FOOTER')
    expect(container.querySelectorAll('.contact-grid a')).toHaveLength(4)
  })
})
