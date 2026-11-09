# LIMITES DE ARQUIVO — mapa pós-plano e divisão de CSS

Owner: LayoutGuard · Repo: `F:\Projetos\Pessoais\portfolios\pedroreoli-portfolio` · Branch: `feat/video-wallpaper`
Teto de autoria: **750 linhas por arquivo de código** (`.ts/.tsx/.css`). Medido com `wc -l`.

---

## 1. Baseline medido (antes da entrega do FrontendCraft)

`wc -l` executado em 2026-11-06, estado do working tree (`feat/video-wallpaper`, 42 testes verdes):

| Arquivo | Linhas | Margem até 750 | Risco |
|---|---:|---:|---|
| `src/styles/home.css` | **609** | 141 | **CRÍTICO** — o plano adiciona ~150–200 linhas |
| `src/styles/responsive.css` | 398 | 352 | médio (S3/S4 responsivos entram aqui) |
| `src/styles/layout.css` | 279 | 471 | baixo |
| `src/styles/pages.css` | 79 | 671 | baixo |
| `src/styles/base.css` | 68 | 682 | baixo |
| `src/index.css` | 5 | 745 | baixo |
| `src/components/home/AboutSection.tsx` | 265 | 485 | médio (beat S2) |
| `src/components/home/HeroSection.tsx` | 181 | 569 | médio |
| `src/components/home/ExperienceSection.tsx` | 125 | 625 | médio |
| `src/components/home/SelectedProjectsSection.tsx` | 99 | 651 | **alto** — rail novo aumenta muito |
| `src/components/home/StackSection.tsx` | 42 | 708 | alto (rebuild) |
| `src/components/scene/HeroScene.tsx` | 97 | 653 | — |
| `src/components/scene/VideoStage.tsx` | **251 (em edição)** | 499 | novo — limite próprio de 300 linhas |
| `src/hooks/useReveal.ts` | 41 | 709 | — |
| `src/types/content.ts` | **538** | 212 | **CRÍTICO** — tipos do backdrop já entraram (+25) |
| `content/sceneClips.json` | 76 | — | JSON de conteúdo, teto não se aplica, mas cresce com clipes |

### Decomposição real do `home.css` (por faixa de linhas)

| Faixa | Conteúdo | Destino proposto |
|---|---|---|
| 1–242 | Hero (layout, botões, indicador de scroll) | permanece em `home.css` *ou* `hero.css` |
| 243–298 | Kicker global, About (moldura/museu), stats, heading da S3 | `styles/about.css` (kicker fica em `home.css`) |
| 299–332 | Projetos (`.project-showcase`, `.project-card*`, `.agent-art*`) | `styles/projects-rail.css` |
| 333–348 | Stack (`.stack-section`, `.stack-grid`) | `styles/stack.css` |
| 349–358 | Propósito (`.purpose-section*`) | `home.css` (aprovada, não mexer) |
| 358–397 | Experiência/timeline (`.timeline*`, `.experience*`) | `styles/experience.css` |
| 399–411 | `@media (max-width: 1100px)` e `prefers-reduced-motion` misturados | ver §4 |
| 413–536 | **Bloco "UNIFIED OVERRIDES"** com ~62 `!important` (About + Stack) | **eliminar** absorvendo nos donos |
| 533–599 | Purpose/Contact refinements (com `!important`) | `home.css` / `pages.css` |
| 600–609 | `@media (prefers-reduced-motion)` de reveal | `base.css` |

### Projeção pós-plano (se nada for dividido)

| Arquivo | Hoje | Δ estimado do plano | Projeção | Veredito |
|---|---:|---:|---:|---|
| `home.css` | 609 | +60 (scrim/responsivo) | ~670 | passa, mas **sem folga** |
| `home.css` com S3 rail + S4 rebuild + overrides novos | 609 | +170–230 | **780–840** | **ESTOURA 750** |
| `SelectedProjectsSection.tsx` | 99 | +80–120 (rail, artwork) | 180–220 | ok |
| `AboutSection.tsx` | 265 | +30–50 (beat foto) | 295–315 | ok |
| `types/content.ts` | 538 | +20 | ~558 | ok, mas é o 2º maior |

