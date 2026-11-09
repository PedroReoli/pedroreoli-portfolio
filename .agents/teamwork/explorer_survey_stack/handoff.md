# Handoff Report: Survey of "Minha Stack" (Skills / Technologies) Section

**Agent**: `explorer_survey_stack` (teamwork explorer)  
**Date**: 2026-11-02T18:50:00Z  
**Scope**: Codebase survey, architectural breakdown, dimension metrics, and actionable recommendations for compacting cards, badges, chips, icons, and organizing technologies into a clean, dense category grid for the "Minha Stack" section.

---

## 1. Observation

Direct code observations from the repository:

### 1.1 Affected Files and Roles
- **Component**: `src/components/home/StackSection.tsx` (Lines 1–43) — Renders the section header, kicker, and 4 category cards with motion list items.
- **Data Source (Technologies)**: `content/technologyContent.json` (Lines 1–53) — Defines 4 technology groups (`01 Interfaces`, `02 Back-end`, `03 Cloud & apps`, `04 IA & APIs`), each containing 6 tools (24 tools total) with `name`, `icon`, `color`, and `source`.
- **Data Source (Interface Copy)**: `content/interfaceContent.json` (Lines 167–173) — Defines `id: "stack"`, `sectionNumber: "04"`, `titleAccent: "STACK."`, and localized titles/eyebrows/descriptions.
- **Type Definitions**: `src/types/content.ts` (Lines 505–514) — Interfaces `TechnologyGroup`, `TechnologyTool`, and `TechnologyContent`.
- **Icon Rendering System**: `src/components/common/Icon.tsx` (Lines 309–368) — Receives `name`, `size`, `image`, `color`, rendering SimpleIcons SVG or custom SVG.
- **Primary Styling**: `src/styles/home.css` (Lines 19, 69–70, 95–108) — Section container, intro heading, grid, cards, list items, icons, and typography.
- **Responsive Overrides**: `src/styles/responsive.css` (Lines 1–18, 20–31, 49, 89–91, 120–122) — Desktop 100svh constraints, tablet 2-column grid, mobile 1-column category with 2-column item grid, and small mobile rules.
- **Global Theme & Base Tokens**: `src/styles/base.css` (Lines 14–18, 48, 52–54) — Radius tokens (`--radius-xs: 8px`, `--radius-sm: 12px`, `--radius-md: 18px`, `--radius-lg: 26px`), `.section-light`, `.section-kicker`.
- **Test Contracts**: `src/test/contracts.test.ts` (Lines 25–36, 111–117, 158–166) and `src/test/rendering.test.tsx` (Lines 46–51).

---

### 1.2 Current DOM & Component Structure
From `src/components/home/StackSection.tsx`:
```tsx
16: <section ref={sectionRef} id={section.id} className="stack-section section-light">
17:   <div className="shell">
18:     <div className="section-kicker" data-reveal>
19:       <span>{section.sectionNumber}</span><p>{copy.eyebrow}</p><p>{technologyContent.groups.length.toString().padStart(2, '0')}</p>
20:     </div>
21:     <div className="stack-section__intro" data-reveal>
22:       <h2>{copy.title}<em>{section.titleAccent}</em></h2><p>{copy.description}</p>
23:     </div>
24:     <div className="stack-grid" aria-label={copy.ariaLabel}>
25:       {technologyContent.groups.map((group) => (
26:         <article key={group.number} data-reveal>
27:           <header><span>{group.number}</span><h3>{group.title[language]}</h3></header>
28:           <ul>
29:             {group.tools.map((tool) => (
30:               <m.li key={tool.name} whileHover={{ y: -3 }} transition={{ duration: 0.18 }}>
31:                 <span className="stack-icon"><Icon name={tool.icon} image={tool.image} size={22} /></span>
32:                 <strong>{tool.name}</strong>
33:               </m.li>
34:             ))}
35:           </ul>
36:         </article>
37:       ))}
38:     </div>
39:   </div>
40: </section>
```

---

