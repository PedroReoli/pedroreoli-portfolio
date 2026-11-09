# Task Assignment: Milestone 3 (M3) — Projects & Stack Polish

## Objective
Implement R3, R4 (Visual Framing), and R5 (Stack Compactness):
1. Project card image visual framing: wrap in modern `<picture>` with WebP `<source>`, fallback `<img>`, window chrome frame bar with 3 micro-dots, bottom vignette, and card-hover reveal (`transform: translateY(-8px)`).
2. Scroll emergence animations for 3rd Section (`SelectedProjectsSection`) and 4th Section (`StackSection`): wrap `.project-card` in reveal container to decouple GSAP from motion `whileHover`; stagger columns in StackSection.
3. Compact 100svh StackSection layout with tighter vertical gaps, enlarged category titles (+24%, ~0.82rem), and enlarged icons (+30%, ~26px container / 18px SVG icon).
4. Maintain full compliance with regex assertions in `src/test/sections3-4-layout-stress.test.tsx` (`aspect-ratio: 16 / 10`, `max-height: 230px`, `object-fit: cover`, `object-position: top center`).

## Exclusive Write Ownership
- `src/components/home/SelectedProjectsSection.tsx`
- `src/components/home/StackSection.tsx`
- `src/hooks/useReveal.ts`
- `src/styles/home.css`
DO NOT edit any other files.

## References & Inputs
- Verbatim User Request: `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\ORIGINAL_REQUEST.md`
- Technical Blueprints:
  - `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\explorer_survey_r2_1_gen2\handoff.md` (Section 3.2)
  - `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\spec_miner_r2_2\handoff.md` (Section 5.3)
  - `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\explorer_survey_r2_3\handoff.md` (Section 3.1)
- Project Architecture: `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\orchestrator\PROJECT.md`

## Verification Requirements
You MUST run:
1. `npm test`
2. `npm run build`
Document all verification outputs in your `handoff.md`.


## 2026-11-06T16:53:45Z
You are Worker 3 (Projects & Stack Polish Worker) assigned to Milestone 3 (M3).
Your working directory is: f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\worker_m3_1\

Read your dispatch assignment:
f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\worker_m3_1\DISPATCH.md

Path to ORIGINAL_REQUEST.md:
f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\ORIGINAL_REQUEST.md

Technical Blueprint:
Read:
- `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\explorer_survey_r2_1_gen2\handoff.md` (Section 3.2: Emergence animations)
- `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\spec_miner_r2_2\handoff.md` (Section 5.3: Stack section compact density)
- `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\explorer_survey_r2_3\handoff.md` (Section 3.1: Project card visual framing & <picture> WebP)

Exclusive Write Ownership (DO NOT edit any other files):
- src/components/home/SelectedProjectsSection.tsx
- src/components/home/StackSection.tsx
- src/hooks/useReveal.ts
- src/styles/home.css

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Key Implementation Details:
1. In `src/components/home/SelectedProjectsSection.tsx` & `src/styles/home.css`:
   - Project card visual framing:
     Wrap card image in `<picture>` with `<source type="image/webp" srcSet={project.imageSrcSet} ... />` and fallback `<img>`.
     Add Dashboard Window Chrome bar with micro dots and frame bar title.
     Add bottom vignette and card-hover reveal (`transform: translateY(-8px)`).
     CRITICAL: Preserve the exact properties required by `src/test/sections3-4-layout-stress.test.tsx` (`aspect-ratio: 16 / 10`, `max-height: 230px`, `object-fit: cover`, `object-position: top center`).
   - Scroll emergence: wrap `m.article` in a `.project-card-reveal-wrapper` with `data-reveal` to prevent GSAP ScrollTrigger transform from colliding with Motion `whileHover`.
2. In `src/hooks/useReveal.ts`:
   - Refine with clean initial state and power3.out batch emergence.
3. In `src/components/home/StackSection.tsx` & `src/styles/home.css`:
   - Tighten vertical container slack so the section fits cleanly within 100svh.
   - Enlarge category titles (+24%, ~0.82rem) and icons (+30%, ~26px container / 18px SVG icon) as specified in `spec_miner_r2_2\handoff.md` Section 5.3.
4. Verification:
   Run `npm test` and `npm run build`.
   Ensure all tests pass and build succeeds.
5. Output:
   Write your handoff report to `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\worker_m3_1\handoff.md` and send a completion message with send_message.
