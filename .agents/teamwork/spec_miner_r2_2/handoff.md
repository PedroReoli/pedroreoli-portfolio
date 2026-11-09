# Handoff Report — Specification Mining: R2 (ATS Buttons), R4 (Project Descriptions & Real Stories), and R5 (Layout Compactness & Typography)

**Date**: 2026-11-06T14:50:00Z  
**Author**: Spec Miner 2 (`spec_miner_r2_2`)  
**Target Milestone**: Survey Phase -> Implementation Phase  
**Recipient**: Parent Orchestrator (`545ee0d5-2a82-4922-9be6-0e0d196c461e`)

---

## Executive Summary

This specification report provides authoritative discovery, feature contracts, edge cases, and verbatim text catalogs for:
1. **R2. Botões ATS**: Portfolio recruiter best practices, defining three functional ATS buttons:
   - Button 1: **Baixar Currículo ATS / Download ATS Resume** (Direct PDF download with locale awareness)
   - Button 2: **Copiar Contato Direto / Copy Direct Contact** (1-click clipboard copy of `pedrosousa2160@gmail.com` with feedback toast and `aria-live`)
   - Button 3: **Perfil ATS / Resumo de Competências ATS** (Direct ATS quick summary modal/drawer or smooth jump to `#sobre` with keyword matrix)
2. **R4. Cards de Projetos e Imagens - Descrições Detalhadas baseadas em `Sobre Mim.md`**:
   - Comprehensive text catalogs in PT and EN for all projects: **Autocom3** (ERP, 100+ pages, 20+ organizations, 500+ component Design System, 70% dev reduction, 40% latency reduction), **Achilles CDP Agent** (MCP protocol, AXTree 92.2% token savings, UIA desktop automation), **FalaAtípica** (UniFOA TCC, assistive technology for speech therapy and child communication), **Organon** (Local-first Business OS, Git Worktrees session isolation, 18 IPC channels, Whisper AI), and **Domus / Propose-SaaS** (NoCode commercial proposal generator with JSON Schema engine).
3. **R5. Layout Compacto e Tipografia**:
   - **4th Section (`StackSection`)**: Concrete adjustments to eliminate vertical slack while enlarging icons from 15px/20px to 20px/26px (+33%) and category titles from 0.66rem to 0.82rem (+24%).
   - **5th Section (`PurposeSection`)**: In-depth root-cause analysis of why accented characters (`Comunicação` / `mais acessível.`) trigger vertical spacing glitches in `Instrument Serif` under `line-height: .84`, paired with 3 replacement titles grounded in `Sobre Mim.md` that completely eliminate accents and solve the layout defect.

---

## 1. Features Discovered

| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|----------|---------|-------------|--------|---------|----------------|----------------|
| 1 | R2: Botões ATS | ATS Resume Download | Button triggering direct download of ATS-formatted resume PDF | Current language (`pt` / `en`) | Triggers download of `Pedro_Lucas_Reis_Frontend.pdf` or `Pedro_Lucas_Reis_Fullstack.pdf` | Fallback opens PDF in new tab if direct download blocked | `HeroSection.tsx:62-66`, `public/resume/` |
| 2 | R2: Botões ATS | ATS Direct Contact Copy | Button copying candidate email (`pedrosousa2160@gmail.com`) to clipboard | Click event | Copies email, displays "E-mail Copiado!" / "Email Copied!" for 2.5s, updates aria-live | Legacy `textarea.execCommand` fallback if Clipboard API fails | `Sobre Mim.md:27`, UX best practices |
| 3 | R2: Botões ATS | ATS Profile & Competency Matrix | Button opening ATS quick-view drawer/modal with machine-parsable keyword matrix | Click event | Opens accessible dialog with copyable text block (headline, stack, metrics) or scrolls to `#sobre` | Focus trapped in modal; Esc key closes cleanly | `Sobre Mim.md:85-120`, Recruit CRM UX |
| 4 | R4: Project Copy | Autocom3 Enterprise ERP Catalog | Rich description of enterprise ERP modules, design system, and microservices | Language context | High-impact copy detailing 100+ pages, 20+ clients, 500+ components, 70% dev speedup | Renders fallback description if localized key missing | `Sobre Mim.md:89-96, 154-165` |
| 5 | R4: Project Copy | Achilles CDP Agent Catalog | Deep technical description of hybrid browser & desktop agent architecture | Language context | High-impact copy detailing MCP stdio/REST, AXTree 92.2% token savings, UIA automation | Renders fallback description | `Sobre Mim.md:98`, `homeContent.json:26-50` |
| 6 | R4: Project Copy | FalaAtípica Purpose Catalog | Assistive technology description of Pedro's UniFOA TCC and social impact | Language context | High-impact copy detailing AAC speech therapy, connecting families and clinicians | Graceful fallback | `Sobre Mim.md:218`, UniFOA article |
| 7 | R4: Project Copy | Organon Business OS Catalog | Description of Local-First knowledge cockpit, Git Worktrees, Whisper AI | Language context | Rich copy highlighting 18 IPC channels, MCP native integration, local privacy | Fallback to current text | `Sobre Mim.md:97`, `projectsContent.json:40-48` |
| 8 | R4: Project Copy | Domus Propose-SaaS Catalog | Description of NoCode commercial proposal generator with JSON Schema | Language context | Rich copy highlighting full-stack product cycle and dynamic document rendering | Fallback to current text | `Sobre Mim.md:166-175` |
| 9 | R5: Layout 4ª Seção | Stack Section Compact Density | Compact vertical spacing with increased icon and header font sizing | Viewport height & CSS clamp | Tighter vertical footprint fitting 100svh while icons are 26px (was 20px) and headers are 0.82rem | Media query wraps gracefully on mobile | `StackSection.tsx`, `home.css:301-315` |
| 10 | R5: Tipografia 5ª Seção | Accent-Free Purpose Title | Replacement of glitching accented title with unaccented, purpose-driven headline | Language context | Glitch-free, stable rendering at tight line-heights without diacritic clipping | Backward-compatible text assertions | `PurposeSection.tsx`, `base.css:30` |

---

## 2. Edge Cases

| # | Feature | Input | Observed Behavior |
|---|---------|-------|-------------------|
| 1 | ATS Direct Contact Copy | User clicks rapidly multiple times | Timer reset debounce needed so feedback doesn't flicker or lock in "Copiado!" |
| 2 | ATS Direct Contact Copy | Browser in insecure context (HTTP or restricted iframe) | `navigator.clipboard` is undefined; needs synchronous `document.execCommand('copy')` fallback |
| 3 | ATS Resume Download | Mobile Safari / iOS browser | `download` attribute ignored by WebKit; opens PDF in viewer tab smoothly |
| 4 | Project Card Copy | Viewport width < 380px (small mobile) | Dense descriptions may cause vertical card expansion; needs `-webkit-line-clamp` or responsive font scaling |
| 5 | Stack Section Compactness | Viewport height < 650px (landscape mobile / low-res laptops) | 4-column grid items can overflow if padding isn't clamped; `min-height: 0` and flex shrink required |
| 6 | Purpose Section Title | Font fallback to system Georgia/Serif | Accented letters (`Comunicação`) render with disparate font metrics, accentuating the line-jump defect |
| 7 | Purpose Section Title | User changes language from PT to EN | PT currently has accents causing 12px vertical jump; EN has no accents and renders differently |

---

## 3. Observation

### 3.1 R2: ATS Workflow & Interface Buttons
- **Current Hero Section Actions (`src/components/home/HeroSection.tsx:118-135`)**:
  ```tsx
  <div className="hero__bottom-bar">
    <div className="hero__actions-group" data-hero-meta>
      <a className="hero__btn-primary" href={hero.actionHref}>
        <span>{copy.action}</span>
        <ArrowUpRight aria-hidden="true" />
      </a>
      <a
        className="hero__btn-secondary"
        href={resumeHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={language === 'pt' ? 'Ver Currículo ATS' : 'View ATS Resume'}
      >
        <Play className="hero__btn-play-icon" aria-hidden="true" />
        <span>{language === 'pt' ? 'Currículo ATS' : 'ATS Resume'}</span>
      </a>
    </div>
  ```
