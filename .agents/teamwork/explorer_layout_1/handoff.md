# Handoff Report — Explorer 1: Layouts Arredondados, Transições Fluidas & Storytelling na Trajetória

**Role**: Explorer 1 (Layout & Storytelling Explorer)  
**Date**: 2026-11-01T20:50:00Z  
**Parent Conversation ID**: `add63bdc-d238-43d9-ba40-449de134f2a0`  
**Working Directory**: `f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\explorer_layout_1\`

---

## 1. Observation

### 1.1 Tooling, Verification & Baseline Health
- **Tool commands executed**:
  - `npm run typecheck` (`tsc --noEmit`): Exited with code 0, 0 type errors.
  - `npm test` (`vitest run`): Exited with code 0, 2 test files passed, 11 tests passed in 26.16s:
    - `src/test/contracts.test.ts` (5 tests passed): validates all JSON files, icons in `technologyContent.json`, icons across interface content, asset file existence in `public/`, and PT/EN text fields.
    - `src/test/rendering.test.tsx` (6 tests passed): validates home page render, language toggle PT/EN, navigation to `/projetos` and filter switching, navigation to `/midia-blog`, 404 page render, and route aliases.
  - `npm run build` (`tsc --noEmit && vite build`): Exited with code 0 in 6.94s, generating:
    - `dist/index.html` (5.48 kB)
    - `dist/assets/index-sIwe5gkX.css` (28.80 kB)
    - `dist/assets/index-mmHMqR6X.js` (317.14 kB)

### 1.2 Layout & Section Transitions (R1 Current State)
- **`src/App.tsx` (lines 30-39)**:
  - `<div className="min-h-screen flex flex-col bg-paper text-ink font-sans selection:bg-signal selection:text-white">`
  - `<Header />` uses `sticky top-0 z-40 w-full bg-paper/95 backdrop-blur-md border-b border-line` with hard flat bottom border.
  - `<main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">{renderCurrentRoute()}</main>`
  - `<Footer />` has `relative bg-ink text-paper border-t border-ink/40 pt-20 pb-16` with a hard flat top edge abutting the previous section.
- **`src/pages/HomePage.tsx` (lines 10-22)**:
  - Direct sequence of sections: `<HeroSection />`, `<AboutSection />`, `<SelectedProjectsSection />`, `<StackSection />`, `<PurposeSection />`, `<ExperienceSection />`.
  - All 6 sections are rendered edge-to-edge as full-bleed blocks separated only by horizontal 1px lines (`border-b border-line`):
    - `HeroSection.tsx:15`: `className="relative pt-12 pb-20 md:pt-20 md:pb-28 border-b border-line overflow-hidden"`
    - `AboutSection.tsx:14`: `className="py-20 md:py-28 border-b border-line bg-paper-light/50"`
    - `SelectedProjectsSection.tsx:25`: `className="py-20 md:py-28 border-b border-line"`
    - `StackSection.tsx:16`: `className="py-20 md:py-28 border-b border-line bg-paper-light/40"`
    - `PurposeSection.tsx:15`: `className="py-20 md:py-28 border-b border-line bg-paper"`
    - `ExperienceSection.tsx:15`: `className="py-20 md:py-28 border-b border-line bg-paper-light/30"`
- **Border Radius Inconsistencies**:
  - `HeroSection.tsx:78`: card uses `p-6 bg-paper-light border border-line rounded` (4px).
  - `AboutSection.tsx:30, 31`: portrait figure uses `rounded` (4px).
  - `SelectedProjectsSection.tsx:61, 136`: articles use `rounded-lg` (8px), but buttons/tech badges use `rounded` (4px).
  - `StackSection.tsx:46`: group cards use `rounded` (4px).
  - `PurposeSection.tsx:62, 63`: figure and image wrapper use `rounded` (4px).
  - `Footer.tsx:64, 68`: contact cards use `rounded` (4px).
  - There are NO rounded section cards, NO rounded section containers, NO section dividers, and NO visual transition connectors. The transition from light `ExperienceSection` into dark `Footer` is an abrupt rectangular boundary.

