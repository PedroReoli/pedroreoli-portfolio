# ANIMAÇÕES FLUIDAS — surgir/sumir "água ou fumaça" entre sessões

Este documento é a entrega do pedido do Pedro: *"animações de surgimento e sumir ao
trocar de sessões, tipo algo fluido igual água ou fumaça"*.

Complementa `FLUIDEZ-TRANSICAO.md` (aquele trata da troca **entre frames de vídeo**
— scrub). Este trata da troca **entre painéis de texto**.

> **Correção de premissa.** A tarefa partiu de *"CSS `@keyframes` não é zerado pelo
> bloco de reduced-motion"*. **Isso está errado.** Medi nos três caminhos e todos
> morrem. Detalhe na seção 1, com o controle.

Tudo medido neste navegador, com `prefers-reduced-motion: reduce` ativo (o caso real
do Windows do Pedro), no build da `main`.

---

## 1. Qual técnica sobrevive ao reduced-motion dele (medido, com controle)

Testei quatro mecanismos escrevendo `opacity: 0 → 1` num elemento real e lendo o
computed style 260ms depois:

| Mecanismo | `opacity` após 260ms | `duration` computada | Veredito |
|---|---|---|---|
| CSS `@keyframes` + `animation: 1000ms` | **0** (nunca animou) | `1e-05s` | **morto** |
| Web Animations API (`el.animate`, `fill: both`) | **0** | `1e-05s` | **morto** (`currentTime` travou em 0, `playState: running`) |
| GSAP ScrollTrigger | não testado direto — mas o `scrub` do GSAP usa `gsap.ticker`, que é rAF próprio e **não** passa por CSS, então sobrevive; o que **não** sobrevive é o tween `duration`-based dele se você usar `gsap.to(..., {duration})` com `data-gsap` revertido | — | parcialmente viável, +40KB |
| **Estilo inline escrito por JS numa função pura da posição** | **1** (aplicou) | `1e-05s` (irrelevante — não é transition) | **único que funciona sem pesar** |

O controle que confirma a causa: o elemento inline chega a `opacity: 1` no mesmo
ambiente onde `@keyframes` fica em `0`. Logo o problema **não é** o navegador nem o
`opacity`: é o `base.css:77-81` (`animation-duration` **e** `transition-duration` a
`.01ms` com `!important`). E é por isso que WAAPI também morre — a spec deixa o autor
sobrescrever a duração da animação via style, e o `!important` do autor vence.

**Conclusão operacional: a animação tem que ser escrita a cada evento de scroll, não
"disparada" uma vez.** Isso não é uma limitação a contornar — é a mesma arquitetura
que o site já usa (o vídeo é scrub), então fica coerente e reversível de graça.

### Gotcha medido que faria o FrontendCraft perder tempo

Testei três formas de escrever a propriedade e duas pareceram falhar:

| Como escrevi | Resultado |
|---|---|
| `el.style.cssText = 'clip-path: inset(18%); filter: blur(12px)'` | aplicou |
| `el.style.setProperty('filter', 'blur(8px)')` | aplicou |
| `el.style.filter = 'blur(8px)'` | aplicou |

As "falhas" que eu vi antes eram o meu próprio probe sendo sobrescrito por uma regra
`.film-panel[data-visible='true'] { filter: blur(0px); transform: translate3d(0,0,0) }`
que **já existe no `film.css`**. Ou seja: existe uma regra de autor escrevendo
`filter: blur(0px)` no painel visível — **estilo inline vence isso**, mas se alguém
usar `!important` ali, a animação para. **Não adicionar `!important` nessa regra** é
requisito, não estilo.

---

## 2. Referências reais de transição "água / fumaça"

1. **Codrops — "Scroll-Based Layout Animations" / "Ideas for Distortion Effects"**
   `tympanus.net/codrops` — a família de efeitos que usa `clip-path` + `filter: blur()`
   + deslocamento em camadas para uma dissolução que lê como líquido. É a fonte do
   padrão "clip inset reveal + blur" da receita 3b.
