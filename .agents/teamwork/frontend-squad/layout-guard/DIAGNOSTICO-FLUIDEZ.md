# Diagnóstico da fluidez — por que "encaixado" mas "nada fluido"

Auditor: LayoutGuard · headless (`--headless=new` + CDP) · HEAD `53e48aa` · preview :4177
Nada editado. Screenshots em `diag-fluid/`. Medições: `diag-fluid/` + logs abaixo.

O encaixe está certo (seção ↔ quadro ↔ tempo). O que falta é **fluidez de movimento**, e são três causas medidas — nenhuma delas é "falta de easing".

---

## 1. A passagem entre as imagens é um **corte seco**, não um crossfade

O `film.css` define `transition: opacity 0.5s` no `.film-slide__video` e outro no poster — mas a transição **nunca roda**. Medido na fronteira de 900px, amostrando a cada frame:

| frame | slide 0 (vídeo) | slide 1 (vídeo) |
|---|---|---|
| antes | 1.00 | 0.00 |
| f0 | 1.00 | 0.00 |
| **f1** | **0.00** | **1.00** |
| f2…f21 | 0.00 | 1.00 |

Do f0 para o f1, as duas opacidades trocam no **mesmo tick**. E a razão para o `transition` não salvar está medida: o computed style do vídeo mostra

```
transition-property: opacity
transition-duration: 1e-05s   ← 0.00001s
```

Ou seja, o `0.5s` do `film.css` **está sendo zerado** — é o bloco global de `prefers-reduced-motion` (o Windows do Pedro tem efeitos de animação desligados, então todo Chromium reporta `reduce`). A animação de opacidade que o CSS promete não existe nem em tese nesse ambiente. Confirmei também que **nunca** há 2 slides visíveis ao mesmo tempo (`maxConcurrent = 1`).

Isso é coerente com a decisão anterior de que **o fundo não é decoração**: o squash global de `transition` sob `reduced-motion` precisa **excluir** as camadas da fita (`.film-slide__video`, `.film-slide__poster`), do mesmo jeito que já se decidiu que o vídeo segue o scroll mesmo com `reduce`. Sem isso, qualquer crossfade será cortado no ambiente do Pedro.

**É exatamente o que Pedro descreve** como "a passagem entre as imagens" não fluida: o quadro troca de estalo.

### Correção
O corte tem que ser substituído por uma sobreposição real, e ela tem que **sobreviver ao `reduced-motion`** (que hoje zera a transição). Duas opções simples, em ordem de preferência:

1. **Opacidade contínua pela posição na fatia** (melhor): no `FilmSlide`, em vez de `active: true/false` binário, calcular a opacidade pelo progresso dentro da fatia — o slide entra 0→1 nos primeiros ~15% e sai 1→0 nos últimos ~15%, e o seguinte faz o inverso. Como o valor é função pura de `scrollY`, **não depende de transition nenhuma** — logo, não é desligado por `prefers-reduced-motion`, e é genuinamente suave e reversível ao arrastar.
2. **Crossfade temporal curto** (`transition: opacity 240ms`) — só funciona se o bloco global de `reduced-motion` for ajustado para **não** zerar `.film-slide__video`/`__poster`. É a opção mais frágil, porque depende de uma exceção no CSS global.

> Atenção ao motivo pelo qual virou binário: a correção anterior (do busto grego) precisou que o poster inativo ficasse invisível. Isso é compatível com opacidade contínua — o que não pode voltar é o **poster** aparecendo fora do slide ativo.

---

## 2. A imagem para em **97% dos frames de scroll**

Medido: rolando de 0 a 900px em passos de 3px (300 frames de animação), a imagem mudou em **8** e ficou parada em **292** — **97% de "congelado"**, com 8 saltos.

Motivo: `stepsForSpan` cria **8 frames por slide** (900px / `STEP_PX` 120 = 8), e o clipe (3.21s) é amostrado em 8 pontos → **0.4s por frame**. Então:

- cada "frame" dura ~0.39s de conteúdo (0.391, 0.782, 1.174, 1.565, 1.956, 2.348, 2.739 — medido);
- o seek em si custa **77–231 ms** por mudança (medido no `seeked`).

O conjunto é a sensação de "travado + pula". O texto, ao contrário, tem `transition 0.55s` — então texto desliza macio enquanto a imagem teleporta. Fluxo e fundo com linguagens temporais diferentes = o "não está fluido".

### Correção
- Aumentar a densidade de frames **sem** aumentar o seek: em vez de `Math.round(span / STEP_PX)` (8), usar a duração real do clipe a ~12–15 fps amostrado (3.21s → 40 frames) **e** trocar o `currentTime` apenas em `requestVideoFrameCallback`, não a cada evento de scroll. O padrão "cada scroll = um frame" continua válido; o que muda é o tamanho do passo (frame de ~66–80ms em vez de 400ms).
- Se o seek continuar caro (MP4 H.264 demora a procurar), a alternativa de qualidade é **pré-decodificar**: sequência de imagens (WebP) desenhada em `<canvas>` — é o que Apple/scrollytelling fazem; sai do seek e vira blit. Custo em bytes, ganho em fluidez total.

---

## 3. Faixas pretas de 45px em cima e embaixo

O clipe é 16:9 e o palco é `1440×900` com `object-fit: contain`. Conta direta: 1440 × 9/16 = **810px de altura** → sobram **45px de barra preta** topo e base. Isso "quebra" a imersão e realça o corte da §1.

**Correção:** `object-fit: cover` com `object-position: center 60%` (o busto está no terço inferior) **ou** ajustar a proporção do palco para caber 16:9. Se Pedro quiser o busto inteiro sem cortar, aí o barrel é intencional e deve ser a cor de fundo `#050609` — o que já é — mas some a ilusão de "vídeo de fundo".

---

## 4. Detalhe medido que não é bug, mas atrapalha

- No `y=0..90` o tempo fica **0.000** (o primeiro frame ocupa a fatia inteira de `frameAt` até `local >= span/steps`) — a hero fica 90px "morta" antes de começar. Arredondar para cima no primeiro passo resolve.
- `preload="auto"` em **6 vídeos** simultâneos: com 6 × ~3.4MB o navegador mantém muitos decoders; os seeks de 77–231ms sentem. Carregar só o slide atual + vizinhos (`preload="metadata"` nos demais) melhora a resposta.

---

## Ordem sugerida (menor risco primeiro)

1. **§1 opacidade contínua pela fatia** — é o que Pedro chamou de "passagem entre as imagens". ~15 linhas em `FilmSlide.tsx` + 2 regras no `film.css`.
2. **§3 `object-fit: cover`** — 1 linha, remove as barras e melhora a sensação de imersão.
3. **§2 densidade de frames** (~40 por slide) — junto com `requestVideoFrameCallback`; se o seek continuar ruim, discutir pré-decodificação.
4. **§4** pré-carga seletiva e o primeiro passo.

Nenhum desses passos cria `!important` novo, `position: fixed` de fundo, nem segundo componente de fundo — o `FilmSlide` continua sendo o componente canônico do fundo.
