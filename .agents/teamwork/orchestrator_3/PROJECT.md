# Project: Section 2 ("Quem sou eu") Complete Revamp

## Architecture
- **Framework**: React 18 + Vite + TypeScript.
- **Components**: `src/components/home/AboutSection.tsx`.
- **Styles**: `src/styles/home.css`, `src/styles/responsive.css`, `src/styles/base.css`.
- **Content**: `content/interfaceContent.json` (source for texts, preserving exact test contract keys).
- **Animation Pipeline**: GSAP 3.15 + `@gsap/react` `useGSAP` with ScrollTrigger for lazy loading / scroll entrance reveal, plus `prefers-reduced-motion` compliance.
- **Art Frame ("Quadro")**: Multi-layered CSS museum-grade frame with dark ebonized moulding, bevel highlights, Solar Amber fillet edge, archival passe-partout / mat board, canvas portrait, and engraved brass cartellino / exhibition plaque with interactive 3D tilt/glare.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| F1 | Photo Enlargement & Art Frame ("Quadro") | Replace clamped 320px portrait with an enlarged museum-grade art frame (`clamp(420px, 54vh, 560px)`), realistic moulding, passe-partout mat, Solar Amber fillet, and engraved exhibition plaque | M1 | ORIGINAL_REQUEST §Request 2026-11-02T16:42:36Z |
| F2 | CodePen Interactive Dynamics | Subtle cursor-tracking 3D tilt, perspective, and glass glare reflection on the framed artwork | M1 | ORIGINAL_REQUEST §Request 2026-11-02T16:42:36Z |
| F3 | "Quem sou eu" Typographic Revamp | Elevate "Quem eu sou" into a prominent, artistic display headline with serif accentuation, separate readable narrative bio paragraph, and architecture focus tags | M2 | ORIGINAL_REQUEST §Request 2026-11-02T16:42:36Z |
| F4 | Compact Cohesive Content Dock | Eliminate vertical fragmentation; integrate narrative copy, focus tags, CTA, and the 4-stat metrics grid into a unified, dense right column dock | M2 | ORIGINAL_REQUEST §Request 2026-11-02T16:42:36Z |
| F5 | Height & Viewport Breathing Room | Remove artificial height clamps; provide generous section height with fluid breathing room (`min-height: 100svh; height: auto`) while fitting desktop viewports elegantly | M3 | ORIGINAL_REQUEST §Request 2026-11-02T16:42:36Z |
| F6 | Lazy Loading & Scroll Entrance Reveal | Implement high-performance GSAP ScrollTrigger choreographed entrance: frame elevation & clip-path curtain reveal, headline slide-up, staggered metrics counter cascade, and `prefers-reduced-motion` fallback | M3 | ORIGINAL_REQUEST §Request 2026-11-02T16:42:36Z |
| F7 | Contract & Test Invariance | Maintain 100% passing tests for Vitest (`npm test -- --run`) and TypeScript build (`npm run build`) | M4 | ORIGINAL_REQUEST Acceptance Criteria |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Art Picture Frame & Photo Enlargement | Implement `.art-frame` museum staging, enlarged `/eu-profissional.png`, matting, plaque, and interactive tilt | Survey | DONE |
| M2 | Typography Revamp & Content Compactness | Redesign "Quem sou eu" headline, narrative bio paragraph, focus tags, and unified compact metrics dock | Survey, M1 | DONE |
| M3 | Section Height & Lazy Loading Motion | GSAP ScrollTrigger animation sequence, section padding & responsive height rules | M1, M2 | DONE |
| M4 | Verification & Forensic Audit | Vitest suite, TypeScript build, multi-agent review, and forensic integrity audit | M1, M2, M3 | DONE |

## Code Layout & Exclusive Write Ownership
| Worker | Assigned Role | Exclusive File Ownership |
|---|---|---|
| `worker_section2` | Section 2 Component & Motion Specialist | `src/components/home/AboutSection.tsx` |
| `worker_styles` | Section 2 CSS & Frame Specialist | `src/styles/home.css`, `src/styles/responsive.css` |

*(Note: If single worker handles both TSX and CSS sequentially or unified, write collisions are eliminated).*
