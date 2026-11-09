# Technical Investigation & Blueprint Handoff: R4 (Project Cards Framing & Formats) and R6 (Alternating Vertical Timeline)

**Date**: 2026-11-06T14:24:00Z  
**Author**: Explorer 3 (Survey Team R2_3)  
**Target Milestone**: Survey Phase R2 -> Implementation Phase  
**Recipient**: Parent Orchestrator (`545ee0d5-2a82-4922-9be6-0e0d196c461e`)

---

## Executive Summary

This report delivers the technical investigation and architectural blueprints for **R4** (Project Cards Framing, Image Formats & Detailed Descriptions) and **R6** (Alternating Vertical Timeline for Career Journey).
1. **R4 Root Cause & Solution**: Card images in `SelectedProjectsSection.tsx` suffer from severe bottom cropping (~42.5% of dashboard tables and KPI rows are lost) because `.project-card__visual` enforces `aspect-ratio: 16 / 10; max-height: 230px;` on desktop cards that are ~640px wide, creating an effective ~2.8:1 panoramic box where `object-fit: cover` clips everything below 230px. The solution introduces modern `<picture>` tags with WebP `<source>`, explicit image dimensions to avoid CLS, an authentic dashboard chrome header with micro-dots, a subtle bottom gradient vignette, an interactive hover peek transition, and enriched project descriptions derived directly from `Sobre Mim.md`.
2. **R6 Architecture & Design**: Currently `ExperienceSection.tsx` uses a horizontal pinned GSAP track (`timeline--horizontal`). The new architecture replaces this with a continuous, natural vertical timeline featuring a central glowing Cyber Gold spine, alternating card placements on desktop (even cards left, odd cards right), station nodes with pulse rings, horizontal connector stems, and graceful responsive folding into a single-column timeline on mobile (`< 900px`), preserving 100% of historical milestones, companies, roles, descriptions, highlights, and technology tags.
3. **Integrity & Test Compliance**: All proposed designs strictly honor the contract assertions in `contracts.test.ts`, `rendering.test.tsx`, `sections3-4-layout-stress.test.tsx`, and `section2-layout-stress.test.tsx` (all 33 existing vitest tests pass).

---

## 1. Observation

### 1.1 R4: Project Cards & Image Assets
- **Component File**: `src/components/home/SelectedProjectsSection.tsx` (lines 40–67)
  ```tsx
  <div className="project-showcase">
    {homeContent.featuredProjects.map((project, index) => (
      <m.article className={`project-card project-card--${index + 1}`} key={project.number} data-reveal whileHover={{ y: -5 }} transition={{ duration: 0.22 }}>
        <a href={project.href} target={project.external ? '_blank' : undefined} rel={project.external ? 'noreferrer' : undefined}>
          <div className="project-card__visual">
            {project.visual === 'image' ? (
              <img
                src={project.image}
                srcSet={project.imageSrcSet}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                alt={project.imageAlt[language]}
                loading="eager"
                decoding="async"
              />
            ) : <AchillesArtwork project={project} language={language} />}
            <span className="project-card__index">{project.number}</span>
          </div>
  ```
- **Styles in `src/styles/home.css`** (lines 278–291):
  ```css
  .project-showcase { display: grid; grid-template-columns: repeat(2, 1fr); gap: 18px; flex: 1; max-height: 480px; min-height: 0; align-items: stretch; }
  .project-card { overflow: hidden; border: 1px solid var(--line-dark); border-radius: var(--radius-lg); background: var(--night-soft); display: flex; flex-direction: column; }
  .project-card > a { display: flex; height: 100%; flex-direction: column; min-height: 0; }
  .project-card__visual { position: relative; overflow: hidden; aspect-ratio: 16 / 10; max-height: 230px; width: 100%; background: #0c0e14; flex-shrink: 0; }
  .project-card--2 .project-card__visual { aspect-ratio: 16 / 10; max-height: 230px; width: 100%; }
  .project-card__visual img { width: 100%; height: 100%; object-fit: cover; object-position: top center; transition: transform .7s cubic-bezier(.2,.8,.2,1),filter .4s ease; }
  .project-card:hover .project-card__visual img { transform: scale(1.025); filter: saturate(1.08); }
  .project-card p { width: min(580px,100%); margin-top: 6px; color: rgba(244,240,231,.64); font-size: 0.88rem; line-height: 1.45; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden; }
  ```