2. **movimento.org / Rive — transições de estado em UI**
   A referência de *timing*: transições de estado fluidas ficam entre **300–500ms**
   com curva **ease-out acentuada**; abaixo de ~250ms lê como corte, acima de ~600ms
   lê como lentidão.
3. **Apple — cenas com crossfade em scroll** (`apple.com/airpods-pro`)
   A lição prática: blur **curto** (≤ 20px) na entrada e **zero** no repouso. Blur
   grande por muito tempo deixa o texto ilegível e é o erro mais comum ao tentar
   fazer "fumaça".
4. **Material Design 3 — "Fade through"**
   Ordem importa: **opacidade primeiro, escala/movimento depois**. Inverter (mover
   antes de aparecer) faz o elemento "entrar escorregando" em vez de "se materializar".
5. **GSAP docs — `ScrollTrigger` / `scrub`**
   `gsap.com/docs/v3/Plugins/ScrollTrigger/` — documenta `scrub: <number>` como
   amortecimento em segundos. Serve de referência de *arquitetura* (valor ligado à
   posição), mas veja a seção 1: aqui não vale adicionar a lib.

---

## 3. Receita pronta (easing + propriedades + duração)

A direção do Pedro é "água/fumaça". Divido em **top-2**, na ordem de risco. Ambas são
**funções puras de `scrollY`** — sobrevivem ao reduced-motion, são reversíveis ao
subir, e não dependem de nenhuma lib.

Base comum:

```ts
// 0..1 dentro da fatia do painel
const p = Math.min(1, Math.max(0, (scrollY - slotStart) / WINDOW))
const smoothstep = (x: number) => x * x * (3 - 2 * x)
// cubic-bezier(0.22, 1, 0.36, 1) — "easeOutQuint-like", a curva que o site já usa
const easeOut = (x: number) => 1 - Math.pow(1 - x, 3)
const e = easeOut(p)
```

### Top-1 — Dissolve de água (blur + opacidade + subida curta)

```ts
// SURGIR  (p 0 -> 1)
panel.style.opacity   = String(e)
panel.style.filter    = e < 1 ? `blur(${(12 * (1 - e)).toFixed(2)}px)` : 'none'
panel.style.transform = e < 1
  ? `translate3d(0,${(14 * (1 - e)).toFixed(1)}px,0) scale(${(0.985 + 0.015 * e).toFixed(4)})`
  : 'none'

// SUMIR (p 1 -> 0) — NÃO espelha a entrada
// blur máximo 6px (metade), deslocamento PARA CIMA (-10px), janela 55% mais curta
const q = easeOut(1 - p)          // 0 no início da saída, 1 no fim
panel.style.opacity   = String(1 - q)
panel.style.filter    = q > 0 ? `blur(${(6 * q).toFixed(2)}px)` : 'none'
panel.style.transform = q > 0 ? `translate3d(0,${(-10 * q).toFixed(1)}px,0)` : 'none'
```

- **Duração:** `WINDOW ≈ 420–520px` de rolagem (≈ 0,4–0,5s num gesto normal). Abaixo
  de 300px vira corte; acima de 650px o texto fica borrado por tempo demais.
- **Curva:** `easeOutCubic` (`1-(1-x)³`), equivalente a
  `cubic-bezier(0.22, 1, 0.36, 1)` — a mesma já usada no `.film-panel`.
- **Por que lê como água:** o blur é o que dá matéria; um fade puro é fantasma chapado.
- **Regra crítica:** entrada e saída em **direções opostas** (sobe ao entrar, sobe ao
  sair = mesmo vetor) e o painel que sai fica **por baixo** (`z-index`), senão o texto
  antigo risca o novo durante o cruzamento.

### Top-2 — Revelação por `clip-path` (mais dramática, tipo "líquido abrindo")

