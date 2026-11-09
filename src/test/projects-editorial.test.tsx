import { fireEvent, render, screen, within } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { LanguageProvider } from '@/context/LanguageContext'
import { RouterProvider } from '@/context/RouterContext'
import { ProjectsPage } from '@/pages/ProjectsPage'

function renderPage() {
  return render(<LanguageProvider><RouterProvider><ProjectsPage /></RouterProvider></LanguageProvider>)
}

describe('Página de Projetos', () => {
  beforeEach(() => {
    window.history.replaceState(null, '', '/projetos')
    localStorage.clear()
  })

  it('apresenta o case corporativo sem carregar capturas não liberadas', () => {
    const { container } = renderPage()
    expect(screen.getByRole('heading', { name: 'Autocom3', level: 2 })).toBeInTheDocument()
    expect(screen.getByText('As interfaces não são exibidas aqui para preservar informações corporativas.')).toBeInTheDocument()
    expect(container.querySelectorAll('img')).toHaveLength(0)
    expect(screen.getByRole('link', { name: /Conhecer a Autocom3/ })).toHaveAttribute('href', 'https://www.autocom3.com.br/')
  })

  it('alterna categorias mantendo parâmetros adicionais e links verificáveis', () => {
    window.history.replaceState(null, '', '/projetos?origem=home')
    renderPage()
    fireEvent.click(screen.getByRole('button', { name: 'Independentes' }))
    expect(screen.getByRole('button', { name: 'Independentes' })).toHaveAttribute('aria-pressed', 'true')
    expect(window.location.search).toContain('origem=home')
    expect(window.location.search).toContain('tipo=gerais')
    expect(screen.getByRole('heading', { name: 'Achilles CDP Agent' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'GeoAmbiental' })).toBeInTheDocument()
    const geo = screen.getByRole('article', { name: 'GeoAmbiental' })
    expect(within(geo).getByText(/camadas geográficas são ilustrativas/i)).toBeInTheDocument()
    expect(within(geo).getByRole('link', { name: /Código e documentação/ })).toHaveAttribute('href', 'https://github.com/PedroReoli/showcase-geoambiental-vr')
    expect(screen.queryByRole('heading', { name: 'Organon' })).not.toBeInTheDocument()
  })

  it('reage à navegação no histórico e aceita o deep link existente', () => {
    window.history.replaceState(null, '', '/projetos?tipo=gerais')
    renderPage()
    expect(screen.getByRole('button', { name: 'Independentes' })).toHaveAttribute('aria-pressed', 'true')
    window.history.replaceState(null, '', '/projetos?tipo=corporativo')
    fireEvent.popState(window)
    expect(screen.getByRole('button', { name: 'Corporativo' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('heading', { name: 'Autocom3', level: 2 })).toBeInTheDocument()
  })

  it('apresenta texto e links externos identificados em inglês', () => {
    localStorage.setItem('pedroreoli_language', 'en')
    window.history.replaceState(null, '', '/projetos?tipo=gerais')
    renderPage()
    expect(screen.getByRole('button', { name: 'Independent' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('link', { name: /Code and documentation.*Achilles CDP Agent.*Opens in a new tab/i })).toBeInTheDocument()
  })
})

