# Task Assignment: Worker - Milestone 2 (Compact Minha Stack & Dense Grid)

## Objective
Implement compacting of the "Minha Stack" (Skills / Technologies) section, reducing dimensions of cards, badges, chips, and icons, shortening internal/external spacing, and presenting technologies in a clean, dense category grid.

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Working Directory
`f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\worker_stack\`

## Scope Boundaries & Exclusive File Ownership
You own and may edit the following files:
- `src/components/home/StackSection.tsx`
- `src/styles/home.css` (specifically the `.stack-section`, `.stack-section__intro`, `.stack-grid`, `.stack-icon` rules)
- `src/styles/responsive.css` (specifically rules touching `.stack-grid`)

Do NOT touch `SelectedProjectsSection.tsx`, `pages.css`, or other unrelated modules.

## Input Evidence & Explorer Findings
Read:
- `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\ORIGINAL_REQUEST.md`
- `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\explorer_survey_stack\handoff.md`
- `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\orchestrator_1\PROJECT.md`

## Concrete Specifications
1. **In `src/components/home/StackSection.tsx`**:
   - Change icon size prop at line 31 from `size={22}` to `size={15}`:
     `<span className="stack-icon"><Icon name={tool.icon} image={tool.image} size={15} /></span>`
   - Adjust hover motion at line 30 to subtle offset:
     `<m.li key={tool.name} whileHover={{ y: -2 }} transition={{ duration: 0.18 }}>`
   - Preserve all text labels, kicker attributes, and localized group names.
2. **In `src/styles/home.css`**:
   - Ensure `.stack-section__intro h2` is decoupled from `.work-section__heading h2` with:
     `font-family: var(--font-display); font-size: clamp(2.2rem, 4.2vw, 3.8rem); line-height: .9; letter-spacing: -.06em; text-transform: uppercase;`
   - Update `.stack-section > .shell`:
     `flex: 1; display: flex; flex-direction: column; justify-content: flex-start; gap: clamp(8px, 1.5vh, 18px); padding-bottom: clamp(12px, 1.8vh, 20px); min-height: 0;`
   - Update `.stack-section__intro`:
     `display: grid; grid-template-columns: 1fr 360px; align-items: end; gap: clamp(16px, 2vw, 36px); padding: clamp(4px, 0.8vh, 10px) 0 clamp(4px, 0.8vh, 8px);`
   - Update `.stack-section__intro p`:
     `color: var(--ink-soft); font-size: clamp(0.85rem, 1.1vw, 0.95rem); line-height: 1.4;`
   - Update `.stack-grid article`:
     `padding: clamp(8px, 1.1vh, 12px); border: 1px solid var(--line-light); border-radius: var(--radius-sm); background: rgba(251, 249, 245, 0.65); display: flex; flex-direction: column;`
   - Update `.stack-grid header`:
     `display: flex; align-items: center; justify-content: space-between; margin-bottom: clamp(4px, 0.7vh, 8px); padding-bottom: 4px; border-bottom: 1px dashed rgba(23, 23, 23, 0.12);`
   - Update `.stack-grid h3`:
     `font-size: .66rem; font-weight: 800; letter-spacing: .12em; text-transform: uppercase;`
   - Update `.stack-grid ul`:
     `display: grid; gap: clamp(3px, 0.4vh, 4px); list-style: none; flex: 1;`
   - Update `.stack-grid li`:
     `display: flex; min-width: 0; min-height: clamp(28px, 3.2vh, 32px); align-items: center; gap: 6px; padding: 2px 8px; border: 1px solid rgba(23, 23, 23, 0.08); border-radius: var(--radius-xs); background: rgba(255, 255, 255, 0.65); transition: border-color 0.15s ease, background 0.15s ease;`
   - Add `.stack-grid li:hover { border-color: rgba(180, 83, 9, 0.35); background: var(--paper-light); }`
   - Update `.stack-icon`:
     `display: grid; width: 20px; height: 20px; flex: 0 0 20px; place-items: center; border-radius: 4px; background: rgba(251, 191, 36, 0.14); color: var(--accent);`
   - Update `.stack-grid li strong`:
     `min-width: 0; font-size: .68rem; font-weight: 700; line-height: 1.2; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--ink);`
3. **In `src/styles/responsive.css`**:
   - In `@media (max-width: 420px)`, change `.stack-grid article { padding: 16px; }` to `.stack-grid article { padding: 10px; }`.

## Verification Commands
You must run:
1. `npm run test`
2. `npm run build`
Both commands must pass with exit code 0.

## Deliverables
- Write `handoff.md` in `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\worker_stack\handoff.md` with:
  - Observation: exact changes made
  - Logic Chain: rationale
  - Caveats: any subtleties
  - Conclusion: verification commands run & results
  - Verification output: test & build logs
- Send a completion message back to the orchestrator.


## 2026-11-02T19:05:47Z
Scope & Objective:
Implement Milestone 2:
1. In `src/components/home/StackSection.tsx`:
   - Change icon size prop at line 31 from `size={22}` to `size={15}`:
     `<span className="stack-icon"><Icon name={tool.icon} image={tool.image} size={15} /></span>`
   - Adjust hover motion at line 30 to `whileHover={{ y: -2 }}`.
2. In `src/styles/home.css`:
   - Ensure `.stack-section__intro h2` has:
     `font-family: var(--font-display); font-size: clamp(2.2rem, 4.2vw, 3.8rem); line-height: .9; letter-spacing: -.06em; text-transform: uppercase;`
   - Update `.stack-section > .shell`:
     `flex: 1; display: flex; flex-direction: column; justify-content: flex-start; gap: clamp(8px, 1.5vh, 18px); padding-bottom: clamp(12px, 1.8vh, 20px); min-height: 0;`
   - Update `.stack-section__intro`:
     `display: grid; grid-template-columns: 1fr 360px; align-items: end; gap: clamp(16px, 2vw, 36px); padding: clamp(4px, 0.8vh, 10px) 0 clamp(4px, 0.8vh, 8px);`
   - Update `.stack-section__intro p`:
     `color: var(--ink-soft); font-size: clamp(0.85rem, 1.1vw, 0.95rem); line-height: 1.4;`
   - Update `.stack-grid article`:
     `padding: clamp(8px, 1.1vh, 12px); border: 1px solid var(--line-light); border-radius: var(--radius-sm); background: rgba(251, 249, 245, 0.65); display: flex; flex-direction: column;`
   - Update `.stack-grid header`:
     `display: flex; align-items: center; justify-content: space-between; margin-bottom: clamp(4px, 0.7vh, 8px); padding-bottom: 4px; border-bottom: 1px dashed rgba(23, 23, 23, 0.12);`
   - Update `.stack-grid h3`:
     `font-size: .66rem; font-weight: 800; letter-spacing: .12em; text-transform: uppercase;`
   - Update `.stack-grid ul`:
     `display: grid; gap: clamp(3px, 0.4vh, 4px); list-style: none; flex: 1;`
   - Update `.stack-grid li`:
     `display: flex; min-width: 0; min-height: clamp(28px, 3.2vh, 32px); align-items: center; gap: 6px; padding: 2px 8px; border: 1px solid rgba(23, 23, 23, 0.08); border-radius: var(--radius-xs); background: rgba(255, 255, 255, 0.65); transition: border-color 0.15s ease, background 0.15s ease;`
   - Add `.stack-grid li:hover { border-color: rgba(180, 83, 9, 0.35); background: var(--paper-light); }`
   - Update `.stack-icon`:
     `display: grid; width: 20px; height: 20px; flex: 0 0 20px; place-items: center; border-radius: 4px; background: rgba(251, 191, 36, 0.14); color: var(--accent);`
   - Update `.stack-grid li strong`:
     `min-width: 0; font-size: .68rem; font-weight: 700; line-height: 1.2; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--ink);`
3. In `src/styles/responsive.css`:
   - In `@media (max-width: 420px)`, update `.stack-grid article` padding to `10px`.
4. Verification:
   - Run `npm run test`
   - Run `npm run build`
   Both must pass cleanly.
5. Write your report to `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\worker_stack\handoff.md` and send a message back.
