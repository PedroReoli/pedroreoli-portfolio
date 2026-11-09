# Full Viewport & Compact Section Layout Analysis (Requirement R1)

**Agent**: `explorer_survey_2` (Teamwork Explorer)  
**Date**: 2026-11-02  
**Working Directory**: `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\explorer_survey_2\`  
**Target File**: `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\explorer_survey_2\analysis.md`

---

## 1. Executive Summary & Scope

This investigation establishes the architectural and CSS layout blueprint to satisfy **Requirement R1 (Full Viewport & Compact Section Layout)**:
1. **Full Viewport Occupancy**: Every section across the portfolio must occupy 100% of the available viewport height (`100svh` / `100vh`) across display sizes.
2. **Desktop Viewport Fit Without Scrolling**: On desktop displays (standard 1080p and 1440p), each section must fit within the screen without vertical scrolling, with the **explicit exception of the Experience (Trajetória) section**.
3. **Typography Invariance Constraint**: Content font sizes across headings, titles, subheadings, labels, and body text must **NOT be decreased**. Compactness must be achieved strictly through tighter padding, margins, gap reduction, and component positioning.
4. **Header and Viewport Offset**: Fixed header offset (`72px`) and viewport units (`svh` vs `vh`) must be accounted for cleanly across dark and light sections.

---

## 2. Comprehensive Portfolio Section Mapping

The portfolio flow consists of **7 primary sections** on the home page, plus secondary pages. All styling is authored in standard modular CSS in `src/styles/` (`base.css`, `layout.css`, `home.css`, `pages.css`, `responsive.css`) imported into `src/index.css`. The project does **not** use Tailwind CSS.

### Primary Portfolio Sections (HomePage & Shell)

| Section # | Section Name | Component File Path | DOM Element & ID | Background / Theme | Current CSS Classes |
|---|---|---|---|---|---|
| **01** | **Hero** | `src/components/home/HeroSection.tsx` | `<section id="hero">` | Dark (`var(--night)` `#090a0d`) | `.hero`, `.hero__shell`, `.hero__meta`, `.hero__content`, `.hero__copy`, `.hero__visual`, `.hero__scroll` |
| **02** | **About (Sobre mim)** | `src/components/home/AboutSection.tsx` | `<section id="sobre">` | Light Paper (`var(--paper)` `#f3efe7`) | `.about`, `.section-light`, `.section-kicker`, `.about__grid`, `.about__portrait`, `.about__copy`, `.stats-grid` |
| **03** | **Selected Projects** | `src/components/home/SelectedProjectsSection.tsx` | `<section id="projetos-selecionados">` | Dark (`var(--night)`) | `.work-section`, `.section-dark`, `.section-kicker--dark`, `.work-section__heading`, `.project-showcase`, `.project-card` |
| **04** | **Stack (Tecnologias)** | `src/components/home/StackSection.tsx` | `<section id="stack">` | Light Paper (`var(--paper)`) | `.stack-section`, `.section-light`, `.section-kicker`, `.stack-section__intro`, `.stack-grid`, `.stack-icon` |
| **05** | **Purpose (Propósito)** | `src/components/home/PurposeSection.tsx` | `<section id="proposito">` | Accent (`var(--accent)`) | `.purpose-section`, `.section-kicker--accent`, `.purpose-section__grid`, `.purpose-section__copy` |
| **06** | **Experience (Trajetória)** | `src/components/home/ExperienceSection.tsx` | `<section id="experiencia">` | Dark (`var(--night)`) | `.experience-section`, `.section-dark`, `.section-kicker--dark`, `.experience-section__layout`, `.timeline` |
| **07** | **Contact / Footer** | `src/components/layout/Footer.tsx` | `<footer id="contato">` | Dark (`var(--night)`) | `.contact-section`, `.section-kicker--dark`, `.contact-section__main`, `.contact-grid`, `.contact-section__bottom` |

### Secondary Pages (For Architecture Completeness)

| Page | File Path | Route | Main Container |
|---|---|---|---|
| **Projects Archive** | `src/pages/ProjectsPage.tsx` | `/projetos` | `.archive-page`, `.archive-hero`, `.project-archive` |
| **Media & Notes** | `src/pages/MediaPage.tsx` | `/midia-blog` | `.archive-page--media`, `.archive-hero`, `.media-feature`, `.notes-section` |
| **Not Found** | `src/pages/NotFoundPage.tsx` | `/404` | `.not-found` (already `min-height: 100svh; display: grid; place-items: center;`) |

