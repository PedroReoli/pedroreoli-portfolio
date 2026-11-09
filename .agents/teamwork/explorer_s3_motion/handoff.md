# Handoff Report: Explorer 3 — Motion & Layout Architecture for Section 2

## 1. Observation

### 1.1 Existing Animation Ecosystem
Direct inspection of `package.json` reveals the following animation and graphics packages:
- `"gsap": "3.15.0"` (Line 19)
- `"@gsap/react": "2.1.2"` (Line 16)
- `"motion": "14.9.0"` (Line 21 — modern successor to Framer Motion supporting React 19)
- `"three": "0.187.0"`, `"@react-three/fiber": "9.8.2"`, `"@react-three/drei": "10.7.9"` (Lines 17-18, 26)

Across the existing codebase, animation is currently split into two disjointed patterns:
1. **Global Scroll Batch Hook (`src/hooks/useReveal.ts`)**:
   ```ts
   // src/hooks/useReveal.ts:20-24
   ScrollTrigger.batch(elements, {
     start: 'top 90%',
     once: true,
     onEnter: (batch) => gsap.fromTo(batch, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: .68, stagger: .07, ease: 'power3.out', overwrite: true }),
   })
   ```
   - This hook applies a uniform `{ opacity: 0, y: 28 } -> { opacity: 1, y: 0 }` tween to all elements carrying `[data-reveal]`.
   - It contains NO support for specialized motion (clip-path image reveals, zoom settling, text line masking, or metric count-ups).
   - Because `[data-reveal]` has no pre-initialization opacity in CSS, elements risk flashing visible before `ScrollTrigger.batch` initializes.
2. **Hero Section Timeline (`src/components/home/HeroSection.tsx`)**:
   - `HeroSection.tsx` demonstrates how high-end editorial reveals should be done in this codebase: it uses `@gsap/react` `useGSAP` with a scoped timeline animating `[data-hero-line]` with `yPercent: 115` mask reveals and `[data-hero-meta]`.
3. **Micro-interactions with Motion (`src/App.tsx`, `SelectedProjectsSection.tsx`, etc.)**:
   - `App.tsx` sets `<MotionConfig reducedMotion="user">` and `<LazyMotion features={domAnimation} strict>`.
   - Section components use `<m.article whileHover={{ y: -5 }}>` for hover elevation.

### 1.2 Section 2 ("About") Layout & Height Sizing
Inspection of `src/styles/home.css` lines 21-35 and `src/styles/responsive.css` lines 1-18 reveals why Section 2 feels squashed and fragmented:
```css
/* src/styles/home.css:22-28 */
.about { position: relative; height: 100svh; min-height: 100svh; padding-top: var(--header-height, 72px); padding-bottom: 0; display: flex; flex-direction: column; overflow: hidden; }
.about > .shell { flex: 1; display: flex; flex-direction: column; justify-content: space-between; padding-bottom: clamp(14px, 2vh, 24px); min-height: 0; }
.about__grid { display: grid; grid-template-columns: .82fr 1.18fr; gap: clamp(24px, 4vw, 64px); align-items: center; padding: clamp(10px, 1.8vh, 20px) 0; flex: 1; min-height: 0; }
.about__portrait { position: relative; overflow: hidden; aspect-ratio: 1 / 1.03; max-height: clamp(240px, 30vh, 320px); border-radius: var(--radius-lg); background: #d8d4ca; }
```
```css
/* src/styles/responsive.css:1-11 */
@media (min-width: 1101px) {
  .hero,
  .about,
  .work-section,
  .stack-section,
  .purpose-section,
  .contact-section {
    height: 100svh;
    min-height: 100svh;
    overflow: hidden;
  }
}
```
Key observations on Section 2's current layout:
- **Artificially clamped portrait**: Line 25 clamps `.about__portrait` to `max-height: clamp(240px, 30vh, 320px)`. On a 1080p screen, the portrait is restricted to ~280px–320px, making it appear miniature.
- **Disconnected 3-Tier Distribution**: Line 23 sets `.about > .shell { justify-content: space-between; }`. As a result:
  1. The `.section-kicker` is pushed to the top ceiling.
  2. The `.about__grid` (photo + text) floats loosely in the center.
  3. The `.stats-grid` is pushed to the floor.
  The content is visually scattered with empty voids between the tiers, directly causing the user's perception: *"e o conteudo nao esta compacto"*.
- **Shallow Middle Band**: Because the photo is capped at 320px and padding was dialed down to prevent overflow, the entire visual core of Section 2 is compressed into a narrow ~320px horizontal band in the center of the viewport, directly causing the user's perception: *"a altura esta baixa dessa sessao"*.

