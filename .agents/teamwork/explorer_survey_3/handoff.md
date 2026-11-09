# Handoff Report — Requirement R3 & Test/Build Survey

**Agent**: `explorer_survey_3` (teamwork_explorer)  
**Parent**: `c936b95e-59f1-4487-86ee-f0440d7aedc8`  
**State Folder**: `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\explorer_survey_3\`  
**Date**: 2026-11-08  

---

## 1. Observation

### 1.1 Headless Build & Test Verification
Direct tool command execution confirmed:
- `npm test` (`vitest run` using `jsdom v29.1.1`):
  ```
  Test Files  13 passed (13)
       Tests  97 passed (97)
    Duration  15.27s
  ```
- `npm run build` (`tsc -b && vite build`):
  ```
  dist/index.html                     0.65 kB │ gzip:   0.38 kB
  dist/assets/index-B2IJiYEE.css     68.74 kB │ gzip:  12.89 kB
  dist/assets/index-C40LhUg0.js     539.44 kB │ gzip: 186.71 kB
  ✓ built in 1.92s
  ```
Both commands ran completely non-intrusively in headless terminal mode. Zero GUI windows opened, zero browser instances spawned, and zero foreground focus was stolen, fully satisfying Constraint R4 (user gaming on machine).

### 1.2 Dead CSS Selector for Experience Top Padding
In `src/styles/film.css`, lines 535-540:
```css
.film-panel > #experiencia > section {
  height: calc(100svh * 2.3);
  min-height: calc(100svh * 2.3);
  justify-content: flex-start;
  padding-top: calc(var(--header-height, 72px) + clamp(8px, 1.2vh, 18px));
}
```
In `src/pages/HomePage.tsx`, lines 48-50:
```tsx
<div key={index} className="film-panel" data-film-panel={index}>
  <Section />
</div>
```
In `src/components/home/ExperienceSection.tsx`, lines 19-20:
```tsx
<section ref={sectionRef} id={section.id} className="experience-section section-dark">
  <div className="shell experience-vertical__shell">
```
Direct DOM nesting: `<div class="film-panel"><section id="experiencia">`. There is no `<section>` child inside `#experiencia`. Selector `.film-panel > #experiencia > section` is dead code; the deliberate padding `clamp(8px, 1.2vh, 18px)` is never applied.

