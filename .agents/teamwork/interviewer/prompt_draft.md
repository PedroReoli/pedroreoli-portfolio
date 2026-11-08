Fix application scrolling behavior, transitions between images and scene clips, and the presentation of the experience section in the portfolio. The user requested a full team to inspect the codebase and implement the necessary improvements.

Integrity mode: development

## Requirements

### R1. Application Scrolling Fixes
Inspect and fix application scrolling behavior across the portfolio (`src/styles/layout.css`, `src/styles/base.css`, `src/pages/HomePage.tsx`). Eliminate unnatural scrolling friction, container overflow issues, jitter, and layout shifting, ensuring smooth and natural scrolling across all viewports.

### R2. Image and Backdrop Transitions
Inspect and refine transitions between images and scene backdrop clips (`src/components/scene/VideoStage.tsx`, `src/components/home/SelectedProjectsSection.tsx`, `src/styles/backdrop.css`, `content/sceneClips.json`). Resolve abrupt cuts, flickering, or blank states, ensuring seamless transitions between visual states and project views.

### R3. Experience Section Polish
Refine the experience section (`src/components/home/ExperienceSection.tsx`, `src/styles/home.css`, `src/styles/responsive.css`) to improve visual hierarchy, timeline flow, typography, and spacing, ensuring consistent presentation and clean responsiveness on both mobile and desktop screens.

### R4. Non-Intrusive Execution Environment
The team must NOT steal window focus or open foreground GUI/browser windows during execution or automated verification; the user is actively gaming on this machine. All automated browser checks, test runners, and tooling must run strictly headless and silently in the background.

## Acceptance Criteria

### Automated Verification
- [ ] `npm test` passes with zero errors.
- [ ] `npm run build` completes successfully with no build or type errors.

### Scrolling & Navigation
- [ ] Scrolling down and up the page is fluid without unexpected jitter, abrupt jumps, or scrollbar overflow trapping.
- [ ] Container heights and layout overflow properties allow unobstructed scrolling across all sections.

### Image & Backdrop Transitions
- [ ] Transitions between scene clips and project visuals occur smoothly without blank flash, flickering, or broken element states.

### Experience Section
- [ ] The experience timeline displays consistent alignment, legible typography, and balanced spacing on both mobile (<768px) and desktop (>1024px) viewports.

### Execution Constraints
- [ ] No browser or desktop GUI window steals foreground focus or interrupts background operation at any point during testing and verification.
