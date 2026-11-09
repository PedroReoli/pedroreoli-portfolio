# Hero Section Redesign & Element Removal Investigation (R2)

**Author:** explorer_survey_1 (teamwork_explorer)  
**Date:** 2026-11-02  
**Target:** Pedro Reoli Portfolio — Requirement R2  
**Status:** Completed Analysis (Read-Only)

---

## Executive Summary

This investigation surveys all requirements for **R2 (Hero Section Redesign & Element Removal)**:
1. **Top status/meta bar**: Located in `src/components/home/HeroSection.tsx` (lines 28–32) containing `"PORTFÓLIO / 01"`, `"• DISPONÍVEL PARA PROJETOS SELECIONADOS"`, and `"VOLTA REDONDA, BR"`. **Zero automated tests** assert on these elements. They can be removed cleanly from both JSX and CSS.
2. **Right-hand visual element**: Located in `src/components/home/HeroSection.tsx` (lines 47–51), lazy-loading `src/components/scene/HeroScene.tsx`. It is a Three.js / `@react-three/fiber` / `@react-three/drei` WebGL scene that generates a **924.72 kB** JavaScript bundle (`dist/assets/HeroScene-Ddrq41Uz.js`). Vite emits a `>900 kB` bundle warning, and Three.js canvas in jsdom causes test timeouts. Its removal eliminates 64% of client dynamic JS, removes WebGL GPU overhead, and eliminates Vitest rendering timeouts.
3. **Centering Hero typography & CTAs**: Replacing the 2-column grid (`.hero__content { grid-template-columns: 1.06fr .94fr; }`) with a centered flex column layout (`display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;`) seamlessly centers the role pill, two-line name ("PEDRO" / "REOLI"), statement, and primary CTA.
4. **Animations**: The Hero section uses **GSAP** (`@gsap/react`), not Framer Motion. Elements animate via `[data-hero-line]` (name lines) and `[data-hero-meta]` (meta and copy elements). Removing the meta bar and visual scene preserves the GSAP animations without errors because GSAP gracefully handles selector matches within the component scope.
5. **Test integrity**: Existing tests (`src/test/rendering.test.tsx` and `src/test/contracts.test.ts`) assert on `copy.role`, `hero.name.firstLine` ("PEDRO"), and content keys in `interfaceContent.json`. None assert on the status bar or 3D scene.

---

## 1. File Inventory & Architecture

### Components & Entry Points
- **`src/components/home/HeroSection.tsx`** (62 lines):
  - Primary Hero section component.
  - Rendered in `src/pages/HomePage.tsx` (line 17: `<HeroSection />`).
  - Manages GSAP entrance timeline via `useGSAP`.
  - Lazy loads `HeroScene`.
- **`src/components/scene/HeroScene.tsx`** (98 lines):
  - 3D WebGL Canvas containing `OrbitalCore`, `@react-three/fiber`, `@react-three/drei`.
  - Used **strictly** inside `HeroSection.tsx` and nowhere else in the repository.

### Stylesheets
- **`src/styles/home.css`** (lines 1–28):
  - `.hero`: container, `min-height: 96svh; padding-top: 72px;`
  - `.hero__grid`: background decorative grid mask
  - `.hero__shell`: vertical flex container
  - `.hero__meta`, `.hero__meta > :last-child`: status/meta bar grid
  - `.hero__status`, `.hero__status i`: status indicator dot with glow
  - `.hero__content`: 2-column layout grid (`1.06fr .94fr`)
  - `.hero__copy`: left column wrapping role, h1, statement, CTA
  - `.hero__role`: uppercase accent eyebrow
  - `.hero h1`, `.hero__line`, `.hero__line > span`, `.hero__line--accent`: display typography
  - `.hero__statement`: subtitle copy (`max-width: 520px`)
  - `.hero__cta`, `.hero__cta svg`, `.hero__cta:hover svg`: primary button
  - `.hero__visual`: 3D scene container (`min-height: 360px`)
  - `.hero-scene`, `.hero-scene canvas`, `.hero-scene__hud*`, `.hero-scene--fallback*`: 3D canvas styles
  - `.hero__scroll`: bottom anchor link to `#sobre`
