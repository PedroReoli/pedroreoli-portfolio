# Handoff Report — Requirement R2: Image and Backdrop Transitions

**Agent**: `teamwork_explorer` (`explorer_survey_2`)  
**Date**: 2026-11-08T21:14:00Z  
**Target Requirement**: R2 — Image and Backdrop Transitions  
**Status**: Investigation Complete (Read-Only)

---

## 1. Observation

### 1.1 Codebase Evolution: `VideoStage.tsx` Replaced by `FilmSlide.tsx`
- In `ORIGINAL_REQUEST.md:14-15`, `src/components/scene/VideoStage.tsx` was specified for inspection.
- Direct inspection of the repository (`git log -S VideoStage --oneline`, commit `75ded2a`) revealed that `VideoStage.tsx` was deleted and replaced by a film strip architecture:
  - Commit message: `refactor(film): uma rolagem = um frame, sem paralaxe, e S3 vira cards sem imagem`
  - Current implementation files:
    - `src/components/scene/FilmSlide.tsx`
    - `src/components/scene/useFrameScroll.ts`
    - `src/components/scene/slices.ts`
    - `src/components/scene/FilmTrackHeight.tsx`
    - `src/styles/film.css`
    - `src/styles/backdrop.css`
    - `content/sceneClips.json`

### 1.2 Poster Ready-State Deadlock in `FilmSlide.tsx` and `film.css`
- **Location**: `src/components/scene/FilmSlide.tsx:69-70`
  ```tsx
  root.dataset.clipActive = active ? 'true' : 'false'
  root.dataset.frameReady = active ? 'true' : 'false'
  ```
- **Location**: `src/styles/film.css:75-84`
  ```css
  .film-slide__poster {
    z-index: 0;
    opacity: 0;
  }

  /* Só o clipe em cena pode mostrar o próprio poster, e ele sai de cena assim que o
     vídeo entrega o primeiro frame. */
  .film-slide[data-clip-active='true'][data-frame-ready='false'] .film-slide__poster {
    opacity: 1;
  }
  ```
- **Observed behavior**: Because `data-clip-active` and `data-frame-ready` are both set to `active ? 'true' : 'false'` synchronously on the same line (line 70), when `active` is `true`, `data-frame-ready` is immediately `'true'`. The selector `.film-slide[data-clip-active='true'][data-frame-ready='false']` is NEVER satisfied. Consequently, `.film-slide__poster` has `opacity: 0` at all times in every lifecycle state (initial page load, video buffering, seeking, or transition).

### 1.3 Mismatched Poster Targets in `content/sceneClips.json`
- **Location**: `content/sceneClips.json:8-61`
  - Clip 0 (`hero-to-about`): `"from": "hero"`, `"to": "sobre"`, `"poster": "/media/backdrop/02-about-poster.png"`
  - Clip 1 (`about-to-projects`): `"from": "sobre"`, `"to": "projetos-selecionados"`, `"poster": "/media/backdrop/03-projects-poster.png"`
  - Clip 2 (`projects-to-stack`): `"from": "projetos-selecionados"`, `"to": "stack"`, `"poster": "/media/backdrop/04-stack-poster.png"`
  - Clip 3 (`stack-to-purpose`): `"from": "stack"`, `"to": "proposito"`, `"poster": "/media/backdrop/05-purpose-poster.png"`
  - Clip 4 (`purpose-to-experience`): `"from": "proposito"`, `"to": "experiencia"`, `"poster": "/media/backdrop/06-experience-poster.png"`
  - Clip 5 (`experience-loop`): `"from": "experiencia"`, `"to": "experiencia"`, `"poster": "/media/backdrop/06-experience-poster.png"`
- **Location**: `src/components/scene/FilmSlide.tsx:160`
  ```tsx
  <img
    className="film-slide__poster"
    src={index === 0 ? sceneClips.heroPoster : clip.poster}
    alt=""
    loading={index < 2 ? 'eager' : 'lazy'}
    decoding="async"
  />
  ```
