# Task Assignment: Milestone 2 (M2) — Hero ATS & Content Enrichment

## Objective
Implement R2, R4, R5 (Content & Typography):
1. Three functional ATS buttons in Hero actions: Resume Download (PDF awareness), Copy Direct Contact (`pedrosousa2160@gmail.com` with feedback toast and fallback), ATS Profile (smooth jump to `#sobre`).
2. Detailed project narratives and hard engineering metrics from `Sobre Mim.md` for Autocom3 (100+ pages, 20+ orgs, 500+ component Design System, 70% dev reduction, 40% latency reduction), Achilles (hybrid Web/Desktop CDP+UIA, MCP, 92.2% AXTree token savings), Organon, FalaAtípica.
3. Unaccented Purpose Section title (`VOZ / para todos.` in PT, `VOICE / for all.` in EN) eliminating the Instrument Serif font line-height/accent defect.
4. Update `src/test/rendering.test.tsx` assertions to match the new Purpose title.

## Exclusive Write Ownership
- `src/components/home/HeroSection.tsx`
- `content/homeContent.json`
- `content/projectsContent.json`
- `content/interfaceContent.json`
- `src/test/rendering.test.tsx`
DO NOT edit any other files.

## References & Inputs
- Verbatim User Request: `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\ORIGINAL_REQUEST.md`
- Specification Catalog & Verbatim Text: `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\spec_miner_r2_2\handoff.md` (See Section 5.1, 5.2, 5.3)
- Author Bio & Metrics: `Sobre Mim.md`
- Project Architecture: `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\orchestrator\PROJECT.md`

## Verification Requirements
You MUST run:
1. `npm test`
2. `npm run build`
Document all verification outputs in your `handoff.md`.

## 2026-11-06T16:53:33Z
You are Worker 2 (Content & ATS Systems Worker) assigned to Milestone 2 (M2).
Your working directory is: f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\worker_m2_1\

Read your dispatch assignment:
f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\worker_m2_1\DISPATCH.md

Path to ORIGINAL_REQUEST.md:
f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\ORIGINAL_REQUEST.md

Technical Blueprint:
Read Sections 5.1, 5.2, and 5.3 in:
f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\spec_miner_r2_2\handoff.md
Also refer to `Sobre Mim.md` at repository root.

Exclusive Write Ownership (DO NOT edit any other files):
- src/components/home/HeroSection.tsx
- content/homeContent.json
- content/projectsContent.json
- content/interfaceContent.json
- src/test/rendering.test.tsx

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Key Implementation Details:
1. In `src/components/home/HeroSection.tsx`:
   - Implement the 3 ATS buttons in the hero actions area:
     a) Download ATS Resume: direct PDF download with locale awareness (`Pedro_Lucas_Reis_Curriculo_ATS.pdf` / `Pedro_Lucas_Reis_Resume_ATS.pdf`).
     b) Copy Direct Contact: 1-click clipboard copy of `pedrosousa2160@gmail.com` with feedback toast ("E-mail Copiado!" / "Email Copied!") and `aria-live` state, plus fallback if clipboard API unavailable.
     c) ATS Profile: button/link scrolling smoothly to `#sobre` for quick competencies and metrics view.
2. In `content/homeContent.json` and `content/projectsContent.json`:
   - Update descriptions for Autocom3, Achilles, Organon, etc. with rich, quantifiable engineering narratives from `Sobre Mim.md` as specified in Section 5.2 of the blueprint.
3. In `content/interfaceContent.json`:
   - Update Section 5 (PurposeSection) title to eliminate the accented character defect under `Instrument Serif`:
     PT: title: "VOZ", titleAccent: "para todos."
     EN: title: "VOICE", titleAccent: "for all."
4. In `src/test/rendering.test.tsx`:
   - Update the assertions on lines 40–41 from 'Comunicação' / 'mais acessível.' to match the new title ('VOZ' / 'para todos.').
5. Verification:
   Run `npm test` and `npm run build`.
   Ensure all tests pass and build succeeds.
6. Output:
   Write your handoff report to `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\worker_m2_1\handoff.md` and send a completion message with send_message.
