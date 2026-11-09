import { describe, expect, it, vi, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useReveal } from '../hooks/useReveal'

afterEach(() => vi.restoreAllMocks())

describe('entrada decorativa sem esconder leitura', () => {
  it('não depende de observer para exibir o texto', () => {
    const root = document.createElement('section')
    root.innerHTML = '<p data-reveal>Conteúdo completo</p>'
    const { unmount } = renderHook(() => useReveal({ current: root }))
    expect(root.querySelector('p')!.style.opacity).toBe('')
    expect(root.querySelector('p')!.hidden).toBe(false)
    unmount()
    expect(root.querySelector('p')!.style.transform).toBe('')
  })
  it('reduced motion não cria animação nem escreve estilos que ocultem', () => {
    const match = window.matchMedia('(prefers-reduced-motion: reduce)')
    vi.spyOn(window, 'matchMedia').mockReturnValue({ ...match, matches: true })
    const root = document.createElement('section')
    root.innerHTML = '<p data-reveal>Texto</p>'
    const animate = vi.fn()
    root.querySelector('p')!.animate = animate
    renderHook(() => useReveal({ current: root }))
    act(() => window.dispatchEvent(new Event('scroll')))
    expect(animate).not.toHaveBeenCalled()
    expect(root.querySelector('p')!.style.cssText).toBe('')
  })
})