### 1.3 Trajectory Component & Storytelling (R4 Current State)
- **`src/components/home/ExperienceSection.tsx` (lines 38-103)**:
  - Uses a bare stacked list:
    ```tsx
    <div className="space-y-12">
      {items.map((item, index) => (
        <article key={`${item.company}-${index}`} className="p-6 sm:p-8 lg:p-10 bg-paper border border-line rounded-lg shadow-2xs hover:border-ink/20 transition-colors">
    ```
  - **Zero visual interconnection**: Each company entry is rendered in an isolated rectangular box.
  - **No timeline rail or spine**: There is no vertical timeline connector, progression track, or connecting line between items.
  - **No milestone nodes or glowing indicators**: The items lack chronological anchor nodes, status indicators (e.g. active indicator for current roles), or sequence tags.
  - **Data Source (`content/homeContent.json` lines 52-184)**:
    - 5 sequential experiences:
      1. Domus | Sua Solução Digital (Out/2025 / Presente)
      2. SIVIS Tecnologia (Nov/2025 / Presente)
      3. Autocom3 Tecnologia (Nov/2024 / Presente)
      4. UniFOA / SEBRAE EvaTech (Jun/2024 / Dez/2024)
      5. SIVIS Tecnologia Júnior (Ago/2022 / Jun/2024)
    - Each item has `period`, `company`, `role`, `description`, `highlights` (PT and EN), and `technologies`.

### 1.4 Critical Crossover Observation: FalaAtípica Grayscale (R3)
- In `src/components/home/PurposeSection.tsx` (line 72):
  `className="w-full h-full object-cover grayscale contrast-105 hover:grayscale-0 transition-all duration-500"`
- In `src/pages/MediaPage.tsx` (line 48):
  `className="w-full h-full object-cover grayscale contrast-105 hover:grayscale-0 transition-all duration-500"`
- Both components artificially desaturate the photo of FalaAtípica. Removing `grayscale contrast-105 hover:grayscale-0` restores full, natural colors immediately.

---

## 2. Logic Chain

### 2.1 Logic Chain for R1: Layouts Arredondados e Transições entre Seções
1. **Observation**: Currently, all sections in `HomePage.tsx` are full-bleed rectangles separated only by 1px straight borders (`border-b border-line`), with minimal and inconsistent border-radius (`rounded` = 4px).
2. **Design Problem**: This produces an abrupt, flat, and disjointed page flow that contradicts the "Ateliê Digital Brasileiro" identity (editorial warmth, precision, layered surfaces).
3. **Architectural Solution**:
   - **Step A: Unified Border-Radius Hierarchy (Radius Token System)**:
     - Section Outer Islands / Envelopes: `rounded-2xl sm:rounded-3xl lg:rounded-[32px]`
     - Primary Content Cards (Projects, Trajectory, Purpose): `rounded-xl sm:rounded-2xl` (16px–24px)
     - Inner Media Containers & Images: `rounded-lg sm:rounded-xl` (12px–16px)
     - Floating Action Buttons, Tags & Badges: `rounded-full` or `rounded-lg`
   - **Step B: Island Envelopes for Home Sections**:
     - Wrap sections in rounded container envelopes with soft borders (`border border-line/70`), elevated backgrounds (`bg-paper-light` / `bg-paper-light/70`), and gentle shadows (`shadow-xs`), spaced cleanly along the main vertical axis.
   - **Step C: Inter-Section Fluid Transitions (Connector Bridge Pills)**:
     - Between sections, introduce an elegant centered bridge pill that signals the section change:
       ```tsx
       {/* Inter-Section Fluid Transition Connector */}
       <div className="flex items-center justify-center -my-3 sm:-my-4 relative z-20">
         <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-paper border border-line shadow-xs text-[11px] font-mono uppercase tracking-widest text-ink-muted">
           <span className="w-1.5 h-1.5 rounded-full bg-signal" />
           <span>Capítulo Seguinte</span>
           <Icon name="arrow-down" size={12} className="text-ink-muted" />
         </div>
       </div>
       ```
   - **Step D: Overlapping Curved Transition into Dark Footer**:
     - The dark Footer (`bg-ink`) is the strongest tonal shift on the page.
     - Applying `rounded-t-[32px] sm:rounded-t-[48px] overflow-hidden -mt-8 sm:-mt-12 relative z-20 shadow-2xl border-t border-ink/20` transforms this boundary into an architectural curved dome that envelops the bottom of the page, delivering an immediate high-end transition.

