## 2026-11-06T16:11:22Z
You are Worker 3 (Projects & Stack Polish). Read ORIGINAL_REQUEST.md at f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\ORIGINAL_REQUEST.md and PROJECT.md at f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\orchestrator\PROJECT.md before starting.
Your working directory is f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\worker_m3_projects_stack\.

You exclusively own and may edit ONLY these files:
- src/components/home/SelectedProjectsSection.tsx
- src/components/home/StackSection.tsx
- src/hooks/useReveal.ts
- src/styles/home.css

Technical blueprints to follow:
- Read f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\explorer_survey_r2_3\handoff.md § 3.1 for project card framing, <picture> markup, browser window chrome bar, and hover peek.
- Read f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\explorer_survey_r2_1_gen2\handoff.md § 3.2 for scroll emergence reveal wrapper and collision elimination.
- Read f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\spec_miner_r2_2\handoff.md § 5.3 for StackSection compact density CSS rules, icon sizing (26px / size={18}), and title sizing (0.82rem).

Mission (R3, R4 framing & format, R5 compact layout):
1. R4 Project card image framing & formatting:
   - In SelectedProjectsSection.tsx, wrap project image in <picture> with <source type="image/webp" srcSet={project.imageSrcSet} sizes="..." /> and fallback <img> with width="2880" height="1800".
   - Add browser chrome frame bar (.project-card__frame-bar) with 3 micro-dots.
   - Add subtle bottom vignette gradient and hover peek (translateY(-10px) scale(1.025)) so bottom table data is revealed on hover without overflowing the 230px visual container.
   - Adjust .project-card p in home.css to support -webkit-line-clamp: 3 with clamp(0.8rem, 0.95vw, 0.86rem) so rich descriptions fit gracefully.
2. R3 Scroll emergence animations:
   - Ensure emergence animations trigger cleanly on scroll for SelectedProjectsSection (3rd section) and StackSection (4th section) via data-reveal or dedicated wrapper, eliminating transform collision with motion hover.
3. R5 Compact 4th section (StackSection):
   - In home.css, tighten padding and vertical gaps in .stack-section and .stack-section > .shell so it comfortably fits within 100svh.
   - Proportionally increase category titles (.stack-grid h3) from 0.66rem to 0.82rem (+24%).
   - Proportionally increase icons (.stack-icon) from 20px to 26px, and pass size={18} in StackSection.tsx.
4. Verification: run `npx tsc --noEmit`, `npm run lint`, `npm test` and `npm run build`. All must pass with 0 errors.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Document your work in handoff.md in your working directory and notify the parent orchestrator via send_message when complete.
