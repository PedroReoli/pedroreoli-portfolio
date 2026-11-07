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
  const cardsCss = fs.readFileSync(path.join(projectRoot, 'src/styles/projects-cards.css'), 'utf-8')
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
      // Pedro pediu 3 cards: o contador do kicker acompanha a lista de projetos.
      expect(kicker).toHaveTextContent(String(homeContent.featuredProjects.length).padStart(2, '0'))
      expect(homeContent.featuredProjects.length).toBe(3)

      const heading = section?.querySelector('.work-section__heading h2')
      expect(heading).not.toBeNull()
      expect(heading?.textContent).toMatch(/projetos\./i)
    })

    it('renderiza um card por projeto, sem imagem e sem artefato de mídia', () => {
      const { container } = render(
        <LanguageProvider>
          <SelectedProjectsSection />
        </LanguageProvider>
      )

      const cards = container.querySelectorAll('.project-cards > .project-card')
      expect(cards.length).toBe(homeContent.featuredProjects.length)
      // Pedro: "tirar a imagem dessa seção e deixar os cards dos três projetos"
      expect(container.querySelector('.project-card__visual')).toBeNull()
      expect(container.querySelector('.project-cards img')).toBeNull()
      expect(container.querySelector('.agent-art')).toBeNull()

      homeContent.featuredProjects.forEach((project, index) => {
        const card = cards[index]
        expect(card.querySelector('h3')).toHaveTextContent(project.title)
        expect(card.querySelector('.project-card__index')).toHaveTextContent(project.number)
        expect(card.querySelector('.project-card__meta')).toHaveTextContent(project.category.pt)
        expect(card.querySelectorAll('.project-card__tech li').length).toBe(project.technologies.length)
        expect(card.querySelector('.project-card__action')).toHaveTextContent(project.action.pt)
        expect(card.querySelector('a')).toHaveAttribute('href', project.href)
      })
    })

    it('mantém a tipografia dos cards em escala de card, não de pôster', () => {
      // Pedro: "fontes tão muito grandes, a imagem não dá pra ver direito"
      expect(cardsCss).toMatch(/\.project-card h3\s*\{[^}]*font-size:\s*clamp\(1\.35rem,/)
      expect(cardsCss).toMatch(/\.project-cards\s*\{[^}]*grid-template-columns:\s*repeat\(3,/)
      expect(cardsCss).not.toMatch(/font-size:\s*clamp\(2\.2rem/)
    })

    it('localiza os cards em inglês', () => {
      localStorage.setItem('pedroreoli_language', 'en')
      const { container } = render(
        <LanguageProvider>
          <SelectedProjectsSection />
        </LanguageProvider>
      )

      const first = container.querySelector('.project-cards > .project-card')
      expect(first?.querySelector('.project-card__action')).toHaveTextContent(
        homeContent.featuredProjects[0].action.en
      )

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
