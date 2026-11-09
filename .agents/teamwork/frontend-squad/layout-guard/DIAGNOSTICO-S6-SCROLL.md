# DIAGNÓSTICO — S6 prende o scroll, busto só na hero, fundo #060a0e

Auditor: LayoutGuard · headless (`chrome --headless=new` + CDP) · HEAD `0184594` · preview :4178
Nada editado. Screenshots: `diag-s6/`.

Pedro relatou três coisas. Duas são de código (**no meu escopo**) e uma é de asset (MediaForge). Abaixo, causa medida para cada uma.

---

## 1. [BLOQUEIA] "Chego na Experiência e fico preso, não consigo voltar para cima"

**Reproduzido, e é exatamente isso.** Com motion emulando o Windows do Pedro (`reduce`):

| teste | scrollY antes | depois de wheel-up | resultado |
|---|---|---|---|
| meio da página (controle) | 2000 | 1700 | ok — o wheel funciona |
| slot da S6 (`y=4860`) | 4860 | **4860** | **travado nas duas direções** |
| fim da página (`y=5400`) | 5400 | **5400** | **travado** |
| wheel sobre o header (`y=40`) | 5400 | **5400** | travado igual |
| mobile 390×844, 5 swipes | 5064 | **5064** | **travado** |

Também confirmei que `window.scrollTo(0, 5000)` funciona — ou seja, **não** é bloqueio de JS, é a rolagem nativa sendo consumida por um container.

### Causa (isolada por bisseção)

`src/styles/film.css:182-188`:

```css
.film-panel > #experiencia {
  justify-content: flex-start;
  overflow-y: auto;        /* ← cria um container de rolagem interno */
  overflow-x: hidden;
  overscroll-behavior: contain;
}
```

Medido no `#experiencia`: `overflow: hidden auto`, `scrollHeight 2456`, `clientHeight 900`, `overScrollBehaviorY: contain`, e **conteúdo mais alto que a tela** (o shell mede 2362px; o rodapé embutido fica em `top 1921`).

Quando o ponteiro está sobre a seção, o wheel cai nesse container interno. Ele está no topo (`scrollTop 0`), então não tem para onde rolar para cima — e `overscroll-behavior: contain` **impede** que o gesto suba para a página. Resultado: a roda morre ali. Igual no toque (mobile), porque o `contain` também trava o encadeamento de scroll.

Bisseção que prova: com `.film-panel > #experiencia { overflow: visible }` injetado, o mesmo wheel-up faz `4860 → 4560`. Com `pointer-events: none` na seção, idem. Nenhum outro ancestral desbloqueia (testei `timeline-v`, `timeline-v__item`, `.shell`, `.film-panel`, `.film-content` — todos continuam travados).

### Por que ele existe

O container foi criado para corrigir "o topo da S6 cortado" (`BUG 5→6`): a timeline é mais alta que a viewport e o `justify-content: center` cortava os dois lados. A solução escolheu "rola dentro do painel" — que funciona para ver o resto da S6, mas cria a armadilha.

### Correção proposta

**O painel da fita é a tela inteira. Seção não pode ser um container de rolagem.** Duas opções; recomendo a 1:

1. **Fatiar a S6 em 2 painéis** (2 slides da fita para a Experiência: timeline 1/2 e 2/2 + contato), como as outras seções já fazem ao ter mais conteúdo que uma tela. Isso preserva "uma tela = um frame" e elimina qualquer rolagem interna. Custo: +1 slide e +1 clipe (ou repetir o frame do 06).
2. **Manter um scroll interno, mas sem travar o encadeamento**: `overscroll-behavior: auto` (não `contain`). Com isso, quando o container chega no topo, o gesto continua para a página. **Ressalva medida:** isso não resolve o caso de o usuário estar com `scrollTop > 0` no container — a primeira rodada de wheel consome o scroll interno antes de sair (comportamento esperado e não travado, mas ainda "arrastado").

Em ambos os casos, remover `overflow-y: auto` do painel da S6 e deixar o conteúdo caber (ou ser fatiado). Não é aceitável a página terminar presa.

**Nota de padrão:** nenhum `.film-panel` pode ter `overflow` diferente de `visible`. Vale como regra fixa do componente — é isso que impede a regressão voltar.

---

## 2. "Não há outras imagens do busto se mexendo conforme passam as seções"

Confirmado no código: **existe um clipe por seção** (`sceneClips.json`: 6 clipes para 6 painéis), mas só a hero mostra o busto com movimento perceptível. Motivo: nas seções 2–6 o clipe ocupa a tela inteira atrás de painéis com muito conteúdo, e o busto centralizado fica **exatamente atrás da coluna de texto** (na S6, atrás da timeline — ver `diag-s6/s6-antes-1440x900.png`).

Ou seja: o busto **está** se mexendo, mas não é percebido porque não existe área livre. É composição, não falta de asset.

**O que eu peço ao código (FrontendCraft):** abrir uma faixa de respiro em cada seção onde o busto apareça — nas seções de conteúdo, o texto ocupa no máximo ~55% da largura e o lado oposto fica limpo. Isso é o mesmo princípio que já valia na S3.

**E o que Pedro pediu ao MediaForge** ("imagens complementares para animações ao redor da hero") é compatível: elementos de cena no **entorno** (partículas, orbitais, marcas de mármore) preenchem a área livre sem competir com o rosto. Do meu lado, o contrato é: **nenhum componente novo** — esses assets entram como `poster`/frames do mesmo `FilmSlide`, não como uma segunda camada de fundo.

---

## 3. Fundo `#060a0e`

Estado atual: `base.css:2` → `--color-bg: #050609`, e o palco em `film.css:43` usa o mesmo token. A troca é **um valor**, não uma refatoração: `--color-bg: #060a0e` e `--night` acompanha automaticamente (é `var(--color-bg)`).

Atenção de contraste (medido, não estimado): `#060a0e` é mais claro que `#050609`, então as razões caem um pouco mas continuam folgadas:

| par | sobre `#050609` | sobre `#060a0e` | alvo |
|---|---|---|---|
| paper `#f5f3ef` (texto) | 18.28:1 | **17.92:1** | AAA |
| amarelo `#ffc900` (foco/realce) | 13.13:1 | **12.87:1** | AAA |
| mutado `#7e7b74` | 4.80:1 | **4.70:1** | AA (4.5) — passa, mas é o mais apertado |

Nenhum ajuste de scrim é necessário. Só uma observação: o mutado `#7e7b74` fica a 0.20 do piso AA — se o fundo clarear mais uma vez, ele reprova. Vale trocar por um token um pouco mais claro agora.

---

## 4. Nota de prioridade (o que eu bloquearia)

| # | Item | Dono | Sev. |
|---|---|---|---|
| 1 | S6 trava o scroll nas duas direções (desktop e mobile) | FrontendCraft | **BLOQUEIA** |
| 2 | Nenhum `.film-panel` com `overflow != visible` | FrontendCraft | regra fixa |
| 3 | Faixa de respiro para o busto aparecer em S2–S6 | FrontendCraft | alta |
| 4 | Assets complementares do entorno (sem novo componente) | MediaForge | média |
| 5 | Fundo `#060a0e` | FrontendCraft | baixa (1 linha, AA ok) |

O item 1 é o que faz a página parecer "quebrada" para quem usa. Não deve esperar os assets.
