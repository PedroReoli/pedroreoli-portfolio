# Radar: scroll que move UM frame por vez (pesquisa verificada)

Pesquisa de referência para as 3 reclamações do Pedro na transição Hero → Sessão 2.

## 1. O que está errado hoje (causa medida, não opinião)

| Sintoma do Pedro | Causa real no código |
|---|---|
| "está dando um feed de paralaxe, é como se as outras seções estivessem abaixo da Hero" | `VideoStage` é `position: fixed; inset: 0` + `object-fit: contain` + `transform: translateY(14%) scale(1.08)`. Um poster FIXO atrás de um documento que rola = **paralaxe por construção**: o busto não se move com o conteúdo, some embaixo dele, e as seções parecem deslizar por cima. |
| "a imagem está parada, não vejo vídeo" | `useScrollScene` mapeia a fatia do documento do clipe por `offsetTop` das seções; com `section-kicker` e paddings a fatia do clipe 01 é curta, então o frame satura em `holdAt` depois de pouca rolagem e o resto da seção fica congelado. |
| "cada scrollagem move um frame — não está assim" | `VideoStage` aplica **easing** (`EASE = 0.2` por rAF) no `currentTime`. Isso é animação suavizada, não scrub. Scrub real = frame **função pura** da posição de scroll: sem easing, sem drift, subir volta exatamente o mesmo frame. |

## 2. O padrão correto, nome e fonte

**Scrollytelling com "sticky slide + film strip" (o mesmo de Apple, Medium, NYT):** a seção vira um trilho alto; o quadro fica `position: sticky; top: 0` **dentro** do trilho; o scroll do trilho é dividido em N passos iguais (N = número de frames do clipe). Frame = `floor(progresso × N)`. Nada de `fixed` na viewport, nada de easing.

Confirmação de que scrub de vídeo pede passo discreto, não `currentTime` contínuo com ease: MDN, *HTMLMediaElement.currentTime* — mudar `currentTime` dispara um **seek**, que é caro e assíncrono; por isso o padrão de mercado é avançar frames discretos e trocar o `src`/desenhar no canvas, não perseguir um alvo com easing.

## 3. Alternativa moderna (checada nesse navegador, hoje)

Scroll-driven animations (Chrome 115+). Suporte confirmado por `CSS.supports` no navegador de teste:

```js
animation-timeline: scroll(root block)  // true
animation-timeline: view()              // true
animation-range: exit-crossing 0%       // true
```

Demo canônica: `scroll-driven-animations.style/demos/stacking-cards/css/` (Bramus). Padrão dela, lido do CSS computado:

```css
.card { position: sticky; top: 0; padding-top: calc(var(--index) * var(--card-top-offset)); }

@supports (animation-timeline: view()) {
  #cards { view-timeline-name: --cards; }
  .card__content {
    animation-name: scale;
    animation-timeline: --cards;
    animation-range: exit-crossing calc(var(--index0) / var(--numcards) * 100%)
                     exit-crossing calc(var(--index) / var(--numcards) * 100%);
    animation-fill-mode: forwards;
    animation-timing-function: linear;
  }
}
```

Isso resolve o mesmo problema **sem JS** e sem `onScroll` na main thread. Limitação honesta: `animation-timeline` não controla `currentTime` de `<video>`; para vídeo o passo discreto em JS (`steps()`/`floor`) continua necessário. Serve perfeitamente para as seções que só traduzem/escalam (cards, textos).

## 4. Regra que o time deve seguir

1. **Zero `position: fixed`** como fundo do documento. O quadro do filme mora dentro do sticky slide.
2. **Frame = função pura do scroll**: `frameAt(y)` sem estado acumulado, sem easing, sem `requestAnimationFrame` de perseguição.
3. **Passo discreto**: `STEP ≈ 100–120px` por frame; o clipe inteiro é alcançável no trilho da seção.
4. **Sem duplicata de rosto na mesma tela**: o overlay do Pedro sobre o palco (`video-stage__pedro-overlay`) sai de cena — o busto está no filme e no quadro da S2, não três vezes.
5. **`prefers-reduced-motion`**: congelar num frame médio em vez de seguir o scroll.
