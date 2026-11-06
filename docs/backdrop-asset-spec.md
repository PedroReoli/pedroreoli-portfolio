# Backdrop assets — estado real e receita

Atualizado: 2026-11-06 — branch `feat/video-wallpaper`

## Entregue e funcionando

| Arquivo | Origem | Notas |
|---|---|---|
| `01-hero-to-about.mp4` | Google Flow (Veo 3.1 Fast, 8s, 16:9, 1080p upscaled) | 1920×1080, 7.85s, 3.4 MB, H.264. Primeiro frame = imagem atual do hero; termina com o busto sem o fone |
| `01-hero-poster.png` | frame 0 do MP4 | pôster do hero (mesma composição do vídeo, sem salto no play) |
| `02-about-poster.png` | frame final (7.79s) do MP4 | frame de congelamento da sessão 2 — busto sem fone |
| `02-about-to-projects.mp4` | Google Flow (Veo 3.1 Fast, 8s, 16:9, 1080p upscaled) | 1920×1080, 7.85s, 3.9 MB, H.264. Primeiro frame = `02-about-poster.png`; busto vira levemente o rosto e aponta para a direita do quadro |
| `03-projects-poster.png` | frame final (7.78s) do MP4 | frame de congelamento da sessão 3 — busto apontando para a direita |

`content/sceneClips.json`:
- `hero-to-about`: `holdAt: 7.75`
- `about-to-projects`: `holdAt: 7.78` (duração 7.85s)

## Receita usada (para os clipes 02–06)

1. `https://flow.google.com/` → projeto ativo ou **Novo projeto**.
2. Modo **Frames**; primeiro frame = frame de congelamento da sessão anterior (`02-about-poster.png`, depois `03-projects-poster.png`, etc.).
3. Modelo **Veo 3.1 Fast**, 16:9, **8s**, **x1** (20 créditos por clipe), 720p.
4. Prompt base:
   > O busto de mármore branco com óculos amarelos, sobre um grande círculo amarelo em fundo preto, sem fone de ouvido. Câmera completamente fixa. Partindo exatamente do primeiro frame, <AÇÃO>. Fundo preto profundo, luz de estúdio suave, mármore branco, amarelo #FFC900, sem texto, sem logos, sem marca d'água. Movimento lento e cinematográfico.
5. Gerar → abrir o resultado → **Fazer o download** → **1080p Aprimorada** → o arquivo cai em `C:\Users\PEDRO LUCAS\OpenBot\Downloads` e é copiado para `public/media/backdrop/`.
6. Extrair o frame final: usar script headless Chrome CDP (`capture_poster.mjs`) para salvar o frame exato em PNG como pôster da próxima seção.

## Ações por clipe

| Clipe | Primeiro frame | Ação do busto |
|---|---|---|
| `02-about-to-projects` | `02-about-poster.png` | busto vira o rosto e aponta o braço direito para a direita do quadro (entregue) |
| `03-projects-to-stack` | `03-projects-poster.png` | aponta alternando esquerda/direita |
| `04-stack-to-purpose` | pôster da sessão 4 | recolhe o braço, círculo amarelo expande |
| `05-purpose-to-experience` | pôster da sessão 5 | volta ao centro, órbita lenta |
| `06-experience-loop` | pôster da sessão 6 | loop curto respirando |

## Enquanto um clipe não existe

`VideoStage` marca o clipe como falho e mostra o pôster daquela seção — o resto continua funcionando. Nenhum layout quebra, nenhum vídeo toca em `prefers-reduced-motion`, `saveData` ou telas ≤ 768px.
