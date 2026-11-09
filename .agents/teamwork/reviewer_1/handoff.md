# Review & Adversarial Critic Report: Requirements R1 & R2

**Agent**: `reviewer_1` (teamwork_reviewer: reviewer, critic)  
**Parent / Orchestrator**: `c936b95e-59f1-4487-86ee-f0440d7aedc8`  
**Target Scope**: Requirement R1 (Application Scrolling Fixes) & Requirement R2 (Image and Backdrop Transitions)  
**State Folder**: `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\reviewer_1\`  
**Date**: 2026-11-08T21:36:00Z  

---

## Review Summary

**Verdict**: `REQUEST_CHANGES`

**Executive Summary**:  
The core algorithmic, layout, and visual transitions implemented for R1 and R2 are technically robust, solve the user's reported bugs, and pass all 97 automated tests across 13 test suites and the TypeScript production build (`npm run build`). No integrity violations or facade logic were detected.  
However, a **Major Finding** was identified: `src/components/projects/ProjectViewerModal.tsx` introduces a synchronous `setState` inside an effect (`setLoaded(false)`), violating the React 19 ESLint rule `react-hooks/set-state-in-effect` and causing `npm run lint` to fail with exit code 1. A clean, zero-effect fix is outlined below.

---

## 1. Observation

### 1.1 Automated Verifications (Executed Strictly Headless in Background)

1. **`npm test`**:
   - Command: `vitest run`
   - Result: 13 passed test files, 97 passed tests, 0 failures.
   - Verified that zero test files were modified or weakened in `git status`.
2. **`npm run build`**:
   - Command: `tsc -b && vite build`
   - Result: Successful build in 1.35s, 2508 modules transformed, zero type or bundling errors.
3. **`npm run lint`**:
   - Command: `eslint src vite.config.ts vitest.config.ts`
   - Result: FAILED with exit code 1:
     ```
     F:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\src\components\projects\ProjectViewerModal.tsx
       21:5  error  Error: Calling setState synchronously within an effect can trigger cascading renders  react-hooks/set-state-in-effect
     ✖ 1 problem (1 error, 0 warnings)
     ```

### 1.2 Specific Codebase Observations

1. **Single-Pass Panel Updates & RAF Throttling (`FilmSlide.tsx` & `useFrameScroll.ts`)**:
   - `FilmSlide.tsx:94`: `if (index === 0) { document.querySelectorAll<HTMLElement>('[data-film-panel]').forEach((panel) => { ... }) }`
   - `useFrameScroll.ts:162-172`:
     ```ts
     let rafId = 0
     const onScroll = () => {
       if (typeof window.requestAnimationFrame !== 'function') {
         write()
         return
       }
       if (rafId) return
       rafId = window.requestAnimationFrame(() => {
         rafId = 0
         write()
       })
     }
     ```
   - In `HomePage.tsx:36-52`, `FilmSlide` instances are rendered statically in index order. Slide 0 is consistently mounted and executes the panel updates in a single unified pass, reducing layout thrashing from 36 queries/writes to 6 per tick (~83% decrease in DOM mutations).

2. **Terminal Panel Dissolution (`FilmSlide.tsx`)**:
   - `FilmSlide.tsx:96-102`:
     ```ts
     const slot = Number(panel.dataset.filmPanel)
     const isLastSlot = slot === ids.length - 1
     const startSlot = sliceStart(ids, slot, window.innerHeight)
     const endSlot = startSlot + sliceHeight(ids, slot, window.innerHeight)
     const entering = smoothstep((y - startSlot) / ENTER_PX)
     const leaving = smoothstep((y - (endSlot - EXIT_PX)) / EXIT_PX) * (isLastSlot ? 0 : 1)
     const visible = y >= startSlot && y < endSlot || (isLastSlot && y >= startSlot)
     const p = entering * (1 - leaving)
     ```
   - For `isLastSlot` (`slot === 5`, `#experiencia` containing the footer), `leaving` is 0. As `y` passes `endSlot`, `visible` remains `true` and `panel.style.opacity` stays at `'1.000'`, preventing the contact footer from disappearing.
   - Vitest contract compatibility: `film-panel-fade.test.ts` lines 63 & 67 test `/const leaving = smoothstep\(\(y - \(endSlot - EXIT_PX\)\) \/ EXIT_PX\)/` and `/const visible = y >= startSlot && y < endSlot/`. Both regexes match the exact prefix of the implementation.

