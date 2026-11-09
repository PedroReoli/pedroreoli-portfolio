# Section 2 ("Quem sou eu") Architecture Audit & Revamp Blueprint

## 1. Observation

### 1.1 Component Location & Hierarchy
- **Primary Component File**: `src/components/home/AboutSection.tsx` (Lines 1–53)
- **Parent Container / Route**: `src/pages/HomePage.tsx` (Line 18 `<AboutSection />`)
- **Data Source**: `content/interfaceContent.json` (Lines 51–67, under key `"about"`) imported via `@/data/content` as `interfaceContent.about`.
- **TypeScript Types**: `src/types/content.ts` (Lines 100–125, `InterfaceContent['about']`).
- **Dependencies & Icons**: Lucide icon `ArrowDownRight` (`lucide-react`), `useLanguage` (`@/context/LanguageContext`), `useReveal` (`@/hooks/useReveal`), and `gsap` / `motion` available in project dependencies (`package.json`).

### 1.2 The Photo Asset & Current Rendering
- **File on Disk**: `public/eu-profissional.png` (Resolution: **1254 x 1254 px**, 24-bit PNG, 1:1 square aspect ratio). High-definition portrait of Pedro Lucas Reis in black t-shirt and glasses with subtle studio rim lighting.
- **Current Rendered Markup (`AboutSection.tsx:22-31`)**:
  ```tsx
  <div className="about__portrait" data-reveal>
    <img
      src={about.portrait.src}
      width={about.portrait.width}
      height={about.portrait.height}
      alt={copy.portraitAlt}
      loading="lazy"
    />
    <div><span>{copy.portraitRole}</span><strong>{copy.areas}</strong></div>
  </div>
  ```
- **Current Styling (`src/styles/home.css:25-28`)**:
  ```css
  .about__portrait {
    position: relative;
    overflow: hidden;
    aspect-ratio: 1 / 1.03;
    max-height: clamp(240px, 30vh, 320px);
    border-radius: var(--radius-lg);
    background: #d8d4ca;
  }
  .about__portrait::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(7,11,20,.82), transparent 45%);
  }
  .about__portrait img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: saturate(.72) contrast(1.05);
  }
  .about__portrait > div {
    position: absolute;
    z-index: 2;
    right: 24px;
    bottom: 22px;
    left: 24px;
    display: flex;
    justify-content: space-between;
    color: white;
    font-size: .66rem;
    letter-spacing: .1em;
    text-transform: uppercase;
  }
  ```
- **Critical Photo Observation**:
  - The photo is capped at `max-height: clamp(240px, 30vh, 320px)`. On a 1080p display (viewport height 1080px minus 72px header = 1008px), `30vh` caps the photo at **320px**. Inside an available grid height of ~800px, 320px represents less than 40% of the available height!
  - There is NO picture/gallery frame ("quadro"). It is merely a rounded box (`border-radius: 26px`) with an aggressive dark gradient covering the bottom half of Pedro's portrait, upon which text is superimposed.

### 1.3 "Quem sou eu" Typography & Content Flow
- **Current Rendered Markup (`AboutSection.tsx:33-40`)**:
  ```tsx
  <div className="about__copy">
    <p className="overline" data-reveal>{copy.title}</p>
    <h2 data-reveal>{copy.summary}</h2>
    <a href="#projetos-selecionados" className="text-link" data-reveal>
      {interfaceContent.hero[language].action}<ArrowDownRight aria-hidden="true" />
    </a>
  </div>
  ```
- **Current Styling (`src/styles/home.css:29-30`)**:
  ```css
  .about__copy .overline { color: var(--accent); }
  .about__copy h2 {
    margin: clamp(8px, 1.2vh, 14px) 0 clamp(10px, 1.5vh, 18px);
    font-family: var(--font-display);
    font-size: clamp(2.25rem, 4.4vw, 4.8rem);
    font-weight: 700;
    letter-spacing: -.055em;
    line-height: 1.02;
  }
  ```
- **Critical Typography Observation**:
  - `copy.title` ("Quem eu sou" / "Who I am") is demoted to a tiny `.overline` (`0.72rem` / ~11.5px, uppercase, amber). It is visually buried.
  - `copy.summary` (*"Engenheiro Full Stack com foco em frontend, ERPs e SaaS. Projeto interfaces, APIs e integrações do primeiro fluxo à produção."*) is placed directly inside `<h2>`. At `clamp(2.25rem, 4.4vw, 4.8rem)` (up to 76.8px), a 22-word explanatory paragraph explodes across 3–4 sprawling lines, making it difficult to read and dominating the entire vertical space.
  - The editorial serif typography (`Instrument Serif` italic) that gives the Hero, Projects, and Purpose sections their premium character is completely absent here.

