# ENGINEERING STANDARDS — Video Backdrop (contrato canônico)

Owner: LayoutGuard · Squad: frontend-squad · Repo: `F:\Projetos\Pessoais\portfolios\pedroreoli-portfolio`
Branch de referência: `feat/video-wallpaper` · Plano: `.agents/teamwork/frontend-squad/PLANO-VIDEO-WALLPAPER.md`
Status: **spec de revisão** — LayoutGuard não edita código. FrontendCraft implementa; este documento é o critério de aceite.

---

## 0. Regra suprema aplicada a esta camada

O pior risco deste redesign não é o vídeo: é **criar uma segunda camada de fundo concorrente** com a atual (`HeroScene`, `hero__background-wrap`, `.section-light/.section-dark`) e uma terceira no mobile. Uma camada de fundo. Um `<video>`. Um componente. Se a implementação precisar de dois decoders de vídeo para funcionar, ela está errada, não é "otimizada".

---

## 1. Componente canônico único

```
src/components/scene/VideoStage.tsx      // o único dono da camada de vídeo
src/styles/backdrop.css                  // o único dono do CSS da camada (ver LIMITES-ARQUIVOS.md)
```

**Nome canônico:** `VideoStage`.

Proibido existir, em qualquer pasta:

- segundo componente de fundo (`BackgroundVideo`, `VideoWallpaper`, `VideoBackground`, `BackdropLayer`, `HeroVideo`, `GlobalVideo`…);
- segunda tag `<video>`/`<img>` de fundo em `HeroSection`, `AboutSection`, `SelectedProjectsSection`, `StackSection`, `PurposeSection` ou `ExperienceSection`;
- lógica de clipe/vídeo dentro de componente de seção (`play()`, `currentTime`, `IntersectionObserver` de clipe, `markers`);
- `HeroScene.tsx` e `VideoStage` renderizando fundo ao mesmo tempo. `HeroScene` é o background atual: se o `VideoStage` assume, `HeroScene` sai da montagem da Home ou vira poster estático — **nunca** os dois vivos.

**Montagem:** uma única vez, em `HomePage`, como primeiro filho de `.home`. Outras páginas (`/projetos`, `/midia-blog`, `/404`) **não** montam `VideoStage` nesta rodada — sem backdrop fora da Home (o `HeroScene` atualmente só existe na Home; manter o escopo).

### 1.1 Props (TypeScript, congeladas)

```tsx
import type { SceneClipsContent } from '@/types/content'

export interface VideoStageProps {
  /** Playlist; default: `sceneClips` de `@/data/content`. Nunca hardcoded no componente. */
  clips?: SceneClipsContent
  /** id da seção ativa vindo do consumidor, quando ele já sabe (opcional). */
  activeSectionId?: string
  /**
   * Emite o id do clipe que entrou em hold e os markers cruzados.
   * Permite a S2 sincronizar a camada `pedro-photo` sem timers soltos.
   * Só eventos; o VideoStage NÃO desenha conteúdo de seção.
   */
  onClipEvent?: (event: VideoStageEvent) => void
  /** Força modo poster (dev/teste). Não é para uso em produção. */
  forcePoster?: boolean
}

export type VideoStageEvent =
  | { type: 'clip-start'; clipId: string; sectionId: string }
  | { type: 'clip-hold'; clipId: string; sectionId: string }
  | { type: 'marker'; clipId: string; marker: string; at: number }
  | { type: 'error'; clipId: string | null; reason: 'decode' | 'network' | 'autoplay' | 'unsupported' }
  | { type: 'mode'; mode: VideoStageMode }

export type VideoStageMode = 'video' | 'poster'
```

Regras das props:

- Máximo **4**. Qualquer prop nova (`onVideoReady`, `scrimOpacity`, `clipIndex`, `scrollProgress`…) é rejeitada na revisão — o estado interno pertence ao componente.
- Nenhuma prop booleana por seção (`showPhoto`, `isProjects`, `dimForStack`). Sincronização por seção passa por `onClipEvent` + CSS (`[data-scene="sobre"]`).
- `clips` existe só para testar com fixture; a fonte de verdade é `content/sceneClips.json`.

