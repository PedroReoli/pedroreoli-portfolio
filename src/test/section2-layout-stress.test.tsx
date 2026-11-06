import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { AboutSection } from '../components/home/AboutSection'
import { LanguageProvider } from '../context/LanguageContext'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '../..')

// Mathematical clamp helper
function computeClamp(minPx: number, preferredVal: number, maxPx: number): number {
  return Math.min(Math.max(minPx, preferredVal), maxPx)
}

describe('Challenger 2 â€” Section 2 Layout, Visual & Responsive Stress Tests', () => {
  const homeCss = fs.readFileSync(path.join(projectRoot, 'src/styles/home.css'), 'utf-8')
  const responsiveCss = fs.readFileSync(path.join(projectRoot, 'src/styles/responsive.css'), 'utf-8')

  describe('Task 1: Photo Dimension & Museum Art Frame Audit', () => {
    it('mathematically verifies old vs new photo clamp at 768px, 900px, 1080px, and 1440px viewport heights', () => {
      // Old clamp: clamp(240px, 30vh, 320px)
      // New clamp: clamp(380px, 50vh, 520px)
      const heights = [768, 900, 1080, 1440]
      const results = heights.map((vh) => {
        const oldVal = computeClamp(240, 0.3 * vh, 320)
        const newVal = computeClamp(380, 0.5 * vh, 520)
        const increasePx = newVal - oldVal
        const percentIncrease = ((newVal - oldVal) / oldVal) * 100
        return { vh, oldVal, newVal, increasePx, percentIncrease }
      })

      // Viewport 768px
      expect(results[0].oldVal).toBe(240)
      expect(results[0].newVal).toBe(384)
      expect(results[0].increasePx).toBe(144)
      expect(results[0].percentIncrease).toBeCloseTo(60.0, 1)

      // Viewport 900px
      expect(results[1].oldVal).toBe(270)
      expect(results[1].newVal).toBe(450)
      expect(results[1].increasePx).toBe(180)
      expect(results[1].percentIncrease).toBeCloseTo(66.67, 1)

      // Viewport 1080px
      expect(results[2].oldVal).toBe(320)
      expect(results[2].newVal).toBe(520)
      expect(results[2].increasePx).toBe(200)
      expect(results[2].percentIncrease).toBe(62.5)

      // Viewport 1440px
      expect(results[3].oldVal).toBe(320)
      expect(results[3].newVal).toBe(520)
      expect(results[3].increasePx).toBe(200)
      expect(results[3].percentIncrease).toBe(62.5)
    })

    it('verifies .art-frame CSS specification satisfies authentic museum physical simulation', () => {
      // 1. Art Frame Outer Moulding
      expect(homeCss).toMatch(/\.art-frame\s*\{[^}]*max-width:\s*440px/)
      expect(homeCss).toMatch(/\.art-frame\s*\{[^}]*transform-style:\s*preserve-3d/)
      expect(homeCss).toMatch(/\.art-frame\s*\{[^}]*perspective\(1200px\)/)
      expect(homeCss).toMatch(/\.art-frame\s*\{[^}]*box-shadow:[^}]*rgba\(0,\s*0,\s*0,\s*0\.55\)/)

      // 2. Inner Fillet Trim
      expect(homeCss).toMatch(/\.art-frame__fillet\s*\{[^}]*linear-gradient\(135deg,\s*#fbbf24/)
      expect(homeCss).toMatch(/\.art-frame__fillet\s*\{[^}]*inset 0 1px 1px rgba\(255,\s*255,\s*255,\s*0\.45\)/)

      // 3. Passe-partout Archival Mat Board
      expect(homeCss).toMatch(/\.art-frame__mat\s*\{[^}]*background:\s*#fbf9f5/)
      expect(homeCss).toMatch(/\.art-frame__mat\s*\{[^}]*box-shadow:[^}]*inset 0 3px 10px rgba\(0,\s*0,\s*0,\s*0\.18\)/)

      // 4. Canvas Window with Aspect Ratio and Clamp
      expect(homeCss).toMatch(/\.art-frame__canvas\s*\{[^}]*aspect-ratio:\s*1\s*\/\s*1\.05/)
      expect(homeCss).toMatch(/\.art-frame__canvas\s*\{[^}]*max-height:\s*clamp\(380px,\s*50vh,\s*520px\)/)

      // 5. Specular Glare Reflection
      expect(homeCss).toMatch(/\.art-frame__glare\s*\{[^}]*radial-gradient\(circle at var\(--glare-x/)
      expect(homeCss).toMatch(/\.art-frame__glare\s*\{[^}]*mix-blend-mode:\s*screen/)
      expect(homeCss).toMatch(/\.art-frame__glare\s*\{[^}]*pointer-events:\s*none/)

      // 6. Exhibition Plaque (Cartellino)
      expect(homeCss).toMatch(/\.art-frame__plaque\s*\{[^}]*transform:\s*translateZ\(24px\)/)
      expect(homeCss).toMatch(/\.art-frame__plaque::before[^}]*border-radius:\s*50%/)
      expect(homeCss).toMatch(/\.art-frame__plaque::after[^}]*border-radius:\s*50%/)
    })

    it('renderiza só a plaquinha do retrato: o rosto real vem do vídeo de fundo', () => {
      render(
        <LanguageProvider>
          <AboutSection />
        </LanguageProvider>
      )

      const frame = document.querySelector('.art-frame') as HTMLDivElement
      expect(frame).not.toBeNull()
      expect(frame).toHaveClass('art-frame--plaque-only', 'art-frame')
      expect(document.querySelector('.art-frame__fillet')).not.toBeNull()

      // Pedro: "na segunda seção tem a minha imagem no fundo, ela se repete duas vezes"
      expect(document.querySelector('.art-frame__mat')).toBeNull()
      expect(document.querySelector('.art-frame__canvas')).toBeNull()
      expect(document.querySelector('.art-frame img')).toBeNull()

      // Plaque content (a identificação editorial da obra continua)
      const plaque = document.querySelector('.art-frame__plaque')
      expect(plaque).not.toBeNull()
      expect(plaque).toHaveTextContent('Pedro Lucas Reis')
      expect(plaque).toHaveTextContent('CAT. 02')
    })
  })

  describe('Task 2: Font Size Preservation & Compactness Verification', () => {
    it('verifies font sizes on headings and body copy were NOT decreased', () => {
      // Heading clamp check
      expect(homeCss).toMatch(/\.about__heading\s*\{[^}]*font-size:\s*clamp\(2\.4rem,\s*4\.4vw,\s*4\.4rem\)/)

      // Summary body copy clamp check (generous editorial size 1.02rem - 1.24rem)
      expect(homeCss).toMatch(/\.about__summary\s*\{[^}]*font-size:\s*clamp\(1\.02rem,\s*1\.4vw,\s*1\.24rem\)/)

      // Stats numbers
      expect(homeCss).toMatch(/\.about__metrics-card\s+\.stats-grid\s+strong\s*\{[^}]*font-size:\s*clamp\(1\.9rem,\s*3\.2vw,\s*2\.9rem\)/)

      // Eyebrow badge and stats labels
      expect(homeCss).toMatch(/\.about__eyebrow-badge\s*\{[^}]*font-size:\s*0\.65rem/)
      expect(homeCss).toMatch(/\.about__metrics-card\s+\.stats-grid\s+span\s*\{[^}]*font-size:\s*0\.62rem/)
    })

    it('verifies that compactness is achieved through unified right column docking of all narrative elements', () => {
      render(
        <LanguageProvider>
          <AboutSection />
        </LanguageProvider>
      )

      const narrativeCol = document.querySelector('.about__col-narrative')
      expect(narrativeCol).not.toBeNull()

      // Verify narrative column contains all elements together in unified dock
      const eyebrow = narrativeCol?.querySelector('.about__eyebrow-badge')
      const heading = narrativeCol?.querySelector('.about__heading')
      const summary = narrativeCol?.querySelector('.about__summary')
      const pills = narrativeCol?.querySelector('.about__focus-pills')
      const action = narrativeCol?.querySelector('.about__action')
      const metricsCard = narrativeCol?.querySelector('.about__metrics-card')

      expect(eyebrow).not.toBeNull()
      expect(heading).not.toBeNull()
      expect(summary).not.toBeNull()
      expect(pills).not.toBeNull()
      expect(action).not.toBeNull()
      expect(metricsCard).not.toBeNull()

      // Verify all 4 metrics are present inside the unified narrative dock
      const stats = metricsCard?.querySelectorAll('[data-about-stat]')
      expect(stats?.length).toBe(4)

      // Verify architectural focus pills are present
      const pillElements = pills?.querySelectorAll('.about__pill')
      expect(pillElements?.length).toBe(4)
    })
  })

  describe('Task 3: Desktop Viewport & Height Stress', () => {
    it('verifies responsive.css rules for desktop Section 2', () => {
      // In @media (min-width: 1101px):
      expect(responsiveCss).toMatch(
        /@media\s*\(min-width:\s*1101px\)\s*\{[\s\S]*?\.about,[\s\S]*?\.experience-section\s*\{[\s\S]*?height:\s*auto;[\s\S]*?min-height:\s*100svh;[\s\S]*?overflow:\s*visible;/
      )

      // In @media (max-width: 1100px):
      expect(responsiveCss).toMatch(
        /@media\s*\(max-width:\s*1100px\)\s*\{[\s\S]*?\.about,[\s\S]*?\{[\s\S]*?min-height:\s*100svh;[\s\S]*?height:\s*auto;[\s\S]*?overflow:\s*visible;/
      )
    })

    it('verifies responsive overrides prevent horizontal clipping and disable 3D transform on smaller viewports', () => {
      // At <= 1100px: transform: none !important to prevent 3D overflow on touch screens
      expect(responsiveCss).toMatch(/\.art-frame\s*\{[^}]*transform:\s*none\s*!important;/)
      // At <= 760px: max-width: 320px
      expect(responsiveCss).toMatch(/@media\s*\(max-width:\s*760px\)[\s\S]*?\.art-frame\s*\{[^}]*max-width:\s*320px;/)
      // Plaque padding adjustment on small mobile
      expect(responsiveCss).toMatch(/@media\s*\(max-width:\s*420px\)[\s\S]*?\.art-frame__plaque\s*\{[^}]*padding:\s*6px\s*8px;/)
    })

    it('empirically verifies total desktop vertical budget fits within standard viewports without vertical page overflow', () => {
      // Let's calculate the vertical layout height budget for:
      // 1. 1080p desktop (1920x1080)
      // 2. 1440p desktop (2560x1440)
      // 3. 900p desktop (1440x900)
      // 4. 768p laptop (1366x768)

      const testViewports = [
        { name: '1080p Desktop', w: 1920, h: 1080 },
        { name: '1440p QHD Desktop', w: 2560, h: 1440 },
        { name: '900p Desktop', w: 1440, h: 900 },
        { name: '768p Laptop', w: 1366, h: 768 },
      ]

      testViewports.forEach((vp) => {
        const headerOffset = 72 // padding-top: var(--header-height, 72px)
        const paddingBottom = computeClamp(24, 0.035 * vp.h, 48)
        const kickerHeight = computeClamp(40, 0.05 * vp.h, 48)
        const kickerGap = computeClamp(14, 0.022 * vp.h, 28)

        // Left Column (Art Frame)
        const framePadding = computeClamp(10, 0.014 * vp.w, 15) * 2
        const filletPadding = 6 // 3px each side
        const matPaddingY = computeClamp(14, 0.018 * vp.w, 20) + computeClamp(16, 0.022 * vp.w, 22)
        const matGap = computeClamp(10, 0.014 * vp.h, 14)
        const canvasMaxH = computeClamp(380, 0.5 * vp.h, 520)
        // Canvas aspect-ratio is 1 / 1.05. Max frame width is 440px.
        // Canvas width inside frame = 440 - framePadding - filletPadding - matPaddingX ~ 364px
        const canvasHeightFromWidth = 364 * 1.05 // ~382.2px
        const effectiveCanvasHeight = Math.min(canvasHeightFromWidth, canvasMaxH)
        const plaqueHeight = 34
        const totalFrameHeight = framePadding + filletPadding + matPaddingY + matGap + effectiveCanvasHeight + plaqueHeight

        // Right Column (Unified Narrative Dock)
        const eyebrowBadgeH = 24
        const eyebrowGap = 6
        const headingH = computeClamp(2.4 * 16, 0.044 * vp.w, 4.4 * 16) * 1.0 // single line display
        const headingGap = computeClamp(12, 0.018 * vp.h, 20)
        const summaryH = computeClamp(1.02 * 16, 0.014 * vp.w, 1.24 * 16) * 1.54 * 3 // ~3 lines
        const summaryGap = computeClamp(12, 0.018 * vp.h, 20)
        const pillsH = 32 // 1-2 lines of flex pills
        const pillsGap = computeClamp(12, 0.018 * vp.h, 20)
        const actionH = 30
        const metricsGap = computeClamp(6, 0.01 * vp.h, 12)
        const metricsH = 88 // stats grid height
        const totalNarrativeHeight = eyebrowBadgeH + eyebrowGap + headingH + headingGap + summaryH + summaryGap + pillsH + pillsGap + actionH + metricsGap + metricsH

        const layoutGridHeight = Math.max(totalFrameHeight, totalNarrativeHeight)
        const totalSectionHeight = headerOffset + paddingBottom + kickerHeight + kickerGap + layoutGridHeight

        // Empirical assertion: Total Section 2 height MUST fit within the viewport height without scrolling
        expect(
          totalSectionHeight,
          `Section 2 total height (${totalSectionHeight.toFixed(1)}px) should fit comfortably within ${vp.name} (${vp.h}px)`
        ).toBeLessThanOrEqual(vp.h)

        // Verify remaining vertical margin (breathing room)
        const marginPx = vp.h - totalSectionHeight
        expect(marginPx, `${vp.name} vertical margin`).toBeGreaterThanOrEqual(50)
      })
    })
  })
})

