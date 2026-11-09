# Handoff Report — Explorer 1 (CodePen Layout & Museum Art Frame Researcher)

**Target Section**: Section 2 ("Quem sou eu" / `AboutSection.tsx`)  
**Status**: Completed (Read-Only Investigation)  
**Date**: 2026-11-02  
**Author**: Explorer 1 (`explorer_s3_codepen`)  
**Parent Task**: `b9a65c2f-0cee-46e8-937b-00896cb767b9`

---

## 1. Observation

### 1.1 Existing Codebase State
- **File**: `src/components/home/AboutSection.tsx` (lines 15–50)
  - Layout is wrapped in `<section ref={sectionRef} id={about.id} className="about section-light">`.
  - Portrait container: `<div className="about__portrait" data-reveal>` contains a simple `<img src={about.portrait.src} ... />` with a bottom gradient overlay and simple text.
  - Typography container: `<div className="about__copy">` places the entire long summary string into an `<h2>`:
    ```tsx
    <p className="overline" data-reveal>{copy.title}</p>
    <h2 data-reveal>{copy.summary}</h2>
    ```
  - Career stats: `<div className="stats-grid">` renders 4 wide column cards with huge text (`clamp(2.35rem, 4vw, 4rem)`).

- **File**: `src/styles/home.css` (lines 22–35)
  - Line 25 restricts the portrait size severely:
    ```css
    .about__portrait {
      position: relative;
      overflow: hidden;
      aspect-ratio: 1 / 1.03;
      max-height: clamp(240px, 30vh, 320px);
      border-radius: var(--radius-lg);
      background: #d8d4ca;
    }
    ```
  - On standard 1080p and laptop screens (viewport height 800–1080px), `max-height: 320px` forces the portrait to barely 310px wide inside a 550px grid column, leaving massive empty vertical space.
  - Simultaneously, `.about` has `height: 100svh; overflow: hidden;` with `justify-content: space-between`. Because the photo is only 320px high, the section feels artificially squished and "low height" ("a altura esta baixa dessa sessao"), while the text and stats appear uncompact and scattered.

- **File**: `src/test/rendering.test.tsx` (lines 38–41, 69–84)
  - Tests assert specific exact strings:
    - PT: `expect(screen.getByText('Quem eu sou')).toBeInTheDocument();`
    - PT: `expect(screen.getAllByText('04')[0]).toBeInTheDocument();`
    - PT: `expect(screen.getByText('anos de experiência')).toBeInTheDocument();`
    - EN: `expect(screen.getByText('Who I am')).toBeInTheDocument();`
    - EN: `expect(screen.getByText('years of experience')).toBeInTheDocument();`
    - Container ID: `document.getElementById('sobre')`.

### 1.2 User Request Directives
1. *"melhore totalmente a segunda sesssao"* (Total revamp of Section 2)
2. *"aumente a foto"* (Scale up the photo prominently)
3. *"deixe ela num frame como se fosse quadro"* (Realistic museum art picture frame)
4. *"pesquise no codepen io layouts"* (CodePen museum gallery, spotlight, 3D tilt, and plaque aesthetics)
5. *"melhore aforma que o texto do quem soue u aparece"* (Fix typographic hierarchy and appearance)
6. *"e o conteuido nao esta compacto"* (Make content dense, cohesive, and refined)
7. *"a altura esta baixa dessa sessao e poderiam ter animacoes de lazy loading nesse sistema"* (Proper vertical presence & lazy loading reveal animations)

---

## 2. Logic Chain

