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

  it('apresenta o case corporativo com a galeria técnica autorizada e mascarada', () => {
    const { container } = renderPage()
    expect(screen.getByRole('heading', { name: 'Autocom3', level: 2 })).toBeInTheDocument()
    expect(screen.getByText(/As capturas acima apresentam dados operacionais fictícios/i)).toBeInTheDocument()
    expect(container.querySelectorAll('img').length).toBeGreaterThan(0)
    expect(screen.getByRole('link', { name: /Conhecer a Autocom3/ })).toHaveAttribute('href', 'https://www.autocom3.com.br/')
  })

  it('alterna categorias mantendo parâmetros adicionais e links verificáveis', () => {
    window.history.replaceState(null, '', '/projetos?origem=home')
    renderPage()
    fireEvent.click(screen.getByRole('button', { name: 'Sites para Clientes' }))
    expect(screen.getByRole('button', { name: 'Sites para Clientes' })).toHaveAttribute('aria-pressed', 'true')
    expect(window.location.search).toContain('origem=home')
    expect(window.location.search).toContain('tipo=clientes')
    expect(screen.getByRole('heading', { name: 'Loog Proteção Veicular' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Nexus Brazil' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Organon' })).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Projetos próprios' }))
    expect(screen.getByRole('heading', { name: 'Achilles CDP Agent' })).toBeInTheDocument()
    const organon = screen.getByRole('article', { name: 'Organon' })
    expect(within(organon).getByText(/repositório privado/i)).toBeInTheDocument()
    expect(within(organon).queryByRole('link')).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'GeoAmbiental' })).toBeInTheDocument()
    const geo = screen.getByRole('article', { name: 'GeoAmbiental' })
    expect(within(geo).getByText(/camadas geográficas são ilustrativas/i)).toBeInTheDocument()
    expect(within(geo).getByRole('link', { name: /Código e documentação/ })).toHaveAttribute('href', 'https://github.com/PedroReoli/showcase-geoambiental-vr')
  })

  it('reage à navegação no histórico e aceita o deep link existente', () => {
    window.history.replaceState(null, '', '/projetos?tipo=gerais')
    renderPage()
    expect(screen.getByRole('button', { name: 'Sites para Clientes' })).toHaveAttribute('aria-pressed', 'true')
    window.history.replaceState(null, '', '/projetos?tipo=gerais#argos')
    fireEvent.popState(window)
    expect(screen.getByRole('button', { name: 'Projetos com IA Aplicada' })).toHaveAttribute('aria-pressed', 'true')
    window.history.replaceState(null, '', '/projetos?tipo=corporativo')
    fireEvent.popState(window)
    expect(screen.getByRole('button', { name: 'Corporativo' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('heading', { name: 'Autocom3', level: 2 })).toBeInTheDocument()
  })

  it('apresenta texto e links externos identificados em inglês', () => {
    localStorage.setItem('pedroreoli_language', 'en')
    window.history.replaceState(null, '', '/projetos?tipo=proprios')
    renderPage()
    expect(screen.getByRole('button', { name: 'Personal Projects' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('link', { name: /Code and documentation.*Achilles CDP Agent.*Opens in a new tab/i })).toBeInTheDocument()
  })

  it('abre o Argos direto na categoria de IA e apresenta o escopo dos resultados', () => {
    window.history.replaceState(null, '', '/projetos?tipo=ia#argos')
    renderPage()
    expect(screen.getByRole('button', { name: 'Projetos com IA Aplicada' })).toHaveAttribute('aria-pressed', 'true')
    const argos = screen.getByRole('article', { name: 'Argos-Action-1.5B' })
    expect(argos).toHaveAttribute('id', 'argos')
    expect(within(argos).getByText(/132 casos inéditos.*92%.*28 casos/)).toBeInTheDocument()
    expect(within(argos).getByRole('link', { name: /Artigo sobre a avaliação/ })).toHaveAttribute('href', expect.stringContaining('medium.com'))
  })
})