---

## 3. Height, Header Offset & Viewport Mechanics (Item 2 & 6)

### Fixed Header Mechanics
- **Header Component**: `src/components/layout/Header.tsx` (`<header className="site-header">`).
- **Styling**: `position: fixed; z-index: 100; top: 0; left: 0; width: 100%; min-height: 72px; background: rgba(7,11,20,.76); backdrop-filter: blur(18px); border-bottom: 1px solid var(--line-dark);`.
- **Height Token**: Exactly `72px` (header inner has `min-height: 72px;`, nav links have `padding: 26px 0;`).

### Viewport Height Units: `100svh` vs `100vh`
- `100vh` on mobile browsers ignores browser chrome (address bar / navigation bar), causing content clipping.
- `100svh` (Small Viewport Height) uses the smallest possible viewport height, ensuring no content is clipped when browser chrome is present.
- **Rule**: Authors must use both for compatibility:
  ```css
  min-height: 100vh;
  min-height: 100svh;
  height: 100vh;
  height: 100svh;
  ```

### Header Offset Strategy
- Backgrounds must bleed under the header (frosted glass effect over light paper or dark night).
- Therefore, sections must have `padding-top: var(--header-height, 72px); box-sizing: border-box;`.
- Inner content (`.shell`) occupies `calc(100svh - 72px)` on desktop.
- `scroll-margin-top: 0;` (or removal of the previous `scroll-margin-top: 72px`) ensures that anchor links (`#sobre`, `#projetos-selecionados`, `#stack`, `#proposito`, `#experiencia`, `#contato`) snap cleanly to the section boundary with the header sitting over the section's top padding.

---

## 4. Typography Audit: Preservation of Existing Font Sizes (Constraint 5)

**CRITICAL RULE**: No font size will be reduced. Compactness is strictly achieved through padding, margins, gap reduction, and component positioning.

The following table documents every text element in the portfolio:

| Scope | Element / Selector | Current Font Size | Current Line-Height | Weight / Style | Action |
|---|---|---|---|---|---|
| **Global** | `body` | `1rem` (16px) | Normal | 400 | Preserved |
| **Global** | `.overline` | `0.72rem` (11.52px) | Normal (`.16em` space) | 700, Uppercase | Preserved |
| **Global** | `.section-kicker` | `0.68rem` (10.88px) | Normal (`.14em` space) | 700, Uppercase | Preserved |
| **Global** | `.text-link` | `0.74rem` (11.84px) | Normal (`.12em` space) | 700, Uppercase | Preserved |
| **Header** | `.brand__mark` | `0.72rem` | Normal | 700 | Preserved |
| **Header** | `.brand__name` | `0.86rem` | `.1em` space | 700, Uppercase | Preserved |
| **Header** | `.desktop-nav a` | `0.7rem` | `.12em` space | 700, Uppercase | Preserved |
| **Header** | `.language-switch` | `0.66rem` | Normal | 400 / 700 | Preserved |
| **Header** | `.header-contact` | `0.68rem` | `.1em` space | 700, Uppercase | Preserved |
| **Hero** | `.hero__role` | `0.68rem` | `.16em` space | 700, Uppercase | Preserved |
| **Hero** | `.hero h1` | `clamp(4.8rem, 10vw, 10.8rem)` | `0.76` | 700 / 400 Italic | Preserved |
| **Hero** | `.hero__statement` | `clamp(1rem, 1.45vw, 1.3rem)` | `1.48` | 400 | Preserved |
| **Hero** | `.hero__cta` | `0.7rem` | `.12em` space | 700, Uppercase | Preserved |
| **Hero** | `.hero__scroll` | `0.65rem` | `.12em` space | 700, Uppercase | Preserved |
| **About** | `.about__portrait div` | `0.66rem` | `.1em` space | 400 / 700 | Preserved |
| **About** | `.about__copy h2` | `clamp(2.25rem, 4.4vw, 4.8rem)` | `1.02` | 700 | Preserved |
| **About** | `.stats-grid strong` | `clamp(2.35rem, 4vw, 4rem)` | Normal (`-.06em` space) | 700 | Preserved |
| **About** | `.stats-grid span` | `0.64rem` | `1.35` | 700, Uppercase | Preserved |
| **Projects** | `.work-section__heading h2` | `clamp(3.8rem, 7.6vw, 8rem)` | `0.82` | 700 | Preserved |
| **Projects** | `.work-section__heading a` | `0.68rem` | `.12em` space | 700, Uppercase | Preserved |
| **Projects** | `.project-card__index` | `0.7rem` | Normal | 700 | Preserved |
| **Projects** | `.project-card__meta` | `0.63rem` | `.1em` space | 700, Uppercase | Preserved |
| **Projects** | `.project-card h3` | `clamp(2.2rem, 3.7vw, 4.6rem)` | `0.9` | 700 | Preserved |
| **Projects** | `.project-card p` | `1rem` (16px) | `1.5` | 400 | Preserved |
| **Projects** | `.project-card__technologies` | `0.64rem` | `.08em` space | 700, Uppercase | Preserved |
| **Projects** | `.project-card__action` | `0.66rem` | `.1em` space | 700, Uppercase | Preserved |
| **Stack** | `.stack-section__intro h2` | `clamp(3.8rem, 7.6vw, 8rem)` | `0.82` | 700 | Preserved |
| **Stack** | `.stack-section__intro p` | `1.02rem` | `1.5` | 400 | Preserved |
| **Stack** | `.stack-grid header span` | `0.64rem` | Normal | 700 | Preserved |
| **Stack** | `.stack-grid h3` | `0.68rem` | `.13em` space | 700, Uppercase | Preserved |
| **Stack** | `.stack-grid li strong` | `0.69rem` | `1.2` | 700 | Preserved |
| **Purpose** | `.purpose-section__copy h2` | `clamp(3.4rem, 6.3vw, 6.8rem)` | `0.84` | 700 | Preserved |
| **Purpose** | `.purpose-section__copy p` | `1.02rem` | `1.5` | 400 | Preserved |
| **Purpose** | `.purpose-section__copy a` | `0.68rem` | `.1em` space | 700, Uppercase | Preserved |
| **Purpose** | `figcaption` | `0.62rem` | `.1em` space | 700, Uppercase | Preserved |
| **Experience** | `.experience-section__heading h2` | `clamp(3.4rem, 6.2vw, 7.2rem)` | `0.82` | 700 | Preserved |
| **Experience** | `.experience-section__heading p` | `0.66rem` | `.12em` space | 700, Uppercase | Preserved |
| **Experience** | `.timeline__meta` | `0.62rem` | `.09em` space | 700, Uppercase | Preserved |
| **Experience** | `.timeline h3` | `clamp(1.8rem, 2.8vw, 3.2rem)` | `0.95` | 700 | Preserved |
| **Experience** | `.timeline h4` | `0.68rem` | `1.4` | 700, Uppercase | Preserved |
| **Experience** | `.timeline article > p` | `1rem` (16px) | `1.5` | 400 | Preserved |
| **Experience** | `.timeline__tech` | `0.62rem` | `1.55` | 700, Uppercase | Preserved |
| **Contact** | `.contact-section__prompt` | `0.72rem` | `.15em` space | 700, Uppercase | Preserved |
| **Contact** | `.contact-section__headline` | `clamp(4rem, 11.5vw, 11rem)` | `0.8` | 700 | Preserved |
| **Contact** | `.contact-section__description` | `clamp(1.1rem, 2vw, 1.5rem)` | `1.5` | 400 | Preserved |
| **Contact** | `.contact-grid span` | `0.68rem` | `.1em` space | Uppercase | Preserved |
| **Contact** | `.contact-grid strong` | `1.7rem` | Normal | 700, Uppercase | Preserved |
| **Contact** | `.contact-section__bottom` | `0.72rem` | `.08em` space | Uppercase | Preserved |

---

## 5. Desktop Viewport Fit Analysis (1080p & 1440p) (Item 3)

### Display Benchmarks
- **1080p Desktop**: 1920 × 1080 display. Accounting for browser chrome (tab strip, address bar, OS taskbar), usable viewport height is **~940px to 980px** (worst case: 900px).
- **1440p Desktop (QHD)**: 2560 × 1440 display. Usable viewport height is **~1300px to 1340px**.