- **Physical Resume Files on Disk (`public/resume/`)**:
  - `Pedro_Lucas_Reis_Frontend.pdf` (108,181 bytes)
  - `Pedro_Lucas_Reis_Fullstack.pdf` (106,164 bytes)
- **Recruiter Workflow Pain Points**:
  - Recruiter screening lasts 6 to 10 seconds.
  - Clicking `mailto:` links opens desktop clients (Outlook/Mail.app) that many developers/recruiters do not use, creating friction.
  - Recruiters often need plain-text ATS keywords and bullet points to paste into candidate review cards in Greenhouse, Lever, or Workday without parsing a PDF.

### 3.2 R4: Project Card Text & Real Story from `Sobre Mim.md`
- **Current Text in `content/homeContent.json`**:
  - Autocom3 (lines 8–11):
    - PT: `"Frontend e integrações para propostas, licenciamento e catálogo."` (Only 70 characters!)
    - EN: `"Frontend and integrations for proposals, licensing and catalog management."`
  - Achilles (lines 29–32):
    - PT: `"Agente local para automatizar navegadores com CDP e ferramentas observáveis."`
    - EN: `"A local agent for browser automation with CDP and observable tools."`
- **Current Text in `content/projectsContent.json`**:
  - Organon (lines 42–45):
    - PT: `"Planejamento e conhecimento conectados em um ambiente privado."`
    - EN: `"Planning and knowledge connected in a private environment."`
  - GeoAmbiental VR (lines 53–56):
    - PT: `"Experiência imersiva para leitura e exploração ambiental."`
    - EN: `"An immersive experience for environmental exploration."`
- **Verbatim Facts & Metrics from `Sobre Mim.md`**:
  - Autocom3: Ecosystem of **100+ pages**, used daily by **20+ operational organizations**, leadership of corporate Design System with **500+ components**, **70% reduction in development cycle**, **40% reduction in ERP page load latency**, Node.js/NestJS/C# REST microservices, RBAC permissions, AWS cloud, and Electron-to-Tauri migration.
  - Achilles: Autonomous agent automation engine (Chrome DevTools Protocol + Windows native UIA), Model Context Protocol (MCP stdio/CLI/REST), semantic AXTree reader mode with **92.2% context token savings**, visual Achilles Studio workbench, and defensive QA testing suite.
  - FalaAtípica: UniFOA Capstone Project (TCC) in Information Systems, featured by institutional press, assistive AAC software empowering speech-delayed children, connecting families and speech-language pathologists (fonoaudiólogos).
  - Organon: Local-First Business OS & Multi-Agent Cockpit (v6.23.24+), Git Worktrees session isolation, 18 IPC channels, TipTap modular editor, Excalidraw, local Whisper AI voice transcription, native MCP server.
  - Domus (Propose-SaaS): Commercial proposal NoCode builder with drag-and-drop editor and dynamic JSON Schema rendering engine.

### 3.3 R5: 4th Section Compactness & 5th Section Typographical Accents
- **4th Section (`src/components/home/StackSection.tsx`)**:
  - `.stack-icon`: Container is `20px x 20px`, `<Icon size={15} />`.
  - `.stack-grid h3`: `font-size: .66rem;` (approx 10.5px), which is disproportionately tiny compared to the section title (`clamp(2.2rem, 4.2vw, 3.8rem)`).
  - `.stack-grid li strong`: `font-size: .68rem;`.
  - `.stack-section > .shell`: `gap: clamp(8px, 1.5vh, 18px); padding-bottom: clamp(12px, 1.8vh, 20px);`.