3. **Subpixel Glyphs & GPU Blur Threshold (`FilmSlide.tsx`)**:
   - `FilmSlide.tsx:131`: `const scale = 1` replaced `const scale = 0.994 + 0.006 * entering - 0.004 * leaving`.
   - `FilmSlide.tsx:134`: `panel.style.filter = blur < 0.5 ? 'none' : blur(${blur.toFixed(2)}px)` replaced threshold `0.05px`.

4. **Anchor Clearance (`layout.css` & `base.css`)**:
   - `layout.css:266`: `section, footer { scroll-margin-top: 0; }` was deleted.
   - `base.css:60`: `section, footer { scroll-margin-top: var(--header-height, 72px); }` is now active, providing 72px clearance above any `#anchor` target.

5. **Poster Alignment & Reverse Scroll Overlap (`sceneClips.json`, `FilmSlide.tsx`, `film.css`)**:
   - `sceneClips.json`: Clip posters aligned to starting visual states (`01-hero-poster.png` for clip 0, etc.). All 6 PNG files verified present in `public/media/backdrop/`.
   - `film.css:82-84`:
     ```css
     .film-slide[data-clip-active='true'][data-frame-ready='false'] .film-slide__poster,
     .film-slide[data-clip-active='true'] .film-slide__poster {
       opacity: 1;
     }
     ```
     The poster sits at `z-index: 0` underneath the video (`z-index: 1`) during active status, preventing transparent flashes during video decoding or scrubbing stalls.
   - `FilmSlide.tsx:150-157`:
     ```ts
     if (!active) {
       if (stillCovered && video.readyState >= 1) {
         const hold = effectiveHold(clip)
         if (Math.abs(video.currentTime - hold) > 0.05) {
           video.currentTime = hold
         }
       }
       return
     }
     ```
     During reverse scrolling through the overlap region (`stillCovered`), the outgoing clip holds at `effectiveHold(clip)` until re-activated, preventing snaps to 0.0s.

---

## 2. Logic Chain

1. **Scroll coordination & RAF throttling (R1)**:
   - Observation: 6 `FilmSlide` instances mount concurrently; `useFrameScroll` debounces scroll events via `requestAnimationFrame`. Slide 0 guards panel writes with `index === 0`.
   - Reasoning: Because `y = window.scrollY` is global and `sliceStart`/`sliceHeight` are deterministic mathematical functions of viewport height, a single pass from slide 0 completely calculates all panel styles. Debouncing via RAF aligns updates with display vsync (60Hz/120Hz), eliminating DOM thrashing.
   - Conclusion: Valid, performant, and jitter-free.

2. **Terminal panel persistence (R1)**:
   - Observation: Previous code dissolved the last panel to `opacity: 0` when `y >= endSlot`.
   - Reasoning: The terminal panel holds both the `#experiencia` timeline and the global footer. Setting `leaving = leaving * (isLastSlot ? 0 : 1)` and `visible = visible || (isLastSlot && y >= startSlot)` holds `opacity: 1` indefinitely for `y >= startSlot + ENTER_PX`.
   - Conclusion: Fixes the bug while preserving test contract strings.

3. **Subpixel stability (R1)**:
   - Observation: Previous code applied variable `scale(...)` with fractional values (`0.994` to `1.000`) on text containers.
   - Reasoning: Fractional CSS scaling forces font engines to recalculate glyph hint offsets continuously during scroll, causing noticeable letter shimmering. Setting `scale = 1` eliminates this entirely.
   - Conclusion: Verified.

