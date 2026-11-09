# E2E Test Infra: pedroreoli-portfolio Projects & Stack Compaction

## Test Philosophy
- Requirement-driven, layout & visual verification.
- Validates compact dimensions, absence of distortion/overflow, and strict build integrity.

## Feature Inventory & Test Mapping
| # | Feature | Requirement | Tier 1 | Tier 2 | Tier 3 |
|---|---------|-------------|:------:|:------:|:------:|
| 1 | Compact Projects Showcase Grid | R1 | ✓ | ✓ | ✓ |
| 2 | Pristine Project Image Display | R1 | ✓ | ✓ | ✓ |
| 3 | Scaled Achilles Artwork | R1 | ✓ | ✓ | ✓ |
| 4 | Compact Projects Typography & Internal Spacings | R1 | ✓ | ✓ | ✓ |
| 5 | Archive Projects Page Compactness | R1 | ✓ | ✓ | ✓ |
| 6 | Compact Minha Stack Category Cards | R2 | ✓ | ✓ | ✓ |
| 7 | Compact Stack Chips & Badges | R2 | ✓ | ✓ | ✓ |
| 8 | Compact Stack Icons & Scaled SVGs | R2 | ✓ | ✓ | ✓ |
| 9 | Dense Category Grid Presentation | R2 | ✓ | ✓ | ✓ |
| 10 | Mobile & Responsive Optimization | R1, R2 | ✓ | ✓ | ✓ |
| 11 | Layout Stress & Regression Test Suite | Acceptance | ✓ | ✓ | ✓ |
| 12 | Lint & Build Integrity | Acceptance | ✓ | ✓ | ✓ |

## Test Architecture
- Test runner: `npm run test` (Vitest with JSDOM)
- Test files:
  - `src/test/contracts.test.ts`: Palette, schema, assets verification
  - `src/test/rendering.test.tsx`: Component DOM rendering
  - `src/test/section2-layout-stress.test.tsx`: Section 2 layout tests
  - `src/test/sections3-4-layout-stress.test.tsx`: New layout stress test suite for Projects (Section 3) and Minha Stack (Section 4)
- Build verification: `npm run build` (`tsc -b && vite build`)