- **`src/styles/responsive.css`**:
  - `@media (max-width: 1100px)`:
    - line 8: `.hero__content { grid-template-columns: 1fr 1fr; }`
    - line 9: `.hero h1 { font-size: clamp(5rem,11vw,8rem); }`
  - `@media (max-width: 760px)`:
    - line 32: `.hero__meta { grid-template-columns: 1fr auto; }`
    - line 33: `.hero__status { display: none; }`
    - line 34: `.hero { min-height: auto; }`
    - line 35: `.hero__shell { min-height: auto; }`
    - line 36: `.hero__content { display: flex; flex-direction: column; align-items: stretch; padding: 42px 0 24px; }`
    - line 37: `.hero__copy { width: 100%; }`
    - line 38: `.hero h1 { font-size: clamp(4.3rem,23vw,8rem); }`
    - line 39: `.hero__statement { width: 100%; margin-top: 30px; }`
    - line 40: `.hero__visual { width: 100%; height: 330px; min-height: 0; margin-top: 32px; }`
    - line 41: `.hero__scroll { margin-top: 20px; }`
  - `@media (max-width: 420px)`:
    - line 79: `.hero h1 { font-size: 4rem; }`
    - line 80: `.hero__visual { height: 280px; }`
    - line 81: `.hero-scene__hud { display: none; }`

### Data & Content Sources
- **`content/interfaceContent.json`** (lines 40–50):
  ```json
  "hero": {
    "id": "hero",
    "sectionNumber": "01",
    "name": { "accessible": "Pedro Reoli", "firstLine": "PEDRO", "secondLine": "REOLI" },
    "location": "Volta Redonda, BR",
    "actionHref": "#projetos-selecionados",
    "actionIcon": "arrow-up-right",
    "scene": { "topLabel": "SYS / 00.19", "bottomLabel": "INTERFACE · SYSTEMS · AI" },
    "pt": { "eyebrow": "Portfólio", "role": "Engenheiro de Software Full Stack", "statement": "Transformo sistemas complexos em produtos claros, rápidos e prontos para operar.", "availability": "Disponível para projetos selecionados", "scroll": "Desça para explorar", "action": "Ver projetos", "actionShort": "Projetos" },
    "en": { "eyebrow": "Portfolio", "role": "Full Stack Software Engineer", "statement": "I turn complex systems into clear, fast products built for real operations.", "availability": "Available for select projects", "scroll": "Scroll to explore", "action": "See the work", "actionShort": "Work" }
  }
  ```
- **`src/types/content.ts`** (lines 89–99): Type interface for `hero`.

---

## 2. Top Status/Meta Bar Element Analysis

### Exact Location & Markup in `src/components/home/HeroSection.tsx` (lines 28–32):
```tsx
        <div className="hero__meta" data-hero-meta>
          <span>{copy.eyebrow} / {hero.sectionNumber}</span>
          <span className="hero__status"><i />{copy.availability}</span>
          <span>{hero.location}</span>
        </div>
```

### Breakdown of Text & Presentation:
1. **Left element**: `<span>{copy.eyebrow} / {hero.sectionNumber}</span>`
   - Content: `"Portfólio"` (PT) or `"Portfolio"` (EN) + `" / 01"`
   - CSS: `.hero__meta { text-transform: uppercase; }` renders as `"PORTFÓLIO / 01"`.
2. **Center element**: `<span className="hero__status"><i />{copy.availability}</span>`
   - Content: `"Disponível para projetos selecionados"` (PT) / `"Available for select projects"` (EN)
   - Bullet dot: `<i />` styled via `.hero__status i { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 15px var(--accent); }` producing glowing green/teal dot `•`.
   - CSS: uppercase display `"• DISPONÍVEL PARA PROJETOS SELECIONADOS"`.