### 1.3 Test & Contract Constraints
- Running `npm test` executes 12 tests across `rendering.test.tsx` and `contracts.test.ts`. All 12 tests pass (0 failures).
- Contract verification confirms:
  - Required DOM texts in PT: `"Quem eu sou"`, `"04"`, `"anos de experiência"` (`src/test/rendering.test.tsx:38-40`).
  - Required DOM texts in EN: `"Who I am"`, `"years of experience"` (`src/test/rendering.test.tsx:78-79`).
  - Asset path: `/eu-profissional.png` (`src/test/contracts.test.ts:101`).
  - Authoring colors: Must only use approved design tokens and neutrals (`#FBBF24`, `#B45309`, `#78350F`, `#182033`, `#111010`, `var(--accent)`, `var(--paper)`, `var(--night)`).

---

## 2. Logic Chain

### 2.1 Resolving the "Altura Baixa" vs "Conteúdo Não Compacto" Paradox
The user request contains two seemingly contradictory statements:
- *"a altura esta baixa dessa sessao"* (the height is low for this section)
- *"e o conteudo nao esta compacto"* (and the content is not compact)

Tracing the causal chain:
1. **Observation**: In Round 2, orchestrator_2 enforced strict `height: 100svh; overflow: hidden;` and clamped the portrait to `max-height: clamp(240px, 30vh, 320px);` while using `justify-content: space-between` on `.about > .shell`.
2. **Inference 1 ("Altura Baixa")**: The photo was shrunken to ~300px, and vertical paddings were squeezed to 10px-20px. The central editorial content occupied barely 1/3 of the screen height. Instead of feeling like an expansive, prestigious editorial chapter, Section 2 looked like a squashed, flat banner.
3. **Inference 2 ("Conteúdo Não Compacto")**: Because `.shell` used `justify-content: space-between`, the kicker, photo/summary, and stats grid were stretched across the top, middle, and bottom boundaries. The stats had zero visual relationship with the biography, and the photo sat isolated from the text. The content was fragmented and sparse, not compact.
4. **Deduction & Solution**:
   - **Height**: Change `.about` to `min-height: 100svh; height: auto;` (or `min-height: max(100svh, 840px)` on desktop) with generous, breathing padding (`padding: clamp(36px, 5vh, 60px) 0 clamp(44px, 6vh, 72px)`). Remove the artificial 320px max-height cap on the portrait.
   - **Compactness**: Reorganize Section 2 into a balanced, unified two-column editorial layout:
     - **Left Column**: High-presence framed portrait (`max-width: 440px; aspect-ratio: 1 / 1.05; max-height: clamp(420px, 54vh, 520px);`).
     - **Right Column**: Compact editorial stack containing the kicker/eyebrow, masked "Quem sou eu" typography, narrative summary, CTA link, AND the metrics grid directly integrated underneath the copy. This eliminates dead space and creates a cohesive, compact narrative unit.

### 2.2 Picture Frame ("Quadro") Architecture
1. **User Requirement**: *"aumente a foto, deixe ela num frame como se fosse quadro, pesquise no codepen io layouts"*.
2. **CodePen Research Findings**: High-end exhibition frames combine:
   - Outer bevel moulding (`.art-frame`): Dark brushed obsidian/charcoal finish with multi-layered shadows (contact shadow + soft wall cast shadow) and subtle amber/gold fillet edge.
   - Museum Mat Board / Passe-Partout (`.art-frame__mat`): Warm archival off-white matting (`#fbf9f5`) with classic bottom-weighted margins (`padding: 16px 16px 28px 16px`) and recessed bevel shadow.
   - High-fidelity artwork canvas (`.art-frame__canvas`): Contains `/eu-profissional.png` with gentle contrast enhancement and hover zoom.
   - Museum Plaque / Cartellino (`.art-frame__plaque`): Engraved label beneath the artwork displaying "Pedro Lucas Reis — Engenheiro de Software Full Stack // 2026".

### 2.3 Lazy Loading & Scroll Entrance Animation System
1. **User Requirement**: *"melhore a forma que o texto do quem sou eu aparece e poderiam ter animacoes de lazy loading nesse sistema"*.
2. **Technology Selection**:
   - **GSAP ScrollTrigger** is the clear winner for scroll-driven orchestration in this project: it is already installed, tightly integrated with `@gsap/react`, supports strict React 19 lifecycle cleanup, and executes complex GPU-accelerated transforms, clip-paths, and numeric counter tweens seamlessly.
   - **Motion (`motion/react`)** is retained for micro-interactions (hover elevation).
