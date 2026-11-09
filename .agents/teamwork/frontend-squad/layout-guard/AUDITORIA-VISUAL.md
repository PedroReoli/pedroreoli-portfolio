# AUDITORIA VISUAL — site inteiro, headless

Branch: `main` · HEAD `f5b35bc` (+ working tree com `VideoStage.tsx` e `backdrop.css` modificados, que foi o que auditei)
Auditor: LayoutGuard · Data: 2026-11-06 · Método: Chrome `--headless=new` + CDP, `npm run preview` na porta 4174.
Nenhuma janela, popup ou `npm run dev` foi aberto na máquina. Zero intervenção em código/CSS/content/assets.

Screenshots: `auditoria/<secao>-<viewport>[-reduce].png` (48 arquivos) · Dados brutos: `probe-results.json`, `scroll-*.json`, `pixel-contrast.json`, `s2-states.json`.

---

## 0. Resposta direta às duas queixas do Pedro

### (1) "A animação de troca quando tiro o fone não acontece; no scroll só troca a imagem."

**A mudança de reduced-motion funcionou, mas NÃO era a causa (nem a solução).**

- ✅ Confirmado: com `prefers-reduced-motion: reduce` emulado, `data-mode="video"` e o `<video>` monta e toca (t=0.11 → 0.92s medidos). A linha `isStaticOnly = saveData || isMobile` está em `VideoStage.tsx:71`. O gate por reduced-motion foi removido de fato.
- ❌ O vídeo continua sem entregar a animação, por **dois motivos independentes**:

**Causa A — o clipe é interrompido a ~1 second.** O clipe `01-hero-to-about` tem 7.85s e o gesto de tirar o fone acontece ao longo dele. A seleção de clipe troca para o clipe seguinte (`about-to-projects`) assim que a seção `sobre` entra, independente de onde o vídeo estava. Medido com MutationObserver + amostragem de `currentTime` durante scroll real:

| Métrica | Valor medido |
|---|---|
| `currentTime` máximo alcançado no clipe 01 | **1.08 s** (de 7.85 s) |
| `holdAt` configurado | 7.75 s |
| Trocas de clipe | em y=135 (`hero-to-about`), y=1080 (`about-to-projects`), y=1890, y=2835, y=3780 |
| Montagens/desmontagens do `<video>` | 3 mounts / 1 unmount em um scroll |

Ou seja: o usuário vê só o **primeiro 14%** do gesto — o busto ergue as mãos e o vídeo é cortado. Do ponto de vista dele, "só troca a imagem". O clipe 02 (que a MediaForge entregou, 7.85s, com a foto real) tem **o mesmo destino**: máximo de 0.87s alcançado.

**Causa B — o `<video>` desmonta ao entrar na seção.** A condição de render é `{!isPosterOnly && activeClip && …}` (`VideoStage.tsx:250`). Quando a seção avança, `activeClip` muda e o React troca o `<source>`; nos estados em que `activeClip` vira `null` (subir a página, ou seção sem clipe correspondente) o `<video>` é **removido do DOM** e o poster volta. Foi exatamente o que o MutationObserver registrou (`last-unmount` com `currentTime` 1.08).

> Em nenhum dos 48 screenshots de seção o `<video>` existia no DOM no momento da captura. O que Pedro vê de "fundo" é o **poster** (`.video-stage__poster`, `object-fit: contain`), não o vídeo.

**Correção proposta (frontend):** desacoplar a troca de clipe do scroll por seção. O clipe deve tocar **até `holdAt` antes de ser trocado** (regra: só trocar quando `currentTime >= holdAt` ou quando a seção `to` já ocupou a viewport por ≥ X% *e* `currentTime > 6s`); e o `<video>` deve ser **sempre montado** (trocar `src` via ref, não desmontar). Um `<video>` persistente + troca de `src` elimina o unmount e mantém o decoder.

### (2) "As sessões estão por cima da imagem de fundo; o fundo não aparece e os layouts não aparecem."

**Confirmado, e são dois defeitos distintos que Pedro está fundindo numa queixa só.**

