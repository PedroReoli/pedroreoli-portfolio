# Investigation & Survey Report: Build System, Test Suite & Styling Architecture

**Agent**: `explorer_survey_build_tests`  
**Date**: 2026-11-02  
**Target Focus**: Baseline survey for compacting Sections "Projetos" (`SelectedProjectsSection`) and "Minha Stack" (`StackSection`), ensuring proper project image rendering and rigorous test coverage.

---

## 1. Observation

### 1.1. Package & Framework Tooling (`package.json`, `vite.config.ts`, `vitest.config.ts`)
- **Package name & version**: `pedroreoli-portfolio@2.0.0`, type `module`.
- **Core dependencies**: React 19.3.1 (`react`, `react-dom`), `vite` 8.3.5, `@vitejs/plugin-react` 6.1.2, `motion` 14.9.0 (`motion/react`), `gsap` 3.15.0, `@gsap/react` 2.1.2, `lucide-react` 1.66.0, `simple-icons` 16.36.0, Three.js (`three` 0.187.0, `@react-three/fiber` 9.8.2, `@react-three/drei` 10.7.9).
- **Scripts in `package.json`**:
  ```json
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint src vite.config.ts vitest.config.ts",
    "test": "vitest run",
    "preview": "vite preview"
  }
  ```
- **Vite & Vitest configurations**:
  - `vite.config.ts` (lines 7-12):
    ```ts
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@content': fileURLToPath(new URL('./content', import.meta.url)),
      },
    }
    ```
  - `vitest.config.ts` (lines 13-17):
    ```ts
    test: {
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
      css: true,
    }
    ```

### 1.2. Baseline Command Execution Results
- **`npm run test`**:
  - Command: `vitest run`
  - Exit code: `0`
  - Summary: 3 test files, 20 tests total, all passed in 5.54s.
    - `src/test/contracts.test.ts` (6 tests passed, 27ms)
    - `src/test/section2-layout-stress.test.tsx` (8 tests passed, 759ms)
    - `src/test/rendering.test.tsx` (6 tests passed, 1343ms)
- **`npm run build`**:
  - Command: `tsc -b && vite build`
  - Exit code: `0`
  - Modules transformed: 2503 modules in 949ms.
  - Assets generated:
    - `dist/index.html` (0.65 kB, gzip 0.39 kB)
    - `dist/assets/index-BY3_w9TC.css` (38.80 kB, gzip 7.91 kB)
    - `dist/assets/index-CN3CLAq5.js` (529.84 kB, gzip 184.18 kB)
    - Font woff/woff2 assets (`instrument-serif`, `instrument-sans`)
- **`npm run lint`**:
  - Command: `eslint src vite.config.ts vitest.config.ts`
  - Exit code: `1` (Pre-existing issue)
  - Output: `src/test/section2-layout-stress.test.tsx:2:18 error 'screen' is defined but never used @typescript-eslint/no-unused-vars`

### 1.3. Styling Architecture & Theme System
- **Framework check**: Tailwind CSS is **NOT** configured or installed in `package.json`. There are no `@tailwind` directives. The string "tailwind" only occurs in `content/technologyContent.json` (as a listed skill) and `src/components/common/Icon.tsx` (icon definition).
- **CSS Architecture**:
  - Native modular CSS loaded via `src/index.css`:
    ```css
    @import './styles/base.css';
    @import './styles/layout.css';
    @import './styles/home.css';
    @import './styles/pages.css';
    @import './styles/responsive.css';
    ```
