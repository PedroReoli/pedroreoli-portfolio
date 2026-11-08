import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { sliceStart, sliceHeight, totalSliceWeight, sliceWeight, TALL_SLICES } from '../components/scene/slices'
import { sceneClips } from '../data/content'

/**
 * Fatias de altura diferente.
 *
 * A fita assumia que TODA seção ocupava exatamente uma tela: a conta era
 * `índice × innerHeight`, repetida no FilmSlide, no useFrameScroll e no CSS. Quando a
 * Experiência passou a ocupar mais de uma tela (Pedro: "o tamanho da sessão de
 * experiência tem que ser mais alto"), as três contas discordaram — o frame do vídeo,
 * a visibilidade do painel e a altura da página deixaram de bater, e o sintoma é
 * exatamente o que ele descreveu: a imagem "não encaixa" na troca de seção.
 *
 * Esta suíte prende a fonte única.
 */

const ROOT = resolve(__dirname, '..')
const read = (rel: string) => readFileSync(resolve(ROOT, rel), 'utf8')

const IDS = sceneClips.clips.map((c) => c.id)
const VH = 900

describe('slices — alturas das fatias da fita', () => {
  it('a Experiência é mais alta que uma tela e as demais não', () => {
    expect(TALL_SLICES['experience-loop']).toBeGreaterThan(1)
    for (const id of IDS) {
      if (id === 'experience-loop') continue
      expect(sliceWeight(id)).toBe(1)
    }
  })

  it('fatias encostam sem buraco e sem sobreposição', () => {
    for (let i = 0; i < IDS.length - 1; i += 1) {
      const end = sliceStart(IDS, i, VH) + sliceHeight(IDS, i, VH)
      expect(end).toBe(sliceStart(IDS, i + 1, VH))
    }
  })

  it('a soma das fatias bate com o começo da última + a altura dela', () => {
    const total = totalSliceWeight(IDS)
    const lastIndex = IDS.length - 1
    const end = sliceStart(IDS, lastIndex, VH) + sliceHeight(IDS, lastIndex, VH)
    expect(end).toBeCloseTo(total * VH)
  })

  it('id desconhecido cai em 1 tela (nunca em 0, que travaria a fita)', () => {
    expect(sliceWeight(undefined)).toBe(1)
    expect(sliceWeight('clipe-que-nao-existe')).toBe(1)
  })
})

describe('slices — a conta não é duplicada no código', () => {
  it('FilmSlide e useFrameScroll usam os helpers', () => {
    for (const file of ['components/scene/FilmSlide.tsx', 'components/scene/useFrameScroll.ts']) {
      const src = read(file)
      expect(src, `${file} deveria usar sliceStart`).toMatch(/sliceStart/)
      expect(src, `${file} deveria usar sliceHeight`).toMatch(/sliceHeight/)
    }
  })

  it('nenhum lugar volta a calcular a fatia como índice × viewport', () => {
    for (const file of [
      'components/scene/FilmSlide.tsx',
      'components/scene/useFrameScroll.ts',
    ]) {
      const src = read(file)
      expect(src, `${file} voltou a assumir 1 tela por seção`).not.toMatch(
        /(index|slot|covering|clipIndex)\s*\*\s*window\.innerHeight/,
      )
    }
  })

  it('o CSS não fixa a altura da fita em número mágico', () => {
    const css = read('styles/film.css')
    // a altura vem de --film-count, escrita a partir de slices.ts
    expect(css).toMatch(/calc\(100svh \* var\(--film-count/)
  })
})

describe('Experiência — os cards têm conteúdo completo', () => {
  const css = read('styles/film.css')

  it('descrição, destaques e stack NÃO estão escondidos', () => {
    // Estavam com display:none para caber em uma tela, e o card ficava vazio.
    for (const cls of [
      '.timeline-card__desc',
      '.timeline-card__highlights',
      '.timeline-card__footer',
    ]) {
      const rule = css.match(new RegExp(`\\.film-panel > #experiencia ${cls.replace('.', '\\.')} \\{([^}]*)\\}`))
      if (rule) {
        expect(rule[1], `${cls} escondido`).not.toMatch(/display:\s*none/)
      }
    }
  })

  it('a timeline não é um scroller vertical (era o que prendia a roda)', () => {
    const rules = [...css.matchAll(/\.film-panel > #experiencia \.timeline-v \{([^}]*)\}/g)].map((m) => m[1])
    expect(rules.length).toBeGreaterThan(0)
    rules.forEach((body) => {
      expect(body).not.toMatch(/overflow-y:\s*(auto|scroll)/)
    })
  })
})
