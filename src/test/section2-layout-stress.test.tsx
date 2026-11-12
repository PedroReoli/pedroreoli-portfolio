import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { AboutSection } from '../components/home/AboutSection'
import { LanguageProvider } from '../context/LanguageContext'
import { interfaceContent } from '../data/content'

describe('Sobre: conteúdo real sem cartão sobre o rosto', () => {
  it('preserva título, resumo e todas as estatísticas em ordem', () => {
    const { container } = render(<LanguageProvider><AboutSection /></LanguageProvider>)
    expect(container.querySelector('h2')).toHaveTextContent(interfaceContent.about.pt.title)
    expect(container.querySelector('.about__summary')).toHaveTextContent(interfaceContent.about.pt.summary)
    const groups = [...container.querySelectorAll('.stats-grid[data-scroll-chapter]')]
    expect(groups.map(group => group.children.length)).toEqual([4, 4])
    const stats = container.querySelectorAll('.stats-grid > div')
    expect(stats).toHaveLength(interfaceContent.about.stats.length)
    interfaceContent.about.stats.forEach((stat, i) => {
      expect(stats[i]).toHaveTextContent(stat.value)
      expect(stats[i]).toHaveTextContent(stat.pt)
    })
  })
})