- **Observed behavior**: For index 1 (About Section, starting at "Sobre"), `clip.poster` is `03-projects-poster.png` (the destination poster of the clip, not the starting poster). For index 2, `clip.poster` is `04-stack-poster.png`. In all cases except index 0 and 5, `clip.poster` points to the *destination* section rather than the *start* section of that slide's gate.

### 1.4 Inactive Video Frozen Frame Snapping During Overlap / Rewind
- **Location**: `src/components/scene/FilmSlide.tsx:57-62` and `146-150`
  ```tsx
  if (!active) {
    const covering = index + 1
    const nextStart = sliceStart(ids, covering, window.innerHeight)
    const stillCovered = y >= nextStart && y < nextStart + OVERLAP
    opacity = stillCovered ? 1 : 0
  }
  video.dataset.active = active ? 'true' : 'false'
  video.style.opacity = String(opacity)
  ...
  if (!active) return

  video.pause()
  if (video.readyState >= 1) video.currentTime = state.time
  document.documentElement.dataset.filmTime = state.time.toFixed(3)
  ```
- **Observed behavior**:
  - In the transition overlap window (`nextStart <= y < nextStart + OVERLAP`, width 220px), the outgoing slide `index` has `stillCovered = true`, so `opacity = 1`.
  - However, because `active` is `false`, line 146 executes `if (!active) return;`.
  - When scrolling backwards (upwards) from Slide `index + 1` into Slide `index`: Slide `index` is visible at `opacity = 1` while Slide `index + 1` fades from 1 to 0. During this entire 220px zone, Slide `index`'s `<video>` is frozen at whatever frame it was previously parked at (or at 0s if freshly loaded).
  - The instant `y` crosses `nextStart` and becomes `< nextStart`, Slide `index` becomes `active = true`. Line 149 suddenly sets `video.currentTime = state.time` to `holdAt`, causing an instant temporal jump / frame snap while fully visible.

### 1.5 6x Redundant Panel DOM Mutation Storm per Scroll Tick
- **Location**: `src/components/scene/FilmSlide.tsx:91-144`
- **Observed behavior**:
  - `HomePage.tsx` mounts 6 instances of `FilmSlide` (`sceneClips.clips.map(...)`).
  - Each `FilmSlide` registers a `useFrameScroll` listener on `window.addEventListener('scroll')`.
  - Inside the scroll callback (`show`), lines 91-144 loop over `document.querySelectorAll<HTMLElement>('[data-film-panel]')` and mutate inline styles (`opacity`, `filter`, `transform`, `zIndex`) for all 6 panels and all child elements inside `:scope > section > .shell > *`.
  - On every scroll tick, 6 instances run the identical panel mutation loop: 6 instances × 6 panels × children = over 140 DOM mutations per scroll event.
  - This causes significant main-thread layout thrashing and frame drops, worsening video decode stutter.

### 1.6 Lack of Video ReadyState & Event Tracking
- **Location**: `src/components/scene/FilmSlide.tsx:148-150` and `165-173`
  ```tsx
  video.pause()
  if (video.readyState >= 1) video.currentTime = state.time
  ```
  ```tsx
  <video
    className="film-slide__video"
    data-film-frame={clip.id}
    data-active="false"
    src={clip.src}
    muted
    playsInline
    preload="auto"
  />
  ```
- **Observed behavior**:
  - `<video>` has no event listeners (`loadeddata`, `canplay`, `seeked`, `error`).
  - `video.pause()` is invoked redundantly on every scroll tick.
  - At `readyState === 1` (`HAVE_METADATA`), the current frame has not necessarily been decoded. Setting `currentTime` initiates an asynchronous seek.
  - Because all 6 videos have `preload="auto"`, the browser opens concurrent network requests for ~11.3 MB of MP4 assets and instantiates multiple decoder pipelines simultaneously, competing with GPU resources.