3. **Entrance Sequence Design**:
   - **Trigger**: `trigger: sectionRef.current`, `start: 'top 78%'`, `once: true`.
   - **Phase 1: Frame Elevation & Curtain Unveil**:
     - `.art-frame` elevates: `{ opacity: 0, y: 36, scale: 0.94 } -> { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out' }`.
     - Image curtain reveal: `clipPath: 'inset(100% 0% 0% 0%)' -> 'inset(0% 0% 0% 0%)'` with `scale: 1.12 -> 1` (`duration: 1.1, ease: 'power4.out'`).
     - Plaque slide-up: `{ opacity: 0, y: 8 } -> { opacity: 1, y: 0, duration: 0.5 }`.
   - **Phase 2: Masked Typography Reveal**:
     - Eyebrow badge slides in from left: `{ opacity: 0, x: -16 } -> { opacity: 1, x: 0 }`.
     - Headline "Quem sou eu" slides up with masked line elevation: `{ opacity: 0, y: 28 } -> { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' }`.
     - Summary text fades up: `{ opacity: 0, y: 18 } -> { opacity: 1, y: 0, duration: 0.65 }`.
   - **Phase 3: Compact Stats Cascading Reveal**:
     - Stats items stagger in: `{ opacity: 0, y: 22, scale: 0.96 } -> { opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.6, ease: 'power3.out' }`.
   - **Accessibility Guarantee**: If `prefers-reduced-motion: reduce` is detected via `useReducedMotion()`, GSAP immediately applies `opacity: 1, y: 0, scale: 1, clipPath: 'none'` with zero animation delay or transition.

---

## 3. Caveats
1. **Read-Only Investigation**: As Explorer 3, no source files were modified during this investigation. All code snippets below are ready for direct adoption by the implementation workers.
2. **Contract Preservation**: Vitest tests in `rendering.test.tsx` strictly search for exact strings: `"Quem eu sou"` (or `"Who I am"`), `"04"`, and `"anos de experiência"` (or `"years of experience"`). These exact strings must be preserved in the DOM without abbreviation.
3. **CSS Color Compliance**: In `contracts.test.ts:158-187`, the test suite strictly asserts that authored styles do not contain forbidden colors (e.g. `#2dd4bf`, `#8b5cf6`, `#ff5a36`). All new CSS custom properties must use established design tokens (`var(--accent)`, `var(--paper)`, `var(--night)`, `var(--line-light)`, etc.).

---

## 4. Conclusion & Concrete Blueprint

### 4.1 Proposed TSX Replacement (`src/components/home/AboutSection.tsx`)
```tsx
import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ArrowDownRight } from 'lucide-react'
import { interfaceContent } from '@/data/content'
import { useLanguage } from '@/context/LanguageContext'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export function AboutSection() {
  const { language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const about = interfaceContent.about
  const copy = about[language]

  useGSAP(
    () => {
      if (!sectionRef.current) return

      // Reduced motion fallback
      if (reducedMotion) {
        gsap.set(
          ['.about-kicker', '[data-about-frame]', '[data-about-img]', '[data-about-plaque]', '[data-about-badge]', '[data-about-heading]', '[data-about-summary]', '[data-about-action]', '[data-about-stat]'],
          { opacity: 1, y: 0, x: 0, scale: 1, clipPath: 'none' }
        )
        return
      }

      // Master ScrollTrigger timeline for Section 2
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          once: true,
        },
      })

      // 1. Kicker reveal
      tl.fromTo(
        '.about-kicker',
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      )

      // 2. Picture Frame Reveal: elevation lift + curtain clip-path unveil
      tl.fromTo(
        '[data-about-frame]',
        { opacity: 0, y: 36, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out' },
        '-=0.3'
      )

      tl.fromTo(
        '[data-about-img]',
        { scale: 1.14, clipPath: 'inset(100% 0% 0% 0%)' },
        { scale: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'power4.out' },
        '-=0.7'
      )

      tl.fromTo(
        '[data-about-plaque]',
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.4'
      )

      // 3. Editorial Copy: masked typography & badges
      tl.fromTo(
        '[data-about-badge]',
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.55, ease: 'power3.out' },
        '-=0.8'
      )

      tl.fromTo(
        '[data-about-heading]',
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' },
        '-=0.6'
      )

      tl.fromTo(
        '[data-about-summary]',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' },
        '-=0.5'
      )

      tl.fromTo(
        '[data-about-action]',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' },
        '-=0.4'
      )

      // 4. Compact Stats Ribbon: staggered fade-in
      tl.fromTo(
        '[data-about-stat]',
        { opacity: 0, y: 20, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out' },
        '-=0.3'
      )
    },
    { scope: sectionRef, dependencies: [reducedMotion, language] }
  )

  return (
    <section ref={sectionRef} id={about.id} className="about section-light">
      <div className="shell about__shell">
        <div className="section-kicker about-kicker">
          <span>{about.sectionNumber}</span>
          <p>{copy.eyebrow}</p>
          <p>{copy.location}</p>
        </div>

        <div className="about__layout">
          {/* Column 1: Museum Picture Frame */}
          <div className="about__frame-col">
            <figure className="art-frame" data-about-frame>
              <div className="art-frame__mat">
                <div className="art-frame__canvas">
                  <img
                    data-about-img
                    src={about.portrait.src}
                    width={about.portrait.width}
                    height={about.portrait.height}
                    alt={copy.portraitAlt}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <figcaption className="art-frame__plaque" data-about-plaque>
                  <span>{copy.portraitRole}</span>
                  <strong>{copy.areas}</strong>
                </figcaption>
              </div>
            </figure>
          </div>

          {/* Column 2: Compact Editorial Content & Integrated Stats */}
          <div className="about__content-col">
            <div className="about__bio">
              <span className="about__badge" data-about-badge>{copy.title}</span>
              <h2 className="about__heading" data-about-heading>{copy.summary}</h2>
              <a href="#projetos-selecionados" className="text-link about__cta" data-about-action>
                {interfaceContent.hero[language].action}
                <ArrowDownRight aria-hidden="true" />
              </a>
            </div>

            <div className="about__stats-card" aria-label={copy.statsLabel}>
              <div className="stats-grid">
                {about.stats.map((stat) => (
                  <div key={stat.value} data-about-stat>
                    <strong>{stat.value}</strong>
                    <span>{stat[language]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

### 4.2 Proposed CSS Replacement for Section 2 (`src/styles/home.css`)
```css
/* ==========================================================================
   Section 2 — About Section (Editorial Picture Frame & Compact Layout)
   ========================================================================== */