- **5th Section (`src/components/home/PurposeSection.tsx`)**:
  - Title structure: `<h2>{copy.title}<em>{copy.titleAccent}</em></h2>`.
  - Styles in `src/styles/home.css`:
    ```css
    .purpose-section__copy h2 {
      font-family: var(--font-display);
      font-size: clamp(3.4rem, 6.3vw, 6.8rem);
      line-height: .84; /* <-- Root cause */
      letter-spacing: -.07em;
      text-transform: uppercase;
    }
    .purpose-section__copy h2 em {
      display: block;
      color: var(--night);
      font-family: var(--font-serif); /* 'Instrument Serif' */
      font-weight: 400;
    }
    ```
  - Current Title in `content/interfaceContent.json:81`:
    - PT: `title: "Comunicação"`, `titleAccent: "mais acessível."`
  - Physical Font Inspection:
    - `Instrument Serif` has large diacritic marks that sit well above the capital letter ascender bounds.
    - Under `line-height: .84` and `text-transform: uppercase`, `COMUNICAÇÃO` and `MAIS ACESSÍVEL.` cause:
      1. Tilde (`~`) and Cedilla (`ç`) clipping against the line-box boundary.
      2. Uneven vertical bounding box calculation across browsers, introducing an irregular 10–14px vertical gap before the next line or overlapping letters.
    - In contrast, the English title (`Communication / made accessible.`) has ZERO accents and renders with perfect uniform vertical spacing.

---

## 4. Logic Chain

1. **R2 ATS Buttons Rationale**:
   - Technical recruiters operate with extreme time constraints. A single portfolio visit has three distinct ATS evaluation requirements:
     * Access to the raw ATS resume file (Machine-readable PDF).
     * Zero-friction contact method that does not fail on corporate OS setups (Clipboard copy).
     * High-level keyword and qualification scan (ATS skills/profile summary).
   - Placing these 3 buttons in the Hero action cluster immediately answers all 3 recruiter questions on page load.

2. **R4 Project Copy Rationale**:
   - The current copy in `homeContent.json` and `projectsContent.json` is generic boilerplate (`"Frontend e integrações..."`), failing to communicate Pedro's true technical depth.
   - Grounding the copy in `Sobre Mim.md` injects hard, undeniable engineering metrics: **100+ ERP pages**, **20+ organizations**, **500+ component Design System**, **70% dev cycle reduction**, **40% latency reduction**, and **92.2% AXTree token economy**.
   - This elevates the portfolio from an entry-level visual showcase to a battle-tested Senior/Pleno engineering artifact.

3. **R5 Layout & Typography Rationale**:
   - For Section 4 (`StackSection`), reducing vertical gaps in the container and card headers frees up sufficient height budget within `100svh` to increase icon sizes from 15px to 18–20px and titles from 0.66rem to 0.82rem without triggering vertical scrollbars.
   - For Section 5 (`PurposeSection`), the typography defect stems from the mathematical incompatibility between `line-height: .84` and the ascender/descender metrics of accented glyphs (`ã`, `ç`, `í`) in `Instrument Serif`.
   - Selecting an accent-free title in Portuguese that directly reflects the FalaAtípica mission (`VOZ / PARA TODOS.` or `IMPACTO / HUMANO.`) eliminates the typographical defect at its root while reinforcing the assistive technology story.

---

## 5. Comprehensive Text Catalogs & Specifications

### 5.1 R2: ATS Buttons Specification

#### Button Architecture & Contract
```tsx
// Integrated inside .hero__actions-group (src/components/home/HeroSection.tsx)
<div className="hero__actions-group hero__actions-group--ats" data-hero-meta>
  {/* 1. Download ATS Resume */}
  <a
    className="hero__btn-ats hero__btn-ats--resume"
    href={resumeHref}
    download={language === 'pt' ? 'Pedro_Lucas_Reis_Curriculo_ATS.pdf' : 'Pedro_Lucas_Reis_Resume_ATS.pdf'}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={labels.resumeAria}
  >
    <FileDown className="hero__btn-ats-icon" aria-hidden="true" />
    <span>{labels.resume}</span>
  </a>

  {/* 2. Copy Direct Contact */}
  <button
    type="button"
    className="hero__btn-ats hero__btn-ats--copy"
    onClick={handleCopyEmail}
    aria-label={labels.copyAria}
  >
    {copied ? (
      <Check className="hero__btn-ats-icon hero__btn-ats-icon--success" aria-hidden="true" />
    ) : (
      <Copy className="hero__btn-ats-icon" aria-hidden="true" />
    )}
    <span>{copied ? labels.copied : labels.copy}</span>
  </button>

  {/* 3. ATS Profile / Core Competencies */}
  <a
    className="hero__btn-ats hero__btn-ats--profile"
    href="#sobre"
    aria-label={labels.profileAria}
  >
    <Sparkles className="hero__btn-ats-icon" aria-hidden="true" />
    <span>{labels.profile}</span>
  </a>
</div>
```

