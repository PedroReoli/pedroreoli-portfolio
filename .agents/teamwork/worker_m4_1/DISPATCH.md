# Task Assignment: Milestone 4 (M4) — Alternating Vertical Timeline

## Objective
Implement R6: Alternating Vertical Timeline for Career Journey.
1. Reformulate `ExperienceSection.tsx` from horizontal pinned scroll to natural alternating vertical timeline.
2. Central glowing Cyber Gold spine running continuously down the center.
3. Desktop (>=900px): alternating cards (even cards left, odd cards right) with central station pulse nodes and horizontal connecting stems.
4. Mobile (<900px): graceful folding to single-column timeline with left spine and connecting stems.
5. Retain 100% of historical milestones, companies, roles, period labels, highlights with icons, and technology tags.
6. Preserve section titles (`TRAJETÓRIA.` / `JOURNEY.`) and clean up obsolete horizontal scroll pinning CSS in `responsive.css`.

## Exclusive Write Ownership
- `src/components/home/ExperienceSection.tsx`
- `src/styles/responsive.css`
DO NOT edit any other files.

## References & Inputs
- Verbatim User Request: `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\ORIGINAL_REQUEST.md`
- Technical Blueprint & Code Snippets: `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\explorer_survey_r2_3\handoff.md` (Section 3.2)
- Project Architecture: `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\orchestrator\PROJECT.md`

## Verification Requirements
You MUST run:
1. `npm test`
2. `npm run build`
Document all verification outputs in your `handoff.md`.

## 2026-11-06T16:53:52Z
You are Worker 4 (Vertical Timeline Worker) assigned to Milestone 4 (M4).
Your working directory is: f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\worker_m4_1\

Read your dispatch assignment:
f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\worker_m4_1\DISPATCH.md

Path to ORIGINAL_REQUEST.md:
f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\ORIGINAL_REQUEST.md

Technical Blueprint:
Read Section 3.2 in:
f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\explorer_survey_r2_3\handoff.md

Exclusive Write Ownership (DO NOT edit any other files):
- src/components/home/ExperienceSection.tsx
- src/styles/responsive.css

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Key Implementation Details:
1. In `src/components/home/ExperienceSection.tsx`:
   - Replace the horizontal pinned GSAP track with an alternating vertical timeline.
   - Central glowing Cyber Gold spine.
   - Station nodes on the spine with pulse ring and horizontal connector stems.
   - Desktop (>=900px): alternating cards (even index cards left, odd index cards right).
   - Responsive fold (<900px): graceful transition to single-column timeline with left spine.
   - Preserves 100% of historical milestones, companies, roles, period labels, highlights, and technology tags.
   - Preserves section title contract (`TRAJETÓRIA.` / `JOURNEY.`).
2. In `src/styles/responsive.css`:
   - Clean up obsolete horizontal timeline pinning rules for experience section.
3. Verification:
   Run `npm test` and `npm run build`.
   Ensure all tests pass and build succeeds.
4. Output:
   Write your handoff report to `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\worker_m4_1\handoff.md` and send a completion message with send_message.