### Height Budget & Fit Matrix (Usable 940px Viewport)

| Section | Header Offset | Kicker | Main Content Block | Bottom Spacing | Total Rendered Height | 1080p Fit (940px) | 1440p Fit (1300px) |
|---|---|---|---|---|---|---|---|
| **01. Hero** | 72px | 0px (meta removed) | ~340px (Centered Name, Statement, CTA) | 48px (Scroll link) | **~460px** | ✅ Fits (480px headroom) | ✅ Fits (840px headroom) |
| **02. About** | 72px | 48px | ~360px (Portrait 300px + Copy) | 110px (Stats) + 20px | **~610px** | ✅ Fits (330px headroom) | ✅ Fits (690px headroom) |
| **03. Selected Projects** | 72px | 48px | ~90px (Heading) + ~460px (Cards) | 24px pad | **~694px** | ✅ Fits (246px headroom) | ✅ Fits (606px headroom) |
| **04. Stack** | 72px | 48px | ~80px (Intro) + ~340px (4×6 cards) | 20px pad | **~560px** | ✅ Fits (380px headroom) | ✅ Fits (740px headroom) |
| **05. Purpose** | 72px | 48px | ~420px (Grid + Figure) | 24px pad | **~564px** | ✅ Fits (376px headroom) | ✅ Fits (736px headroom) |
| **06. Experience** | 72px | 48px | Multi-item story chapters | Natural scroll | **Natural Scroll** | ✅ **EXPLICIT EXCEPTION** | ✅ **EXPLICIT EXCEPTION** |
| **07. Contact** | 72px | 48px | ~280px (Headline + Desc) | 90px (Grid) + 36px bottom | **~526px** | ✅ Fits (414px headroom) | ✅ Fits (774px headroom) |

**Conclusion**: On desktop displays (1080p and 1440p), every single section (except Experience) fits within the screen without vertical scrolling, with large headroom margins ranging from 246px to 480px.

---

## 6. Section-by-Section Spacing, Layout & Compactness Blueprint (Item 4)

### 01. Hero Section (`HeroSection.tsx`)
- **Current State**:
  - `.hero`: `min-height: 96svh; padding-top: 72px;`
  - `.hero__meta`: `min-height: 52px;` (contains "PORTFÓLIO / 01", availability dot, location).
  - `.hero__content`: 2-column grid (`1.06fr .94fr`) with 3D canvas visual taking `min(58vh, 510px)`.
- **Modifications Required**:
  - `height: 100svh; min-height: 100svh; padding-top: 72px;`
  - Completely remove `.hero__meta` (per R2).
  - Completely remove `.hero__visual` / `HeroScene` (per R2).
  - Center hero content:
    ```css
    .hero__content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      flex: 1;
      padding: clamp(16px, 3vh, 36px) 0;
    }
    .hero__copy {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      max-width: 960px;
    }
    .hero__statement {
      margin-inline: auto;
      text-align: center;
    }
    ```
  - `.hero__scroll`: Stays anchored at the bottom of `.hero__shell` with `margin-top: auto;`.

### 02. About Section (`AboutSection.tsx`)
- **Current State**:
  - Exorbitant padding: `.about__grid` has `padding: clamp(52px,6vw,80px) 0;`.
  - Portrait max-height: `500px`.
  - Section bottom padding: `clamp(56px,7vw,88px)`.
  - Stats grid: `min-height: 118px; padding: 20px;`.
  - Total height: ~946px + 72px = 1018px (overflows 1080p!).
- **Modifications Required**:
  - `.about`: `height: 100svh; min-height: 100svh; padding-top: 72px; padding-bottom: 0; display: flex; flex-direction: column; overflow: hidden;`
  - `.about > .shell`: `flex: 1; display: flex; flex-direction: column; justify-content: space-between; padding-bottom: clamp(14px, 2vh, 24px); min-height: 0;`
  - `.section-kicker`: `min-height: 48px;` (was 68px).
  - `.about__grid`: `padding: clamp(10px, 1.8vh, 20px) 0; flex: 1; align-items: center;`
  - `.about__portrait`: Constrain `max-height: clamp(240px, 30vh, 320px);` (preserves aspect-ratio and `object-fit: cover`).
  - `.about__copy h2`: Margin reduced from `22px 0 32px` to `clamp(8px, 1.2vh, 14px) 0 clamp(10px, 1.5vh, 18px);`.
  - `.stats-grid`: Padding reduced to `clamp(10px, 1.2vh, 16px) 16px; min-height: auto;`.

