# Worker 2 Dispatch: Trajetória Storytelling Architecture (R4)

## Identity
- Archetype: teamwork_worker
- Role: Trajectory Storytelling Implementation Worker
- Working Directory: f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\worker_trajectory\

## Original Request & Findings
- Read authoritative request: `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\ORIGINAL_REQUEST.md`
- Read research findings: `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\explorer_layout_1\handoff.md` (specifically Section 2.2 and Section 4.2)

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Assigned Scope & Exclusive File Write Boundaries
You EXCLUSIVELY own and may modify ONLY this file:
- `src/components/home/ExperienceSection.tsx`

DO NOT modify any other files.

## Detailed Tasks
1. **R4: Seção de Trajetória com Storytelling Sequencial Interligado**:
   - Redesign `src/components/home/ExperienceSection.tsx` per the architecture and implementation detailed in `explorer_layout_1/handoff.md`:
     - Continuous vertical timeline spine: `relative border-l-2 border-line ml-4 sm:ml-8 md:ml-12 pl-6 sm:pl-10 md:pl-16 space-y-12 sm:space-y-16` with progress gradient rail (`bg-gradient-to-b from-signal via-cobalt to-line`).
     - Glowing chronological milestone nodes: dual-ring nodes with active pulse halo (`animate-ping`) for active/current positions ("Presente" / "Present").
     - Horizontal connector arms leading from the timeline rail into each story card.
     - Narrative chapter cards: chapter headers (`[Capítulo 01 // Marco 2025]`), live status badges, directional arrow deliverables bullets, and rounded-full technology pills.
     - Mobile-safe structure ensuring 0 horizontal scroll down to 320px viewport width.
   - PRESERVE all existing test assertions in `src/test/rendering.test.tsx`:
     - Heading text `TRAJETÓRIA.` / `JOURNEY.`
     - Company names (`Domus | Sua Solução Digital`, `SIVIS Tecnologia`, `Autocom3 Tecnologia`, `UniFOA / SEBRAE EvaTech`, `SIVIS Tecnologia Júnior`).
2. **Verification**:
   - Run `npm run typecheck` (`npx tsc --noEmit`) -> MUST succeed with 0 errors.
   - Run `npm test` (`npx vitest run`) -> MUST pass all 11 tests across all test suites.
   - Run `npm run build` -> MUST build cleanly with 0 errors.
3. **Handoff**:
   - Write your handoff report to `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\worker_trajectory\handoff.md` with verification output.
   - Send completion message to Project Orchestrator.


## 2026-11-01T21:02:39Z
You are Worker 2 (teamwork_worker) assigned to implement R4 (Seção de Trajetória com Storytelling Sequencial Interligado) for Pedro Reoli's portfolio refinement.
Your working directory is: `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\worker_trajectory\`
Exclusive write boundaries: `src/components/home/ExperienceSection.tsx`