### 1.7 Stale Viewport Geometry on Window Resize
- **Location**: `src/components/scene/useFrameScroll.ts:153-154, 162, 166`
  ```tsx
  const span = sliceHeight(ids, clipIndex, window.innerHeight)
  const gates = buildGates([{ clip, y: 0, span }])

  const write = () => {
    const local = window.scrollY - sliceStart(ids, clipIndex, window.innerHeight)
    handlerRef.current(frameAt(gates, local))
  }

  const remeasure = () => write()
  window.addEventListener('resize', remeasure)
  ```
- **Observed behavior**: On window resize, `remeasure()` simply calls `write()`. The `gates` and `span` variables are NOT recomputed; they retain the initial `window.innerHeight`. Inside `write()`, `sliceStart` uses the new `window.innerHeight`, but `frameAt` computes against the old `gates`. This creates gate-boundary drift.

### 1.8 Project Viewer Modal Image Swapping
- **Location**: `src/components/projects/ProjectViewerModal.tsx:36-47`
- **Observed behavior**:
  - When clicking Previous/Next in the corporate project modal, `index` updates and immediately changes `<img src={image.src} />`.
  - There is no image preloading, crossfade transition, or decode wait. Switching images causes a sudden cut and white/blank flash while the browser fetches and decodes the new asset.

### 1.9 Test Suite & Build Verification
- Verification command: `npm test -- --run`
  - Output: 13 test files passed, 97 tests passed cleanly.
- Verification command: `npm run build`
  - Output: TypeScript build (`tsc -b`) and Vite production bundle succeeded in 885ms with 0 errors.

---

## 2. Logic Chain

```
Observation 1.2: FilmSlide.tsx:70 sets `root.dataset.frameReady = active ? 'true' : 'false'`.
  + Observation 1.2: film.css:82-84 shows poster only when `data-frame-ready='false'`.
  ──> Deduction: Whenever a slide is active, `data-frame-ready` is 'true', making the poster opacity 0.
  ──> Consequence: The poster is permanently invisible across all slides.

Observation 1.6: Video files are ~1.8MB-2.3MB MP4s. Decoding is asynchronous.
  + Above Deduction: Poster is opacity 0.
  ──> Deduction: During initial load or navigation to a section before video frames decode (readyState < 2),
      the video element is transparent and the poster is invisible.
  ──> Consequence: The user sees the #060a0e background color (a blank black void / flash) instead of a seamless graphic.

Observation 1.3: `sceneClips.json` sets `poster` to the destination section (e.g. Slide 1 has '03-projects-poster.png').
  ──> Deduction: Slide 1 (About Section) was assigned the Projects poster.
  ──> Deduction: Past commit 53e48aa hid the poster because it displayed the wrong visual, rather than fixing the mapping.
  ──> Consequence: To safely restore poster visibility, each slide must point to its true origin poster.

Observation 1.4: In FilmSlide.tsx:146, `if (!active) return` skips setting `currentTime` when `!active`.
  + Observation 1.4: During overlap transition (OVERLAP = 220px), outgoing slide has `stillCovered = true` (opacity = 1), but `active = false`.
  ──> Deduction: When scrolling upwards (rewind), the outgoing slide becomes visible under the incoming slide,
      but its video playhead is frozen.
  ──> Consequence: As soon as `y` crosses the boundary into `active`, the playhead jumps from the frozen state
      to `holdAt`, causing an abrupt cut / visual pop.

Observation 1.5: 6 instances of FilmSlide execute `document.querySelectorAll('[data-film-panel]')` on every scroll event.
  ──> Deduction: 140+ redundant DOM style mutations occur per scroll tick on the main thread.
  ──> Consequence: Main-thread execution causes dropped frames, micro-stuttering, and sluggish backdrop crossfading.

Observation 1.7: `useFrameScroll.ts` does not re-build `gates` on window resize.
  ──> Deduction: After resize, `sliceStart` (using new height) and `gates` (using old height) diverge.
  ──> Consequence: Transition boundaries drift, causing clipping or abrupt jumps at viewport boundary.

Observation 1.8: `ProjectViewerModal.tsx` directly swaps `img.src` synchronously.
  ──> Deduction: No pre-cache or transition animation exists for project modal visuals.
  ──> Consequence: Abrupt visual cut and flash when cycling through project gallery images.
```

