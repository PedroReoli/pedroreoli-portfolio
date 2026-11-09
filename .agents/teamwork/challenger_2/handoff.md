# Challenger 2 Handoff Report — Empirical Stress-Testing of Requirements R2 & R3

**Agent**: `challenger_2` (teamwork_challenger: critic, specialist)  
**Parent / Orchestrator**: `c936b95e-59f1-4487-86ee-f0440d7aedc8`  
**State Folder**: `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\challenger_2\`  
**Date**: 2026-11-08T21:43:00Z  
**Verdict**: **`APPROVE`**

---

## 1. Observation

Direct empirical evidence was gathered through static inspection, mathematical analysis, and execution of a dedicated 14-test adversarial test harness (`src/test/adversarial-r2-r3-empirical.test.tsx`), alongside the full project test suite and production build.

### 1.1 Video Ready-State, Posters & Origin Mappings (R2)
- **Origin Poster Pairing**: In `content/sceneClips.json`, all 6 clips reference their origin visual state poster:
  - Clip 0 (`hero-to-about`): `/media/backdrop/01-hero-poster.png`
  - Clip 1 (`about-to-projects`): `/media/backdrop/02-about-poster.png`
  - Clip 2 (`projects-to-stack`): `/media/backdrop/03-projects-poster.png`
  - Clip 3 (`stack-to-purpose`): `/media/backdrop/04-stack-poster.png`
  - Clip 4 (`purpose-to-experience`): `/media/backdrop/05-purpose-poster.png`
  - Clip 5 (`experience-loop`): `/media/backdrop/06-experience-poster.png`
  All referenced poster PNG files were confirmed to exist on disk under `public/media/backdrop/` with sizes between 748KB and 1.29MB.
- **Active Poster Opacity**: In `src/styles/film.css:82-85`:
  ```css
  .film-slide[data-clip-active='true'][data-frame-ready='false'] .film-slide__poster,
  .film-slide[data-clip-active='true'] .film-slide__poster {
    opacity: 1;
  }
  ```
  And `.film-slide__poster` at `z-index: 0`, while `.film-slide__video` is at `z-index: 1`. Posters remain opaque beneath the video during seeks and video decoding, preventing blank or black flashes. Inactive posters (`.film-slide__poster`) are strictly hidden at `opacity: 0` to prevent future slide posters from overlaying the active scene.
- **Video Ready-State Dispatch**: In `src/components/scene/FilmSlide.tsx:71-73`, `const isFrameReady = video.readyState >= 2 || videoReady`, with `videoReady` toggled via `onLoadedData` and `onCanPlay`. Empirical component test verified `root.dataset.frameReady` transitions to `'true'`.

### 1.2 Reverse Scroll Overlap Behavior (R2)
- **Hold Frame Preservation**: In `src/components/scene/FilmSlide.tsx:152-160`:
  ```tsx
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
  And `stillCovered` definition:
  ```tsx
  const covering = index + 1
  const nextStart = sliceStart(ids, covering, window.innerHeight)
  const stillCovered = !active && y >= nextStart && y < nextStart + OVERLAP
  ```
- **Boundary Verification**: Tested across all 5 consecutive clip boundaries (0→1, 1→2, 2→3, 3→4, 4→5). In the 220px overlap window (`[nextStart, nextStart + 220)`), outgoing video remains in DOM at `opacity: 1` holding `effectiveHold(clip)` (`Math.min(clip.holdAt, clip.duration)`), preventing temporal snaps or resets to frame 0 during reverse scrolling.

### 1.3 Window Resize Gate Stability (R2)
- **Dynamic Gate Recalculation**: In `src/components/scene/useFrameScroll.ts:174-178`:
  ```ts
  const remeasure = () => {
    const span = sliceHeight(ids, clipIndex, window.innerHeight)
    gates = buildGates([{ clip, y: 0, span }])
    write()
  }
  ```
- **Drift Stress Test**: Tested across 7 viewport heights (600px, 800px, 900px, 1080px, 1200px, 1440px, 2160px). Verified in a mounted React harness that dispatching `resize` events triggers recalculation of `gates` without accumulating drift. Boundary calculations in `frameAt()` confirmed monotonic and strictly bounded within `[0, steps]`.

### 1.4 Experience Timeline Geometry & Typography (R3)
- **Desktop Station Alignment**: In `src/styles/film.css`:
  - `.film-panel > #experiencia .timeline-v__item`: `align-items: start;` (line 359)
  - `.film-panel > #experiencia .timeline-v__node`: `align-self: start; margin-top: clamp(14px, 1.8vh, 22px);` (lines 385, 780)
  - `.film-panel > #experiencia .timeline-v__connector`: `align-self: start; margin-top: calc(clamp(14px, 1.8vh, 22px) + 5px);` (line 417)
  Nodes anchor to card chapter headers at the top of the row rather than floating mid-row between cards of disparate heights.