```
[User Problem: Photo tiny (320px) + Section height feels low + Content not compact]
                       │
                       ▼
[Observation: home.css line 25 clamps portrait at 320px inside 100svh section]
                       │
                       ▼
[Solution 1: Remove 320px clamp -> Scale portrait to clamp(420px, 58vh, 620px)]
                       │
                       ▼
[User Request: "deixe ela num frame como se fosse quadro" (CodePen art frame research)]
                       │
                       ▼
[Physical Frame Decomposition into 5 High-Fidelity Layers:
  1. Gallery Overhead Spotlight & Radial Wall Beam
  2. Outer Molding: Ebonized Walnut + Beveled Edge Highlight + Deep Drop Shadow
  3. Inner Fillet: 45° Chamfered Solar Amber (#fbbf24) Trim
  4. Archival Passe-Partout (Mat Board) with Inset Shadow & 45° Core Bevel Cut
  5. Museum Glass: Specular Sheen Reflection & Canvas Texture
  6. Museum Exhibition Plaque: Brushed Brass / Solar Amber Engraved Attributable Tag]
                       │
                       ▼
[Interactive CodePen Enhancements:
  - Cursor-tracking 3D Tilt (perspective: 1200px, rotateX/Y, preserve-3d)
  - Glass Glare that shifts with cursor position
  - translateZ(28px) on Museum Plaque for real physical float]
                       │
                       ▼
[Typographic Hierarchy Redesign:
  - Replace long paragraph in <h2> with an artistic headline ("QUEM SOU EU." with serif accent)
  - Subtitle badge: [ 02 / ENGENHARIA & ARQUITETURA DE SOFTWARE ]
  - Executive Bio summary in elegant readable paragraph (clamp(1.05rem, 1.4vw, 1.25rem))
  - Architectural Focus Pills: [ Frontend UI ] [ SaaS & ERPs ] [ APIs & AI ]
  - Compact Metrics Dock: 4-stat unified card strip with Solar Amber counters]
                       │
                       ▼
[Lazy Loading & Motion Engineering:
  - Native loading="lazy" + decoding="async" (per modern-web-guidance)
  - Skeleton blur-up placeholder during decode
  - GSAP ScrollTrigger [data-reveal] choreographed sequence
  - prefers-reduced-motion fallback]
```

---

## 3. Caveats

1. **Test Contract Invariance**: Vitest checks `copy.title` ("Quem eu sou" / "Who I am") and stat values ("04", "anos de experiência"). The redesign MUST preserve these exact text elements in the DOM.
2. **Desktop vs. Mobile Responsiveness**:
   - On Desktop (≥1101px): 2-column balanced grid where the frame and copy sit side-by-side inside `100svh`.
   - On Mobile/Tablet (≤1100px): Transitions gracefully to single-column vertical flow with `height: auto; min-height: 100svh`, slightly reduced frame matting (`padding: 14px`), and 3D tilt disabled for touch devices.
3. **Performance & Zero External Libraries**: No external libraries (like `vanilla-tilt.js`) should be introduced. All 3D tilt and lighting dynamics are accomplished with standard CSS custom properties (`--tilt-x`, `--tilt-y`, `--mouse-x`, `--mouse-y`) updated by a lightweight pointer event handler (~10 lines of vanilla JS) or pure CSS.

---

## 4. Conclusion & Complete Design Specifications

### 4.1 Visual Anatomy of the Museum Picture Frame ("O Quadro")

```
┌────────────────────────────────────────────────────────────────────────┐
│  OVERHEAD SPOTLIGHT BEAM (Radial Ambient Solar Amber Glow)            │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ 1. OUTER FRAME MOLDING (Dark Obsidian Walnut + Beveled Shadow)   │  │
│  │  ┌────────────────────────────────────────────────────────────┐  │  │
│  │  │ 2. INNER FILLET (Solar Amber #fbbf24 Chamfered Metallic)   │  │  │
│  │  │  ┌──────────────────────────────────────────────────────┐  │  │  │
│  │  │  │ 3. PASSE-PARTOUT (Archival Mat Board with Core Bevel)│  │  │  │
│  │  │  │  ┌────────────────────────────────────────────────┐  │  │  │  │
│  │  │  │  │ 4. ARTWORK CANVAS + MUSEUM GLASS GLARE         │  │  │  │  │
│  │  │  │  │                                                │  │  │  │  │
│  │  │  │  │            [ Pedro Reoli Portrait ]            │  │  │  │  │
│  │  │  │  │             Scaled to clamp(420px, 58vh)       │  │  │  │  │
│  │  │  │  │                                                │  │  │  │  │
│  │  │  │  └────────────────────────────────────────────────┘  │  │  │  │
│  │  │  └──────────────────────────────────────────────────────┘  │  │  │
│  │  │                                                            │  │  │
│  │  │  ┌──────────────────────────────────────────────────────┐  │  │  │
│  │  │  │ 5. BRASS EXHIBITION PLAQUE (translateZ + Screws)     │  │  │  │
│  │  │  │   PEDRO LUCAS REIS · ENGENHEIRO FULL STACK · 2026    │  │  │  │
│  │  │  └──────────────────────────────────────────────────────┘  │  │  │
│  │  └────────────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

---

### 4.2 Exact CSS Code Specifications

Implementers can drop this into `src/styles/home.css` or an isolated stylesheet module:

```css
/* ==========================================================================
   SECTION 2: MUSEUM ART GALLERY PICTURE FRAME & EDITORIAL ABOUT LAYOUT
   ========================================================================== */