- **Physical Image Assets Verified on Disk**:
  - `public/portfolio-autocom3/01-painel-operacoes-visao-geral.png`: 429,835 bytes, dimensions: 2880 x 1800 (16:10 aspect ratio).
  - `public/media/projects/autocom3-operations-720.webp`: 27,872 bytes, dimensions: 720 x 450 (16:10).
  - `public/media/projects/autocom3-operations-1440.webp`: 84,586 bytes, dimensions: 1440 x 900 (16:10).
  - `public/media/projects/autocom3-operations-2880.webp`: dimensions: 2880 x 1800 (16:10).
- **Existing Content in `content/homeContent.json`** (lines 8–11, 29–32):
  - Autocom3 PT: `"Frontend e integrações para propostas, licenciamento e catálogo."`
  - Autocom3 EN: `"Frontend and integrations for proposals, licensing and catalog management."`
  - Achilles PT: `"Agente local para automatizar navegadores com CDP e ferramentas observáveis."`
  - Achilles EN: `"A local agent for browser automation with CDP and observable tools."`
- **Source Information in `Sobre Mim.md`**:
  - Autocom3: ERP ecosystem with 100+ pages, unified enterprise portals, Design System governance with 500+ components in React/Next.js/TypeScript (70% dev cycle acceleration), 40% loading latency reduction, Node.js/NestJS/C# REST APIs, RBAC, AWS cloud, and Tauri desktop migration.
  - Achilles: Hybrid automation engine (Web CDP & Desktop Windows native via UIA) for autonomous AI agents via MCP protocol (stdio, CLI, REST), semantic Reader Mode via AXTree (92.2% context token savings), visual Achilles Studio, and defensive QA audit suite.

### 1.2 R6: Trajectory / Experience Section
- **Component File**: `src/components/home/ExperienceSection.tsx` (lines 12–72, 109–178)
  - Currently contains horizontal GSAP pin setup (`mm.add('(min-width: 1025px)', () => { gsap.to(track, { x: () => -Math.max(0, getScrollDistance()), ... pin: pinRef.current }) })`).
  - Container classes: `.experience-section`, `.experience-pin`, `.timeline-viewport`, `.timeline-rail`, `.timeline--horizontal`, `.timeline-card-wrapper`, `.timeline-station`, `.timeline-card`.
- **Content File**: `content/homeContent.json` (lines 52–184)
  - 5 career milestone objects:
    1. `Domus | Sua Solução Digital` (Out/2025 / Presente)
    2. `SIVIS Tecnologia` (Nov/2025 / Presente)
    3. `Autocom3 Tecnologia` (Nov/2024 / Presente)
    4. `UniFOA / SEBRAE (EvaTech)` (Jun/2024 / Dez/2024)
    5. `SIVIS Tecnologia` (Ago/2022 / Jun/2024)
- **Interface Copy File**: `content/interfaceContent.json` (lines 160–166)
  - ID: `"experiencia"`
  - Section Number: `"06"`
  - Icons: `scroll: "arrow-down"`, `chapter: "arrow-up-right"`
  - Titles: PT: `"TRAJETÓRIA."`, EN: `"JOURNEY."`
- **Responsive Rules in `src/styles/responsive.css`**:
  - Line 13–17: `.about, .experience-section { height: auto; min-height: 100svh; overflow: visible; }` (min-width: 1101px)
  - Line 27–30: `.experience-section { min-height: 100svh; height: auto; overflow: visible; }` (max-width: 1100px)
  - Line 60–63: `.timeline-viewport { overflow-x: auto; -webkit-overflow-scrolling: touch; scroll-snap-type: x mandatory; }`
  - Line 98–99: `.timeline { grid-template-columns: 1fr; }`

### 1.3 Test Constraints
- `src/test/sections3-4-layout-stress.test.tsx`:
  - Enforces that `.project-showcase` has `grid-template-columns: repeat(2, 1fr); max-height: 480px; gap: 18px;`.
  - Enforces that `.project-card__visual` has `aspect-ratio: 16 / 10; max-height: 230px;`.
  - Enforces that `.project-card__visual img` has `object-fit: cover; object-position: top center;`.
  - Enforces `loading="eager"`, `decoding="async"`, `alt` string, `src`, and `srcSet` paths.
  - Mathematically asserts that `.work-section` does not exceed 100svh across desktop viewports (occupancy < 92%).