- **Shared Theme Variables (`src/styles/base.css` lines 1-31 and `src/theme/palette.ts`)**:
  - Dark background base: `--color-bg: #090a0d`, `--color-surface: #111216`, `--night: var(--color-bg)`, `--night-soft: var(--color-surface)`
  - Paper base: `--color-paper: #f3efe7`, `--color-paper-raised: #fbf9f5`, `--paper: var(--color-paper)`, `--paper-light: var(--color-paper-raised)`
  - Ink typography: `--color-ink: #171717`, `--color-muted: #595959`, `--ink: var(--color-ink)`, `--ink-soft: var(--color-muted)`
  - Accents: `--color-accent: #fbbf24`, `--color-accent-ink: #b45309`, `--color-accent-emissive: #78350f`, `--accent-glow: rgba(251, 191, 36, 0.22)`
  - Grid line borders: `--line-dark: rgba(243, 239, 231, 0.17)`, `--line-light: rgba(23, 23, 23, 0.18)`
  - Radii scale: `--radius-xs: 8px`, `--radius-sm: 12px`, `--radius-md: 18px`, `--radius-lg: 26px`, `--radius-xl: 34px`
  - Typography: `--font-sans: 'Instrument Sans Variable', Arial, sans-serif`, `--font-display: 'Instrument Sans Variable', Arial, sans-serif`, `--font-serif: 'Instrument Serif', Georgia, serif`
  - Layout & Header: `--header-height: 72px`, `.shell: width: min(100% - 48px, 1480px)` (32px padding on mobile <= 760px, 24px on <= 420px).
- **Responsive Breakpoints (`src/styles/responsive.css`)**:
  - `@media (min-width: 1101px)`: Desktop widescreen. Enforces `height: 100svh; min-height: 100svh; overflow: hidden;` on `.hero`, `.work-section`, `.stack-section`, `.purpose-section`, `.contact-section`. Note that `.about` and `.experience-section` use `height: auto; min-height: 100svh; overflow: visible;`.
  - `@media (max-width: 1100px)`: Tablets & notebooks. Sets `.work-section` and `.stack-section` to `height: auto; min-height: 100svh; overflow: visible;`. Changes `.project-showcase` to `grid-template-columns: 1fr`, and `.stack-grid` to `grid-template-columns: repeat(2, 1fr)`.
  - `@media (max-width: 760px)`: Tablet portrait / mobile. Sets `.project-card__visual, .project-card--2 .project-card__visual { min-height: 290px; }`. Sets `.stack-grid { grid-template-columns: 1fr; }` and `.stack-grid ul { grid-template-columns: repeat(2, 1fr); }`.
  - `@media (max-width: 420px)`: Small phones. Padding and text adjustments.

### 1.4. Current Implementation of Projects Section (`SelectedProjectsSection.tsx`)
- Container: `<section id="projetos" className="work-section section-dark">`
- Structure:
  - `.section-kicker.section-kicker--dark` (number `03`, eyebrow, count `02`)
  - `.work-section__heading`: `<h2>{copy.title}<em>.</em></h2>` (heading font size: `clamp(3.8rem, 7.6vw, 8rem)`, up to 128px high)
  - `.project-showcase`: `grid-template-columns: 1.42fr .78fr` (asymmetrical 2-card desktop grid)
  - Card 1 (`Autocom3`):
    - Visual: `.project-card__visual` has fixed clamp height: `clamp(160px, 22vh, 230px)`.
    - Image tag:
      ```tsx
      <img
        src={project.image}
        srcSet={project.imageSrcSet}
        sizes="(max-width: 800px) 100vw, 65vw"
        alt={project.imageAlt[language]}
      />
      ```
    - Asset resolution: `01-painel-operacoes-visao-geral.png` is **2880 x 1800 px** (16:10 aspect ratio). WebP variants: 720w, 1440w, 2880w.
    - Card 1 container width on desktop is ~800–930px. With height clamped at 230px, container aspect ratio is ~4:1!
    - Image styling in `home.css:77`: `object-fit: cover; width: 100%; height: 100%; min-height: inherit;`. This causes severe top/bottom clipping (~60% of the UI screenshot is cut off), distorting perception of the dashboard.
    - Card 1 image tag lacks `loading="lazy"`, `decoding="async"`, and explicit aspect-ratio.
  - Card 2 (`Achilles`):
    - Visual: `.agent-art` interactive CSS artwork with radar circles, core badge, and steps.
  - Card Body:
    - Card title `<h3>` font-size: `clamp(2.2rem, 3.7vw, 4.6rem);` (up to 73.6px), contributing to the superdimensioned feel.

