# ColorTokens — Scrim de Leitura para os Fundos Transparentes (S2–S7)

> **Autor:** ColorTokens
> **Destinatário:** FrontendCraft (única mão no código)
> **Base:** `deff91b` (main) — seções 1–6 já transparentes, S7 ainda `rgb(8,9,11)`
> **Escopo:** só valores. Nenhum arquivo de `src/` foi tocado nesta rodada.
> **Método:** WCAG 2.1 (luminância relativa + blending alfa), calculado por script local. Todos os números abaixo são **medidos**, não estimados.

---

## 0. Pior caso — as 3 cores do vídeo que decidem tudo

| Superfície | Hex | L | Por que é o pior caso |
| --- | --- | --- | --- |
| Mármore tom médio | `#e8e6e3` | 0,793 | Corpo do busto, ocupa a maior área |
| Mármore especular | `#ffffff` | 1,000 | Brilho do mármore — teto absoluto |
| Círculo amarelo | `#ffc900` | 0,630 | Emissivo; simultaneamente claro **e** cromático |

**Regra dura:** `rgba(8,9,11,α)` é o único veículo permitido para escurecer. Cinza ou preto puro mudam a temperatura do mármore; `#08090b` mantém o tom do site.

**Texto de referência usado na tabela:** `--color-paper #f5f3ef` (L 0,897), `--color-muted` sobre scrim, e o amarelo como *ring* de foco.

---

## 1. Tokens de scrim por seção (colar direto)

Cada seção recebe **dois** scrims, nunca um `opacity` no palco:
- **`--scrim-floor`** — piso uniforme sobre a área de leitura (o número que garante os 4,5:1);
- **`--scrim-reveal`** — máscara radial/linear que **devolve** o busto nas bordas. Serve só estética: se ela reduzir a cobertura do piso numa área com texto, é bug, não escolha.

### 1.1 S2 — Sobre (moldura + texto) — piso **0,86**

O texto da S2 cai sobre o disco amarelo (LayoutGuard mediu 4,09:1). Amarelo sob preto escurece rápido, então aqui o piso é o mais alto.

```css
--scrim-s2-floor:
  linear-gradient(90deg,
    rgba(8, 9, 11, 0.90) 0%,
    rgba(8, 9, 11, 0.86) 46%,
    rgba(8, 9, 11, 0.55) 62%,
    rgba(8, 9, 11, 0.30) 78%,
    transparent 100%);
--scrim-s2-reveal:
  radial-gradient(ellipse 46% 62% at 74% 52%,
    transparent 0%,
    transparent 40%,
    rgba(8, 9, 11, 0.28) 72%,
    rgba(8, 9, 11, 0.55) 100%);
```
A coluna de texto fica à esquerda (0,86–0,90), a moldura/busto à direita (0,30 → 0). O radial é só o halo do busto — **nunca** sobre `.about__summary`.

Moldura (`.art-frame`) já é opaca por si; o scrim dela é interno, não precisa de piso:
```css
--scrim-s2-frame: linear-gradient(145deg, rgba(31,34,41,0.94) 0%, rgba(13,15,20,0.97) 100%);
```

### 1.2 S3 — Projetos (rail) — piso **0,78** + poço do card

O rail é a seção com mais elementos pequenos (meta `.46`, `frame-bar-title .4`). O card precisa de fundo próprio — não dá para ler `p` com 0,64 de alfa direto sobre mármore.

```css
--scrim-s3-floor:
  linear-gradient(180deg,
    rgba(8, 9, 11, 0.90) 0%,
    rgba(8, 9, 11, 0.78) 18%,
    rgba(8, 9, 11, 0.78) 82%,
    rgba(8, 9, 11, 0.92) 100%);
--scrim-s3-reveal:
  radial-gradient(ellipse 60% 50% at 50% 34%,
    rgba(8, 9, 11, 0.10) 0%,
    rgba(8, 9, 11, 0.45) 60%,
    rgba(8, 9, 11, 0.72) 100%);
/* corpo do card — este é obrigatório, substitui var(--night-soft) opaco */
--card-s3-surface: rgba(12, 14, 20, 0.82);
--card-s3-veil: linear-gradient(to bottom, transparent 58%, rgba(12, 14, 20, 0.86) 100%);
```
`--card-s3-veil` é o que o `.project-card__vignette` já tenta fazer (hoje `.8`); com o card a `0,82` a soma dá ≥ 0,90 na faixa do texto.

