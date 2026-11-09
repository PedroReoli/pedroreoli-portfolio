import { createElement } from 'react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import { FilmSlide } from '../components/scene/FilmSlide'
import { sceneClips } from '../data/content'

afterEach(() => vi.restoreAllMocks())

describe('palco de mídia não controla o documento', () => {
  it.each(sceneClips.clips)('mantém fallback de $id sem vídeo pronto', clip => {
    const { container } = render(createElement(FilmSlide, { clip, index: 0 }))
    expect(container.querySelector('img')).toHaveAttribute('src', clip.poster)
    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true')
    fireEvent.scroll(window)
    expect(container.querySelector('img')).toBeVisible()
  })
  it('falha de imagem mantém a superfície, sem quebrar leitura', () => {
    const { container } = render(createElement(FilmSlide, { clip: sceneClips.clips[0], index: 0 }))
    fireEvent.error(container.querySelector('img')!)
    expect(container.querySelector('img')).toBeNull()
    expect(container.querySelector('.film-media')).toBeInTheDocument()
  })
  it('erro de vídeo no desktop devolve o poster e remove o player', () => {
    const original = window.matchMedia('(min-width: 900px)')
    vi.spyOn(window, 'matchMedia').mockImplementation(query => ({
      ...original, media: query, matches: query.includes('min-width: 900px'),
    }))
    const { container } = render(createElement(FilmSlide, { clip: sceneClips.clips[0], index: 0 }))
    const video = container.querySelector('video')!
    expect(video).not.toBeNull()
    fireEvent.playing(video)
    expect(video).toHaveAttribute('data-playing', 'true')
    fireEvent.error(video)
    expect(container.querySelector('video')).toBeNull()
    expect(container.querySelector('img')).toHaveAttribute('src', sceneClips.clips[0].poster)
  })
})
