# Backdrop assets — estado real e receita

Atualizado: 2026-11-06 — branch `main` (IDADE/rosto: clipe 01 refeito com o rosto real)

## REGRA DE IDENTIDADE (vale para todo asset novo)

Os clipes 02–06 foram gerados **em cadeia** (cada um partindo do frame final do anterior).
A cada geração o Veo reinterpretava o rosto e a identidade **derivou** do Pedro real para um
filósofo grego de barba cheia. Por isso:

1. A referência de rosto é **`public/eu-profissional.png`** (foto real, aprovada pelo Pedro).
2. Busto/rosto canônicos ficam em **`public/media/busto/`** — ver o README da pasta.
3. Nenhum clipe novo parte do frame final do anterior: parte do **busto canônico**.
4. Clipe cujo frame do meio deriva é **cortado ou refeito** — identidade no meio do movimento
   vale o mesmo que no começo.

## Entregue e funcionando

| Arquivo | Origem | Notas |
|---|---|---|
| `01-hero-to-about.mp4` | Veo 3.1 Fast em **Frames** (Início = `busto-v1.jpg`, Fim = `rosto-normal.jpg`) | 1920×1080, **3.71s**, 1.27 MB, H.264 24fps. **O clipe Hero→Sobre termina no rosto normal do Pedro** — mármore derrete → pele real. Ver nota de corte abaixo |
| `01-hero-poster.png` | frame 0 do MP4 novo | busto de mármore **com o rosto do Pedro** (não mais o grego) |
| `02-about-poster.png` | frame final do MP4 novo | **ROSTO NORMAL do Pedro**, sem estátua — é o que a S2 mostra |
| `02-about-to-projects.mp4` | ⚠️ LEGADO (rosto grego) | movido para `public/media/backdrop/_legacy-pedro-errado/`; ainda referenciado pelo `sceneClips` porque os 6 clipes precisam ser refeitos como um conjunto |
| `02-about-to-projects.mp4` | Google Flow (Veo 3.1 Fast, 8s, 16:9, 1080p upscaled) | 1920×1080, 7.85s, 3.9 MB, H.264. Primeiro frame = `02-about-poster.png`; busto vira levemente o rosto e aponta para a direita do quadro |
| `03-projects-poster.png` | frame final (7.79s) do MP4 | frame de congelamento da sessão 3 — busto apontando para a direita |
| `03-projects-to-stack.mp4` | Google Flow (Veo 3.1 Fast, 8s, 16:9, 1080p Aprimorada) | 1920×1080, 7.85s, 4.65 MB, H.264 24fps, 188 frames. Primeiro frame = `03-projects-poster.png`; busto aponta alternando esquerda/direita. Congelar em **7.77s** |
| `04-stack-poster.png` | frame final (`~7.77s`) de `03-projects-to-stack.mp4` | frame de congelamento da sessão 4 — braço apontando à direita, fonte para o clipe 04 |
| `04-stack-to-purpose.mp4` | Google Flow (Veo 3.1 Fast, 8s, 16:9, 1080p Aprimorada) | 1920×1080, 7.85s, 3.05 MB, H.264 24fps, 188 frames. Primeiro frame = `04-stack-poster.png`; braço recolhe e o círculo amarelo expande até preencher o quadro. Congelar em **7.77s** |
| `05-purpose-poster.png` | frame final (`~7.77s`) de `04-stack-to-purpose.mp4` | frame de congelamento da sessão 5 — círculo amarelo dominante, busto de perfil com o braço recolhido |
| `05-purpose-to-experience.mp4` | Google Flow (Veo 3.1 Fast, 8s, 16:9, 1080p Aprimorada) | 1920×1080, 7.85s, 3.16 MB, H.264 24fps, 188 frames. Primeiro frame = `05-purpose-poster.png`; busto gira para o centro; a órbita saiu como duas faixas de luz atravessando o quadro (ver nota). Congelar em **7.77s** |
| `06-experience-poster.png` | frame final (`~7.77s`) de `05-purpose-to-experience.mp4` | frame de congelamento da sessão 6 — busto de frente, com as faixas de luz |
| `06-experience-loop.mp4` | Google Flow (Veo 3.1 Fast, 8s, 16:9, 1080p Aprimorada) | 1920×1080, 7.85s, 2.91 MB, H.264 24fps, 188 frames. Primeiro frame = `06-experience-poster.png`; busto imóvel respirando, círculo pulsando, nada atravessa o quadro. Congelar em **7.77s** |

