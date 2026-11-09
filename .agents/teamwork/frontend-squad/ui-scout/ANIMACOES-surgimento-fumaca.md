# ANIMAÇÕES DE SURGIMENTO E SUMIÇO ENTRE SESSÕES — "água / fumaça"

Pedido do Pedro: animações de surgir e sumir na troca de sessões, "algo fluido igual
água ou fumaça". Este doc é a especificação; o código é do FrontendCraft.

Tudo abaixo foi **medido no navegador com `prefers-reduced-motion: reduce` ativo**
(o caso real do Windows do Pedro), hoje, no build atual.

---

## 0. O bloqueio que invalida a abordagem atual

O painel de texto já tem uma animação desenhada em CSS:

```css
/* film.css:105-108 */
.film-panel {
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1), visibility 0.55s linear;
}
```

Medido no computed style, neste navegador:

| Propriedade | Valor real |
|---|---|
| `matchMedia('(prefers-reduced-motion: reduce)').matches` | **true** |
| `transition-duration` do `.film-panel` | **`1e-05s`** |

Ou seja: **a animação de 0,55s nunca acontece na máquina do Pedro.** É
`base.css:77-81` (`transition-duration: .01ms !important` sob reduced-motion) que
zera. O `!important` está lá por um bom motivo (acessibilidade) e **não deve ser
removido** — qualquer solução tem que conviver com ele.

### Testei as alternativas e todas falharam por igual

| Abordagem | Resultado medido |
|---|---|
| CSS `transition` | morta: `1e-05s` |
| CSS `@keyframes` + `animation` | morta: `animation-duration: 1e-05s`, elemento ficou em `opacity: 0` |
| **Web Animations API** (`el.animate()`, `fill: both`) | **também morta**: amostrei 6 vezes em 700ms e a opacidade ficou em `0` o tempo inteiro; `anim.currentTime` ficou em **0** |
| Escrever `style.opacity` / `style.filter` / `style.transform` de uma **função pura da posição** | **funciona** — medi um passe de entrada completo em **364ms**, terminando em `opacity: 1` |

Conclusão dura: no ambiente dele, **só estilo inline escrito por JS anima.** Web
Animations API é a única surpresa desta rodada e vale registrar, porque é a resposta
"óbvia" que qualquer um tentaria primeiro.

---

## 1. Top-1: "dissolve em fumaça" dirigido pelo scroll, em JS

A animação não é um timer — é uma **função da posição do scroll**, igual ao resto do
site. Isso tem três vantagens que o Pedro sente na mão: acompanha o dedo, é
reversível (subir a página desfaz a fumaça) e sobrevive ao reduced-motion.

### 1a. Curva de "fumaça": blur que abre + subida + opacidade

```ts
const smoothstep = (t: number) => {
  const x = Math.min(1, Math.max(0, t))
  return x * x * (3 - 2 * x)
}

// `local` = 0..1 dentro da fatia do painel
const p = smoothstep(local)

panel.style.opacity = String(p)
panel.style.filter = p >= 1 ? 'none' : `blur(${(14 * (1 - p)).toFixed(2)}px)`
panel.style.transform =
  p >= 1 ? 'none' : `translate3d(0, ${(18 * (1 - p)).toFixed(1)}px, 0) scale(${(0.994 + 0.006 * p).toFixed(4)})`
```

Por que isso lê como água/fumaça e um fade linear não: **o blur é o que dá a
sensação de matéria.** Um `opacity` sozinho é um fantasma chapado. O par
`blur(14px) → 0` + `1px → 0` de subida é exatamente o que o Material Design chama de
*"fade through"* (a transição entre telas) e o que o Apple usa nos crossfades de
cena. Números calibrados para este site: **blur máximo 14px** (acima disso o texto
fica ilegível por tempo demais), **subida 18px**, **duração ≈ 360–500ms de rolagem**.

### 1b. O "sumir" não pode ser o inverso do "surgir"

O Pedro pediu "surgimento **e** sumir". A armadilha: se a saída espelhar a entrada,
os dois painéis ficam semitransparentes ao mesmo tempo e o texto se sobrepõe — vira
lama, não fumaça. A regra que funciona (mesma do `HANDOFF` que já existe no
`FilmSlide.tsx`):