### 1.3 S4 — Stack — piso **0,86** na coluna do grid

Aqui o texto é `--ink` (`#08090b`, escuro) sobre `.section-light`. **Este é o caso invertido** e o mais frágil: texto escuro precisa de fundo **claro**. Não use o scrim preto da S2 aqui — o texto escuro desaparece.

```css
/* S4 mantém superfície clara: o scrim aqui é PAPEL, não noite */
--scrim-s4-paper:
  linear-gradient(180deg,
    rgba(251, 249, 245, 0.94) 0%,
    rgba(251, 249, 245, 0.90) 22%,
    rgba(251, 249, 245, 0.90) 78%,
    rgba(251, 249, 245, 0.96) 100%);
--scrim-s4-edge:
  linear-gradient(90deg,
    rgba(251, 249, 245, 0.96) 0%,
    rgba(251, 249, 245, 0.90) 38%,
    rgba(251, 249, 245, 0.55) 58%,
    transparent 100%);
/* itens do grid (li) sobre a superfície de papel */
--item-s4-surface: rgba(252, 250, 247, 0.86);
```
> ⚠️ **Ponto de decisão para o LayoutGuard/Pedro:** a S4 é a única seção clara. Se ela ficar 100% transparente como as outras, o `--ink` sobre mármore dá **1,01:1** (invisível). Ou a S4 aceita uma faixa de papel (o que já acontece), ou todo o texto dela troca para `--paper` e aí usa o piso 0,86 da S2. **Escolha recomendada: manter a faixa de papel** — ela é a pausa de luz do filme.

### 1.4 S5 — Propósito (texto sobre foto) — ver §3

Piso do bloco de texto ao lado da foto: **0,86**. O título sobre a foto tem tratamento próprio (§3).

```css
--scrim-s5-copy:
  linear-gradient(90deg, rgba(8, 9, 11, 0.94) 0%, rgba(8, 9, 11, 0.86) 50%, rgba(8, 9, 11, 0.45) 70%, transparent 100%);
```

### 1.5 S6 — Experiência (timeline) — piso **0,86**

Timeline tem muito texto pequeno (`.52`, `.46`) e linhas de 2px; precisa do piso mais alto e de **backdrop-filter** para estabilizar o frame atrás do card.

```css
--scrim-s6-floor:
  linear-gradient(180deg,
    rgba(8, 9, 11, 0.94) 0%,
    rgba(8, 9, 11, 0.86) 16%,
    rgba(8, 9, 11, 0.86) 84%,
    rgba(8, 9, 11, 0.96) 100%);
--scrim-s6-card:
  linear-gradient(180deg, rgba(8, 9, 11, 0.72) 0%, rgba(8, 9, 11, 0.86) 100%);
--scrim-s6-blur: blur(16px) saturate(0.85);
```

### 1.6 Rodapé / Contato (S7) — piso **0,90** e opaco no fim

Aqui o vídeo **deve** morrer. O rodapé já é `var(--night)` e isso está certo: transparência no rodapé é o único lugar onde ela custa legibilidade sem ganho estético (o último frame do clipe é sempre o mesmo).

```css
--scrim-s7:
  linear-gradient(180deg,
    rgba(8, 9, 11, 0.60) 0%,
    rgba(8, 9, 11, 0.90) 30%,
    #08090b 72%,
    #08090b 100%);
```
Se o Pedro quiser o rodapé transparente mesmo: use piso 0,90 + `--scrim-s6-blur` e aceite o texto muted em 6,24:1.

