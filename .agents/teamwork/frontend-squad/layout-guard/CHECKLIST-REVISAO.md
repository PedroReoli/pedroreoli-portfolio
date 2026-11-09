# CHECKLIST DE REVISÃO — layout-guard (rodar após o FrontendCraft)

Owner: LayoutGuard · Repo: `F:\Projetos\Pessoais\portfolios\pedroreoli-portfolio` · Branch: `feat/video-wallpaper`
Base: `ENGINEERING-STANDARDS-video-backdrop.md` + `LIMITES-ARQUIVOS.md` (mesma pasta).
Baseline congelado em 2026-11-06: 42 testes verdes, `home.css` 609 linhas, 70 `!important`.

Legenda: **[B]** bloqueia merge · **[N]** não bloqueia mas exige issue · **manual** = precisa de browser/olho.

---

## 1. Gate automático (10 min, obrigatório)

| # | Item | Comando | Esperado | Sev. |
|---|---|---|---|---|
| 1.1 | Testes verdes | `npm test` | ≥ 42 testes, 0 falhas | [B] |
| 1.2 | Lint limpo | `npm run lint` | 0 erros, 0 warnings novos | [B] |
| 1.3 | Build de produção | `npm run build` | exit 0, sem aviso de chunk > 1 MB novo | [B] |
| 1.4 | Tetos de linha | `find src -name "*.tsx" -o -name "*.ts" -o -name "*.css" \| grep -v test \| xargs wc -l \| sort -n \| tail -15` | nenhum > 750; `home.css` ≤ 700; `VideoStage.tsx` ≤ 300 | [B] |
| 1.5 | `!important` não aumentou | `grep -c "!important" src/styles/*.css` | soma ≤ 70 (baseline 70 — **durante a rodada subiu para 91**) | [B] |
| 1.6 | Nenhum CSS inline novo | `grep -rn "style={{" src/components` | não cresceu vs. baseline (hoje: Hero/Sobre usam transform) | [N] |
| 1.7 | Nenhuma dependência nova | `git diff main -- package.json` | só scripts, se houver | [B] |
| 1.8 | Sem artefato/build no commit | `git status --short` | sem `dist/`, `*.tsbuildinfo`, `.playwright-cli/` | [N] |

---

## 2. Componente canônico único (VideoStage)

| # | Verificação | Comando/how | Esperado | Sev. |
|---|---|---|---|---|
| 2.1 | Existe 1 `VideoStage.tsx` | `ls src/components/scene/` | `VideoStage.tsx` (+ `HeroScene.tsx`) | [B] |
| 2.2 | Nenhum clone de fundo | `grep -riE "backgroundvideo\|videowallpaper\|videobackdrop\|backdroplayer\|globalvideo" src/` | vazio | [B] |
| 2.3 | Um único `<video>` no repo da Home | `grep -rn "<video" src/` | exatamente em `VideoStage.tsx` | [B] |
| 2.4 | Montado 1× | `grep -rn "VideoStage" src/` | `HomePage.tsx` (import) + `VideoStage.tsx` | [B] |
| 2.5 | Nenhuma seção monta fundo | `grep -rn "background-wrap\|<video\|<img" src/components/home/*.tsx` | nenhuma seção desenha vídeo de fundo; hero pode usar `<img>` poster **se** o stage já cobre (não duplicar) | [B] |
| 2.6 | Sem lógica de vídeo em seção | `grep -rn "holdAt\|currentTime\|\.play()\|markers" src/components/home/` | vazio | [B] |
| 2.7 | Props ≤ 4, sem prop por seção | leitura de `VideoStageProps` | ≤ 4, nenhuma `isProjects/showPhoto/dim*` | [B] |
| 2.8 | Playlist vem do JSON | `grep -rn "sceneClips" src/` | import de `@/data/content`; nenhum `fetch(` | [B] |
| 2.9 | Nenhum timecode hardcoded | `grep -rnE "[0-9]\.[0-9]\s*(s\|seg)" src/components/scene/VideoStage.tsx` | só leitura de `holdAt`/`at` | [B] |
| 2.10 | `HeroScene` não concorre com o stage | leitura de `HeroSection.tsx`/`HomePage.tsx` | no máximo um dos dois renderiza fundo | [B] |
| 2.11 | URL único de setup de fundo | `grep -rn "z-index" src/styles/*.css` | stage `0/1`, header `100`, skip link `1000`; nenhum valor novo > 10 fora da tabela do contrato | [B] |
| 2.12 | `styles/backdrop.css` existe e está importado | `test -f src/styles/backdrop.css && grep -n backdrop src/index.css` | arquivo na 3ª posição do `index.css` | [B] |
| 2.13 | Nenhum CSS inline no stage | `grep -n "style={{" src/components/scene/VideoStage.tsx` | vazio (usar `data-*` + CSS) | [N] |
| 2.14 | Clipe da transição toca enquanto a seção `from` está ativa | leitura do efeito de mapeamento | na hero, `hero-to-about` roda desde `currentTime = 0`; não congela antes de entrar em `sobre` | [B] |
| 2.15 | Contrato de props exportado | `grep -n "VideoStageProps" src/components/scene/VideoStage.tsx` | tipo exportado com `onClipEvent`/`forcePoster` | [N] |

