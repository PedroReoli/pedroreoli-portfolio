# Project: Pedro Reoli Portfolio Refinement

## Architecture
- Framework: Vite + React with Tailwind CSS
- Key Modules:
  * Components: `src/components/` (sections, layout components, icons)
  * Data/Content: `content/*.json`
  * Styles & Tokens: `src/index.css` & `tailwind.config.js`
  * Layout & Sections: Hero, About, SelectedProjects, Stack, Purpose, Experience/Trajectory, Footer

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | R1: Rounded Layouts & Transitions | Implement rounded borders, island envelopes, bridge connectors, and curved dark footer dome | M3 | ORIGINAL_REQUEST §R1 |
| 2 | R2: Tech Icons Fidelity & Fixes | Replace incorrect/broken tech stack icons with high-fidelity official icons in Icon.tsx & content/*.json | M1 | ORIGINAL_REQUEST §R2 |
| 3 | R3: FalaAtípica Grayscale Removal | Remove black & white / grayscale filter from FalaAtípica project card/image | M1 | ORIGINAL_REQUEST §R3 |
| 4 | R4: Trajectory Storytelling | Redesign Trajectory section into interconnected sequential storytelling timeline | M2 | ORIGINAL_REQUEST §R4 |
| 5 | R5: Global Color Palette Harmonization | Standardize color palette across backgrounds, borders, typography, and accents | M3 | ORIGINAL_REQUEST §R5 |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 0 | Survey & Research | 2 Explorers research layouts, components, icons, styles, and dependencies | none | DONE |
| 1 | Icons & Media Polish (Worker 1) | Fix tech icons in Icon.tsx & content/*.json; remove FalaAtípica grayscale filter | M0 | DONE |
| 2 | Trajectory Storytelling (Worker 2) | Redesign Trajectory section with sequential interconnected storytelling layout | M0 | DONE |
| 3 | Palette & Section Transitions (Worker 3) | Harmonize global color palette, rounded container layouts, and section transitions | M0, M1, M2 | DONE |
| 4 | Gate Verification | Gate verification across automated builds, tests, and requirements compliance | M1, M2, M3 | DONE |

## Code Layout & Verified Boundaries
- Worker 1: `src/components/common/Icon.tsx`, `content/technologyContent.json`, `src/components/home/PurposeSection.tsx`, `src/pages/MediaPage.tsx`
- Worker 2: `src/components/home/ExperienceSection.tsx`
- Worker 3: `src/pages/HomePage.tsx`, `src/components/home/HeroSection.tsx`, `src/components/home/AboutSection.tsx`, `src/components/home/SelectedProjectsSection.tsx`, `src/components/home/StackSection.tsx`, `src/components/layout/Footer.tsx`, `src/components/common/Footer.tsx`, `src/index.css`, `content/interfaceContent.json`