**Conclusão:** `home.css` estoura **antes** de a S3+S4 estarem completas. A divisão não é estética — é condição de passar o teto.

---

## 2. Estratégia escolhida (e por que)

`home.css` é **lido por string em 2 testes** (`section2-layout-stress.test.tsx:19`, `sections3-4-layout-stress.test.tsx:21`) com regex de bloco (`.project-showcase { … grid-template-columns: repeat(2, 1fr) }`). Mover `home.css` inteiro para partials quebra esses testes **sem** ser regressão de produto — e o plano exige "sem quebrar os testes existentes".

Portanto, duas fases:

- **Fase A (agora, junto com o que o FrontendCraft já está escrevendo):** parciais **puramente aditivas**. `home.css` **não** perde suas linhas na Fase A; ela só **para de crescer**. Toda regra nova nasce em partials. Nenhum teste lido por string quebra porque nada foi movido.
- **Fase B (depois do gate de revisão):** quando `home.css` passar de ~690 linhas ou os 62 `!important` do bloco "UNIFIED OVERRIDES" forem consolidados, mover o CSS de S3 para `projects-rail.css`, S4 para `stack.css` e timeline para `experience.css`, **e no mesmo commit** atualizar os 2 testes de string para ler o partial correspondente (helper compartilhado, §4.3).

Nenhum dos dois lados pode consumir o teto: cada partial novo tem orçamento próprio abaixo.

### 2.1 Ordem de import canônica (`src/index.css`)

A ordem atual (`base → layout → home → pages → responsive`) é a cascata do projeto. `responsive.css` vence `home.css` por vir depois — isso é intencional e **não pode mudar**, senão o mobile perde os overrides.

```css
/* src/index.css — ordem obrigatória */
@import './styles/base.css';          /* tokens, reset, tipografia */
@import './styles/layout.css';        /* header, footer, skip link, shell */
@import './styles/backdrop.css';      /* VideoStage: stage, media, scrim, modos */
@import './styles/home.css';          /* hero, kicker, propósito, contato (núcleo atual) */
@import './styles/about.css';         /* S2: moldura, stats, pills (Fase B) */
@import './styles/projects-rail.css'; /* S3: rail alternado (Fase B) */
@import './styles/stack.css';         /* S4: rebuild do stack (Fase B) */
@import './styles/experience.css';    /* S6: timeline vertical (Fase B) */
@import './styles/pages.css';         /* páginas não-home, modais */
@import './styles/responsive.css';    /* SEMPRE penúltimo: media queries de todos */
@import './styles/reduced-motion.css';/* SEMPRE último: prefers-reduced-motion global */
```

Regras da ordem:

1. `backdrop.css` entra **depois** de `base.css` (usa tokens) e **antes** de `home.css` (seção precisa poder ajustar scrim localmente sem `!important`… e sem precisar: se precisar, é falha de contrato).
2. Partials de seção (Fase B) entram **depois** de `home.css` e **antes** de `responsive.css`: vencem o legado sem `!important`.
3. `responsive.css` continua **penúltimo**. `reduced-motion.css` por último (hoje esse bloco está no fim de `home.css` E em `responsive.css:384` — duplicado).
4. `@import` preserva a especificidade; **proibido** `@layer` nesta rodada (mudaria a cascata de 5 arquivos e os testes de string de uma vez só).
5. Ordem de `@media` dentro de cada arquivo: mobile-first não é necessário (o projeto é desktop-first), mas **não intercalar** `min-width` e `max-width` no mesmo arquivo.

### 2.2 Orçamento por arquivo (teto 750, meta operacional 400)

| Arquivo | Teto | Meta | Dono do conteúdo |
|---|---:|---:|---|
| `styles/base.css` | 750 | 120 | tokens, reset |
| `styles/layout.css` | 750 | 320 | header/footer/shell |
| `styles/backdrop.css` | 750 | **180** | só `.video-stage*` + scrim + modos |
| `styles/home.css` | 750 | **550** | hero + kicker + propósito + contato |
| `styles/about.css` (Fase B) | 750 | 160 | `.about*`, `.art-frame*`, `.stats-grid*` |
| `styles/projects-rail.css` | 750 | **220** | `.project-rail*`, `.project-card*`, `.agent-art*` |
| `styles/stack.css` | 750 | 130 | `.stack-*` |
| `styles/experience.css` (Fase B) | 750 | 180 | `.timeline*`, `.experience*` |
| `styles/pages.css` | 750 | 120 | páginas/modais |
| `styles/responsive.css` | 750 | **470** | media queries de todos |
| `styles/reduced-motion.css` | 750 | **30** | `prefers-reduced-motion` global |