3. **Right element**: `<span>{hero.location}</span>`
   - Content: `"Volta Redonda, BR"`.
   - CSS: `.hero__meta > :last-child { text-align: right; }` renders as right-aligned `"VOLTA REDONDA, BR"`.

### Test Assertions Check:
- `src/test/rendering.test.tsx`: **Zero tests** search for or assert on `PORTFÓLIO`, `01`, `Disponível para projetos selecionados`, or `Volta Redonda, BR`.
- `src/test/contracts.test.ts`: Asserts only on `interfaceContentRaw.hero.id === 'hero'`, `actionIcon`, and `pt.role`/`en.role`. Does not assert on DOM presence of meta bar elements.
- **Conclusion**: Removing `<div className="hero__meta">...</div>` is **100% safe** and causes zero test breakages.

---

## 3. Right-Hand Visual Item / 3D Scene Analysis

### Exact Location & Markup in `src/components/home/HeroSection.tsx` (lines 47–51):
```tsx
          <div className="hero__visual" data-hero-meta>
            <Suspense fallback={<div className="hero-scene hero-scene--fallback" aria-hidden="true"><span /></div>}>
              <HeroScene topLabel={hero.scene.topLabel} bottomLabel={hero.scene.bottomLabel} />
            </Suspense>
          </div>
```

### Technology & Imports:
- Loaded dynamically via:
  ```tsx
  const HeroScene = lazy(() => import('@/components/scene/HeroScene').then((module) => ({ default: module.HeroScene })))
  ```
- Component `src/components/scene/HeroScene.tsx` imports:
  - `@react-three/fiber` (`Canvas`, `useFrame`, `useThree`)
  - `@react-three/drei` (`AdaptiveDpr`, `Float`, `MeshDistortMaterial`)
  - `three` (`Group`, `Mesh`, `MathUtils`)
  - `@/theme/palette`
- Renders Three.js WebGL canvas with icosahedron distortion geometry, rotating torus rings, 26 floating particle meshes, 4 lights, and top/bottom HUD overlay text labels (`SYS / 00.19` and `INTERFACE · SYSTEMS · AI`).

### Bundle Size & Performance Impact:
- Build output inspection:
  - `dist/assets/HeroScene-Ddrq41Uz.js`: **924.72 kB** (minified) / **245.10 kB** (gzip).
  - Main app bundle `dist/assets/index-C1QXxTiT.js`: 527.66 kB.
  - Total JS before removal: ~1,452 kB.
  - Vite build warning: `(!) Some chunks are larger than 900 kB after minification.` specifically triggered by `HeroScene`.
- Sole consumer: Neither `three`, `@react-three/fiber`, nor `@react-three/drei` is used by any other component in the repository.
- Test runner impact: In Vitest (jsdom), running `render(<App />)` mounts Three.js and triggers a DeprecationWarning (`[THREE_CJS_DEPRECATED]`) and causes `Application Rendering & Integration Tests > renders home page` to exceed 5000ms timeout!
- **Conclusion**: Removing `HeroScene` eliminates 925 kB from lazy load, eliminates WebGL context overhead, silences the Vite build chunk warning, and fixes the Vitest test timeout.

---

## 4. Centering Strategy for Hero Typography & Actions

### Layout Container Restructuring:
Currently, `.hero__shell` has 3 direct children:
1. `.hero__meta` (top status bar) -> **REMOVED**
2. `.hero__content` (main grid) -> contains `.hero__copy` and `.hero__visual` (visual **REMOVED**)
3. `.hero__scroll` (bottom scroll anchor) -> kept at bottom

### Proposed DOM in `HeroSection.tsx`:
```tsx
    <section ref={sectionRef} id={hero.id} className="hero">
      <div className="hero__grid" aria-hidden="true" />
      <div className="shell hero__shell">
        <div className="hero__content">
          <div className="hero__copy">
            <p className="hero__role" data-hero-meta>{copy.role}</p>
            <h1 aria-label={hero.name.accessible}>
              <span className="hero__line"><span data-hero-line>{hero.name.firstLine}</span></span>
              <span className="hero__line hero__line--accent"><span data-hero-line>{hero.name.secondLine}</span></span>
            </h1>
            <p className="hero__statement" data-hero-meta>{copy.statement}</p>
            <a className="hero__cta" href={hero.actionHref} data-hero-meta>
              <span>{copy.action}</span><ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>

        <a className="hero__scroll" href="#sobre" data-hero-meta>
          <span>{copy.scroll}</span>
          <ArrowDownRight aria-hidden="true" />
        </a>
      </div>
    </section>
```

