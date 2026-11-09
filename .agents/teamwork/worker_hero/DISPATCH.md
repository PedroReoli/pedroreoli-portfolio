## 2026-11-02T15:02:43Z
You are worker_hero, a versatile implementation worker (archetype teamwork_worker).
Your working directory is: f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\worker_hero\
You MUST read:
1. f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\ORIGINAL_REQUEST.md
2. f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\orchestrator_2\PROJECT.md
3. f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\explorer_survey_1\analysis.md

EXCLUSIVE WRITE OWNERSHIP:
You own ONLY:
- src/components/home/HeroSection.tsx
- src/components/home/HeroScene.tsx
DO NOT write to any other files.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Detailed Objective (Hero Redesign & Element Removal - Requirement R2):
1. In `src/components/home/HeroSection.tsx`:
   - Permanently remove the top status/meta bar (`.hero__meta`) containing "PORTFÓLIO / 01", the availability bullet + "DISPONÍVEL PARA PROJETOS SELECIONADOS", and "VOLTA REDONDA, BR".
   - Permanently remove the right-hand visual item / 3D scene (`<HeroScene />`) and its container (`.hero__visual`).
   - Remove the import `import { HeroScene } from './HeroScene'`.
   - In `src/components/home/HeroScene.tsx`, export an empty component `export const HeroScene = () => null;` to prevent breaking any auxiliary imports.
   - Adjust markup so hero name, role, typography/copy, statement, and CTA buttons are structured for horizontal centering.
   - In the GSAP animation timeline (`useGSAP`), safely adjust selectors so it does not fail querying removed elements, while preserving smooth entrance animations for the role, name lines, statement, and buttons.
2. Run `npm run build` to verify there are zero build/compilation errors.
3. Write your completion report in `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\worker_hero\handoff.md` and send a message with the results.
