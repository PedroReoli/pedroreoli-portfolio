import { beforeEach, describe, expect, it } from 'vitest'
import { fireEvent, render, screen, within } from '@testing-library/react'
import { MediaPage } from '@/pages/MediaPage'
import { LanguageProvider, useLanguage } from '@/context/LanguageContext'
import { interfaceContent, mediaContent } from '@/data/content'
import { ReferenceList } from '@/components/notes/ReferenceList'
import { NotesSectionNav } from '@/components/notes/NotesSectionNav'
import { selectPublicReferences } from '@/components/notes/notesEditorial'

function LanguageToggle() {
  const { toggleLanguage } = useLanguage()
  return <button onClick={toggleLanguage}>Change language</button>
}

function renderPage() {
  return render(<LanguageProvider><LanguageToggle /><MediaPage /></LanguageProvider>)
}

describe('Notes editorial experience', () => {
  beforeEach(() => { localStorage.clear(); window.history.replaceState(null, '', '/midia-blog') })

  it('distinguishes publications, press, repository and profile', () => {
    const { container } = renderPage()
    expect(screen.getByRole('heading', { level: 1, name: 'NOTAS' })).toBeInTheDocument()
    expect(screen.getAllByRole('article')).toHaveLength(4)
    const press = screen.getByRole('link', { name: /FalaAtípica em destaque no UniFOA.*Ler reportagem/ })
    expect(press).toHaveAttribute('href', interfaceContent.mediaArchive.feature.href)
    expect(screen.getByRole('link', { name: /Agentes que operam.*Repositório no GitHub/ })).toHaveAttribute('href', 'https://github.com/PedroReoli/Achilles-CDP-Agent')
    expect(screen.getByRole('link', { name: /Explorar repositórios públicos/ })).toHaveAttribute('href', 'https://github.com/PedroReoli')
    expect(container.querySelector('a[href$="/organon"]')).toBeNull()
    expect(container.querySelector('time, dialog, main')).toBeNull()
    expect(screen.getByText('1 referência')).toBeInTheDocument()
    expect(screen.queryByText('03 referências')).not.toBeInTheDocument()
  })

  it('publishes both Argos entries with their own evidence and deep links', () => {
    renderPage()
    const section = screen.getByRole('region', { name: 'Publicações' })
    const evaluation = within(section).getByRole('article', { name: /132 casos inéditos/ })
    const prototype = within(section).getByRole('article', { name: /árvore de acessibilidade/ })

    expect(evaluation).toHaveAttribute('id', 'argos-avaliacao')
    expect(evaluation).toHaveTextContent('92% das respostas')
    expect(evaluation).toHaveTextContent('os 28 casos')
    expect(within(evaluation).getByRole('link', { name: 'Ler no Medium' })).toHaveAttribute('href', expect.stringContaining('medium.com/'))
    expect(within(evaluation).getByRole('link', { name: 'Notebook e dados no Kaggle' })).toHaveAttribute('href', expect.stringContaining('kaggle.com/'))
    expect(prototype).toHaveTextContent('87,2 tokens')
    expect(within(prototype).getByRole('link', { name: 'Playground estático' })).toHaveAttribute('href', expect.stringContaining('huggingface.co/spaces/'))
  })

  it('preserves safe external targets and announces their new context', () => {
    const { container } = renderPage()
    const links = container.querySelectorAll<HTMLAnchorElement>('a[target="_blank"]')
    expect(links).toHaveLength(9)
    links.forEach((link) => {
      expect(link.rel).toContain('noopener')
      expect(link.rel).toContain('noreferrer')
      expect(link).toHaveAccessibleDescription('Abre em nova aba')
    })
  })

  it('switches page copy, references and SEO together without changing destinations', () => {
    renderPage()
    fireEvent.click(screen.getByRole('button', { name: 'Change language' }))
    expect(screen.getByRole('heading', { level: 1, name: 'NOTES' })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'On this page' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Publications' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Read on Medium' })).toHaveAttribute('href', mediaContent.publications[0].links[0].href)
    expect(screen.getByText('1 reference')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Agents that operate.*GitHub repository/ })).toHaveAttribute('href', 'https://github.com/PedroReoli/Achilles-CDP-Agent')
    expect(document.title).toContain('Notes & Media')
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toMatch(/\/midia-blog$/)
  })

  it('keeps the press link usable after image failure and after a language change', () => {
    renderPage()
    const image = screen.getByRole('img', { name: interfaceContent.mediaArchive.pt.imageAlt })
    expect(image).toHaveAttribute('width', '1280')
    expect(image).toHaveAttribute('height', '577')
    fireEvent.error(image)
    expect(screen.getByRole('status')).toHaveTextContent('A imagem não carregou')
    expect(screen.getByRole('link', { name: /FalaAtípica em destaque/ })).toHaveAttribute('href', interfaceContent.mediaArchive.feature.href)
    fireEvent.click(screen.getByRole('button', { name: 'Change language' }))
    expect(screen.getByRole('status')).toHaveTextContent('The image could not load')
  })

  it('uses native section anchors and moves keyboard focus to the destination', () => {
    renderPage()
    const nav = screen.getByRole('navigation', { name: 'Nesta página' })
    expect(within(nav).getByRole('link', { name: 'Publicações' })).toHaveAttribute('href', '#publicacoes')
    const link = within(nav).getByRole('link', { name: 'Código e referências' })
    expect(link).toHaveAttribute('href', '#referencias')
    link.focus()
    fireEvent.click(link)
    expect(document.getElementById('referencias')).toHaveFocus()
    expect(document.getElementById('referencias')).toHaveAttribute('tabindex', '-1')
    link.focus()
    fireEvent.click(link, { ctrlKey: true })
    expect(link).toHaveFocus()
  })

  it.each(['pt', 'en'] as const)('provides an honest empty reference state in %s', (language) => {
    render(<ReferenceList references={[]} language={language} />)
    expect(screen.getByRole('status')).toBeInTheDocument()
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
    expect(screen.queryByRole('article')).not.toBeInTheDocument()
  })

  it('does not create empty navigation or automatically publish unreviewed entries', () => {
    render(<NotesSectionNav sections={[]} label="Index" />)
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument()
    expect(selectPublicReferences([])).toEqual({ references: [], profile: undefined })
    const result = selectPublicReferences([...mediaContent.mediaNotes, mediaContent.mediaNotes[0]])
    expect(result.references).toHaveLength(1)
    expect(result.profile?.href).toBe('https://github.com/PedroReoli')
  })
})