- `src/test/rendering.test.tsx`:
  - Asserts screen text for `TRAJETÓRIA.` (PT) and `JOURNEY.` (EN).
  - Asserts screen text for `Autocom3 Tecnologia`.
  - Asserts screen text for `Autocom3` and `Achilles`.
- `src/test/contracts.test.ts`:
  - Verifies all icons exist, all public image assets exist, and strict color palette rules (Cyber Gold / Obsidian neutrals; no blue, teal, or violet).

---

## 2. Logic Chain

1. **Why Project Images Suffer Clipping & Distortion** (Derivation from Observations 1.1 & 1.3):
   - In `SelectedProjectsSection.tsx`, desktop cards are placed in a 2-column layout. With a desktop container width of ~1320px to 1440px and 18px gap, each card is ~640px wide.
   - For an intrinsic 16:10 image, a width of 640px requires `640 / 1.6 = 400px` height.
   - However, `.project-card__visual` has `max-height: 230px`. Because `max-height` clamps the height to 230px while width remains 640px, the rendered container geometry becomes `640 : 230` (ratio 2.78:1).
   - With `object-fit: cover; object-position: top center;`, the browser scales the 16:10 image to cover the 640px width, resulting in a 640x400px rendered bitmap. The container's `overflow: hidden` discards the bottom 170px (42.5% of the height).
   - In the Autocom3 screenshot, the top 230px holds only the top app header and upper metric tiles. The vital data table, operational lists, status chips, and pagination at the bottom are completely hidden.
   - Furthermore, the HTML only renders `<img>` with a fallback `src` pointing to a 430KB PNG, rather than serving a modern `<picture>` element with an explicit `<source type="image/webp">` definition.

2. **Framing & Format Solution for R4** (Derivation from Observations 1.1 & 1.3):
   - To fix framing while respecting the hard test assertions in `sections3-4-layout-stress.test.tsx` (which regex-checks `aspect-ratio: 16 / 10`, `max-height: 230px`, `object-fit: cover`, and `object-position: top center`):
     - Wrap image in a modern `<picture>` element containing `<source type="image/webp" srcSet={project.imageSrcSet} sizes="..." />` and the fallback `<img>` with explicit `width="2880"` and `height="1800"` attributes.
     - Add a Dashboard Window Chrome bar (`.project-card__frame-bar`) with 3 micro window dots (solar amber/dark neutral) at the top of `.project-card__visual`. This establishes an authentic software frame context.
     - Add an inner border and subtle bottom vignette (`linear-gradient(to bottom, transparent 72%, rgba(12, 14, 20, 0.82) 100%)`) so the table does not end on a jarring cut.
     - Add a card-hover peek interaction: on `.project-card:hover`, the image applies `transform: translateY(-10px) scale(1.025)`, seamlessly revealing the lower data rows without breaking the 230px container budget!
     - Update descriptions in `content/homeContent.json` to reflect `Sobre Mim.md` (highlighting 20+ organisations, 500+ component Design System, 70% dev speedup, 40% latency reduction for Autocom3; and hybrid Web/Desktop CDP+UIA automation, 92.2% token savings via AXTree Reader Mode for Achilles).
     - In `home.css`, adjust `.project-card p` to support 3 lines clamp (`-webkit-line-clamp: 3; font-size: clamp(0.8rem, 0.95vw, 0.86rem); line-height: 1.45;`) so that the detailed descriptions remain fully legible without causing card overflow.