### 1.5. Current Implementation of Stack Section (`StackSection.tsx`)
- Container: `<section id="stack" className="stack-section section-light">`
- Structure:
  - `.section-kicker` (number `04`, eyebrow, count `04`)
  - `.stack-section__intro`: `grid-template-columns: 1fr 360px`, `<h2>{copy.title}<em>{section.titleAccent}</em></h2>` (`MINHA STACK.`), `<p>{copy.description}</p>`
  - `.stack-grid`: `display: grid; grid-template-columns: repeat(4, 1fr); gap: clamp(8px, 1vw, 12px);`
  - 4 categories (`technologyContent.groups`):
    1. Interfaces: 6 tools (React, TypeScript, Next.js, Angular, Tailwind, Design System)
    2. Back-end: 6 tools (Node.js, NestJS, Express, Fastify, PostgreSQL, Supabase)
    3. Cloud & apps: 6 tools (AWS, API Gateway, Docker, Actions, Tauri, .NET)
    4. IA & APIs: 6 tools (OpenAI, Claude, Gemini, MCP, JWT, GraphQL)
    - Total: 24 tools.
  - Each item: `li` with `min-height: clamp(38px, 4.5vh, 44px); padding: 4px 8px; border-radius: var(--radius-md);`.
  - Icon: `.stack-icon` with `width: 28px; height: 28px; flex: 0 0 28px;`.
  - Stacking behavior: All 6 tools per category are stacked in a single vertical list column (`ul` with 6 rows). On desktop 100svh screens, 6 rows * 44px + header + intro + kicker puts extreme pressure on the vertical budget.
  - On mobile (<= 760px): The 4 categories stack into a single column (`grid-template-columns: 1fr`), making the section very tall.

### 1.6. Existing Test Coverage Breakdown
- `src/test/rendering.test.tsx` (lines 42–51):
  ```tsx
  // Selected Projects Section
  expect(screen.getByText('Autocom3')).toBeInTheDocument();
  expect(screen.getByText('Achilles')).toBeInTheDocument();

  // Stack Section
  expect(screen.getByText('MINHA')).toBeInTheDocument();
  expect(screen.getByText('STACK.')).toBeInTheDocument();
  expect(screen.getAllByText('React')[0]).toBeInTheDocument();
  expect(screen.getAllByText('TypeScript')[0]).toBeInTheDocument();
  ```
- `src/test/contracts.test.ts`:
  - Validates JSON contracts, asset existence in `public/`, icons registered, color restrictions (`#FBBF24`, `#B45309`, `#78350F`, `#182033`, `#111010`), and CSS rules disallowing cobalt/orange.
  - Gap: `contracts.test.ts` lines 120-128 iterates `projectsContentRaw.corporateProjectImages` but does **NOT** iterate `homeContentRaw.featuredProjects` for `image` and `imageSrcSet` paths!
- `src/test/section2-layout-stress.test.tsx`:
  - 8 stress tests covering Section 2 (About / Art Frame) layout clamps, viewport budgets (768px, 900px, 1080px, 1440px), 3D pointer tilt, and font sizes.
  - Sections 3 (Projects) and 4 (Stack) have **ZERO** layout stress, visual dimension, or image attribute assertions.

---

## 2. Logic Chain

1. **Build and Test Health**:
   - `npm run test` executes quickly and passes 100% (20/20).
   - `npm run build` succeeds cleanly in under 1s without bundle warnings or TS compilation errors.
   - Any modifications made to components or CSS must preserve this zero-error build and passing test suite.

2. **Styling Architecture Constraints**:
   - The project does not use Tailwind. Any attempt by an implementer to use utility classes like `p-4`, `flex-col`, `gap-2` in HTML/JSX without defined CSS classes will fail.
   - Styling must be defined via standard CSS in `src/styles/home.css` and `src/styles/responsive.css`, using existing CSS variables (`--color-accent`, `--line-light`, `--line-dark`, `--radius-sm`, `--radius-md`, etc.).
   - Palette restrictions enforced by `contracts.test.ts` (lines 173-187) forbid adding arbitrary colors like Cobalt (`#315EFB`) or Orange (`#FF5A36`). All colors must align with Solar Amber (`#FBBF24`), Dark Surface (`#111216`), Paper (`#F3EFE7`), and Ink (`#171717`).

