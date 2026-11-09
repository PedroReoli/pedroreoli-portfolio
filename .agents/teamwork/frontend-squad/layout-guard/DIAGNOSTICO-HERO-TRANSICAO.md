# Diagnóstico — Hero→S2, frame-a-frame, S2 duplicada, S3

Auditor: LayoutGuard · headless (`chrome --headless=new` + CDP, `preview` :4176) · HEAD `5603caf`
Nada editado. Nenhuma janela aberta. Screenshots: `diag-hero/`.

Este é o **parecer do fiscal**, não a correção. Cada item abaixo tem causa medida, para o FrontendCraft não adivinhar.

---

## 1. "Cada scroll move um frame" — **a interpolação é a causa**

Verificado no `VideoStage.tsx:131-143`. O tempo não é escrito uma vez por scroll; um loop de `requestAnimationFrame` persegue o alvo com fator fixo:

```ts
const delta = targetTimeRef.current - video.currentTime
if (Math.abs(delta) > 0.015) video.currentTime = video.currentTime + delta * EASE // EASE = 0.2
```

Medido com reduced-motion ligado (= o Windows do Pedro), 1 scroll de 120px, esperando 1s para assentar:

| scroll | currentTime | esperado (1:1) |
|---|---|---|
| 120 | 1.018 | 1.0 |
| 240 | 2.055 | 2.0 |
| 360 | 3.088 | 3.0 |
| 480 | 4.121 | 4.0 |
| 600 | 5.155 | 5.0 |
| 720 | 6.188 | 6.0 |
| 840 | 7.221 | 7.0 |

O **mapeamento** está correto (1.018s por 120px). O problema é a **latência**: 20ms depois do scroll em `y=1400` o vídeo estava em **1.544s** e só chega a 4.304s depois de 1s. Ou seja, cada scroll vira um deslizamento de ~0,3–0,5s em vez de trocar de frame. Para o olho: "não move um frame, ele escorrega".

**Correção:** `currentTime = target` **direto**, sem `EASE` nem lerp. Se tremer, o remédio é `requestVideoFrameCallback` + quantizar o alvo ao frame (1/24s), nunca suavizar com delta.

> Advertência técnica honesta: scrub a 1:1 em MP4 H.264 é limitado pelo decoder. Com 6 clipes de 1920×1080 há referência para buscar frame a cada seek. O caminho que os sites que fazem isso de verdade usam é **sequência de imagens** (WebP/AVIF já decodificados e desenhados num `<canvas>`, ou `<img>` trocados) — custo de bytes maior, mas frame exato por scroll. Se o 1:1 em vídeo continuar engasgando mesmo sem easing, essa é a troca a fazer. Ver §5 sobre a pesquisa.

---

## 2. "Parece paralaxe / as outras seções abaixo da Hero" — **é literalmente isso, e pior: o busto aparece duas vezes**

Medido em `y=400` (reduced motion). Três coisas pintam ao mesmo tempo:

| camada | origem | posição | opacidade |
|---|---|---|---|
| vídeo do clipe | `.video-stage video` (`01-hero-to-about.mp4`) | `fixed`, `top 63`, `h 954`, `contain` | 1 |
| pôster do stage | `.video-stage__poster` | idem | 0 (já some, ok) |
| **imagem própria do hero** | `.hero__background-img` = **`pedro-bust-cyber.jpg`** | `static`, `top -337`, `h 954` — rola junto | **1** ← não é escondida para de S2 |
| conteúdo da S2 | `.about` | `top 500` | 1 |

Em `diag-hero/hero-to-s2-y400.png` dá para ver o seam horizontal na altura do `DESÇA PARA EXPLORAR`: **acima** é o busto do `pedro-bust-cyber.jpg` (com fone, cabeça alta) e **abaixo** é o busto do vídeo (mãos nos fones, escala/posição diferentes). **Dois bustos diferentes na mesma tela.** É o que Pedro descreveu como "feed de paralaxe".