- **"O fundo não aparece"** — real. O stage roda a `opacity: 0.45` em **todas** as seções de conteúdo (`backdrop.css:22-28`), e sobre ele há painéis quase opacos (S3 `rgba(8,9,11,.58)`, S4 `.58`, S6 `rgba(8,9,11)` **sólido**). Resultado medido: a luminância do mármore que chega ao olho em S2 é da ordem de 29–40/255 — o busto é uma mancha marrom, não uma imagem. Em S6 o fundo é `rgb(8,9,11)` **puro**: não existe fundo nenhum.
- **"Os layouts não aparecem"** — **este é um bug de reveal, não de layout.** Em S2, ao chegar na seção por salto/nav (não por scroll incremental), **10 elementos ficam com `opacity: 0`**: `about__heading`, `about__summary`, `about__focus-pills`, `about__action`, `art-frame__plaque` e mais. Causa: `AboutSection.tsx:65-72` cria **uma única timeline GSAP** ligada a `scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true }`. Se o topo da seção já passou de 80% da viewport quando o componente monta/mede, o trigger nunca dispara e a timeline fica parada no `fromTo({opacity:0})`. Em S3, o item do rail `--align-left` também ficou a 0.
  - Isso **só acontece ao "chegar" na seção** (nav, reload, deep-link, salto de teclado). No scroll incremental contínuo as 13 reveals resolvem. Por isso os testes passam e o Pedro vê o problema.

---

## 1. Tabela de defeitos

| # | Seção | Viewport | Defeito | Evidência | Sev. | Correção proposta |
|---|---|---|---|---|---|---|
| D1 | todas | 1440 → 390 | Clipe interrompido a ~1s; animação do fone nunca se completa | `scroll-no-preference.json`: max `currentTime` 0.85s (clipe 01), 0.87s (clipe 02); `holdAt` 7.75 | **BLOQUEIA** | `VideoStage.tsx` §0-Causa A |
| D2 | todas | 1440 → 390 | `<video>` desmonta ao trocar de seção; só o poster permanece | `run-diagnose`: mounts 3 / unmount 1; `hasVideo:false` em 28/41 amostras e nos 48 screenshots | **BLOQUEIA** | `<video>` persistente + troca de `src` por ref |
| D3 | sobre | todos | Chegando por salto/nav, 10 elementos ficam `opacity: 0` — heading, summary, pills, CTA e placa não aparecem | `run-reveal2`: `JUMP -> sobre invisible: 10` | **BLOQUEIA** | `AboutSection.tsx:65` — trocar timeline única + `once:true` por reveal por elemento com `ScrollTrigger` individual, ou aplicar estado final quando o elemento já está na viewport (`onRefresh`/`refreshPriority`) |
| D4 | projetos-selecionados | todos | 1 item do rail fica `opacity: 0` na chegada por salto (`--align-left`, Achilles) | `run-reveal2`: `invisible: 1` | **BLOQUEIA** | mesma classe de correção do D3, no `data-reveal` do `SelectedProjectsSection` |
| D5 | sobre, projetos, stack | todos | Fundo praticamente invisível: stage a `.45` **e** painel `rgba(8,9,11,.58–.62)` por cima → mármore chega a ~15% de luminância | `probe-results.json` (`stage.opacity 0.45`); screenshot `sobre-1440x900.png` | alta | Remover a dupla atenuação: manter **uma** delas. Recomendo stage a `0.75–0.85` **sem** o filtro `opacity` global e resolver o contraste só com o scrim + painel local do lado do texto |
| D6 | experiencia | todos | Fundo **inexistente**: `background: rgba(8,9,11)` opaco `→` `rgb(8,9,11)` computado. `.video-stage[data-section=experiencia]` a `.45` não tem como aparecer | `probe-results.json` seção `experiencia.bg = rgb(8,9,11)` | alta | Tornar translúcido (ex.: `rgba(8,9,11,.55)`) **ou** aceitar explicitamente que S6 não tem backdrop e mudar o `data-section` para um scrim neutro |
| D7 | hero | 1440/1024 | Busto ocupa o centro e o CTA primário fica **sobre o círculo amarelo** ("VER PROJETOS" amarelo sobre amarelo) | `hero-1440x900.png`: botão em y≈810 sobre o disco | média | Deslocar o busto para a direita/baixo ou reduzir a escala; CTA em coluna escura à esquerda. Medido: media rect `[-43, 63, 1526, 954]`, busto centrado |
| D8 | proposito | todos | Pedro disse "sessão 5 está boa, manter" — mas `purpose-section` é `background: var(--accent)` opaco: **o vídeo nunca aparece nela**, e o layout dark (texto claro) foi trocado por amarelo. Hoje está renderizando amarelo? Não: `home.css:351` diz `var(--accent)` mas o screenshot mostra fundo escuro `rgba(8,9,11,.86)` + texto claro → a regra do override venceu | `proposito-1440x900.png`; `home.css:351` vs override `~:490` | alta | Decidir UMA identidade para a S5. Se ela deve respirar o vídeo: painel translúcido só atrás do texto (coluna esquerda), imagem à direita. Remover a regra morta `background: var(--accent)` |
| D9 | stack | todos | Cards da Stack são **opacos** (`rgba(255,255,255,.65)` sobre painel escuro): o busto morre atrás dos 4 painéis; a seção parece um formulário | `stack-1440x900.png` | média | Cards com `backdrop-filter` + alpha baixo (`.18–.25`), borda `1px` âmbar no hover; deixar 1 coluna de respiro onde o busto aparece |
| D10 | projetos | 1024 e 390 | Rail funciona, mas o "apontar" do busto não tem alvo: a coluna de mídia fica sempre à direita, e o texto à esquerda — sem relação espacial com o busto (que está centrado). Em 390 o layout colapsa bem | `projetos-selecionados-1024x768.png`, `-390x844.png` | média | Para casar com o busto: quando `--align-right`, mover o **conteúdo** para a faixa esquerda (24–52% viewport) e deixar 52–100% para a mídia; o busto centralizado fica no vão entre os dois |
| D11 | todas | 1440 | Contraste de texto **passa** com animações resolvidas (medido no pixel): S1 10.4:1 · S2 título 18.0:1 · S2 corpo 11.8:1 · S3 11.6:1 · S4 16.0:1 · S5 11.1:1 · S6 8.9:1 | `pixel-contrast.json` | ok | Nenhuma ação. Revalidar depois do D5 (subir a opacidade do stage pode reduzir esses números) |
| D12 | todas | 768/390 | `mode=poster` correto em ≤768px; **nenhum** `<video>` montado. Comportamento pretendido confirmado | `probe-results.json`: mode `poster` em 768 e 390 | ok | Nenhuma ação |
| D13 | hero | 768 | `.hero` com `100svh` + header fixo: o subtítulo fica muito próximo do topo e o busto corta na base | `hero-768x1024.png` | baixa | `min-height: 100svh` já existe; dar `padding-bottom` ao bloco do busto |
| D14 | experiencia | 1440 | Timeline longa (`1975px` de altura de seção contra `900px` de viewport): o backdrop fica fixo e o mesmo frame da S2 acompanha 2 telas de cards | `probe-results.json` `experiencia.height = 1975` | baixa | Se S6 for manter fundo, usar `background-attachment: local` por bloco de cards ou aceitar o frame fixo (é o comportamento do "wallpaper") — decidir com o Pedro |