.about {
  position: relative;
  min-height: 100svh;
  height: auto;
  padding-top: var(--header-height, 72px);
  padding-bottom: clamp(36px, 5vh, 60px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  overflow: visible;
}

.about > .about__shell {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: clamp(18px, 2.8vh, 32px);
  min-height: 0;
}

.about__layout {
  display: grid;
  grid-template-columns: 0.95fr 1.05fr;
  gap: clamp(28px, 4.5vw, 68px);
  align-items: center;
}

/* Picture Frame ("Quadro") Architecture */
.about__frame-col {
  display: flex;
  justify-content: center;
  align-items: center;
}

.art-frame {
  position: relative;
  width: 100%;
  max-width: 440px;
  border-radius: 4px;
  background: linear-gradient(145deg, #1f2229 0%, #0d0f14 100%);
  padding: clamp(12px, 1.5vw, 16px);
  border: 1px solid rgba(251, 191, 36, 0.28);
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.4),
    0 16px 36px -4px rgba(0, 0, 0, 0.38),
    0 28px 72px -12px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.12),
    inset 0 0 0 1px rgba(0, 0, 0, 0.6);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
}

.art-frame:hover {
  transform: translateY(-4px) scale(1.008);
  box-shadow:
    0 2px 5px rgba(0, 0, 0, 0.35),
    0 24px 52px -4px rgba(0, 0, 0, 0.45),
    0 36px 90px -12px rgba(251, 191, 36, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.18);
}

.art-frame__mat {
  position: relative;
  background: #fbf9f5;
  padding: clamp(14px, 1.8vw, 22px) clamp(14px, 1.8vw, 22px) clamp(18px, 2.5vw, 28px);
  border-radius: 2px;
  box-shadow:
    inset 0 2px 5px rgba(0, 0, 0, 0.16),
    inset 0 0 1px rgba(0, 0, 0, 0.22);
  display: flex;
  flex-direction: column;
}

.art-frame__canvas {
  position: relative;
  overflow: hidden;
  aspect-ratio: 1 / 1.05;
  max-height: clamp(380px, 52vh, 480px);
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.22);
  background: #182033;
}

.art-frame__canvas img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  filter: contrast(1.04) saturate(0.95);
  transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.art-frame:hover .art-frame__canvas img {
  transform: scale(1.03);
}

.art-frame__plaque {
  margin-top: clamp(10px, 1.4vw, 15px);
  padding-top: 8px;
  border-top: 1px solid rgba(23, 23, 23, 0.12);
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.62rem;
  letter-spacing: 0.11em;
  text-transform: uppercase;
  color: var(--color-ink);
  font-weight: 700;
}

