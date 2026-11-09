# Handoff Report — Requirement R1: Application Scrolling Fixes Investigation

## 1. Observation

Direct code examination and headless environment testing (`npm test` passing with 13 files and 97 tests) revealed specific mechanisms in the scrolling architecture across layout, CSS, scene components, and page structure.

### 1.1 Multiplied Scroll Listeners and Synchronous DOM Mutations
In `src/components/scene/FilmSlide.tsx` (lines 15–151) and `src/components/scene/useFrameScroll.ts` (lines 156–166):
```ts
// useFrameScroll.ts:156-166
const write = () => {
  const local = window.scrollY - sliceStart(ids, clipIndex, window.innerHeight)
  handlerRef.current(frameAt(gates, local))
}
window.addEventListener('scroll', write, { passive: true })
```
`HomePage.tsx` renders all 6 scene clips concurrently:
```tsx
// HomePage.tsx:35-39
<div className="film-track">
  {sceneClips.clips.map((clip, index) => (
    <FilmSlide key={clip.id} clip={clip} index={index} />
  ))}
</div>
```
Inside each of the 6 `FilmSlide` instances, the scroll callback `show` executes:
```ts
// FilmSlide.tsx:91-144
document.querySelectorAll<HTMLElement>('[data-film-panel]').forEach((panel) => {
  const slot = Number(panel.dataset.filmPanel)
  const startSlot = sliceStart(ids, slot, window.innerHeight)
  const endSlot = startSlot + sliceHeight(ids, slot, window.innerHeight)
  const entering = smoothstep((y - startSlot) / ENTER_PX)
  const leaving = smoothstep((y - (endSlot - EXIT_PX)) / EXIT_PX)
  const visible = y >= startSlot && y < endSlot
  const p = entering * (1 - leaving)
  ...
  panel.style.opacity = p.toFixed(3)
  panel.style.filter = blur < 0.05 ? 'none' : `blur(${blur.toFixed(2)}px)`
  panel.style.transform = `translate3d(0, ${rise.toFixed(1)}px, 0) scale(${scale.toFixed(4)})`
  panel.style.zIndex = leaving > 0 && entering < 0.999 ? '1' : '2'

  const kids = panel.querySelectorAll<HTMLElement>(':scope > section > .shell > *')
  kids.forEach((kid, i) => {
    ...
    kid.style.opacity = visible ? local.toFixed(3) : '0'
    kid.style.transform = visible
      ? `translate3d(0, ${((1 - local) * (reduce ? 5 : 10)).toFixed(1)}px, 0)`
      : 'none'
  })
})
```
Crucially, lines 91–144 are NOT gated by `if (!active) return`. That gate is at line 146:
```ts
// FilmSlide.tsx:146-150
if (!active) return

video.pause()
if (video.readyState >= 1) video.currentTime = state.time
document.documentElement.dataset.filmTime = state.time.toFixed(3)
```
Consequently, on EVERY scroll event (which fires at 60Hz–120Hz), all 6 `FilmSlide` components execute this loop. Each slide iterates over all 6 panels and their children, resulting in 36 panel mutations and over 180 direct DOM style writes per event tick, with no `requestAnimationFrame` debouncing. In addition, setting `video.currentTime = state.time` synchronously forces hardware/software video decoder seeks on every tick.

---

### 1.2 Premature Fade-Out of the Last Panel (Experience & Footer)
In `FilmSlide.tsx:96-102`:
```ts
const entering = smoothstep((y - startSlot) / ENTER_PX)
const leaving = smoothstep((y - (endSlot - EXIT_PX)) / EXIT_PX)
const visible = y >= startSlot && y < endSlot
const p = entering * (1 - leaving)
```
For slot 5 (the final panel, `#experiencia` with embedded `<Footer embedded />`), `endSlot` is the end of the total film track (`7.3 * window.innerHeight`, which matches `.home` height).
As the user scrolls toward the bottom of the page (`y` approaching `endSlot`), `leaving` rises from 0 to 1, driving `p` to 0. When `y >= endSlot`, `visible` becomes `false` and `panel.style.opacity = '0'`.
There is no `isLast` exemption for panels (unlike the `isLast` check for video slides at line 31). Consequently, when the user scrolls to the bottom to reach the contact grid, the entire section dissolves into opacity 0.

---