**Nenhum defeito de contraste, de 750 linhas ou de `!important` novo nesta rodada.** O que falha é composição (fundo vs conteúdo) e sincronização do vídeo.

---

## 2. Estado medido por seção

### S1 — hero
- Fundo: stage `opacity 1`, poster `object-fit: cover`/`contain` em rect `[-43, 63, 1526, 954]` → **busto único, centralizado, dominando o centro da tela**.
- Conteúdo: eyebrow + `PEDRO REOLI.` no topo (y 90–200), subtítulo y≈215–260, CTAs y≈790–840, "desça para explorar" y≈860.
- Problema: os CTAs caem **dentro do disco amarelo** (y 810 está na faixa do círculo). Contraste do botão secundário (branco/âmbar sobre mármore) depende do glow.
- **Refatoração:** manter o busto centralizado (é a marca). Empurrar o bloco de CTAs para o terço inferior **fora** do disco — ou para uma coluna escura à direita, alinhada ao ombro; o disco termina em x≈1075. O conteúdo editorial continua no topo, sobre preto (contraste 10.4:1 medido).

### S2 — sobre
- Fundo: stage `.45` **e** `.about.section-light` `rgba(8,9,11,.62)` → o busto aparece como uma mancha marrom de baixa luminância (visível no screenshot, mas "sujo").
- Conteúdo: moldura museu à esquerda (x 90–530), narrativa à direita (x 664–1304).
- O busto, quando visível, fica **atrás da coluna de narrativa** (centro x≈720) → colide com o texto.
- **Refatoração:** o busto deve sair do miolo. Duas opções: (a) painel de narrativa translúcido `rgba(8,9,11,.55)` só na coluna direita com `backdrop-filter: blur(14px)` e busto deslocado para a direita (`object-position: 70% 50%`); (b) moldura à esquerda, narrativa em painel **escuro à direita** e a faixa central (x 530–664) livre para o busto aparecer. Hoje o vão é estreito demais — reduzir a moldura para 420px e dar 180–220px de vão.

### S3 — projetos
- Fundo: painel `rgba(8,9,11,.58)` sobre stage `.45` → busto quase invisível (`projetos-selecionados-1440x900.png`).
- Layout: rail alternado funciona; cards `rgba(17,18,22,.85)` com `backdrop-filter: blur(20px)`.
- **Refatoração:** o card do rail está sobre a coluna de mídia; o vídeo deveria apontar para o **lado do item ativo**. Alinhar o vão central (onde o busto está, x 600–840) com o espaço entre as duas colunas; reduzir o card para 46% da largura e deixar o restante do lado oposto vazio com o busto visível. Painel a `.38–.45` (não `.58`).

