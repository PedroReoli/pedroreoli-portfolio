# BRIEFING — 2026-11-06T16:13:00Z

## Mission
Polish SelectedProjectsSection (R4 picture markup, browser chrome, hover peek, line clamp), ensure R3 scroll emergence without hover transform collision, and compact StackSection (R5 100svh density, larger titles and icons).

## 🔒 My Identity
- Archetype: worker
- Roles: implementer, qa, specialist
- Working directory: f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\worker_m3_projects_stack
- Original parent: 545ee0d5-2a82-4922-9be6-0e0d196c461e
- Milestone: Milestone 3 (Projects & Stack Polish)

## 🔒 Key Constraints
- Exclusively own and may edit ONLY:
  - src/components/home/SelectedProjectsSection.tsx
  - src/components/home/StackSection.tsx
  - src/hooks/useReveal.ts
  - src/styles/home.css
- DO NOT edit any other files.
- DO NOT CHEAT: no hardcoding test results or fake implementations.
- Verification: `npx tsc --noEmit`, `npm run lint`, `npm test`, `npm run build` all pass.

## Current Parent
- Conversation ID: 545ee0d5-2a82-4922-9be6-0e0d196c461e
- Updated: not yet

## Task Summary
- **What to build**:
  1. SelectedProjectsSection: <picture> markup with imageSrcSet webp, width/height attributes (2880x1800), browser window chrome bar (.project-card__frame-bar) with 3 micro-dots, subtle bottom vignette gradient, hover peek (translateY(-10px) scale(1.025)) within 230px visual container, line clamp 3 on card description.
  2. useReveal / Scroll emergence: clean emergence trigger for 3rd and 4th sections without transform collision with card hover.
  3. StackSection: compact layout for 100svh fit, 0.82rem category titles (+24%), 26px icons with size={18}.
- **Success criteria**: Perfect visual polish, zero regressions, passes all checks (tsc, lint, test, build).
- **Interface contracts**: f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\orchestrator\PROJECT.md
- **Code layout**: src/components/home/ and src/styles/home.css

## Key Decisions Made
- Initializing task setup and briefing.

## Artifact Index
- DISPATCH.md — Dispatch instructions
- BRIEFING.md — Persistent state
- progress.md — Liveness heartbeat and progress log
- handoff.md — Final handoff report

## Change Tracker
- **Files modified**: None yet
- **Build status**: Untested
- **Pending issues**: None

## Quality Status
- **Build/test result**: Untested
- **Lint status**: Untested
- **Tests added/modified**: None yet

## Loaded Skills
- None explicitly requested