- **Mobile Spine Co-Axial Alignment**: In `src/styles/film.css` under `@media (max-width: 767px)`:
  - Timeline column: `grid-template-columns: 28px minmax(0, 1fr);` (line 709)
  - Spine: `left: 13px; margin-left: 0; width: 2px;` → Center axis is at `13px + 2px / 2 = 14px`.
  - Node: `margin-left: 8px; width: 12px;` → Center axis is at `8px + 12px / 2 = 14px`.
  - Math check: Spine center (14px) strictly equals Node center (14px). Exact co-axial centering achieved.
- **Micro-Typography**: In `src/styles/film.css`:
  - `.timeline-card__period`: `0.68rem` (line 582, up from `0.58rem`)
  - `.timeline-card__chapter`: `0.68rem` (line 588, up from `0.58rem`, opacity `0.65`)
  - `.timeline-card__highlights li`: `clamp(0.72rem, 0.8vw, 0.8rem)` (line 644, up from `clamp(0.68rem, ...)`)
  - `.timeline__tech`: `0.66rem` (line 663, up from `0.56rem`, opacity `0.88`)
  No timeline microcopy remains below 0.64rem.
- **Regression Suite**: All 11 assertions in `src/test/film-timeline-review.test.ts` passed (circular nodes, min/max 12px width/height, 2.3 height matching between panel and section).

### 1.5 Headless Execution & Build (R4)
- Ran `npm test`: 15 test files passed (131 tests), 0 failures.
- Ran `npm run build`: `tsc -b && vite build` built in 1.31s with zero errors or warnings.
- Execution executed strictly headless in the background without focus stealing.

---

## 2. Logic Chain

1. **Elimination of Backdrop Blank Flash**:
   - Because `FilmSlide.tsx` keeps `.film-slide[data-clip-active='true'] .film-slide__poster` at `opacity: 1` and at `z-index: 0` underneath the video at `z-index: 1`, any video buffer stall, frame seek latency, or initial decode time displays an opaque origin poster. Because `sceneClips.json` maps each clip to its origin frame (e.g. clip 1 starts from `02-about-poster.png`), the visual presentation matches the preceding state continuously without blank flash.
2. **Seamless Reverse Overlap Scrubbing**:
   - During reverse scrolling through the 220px overlap window, incoming clip `index + 1` fades down from 1 to 0 while outgoing clip `index` holds its `effectiveHold` playhead at `opacity: 1`. When `y` crosses `nextStart`, clip `index` smoothly resumes scrub from `effectiveHold` down to 0, eliminating temporal snapping.
3. **Viewport Scale Invariance**:
   - Binding `window.addEventListener('resize', remeasure)` with `gates = buildGates([{ clip, y: 0, span: sliceHeight(...) }])` ensures that changes to `window.innerHeight` recompute gate frame steps and spans synchronously with RAF throttling, eliminating accumulated playhead boundary drift.
4. **Timeline Geometry Stability**:
   - `align-items: start` with coordinated node and connector top margins anchors nodes to chapter headers regardless of bullet point count differences across cards.
   - At the mobile breakpoint, `left: 13px` for a 2px spine in a 28px column centers the spine at 14px; a 12px node with `margin-left: 8px` places its center at `8 + 6 = 14px`. This yields mathematically exact co-axial alignment.
   - Typography scales ensure WCAG legible sizing above sub-10px thresholds.

---

## 3. Caveats

1. **Synthetic Video Events in jsdom**:
   - jsdom does not run a full video decoding engine; video ready states (`readyState`, `onLoadedData`, `onCanPlay`) and video seeking were verified via DOM event dispatch and unit test harnesses. Full hardware decoding relies on standard Chromium/WebKit video elements.
2. **No implementation modifications made**:
   - In accordance with the challenger role, all verification was performed via non-invasive testing and automated test harnesses.

---

## 4. Conclusion

**Verdict: `APPROVE`**

All requirements under R2 (Backdrop and Image Transitions) and R3 (Experience Section Polish) are empirically verified and robust under adversarial conditions. The visual transitions are flicker-free, reverse scroll holds the correct temporal frames across overlap zones, window resizing maintains gate consistency, experience timeline geometry is co-axially aligned and top-anchored, micro-typography meets legibility standards, and all 131 tests and production builds execute headlessly with zero errors.

---

## 5. Verification Method

To independently reproduce and verify this report:

1. **Run full automated test suite (strictly headless)**:
   ```powershell
   npm test
   ```
   *Expected result: 15 passed test files, 131 passed tests, zero errors.*

2. **Run dedicated empirical adversarial test suite**:
   ```powershell
   npx vitest run src/test/adversarial-r2-r3-empirical.test.tsx
   ```
   *Expected result: 14 passed tests covering poster opacity, reverse overlap holding, resize gate stability, timeline geometry, and micro-typography.*

3. **Run production TypeScript build**:
   ```powershell
   npm run build
   ```
   *Expected result: `tsc -b && vite build` succeeds with zero errors in ~1.3s.*

4. **Inspect CSS geometric declarations**:
   - Desktop node anchor: `src/styles/film.css:359` (`align-items: start`)
   - Mobile spine alignment: `src/styles/film.css:714` (`left: 13px`) and `src/styles/film.css:726` (`margin-left: 8px`)
   - Origin posters: `content/sceneClips.json`
