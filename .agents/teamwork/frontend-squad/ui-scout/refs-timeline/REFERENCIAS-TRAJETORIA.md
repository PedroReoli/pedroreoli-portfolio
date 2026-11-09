# TRAJETÓRIA — referências pesquisadas para refazer a timeline vertical

Pesquisa apenas. **Nenhum código foi editado.** Implementação depende da escolha visual
do Pedro.

Contexto do problema (o que ele reclamou, em ordem):
1. a seção TRAJETÓRIA "está horrível";
2. "os cards têm que ter mais conteúdo" — período, empresa, cargo, descrição, destaques, stack;
3. "precisam de seções melhores" — a seção de Experiência tem que ser mais alta;
4. quer exemplos de vertical timeline da internet para "copiar".

O estado atual medido no repo: `ExperienceSection.tsx` já tem trilha, nós e alternância
(commit `24c2378`) e cards completos numa fatia de 1,7 tela (`97f0b80`). Ou seja: a
estrutura existe, o que falta é **espaço e hierarquia visual**.

---

## Acessos — status exato desta rodada

| Site | Status | Detalhe |
|---|---|---|
| **CodePen** (`codepen.io/tag/...`) | ✅ **verificado, sem login** | Páginas de tag públicas funcionam. A **busca global** exige conta ("An account is required for global search") — não usei, não contornei. |
| **Flowbite docs** (`flowbite.com/docs/components/timeline/`) | ✅ **verificado, sem login** | Markup completo, 6 variantes, público. |
| **shadcn/ui blocks** (`ui.shadcn.com/blocks`) | ✅ verificado, sem login | **Não tem bloco de timeline.** Sem uso para este caso, fica registrado para não repetirem a busca. |
| **v0.app** | ⚠️ **parcial** | Galeria pública abre. **Busca exige login** e cai em "Private Chat / Chat Not Found". Sem sessão salva. |
| **Login `pedrosousa2160@gmail.com`** | ❌ **não realizado** | Vault sem entrada para CodePen/v0 (`logins: []`). Não tentei senha, código nem contorno — conforme a regra, isso é takeover do Pedro. **Nada foi bloqueado por falta de senha que eu tenha tentado burlar.** |

Resumo honesto: nenhuma referência abaixo depende de conta. Todas abrem anonimamente.

---

## 1. Vertical blog timeline — a melhor referência de ESPAÇO
🔗 https://codepen.io/agn35/pen/mdmVVaX
▶️ preview: https://codepen.io/agn35/fullpage/mdmVVaX

**Medido no preview:** 8 itens, item de **664px de altura** com **60px de padding-top**,
coluna de **1140px**, mídia de **450px** ao lado do texto, trilha azul vertical com nó
inicial, data em pílula escura ligada à trilha por um braço horizontal.

**Por que serve:** é exatamente o "espaçoso" que ele pediu. Cada capítulo ocupa quase
uma tela, com imagem grande e texto respirando — o oposto do card apertado atual.
O braço horizontal da data até a trilha dá a hierarquia que hoje não existe.

**Limite:** não tem stack nem destaques; itens não são cards com borda.

---

## 2. CSS3 Vertical Timeline (HTML Codex) — o melhor "card completo"
🔗 https://codepen.io/htmlcodex/pen/MWKormm
▶️ preview: https://codepen.io/htmlcodex/fullpage/MWKormm

**Medido no preview:** 6 itens, item de **205px**, coluna de **1140px**, trilha de
**5px**, card com `border-radius: 500px 0 500px 500px` (canto assimétrico apontando
para o nó) e ícone dentro do nó na trilha.

**Por que serve:** é a mecânica de card + nó + alternância mais limpa que achei, e a
mais fácil de receber descrição, destaques e stack dentro. O canto assimétrico é um
detalhe barato que já cria "card de verdade".

**Limite:** fundo branch, tipografia fraca, sem animação de scroll.

---

