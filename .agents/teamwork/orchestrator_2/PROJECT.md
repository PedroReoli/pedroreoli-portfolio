# Project: Portfolio Redesign (Round 2)

## Architecture
- **Framework**: React 18 + Vite + TypeScript (single-page application with auxiliary routes).
- **Styling**: Modular CSS in `src/styles/` (`base.css`, `layout.css`, `home.css`, `pages.css`, `responsive.css`) imported into `src/index.css`. No Tailwind CSS.
- **Animations**: GSAP (`@gsap/react`, `gsap`) with timeline selectors.
- **Testing**: Vitest (`src/test/rendering.test.tsx`, `src/test/contracts.test.ts`).
- **Icons & Assets**: Native SVG icons in `src/components/common/Icon.tsx`, images in `src/assets/`.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| F1 | Meta Bar Removal | Permanently remove top status/meta bar ("PORTFÓLIO / 01", "• DISPONÍVEL...", "VOLTA REDONDA, BR") | M1 | ORIGINAL_REQUEST §R2 |
| F2 | 3D Scene Removal | Permanently remove right-hand visual item / 3D scene (`HeroScene.tsx`, `@react-three/*`) | M1 | ORIGINAL_REQUEST §R2 |
| F3 | Hero Horizontal Centering | Center hero name, role, typography, copy, and CTA buttons horizontally | M1 | ORIGINAL_REQUEST §R2 |
| F4 | Secondary Palette Update | Replace `#2dd4bf` (teal) with a modern cohesive accent color (e.g. electric indigo `#6366f1` / violet `#8b5cf6` or warm amber / cyan) complementing dark theme | M2 | ORIGINAL_REQUEST §R3 |
| F5 | Full Viewport Height | Hero and all content sections occupy 100% viewport height (`100svh` / `100vh`) | M3 | ORIGINAL_REQUEST §R1 |
| F6 | Desktop Non-Scrolling | On desktop (1080p, 1440p), all sections fit in viewport without scrolling, except Experience | M3 | ORIGINAL_REQUEST §R1 |
| F7 | Experience Scroll Exception | Experience section occupies full viewport (`min-height: 100svh`) but allows vertical scrolling | M3 | ORIGINAL_REQUEST §R1 |
| F8 | Font Size Invariance | Heading, title, subtitle, and body font sizes must NOT be decreased; compact via spacing | M3 | ORIGINAL_REQUEST §R1 |
| F9 | Header Offset | Fixed 72px header accounted for cleanly via section padding-top and scroll margins | M3 | ORIGINAL_REQUEST §R1 |
| F10 | Build & Test Validation | `npm run build` succeeds with zero errors and `npm test` passes with zero regressions | M4 | ORIGINAL_REQUEST Acceptance Criteria |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Hero Redesign & Element Removal | Remove meta bar, remove 3D scene, center hero content | Survey | DONE |
| M2 | Secondary Palette Update | Update CSS variables and color tokens across styles | Survey | DONE |
| M3 | Full Viewport & Compact Layout | Implement 100svh flex layouts, compact padding/margins across all sections | Survey, M1, M2 | DONE |
| M4 | Test Suite & Build Verification | Verify tests pass, update assertions if necessary, run build | M1, M2, M3 | DONE |

## Code Layout & Exclusive Write Ownership
To avoid concurrent write conflicts, parallel workers are assigned strict, non-overlapping file ownership:

| Worker | Assigned Role | Exclusive File Ownership |
|---|---|---|
| `worker_hero` | Hero Component Specialist | `src/components/home/HeroSection.tsx`, `src/components/home/HeroScene.tsx` |
| `worker_palette` | Palette & Tokens Specialist | `src/styles/base.css` |
| `worker_home_css` | Home Sections CSS Specialist | `src/styles/home.css` |
| `worker_layout_responsive` | Shell & Responsive CSS Specialist | `src/styles/layout.css`, `src/styles/responsive.css` |
| `worker_tests` | Test & Contracts Specialist | `src/test/rendering.test.tsx`, `src/test/contracts.test.ts` |
