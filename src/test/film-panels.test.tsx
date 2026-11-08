import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { sceneClips } from '../data/content'
import { LanguageProvider } from '../context/LanguageContext'
import { RouterProvider } from '../context/RouterContext'
import { HomePage } from '../pages/HomePage'

/**
 * Bug 5→6: o HomePage montava 6 seções + 1 painel de rodapé = 7 painéis, mas só
 * existem 6 clipes. O painel extra começava exatamente no maxScroll, então a seção 6
 * perdia o espaço de rolagem e o topo dela/da troca não apareciam. A regra abaixo
 * impede a volta do desalinhamento: um painel por clipe, sem sobra.
 */
describe('Film strip — um painel por clipe', () => {
  const renderHome = () =>
    render(
      <LanguageProvider>
        <RouterProvider>
          <HomePage />
        </RouterProvider>
      </LanguageProvider>,
    )

  it('o número de painéis de texto é igual ao número de clipes', () => {
    const { container } = renderHome()
    const panels = container.querySelectorAll('[data-film-panel]')
    const slides = container.querySelectorAll('[data-film-slide]')

    expect(slides.length).toBe(sceneClips.clips.length)
    expect(panels.length).toBe(sceneClips.clips.length)
  })

  it('os índices dos painéis são contíguos e começam em zero', () => {
    const { container } = renderHome()
    const indexes = Array.from(container.querySelectorAll('[data-film-panel]')).map((p) =>
      Number((p as HTMLElement).dataset.filmPanel),
    )
    expect(indexes).toEqual(sceneClips.clips.map((_, i) => i))
  })

  it('o rodapé mora dentro do último painel, não num painel próprio', () => {
    const { container } = renderHome()
    const footer = container.querySelector('footer')
    expect(footer).not.toBeNull()

    const hostPanel = footer?.closest('[data-film-panel]')
    expect(hostPanel).not.toBeNull()
    // último painel = último clipe
    expect((hostPanel as HTMLElement).dataset.filmPanel).toBe(String(sceneClips.clips.length - 1))
    expect(container.querySelectorAll('footer').length).toBe(1)
  })

  it('a seção 07 contato possui conteúdo completo (kicker 07, prompt, headline, descrição e contatos)', () => {
    const { container } = renderHome()
    const footer = container.querySelector('footer#contato')
    expect(footer).not.toBeNull()

    // Kicker 07
    const kicker = footer?.querySelector('.section-kicker')
    expect(kicker?.textContent).toContain('07')

    // Prompt & Headline & Descrição
    const prompt = footer?.querySelector('.contact-section__prompt')
    expect(prompt).not.toBeNull()
    expect(prompt?.textContent?.trim().length).toBeGreaterThan(0)

    const headline = footer?.querySelector('.contact-section__headline')
    expect(headline).not.toBeNull()

    const desc = footer?.querySelector('.contact-section__description')
    expect(desc).not.toBeNull()
    expect(desc?.textContent?.trim().length).toBeGreaterThan(0)

    // Grid de contatos e botão voltar ao topo
    const links = footer?.querySelectorAll('.contact-grid a')
    expect(links?.length).toBe(4)

    const backToTop = footer?.querySelector('.contact-section__bottom button')
    expect(backToTop).not.toBeNull()
  })
})
