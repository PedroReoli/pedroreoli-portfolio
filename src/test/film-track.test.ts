import { describe, it, expect } from 'vitest'
import { fireEvent } from '@testing-library/react'
import { renderHome } from './home-fixture'

describe('scroll não é comando de reprodução', () => {
  it('rolagem não procura/ativa clipes das seções de leitura', () => {
    const { container } = renderHome()
    for (const y of [0, 914, 1828, 2742, 3656, 4570, 0]) fireEvent.scroll(window, { target: { scrollY: y } })
    expect(container.querySelectorAll('.film-media')).toHaveLength(1)
    expect(container.querySelector('.film-media')?.closest('section')?.id).toBe('hero')
    expect(container.querySelector('#experiencia video')).toBeNull()
  })
})