---

## 3. Caveats

1. **Test Contract Regex Sensitivity (`film-panel-fade.test.ts`)**:
   - `src/test/film-panel-fade.test.ts` reads `FilmSlide.tsx` via `readFileSync` and performs regex assertions:
     - Expects `panel.style.opacity =`
     - Expects `const smoothstep = ...`
     - Expects `const entering = smoothstep((y - startSlot) / ENTER_PX)`
     - Expects `const leaving = smoothstep((y - (endSlot - EXIT_PX)) / EXIT_PX)`
     - Expects `panel.dataset.visible = visible ? 'true' : 'false'`
   - Any refactoring must preserve these exact variable and expression patterns inside `FilmSlide.tsx` so contract tests continue to pass.

2. **`prefers-reduced-motion: reduce` System Rule**:
   - As documented in `src/styles/base.css:92-96`, the user environment enforces `prefers-reduced-motion: reduce`, which injects `!important` zeroing out all CSS `transition-duration` and `animation-duration`.
   - Transitions that rely purely on CSS `transition: opacity 0.3s` will snap instantly. Any smooth fade must either be scroll-driven via inline style interpolation (like the current panel system) or use Web Animations API with explicit duration overrides.

3. **Background/Headless Execution Constraint (R4)**:
   - The user is actively gaming on this machine. All automated checks must remain non-intrusive (no opening Chrome windows or focus-stealing CLI tools).

---

## 4. Conclusion & Recommended Fix Strategy

### Root Cause Summary
1. **Broken `frameReady` logic**: Forced poster opacity to `0` at all times, causing black flash on initial load and section entries.
2. **Mismatched poster assets**: Each slide in `sceneClips.json` was paired with the destination poster instead of its origin poster.
3. **Inactive video freeze**: `if (!active) return` prevented holding the end frame during reverse overlap transitions, causing temporal frame snapping.
4. **6x Redundant scroll listener loop**: 6 instances of `FilmSlide` simultaneously mutating all panels caused main-thread scroll jank.
5. **Missing video event listeners**: Absence of `loadeddata` / `canplay` handling left videos stuck when metadata arrived after initial scroll tick.
6. **Stale resize gates**: Resize listener did not recompute `gates` with updated `window.innerHeight`.
7. **Modal image snap**: Synchronous `src` swap in `ProjectViewerModal` without preloading or crossfade.

### Step-by-Step Fix Strategy

#### Step 1: Align Origin Posters in `sceneClips.json` / `FilmSlide.tsx`
- Ensure each slide displays its true initial poster (the visual state corresponding to `time = 0`):
  - Slide 0 (Hero): `sceneClips.heroPoster` (`/media/backdrop/01-hero-poster.png`)
  - Slide 1 (About): `/media/backdrop/02-about-poster.png`
  - Slide 2 (Projects): `/media/backdrop/03-projects-poster.png`
  - Slide 3 (Stack): `/media/backdrop/04-stack-poster.png`
  - Slide 4 (Purpose): `/media/backdrop/05-purpose-poster.png`
  - Slide 5 (Experience): `/media/backdrop/06-experience-poster.png`
- In `FilmSlide.tsx`, map origin poster as:
  ```ts
  const originPoster = index === 0 ? sceneClips.heroPoster : sceneClips.clips[index - 1].poster
  ```
  (or expose `startPoster` explicitly in `sceneClips.json`).

