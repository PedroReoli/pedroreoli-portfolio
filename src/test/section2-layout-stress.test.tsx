import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { AboutSection } from '../components/home/AboutSection'
import { LanguageProvider } from '../context/LanguageContext'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '../..')

const homeCss = fs.readFileSync(path.join(projectRoot, 'src/styles/home.css'), 'utf-8')
const responsiveCss = fs.readFileSync(path.join(projectRoot, 'src/styles/responsive.css'), 'utf-8')

describe('Section 2 — Sobre centralizada (sem card)', () => {
  it('renderiza só título, parágrafo e as 4 estatísticas', () => {
    render(
      <LanguageProvider>
        <AboutSection />
      </LanguageProvider>,
    )

    // Pedro: "tire o card que fale Pedro Lucas Reis · Engenheiro de software ·
    // Full Stack / Arquitetura / IA ... deixe apenas o texto quem eu sou, e o texto
    // abaixo e as 4 partes falando de exp 70% etc."
    expect(document.querySelector('.art-frame')).toBeNull()
    expect(document.querySelector('.art-frame__plaque')).toBeNull()
    expect(document.querySelector('#sobre img')).toBeNull()
    expect(document.querySelector('.about__focus-pills')).toBeNull()
    expect(document.querySelector('.about__col-narrative')).toBeNull()

    const center = document.querySelector('.about__center')
    expect(center).not.toBeNull()
    expect(center?.querySelector('.about__heading')).toHaveTextContent(/quem eu sou/i)
    expect(center?.querySelector('.about__summary')).not.toBeNull()
  })

  it('mantém as 4 estatísticas na ordem e com os valores do conteúdo', () => {
    render(
      <LanguageProvider>
        <AboutSection />
      </LanguageProvider>,
    )

    const cells = Array.from(document.querySelectorAll('.about__center .stats-grid > div'))
    expect(cells.length).toBe(4)
    expect(cells.map((c) => c.querySelector('strong')?.textContent)).toEqual(['04', '70%', '40%', '500+'])
    cells.forEach((cell) => expect(cell.querySelector('span')?.textContent).toBeTruthy())
  })

  it('texto no meio da tela e números abaixo dele', () => {
    render(
      <LanguageProvider>
        <AboutSection />
      </LanguageProvider>,
    )

    const heading = document.querySelector('.about__heading')!.getBoundingClientRect()
    const stats = document.querySelector('.about__center .stats-grid > div')!.getBoundingClientRect()
    expect(stats.top).toBeGreaterThanOrEqual(heading.top)
  })

  it('CSS: coluna central única, sem moldura 3D em lugar nenhum', () => {
    expect(homeCss).toMatch(/\.about__center\s*\{[^}]*max-width:\s*820px/)
    expect(homeCss).toMatch(/\.about__center\s*\{[^}]*text-align:\s*center/)
    // O card/museu saiu: nenhuma regra de art-frame pode sobrar
    expect(homeCss).not.toMatch(/\.art-frame/)
    expect(responsiveCss).not.toMatch(/\.art-frame/)
  })

  it('não trava a altura da seção em pixels: conteúdo centralizado usa a tela do painel', () => {
    expect(homeCss).toMatch(/\.about\s*\{[^}]*min-height:\s*100svh/)
  })
})