### 1.2 Estado interno permitido

`mode` (`video|poster`), índice do clipe ativo, `heldAt`, `errorReason`. Nada de estado por seção, nada de `useState` espelhando scroll (usar refs + rAF).

---

## 2. Contrato de dados — `content/sceneClips.json`

Tipos já existem em `src/types/content.ts` (`SceneClipsContent`, `SceneClip`, `SceneClipMarker`) e o JSON já existe — este contrato **valida o que está lá** e trava o que não pode mudar.

```jsonc
{
  "version": 1,                                   // obrigatório; bump em mudança incompatível
  "basePath": "/media/backdrop",                  // informativo; src/poster são absolutos de public/
  "heroPoster": "/media/backdrop/01-hero-poster.webp",
  "fallbackPoster": "/images/pedro-bust-cyber.jpg", // OBRIGATÓRIO no código; ausente = erro de contrato
  "clips": [
    {
      "id": "hero-to-about",                      // kebab-case único, = nome do arquivo base
      "from": "hero",                             // id de seção REAL (interfaceContent.*.id)
      "to": "sobre",
      "src": "/media/backdrop/01-hero-to-about.mp4",
      "webm": "/media/backdrop/01-hero-to-about.webm",
      "holdAt": 6.2,                              // segundos; = timecode do frame congelado
      "duration": 8.0,                            // segundos; >= holdAt
      "poster": "/media/backdrop/02-about-poster.webp", // frame do hold (poster da seção `to`)
      "markers": [{ "name": "pedro-photo", "at": 3.4 }, { "name": "statue-back", "at": 5.1 }]
    }
  ]
}
```

### 2.1 Invariantes verificáveis (a falha é bloqueio de merge)

| # | Invariante | Como verificar |
|---|---|---|
| C1 | `version === 1` | leitura do JSON |
| C2 | `heroPoster`, `fallbackPoster` e todo `poster`/`src`/`webm` são caminhos absolutos começando em `/` | script/leitura |
| C3 | `clips.length >= 1`; cada `id` único e kebab-case | script |
| C4 | `from`/`to` são ids reais de seção da Home: `hero`, `sobre`, `projetos-selecionados`, `stack`, `proposito`, `experiencia`, `contato` — **não** as chaves do objeto (`selectedProjects`, `about`, `stack`…). O JSON atual está correto. | script comparando com `interfaceContent.*.id` |
| C5 | `0 < holdAt <= duration` | script |
| C6 | `markers` (quando existem): `0 <= at <= holdAt`, `name` único dentro do clipe | script |
| C7 | `basePath` não é usado para concatenar em runtime (todos os caminhos são absolutos) | leitura do componente |
| C8 | Nenhuma duração de clipe aparece hardcoded no `.tsx`; só `holdAt` do JSON | grep |
| C9 | Se `06-experience-loop` existir: `from === to === "experiencia"` e **não** participa da cadeia `N→N+1` (é loop terminal, não é uma 7ª seção) | leitura |
| C10 | `fallbackPoster` existe (`/images/pedro-bust-cyber.jpg` — confirmado no repo) | `fs.existsSync` |

**Fonte da playlist:** importada de `@/data/content` (`sceneClips` já é exportado). É conteúdo, não lógica: proibido `fetch('/content/sceneClips.json')` em runtime (quebra o build hash e o teste).

**Cadeia:** `clips[i].poster === clips[i+1].heroPoster`-equivalente (o poster da seção `to` é o frame em `holdAt`). Se o MediaForge entregar timecodes diferentes dos `holdAt` atuais, **quem muda é o JSON**, nunca o código.

---

## 3. Camadas, z-index e scrim

### 3.1 Escala canônica (única no repo)