3. **Project Image Distortion & Clipping Cause**:
   - Observation 1.4 showed that Autocom3 has a 16:10 aspect ratio image (2880x1800), but `.project-card__visual` has a desktop width of ~800–900px with a clamped height of 160–230px (~4:1 aspect ratio).
   - `object-fit: cover` with default `50% 50%` centering slices off ~60% of the screenshot, cutting off essential UI headers, tables, and controls.
   - To fix this and satisfy Requirement R1 ("proporção controlada, ajuste adequado (object-fit) e sem distorções, cortes indesejados ou falhas de carregamento"):
     - `.project-card__visual` should use a controlled aspect ratio (e.g., 16/9 or 16/10) or calibrated max-height/padding.
     - `object-position: top center` or `object-position: center 15%` ensures the operations header and toolbar remain crisp and visible.
     - Add `loading="lazy"`, `decoding="async"` attributes to the image tag.

4. **Compactness Cause & Approach**:
   - Section 3 heading font size `clamp(3.8rem, 7.6vw, 8rem)` and card title `clamp(2.2rem, 3.7vw, 4.6rem)` take up disproportionate vertical height. Reducing these font clamps (e.g. heading `clamp(2.4rem, 4.5vw, 4.8rem)` and card title `clamp(1.6rem, 2.4vw, 2.8rem)`) immediately calms the superdimensioned appearance.
   - In Section 4 (Stack), listing 6 items per column vertically requires a minimum of ~280px list height. Grouping tools into a denser 2-column micro-grid inside each category (e.g., `grid-template-columns: repeat(2, 1fr)` per article, or compact chip/badge layout) compresses the vertical footprint by ~45%, enabling the section to fit comfortably in desktop 100svh viewports.

5. **Existing Assertions Vulnerability & Preservation**:
   - Text assertions in `rendering.test.tsx` (`'Autocom3'`, `'Achilles'`, `'MINHA'`, `'STACK.'`, `'React'`, `'TypeScript'`) must remain in the DOM.
   - If Section 3 & 4 layout classes or IDs are adjusted, existing test queries won't break as long as text content and section IDs (`#projetos`, `#stack`) remain untouched.

---

## 3. Caveats

1. **Pre-existing ESLint Failure**:
   - `npm run lint` fails with 1 unused variable in `src/test/section2-layout-stress.test.tsx:2:18` (`'screen' is defined but never used`). This error existed prior to this survey. The implementer should clean this import so that `npm run lint` passes 100%.
2. **Desktop 100svh Enforcement**:
   - In `responsive.css` (lines 1-10), `.work-section` and `.stack-section` are constrained to `height: 100svh; overflow: hidden;` on desktop (`min-width: 1101px`).
   - If cards or content exceed the viewport height (e.g. on 1366x768 or 1440x900 screens), overflow hidden will clip content if not properly compact. The compact design must strictly respect the vertical budget.
3. **Achilles Artwork Card**:
   - Project 2 is not an image; it renders the custom `<AchillesArtwork />` component. Compacting the card dimensions requires verifying that the `.agent-art` radar, core, and steps scale down cleanly without overlapping.

---

## 4. Conclusion & Actionable Recommendations

### 4.1. Core Verdict
The build system (`tsc -b && vite build`) and Vitest test suites (`vitest run`) are fast, healthy, and reliable. The styling system is pure modular CSS with custom properties and strict solar-amber theme contracts, without any Tailwind dependency.
Compacting Projects and Stack sections requires adjustments to `src/styles/home.css`, `src/styles/responsive.css`, and minor attribute enhancements to `src/components/home/SelectedProjectsSection.tsx` and `src/components/home/StackSection.tsx`.

### 4.2. Actionable Specifications for the Implementer

#### For Seção de Projetos (`SelectedProjectsSection` / `.work-section`):
1. **Calibrate Heading & Card Typography**:
   - Reduce `.work-section__heading h2` from `clamp(3.8rem, 7.6vw, 8rem)` to a compact editorial scale: `clamp(2.2rem, 4vw, 4.2rem)`.
   - Reduce `.project-card h3` from `clamp(2.2rem, 3.7vw, 4.6rem)` to `clamp(1.5rem, 2.2vw, 2.6rem)`.
