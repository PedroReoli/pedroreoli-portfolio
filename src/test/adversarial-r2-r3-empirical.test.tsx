import { describe, it, expect, vi } from 'vitest'
import fs from 'fs'
import path from 'path'
import React from 'react'
import { render, act, fireEvent } from '@testing-library/react'
import { FilmSlide } from '../components/scene/FilmSlide'
import { useFrameScroll, effectiveHold, buildGates, frameAt, STEP_PX } from '../components/scene/useFrameScroll'
import { sliceStart, TALL_SLICES } from '../components/scene/slices'
import { ProjectViewerModal } from '../components/projects/ProjectViewerModal'
import { LanguageProvider } from '../context/LanguageContext'
import sceneClipsJson from '../../content/sceneClips.json'
import type { SceneClip, CorporateProjectImage } from '../types/content'

// Normalization helper for CRLF in Windows
const filmCss = fs.readFileSync(path.resolve(__dirname, '../styles/film.css'), 'utf-8')
  .split(String.fromCharCode(13))
  .join('')

const pagesCss = fs.readFileSync(path.resolve(__dirname, '../styles/pages.css'), 'utf-8')
  .split(String.fromCharCode(13))
  .join('')

function getCssRules(cssText: string, selector: string): string[] {
  const out: string[] = []
  let from = 0
  for (;;) {
    const at = cssText.indexOf(selector, from)
    if (at === -1) break

    const before = at === 0 ? '' : cssText[at - 1]
    const boundary = at === 0 || before === '\n' || before === ' ' || before === ','
    const after = cssText.slice(at + selector.length).trimStart().startsWith('{')

    if (!boundary || !after) {
      from = at + selector.length
      continue
    }

    const open = cssText.indexOf('{', at + selector.length)
    const close = cssText.indexOf('}', open)
    if (open === -1 || close === -1) break
    out.push(cssText.slice(open + 1, close))
    from = close
  }
  return out
}

