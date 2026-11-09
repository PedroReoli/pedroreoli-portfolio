# Task Assignment: Worker M4 (Generation 2) — Decouple Motion Hover from Scroll Reveal

## Objective
Resolve the adversarial finding identified by Challenger 1 and Reviewer 2 in `src/components/home/ExperienceSection.tsx:72`.

## Problem & Solution
In `ExperienceSection.tsx`:
Lines 72–77 co-located `data-reveal` and `whileHover` on `<m.article>`:
```tsx
<m.article
  className="timeline-card timeline-v__card"
  data-reveal
  whileHover={{ y: -4 }}
  transition={{ duration: 0.22 }}
>
```
Because GSAP ScrollTrigger (`useReveal.ts`) sets inline styles (`opacity: 1; transform: translate(0px, 0px);`) onto `[data-reveal]`, having Framer Motion's `whileHover` manage `style.transform` on the same DOM element causes transform matrix clobbering.

Fix: Decouple them by wrapping `<m.article>` in a reveal container (just as Worker 3 did in `SelectedProjectsSection.tsx`), or placing `data-reveal` on the outer `.timeline-v__item`:
e.g.:
```tsx
<div className="timeline-card-reveal-wrapper" data-reveal>
  <m.article
    className="timeline-card timeline-v__card"
    whileHover={{ y: -4 }}
    transition={{ duration: 0.22 }}
  >
    ...
  </m.article>
</div>
```
Ensure in `src/styles/responsive.css` (or wherever appropriate) that `.timeline-card-reveal-wrapper` has `width: 100%; display: flex; flex-direction: column; align-items: inherit;` so card layout and alignments are preserved.

## Exclusive Write Ownership
- `src/components/home/ExperienceSection.tsx`
- `src/styles/responsive.css`

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Path to ORIGINAL_REQUEST.md
f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\ORIGINAL_REQUEST.md

## Verification
You MUST run:
1. `npx eslint src/components/home/ExperienceSection.tsx` (must be 0 errors)
2. `npm test` (all tests pass)
3. `npm run build` (build succeeds)

Write handoff report to `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\worker_m4_2\handoff.md` and send completion message.
