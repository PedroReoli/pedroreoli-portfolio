import { describe, it, expect } from 'vitest'
import { homeContent } from '../data/content'
import { renderHome, css } from './home-fixture'

describe('trajetória em cards compactos e com texto completo', () => {
  it('expõe lista ordenada, período, empresa, cargo e todos os destaques', () => {
    const { container } = renderHome()
    const list = container.querySelector('#experiencia ol')
    expect(list).not.toBeNull()
    expect(list?.children).toHaveLength(homeContent.experienceItems.length)
    homeContent.experienceItems.forEach((item, i) => {
      const row = list!.children[i]
      expect(row).toHaveTextContent(item.period.pt)
      const period = row.querySelector('.timeline-v__period')
      expect(period).toHaveTextContent(item.period.pt)
      expect(period?.nextElementSibling).toHaveClass('timeline-v__marker')
      expect(row).toHaveTextContent(item.company)
      expect(row).toHaveTextContent(item.role.pt)
      expect(row).toHaveTextContent(item.description.pt)
      item.highlights.pt.forEach(text => expect(row).toHaveTextContent(text))
    })
  })
  it('texto não usa clamp de linhas ou ellipsis para caber no layout', () => {
    const timeline = css('home').slice(css('home').indexOf('.timeline-v {'))
    expect(timeline).not.toMatch(/text-overflow:\s*ellipsis|line-clamp|white-space:\s*nowrap/)
    expect(css('home')).toMatch(/\.timeline-card__desc[^}]*line-height:\s*1.7/)
  })
})