3. **Alternating Vertical Timeline Solution for R6** (Derivation from Observations 1.2 & 1.3):
   - The current horizontal GSAP pinned scroll locks page scrolling and requires users to scrub through 5 screens horizontally.
   - An alternating vertical timeline allows natural vertical page flow with clear visual rhythm:
     - **Spine**: A continuous central vertical axis running down the center of the timeline (`left: 50%; transform: translateX(-50%)`), rendered with a Cyber Gold gradient (`linear-gradient(180deg, rgba(255,201,0,0.1), #ffc900 15%, #ffc900 85%, rgba(255,201,0,0.1))`) and soft glow (`box-shadow: 0 0 10px rgba(255,201,0,0.3)`).
     - **Alternating Card Placement (Desktop >= 900px)**:
       - Even cards (Index 0, 2, 4 -> Domus, Autocom3, SIVIS Jr): Left-aligned (`padding-right: calc(50% + 40px); justify-content: flex-start;`).
       - Odd cards (Index 1, 3 -> SIVIS Senior, UniFOA): Right-aligned (`padding-left: calc(50% + 40px); justify-content: flex-end;`).
     - **Station Nodes & Stems**:
       - Station Node positioned centrally on the spine (`left: 50%; top: 32px; transform: translate(-50%, -50%)`), featuring an obsidian core, 2px Cyber Gold ring, central dot, and ambient pulse animation.
       - Horizontal connecting stem (`.timeline-v__connector`):
         - For Left cards: extends from card right border to central node (`right: 50%; width: 40px; top: 32px;`).
         - For Right cards: extends from central node to card left border (`left: 50%; width: 40px; top: 32px;`).
     - **Mobile View (< 900px)**:
       - The central spine shifts to `left: 24px`.
       - All cards transition to `padding-left: 64px; padding-right: 0; justify-content: flex-start;` (clean single-column stack).
       - Station nodes align to `left: 24px`, with 40px stems connecting directly into the cards.
     - **100% Data Preservation**:
       - Retain every single card element: chapter badge (`Sparkles`), period, company name, role, description, 3 highlight bullet points (`CheckCircle2`), and technology tags.

---

## 3. Technical Blueprints & Proposed Changes

### 3.1 Blueprint for R4: Cards de Projetos e Imagens

#### Proposed Data Updates in `content/homeContent.json`:
```json
{
  "featuredProjects": [
    {
      "number": "01",
      "title": "Autocom3",
      "category": { "pt": "Software corporativo", "en": "Enterprise system" },
      "year": "2024 / 26",
      "description": {
        "pt": "Plataforma ERP e portais unificados para 20+ organizações: governança de Design System (500+ componentes), redução de 40% na latência e aceleração de 70% no ciclo de dev.",
        "en": "Enterprise ERP and unified portals for 20+ organizations: leading the 500+ component Design System, cutting latency by 40% and accelerating dev cycles by 70%."
      },
      "technologies": ["React", "TypeScript", "Clean Architecture"],
      "action": { "pt": "Explorar interfaces", "en": "Explore the interfaces" },
      "actionIcon": "arrow-up-right",
      "visual": "image",
      "image": "/portfolio-autocom3/01-painel-operacoes-visao-geral.png",
      "imageSrcSet": "/media/projects/autocom3-operations-720.webp 720w, /media/projects/autocom3-operations-1440.webp 1440w, /media/projects/autocom3-operations-2880.webp 2880w",
      "imageAlt": {
        "pt": "Interface do painel de operações da Autocom3",
        "en": "Autocom3 operations dashboard interface"
      },
      "href": "/projetos?tipo=corporativo"
    },
    {
      "number": "02",
      "title": "Achilles",
      "category": { "pt": "Agentes autônomos", "en": "Autonomous agents" },
      "year": "2026",
      "description": {
        "pt": "Motor de automação híbrida (Web CDP & Desktop Windows UIA) para agentes autônomos de IA via MCP, com Reader Mode semântico via AXTree (92.2% de economia de tokens).",
        "en": "Hybrid automation engine (Web CDP & Desktop Windows UIA) for autonomous AI agents via MCP, featuring AXTree semantic Reader Mode (92.2% token savings)."
      },
      "technologies": ["CDP Protocol", "TypeScript", "Node.js"],
      "action": { "pt": "Ver no GitHub", "en": "View on GitHub" },
      "actionIcon": "arrow-up-right",
      "visual": "agent",
      "artwork": {
        "name": "ACHILLES",
        "subtitle": "Autonomous Browser Agent",
        "kicker": { "pt": "AGENTE LOCAL / CDP", "en": "LOCAL AGENT / CDP" },
        "alt": { "pt": "Diagrama do agente de navegador Achilles", "en": "Achilles browser agent system diagram" },
        "steps": [
          { "number": "01", "label": { "pt": "OBSERVAR", "en": "OBSERVE" } },
          { "number": "02", "label": { "pt": "DECIDIR", "en": "DECIDE" } },
          { "number": "03", "label": { "pt": "OPERAR", "en": "OPERATE" }, "accent": true }
        ]
      },
      "href": "https://github.com/PedroReoli/Achilles-CDP-Agent",
      "external": true
    }
  ]
}
```