4. **Anchor margin (R1)**:
   - Observation: `layout.css:266` declared `scroll-margin-top: 0`, overriding `base.css`'s 72px offset.
   - Reasoning: Removing `scroll-margin-top: 0` allows `base.css:60` to apply to `<section>` targets, offsetting them by `--header-height` (72px).
   - Conclusion: Verified.

5. **Poster & video reverse overlap (R2)**:
   - Observation: Inactive slides previously dropped video opacity immediately or left playheads unpinned, causing black blinks and 0s jumps on reverse scrolling.
   - Reasoning: Keeping the origin poster at `z-index: 0` with `opacity: 1` under the video guarantees an opaque backdrop during buffering. Holding `currentTime = effectiveHold(clip)` while `stillCovered` guarantees continuous frames when scrolling up into preceding sections.
   - Conclusion: Verified.

6. **Linter failure in `ProjectViewerModal.tsx`**:
   - Observation: `ProjectViewerModal.tsx:21` invokes `setLoaded(false)` inside `useEffect(() => { setLoaded(false) }, [index])`.
   - Reasoning: React 19's `eslint-plugin-react-hooks` forbids calling `setState` synchronously within an effect body because it forces an immediate cascading re-render. This breaks `npm run lint`.
   - Conclusion: Must be resolved.

---

## 3. Findings

### [Major] Finding 1: ESLint `react-hooks/set-state-in-effect` in `ProjectViewerModal.tsx`

- **What**: Synchronous `setState` in effect body fails linting.
- **Where**: `src/components/projects/ProjectViewerModal.tsx:20-22`
  ```tsx
  useEffect(() => {
    setLoaded(false)
  }, [index])
  ```
- **Why**: Violates React 19 rules of hooks, causing a cascading re-render when switching images and causing `npm run lint` to fail with exit code 1.
- **Suggestion**:
  Derive the loaded state from the current image rather than running an effect:
  ```tsx
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null)
  const isLoaded = Boolean(image && loadedSrc === image.src)
  ```
  On the `<img>`:
  ```tsx
  <img
    key={image.src}
    className={`project-modal__img ${isLoaded ? 'is-loaded' : 'is-loading'}`}
    src={image.src}
    srcSet={image.srcSet}
    alt={image.alt[language]}
    onLoad={() => setLoadedSrc(image.src)}
  />
  ```
  And delete the `useEffect(() => { setLoaded(false) }, [index])` entirely. This eliminates the cascading render and satisfies `eslint`.

---

## 4. Adversarial Challenge Analysis

| Challenge Area | Attack / Stress Scenario | Blast Radius | Resilience Assessment |
|---|---|---|---|
| **Single-pass slide 0 dependency** | What if slide 0 unmounts or throws? | Panels would freeze on previous styles. | **Low Risk**: Slide 0 is a static sibling mapped in `HomePage.tsx`. If slide 0 unmounts, the entire page is unmounting. |
| **Resize during scroll scrubbing** | Viewport resize during scroll transitions. | Viewport boundaries could drift. | **Robust**: `useFrameScroll` listens to `resize` and recalculates `gates` via `sliceHeight(...)`. |
| **Integrity Audit** | Check for hardcoded test fixtures, facade returns, or altered test files. | Zero tolerance. | **Clean**: No test files modified in git, all 97 assertions pass against genuine logic. |

---

## 5. Caveats

- Vitest runs in JSDOM; DOM measurements (`window.innerHeight`, `scrollY`) are emulated in unit tests. Full visual layout was validated against CSS declarations and static analysis.
- Requirement R4 (Strictly headless execution) was strictly respected during all test, build, and lint runs.

---

## 6. Conclusion & Recommendation

All functional and visual requirements for R1 and R2 are implemented accurately and pass all tests.  
**Verdict**: `REQUEST_CHANGES` strictly to fix the single ESLint error in `src/components/projects/ProjectViewerModal.tsx` so that `npm run lint`, `npm test`, and `npm run build` all pass cleanly.

---

## 7. Verification Method

To verify the resolution:
```powershell
npm run lint
npm test
npm run build
```
All three commands must finish with exit code 0.
