# Handoff Report: Worker M4 (Generation 2) — Decoupled Motion Hover from Scroll Reveal

**Date**: 2026-11-06T17:29:00Z  
**Worker**: Worker M4 (Generation 2)  
**Milestone**: M4 Generation 2 (Motion Hover & GSAP Scroll Reveal Decoupling)  
**Recipient**: Parent Orchestrator (`828ce2d2-ae98-4861-bd61-2f16df459852`)  
**Workspace Directory**: `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\worker_m4_2\`

---

## 1. Observation

1. **Previous Defect Identified by Challenger 1 and Reviewer 2**:
   - In `src/components/home/ExperienceSection.tsx:72-77`, `data-reveal` and Framer Motion's `whileHover` were co-located on the same DOM element `<m.article>`:
     ```tsx
     <m.article
       className="timeline-card timeline-v__card"
       data-reveal
       whileHover={{ y: -4 }}
       transition={{ duration: 0.22 }}
     >
     ```
   - GSAP ScrollTrigger via `useReveal.ts:23-36` sets inline transform and opacity attributes (`opacity: 0, y: 24` transitioning to `opacity: 1, y: 0`) on `[data-reveal]`.
   - Concurrently, Framer Motion (`m.article`) calculates and assigns `transform: translateY(-4px)` on hover. When applied to the exact same element, GSAP's inline style and Motion's style transform clobbered each other.

2. **Source Code Modifications**:
   - In `src/components/home/ExperienceSection.tsx` (lines 71–117):
     Wrapped `<m.article>` in `<div className="timeline-card-reveal-wrapper" data-reveal>` and removed `data-reveal` from `<m.article>`:
     ```tsx
     {/* Trajectory Milestone Card Wrapper for Scroll Reveal */}
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
   - In `src/styles/responsive.css` (lines 295–303, 341–344, 381–387):
     Added layout, display, hardware-acceleration, and responsive folding rules for `.timeline-card-reveal-wrapper`:
     ```css
     /* Cards & Reveal Wrapper */
     .timeline-card-reveal-wrapper {
       width: 100%;
       max-width: 540px;
       display: flex;
       flex-direction: column;
       align-items: inherit;
       will-change: opacity, transform;
     }

     .timeline-v__card {
       width: 100%;
       max-width: 540px;
       height: auto;
       min-height: 100%;
     }
     ```
     Under `@media (max-width: 899px)`:
     ```css
     .timeline-card-reveal-wrapper,
     .timeline-v__card {
       max-width: 100%;
     }
     ```
     Under `@media (prefers-reduced-motion: reduce)`:
     ```css
     .timeline-card-reveal-wrapper {
       opacity: 1 !important;
       transform: none !important;
       transition: none !important;
     }
     ```

3. **Tool Execution & Test Verification Results**:
   - `npx eslint src/components/home/ExperienceSection.tsx`:
     ```
     Exit code 0 (0 errors, 0 warnings)
     ```
   - `npm test`:
     ```
     Test Files  5 passed (5)
          Tests  42 passed (42)
       Duration  7.38s
     ```
   - `npm run build`:
     ```
     ✓ 2503 modules transformed.
     dist/assets/index-aDVQI4U2.css   56.98 kB │ gzip:  11.01 kB
     dist/assets/index-qbglVadu.js   543.33 kB │ gzip: 187.60 kB
     ✓ built in 742ms
     ```

---

## 2. Logic Chain

1. **Transform Clashing Diagnosis**: `useReveal` sets GSAP-managed inline transforms on all DOM elements matching `[data-reveal]`. When Framer Motion's `whileHover={{ y: -4 }}` also targets that same DOM element, the two animation runtimes fight for control of `style.transform`, causing flickering, dropped hover states, or canceled emergence tweens.
2. **Structural Decoupling**: By introducing an outer wrapper `<div className="timeline-card-reveal-wrapper" data-reveal>`, the GSAP ScrollTrigger batch target is cleanly separated onto the wrapper element. Framer Motion's `whileHover` now exclusively controls `<m.article>` on the inner DOM element.
3. **CSS Preservation & Geometry Continuity**:
   - Setting `width: 100%; max-width: 540px; display: flex; flex-direction: column; align-items: inherit;` ensures that the wrapper occupies the exact bounding box formerly taken by `.timeline-v__card`.
   - The inner `.timeline-v__card` fills 100% of the wrapper's inner space.
   - On screens `< 900px`, `.timeline-card-reveal-wrapper` scales to `max-width: 100%`, preserving the single-column fold with `padding-left: 64px`.
   - On `prefers-reduced-motion: reduce`, both GSAP's hook and CSS enforce `opacity: 1 !important; transform: none !important;` to ensure full accessibility.

---

## 3. Caveats

- **Exclusive Write Ownership Respect**: Only `src/components/home/ExperienceSection.tsx` and `src/styles/responsive.css` were modified. No changes were made to other components, test suites, or global styles.
- **No caveats**: All 42 tests across all 5 test files pass with 0 failures, TypeScript compiles with zero errors, and ESLint passes with 0 warnings.

---

## 4. Conclusion

The adversarial finding in `ExperienceSection.tsx` has been resolved:
- `data-reveal` and Framer Motion `whileHover` are decoupled via `.timeline-card-reveal-wrapper`.
- Timeline card alignment, stem contact, responsiveness (<900px fold, <=480px mobile), and reduced motion compliance are preserved.
- Zero ESLint errors, zero build errors, and all 42 tests pass.

---

## 5. Verification Method

To independently verify:

1. **ESLint**:
   ```powershell
   npx eslint src/components/home/ExperienceSection.tsx
   ```
   *Expected Result*: Exits with code 0 (zero errors, zero warnings).

2. **Vitest Suite**:
   ```powershell
   npm test
   ```
   *Expected Result*: All 5 test files pass, 42 tests pass.

3. **Production Build**:
   ```powershell
   npm run build
   ```
   *Expected Result*: TypeScript typecheck (`tsc -b`) and Vite production bundle succeed cleanly in < 1 second.
