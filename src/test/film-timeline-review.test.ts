import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { TALL_SLICES } from '../components/scene/slices'

/**
 * Regressões da revisão visual da Trajetória.
 *
 * Três problemas apareceram nas capturas da prévia `4f59c6d` e cada um tinha uma
 * causa concreta, medida no navegador:
 *
 *  1. NÓ EM ELIPSE — o nó declarava 12×12, mas como item de grid era ESTICADO pela
 *     célula: 56px de largura no desktop e 28px no mobile, com 12px de altura. Um
 *     `border-radius: 50%` num retângulo de 56×12 desenha exatamente a elipse preta
 *     com halo que o BotManager viu. O nó precisa ser travado nos dois eixos.
 *  2. DESCRIÇÃO TRUNCADA — `white-space: nowrap` + `text-overflow: ellipsis`
 *     cortava o texto com "..." em todos os capítulos no mobile. Pedro pediu conteúdo
 *     completo.
 *  3. LEGIBILIDADE — o mármore atrás competia com o texto; o card precisa do piso de
 *     scrim local previsto no token do projeto.
 */

// O repo é CRLF no Windows; normaliza para o parser de regras não tropeçar.
const CSS = readFileSync(resolve(__dirname, '../styles/film.css'), 'utf8')
  .split(String.fromCharCode(13))
  .join('')

/**
 * Declarações de um seletor EXATO, na ordem do arquivo (a última vence).
 *
 * A correspondência precisa ser exata: `.timeline-v__node` é prefixo de
 * `.timeline-v__node-core` e `.timeline-v__node-ring`, e um `indexOf` simples
 * misturava as três regras — fazendo o teste falhar por medição errada, não por bug.
 */
function rules(selector: string): string[] {
  const out: string[] = []
  let from = 0
  for (;;) {
    const at = CSS.indexOf(selector, from)
    if (at === -1) break

    const before = at === 0 ? '' : CSS[at - 1]
    const boundary = at === 0 || before === '\n' || before === ' ' || before === ','
    const after = CSS.slice(at + selector.length).trimStart().startsWith('{')

    if (!boundary || !after) {
      from = at + selector.length
      continue
    }

    const open = CSS.indexOf('{', at + selector.length)
    const close = CSS.indexOf('}', open)
    if (open === -1 || close === -1) break
    out.push(CSS.slice(open + 1, close))
    from = close
  }
  return out
}

const NODE = '.film-panel > #experiencia .timeline-v__node'
const RING = '.film-panel > #experiencia .timeline-v__node-ring'
const DESC = '.film-panel > #experiencia .timeline-card__desc'
const HIGHLIGHT = '.film-panel > #experiencia .timeline-card__highlights li'
const CARD = '.film-panel > #experiencia .timeline-card'
const SPINE = '.film-panel > #experiencia .timeline-v__spine'

describe('nós da timeline são círculos, não elipses', () => {
  it('o nó trava largura E altura no mesmo valor', () => {
    const all = rules(NODE).join('\n')
    expect(all).toMatch(/width:\s*12px/)
    expect(all).toMatch(/height:\s*12px/)
    // sem min/max o grid estica o item e o círculo vira elipse
    expect(all).toMatch(/min-width:\s*12px/)
    expect(all).toMatch(/max-width:\s*12px/)
    expect(all).toMatch(/max-height:\s*12px/)
  })

  it('nenhuma regra do nó usa largura diferente da altura', () => {
    for (const body of rules(NODE)) {
      const w = body.match(/(?:^|[\s;])width:\s*([\d.]+)px/)
      const h = body.match(/(?:^|[\s;])height:\s*([\d.]+)px/)
      if (w && h) expect(w[1]).toBe(h[1])
    }
  })

  it('o anel interno também é circular', () => {
    const all = rules(RING).join('\n')
    expect(all).toMatch(/width:\s*20px/)
    expect(all).toMatch(/height:\s*20px/)
    expect(all).toMatch(/border-radius:\s*50%/)
  })
})

describe('descrição do card mostra o conteúdo completo', () => {
  it('a regra final não usa nowrap, ellipsis nem clamp', () => {
    const last = rules(DESC).at(-1) ?? ''
    expect(last).not.toMatch(/white-space:\s*nowrap/)
    expect(last).not.toMatch(/text-overflow:\s*ellipsis/)
    expect(last).not.toMatch(/-webkit-line-clamp:\s*\d/)
    expect(last).toMatch(/white-space:\s*normal/)
    expect(last).toMatch(/overflow:\s*visible/)
  })

  it('nenhuma regra de descrição trunca (nem as antigas)', () => {
    for (const body of rules(DESC)) {
      expect(body).not.toMatch(/white-space:\s*nowrap/)
      expect(body).not.toMatch(/text-overflow:\s*ellipsis/)
    }
  })

  it('os destaques também têm altura natural', () => {
    const last = rules(HIGHLIGHT).at(-1) ?? ''
    expect(last).toMatch(/white-space:\s*normal/)
    expect(last).toMatch(/height:\s*auto/)
  })
})

describe('legibilidade com scrim local', () => {
  it('o card usa piso de scrim rgba(8, 9, 11, ...) do token do projeto', () => {
    const all = rules(CARD).join('\n')
    // o token manda piso de .72; o card fica entre .72 e .82
    expect(all).toMatch(/rgba\(8, 9, 11, 0\.7[2-9]\)/)
    expect(all).toMatch(/rgba\(8, 9, 11, 0\.82\)/)
  })

  it('a trilha fica atrás do card e não cruza o texto', () => {
    expect(rules(SPINE).join('\n')).toMatch(/z-index:\s*0/)
    expect(rules(CARD).join('\n')).toMatch(/z-index:\s*2/)
  })
})

describe('travamento de scroll após a S5 (fatia alta vs painel)', () => {
  const PANEL = '.film-panel:has(> #experiencia)'
  const SEC = '.film-panel > #experiencia'

  it('o PAINEL acompanha a altura da fatia, não fica preso em 100svh', () => {
    // A fatia alta garante percurso completo para a timeline e o bloco de contato.
    const panelRules = rules(PANEL).join('\n')
    expect(panelRules).toMatch(/height:\s*calc\(100svh \* 3\.3\)/)
    expect(panelRules).toMatch(/min-height:\s*calc\(100svh \* 3\.3\)/)
  })

  it('a seção da Experiência e o painel declaram a MESMA altura', () => {
    const secRules = rules(SEC).join('\n')
    const panelRules = rules(PANEL).join('\n')
    const altura = (css: string) => (css.match(/height:\s*calc\(100svh \* ([\d.]+)\)/) ?? [])[1]
    expect(altura(panelRules)).toBeDefined()
    expect(altura(secRules)).toBe(altura(panelRules))
  })

  it('a fatia alta continua batendo com TALL_SLICES', () => {
    // Se mudar a altura no CSS sem mudar slices.ts, o frame e o painel desalinham.
    expect(TALL_SLICES['experience-loop']).toBe(3.3)
  })
})