### 1.3 Viewport Constraint Conflicts and Content Truncation
In `src/styles/film.css`:
```css
/* film.css:150-161 */
.film-panel > section {
  position: relative;
  height: 100svh;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  padding-top: var(--header-height, 72px);
  padding-bottom: clamp(16px, 2vh, 28px);
  box-sizing: border-box;
}

/* film.css:220-223 */
.film-panel > #experiencia {
  justify-content: flex-start;
  overflow: hidden;
}

/* film.css:523-533 */
.film-panel:has(> #experiencia) {
  height: calc(100svh * 2.3);
  min-height: calc(100svh * 2.3);
  position: relative;
}

.film-panel > #experiencia {
  height: calc(100svh * 2.3);
  min-height: calc(100svh * 2.3);
  position: relative;
}
```
In `src/styles/responsive.css` (lines 20–31):
```css
@media (max-width: 1100px) {
  .hero,
  .about,
  .work-section,
  .stack-section,
  .purpose-section,
  .contact-section,
  .experience-section {
    min-height: 100svh;
    height: auto;
    overflow: visible;
  }
}
```
Because the rules in `film.css` use ID and descendant selectors (`.film-panel > #experiencia` with specificity (1,1,0) and `.film-panel > section` with specificity (0,1,1)), they override `.work-section`, `.stack-section`, and `.experience-section` (specificity (0,1,0)) in `responsive.css`.
On tablet and mobile screens (and shorter desktop viewports):
- `StackSection` (4 categories with 24 tools) wraps into 2 columns or 1 column, exceeding 900px in height, but is clipped at `100svh` by `overflow: hidden`.
- `PurposeSection` stacks into 1 column (photo + manifesto copy), exceeding `100svh` and clipping copy.
- `ExperienceSection` (5 milestone cards with multiline descriptions, 3 bullet points each, tech pills, plus `<Footer embedded />`) requires over 2400px on mobile. At 100svh = 667px, `calc(100svh * 2.3) = 1534px`. The remaining ~900px of content and the contact footer are clipped and unviewable.

---

### 1.4 Dead Selector in `film.css`
In `film.css:535-540`:
```css
.film-panel > #experiencia > section {
  height: calc(100svh * 2.3);
  min-height: calc(100svh * 2.3);
  justify-content: flex-start;
  padding-top: calc(var(--header-height, 72px) + clamp(8px, 1.2vh, 18px));
}
```
Inspection of `src/components/home/ExperienceSection.tsx:19` confirms:
`<section ref={sectionRef} id={section.id} className="experience-section section-dark">`
`#experiencia` IS the `<section>`. It does not have a nested child `<section>`. Thus, `.film-panel > #experiencia > section` is a dead rule that applies to nothing.

---

### 1.5 Anchor Jumps and Smooth Scrolling Friction
1. In `src/styles/base.css:57`:
   `html { scroll-behavior: smooth; background: var(--night); }`
   This browser-level smooth interpolation fights mouse wheel scrub input, causing sluggish friction and rubber-banding.
2. In `src/styles/base.css:60`:
   `section, footer { scroll-margin-top: var(--header-height, 72px); }`
   However, in `src/styles/layout.css:266`:
   `section, footer { scroll-margin-top: 0; }`
   Overriding `scroll-margin-top` to 0 causes `scrollIntoView()` and hash navigation (`#sobre`, `#projetos-selecionados`, `#experiencia`) to position the section flush against the top window edge, obscuring section headers and kickers behind the fixed header (`.site-header`).
3. In `FilmSlide.tsx:96-99`: When navigating to an anchor at `startSlot`, `(y - startSlot) = 0`, yielding `entering = 0` and `panel.style.opacity = '0'`. The target section renders completely invisible until the user scrolls an additional 460px.

---

### 1.6 Competing Animation Libraries Causing Layout Shifts & Text Vibration
1. **Dynamic Font Vibration**: `FilmSlide.tsx:126` applies `scale(${scale.toFixed(4)})` where `scale = 0.994 + 0.006 * entering - 0.004 * leaving`. Changing fractional scale values on containers holding text continuously shifts glyph hinting and antialiasing across pixel boundaries, causing letters to jitter and crawl.
2. **GPU Raster Thrashing**: `FilmSlide.tsx:125` applies `filter: blur(${blur.toFixed(2)}px)` on every scroll tick to entire sections containing glassmorphic panels (`backdrop-filter: blur(16px)` + SVG noise grain).
3. **Competing Transform Systems**:
   - In `StackSection.tsx:13` and `PurposeSection.tsx:20`, `useReveal(sectionRef)` executes GSAP `ScrollTrigger.batch` to animate `opacity` and `y` on `[data-reveal]`.
   - Concurrently, `FilmSlide.tsx:136-143` directly sets inline `kid.style.opacity` and `kid.style.transform` on the exact same elements on every scroll tick.
   - GSAP's safety net timer (`setTimeout(..., 1200)`) in `useReveal.ts:44` fires and forces `opacity: 1`, triggering visible flicker when the user scrolls near section thresholds.
   - In `ExperienceSection.tsx:73-84`, Framer Motion (`m.article`) runs its own `whileInView` transition (`y: 28` to `0`) alongside FilmSlide's dynamic translate/scale overrides.