Total projetado: **~2.480** linhas de CSS, nenhum arquivo > 750. Hoje o total é 1.435 em 5 arquivos (o maior 609).

---

## 3. Mapa por arquivo de código (TS/TSX) pós-plano

| Arquivo | Hoje | Projeção | Estado | Ação se passar |
|---|---:|---:|---|---|
| `scene/VideoStage.tsx` | — | **220–300** | novo | extrair `useVideoStageMode.ts` (modo/fallback) e `useClipPlaylist.ts` (cadeia/hold/markers) para `src/hooks/`; o `.tsx` fica só JSX+refs |
| `scene/HeroScene.tsx` | 97 | 97 → 0 na Home | congelar | se virar poster, manter <= 120 |
| `home/SelectedProjectsSection.tsx` | 99 | **180–240** | editar | extrair `ProjectRailItem.tsx` e mover `AchillesArtwork` para `scene/artworks/AgentArtwork.tsx` |
| `home/AboutSection.tsx` | 265 | **295–320** | editar | extrair o beat `pedro-photo` para `about/PhotoBeat.tsx` |
| `home/HeroSection.tsx` | 181 | 170–200 | editar | — |
| `home/ExperienceSection.tsx` | 125 | 140–170 | editar | reveal por card em hook próprio (`useCardReveal.ts`) se passar de 200 |
| `home/StackSection.tsx` | 42 | 60–90 | rebuild | — |
| `home/PurposeSection.tsx` | 34 | 34 | congelada | — |
| `hooks/useReveal.ts` | 41 | 41 (batch) | congelar | o reveal por card da S6 **não** vai aqui (quebraria as 4 seções que usam batch) |
| `hooks/useCardReveal.ts` | — | 40–60 | novo | ScrollTrigger por card |
| `types/content.ts` | **538** | **560–590** | editar | se passar de 620: dividir por domínio (`types/scene.ts`, `types/home.ts`) com re-export em `content.ts` para não tocar imports |
| `data/content.ts` | 32 | 34 | editar | já importa `sceneClips` |
| `pages/HomePage.tsx` | 25 | 35 | editar | monta `VideoStage` |

Teto por arquivo **de componente**: 300 linhas é a meta; 750 é o limite rígido. Componente de seção não deve conter dados, arte e animação juntos.

---

## 4. Procedimento de execução (sem quebrar teste)

### 4.1 Fase A — aditiva (FrontendCraft, nesta rodada)

1. Criar `src/styles/backdrop.css` com **apenas** `.video-stage*`, `.video-stage__media`, `.video-stage__scrim`, `[data-scene="…"]`, `@supports` de `backdrop-filter`, e a regra de `prefers-reduced-motion` da camada.
2. Adicionar `@import './styles/backdrop.css';` em `src/index.css` **na posição 3** (§2.1).
3. Regras novas de S3/S4/S6 que hoje morariam em `home.css` entram em `backdrop.css`? **Não.** Enquanto os partials de seção não existirem, elas entram em `home.css` **apenas** se `home.css` ficar ≤ 700 linhas. Se estourar, criar `projects-rail.css`/`stack.css` já na Fase A e só o `@import` (sem mover legado).
4. Nenhuma linha existente de `home.css` é movida na Fase A.

### 4.2 Fase B — migração por seção (um commit por partial)

Ordem obrigatória (menor risco primeiro): `stack.css` → `projects-rail.css` → `experience.css` → `about.css` → `reduced-motion.css`.

Cada commit:

1. move o bloco inteiro (nada de meio bloco em dois arquivos);
2. adiciona o `@import` na posição de §2.1;
3. atualiza **no mesmo commit** os testes de string que liam `home.css` (§4.3);
4. roda `npm run lint && npm test && npm run build`;
5. confere `wc -l` de origem **e** destino.

### 4.3 Testes que leem CSS por string (armadilha real)