`content/sceneClips.json`:
- `hero-to-about`: `holdAt: 3.63`, `duration: 3.71` **(alterado: o clipe tem 3.71s, não 7.85s)**
- `about-to-projects`: `holdAt: 7.78` (duração 7.85s)
- `projects-to-stack`: `holdAt: 7.77` (duração 7.85s, 188 frames a 24fps)
- `stack-to-purpose`: `holdAt: 7.77`
- `purpose-to-experience`: `holdAt: 7.77`
- `experience-loop`: `holdAt: 7.77`

### Nota de corte do clipe 01 (transição estátua → rosto)
O Veo entregou 8s, mas medindo frame a frame o trecho **3.2s → 6.6s** derivava para um homem
barbudo e sem camisa (mesmo defeito da cadeia antiga, agora no meio do clipe) e voltava ao
Pedro só no fim. Corte aplicado:

- **0 → 2.6s** — original do Veo: o mármore derrete e a pele do Pedro aparece
- **2.1 → 2.7s** — crossfade de 0,6s
- **2.6 → 3.71s** — still de `rosto-normal.jpg`

Verificado no navegador (canvas do `<video>` real, não só o arquivo): início = busto de
mármore com o rosto do Pedro; fim = **o rosto normal, sem estátua**.

### Nota sobre o clipe 05
A palavra "órbita" no prompt fez o Veo desenhar **duas faixas de luz** cruzando o quadro na diagonal. Ficou bonito isolado, mas carrega demais para fundo de texto (a S5 do site já é escura por cima). Se incomodar, a correção é regerar o 05 com a ação trocada para algo como *"o busto gira lentamente para o centro; o círculo amarelo respira e um brilho suave contorna a silhueta, sem elementos atravessando o quadro"* — o resto da cadeia (06) continua válido porque parte do frame final, que teria a mesma composição sem as faixas.

## Receita usada (para os clipes 02–06)

1. `https://flow.google.com/` → projeto ativo ou **Novo projeto**.
2. Modo **Frames**; primeiro frame = frame de congelamento da sessão anterior (`02-about-poster.png`, depois `03-projects-poster.png`, etc.).
3. Modelo **Veo 3.1 Fast**, 16:9, **8s**, **x1** (20 créditos por clipe), 720p.
4. Prompt base:
   > O busto de mármore branco com óculos amarelos, sobre um grande círculo amarelo em fundo preto, sem fone de ouvido. Câmera completamente fixa. Partindo exatamente do primeiro frame, <AÇÃO>. Fundo preto profundo, luz de estúdio suave, mármore branco, amarelo #FFC900, sem texto, sem logos, sem marca d'água. Movimento lento e cinematográfico.
5. Gerar → abrir o resultado → **Fazer o download** → **1080p Aprimorada** → o arquivo cai em `C:\Users\PEDRO LUCAS\OpenBot\Downloads` e é copiado para `public/media/backdrop/`.
6. Extrair o frame final: `flow/finalize.mjs` (ffmpeg-static) salva o último frame útil (`-sseof -0.25`, 1 frame) em PNG como pôster da próxima seção e imprime a duração para o `holdAt`.

## Ações por clipe

| Clipe | Primeiro frame | Ação do busto |
|---|---|---|
| `02-about-to-projects` | `02-about-poster.png` | busto vira o rosto e aponta o braço direito para a direita do quadro (entregue) |
| `03-projects-to-stack` | `03-projects-poster.png` | aponta alternando esquerda/direita (entregue) |
| `04-stack-to-purpose` | `04-stack-poster.png` | recolhe o braço, círculo amarelo expande (entregue) |
| `05-purpose-to-experience` | `05-purpose-poster.png` | volta ao centro, órbita lenta (entregue, com a ressalva das faixas de luz) |
| `06-experience-loop` | `06-experience-poster.png` | loop curto respirando (entregue) |

Status 2026-11-06: os 6 clipes e os 6 pôsteres existem em `public/media/backdrop/` (1080p, 7.85s cada, H.264 24fps).

## Enquanto um clipe não existe

`VideoStage` marca o clipe como falho e mostra o pôster daquela seção — o resto continua funcionando. Nenhum layout quebra, nenhum vídeo toca em `prefers-reduced-motion`, `saveData` ou telas ≤ 768px.