### 03. Selected Projects Section (`SelectedProjectsSection.tsx`)
- **Current State**:
  - Heading has `padding: clamp(50px,6vw,78px) 0 42px;`.
  - Card visual has `min-height: 360px` and `300px`.
  - Card body has `padding: 24px;`.
  - Section padding-bottom: `clamp(56px,7vw,88px)`.
  - Total height: ~936px + 72px = 1008px (overflows 1080p!).
- **Modifications Required**:
  - `.work-section`: `height: 100svh; min-height: 100svh; padding-top: 72px; padding-bottom: 0; display: flex; flex-direction: column; overflow: hidden;`
  - `.work-section > .shell`: `flex: 1; display: flex; flex-direction: column; justify-content: space-between; padding-bottom: clamp(14px, 2vh, 24px); min-height: 0;`
  - `.section-kicker`: `min-height: 48px;`
  - `.work-section__heading`: `padding: clamp(8px, 1.2vh, 16px) 0 clamp(8px, 1.2vh, 14px);`
  - `.project-showcase`: `flex: 1; min-height: 0; align-items: stretch;`
  - `.project-card__visual`: Change fixed `min-height: 360px` to `height: clamp(160px, 22vh, 230px); min-height: 0;`
  - `.project-card__body`: `padding: clamp(12px, 1.5vh, 18px);`
  - Margins inside card body: `h3` `margin-top: 6px;`, `p` `margin-top: 4px;`, `.project-card__action` `padding-top: 10px;`.
  - Clamping: Add `-webkit-line-clamp: 2; display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden;` to `.project-card p` to prevent text expansion from clipping cards on shorter viewports.

### 04. Stack Section (`StackSection.tsx`)
- **Current State**:
  - 4 categories, each with 6 tools.
  - `li`: `min-height: 60px; padding: 10px; gap: 10px; list gap: 7px;`.
  - 6 items take ~400px.
  - Intro padding: `clamp(50px,6vw,76px) 0 40px`.
  - Section bottom padding: `clamp(56px,7vw,88px)`.
  - Total height: ~878px (near limit on 1080p).
- **Modifications Required**:
  - `.stack-section`: `height: 100svh; min-height: 100svh; padding-top: 72px; padding-bottom: 0; display: flex; flex-direction: column; overflow: hidden;`
  - `.stack-section > .shell`: `flex: 1; display: flex; flex-direction: column; justify-content: space-between; padding-bottom: clamp(14px, 2vh, 24px); min-height: 0;`
  - `.section-kicker`: `min-height: 48px;`
  - `.stack-section__intro`: `padding: clamp(8px, 1.2vh, 16px) 0 clamp(8px, 1.2vh, 14px);`
  - `.stack-grid`: `flex: 1; min-height: 0;`
  - `.stack-grid article`: `padding: clamp(10px, 1.4vh, 16px);`
  - `.stack-grid header`: `margin-bottom: clamp(6px, 1vh, 10px);`
  - `.stack-grid ul`: `gap: clamp(4px, 0.5vh, 6px);`
  - `.stack-grid li`: `min-height: clamp(38px, 4.5vh, 44px); padding: 4px 8px; gap: 8px;`
  - `.stack-icon`: `width: 28px; height: 28px; flex: 0 0 28px;`
  - Tool label `li strong` remains `font-size: .69rem;` intact!

### 05. Purpose Section (`PurposeSection.tsx`)
- **Current State**:
  - Grid padding-top: `clamp(48px,5.5vw,72px)`.
  - Section padding-bottom: `clamp(52px,6vw,82px)`.
  - Total height: ~780px.
