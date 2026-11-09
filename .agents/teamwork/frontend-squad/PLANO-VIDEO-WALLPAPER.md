# Plano — Video Wallpaper + Refino das 6 Seções (pedroreoli-portfolio)

Owner: BotManager (lead) · Squad: LayoutGuard, ColorTokens, UI-Scout, MediaForge, FrontendCraft
Data: 2026-11-06 · Repo: `F:\Projetos\Pessoais\portfolios\pedroreoli-portfolio`

## 1. O que existe hoje (leitura do código)

Stack: Vite 8 + React 19 + TS 5.9, vanilla CSS (`base.css`, `layout.css`, `home.css`, `pages.css`, `responsive.css`), GSAP + ScrollTrigger (`useReveal`), `motion/react` para hover e reveals, conteúdo 100% em `content/*.json`. Build: `npm run build` (tsc -b && vite build), testes `npm test` (Vitest + Testing Library), lint `npm run lint`.

Mapa das seções (`src/pages/HomePage.tsx` → `content/interfaceContent.json`):

| Sessão | Componente | id | sectionNumber | Estado |
|---|---|---|---|---|
| 1 Hero | `HeroSection.tsx` | `hero` | 01 | Imagem `public/images/pedro-bust-cyber.jpg` (busto de mármore + fone/óculos amarelos, círculo `#ffc900`) com parallax de ponteiro, headline PEDRO REOLI, 2 CTAs |
| 2 Sobre | `AboutSection.tsx` | `sobre` | 02 | Moldura museu com `eu-profissional.png`, tilt 3D, stats, pills, timeline GSAP |
| 3 Projetos | `SelectedProjectsSection.tsx` | `projetos-selecionados` | 03 | `.project-showcase` = grid 2 colunas, cards com chrome bar e arte procedural |
| 4 Stack | `StackSection.tsx` | `stack` | 04 | `.stack-grid` = 4 colunas fixas, 100svh travada, itens 20px de ícone / 0.68rem de fonte (pequeno demais) |
| 5 Propósito | `PurposeSection.tsx` | `proposito` | 05 | Aprovada por Pedro — só adaptar se o fundo mudar |
| 6 Experiência | `ExperienceSection.tsx` | `experiencia` | 06 | Timeline vertical alternada + `Sparkles` ao lado de `#01` (remover) |

Observações relevantes:
- `home.css` já tem ~609 linhas e blocos `!important` de override escuro no fim (dívida a consolidar).
- `useReveal` aplica `opacity: 0` global e revela em batch: cards que entram na viewport depois herdam o batch, então a animação "por card" pedida para a sessão 6 precisa de trigger individual.
- O Hero hoje é `height: 100svh`, imagem `object-fit: contain`.
- `public/images/pedro-bust-cyber.jpg` e `hero-bust-cyber.jpg` são o mesmo arquivo (380 KB, provável 1376×768).

## 2. Direção aprovada por Pedro (requisitos)

1. Hero: **manter a imagem/conceito** (busto + fone + óculos + círculo amarelo), mas **retrabalhar via IA (Google Flow/Veo)** para gerar assets melhores.
2. Backdrop: **vídeo de papel de parede em todo o site** — o site inteiro "respira" o vídeo.
3. Vários vídeos encadeados por **frame congelado**: o vídeo roda da seção N para N+1, congela no início de N+1; o último frame vira o primeiro frame do vídeo N+1→N+2. Troca direta, sem corte visível.
4. Na passagem 2→3 o vídeo pode mostrar o busto saindo e **a foto real de Pedro surgindo**, e depois o busto voltar.
5. Seção 3 (Projetos): sai do grid → **itens alinhados alternando direita/esquerda**, e o vídeo **transita e aponta** para os itens.
6. Seção 4 (Stack): **refazer** — cards menores, **títulos dos cards e ícones maiores** (hoje ilegíveis).
7. Seção 5: manter.
8. Seção 6: manter, **aumentar levemente cards e fontes** e dar **animação de surgimento por card**.
9. Remover o **ícone de estrela ao lado dos números** (`Sparkles` em `#01`, sessão 6).

## 3. Arquitetura proposta — "Video Stage"

### 3.1 Componente único
`src/components/scene/VideoStage.tsx` (novo), montado **uma única vez** em `HomePage`, atrás de todas as seções:

```
<VideoStage />   // fixed, inset:0, z-index:0, pointer-events:none, aria-hidden
<sections>      // position:relative, z-index:1, fundos passam a ter scrim/transparência
```

