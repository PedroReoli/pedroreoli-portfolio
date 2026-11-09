# REVISÃO DA REFAZ — scrub bidirecional + fundo transparente (S2–S7)

Auditor: LayoutGuard · Método: Chrome `--headless=new` + CDP contra `npm run preview --port 4175` · 2026-11-06
Branch: `main` · **HEAD `4ba2e41`** (é o commit do FrontendCraft; não há commit posterior)
Screenshots: `auditoria-rev/` · Nada editado. Nenhuma janela aberta.

## Veredito: **REPROVADO — 3 bloqueios**

A mecânica que Pedro pediu ficou certa; o que falha é o escopo (duas demandas não foram feitas) e um defeito grave novo no rodapé.

---

## Gate automático

| Item | Resultado |
|---|---|
| `npx vitest run` | **47/47** (6 arquivos) |
| `npx eslint src` | 0 erro |
| `npx tsc -b` | ok |
| 750 linhas/arquivo | ok — maior `home.css` **698**; `useScrollScene.ts` + `styles` todos abaixo |
| `!important` | **95**, era 95 na revisão anterior → **nenhum novo** |
| `git status` | limpo |

---

## Demandas do Pedro, item por item

| # | Demanda | Veredito | Evidência |
|---|---|---|---|
| 1 | Tempo preso ao scroll da página inteira, bidirecional, sem autoplay | **APROVADO** | ver §1 |
| 2 | S2–S7 transparentes, vídeo como fundo, sem opacity global no palco | **PARCIAL** — S2 a S6 ok, **S7 reprova** | ver §2 |
| 3 | S3 card/objeto menor | **NÃO FEITO** (declareado pelo próprio FrontendCraft) | `projects-rail.css:36-40`, `min-height: clamp(380px,56svh,560px)` inalterado |
| 4 | S4 objeto mais delicado | **NÃO FEITO** | `home.css:391` inalterado |
| 5 | S5 VOZ PRA TODOS sobre a foto, foto menor, texto surge, foto apagada | **APROVADO** | ver §4 |
| 6 | S6 e rodapé transparentes | **PARCIAL** — S6 ok, **rodapé reprova** | ver §5 |

---

## 1. Scrub bidirecional — APROVADO

Traço medido a 1440×900, descendo e subindo pelos mesmos pontos:

| scroll | clipe | `currentTime` | `paused` | modo |
|---|---|---|---|---|
| 0 | `01-hero-to-about.mp4` | 0.000 | true | video |
| 700 | `01-hero-to-about.mp4` | 6.013 | true | video |
| 1400 | `02-about-to-projects.mp4` | 4.322 | true | video |
| 2100 | `03-projects-to-stack.mp4` | 2.583 | true | video |
| 2800 | `04-stack-to-purpose.mp4` | 0.861 | true | video |
| **1400 (subindo)** | `02-about-to-projects.mp4` | **4.322** | true | video |
| **700 (subindo)** | `01-hero-to-about.mp4` | **6.028** | true | video |
| **0 (subindo)** | `01-hero-to-about.mp4` | **0.015** | true | video |

- **Sem autoplay:** `paused: true` em 8/8 amostras; o código faz `video.pause()` e só escreve `currentTime` (`VideoStage.tsx:109-130`).
- **Bidirecional de verdade:** o mesmo `y` devolve o mesmo `t` (4.322 → 4.322; 6.013 → 6.028). `useScrollScene` é função pura de `window.scrollY` (`useScrollScene.ts:108`), sem estado de direção — por isso voltar recua naturalmente.
- Rótulo honesto do FrontendCraft confirmado: só 2 dos 6 clipes existem; de S3 para baixo o modo é `poster`.

## 2. Transparência — S2 a S6 ok, **S7 reprova**

`backgroundColor` computado por seção, em 4 viewports: `hero, sobre, projetos-selecionados, stack, proposito, experiencia` = **`rgba(0, 0, 0, 0)`** em 360/768/1024/1440. Stage com `opacity: 1` (sem atenuação global), `z-index: 0`, header `100`, skip link `1000`. Camadas corretas.

**S7 (`contato`) = `rgb(8, 9, 11)` opaco em todos os 4 viewports.**

## 3. Bloqueios

### B1 — [BLOQUEIA] Rodapé: o stage pinta **por cima** do `<footer>` (causa medida), e o fundo é opaco

Provado por isolamento: escondendo `.video-stage` via CDP, o rodapé renderiza **perfeito** (`auditoria-rev/diag-B-no-stage.png`: `07 CONTATO`, `VAMOS CONVERSAR.`, descrição, os 4 cards e o copyright). Com o stage visível, o rodapé desaparece e só o busto aparece (`diag-A-baseline.png`).

**Causa real** — `src/styles/backdrop.css:117-120`:

```css
.home { position: relative; z-index: 1; }
```

O `.home` cria um stacking context com `z-index: 1` e contém o `.video-stage` (`position: fixed; z-index: 0`). Em `App.tsx:20-36` o `<Footer />` é **irmão** do `<m.main>`, não filho do `.home`. Logo o rodapé (stacking level 0, sem `z-index`) fica **abaixo** de `.home`, e o stage — mesmo com `z-index: 0` — pinta acima dele. Não é `opacity`, `contain` nem `isolation`: verifiquei `main`, `footer`, `stage` e `.app-shell` e todos estão `auto/none/opacity 1`.