---

## 3. Contrato de `content/sceneClips.json`

| # | Item | Esperado | Sev. |
|---|---|---|---|
| 3.1 | `version`, `heroPoster`, `fallbackPoster` presentes | sim | [B] |
| 3.2 | Caminhos absolutos (`/...`), `fallbackPoster` existe no disco | `test -f public/images/pedro-bust-cyber.jpg` | [B] |
| 3.3 | `from`/`to` = ids reais de seção (`interfaceContent.*.id`), não chaves do objeto | `hero`, `sobre`, `projetos-selecionados`, `stack`, `proposito`, `experiencia` | [B] |
| 3.4 | `0 < holdAt <= duration` em todos os clipes | validar com node | [B] |
| 3.5 | `markers[].at <= holdAt`, nomes únicos no clipe | sim | [B] |
| 3.6 | Nenhum clipe aponta para arquivo inexistente **sem** fallback de poster declarado | se asset ausente, o stage cai em `fallbackPoster` | [B] |
| 3.7 | Loop terminal (`06-experience-loop`) não é tratado como 7ª seção | `from === to` | [N] |
| 3.8 | JSON injetado, não copiado no componente | `clips` default = `sceneClips` | [B] |

Comando de validação 3.3–3.5 (copiar e rodar):

```bash
node -e "
const c=require('./content/sceneClips.json'),i=require('./content/interfaceContent.json');
const ids=new Set(['hero','sobre','projetos-selecionados','stack','proposito','experiencia','contato']);
let bad=[];
if(c.version!==1) bad.push('version');
if(!c.fallbackPoster) bad.push('fallbackPoster ausente');
const seen=new Set();
c.clips.forEach(k=>{
  if(seen.has(k.id)) bad.push('id dup '+k.id); seen.add(k.id);
  [k.from,k.to].forEach(s=>ids.has(s)||bad.push('secao invalida '+s));
  if(!(k.holdAt>0&&k.holdAt<=k.duration)) bad.push('holdAt '+k.id);
  (k.markers||[]).forEach(m=>{ if(m.at<0||m.at>k.holdAt) bad.push('marker '+k.id+' '+m.name) });
});
console.log(bad.length?'FALHA:\n'+bad.join('\n'):'OK contrato sceneClips');
"
```

---

## 4. Fallback obrigatório (o item mais importante)

Testar no browser (`npm run dev`), Console aberto, sem 404 de asset:

| # | Cenário | Como simular | Esperado | Sev. |
|---|---|---|---|---|
| 4.1 | `prefers-reduced-motion: reduce` | DevTools → Rendering → Emulate `prefers-reduced-motion` | **nenhum** `<video>` no DOM (`$0`/Elements), poster estático, site completo, reveal já visível | [B] |
| 4.2 | Mobile 360–768px | DevTools 360×800 e 768×1024 | nenhum `<video>`, poster correto por seção, sem 404 de `.mp4` na Network | [B] |
| 4.3 | `saveData` | DevTools → Network → throttling "Slow 3G" **e** override `navigator.connection.saveData = true` no console antes do load | modo poster, nenhum `preload` de mp4 | [B] |
| 4.4 | Vídeo quebrado | renomear temporariamente um `.mp4`/bloquear URL na aba Network (block request) | Home inteira funcional, cai em poster, **sem** tela preta/branca, sem erro não tratado no console | [B] |
| 4.5 | Poster ausente | bloquear o `.webp` também | cai em `fallbackPoster` (`/images/pedro-bust-cyber.jpg`) | [B] |
| 4.6 | Autoplay bloqueado | Chrome com "Autoplay" = Block (ou aba em background) | sem exceção no console, poster, sem prompt ao usuário | [B] |
| 4.7 | Poster→vídeo sem salto | carregar desktop normal e observar a 1ª troca | nenhum layout shift visível; composição do frame 0 compatível com `pedro-bust-cyber.jpg` | [B] |
| 4.8 | Rede lenta | throttling Fast 3G | poster aparece primeiro (LCP), vídeo entra depois; sem CLS | [N] |
| 4.9 | Troca entre clipes | scroll completo S1→S6 | nenhum frame preto/branco, sem "piscada", congelamento em `holdAt` sem salto | [B] |
| 4.10 | `reduced-motion` em runtime | alternar a emulação com a página aberta | transição imediata para poster, `<video>` desmontado, sem erro | [B] |

**Regra de leitura:** 4.1–4.7 são bloqueantes. Um site que quebra sem vídeo não tem fallback, tem dívida.

---

## 5. WCAG 2.2 — contraste

| # | Item | Como verificar | Alvo | Sev. |
|---|---|---|---|---|
| 5.1 | Texto corpo sobre scrim | DevTools/Stark/Axe no pior frame (mármore claro e círculo amarelo visíveis atrás do texto) | ≥ 4.5:1 | [B] |
| 5.2 | Títulos pequenos (< 24px regular / < 18.66px bold) | mesmo método | ≥ 7:1 quando possível; nunca < 4.5:1 | [B] |
| 5.3 | Texto claro sobre mármore (cenário crítico) | frame onde o busto está atrás da headline | scrim resolve; nenhum texto some | [B] |
| 5.4 | Texto escuro sobre amarelo `#ffc900` | labels/tags da S4 | ≥ 4.5:1 (preto sobre `#ffc900` passa; branco sobre amarelo **falha**) | [B] |
| 5.5 | Cards da Stack (S4) legíveis | medir `clamp()` real em 360/768/1024/1440 | título ≥ 16px efetivo, label ≥ 12.5px, sem ellipsis de 1 linha cortando nome | [B] |
| 5.6 | Estados de foco contrastados | navegar com Tab em cada seção | anel de foco ≥ 3:1 contra fundo **e** contra o vídeo | [B] |
| 5.7 | Tokens do ColorTokens aplicados | `grep -rn "video-scrim\|focus-ring\|panel-glass" src/styles` | presentes e consistentes com `color-tokens/tokens.css-proposta.md`; se pendentes, fallback único documentado | [N] |
| 5.8 | Nenhum texto sobre a área do vídeo sem scrim | leitura de `backdrop.css` + olho | 6 seções cobertas | [B] |

Ferramenta mínima: Lighthouse (Accessibility) ≥ 95 na Home + `@axe-core` não instalado → usar DevTools Lighthouse + inspeção manual. Não inventar ratio: se não conseguir medir, registrar "pendente" com o porquê.

---

## 6. WCAG — foco visível, teclado, semântica

