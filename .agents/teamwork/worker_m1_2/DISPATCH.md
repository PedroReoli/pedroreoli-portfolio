# Task Assignment: Worker M1 (Generation 2) — Header ESLint Fix & Test Timeout

## Objective
Fix the single blocking ESLint error identified by Reviewers and Challengers:
In `src/components/layout/Header.tsx:21:7`:
`react-hooks/set-state-in-effect: Calling setState synchronously within an effect can trigger cascading renders`

## Problem & Solution
In `Header.tsx`:
Currently lines 19–23:
```tsx
useEffect(() => {
  if (!isHome) {
    setIsPastHero(true)
    return
  }
...
```
ESLint forbids calling `setIsPastHero(true)` synchronously inside the effect root!
Instead, derive `isPastHero`:
```tsx
const [isScrolledPastHero, setIsScrolledPastHero] = useState(false)
const isPastHero = !isHome || isScrolledPastHero
```
And inside `useEffect`:
```tsx
useEffect(() => {
  if (!isHome) return

  const heroEl = document.getElementById('hero')
  if (!heroEl) return

  if (typeof IntersectionObserver !== 'undefined') {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolledPastHero(!entry.isIntersecting)
      },
      { threshold: 0.1, rootMargin: '-70px 0px 0px 0px' }
    )
    observer.observe(heroEl)
    return () => observer.disconnect()
  } else {
    const handleScroll = () => {
      if (typeof window !== 'undefined' && window.scrollY === 0) {
        setIsScrolledPastHero(false)
        return
      }
      const rect = heroEl.getBoundingClientRect()
      setIsScrolledPastHero(rect.bottom <= 80)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }
}, [isHome])
```
Also, in `vitest.config.ts`, add `testTimeout: 15000` to the `test` block to prevent JSDOM parallel test timeout flakiness.

## Exclusive Write Ownership
- `src/components/layout/Header.tsx`
- `src/styles/layout.css`
- `vitest.config.ts`

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Path to ORIGINAL_REQUEST.md
f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\ORIGINAL_REQUEST.md

## Verification
You MUST run:
1. `npx eslint src/components/layout/Header.tsx` (must be 0 errors)
2. `npm run lint` (must be 0 errors)
3. `npm test` (all tests pass)
4. `npm run build` (build succeeds)

Write handoff report to `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\worker_m1_2\handoff.md` and send completion message.

## 2026-11-06T17:21:04Z
You are Worker M1 (Generation 2).
Working directory: f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\worker_m1_2\
Read your dispatch assignment: f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\worker_m1_2\DISPATCH.md
Path to ORIGINAL_REQUEST.md: f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\ORIGINAL_REQUEST.md
Exclusive Write Ownership:
- src/components/layout/Header.tsx
- src/styles/layout.css
- vitest.config.ts
Mission:
1. In `src/components/layout/Header.tsx`:
   Fix the single ESLint error `react-hooks/set-state-in-effect` on line 21 by deriving `const isPastHero = !isHome || isScrolledPastHero;` and not calling `setIsPastHero(true)` synchronously inside the `useEffect` body.
2. In `vitest.config.ts`:
   Add `testTimeout: 15000` to the `test` configuration to eliminate parallel JSDOM timeout flakiness.
3. Verification:
   Run `npm run lint`, `npm test`, and `npm run build`. Ensure zero errors!
4. Write `handoff.md` to `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\worker_m1_2\handoff.md` and send a completion message with send_message.