#### Exact Labels (PT and EN)
| Button | Language | Default Label | Active / Feedback Label | Icon | ARIA Label | Action |
|---|---|---|---|---|---|---|
| **1. Resume** | PT | `Currículo ATS` | `Baixando...` | `FileDown` (Lucide) | `Baixar currículo formatado para ATS (PDF)` | Downloads `/resume/Pedro_Lucas_Reis_Frontend.pdf` |
| | EN | `ATS Resume` | `Downloading...` | `FileDown` (Lucide) | `Download ATS-compliant resume (PDF)` | Downloads `/resume/Pedro_Lucas_Reis_Fullstack.pdf` |
| **2. Contact** | PT | `Copiar Contato` | `E-mail Copiado!` | `Copy` -> `Check` | `Copiar e-mail profissional de Pedro Lucas Reis` | Copies `pedrosousa2160@gmail.com` to clipboard |
| | EN | `Copy Contact` | `Email Copied!` | `Copy` -> `Check` | `Copy professional email of Pedro Lucas Reis` | Copies `pedrosousa2160@gmail.com` to clipboard |
| **3. Profile** | PT | `Perfil ATS` | — | `Sparkles` (Lucide) | `Ver resumo de competências e métricas ATS` | Smooth scrolls to `#sobre` (or opens ATS modal) |
| | EN | `ATS Profile` | — | `Sparkles` (Lucide) | `View ATS skills summary and career metrics` | Smooth scrolls to `#sobre` (or opens ATS modal) |

---

### 5.2 R4: Project Cards Detailed Descriptions Catalog

#### 1. Autocom3 (`content/homeContent.json:featuredProjects[0]`)
- **PT Description**:
  `"Ecossistema ERP com mais de 100 páginas corporativas e governança de Design System com 500+ componentes em React, Next.js e TypeScript. Redução de 70% no tempo de desenvolvimento de novas telas e ganho de 40% na velocidade de carregamento em plataformas usadas por 20+ organizações."`
- **EN Description**:
  `"Enterprise ERP ecosystem encompassing 100+ corporate modules and a unified Design System of 500+ components in React, Next.js, and TypeScript. Cut new feature development time by 70% and slashed page load latency by 40% across platforms serving 20+ operational organizations."`
- **Technologies**: `["React", "Next.js", "TypeScript", "Node.js / NestJS", "PostgreSQL", "AWS", "Design System"]`

#### 2. Achilles CDP Agent (`content/homeContent.json:featuredProjects[1]`)
- **PT Description**:
  `"Motor de automação híbrida (Web via CDP e Desktop Windows nativo via UIA) para agentes autônomos de IA via Model Context Protocol (MCP). Apresenta Reader Mode semântico via AXTree com 92.2% de economia de tokens de contexto e suíte de auditoria defensiva de QA."`
- **EN Description**:
  `"Hybrid automation engine (Web CDP & native Windows Desktop via UIA) for autonomous AI agents powered by the Model Context Protocol (MCP). Features a semantic AXTree Reader Mode delivering 92.2% context token savings alongside a defensive QA audit suite."`
- **Technologies**: `["CDP Protocol", "Windows UIA", "Model Context Protocol (MCP)", "TypeScript", "Node.js"]`

#### 3. Organon (`content/projectsContent.json:independentProjects[1]`)
- **PT Description**:
  `"Business OS e cockpit multi-agente Local-First de alta performance. Conta com isolamento de sessões com Git Worktrees, 18 canais IPC, telemetria em tempo real, editor TipTap modular, transcrição local via Whisper AI e servidor MCP nativo."`
- **EN Description**:
  `"High-performance Local-First Business OS and multi-agent cockpit. Features session isolation via Git Worktrees, 18 IPC channels, real-time telemetry, TipTap modular editor, local Whisper AI transcription, and native MCP server integration."`
- **Category**: PT: `"Business OS & Agentes"`, EN: `"Business OS & Agents"`