### 1.4 Layout Dimensions & Compactness Flaws
- **Section & Shell Constraints (`src/styles/home.css:22-24`, `src/styles/responsive.css:1-11`)**:
  ```css
  .about {
    position: relative;
    height: 100svh;
    min-height: 100svh;
    padding-top: var(--header-height, 72px);
    padding-bottom: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .about > .shell {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: clamp(14px, 2vh, 24px);
    min-height: 0;
  }
  .about__grid {
    display: grid;
    grid-template-columns: .82fr 1.18fr;
    gap: clamp(24px, 4vw, 64px);
    align-items: center;
    padding: clamp(10px, 1.8vh, 20px) 0;
    flex: 1;
    min-height: 0;
  }
  ```
- **Critical Layout Observation**:
  - `justify-content: space-between` pulls the kicker to the top, the grid to the middle, and `.stats-grid` to the bottom border. Because the photo is capped at 320px while the text column is tall, the photo floats in empty space.
  - In `stats-grid` (`home.css:31-35`), the labels have `max-width: 150px`, causing words to wrap awkwardly (e.g. "menos tempo de desenvolvimento" wraps onto 4 lines).
  - The elements do not feel integrated as a compact, unified showcase. Instead, they feel like three disconnected bands across a forced 100svh container.

### 1.5 Existing Tests & Constraints
- **Test File 1: `src/test/rendering.test.tsx`**:
  - Line 38: `expect(screen.getByText('Quem eu sou')).toBeInTheDocument();`
  - Line 39: `expect(screen.getAllByText('04')[0]).toBeInTheDocument();`
  - Line 40: `expect(screen.getByText('anos de experiência')).toBeInTheDocument();`
  - Line 78: `expect(screen.getByText('Who I am')).toBeInTheDocument();`
  - Line 79: `expect(screen.getByText('years of experience')).toBeInTheDocument();`
- **Test File 2: `src/test/contracts.test.ts`**:
  - Line 101: `checkFile(interfaceContentRaw.about.portrait.src);` (verifies `public/eu-profissional.png` exists).
  - Lines 158–187: Strict interface color palette contract: only neutral shades (`#182033`, `#111010`, `#f3efe7`, `#fbf9f5`) and solar amber (`#FBBF24`, `#B45309`, `#78350F`, and CSS variables `--color-accent`, `--color-accent-ink`, `--color-accent-emissive`). No disallowed colors like `#2dd4bf` or `#8b5cf6`.

---

## 2. Logic Chain

1. **User Observation**: *"aumente a foto"* and *"deixe ela num frame como se fosse quadro"*
   - **Reasoning**: The image asset is high quality (1254x1254 px). However, `home.css:25` hard-clamps it to `clamp(240px, 30vh, 320px)`. Increasing the frame to `clamp(380px, 50vh, 480px)` (or ~45% of viewport height) restores its dignity.
   - **Picture Frame ("Quadro") Art Direction**: Drawing from CodePen gallery and museum frame best practices, a real art frame requires:
     1. **Outer Moulding**: Deep charcoal `#182033`/`#111216` frame with beveled edges and ambient wall drop shadow (`box-shadow: 0 24px 48px -12px rgba(0,0,0,0.35)`).
     2. **Inner Sight Line**: Hairline gold leaf / solar amber inner fillet (`inset 0 0 0 1px rgba(251, 191, 36, 0.35)`).
     3. **Passe-Partout (Mat Board)**: Pristine archival off-white matting (`#fbf9f5` or `#ffffff`, 16–20px padding) with recessed inner bevel shadow (`box-shadow: inset 0 2px 8px rgba(0,0,0,0.12)`).
     4. **Museum Plaque**: A refined brass/amber exhibition plaque at the bottom of the matting or frame reading: *"PEDRO LUCAS REIS — FULL STACK & ARQUITETURA"*.

2. **User Observation**: *"melhore a forma que o texto do quem sou eu aparece"*
   - **Reasoning**: Currently, "Quem eu sou" is rendered in a tiny overline while the entire 22-word summary text is stuffed into `<h2>` at 4.8rem.
   - **Solution**:
     1. Promote "Quem eu sou" / "Who I am" to the primary heading (`<h2>`), styled with editorial elegance: display sans + `Instrument Serif` italic accent (*"QUEM"* + *italic "EU SOU."*).
     2. Render the summary description as an editorial lead paragraph (`<p className="about__lead">`), sized at `clamp(1.1rem, 1.55vw, 1.4rem)` with `line-height: 1.55` and balanced rag.
     3. Extract the career role and specializations into refined badge pills (*"Full Stack"*, *"Arquitetura de Sistemas"*, *"IA Aplicada"*).
     4. Retain exact string matches for `Quem eu sou` / `Who I am` so Vitest rendering tests pass without any regression.