### 1.3 Current CSS Dimension Measurements
From `src/styles/home.css` and `src/styles/responsive.css`:

1. **Section Outer Envelope**:
   - `src/styles/home.css:95`:
     ```css
     .stack-section { position: relative; height: 100svh; min-height: 100svh; padding-top: var(--header-height, 72px); padding-bottom: 0; display: flex; flex-direction: column; overflow: hidden; }
     ```
   - `src/styles/responsive.css:1-10`:
     Locked to `height: 100svh; min-height: 100svh; overflow: hidden;` on `@media (min-width: 1101px)`.
   - `src/styles/home.css:96`:
     ```css
     .stack-section > .shell { flex: 1; display: flex; flex-direction: column; justify-content: space-between; padding-bottom: clamp(14px, 2vh, 24px); min-height: 0; }
     ```
     `justify-content: space-between` forces vertical separation, stretching content across the full viewport height.

2. **Heading & Intro Block**:
   - `src/styles/home.css:69-70`:
     ```css
     .work-section__heading h2, .stack-section__intro h2 { font-family: var(--font-display); font-size: clamp(3.8rem,7.6vw,8rem); line-height: .82; letter-spacing: -.07em; text-transform: uppercase; }
     .work-section__heading h2 em, .stack-section__intro h2 em { color: var(--accent); font-family: var(--font-serif); font-weight: 400; }
     ```
   - `src/styles/home.css:97-99`:
     ```css
     .stack-section__intro { display: grid; grid-template-columns: 1fr 360px; align-items: end; gap: clamp(16px, 2vw, 40px); padding: clamp(8px, 1.2vh, 16px) 0 clamp(8px, 1.2vh, 14px); }
     .stack-section__intro h2 em { display:block; }
     .stack-section__intro p { color: var(--ink-soft); font-size: 1.02rem; line-height: 1.5; }
     ```
   - Notice: `h2 em { display: block; }` causes `"MINHA"` and `"STACK."` to break across 2 vertical lines with `clamp(3.8rem, 7.6vw, 8rem)`. At 1440px desktop width, each line is ~109px font size (~180px line box). The header + intro occupies ~240px–280px alone.

3. **Category Card Envelope**:
   - `src/styles/home.css:100-101`:
     ```css
     .stack-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: clamp(8px, 1vw, 12px); flex: 1; min-height: 0; }
     .stack-grid article { padding: clamp(10px, 1.4vh, 16px); border: 1px solid var(--line-light); border-radius: var(--radius-lg); display: flex; flex-direction: column; }
     ```
   - Notice: `--radius-lg` is `26px`. Padding is up to `16px`.
   - `src/styles/responsive.css:121`: On mobile `<= 420px`, `.stack-grid article` has hardcoded `padding: 16px;`.

4. **Category Header**:
   - `src/styles/home.css:102-104`:
     ```css
     .stack-grid header { display: flex; align-items: center; justify-content: space-between; margin-bottom: clamp(6px, 1vh, 10px); }
     .stack-grid header span { color: var(--accent); font-size: .64rem; font-weight: 700; }
     .stack-grid h3 { font-size: .68rem; letter-spacing: .13em; text-transform: uppercase; }
     ```

5. **Tool Items & Chips**:
   - `src/styles/home.css:105-108`:
     ```css
     .stack-grid ul { display: grid; gap: clamp(4px, 0.5vh, 6px); list-style: none; flex: 1; }
     .stack-grid li { display: flex; min-width: 0; min-height: clamp(38px, 4.5vh, 44px); align-items: center; gap: 8px; padding: 4px 8px; border: 1px solid rgba(24,32,51,.1); border-radius: var(--radius-md); background: var(--paper-light); }
     .stack-icon { display: grid; width: 28px; height: 28px; flex: 0 0 28px; place-items: center; border-radius: var(--radius-sm); background: rgba(251,191,36,.22); color: var(--accent); }
     .stack-grid li strong { min-width: 0; font-size: .69rem; line-height: 1.2; overflow-wrap: anywhere; }
     ```
   - `src/components/home/StackSection.tsx:31`: `<Icon name={tool.icon} image={tool.image} size={22} />`
   - Notice:
     - `min-height: clamp(38px, 4.5vh, 44px)` is very tall for a tool chip with an 11px font (`.69rem`).
     - `border-radius: var(--radius-md)` = `18px`, giving an exaggerated balloon capsule shape.
     - Icon container is `28x28px`, containing an SVG of size `22px` (leaving only 3px margin).
     - 6 items * 44px + 5 * 6px + 30px header + 32px padding = ~356px total card height.

