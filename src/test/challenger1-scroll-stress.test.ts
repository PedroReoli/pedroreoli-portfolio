import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { sceneClips } from '../data/content'
import { sliceStart, sliceHeight } from '../components/scene/slices'
import { frameAt, STEP_PX, effectiveHold, type Gate } from '../components/scene/useFrameScroll'

const ROOT = resolve(__dirname, '..')
const read = (rel: string) => readFileSync(resolve(ROOT, rel), 'utf8')

const IDS = sceneClips.clips.map((c) => c.id)
const VH = 900 // standard test viewport height

// Smoothstep helper matching FilmSlide.tsx
const smoothstep = (t: number) => {
  const x = Math.min(1, Math.max(0, t))
  return x * x * (3 - 2 * x)
}

// Model function matching FilmSlide.tsx DOM logic
function computePanelState(slot: number, y: number, viewportH = VH, reduceMotion = false) {
  const isLastSlot = slot === IDS.length - 1
  const startSlot = sliceStart(IDS, slot, viewportH)
  const endSlot = startSlot + sliceHeight(IDS, slot, viewportH)
  const exitScale = reduceMotion ? 0.45 : 1
  const ENTER_PX = 460 * exitScale
  const EXIT_PX = Math.round(ENTER_PX * 0.55)

  const entering = smoothstep((y - startSlot) / ENTER_PX)
  const leaving = smoothstep((y - (endSlot - EXIT_PX)) / EXIT_PX) * (isLastSlot ? 0 : 1)
  const visible = (y >= startSlot && y < endSlot) || (isLastSlot && y >= startSlot)
  const p = entering * (1 - leaving)
  const opacity = visible ? p.toFixed(3) : '0'

  return {
    isLastSlot,
    startSlot,
    endSlot,
    entering,
    leaving,
    visible,
    p,
    opacity,
  }
}

