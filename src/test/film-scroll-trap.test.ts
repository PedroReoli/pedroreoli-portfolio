import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '../..')

const filmCss = fs.readFileSync(path.join(projectRoot, 'src/styles/film.css'), 'utf-8')

/** Extrai o corpo de uma regra pelo seletor exato. */
function ruleBody(selector: string): string {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const match = filmCss.match(new RegExp(escaped + '\\s*\\{([^}]*)\\}'))
  return match ? match[1] : ''
}

/**
 * Bug relatado pelo Pedro: "quando chego na seção de experiência eu fico preso e
 * não consigo scrollar de volta pra cima".
 *
 * Causa: o painel da Experiência ficou com `overflow-y: auto` + `overscroll-behavior:
 * contain`. O conteúdo é mais alto que a viewport, então a roda entrava no scroll
 * interno do painel e nunca mais voltava para a página — medido: `pageY` travado em
 * 4545 enquanto só o painel rolava.
 *
 * A regra abaixo trava a correção: nenhum painel da fita pode virar container de
 * rolagem vertical.
 */
describe('Film strip — nenhum painel prende a rolagem vertical', () => {
  const sectionRule = ruleBody('.film-panel > section')

  it('o painel base não cria área de rolagem vertical', () => {
    expect(sectionRule).toMatch(/overflow:\s*hidden/)
    expect(sectionRule).not.toMatch(/overflow-y:\s*(auto|scroll)/)
    expect(sectionRule).not.toMatch(/overscroll-behavior[^;]*contain/)
  })

  it('o painel da Experiência não volta a ser um scroller vertical', () => {
    const expRule = ruleBody('.film-panel > #experiencia')
    expect(expRule).toBeTruthy()
    expect(expRule).toMatch(/overflow:\s*hidden/)
    expect(expRule).not.toMatch(/overflow-y:\s*(auto|scroll)/)
    expect(expRule).not.toMatch(/overscroll-behavior:\s*contain/)
  })

  it('a timeline da Experiência rola só na horizontal, nunca na vertical', () => {
    const rules = [...filmCss.matchAll(/\.timeline-v\s*\{([^}]*)\}/g)].map((m) => m[1])
    expect(rules.length).toBeGreaterThan(0)
    rules.forEach((body) => {
      expect(body).not.toMatch(/overflow-y:\s*(auto|scroll)/)
      expect(body).not.toMatch(/grid-auto-rows:\s*minmax\(0/)
    })
  })
})