---

## 2. Logic Chain

### Step 1: Vertical Budget Bottleneck in 100svh
- **From 1.3 (1) & 1.3 (2)**: On desktop screens (`min-width: 1101px`), `.stack-section` is locked to `height: 100svh; overflow: hidden;`.
- On a 1366x768 or 1440x900 viewport (effective viewport height after browser chrome: ~650px–720px):
  - Fixed header: 72px
  - Section kicker: 48px
  - Intro title + description: ~200px–240px
  - Shell bottom padding: ~24px
  - Remaining vertical budget: ~660px - 364px = **~296px**.
- **From 1.3 (5)**: The current category card height is **~356px**.
- **Inference**: On viewports with heights ≤ 800px, 356px > 296px. Because `overflow: hidden` is applied, the bottom of the category cards gets clipped, or the flex layout squashes the list items unevenly.

### Step 2: Visual Weight Disproportion (Chip vs Label)
- **From 1.3 (5)**: The label text is `font-size: .69rem` (~11px).
- The container pill has `min-height: 44px` with `border-radius: 18px` and an icon container of `28x28px` with SVG `size={22}`.
- **Inference**: The container is 4x taller than the text it encloses. The heavy pill borders and saturated icon badges create 24 dominant visual blocks that compete with the category headers and overwhelm the page.

### Step 3: Density and Category Grouping
- **From 1.2 & 1.3 (3)**: The 4 categories (`01 Interfaces`, `02 Back-end`, `03 Cloud & apps`, `04 IA & APIs`) contain exactly 6 tools each.
- In desktop, they are arranged as 4 vertical columns with a 1-column list of 6 items.
- If each tool chip is compacted from `min-height: 44px` to `min-height: 30px`, and the card radius/padding tightened:
  - Card height drops from ~356px to **~242px** (a **32% vertical reduction**).
  - Alternatively, if each category card arranges its 6 tools into a 2-column by 3-row micro-grid (`repeat(2, 1fr)`), card height drops to **~145px** (a **59% vertical reduction**).
- **Inference**: Both options completely resolve the 100svh overflow issue, eliminate clipping on all laptop viewports, and deliver the user's requested "grade densa e agrupamento limpo por categoria".

---

## 3. Caveats

1. **Read-only Investigation**: In accordance with explorer role constraints, no source code or CSS files have been modified. All recommendations are presented as exact specifications for implementers.
2. **Approved Palette Contract**: `src/test/contracts.test.ts` (Lines 159–166) strictly enforces that all tools in `technologyContent.json` and interface colors belong to `['#FBBF24', '#B45309', '#78350F', '#182033', '#111010']`. Any styling changes to badges or backgrounds must adhere to this palette.
3. **Motion / GSAP ScrollTrigger Integration**: `StackSection.tsx` uses `useReveal(sectionRef)` with `data-reveal` attributes and Motion `m.li` hover effects (`whileHover={{ y: -3 }}`). If chips become 30px tall, hover offset should be `y: -2` for subtle refinement.
4. **Shared CSS Rules**: Line 69 of `src/styles/home.css` couples `.work-section__heading h2` and `.stack-section__intro h2`. The implementer must ensure changes to `.stack-section__intro h2` do not unintentionally affect `.work-section__heading h2`.

---

## 4. Conclusion & Concrete Recommendations

### 4.1 Comparative Dimensional Specifications