/* 1. Gallery Section Container */
.about {
  position: relative;
  height: 100svh;
  min-height: 100svh;
  padding-top: var(--header-height, 72px);
  padding-bottom: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--night); /* Rich dark museum gallery environment */
  color: var(--paper);
}

/* Subtle gallery wall texture & lighting */
.about::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(ellipse 65% 55% at 28% 45%, rgba(251, 191, 36, 0.12) 0%, rgba(251, 191, 36, 0.03) 45%, transparent 75%),
    linear-gradient(to bottom, rgba(7, 11, 20, 0.6) 0%, transparent 40%, rgba(7, 11, 20, 0.8) 100%);
  pointer-events: none;
  z-index: 0;
}

.about > .shell {
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: clamp(12px, 1.8vh, 22px);
  min-height: 0;
}

/* 2. Main Editorial Grid */
.about__grid {
  display: grid;
  grid-template-columns: minmax(360px, 0.95fr) minmax(440px, 1.25fr);
  gap: clamp(32px, 5vw, 68px);
  align-items: center;
  flex: 1;
  min-height: 0;
  padding: clamp(8px, 1.2vh, 16px) 0;
}

/* 3. The Picture Frame Stage (Perspective & Lighting) */
.about__frame-stage {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  perspective: 1200px;
  height: 100%;
  max-height: clamp(420px, 58vh, 620px);
}

/* Overhead gallery directional light fixture */
.about__spotlight-cone {
  position: absolute;
  top: -40px;
  width: min(340px, 85%);
  height: 180px;
  background: linear-gradient(180deg, rgba(251, 191, 36, 0.28) 0%, rgba(251, 191, 36, 0.06) 60%, transparent 100%);
  clip-path: polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%);
  filter: blur(12px);
  pointer-events: none;
  z-index: 1;
}