### 2.2 Logic Chain for R4: Seção de Trajetória com Storytelling Sequencial Interligado
1. **Observation**: `ExperienceSection.tsx` currently renders 5 experiences as standalone cards with `space-y-12`. There are no connective visual lines, glowing nodes, or chronological storytelling rails.
2. **User Goal**: "Redesenhar a seção de Trajetória para transmitir uma sensação contínua de progressão temporal e storytelling, conectando visualmente a sequência de marcos e experiências."
3. **Architectural Solution**:
   - **Step A: Continuous Vertical Timeline Spine (Eixo Narrativo)**:
     - Create a vertical timeline spine that connects all 5 milestones:
       `relative border-l-2 border-line ml-4 sm:ml-8 md:ml-12 pl-6 sm:pl-10 md:pl-16 space-y-12 sm:space-y-16`
     - Overlay an animated/gradient progress trace line:
       `absolute -left-[2px] top-4 bottom-8 w-[2px] bg-gradient-to-b from-signal via-cobalt to-line`
   - **Step B: Glowing Chronological Milestone Nodes**:
     - At each milestone position:
       - Node anchored directly on the vertical line: `absolute -left-[17px] sm:-left-[21px] top-6 sm:top-8`
       - Dual-ring structure:
         - Outer ring: `w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-paper border-2 border-line flex items-center justify-center shadow-sm`
         - Inner node: `w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-signal group-hover:scale-125 transition-transform`
       - Active Pulse for Current Roles:
         - For items with `"Presente"` or `"Present"` in `item.period`:
           Add an animated pulse halo: `<span className="absolute -inset-1 rounded-full bg-signal/25 animate-ping" />` and a green/signal status dot inside the card.
   - **Step C: Horizontal Connector Arm & Narrative Chapter Card**:
     - From each node, a horizontal connector links the spine to the card:
       `absolute -left-6 sm:-left-10 md:-left-16 top-10 sm:top-12 w-6 sm:w-10 md:w-16 h-[2px] bg-line/80`
     - Storytelling Chapter Header inside the card:
       - Chapter counter: `[Capítulo 01 // Marco 2025]`
       - Live badge: `"Em Andamento"` / `"Current Focus"`
       - Company + Role + Period + Narrative summary
       - Key Deliverables with stylized directional arrow bullets
       - Technology pills with rounded-full geometry
   - **Step D: Timeline Origin and Destination Anchors**:
     - Timeline Start Anchor: An editorial header badge `[Marco Inicial • 2022]`
     - Timeline End Anchor: A forward-looking marker `[Próximo Capítulo • Sistemas Autônomos & IA]`
   - **Step E: Mobile Responsiveness (320px–420px)**:
     - Using `ml-3 sm:ml-8 pl-5 sm:pl-10` ensures that on narrow 320px screens, the text and highlights never overflow horizontally, avoiding any horizontal scroll bar.

---

## 3. Caveats

1. **Test Assertions (`src/test/rendering.test.tsx`)**:
   - The test specifically searches for verbatim text:
     - `expect(screen.getByText('TRAJETÓRIA.')).toBeInTheDocument();`
     - `expect(screen.getByText('JOURNEY.')).toBeInTheDocument();` (in EN)
     - `expect(screen.getByText('Autocom3 Tecnologia')).toBeInTheDocument();`
     - `expect(screen.getByText('VAMOS')).toBeInTheDocument();`
     - `expect(screen.getByText('CONVERSAR.')).toBeInTheDocument();`
   - Therefore, while redesigning layout envelopes, the text strings, heading levels, and company names from JSON must remain intact.
2. **Icon Contract (`src/test/contracts.test.ts`)**:
   - Any icon added to `interfaceContent.json` or `technologyContent.json` must be registered in `src/components/common/Icon.tsx`.