describe('Challenger 1 — Empirical Stress Test Suite for Requirement R1', () => {
  describe('1. Terminal Panel Opacity & Visibility Oracle (#experiencia at slot 5)', () => {
    const lastSlot = IDS.length - 1 // slot 5
    const startSlot5 = sliceStart(IDS, lastSlot, VH)
    const endSlot5 = startSlot5 + sliceHeight(IDS, lastSlot, VH)

    it('verifies slot 5 is identified as the last slot', () => {
      expect(lastSlot).toBe(5)
      expect(IDS[lastSlot]).toBe('experience-loop')
      expect(computePanelState(lastSlot, startSlot5).isLastSlot).toBe(true)
      expect(computePanelState(4, 0).isLastSlot).toBe(false)
    })

    it('asserts that at y = endSlot, slot 5 remains at opacity 1.000 rather than fading to 0', () => {
      const state = computePanelState(lastSlot, endSlot5)
      expect(state.visible).toBe(true)
      expect(state.leaving).toBe(0)
      expect(state.p).toBe(1)
      expect(state.opacity).toBe('1.000')
    })

    it('asserts that at y > endSlot (scrolling past the track), slot 5 remains at opacity 1.000', () => {
      const extremeOffsets = [
        endSlot5 + 1,
        endSlot5 + 100,
        endSlot5 + 500,
        endSlot5 + 2000,
        endSlot5 + 10000,
        100000,
      ]

      extremeOffsets.forEach((y) => {
        const state = computePanelState(lastSlot, y)
        expect(state.visible).toBe(true)
        expect(state.leaving).toBe(0)
        expect(state.p).toBe(1)
        expect(state.opacity).toBe('1.000')
      })
    })

    it('asserts that non-terminal panels (slots 0..4) DO fade to 0 when y >= endSlot', () => {
      for (let slot = 0; slot < lastSlot; slot++) {
        const start = sliceStart(IDS, slot, VH)
        const end = start + sliceHeight(IDS, slot, VH)

        const stateAtEnd = computePanelState(slot, end)
        expect(stateAtEnd.visible).toBe(false)
        expect(stateAtEnd.opacity).toBe('0')

        const statePastEnd = computePanelState(slot, end + 100)
        expect(statePastEnd.visible).toBe(false)
        expect(statePastEnd.opacity).toBe('0')
      }
    })

    it('asserts reduced-motion preference maintains terminal panel opacity 1.000 past endSlot', () => {
      const stateReduced = computePanelState(lastSlot, endSlot5 + 500, VH, true)
      expect(stateReduced.visible).toBe(true)
      expect(stateReduced.leaving).toBe(0)
      expect(stateReduced.opacity).toBe('1.000')
    })

    it('verifies the source code implementation in FilmSlide.tsx explicitly contains the isLastSlot exemption', () => {
      const filmSlideSrc = read('components/scene/FilmSlide.tsx')
      expect(filmSlideSrc).toMatch(/const isLastSlot = slot === ids\.length - 1/)
      expect(filmSlideSrc).toMatch(
        /const leaving = smoothstep\(\(y - \(endSlot - EXIT_PX\)\) \/ EXIT_PX\) \* \(isLastSlot \? 0 : 1\)/,
      )
      expect(filmSlideSrc).toMatch(
        /const visible = y >= startSlot && y < endSlot \|\| \(isLastSlot && y >= startSlot\)/,
      )
    })
  })

  describe('2. Scroll Listener Behavior & Frame Engine Under Rapid / Extreme Positions', () => {
    const sampleClip = sceneClips.clips[0]
    const testGates: Gate[] = [
      { clip: sampleClip, steps: 24, span: 24 * STEP_PX },
      { clip: sceneClips.clips[1], steps: 24, span: 24 * STEP_PX },
      { clip: sceneClips.clips[sceneClips.clips.length - 1], steps: 48, span: 48 * STEP_PX },
    ]
    const totalSpan = testGates.reduce((acc, g) => acc + g.span, 0)

    it('handles y = 0 cleanly at initial rest position', () => {
      const frame = frameAt(testGates, 0)
      expect(frame.frame).toBe(0)
      expect(frame.time).toBe(0)
      expect(frame.progress).toBe(0)
      expect(frame.clip?.id).toBe(testGates[0].clip.id)
    })

    it('handles y = -50 (overscroll / bounce) gracefully without NaN or negative frame indices', () => {
      const frame = frameAt(testGates, -50)
      expect(frame.frame).toBe(0)
      expect(frame.time).toBe(0)
      expect(frame.progress).toBe(0)
      expect(Number.isNaN(frame.frame)).toBe(false)
      expect(Number.isNaN(frame.time)).toBe(false)
    })

    it('handles extreme negative overscroll y = -5000 gracefully', () => {
      const frame = frameAt(testGates, -5000)
      expect(frame.frame).toBe(0)
      expect(frame.time).toBe(0)
      expect(frame.progress).toBe(0)
    })

    it('handles exact boundary y = startSlot and y = endSlot across all gates', () => {
      let offset = 0
      testGates.forEach((gate) => {
        const atStart = frameAt(testGates, offset)
        expect(atStart.clip?.id).toBe(gate.clip.id)
        expect(atStart.frame).toBe(0)

        // Mid gate
        const mid = frameAt(testGates, offset + gate.span / 2)
        expect(mid.clip?.id).toBe(gate.clip.id)
        expect(mid.frame).toBe(Math.floor(gate.steps / 2))

        offset += gate.span
      })
    })

    it('handles extreme over-scroll beyond totalHeight (y > totalHeight)', () => {
      const beyondOffsets = [totalSpan + 1, totalSpan + 1000, totalSpan * 3, 999999]
      const lastGate = testGates[testGates.length - 1]

      beyondOffsets.forEach((y) => {
        const frame = frameAt(testGates, y)
        expect(frame.clip?.id).toBe(lastGate.clip.id)
        expect(frame.frame).toBe(lastGate.steps)
        expect(frame.time).toBeCloseTo(effectiveHold(lastGate.clip), 5)
        expect(frame.progress).toBe(1)
      })
    })

    it('adversarial fuzzing: 200 random rapid scroll transitions maintain invariants', () => {
      const pseudorandom = (seed: number) => {
        const x = Math.sin(seed) * 10000
        return x - Math.floor(x)
      }

      for (let i = 0; i < 200; i++) {
        const randY = (pseudorandom(i) - 0.1) * (totalSpan * 2) // range from -0.1*total to 1.9*total
        const frame = frameAt(testGates, randY)

        expect(Number.isFinite(frame.frame)).toBe(true)
        expect(Number.isFinite(frame.time)).toBe(true)
        expect(Number.isFinite(frame.progress)).toBe(true)
        expect(frame.frame).toBeGreaterThanOrEqual(0)
        expect(frame.progress).toBeGreaterThanOrEqual(0)
        expect(frame.progress).toBeLessThanOrEqual(1)
        expect(frame.clip).not.toBeNull()
      }
    })

    it('verifies single-pass scroll listener throttling in FilmSlide.tsx', () => {
      const filmSlideSrc = read('components/scene/FilmSlide.tsx')
      // Only index === 0 executes document.querySelectorAll('[data-film-panel]')
      expect(filmSlideSrc).toMatch(/if\s*\(index === 0\)\s*\{\s*document\.querySelectorAll/)
    })

    it('verifies requestAnimationFrame throttling in useFrameScroll.ts', () => {
      const useFrameScrollSrc = read('components/scene/useFrameScroll.ts')
      expect(useFrameScrollSrc).toMatch(/window\.requestAnimationFrame/)
      expect(useFrameScrollSrc).toMatch(/window\.cancelAnimationFrame/)
    })
  })

  describe('3. Layout Overflow & Container Height Properties Across Desktop & Mobile', () => {
    const filmCss = read('styles/film.css')
    const layoutCss = read('styles/layout.css')
    const baseCss = read('styles/base.css')

    it('verifies desktop 100svh section constraints are scoped to @media (min-width: 1101px)', () => {
      const mediaMatch = filmCss.match(/@media\s*\(min-width:\s*1101px\)\s*\{([^}]+(\{[^}]*\}[^}]+)*)\}/)
      expect(mediaMatch).toBeTruthy()
      const mediaBlock = mediaMatch![0]
      expect(mediaBlock).toMatch(/\.film-panel\s*>\s*section\s*\{[^}]*height:\s*100svh;[^}]*min-height:\s*100svh;/)
    })

    it('verifies base .film-panel > section does NOT force 100svh outside the 1101px media query', () => {
      // Find the rule outside the media query
      const baseSectionIndex = filmCss.indexOf('.film-panel > section {')
      expect(baseSectionIndex).toBeGreaterThan(-1)
      const baseSectionRule = filmCss.slice(baseSectionIndex, filmCss.indexOf('}', baseSectionIndex))
      expect(baseSectionRule).not.toMatch(/height:\s*100svh/)
      expect(baseSectionRule).not.toMatch(/min-height:\s*100svh/)
    })

    it('verifies #experiencia does not have overflow-y auto/scroll or overscroll-behavior contain', () => {
      const expRules = [...filmCss.matchAll(/\.film-panel\s*>\s*#experiencia\s*\{([^}]*)\}/g)].map((m) => m[1])
      expect(expRules.length).toBeGreaterThan(0)
      expRules.forEach((rule) => {
        expect(rule).not.toMatch(/overflow-y:\s*(auto|scroll)/)
        expect(rule).not.toMatch(/overscroll-behavior:\s*contain/)
      })
    })

    it('verifies .timeline-v is visible and does not trap scrolling on desktop or mobile', () => {
      const timelineRules = [...filmCss.matchAll(/\.timeline-v\s*\{([^}]*)\}/g)].map((m) => m[1])
      expect(timelineRules.length).toBeGreaterThan(0)
      timelineRules.forEach((rule) => {
        expect(rule).not.toMatch(/overflow-y:\s*(auto|scroll)/)
        expect(rule).not.toMatch(/overflow:\s*auto/)
      })
    })

    it('verifies layout.css no longer contains section, footer { scroll-margin-top: 0; }', () => {
      expect(layoutCss).not.toMatch(/section,\s*footer\s*\{\s*scroll-margin-top:\s*0;\s*\}/)
      expect(layoutCss).not.toMatch(/scroll-margin-top:\s*0/)
    })

    it('verifies base.css establishes canonical scroll-margin-top with header height clearance', () => {
      expect(baseCss).toMatch(/section,\s*footer\s*\{\s*scroll-margin-top:\s*var\(--header-height,\s*72px\);\s*\}/)
      expect(baseCss).toMatch(/html\s*\{\s*scroll-behavior:\s*smooth;/)
    })
  })
})
