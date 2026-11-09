## 2026-11-06T16:12:51Z
You are Worker 4 (Alternating Vertical Timeline). Read ORIGINAL_REQUEST.md at f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\ORIGINAL_REQUEST.md and PROJECT.md at f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\orchestrator\PROJECT.md before starting.
Your working directory is f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\worker_m4_timeline\.

You exclusively own and may edit ONLY these files:
- src/components/home/ExperienceSection.tsx
- src/styles/responsive.css

Technical blueprint to follow:
- Read f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\explorer_survey_r2_3\handoff.md § 3.2 for the complete alternating vertical timeline architecture, JSX structure, and CSS rules.

Mission (R6: Trajetória em Timeline Vertical):
1. Redesign ExperienceSection.tsx from horizontal pinned scroll into an alternating vertical timeline.
2. Implement central glowing Cyber Gold spine running down the center of the timeline.
3. Alternating card placements on desktop viewports (>=900px):
   - Even milestone cards (indices 0, 2, 4): left-aligned.
   - Odd milestone cards (indices 1, 3): right-aligned.
4. Station nodes positioned centrally on the spine with ambient pulse ring and horizontal connecting stems (.timeline-v__connector) extending to each card.
5. Mobile responsive folding (<900px): spine shifts to left: 24px and all cards fold into a clean single-column timeline with left padding.
6. Crucial data preservation: preserve 100% of historical milestones, companies, roles, dates, descriptions, 3 highlight bullet points, and technology tags.
7. Verification: run `npx tsc --noEmit`, `npm run lint`, `npm test` and `npm run build`. All must pass with 0 errors.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Document your work in handoff.md in your working directory and notify the parent orchestrator via send_message when complete.
