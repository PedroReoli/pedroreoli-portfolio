# Scope: Portfolio Scrolling, Transitions & Experience Polish

## Architecture
- **Scrolling & Animation Engine**: `src/components/scene/FilmSlide.tsx`, `src/components/scene/useFrameScroll.ts`, `src/components/scene/slices.ts`, `src/components/scene/FilmTrackHeight.tsx`
- **Global Styles & Layout**: `src/styles/film.css`, `src/styles/layout.css`, `src/styles/base.css`, `src/styles/responsive.css`, `src/styles/backdrop.css`
- **Components & Modal**: `src/pages/HomePage.tsx`, `src/components/home/ExperienceSection.tsx`, `src/components/home/SelectedProjectsSection.tsx`, `src/components/projects/ProjectViewerModal.tsx`
- **Content Definitions**: `content/sceneClips.json`, `content/homeContent.json`, `content/interfaceContent.json`

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Scroll Listener & DOM Throttle | Eliminate 6x duplicated panel iteration and ~180 DOM mutations per tick; coordinate single-pass panel updates via RAF | M1 | Survey (Explorer 1 & 2) |
| 2 | Terminal Panel Fade-out Fix | Add `isLastSlot` exemption in `FilmSlide.tsx` so `#experiencia` and embedded footer don't fade to `opacity: 0` at page bottom | M1 | Survey (Explorer 1) |
| 3 | Eliminate Subpixel Jitter & Blur Thrash | Stabilize font rasterization by eliminating dynamic `scale(...)` changes on text containers and gating expensive blur | M1 | Survey (Explorer 1) |
| 4 | CSS Viewport & Anchor Navigation Fixes | Remove `scroll-margin-top: 0` in `layout.css`, fix anchor landing invisibility, and prevent high-specificity mobile overflow truncation | M1 | Survey (Explorer 1) |
| 5 | Video Backdrop Poster Ready-State Fix | Fix `data-frame-ready` so poster remains visible while video is decoding, preventing black flashes | M2 | Survey (Explorer 2) |
| 6 | Scene Clips Poster Alignment | Correct poster mapping in `sceneClips.json`/`FilmSlide.tsx` to pair clips with origin posters instead of destination posters | M2 | Survey (Explorer 2) |
| 7 | Reverse Scroll Overlap Frame Holding | Hold end frame during reverse overlap transitions to prevent temporal video jumps | M2 | Survey (Explorer 2) |
| 8 | Window Resize Geometry Recalculation | Recompute `gates` in `useFrameScroll.ts` on resize to eliminate viewport boundary drift | M2 | Survey (Explorer 2) |
| 9 | Modal Image Preloading & Transition | Add preloading and transition states in `ProjectViewerModal.tsx` for smooth screenshot navigation | M2 | Survey (Explorer 2) |
| 10 | Experience Top Padding Fix | Fix dead CSS selector `.film-panel > #experiencia > section` so top padding compensation is applied | M3 | Survey (Explorer 3) |
| 11 | Desktop Timeline Node Alignment | Change desktop `.timeline-v__item` to `align-items: start` with top margin so nodes anchor to chapter headers rather than floating mid-row | M3 | Survey (Explorer 3) |
| 12 | Mobile Timeline Spine Co-Axial Centering | Correct mobile node margin from 7px to 8px for exact alignment with the 2px spine in the 28px column | M3 | Survey (Explorer 3) |
| 13 | Experience Micro-Typography Polish | Lift sub-10px fonts (`0.56rem`–`0.58rem`) to legible scale (`0.64rem`–`0.72rem`) across timeline elements | M3 | Survey (Explorer 3) |
| 14 | Non-Intrusive Execution & Verification | Maintain 100% headless background execution for test suites and builds without stealing focus | M4 | Survey (Explorer 3) |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Scrolling Performance & Terminal Visibility | R1: Single-pass RAF scroll updates, last panel fade-out fix, subpixel jitter removal, anchor scroll-margin | Survey | DONE |
| M2 | Backdrop Video & Image Transitions | R2: Poster ready-state fix, origin poster alignment, overlap frame holding, modal image transition | M1 | DONE |
| M3 | Experience Section Presentation Polish | R3: Dead selector fix, desktop node header anchoring, mobile spine centering, micro-typography polish | M2 | DONE |
| M4 | Comprehensive Verification & Auditing | Automated testing (`npm test`), build validation (`npm run build`), Reviewers, Challengers, Forensic Auditor | M1, M2, M3 | DONE |

## Code Layout & Write Boundaries
- `src/components/scene/FilmSlide.tsx` — Single-pass scroll controller, isLastSlot exemption, poster readyState, overlap hold
- `src/components/scene/useFrameScroll.ts` — RAF throttling, resize gate remeasure
- `src/styles/layout.css` & `src/styles/base.css` — scroll-margin-top fix, smooth scroll scrub
- `src/styles/film.css` — Mobile overflow responsive scope, poster opacity rules, dead selector fix, timeline alignment and typography
- `content/sceneClips.json` — Poster mappings
- `src/components/projects/ProjectViewerModal.tsx` — Image preloading / crossfade without effect setState
- `src/components/home/ExperienceSection.tsx` & `src/styles/responsive.css` — Timeline presentation & responsive consistency