.art-frame__plaque strong {
  color: var(--color-accent-ink);
  font-weight: 700;
}

/* Compact Editorial Column */
.about__content-col {
  display: flex;
  flex-direction: column;
  gap: clamp(18px, 2.5vh, 28px);
}

.about__bio {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.about__badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: var(--radius-xs);
  background: rgba(180, 83, 9, 0.12);
  border: 1px solid rgba(180, 83, 9, 0.25);
  color: var(--color-accent-ink);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin-bottom: clamp(10px, 1.4vh, 16px);
}

.about__heading {
  margin: 0 0 clamp(12px, 1.8vh, 20px);
  font-family: var(--font-display);
  font-size: clamp(2.1rem, 3.8vw, 4rem);
  font-weight: 700;
  letter-spacing: -0.05em;
  line-height: 1.05;
  color: var(--ink);
}

.about__cta {
  margin-top: 4px;
}

/* Integrated Stats Ribbon inside Content Column */
.about__stats-card {
  width: 100%;
}

.about__stats-card .stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  overflow: hidden;
  border: 1px solid var(--line-light);
  border-radius: var(--radius-md);
  background: rgba(251, 249, 245, 0.8);
}

.about__stats-card .stats-grid > div {
  padding: clamp(10px, 1.4vh, 16px) 14px;
  border-right: 1px solid var(--line-light);
}

.about__stats-card .stats-grid > div:last-child {
  border-right: 0;
}

.about__stats-card .stats-grid strong {
  display: block;
  color: var(--color-accent-ink);
  font-family: var(--font-display);
  font-size: clamp(2.1rem, 3.4vw, 3.2rem);
  letter-spacing: -0.06em;
  line-height: 0.95;
}

.about__stats-card .stats-grid span {
  display: block;
  margin-top: 6px;
  color: var(--ink-soft);
  font-size: 0.62rem;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
```

### 4.3 Proposed Responsive Adjustments (`src/styles/responsive.css`)
```css
/* Update lines 1-18 in src/styles/responsive.css */
@media (min-width: 1101px) {
  .hero,
  .work-section,
  .stack-section,
  .purpose-section,
  .contact-section {
    height: 100svh;
    min-height: 100svh;
    overflow: hidden;
  }

  /* Section 2 (About) and Experience Section allow generous natural height */
  .about,
  .experience-section {
    height: auto;
    min-height: 100svh;
    overflow: visible;
  }
}

@media (max-width: 1100px) {
  .about__layout {
    grid-template-columns: 1fr;
    gap: 36px;
  }
  .about__frame-col {
    order: 1;
  }
  .about__content-col {
    order: 2;
  }
  .art-frame {
    max-width: 380px;
  }
}

@media (max-width: 760px) {
  .about {
    padding-top: calc(var(--header-height, 72px) + 16px);
    padding-bottom: 40px;
  }
  .art-frame {
    max-width: 320px;
  }
  .about__stats-card .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .about__stats-card .stats-grid > div:nth-child(2) {
    border-right: 0;
  }
  .about__stats-card .stats-grid > div:nth-child(-n+2) {
    border-bottom: 1px solid var(--line-light);
  }
}
```

---

## 5. Verification Method

### 5.1 Test Suite & Build Commands
After implementation, run the following verification pipeline in terminal:
```bash
# 1. Vitest test suite execution
npm test

# 2. TypeScript compilation check
npx tsc -b

# 3. Production Vite build verification
npm run build
```

### 5.2 Verification Checklist
- [ ] **DOM Contracts**: `screen.getByText('Quem eu sou')`, `screen.getAllByText('04')`, and `screen.getByText('anos de experiência')` are present in DOM.
- [ ] **English Mode**: In English, `screen.getByText('Who I am')` and `screen.getByText('years of experience')` render without error.
- [ ] **Photo Presentation**: Portrait is contained within `.art-frame`, with `.art-frame__mat` and `.art-frame__plaque`. Photo height has expanded from 300px to ~420px–480px.
- [ ] **Height Presence**: Section 2 occupies full desktop viewport (`min-height: 100svh`) without rigid `overflow: hidden` clamping or artificial 320px restriction.
- [ ] **Compactness**: The right column groups the "Quem eu sou" badge, summary, text link, and stats card into a single compact, unified editorial unit.
- [ ] **Animation & Lazy Loading**: As the user scrolls into Section 2, the frame elevates smoothly, the image curtain reveals with clip-path, and the stats stagger in.
- [ ] **Reduced Motion**: Under `@media (prefers-reduced-motion: reduce)`, animations are bypassed and elements render immediately at full opacity without clip-path or transform delay.
