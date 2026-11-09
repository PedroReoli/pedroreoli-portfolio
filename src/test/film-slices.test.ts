import { describe, it, expect } from 'vitest'
import { fireEvent } from '@testing-library/react'
import { homeContent } from '../data/content'
import { renderHome, css } from './home-fixture'

describe('altura segue conteúdo, não fatias de viewport', () => {
  it('experiência mantém todos os capítulos após resize de altura', () => {
    const { container } = renderHome()
    const original = window.innerHeight
    for (const height of [300, 844, 914, 1080]) {
      Object.defineProperty(window, 'innerHeight', { configurable: true, value: height })
      fireEvent.resize(window)
      const rows = container.querySelectorAll('#experiencia .timeline-v__item')
      expect(rows).toHaveLength(homeContent.experienceItems.length)
      rows.forEach(row => expect(row).toBeVisible())
    }
    Object.defineProperty(window, 'innerHeight', { configurable: true, value: original })
  })
  it('não existe altura global calculada pelo número de clipes', () => {
    const { container } = renderHome()
    expect(container.querySelector('.home')).not.toHaveStyle('--film-count: 7')
    expect(css('home')).not.toMatch(/--film-count|TALL_SLICES|100svh/)
  })
})