1. **Quem entra** sobe `0 → 1` com blur `14px → 0`.
2. **Quem sai** não faz o caminho de volta: sai com **blur menor** (`6px`) e
   deslocamento **para cima** (`-12px`, direção oposta), por uma janela **mais curta**
   (≈ 55% da entrada). Dois movimentos em direções diferentes leem como "um entrou,
   outro se desfez" em vez de duas lâminas se cruzando.
3. O painel que sai fica **por baixo** (`z-index`) e o que entra **por cima** — senão
   o texto antigo risca o novo durante o cruzamento.

### 1c. Nunca animar `blur` no container inteiro, se der para animar só o texto

`filter: blur()` num elemento de tela cheia força a repintura de 100svh a cada frame.
Medido que funciona, mas o barato é animar o **filho de texto** (`.about__shell`,
`.project-cards`) e deixar scrim/fundo estático. Se o FrontendCraft aplicar no
painel inteiro e sentir queda de FPS, é aqui que corta.

### 1d. Um detalhe de acessibilidade que não é opcional

Reduced-motion está **ligado** na máquina dele, e ligar blur em movimento contínuo
para quem pediu menos movimento é contra a própria razão do `!important`. Recomendo:
manter a transição (ele quer ver!), mas **reduzir a amplitude** quando
`prefers-reduced-motion: reduce` — blur 6px e subida 6px em vez de 14/18. Não é
desligar; é não sacudir. (E é coerente com o site já ter decidido que o *produto*
— o vídeo — roda mesmo com reduced-motion.)

---

## 2. Os cards já são glassmorphism — o que falta é o "vidro de verdade"

Medido no build atual, os 3 cards de projeto:

| Item | Valor medido |
|---|---|
| `.project-card > a` | `backdrop-filter: blur(18px) saturate(1.15)` |
| fundo | `linear-gradient(145deg, rgba(20,22,28,.62), rgba(8,10,14,.5))` |
| borda | `1px solid rgba(245,243,239,.18)` |

Então **não é "fazer glassmorphism"** — já está feito, e nos 5 lugares (`.stats-grid`,
`.stack-grid article`, `.purpose-section__copy`, `.timeline-card`, `.project-card`).
O que faz um vidro parecer barato é outra coisa, e são 4 ajustes:

1. **A luz da borda tem que ter direção.** Hoje o `inset 0 1px 0 rgba(255,255,255,.09)`
   é só em cima. Vidro real pega um fio de luz na aresta superior **e** uma sombra
   interna na inferior: `inset 0 1px 0 rgba(255,255,255,.14), inset 0 -1px 0 rgba(0,0,0,.35)`.
2. **Ruído.** Vidro liso parece plástico. Um `background-image` com `feTurbulence`
   em SVG data URL a 2–3% de opacidade mata o "plástico" — é o truque do Vercel/Aceternity.
3. **`saturate` subir junto com o blur.** O plano de fundo é escuro e dessaturado; sem
   `saturate(1.3)` o vidro fica cinza. Hoje está em 1.15.
4. **Borda que ilumina no hover** já existe (`--glass-edge-hover`). Manter, e animar
   esse fio com o mesmo `smoothstep` da entrada, não com `transition` — pelo mesmo
   motivo da seção 0.

---

## 3. Ordem de execução recomendada (menor risco primeiro)

1. Trocar a entrada/saída do `.film-panel` de CSS `transition` para **função pura**
   (seção 1). É o ganho visível que o Pedro não vê hoje, e o diff é pequeno: o
   `data-visible` já é escrito no `FilmSlide.tsx:81`, basta escrever opacidade/blur ali.
2. Os 4 refinamentos de vidro (seção 2) — só CSS, sem tocar em JS.
3. Só depois, se ainda faltar: pré-carregar o "surgir" com `filter` no container.

---

## 4. Referências

1. **Material Design 3 — *Fade through*** (transição canônica entre telas): fade +
   leve escala, ordem de opacidade antes da escala. É a base da seção 1a.
2. **Apple — cenas com crossfade em scroll** (`apple.com/airpods-pro`): a lição é que
   o blur curto (≤ 20px) com saída para `0` é o que o olho lê como "matéria", não
   fantasma.
3. **Aceternity UI / Vercel Geist — *glass card***: ruído em SVG + borda de luz
   direcional + `saturate` alto. Referência da seção 2.
4. **MDN — `Element.animate()`**: documenta que animações WAAPI respeitam
   `prefers-reduced-motion` quando o autor usa `matchMedia` — mas aqui foi o bloco
   global com `!important` que a destruiu, medido na seção 0.
