import { describe, it, expect, beforeEach } from 'vitest'
import { sampleScene, effectiveHold, type SceneRange } from '../components/scene/useScrollScene'
import { sceneClips } from '../data/content'

const sectionIds = ['hero', 'sobre', 'projetos-selecionados', 'stack', 'proposito', 'experiencia'] as const
const VH = 1000

function mountSections(heights: Record<string, number>) {
  sectionIds.forEach((id) => {
    document.getElementById(id)?.remove()
    const el = document.createElement('section')
    el.id = id
    el.style.height = `${heights[id] ?? VH}px`
    document.body.appendChild(el)
  })
}

/** offsetTop only exists on a real layout, so mirror it onto the detached elements. */
function offsets(): Record<string, number> {
  let top = 0
  const map: Record<string, number> = {}
  sectionIds.forEach((id) => {
    map[id] = top
    const el = document.getElementById(id)
    top += el?.getBoundingClientRect().height || VH
  })
  return map
}

describe('Scroll scrub — uma timeline contínua e bidirecional', () => {
  let ranges: SceneRange[]

  beforeEach(() => {
    document.body.innerHTML = ''
    mountSections({})
    const tops = offsets()
    // jsdom has no layout: stub offsetTop from the measured order of sections.
    sectionIds.forEach((id) => {
      Object.defineProperty(document.getElementById(id)!, 'offsetTop', { value: tops[id], configurable: true })
    })
    ranges = sceneClips.clips
      .filter((clip) => tops[clip.from] !== undefined && tops[clip.to] !== undefined)
      .map((clip) => {
        const start = tops[clip.from]
        const end = clip.from === clip.to ? start + VH : tops[clip.to]
        return { clip, start, end: Math.max(end, start + 1) }
      })
  })

  it('cobre o documento inteiro sem buracos entre clipes', () => {
    for (let i = 1; i < ranges.length; i += 1) {
      expect(ranges[i].start).toBe(ranges[i - 1].end)
    }
  })

  it('no topo da página o playhead está no primeiro frame do primeiro clipe', () => {
    const sample = sampleScene(ranges, sectionIds, 0)
    expect(sample.clip?.id).toBe(ranges[0].clip.id)
    expect(sample.time).toBe(0)
  })

  it('descer avança o tempo e subir recua para exatamente o mesmo frame', () => {
    const down = sampleScene(ranges, sectionIds, 1234)
    const up = sampleScene(ranges, sectionIds, 1234)
    expect(up.clip?.id).toBe(down.clip?.id)
    expect(up.time).toBeCloseTo(down.time, 6)

    const earlier = sampleScene(ranges, sectionIds, 800)
    if (earlier.clip?.id === down.clip?.id) {
      expect(earlier.time).toBeLessThanOrEqual(down.time)
    }
  })

  it('nunca passa do holdAt de cada clipe', () => {
    const last = ranges[ranges.length - 1]
    const sample = sampleScene(ranges, sectionIds, last.end + 5000)
    expect(sample.clip?.id).toBe(last.clip.id)
    expect(sample.time).toBe(effectiveHold(last.clip))
  })

  it('mantém o playhead dentro do clipe pedido pelo scroll', () => {
    ranges.forEach((range) => {
      const mid = (range.start + range.end) / 2
      const sample = sampleScene(ranges, sectionIds, mid)
      expect(sample.clip?.id).toBe(range.clip.id)
      expect(sample.time).toBeGreaterThan(0)
      expect(sample.time).toBeLessThan(20)
    })
  })
})
