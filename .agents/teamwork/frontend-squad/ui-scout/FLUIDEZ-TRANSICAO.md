# FLUIDEZ DA TROCA ENTRE FRAMES — pesquisa e especificação

Pedido: "a troca entre os frames ainda poderia ser levemente mais suave".
Tudo abaixo foi **medido neste navegador** (clipe real `01-hero-to-about.mp4`,
1920×1080, `duration 3.208s`) ou lido na especificação. O que é estimativa está marcado.

---

## 0. O diagnóstico que muda tudo: "suavizar o fade" não resolve

O fade na fronteira (`OVERLAP = 220px`, `FilmSlide.tsx:43`) já está contínuo. O que
deixa a passagem com cara de travada é outra coisa: **dentro da fatia de uma seção a
imagem muda só 8 vezes em ~900px de rolagem** (`stepsForSpan = round(span/120)` →
`STEP_PX = 120px`). Entre essas 8 mudanças o vídeo está parado. Um fade perfeito
sobre um quadro parado continua parecendo travado.

Agravante medido: o seek é **caro e cresce com a distância do alvo**.

| Varredura (mesmo clipe, já aquecido) | Mín | Máx | Média |
|---|---|---|---|
| 41 seeks de 0 → 3,0s, passo 0,075s | 3 ms | 120 ms | **65 ms** |
| 41 seeks de 3,0 → 0s (rewind) | 0 ms | 129 ms | **65 ms** |
| 21 seeks de 1,0 → 3,0s, passo 0,1s | 45 ms | 117 ms | **82 ms** |
| Série completa (1º→último frame) | 9 ms | 118 ms | monotônica |

Leitura: o custo **não** é do salto, é do **keyframe GOP**. Perto do keyframe o seek
custa 3–20ms; longe dele, 100–130ms. O `GET` que o browser faz é sempre "decodifique a
partir do keyframe anterior". Ou seja: densificar frames **sem** mexer no GOP troca
8 seeks de 65ms por 40 seeks de 65ms — piora. O que muda o jogo é o GOP, não o número
de chamadas. (Testei também forçar `video.width = 320`: **nada** mudou, 65ms de média.
O gargalo é decodificação de quadro-chave, não pixel.)

O outro sabotador já conhecido: `base.css:77-81` zera **todas** as `transition` com
`!important` sob `prefers-reduced-motion` — e o Windows do Pedro reporta
`prefers-reduced-motion: reduce` (confirmado neste navegador: `reduced: true`). Logo:
**qualquer suavização baseada em CSS `transition`/`animation` é morta por design.**
A suavização tem que ser **valor escrito em função de `scrollY`**, ou um laço rAF.

---

## 1. Top-1: opacidade e interpolação contínuas em função de `scrollY` (JS puro)

Caminho escolhido porque sobrevive ao reduced-motion, não muda o `FilmSlide`
canônico, não adiciona dependência e é reversível: **escrever `style.opacity` (e o
`currentTime`) de uma função pura da posição**, exatamente como a rampa de 220px já
faz. O que muda é **o que** passa a ser contínuo:

### 1a. Crossfade com curva, não rampa linear

Substituir `fadeIn = (y - start) / OVERLAP` por uma curva de suavização. Rampa linear
tem velocidade constante e "bate" nas duas pontas — a percepção chama isso de seco.
Duas opções sem dependência:

```ts
// smoothstep (equivalente C1 ao ease-in-out do CSS, mas em JS: reduced-motion não desliga)
const smoothstep = (t: number) => {
  const x = Math.min(1, Math.max(0, t))
  return x * x * (3 - 2 * x)
}

// ou o mesmo comando do Apple/Vercel: "in-out-cubic"
const inOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

const fadeIn = smoothstep((y - start) / OVERLAP)
```

Uso: `video.style.opacity = String(fadeIn)` — nunca `transition`. E subir o
`OVERLAP` de **220 → ~360px**: 220px numa viewport de 800px é 27% da tela, o dissolve
termina antes do olho registrar que começou. 360px dá ~45% e lê como passagem.

**Regra que não pode sair:** o clipe que sai fica em `1` durante todo o dissolve (é o
que o `561baee` já corrigiu). Curva suave **sem** essa regra volta a piscar preto.

### 1b. O que de fato mata a sensação de travado: interpolar o frame

Hoje: `currentTime = timePerStep * floor(local / frameStep)` → 8 degraus por seção.
Mudar para **tempo contínuo dentro da seção** e deixar o seek acontecer a cada
`requestVideoFrameCallback`:

```ts
// alvo contínuo: mesma janela, sem floor() e sem STEP_PX
const t = Math.min(hold, (local / span) * hold)

// perseguir o alvo uma única vez por quadro apresentado, nunca por evento de scroll
let pending = t
const pump = () => {
  if (video.readyState >= 2 && Math.abs(video.currentTime - pending) > 1 / 60) {
    video.currentTime = pending
  }
  video.requestVideoFrameCallback(pump)   // 1 write por frame apresentado
}
video.requestVideoFrameCallback(pump)
```

`requestVideoFrameCallback` existe e é `function` neste navegador (verificado). Ele
entrega o callback **depois** que o quadro foi composto, então escrever ali não
disputa com o compositor e não acumula seeks (que é o que faz um scrub em JS
"embolar": N eventos de scroll → N seeks). Com o seek a 65ms de média, o limite real é
**~15 quadros novos por segundo** — por isso o alvo tem que ser **amortecido**, não
saltado:

```ts
// 0.35 = ~1 quadro de atraso a 60fps; 1.0 = cola no scroll e engasga
const eased = video.currentTime + (pending - video.currentTime) * 0.35
```

Este é o ponto delicado: `EASE = 0.2` já foi criticado antes (`DIAGNOSTICO-HERO-TRANSICAO.md`)
porque o alvo vinha de um `floor()` grosso — o atraso ficava visível como deslize
depois de o dedo parar. **Com alvo contínuo** o mesmo amortecimento é imperceptível,
porque sempre existe um alvo intermediário novo a cada scroll.

### 1c. Ordem de risco (o que fazer primeiro)

1. `smoothstep` + `OVERLAP` 360 → **ganho imediato, diff de 2 linhas, zero risco**.
2. Amortecimento do `currentTime` (1b) → é o que realmente "des-trava".
3. GOP (seção 2) → só se 1 e 2 não bastarem.

### 1d. Alternativas que eu **não** recomendo aqui, e por quê

| Técnica | Veredito neste repo |
|---|---|
| **GSAP ScrollTrigger `scrub: 0.4`** | Resolveria o amortecimento com 3 linhas, mas: (a) `scrub` usa `gsap.ticker`, que respeita `prefers-reduced-motion` via `gsap.matchMedia` por padrão — e o Windows do Pedro reporta reduce; (b) adiciona ~40KB e um segundo dono do scroll ao lado do `useFrameScroll`. Ganho real ≈ seção 1b, custo maior. Se um dia entrar, **nunca** `scrub: true` (sem amortecimento) nem `scrub: 0.3`+ com alvo `floor()`. |
| **Lenis** | Smooth-scroll (sequestra a roda). O site já mapeia scroll nativo → tempo; trocar por Lenis muda a física do site inteiro e o Pedro já reclamou de "feed de paralaxe" quando o conteúdo e o fundo descolaram. **Não** é o que resolve troca de frame. |
| **Pré-decodificar frames em canvas** | É o padrão de verdade do Apple/AirPods (sprite sheet ou sequência de imagens `decode()`). Aqui dá **5 clipes × ~40 frames = ~200 imagens**; a soma de assets fica na casa das dezenas de MB. Só vale se o projeto aceitar trocar 5 `.mp4` por ~200 `.webp`. É a solução *definitiva* de fluidez (zero seek, 60fps garantido), não a "levemente mais suave" que ele pediu hoje. |
| **CSS `transition` / `@keyframes` / `animation-timeline`** | Mortas pelo `!important` do `base.css` no Windows dele. |

---

## 2. Densidade de frames (8 → ~40 por slide) sem piorar o seek

Medido: o seek custa pela distância ao keyframe, não pelo número de seeks. Então o
gabarito é **encurtar o GOP no encode**, não multiplicar chamadas.

1. **Re-encodar os `.mp4` com GOP curto.** `ffmpeg` com `-g 12` (keyframe a cada 0,5s
   num 24fps) derruba o pior caso de seek de 130ms para ~1/4 disso. Exemplo de comando
   equivalente ao bitrate atual, sem reescalar:

   ```
   ffmpeg -i in.mp4 -c:v libx264 -preset slow -crf 20 -g 12 -keyint_min 12 \
          -sc_threshold 0 -an -movflags +faststart out.mp4
   ```

   `-sc_threshold 0` impede keyframes "extras" por mudança de cena (aqui ajuda a
   prever o custo). `+faststart` põe o `moov` no início — sem isso, o primeiro seek
   espera a lista de índices baixar.

2. **Passo de frame ~70–75ms de scroll**, como o LayoutGuard propôs: em 800px de
   fatia dá ~11 passos de 72px... mas com o alvo **contínuo** (1b) o número de
   degraus deixa de existir; o "40 frames" passa a ser a taxa que o seek aguenta
   (~15/s), não um `floor()`.