3. **User Observation**: *"e o conteudo nao esta compacto"* & *"a altura esta baixa dessa sessao"*
   - **Reasoning**: The current layout suffers from extreme disproportion: a shrunken 320px photo alongside an excessively large 4.8rem paragraph, with `justify-content: space-between` forcing elements to the extreme top and bottom edges of the screen.
   - **Solution**:
     - Unify the layout into a balanced two-column editorial spread (`grid-template-columns: 1fr 1.15fr` or `minmax(340px, 420px) 1fr`), where the framed portrait and the editorial copy align vertically from top to bottom.
     - Move the stats grid into closer visual proximity with the main narrative or give it a tighter, cohesive card structure that anchors the bottom of the section naturally rather than appearing as an isolated footer.
     - Allow the section adequate vertical presence (`min-height: 100svh`) while ensuring the content utilizes the available height gracefully without cramping or overflowing.

4. **User Observation**: *"e poderiam ter animacoes de lazy loading nesse sistema"*
   - **Reasoning**: Currently, `AboutSection` relies on a generic `useReveal(sectionRef)` batch trigger that merely shifts all elements by `y: 28`.
   - **Solution**: Implement progressive scroll-triggered animations:
     1. **Quadro Unveiling**: As the section enters the viewport, the art frame scales smoothly into place (`scale: 0.96` to `1.0`, `opacity: 0` to `1`), while the portrait image undergoes a subtle zoom settle (`scale: 1.08` to `1.0`), simulating an exhibition spotlight turning on.
     2. **Editorial Text Stagger**: Staggered GSAP reveal for Kicker -> Title ("Quem eu sou") -> Lead summary -> Specialization badges -> Action button.
     3. **Stats Micro-Stagger**: Each stat counter enters with a crisp sequential delay (`stagger: 0.08s`), with the numeral gently scaling into position.
     4. **Accessibility Compliance**: Fully respect `useReducedMotion()`; when enabled, all transforms and opacity transitions default immediately to final visible states.

---

## 3. Caveats

1. **Test Exact Match Requirement**:
   - `src/test/rendering.test.tsx:38` tests `screen.getByText('Quem eu sou')` and `screen.getByText('Who I am')`. The text cannot be broken into separate DOM elements (e.g. `<span>Quem</span> <span>eu</span> <span>sou</span>` would fail `getByText('Quem eu sou')`). It must exist as a complete text node within an element.
   - `src/test/rendering.test.tsx:39-40` tests `screen.getAllByText('04')[0]` and `screen.getByText('anos de experiência')`. The stat values and localized labels must remain verbatim in the DOM.
2. **Palette Contract**:
   - `src/test/contracts.test.ts:158-187` inspects all CSS files in `src/styles/` for unapproved colors. Do NOT introduce raw color hexes outside the approved list (`#FBBF24`, `#B45309`, `#78350F`, `#182033`, `#111010`, neutrals). Use CSS variables (`var(--accent)`, `var(--night)`, `var(--paper)`, `var(--paper-light)`, `var(--ink)`, `var(--ink-soft)`).
3. **Desktop Full Viewport Mandate**:
   - Requirement R1 from the user's previous request requires that content sections fit within standard 1080p desktop viewports without requiring vertical scrolling. While enlarging the photo to ~420–460px and expanding typography, the vertical budget must be respected so that the kicker + grid + stats fit comfortably within the 1008px usable desktop height.

---

## 4. Conclusion & Recommendations

