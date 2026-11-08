import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

/**
 * Regressões da animação de entrada/saída entre seções.
 *
 * A troca de sessão já foi um fade chapado; agora ela dissolve como água/fumaça
 * (opacidade + máscara radial + desfoque curto). Dois erros já aconteceram aqui e
 * não podem voltar:
 *
 *  1. o painel que saía continuava visível 90px além da própria fatia, então DOIS
 *     painéis ficavam ligados ao mesmo tempo e a seção anterior aparecia fantasma
 *     por cima da próxima;
 *  2. a saída era mais longa que a entrada, o que piorava o fantasma.
 *
 * O teste lê o código-fonte e o CSS: é barato e pega exatamente esses dois casos.
 */

const ROOT = resolve(__dirname, '..')
const FILM_SLIDE = readFileSync(resolve(ROOT, 'components/scene/FilmSlide.tsx'), 'utf8')
const FILM_CSS = readFileSync(resolve(ROOT, 'styles/film.css'), 'utf8')

describe('fade entre seções (painel da fita)', () => {
  it('mantém apenas UM painel visível por vez', () => {
    // O flag `leaving` estendia a vida do painel para além da fatia dele: o painel
    // que saía continuava ligado enquanto o próximo já tinha entrado.
    expect(FILM_SLIDE).not.toMatch(/dataset\.leaving\s*=\s*'true'/)
    // A visibilidade é decidida só pela fatia (inSlot).
    expect(FILM_SLIDE).toMatch(/panel\.dataset\.visible\s*=\s*inSlot\s*\?\s*'true'\s*:\s*'false'/)
  })

  it('remove o HANDOFF que sobrepunha dois painéis', () => {
    expect(FILM_SLIDE).not.toMatch(/const HANDOFF/)
    expect(FILM_SLIDE).not.toContain('startSlot + window.innerHeight + HANDOFF')
  })

  it('anima a entrada com máscara e desfoque (dissolução tipo água/fumaça)', () => {
    expect(FILM_CSS).toMatch(/\.film-panel\s*\{[\s\S]*?mask-image:\s*radial-gradient/)
    expect(FILM_CSS).toMatch(/\.film-panel\s*\{[\s\S]*?filter:\s*blur\(/)
    // O estado visível precisa abrir a máscara e zerar o desfoque.
    expect(FILM_CSS).toMatch(/data-visible='true'[\s\S]*?mask-size:\s*175%/)
    expect(FILM_CSS).toMatch(/data-visible='true'[\s\S]*?filter:\s*blur\(0\)/)
  })

  it('mantém a saída mais curta que a entrada', () => {
    const base = FILM_CSS.slice(FILM_CSS.indexOf('.film-panel {'))
    const visibleAt = FILM_CSS.indexOf(".film-panel[data-visible='true']")
    const baseRule = base.slice(0, base.indexOf('}'))
    const visibleRule = FILM_CSS.slice(visibleAt, FILM_CSS.indexOf('}', visibleAt))

    const seconds = (rule: string) => {
      const list = [...rule.matchAll(/(?:opacity|filter|mask-size)\s+([\d.]+)s/g)].map((m) => Number(m[1]))
      return Math.max(...list)
    }

    expect(seconds(visibleRule)).toBeGreaterThan(seconds(baseRule))
  })

  it('respeita prefers-reduced-motion (sem máscara nem desfoque)', () => {
    const reduced = FILM_CSS.slice(FILM_CSS.indexOf('prefers-reduced-motion'))
    expect(reduced).toMatch(/\.film-panel\s*\{[\s\S]*?mask-image:\s*none/)
    expect(reduced).toMatch(/\.film-panel\s*\{[\s\S]*?filter:\s*none/)
  })
})

describe('glassmorphism canônico dos cards', () => {
  const files = ['styles/home.css', 'styles/projects-cards.css'] as const

  it('nenhum card usa backdrop-filter por var() (o motor não expande)', () => {
    for (const file of files) {
      const css = readFileSync(resolve(ROOT, file), 'utf8')
      expect(css).not.toMatch(/backdrop-filter:\s*var\(/)
    }
  })

  it('os cards principais têm blur literal', () => {
    const home = readFileSync(resolve(ROOT, 'styles/home.css'), 'utf8')
    const cards = readFileSync(resolve(ROOT, 'styles/projects-cards.css'), 'utf8')
    for (const [css, sel] of [
      [home, '.timeline-card'],
      [home, '.stack-grid article'],
      [home, '.purpose-section__copy'],
      [home, '.about__metrics-card .stats-grid'],
      [cards, '.project-card > a'],
    ] as const) {
      const at = css.indexOf(`${sel} {`)
      expect(at, `${sel} não encontrado`).toBeGreaterThan(-1)
      const rule = css.slice(at, css.indexOf('}', at))
      expect(rule, `${sel} sem backdrop-filter`).toMatch(/backdrop-filter:\s*blur\(/)
    }
  })
})