### Proposed CSS Changes:

#### 1. In `src/styles/home.css`:
- Update `.hero`:
  ```css
  .hero {
    position: relative;
    min-height: 100svh;
    height: 100svh;
    overflow: hidden;
    padding-top: 72px;
    background: var(--night);
    color: var(--paper);
  }
  ```
- Update `.hero__shell`:
  ```css
  .hero__shell {
    position: relative;
    display: flex;
    min-height: calc(100svh - 72px);
    height: calc(100svh - 72px);
    flex-direction: column;
    justify-content: space-between;
  }
  ```
- Remove `.hero__meta`, `.hero__meta > :last-child`, `.hero__status`, `.hero__status i`.
- Replace `.hero__content`:
  ```css
  .hero__content {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 16px 0;
  }
  ```
- Replace `.hero__copy`:
  ```css
  .hero__copy {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    max-width: 860px;
    margin: 0 auto;
  }
  ```
- Update `.hero__role`:
  ```css
  .hero__role {
    margin-bottom: 16px;
    color: var(--accent);
    font-size: .68rem;
    font-weight: 700;
    letter-spacing: .16em;
    text-transform: uppercase;
    text-align: center;
  }
  ```
- Update `.hero h1`:
  ```css
  .hero h1 {
    font-family: var(--font-display);
    font-size: clamp(4.8rem, 10vw, 10.8rem);
    font-weight: 700;
    letter-spacing: -.075em;
    line-height: .76;
    text-transform: uppercase;
    text-align: center;
  }
  ```
- Update `.hero__statement`:
  ```css
  .hero__statement {
    width: min(580px, 92%);
    margin: 24px auto 0;
    color: rgba(244, 240, 231, .72);
    font-size: clamp(1rem, 1.45vw, 1.3rem);
    line-height: 1.48;
    text-align: center;
  }
  ```
- Update `.hero__cta`:
  ```css
  .hero__cta {
    display: inline-flex;
    align-items: center;
    gap: 36px;
    min-height: 46px;
    margin: 24px auto 0;
    padding: 0 18px;
    border-radius: var(--radius-sm);
    background: var(--paper);
    color: var(--night);
    font-size: .7rem;
    font-weight: 700;
    letter-spacing: .12em;
    text-transform: uppercase;
  }
  ```
- Remove obsolete visual classes: `.hero__visual`, `.hero-scene`, `.hero-scene canvas`, `.hero-scene__hud*`, `.hero-scene--fallback*`.

#### 2. In `src/styles/responsive.css`:
- Remove `.hero__content { grid-template-columns: 1fr 1fr; }` (line 8).
- Remove `.hero__meta` and `.hero__status` overrides (lines 32–33).
- In `@media (max-width: 760px)`:
  - Clean up `.hero__visual` (line 40).
  - Ensure `.hero__content` keeps `align-items: center; text-align: center;`.
  - Ensure `.hero__statement` keeps `margin-left: auto; margin-right: auto;`.
- In `@media (max-width: 420px)`:
  - Remove `.hero__visual` (line 80) and `.hero-scene__hud` (line 81).

---

## 5. Animations & Motion Analysis

### Current Implementation:
```tsx
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
...
  useGSAP(() => {
    if (!sectionRef.current || reducedMotion) return
      gsap.from('[data-hero-line]', { yPercent: 115, duration: 1, stagger: 0.08, ease: 'power4.out' })
      gsap.from('[data-hero-meta]', { opacity: 0, y: 14, duration: 0.7, stagger: 0.06, delay: 0.45 })
  }, { scope: sectionRef, dependencies: [reducedMotion] })
```