`src/test/section2-layout-stress.test.tsx:19` e `src/test/sections3-4-layout-stress.test.tsx:21` fazem:

```ts
const homeCss = fs.readFileSync(path.join(projectRoot, 'src/styles/home.css'), 'utf-8')
```

Asserções que **quebram** se o bloco for movido (exemplos reais):

- `sections3-4` L147–149: `.project-showcase { grid-template-columns: repeat(2, 1fr) }`, `max-height: 480px`, `gap: 18px` → **esses testes já estão obsoletos pelo plano** (a S3 deixa de ser grid). Precisam ser reescritos para o rail, não só re-apontados.
- `sections3-4` L271–280: `.stack-grid { repeat(4, 1fr); min-height: 0 }`, `.stack-icon { width:20px; height:20px }`, `.stack-grid li strong { font-size: .68rem }` → **contradizem diretamente o pedido do Pedro** (ícones/títulos maiores). São asserções de "estado atual" que o redesign invalida.
- `sections3-4` L382–384: `.project-card__visual … max-height: 220px` e `.stack-grid { repeat(4,1fr) }` em `responsive.css`.

Proposta (a decisão de reescrita é do FrontendCraft, dono do código):

```ts
// src/test/helpers/styles.ts (novo, ~15 linhas)
import fs from 'fs'
import path from 'path'
const stylesDir = path.resolve(__dirname, '../../styles')
export const styleSource = (file: string) => fs.readFileSync(path.join(stylesDir, file), 'utf-8')
/** Lê todos os partials em ordem de cascata — imune a movimentação entre arquivos. */
export const allStyles = () =>
  ['base','layout','backdrop','home','about','projects-rail','stack','experience','pages','responsive','reduced-motion']
    .map(f => { const p = path.join(stylesDir, f + '.css'); return fs.existsSync(p) ? fs.readFileSync(p, 'utf-8') : '' })
    .join('\n')
```

Regra: **asserção de comportamento novo** (rail tem `--align`, ícone > 20px, `holdAt` respeitado) usa `allStyles()`; asserção de "onde a linha está" deixa de existir. Os testes que afirmam o layout antigo (`repeat(2, 1fr)`, `.68rem`) **devem ser atualizados para o novo requisito no commit que muda o layout** — não deletados, reescritos.

### 4.4 Guarda automatizada do teto

Script de ~12 linhas (não é dependência nova; roda em CI local ou no pre-commit do GitOps):

```js
// scripts/check-line-limit.mjs   → node scripts/check-line-limit.mjs
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
const MAX = 750
const roots = ['src']
const offenders = []
const walk = (dir) => readdirSync(dir).forEach((f) => {
  const p = join(dir, f)
  if (statSync(p).isDirectory()) return walk(p)
  if (!/\.(tsx?|css)$/.test(f) || /\.test\./.test(f)) return
  const n = readFileSync(p, 'utf8').split('\n').length
  if (n > MAX) offenders.push(`${p}: ${n}`)
})
roots.forEach(walk)
if (offenders.length) { console.error('Teto de 750 linhas estourado:\n' + offenders.join('\n')); process.exit(1) }
console.log('OK: nenhum arquivo acima de 750 linhas')
```

Não adicionar ao `package.json` nesta rodada se isso conflitar com as fronteiras do plano (FrontendCraft é o dono de `package.json`); LayoutGuard roda o comando manualmente na revisão.

---

## 5. Critérios de aceite

- [ ] `wc -l` de todo `.ts/.tsx/.css` de autoria ≤ 750; nenhum acima de 700.
- [ ] `VideoStage.tsx` ≤ 300; `home.css` ≤ 700; `backdrop.css` ≤ 200.
- [ ] `src/index.css` segue a ordem de §2.1 (`backdrop` na 3ª posição, `responsive` penúltimo).
- [ ] Nenhum bloco de seção dividido entre dois arquivos CSS.
- [ ] `npm test` verde **depois** de qualquer movimentação no mesmo commit.
- [ ] Nenhum `@layer` e nenhum `!important` novo (§ do contrato).
- [ ] Os dois testes que leem CSS por string usam `allStyles()` ou foram reescritos para o novo layout, nunca deletados.
