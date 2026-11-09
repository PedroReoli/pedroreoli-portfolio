# Deep Technical Analysis: Requirement R3 (Experience Section Polish) & Build/Test Infrastructure

**Author**: `explorer_survey_3` (teamwork_explorer)  
**Date**: 2026-11-08  
**Scope**: Requirement R3 (Experience Section Polish), Test and Build headless infrastructure, R4 gaming non-intrusive execution compliance.

---

## 1. Executive Summary

This investigation performed a comprehensive architectural and code survey of:
1. `src/components/home/ExperienceSection.tsx`
2. `src/styles/film.css` (primary styling for the experience section in the film panel)
3. `src/styles/home.css` (base experience styles)
4. `src/styles/responsive.css` (competing legacy and viewport override styles)
5. `content/homeContent.json` and `content/interfaceContent.json`
6. `src/components/scene/slices.ts` and `FilmSlide.tsx` (scroll and height coordination)
7. `package.json`, Vite, Vitest test suite (`13` test files, `97` tests), and build pipeline.

### Core Discoveries:
- **Build & Test Infrastructure is 100% Headless**: Both `npm test` (`vitest run` using `jsdom`) and `npm run build` (`tsc -b && vite build`) execute entirely in terminal/background mode with zero GUI windows or browser popups, perfectly adhering to Requirement R4 (user gaming on machine). Tests take ~15.2s (97 tests passed across 13 files); production build takes ~1.9s.
- **Three Competing CSS Paradigms**: The experience section was originally designed as a horizontal scroller (`home.css`), then transitioned to a flexbox alternating layout (`responsive.css`), and finally implemented as a CSS Grid timeline inside `.film-panel > #experiencia` (`film.css`). Because `responsive.css` is imported after `film.css`, any component rendered outside `.film-panel` falls back to the broken flexbox model.
- **Dead Selector / Lost Padding**: In `film.css` line 535, `.film-panel > #experiencia > section` is an invalid selector because `<section id="experiencia">` IS the section itself. This causes the top padding calculation (`padding-top: calc(var(--header-height, 72px) + clamp(8px, 1.2vh, 18px))`) to fail to match.
- **Vertical Alignment Jagging on Desktop**: On desktop, `.timeline-v__item` has `align-items: center` while `.timeline-card-reveal-wrapper` has `align-self: start`. Because cards vary widely in height (from 220px to 340px depending on the number of highlights), the station node and connector stem vertically float at the row's midpoint rather than aligning with the top card header/chapter number as it does on mobile.
- **Micro-Typography Squeeze Legacy**: Key labels inside cards have sub-10px font sizes: `.timeline__tech` is `0.56rem` (8.96px), `.timeline-card__chapter` is `0.58rem` (9.28px) with 50% opacity, and `.timeline-card__period` is `0.58rem`. This was a remnant of an earlier attempt to squash 5 items into 1 viewport before tall slices (2.3 screens) were introduced.
- **Mobile Alignment Precision**: On mobile (<768px), the 2px spine is centered at 14px in a 28px column (`left: 13px`), but the 12px node has `margin-left: 7px` (center at 13px), creating a 1px visual eccentricity.
- **Test Suite Contract Boundaries**: Existing tests in `src/test/film-timeline-review.test.ts`, `contracts.test.ts`, `film-slices.test.ts`, and `challenger2-verification.test.tsx` strictly enforce:
  - Node must be locked to exactly 12x12px (`min-width`, `max-width`, `height`, `min-height`, `max-height`).
  - Ring must be 20x20px with `border-radius: 50%`.
  - Description must be `white-space: normal; overflow: visible` without ellipsis, line-clamp, or nowrap.
  - Card scrim must use `rgba(8, 9, 11, 0.7[2-9])` and `rgba(8, 9, 11, 0.82)`.
  - Spine `z-index: 0` and Card `z-index: 2`.
  - Slice height multiplier must match `2.3` in both `film.css` and `slices.ts`.
  - Articles must contain `h3` (company) and `h4` (role).

---

## 2. Codebase Evidence & Detailed Observations

### 2.1 Component Structure (`src/components/home/ExperienceSection.tsx`)
```tsx
Lines 19-30:
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
    ...
    <div className="timeline-v" role="list" aria-label={copy.chaptersLabel}>
      <div className="timeline-v__spine" aria-hidden="true">
        <div className="timeline-v__spine-glow" />
      </div>
      {items.map((item, index) => {
        ...
        return (
          <div className={`timeline-v__item ${isLeft ? 'timeline-v__item--left' : 'timeline-v__item--right'}`} role="listitem">
            <div className="timeline-v__node" aria-hidden="true">
              <span className="timeline-v__node-pulse" />
              <span className="timeline-v__node-ring" />
              <span className="timeline-v__node-core" />
            </div>
            <div className="timeline-v__connector" aria-hidden="true" />
            <div className="timeline-card-reveal-wrapper">
              <m.article className="timeline-card timeline-v__card" ...>
                <div className="timeline-card__top">
                  <span className="timeline-card__chapter">#{chapterNum}</span>
                  <span className="timeline-card__period">{item.period[language]}</span>
                </div>
                <div className="timeline-card__heading">
                  <h3>{item.company}</h3>
                  <h4>{item.role[language]}</h4>
                </div>
                <p className="timeline-card__desc">{item.description[language]}</p>
                ...
                <div className="timeline-card__footer">
                  <p className="timeline__tech" aria-label="Tecnologias">...</p>
                </div>
              </m.article>
            </div>
          </div>
        )
      })}
    </div>
    <Footer embedded />
  </div>
</section>
```

