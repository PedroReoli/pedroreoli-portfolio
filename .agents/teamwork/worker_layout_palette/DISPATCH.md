# Worker 3 Dispatch: Rounded Layouts, Section Transitions & Global Color Palette (R1 & R5)

## Identity
- Archetype: teamwork_worker
- Role: Layout, Transitions & Palette Implementation Worker
- Working Directory: f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\worker_layout_palette\

## Original Request & Findings
- Read authoritative request: `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\ORIGINAL_REQUEST.md`
- Read research findings:
  * `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\explorer_layout_1\handoff.md` (Section 2.1 & 4.1 for R1)
  * `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\explorer_layout_2\handoff.md` (Section 2.3 & 4.3 for R5)

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Assigned Scope & Exclusive File Write Boundaries
You EXCLUSIVELY own and may modify ONLY these files:
- `src/pages/HomePage.tsx`
- `src/components/home/HeroSection.tsx`
- `src/components/home/AboutSection.tsx`
- `src/components/home/SelectedProjectsSection.tsx`
- `src/components/home/StackSection.tsx`
- `src/components/common/Footer.tsx`
- `src/index.css`
- `content/interfaceContent.json`

DO NOT modify `ExperienceSection.tsx`, `PurposeSection.tsx`, `MediaPage.tsx`, or `Icon.tsx` (owned by Workers 1 & 2).

## Detailed Tasks
1. **R1: Layouts Arredondados e Transições entre Seções**:
   - In `src/pages/HomePage.tsx`:
     - Apply rounded island envelopes / containers for home sections (`rounded-2xl sm:rounded-3xl lg:rounded-[32px]`).
     - Introduce inter-section fluid transition connector bridges between adjacent sections (centered pill bridge with subtle pulse dot and direction icon).
   - In `src/components/home/HeroSection.tsx`, `AboutSection.tsx`, `SelectedProjectsSection.tsx`, `StackSection.tsx`:
     - Harmonize border-radius hierarchy: primary cards `rounded-xl sm:rounded-2xl`, media `rounded-lg sm:rounded-xl`, badges/pills `rounded-full`.
   - In `src/components/common/Footer.tsx`:
     - Implement the overlapping curved dark dome transition (`rounded-t-[32px] sm:rounded-t-[48px] overflow-hidden -mt-8 sm:-mt-12 relative z-20 shadow-2xl`) connecting cleanly with the preceding light section.
2. **R5: Padronização Global da Paleta de Cores**:
   - In `src/components/home/HeroSection.tsx`:
     - Replace off-palette `emerald-500` / `emerald-600` with the design token `mint-dark` / `mint`.
   - In `content/interfaceContent.json`:
     - Clean legacy off-palette hex codes (`#111010`, `#edeae4`) to align with official tokens (`ink`, `paper`, `cobalt`, `mint`).
   - In `src/index.css`:
     - Replace hardcoded hex values in `:focus-visible` and root variables with standard CSS variable tokens.
   - PRESERVE all existing test assertions in `src/test/rendering.test.tsx` (e.g. `VAMOS`, `CONVERSAR.`, heading text, etc.).
3. **Verification**:
   - Run `npm run typecheck` (`npx tsc --noEmit`) -> MUST succeed with 0 errors.
   - Run `npm test` (`npx vitest run`) -> MUST pass all 11 tests across all test suites.
   - Run `npm run build` -> MUST build cleanly with 0 errors.
4. **Handoff**:
   - Write your handoff report to `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\worker_layout_palette\handoff.md` with verification output.
   - Send completion message to Project Orchestrator.


## 2026-11-01T21:02:48Z
You are Worker 3 (teamwork_worker) assigned to implement R1 (Rounded Layouts & Section Transitions) and R5 (Global Color Palette Harmonization) for Pedro Reoli's portfolio refinement.

Your working directory is:
`f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\worker_layout_palette\`

Read your full dispatch instructions from:
`f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\worker_layout_palette\DISPATCH.md`
And read the authoritative original request from:
`f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\ORIGINAL_REQUEST.md`
And the research handoffs from:
`f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\explorer_layout_1\handoff.md`
`f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\explorer_layout_2\handoff.md`

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your exclusive write boundaries:
- `src/pages/HomePage.tsx`
- `src/components/home/HeroSection.tsx`
- `src/components/home/AboutSection.tsx`
- `src/components/home/SelectedProjectsSection.tsx`
- `src/components/home/StackSection.tsx`
- `src/components/common/Footer.tsx`
- `src/index.css`
- `content/interfaceContent.json`

DO NOT modify `ExperienceSection.tsx`, `PurposeSection.tsx`, `MediaPage.tsx`, or `Icon.tsx`.
Implement the rounded island envelopes, inter-section fluid transition connector bridges, overlapping curved dark footer dome, and global color token standardization (replacing emerald-500/600 with mint tokens and cleaning legacy hex codes).

Verify your work using `npm run typecheck`, `npm test`, and `npm run build`. Document your results in your `handoff.md` and send a completion message to the Project Orchestrator when done.