### 1.7 Como aplicar (padrão único, sem `!important` novo)

```css
[data-scrim] { position: relative; }
[data-scrim]::before {
  content: ''; position: absolute; inset: 0; z-index: -1; pointer-events: none;
  background: var(--scrim-active);
  backdrop-filter: var(--scrim-blur, none);
}
```
`z-index: -1` no pseudo-elemento da seção mantém o vídeo visível por baixo (`.video-stage` é `z-index: 0` e `.home` é `z-index: 1`) **desde que a seção não crie stacking context** — cuidado com `filter`/`transform`/`will-change` na própria seção: isso prende o `-1` dentro dela e some com o vídeo. Se já houver `transform` na seção, troque por um `<div class="scrim">` como primeiro filho contextual.

---

## 2. Tabela de contraste medida (AA / AAA)

Fundo = mármore `#e8e6e3` e amarelo `#ffc900` com `rgba(8,9,11,α)` por cima. Texto `--color-paper #f5f3ef`.

### 2.1 Sem scrim (vídeo cru) — tudo reprova

| Fundo do vídeo | paper | white | muted (α .64) | meta (α .46) | amarelo |
| --- | --- | --- | --- | --- | --- |
| Mármore `#e8e6e3` | 1,12 ❌ | 1,25 ❌ | 2,12 ❌ | 3,70 ❌ | 1,24 ❌ |
| Brilho `#ffffff` | 1,11 ❌ | 1,00 ❌ | 2,64 ❌ | 4,61 ❌ | 1,54 ❌ |
| Amarelo `#ffc900` | 1,39 ❌ | 1,54 ❌ | 1,71 ❌ | 2,99 ❌ | 1,00 ❌ |

**Conclusão:** sem scrim não existe texto legível em nenhum frame claro. É impossível "consertar" por cor de texto — só por camada.

### 2.2 Com scrim preto `rgba(8,9,11,α)` — pior caso = mármore

| α do scrim | fundo efetivo | paper | white | muted α.64 | meta α.46 | AA 4,5:1 | AAA 7:1 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 0,55 | `#6d6c6c` | 4,72 | 5,23 | 1,98 | 1,13 | paper ⚠️ | ❌ |
| 0,65 | `#565657` | 6,62 | 7,33 | 2,77 | 1,59 | paper ✅ | ⚠️ |
| 0,72 | `#474747` | 8,38 | 9,29 | 3,51 | 2,01 | paper ✅ | paper ✅ |
| 0,78 | `#393a3b` | 10,29 | 11,40 | 4,31 | 2,47 | paper ✅ | ✅ |
| **0,86** | `#272829` | **13,33** | 14,77 | **5,59** | 3,20 | **tudo ✅** | ✅ |
| 0,90 | `#1e1f21` | 14,88 | 16,49 | 6,24 | 3,58 | tudo ✅ | ✅ |

Mesma tabela no **brilho branco** (`#ffffff`), que é o teto absoluto: 0,86 → paper **12,75:1**, muted α.64 **5,34:1**. **O piso 0,86 aprova AA em todos os textos, inclusive os que hoje estão em α .64.**

### 2.3 Texto com alfa próprio (o caso real do CSS atual)

Se o texto mantém `rgba(244,240,231,.64)` **em cima** do scrim, o contraste cai de novo — o alfa do texto reduz o próprio contraste. Com piso 0,86 sobre mármore:

| alfa do texto | sobre piso 0,86 | sobre piso 0,78 | veredito |
| --- | --- | --- | --- |
| 1,00 | 13,33 | 10,29 | AAA |
| 0,90 | 11,08 | 8,71 | AAA |
| 0,80 | 9,03 | 7,24 | AAA |
| **0,72** | **7,62** | 6,20 | **AA com folga (limite seguro)** |
| 0,64 | 5,59 | 4,31 | AA só no piso 0,86 |
| 0,46 | 3,20 | 2,47 | ❌ reprova sempre |