### 2.2 Stylistic Anomalies & Deficiencies

#### Observation 1: Dead Selector for Top Padding (`src/styles/film.css`:535-540)
```css
.film-panel > #experiencia > section {
  height: calc(100svh * 2.3);
  min-height: calc(100svh * 2.3);
  justify-content: flex-start;
  padding-top: calc(var(--header-height, 72px) + clamp(8px, 1.2vh, 18px));
}
```
**Fact**: In `HomePage.tsx`, `<Section />` renders `<section id="experiencia">` directly as the immediate child of `.film-panel`. There is no child `<section>` inside `#experiencia`.
**Impact**: Rule is inert. `#experiencia` falls back to `padding-top: var(--header-height, 72px)` from `.film-panel > section` (line 158), losing the calculated breathing room (`clamp(8px, 1.2vh, 18px)`).
**Fix**: Target `.film-panel > #experiencia` directly.

#### Observation 2: Unaligned Desktop Station Nodes (`src/styles/film.css`:349-375, 487-490)
```css
.film-panel > #experiencia .timeline-v__item {
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: minmax(0, 1fr) 56px minmax(0, 1fr);
  align-items: center; /* Centers grid items vertically */
}
...
.film-panel > #experiencia .timeline-card-reveal-wrapper {
  height: auto;
  align-self: start; /* Card aligns to top */
}
```
**Fact**: On desktop, cards have variable heights:
- Item 0 (`Domus`): ~280px
- Item 1 (`SIVIS`): ~260px
- Item 2 (`Autocom3` with 4 highlights): ~340px
- Item 3 (`UniFOA` with 2 highlights): ~220px
- Item 4 (`SIVIS Jr`): ~260px
Because `.timeline-v__item` sets `align-items: center`, the 12px node (`timeline-v__node`) and connector (`timeline-v__connector`) center vertically relative to the entire row height (e.g. at y = 170px for item 2, y = 110px for item 3), while the card starts at y = 0px.
On mobile (`@media (max-width: 767px)`), this was solved with:
```css
.film-panel > #experiencia .timeline-v__item {
  grid-template-columns: 28px minmax(0, 1fr);
  align-items: start;
}
.film-panel > #experiencia .timeline-v__node {
  margin-top: 14px;
}
```
**Fix**: Apply `align-items: start` on desktop `.timeline-v__item`, with `.timeline-v__node` and `.timeline-v__connector` having `margin-top: clamp(14px, 1.8vh, 22px)` matching the card's top padding, aligning the node and stem with the chapter badge and period pill.

#### Observation 3: Micro-Typography & Readability Squeeze (`src/styles/film.css`:572-587, 658-662)
```css
.film-panel > #experiencia .timeline-card__chapter {
  font-size: 0.58rem; /* 9.28px */
  color: rgba(245, 243, 239, 0.5); /* low contrast 50% opacity */
}
.film-panel > #experiencia .timeline-card__period {
  font-size: 0.58rem; /* 9.28px */
}
.film-panel > #experiencia .timeline__tech {
  font-size: 0.56rem; /* 8.96px */
  color: rgba(255, 201, 0, 0.82);
}
```
**Fact**: Font sizes below 10px (`0.625rem`) violate standard WCAG recommendations for body and label readability, particularly when paired with 50% opacity text on obsidian glass backgrounds.
**Fix**: Polish micro-typography:
- Chapter & Period: `font-size: clamp(0.64rem, 0.75vw, 0.72rem)`
- Chapter color: `rgba(245, 243, 239, 0.7)` (crisp readability)
- Technology list: `font-size: clamp(0.62rem, 0.72vw, 0.68rem)`
- Highlights: `font-size: clamp(0.72rem, 0.8vw, 0.8rem)`

#### Observation 4: Mobile Spine & Node Alignment Precision (`src/styles/film.css`:703-725)
```css
.film-panel > #experiencia .timeline-v {
  grid-template-columns: 28px minmax(0, 1fr);
}
.film-panel > #experiencia .timeline-v__spine {
  left: 13px; /* 2px spine spans 13px to 15px -> center at 14px */
}
.film-panel > #experiencia .timeline-v__node {
  grid-column: 1;
  justify-self: start;
  margin-left: 7px; /* 12px node spans 7px to 19px -> center at 13px */
  margin-top: 14px;
}
```
**Fact**: The node center (13px) is 1px off from the spine center (14px). Setting `margin-left: 8px` (or `justify-self: center; margin-left: 0;`) aligns both centers at 14px.

