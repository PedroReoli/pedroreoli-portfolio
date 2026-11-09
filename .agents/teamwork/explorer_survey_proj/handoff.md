# Handoff Report: Projects Section & Image Architecture Survey

**Agent**: `explorer_survey_proj`  
**Date**: 2026-11-02T18:53:00Z  
**Type**: Hard Handoff (Investigation Complete)  
**Target Milestone**: M1 / M2 Plan & Implementation for Projects Section & Images  

---

## 1. Observation

### 1.1 Project Structure & Inventory of Related Files
Direct inspection revealed the following files governing the Projects section and project images:

| Role | File Path | Key Responsibilities |
|---|---|---|
| **Component** | `src/components/home/SelectedProjectsSection.tsx` (lines 1-65) | Homepage featured projects showcase (`work-section`), renders Autocom3 (`visual: 'image'`) and Achilles (`AchillesArtwork`). |
| **Component** | `src/pages/ProjectsPage.tsx` (lines 1-71) | Full projects archive (`/projetos`), filters between Corporate gallery (`corporateProjectImages`) and Independent projects (`independentProjects`). |
| **Component** | `src/components/projects/ProjectViewerModal.tsx` (lines 1-51) | Native `<dialog>` modal lightbox for viewing corporate project screenshots. |
| **Data** | `content/homeContent.json` (lines 2-51) | Defines `featuredProjects`: Autocom3 image paths, responsive `imageSrcSet`, texts; Achilles artwork specs. |
| **Data** | `content/projectsContent.json` (lines 1-61) | Defines `corporateProjectImages` (4 items) and `independentProjects` (3 items). |
| **Data** | `content/interfaceContent.json` (lines 1-208) | Headings, action labels, SEO meta, category definitions for projects. |
| **Styles** | `src/styles/home.css` (lines 66-94) | Styles for `.work-section`, `.project-showcase`, `.project-card`, `.project-card__visual`, `.agent-art`. |
| **Styles** | `src/styles/pages.css` (lines 1-39) | Styles for `.archive-hero`, `.archive-tabs`, `.project-archive`, `.gallery-grid`, `.independent-grid`, `.project-modal`. |
| **Styles** | `src/styles/responsive.css` (lines 1-10, 46-48, 84-88) | Breakpoint rules for `.work-section`, `.project-showcase`, `.project-card--2`, `.gallery-grid`. |
| **Styles** | `src/styles/base.css` (lines 1-67) | CSS variables, `--radius-lg: 26px`, `.section-kicker` (`min-height: 68px`). |
| **Assets** | `public/portfolio-autocom3/` (10 PNG files) | Full-resolution uncompressed screenshots (`2880 x 1800` px). |
| **Assets** | `public/media/projects/` (12 WebP files) | Optimized responsive images (`720x450`, `1440x900`, `2880x1800` px). |
| **Tests** | `src/test/contracts.test.ts` (lines 19-20, 65-74, 120-129) | Contract checks verifying JSON fields, asset existence, icon validity. |
| **Tests** | `src/test/rendering.test.tsx` (lines 42-45, 86-100) | Integration tests verifying homepage project rendering and `/projetos` tabs. |

---

### 1.2 Quantitative Image Asset Inspection
Command executed:
`node -e "const fs = require('fs'); const dir = 'public/portfolio-autocom3'; fs.readdirSync(dir).filter(f => f.endsWith('.png')).forEach(f => { const b = fs.readFileSync(dir + '/' + f); console.log(f, b.readUInt32BE(16), 'x', b.readUInt32BE(20)); });"`
Result:
- `01-catalogo-skus-tabela.png`: `2880 x 1800`
- `01-ferramentas-tributarias.png`: `2880 x 1800`
- `01-formulario-oportunidade-comercial.png`: `2880 x 1800`
- `01-licencas-sgsh-painel-central.png`: `2880 x 1800`
- `01-painel-operacoes-visao-geral.png`: `2880 x 1800`
- `01-propostas-comerciais-listagem.png`: `2880 x 1800`
- `02-categorias-produtos-skus.png`: `2880 x 1800`
- `02-licenca-detalhes-frames-ciclo-de-vida.png`: `2880 x 1800`
- `02-painel-operacoes-dropdown-filtros.png`: `2880 x 1800`
- `03-modal-dados-cliente-somente-leitura.png`: `2880 x 1800`