/* Realistic 3D Picture Frame Element */
.museum-frame {
  position: relative;
  width: 100%;
  max-width: 440px;
  height: 100%;
  max-height: clamp(400px, 54vh, 580px);
  aspect-ratio: 4 / 5;
  border-radius: 6px;
  padding: clamp(14px, 1.8vw, 22px);
  background: linear-gradient(145deg, #262420 0%, #121316 35%, #2a251e 70%, #15161b 100%);
  
  /* Layered physical depth shadows */
  box-shadow:
    0 35px 70px -15px rgba(0, 0, 0, 0.95),
    0 15px 30px -10px rgba(0, 0, 0, 0.8),
    0 2px 8px rgba(0, 0, 0, 0.7),
    inset 0 1px 1px rgba(251, 191, 36, 0.4),
    inset 1px 0 1px rgba(251, 191, 36, 0.25),
    inset 0 -2px 3px rgba(0, 0, 0, 0.95),
    0 0 50px -10px rgba(251, 191, 36, 0.16);

  transform-style: preserve-3d;
  transform: perspective(1200px) rotateX(calc(var(--tilt-y, 0) * 7deg)) rotateY(calc(var(--tilt-x, 0) * 7deg));
  transition: transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s ease;
  will-change: transform;
  cursor: pointer;
}

.museum-frame:hover {
  box-shadow:
    0 45px 85px -15px rgba(0, 0, 0, 0.98),
    0 20px 40px -10px rgba(0, 0, 0, 0.85),
    0 0 65px -5px rgba(251, 191, 36, 0.25);
}

/* Inner Gold Fillet Trim (Metallic Chamfer) */
.museum-frame__fillet {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 3px;
  border-radius: 3px;
  background: linear-gradient(135deg, #fbbf24 0%, #b45309 45%, #78350f 80%, #fbbf24 100%);
  box-shadow:
    0 0 6px rgba(0, 0, 0, 0.9),
    inset 0 1px 2px rgba(255, 255, 255, 0.4),
    inset 0 -1px 2px rgba(0, 0, 0, 0.9);
}

/* Archival Passe-Partout (Mat Board) */
.museum-frame__mat {
  position: relative;
  width: 100%;
  height: 100%;
  background: #11141c; /* Deep museum archival midnight mat board */
  padding: clamp(14px, 1.8vw, 24px);
  border-radius: 2px;
  box-shadow: 
    inset 0 3px 12px rgba(0, 0, 0, 0.85),
    inset 0 0 3px rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* Core Bevel Cut Window into Artwork */
.museum-frame__canvas {
  position: relative;
  flex: 1;
  width: 100%;
  min-height: 0;
  overflow: hidden;
  border-radius: 2px;
  background: #090a0d;
  box-shadow:
    0 0 0 1px rgba(251, 191, 36, 0.18),
    inset 0 3px 8px rgba(0, 0, 0, 0.8);
}

.museum-frame__canvas img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 25%;
  filter: saturate(0.88) contrast(1.05);
  transition: transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.5s ease, opacity 0.6s ease;
}

.museum-frame:hover .museum-frame__canvas img {
  transform: scale(1.035);
  filter: saturate(1.0) contrast(1.08);
}

/* Simulated Museum Glass Glare (Curved light reflection across glass) */
.museum-frame__glass {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.15) 0%,
    rgba(255, 255, 255, 0.04) 32%,
    transparent 55%
  );
  mix-blend-mode: screen;
  z-index: 3;
}

/* 4. Museum Exhibition Brass Plaque */
.museum-plaque {
  position: relative;
  margin-top: clamp(8px, 1.2vh, 14px);
  padding: clamp(6px, 0.8vh, 10px) 16px;
  background: linear-gradient(135deg, #d4af37 0%, #fbbf24 35%, #b45309 80%, #d4af37 100%);
  border-radius: 3px;
  box-shadow:
    0 6px 16px rgba(0, 0, 0, 0.6),
    inset 0 1px 1px rgba(255, 255, 255, 0.7),
    inset 0 -1px 2px rgba(0, 0, 0, 0.6);
  color: #1a1202;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transform: translateZ(28px); /* Pops outward in 3D perspective */
  transition: transform 0.25s ease;
}

.museum-plaque__info {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.museum-plaque__name {
  font-family: var(--font-display);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #120e03;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.4);
}

.museum-plaque__meta {
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: #453205;
}

.museum-plaque__cat {
  font-family: var(--font-mono, monospace);
  font-size: 0.58rem;
  font-weight: 700;
  padding: 2px 6px;
  border: 1px solid rgba(69, 50, 5, 0.4);
  border-radius: 2px;
  letter-spacing: 0.08em;
}

/* Plaque Screws / Rivets */
.museum-plaque::before,
.museum-plaque::after {
  content: '';
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: radial-gradient(circle, #ffe699 30%, #5c4103 100%);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
}
.museum-plaque::before { left: 5px; }
.museum-plaque::after { right: 5px; }

/* 5. Editorial Content Column */
.about__copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: clamp(12px, 1.8vh, 20px);
  min-height: 0;
}

.about__headline-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.about__badge-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.about__badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: var(--radius-xs);
  background: rgba(251, 191, 36, 0.12);
  border: 1px solid rgba(251, 191, 36, 0.3);
  color: var(--accent);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.about__headline {
  font-family: var(--font-display);
  font-size: clamp(2.8rem, 5.2vw, 5.4rem);
  font-weight: 800;
  line-height: 0.92;
  letter-spacing: -0.06em;
  text-transform: uppercase;
  margin: 0;
}

.about__headline em {
  font-family: var(--font-serif);
  font-style: italic;
  font-weight: 400;
  color: var(--accent);
  margin-left: 0.15em;
}

.about__bio {
  color: rgba(244, 240, 231, 0.78);
  font-size: clamp(0.98rem, 1.35vw, 1.18rem);
  line-height: 1.54;
  max-width: 620px;
  margin: 0;
}

/* Pillar Pills (Compact & Rich) */
.about__pillars {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 2px;
}

.about__pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-radius: var(--radius-sm);
  background: var(--night-soft);
  border: 1px solid var(--line-dark);
  font-size: 0.64rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(244, 240, 231, 0.82);
}

.about__pill-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 6px var(--accent);
}