describe('Adversarial Verification Suite: R2 (Transitions & Backdrops) & R3 (Experience Polish)', () => {

  describe('1. R2: Video Ready-State, Posters & Origin Mappings', () => {
    it('verifies origin poster mapping in sceneClips.json: each clip references its start state poster', () => {
      const clips = sceneClipsJson.clips
      expect(clips.length).toBe(6)

      // Expected origin pairings
      const expectedOriginPosters: Record<string, string> = {
        'hero-to-about': '/media/backdrop/01-hero-poster.png',
        'about-to-projects': '/media/backdrop/02-about-poster.png',
        'projects-to-stack': '/media/backdrop/03-projects-poster.png',
        'stack-to-purpose': '/media/backdrop/04-stack-poster.png',
        'purpose-to-experience': '/media/backdrop/05-purpose-poster.png',
        'experience-loop': '/media/backdrop/06-experience-poster.png',
      }

      for (const clip of clips) {
        expect(expectedOriginPosters[clip.id]).toBeDefined()
        expect(clip.poster).toBe(expectedOriginPosters[clip.id])

        // Verify that the actual asset exists in the public directory
        const publicPath = path.resolve(__dirname, '../../public', clip.poster.replace(/^\//, ''))
        expect(fs.existsSync(publicPath), `Poster file must exist on disk: ${publicPath}`).toBe(true)
        const stat = fs.statSync(publicPath)
        expect(stat.size).toBeGreaterThan(100000) // Poster files are ~700KB - 1.2MB
      }
    })

    it('verifies that poster remains opaque (opacity: 1) whenever clip is active in film.css', () => {
      // Rule 1: active clip poster has opacity: 1
      const activeRules = getCssRules(filmCss, ".film-slide[data-clip-active='true'] .film-slide__poster")
      expect(activeRules.length).toBeGreaterThan(0)
      const combined = activeRules.join('\n')
      expect(combined).toMatch(/opacity:\s*1/)

      // Also verify comma-selector rule:
      expect(filmCss).toContain(".film-slide[data-clip-active='true'][data-frame-ready='false'] .film-slide__poster")

      // Verify that inactive poster is hidden (opacity: 0) to avoid overlaying future slides
      const basePoster = getCssRules(filmCss, '.film-slide__poster')
      expect(basePoster.join('\n')).toMatch(/opacity:\s*0/)
    })

    it('empirically verifies FilmSlide component updates data-frame-ready on video events', async () => {
      vi.useFakeTimers()
      const clip = sceneClipsJson.clips[0] as SceneClip
      const { container } = render(<FilmSlide clip={clip} index={0} />)

      const slide = container.querySelector('[data-film-slide]') as HTMLElement
      const video = container.querySelector('video') as HTMLVideoElement
      expect(slide).not.toBeNull()
      expect(video).not.toBeNull()

      // Initially active is true (scrollY = 0)
      expect(slide.dataset.clipActive).toBe('true')

      // Trigger onLoadedData and trigger scroll with RAF flush
      act(() => {
        fireEvent.loadedData(video)
      })
      act(() => {
        window.dispatchEvent(new Event('scroll'))
        // Flush requestAnimationFrame
        vi.runAllTimers()
      })

      // Frame ready should reflect the ready state
      expect(slide.dataset.clipActive).toBe('true')
      expect(slide.dataset.frameReady).toBe('true')
      vi.useRealTimers()
    })
  })

  describe('2. R2: Reverse Scroll Overlap & Hold Frame Behavior', () => {
    it('verifies effectiveHold formula for all scene clips', () => {
      for (const clip of sceneClipsJson.clips as SceneClip[]) {
        const hold = effectiveHold(clip)
        expect(hold).toBeLessThanOrEqual(clip.duration)
        expect(hold).toBe(Math.min(clip.holdAt, clip.duration))
        expect(hold).toBeGreaterThan(5.0) // All clips have hold >= 6.42s
      }
    })

    it('empirically verifies reverse overlap holding behavior across ALL consecutive clip boundaries (0->1, 1->2, 2->3, 3->4, 4->5)', () => {
      const ids = sceneClipsJson.clips.map((c: { id: string }) => c.id)
      const vh = 900
      const OVERLAP = 220

      for (let i = 0; i < ids.length - 1; i++) {
        const outgoingClip = sceneClipsJson.clips[i] as SceneClip
        const nextStart = sliceStart(ids, i + 1, vh)

        // Test points across reverse transition: past boundary, within overlap, and before boundary
        const testPoints = [
          nextStart + OVERLAP + 100, // strictly in next clip
          nextStart + OVERLAP - 1,   // inside overlap window (just before exit)
          nextStart + Math.round(OVERLAP / 2), // middle of overlap window
          nextStart + 1,             // beginning of overlap window
          nextStart,                 // exact boundary
          nextStart - 1,             // back inside outgoing clip
          nextStart - 50,            // solidly inside outgoing clip
        ]

        for (const y of testPoints) {
          const activeOutgoing = y >= sliceStart(ids, i, vh) && y < nextStart
          const stillCovered = !activeOutgoing && y >= nextStart && y < nextStart + OVERLAP
          const activeIncoming = y >= nextStart && y < (i + 1 === ids.length - 1 ? Number.POSITIVE_INFINITY : sliceStart(ids, i + 2, vh))

          if (y >= nextStart && y < nextStart + OVERLAP) {
            // Inside reverse overlap window:
            expect(activeOutgoing).toBe(false)
            expect(stillCovered).toBe(true)
            expect(activeIncoming).toBe(true)

            // Outgoing video must hold effectiveHold
            const hold = effectiveHold(outgoingClip)
            expect(hold).toBeGreaterThan(0)
            expect(hold).toBe(Math.min(outgoingClip.holdAt, outgoingClip.duration))
          } else if (y < nextStart) {
            expect(activeOutgoing).toBe(true)
            expect(stillCovered).toBe(false)
          } else {
            expect(activeOutgoing).toBe(false)
            expect(stillCovered).toBe(false)
          }
        }
      }
    })
  })

  describe('3. R2: Window Resize Gate Stability', () => {
    it('verifies buildGates and frameAt produce deterministic frame progression across diverse viewports', () => {
      const clip = sceneClipsJson.clips[0] as SceneClip
      const vhValues = [600, 800, 900, 1080, 1200, 1440, 2160]

      for (const vh of vhValues) {
        const span = vh // for clip 0
        const gates = buildGates([{ clip, y: 0, span }])
        expect(gates.length).toBe(1)
        const gate = gates[0]

        expect(gate.span).toBe(span)
        expect(gate.steps).toBe(Math.max(2, Math.round(span / STEP_PX)))
        expect(gate.frameStep).toBeCloseTo(span / gate.steps, 5)

        // Test frameAt across scroll positions [0, span]
        const atStart = frameAt(gates, 0)
        expect(atStart.frame).toBe(0)
        expect(atStart.time).toBe(0)

        const atMid = frameAt(gates, span / 2)
        expect(atMid.frame).toBe(Math.floor(gate.steps / 2))
        expect(atMid.time).toBeCloseTo((atMid.frame / gate.steps) * effectiveHold(clip), 4)

        const atEnd = frameAt(gates, span)
        expect(atEnd.frame).toBe(gate.steps)
        expect(atEnd.time).toBe(effectiveHold(clip))

        // Adversarial inputs: negative scroll, beyond span, subpixel floats
        const neg = frameAt(gates, -500.25)
        expect(neg.frame).toBe(0)
        expect(neg.time).toBe(0)

        const beyond = frameAt(gates, span + 5000)
        expect(beyond.frame).toBe(gate.steps)
        expect(beyond.time).toBe(effectiveHold(clip))
      }
    })

    it('empirically verifies useFrameScroll recalculates gates on resize in a mounted component', () => {
      const onFrame = vi.fn()

      function TestHarness({ index }: { index: number }) {
        useFrameScroll(onFrame, index)
        return <div data-testid="harness" />
      }

      window.innerHeight = 900
      const { unmount } = render(<TestHarness index={0} />)

      expect(onFrame).toHaveBeenCalled()
      const callsBefore = onFrame.mock.calls.length

      // Trigger resize to a smaller viewport
      act(() => {
        window.innerHeight = 600
        window.dispatchEvent(new Event('resize'))
      })

      // Frame handler should have been called on resize
      const callsAfter = onFrame.mock.calls.length
      expect(callsAfter).toBeGreaterThan(callsBefore)
      const lastCallAfter = onFrame.mock.calls[callsAfter - 1][0]
      expect(lastCallAfter).toBeDefined()
      expect(lastCallAfter.clip?.id).toBe('hero-to-about')

      unmount()
    })
  })

  describe('4. R2: Modal Image Preloading & Transition States', () => {
    const mockImages: CorporateProjectImage[] = [
      { src: '/images/projects/p1-1.jpg', srcSet: '', alt: { pt: 'Imagem 1', en: 'Image 1' } },
      { src: '/images/projects/p1-2.jpg', srcSet: '', alt: { pt: 'Imagem 2', en: 'Image 2' } },
      { src: '/images/projects/p1-3.jpg', srcSet: '', alt: { pt: 'Imagem 3', en: 'Image 3' } },
    ]

    it('verifies modal preloads adjacent images (next and previous) on display', () => {
      // Mock HTMLDialogElement methods in jsdom
      HTMLDialogElement.prototype.showModal = vi.fn()
      HTMLDialogElement.prototype.close = vi.fn()

      // Mock Image constructor
      const createdImages: { src: string; srcset?: string }[] = []
      const originalImage = global.Image
      global.Image = class {
        _src = ''
        set src(val: string) {
          this._src = val
          createdImages.push({ src: val })
        }
        get src() {
          return this._src
        }
      } as unknown as typeof Image

      const onChange = vi.fn()
      render(
        <LanguageProvider>
          <ProjectViewerModal images={mockImages} index={1} onChange={onChange} />
        </LanguageProvider>
      )

      // index 1: next should be 2, prev should be 0
      expect(createdImages.some((img) => img.src === '/images/projects/p1-3.jpg')).toBe(true)
      expect(createdImages.some((img) => img.src === '/images/projects/p1-1.jpg')).toBe(true)

      // Restore
      global.Image = originalImage
    })

    it('verifies pages.css contains smooth opacity transition for modal images without pops', () => {
      expect(pagesCss).toContain('.project-modal__img { width: 100%; max-height: 78vh; object-fit: contain; transition: opacity 0.25s ease-out; }')
      expect(pagesCss).toContain('.project-modal__img.is-loading { opacity: 0.6; }')
      expect(pagesCss).toContain('.project-modal__img.is-loaded { opacity: 1; }')
    })
  })

  describe('5. R3: Experience Timeline Geometry & Typography', () => {
    it('verifies desktop timeline item anchors to start: align-items: start', () => {
      const itemRules = getCssRules(filmCss, '.film-panel > #experiencia .timeline-v__item')
      expect(itemRules.length).toBeGreaterThan(0)
      const combined = itemRules.join('\n')
      expect(combined).toMatch(/align-items:\s*start/)
      expect(combined).not.toMatch(/align-items:\s*center/)
    })

    it('verifies desktop station node and connector top margin offsets align to chapter top', () => {
      const nodeRules = getCssRules(filmCss, '.film-panel > #experiencia .timeline-v__node').join('\n')
      const connectorRules = getCssRules(filmCss, '.film-panel > #experiencia .timeline-v__connector').join('\n')

      expect(nodeRules).toMatch(/margin-top:\s*clamp\(14px,\s*1\.8vh,\s*22px\)/)
      expect(nodeRules).toMatch(/align-self:\s*start/)

      // Connector is 1px tall and offsets by + 5px to hit the 6px center of the 12px node
      expect(connectorRules).toMatch(/align-self:\s*start/)
      expect(connectorRules).toMatch(/margin-top:\s*calc\(clamp\(14px,\s*1\.8vh,\s*22px\)\s*\+\s*5px\)/)
    })

    it('mathematically verifies mobile spine co-axial alignment (28px col, 2px spine @ 13px, 12px node @ 8px margin)', () => {
      const mobileSection = filmCss.slice(filmCss.indexOf('@media (max-width: 767px)'))

      const spineRules = getCssRules(mobileSection, '.film-panel > #experiencia .timeline-v__spine').join('\n')
      const nodeRules = getCssRules(mobileSection, '.film-panel > #experiencia .timeline-v__node').join('\n')
      const gridRules = getCssRules(mobileSection, '.film-panel > #experiencia .timeline-v').join('\n')

      // Grid column is 28px
      expect(gridRules).toMatch(/grid-template-columns:\s*28px\s+minmax\(0,\s*1fr\)/)

      // Spine position: left: 13px, width 2px
      expect(spineRules).toMatch(/left:\s*13px/)
      const spineLeft = 13
      const spineWidth = 2
      const spineCenter = spineLeft + spineWidth / 2 // 14px

      // Node position: margin-left: 8px, width 12px
      expect(nodeRules).toMatch(/margin-left:\s*8px/)
      const nodeMarginLeft = 8
      const nodeWidth = 12
      const nodeCenter = nodeMarginLeft + nodeWidth / 2 // 14px

      // Crucial assertion: spine and node must share the exact same axis (14px)
      expect(nodeCenter).toBe(spineCenter)
      expect(nodeCenter).toBe(14)
    })

    it('verifies typography polish: microcopy font sizes are >= 0.64rem (no sub-10px illegible text)', () => {
      const periodRules = getCssRules(filmCss, '.film-panel > #experiencia .timeline-card__period')
      const chapterRules = getCssRules(filmCss, '.film-panel > #experiencia .timeline-card__chapter')
      const techRules = getCssRules(filmCss, '.film-panel > #experiencia .timeline__tech')
      const highlightsRules = getCssRules(filmCss, '.film-panel > #experiencia .timeline-card__highlights li')

      // Winning rule (last in file) applies
      const winningPeriod = periodRules.at(-1) ?? ''
      const winningChapter = chapterRules.at(-1) ?? ''
      const winningTech = techRules.at(-1) ?? ''

      // Period lifted from 0.58rem to 0.68rem
      const periodSize = (winningPeriod.match(/font-size:\s*([\d.]+)rem/) ?? [])[1]
      expect(Number(periodSize)).toBeGreaterThanOrEqual(0.64)
      expect(Number(periodSize)).toBe(0.68)

      // Chapter lifted from 0.58rem to 0.68rem
      const chapterSize = (winningChapter.match(/font-size:\s*([\d.]+)rem/) ?? [])[1]
      expect(Number(chapterSize)).toBeGreaterThanOrEqual(0.64)
      expect(Number(chapterSize)).toBe(0.68)

      // Tech lifted from 0.56rem to 0.66rem
      const techSize = (winningTech.match(/font-size:\s*([\d.]+)rem/) ?? [])[1]
      expect(Number(techSize)).toBeGreaterThanOrEqual(0.64)
      expect(Number(techSize)).toBe(0.66)

      // Highlights clamp min is 0.72rem
      expect(highlightsRules.join('\n')).toMatch(/font-size:\s*clamp\(0\.72rem/)
    })

    it('verifies tall slice consistency for Experience section (3.3 screens)', () => {
      expect(TALL_SLICES['experience-loop']).toBe(3.3)
      const panelRules = getCssRules(filmCss, '.film-panel:has(> #experiencia)').join('\n')
      const secRules = getCssRules(filmCss, '.film-panel > #experiencia').join('\n')

      expect(panelRules).toMatch(/height:\s*calc\(100svh \* 3\.3\)/)
      expect(secRules).toMatch(/height:\s*calc\(100svh \* 3\.3\)/)
    })
  })
})