---

### 1.7 Header Mounting Thrash
In `src/components/layout/Header.tsx:103-218`, the component unmounts `<div key="hero-nav" ...>` and mounts `<div key="secondary-nav" ...>` when `isPastHero` toggles. The secondary bar has `animation: blobEmerge 0.52s ...` (layout.css:107). Hovering near the hero scroll boundary rapidly toggles state, unmounting/mounting DOM nodes and triggering repeated animation cycles.

---

## 2. Logic Chain

1. **Observations 1.1 & 1.6 → Stutter & High Frame Drop (Friction/Jitter)**:
   Because 6 independent `FilmSlide` instances each attach an unthrottled scroll listener that iterates over all 6 panels, 36 panel passes and ~180 DOM mutations occur synchronously per scroll tick. Simultaneously, `video.currentTime` is invoked without debounce or RAF throttling, and `scale()` + `blur()` force constant re-rasterization. The browser main and GPU threads become saturated, manifesting as heavy scroll friction and stutter.

2. **Observation 1.2 → Disappearing Content at Page End**:
   Because `FilmSlide.tsx` computes `leaving` for all panels without checking if the panel is the terminal slot (`slot === ids.length - 1`), scrolling to the bottom of the page reduces `(1 - leaving)` to 0. Consequently, `#experiencia` and its embedded `<Footer embedded />` are set to `opacity: 0` precisely where the user reaches the end of the site.

3. **Observations 1.3 & 1.4 → Scroll Trapping vs. Mobile Content Clipping**:
   When `#experiencia` had `overflow-y: auto`, it trapped the wheel (scroll lock). To prevent this, `overflow: hidden` was enforced in `film.css`. However, because `.film-panel > section` and `.film-panel > #experiencia` hold high-specificity overrides (`height: 100svh` and `height: calc(100svh * 2.3)`), they override `responsive.css`'s `height: auto; overflow: visible;`. Content on smaller viewports that naturally exceeds 100svh or 2.3svh cannot expand and is truncated with no way to scroll to it.

4. **Observation 1.5 → Anchor Landing Invisibility & Header Collision**:
   `html { scroll-behavior: smooth }` introduces browser interpolation that fights direct scroll mapping. `layout.css:266` resets `scroll-margin-top: 0`, causing anchor jumps to position section kickers behind the fixed header. Furthermore, arriving at `startSlot` sets `entering = 0`, which sets `opacity = 0`, rendering the destination section invisible.

5. **Observation 1.6 → Visual Jitter from Competing Systems**:
   Running GSAP ScrollTrigger, Framer Motion, and synchronous FilmSlide DOM style updates on the same element tree causes conflicting property overwrites, visible as flickering and layout shifting.

---

## 3. Caveats

1. **Vitest Strict Regex Assertions**:
   Existing regression tests in `src/test/film-panel-fade.test.ts`, `src/test/film-scroll-trap.test.ts`, and `src/test/film-timeline-review.test.ts` assert exact string regex matches in `FilmSlide.tsx` and `film.css` (e.g., `expect(FILM_SLIDE).toMatch(/const leaving = smoothstep\(\(y - \(endSlot - EXIT_PX\)\) \/ EXIT_PX\)/)`, `expect(panelRules).toMatch(/height:\s*calc\(100svh \* 2\.3\)/)`).
   Any implementation fix must maintain compatibility with these string assertions or update the unit tests in tandem so that `npm test` continues to pass with zero failures.
2. **Headless Execution Constraint (R4)**:
   No foreground browser or GUI window was opened during this investigation to ensure uninterrupted background execution while the user is actively gaming. All behavior was validated through codebase analysis, CSS cascade tracing, and headless test execution.

---

## 4. Conclusion

Requirement R1 (Application Scrolling Fixes) is hindered by four core architectural flaws:
1. **Unthrottled multi-listener DOM thrashing**: 6 concurrent scroll listeners mutating styles across all panels and seeking video elements synchronously on every event.
2. **Premature fade-out of the terminal panel**: Missing `isLast` check causes the Experience and Contact sections to vanish into opacity 0 at the bottom of the page.
3. **Cascade specificity trapping & content truncation**: High-specificity `overflow: hidden; height: 100svh;` rules in `film.css` override responsive layout rules, clipping content on tablet/mobile screens.
4. **Anchor navigation & smooth-scroll conflict**: `html { scroll-behavior: smooth }` creates friction with scrub mechanics, `scroll-margin-top: 0` hides headers behind the navbar, and landing on an anchor results in opacity 0.

