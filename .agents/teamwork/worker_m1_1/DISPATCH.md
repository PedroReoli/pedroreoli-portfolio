# Task Assignment: Milestone 1 (M1) — Navigation & Header System

## Objective
Implement R1: Dual-Bar Navigation System.
1. Fixed Hero navigation bar during Hero section visibility.
2. Sleek, compact secondary sticky navigation bar that smoothly enters as the user scrolls past the Hero section.
3. Fast jump to top, language switch, and compact brand mark in secondary nav.
4. Resilient scroll detection with IntersectionObserver and scroll fallback for jsdom/Vitest.
5. Strict RTL test compliance ensuring a single accessible brand link at scroll 0.

## Exclusive Write Ownership
- `src/components/layout/Header.tsx`
- `src/styles/layout.css`
DO NOT edit any other files.

## References & Inputs
- Verbatim User Request: `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\ORIGINAL_REQUEST.md`
- Technical Blueprint & Code Snippets: `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\explorer_survey_r2_1_gen2\handoff.md` (See Section 3.1)
- Project Architecture: `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\orchestrator\PROJECT.md`

## Verification Requirements
You MUST run:
1. `npm test`
2. `npm run build`
Document all verification outputs in your `handoff.md`.


## 2026-11-06T16:53:12Z
You are Worker 1 (Navigation Systems Worker) assigned to Milestone 1 (M1).
Your working directory is: f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\worker_m1_1\

Read your dispatch assignment:
f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\worker_m1_1\DISPATCH.md

Path to ORIGINAL_REQUEST.md:
f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\ORIGINAL_REQUEST.md

Technical Blueprint:
Read Section 3.1 in:
f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\explorer_survey_r2_1_gen2\handoff.md

Exclusive Write Ownership (DO NOT edit any other files):
- src/components/layout/Header.tsx
- src/styles/layout.css

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Key Implementation Details:
1. Implement the dual-bar navigation system in Header.tsx:
   - Hero Navigation Bar: active during Hero visibility, floating obsidian pill.
   - Secondary Post-Hero Navigation Bar: sticky bar that slides/fades into view when scroll leaves Hero, with fast top jump, language switch, and compact brand.
   - Use safe scroll detection: check `typeof IntersectionObserver !== 'undefined'` with passive scroll fallback for jsdom/Vitest.
   - Ensure RTL tests in `src/test/rendering.test.tsx` continue to pass with a single accessible brand link `screen.getByRole('link', { name: 'Ir para o início' })` at initial scroll 0.
2. Update `src/styles/layout.css` with the styles from Section 3.1 of the blueprint.
3. Verification:
   Run `npm test` and `npm run build`.
   Ensure all tests pass and build succeeds.
4. Output:
   Write your handoff report to `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\worker_m1_1\handoff.md` and send a completion message with send_message.