### 4.1 Recommended Component Architecture (`AboutSection.tsx`)
```tsx
import { useRef } from 'react'
import { ArrowDownRight, Sparkles, CheckCircle2 } from 'lucide-react'
import { interfaceContent } from '@/data/content'
import { useLanguage } from '@/context/LanguageContext'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export function AboutSection() {
  const { language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const about = interfaceContent.about
  const copy = about[language]

  // Dedicated Lazy Loading & Reveal Animation
  useGSAP(
    () => {
      if (!sectionRef.current || reducedMotion) return

      // Animate Art Frame
      gsap.fromTo(
        '.about__frame-wrapper',
        { opacity: 0, scale: 0.94, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Animate Portrait Image Settle
      gsap.fromTo(
        '.about__frame-art img',
        { scale: 1.1, filter: 'saturate(0.5) contrast(1.1)' },
        {
          scale: 1,
          filter: 'saturate(0.85) contrast(1.02)',
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          },
        }
      )

      // Stagger Editorial Copy & Badges
      gsap.fromTo(
        '.about__copy [data-about-reveal]',
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      )

      // Stagger Stats Cards
      gsap.fromTo(
        '.stats-grid > div',
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.stats-grid',
            start: 'top 90%',
          },
        }
      )
    },
    { scope: sectionRef, dependencies: [reducedMotion, language] }
  )

  return (
    <section ref={sectionRef} id={about.id} className="about section-light">
      <div className="shell">
        {/* Section Kicker */}
        <div className="section-kicker" data-about-reveal>
          <span>{about.sectionNumber}</span>
          <p>{copy.eyebrow}</p>
          <p>{copy.location}</p>
        </div>

        {/* Main Grid: Frame (Quadro) + Editorial Copy */}
        <div className="about__grid">
          {/* Quadro de Arte / Picture Frame */}
          <div className="about__frame-wrapper">
            <div className="about__frame">
              {/* Passe-partout / Mat Board */}
              <div className="about__mat-board">
                <div className="about__frame-art">
                  <img
                    src={about.portrait.src}
                    width={about.portrait.width}
                    height={about.portrait.height}
                    alt={copy.portraitAlt}
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Subtle Museum Sheen / Reflection */}
                  <div className="about__frame-glare" aria-hidden="true" />
                </div>
                {/* Museum Exhibition Plaque */}
                <div className="about__plaque">
                  <span className="about__plaque-name">{about.portrait.name}</span>
                  <span className="about__plaque-meta">{copy.portraitRole} · {copy.areas}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Editorial Presentation Copy */}
          <div className="about__copy">
            <div className="about__header-group" data-about-reveal>
              <span className="about__tagline">{copy.eyebrow}</span>
              <h2 className="about__heading">
                {copy.title}<em>.</em>
              </h2>
            </div>

            <p className="about__lead" data-about-reveal>
              {copy.summary}
            </p>

            {/* Specialization Badges */}
            <div className="about__badges" data-about-reveal>
              <span className="about__badge">
                <CheckCircle2 size={13} aria-hidden="true" /> Frontend Architecture
              </span>
              <span className="about__badge">
                <CheckCircle2 size={13} aria-hidden="true" /> SaaS & Enterprise ERPs
              </span>
              <span className="about__badge">
                <CheckCircle2 size={13} aria-hidden="true" /> Autonomous AI Agents
              </span>
            </div>

            {/* Action Callout */}
            <div className="about__action" data-about-reveal>
              <a href="#projetos-selecionados" className="about__cta-link">
                <span>{interfaceContent.hero[language].action}</span>
                <ArrowDownRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid" aria-label={copy.statsLabel}>
          {about.stats.map((stat) => (
            <div key={stat.value}>
              <strong>{stat.value}</strong>
              <span>{stat[language]}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### 4.2 Recommended CSS Rules (`src/styles/home.css`)
```css
/* ==========================================================================
   Section 2: About ("Quem sou eu") — Gallery Frame & Editorial Overhaul
   ========================================================================== */

.about {
  position: relative;
  height: 100svh;
  min-height: 100svh;
  padding-top: var(--header-height, 72px);
  padding-bottom: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--paper);
  color: var(--ink);
}

.about > .shell {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: clamp(12px, 1.8vh, 20px);
  min-height: 0;
}

.about__grid {
  display: grid;
  grid-template-columns: minmax(320px, 420px) 1.25fr;
  gap: clamp(28px, 4.5vw, 68px);
  align-items: center;
  padding: clamp(8px, 1.5vh, 18px) 0;
  flex: 1;
  min-height: 0;
}

/* --- Picture Frame ("Quadro de Arte") --- */
.about__frame-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 440px;
  width: 100%;
  margin-inline: auto;
}