### S4 — stack
- Fundo: painel `.58` + 4 cards claros opacos → seção sem nenhum vestígio do vídeo.
- Layout: título e labels legíveis (medido 16.0:1); grade 4 col em 1440, 2 col em 768, 1 col em 390. **A reconstrução da Stack está boa.**
- **Refatoração:** só de fundo — cards com `rgba(255,255,255,.14)` + `backdrop-filter`, borda âmbar; deixar a coluna 4 (IA & APIs) ligeiramente mais baixa para o busto respirar no canto direito. Nada de mudar a tipografia.

### S5 — propósito
- Estado atual contradiz Pedro ("S5 está boa, manter"): existe uma regra morta `background: var(--accent)` (`home.css:351`) que foi sobrescrita por um override escuro `rgba(8,9,11,.86)`; o resultado é texto claro sobre quase-preto a `.86` (o vídeo mal aparece).
- Layout: duas colunas — título+texto à esquerda, imagem à direita. Bom.
- **Refatoração:** remover a regra morta; decidir a identidade (seção aprovada ⇒ **não** tocar no layout). Se o vídeo deve respirar: baixar o painel para `.70` e aplicar painel translúcido **só** atrás da coluna de texto, mantendo a imagem à direita opaca.

### S6 — experiência
- Fundo: **`rgb(8,9,11)` opaco** — zero backdrop. Única seção onde o vídeo não aparece por completo.
- Layout: timeline alternada, `#01` sem estrela (confirmado no screenshot), cards +8–12%, legível (8.9:1).
- Altura 1975px → 2+ telas com o mesmo frame.
- **Refatoração:** se S6 for respirar o vídeo, `rgba(8,9,11,.55)` + painel dos cards; senão, aceitar e remover o `data-section`/scrim específico (hoje ele existe e não tem efeito — código morto).

---

## 3. Posição do busto e onde o conteúdo deveria ficar (resumo para a refatoração)

| Seção | Busto deve ficar | Conteúdo deve ocupar | Fundo local do texto | Opacidade do stage |
|---|---|---|---|---|
| S1 hero | centro, escala atual | topo (eyebrow+título) + base direita (CTAs) | preto puro no topo | 1.0 |
| S2 sobre | terço direito, deslocado (`object-position: 72% 50%`) | moldura esquerda 24–38%, narrativa 40–58% em painel | painel `rgba(8,9,11,.55)` + blur | 0.8 |
| S3 projetos | vão central 40–60% | itens alternando 24–46% / 54–76%, nunca no vão | painel do card `rgba(17,18,22,.72)` | 0.8 |
| S4 stack | canto direito inferior | grade 24–72% | cards translúcidos, painel da seção `.40` | 0.8 |
| S5 propósito | — (não aparece) | manter duas colunas como está | painel `.70` só na coluna de texto | 0.8 |
| S6 experiência | centro, fundo atrás da timeline | timeline 24–76% | card `rgba(17,18,22,.78)` | 0.7 |

Regra de ouro que resolve a queixa inteira: **uma atenuação só**. Hoje existe `stage.opacity(.45)` **×** painel de seção (`alpha`) **×** card (`alpha`) — o produto das três é o que apaga o vídeo. Escolher uma camada para atenuar (o painel) e deixar o stage a `0.8–1.0`.

---

## 4. Confirmação de método (sem janela na tela)

- Chrome executado com `--headless=new --remote-debugging-port=9333 --user-data-dir=%TEMP%\cdp-guard-*` e `windowsHide: true` no `spawn`. Nenhum processo com janela.
- Servidor via `npm run preview -- --port 4174` (sem `npm run dev`, sem Vite HMR em janela).
- Screenshots por `Page.captureScreenshot` gravados direto em disco.
- Viewports por `Emulation.setDeviceMetricsOverride`; reduced-motion por `Emulation.setEmulatedMedia`.
- Nenhuma edição em `src/`, `content/` ou `public/`. `git status` inalterado por mim (as duas modificações já existiam quando comecei: `VideoStage.tsx`, `backdrop.css`).

## 5. Ordem recomendada de correção

1. **D2 (vídeo não desmonta)** e **D1 (clipe toca até `holdAt`)** — sem isso nada do resto "aparece se mexendo".
2. **D3/D4 (reveals ao chegar na seção)** — é o "layouts não aparecem" que o Pedro vê.
3. **D5/D6/D9 (dupla atenuação e S6 opaca)** + **D8 (S5)** — é o "fundo não aparece".
4. **D7/D10/D13** — composição fina por seção, já com o vídeo aparecendo.
5. Revalidar contraste no pixel depois do D5 (subir o stage reduz a folga dos 8.9–18:1 medidos).