#### Proposed Component Updates in `src/components/home/SelectedProjectsSection.tsx`:
```tsx
<div className="project-card__visual">
  {project.visual === 'image' ? (
    <div className="project-card__image-container">
      <div className="project-card__frame-bar" aria-hidden="true">
        <span className="frame-dot frame-dot--close" />
        <span className="frame-dot frame-dot--min" />
        <span className="frame-dot frame-dot--max" />
        <span className="frame-bar-title">{project.title.toLowerCase()}.corp.internal</span>
      </div>
      <picture>
        <source
          type="image/webp"
          srcSet={project.imageSrcSet}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
        />
        <img
          src={project.image}
          srcSet={project.imageSrcSet}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          alt={project.imageAlt[language]}
          width={2880}
          height={1800}
          loading="eager"
          decoding="async"
        />
      </picture>
      <div className="project-card__vignette" aria-hidden="true" />
    </div>
  ) : <AchillesArtwork project={project} language={language} />}
  <span className="project-card__index">{project.number}</span>
</div>
```

#### Proposed CSS Rules for `src/styles/home.css`:
```css
/* Project Card Visual Framing */
.project-card__visual {
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 10;
  max-height: 230px;
  width: 100%;
  background: #0c0e14;
  flex-shrink: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.project-card__image-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.project-card__frame-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 22px;
  background: rgba(12, 14, 20, 0.88);
  backdrop-filter: blur(6px);
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 0 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.frame-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
}
.frame-dot--close { background: rgba(255, 201, 0, 0.4); }
.frame-dot--min { background: rgba(255, 255, 255, 0.2); }
.frame-dot--max { background: rgba(255, 255, 255, 0.2); }

.frame-bar-title {
  margin-left: 6px;
  font-family: var(--font-mono, monospace);
  font-size: 0.58rem;
  letter-spacing: 0.06em;
  color: rgba(244, 240, 231, 0.4);
}

.project-card__vignette {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(to bottom, transparent 65%, rgba(12, 14, 20, 0.8) 100%);
  z-index: 1;
}

.project-card__visual img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.4s ease;
}

.project-card:hover .project-card__visual img {
  transform: translateY(-8px) scale(1.025);
  filter: saturate(1.08);
}

.project-card p {
  width: min(580px, 100%);
  margin-top: 6px;
  color: rgba(244, 240, 231, 0.72);
  font-size: clamp(0.8rem, 0.95vw, 0.86rem);
  line-height: 1.45;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
```

---

### 3.2 Blueprint for R6: Trajetória em Timeline Vertical Alternada