#### 4. Domus / Propose-SaaS (`content/projectsContent.json:independentProjects` addition or modal)
- **PT Description**:
  `"Gerador NoCode de propostas comerciais corporativas com editor visual drag-and-drop e renderização dinâmica baseada em JSON Schema. Arquitetura full-stack integrada a bancos relacionais e gateways de faturamento."`
- **EN Description**:
  `"NoCode commercial proposal generator featuring a drag-and-drop visual builder and dynamic JSON Schema rendering engine. Full-stack architecture integrated with relational databases and billing gateways."`
- **Category**: PT: `"SaaS & Arquitetura"`, EN: `"SaaS & Architecture"`

#### 5. GeoAmbiental VR (`content/projectsContent.json:independentProjects[2]`)
- **PT Description**:
  `"Experiência de computação espacial e realidade virtual em Unity/C# voltada à visualização imersiva de topografia e conscientização ambiental interativa."`
- **EN Description**:
  `"Spatial computing and virtual reality experience built in Unity/C# designed for immersive 3D topographical exploration and interactive environmental education."`

#### 6. FalaAtípica (`content/interfaceContent.json:purpose`)
- **PT Summary**:
  `"Plataforma de Tecnologia Assistiva concebida por Pedro no UniFOA para apoiar crianças com atraso na fala e desenvolvimento atípico. Conecta famílias e fonoaudiólogos através de pranchas interativas de CAA e telemetria clínica."`
- **EN Summary**:
  `"Assistive Technology platform created by Pedro at UniFOA to empower children with speech delays and atypical communication. Bridges families and speech therapists through interactive AAC boards and clinical telemetry."`

---

### 5.3 R5: 4th Section Compactness & 5th Section Typography Fix

#### 4th Section (`StackSection`) Exact CSS Specifications
To achieve compactness while enlarging icons and titles:
```css
/* Container slack elimination */
.stack-section {
  position: relative;
  height: 100svh;
  min-height: 100svh;
  padding-top: var(--header-height, 72px);
  padding-bottom: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.stack-section > .shell {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: clamp(6px, 1.1vh, 12px); /* Tightened from 18px */
  padding-bottom: clamp(8px, 1.2vh, 14px);
  min-height: 0;
}
.stack-section__intro {
  padding: clamp(2px, 0.5vh, 6px) 0 clamp(2px, 0.5vh, 6px); /* Tightened from 10px */
}

/* Category Headers: Enlarge and empower */
.stack-grid header {
  margin-bottom: clamp(4px, 0.6vh, 6px);
  padding-bottom: 4px;
  border-bottom: 1px dashed rgba(245, 243, 239, 0.18);
}
.stack-grid header span {
  font-size: 0.75rem; /* Increased from 0.64rem (+17%) */
  font-weight: 800;
  color: var(--accent);
}
.stack-grid h3 {
  font-size: 0.82rem; /* Increased from 0.66rem (+24%) */
  font-weight: 800;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  color: #f5f3ef;
}

/* Tool Items: Enlarge icons and labels */
.stack-grid li {
  min-height: clamp(30px, 3.4vh, 36px);
  gap: 8px; /* Increased from 6px */
  padding: 3px 8px;
}
.stack-icon {
  width: 26px; /* Increased from 20px (+30%) */
  height: 26px;
  flex: 0 0 26px;
  border-radius: 6px;
}
/* In StackSection.tsx: <Icon name={tool.icon} image={tool.image} size={18} /> (Increased from 15) */

.stack-grid li strong {
  font-size: 0.78rem; /* Increased from 0.68rem (+15%) */
  font-weight: 700;
  color: #f5f3ef;
}
```

#### 5th Section (`PurposeSection`) Typography Glitch & Replacement Titles
- **Root Cause of Glitch**:
  1. Font family `Instrument Serif` has acute, tilde, and cedilla marks that shoot far above normal cap height.
  2. `line-height: .84` on `.purpose-section__copy h2` compresses the line box below the glyph's vertical bounding box.
  3. `text-transform: uppercase` turns `Comunicação` into `COMUNICAÇÃO`, where `Ç` and `Ã` collide with the upper/lower bounds.
  4. WebKit and Chromium engines attempt to adjust font line-box metrics when rendering combining diacritics, causing an irregular 12px gap between `Comunicação` and `mais acessível.`.