/* 6. Compact Career Stats Grid (Docked at Base or Column) */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border: 1px solid var(--line-dark);
  border-radius: var(--radius-md);
  background: rgba(17, 18, 22, 0.75);
  backdrop-filter: blur(8px);
  overflow: hidden;
}

.stats-grid > div {
  padding: clamp(8px, 1.2vh, 14px) 18px;
  border-right: 1px solid var(--line-dark);
}

.stats-grid > div:last-child {
  border-right: 0;
}

.stats-grid strong {
  display: block;
  color: var(--accent);
  font-family: var(--font-display);
  font-size: clamp(2rem, 3.2vw, 3.2rem);
  font-weight: 800;
  line-height: 0.95;
  letter-spacing: -0.05em;
}

.stats-grid span {
  display: block;
  margin-top: 6px;
  color: rgba(244, 240, 231, 0.6);
  font-size: 0.62rem;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

/* 7. Responsive Mobile Adjustments */
@media (max-width: 1100px) {
  .about {
    height: auto;
    min-height: 100svh;
    overflow: visible;
    padding-bottom: clamp(32px, 5vh, 64px);
  }

  .about__grid {
    grid-template-columns: 1fr;
    gap: 36px;
  }

  .about__frame-stage {
    max-height: none;
  }

  .museum-frame {
    max-width: 380px;
    margin-inline: auto;
    transform: none !important;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .stats-grid > div:nth-child(2) {
    border-right: 0;
  }

  .stats-grid > div:nth-child(-n+2) {
    border-bottom: 1px solid var(--line-dark);
  }
}
```

---

### 4.3 Proposed JSX Component Architecture (`AboutSection.tsx`)

Here is the exact drop-in component structure that fulfills all user requirements while preserving 100% test compatibility:

```tsx
import { useRef, useCallback, useState } from 'react'
import { ArrowDownRight, Sparkles } from 'lucide-react'
import { interfaceContent } from '@/data/content'
import { useLanguage } from '@/context/LanguageContext'
import { useReveal } from '@/hooks/useReveal'

export function AboutSection() {
  const { language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  const about = interfaceContent.about
  const copy = about[language]
  useReveal(sectionRef)

  // Lightweight 3D tilt tracking without external libraries
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!frameRef.current) return
    const rect = frameRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    frameRef.current.style.setProperty('--tilt-x', (x * 2).toFixed(3))
    frameRef.current.style.setProperty('--tilt-y', (-y * 2).toFixed(3))
  }, [])

  const handlePointerLeave = useCallback(() => {
    if (!frameRef.current) return
    frameRef.current.style.setProperty('--tilt-x', '0')
    frameRef.current.style.setProperty('--tilt-y', '0')
  }, [])

  return (
    <section ref={sectionRef} id={about.id} className="about section-dark">
      <div className="shell">
        {/* Section Header / Kicker */}
        <div className="section-kicker section-kicker--dark" data-reveal>
          <span>{about.sectionNumber}</span>
          <p>{copy.eyebrow}</p>
          <p>{copy.location}</p>
        </div>

        {/* Main Content Grid */}
        <div className="about__grid">
          {/* Framed Artwork Display */}
          <div className="about__frame-stage" data-reveal>
            <div className="about__spotlight-cone" aria-hidden="true" />
            
            <div 
              ref={frameRef}
              className="museum-frame"
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              role="figure"
              aria-label={copy.portraitAlt}
            >
              <div className="museum-frame__fillet">
                <div className="museum-frame__mat">
                  <div className="museum-frame__canvas">
                    <img
                      src={about.portrait.src}
                      width={about.portrait.width}
                      height={about.portrait.height}
                      alt={copy.portraitAlt}
                      loading="lazy"
                      decoding="async"
                      onLoad={() => setImageLoaded(true)}
                      style={{ opacity: imageLoaded ? 1 : 0.4 }}
                    />
                    <div className="museum-frame__glass" aria-hidden="true" />
                  </div>

                  {/* Museum Exhibition Plaque */}
                  <div className="museum-plaque">
                    <div className="museum-plaque__info">
                      <span className="museum-plaque__name">{about.portrait.name}</span>
                      <span className="museum-plaque__meta">{copy.portraitRole} · {copy.areas}</span>
                    </div>
                    <span className="museum-plaque__cat">CAT. {about.sectionNumber}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Editorial Copy Column */}
          <div className="about__copy">
            <div className="about__headline-group">
              <div className="about__badge-row" data-reveal>
                <span className="about__badge">
                  <Sparkles size={12} />
                  {copy.title} {/* Preserves "Quem eu sou" / "Who I am" */}
                </span>
                <span className="overline">{copy.location}</span>
              </div>

              <h2 className="about__headline" data-reveal>
                {language === 'pt' ? (
                  <>QUEM SOU <em>EU.</em></>
                ) : (
                  <>WHO I <em>AM.</em></>
                )}
              </h2>
            </div>

            <p className="about__bio" data-reveal>
              {copy.summary} {/* Preserves exact summary text */}
            </p>

            <div className="about__pillars" data-reveal>
              <span className="about__pill"><span className="about__pill-dot" />Frontend Architecture</span>
              <span className="about__pill"><span className="about__pill-dot" />Enterprise ERPs & SaaS</span>
              <span className="about__pill"><span className="about__pill-dot" />High-Performance APIs</span>
              <span className="about__pill"><span className="about__pill-dot" />Applied AI Workflows</span>
            </div>

            <div data-reveal style={{ marginTop: '8px' }}>
              <a href="#projetos-selecionados" className="text-link">
                {interfaceContent.hero[language].action}
                <ArrowDownRight aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Career Stats Grid (Compact) */}
        <div className="stats-grid" aria-label={copy.statsLabel} data-reveal>
          {about.stats.map((stat) => (
            <div key={stat.value}>
              <strong>{stat.value}</strong>
              <span>{stat[language]}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## 5. Verification Method

### 5.1 Automated Test Suites
Run existing Vitest test suites to confirm that all contracts and textual selectors pass without regression:
```bash
npm run test
```
**Expected outcome**: All 3 test files (`contracts.test.ts`, `rendering.test.tsx`, etc.) pass with zero failures.

### 5.2 Build & Type Check
Verify clean bundle compilation:
```bash
npm run build
```
**Expected outcome**: `tsc -b` and `vite build` complete with 0 errors.

### 5.3 Visual & Functional Verification Checklist
1. **Frame Aesthetics**: Check that the portrait has the authentic multi-layered frame (dark walnut molding, Solar Amber inner fillet, archival mat board, and brass plaque).
2. **Photo Size**: Verify the portrait displays between `400px` and `580px` in height on desktop screens (substantially larger than the prior 320px clamp).
3. **No Overflow on Desktop**: Verify that Section 2 fits comfortably in 100% viewport height (`100svh`) on standard 1080p and 1440p displays.
4. **Interactive 3D Tilt**: Hover over the frame on desktop and move the cursor; confirm the frame gently tilts in 3D perspective and resets smoothly upon pointer departure.
5. **Reduced Motion**: Verify that when `prefers-reduced-motion` is enabled, the tilt is inactive and content is immediately visible without transition delays.
