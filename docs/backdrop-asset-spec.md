# Backdrop assets — estado real e receita

Atualizado: 2026-11-06 — branch `main` (clipes 03–06 gerados nesta rodada)

## Entregue e funcionando

| Arquivo | Origem | Notas |
|---|---|---|
| `01-hero-to-about.mp4` | Google Flow (Veo 3.1 Fast, 8s, 16:9, 1080p upscaled) | 1920×1080, 7.85s, 3.4 MB, H.264. Primeiro frame = imagem atual do hero; termina com o busto sem o fone |
| `01-hero-poster.png` | frame 0 do MP4 | pôster do hero (mesma composição do vídeo, sem salto no play) |
| `02-about-poster.png` | frame final (7.79s) do MP4 | frame de congelamento da sessão 2 — busto sem fone |
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
- `hero-to-about`: `holdAt: 7.75`
- `about-to-projects`: `holdAt: 7.78` (duração 7.85s)
- `projects-to-stack`: `holdAt: 7.77` (duração 7.85s, 188 frames a 24fps)
- `stack-to-purpose`: `holdAt: 7.77`
- `purpose-to-experience`: `holdAt: 7.77`
- `experience-loop`: `holdAt: 7.77`

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
