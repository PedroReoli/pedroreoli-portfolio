# Project: Pedro Reoli Portfolio - Projects & Stack Compact Optimization

## Architecture
- React 19 + TypeScript + Vite architecture.
- Modular Vanilla CSS (`base.css`, `layout.css`, `home.css`, `pages.css`, `responsive.css`).
- Shared Solar Amber / Night / Paper theme tokens in `base.css` and `palette.ts`.
- Content driven by JSON files in `content/`.
- Test suite with Vitest (`rendering.test.tsx`, `contracts.test.ts`, `section2-layout-stress.test.tsx`).

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Compact Projects Showcase Grid | Balance `.project-showcase` (e.g. `1.15fr 0.85fr` or `1fr 1fr`), cap height (`max-height: 480px`), eliminate giant vertical stretching in desktop 100svh | M1 | Survey (Proj & Build) |
| 2 | Pristine Project Image Display | Set `.project-card__visual` to `aspect-ratio: 16 / 10; max-height: 230px`, `object-fit: cover; object-position: top center;`, `loading="eager"`/`"lazy"`, and `decoding="async"` | M1 | Survey (Proj) |
| 3 | Scaled Achilles Artwork | Resize `.agent-art__radar` to `160px` with proportional core and step labels so Card 2 matches Card 1 height without clipping | M1 | Survey (Proj) |
| 4 | Compact Projects Typography & Internal Spacings | Reduce heading h2 to `clamp(2.4rem, 4.5vw, 4.2rem)` and card title h3 to `clamp(1.5rem, 2.2vw, 2.4rem)`; tighten card body padding | M1 | Survey (Proj) |
| 5 | Archive Projects Page Compactness | Adjust `.gallery-grid` and `.independent-grid` cards to avoid excessive min-heights (360px-550px) and preserve 16:10 screenshots | M1 | Survey (Proj) |
| 6 | Compact Minha Stack Category Cards | Reduce article padding to `clamp(8px, 1.1vh, 12px)`, radius to `var(--radius-sm)` (12px), background to subtle tint | M2 | Survey (Stack) |
| 7 | Compact Stack Chips & Badges | Reduce tool `li` min-height to ~30px (`clamp(28px, 3.2vh, 32px)`), radius to `8px` (`--radius-xs`), padding to `2px 8px` | M2 | Survey (Stack) |
| 8 | Compact Stack Icons & Scaled SVGs | Resize `.stack-icon` container to `20x20px` with SVG icon prop `size={15}` | M2 | Survey (Stack) |
| 9 | Dense Category Grid Presentation | Organize tools into dense 2-column or clean list rhythm per category; compact section intro and heading | M2 | Survey (Stack) |
| 10 | Mobile & Responsive Optimization | Adjust responsive rules for <= 760px and <= 420px; eliminate mobile visual min-height: 290px bloat | M1, M2 | Survey (Proj & Stack) |
| 11 | Layout Stress & Regression Test Suite | Create `src/test/sections3-4-layout-stress.test.tsx` testing compact height budgets across 768p/900p/1080p/1440p viewports, image attributes, and tool rendering | M3 | Survey (Build) |
| 12 | Lint & Build Integrity | Clean unused var in `section2-layout-stress.test.tsx:2:18`, verify `npm run build` and `npm run test` pass with 0 errors | M3 | Survey (Build) |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Compact Projects Section & Images | Refactor `SelectedProjectsSection.tsx`, `home.css`, `responsive.css`, `pages.css` | none | DONE |
| M2 | Compact Minha Stack & Dense Grid | Refactor `StackSection.tsx`, `home.css`, `responsive.css` | none | DONE |
| M3 | Comprehensive Testing & Quality Gate | Add `sections3-4-layout-stress.test.tsx`, clean lint, run tests/build, challenger & auditor verification | M1, M2 | DONE |

## Interface Contracts
### Projects Section (`SelectedProjectsSection.tsx`)
- Props: `{ language: 'pt' | 'en' }`
- Section ID: `#projetos`
- CSS Classes: `.work-section`, `.project-showcase`, `.project-card`, `.project-card__visual`, `.project-card__body`
- Preserved text labels: `Autocom3`, `Achilles`, `PROJETOS`

### Stack Section (`StackSection.tsx`)
- Props: `{ language: 'pt' | 'en' }`
- Section ID: `#stack`
- CSS Classes: `.stack-section`, `.stack-section__intro`, `.stack-grid`, `.stack-icon`
- Preserved text labels: `MINHA`, `STACK.`, and all 24 tool names

## Code Layout
- `src/components/home/SelectedProjectsSection.tsx`: Homepage projects component
- `src/components/home/StackSection.tsx`: Homepage stack component
- `src/styles/home.css`: Desktop and base section styling
- `src/styles/responsive.css`: Breakpoint rules
- `src/styles/pages.css`: Projects archive styling
- `src/test/sections3-4-layout-stress.test.tsx`: Layout stress and compact verification suite
- `src/test/section2-layout-stress.test.tsx`: Existing section 2 layout tests
