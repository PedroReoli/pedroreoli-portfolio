# REVISÃO INDEPENDENTE — faixas azul/ciano laterais na hero

Auditor: LayoutGuard · **read-only** (nenhum arquivo de código, CSS, content ou asset editado)
Repo: `F:\Projetos\Pessoais\portfolios\pedroreoli-portfolio` · branch `feat/trajetoria-previa` · HEAD `04b795d`
Captura de referência: `image.png` (attachment `c7436ead-…`), 1886×914
Método: Chrome `--headless=new` + CDP sobre `dist/` servido em `:4577` (nenhuma janela na tela do Pedro). Screenshots em `diag-cyan/`.

---

## 1. Veredito curto

**A faixa **não** está no asset. É o fundo do site (`--color-bg: #2596be`) aparecendo nas sobras do letterbox.** Medido: os pixels da faixa são exatamente `rgb(37,150,190)` = `#2596be`, e o poster do hero tem **0 pixels** dessa cor.

O FrontendCraft **já aplicou** `object-fit: cover` (está no working tree e no `dist` servido) e as faixas somem. **Porém** esse caminho introduz um custo que precisa ser decidido com medição, não com otimismo: em 1886×914 ele corta **147px** de altura e o topo do círculo/assunto.

Recomendação técnica: **manter `contain` e pintar as sobras com a cor real da borda do vídeo** (`#05070e`) — as faixas desaparecem, **crop zero**, enquadramento aprovado intacto, e a legibilidade melhora muito (`#2596be` reprova AA para texto claro).

---

## 2. Discriminação: azul no asset **vs** camada do site

### 2.1 Captura de Pedro — amostragem de pixel (decode PNG próprio)

| (x, y) | RGB | hex |
|---|---|---|
| 5, 5 | 37,150,190 | **`#2596be`** |
| 64, 400 | 37,150,190 | `#2596be` |
| 120, 400 | 37,150,190 | `#2596be` |
| **128, 400** | 37,150,190 | `#2596be` ← última coluna azul |
| **132, 400** | 5,9,14 | `#05090e` ← primeira coluna do vídeo |
| 1750, 400 | 37,150,190 | `#2596be` ← primeira coluna azul da direita |
| 1880, 400 | 37,150,190 | `#2596be` |

Borda azul: `x 0–130` e `x 1750–1885`. Faixa de **cor única, sem gradiente, sem ruído** — assinatura de cor chapada de CSS, não de video/composição.

### 2.2 O asset tem azul? **Não.**

`public/media/backdrop/01-hero-poster.png` (1920×1080), varredura por `sharp` (não é palpite):

- pixels `#2596be` (±12) nas colunas laterais de 12%: **0 à esquerda, 0 à direita**;
- nas 20px extremas de cada borda: **0 de 3600** amostras;
- cor da borda esquerda em y=540: **`4,7,14`**; direita: **`4,7,14`** (praticamente preto).

### 2.3 De onde vem a cor

| Fonte | Evidência |
|---|---|
| `src/styles/base.css:2` | `--color-bg: #2596be;` |
| `src/styles/film.css:43` | `.film-slide__sticky { background: var(--color-bg, #2596be) }` |
| `content/interfaceContent.json:17,27,37,42,47` | `"background": "#2596be"` em 5 cenas |
| `index.html:6` | `<meta name="theme-color" content="#2596be" />` |
| `src/test/contracts.test.ts:205-209` | teste **fixa** `#2596be` como cor canônica |

**Computed style ao vivo (1886×914):** `html` `rgb(37,150,190)`, `body` `rgb(37,150,190)`, `.film-slide__sticky` `rgb(37,150,190)`; `.home`, `.film-track`, `.film-slide`, `.app-shell`, `#root` = `rgba(0,0,0,0)`. Ou seja, a cor está no fundo do documento e no container do quadro, e **aparece** onde a mídia não cobre.

