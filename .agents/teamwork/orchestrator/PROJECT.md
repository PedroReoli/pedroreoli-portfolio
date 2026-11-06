# Project: Pedro Reoli Portfolio Layout Revision & Design Refinement

## Architecture
- Framework: React 19 + Vite + TypeScript
- Styling: Vanilla CSS architecture (`src/styles/base.css`, `layout.css`, `home.css`, `responsive.css`)
- Animation: motion/react (v14.9), GSAP (ScrollTrigger), CSS transforms
- Content: JSON-based single source of truth (`content/*.json`)
- Page Structure (`HomePage.tsx`):
  1. HeroSection (`#hero`)
  2. AboutSection (`#sobre`)
  3. SelectedProjectsSection (`#projetos-selecionados` / `#projetos`) — Projects section
  4. StackSection (`#stack`)
  5. PurposeSection (`#proposito`)
  6. ExperienceSection (`#experiencia`)
  7. Footer (`#contato`)

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | F1: Hero Fixed Navigation | Fixed navigation bar active during Hero visibility | M1 | ORIGINAL_REQUEST §R1 |
| 2 | F2: Post-Hero Secondary Nav | Sleek sticky secondary nav that slides/fades in when scroll leaves Hero | M1 | ORIGINAL_REQUEST §R1 |
| 3 | F3: 3 ATS Functional Buttons | 3 ATS buttons in Hero actions: Resume Download, Copy Contact, ATS Profile | M2 | ORIGINAL_REQUEST §R2 |
| 4 | F4: Scroll Emergence Animations | Scroll-triggered reveal animations for Projects (3rd) and Stack (4th) sections | M3 | ORIGINAL_REQUEST §R3 |
| 5 | F5: Project Card Framing & Format | Fixed image framing with <picture> WebP, window chrome bar, and hover peek | M3 | ORIGINAL_REQUEST §R4 |
| 6 | F6: Detailed Project Stories | Rich, quantifiable narratives for Autocom3, Achilles, Organon from Sobre Mim.md | M2 | ORIGINAL_REQUEST §R4 |
| 7 | F7: Compact 4th Section Layout | Tighter vertical footprint in StackSection with +30% larger icons and +24% titles | M3 | ORIGINAL_REQUEST §R5 |
| 8 | F8: 5th Section Typographical Fix | Unaccented title ("VOZ / para todos.") eliminating font line-height/accent defect | M2 | ORIGINAL_REQUEST §R5 |
| 9 | F9: Alternating Vertical Timeline | Trajectory section as alternating vertical timeline with spine and station nodes | M4 | ORIGINAL_REQUEST §R6 |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | M1: Navigation & Header System | Dual-bar navigation (Hero fixed + post-hero secondary sticky bar) | none | DONE |
| 2 | M2: Hero ATS & Content Enrichment | 3 ATS buttons, Sobre Mim.md project descriptions, unaccented Purpose title | none | DONE |
| 3 | M3: Projects & Stack Polish | Project image framing/picture format, scroll emergence animations, compact stack layout | none | DONE |
| 4 | M4: Alternating Vertical Timeline | Trajectory as vertical alternating timeline with glowing spine and node connectors | none | DONE |
| 5 | M5: Final E2E Test Pass & Audit | 100% pass across E2E test tiers 1-4, lint, typecheck, build, and forensic integrity | M1, M2, M3, M4 | DONE |

## Interface Contracts & File Write Ownership
### M1: Navigation & Header System
- Files owned exclusively: `src/components/layout/Header.tsx`, `src/styles/layout.css`
- Interface: Renders Hero bar during Hero visibility, transitions smoothly to compact Secondary Bar when `isPastHero === true`. RTL-compliant single link for brand at scroll 0.

### M2: Hero ATS & Content Enrichment
- Files owned exclusively: `src/components/home/HeroSection.tsx`, `content/homeContent.json`, `content/projectsContent.json`, `content/interfaceContent.json`, `src/test/rendering.test.tsx`
- Interface: Exposes 3 ATS buttons in Hero actions. Supplies enriched project descriptions and unaccented Purpose title (`VOZ / para todos.`). Updates `rendering.test.tsx` title assertion.

### M3: Projects & Stack Polish
- Files owned exclusively: `src/components/home/SelectedProjectsSection.tsx`, `src/components/home/StackSection.tsx`, `src/hooks/useReveal.ts`, `src/styles/home.css`
- Interface: Renders `<picture>` with WebP + fallback PNG in project card visual. Integrates scroll emergence without transform collisions. Enforces compact 100svh stack layout with enlarged icons/titles.

### M4: Alternating Vertical Timeline
- Files owned exclusively: `src/components/home/ExperienceSection.tsx`, `src/styles/responsive.css`
- Interface: Renders alternating vertical timeline with central Cyber Gold spine, station nodes, and mobile fold (<900px), preserving 100% of historical milestones, companies, roles, and tags.

## Code Layout
- Components: `src/components/layout/`, `src/components/home/`, `src/components/common/`
- Styles: `src/styles/base.css`, `layout.css`, `home.css`, `responsive.css`
- Content: `content/homeContent.json`, `interfaceContent.json`, `projectsContent.json`
- Tests: `src/test/`