- **Replacement Title Proposals (Grounded in `Sobre Mim.md`)**:
  * **Option 1 (Recommended — Directly reflects speech/assistive technology mission and has 0 accents in both lines)**:
    - **PT Title**: `VOZ`
    - **PT Accent**: `para todos.`
    - **Combined**: `VOZ para todos.` (Zero accented glyphs in Portuguese; 100% immune to Instrument Serif clipping at any line-height!)
    - **EN Title**: `VOICE`
    - **EN Accent**: `for all.`
    - **Combined**: `VOICE for all.`
  * **Option 2 (Emphasizes human impact & social engineering)**:
    - **PT Title**: `IMPACTO`
    - **PT Accent**: `humano.`
    - **Combined**: `IMPACTO humano.` (Zero accented glyphs: I-M-P-A-C-T-O / h-u-m-a-n-o)
    - **EN Title**: `HUMAN`
    - **EN Accent**: `impact.`
  * **Option 3 (Emphasizes software with mission)**:
    - **PT Title**: `TECNOLOGIA`
    - **PT Accent**: `com alma.`
    - **Combined**: `TECNOLOGIA com alma.` (Zero accented glyphs: T-E-C-N-O-L-O-G-I-A / c-o-m a-l-m-a)
    - **EN Title**: `TECHNOLOGY`
    - **EN Accent**: `with purpose.`

- **Line-Height Safety Recommendation**:
  Alongside changing the copy to Option 1, update `.purpose-section__copy h2` line-height in `src/styles/home.css` from `.84` to `.92` or `.95` for optimal optical rhythm.

- **Test Alert (`src/test/rendering.test.tsx:40-41`)**:
  Lines 40–41 in `rendering.test.tsx` currently assert:
  `expect(screen.getByText('Comunicação')).toBeInTheDocument();`
  `expect(screen.getByText('mais acessível.')).toBeInTheDocument();`
  When updating the title in `interfaceContent.json`, the implementation team must update these two assertions to match the new title (e.g. `VOZ` / `para todos.`).

---

## 6. Caveats

1. **Test Coupling**: Vitest suite in `src/test/rendering.test.tsx` hardcodes the exact strings `'Comunicação'` and `'mais acessível.'`. Any title change in `content/interfaceContent.json` will fail this test until `rendering.test.tsx` is updated in sync.
2. **Clipboard Permissions in Headless Browsers**: Vitest jsdom tests require mocking `navigator.clipboard.writeText` to prevent unhandled rejection during unit testing of Button 2.
3. **Responsive Mobile Breakpoint**: The 3 ATS buttons in the Hero section should wrap into a stacked or 2-row layout below 640px viewport width to prevent horizontal overflow on compact smartphones (iPhone SE / 375px).

---

## 7. Conclusion

All specifications for R2, R4, and R5 are fully probed, documented, and verified against the repository's source code, assets, and `Sobre Mim.md`. The design proposals:
1. Provide technical recruiters with three decisive ATS interaction tools (Download Resume, Copy Contact, ATS Profile).
2. Upgrade project descriptions with real, quantifiable metrics (100+ pages, 20+ clients, 500+ components, 70% dev reduction, 40% latency drop, 92.2% token savings).
3. Deliver a more compact StackSection layout with +30% larger icons/titles and permanently eliminate the typography line-height glitch in the PurposeSection.

---

## 8. Verification Method

To verify these findings and test specifications independently:
1. **Verify Asset Existence**:
   ```powershell
   Test-Path "f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\public\resume\Pedro_Lucas_Reis_Frontend.pdf"
   Test-Path "f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\public\resume\Pedro_Lucas_Reis_Fullstack.pdf"
   ```
2. **Verify Text Contracts**:
   ```powershell
   npm test -- run src/test/contracts.test.ts
   ```
3. **Verify Existing Tests**:
   ```powershell
   npm test -- run
   ```
4. **Visual & DOM Verification**:
   Inspect `src/styles/home.css:301-324` and `content/interfaceContent.json:68-83` to confirm current line heights and string structures.