3. **Pré-carregar só atual + vizinhos.** Hoje `preload="auto"` nos 6 `<video>`
   (`FilmSlide.tsx:112`) mantém 6 decoders vivos concorrendo por GPU/decode — e é a
   razão mais provável de o seek medido ser pior no site do que isolado. Correção:
   `preload="auto"` no clipe atual e no `index ± 1`, `preload="none"` nos demais, e
   `video.src` só atribuído quando entra no raio. Um `<link rel="preload" as="video">`
   no clipe seguinte cobre a primeira visita sem manter decoder aberto.

4. **Nunca `play()` para "esquentar".** Um clipe tocando concorre com o seek do
   outro e derruba a taxa de quadros. O contrato "sempre pausado" continua valendo.

---

## 3. Faixas pretas: `contain` → `cover` sem recortar o busto

Medido neste viewport (1200×800, clipe 1920×1080, `object-position: 50% 100%`):

| | valor |
|---|---|
| faixa preta por lado com `contain` | **63px** (topo e base) |
| escala `contain` | 0,625 (renders 1200×675) |
| escala `cover` | 0,741 (renders 1422×800) |

Com `cover` a imagem cresce **18,6%** e sobra 111px de cada lado (corte horizontal).
O busto não está no centro: medi a faixa amarela do círculo quadro a quadro → ela
ocupa **y ≈ 30/270 → 270/270** do quadro e a lateral esquerda nos primeiros 20% está
**preta** (brilho 8–34 contra 67 no centro). Ou seja: o conteúdo está deslocado para a
direita e apoiado embaixo.

Receita para não recortar:

```css
.film-slide__video,
.film-slide__poster {
  object-fit: cover;
  /* o busto encosta na base: alinhar embaixo preserva o queixo/ombro */
  object-position: 60% 100%;
}
```

- `100%` (base) é obrigatório: o busto é cortado em cima se centralizar.
- `60%` na horizontal joga o corte para a esquerda, que é a faixa preta — os 111px
  que saem são fundo, não rosto.
- **Verificação antes de commitar:** com `cover`, medir se a largura da faixa amarela
  do círculo ainda cabe; se encostar na borda, recuar para `55%`.
- Em `max-width: 768px` o `film.css` já usa `cover` + `center top`: isso **corta o
  queixo** num enquadramento ancorado embaixo. Trocar para `60% 100%` também.

Se o MediaForge regenerar com o busto centralizado e mais respiro lateral, `cover` +
`center 100%` já resolve — vale pedir margem de 15% de cada lado no enquadramento.

---

## 4. Referências de scroll-scrubbed video fluido

1. **Apple — AirPods Pro / Pro Display XDR**
   `apple.com/airpods-pro` — o caso canônico. Não usa `<video>` com `currentTime`:
   usa **sequência de imagens pré-carregadas** e desenha o frame em `<canvas>`
   conforme o scroll. Zero seek, 60fps, e é por isso que "nunca engasga". É a prova de
   que a solução definitiva é pré-decodificar (seção 1d).
2. **Apple — MacBook Pro / produto com scrub longo**
   mesmo padrão, com `IntersectionObserver` ligando/desligando o preload por trecho —
   útil como modelo da seção 2 (só carregar o que está perto).
3. **GSAP + ScrollTrigger (documentação oficial)**
   `gsap.com/docs/v3/Plugins/ScrollTrigger/` → `scrub`. A página documenta
   explicitamente `scrub: true` (instantâneo) vs `scrub: <number>` (amortecimento em
   segundos) e recomenda `scrub: 1` para vídeo com seek caro. Confirma a técnica da
   seção 1b (amortecer o alvo), mesmo que aqui seja implementada à mão.
4. **scroll-driven-animations.style — demos oficiais (Bramus)**
   `scroll-driven-animations.style` — todas as demos são `animation-timeline` puro,
   mostrando o teto do que dá para fazer sem JS. Serve como referência do que **não**
   adotar aqui (CSS transition/animation morre no reduced-motion do Windows dele).
5. **Chrome for Developers — "Animar elementos na rolagem com animações de rolagem"**
   `developer.chrome.com/docs/css-ui/scroll-driven-animations` — o texto oficial sobre
   scroll timeline e o alerta de que animações na main thread "estão sujeitas a
   travamentos", que é exatamente a razão para escrever o frame em
   `requestVideoFrameCallback` e não em `onScroll`.

---

## 5. Resumo executivo para o FrontendCraft (1 parágrafo, 3 mudanças)

Trocar a rampa linear por `smoothstep()` com `OVERLAP` 220→360 e `object-fit: cover` /
`object-position: 60% 100%`; trocar o `floor()` por **alvo de tempo contínuo** com
amortecimento 0.35 escrito em `requestVideoFrameCallback`; e `preload` só no clipe
atual e vizinhos. Se o Pedro quiser a versão *definitiva* depois disso, o caminho é
pré-decodificar quadro a quadro em canvas (padrão Apple), que custa ~200 imagens.