WebP generated images in `public/media/projects/`:
- `autocom3-*-720.webp`: `720 x 450`
- `autocom3-*-1440.webp`: `1440 x 900`
- `autocom3-*-2880.webp`: `2880 x 1800`

**All project screenshots without exception have an intrinsic aspect ratio of exactly 16:10 (1.6 : 1).**

---

### 1.3 Exact CSS Properties Causing Oversized Appearance & Distortions

#### 1. Full-Height Forced Stretching in Desktop Viewport
In `src/styles/responsive.css` (lines 1-10):
```css
@media (min-width: 1101px) {
  .hero,
  .work-section,
  .stack-section,
  .purpose-section,
  .contact-section {
    height: 100svh;
    min-height: 100svh;
    overflow: hidden;
  }
```
In `src/styles/home.css` (lines 66-67, 72):
```css
.work-section { position: relative; height: 100svh; min-height: 100svh; padding-top: var(--header-height, 72px); padding-bottom: 0; display: flex; flex-direction: column; overflow: hidden; }
.work-section > .shell { flex: 1; display: flex; flex-direction: column; justify-content: space-between; padding-bottom: clamp(14px, 2vh, 24px); min-height: 0; }
.project-showcase { display: grid; grid-template-columns: 1.42fr .78fr; gap: 18px; flex: 1; min-height: 0; align-items: stretch; }
```
Because `.work-section` is forced to `100svh` and `.project-showcase` has `flex: 1; align-items: stretch;`, the cards are forced to stretch vertically to consume all remaining screen height (typically 550px to 750px of card height on 900p and 1080p displays).

#### 2. Visual Letterbox Aspect Ratio Mismatch & Severe Image Cropping
In `src/styles/home.css` (lines 75-77):
```css
.project-card__visual { position: relative; overflow: hidden; height: clamp(160px, 22vh, 230px); min-height: 0; background: var(--night-soft); flex-shrink: 0; }
.project-card__visual img { width: 100%; height: 100%; min-height: inherit; object-fit: cover; transition: transform .7s cubic-bezier(.2,.8,.2,1),filter .4s ease; }
```
- In Card 1 (Autocom3), the column width is `1.42fr` (approx. 780px - 820px on standard desktop).
- The height of `.project-card__visual` is capped at `230px` (`clamp(160px, 22vh, 230px)`).
- The resulting container aspect ratio is `780 / 230 = 3.39 : 1` (an extreme panoramic letterbox).
- Because the screenshot has a 16:10 (1.6 : 1) aspect ratio, `object-fit: cover` zooms in to fill the 780px width, requiring a rendered height of `780 / 1.6 = 487.5px`.
- Because the container is only 230px tall, **257.5px (over 52.8%) of the screenshot is cropped off!**
- The navigation bar, header KPIs, and bottom table are completely cut off.
- The 2.1x zoom-in causes the screenshot to lose sharpness and look blurry.

#### 3. Massive Internal Empty Space in Card Body
In `src/styles/home.css` (lines 80-85):
```css
.project-card__body { display: flex; flex: 1; flex-direction: column; padding: clamp(12px, 1.5vh, 18px); min-height: 0; }
.project-card h3 { margin-top: clamp(6px, 1vh, 12px); font-family: var(--font-display); font-size: clamp(2.2rem,3.7vw,4.6rem); letter-spacing: -.055em; line-height: .9; text-transform: uppercase; }
.project-card p { width: min(580px,100%); margin-top: clamp(4px, 0.6vh, 8px); color: rgba(244,240,231,.64); line-height: 1.5; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden; }
.project-card__action { display: flex; align-items: center; justify-content: space-between; margin-top: auto; padding-top: clamp(8px, 1.2vh, 14px); color: var(--accent); font-size: .66rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; }
```
- When a card is stretched to 650px height, the visual takes 230px.
- The body takes the remaining `420px`.
- The actual text content (meta, title, description, tags, link) only occupies ~150px.
- `margin-top: auto` pushes `.project-card__action` to the very bottom, creating a gaping vertical void of ~270px inside the card.

#### 4. Disproportionate Typography
- `.work-section__heading h2`: `clamp(3.8rem, 7.6vw, 8rem)` (reaches ~110px height on 1440px desktop).
- `.project-card h3`: `clamp(2.2rem, 3.7vw, 4.6rem)` (reaches ~53px font size inside the card).
- `.section-kicker`: `min-height: 68px;` (takes up vertical space before cards start).