| # | Item | How | Esperado | Sev. |
|---|---|---|---|---|
| 6.1 | Ordem de tab da S3 (rail) | Tab de cima a baixo | cada projeto alcançável na ordem visual (direita/esquerda), sem salto | [B] |
| 6.2 | Todo card do rail é um link/botão focável com nome acessível | DevTools Accessibility | `role=link`, nome = título do projeto | [B] |
| 6.3 | Foco não fica preso atrás do backdrop | Tab na hero | foco sempre visível acima da camada | [B] |
| 6.4 | Stage não recebe foco | `videoStage.tabIndex === -1`, `aria-hidden="true"` | sim | [B] |
| 6.5 | S6: novo reveal por card não esconde conteúdo do teclado/leitor | `opacity:0` + `visibility` | cards em `opacity:0` **não** devem ser focáveis sem revelar (usar `opacity` apenas, sem `display:none`) | [B] |
| 6.6 | Nenhuma `div` clicável sem role | `grep -rn "onClick" src/components` | todo onClick em link/button | [N] |
| 6.7 | Hierarquia de heading íntegra | `h1` único na hero, `h2` por seção, `h3` nos cards | S3/S4 mantêm h3 | [B] |
| 6.8 | `Sparkles` removido sem quebrar `aria-label` do capítulo | leitura de `ExperienceSection.tsx` | `#01` texto puro, sem ícone órfão | [B] |
| 6.9 | Landmarks | `main#main-content`, `section` com `aria-label`/`aria-labelledby` | inalterado | [N] |
| 6.10 | Reduced-motion no reveal por card | emular | cards visíveis sem animação | [B] |

---

## 7. Nenhuma informação exclusiva no vídeo

| # | Item | Verificação | Sev. |
|---|---|---|---|
| 7.1 | O beat "foto real do Pedro" tem equivalente em HTML | `AboutSection` já tem a moldura com `eu-profissional.png`; o beat é **redundante**, não informativo | [B] |
| 7.2 | O "busto apontando" para o item ativo não é único indicador | o item ativo tem estado visual próprio (borda/realce/cor) | [B] |
| 7.3 | Nenhum texto renderizado dentro do vídeo é necessário | assets sem texto por spec do MediaForge | [B] |
| 7.4 | Números, títulos, datas e CTAs todos em HTML | leitura | [B] |
| 7.5 | Poster + HTML sozinhos contam a história completa | modo poster do item 4.1 | [B] |

---

## 8. Responsividade (360 / 768 / 1024 / 1440)

| Viewport | Esperado | Sev. |
|---|---|---|
| **360×800** | 1 coluna; rail empilhado (mídia no topo, texto abaixo); stack 1 col; timeline 1 coluna sem rail central; **poster, sem vídeo**; sem scroll horizontal (`document.documentElement.scrollWidth <= 360`) | [B] |
| **768×1024** | rail empilhado ou 2 col; stack 2 col; **poster, sem vídeo** (limite = `max-width: 768px` inclusive); sem overflow-x | [B] |
| **1024×768** | rail alternando esquerda/direita **já ativo**; stack 4 col; timeline alternada ≥ 900px; vídeo permitido | [B] |
| **1440×900** | rail alternando com respiro; stack 4–5 col; scrim legível; poster→vídeo estável | [B] |
| Transição 1024→1280 | nada quebra ao cruzar os breakpoints (1100, 900); sem "salto" de altura | [N] |
| Zoom 200% | conteúdo não é cortado; rail não transborda | [N] |

Comando rápido de overflow (console, cada viewport):

```js
console.log(document.documentElement.scrollWidth, innerWidth) // scrollWidth <= innerWidth
```

---

## 9. Requisitos de produto do Pedro (conferência visual)

| # | Item | Sev. |
|---|---|---|
| 9.1 | Hero mantém conceito (busto + fone + óculos + círculo `#ffc900`) | [B] |
| 9.2 | S3 sem grid de 2 colunas; itens alinhados alternando esquerda/direita | [B] |
| 9.3 | S4: cards mais compactos, **título e ícone visivelmente maiores**, label sem ellipsis de 1 linha | [B] |
| 9.4 | S5 intacta | [B] |
| 9.5 | S6: cards levemente maiores, fontes maiores, reveal **por card** | [B] |
| 9.6 | Estrela/`Sparkles` removido dos números | [B] |
| 9.7 | Vídeo cobre o site e congela por seção | [B] |

---

## 10. Veredito

| Resultado | Critério |
|---|---|
| **APROVADO** | Todos os [B] verdes, 0 regressão de teste, tetos respeitados |
| **APROVADO COM RESSALVAS** | Todos os [B] verdes, 1–3 [N] abertos com issue e dono |
| **REPROVADO** | Qualquer [B] vermelho — devolver ao FrontendCraft com o item, o comando e a linha exatos |