| Papel | z-index | Token/classe |
|---|---|---|
| vídeo de fundo (dentro do stage) | `0` | `.video-stage__media` |
| scrim/leitura do vídeo (dentro do stage) | `1` | `.video-stage__scrim` |
| palco (stage wrapper, fixed) | `var(--z-backdrop-layer: 0)` | `.video-stage` |
| conteúdo das seções | `1` | `.home > section` / `.shell` |
| header (já existente) | `100` | `.site-header` |
| skip link (já existente) | `1000` | `.skip-link` |

- Nenhum `z-index` novo acima de `10` sem justificativa escrita nesta tabela. `100` (header) e `1000` (skip link) são intocáveis.
- `.video-stage` é `position: fixed; inset: 0; pointer-events: none;`. Como fica **fora** do fluxo e deve cobrir a viewport com o header e as seções acima, o wrapper do stage **não** pode criar contexto de empilhamento que empurre o conteúdo: `.home` **não** recebe `position` + `z-index` novos junto com `transform`/`filter` (isso cria stacking context e prende o conteúdo abaixo do backdrop). `.home` continua `position: relative` sem `z-index` (ou `z-index: auto`).
- `overflow` clampado: `overflow-x: clip` no `html`/`body` **só** se o rail novo da S3 transbordar. `overflow: hidden` em `body` é proibido (mata `position: sticky` do ScrollTrigger e o scroll natural).

### 3.2 Scrim

- O scrim é **do stage**, não da seção. Uma camada de gradiente por seção via `[data-scene="..."]` no `.video-stage`, alimentada pelos tokens `--video-scrim-*` que o ColorTokens entrega (`color-tokens/tokens.css-proposta.md`).
- Enquanto os tokens não existirem: valor local em `backdrop.css` com o gradiente atual do `.hero__vignette-overlay` reutilizado como base — **sem** criar paleta paralela e sem `#182033`.
- Contraste é responsabilidade compartilhada: LayoutGuard exige **AA (4.5:1) em texto corpo e AAA (7:1) em títulos pequenos** no pior frame do vídeo (mármore claro e círculo amarelo). Pior caso é texto claro sobre mármore → o scrim tem que resolver, não a sorte do frame.
- `backdrop-filter` só em painel de seção (S2/S4), nunca no stage; e com fallback opaco quando não suportado (`@supports not (backdrop-filter: blur(1px))`).

### 3.3 Regra de "nenhuma informação só no vídeo"

O vídeo é **decorativo**: `aria-hidden="true"`, `tabIndex={-1}`, sem legenda obrigatória. Nenhum conteúdo (título, nome de projeto, número, CTA, conquista) pode depender do vídeo. O poster e o HTML são a fonte de verdade. Isso implica: se o vídeo falhar, o site fica **completo**, apenas menos animado.

---

## 4. Modos e fallback (obrigatório, nesta ordem)

O stage resolve o modo uma vez por mudança de ambiente, com este predicado **único** (não espalhar em 6 lugares):

```ts
const posterOnly =
  forcePoster ||
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
  window.matchMedia('(max-width: 768px)').matches ||
  (navigator as { connection?: { saveData?: boolean } }).connection?.saveData === true ||
  Boolean(errorReason)
```

| Modo | Quando | O que existe no DOM | O que não existe |
|---|---|---|---|
| `poster` | reduced-motion, `max-width: 768px`, `saveData`, erro de vídeo, `forcePoster`, SSR/primeiro paint | `<img>` do `poster` da seção ativa (ou `fallbackPoster`) | `<video>`, `play()`, `preload` de clipes, decoders |
| `video` | desktop, sem restrição, após `canplay` do primeiro clipe | **1** `<video>` + scrim + `<img>` de poster como `poster`/estado inicial | segundo `<video>` |

Regras duras:

1. **Nada de vídeo abaixo de 769px**, nem decorativo, nem "só a hero". Mobile usa poster. (Pedro confirmou o conceito; o custo de decodificar vídeo em 360px não tem retorno.)
2. `prefers-reduced-motion: reduce` → poster **estático**, sem transição de clipe, sem autoplay. O `matchMedia` precisa de listener `change` (reagir a mudança em runtime, como `useReducedMotion` já faz). Preferir **reaproveitar `src/hooks/useReducedMotion.ts`** a reimplementar a query inline.
3. `saveData` → poster. Sem `preload`.
4. No modo poster o **site tem que ficar idêntico ao hero atual** (o fundo do hero continua sendo `pedro-bust-cyber.jpg`); a troca poster→vídeo não pode gerar salto de layout.
5. O modo `poster` **não pode** deixar espaço em branco: o `img` é `object-fit: cover` (fundo), diferente do `contain` do hero atual — se a composição exigir `contain` para não cortar o busto, documentar por seção em `backdrop.css` com um único modificador.
6. Preview/dev sem assets: o stage **precisa** renderizar posters que ainda não existem sem 404 visível → `onError` no `<img>` cai para `fallbackPoster`.

---

## 5. Tratamento de erro de vídeo

| Situação | Detecção | Comportamento exigido |
|---|---|---|
| Arquivo ausente/404 | `onError` do `<video>` | emitir `{type:'error', reason:'network'}`, trocar para modo `poster` da seção atual, **manter o site inteiro** |
| Codec não suportado | `video.error.code === 4` ou `canPlayType` vazio | `reason:'unsupported'` → poster |
| Decode/abort | `MediaError.MEDIA_ERR_DECODE` | `reason:'decode'` → poster **daquele** clipe; não trava a cadeia (próxima seção tenta de novo, só 1 retry por clipe) |
| Autoplay bloqueado | `play()` rejeita `NotAllowedError` | `reason:'autoplay'` → poster, **silencioso** (sem console.error ruidoso; `console.warn` uma vez). Não pedir gesto ao usuário |
| `holdAt` além de `duration` | validação C5 | tratar como `holdAt = duration`; log único em dev |
| Troca de clipe com buffer vazio | `readyState < 3` no momento da troca | permanecer no poster do clipe anterior (nunca frame preto) e fazer `load()` do próximo; trocar quando `canplay` |

Regra de ouro: **erro de vídeo nunca derruba seção, nunca faz a página "pular", nunca apaga conteúdo.** Todo erro leva a `poster`, e o poster leva a `fallbackPoster`.

---

## 6. Proibido duplicar / proibido introduzir

1. **Nenhum segundo componente de fundo** (§1).
2. **Nenhum `!important` novo.** O `home.css` tem **70 ocorrências** hoje; o teto é `<= 70` e a meta é reduzir. Revisão conta: `grep -c "!important" src/styles/*.css`.
3. **Nenhuma lógica de vídeo por seção.** Seção não chama `play`, não lê `holdAt`, não conhece `markers`. Recebe somente classes/`data-scene` e, se precisar do beat da S2, o evento do stage.
4. **Nenhum CSS de seção em `backdrop.css`** e nenhum seletor `.video-stage*` fora de `backdrop.css`.
5. **Nenhum timer solto** (`setTimeout`) para sincronizar o beat da S2 — só `markers` do JSON.
6. **Nenhuma prop/estado por seção** no `VideoStage` (§1.1).
7. **Nenhuma duplicação de paleta**: nada de `#182033`, nada de novo `--scrim-*` além dos tokens do ColorTokens (ou do fallback único documentado).
8. **Nenhum vídeo com áudio** e nenhum `controls`.
9. **Nenhuma animação de reveal nova** além de: por-card na S6 e o stagger já existente. Não criar 3º sistema de animação (hoje convivem `gsap/ScrollTrigger`, `motion` — e o vídeo; um 4º é vetado).
10. **Nenhuma dependência npm nova** para este backdrop (sem `react-player`, `video.js`, `plyr`). `<video>` nativo resolve.

---

## 7. Acessibilidade da camada (mínimo não negociável)