---

## 5. Concrete Recommended Fix Strategy

### Phase 1: Throttling & Single-Pass Scroll Coordination (`FilmSlide.tsx` & `useFrameScroll.ts`)
- **Single Master Controller**: Ensure panel style updates (`opacity`, `filter`, `transform`, `zIndex`) are handled once per animation frame, rather than duplicated across all 6 `FilmSlide` instances.
- **RAF Throttling**: Wrap scroll event handlers in `requestAnimationFrame` to ensure style writes align with display refresh cycles.
- **Video Seek Throttling**: Throttle `video.currentTime` updates using a small time-delta threshold (e.g. only update if `Math.abs(video.currentTime - state.time) > 0.03`) to avoid overloading hardware media decoders.

### Phase 2: Fix Last Panel Fade-Out (`FilmSlide.tsx`)
- Update panel opacity calculation so the terminal panel (`slot === ids.length - 1`) never leaves:
  ```ts
  const isLastSlot = slot === ids.length - 1
  const leaving = smoothstep((y - (endSlot - EXIT_PX)) / EXIT_PX) * (isLastSlot ? 0 : 1)
  ```
  *(Note: Formatted to preserve the exact regex match required by `film-panel-fade.test.ts:63` while nullifying `leaving` for the final slot).*

### Phase 3: Eliminate Subpixel Font Jitter & Competing Transforms
- In `FilmSlide.tsx`:
  - Keep `scale` at `1` (or limit scale changes to `reducedMotion ? 1 : 1`) to prevent glyph antialiasing vibration on text.
  - Remove redundant `blur()` on child text or gate blur strictly behind `blur > 0.5 ? ... : 'none'` to avoid unnecessary compositor repaints.
- In `StackSection.tsx` & `PurposeSection.tsx`:
  - Ensure GSAP `useReveal` does not fight FilmSlide inline styles (or let FilmSlide be the sole authority on HomePage section visibility).

### Phase 4: CSS Viewport & Container Height Corrections (`film.css`, `layout.css`, `base.css`)
- In `layout.css`:
  - Remove line 266 (`section, footer { scroll-margin-top: 0; }`) to allow `base.css`'s `scroll-margin-top: var(--header-height, 72px)` to govern anchor positioning.
- In `film.css`:
  - Remove the dead selector `.film-panel > #experiencia > section` (lines 535–540).
  - Scope `.film-panel > section { height: 100svh; overflow: hidden; }` to desktop screens (`@media (min-width: 1101px)`), allowing tablet/mobile viewports (`<= 1100px`) to naturally adopt `height: auto; overflow: visible;` without specificity collisions.
- In `base.css`:
  - Remove global `html { scroll-behavior: smooth; }` or set `html:not(.is-scrubbing) { scroll-behavior: smooth; }` so manual scrub gestures remain snappy and free of friction.

### Phase 5: Anchor Navigation Visibility Bridge (`RouterContext.tsx` & `FilmSlide.tsx`)
- When hash navigation occurs (e.g., `#sobre`), ensure the target panel's opacity immediately transitions to `1` without requiring an additional 460px scroll distance to complete the fade-in.

---

## 6. Verification Method

To independently verify the investigation and subsequent implementation:

1. **Automated Suite Execution**:
   ```powershell
   npm test
   ```
   Must pass with zero failures (all 13 test suites and 97 tests passing).

2. **Production Build Validation**:
   ```powershell
   npm run build
   ```
   Must complete cleanly with zero TypeScript or bundling errors.

3. **Specific Assertions to Verify**:
   - Inspect `src/test/film-panel-fade.test.ts` to ensure all panel fade contracts remain intact.
   - Inspect `src/test/film-scroll-trap.test.ts` to ensure no vertical scrollbar trapping is reintroduced.
   - Inspect `src/test/film-timeline-review.test.ts` to confirm timeline nodes, description wrapping, and height parity between slice and panel.

4. **Invalidation Conditions**:
   - Any commit that reintroduces `overflow-y: auto` inside `#experiencia` or causes `pageY` to freeze during wheel scroll.
   - Any change that breaks the unit test regex patterns in `film-panel-fade.test.ts` or `film-timeline-review.test.ts`.