.about__frame {
  position: relative;
  width: 100%;
  padding: 10px; /* Outer Moulding */
  background: linear-gradient(145deg, #182033 0%, #111216 100%);
  border-radius: var(--radius-md);
  box-shadow:
    0 24px 48px -12px rgba(7, 11, 20, 0.38),
    0 8px 16px -6px rgba(7, 11, 20, 0.22),
    inset 0 1px 1px rgba(255, 255, 255, 0.2),
    inset 0 -1px 2px rgba(0, 0, 0, 0.5);
  transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.35s ease;
}

.about__frame:hover {
  transform: translateY(-4px);
  box-shadow:
    0 32px 56px -12px rgba(7, 11, 20, 0.45),
    0 12px 24px -6px rgba(7, 11, 20, 0.28),
    inset 0 1px 1px rgba(255, 255, 255, 0.25);
}

/* Passe-partout (Mat Board) */
.about__mat-board {
  position: relative;
  padding: clamp(12px, 1.8vh, 16px) clamp(12px, 1.8vh, 16px) 12px;
  background: var(--paper-light);
  border-radius: var(--radius-sm);
  box-shadow:
    inset 0 2px 6px rgba(0, 0, 0, 0.16),
    inset 0 0 0 1px rgba(24, 32, 51, 0.08);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Art Canvas Opening */
.about__frame-art {
  position: relative;
  overflow: hidden;
  aspect-ratio: 1 / 1;
  max-height: clamp(280px, 38vh, 390px);
  border-radius: var(--radius-xs);
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.15),
    inset 0 0 0 1px rgba(24, 32, 51, 0.18);
  background: #d8d4ca;
}

.about__frame-art img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Glass Sheen Reflection */
.about__frame-glare {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.04) 35%, transparent 60%);
}

/* Museum Plaque */
.about__plaque {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 4px 8px 2px;
  border-top: 1px solid rgba(24, 32, 51, 0.08);
}

.about__plaque-name {
  font-family: var(--font-display);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink);
}

.about__plaque-meta {
  font-size: 0.58rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-soft);
  margin-top: 2px;
}

/* --- Editorial Typography & Copy Column --- */
.about__copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 0;
  max-width: 680px;
}

.about__header-group {
  margin-bottom: clamp(8px, 1.2vh, 14px);
}

.about__tagline {
  display: inline-block;
  color: var(--accent);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  margin-bottom: 6px;
}

.about__heading {
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 4.6vw, 4.4rem);
  font-weight: 700;
  letter-spacing: -0.06em;
  line-height: 0.94;
  text-transform: uppercase;
  color: var(--ink);
}

.about__heading em {
  color: var(--accent);
  font-family: var(--font-serif);
  font-style: italic;
  font-weight: 400;
}

.about__lead {
  font-size: clamp(1.04rem, 1.45vw, 1.28rem);
  line-height: 1.52;
  color: var(--ink);
  font-weight: 450;
  margin-bottom: clamp(12px, 1.8vh, 18px);
}

/* Specialization Badges */
.about__badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: clamp(14px, 2vh, 22px);
}

.about__badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border: 1px solid var(--line-light);
  border-radius: var(--radius-sm);
  background: var(--paper-light);
  color: var(--ink);
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.about__badge svg {
  color: var(--accent);
}

/* CTA Action */
.about__action {
  margin-top: 2px;
}

.about__cta-link {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  min-height: 44px;
  padding: 0 20px;
  border-radius: var(--radius-sm);
  background: var(--night);
  color: var(--paper);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease;
}

.about__cta-link:hover {
  background: var(--accent);
  color: var(--night);
  transform: translateY(-2px);
}

.about__cta-link svg {
  transition: transform 0.25s ease;
}

.about__cta-link:hover svg {
  transform: translate(3px, 3px);
}
```

---

## 5. Verification Method

To independently verify this architectural audit and subsequent implementation:

1. **Automated Unit & Integration Tests**:
   ```bash
   npm test
   ```
   - Must pass `12 passed (12)`.
   - Specifically verifies `src/test/rendering.test.tsx` (`screen.getByText('Quem eu sou')`, `04`, `anos de experiência`, `Who I am`, `years of experience`).
   - Verifies `src/test/contracts.test.ts` (photo asset exists, approved palette colors only).

2. **TypeScript Strict Type Check**:
   ```bash
   npx tsc --noEmit
   ```
   - Must exit with code 0.

3. **Vite Production Build**:
   ```bash
   npm run build
   ```
   - Must bundle successfully with 0 errors.

4. **Visual & Responsive Verification**:
   - Inspect Section 2 on desktop (`1920x1080` and `1440x900`):
     - The photo must appear in an art gallery frame with outer dark beveled border, mat-board passe-partout, and brass plaque.
     - The photo must be noticeably larger (~380–420px) rather than shrunken to 320px.
     - The heading must display "Quem eu sou" prominently with editorial typography.
     - The summary body text must be clean and compact at ~1.2rem rather than 4.8rem.
     - Section must fit smoothly in the 100svh viewport without vertical scroll.
   - Inspect mobile (`<= 760px`):
     - Grid wraps into a single column.
     - Picture frame resizes responsively while retaining its matting and plaque.