3. **No External Libraries**:
   - All rounded transitions and storytelling timeline elements must be implemented with pure Tailwind CSS classes and React JSX. No heavy 3rd-party timeline dependencies should be installed.

---

## 4. Conclusion & Concrete Implementation Proposals

### 4.1 Proposed Implementation for R1 (Layouts Arredondados e Transições)

#### Target File 1: `src/pages/HomePage.tsx`
Add a subtle inter-section transition container between consecutive sections to create a unified rhythm:
```tsx
// Proposal for HomePage.tsx section flow with rounded envelopes and transition connectors
export const HomePage: React.FC = () => {
  return (
    <div className="space-y-4 sm:space-y-8 pb-12">
      <SEO pageKey="home" />
      
      {/* 01. Hero */}
      <HeroSection />
      
      {/* 02. About */}
      <AboutSection />
      
      {/* 03. Selected Projects */}
      <SelectedProjectsSection />
      
      {/* 04. Stack */}
      <StackSection />
      
      {/* 05. Purpose (FalaAtípica) */}
      <PurposeSection />
      
      {/* 06. Experience & Trajectory */}
      <ExperienceSection />
    </div>
  );
};
```

#### Target File 2: Section Shells (`HeroSection.tsx`, `AboutSection.tsx`, `SelectedProjectsSection.tsx`, `StackSection.tsx`, `PurposeSection.tsx`)
Update section wrapper classes to embrace rounded island architecture:
- `HeroSection.tsx`:
  - Outer: `className="relative pt-12 pb-20 md:pt-20 md:pb-28 mx-3 sm:mx-6 lg:mx-8 my-4 bg-paper border border-line/80 rounded-2xl sm:rounded-3xl lg:rounded-[32px] overflow-hidden shadow-xs"`
- `AboutSection.tsx`:
  - Outer: `className="py-16 md:py-24 mx-3 sm:mx-6 lg:mx-8 my-4 bg-paper-light/60 border border-line/80 rounded-2xl sm:rounded-3xl lg:rounded-[32px] overflow-hidden shadow-xs"`
  - Portrait: `className="rounded-2xl overflow-hidden border border-line"`
- `SelectedProjectsSection.tsx`:
  - Outer: `className="py-16 md:py-24 mx-3 sm:mx-6 lg:mx-8 my-4 bg-paper border border-line/80 rounded-2xl sm:rounded-3xl lg:rounded-[32px] overflow-hidden shadow-xs"`
  - Project Cards: `className="group bg-paper-light border border-line/80 rounded-2xl md:rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all"`
- `StackSection.tsx`:
  - Outer: `className="py-16 md:py-24 mx-3 sm:mx-6 lg:mx-8 my-4 bg-paper-light/40 border border-line/80 rounded-2xl sm:rounded-3xl lg:rounded-[32px] overflow-hidden shadow-xs"`
  - Group Cards: `className="flex flex-col bg-paper border border-line/80 rounded-2xl p-6 shadow-xs hover:border-ink/30 transition-all"`
- `PurposeSection.tsx`:
  - Outer: `className="py-16 md:py-24 mx-3 sm:mx-6 lg:mx-8 my-4 bg-paper border border-line/80 rounded-2xl sm:rounded-3xl lg:rounded-[32px] overflow-hidden shadow-xs"`
  - Image: Remove `grayscale contrast-105 hover:grayscale-0` -> `className="w-full h-full object-cover rounded-xl transition-all duration-300"`
- `Footer.tsx`:
  - Outer: `className="relative bg-ink text-paper rounded-t-[32px] sm:rounded-t-[48px] overflow-hidden -mt-6 sm:-mt-10 pt-20 pb-16 z-20 shadow-2xl border-t border-ink/40"`
  - Contact Cards: `className="... rounded-2xl ..."`

---

### 4.2 Proposed Implementation for R4: `src/components/home/ExperienceSection.tsx`

Here is the exact proposed component code for the redesigned Trajectory with interconnected storytelling:

```tsx
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { interfaceContent, homeContent, getLocalized } from '@/data/content';
import { Icon } from '@/components/common/Icon';

export const ExperienceSection: React.FC = () => {
  const { language } = useLanguage();
  const experience = interfaceContent.experience;
  const t = experience[language];
  const items = homeContent.experienceItems;

  return (
    <section
      id={experience.id}
      aria-labelledby="experience-heading"
      className="py-16 md:py-24 mx-3 sm:mx-6 lg:mx-8 my-4 bg-paper-light/40 border border-line/80 rounded-2xl sm:rounded-3xl lg:rounded-[32px] overflow-hidden shadow-xs"
    >
      <div className="container-editorial">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-line text-xs font-mono tracking-widest uppercase text-ink-muted">
          <div className="flex items-center gap-3">
            <span className="text-signal font-semibold">[{experience.sectionNumber}]</span>
            <span>{t.eyebrow}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-signal animate-pulse" aria-hidden="true" />
            <span>{language === 'pt' ? 'Storytelling Contínuo' : 'Chronological Narrative'}</span>
          </div>
        </div>

        {/* Section Title & Intro */}
        <div className="pt-8 pb-14 max-w-3xl">
          <h2 id="experience-heading" className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-ink">
            {t.title}
          </h2>
          <p className="mt-3 text-sm font-mono text-ink-muted uppercase tracking-wider flex items-center gap-2">
            <Icon name="arrow-down" size={14} className="text-signal" />
            <span>{t.chaptersLabel}</span>
          </p>
          <p className="mt-4 text-base sm:text-lg text-ink-soft font-light leading-relaxed">
            {language === 'pt'
              ? 'Uma linha temporal de evolução técnica: da fundação em bancos de dados e interfaces corporativas à arquitetura distribuída e produtos SaaS orientados a IA.'
              : 'A continuous timeline of technical growth: from database foundations and enterprise dashboards to distributed architecture and AI-driven SaaS.'}
          </p>
        </div>

        {/* Storytelling Timeline Track with Interconnected Nodes */}
        <div className="relative ml-3 sm:ml-8 md:ml-12 pl-6 sm:pl-10 md:pl-14 border-l-2 border-line">
          {/* Vertical Glowing Connector Spine */}
          <div
            className="absolute -left-[2px] top-6 bottom-10 w-[2px] bg-gradient-to-b from-signal via-cobalt to-line pointer-events-none"
            aria-hidden="true"
          />

          <div className="space-y-12 sm:space-y-16">
            {items.map((item, index) => {
              const role = getLocalized(item.role, language);
              const period = getLocalized(item.period, language);
              const description = getLocalized(item.description, language);
              const highlights = language === 'en' ? item.highlights.en : item.highlights.pt;
              const isCurrent = period.toLowerCase().includes('presente') || period.toLowerCase().includes('present');

              return (
                <div key={`${item.company}-${index}`} className="relative group">
                  {/* Glowing Milestone Node */}
                  <div
                    className="absolute -left-[35px] sm:-left-[51px] md:-left-[67px] top-6 sm:top-8 z-10 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <div className={`relative w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-paper border-2 ${isCurrent ? 'border-signal' : 'border-line'} flex items-center justify-center shadow-xs group-hover:border-signal transition-colors`}>
                      {isCurrent && (
                        <span className="absolute -inset-1 rounded-full bg-signal/20 animate-ping" />
                      )}
                      <span className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${isCurrent ? 'bg-signal' : 'bg-line-strong group-hover:bg-signal'} transition-colors`} />
                    </div>
                  </div>

                  {/* Horizontal Connector Line */}
                  <div
                    className="absolute -left-6 sm:-left-10 md:-left-14 top-[38px] sm:top-[46px] w-6 sm:w-10 md:w-14 h-[2px] bg-line group-hover:bg-signal/50 transition-colors"
                    aria-hidden="true"
                  />

                  {/* Milestone Card */}
                  <article className="p-6 sm:p-8 lg:p-10 bg-paper border border-line/80 rounded-2xl md:rounded-3xl shadow-xs group-hover:shadow-md group-hover:border-cobalt/40 transition-all duration-300">
                    {/* Chapter & Meta Row */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-line text-xs font-mono uppercase">
                      <div className="flex items-center gap-2.5">
                        <span className="px-2 py-0.5 rounded-full bg-paper-light border border-line text-signal font-semibold">
                          {language === 'pt' ? `Capítulo 0${index + 1}` : `Chapter 0${index + 1}`}
                        </span>
                        <span className="font-semibold text-ink text-sm sm:text-base font-sans">{item.company}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {isCurrent && (
                          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 border border-emerald-500/30 text-[11px] font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span>{language === 'pt' ? 'Ativo' : 'Current'}</span>
                          </span>
                        )}
                        <span className="bg-paper-light px-2.5 py-1 border border-line rounded-full text-ink-muted">
                          {period}
                        </span>
                      </div>
                    </div>

                    {/* Role & Summary */}
                    <div className="mt-4">
                      <h3 className="font-display text-2xl sm:text-3xl text-ink font-normal">
                        {role}
                      </h3>
                      <p className="mt-2 text-base text-ink-soft leading-relaxed font-light max-w-3xl">
                        {description}
                      </p>
                    </div>

                    {/* Key Highlights */}
                    <div className="mt-6 pt-6 border-t border-line-subtle">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-ink-muted mb-3 flex items-center gap-2">
                        <span className="text-cobalt">#</span>
                        <span>{language === 'pt' ? 'Atuação & Entregas Chave' : 'Key Deliverables & Scope'}</span>
                      </h4>
                      <ul className="space-y-2.5 list-none p-0 m-0">
                        {highlights.map((highlight, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-3 text-sm text-ink-soft">
                            <span className="text-cobalt mt-1 shrink-0 font-mono text-xs font-bold">→</span>
                            <span className="leading-relaxed">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies Pills */}
                    <div className="mt-6 pt-4 border-t border-line-subtle flex flex-wrap gap-2">
                      {item.technologies.map((tech, tIdx) => {
                        const techName = typeof tech === 'string' ? tech : getLocalized(tech, language);
                        return (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 text-xs font-mono bg-paper-light border border-line text-ink-muted rounded-full hover:text-ink hover:border-cobalt transition-colors"
                          >
                            {techName}
                          </span>
                        );
                      })}
                    </div>
                  </article>
                </div>
              );
            })}
          </div>

          {/* Timeline Destination Anchor */}
          <div className="pt-10 flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-ink-muted">
            <span className="w-3 h-3 rounded-full bg-cobalt" />
            <span>{t.end || (language === 'pt' ? 'Fim da trajetória • Próximo passo: Novos Desafios' : 'End of journey • Next step: New Challenges')}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