#### Step 2: Implement True Video Frame Readiness State
- In `FilmSlide.tsx`:
  - Attach `onLoadedData` / `onCanPlay` event listener to `<video>` to mark when a video frame is genuinely decoded and ready for display:
    ```tsx
    const [videoReady, setVideoReady] = useState(false)
    ```
  - When `active && !videoReady`: set `root.dataset.frameReady = 'false'`. The poster stays at `opacity: 1` as a solid visual ground.
  - When `videoReady`: set `root.dataset.frameReady = 'true'`. The video at `z-index: 1` seamlessly displays the moving frames.
  - In `film.css`, maintain poster at `z-index: 0` underneath the video (`z-index: 1`). Even when `frameReady` is true, keeping poster at `opacity: 1` while active is completely safe because the opaque video sits directly on top, eliminating any possible seek-latency flash.

#### Step 3: Fix Overlap Frame Holding for Reverse Scrolling
- In `FilmSlide.tsx`:
  - Modify the guard before `video.currentTime`:
    ```ts
    // Update playhead if active OR if still covered in transition zone
    if (active) {
      video.pause()
      if (video.readyState >= 1) video.currentTime = state.time
      document.documentElement.dataset.filmTime = state.time.toFixed(3)
    } else if (stillCovered) {
      // Hold end frame so the incoming rewind transition sees the seamless matched pose
      const hold = effectiveHold(clip)
      if (video.readyState >= 1 && Math.abs(video.currentTime - hold) > 0.05) {
        video.currentTime = hold
      }
    }
    ```

#### Step 4: Deduplicate Panel Mutation Execution
- In `FilmSlide.tsx`:
  - Guard the panel style iteration so it only runs in **one** slide instance:
    ```ts
    // Only the primary slide coordinates the panel DOM updates
    if (index === 0) {
      document.querySelectorAll<HTMLElement>('[data-film-panel]').forEach((panel) => {
        ...
      })
    }
    ```
  - This eliminates 83% of the main-thread DOM writes per scroll tick while strictly maintaining regex contract compatibility with `film-panel-fade.test.ts`.

#### Step 5: Recalculate Gates on Window Resize in `useFrameScroll.ts`
- In `useFrameScroll.ts`:
  ```ts
  const remeasure = () => {
    const newSpan = sliceHeight(ids, clipIndex, window.innerHeight)
    gatesRef.current = buildGates([{ clip, y: 0, span: newSpan }])
    write()
  }
  ```
  - Ensures scroll gates dynamically match new viewport dimensions without drift.

#### Step 6: Smooth Image Transitions in `ProjectViewerModal.tsx`
- In `ProjectViewerModal.tsx`:
  - Add image preloading for `index - 1` and `index + 1`.
  - Add an image load transition state (e.g. subtle crossfade or skeleton backdrop) so swapping between project screenshots does not produce a blank flash.

---

## 5. Verification Method

To independently verify the findings and proposed solutions:

1. **Verify Existing Tests**:
   ```powershell
   npm test -- --run
   ```
   Ensures all 97 existing tests pass and verifies no baseline regressions exist.

2. **Verify Production Build**:
   ```powershell
   npm run build
   ```
   Ensures zero TypeScript compilation errors and clean Vite chunk generation.

3. **Verify DOM Selector & Contract Matching**:
   Inspect `src/styles/film.css:75-85` vs `src/components/scene/FilmSlide.tsx:69-70` to verify that `.film-slide[data-clip-active='true'][data-frame-ready='false']` is unreachable when `frameReady = active`.

4. **Verify Poster Mapping**:
   Compare `content/sceneClips.json` clip `from`/`to` definitions against `FilmSlide.tsx:160` to confirm that Slide 1 mounts `03-projects-poster.png` (the Projects section image) during the About section.

5. **Invalidation Conditions**:
   - If `sceneClips.json` is restructured to include single unified video backdrops or canvas shaders, clip index calculations in `slices.ts` would need recalculation.
   - Any modification to `FilmSlide.tsx` that removes lines containing `smoothstep` or `panel.style.opacity` will invalidate `src/test/film-panel-fade.test.ts`.