2. **Optimize Visual Dimensions & Image Display**:
   - Adjust `.project-card__visual` height and aspect ratio: set `aspect-ratio: 16 / 9` with controlled max-height `clamp(140px, 18vh, 200px)` (instead of uncontrolled clipping).
   - In `img` styling: set `object-fit: cover; object-position: top center;` so the dashboard toolbar/header is sharp, crisp, and not chopped off.
   - Add `loading="lazy"` and `decoding="async"` attributes to the `<img>` element in `SelectedProjectsSection.tsx`.
   - Ensure `.project-card__index` badge scales proportionally (`width: 36px; height: 36px; font-size: 0.65rem`).
   - Scale `.agent-art` radar for Card 2 to ensure proportional rendering when card height is reduced.

#### For Seção Minha Stack (`StackSection` / `.stack-section`):
1. **Compact Dense Grid & Categorization**:
   - In `src/styles/home.css`, compress `.stack-grid article` padding to `clamp(8px, 1.2vh, 12px)`.
   - Convert `.stack-grid ul` into a dense 2-column micro-grid: `grid-template-columns: repeat(2, 1fr); gap: clamp(4px, 0.6vh, 6px);`.
   - Reduce `li` height: `min-height: clamp(30px, 3.5vh, 36px); padding: 3px 8px; border-radius: var(--radius-sm);`.
   - Reduce `.stack-icon` size to `22px x 22px` with `Icon size={16}`.
   - Reduce `.stack-section__intro h2` to `clamp(2.2rem, 4vw, 4.2rem)` and compress intro margin/padding.
2. **Mobile Optimization**:
   - On `@media (max-width: 760px)`, present the 4 categories in a dense 2x2 grid (`grid-template-columns: repeat(2, 1fr)`) with compact pills, instead of stacking 4 gigantic full-width cards vertically.

### 4.3. Test Suite Enhancements to Implement

1. **Add Contract Asset Verification for Featured Projects** (`src/test/contracts.test.ts`):
   - Add assertions to ensure `homeContentRaw.featuredProjects` local images and `imageSrcSet` entries exist in `public/`.
2. **Create Dedicated Layout & Compactness Stress Test Suite** (`src/test/sections3-4-layout-stress.test.tsx`):
   - Model after `section2-layout-stress.test.tsx`:
   - **Test Suite A**: Projects Section Compactness & Image Integrity:
     - Verify image element in `SelectedProjectsSection` renders with `loading="lazy"`, `decoding="async"`, and non-empty `alt`.
     - Verify CSS specifies `object-fit: cover` and `object-position: top center` (or top/center controlled position).
     - Verify `.project-card__visual` has controlled height clamp not exceeding 220px on desktop.
     - Verify Card 2 renders `.agent-art` and Achilles step badges without DOM breakage.
   - **Test Suite B**: Minha Stack Compact Density & Category Audit:
     - Verify all 4 categories (`01 Interfaces`, `02 Back-end`, `03 Cloud & apps`, `04 IA & APIs`) and all 24 tools render with their icons.
     - Verify `.stack-grid` uses dense micro-grid layout.
     - Verify tool badges have compact vertical height (clamp <= 38px).
   - **Test Suite C**: Desktop Viewport Height Budget (768px, 900px, 1080px, 1440px):
     - Compute total vertical height budget for `.work-section` and `.stack-section` to mathematically prove neither section overflows the 100svh viewport on desktop.

---

## 5. Verification Method

To independently verify these findings and all subsequent implementations:

1. **Run Full Test Suite**:
   ```bash
   npm run test
   ```
   *Expected*: All test files pass with 0 failures.
2. **Run Production Build**:
   ```bash
   npm run build
   ```
   *Expected*: `tsc -b && vite build` completes with exit code 0 and no TypeScript or bundling errors.
3. **Run Code Linter**:
   ```bash
   npm run lint
   ```
   *Expected*: Clean pass once `src/test/section2-layout-stress.test.tsx:2:18` unused variable is removed.
4. **Visual Inspection**:
   - Inspect `http://localhost:5173/` (via `npm run dev`) at viewports:
     - 1920x1080 (1080p Desktop)
     - 1366x768 (Laptop)
     - 768x1024 (Tablet)
     - 375x667 (Mobile)
   - Verify Autocom3 project screenshot shows the upper dashboard navigation and operations controls clearly without cutoff or stretching.
   - Verify Minha Stack displays dense, organized categories without excessive whitespace.