| Element | Current CSS | Recommended Compact CSS | Visual & Layout Benefit |
| :--- | :--- | :--- | :--- |
| **Intro Title `h2`** | `clamp(3.8rem, 7.6vw, 8rem)` (`h2 em { display: block }`) | `clamp(2.2rem, 4.2vw, 3.8rem)` (`line-height: .9; text-transform: uppercase;`) | Frees 100px+ vertical height, preventing desktop overflow |
| **Intro Padding** | `clamp(8px, 1.2vh, 16px) 0 clamp(8px, 1.2vh, 14px)` | `clamp(4px, 0.8vh, 10px) 0 clamp(4px, 0.8vh, 8px)` | Encurta espaçamento externo superior e inferior |
| **Intro Paragraph `p`** | `font-size: 1.02rem; line-height: 1.5;` | `font-size: clamp(0.85rem, 1.1vw, 0.95rem); line-height: 1.4;` | Proportionate subtitle density |
| **Card Envelope `article`** | `padding: clamp(10px, 1.4vh, 16px); border-radius: var(--radius-lg);` (26px) | `padding: clamp(8px, 1vh, 12px); border-radius: var(--radius-sm);` (12px) | Sleek architectural container; eliminates oversized bubble corners |
| **Card Header `header`** | `margin-bottom: clamp(6px, 1vh, 10px);` | `margin-bottom: 6px; padding-bottom: 4px; border-bottom: 1px dashed rgba(23,23,23,.12);` | Crisp technical category definition |
| **Card Header `h3`** | `font-size: .68rem; letter-spacing: .13em;` | `font-size: .66rem; font-weight: 800; letter-spacing: .12em;` | Clear uppercase category title |
| **Tool Item `li` Height** | `min-height: clamp(38px, 4.5vh, 44px);` | `min-height: clamp(28px, 3.2vh, 32px);` (nominal ~30px) | 30% reduction in chip height |
| **Tool Item `li` Padding** | `padding: 4px 8px;` | `padding: 2px 8px;` | Compact badge envelope |
| **Tool Item `li` Radius** | `border-radius: var(--radius-md);` (18px) | `border-radius: var(--radius-xs);` (8px) | Precision engineering badge shape |
| **Tool Item `li` Background** | `border: 1px solid rgba(24,32,51,.1); background: var(--paper-light);` | `border: 1px solid rgba(23,23,23,.08); background: rgba(255,255,255,.65);` | Clean, subtle, modern surface |
| **Icon Container `.stack-icon`** | `width: 28px; height: 28px; border-radius: var(--radius-sm);` (12px) | `width: 20px; height: 20px; border-radius: 4px;` | Proportionately scaled to 30px chip |
| **Icon SVG Size (`size`)** | `<Icon size={22} />` | `<Icon size={14} />` or `size={15}` | 14px SVG inside 20px box (3px breathing room) |
| **Icon Background** | `background: rgba(251,191,36,.22); color: var(--accent);` | `background: rgba(251,191,36,.14); color: var(--accent);` | Less visual competition across 24 icons |
| **Tool Label `strong`** | `font-size: .69rem; line-height: 1.2;` | `font-size: .68rem; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;` | Crisp, legible, prevents wrap |
| **List Gap inside Card** | `gap: clamp(4px, 0.5vh, 6px);` | `gap: clamp(3px, 0.4vh, 4px);` | Tighter vertical rhythm |
| **Mobile (`<= 420px`) Article** | `padding: 16px;` | `padding: 10px 10px;` | Preserves mobile viewport real estate |

---

### 4.2 Layout Architecture Recommendation: Dense Category Grid

#### Preferred Approach: Compact 4-Pillar Grid (Desktop) & Dense 2-Column (Tablet/Mobile)
Keep the 4 category cards in a horizontal row on desktop (`repeat(4, 1fr)`), but use the compacted chip and header dimensions:
- **Total Card Height**: ~242px.
- **Desktop (≥ 1101px)**: 4 columns side by side. Fits 100svh on every resolution from 1366x768 to 4K without scrolling or clipping.
- **Tablet (761px – 1100px)**: 2x2 grid (`repeat(2, 1fr)`). Total section height ~520px, highly balanced.
- **Mobile (≤ 760px)**: 1-column categories (`1fr`), inside which `ul` displays as a dense 2-column grid (`repeat(2, 1fr)`). With 30px chips, each category is only ~140px tall.
- **Small Mobile (≤ 420px)**: Maintain 2-column chips with `10px` card padding and `4px` gap.

