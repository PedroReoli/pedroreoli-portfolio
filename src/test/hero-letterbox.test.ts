import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

/**
 * Faixas azuis nas laterais do hero.
 *
 * Pedro mandou uma captura (1886×914) com faixas ciano coladas nas laterais. Duas
 * coisas somadas causavam isso, e nenhuma delas vinha do asset:
 *
 *  1. O clipe é 16:9 (1.778). Numa janela mais larga que isso — 1886/914 = 2.063 —
 *     `object-fit: contain` LETTERBOXA o vídeo: ele encolhe para caber inteiro e
 *     deixa sobras dos dois lados.
 *  2. As sobras mostram o fundo do container, que usa `--color-bg`. O valor
 *     `#2596be` (ciano) foi definido como "cor de fundo canônica" no commit
 *     `c3d6e27`, então o letterbox ficou azul em vez de discreto.
 *
 * Correção mínima: `cover` no vídeo/poster da fita. Em 16:9 nada é cortado, então o
 * enquadramento aprovado (busto e círculo) fica idêntico; em telas mais largas o
 * vídeo preenche e o azul deixa de aparecer.
 */

const FILM_CSS = readFileSync(resolve(__dirname, '../styles/film.css'), 'utf8')
  .split(String.fromCharCode(13))
  .join('')

/** Primeiro bloco de declarações cujo seletor contém o termo dado. */
function firstRuleContaining(selectorPart: string): string {
  const at = FILM_CSS.indexOf(selectorPart)
  if (at === -1) return ''
  const open = FILM_CSS.indexOf('{', at)
  const close = FILM_CSS.indexOf('}', open)
  return open === -1 || close === -1 ? '' : FILM_CSS.slice(open + 1, close)
}

const VIDEO_RULE = firstRuleContaining('.film-slide__video {')

describe('hero não letterboxa (faixas laterais)', () => {
  it('a regra do vídeo da fita existe e usa cover', () => {
    expect(VIDEO_RULE).not.toBe('')
    expect(VIDEO_RULE).toMatch(/object-fit:\s*cover/)
  })

  it('nenhuma declaração principal usa contain no vídeo', () => {
    // a única ocorrência permitida é dentro de @media (tela estreita), que já usa cover
    const principais = FILM_CSS.split('@media')[0]
    const videoBlocks = [...principais.matchAll(/object-fit:\s*(\w+)/g)].map((m) => m[1])
    expect(videoBlocks).toContain('cover')
    expect(videoBlocks).not.toContain('contain')
  })

  it('o poster segue a mesma regra do vídeo', () => {
    const at = FILM_CSS.indexOf('.film-slide__poster,')
    expect(at).toBeGreaterThan(-1)
    const open = FILM_CSS.indexOf('{', at)
    const close = FILM_CSS.indexOf('}', open)
    const body = FILM_CSS.slice(open + 1, close)
    expect(body).toMatch(/object-fit:\s*cover/)
  })

  it('mantém o busto ancorado embaixo, como no enquadramento aprovado', () => {
    expect(VIDEO_RULE).toMatch(/object-position:\s*center bottom/)
  })

  it('não introduz translate/scale no vídeo (isso era a paralaxe)', () => {
    expect(VIDEO_RULE).toMatch(/transform:\s*none/)
  })
})

describe('a cor de fundo não vira faixa visível', () => {
  it('o container do slide não pinta o ciano da captura', () => {
    const sticky = firstRuleContaining('.film-slide__sticky {')
    // remove comentários: eles citam a cor de propósito, para documentar o bug
    const semComentarios = sticky
      .split('/*')
      .map((part) => (part.includes('*/') ? part.slice(part.indexOf('*/') + 2) : ''))
      .join('')
    expect(semComentarios).toMatch(/background:/)
    expect(semComentarios).not.toMatch(/#2596be/i)
  })

  it('o clipe é 16:9 e a janela da captura é mais larga (contexto do bug)', () => {
    expect(1886 / 914).toBeGreaterThan(16 / 9)
  })
})
