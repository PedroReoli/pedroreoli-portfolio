## 2026-11-08T21:16:12Z
You are a teamwork_worker implementation agent.

Working directory: f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio
Your state folder: f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\worker_1\
Original request path: f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\ORIGINAL_REQUEST.md
Scope document path: f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\orchestrator_5\SCOPE.md

You MUST read the original request at f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\ORIGINAL_REQUEST.md first.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Context & Reference Reports:
Read the comprehensive survey reports prepared by the 3 explorers before starting code modifications:
- Explorer 1 (Scrolling R1): f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\explorer_survey_1\handoff.md
- Explorer 2 (Transitions R2): f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\explorer_survey_2\handoff.md
- Explorer 3 (Experience R3 & Test Infra R4): f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\explorer_survey_3\handoff.md

Your Task:
Implement the verified fixes and polish across Requirements R1, R2, and R3 while adhering strictly to Constraint R4.

1. Requirement R1: Application Scrolling Fixes
- `src/components/scene/FilmSlide.tsx` & `src/components/scene/useFrameScroll.ts`:
  - Eliminate 6x duplicated DOM style mutations: ensure panel style iteration (`[data-film-panel]`) is coordinated once per tick (e.g. only on `index === 0`).
  - Add RAF throttling for scroll handler.
  - Fix terminal panel dissolution: ensure the final slot (`slot === ids.length - 1`, `#experiencia` + footer) does not fade out to `opacity: 0` when reaching the bottom of the page (`leaving * (isLastSlot ? 0 : 1)` or similar), while preserving exact regex compatibility with `src/test/film-panel-fade.test.ts`.
  - Eliminate subpixel font jitter: stabilize `scale(...)` (keep constant 1 or motion-safe) and avoid unnecessary `blur()` on text containers.
- `src/styles/layout.css`: Remove line 266 (`section, footer { scroll-margin-top: 0; }`) so `base.css`'s `scroll-margin-top: var(--header-height, 72px)` properly spaces anchors under the fixed header.
- `src/styles/film.css`: Scope `.film-panel > section { height: 100svh; overflow: hidden; }` to desktop (`@media (min-width: 1101px)`) so smaller viewports allow responsive height without clipping.

2. Requirement R2: Image and Backdrop Transitions
- `src/components/scene/FilmSlide.tsx` & `src/styles/film.css`:
  - Fix permanent poster invisibility: maintain the poster visible until the video frame is genuinely decoded and ready to display (`videoReady` state via `loadeddata`/`canplay` or keep poster underneath at z-index 0 without black flash).
  - Reverse scroll overlap holding: during overlap transition when scrolling backwards (`stillCovered`), hold video playhead at the end frame (`effectiveHold(clip)`) so it doesn't freeze at 0 or jump abruptly when re-entering.
- `content/sceneClips.json` or `FilmSlide.tsx`:
  - Ensure clips correctly display their origin posters (`sceneClips.heroPoster` for slide 0, and true origin poster for each transition).
- `src/components/scene/useFrameScroll.ts`:
  - Recompute `gates` on window resize in `remeasure()` so viewport geometry doesn't drift.
- `src/components/projects/ProjectViewerModal.tsx`:
  - Add smooth image transition/preloading so modal image swapping doesn't cut abruptly.

3. Requirement R3: Experience Section Polish
- `src/styles/film.css`:
  - Fix dead selector at line 535 (`.film-panel > #experiencia > section`) by targeting `.film-panel > #experiencia` directly for top padding compensation.
  - Desktop timeline node alignment: change `.film-panel > #experiencia .timeline-v__item` to `align-items: start;` and add top margin to node/connector to anchor cleanly to chapter headers across cards of varying heights.
  - Mobile spine centering: adjust mobile `.timeline-v__node` margin (to 8px) so the 12px node is co-axial with the 2px spine in the 28px column.
  - Micro-typography legibility: elevate sub-10px font sizes (`0.56rem`–`0.58rem`) to legible scale (`0.64rem`–`0.72rem`) while respecting `src/test/film-timeline-review.test.ts` constraints (do NOT change 12px node dimensions, 20px ring, or 2.3 height).

4. Requirement R4 & Verification:
- All commands MUST run strictly headless in the background. DO NOT open GUI or browser windows.
- Run `npm test` and ensure all 13 test files and 97+ tests pass with 0 errors. If any test regex fails due to code formatting, adjust code to satisfy both the fix and test contracts.
- Run `npm run build` and ensure TypeScript (`tsc -b`) and Vite build succeed with 0 errors.

Deliverable:
Write a comprehensive `handoff.md` in your state folder (`f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\worker_1\handoff.md`) with:
- Observation (files modified, changes made)
- Build and test commands executed with exact output and timestamps
- Logic Chain
- Caveats & verification evidence
When done, message the orchestrator with your results.