**Não há CSS de debug**: `grep` por `outline: 1px solid`, `background: blue|cyan`, `data-debug`, `show-grid` → vazio.

### 2.4 Aritmética fecha com a captura

`contain` em 1886×914 com fonte 1920×1080 → escala 0,8464 → imagem desenhada **1624,9×914** → sobra lateral **(1886−1624,9)/2 = 130,6px** por lado. A captura mostra azul até x=130 e a partir de x=1750 → **exatamente** isso. Nada de zoom, transform ou margem: é o letterbox do `contain`, pintado com `--color-bg`.

### 2.5 Commit que introduziu a cor

`c3d6e27 style(tema): define #2596be como cor de fundo canonica da aplicacao` — trocou `--color-bg` de `#050609` (ou `#182033` nas cenas) para `#2596be`, e **adicionou um teste que trava o valor**. Antes disso o fundo era escuro e as sobras eram invisíveis.

---

## 3. Estado atual do código (mid-review, importante para não duplicar)

`src/styles/film.css:76-86` **já** mudou para `object-fit: cover; object-position: center bottom;` com comentário dizendo que resolve as faixas. O `dist` servido também tem `cover`. Confirmado ao vivo: **todos** os 11 elementos de mídia computam `cover` com `pos 50% 100%`, e `@media (max-width: 768px)` muda para `50% 0%`.

Então as faixas **desaparecem** com o código atual. O problema é **o custo**.

---

## 4. Custo medido do `cover` (o risco real)

| viewport | `cover` corta | `contain` barras laterais |
|---|---|---|
| **1886×914 (a captura)** | **vertical 147px (13,8%)** | 130px por lado |
| 1440×900 | vertical 0px, **horizontal 160px** | 0 |
| 1920×1080 (16:9 exato) | 0 | 0 |
| 768×1024 | **horizontal 1052px** | 0 |
| 390×844 | **horizontal 1110px** | 0 |

Em 1886×914 com `object-position: 50% 100%` (bottom), os 147px descartados saem **de cima**: a escala sobe de 0,846 para 0,982 e o **topo do assunto** (bbox na fonte começa em y=60) perde **~90px na fonte**. Visualmente (comparar `diag-cyan/fresh-1886x914.png` com `diag-cyan/capture-width-1886x914.png`): o busto fica **maior** e o círculo amarelo é **cortado no topo** — não é o enquadramento aprovado. Em 390×844 (posição `0%`, topo) o corte horizontal de 1110px come o círculo nas laterais (`diag-cyan/atual-390x844.png`).

**Isto é o ponto que precisa de decisão, não de suposição:** trocar `#2596be` por `cover` resolve a cor e quebra “enquadramento/círculo fixos”, que é um requisito aprovado do Pedro.

---

## 5. Opção recomendada, com a mesma evidência

**Manter `contain` e pintar as sobras com a cor real da borda do vídeo (`#05070e`).**

Por quê, medido:

| critério | `contain` + fundo `#05070e` | `cover` |
|---|---|---|
| faixas visíveis | **não** (cor idêntica à borda: `4,7,14` vs `5,7,14` → ΔE imperceptível) | não |
| crop | **0px, em qualquer viewport** | 147px vertical @1886×914; 1052–1110px horizontal em mobile |
| círculo/enquadramento aprovado | **intacto** | cortado no topo (desktop) e nas laterais (mobile) |
| contraste do texto | paper `#f5f3ef` → **18,16:1** (AAA) | igual |
| contraste do amarelo | `#ffc900` → **13,04:1** | igual |

Comparativo visual: `diag-cyan/opcaoD-contain-bg-do-video.png` — **sem faixas, sem corte, composição idêntica à de referência.**

### Contraste do `#2596be` (independente das faixas)

| par | ratio | veredito |
|---|---|---|
| paper `#f5f3ef` sobre `#2596be` | **3,06:1** | **reprova AA** (mín. 4,5) |
| paper `#fbf9f5` sobre `#2596be` | 3,23:1 | reprova AA |
| amarelo `#ffc900` sobre `#2596be` | 2,20:1 | reprova até AA-large |
| preto `#08090b` sobre `#2596be` | 5,87:1 | passa AA |