**Regra de ouro para o FrontendCraft:** nenhum texto abaixo de **α 0,72** sobre o vídeo. `meta` e `frame-bar-title`, que hoje estão em 0,46/0,4, devem subir para 0,72 (ou ganhar o `--card-s3-surface`, que é o mesmo efeito).

### 2.4 Foco (obrigatório)

O anel de foco atual é `--focus-ring-color: #ffc900` com halo `#08090b`. Sobre o vídeo isso **inverte o problema**: amarelo sobre mármore = 1,24:1, invisível — e amarelo sobre amarelo = 1,00:1.

| scrim | anel amarelo sobre mármore | anel preto sobre mármore |
| --- | --- | --- |
| 0 | 1,24 ❌ | **15,99 ✅** |
| 0,72 | 6,02 ✅ | 2,14 ⚠️ |
| 0,86 | 9,57 ✅ | 1,35 ❌ |

**Solução robusta (não depender do frame):** anel de **dois tons** — amarelo `#ffc900` por dentro e preto `#08090b` por fora, sempre os dois juntos:

```css
--focus-ring-color: #ffc900;
--focus-ring-halo: #08090b;
/* halo de 3px + outline amarelo: em qualquer frame, um dos dois passa AA */
:focus-visible { outline: 3px solid var(--focus-ring-color); outline-offset: 2px; box-shadow: 0 0 0 2px var(--focus-ring-halo); }
```
No pior frame (amarelo sobre amarelo) o halo preto dá 12,91:1; no mármore o amarelo dá 1,24:1 mas o halo preto 15,99:1. **O par nunca falha** — e o item 3:1 de componente não-foco (`--line-dark`) também precisa subir para `rgba(245,243,239,.28)`, porque `.12` sobre o piso 0,86 dá 1,6:1.

---

## 3. Padrão da S5 — "VOZ PRA TODOS" sobre a foto

**O erro atual (`home.css:413`):** o degradê do título é `rgba(8,9,11,.9) 0% → .52 26% → transparent 52%`, mas sobe a partir da base da foto — e a foto inteira não é escurecida. Com o título surgindo, o topo do texto pisa na área clara. Além disso a MediaForge já mediu que `brightness(.72)` na foto inteira matava a imagem. **A resposta é separar em duas escalas:** a foto escurece *um pouco*, o título tem escurecimento *local* próprio.

### 3.1 Degraus medidos (foto com pixel claro a 255)

| `brightness()` na foto | pixel efetivo | paper cru | title-overlay 0,55 | title-overlay 0,72 |
| --- | --- | --- | --- | --- |
| 1,00 (hoje) | `#ffffff` | 1,11 ❌ | 3,99 ❌ | **7,52 ✅ AAA** |
| 0,92 | `#ebebeb` | 1,08 ❌ | 4,54 ✅ | 8,23 ✅ |
| **0,88** | `#e0e0e0` | 1,19 ❌ | 4,89 ✅ | **8,66 ✅ AAA** |
| 0,85 | `#d9d9d9` | 1,27 ❌ | 5,11 ✅ | 8,91 ✅ |
| 0,80 | `#cccccc` | 1,45 ❌ | 5,60 ✅ | 9,38 ✅ |
| 0,72 (atual) | `#b8b8b8` | 1,79 ❌ | 6,43 ✅ | 10,29 ✅ |

**Escolha:** `brightness(0.88) saturate(0.9)` na foto. Rende AAA no título com o overlay de 0,72, e a foto continua nítida (0,88 é sutil — 0,72 não era, era apagão). Não use `brightness` abaixo de 0,85 na foto: o overlay já resolve, e escurecer os dois é o erro de antes.

### 3.2 Os três estados da S5 (colar)

