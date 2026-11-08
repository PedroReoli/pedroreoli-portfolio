import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

/**
 * Regressões da animação de entrada/saída entre seções.
 *
 * Histórico que justifica cada regra:
 *
 *  1. A troca era um fade chapado; virou CSS `transition` com máscara radial. Só que
 *     o Windows do Pedro roda com `prefers-reduced-motion: reduce` ligado, e o
 *     `!important` do base.css zera `transition-duration` E `animation-duration`
 *     (até WAAPI fica em currentTime 0). Medido: `transition-duration: 1e-05s`.
 *     Ou seja: toda animação em CSS ali simplesmente não acontecia.
 *     Solução adotada: o FilmSlide escreve `opacity`/`filter`/`transform` INLINE a
 *     cada scroll, como função da posição. Isso sobrevive ao reduced-motion e é
 *     reversível (subir a página desfaz a fumaça).
 *  2. O painel que saía ficava vivo 90px além da própria fatia, então dois painéis
 *     ficavam visíveis ao mesmo tempo e a seção anterior aparecia fantasma por cima.
 *  3. Se a entrada e a saída espelharem, as duas seções ficam semitransparentes
 *     juntas e o texto vira lama: por isso a saída tem janela mais curta e direção
 *     oposta.
 */

const ROOT = resolve(__dirname, '..')
const FILM_SLIDE = readFileSync(resolve(ROOT, 'components/scene/FilmSlide.tsx'), 'utf8')
const FILM_CSS = readFileSync(resolve(ROOT, 'styles/film.css'), 'utf8')
const BASE_CSS = readFileSync(resolve(ROOT, 'styles/base.css'), 'utf8')
const HOME_CSS = readFileSync(resolve(ROOT, 'styles/home.css'), 'utf8')
const CARDS_CSS = readFileSync(resolve(ROOT, 'styles/projects-cards.css'), 'utf8')