- `aria-hidden="true"` no wrapper do stage, `pointer-events: none` em tudo.
- Foco visível preservado: nenhum `outline: none` novo; foco usa `--focus-ring-*` do ColorTokens quando existirem. O backdrop **não** pode encobrir o anel de foco (`z-index` do stage abaixo do conteúdo garante isso).
- `prefers-reduced-motion` respeitado em todos os níveis (vídeo + `motion` + GSAP).
- Navegação por teclado: o stage não recebe foco (`tabIndex={-1}`), não aparece na ordem de tab.
- Nenhuma informação veiculada só por movimento.
- `lang` de documento permanece `pt-BR`; nada do backdrop muda copy.

---

## 8. Leitura da implementação em curso (2026-11-06, `VideoStage.tsx` ainda em edição)

Estado observado no meio da rodada, para não ser surpresa na revisão. Nada aqui é correção de código — são os pontos que a revisão vai cobrar.

| Observado | Status | Ação exigida |
|---|---|---|
| `src/components/scene/VideoStage.tsx` com ~251 linhas, componente único, `<video>` único, `aria-hidden`, `data-mode` | **Aderente** | manter ≤ 300 linhas |
| `backdrop.css` **não existe**; classes `.video-stage*` sem CSS no repo | **Falha [B]** | criar `styles/backdrop.css` e o `@import` (LIMITES §2.1) — sem ele o stage não tem camada, z-index nem scrim |
| Overlay da foto real com `style={{ opacity }}` inline (CSS-in-JS) | **Falha [N]** | mover para `.video-stage__pedro-overlay[data-visible]` em CSS; JS só alterna o atributo |
| Na seção `hero`, `activeClip = null` → o clipe `hero-to-about` só toca quando o `sobre` entra, congelando antes da transição | **Falha [B] vs. cadeia do plano** | o clipe da transição `N→N+1` deve tocar enquanto N está ativo; na hero ele roda desde o frame 0 |
| Threshold de visibilidade `0.15` | **Risco** | o plano diz `0.5`; com seções de 100svh, 0.15 pode adiantar a troca. Justificar ou alinhar |
| `scrollIntoView`/medição por `getBoundingClientRect` em múltiplos efeitos | monitorar | preferir 1 `IntersectionObserver` (já existe) e 0 listeners de scroll |
| Props: componente sem `VideoStageProps` exportado (sem `onClipEvent`, sem `forcePoster`) | **Divergência do contrato §1.1** | exportar o tipo; mínimo `onClipEvent`/`forcePoster` para teste |
| Soma de `!important` no repo subiu de **70 → 91** durante a rodada | **Falha [B]** se a diferença vier de `src/styles` | localizar os 21 novos (não é `home.css`: continua 70) e remover/corrigir a especificidade |

## 9. Critério de aceite do contrato (resumo executável)

- [ ] Existe exatamente **1** arquivo `src/components/scene/VideoStage.tsx` e **0** outros componentes de fundo (`grep -riE "backgroundvideo|videowallpaper|videobackdrop|backdroplayer" src/` vazio).
- [ ] `HomePage` monta `<VideoStage />` uma vez; nenhuma seção monta `<video>`.
- [ ] `sceneClips.json` satisfaz C1–C10.
- [ ] `props` <= 4 e nenhuma prop booleana de seção.
- [ ] Modo `poster` comprovado em 360/768px, `reduced-motion` e `saveData`, com o site completo.
- [ ] Remover o `.mp4` do disco (ou renomear) mantém a Home funcional via poster.
- [ ] `grep -c "!important" src/styles/*.css` ≤ 70.
- [ ] z-index da camada = `0/1`, header `100`, skip link `1000` — nenhum valor novo fora da tabela §3.1.
- [ ] `src/styles/backdrop.css` existe e está importado; nenhuma classe `.video-stage*` sem regra CSS.
- [ ] `grep -c "!important" src/styles/*.css` voltou a ≤ 70 (subiu para 91 durante a rodada).