#### 5. Achilles Artwork Clipping & Asymmetry
In `src/styles/home.css` (lines 86-94):
- `.agent-art__radar` is hardcoded to `width: 230px; height: 230px;`.
- When viewport height is smaller (e.g. 768p or 900p, where `22vh` = 169px to 198px), the 230px circle overflows the visual container and gets clipped at top and bottom.
- Card 2 width is only `0.78fr` (~420px) while Card 1 is `1.42fr` (~780px), creating asymmetrical visual weight.

#### 6. Mobile Bloat
In `src/styles/responsive.css` (line 88):
```css
@media (max-width: 760px) {
  .project-card__visual, .project-card--2 .project-card__visual { min-height: 290px; }
}
```
On mobile devices (e.g. 390px viewport width), `min-height: 290px` forces the visual container to take nearly 50% of the screen height. Combined with card body content, each card exceeds 580px in height, demanding excessive scrolling.

#### 7. Archive Page Oversizing (`ProjectsPage.tsx` & `pages.css`)
- `.gallery-grid button.is-wide`: `min-height: 550px;` (line 17 of `pages.css`). Full-width container with 550px height crops 16:10 screenshots severely.
- `.gallery-grid button`: `min-height: 360px;` (line 16).
- `.gallery-grid button span`: dark overlay covering bottom 50px of every screenshot.
- `.independent-grid a`: `min-height: 360px; padding: 30px;` (line 23) for cards with only 3 short lines of text.

---

## 2. Logic Chain

1. **Premise 1**: The user explicitly requested:
   - "tornando os cards, elementos e espaçamentos compactos"
   - "reduzindo a altura excessiva e as dimensões dos cards, mantendo layout limpo e proporcional"
   - "garantindo a exibição adequada das imagens dos projetos com proporção controlada, ajuste adequado (object-fit) e sem distorções, cortes indesejados ou falhas de carregamento"
2. **Deduction from Observations 1.2 and 1.3**:
   - The root cause of the oversized appearance is the combination of forced viewport fill (`height: 100svh; overflow: hidden;` + `flex: 1; align-items: stretch;`) and oversized typography (`clamp(3.8rem, 7.6vw, 8rem)` on heading, `clamp(2.2rem, 3.7vw, 4.6rem)` on card h3).
   - The root cause of image distortion/cropping is the mismatch between the screenshot's native 16:10 aspect ratio and the container's 3.39:1 letterbox constraint, magnified by `object-fit: cover` and default center positioning.
3. **Synthesis & Architectural Resolution**:
   - To make the section compact without breaking layout on diverse displays, `.work-section` must either:
     - Constrain cards to a compact, bounded height (`max-height: 440px - 480px`) with balanced columns (`1fr 1fr` or `1.15fr 0.85fr`), OR
     - Allow `.work-section` to have compact vertical padding (`padding: clamp(32px, 5vh, 64px) 0;`) while maintaining clean viewport alignment.
   - To display images crisply and without distortion:
     - `.project-card__visual` must adopt a controlled aspect ratio aligned with 16:10 (or 16:9), e.g. `aspect-ratio: 16 / 10; max-height: 240px;`.
     - `object-fit: cover; object-position: top center;` or `object-fit: contain;` must be used so that navigation and key dashboard elements remain visible and in-focus.
     - Achilles artwork radar must be scaled from 230px down to ~160px to prevent clipping in compact heights.
   - To eliminate mobile bloat:
     - Remove `min-height: 290px` on mobile, replacing it with `aspect-ratio: 16 / 10; width: 100%;`.

---

## 3. Caveats

1. **Test Suite Invariants**:
   - `src/test/rendering.test.tsx` tests the presence of texts `Autocom3`, `Achilles`, `PROJETOS`, `AUTOCOM3`, `Achilles CDP Agent`, `Organon`. Any changes to component markup must preserve these textual labels.
   - `src/test/contracts.test.ts` validates that asset paths in `content/projectsContent.json` exist in `public/`. Data paths must not be broken or altered without corresponding file changes.
2. **Achilles Artwork Nature**:
   - Achilles is an SVG/CSS geometric visual representation rather than a raster screenshot. Any changes to Card 1 visual height must ensure Achilles radar art scales proportionally so both cards have matching heights.
3. **No Code Written**:
   - As an explorer agent in read-only mode, no codebase source files have been edited. All proposed changes are strictly analytical recommendations for the planner and implementer.

---

## 4. Conclusion & Concrete Recommendations

### Summary of Actionable Changes

