import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const filmCss = readFileSync(resolve(__dirname, '../styles/film.css'), 'utf8')

function ruleBody(source: string, selector: string): string {
  const start = source.indexOf(selector)
  if (start < 0) return ''
  const open = source.indexOf('{', start)
  return source.slice(open + 1, source.indexOf('}', open))
}

describe('enquadramento do poster e vídeo', () => {
  it('preserva contain, posição e escala na regra compartilhada desktop', () => {
    const body = ruleBody(filmCss, '.film-slide__poster,')
    expect(body).toMatch(/object-fit:\s*contain/)
    expect(body).toMatch(/object-position:\s*center bottom/)
    expect(body).toMatch(/transform:\s*none/)
  })

  it('preserva cover e center top no override mobile preexistente', () => {
    const mobile = filmCss.slice(filmCss.indexOf('@media (max-width: 768px)'))
    const body = ruleBody(mobile, '.film-slide__poster,')
    expect(body).toMatch(/object-fit:\s*cover/)
    expect(body).toMatch(/object-position:\s*center top/)
  })

  it('preenche as sobras com piso escuro independente do token ciano', () => {
    const body = ruleBody(filmCss, '.film-slide__sticky {').replace(/\/\*[\s\S]*?\*\//g, '')
    expect(body).toMatch(/background:\s*#060a0e/)
    expect(body).not.toMatch(/var\(--color-bg|#2596be/i)
  })
})
