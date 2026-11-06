# Backdrop assets — estado real e receita

Atualizado: 2026-11-06 · branch `feat/video-wallpaper`

## Entregue e funcionando

| Arquivo | Origem | Notas |
|---|---|---|
| `01-hero-to-about.mp4` | Google Flow (Veo 3.1 Fast, 8s, 16:9, 1080p upscaled) | 1920×1080, 7.85s, 3.4 MB, H.264. Primeiro frame = imagem atual do hero; termina com o busto sem o fone |
| `01-hero-poster.png` | frame 0 do MP4 | pôster do hero (mesma composição do vídeo, sem salto no play) |
| `02-about-poster.png` | frame final (7.79s) do MP4 | frame de congelamento da sessão 2 — busto sem fone |

`content/sceneClips.json` já aponta para esses arquivos. `holdAt: 7.75` faz o vídeo pausar no frame final quando a sessão 2 entra (verificado: `currentTime 7.8`, `paused: true`).

## Receita usada (para os clipes 02→06)

1. `https://flow.google.com/` → **Novo projeto**.
2. Modo **Frames**; arraste o frame de congelamento da sessão anterior como **primeiro frame** (`01-hero-poster.png`, depois `02-about-poster.png`, …).
3. Modelo **Veo 3.1 Fast**, 16:9, **8s**, **x1** (20 créditos por clipe), 720p (o download permite 1080p "Aprimorada" depois).
4. Prompt base (ajuste só a ação):
   > O busto de mármore branco com óculos e fone de ouvido amarelos, sobre um grande círculo amarelo em fundo preto. Câmera completamente fixa. Partindo exatamente do primeiro frame, <AÇÃO>. Fundo preto profundo, luz de estúdio suave, mármore branco, amarelo #FFC900, sem texto, sem logos, sem marca d'água. Movimento lento e cinematográfico.
5. Gerar → abrir o resultado → **Fazer o download** → **1080p Aprimorada** → o arquivo cai em `C:\Users\PEDRO LUCAS\OpenBot\Downloads` e é copiado para `public/media/backdrop/`.
6. Extrair o frame final: sem ffmpeg nesta máquina, use `frames.mjs` (CDP + canvas) na pasta do agente BotManager — ele salva o frame em PNG e vira o pôster da próxima seção.

## Ações por clipe

| Clipe | Primeiro frame | Ação do busto |
|---|---|---|
| `02-about-to-projects` | `02-about-poster.png` | pousa o fone, olha para a câmera e aponta para o lado (a foto real do Pedro entra pelo overlay HTML, marcadores `pedro-photo` / `statue-back`) |
| `03-projects-to-stack` | pôster da sessão 3 | aponta alternando esquerda/direita |
| `04-stack-to-purpose` | pôster da sessão 4 | recolhe o braço, círculo amarelo expande |
| `05-purpose-to-experience` | pôster da sessão 5 | volta ao centro, órbita lenta |
| `06-experience-loop` | pôster da sessão 6 | loop curto respirando |

## Enquanto um clipe não existe

`VideoStage` marca o clipe como falho e mostra o pôster daquela seção — o resto continua funcionando. Nenhum layout quebra, nenhum vídeo toca em `prefers-reduced-motion`, `saveData` ou telas ≤ 768px.