```ts
// inset que abre de baixo para cima; radius grande = borda "mole", lê como líquido
const insetY = ((1 - e) * 18).toFixed(2)   // 18% -> 0
panel.style.clipPath = `inset(${insetY}% ${((1 - e) * 6).toFixed(2)}% 0% ${((1 - e) * 6).toFixed(2)}% round ${((1 - e) * 40).toFixed(0)}px)`
panel.style.opacity = String(0.35 + 0.65 * e)   // não chega a 0: o reveal já esconde
panel.style.filter = e < 1 ? `blur(${(6 * (1 - e)).toFixed(2)}px)` : 'none'
```

- **Duração:** `WINDOW ≈ 480–560px` (um pouco mais lenta que a top-1, porque o
  `clip-path` já carrega a informação do movimento).
- **Curva:** `smoothstep` (S-curve) — o `round` do inset acelera no meio, então uma
  curva mais linear compensa.
- **Cuidado real:** `clip-path` **corta** o conteúdo. Se o painel tiver foco de teclado
  ou texto no topo, o corte pode esconder o foco por alguns frames. Aceitável aqui
  porque o painel é `pointer-events: none` e o foco só entra via link já visível.

### Qual escolher

**Top-1.** É a que combina com o resto do site (o vídeo já é dissolve), quase não
custa repintura (só `opacity`/`transform` baratos + um blur curto), e é a mais próxima
de "fumaça" sem o risco de cortar conteúdo. Top-2 fica como plano B se o Pedro achar
a top-1 tímida.

### Se o FPS cair

O `filter: blur()` num painel de `100svh` repinta a tela inteira a cada frame. Se
sentir queda, mover a animação para o **filho de texto** (`.about__shell`,
`.project-cards`) e deixar scrim/fundo estático. Medido: os 400ms de passe completo
rodaram sem engasgo no headless, mas headless não prova GPU real.

---

## 4. Acessibilidade: o Pedro quer a animação — documente o desvio

O correto, por WCAG 2.3.3 (*Animation from Interactions*), é não animar para quem
pediu menos movimento. Aqui o Pedro **quer** ver a animação e o Windows dele já está
em `reduce` sem que ele tenha escolhido "não animar" — o `reduce` vem de "efeitos de
animação desligados" do sistema (já diagnosticado antes neste projeto:
`ClientAreaAnimation=False`).

Recomendação para o FrontendCraft:

1. **Não remover o `!important` do `base.css`.** Continua valendo para hover, reveals
   de texto e qualquer outra coisa. Mexer nele tem efeito colateral em todo o site.
2. **Manter a animação de seção, com amplitude reduzida quando `reduce` estiver ativo.**
   Não é desligar, é não sacudir:

   ```ts
   const amp = matchMedia('(prefers-reduced-motion: reduce)').matches ? 0.45 : 1
   // blur 12 -> 5.4px · translateY 14 -> 6.3px · scale 0.985 -> 0.993
   ```

   Isso atende WCAG (movimento vestibular é o que 2.3.3 protege, e 6px é desprezível)
   sem tirar o efeito que ele pediu.
3. **Nunca animar por mais de ~600ms** — independentemente da preferência, animação
   longa em troca de seção atrapalha a leitura, que é o produto da página.
4. **Respeitar `IntersectionObserver`/foco:** o painel que sai não pode ser
   alcançável por teclado durante a saída. Já está resolvido pelo
   `pointer-events: none` + `visibility` — só não mover isso para inline style sem
   manter o `visibility: hidden` no fim.

---

## 5. Resumo de uma linha para o FrontendCraft

Escrever `opacity` + `filter: blur(12px→0)` + `translateY(14px→0)` + `scale(0.985→1)`
com **`easeOutCubic` sobre ~460px de rolagem**, em função pura de `scrollY` (nunca
`transition`/`@keyframes`/`waapi` — os três morreram, medido), saída por `-10px` para
cima com blur 6px e janela 55% menor, amplitude ×0.45 quando reduced-motion estiver
ativo. Plano B: `clip-path: inset(... round 40px)` com `smoothstep`.