## 3. Vertical Timeline Collapsed — a referência de MÓVEL
🔗 https://codepen.io/flower-spring/pen/MWGomay
▶️ preview: https://codepen.io/flower-spring/fullpage/MWGomay

**Por que serve:** cada item é **colapsável** (4 links de toggle medidos). Em móvel,
5 capítulos com descrição longa viram 5 datas clicáveis em vez de 5 telas de rolagem.

**Aviso:** colapsar por padrão esconde o conteúdo — o Pedro acabou de pedir **mais**
conteúdo. Usar só como comportamento em `≤768px`, mantendo tudo aberto no desktop.

---

## 4. Flowbite — Tailwind Timeline (documentação técnica)
🔗 https://flowbite.com/docs/components/timeline/

**Por que serve:** markup pronto e acessível (`<ol>`, `<time>`, `border-s` para a
trilha, nó `absolute -start-3`) em 6 variantes, incluindo **grouped timeline** e
**activity log**. É a referência para o FrontendCraft copiar a semântica sem inventar.

**Limite:** visual de dashboard, não de portfólio. Serve de estrutura, não de estética.

---

## 5. Scroll-Drawn Timeline (GSAP ScrollTrigger) — referência de animação
🔗 https://codepen.io/sainul/pen/bNqMpXq

**Uso:** só como ideia de animação — a linha se desenha com o scroll
(`stroke-dashoffset`) e cada nó "pops" quando a linha chega nele.

**Rejeitar o resto:** é uma timeline em **U horizontal**, com câmera seguindo o traço.
Bonita e fora do escopo. Não copiar o formato.

---

## Direção recomendada (uma só, para o Pedro escolher sim/não)

**Base: referência #1 (espaço) + mecânica de card da #2 + semântica da #4.**

### Layout
- Trilha vertical **fixa no centro**, 2px, com brilho amarelo suave.
- Cada capítulo = **uma tela inteira** (`min-height: 100svh`), não 205px. Isso resolve
  "a seção de Experiência tem que ser mais alta" de forma estrutural, não por padding.
- Card de **um lado**, alternando, com largura máxima ~520px e o lado oposto vazio
  (ou recebendo a "mídia"/número grande do capítulo) — cria o respiro da #1.
- Canto do card levemente assimétrico, como na #2, apontando para o nó.
- No card, nesta ordem de hierarquia: **período** (pílula, `font-size .7rem`, mono),
  **cargo** (display, maior), **empresa** (linha própria, com cor de destaque),
  **descrição** (2–3 linhas), **3–4 destaques** com ícone, **stack** em chips.
- **< 768px:** trilha vai para a esquerda (offset 24px), cards ocupam 100%, sem
  alternância, sem colapsar (o Pedro quer ver o conteúdo).

### Animação (compatível com o que já existe)
Não introduzir GSAP. O site já tem animação por scroll escrita inline, que é a única
que sobrevive ao `prefers-reduced-motion` do Windows dele:
- trilha cresce com o scroll (`scaleY` de 0→1 na fatia da seção);
- nó acende quando a trilha o alcança (mesma técnica, valor inline por `scrollY`);
- card entra com o `smoothstep` já usado no resto do site (opacidade + `blur` 10→0 +
  `translateY` 16→0), com **stagger** de 60ms entre os filhos para a leitura conduzir.

### O que NÃO fazer
- Não copiar o foguete/câmera do #5.
- Não colapsar conteúdo no desktop.
- Não usar `overflow` interno na timeline — foi isso que travou o scroll da S6 antes
  (`film-scroll-trap.test.ts` já barra esse erro).
- Não animar com `transition`/`@keyframes` (morrem no Windows dele — medido).

---

## Aberto para o Pedro decidir
1. Espaçoso (#1, capítulo = 1 tela) ou compacto e legível (#2, card de ~205px)?
2. Mídia/imagem no lado oposto do card, ou só número grande do capítulo?
3. Manter 5 capítulos como hoje, ou abrir cada um com uma linha de "contexto" extra?