describe('animação de surgir/sumir (dirigida pelo scroll, em JS)', () => {
  it('anima por estilo inline, não por transition/animation', () => {
    expect(FILM_SLIDE).toMatch(/panel\.style\.opacity\s*=/)
    expect(FILM_SLIDE).toMatch(/panel\.style\.filter\s*=/)
    expect(FILM_SLIDE).toMatch(/panel\.style\.transform\s*=/)
    // `transition` no painel seria zerado pelo base.css e brigaria com o inline.
    const panelRule = FILM_CSS.slice(FILM_CSS.indexOf('.film-panel {'))
    expect(panelRule.slice(0, panelRule.indexOf('}'))).not.toMatch(/transition:/)
  })

  it('usa smoothstep como curva (acompanha o dedo, não é timer)', () => {
    expect(FILM_SLIDE).toMatch(/const smoothstep/)
    expect(FILM_SLIDE).toMatch(/x \* x \* \(3 - 2 \* x\)/)
  })

  it('some com o desfoque e sobe na entrada', () => {
    // blur alto na entrada -> 0, subida positiva.
    expect(FILM_SLIDE).toMatch(/14 \* \(1 - entering\)/)
    expect(FILM_SLIDE).toMatch(/18 \* \(1 - entering\)/)
  })

  it('a saída não espelha a entrada: blur menor, direção oposta, janela mais curta', () => {
    expect(FILM_SLIDE).toMatch(/6 \* leaving/) // blur 6px, não 14
    expect(FILM_SLIDE).toMatch(/rise = 18 \* \(1 - entering\) - 12 \* leaving/) // sobe, não desce
    expect(FILM_SLIDE).toMatch(/EXIT_PX = Math\.round\(ENTER_PX \* 0\.55\)/)
  })

  it('é reversível: tudo é função pura do scroll (sem estado acumulado)', () => {
    // Nenhuma leitura de estilo anterior nem flag "já animou": só `y` e a fatia.
    expect(FILM_SLIDE).not.toMatch(/requestAnimationFrame\(.*leaving/)
    expect(FILM_SLIDE).toMatch(/const entering = smoothstep\(\(y - startSlot\) \/ ENTER_PX\)/)
    expect(FILM_SLIDE).toMatch(/const leaving = smoothstep\(\(y - \(endSlot - EXIT_PX\)\) \/ EXIT_PX\)/)
  })

  it('mostra apenas UM painel por vez (sem fantasma da seção anterior)', () => {
    expect(FILM_SLIDE).toMatch(/const visible = y >= startSlot && y < endSlot/)
    expect(FILM_SLIDE).toMatch(/panel\.dataset\.visible = visible \? 'true' : 'false'/)
  })

  it('quem sai fica por baixo e quem entra por cima', () => {
    expect(FILM_SLIDE).toMatch(/panel\.style\.zIndex/)
  })

  it('reduz a amplitude com reduced-motion em vez de desligar', () => {
    expect(FILM_SLIDE).toMatch(/prefers-reduced-motion: reduce/)
    expect(FILM_SLIDE).toMatch(/const reduce = window\.matchMedia/)
    expect(FILM_SLIDE).toMatch(/exitScale = reduce \? 0\.45 : 1/)
  })

  it('não vence o estilo inline com !important nas propriedades animadas', () => {
    // remove os comentários antes de olhar a regra: o texto do comentário cita !important
    const withoutComments = FILM_CSS.split('/*')
      .map((part) => (part.includes('*/') ? part.slice(part.indexOf('*/') + 2) : ''))
      .join('')
    const panelRule = withoutComments.slice(withoutComments.indexOf('.film-panel {'))
    const block = panelRule.slice(0, panelRule.indexOf('}'))
    expect(block.length).toBeGreaterThan(20)
    expect(block).not.toContain('!important')
  })
})

describe('glassmorphism canônico e único', () => {
  it('o filtro do vidro vive em UM token', () => {
    expect(BASE_CSS).toMatch(/--glass-blur:\s*blur\(\d+px\)\s*saturate\(/)
  })

  it('os cards usam o token, sem repetir o valor', () => {
    for (const css of [HOME_CSS, CARDS_CSS]) {
      // valor copiado em cada card foi exatamente o problema que isso evita
      for (const m of css.matchAll(/backdrop-filter:\s*blur\(([\d.]+)px\)/g)) {
        const px = Number(m[1])
        // só valores pontuais (scrim de header) são permitidos fora do token
        expect([6, 10, 12]).toContain(px)
      }
    }
    expect(HOME_CSS.match(/backdrop-filter:\s*var\(--glass-blur\)/g)?.length ?? 0).toBeGreaterThan(3)
  })

  it('todas as superfícies de card têm vidro: blur + borda clara + raio + granulato', () => {
    for (const [css, sel] of [
      [HOME_CSS, '.timeline-card'],
      [HOME_CSS, '.stack-grid article'],
      [HOME_CSS, '.purpose-section__copy'],
      [HOME_CSS, '.about__metrics-card .stats-grid'],
      [CARDS_CSS, '.project-card > a'],
    ] as const) {
      const at = css.indexOf(`${sel} {`)
      expect(at, `${sel} não encontrado`).toBeGreaterThan(-1)
      const rule = css.slice(at, css.indexOf('}', at))
      expect(rule, `${sel} sem backdrop-filter`).toMatch(/backdrop-filter:\s*var\(--glass-blur\)/)
      expect(rule, `${sel} sem borda clara`).toMatch(/(var\(--glass-edge\)|1px solid rgba\(245, 243, 239)/)
      expect(rule, `${sel} sem raio`).toMatch(/border-radius:\s*var\(--radius-/)
    }
  })

  it('o granulato vem do asset do MediaForge, em escala fixa', () => {
    expect(BASE_CSS).toMatch(/--glass-grain:\s*url\('\/media\/ui\/glass-noise\.svg'\)/)
    expect(BASE_CSS).toMatch(/--glass-grain-size:/)
  })
})