Regras:
- Um único elemento `<video>` (evita N decoders); `muted playsInline preload="auto"`, sem áudio.
- Playlist declarativa em `content/sceneClips.json` (fonte de verdade, nunca hardcode no componente).
- `IntersectionObserver` (threshold 0.5) + `requestAnimationFrame` mapeiam seção visível → clipe da transição.
- Ao entrar na seção N: `currentTime = 0`, `play()`. Ao atingir `holdAt` (segundos): `pause()`. O frame em `holdAt` é exatamente o `poster` da seção N (gerado do mesmo frame pelo MediaForge) → nenhum "salto" quando o vídeo para.
- Clipe da próxima transição é pré-carregado (`<link rel="preload">` + vídeo oculto) antes do scroll chegar.
- Fallback obrigatório: `prefers-reduced-motion`, `navigator.connection.saveData`, `(max-width: 768px)` → **só posters** (a imagem da hero continua), zero vídeo.
- Crossfade do "Pedro real" na sessão 2: camada `<img>` separada com opacidade controlada por um evento do clipe (`data-clip-marker`), não por timers soltos.

### 3.2 Contrato de dados — `content/sceneClips.json`
```json
{
  "version": 1,
  "basePath": "/media/backdrop",
  "heroPoster": "/media/backdrop/01-hero-poster.webp",
  "clips": [
    {
      "id": "hero-to-about",
      "from": "hero",
      "to": "sobre",
      "src": "/media/backdrop/01-hero-to-about.mp4",
      "webm": "/media/backdrop/01-hero-to-about.webm",
      "holdAt": 6.2,
      "duration": 8.0,
      "poster": "/media/backdrop/02-about-poster.webp",
      "markers": [{ "name": "pedro-photo", "at": 3.4 }, { "name": "statue-back", "at": 5.1 }]
    }
  ]
}
```
`markers` são opcionais e servem para camadas HTML sincronizadas (foto real, legendas, scrims).

### 3.3 Camadas e legibilidade
- `.video-stage` (vídeo) → `.video-stage__scrim` (gradiente por seção) → `.home` (conteúdo).
- Seções claras atuais (`section-light`) passam a usar painel translúcido (`backdrop-filter`) sobre o vídeo, senão o texto morre no mármore/amarelo. Tokens de scrim definidos pelo ColorTokens.
- `z-index` documentado; nada de `!important` novo.

### 3.4 Performance / a11y
- Vídeos ≤ 8 s, ≤ 6 MB cada, H.264 MP4 + WebM VP9, 1920×1080 (ou 1440×810), 24–30 fps, sem áudio.
- `poster` em WebP ≤ 250 KB, `loading="eager"` só o primeiro.
- `aria-hidden` na camada; nenhuma informação exclusiva em vídeo; contraste AA sobre o scrim.
- Se o vídeo falhar (`onError`), cai para poster sem quebrar layout.

## 4. Mudanças por seção (o que o FrontendCraft implementa)

### S1 Hero
- Mantém composição, copy, CTAs e parallax. O vídeo substitui a imagem **como camada de fundo**; a imagem continua como `poster`/fallback.
- O clipe 1 começa no frame idêntico à imagem atual para a troca ser invisível.

### S2 Sobre
- Recebe clipe 1 (busto tirando o fone). Moldura museu, stats e pills preservados.
- Clipe 2 (2→3) tem o beat: foto real de Pedro entra no lugar do busto → busto volta.
- Fundo deixa de ser branco chapado: painel `--paper` translúcido sobre o vídeo (se a legibilidade exigir, painel opaco com bordas da moldura apenas).

### S3 Projetos — grid → rail alternado
- Substituir `.project-showcase` (grid 2 col) por `.project-rail`: uma linha editorial por projeto, `min-height: clamp(420px, 62svh, 640px)`, coluna de mídia alternando `--align: right` / `--align: left`, tipografia grande à esquerda/direita, chrome bar e artwork preservados.
- Ordem: Autocom3 (direita), Achilles (esquerda), Organon (direita) — o vídeo "aponta" para o lado do item ativo; a coreografia do busto é baked no asset, o HTML só sincroniza o scrim/realce do item.
- Mobile: empilha, mídia no topo, sem perda de conteúdo.
- Remover o `max-height: 480px` atual; reveal por linha.

### S4 Stack — rebuild
- Cards **menores** (padding e altura reduzidos, grid mais compacto, 5 colunas em ≥1280px se couber; 4 em desktop).
- **Título do card**: `h3` de 0.82rem → `clamp(1rem, 1.15vw, 1.2rem)`, ainda uppercase/tracking.
- **Ícones**: 20px → `clamp(22px, 1.8vw, 26px)`, caixa 34–38px.
- **Label da ferramenta**: 0.68rem → `clamp(0.78rem, 0.9vw, 0.9rem)`, permitir 2 linhas (remover ellipsis de 1 linha).
- Deixar de travar 100svh se o conteúdo não couber (usar `min-height` + auto).
- Manter tema escuro e o amarelo `#ffc900`.

### S5 Propósito
- Sem mudança de layout. Se o vídeo passar por trás, só o scrim.

