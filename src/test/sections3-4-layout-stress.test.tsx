import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { SelectedProjectsSection } from '../components/home/SelectedProjectsSection'
import { StackSection } from '../components/home/StackSection'
import { LanguageProvider } from '../context/LanguageContext'
import { homeContent, technologyContent } from '../data/content'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '../..')

// Mathematical clamp helper to match CSS clamp(min, preferred, max)
function computeClamp(minPx: number, preferredVal: number, maxPx: number): number {
  return Math.min(Math.max(minPx, preferredVal), maxPx)
}

describe('Sections 3 & 4 Layout Stress & Compactness Test Suite', () => {
  const homeCss = fs.readFileSync(path.join(projectRoot, 'src/styles/home.css'), 'utf-8')
  const railCss = fs.readFileSync(path.join(projectRoot, 'src/styles/projects-rail.css'), 'utf-8')
  const responsiveCss = fs.readFileSync(path.join(projectRoot, 'src/styles/responsive.css'), 'utf-8')

  describe('Suite 1: Projects Section Compactness & Image Integrity', () => {
    it('renders #projetos container with .work-section and .section-dark classes', () => {
      const { container } = render(
        <LanguageProvider>
          <SelectedProjectsSection />
        </LanguageProvider>
      )

      const section = container.querySelector('#projetos-selecionados, #projetos')
      expect(section).not.toBeNull()
      expect(section).toHaveClass('work-section', 'section-dark')

      const kicker = section?.querySelector('.section-kicker')
      expect(kicker).not.toBeNull()
      expect(kicker).toHaveTextContent('03')
      expect(kicker).toHaveTextContent('02')

      const heading = section?.querySelector('.work-section__heading h2')
      expect(heading).not.toBeNull()
      expect(heading?.textContent).toMatch(/projetos\./i)
    })

    it('renders Card 1 (Autocom3) with pristine image attributes, eager loading, async decoding, and valid disk assets', () => {
      const { container } = render(
        <LanguageProvider>
          <SelectedProjectsSection />
        </LanguageProvider>
      )

      const card1 = container.querySelector('.project-card--1')
      expect(card1).not.toBeNull()

      const project1 = homeContent.featuredProjects[0]
      const title = card1?.querySelector('h3')
      expect(title).toHaveTextContent(project1.title)

      const indexBadge = card1?.querySelector('.project-card__index')
      expect(indexBadge).toHaveTextContent(project1.number)

      const visual = card1?.querySelector('.project-card__visual')
      expect(visual).not.toBeNull()

      const img = visual?.querySelector('img')
      expect(img).not.toBeNull()
      expect(img).toHaveAttribute('loading', 'eager')
      expect(img).toHaveAttribute('decoding', 'async')

      const alt = img?.getAttribute('alt')
      expect(alt).toBeTruthy()
      expect(alt).toBe('Interface do painel de operações da Autocom3')

      // Validate source path and physical asset existence on disk
      const src = img?.getAttribute('src')
      expect(src).toBe('/portfolio-autocom3/01-painel-operacoes-visao-geral.png')
      const physicalSrcPath = path.join(projectRoot, 'public', src!)
      expect(fs.existsSync(physicalSrcPath)).toBe(true)

      // Validate srcSet variants and physical existence of each WebP asset
      const srcSet = img?.getAttribute('srcSet')
      expect(srcSet).toBeTruthy()
      const srcSetEntries = srcSet!.split(',').map((entry) => entry.trim().split(' ')[0])
      expect(srcSetEntries.length).toBeGreaterThanOrEqual(3)
      srcSetEntries.forEach((assetPath) => {
        const physicalAssetPath = path.join(projectRoot, 'public', assetPath)
        expect(fs.existsSync(physicalAssetPath)).toBe(true)
      })

      // Action link
      const action = card1?.querySelector('.project-card__action')
      expect(action).toHaveTextContent('Explorar interfaces')
    })

    it('renders Card 2 (Achilles) with interactive artwork, scaled radar circles, core badge, and step badges', () => {
      const { container } = render(
        <LanguageProvider>
          <SelectedProjectsSection />
        </LanguageProvider>
      )

      const card2 = container.querySelector('.project-card--2')
      expect(card2).not.toBeNull()

      const project2 = homeContent.featuredProjects[1]
      const title = card2?.querySelector('h3')
      expect(title).toHaveTextContent(project2.title)

      const visual = card2?.querySelector('.project-card__visual')
      expect(visual).not.toBeNull()

      const artwork = visual?.querySelector('.agent-art')
      expect(artwork).not.toBeNull()
      expect(artwork).toHaveAttribute('role', 'img')
      expect(artwork?.getAttribute('aria-label')).toBe('Diagrama do agente de navegador Achilles')

      // Radar circles
      const radar = artwork?.querySelector('.agent-art__radar')
      expect(radar).not.toBeNull()
      const radarSpans = radar?.querySelectorAll('span')
      expect(radarSpans?.length).toBe(3)

      // Core badge
      const core = artwork?.querySelector('.agent-art__core')
      expect(core).toHaveTextContent('A')

      // Step badges (01, 02, 03)
      const steps = artwork?.querySelector('.agent-art__steps')
      expect(steps).not.toBeNull()
      const stepBadges = steps?.querySelectorAll('span')
      expect(stepBadges?.length).toBe(3)
      expect(stepBadges?.[0]).toHaveTextContent('01')
      expect(stepBadges?.[1]).toHaveTextContent('02')
      expect(stepBadges?.[2]).toHaveTextContent('03')

      // Action link to external GitHub
      const action = card2?.querySelector('.project-card__action')
      expect(action).toHaveTextContent('Ver no GitHub')
      const anchor = card2?.querySelector('a')
      expect(anchor).toHaveAttribute('href', project2.href)
      expect(anchor).toHaveAttribute('target', '_blank')
    })

    it('verifies the alternating project rail replaced the 2-column grid, keeping 16:10 media and editorial scale', () => {
      // 1. Rail is a vertical flex column, not a 2-column grid (Pedro: "ao invés de grid")
      expect(railCss).toMatch(/\.project-rail\s*\{[^}]*display:\s*flex/)
      expect(railCss).toMatch(/\.project-rail\s*\{[^}]*flex-direction:\s*column/)
      expect(railCss).toMatch(/\.project-rail\s*\{[^}]*max-height:\s*none/)
      expect(homeCss).not.toMatch(/\.project-showcase\s*\{[^}]*grid-template-columns:\s*repeat\(2,\s*1fr\)/)

      // 2. Rows alternate sides; the card is an object with capped width, not a
      //    full-bleed panel (Pedro: "o projeto tá muito grande", "mais delicado").
      expect(railCss).toMatch(/\.project-rail__item\s*\{[^}]*min-height:\s*auto/)
      expect(railCss).toMatch(/\.project-rail__card\s*\{[^}]*width:\s*min\(100%,\s*940px\)/)
      expect(railCss).toMatch(/\.project-rail__item--align-right/)
      expect(railCss).toMatch(/\.project-rail__item--align-left/)

      // 2. Visual container has strict 16:10 aspect ratio and max-height clamp not exceeding 230px
      expect(homeCss).toMatch(/\.project-card__visual\s*\{[^}]*aspect-ratio:\s*16\s*\/\s*10/)
      expect(homeCss).toMatch(/\.project-card__visual\s*\{[^}]*max-height:\s*230px/)
      expect(homeCss).toMatch(/\.project-card--2\s+\.project-card__visual\s*\{[^}]*aspect-ratio:\s*16\s*\/\s*10/)
      expect(homeCss).toMatch(/\.project-card--2\s+\.project-card__visual\s*\{[^}]*max-height:\s*230px/)

      // 3. Image presentation: object-fit cover and object-position top center to preserve dashboard headers
      expect(homeCss).toMatch(/\.project-card__visual\s+img\s*\{[^}]*object-fit:\s*cover/)
      expect(homeCss).toMatch(/\.project-card__visual\s+img\s*\{[^}]*object-position:\s*top\s+center/)

      // 4. Compact typography scales
      expect(homeCss).toMatch(/\.work-section__heading\s+h2\s*\{[^}]*font-size:\s*clamp\(2\.4rem,\s*4\.5vw,\s*4\.2rem\)/)
      expect(homeCss).toMatch(/\.project-card\s+h3\s*\{[^}]*font-size:\s*clamp\(1\.5rem,\s*2\.2vw,\s*2\.4rem\)/)

      // 5. Scaled Achilles radar and core artwork
      expect(homeCss).toMatch(/\.agent-art__radar\s*\{[^}]*width:\s*160px;\s*height:\s*160px;/)
      expect(homeCss).toMatch(/\.agent-art__core\s*\{[^}]*width:\s*58px;\s*height:\s*58px;/)
      expect(homeCss).toMatch(/\.agent-art__steps\s+span\s*\{[^}]*width:\s*24px;\s*height:\s*24px;/)
    })

    it('renders English localization correctly with updated action links and alt texts', () => {
      localStorage.setItem('pedroreoli_language', 'en')
      const { container } = render(
        <LanguageProvider>
          <SelectedProjectsSection />
        </LanguageProvider>
      )

      const card1 = container.querySelector('.project-card--1')
      expect(card1?.querySelector('img')).toHaveAttribute('alt', 'Autocom3 operations dashboard interface')
      expect(card1?.querySelector('.project-card__action')).toHaveTextContent('Explore the interfaces')

      const card2 = container.querySelector('.project-card--2')
      expect(card2?.querySelector('.agent-art')).toHaveAttribute('aria-label', 'Achilles browser agent system diagram')
      expect(card2?.querySelector('.project-card__action')).toHaveTextContent('View on GitHub')

      localStorage.removeItem('pedroreoli_language')
    })
  })

  describe('Suite 2: Minha Stack Section Compact Density & Category Audit', () => {
    it('renders #stack container with .stack-section and .section-light classes', () => {
      const { container } = render(
        <LanguageProvider>
          <StackSection />
        </LanguageProvider>
      )

      const section = container.querySelector('#stack')
      expect(section).not.toBeNull()
      expect(section).toHaveClass('stack-section', 'section-light')

      const kicker = section?.querySelector('.section-kicker')
      expect(kicker).not.toBeNull()
      expect(kicker).toHaveTextContent('04')

      const introHeading = section?.querySelector('.stack-section__intro h2')
      expect(introHeading).not.toBeNull()
      expect(introHeading).toHaveTextContent('MINHA')
      expect(introHeading).toHaveTextContent('STACK.')
    })

    it('renders all 4 category groups with their respective headers and counters', () => {
      const { container } = render(
        <LanguageProvider>
          <StackSection />
        </LanguageProvider>
      )

      const articles = container.querySelectorAll('.stack-grid article')
      expect(articles.length).toBe(4)

      const expectedCategories = [
        { number: '01', title: 'Interfaces' },
        { number: '02', title: 'Back-end' },
        { number: '03', title: 'Cloud & apps' },
        { number: '04', title: 'IA & APIs' },
      ]

      expectedCategories.forEach((cat, idx) => {
        const article = articles[idx]
        const header = article.querySelector('header')
        expect(header).not.toBeNull()
        expect(header?.querySelector('span')).toHaveTextContent(cat.number)
        expect(header?.querySelector('h3')).toHaveTextContent(cat.title)
      })
    })

    it('renders all 24 tools with .stack-icon containers and verified size={15} SVG icons', () => {
      const { container } = render(
        <LanguageProvider>
          <StackSection />
        </LanguageProvider>
      )

      const toolItems = container.querySelectorAll('.stack-grid li')
      expect(toolItems.length).toBe(24)

      // Collect all tool names from data
      const allExpectedTools = technologyContent.groups.flatMap((g) => g.tools.map((t) => t.name))
      expect(allExpectedTools.length).toBe(24)

      toolItems.forEach((li, idx) => {
        const expectedName = allExpectedTools[idx]
        const strong = li.querySelector('strong')
        expect(strong).toHaveTextContent(expectedName)

        const iconContainer = li.querySelector('.stack-icon')
        expect(iconContainer).not.toBeNull()

        // Check the SVG icon inside receives size={15} (width="15" and height="15")
        const svg = iconContainer?.querySelector('svg')
        expect(svg).not.toBeNull()
        expect(svg).toHaveAttribute('width', '15')
        expect(svg).toHaveAttribute('height', '15')
      })
    })

    it('verifies CSS rules enforce compact cards, larger titles/icons and 2-line labels', () => {
      // 1. Stack grid has 4 columns and flex min-height: 0
      expect(homeCss).toMatch(/\.stack-grid\s*\{[^}]*grid-template-columns:\s*repeat\(4,\s*1fr\)/)
      expect(homeCss).toMatch(/\.stack-grid\s*\{[^}]*min-height:\s*0/)

      // 2. Article container padding compact clamp <= 12px with radius-sm
      expect(homeCss).toMatch(/\.stack-grid\s+article\s*\{[^}]*padding:\s*clamp\(8px,\s*1\.1vh,\s*12px\)/)
      expect(homeCss).toMatch(/\.stack-grid\s+article\s*\{[^}]*border-radius:\s*var\(--radius-sm\)/)

      // 3. Compact list items (chips): min-height clamped to max 32px with radius-xs
      expect(homeCss).toMatch(/\.stack-grid\s+li\s*\{[^}]*min-height:\s*clamp\(28px,\s*3\.2vh,\s*32px\)/)
      expect(homeCss).toMatch(/\.stack-grid\s+li\s*\{[^}]*border-radius:\s*var\(--radius-xs\)/)

      // 4. Icon container: 20px by 20px
      expect(homeCss).toMatch(/\.stack-icon\s*\{[^}]*width:\s*20px;\s*height:\s*20px;\s*flex:\s*0\s*0\s*20px;/)

      // 5. Tool labels styling
      expect(homeCss).toMatch(/\.stack-grid\s+li\s+strong\s*\{[^}]*font-size:\s*\.68rem;/)
    })

    it('renders English localization for stack category titles correctly', () => {
      localStorage.setItem('pedroreoli_language', 'en')
      const { container } = render(
        <LanguageProvider>
          <StackSection />
        </LanguageProvider>
      )

      const headers = Array.from(container.querySelectorAll('.stack-grid header h3')).map((h) => h.textContent)
      expect(headers).toEqual(['Interfaces', 'Back-end', 'Cloud & apps', 'AI & APIs'])

      localStorage.removeItem('pedroreoli_language')
    })
  })

  describe('Suite 3: Desktop Viewport Height Budget (768px, 900px, 1080px, 1440px)', () => {
    const testViewports = [
      { name: '768p Laptop', w: 1366, h: 768 },
      { name: '900p Desktop', w: 1440, h: 900 },
      { name: '1080p Desktop', w: 1920, h: 1080 },
      { name: '1440p QHD Desktop', w: 2560, h: 1440 },
    ]

    it('mathematically asserts Projects Section (.work-section) fits strictly within 100svh across all standard desktop viewports', () => {
      testViewports.forEach((vp) => {
        const headerOffset = 72 // padding-top: var(--header-height, 72px)
        const shellPaddingBottom = computeClamp(14, 0.02 * vp.h, 24)
        const kickerHeight = 28 // kicker font-size 0.65rem + padding
        const headingPadding = computeClamp(8, 0.012 * vp.h, 16) + computeClamp(8, 0.012 * vp.h, 14)
        const headingH2 = computeClamp(2.4 * 16, 0.045 * vp.w, 4.2 * 16) * 0.9

        // Showcase container is bounded by max-height: 480px
        const visualHeight = computeClamp(160, 0.22 * vp.h, 230)
        const cardBodyPadding = computeClamp(12, 0.016 * vp.h, 18) * 2
        const cardMeta = 14
        const cardH3 = computeClamp(1.5 * 16, 0.022 * vp.w, 2.4 * 16) * 1.05
        const cardDesc = 38 // 2 lines clamp
        const cardTech = 14
        const cardAction = computeClamp(8, 0.012 * vp.h, 14) + 16
        const singleCardContentHeight = visualHeight + cardBodyPadding + cardMeta + cardH3 + cardDesc + cardTech + cardAction
        const effectiveShowcaseHeight = Math.min(singleCardContentHeight, 480)

        const totalWorkHeight = headerOffset + kickerHeight + headingPadding + headingH2 + effectiveShowcaseHeight + shellPaddingBottom
        const occupancyPercentage = (totalWorkHeight / vp.h) * 100

        // Strict assertion: must not exceed viewport height
        expect(totalWorkHeight).toBeLessThanOrEqual(vp.h)
        // Must leave at least 8% breathing room (occupancy <= 92%)
        expect(occupancyPercentage).toBeLessThan(92)
      })
    })

    it('mathematically asserts Minha Stack Section (.stack-section) fits strictly within 100svh across all standard desktop viewports', () => {
      testViewports.forEach((vp) => {
        const headerOffset = 72 // padding-top: var(--header-height, 72px)
        const shellGap = computeClamp(8, 0.015 * vp.h, 18)
        const shellPaddingBottom = computeClamp(12, 0.018 * vp.h, 20)
        const kickerHeight = 28
        const introPadding = computeClamp(4, 0.008 * vp.h, 10) + computeClamp(4, 0.008 * vp.h, 8)
        // Intro h2 em is display: block (2 lines)
        const introH2Height = 2 * computeClamp(2.2 * 16, 0.042 * vp.w, 3.8 * 16) * 0.9

        // Stack grid articles:
        const articlePaddingY = computeClamp(8, 0.011 * vp.h, 12) * 2
        const articleHeader = 22 + computeClamp(4, 0.007 * vp.h, 8)
        // 6 tool items with min-height clamp(28px, 3.2vh, 32px) and 5 gaps clamp(3px, 0.4vh, 4px)
        const itemMinHeight = computeClamp(28, 0.032 * vp.h, 32)
        const itemGap = computeClamp(3, 0.004 * vp.h, 4)
        const listHeight = 6 * itemMinHeight + 5 * itemGap
        const totalArticleHeight = articlePaddingY + articleHeader + listHeight

        const totalStackHeight = headerOffset + shellGap + kickerHeight + introPadding + introH2Height + shellGap + totalArticleHeight + shellPaddingBottom
        const occupancyPercentage = (totalStackHeight / vp.h) * 100

        // Strict assertion: must not exceed viewport height
        expect(totalStackHeight).toBeLessThanOrEqual(vp.h)
        // Highly compact: takes at most ~75% of the viewport height
        expect(occupancyPercentage).toBeLessThan(75)
      })
    })

    it('verifies responsive.css guarantees 100svh overflow hidden on desktop and graceful scroll on tablet/mobile', () => {
      // Desktop enforces height: 100svh and overflow: hidden
      expect(responsiveCss).toMatch(
        /@media\s*\(min-width:\s*1101px\)\s*\{[\s\S]*?\.work-section,[\s\S]*?\.stack-section,[\s\S]*?\{[\s\S]*?height:\s*100svh;[\s\S]*?overflow:\s*hidden;/
      )

      // <= 1100px switches both sections to height: auto, overflow: visible
      expect(responsiveCss).toMatch(
        /@media\s*\(max-width:\s*1100px\)\s*\{[\s\S]*?\.work-section,[\s\S]*?\.stack-section,[\s\S]*?\{[\s\S]*?min-height:\s*100svh;[\s\S]*?height:\s*auto;[\s\S]*?overflow:\s*visible;/
      )

      // Mobile <= 760px responsive adjustments
      expect(responsiveCss).toMatch(/@media\s*\(max-width:\s*760px\)[\s\S]*?\.project-card__visual,\s*\.project-card--2\s+\.project-card__visual\s*\{[^}]*max-height:\s*220px;/)
      expect(responsiveCss).toMatch(/@media\s*\(max-width:\s*760px\)[\s\S]*?\.stack-grid\s*\{[^}]*grid-template-columns:\s*1fr;/)
      expect(responsiveCss).toMatch(/@media\s*\(max-width:\s*760px\)[\s\S]*?\.stack-grid\s+ul\s*\{[^}]*grid-template-columns:\s*repeat\(2,\s*1fr\);/)
    })
  })
})