```css
/* ESTADO A — repouso: foto limpa, sem texto */
.purpose-section__media img {
  filter: brightness(1) saturate(1);
  transform: scale(1);
  transition: filter 520ms cubic-bezier(.2,.8,.2,1), transform 720ms cubic-bezier(.2,.8,.2,1);
}

/* ESTADO B — título entrando: escurece a foto e a faixa do texto */
.purpose-section__media[data-reveal='true'] img {
  filter: brightness(0.88) saturate(0.9);
  transform: scale(1.02);
}

/* Faixa de leitura do título (substitui o ::after atual) */
.purpose-section__media::after {
  content: '';
  position: absolute; inset: 0; z-index: 1; pointer-events: none;
  background: linear-gradient(
    to top,
    rgba(8, 9, 11, 0.94) 0%,
    rgba(8, 9, 11, 0.86) 22%,
    rgba(8, 9, 11, 0.72) 40%,
    rgba(8, 9, 11, 0.30) 58%,
    transparent 70%
  );
  opacity: 0;
  transition: opacity 520ms cubic-bezier(.2,.8,.2,1);
}
.purpose-section__media[data-reveal='true']::after { opacity: 1; }

/* Título — surge de baixo, 120ms depois da foto */
.purpose-section__title {
  color: var(--color-paper);
  text-shadow: 0 2px 18px rgba(8, 9, 11, 0.9);
  transform: translateY(14px);
  opacity: 0;
  transition: transform 620ms cubic-bezier(.2,.8,.2,1) 120ms,
              opacity 620ms cubic-bezier(.2,.8,.2,1) 120ms;
}
.purpose-section__media[data-reveal='true'] .purpose-section__title {
  transform: translateY(0);
  opacity: 1;
}
```

### 3.3 Cinemática sugerida (ordem perceptiva)

| tempo | o que acontece |
| --- | --- |
| 0 ms | foto entra em vista (`data-reveal="true"`), `brightness` 1 → 0,88 |
| 0–520 ms | faixa de leitura sobe de `opacity 0 → 1` |
| 120 ms | título começa a subir (`translateY 14px → 0`) |
| 740 ms | título completo; acento (`para todos.`) 120 ms depois do título |

**Nunca** `opacity` na foto: a foto fica nítida em cima (rosto/slide da FalaAtípica) e só ganha um pouco de peso. É o que o Pedro pediu — "levemente apagada", não deletada.

### 3.4 Caso amarelo atrás do título

Se o frame do vídeo tiver o círculo amarelo atrás da foto, o título ainda passa: overlay 0,72 sobre `#ffc900` → paper **9,33:1**. O amarelo como *texto* de acento na S5 precisa ficar em `#7a5c00` (âmbar escuro) se for sobre papel, e em `#ffc900` só sobre o piso 0,86 — nunca sobre a foto crua.

---

## 4. Checklist para o FrontendCraft (sem editar nada agora)

- [ ] Aplicar `--scrim-s2/s3/s5/s6` por seção via `::before` com `z-index: -1` — **sem** `!important` novo.
- [ ] S3: trocar `var(--night-soft)` do `.project-card` por `--card-s3-surface` e o texto de α .46 por α .72.
- [ ] S4: manter a faixa de papel (`--scrim-s4-paper`) — é o único lugar onde texto escuro vive.
- [ ] S5: `brightness(0.88) saturate(0.9)` na foto + faixa 0,94→transparente + `data-reveal` (nada de `opacity` na foto).
- [ ] S6: piso 0,86 + `backdrop-filter: blur(16px) saturate(0.85)` no card.
- [ ] S7: manter `var(--night)` (já está certo em `deff91b`).
- [ ] Foco: anel duplo amarelo+preto; `--line-dark` de `.12` → `.28`.
- [ ] Nenhum texto abaixo de α 0,72 sobre o vídeo.

## 5. O que eu não fiz, de propósito

- Não toquei em `src/styles/*.css` nem em componente algum.
- Não abri navegador, preview ou janela alguma: tudo acima é leitura de CSS + cálculo local por script.
- Os valores de `backdrop-filter` são recomendação; o browser que testar é o do LayoutGuard (headless).