### S6 Experiência
- Cards `+8–12%`: `timeline-card__heading h3` `clamp(1.4,1.9vw,2.1)` → `clamp(1.55,2.05vw,2.3)`; `__desc` 0.78 → 0.84rem; `__highlights li` 0.68 → 0.74rem; largura do card `clamp(340,26vw,420)` → `clamp(360,27vw,450)`.
- **Remover `<Sparkles>` do `.timeline-card__chapter`** (e o CSS correspondente). `#01` fica só texto.
- Animação de surgimento **por card**: `ScrollTrigger` individual (`start: 'top 88%'`, `once: true`) ou `motion` `whileInView` com `stagger` de 0.08 — cada card novo entra com fade+rise; respeitar `reducedMotion`.

## 5. Assets (MediaForge) — o que gerar no Google Flow/Veo

Pasta: `public/media/backdrop/`

| # | Arquivo base | Conteúdo | Duração | Poster/freeze |
|---|---|---|---|---|
| 0 | `01-hero-poster.webp` | frame 0 = imagem atual retrabalhada | — | 1600w |
| 1 | `01-hero-to-about` | busto tira o fone devagar, olha para a câmera, assente | 6–8 s | frame final → `02-about-poster.webp` |
| 2 | `02-about-to-projects` | busto pousa o fone, dissolve; `eu-profissional.png` entra e some; busto volta e aponta para o lado | 8–10 s | frame final → `03-projects-poster.webp` |
| 3 | `03-projects-to-stack` | busto aponta alternando lados (esq/dir) conforme as linhas passam | 8–10 s | `04-stack-poster.webp` |
| 4 | `04-stack-to-purpose` | busto recolhe o braço, círculo amarelo expande para o fundo | 6–8 s | `05-purpose-poster.webp` |
| 5 | `05-purpose-to-experience` | busto volta ao centro, órbita lenta | 6–8 s | `06-experience-poster.webp` |
| 6 (opc.) | `06-experience-loop` | loop curto respirando para o fim da página | 4–5 s | — |

Regras visuais: mesmo mármore, fundo preto, círculo `#FFC900`, luz suave, sem texto, sem logos, sem watermark, câmera quase fixa, enquadramento idêntico ao hero atual (busto centralizado, ombro no terço inferior), nada de corte seco no fim — o último frame precisa servir de primeiro frame do próximo.

Entrega por clipe: `.mp4` (H.264, yuv420p, faststart), `.webm` (VP9), `poster.webp` (frame de `holdAt`), tudo sem áudio. Nomes exatamente como na tabela.

Bloqueio conhecido: Google Flow exige login Google do Pedro. Se o navegador não estiver autenticado, MediaForge **reporta o bloqueio** com o card de takeover — não inventa asset e não usa banco de imagens externo.

## 6. Fronteiras de escrita (evitar conflito entre agentes)

| Agente | Pode escrever | Não toca |
|---|---|---|
| MediaForge | `public/media/backdrop/**`, `docs/backdrop-asset-spec.md` | código, CSS, content JSON |
| UI-Scout | `.agents/teamwork/frontend-squad/ui-scout/**` | código |
| ColorTokens | `.agents/teamwork/frontend-squad/color-tokens/**` | código (entrega valores, não edita CSS) |
| LayoutGuard | `.agents/teamwork/frontend-squad/layout-guard/**` | código |
| FrontendCraft | `src/**`, `content/**`, `public/media/backdrop/` (só leitura dos assets) | docs dos outros, assets gerados |

- Branch de trabalho: `feat/video-wallpaper` (a partir do estado atual, preservando as mudanças não commitadas). **Nunca commitar direto na `main`.** Commits atômicos, um por seção.
- FrontendCraft é o **único** que edita código nesta rodada; os outros entregam especificação/valores.

## 7. Ordem de execução e critérios de aceite

1. Paridade: MediaForge gera posters + clipes; FrontendCraft monta `VideoStage` + `sceneClips.json` **já com fallback por poster** (funciona antes dos vídeos existirem).
2. S3 rail, S4 stack rebuild, S6 ajustes + remoção da estrela (não dependem de asset).
3. Integração dos clipes conforme chegam, um por um.
4. Revisão final LayoutGuard (750 linhas/arquivo, componente canônico único, WCAG AA) + ColorTokens (contraste do scrim) + `npm run lint && npm test && npm run build`.

Aceite:
- [ ] Nenhum vídeo toca em `prefers-reduced-motion`, mobile estreito ou `saveData`; posters cobrem 100% dos casos.
- [ ] Troca entre clipes sem frame preto/branco e sem corte visível.
- [ ] S3 sem grid de 2 colunas; linhas alternando esquerda/direita em ≥1024px e empilhadas no mobile.
- [ ] S4 com título de card e ícones visivelmente maiores e cards mais compactos.
- [ ] S6 com `Sparkles` removido dos números e reveal individual por card.
- [ ] `lint`, `test`, `build` verdes; sem `!important` novo.
