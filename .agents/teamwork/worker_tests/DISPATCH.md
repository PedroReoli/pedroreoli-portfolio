# Task Assignment: Test Writer - Milestone 3 (Comprehensive Testing & Quality Gate)

## Objective
Write a comprehensive test suite for Sections 3 (Projects) and 4 (Minha Stack) in `src/test/sections3-4-layout-stress.test.tsx`, clean up any lint issues, and verify that the entire test suite and production build pass with 100% success.

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Working Directory
`f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\worker_tests\`

## Scope Boundaries & Exclusive File Ownership
You own:
- `src/test/sections3-4-layout-stress.test.tsx` (new test file to create)
- `src/test/section2-layout-stress.test.tsx` (only to remove the unused `'screen'` import on line 2)
- Any assertions needed in `src/test/contracts.test.ts` (e.g. verifying featured project images)

Do NOT modify component code or CSS files unless fixing a discovered defect.

## Inputs
Read:
- `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\ORIGINAL_REQUEST.md`
- `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\orchestrator_1\PROJECT.md`
- `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\orchestrator_1\TEST_INFRA.md`
- `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\explorer_survey_build_tests\handoff.md`

## Concrete Specifications for `src/test/sections3-4-layout-stress.test.tsx`
Model after `section2-layout-stress.test.tsx`:
1. **Suite 1: Projects Section Compactness & Image Integrity**:
   - Render `SelectedProjectsSection` in JSDOM.
   - Assert `#projetos` section container exists and has `.work-section`.
   - Assert image element in Card 1 (Autocom3) has `loading="eager"`, `decoding="async"`, and descriptive `alt`.
   - Assert Card 1 image src/srcset are defined and point to valid assets.
   - Assert Card 2 renders `.agent-art` with `.agent-art__radar` and step badges.
   - Assert both project cards render their respective titles (`Autocom3`, `Achilles`) and action links.
   - Verify CSS rules for `.project-card__visual`: has `aspect-ratio` defined and `max-height` clamped/bounded <= 230px, with `object-fit: cover` and `object-position: top center`.
2. **Suite 2: Minha Stack Section Compact Density & Category Audit**:
   - Render `StackSection` in JSDOM.
   - Assert `#stack` section container exists and has `.stack-section`.
   - Assert all 4 category groups (`01 Interfaces`, `02 Back-end`, `03 Cloud & apps`, `04 IA & APIs`) are rendered.
   - Assert all 24 tools are rendered with their icon containers (`.stack-icon`).
   - Assert icon component receives compact size (`size={15}`).
   - Verify CSS rules for `.stack-grid li`: `min-height` clamped <= 32px, `border-radius: var(--radius-xs)`.
   - Verify CSS rules for `.stack-icon`: width/height 20px.
3. **Suite 3: Desktop Viewport Height Budget (768px, 900px, 1080px, 1440px)**:
   - Compute vertical height budget models for `.work-section` and `.stack-section` across viewports.
   - Mathematically assert total content height <= viewport height (e.g., budget < 100svh).
4. **Lint Cleanup**:
   - In `src/test/section2-layout-stress.test.tsx:2:18`, remove the unused `'screen'` import so `npm run lint` passes without errors.

## Verification Commands
You must run:
1. `npm run test`
2. `npm run build`
3. `npm run lint`
All three commands must succeed with exit code 0.

## Deliverables
- Write `handoff.md` in `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\worker_tests\handoff.md`
- Publish `TEST_READY.md` in `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\TEST_READY.md`
- Send completion message back.


## 2026-11-02T19:16:22Z
You are worker_tests, a test writer agent.
Your working directory is f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\worker_tests\
Your task assignment is in f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\worker_tests\DISPATCH.md
Read the authoritative user request at f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\ORIGINAL_REQUEST.md
Read the test infrastructure specs at f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\orchestrator_1\TEST_INFRA.md
Read the project specifications at f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\orchestrator_1\PROJECT.md
Read the survey report at f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\explorer_survey_build_tests\handoff.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Scope & Objective:
Implement Milestone 3:
1. Create `src/test/sections3-4-layout-stress.test.tsx` covering:
   - Projects Section compactness and image attributes (loading="eager", decoding="async", non-empty alt, 16:10 aspect-ratio, max-height clamp, object-fit cover, object-position top center).
   - Achilles artwork scaling and step badges.
   - Minha Stack section category density (4 categories, all 24 tools, icon container size 20px, icon size prop 15, compact chip height clamp <= 32px).
   - Desktop viewport height budget models across 768px, 900px, 1080px, 1440px proving neither section overflows 100svh.
2. In `src/test/section2-layout-stress.test.tsx:2:18`, remove the unused `'screen'` import so `npm run lint` passes without errors.
3. Run verification commands:
   - `npm run test`
   - `npm run build`
   - `npm run lint`
   All must pass with exit code 0.
4. Publish `TEST_READY.md` at `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\TEST_READY.md` summarizing test counts and coverage.
5. Write your report to `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\worker_tests\handoff.md` and send a message back.