#### Alternative Approach: 2x3 Micro-Grid inside each Category Card (Ultra-Dense Bento)
If extreme vertical compactness is desired:
```css
.stack-grid ul {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4px 6px;
  list-style: none;
}
```
Each card's height drops to ~145px on desktop, creating a super-compact technical dashboard appearance.

---

### 4.3 Proposed Code Changes

#### 1. In `src/components/home/StackSection.tsx`:
Change the icon size prop at line 31 from `22` to `15`:
```diff
- <span className="stack-icon"><Icon name={tool.icon} image={tool.image} size={22} /></span>
+ <span className="stack-icon"><Icon name={tool.icon} image={tool.image} size={15} /></span>
```
And adjust hover motion at line 30:
```diff
- <m.li key={tool.name} whileHover={{ y: -3 }} transition={{ duration: 0.18 }}>
+ <m.li key={tool.name} whileHover={{ y: -2 }} transition={{ duration: 0.18 }}>
```

#### 2. In `src/styles/home.css`:
Decouple `.stack-section__intro h2` and tighten cards/chips:
```diff
- .work-section__heading h2, .stack-section__intro h2 { font-family: var(--font-display); font-size: clamp(3.8rem,7.6vw,8rem); line-height: .82; letter-spacing: -.07em; text-transform: uppercase; }
+ .work-section__heading h2 { font-family: var(--font-display); font-size: clamp(3.8rem,7.6vw,8rem); line-height: .82; letter-spacing: -.07em; text-transform: uppercase; }
+ .stack-section__intro h2 { font-family: var(--font-display); font-size: clamp(2.2rem, 4.2vw, 3.8rem); line-height: .9; letter-spacing: -.06em; text-transform: uppercase; }
```
```diff
- .stack-section > .shell { flex: 1; display: flex; flex-direction: column; justify-content: space-between; padding-bottom: clamp(14px, 2vh, 24px); min-height: 0; }
- .stack-section__intro { display: grid; grid-template-columns: 1fr 360px; align-items: end; gap: clamp(16px, 2vw, 40px); padding: clamp(8px, 1.2vh, 16px) 0 clamp(8px, 1.2vh, 14px); }
- .stack-section__intro h2 em { display:block; }
- .stack-section__intro p { color: var(--ink-soft); font-size: 1.02rem; line-height: 1.5; }
- .stack-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: clamp(8px, 1vw, 12px); flex: 1; min-height: 0; }
- .stack-grid article { padding: clamp(10px, 1.4vh, 16px); border: 1px solid var(--line-light); border-radius: var(--radius-lg); display: flex; flex-direction: column; }
- .stack-grid header { display: flex; align-items: center; justify-content: space-between; margin-bottom: clamp(6px, 1vh, 10px); }
- .stack-grid header span { color: var(--accent); font-size: .64rem; font-weight: 700; }
- .stack-grid h3 { font-size: .68rem; letter-spacing: .13em; text-transform: uppercase; }
- .stack-grid ul { display: grid; gap: clamp(4px, 0.5vh, 6px); list-style: none; flex: 1; }
- .stack-grid li { display: flex; min-width: 0; min-height: clamp(38px, 4.5vh, 44px); align-items: center; gap: 8px; padding: 4px 8px; border: 1px solid rgba(24,32,51,.1); border-radius: var(--radius-md); background: var(--paper-light); }
- .stack-icon { display: grid; width: 28px; height: 28px; flex: 0 0 28px; place-items: center; border-radius: var(--radius-sm); background: rgba(251,191,36,.22); color: var(--accent); }
- .stack-grid li strong { min-width: 0; font-size: .69rem; line-height: 1.2; overflow-wrap: anywhere; }

+ .stack-section > .shell { flex: 1; display: flex; flex-direction: column; justify-content: flex-start; gap: clamp(8px, 1.5vh, 18px); padding-bottom: clamp(12px, 1.8vh, 20px); min-height: 0; }
+ .stack-section__intro { display: grid; grid-template-columns: 1fr 360px; align-items: end; gap: clamp(16px, 2vw, 36px); padding: clamp(4px, 0.8vh, 10px) 0 clamp(4px, 0.8vh, 8px); }
+ .stack-section__intro h2 em { display: block; }
+ .stack-section__intro p { color: var(--ink-soft); font-size: clamp(0.85rem, 1.1vw, 0.95rem); line-height: 1.4; }
+ .stack-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: clamp(8px, 1vw, 12px); flex: 1; min-height: 0; }
+ .stack-grid article { padding: clamp(8px, 1.1vh, 12px); border: 1px solid var(--line-light); border-radius: var(--radius-sm); background: rgba(251, 249, 245, 0.65); display: flex; flex-direction: column; }
+ .stack-grid header { display: flex; align-items: center; justify-content: space-between; margin-bottom: clamp(4px, 0.7vh, 8px); padding-bottom: 4px; border-bottom: 1px dashed rgba(23, 23, 23, 0.12); }
+ .stack-grid header span { color: var(--accent); font-size: .64rem; font-weight: 700; }
+ .stack-grid h3 { font-size: .66rem; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
+ .stack-grid ul { display: grid; gap: clamp(3px, 0.4vh, 4px); list-style: none; flex: 1; }
+ .stack-grid li { display: flex; min-width: 0; min-height: clamp(28px, 3.2vh, 32px); align-items: center; gap: 6px; padding: 2px 8px; border: 1px solid rgba(23, 23, 23, 0.08); border-radius: var(--radius-xs); background: rgba(255, 255, 255, 0.65); transition: border-color 0.15s ease, background 0.15s ease; }
+ .stack-grid li:hover { border-color: rgba(180, 83, 9, 0.35); background: var(--paper-light); }
+ .stack-icon { display: grid; width: 20px; height: 20px; flex: 0 0 20px; place-items: center; border-radius: 4px; background: rgba(251, 191, 36, 0.14); color: var(--accent); }
+ .stack-grid li strong { min-width: 0; font-size: .68rem; font-weight: 700; line-height: 1.2; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--ink); }
```