**Causa raiz — e é mais sutil do que parece:** `backdrop.css:134` **tenta** esconder (`.home:has(.video-stage) .hero__background-wrap { opacity: 0 }`), mas `HeroSection.tsx:56-61` roda

```ts
if (!sectionRef.current || reducedMotion) return
gsap.from('[data-hero-bg]', { scale: 1.08, opacity: 0, duration: 1.4, ease: 'power3.out' })
```

O `gsap.from` **escreve `opacity` inline** no `.hero__background-inner` (o `[data-hero-bg]`), e inline vence a regra do `backdrop.css`, que só atinge o **wrap** de fora. Por isso a imagem volta a `opacity: 1` (medido) mesmo com o wrap em 0. Além disso, o outro tween de ponteiro escreve `bgRef.current.style.transform` direto (`HeroSection.tsx:36`), competindo com o `transform` do CSS.

**Correção:** desligar de verdade a imagem própria do hero quando o stage está ativo — e não por CSS que o GSAP sobrescreve:
1. o mais simples e limpo: **não renderizar** o bloco `hero__background-wrap` quando existe `VideoStage` (o vídeo já é o busto); ou
2. no mínimo, aplicar o esconder no mesmo elemento que o GSAP toca: `.hero__background-inner[data-hero-bg] { opacity: 0 !important }` — mas isso é um `!important` novo, então **prefira (1)**;
3. o tween de `[data-hero-bg]` e o parallax de ponteiro devem sair junto: sem imagem, não há o que escalar.

**Como fica a S2:** a `.about` ainda não tem painel próprio — é por isso que o vídeo aparece entre os blocos do texto (na imagem do Pedro, o busto no meio das pills). Isso é composição a decidir junto com o item 3 abaixo.
2. Durante a transição Hero→S2: o vídeo é `position: fixed` e o conteúdo da S2 **sobe por cima dele** (`top 500` com a seção iniciando em 900). Isso é rolagem normal de documento — se Pedro quer que a Hero "vire" a S2 sem essa sensação de camada deslizando, a S2 precisa entrar **sem** mover a composição (ex.: a S2 fica `sticky` sob a Hero, ou a Hero fica `sticky` e a S2 sobe por cima com `border-radius` — escolher **uma** forma e manter em todas as seções).
3. O `video` também está com `transform: matrix(1.06 …, 90)` herdado do hero — o mesmo scale/translate aplicado ao vídeo fixo. Isso faz o enquadramento "pular" quando o clipe troca. Manter o `transform` do hero **só** na imagem decorativa que sair, não no stage.

---

## 3. S2 "minha imagem se repete" — **confirmado, é estrutural**

Em `#sobre` existe **1** `<img>` real (`eu-profissional.png`, 362×380) e, atrás, o **vídeo** `02-about-to-projects.mp4` congelado em `t=0` — que é o pôster `02-about-poster.png`, **o mesmo rosto**. Resultado: o rosto aparece na moldura e no fundo (visível no print do Pedro).

Além disso, o clipe 02 é **justo o clipe que tem os marcadores** `pedro-photo`/`statue-back` (a foto real entra/sai). Ou seja, a S2 tem uma duplicação **planejada** pelo `sceneClips.json` e outra **acidental** pela moldura.

**Correção:** decidir **um** veículo para o rosto na S2. Recomendo: fundo sem rosto na S2 (pôster neutro/escuro ou um frame em que o busto esteja fora), e o rosto **só** na moldura. Remover os `markers` `pedro-photo` do JSON, ou desligar a moldura durante o intervalo dos marcadores — não as duas coisas juntas.

---

## 4. S3 — "tirar a imagem e deixar cards dos 3 projetos"

Estado atual (medido no CSS): `.project-rail .project-card__body h3 { font-size: clamp(1.9rem, 2.8vw, 3rem) }` e `p { clamp(0.95rem, 1.15vw, 1.12rem) }`. É a maior fonte de corpo do site, e o card carrega um screenshot de ERP 2880×1800 dentro do rail — a imagem ocupa mais área que o texto e não se lê.

