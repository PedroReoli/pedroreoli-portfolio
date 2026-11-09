# VERIFICAÇÃO — animações de seção em `91224cc` (UI-Scout)

Verifiquei a implementação do FrontendCraft no build, com
`prefers-reduced-motion: reduce` ativo (a máquina do Pedro). A receita foi aplicada
como especificada, as duas correções dele sobre o meu doc estão **certas**, e
encontrei **um defeito real** — causado por uma recomendação minha.

---

## 1. Correção: ele está certo sobre o `var()`

`backdrop-filter: var(--glass-blur)` **resolve normalmente**. Medi:

| Teste | Resultado |
|---|---|
| `backdrop-filter: var(--glass-blur)` (token = `blur(16px) saturate(1.3)`) | `blur(16px) saturate(1.3)` |
| `backdrop-filter: blur(16px) saturate(1.3)` (literal) | `blur(16px) saturate(1.3)` |

Idênticos. O `none` que eu e o MediaForge medimos é artefato do headless: elemento não
composto reporta `none`. **O token único é seguro** e deve ficar.

Sobre o granulato: ele baixou de 2–3% para `soft-light` + `220px` porque em 3% virava
lixa. Concordo com o ajuste — e o número dele (blend, não opacidade) é o certo para
vidro sobre **imagem**, que é o caso aqui. Não tenho um número melhor medido.

---

## 2. Defeito real: em `reduce`, a entrada ficou com **207px** em vez de 460px

`FilmSlide.tsx:79-82`:

```ts
const exitScale = reduce ? 0.45 : 1
const ENTER_PX = 460 * exitScale          // ← 460 * 0.45 = 207
const EXIT_PX = Math.round(ENTER_PX * 0.55)
```

A intenção era reduzir a **amplitude** (blur/deslocamento) sob reduced-motion — o que
eu recomendei. Mas o `exitScale` foi aplicado na **duração**, não na amplitude. Na
máquina do Pedro (`reduce` **sempre** ativo), a entrada inteira acontece em 207px:

| Rolagem dentro da fatia | `opacity` inline | `blur` |
|---|---|---|
| 0px | 0.000 | 14.00px |
| 40 | 0.098 | 12.63px |
| 80 | 0.333 | 9.34px |
| 120 | 0.619 | 5.34px |
| 160 | 0.869 | 1.84px |
| **200** | **0.997** | **0.05px** |
| 240–460 | 1.000 | none |

Confere com a aritmética (`smoothstep` sobre `ENTER_PX = 207`). Consequência: **a
animação termina em 207px e o resto da seção (253px) é imagem parada.** É exatamente o
"não está fluido" que o Pedro vem reclamando desde o começo, só que agora com blur.

Agravante: os valores aparecem em **degraus** na leitura (0.098 → 0.333 → 0.869 → 1).
Isso não é o código — o handler está certo e é contínuo; é a escrita em passos de
scroll do meu probe. **Não reportar como bug.**

### Correção recomendada (2 linhas)

```ts
// A DURAÇÃO não muda com reduced-motion. Só a AMPLITUDE.
const ENTER_PX = 460
const EXIT_PX = Math.round(ENTER_PX * 0.55)
const amp = reduce ? 0.45 : 1
// e então: blurIn = 14 * amp * (1 - entering); rise = 18 * amp * (...)
```

Ou seja: `exitScale` deve multiplicar **blur e translateY**, nunca `ENTER_PX`.
Com isso a entrada volta a durar ~460px (≈0,45s de gesto) com blur máximo de 6,3px
em `reduce` — que é o que eu quis dizer e o que a acessibilidade pede.

---

## 3. O que está correto e confirmado

- **Sobrevive ao reduced-motion**: estilo inline escrito a cada scroll. Confirmado.
- **Reversível**: é função pura de `y`, sem estado acumulado. Subir refaz o caminho.
- **Saída não espelha a entrada**: `blur` 6px, `-12px` para cima, janela 55%, e
  `zIndex` 1 para quem sai / 2 para quem entra. Correto.
- **Um painel por vez**: medi 10 offsets dentro da fatia 2 — nunca dois com
  `opacity > 0.02`. O fantasma que ele viu e corrigiu não voltou.
- **Conteúdo escalonado**: `kidOpacities` [1,0] → [1,1] na ordem de leitura. Correto.
- **`var(--glass-blur)` nos 6 cards**. Correto (seção 1).

---

## 4. Como medir isso de forma confiável (para o próximo que for verificar)

O `getComputedStyle` de `opacity`/`filter`/`transform` **fica atrás** do valor inline
escrito no mesmo frame. Provei: no mesmo instante, `getComputedStyle().opacity` = 1
enquanto `el.style.opacity` = `"0.333"`. Quem ler por computed style vai concluir
"não anima" ou "anima em degraus" — as duas conclusões erradas.

**Sempre ler `el.style.<prop>`** para o valor da animação dirigida por scroll, e só
usar computed style para conferir se **outra** regra está brigando.