#### 3. In `src/styles/responsive.css`:
Adjust mobile overrides:
```diff
@media (max-width: 420px) {
  .stack-grid { grid-template-columns: 1fr; }
- .stack-grid article { padding: 16px; }
+ .stack-grid article { padding: 10px; }
  .stack-grid ul { grid-template-columns: repeat(2,minmax(0,1fr)); }
}
```

---

## 5. Verification Method

To verify these findings and any subsequent implementation independently:

1. **Automated Test Suite**:
   ```bash
   npm run test
   ```
   Must pass 100% of tests (currently 20/20 in `contracts.test.ts`, `section2-layout-stress.test.tsx`, `rendering.test.tsx`).
   Specifically verifies that localized texts ("MINHA", "STACK.", "Interfaces", "Back-end", "Cloud & apps", "IA & APIs") and tool names ("React", "TypeScript", etc.) remain present in the DOM.

2. **Automated Production Build**:
   ```bash
   npm run build
   ```
   Must compile TypeScript (`tsc -b`) and bundle Vite production assets with 0 errors.

3. **Viewport Overflow Audit**:
   - Open browser devtools at `1366x768`, `1440x900`, `1920x1080`, `768x1024` (tablet), and `375x667` (mobile).
   - In desktop viewports (1366px and 1440px wide), ensure `.stack-section` fits within `100svh` without clipping the bottom of the category cards.
   - Confirm chip height is ~30px, icon box is 20px, and text labels do not wrap awkwardly.