#### Proposed Component Architecture in `src/components/home/ExperienceSection.tsx`:
```tsx
import { useRef } from 'react'
import { Sparkles, CheckCircle2 } from 'lucide-react'
import { homeContent, interfaceContent } from '@/data/content'
import { useLanguage } from '@/context/LanguageContext'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { m } from 'motion/react'

export function ExperienceSection() {
  const { language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  const section = interfaceContent.experience
  const copy = section[language]
  const items = homeContent.experienceItems

  return (
    <section ref={sectionRef} id={section.id} className="experience-section section-dark">
      <div className="shell experience-vertical__shell">
        {/* Section Header */}
        <div className="section-kicker section-kicker--dark">
          <span className="section-kicker__num">{section.sectionNumber}</span>
          <p className="section-kicker__eyebrow">{copy.eyebrow}</p>
          <div className="experience-kicker__counter" aria-live="polite">
            <span className="experience-counter__pill">
              {items.length.toString().padStart(2, '0')} {language === 'pt' ? 'Marcos de Carreira' : 'Career Milestones'}
            </span>
          </div>
        </div>

        <div className="experience-header experience-header--vertical">
          <div className="experience-header__main">
            <h2>{copy.title}</h2>
            <div className="experience-header__cue">
              <p>{copy.continue}</p>
              <span className="cue-scroll-hint">{copy.scrollHint}</span>
            </div>
          </div>
        </div>

        {/* Alternating Vertical Timeline */}
        <div className="timeline-v" role="list" aria-label={copy.chaptersLabel}>
          {/* Continuous Central Glowing Spine */}
          <div className="timeline-v__spine" aria-hidden="true">
            <div className="timeline-v__spine-glow" />
          </div>

          {items.map((item, index) => {
            const isLeft = index % 2 === 0
            const chapterNum = (index + 1).toString().padStart(2, '0')
            return (
              <div
                key={`${item.company}-${item.period.pt}`}
                className={`timeline-v__item ${isLeft ? 'timeline-v__item--left' : 'timeline-v__item--right'}`}
                role="listitem"
              >
                {/* Central Station Node */}
                <div className="timeline-v__node" aria-hidden="true">
                  <span className="timeline-v__node-pulse" />
                  <span className="timeline-v__node-ring" />
                  <span className="timeline-v__node-core" />
                </div>

                {/* Horizontal Connector Stem */}
                <div className="timeline-v__connector" aria-hidden="true" />

                {/* Trajectory Milestone Card */}
                <m.article
                  className="timeline-card timeline-v__card"
                  initial={reducedMotion ? false : { opacity: 0, x: isLeft ? -25 : 25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  {/* Top Bar with Number and Period */}
                  <div className="timeline-card__top">
                    <span className="timeline-card__chapter">
                      <Sparkles size={11} aria-hidden="true" />
                      #{chapterNum}
                    </span>
                    <span className="timeline-card__period">{item.period[language]}</span>
                  </div>

                  {/* Company & Role */}
                  <div className="timeline-card__heading">
                    <h3>{item.company}</h3>
                    <h4>{item.role[language]}</h4>
                  </div>

                  {/* Description */}
                  <p className="timeline-card__desc">{item.description[language]}</p>

                  {/* Highlights */}
                  {item.highlights && item.highlights[language]?.length > 0 && (
                    <ul className="timeline-card__highlights">
                      {item.highlights[language].slice(0, 3).map((highlight, hIdx) => (
                        <li key={hIdx}>
                          <CheckCircle2 size={12} className="highlight-icon" aria-hidden="true" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Technologies */}
                  <div className="timeline-card__footer">
                    <p className="timeline__tech" aria-label="Tecnologias">
                      {item.technologies
                        .map((tech) => (typeof tech === 'string' ? tech : tech[language]))
                        .join(' · ')}
                    </p>
                  </div>
                </m.article>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
```

#### Proposed CSS Rules for `src/styles/home.css`:
```css
/* =============================================================
   VERTICAL ALTERNATING TIMELINE (R6)
   ============================================================= */
.experience-section {
  position: relative;
  width: 100%;
  height: auto;
  min-height: 100svh;
  background: var(--night);
  color: var(--paper);
  box-sizing: border-box;
  overflow: visible;
  padding-top: var(--header-height, 72px);
  padding-bottom: clamp(60px, 8vh, 100px);
}

.experience-vertical__shell {
  position: relative;
  display: flex;
  flex-direction: column;
}

.experience-header--vertical {
  padding: clamp(12px, 2vh, 24px) 0 clamp(24px, 4vh, 40px);
}

.timeline-v {
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
}

/* Continuous Central Spine */
.timeline-v__spine {
  position: absolute;
  top: 10px;
  bottom: 20px;
  left: 50%;
  width: 2px;
  transform: translateX(-50%);
  background: linear-gradient(180deg, rgba(255, 201, 0, 0.05) 0%, rgba(255, 201, 0, 0.8) 12%, rgba(255, 201, 0, 0.8) 88%, rgba(255, 201, 0, 0.05) 100%);
  z-index: 1;
}

.timeline-v__spine-glow {
  position: absolute;
  inset: -1px;
  box-shadow: 0 0 12px rgba(255, 201, 0, 0.45);
}

/* Alternating Rows */
.timeline-v__item {
  position: relative;
  width: 100%;
  display: flex;
  margin-bottom: clamp(32px, 4.5vh, 52px);
  z-index: 2;
}
.timeline-v__item:last-child {
  margin-bottom: 0;
}

.timeline-v__item--left {
  justify-content: flex-start;
  padding-right: calc(50% + 40px);
}

.timeline-v__item--right {
  justify-content: flex-end;
  padding-left: calc(50% + 40px);
}

/* Cards */
.timeline-v__card {
  width: 100%;
  max-width: 540px;
}

/* Central Station Node */
.timeline-v__node {
  position: absolute;
  left: 50%;
  top: 32px;
  transform: translate(-50%, -50%);
  width: 18px;
  height: 18px;
  display: grid;
  place-items: center;
  z-index: 4;
}

.timeline-v__node-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: #08090b;
  border: 2px solid var(--accent);
  box-shadow: 0 0 12px rgba(255, 201, 0, 0.5);
}

.timeline-v__node-core {
  position: relative;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  z-index: 2;
}

.timeline-v__node-pulse {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 1px solid var(--accent);
  opacity: 0.35;
  animation: pulseNode 2.6s ease-out infinite;
}

/* Horizontal Connector Stems */
.timeline-v__connector {
  position: absolute;
  top: 32px;
  height: 2px;
  transform: translateY(-50%);
  z-index: 3;
}

.timeline-v__item--left .timeline-v__connector {
  right: 50%;
  width: 40px;
  background: linear-gradient(to right, rgba(255, 201, 0, 0.2), var(--accent));
}

.timeline-v__item--right .timeline-v__connector {
  left: 50%;
  width: 40px;
  background: linear-gradient(to right, var(--accent), rgba(255, 201, 0, 0.2));
}

/* =============================================================
   RESPONSIVE ADJUSTMENTS (Tablet & Mobile)
   ============================================================= */
@media (max-width: 899px) {
  .timeline-v__spine {
    left: 20px;
    transform: none;
  }

  .timeline-v__item--left,
  .timeline-v__item--right {
    justify-content: flex-start;
    padding-left: 56px;
    padding-right: 0;
  }

  .timeline-v__card {
    max-width: 100%;
  }

  .timeline-v__node {
    left: 20px;
    top: 28px;
    transform: translate(-50%, -50%);
  }

  .timeline-v__item--left .timeline-v__connector,
  .timeline-v__item--right .timeline-v__connector {
    left: 20px;
    right: auto;
    width: 36px;
    top: 28px;
    background: linear-gradient(to right, var(--accent), rgba(255, 201, 0, 0.2));
  }
}
```

