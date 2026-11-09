# Task Assignment: Worker - Milestone 1 (Compact Projects Section & Image Display)

## Objective
Implement compacting of the Projects section and optimize project image display and framing across desktop and mobile, ensuring pristine sharpness and no cropping/distortion.

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Working Directory
`f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\worker_projects\`

## Scope Boundaries & Exclusive File Ownership
You own and may edit the following files:
- `src/components/home/SelectedProjectsSection.tsx`
- `src/styles/home.css` (specifically `.work-section`, `.project-showcase`, `.project-card`, `.project-card__visual`, `.project-card__body`, `.agent-art` sections)
- `src/styles/responsive.css` (specifically rules touching `.work-section`, `.project-showcase`, `.project-card__visual`)
- `src/styles/pages.css` (specifically `.gallery-grid` and `.independent-grid` dimensions)

Do NOT touch `src/components/home/StackSection.tsx` or other unrelated modules.

## Input Evidence & Explorer Findings
Read:
- `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\ORIGINAL_REQUEST.md`
- `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\explorer_survey_proj\handoff.md`
- `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\orchestrator_1\PROJECT.md`

## Concrete Specifications
1. **Balance & Compact the Showcase Grid**:
   - In `.project-showcase`, change desktop layout to `grid-template-columns: repeat(2, 1fr);` (or `1.15fr 0.85fr;`), with `max-height: 480px; align-items: stretch;`.
   - Prevent cards from expanding into giant empty boxes on 100svh displays.
2. **Pristine Image Aspect Ratio & Sharp Framing**:
   - In `.project-card__visual`, apply `aspect-ratio: 16 / 10; max-height: 230px; width: 100%; overflow: hidden; background: #0c0e14;`.
   - In `.project-card__visual img`, apply `width: 100%; height: 100%; object-fit: cover; object-position: top center;`.
   - In `SelectedProjectsSection.tsx`, ensure image has `loading="eager"` (for first card) and `decoding="async"`, and clean responsive `sizes`.
3. **Compact Card Typography & Spacing**:
   - In `.work-section__heading h2`, set `font-size: clamp(2.4rem, 4.5vw, 4.2rem); line-height: 0.9;`.
   - In `.project-card h3`, set `font-size: clamp(1.5rem, 2.2vw, 2.4rem); line-height: 1.05;`.
   - In `.project-card p`, set `font-size: 0.88rem; line-height: 1.45; margin-top: 6px;`.
   - In `.project-card__body`, set padding to `clamp(12px, 1.6vh, 18px);`.
   - In `.project-card__index`, scale to `34px x 34px`.
4. **Scale Achilles Artwork (`.agent-art`)**:
   - Scale `.agent-art__radar` to `width: 160px; height: 160px;`.
   - Proportional core: `width: 58px; height: 58px; font-size: 2rem;`.
   - Ensure both Card 1 and Card 2 visually harmonize without clipping.
5. **Responsive Overrides (`responsive.css`)**:
   - Remove `.project-card__visual, .project-card--2 .project-card__visual { min-height: 290px; }`.
   - Replace with `aspect-ratio: 16 / 10; height: auto; max-height: 220px;`.
6. **Archive Page Adjustments (`pages.css`)**:
   - Replace `min-height: 550px` / `360px` with `aspect-ratio: 16 / 10; max-height: 320px; object-position: top center;`.
   - In `.independent-grid a`, reduce `min-height: 360px; padding: 30px;` to `min-height: 220px; padding: 20px;`.

## Verification Commands
You must run:
1. `npm run test`
2. `npm run build`
Both commands must pass with exit code 0.

## Deliverables
- Write `handoff.md` in `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\worker_projects\handoff.md` with:
  - Observation: exact changes made
  - Logic Chain: rationale
  - Caveats: any subtleties
  - Conclusion: verification commands run & results
  - Verification output: test & build logs
- Send a completion message back to the orchestrator.


## 2026-11-02T18:56:27Z
Received dispatch from parent `a14ffa40-8d8d-419d-b6c2-92adbe8a5031`:
Implement Milestone 1:
1. In `src/styles/home.css`:
   - Balance `.project-showcase` to `grid-template-columns: repeat(2, 1fr);` (or `1.15fr 0.85fr;`), with bounded `max-height: 480px; align-items: stretch;`.
   - Set `.project-card__visual` to `aspect-ratio: 16 / 10; max-height: 230px; width: 100%; overflow: hidden; background: #0c0e14;`.
   - Set `.project-card__visual img` to `width: 100%; height: 100%; object-fit: cover; object-position: top center;`.
   - Reduce `.work-section__heading h2` to `clamp(2.4rem, 4.5vw, 4.2rem); line-height: 0.9;`.
   - Reduce `.project-card h3` to `clamp(1.5rem, 2.2vw, 2.4rem); line-height: 1.05;`.
   - Reduce `.project-card p` to `font-size: 0.88rem; line-height: 1.45; margin-top: 6px;`.
   - Reduce `.project-card__body` padding to `clamp(12px, 1.6vh, 18px);`.
   - Reduce `.project-card__index` to `34px x 34px`.
   - Scale Achilles `.agent-art__radar` to `160px` with proportional core (`58x58px`) and step positioning.
2. In `src/components/home/SelectedProjectsSection.tsx`:
   - Add `loading="eager"` and `decoding="async"` to the Autocom3 image tag.
3. In `src/styles/responsive.css`:
   - Replace mobile visual `min-height: 290px` with `aspect-ratio: 16 / 10; max-height: 220px;`.
4. In `src/styles/pages.css`:
   - In `.gallery-grid`, replace `min-height: 550px` / `360px` with `aspect-ratio: 16 / 10; max-height: 320px; object-position: top center;`.
   - In `.independent-grid a`, reduce `min-height: 360px; padding: 30px;` to `min-height: 220px; padding: 20px;`.
5. Run verification commands:
   - `npm run test`
   - `npm run build`
   Both must pass cleanly.
6. Write your report to `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\worker_projects\handoff.md` and send a completion message back.