Conferencia com os elementos: `.contact-section__headline` tem `color rgb(255,255,255)`, `opacity 1`, `visibility visible`, rect `24,283,1392,132`, e `elementsFromPoint` devolve o próprio headline — o DOM está certo, é puramente camada.

**Correção:** o `.home { z-index: 1 }` só existe para vencer o backdrop. Duas saídas limpas, a segunda preferível:
1. `main` fica com `z-index: 1` e o `<footer>` recebe `position: relative; z-index: 2`.
2. Melhor: **mover o `<Footer />` para dentro do `.home`** (ou montar o `VideoStage` no `.app-shell`, já que Pedro quer o vídeo no site inteiro) e remover o `z-index` do `.home`, deixando o stage em `z-index: -1` com o conteúdo em `auto`. Isso resolve de uma vez o rodapé e mantém uma única camada de fundo — sem segundo componente.

**Além do paint:** `layout.css:259` `.contact-section { background: var(--night) }` → `rgb(8,9,11)` nos 4 viewports. Mesmo corrigindo o painel, o rodapé continuaria tapando o vídeo. É o mesmo padrão já aprovado nas S2–S6: remover o background **na origem**, sem `!important` novo.

### B2 — [BLOQUEIA] Demanda 3 (S3) não feita

`.project-rail__card` continua `min-height: clamp(380px, 56svh, 560px)` e `width: 100%` (card de ~1380px de largura). O Pedro pediu **card menor e objeto mais delicado**. Nenhum commit tocou `projects-rail.css`. Não é questão de gosto pendente: a decisão de escala já foi dada na demanda.

### B3 — [BLOQUEIA] Demanda 4 (S4) não feita

`.stack-grid article` inalterado (`home.css:391`, `background: rgba(251,249,245,.65)`, `padding: clamp(8px,1.1vh,12px)`). O fundo agora aparece atrás (bom), mas o "objeto mais delicado" não existe como mudança.

### B4 — [BLOQUEIA] S2 rótulo de estatística reprova AA: **2.79:1**

| texto | medido no pixel | alvo |
|---|---|---|
| `.about__summary` (corpo) | 12.02:1 | ok |
| `.stats-grid strong` (número) | 13.14:1 | ok |
| **`.stats-grid span` (rótulo)** | **2.79:1** — `rgb(126,123,116)` sobre `#fbf9f5` | **falha 4.5:1** |
| `.project-rail p` (S3) | 11.77:1 | ok |
| `.stack-grid__label` (S4) | 15.99:1 | ok |
| `.purpose-section__overlay h2` (S5) | 18.02:1 | ok |
| `.purpose-section__copy p` (S5) | 6.99:1 | ok |
| `.timeline-card__desc` (S6) | 8.86:1 | ok |

O `#7e7b74` sobre papel é exatamente o caso que o ColorTokens já tinha mapeado (memória do canal: sobre `paper` usar `#7a5c00` ou mais escuro). Corrigir para `var(--color-accent-ink)`/`#7a5c00` ou aumentar o peso/tamanho.

---

## 4. S5 — APROVADO

- `VOZ / para todos.` está **dentro** da foto (`.purpose-section__media`, `462px`, `aspect-ratio: 4/5`), sobre a faixa inferior.
- Texto surge por `.is-revealed` (`home.css:425-426`) e a foto "apaga" com `filter: saturate(.85) contrast(1)` — **degradê local** (`.purpose-section__media::after`: `.9 → .52 → transparente`), não escurecimento da foto inteira.
- Contraste do título sobre a foto: **18.02:1**; corpo ao lado: **6.99:1**. AA ok.
- Observação: o `h2` mede 56.16px dentro da foto; legível e sem corte.

## 5. Teclado e foco — APROVADO

- `Tab` real produz `:focus-visible` com `outline: 2px solid #ffc900` + halo `#08090b` (`base.css:28-52`).
- Contraste do anel: sobre o círculo amarelo o anel some (1.00:1), mas o **halo interno escuro** salva: `#08090b` vs amarelo **12.91:1**, vs mármore claro **17.51:1**. Passa 1.4.11/2.4.11.
- Stage não é focável: `tabindex: null`, `aria-hidden="true"`, `tabIndex -1`.

## 6. Responsivo — APROVADO (com a ressalva do rodapé)

| viewport | overflow-x | poster/vídeo | seções |
|---|---|---|---|
| 360×800 | não | `poster`, sem `<video>` | S2–S6 transparentes; **S7 opaco** |
| 768×1024 | não | `poster`, sem `<video>` | idem |
| 1024×768 | não | `video` montado | idem |
| 1440×900 | não | `video` montado | idem |

Nenhum overflow horizontal em nenhum ponto. Alturas de seção coerentes (S6 é a mais alta: 1975–2526px).

---

## 7. Ordem de correção sugerida

1. **B1** — corrigir a camada (mover `<Footer />` para dentro do `.home` **ou** subir o rodapé para `z-index: 2`) e só então remover o `background: var(--night)` do `.contact-section` na origem.
2. **B4** — `#7e7b74` → `#7a5c00` nos rótulos do stats (1 linha).
3. **B2/B3** — S3 card menor e S4 mais delicado: são as duas demandas que simplesmente não foram feitas; dependem de decisão de escala, mas a decisão já foi dada.
4. Reauditar. Com isso o veredito vira **APROVADO** (a mecânica de scrub já está correta e o S5 está do jeito pedido).
