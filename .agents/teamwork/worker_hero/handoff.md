# Handoff Report: Hero Section Redesign & Element Removal (Requirement R2)

**Author:** `worker_hero` (teamwork_worker)  
**Date:** 2026-11-02  
**Target Files:** `src/components/home/HeroSection.tsx`, `src/components/home/HeroScene.tsx`  
**Status:** Completed (Hard Handoff)

---

## 1. Observation

1. **Initial Baseline Build:**
   Running `npm run build` prior to edits produced:
   ```
   dist/assets/index-C1QXxTiT.js         527.66 kB │ gzip: 183.95 kB
   dist/assets/HeroScene-Ddrq41Uz.js     924.72 kB │ gzip: 245.10 kB
   (!) Some chunks are larger than 900 kB after minification.
   ✓ built in 25.32s
   ```
   The 3D HeroScene bundle alone accounted for 924.72 kB, triggered bundle warnings, and slowed build times.

2. **Source Code Inspection of `src/components/home/HeroSection.tsx`:**
   - Lines 28–32 contained `.hero__meta` with `copy.eyebrow / hero.sectionNumber`, `.hero__status`, and `hero.location`.
   - Lines 47–51 contained `.hero__visual` wrapping `<Suspense fallback=...><HeroScene ... /></Suspense>`.
   - Line 9 imported `HeroScene` via dynamic lazy import:
     `const HeroScene = lazy(() => import('@/components/scene/HeroScene').then((module) => ({ default: module.HeroScene })))`
   - Lines 18–22 defined the GSAP animation:
     ```tsx
     useGSAP(() => {
       if (!sectionRef.current || reducedMotion) return
       gsap.from('[data-hero-line]', { yPercent: 115, duration: 1, stagger: 0.08, ease: 'power4.out' })
       gsap.from('[data-hero-meta]', { opacity: 0, y: 14, duration: 0.7, stagger: 0.06, delay: 0.45 })
     }, { scope: sectionRef, dependencies: [reducedMotion] })
     ```

3. **Modifications Made:**
   - In `src/components/home/HeroScene.tsx`: Created empty component:
     ```tsx
     export interface HeroSceneProps {
       topLabel?: string
       bottomLabel?: string
     }
     export const HeroScene = (_props?: HeroSceneProps) => null
     export default HeroScene
     ```
   - In `src/components/home/HeroSection.tsx`:
     - Removed unused imports `lazy` and `Suspense`.
     - Removed `const HeroScene = lazy(...)`.
     - Removed `.hero__meta` DOM elements completely.
     - Removed `.hero__visual` and `<HeroScene />` completely.
     - Structured `.hero__content` and `.hero__copy` with centering classes `hero__content--centered` and `hero__copy--centered`.
     - Retained `[data-hero-line]` on name spans and `[data-hero-meta]` on role, statement, CTA button, and scroll anchor.

4. **Post-Modification Build Output:**
   Running `npm run build` after modifications:
   ```
   ✓ 2503 modules transformed.
   dist/assets/index-CP66TNbl.js  525.32 kB │ gzip: 183.05 kB
   ✓ built in 2.78s
   ```
   The 924.72 kB chunk was eliminated, build time reduced from 25.32s to 2.78s (9x faster), and zero bundle warnings were emitted.

5. **Test Execution:**
   Running `npm test` verified that `src/test/rendering.test.tsx` passed completely:
   ```
   ✓ src/test/rendering.test.tsx (6 tests) 3182ms
     ✓ renders home page with all essential editorial sections 1994ms
     ✓ toggles language between PT and EN smoothly 844ms
   ```

---

## 2. Logic Chain

1. **Step 1 (Status Bar Removal):**
   Requirement R2 specifies permanently removing the top status/meta bar ("PORTFÓLIO / 01", availability bullet + "DISPONÍVEL PARA PROJETOS SELECIONADOS", and "VOLTA REDONDA, BR"). Removing `<div className="hero__meta">...</div>` directly eliminates these elements from the rendered DOM.

2. **Step 2 (3D Scene Removal & Chunk Elimination):**
   Removing `<div className="hero__visual">` and removing the lazy-import of `HeroScene` completely decouples Three.js from the Hero component. Exporting an empty component `export const HeroScene = () => null;` in `src/components/home/HeroScene.tsx` ensures no broken import dependencies occur if referenced elsewhere. As observed in the build step, Vite tree-shakes out Three.js from the bundle, eliminating 924.72 kB of JavaScript.

3. **Step 3 (Centering Structure):**
   Previously, `.hero__content` was split between `.hero__copy` and `.hero__visual`. With the visual element removed, `.hero__content` holds only `.hero__copy` which contains the role pill, display title lines, statement copy, and CTA button. Adding `hero__content--centered` and `hero__copy--centered` ensures clear alignment for horizontal centering.

4. **Step 4 (GSAP Timeline Safety):**
   The selector `[data-hero-meta]` is scoped to `sectionRef`. With `.hero__meta` and `.hero__visual` removed, `sectionRef.current.querySelectorAll('[data-hero-meta]')` matches exactly 4 active elements (`.hero__role`, `.hero__statement`, `.hero__cta`, `.hero__scroll`). The animation runs without error or null dereference.

---

## 3. Caveats

- CSS styling rules in `src/styles/home.css` (e.g. updating `.hero__content` and `.hero__copy` flex properties) are strictly owned by `worker_home_css` per the code layout ownership rules; our edits prepared the component DOM structure to pair seamlessly with those styles.
- Unit test assertion for palette colors (`contracts.test.ts` checking `--color-accent-ink: #0f766e`) is owned by `worker_palette` / `worker_tests` under Milestone M2/M4. All tests directly testing the Hero section and page rendering pass cleanly.

---

## 4. Conclusion

Requirement R2 for the Hero component is completely implemented in accordance with all instructions:
- The top status bar has been permanently removed from `HeroSection.tsx`.
- The 3D scene (`HeroScene`) and its container have been permanently removed.
- An empty component `HeroScene = () => null` is exported in `src/components/home/HeroScene.tsx`.
- The layout structure is organized for horizontal centering.
- The GSAP animation executes cleanly without error.
- The build succeeds with 0 errors and 0 chunk warnings in 2.78s.

---

## 5. Verification Method

To verify these changes independently:

1. **Verify Build:**
   ```powershell
   npm run build
   ```
   Expected: Exits with code 0 in <5 seconds. Output must not include `HeroScene` chunk or chunk size warnings.

2. **Verify Rendering Tests:**
   ```powershell
   npx vitest run src/test/rendering.test.tsx
   ```
   Expected: 6 passed tests (100% pass rate).

3. **Inspect Files:**
   - `src/components/home/HeroSection.tsx`: Confirm absence of `.hero__meta` and `.hero__visual`, presence of centered classes.
   - `src/components/home/HeroScene.tsx`: Confirm `export const HeroScene = () => null;`.
