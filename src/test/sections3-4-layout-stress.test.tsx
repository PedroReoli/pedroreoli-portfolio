import { describe, it, expect } from 'vitest'
import { homeContent, technologyContent } from '../data/content'
import { renderHome } from './home-fixture'

describe('Projetos da Home e ferramentas: conteúdo completo', () => {
  it('expõe descrição e destino de cada projeto sem depender de hover', () => {
    const { container } = renderHome()
    const cards = container.querySelectorAll('.home-project')
    expect(cards).toHaveLength(homeContent.featuredProjects.length)
    homeContent.featuredProjects.forEach((project, i) => {
      expect(cards[i]).toHaveTextContent(project.title)
      expect(cards[i].querySelector('.project-card__desc')?.textContent?.length).toBeGreaterThan(50)
      expect(cards[i].querySelector('.project-card__desc')).not.toHaveTextContent(/92.2%|Windows nativo/)
      expect(cards[i].querySelector('a')).toHaveAttribute('href', project.href)
    })
    expect(cards[2]).toHaveTextContent('Argos-Action-1.5B')
    expect(cards[2].querySelector('a')).toHaveAttribute('href', '/projetos?tipo=ia#argos')
  })
  it('expõe todos os grupos e ferramentas com seus ícones', () => {
    const { container } = renderHome()
    const groups = container.querySelectorAll('.stack-grid > article')
    expect(groups).toHaveLength(technologyContent.groups.length)
    technologyContent.groups.forEach((group, i) => {
      expect(groups[i]).toHaveTextContent(group.title.pt)
      group.tools.forEach(tool => expect(groups[i]).toHaveTextContent(tool.name))
      expect(groups[i].querySelectorAll('li')).toHaveLength(group.tools.length)
    })
  })
})