#### A. Homepage `SelectedProjectsSection` & `src/styles/home.css`
1. **Balance & Compact the Showcase Grid**:
   - Replace `grid-template-columns: 1.42fr .78fr;` with `grid-template-columns: repeat(2, 1fr);` (or `1.15fr 0.85fr;`).
   - Add `max-height: 460px;` (or `align-items: start;`) on `.project-showcase` so cards do not stretch into giant vertical boxes.
2. **Proper Image Aspect Ratio & Sharp Framing**:
   - Set `.project-card__visual` to `aspect-ratio: 16 / 10; max-height: 230px; width: 100%; overflow: hidden; background: #0c0e14;`.
   - Set `.project-card__visual img` to `width: 100%; height: 100%; object-fit: cover; object-position: top center;`.
   - In `SelectedProjectsSection.tsx`, add `loading="eager"` (for first card) and `decoding="async"`, and update `sizes` to `sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"`.
3. **Compact Card Typography & Spacings**:
   - Reduce `.work-section__heading h2` from `clamp(3.8rem, 7.6vw, 8rem)` to `clamp(2.4rem, 4.5vw, 4.2rem); line-height: 0.9;`.
   - Reduce `.project-card h3` from `clamp(2.2rem, 3.7vw, 4.6rem)` to `clamp(1.5rem, 2.2vw, 2.4rem); line-height: 1.05;`.
   - Reduce `.project-card p` to `font-size: 0.88rem; line-height: 1.45; margin-top: 6px;`.
   - Reduce `.project-card__body` padding to `clamp(12px, 1.6vh, 18px);`.
   - Reduce `.project-card__index` from `44px x 44px` to `34px x 34px`.
4. **Scale Achilles Artwork (`.agent-art`)**:
   - `.agent-art__radar`: change to `width: 160px; height: 160px;`.
   - `.agent-art__core`: change to `width: 58px; height: 58px; font-size: 2rem;`.
   - Position `.agent-art > p` and `.agent-art__steps` with compact offsets (e.g. `14px`).

#### B. Responsive Styles (`src/styles/responsive.css`)
1. **Remove Mobile Height Bloat**:
   - Delete `.project-card__visual, .project-card--2 .project-card__visual { min-height: 290px; }`.
   - Replace with `aspect-ratio: 16 / 10; height: auto; max-height: 220px;`.
2. **Clean Breakpoint Hierarchy**:
   - On tablet (`max-width: 1080px`), keep cards stacked with `grid-template-columns: 1fr; gap: 16px;`.
   - Remove messy `display: contents;` hack on `.project-card--2 > a`.

#### C. Archive Page (`ProjectsPage.tsx` & `src/styles/pages.css`)
1. **Gallery Grid (`.gallery-grid`)**:
   - Remove `min-height: 550px;` from `.gallery-grid button.is-wide`. Use `aspect-ratio: 16 / 9; max-height: 380px;`.
   - Remove `min-height: 360px;` from `.gallery-grid button`. Use `aspect-ratio: 16 / 10; max-height: 260px;`.
   - Set `.gallery-grid img` to `object-fit: cover; object-position: top center;`.
   - Adjust caption overlay to a compact bottom pill rather than a full-width dark block.
2. **Independent Grid (`.independent-grid`)**:
   - Reduce `min-height: 360px; padding: 30px;` to `min-height: 220px; padding: 20px;`.
   - Reduce `h3` from `clamp(2rem, 3.6vw, 4rem)` to `clamp(1.4rem, 2vw, 2.2rem)`.
   - Reduce `margin-top: 35px;` to `margin-top: 14px;`.

---

## 5. Verification Method

To verify the implementation independently once code changes are made:
1. **Automated Test Suite**:
   ```powershell
   npm run test
   ```
   Must pass with 0 failures across `contracts.test.ts`, `rendering.test.tsx`, and `section2-layout-stress.test.tsx`.
2. **Production Build**:
   ```powershell
   npm run build
   ```
   Must compile with 0 TypeScript or Vite bundling errors.
3. **Visual & Dimensional Inspection**:
   - Inspect `.project-card` computed height in DevTools at 1920x1080, 1440x900, 1024x768, and 390x844 viewports. Verify card height does not exceed 480px on desktop and 360px on mobile.
   - Inspect the image inside `.project-card__visual`. Verify that top navigation bar and dashboard headers in `01-painel-operacoes-visao-geral.png` are visible, with no blur, distortion, or 50%+ horizontal letterbox cutoffs.
   - Check Achilles radar circle is fully contained within the visual boundary with no clipping.
