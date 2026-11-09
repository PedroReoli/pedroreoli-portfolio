# BRIEFING — 2026-11-06T17:08:00Z

## Mission
Implement Milestone 3 (M3): Selected Projects visual framing & scroll emergence, Stack section compact 100svh density and typography/icon polish, and useReveal hook refinement.

## 🔒 My Identity
- Archetype: worker
- Roles: implementer, qa
- Working directory: f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\worker_m3_1
- Original parent: 828ce2d2-ae98-4861-bd61-2f16df459852
- Milestone: Milestone 3 (M3) — Projects & Stack Polish

## 🔒 Key Constraints
- Exclusive write ownership:
  - src/components/home/SelectedProjectsSection.tsx
  - src/components/home/StackSection.tsx
  - src/hooks/useReveal.ts
  - src/styles/home.css
- DO NOT edit any other files.
- Preserve regex assertions in src/test/sections3-4-layout-stress.test.tsx (`aspect-ratio: 16 / 10`, `max-height: 230px`, `object-fit: cover`, `object-position: top center`).
- Run `npm test` and `npm run build`.
- DO NOT cheat, hardcode test outputs, or create dummy implementations.

## Current Parent
- Conversation ID: 828ce2d2-ae98-4861-bd61-2f16df459852
- Updated: 2026-11-06T17:08:00Z

## Task Summary
- **What to build**: SelectedProjectsSection visual framing (picture + WebP, window chrome bar with 3 dots, vignette, hover transform, reveal wrapper), StackSection 100svh compact layout, typography (+24%) & icons (+30%) scale-up, and useReveal hook refinement.
- **Success criteria**: All tests pass, build passes, layout stress tests satisfied.
- **Interface contracts**: PROJECT.md
- **Code layout**: src/components/home/, src/hooks/, src/styles/

## Key Decisions Made
- Wrapped `m.article` in `.project-card-reveal-wrapper` with `data-reveal` in `SelectedProjectsSection.tsx` to completely isolate GSAP scroll trigger emergence transform from Motion `whileHover={{ y: -5 }}`.
- Added software dashboard window chrome bar with 3 micro dots (`frame-dot--close`, `min`, `max`), frame bar title, modern `<picture>` with WebP `<source>`, and bottom vignette overlay.
- Added card hover reveal peek interaction with `transform: translateY(-8px) scale(1.025)` and saturation boost.
- Refined `useReveal.ts` with clean initial state (`gsap.set(elements, { opacity: 0, y: 24 })`), scoped selector using `scope.current`, and batch trigger at `top 85%` with `power3.out`.
- Tightened vertical slack in `StackSection` (`.stack-section > .shell` and `.stack-section__intro`) ensuring 100svh fit.
- Enlarged StackSection category titles to `0.82rem` (+24% from `0.66rem`) and numbers to `0.75rem` (+17% from `0.64rem`).
- Preserved strict compliance with all 13 layout stress regex tests in `sections3-4-layout-stress.test.tsx`.

## Artifact Index
- DISPATCH.md — dispatch instructions and assignment
- progress.md — liveness heartbeat and step tracking
- handoff.md — 5-component handoff report

## Change Tracker
- **Files modified**:
  - `src/components/home/SelectedProjectsSection.tsx` — Project card framing, `<picture>` WebP, dashboard chrome bar, vignette, reveal wrapper.
  - `src/components/home/StackSection.tsx` — Added `.stack-column-revealed` class, maintained clean chip architecture.
  - `src/hooks/useReveal.ts` — Scoped queries, clean initial state, power3.out emergence at `top 85%`.
  - `src/styles/home.css` — Framing styles, hover peek, tightened stack spacing, enlarged category typography, prefers-reduced-motion block.
- **Build status**: PASS (`tsc -b && vite build` succeeded in 1.21s)
- **Pending issues**: None

## Quality Status
- **Build/test result**: All 34 vitest tests passing across 4 test suites.
- **Lint status**: Clean (tsc passes with no errors).
- **Tests added/modified**: Validated against `src/test/sections3-4-layout-stress.test.tsx`, `rendering.test.tsx`, `contracts.test.ts`, `section2-layout-stress.test.tsx`.

## Loaded Skills
- None