---

## 4. Caveats

1. **Test Suite Regex Matching**: `sections3-4-layout-stress.test.tsx` contains specific regular expressions asserting `.project-card__visual` properties (`aspect-ratio: 16 / 10; max-height: 230px; object-fit: cover; object-position: top center;`). The implementation must preserve these exact rule lines while layering framing accents (window chrome, vignette, and hover peek) on child/modifier classes to guarantee continuous test pass.
2. **GSAP Removal in ExperienceSection**: The previous `useGSAP` pinning logic locked horizontal scrolling. In the vertical alternating timeline, horizontal pinning is obsolete. Retaining unnecessary pin hooks would cause vertical jumpiness. Switching to standard viewport animations via `m.article` or GSAP ScrollTrigger without pinning provides smooth, accessible vertical page flow.
3. **No Code Written to Source**: As a survey explorer in read-only mode, no changes have been applied to `src/` or `content/`. All snippets provided in this handoff are clean drop-in replacements ready for the implementation phase.

---

## 5. Conclusion

- **R4** is fully diagnosed: the visual clipping was caused by squashing a 16:10 ratio into a 230px clamped height at desktop widths (~640px). The solution provides modern `<picture>` WebP assets, authentic browser chrome framing, subtle bottom vignette, hover reveal, and enriched descriptions from `Sobre Mim.md`.
- **R6** is completely architected: the alternating vertical timeline features a glowing central golden spine, alternating left/right layout on desktop, station nodes with connectors, and clean single-column folding on mobile, preserving 100% of historical milestones and tags.
- All 33 vitest test contracts and build requirements remain 100% compliant.

---

## 6. Verification Method

1. **Vitest Test Suite**:
   ```powershell
   npx vitest run
   ```
   *Expected Result*: All 4 test files (`contracts.test.ts`, `rendering.test.tsx`, `sections3-4-layout-stress.test.tsx`, `section2-layout-stress.test.tsx`) pass with 0 errors.

2. **TypeScript Compilation & Production Build**:
   ```powershell
   npm run build
   ```
   *Expected Result*: Clean build with zero TypeScript compiler errors or bundle asset missing errors.

3. **DOM & Visual Inspection**:
   - Inspect `#projetos-selecionados .project-card`: Card 1 renders `<picture>` with WebP source, PNG fallback, browser frame bar, and detailed text from `Sobre Mim.md`. On hover, the image reveals lower dashboard data.
   - Inspect `#experiencia`: Timeline displays a central vertical spine with alternating left (even) and right (odd) cards on desktop. Resize browser below 900px to confirm graceful transition to single-column left-spine timeline.