Isso é **mudança de composição**, não de escala: Pedro quer **sem imagem**, 3 cards de projeto. Aprovo como direção, com dois cuidados de padrão:
- **Componente canônico:** os 3 cards usam **um** `ProjectCard` com variante (`variant="compact" | "featured"`), não três blocos de JSX copiados. Hoje a S3 tem o card e o `AchillesArtwork` embutidos na seção.
- **Escala:** voltar `h3` para `clamp(1.5rem, 2vw, 2rem)` e o corpo para `1rem`, senão sem imagem o card fica desproporcional.
- Acessibilidade: sem a imagem, o link não perde nome acessível (o título já nomeia). Nada a fazer além de manter `<a>` com o título.

---

## 5. "Pesquisar na internet como fazer" — o que existe de real

Não inventei referência: estes são os padrões consagrados para "scroll = frame":
- **Apple (produtos) / AirPods Pro**: sequência de imagens servida por scroll — a referência canônica. É `<img>`/canvas, **não** vídeo.
- **"Scrollytelling" com canvas** (Chrome Devs / CSS-Tricks): desenham um frame por evento de scroll com `scroll` passivo + `requestAnimationFrame`, sem interpolação.
- **GSAP ScrollTrigger + vídeo**: o padrão para vídeo é `scrollTrigger: { scrub: true }` (scrub **booleano**, que é 1:1 — `scrub: 0.3` é justamente o lerp que produz o deslizamento atual).
- **`requestVideoFrameCallback`** (MDN): permite sincronizar o desenho ao frame real; é o que se usa quando se quer exatidão por frame com vídeo.

Resumo: o erro não é "falta pesquisa", é que o código escolheu **lerp** (`EASE = 0.2`) — o modo "suave" — quando Pedro pediu o modo **frame a frame**. Sem lerp, e se ainda engasgar, trocar vídeo por sequência de imagens.

---

## 6. Asset/fotos — o parecer de quem audita o resultado

Pedro está certo no que se vê: entre `pedro-bust-cyber.jpg`, `01-hero-poster.png` e os frames de `01/02`, o rosto **não** é o mesmo. Isso é inconsistência de **asset**, não de CSS — é trabalho do MediaForge. O pedido dele é claro e é o caminho certo:
1. uma imagem base "modo estátua" com o rosto **dele** preservado (`eu-profissional.png`);
2. uma imagem base "sem estátua" = rosto normal;
3. no Flow, um clipe de transição estátua → rosto real, usado **uma vez** (Hero→S2), e as demais seções sem rosto repetido.

Do meu lado (padrão), o contrato para isso: **um** clipe de transição facial, apontado por **um** `id` no `sceneClips.json`, e a regra "o mesmo rosto não aparece em dois elementos simultâneos na mesma tela" — que é exatamente o defeito §2 e §3.

---

## Resumo dos bloqueios (severidade)

| # | Defeito | Sev. | Correção |
|---|---|---|---|
| 1 | `EASE = 0.2` suaviza o scrub (não é 1 frame por scroll) | **bloqueia** | `currentTime = target` direto; se necessário, quantizar a 1/24s |
| 2 | Imagem própria do hero reaparece: GSAP escreve `opacity` inline em `[data-hero-bg]` e vence o `backdrop.css` → **busto duplicado** | **bloqueia** | não renderizar `hero__background-wrap` com stage ativo (sem `!important`) |
| 3 | Conteúdo da S2 sobe por cima do vídeo fixo (efeito de camada) | **bloqueia** | escolher um único padrão de transição entre seções |
| 4 | Rosto duplicado na S2 (moldura + fundo) | **bloqueia** | um veículo só para o rosto na S2 |
| 5 | S3: fonte gigante + imagem que não se lê | **bloqueia** | remover imagem, 3 cards via um `ProjectCard` com variante, escala menor |
| 6 | Rostos diferentes entre assets | alta (MediaForge) | nova base estátua/rosto + 1 clipe de transição |