#### Observation 5: Conflicting Flexbox Styles in `responsive.css` (lines 167-378)
In `responsive.css`, `.timeline-v` is declared with flexbox columns and `@media (min-width: 900px)` padding offsets (`padding-right: calc(50% + 44px)`).
When `ExperienceSection` is rendered in test harnesses outside `.film-panel`, it renders in flexbox mode with completely different layout semantics than inside `.film-panel`.
Harmonizing `.timeline-v` base rules in `responsive.css` with the modern grid layout ensures consistency across all rendering modes.

---

## 3. Test & Build Infrastructure Analysis

### 3.1 Test Infrastructure Verification
- **Framework**: Vitest `v5.0.5`
- **Environment**: `jsdom` `v29.1.1`
- **Setup**: `src/test/setup.ts` mocks `window.matchMedia` and `ResizeObserver`.
- **Command**: `npm test` executes `vitest run` in headless background mode.
- **Verification Run Results**:
  ```
  Test Files  13 passed (13)
       Tests  97 passed (97)
    Duration  15.27s
  ```
- **Focus / GUI Status**: Zero GUI windows, zero browser popups, zero notifications, zero focus disruption. Fully compliant with R4.

### 3.2 Build Infrastructure Verification
- **Bundler**: Vite `v8.3.5` with `@vitejs/plugin-react` `v6.1.2`
- **TypeScript**: `5.9.3` using composite project references (`tsc -b`)
- **Command**: `npm run build`
- **Verification Run Results**:
  ```
  dist/index.html                                                         0.65 kB │ gzip:   0.38 kB
  dist/assets/index-B2IJiYEE.css                                         68.74 kB │ gzip:  12.89 kB
  dist/assets/index-C40LhUg0.js                                         539.44 kB │ gzip: 186.71 kB
  ✓ built in 1.92s
  ```
- **Exit code**: `0`. Completely clean background execution.

### 3.3 Test Contract Constraints Checklist
Any subsequent implementation agent must strictly respect the following test assertions:
1. `film-timeline-review.test.ts`:
   - Node width & height: must be exactly `12px` and match `/min-width:\s*12px/`, `/max-width:\s*12px/`, `/max-height:\s*12px/`.
   - Ring width & height: must be exactly `20px` and match `/border-radius:\s*50%/`.
   - Description: must match `white-space: normal` and `overflow: visible`; must NOT match `nowrap`, `ellipsis`, or `-webkit-line-clamp`.
   - Highlights: must match `white-space: normal` and `height: auto`.
   - Card Scrim: must match `rgba(8, 9, 11, 0.7[2-9])` and `rgba(8, 9, 11, 0.82)`.
   - Z-Index: spine must have `z-index: 0`; card must have `z-index: 2`.
   - Tall Slice Height: `.film-panel:has(> #experiencia)` and `.film-panel > #experiencia` must match `/height:\s*calc\(100svh \* 2\.3\)/` and match `TALL_SLICES['experience-loop'] = 2.3`.
2. `contracts.test.ts`:
   - Permitted colors: `#FBBF24`, `#B45309`, `#78350F`, `#182033`, `#111010`, `#ffc900`, `#08090b`.
   - No cobalt, cyan, purple, or orange colors.
3. `challenger2-verification.test.tsx`:
   - Each article in `#experiencia` must have `h3` (company) and `h4` (role).
4. `film-scroll-trap.test.ts`:
   - Neither `.film-panel > section` nor `.film-panel > #experiencia` may declare `overflow-y: auto|scroll` or `overscroll-behavior: contain`.

---

## 4. Concrete Recommendations for Implementation

1. **Fix Dead Selector**: In `src/styles/film.css`, change `.film-panel > #experiencia > section` to `.film-panel > #experiencia` to restore the intentional header padding (`calc(var(--header-height, 72px) + clamp(8px, 1.2vh, 18px))`).
2. **Align Desktop Station Nodes**: Update `.film-panel > #experiencia .timeline-v__item` to `align-items: start`, and set `margin-top: clamp(14px, 1.8vh, 22px)` on `.timeline-v__node` and `.timeline-v__connector` so that nodes consistently track the chapter header rather than jumping based on card content height.
3. **Align Mobile Node to Spine**: In `film.css` under `@media (max-width: 767px)`, set `.timeline-v__node { margin-left: 8px; }` (or `justify-self: center; margin-left: 0;`) to center the 12px node at 14px directly over the 2px spine.
4. **Elevate Micro-Typography**: Increase sub-10px fonts to comfortable, readable sizes (`0.64rem`-`0.72rem` for chapter/period, `0.64rem` for tech stack, `0.74rem` for highlights), improving readability on mobile and high-DPI desktop viewports.
5. **Harmonize `responsive.css`**: Update or reconcile fallback `.timeline-v` rules in `responsive.css` to use the CSS grid architecture rather than defunct flexbox rules.
6. **Add Dedicated Experience Component Test**: Create `src/test/section5-experience-layout-stress.test.tsx` mirroring sections 2, 3, and 4 tests to protect all 5 chapters, header/counter badges, and viewport layout constraints in headless automated test runs.