### Analysis:
1. **Engine**: GSAP with `useGSAP` hook from `@gsap/react`. Note: Framer Motion is present in `package.json` (`motion`), but not used in `HeroSection.tsx`.
2. **Selector behavior**:
   - `[data-hero-line]`: Targets the two name line spans. Animates upward from within masked containers (`.hero__line` with `overflow: hidden`).
   - `[data-hero-meta]`: Targets elements that fade in with a slight vertical slide (`y: 14`, `opacity: 0`).
3. **Robustness on element removal**:
   - When `.hero__meta` and `.hero__visual` are removed, `gsap.from('[data-hero-meta]')` simply queries the remaining elements within `sectionRef`:
     1. `.hero__role`
     2. `.hero__statement`
     3. `.hero__cta`
     4. `.hero__scroll`
   - GSAP executes seamlessly without throwing errors, preserving entrance choreography.
4. **Accessibility**:
   - `useReducedMotion()` is checked before running animations. If reduced motion is preferred, the animations do not run, ensuring full WCAG compliance.

---

## 6. Test Cases Interaction & Integrity

| Test File | Test Description | Assertions on Hero | Impact of R2 |
|-----------|------------------|--------------------|--------------|
| `src/test/rendering.test.tsx` | `renders home page with all essential editorial sections` | `screen.getAllByText('Engenheiro de Software Full Stack')[0]`<br>`screen.getByText('PEDRO')` | **Zero negative impact**. Role and PEDRO remain in the DOM. Removing Three.js Canvas fixes the 5s timeout bug. |
| `src/test/rendering.test.tsx` | `toggles language between PT and EN smoothly` | `screen.getAllByText('Engenheiro de Software Full Stack')[0]`<br>`screen.getAllByText('Full Stack Software Engineer')[0]` | **Zero negative impact**. Role text changes upon language switch as before. |
| `src/test/contracts.test.ts` | `loads all JSON files correctly` | `expect(interfaceContentRaw.hero.id).toBe('hero')` | **Zero negative impact**. ID is unchanged. |
| `src/test/contracts.test.ts` | `contains valid icons across interface content and home content` | `expect(hasIcon(interfaceContentRaw.hero.actionIcon)).toBe(true)` | **Zero negative impact**. Action icon is unchanged. |
| `src/test/contracts.test.ts` | `contains complete PT and EN texts for all localized fields` | `expect(interfaceContentRaw.hero.pt.role).toBeTruthy()`<br>`expect(interfaceContentRaw.hero.en.role).toBeTruthy()` | **Zero negative impact**. Content preserved. |

### Summary of Test Compatibility:
- **No tests fail due to R2 element removals.**
- In fact, removing the 3D Canvas directly fixes the timeout failure in `rendering.test.tsx`.

---

## 7. Recommended Implementation Sequence for Implementers

1. **`src/components/home/HeroSection.tsx`**:
   - Remove `const HeroScene = lazy(...)` import.
   - Remove `<div className="hero__meta">...</div>`.
   - Remove `<div className="hero__visual">...</div>` and `<Suspense>`.
   - Keep `<div className="hero__copy">` inside `<div className="hero__content">`.
2. **`src/styles/home.css`**:
   - Adjust `.hero` and `.hero__shell` for 100svh compact height.
   - Switch `.hero__content` and `.hero__copy` to centered flexbox with `margin: 0 auto; text-align: center;`.
   - Center `.hero__statement` and `.hero__cta`.
   - Remove obsolete CSS rules for `.hero__meta`, `.hero__status`, `.hero__visual`, `.hero-scene*`.
3. **`src/styles/responsive.css`**:
   - Remove unused media queries for `.hero__content` columns, `.hero__meta`, `.hero__status`, and `.hero__visual`.
4. **Verification**:
   - Run `npx tsc --noEmit` -> 0 errors.
   - Run `npm run build` -> 0 errors, no >900kB chunk warning.
   - Run `npm test` -> 100% passing tests without timeout.