Ou seja: `#2596be` como fundo do app é problemático também fora da hero — qualquer texto claro sobre ele cai abaixo de AA. Isso é um segundo motivo (independente do crop) para não ser a cor de fundo do documento; pode continuar existindo como cor de *acento* de cena sem ser o fundo global.

---

## 6. Pontos de verificação obrigatórios (desktop e mobile)

Para aceitar a correção, medir **nos dois estados** (`contain`+fundo escuro, ou `cover` se essa for a escolha):

1. **Ausência de faixa**, amostrando pixel nas colunas `x = 5..130` e `x = 1750..1885` em 1886×914 → não pode dar `#2596be`.
2. **Enquadramento preservado**: comparar a bbox do círculo amarelo (topo do círculo, largura, base) em 1886×914 contra `capture-width-1886x914.png`. Se o topo do círculo mudou de y, houve crop.
3. **Mobile 390×844**: o círculo não pode ser cortado nas laterais (hoje com `cover` + `pos 50% 0%` ele corta).
4. **768×1024** e **1440×900**: mesmos dois checks (faixa + bbox).
5. **`html`/`body`/`.film-slide__sticky`** computed `backgroundColor` — deve ser a cor escolhida para as sobras, não `#2596be`.
6. **`theme-color`** no `index.html`: se o fundo mudar, o meta deve acompanhar, senão a barra do navegador mobile fica ciano.
7. **O teste `contracts.test.ts:205`** trava `#2596be` e `theme-color`. Se a cor canônica mudar, esse teste muda **no mesmo commit** — senão a suíte fica vermelha ou, pior, fixa o defeito.
8. **Todas as 6 cenas**: as faixas aparecem em qualquer clipe 16:9 letterboxado, não só na hero. Conferir em pelo menos 2 seções.
9. **`prefers-reduced-motion: reduce`** (ambiente do Pedro): as medições acima foram feitas nesse modo — repetir só nele.

---

## 7. Riscos que eu registraria

| # | Risco | Sev. |
|---|---|---|
| R1 | `cover` em 1886×914 corta 147px de altura e o topo do círculo — contraria “enquadramento fixo/aprovado” | **alto** |
| R2 | `cover` em mobile corta 1052–1110px na horizontal (círculo nas laterais) | **alto** |
| R3 | `#2596be` como fundo do app reprova AA para texto claro (3,06:1) | médio |
| R4 | `contracts.test.ts` **fixa** a cor canônica → a correção de cor exige atualizar o teste no mesmo commit | médio |
| R5 | Corrigir só a hero e esquecer as outras 5 cenas (mesma causa, mesma correção) | baixo |
| R6 | Esconder a faixa recortando screenshot ou `overflow:hidden` no body — não resolve e mascara | baixo |

---

## 8. Resposta direta às perguntas do brief

- **O azul está no asset?** Não. Poster: 0 pixels `#2596be`; borda real `4,7,14`.
- **É camada do site?** Sim: `--color-bg: #2596be` (`base.css:2`), aplicado em `html`/`body`/`.film-slide__sticky` e nas 5 cenas de `interfaceContent.json`, fixado por teste.
- **Precisa de zoom/crop no vídeo?** **Não.** A aritmética mostra que basta a cor das sobras coincidir com a borda do vídeo. `cover` é uma escolha possível, mas paga com crop de 13,8% no desktop e corte lateral severo no mobile.
- **Alterações feitas por mim?** Nenhuma. Servidor `:4577` (dist estático) encerrado; nenhum Chrome meu ativo; `git status` só mostra o trabalho do FrontendCraft (`base.css`, `film.css`, `pages.css`, `contracts.test.ts`, `hero-letterbox.test.ts`, `flow/cadeia/`), que não toquei.
