import { describe, it, expect } from 'vitest'
import { fireEvent } from '@testing-library/react'
import { renderHome } from './home-fixture'

describe('redimensionamento não reinicia a árvore de leitura', () => {
  it('preserva o mesmo foco em uma ação durante resize e scroll', () => {
    const { container } = renderHome()
    const resume = container.querySelector<HTMLAnchorElement>('.hero__btn-secondary')!
    resume.focus()
    fireEvent.resize(window)
    fireEvent.scroll(window, { target: { scrollY: 4000 } })
    expect(resume).toHaveFocus()
    expect(container.querySelector('.hero__btn-secondary')).toBe(resume)
  })
})
