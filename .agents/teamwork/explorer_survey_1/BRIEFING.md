# BRIEFING — 2026-11-08T21:13:00Z

## Mission
Investigate Requirement R1 (Application Scrolling Fixes), identifying root causes of unnatural scroll friction, container overflow, jitter, and scrollbar trapping, and proposing a concrete fix strategy.

## 🔒 My Identity
- Archetype: explorer
- Roles: explorer, synthesis
- Working directory: f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio
- State folder: f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\explorer_survey_1
- Original parent: c936b95e-59f1-4487-86ee-f0440d7aedc8
- Milestone: Requirement R1 Scrolling Investigation

## 🔒 Key Constraints
- Read-only investigation — do NOT implement
- R4: User is actively gaming. Absolutely no window focus stealing, no foreground GUI/browser windows. Strictly background/headless.

## Current Parent
- Conversation ID: c936b95e-59f1-4487-86ee-f0440d7aedc8
- Updated: not yet

## Investigation State
- **Explored paths**:
  - `ORIGINAL_REQUEST.md`
  - `src/styles/base.css`, `src/styles/layout.css`, `src/styles/film.css`, `src/styles/home.css`, `src/styles/responsive.css`
  - `src/pages/HomePage.tsx`
  - `src/components/scene/FilmSlide.tsx`, `src/components/scene/useFrameScroll.ts`, `src/components/scene/slices.ts`, `src/components/scene/FilmTrackHeight.tsx`
  - `src/components/layout/Header.tsx`, `src/context/RouterContext.tsx`
  - `src/components/home/ExperienceSection.tsx`, `PurposeSection.tsx`, `StackSection.tsx`, `SelectedProjectsSection.tsx`, `AboutSection.tsx`, `HeroSection.tsx`
  - Test suites: `film-panel-fade.test.ts`, `film-scroll-trap.test.ts`, `film-timeline-review.test.ts`, `film-slices.test.ts`, `sections3-4-layout-stress.test.tsx`
- **Key findings**:
  1. Multiplied scroll listeners & unthrottled DOM mutations (6 slides * 6 panels updated per scroll tick).
  2. Synchronous unthrottled video decoding seeking (`video.currentTime = ...`) causing stutter.
  3. Last panel (`ExperienceSection` + embedded Footer) fades out to opacity 0 at maxScroll due to unchecked `leaving` calculation in `FilmSlide.tsx:97`.
  4. Dynamic subpixel glyph jitter caused by float `scale()` and expensive GPU `filter: blur()` on every scroll increment.
  5. Contradictory CSS overflow & container height constraints: `film.css` high-specificity rules force `100svh; overflow: hidden;` overriding `responsive.css`'s `height: auto; overflow: visible;`, resulting in clipped/truncated content on tablet/mobile.
  6. `html { scroll-behavior: smooth }` creates sluggish friction with manual scrub, while `layout.css:266` resets `scroll-margin-top: 0`, causing anchor jumps to hide section headers behind fixed navbar.
  7. Conflicting animation libraries (GSAP ScrollTrigger in `useReveal`, Framer Motion, and FilmSlide DOM mutations all animating the same elements simultaneously).
- **Unexplored areas**: None for R1. Ready to deliver handoff report.

## Key Decisions Made
- Fully analyzed all code pathways and verified test assertions.
- Drafted 5-component handoff report with exact line citations and concrete fix strategy.

## Artifact Index
- DISPATCH.md — Received task assignment
- BRIEFING.md — Working memory index
- progress.md — Liveness heartbeat and progress tracking
- handoff.md — Complete technical analysis and recommendation report