### Registro da revisão (preencher na execução)

```
Commit revisado:        ea2352a (feat/video-wallpaper, 6 commits)
npm test:               42/42  |  lint: 0 erros  |  build: ok (544 kB js / 64 kB css)
maior arquivo:          src/styles/home.css (615 linhas) — teto 750 respeitado
!important (soma):      91 → 91 (nenhum `!important` novo; backdrop.css e projects-rail.css com 0)
modo poster (4.1–4.5):  ok por código (isStaticOnly = reducedMotion || saveData || isMobile; falha por clipe)
contraste (5.x):        REPROVADO — foco #ffc900 sobre amarelo 1.00:1 / sobre mármore 1.36:1
responsivo (8):         rail empilha ≤1024px ok; 360/768/1024/1440 não validado em browser
veredito:               REPROVADO (2 bloqueios)
```

### Bloqueios encontrados na revisão de `ea2352a`

**B1 — [B] Cascata invertida: `responsive.css` e `pages.css` vencem `backdrop.css`/`projects-rail.css`.**
`src/styles/home.css:1-2` faz `@import './backdrop.css'` e `@import './projects-rail.css'`, mas `home.css` é importado **antes** de `pages.css` e `responsive.css` em `src/index.css:3-5`. Ordem de cascata efetiva: base → layout → home → **backdrop → projects-rail** → pages → responsive.
Comando: `node -e` que expande os `@import` (ver LIMITES §2.1).
Consequência concreta: `src/styles/responsive.css:47` (`.project-showcase { grid-template-columns: 1fr; max-height: none }`) vence `projects-rail.css:21-27` no mobile; qualquer `.project-rail`/`.video-stage` corrigido por `responsive.css` depende dessa ordem acidental. O import é válido, mas está no arquivo errado — mover para `src/index.css` na posição da LIMITES §2.1 e remover de `home.css`. Não é overengineering: é um `@import` de 2 linhas.

**B2 — [B] Foco sobre vídeo amarelo é invisível (WCAG 2.4.11/1.4.11).**
`src/styles/base.css:45`: `:focus-visible { outline: 3px solid var(--accent) }` — `#ffc900`.
Razões calculadas (WCAG 2.1, luminância relativa): foco `#ffc900` **vs** círculo amarelo do vídeo = **1.00:1**; **vs** mármore `#f4f0e7` = **1.36:1**; vs branco = **1.54:1**. Mínimo exigido: 3:1.
O backdrop agora roda em todas as seções, então o halo amarelo passa por trás de links/botões do rail, da Stack e dos CTAs. Correção do ColorTokens (`tokens-de-scrim.md`: anel duplo 2px `#08090b` + 2px `#ffc900` = 12.91:1–19.92:1) não está aplicada.

**B3 — [B] Clipes 02–06 faltando reaproveitam o pôster da S2 em todas as seções.**
`content/sceneClips.json`: os 5 clipes restantes têm `poster: "/media/backdrop/02-about-poster.png"`. Com `failedClips`, ao falhar o 404 cai nesse pôster — mas as seções 3–6 mostram **o mesmo frame da S2** (busto sem fone) em vez de caírem no `fallbackPoster`. `poster` de cada clipe deveria ser o pôster da seção `to` ou `fallbackPoster` até o asset existir.

**B4 — [B, dívida real] Dois testes afirmam o layout antigo, mas passam por leitura indireta de CSS.**
`src/test/sections3-4-layout-stress.test.tsx:147-149` continua afirmando `.project-showcase { grid-template-columns: repeat(2, 1fr); max-height: 480px; gap: 18px }` — que a S3 deixou de ser. Passa porque casa `.project-rail.project-showcase { … }` em `projects-rail.css` apenas por `.max-height: none` e a regex `[^}]*` atravessar fronteiras de bloco. Não há **nenhum** teste de `.project-rail`, `VideoStage` ou `data-mode`:
`grep -rn "project-rail|video-stage|VideoStage" src/test/` → vazio.
Isso é dívida real: os 42 verdes não cobrem a maior entrega da rodada. Reescrita proposta em LIMITES §4.3.