### 1.3 Desktop Timeline Node & Connector Vertical Alignment
In `src/styles/film.css`:
- Line 353: `.film-panel > #experiencia .timeline-v__item { align-items: center; }`
- Line 489: `.film-panel > #experiencia .timeline-card-reveal-wrapper { height: auto; align-self: start; }`
- Line 371: `.film-panel > #experiencia .timeline-v__node` does not specify `align-self`.
- Line 405: `.film-panel > #experiencia .timeline-v__connector` does not specify `align-self`.
Cards vary significantly in height across the 5 milestones:
- Card #03 (`Autocom3`): 4 highlights + 10 technologies ≈ 340px
- Card #04 (`UniFOA`): 2 highlights + 5 technologies ≈ 220px
Because items use `align-items: center`, the 12px station node and connector stem vertically float at the row midpoint (y = 170px on Card #03, y = 110px on Card #04) instead of aligning with the top chapter header / period badge.

In contrast, mobile (`src/styles/film.css` lines 716 & 723) properly solved this by setting:
```css
.film-panel > #experiencia .timeline-v__item { align-items: start; }
.film-panel > #experiencia .timeline-v__node { margin-top: 14px; }
```

### 1.4 Mobile Spine vs Node Centering
In `src/styles/film.css`, lines 705, 710, 722:
```css
.film-panel > #experiencia .timeline-v {
  grid-template-columns: 28px minmax(0, 1fr);
}
.film-panel > #experiencia .timeline-v__spine {
  left: 13px;
}
.film-panel > #experiencia .timeline-v__node {
  grid-column: 1;
  justify-self: start;
  margin-left: 7px;
  margin-top: 14px;
}
```
Column 1 is 28px wide (center is 14px).
The 2px spine at `left: 13px` spans 13px–15px (center = 14px).
The 12px node at `margin-left: 7px` spans 7px–19px (center = 13px).
The node is 1px off-center from the spine on mobile.

### 1.5 Sub-10px Micro-Typography Squeeze
In `src/styles/film.css`:
- Line 584: `.film-panel > #experiencia .timeline-card__chapter { font-size: 0.58rem; color: rgba(245, 243, 239, 0.5); }` (9.28px, 50% opacity)
- Line 578: `.film-panel > #experiencia .timeline-card__period { font-size: 0.58rem; }` (9.28px)
- Line 659: `.film-panel > #experiencia .timeline__tech { font-size: 0.56rem; }` (8.96px)
- Line 640: `.film-panel > #experiencia .timeline-card__highlights li { font-size: clamp(0.68rem, 0.76vw, 0.76rem); }` (10.8px–12.1px)
These sizes were compressed when the section was forced into 100svh. Since `TALL_SLICES['experience-loop'] = 2.3` expanded the section to 2.3 screens, these sub-10px values remain needlessly cramped.

### 1.6 Three Conflicting Styling Implementations
- `src/styles/home.css` (lines 452–464): declares `.timeline--horizontal`, `.timeline-card-wrapper`, and `.timeline-rail`.
- `src/styles/responsive.css` (lines 167–240): declares flexbox `.timeline-v` with `@media (min-width: 900px) { padding-right: calc(50% + 44px); }`.
- `src/styles/film.css` (lines 302–450): declares CSS Grid `.timeline-v` inside `.film-panel > #experiencia`.
In `src/index.css`, `responsive.css` is imported after `film.css`. If `ExperienceSection` is mounted outside `.film-panel` (e.g. in test runners), it renders using defunct flexbox rules.

### 1.7 Strict Test Suite Contract Enforcements
- `src/test/film-timeline-review.test.ts`:
  - Node must have width/height `12px` and match `/min-width:\s*12px/`, `/max-width:\s*12px/`, `/max-height:\s*12px/`.
  - Ring must have width/height `20px` and match `/border-radius:\s*50%/`.
  - Description must match `white-space: normal` and `overflow: visible`; must not truncate.
  - Highlights must match `white-space: normal; height: auto`.
  - Scrim: `rgba(8, 9, 11, 0.7[2-9])` and `rgba(8, 9, 11, 0.82)`.
  - Z-indexes: Spine is `0`, Card is `2`.
  - Height: `.film-panel:has(> #experiencia)` and `.film-panel > #experiencia` must match `/height:\s*calc\(100svh \* 2\.3\)/`.
  - `TALL_SLICES['experience-loop']` must be `2.3`.
- `src/test/contracts.test.ts`:
  - Permitted colors: `#FBBF24`, `#B45309`, `#78350F`, `#182033`, `#111010`, `#ffc900`, `#08090b`.
- `src/test/challenger2-verification.test.tsx` (lines 282–285):
  - Every card article must have `h3` (company) and `h4` (role).
- `src/test/film-scroll-trap.test.ts`:
  - No panel or timeline may declare `overflow-y: auto|scroll` or `overscroll-behavior: contain`.

---

## 2. Logic Chain

1. **Dead Selector Analysis**:
   - `HomePage.tsx` wraps each section in `<div className="film-panel" data-film-panel={index}><Section /></div>`.
   - `ExperienceSection.tsx` produces `<section id="experiencia" className="experience-section section-dark">`.
   - Therefore, `#experiencia` is the `<section>` element itself.
   - The rule `.film-panel > #experiencia > section` looks for a `<section>` descendant inside `#experiencia`, which does not exist.
   - Therefore, the rules inside this block are never applied by the browser, depriving the section of top padding compensation.

2. **Desktop Node Float Analysis**:
   - In CSS Grid, when `align-items: center` is set on `.timeline-v__item`, every grid item defaults to vertical centering within its grid area unless overridden.
   - `.timeline-card-reveal-wrapper` overrides this with `align-self: start`.
   - `.timeline-v__node` and `.timeline-v__connector` do not override `align-self`, so they remain centered at `row-height / 2`.
   - Because card content varies across companies (220px to 340px), the node position floats unpredictably relative to the card's top bar.
   - By setting `align-items: start` on `.timeline-v__item` and giving the node/connector `margin-top: clamp(14px, 1.8vh, 22px)` (matching card padding), the node and stem will cleanly anchor to the chapter and period badge across all 5 milestones.

3. **Mobile Alignment Precision**:
   - The mobile timeline grid uses a 28px axis column.
   - Centering 2px in 28px yields `(28 - 2) / 2 = 13px` left offset (`left: 13px` in CSS).
   - Centering 12px in 28px yields `(28 - 12) / 2 = 8px` left margin.
   - The current CSS uses `margin-left: 7px`, placing the node 1px left of the spine center.
   - Changing to `margin-left: 8px` or `justify-self: center; margin-left: 0;` establishes exact co-axial alignment.

4. **Legibility & Contract Cohesion**:
   - Increasing sub-10px fonts (e.g. `0.56rem` and `0.58rem`) to standard legible scale (`0.64rem` to `0.72rem`) improves reading comfort on mobile and high-resolution monitors.
   - Because tests in `film-timeline-review.test.ts` assert properties on description, node dimensions, scrim, and height—but do not freeze font sizes—typography polish can be executed safely without test regressions.

---

## 3. Caveats

- **Slice Height Invariance**: `TALL_SLICES['experience-loop'] = 2.3` and the CSS rule `calc(100svh * 2.3)` are strictly bound by `film-timeline-review.test.ts`. Any change to section height requires updating both `slices.ts` and `film.css` simultaneously, and could affect scroll scrub synchronization in `FilmSlide.tsx`.
- **Heading Tag Invariance**: In `ExperienceSection.tsx`, `h3` is company and `h4` is role. While visually inverted via CSS `order`, `challenger2-verification.test.tsx` line 284 asserts the presence of both `h3` and `h4`. They must not be renamed or replaced.
- **Node Geometry Invariance**: The 12px node and 20px ring are strictly asserted by regex in `film-timeline-review.test.ts`. Polish must not alter width/height/border-radius of `.timeline-v__node` or `.timeline-v__node-ring`.

---

## 4. Conclusion

The Experience Section is structurally sound and supported by a robust 2.3-screen tall slice architecture, but suffers from five specific layout and presentation defects:
1. Dead selector `.film-panel > #experiencia > section` dropping calculated top padding.
2. Centered alignment on desktop causing station nodes to float mid-card rather than anchoring to the chapter badge.
3. 1px off-center node placement relative to the spine on mobile (<768px).
4. Sub-10px micro-typography (`0.56rem`–`0.58rem`) causing legibility degradation.
5. Conflicting legacy flexbox rules in `responsive.css` diverging from the CSS Grid implementation in `film.css`.

The testing and build infrastructure (`vitest run` with jsdom, `tsc -b && vite build`) executes 100% headless in background mode with zero focus stealing, completely satisfying Requirement R4.

---

## 5. Verification Method

Independent verification can be executed via the following commands in the workspace:

1. **Verify Headless Test Suite (97 tests, 13 files)**:
   ```powershell
   npm test
   ```
   *Expected outcome*: Exits with code `0`, passes 13 test files and 97 tests in ~15s, produces no GUI windows.

2. **Verify Headless Production Build**:
   ```powershell
   npm run build
   ```
   *Expected outcome*: Exits with code `0`, outputs bundled assets in `dist/` in ~2s with zero TypeScript or bundler errors.

3. **Verify Dead Selector Presence in `film.css`**:
   ```powershell
   Select-String -Path "src/styles/film.css" -Pattern "\.film-panel > #experiencia > section"
   ```
   *Expected match*: Line 535.

4. **Verify Desktop Node Alignment Rules**:
   ```powershell
   Select-String -Path "src/styles/film.css" -Pattern "timeline-v__item.*\{" -Context 0,4
   ```
   *Inspect*: Line 353 declares `align-items: center;`.

5. **Verify Mobile Off-Center Margin**:
   ```powershell
   Select-String -Path "src/styles/film.css" -Pattern "timeline-v__node.*margin-left" -Context 0,2
   ```
   *Inspect*: Line 722 declares `margin-left: 7px;` while line 710 declares `left: 13px;` for spine in 28px column.