```

---

## 5. Verification Method

To independently verify the implementation:

1. **Static Typecheck**:
   ```bash
   npm run typecheck
   # Expect: tsc --noEmit completes with code 0 and 0 type errors.
   ```

2. **Automated Vitest Suite**:
   ```bash
   npm test
   # Expect: all tests pass (2 test files, 11+ tests). Specifically tests in src/test/rendering.test.tsx and src/test/contracts.test.ts must stay 100% green.
   ```

3. **Production Build**:
   ```bash
   npm run build
   # Expect: build completes with code 0 without any warnings or chunk errors.
   ```

4. **Visual & Responsive Inspection**:
   - Check mobile breakpoint (320px, 375px) to verify timeline nodes and horizontal arms do not cause horizontal overflow or clipping.
   - Verify rounded containers (`rounded-2xl` / `rounded-3xl`) visually elevate all sections from Hero down to Experience.
   - Verify that the dark Footer curves smoothly over the bottom of the page with `rounded-t-[32px] sm:rounded-t-[48px]`.
   - Verify FalaAtípica in `PurposeSection` and `MediaPage` displays in full natural color without any grayscale CSS filter.

5. **Invalidation Conditions**:
   - If `npm test` fails due to altered heading or company texts, restore exact text bindings (`TRAJETÓRIA.`, `Autocom3 Tecnologia`, `VAMOS CONVERSAR.`).
   - If horizontal scroll appears at 320px width, ensure negative offsets (`-left-6`, etc.) on the timeline connectors are within the container padding.