- **Modifications Required**:
  - `.purpose-section`: `height: 100svh; min-height: 100svh; padding-top: 72px; padding-bottom: 0; display: flex; flex-direction: column; overflow: hidden;`
  - `.purpose-section > .shell`: `flex: 1; display: flex; flex-direction: column; justify-content: space-between; padding-bottom: clamp(14px, 2vh, 24px); min-height: 0;`
  - `.section-kicker`: `min-height: 48px;`
  - `.purpose-section__grid`: `flex: 1; align-items: center; padding-top: clamp(8px, 1.5vh, 18px);`
  - Image max-height constrained: `figure img { max-height: clamp(240px, 36vh, 380px); width: 100%; object-fit: cover; }`.
  - Margins tightened: `h2` line-height `.84`, `p` `margin-top: clamp(10px, 1.5vh, 18px);`, `a` `margin-top: clamp(12px, 1.8vh, 20px);`.

### 06. Experience Section (`ExperienceSection.tsx`) — Explicit Exception
- **Requirement Constraint**:
  - Must occupy `100% viewport height` (`min-height: 100svh`).
  - **Explicit exception to the no-vertical-scrolling rule**: May scroll vertically to present chronological storytelling (R4).
- **Modifications Required**:
  - `.experience-section`: `min-height: 100svh; padding-top: 72px; padding-bottom: clamp(40px, 5vh, 72px); box-sizing: border-box;`
  - `.section-kicker`: `min-height: 48px;`
  - `.experience-section__layout`: `padding-top: clamp(16px, 2.5vh, 32px);`
  - No `overflow: hidden` and no fixed height; natural vertical expansion.

### 07. Contact / Footer Section (`Footer.tsx`)
- **Current State**:
  - `.contact-section`: `padding: 50px 0 30px;`
  - `.contact-section__main`: `padding: clamp(54px, 7vw, 86px) 0 54px;`
  - `.contact-grid`: `min-height: 122px;`
  - Total height: ~792px.
- **Modifications Required**:
  - `.contact-section`: `height: 100svh; min-height: 100svh; padding-top: 72px; padding-bottom: 0; display: flex; flex-direction: column; overflow: hidden;`
  - `.contact-section > .shell`: `flex: 1; display: flex; flex-direction: column; justify-content: space-between; padding-bottom: clamp(14px, 2vh, 24px); min-height: 0;`
  - `.section-kicker`: `min-height: 48px;`
  - `.contact-section__main`: `padding: clamp(16px, 2.5vh, 32px) 0 clamp(12px, 2vh, 20px);`
  - `.contact-section__prompt`: `margin-bottom: clamp(8px, 1.2vh, 14px);`
  - `.contact-section__description`: `margin-top: clamp(12px, 1.8vh, 22px);`
  - `.contact-grid a`: `min-height: clamp(76px, 9vh, 96px); padding: clamp(12px, 1.5vh, 18px);`
  - `.contact-section__bottom`: `padding-top: clamp(10px, 1.5vh, 18px);`

---

## 7. Responsiveness & Mobile Safeguards

On screens `<= 1100px` (tablets and mobile devices in portrait orientation):
- Elements stack in single or two columns.
- Forcing `height: 100svh; overflow: hidden;` on narrow mobile screens would risk truncating content.
- **Safe Responsive Implementation**:
  - Desktop (`@media (min-width: 1101px)`): Apply strict `height: 100svh; overflow: hidden;` (except Experience).
  - Mobile & Tablet (`@media (max-width: 1100px)`): Sections have `min-height: 100svh; height: auto; overflow: visible;`, maintaining full viewport presence on entry while allowing touch scrolling when content naturally stacks.

---

## 8. Summary of Implementation Recommendations

1. **CSS Root Variable**:
   In `src/styles/base.css`, define:
   ```css
   :root {
     --header-height: 72px;
   }
   ```
2. **Scroll Margin Update**:
   Update `section, footer { scroll-margin-top: 0; }` or remove offset since section `padding-top: 72px` already aligns content beneath the header.
3. **Hero Cleanup (R2 dependency)**:
   - In `HeroSection.tsx`, remove `.hero__meta` and `.hero__visual`.
   - In `home.css`, style `.hero__content` with flex centering.
4. **Section Heights**:
   Apply full viewport flex shells across `.about`, `.work-section`, `.stack-section`, `.purpose-section`, and `.contact-section`.
5. **No Font Reduction**:
   Verify every heading, subtitle, kicker, and body font size remains unchanged.
