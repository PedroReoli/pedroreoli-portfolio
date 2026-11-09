# Verificação pós-scrub (`4ba2e41`) — o que ficou bom e o que o código precisa fechar

Auditor: LayoutGuard · Headless CDP · 2026-11-06 · Branch `main`, HEAD `4ba2e41`, `dist` de 18:26 (corresponde ao commit)
Screenshots: `auditoria-v2/<secao>-1440x900.png` · dados: `auditoria-v2/state.json`
Nenhuma janela aberta. Nada editado — só especificação.

---

## 1. O que o commit resolveu (a queixa principal)

| Antes | Agora | Evidência |
|---|---|---|
| Seções com painel opaco cobrindo o vídeo | **Todas transparentes**: `bg = rgba(0,0,0,0)` nas 6 seções | `state.json` campo `sectionBg` |
| Stage atenuado a `.45` | **`opacity: 1`** (sem atenuação global) | `backdrop.css:18` "No global stage attenuation" |
| Busto invisível | **Busto nítido** aparecendo atrás do conteúdo em S2, S3 e S5 | `sobre-1440x900.png`, `projetos-selecionados-1440x900.png`, `proposito-1440x900.png` |
| Reveals travados a 0 | Resolvem no scroll real (0 elementos `< .95` em S2/S3/S4 após percorrer a página) | `run-reveal3` |

Testes: **47/47**, lint 0. Build verde. Isso é progresso real e o caminho está certo.

---

## 2. Defeitos remanescentes (bloqueiam o "ficou bom")

### D1 — [BLOQUEIA] S2: `stats-grid` é um painel claro sobre o busto, com células invisíveis no primeiro instante

- Elemento: `.stats-grid` (dentro de `.about__metrics-card`), `background: rgba(251,249,245,.75)` — **painel branco 75%** em `680×101px` exatamente sobre o rosto do busto (y≈620–720).
- Células: 4 `div` filhas com `opacity: 0` na chegada e subindo via stagger GSAP. Medi a sequência: `0.91,0.77,0.51,0.08 → 1,1,1,1` em ~400ms. No momento do meu screenshot (1.4–1.8s) o fundo já está a `.75` mas o texto ainda não, resultando na **placa cinza sem conteúdo** da imagem.
- Contraste do texto quando aparece: `strong` `rgb(8,9,11)` e `span` `rgb(126,123,116)` sobre `rgba(251,249,245,.75)` sobre mármore. O `span` (`#7e7b74` sobre papel) fica **abaixo de AA** para texto pequeno — é o mesmo caso que a memória do canal já fixou (`papel` exige `#7a5c00` ou mais escuro).
- **Correção:** (a) fundo do grid **não** pode ser opaco sobre o busto — usar `rgba(8,9,11,.55)` + `backdrop-filter: blur(12px)`, com texto claro (`--paper`), invertendo o esquema; ou (b) mover o bloco de stats para a coluna da moldura (esquerda), sob a foto, onde não há busto. (b) é mais simples e não disputa com o fundo. Em qualquer caso: `span` nunca abaixo de `rgba(245,243,239,.72)`.

### D2 — [BLOQUEIA] S2: corpo de texto sobre o disco amarelo = 4.09:1

- `.about__summary` (`rgba(245,243,239,.85)`) cai sobre o preenchimento amarelo do círculo. Medido no pixel: **4.09:1** — reprova AA (4.5:1) para 19.84px regular.
- **Correção:** scrim local atrás da coluna de narrativa (o piso que já está na memória do canal: `rgba(8,9,11,.72)`), ou reforçar `rgba(245,243,239,.95)` **e** o scrim. Só trocar o alpha do texto não resolve: o amarelo do disco é claro.

### D3 — [BLOQUEIA] Contagem de `!important` e teto de arquivo

| métrica | baseline | agora | veredito |
|---|---|---|---|
| `!important` total | 91 | **95** | +4 — precisa justificar ou remover |
| `home.css` | 612 | **698** | a 52 linhas do teto de 750 — **não cabe a próxima seção** |
| restantes | — | 397 / 293 / 193 / 185 / 141 | ok |

- `backdrop.css:126` usa `background-color: transparent !important` e `home.css:518,558,614` usam `background: transparent !important`. São 4 novos.
- **Correção verificada linha a linha:** estes `!important` **não são removíveis às cegas**. A base continua definindo painel em `.section-dark { background: var(--night) }` (`base.css:57`) e `.purpose-section`/`.work-section` em `home.css`; sem `!important` o painel volta. A saída correta e sem `!important` é **remover a declaração de background na origem** (`.section-dark`, `.about.section-light`, `.stack-section.section-light`, `.purpose-section`) em vez de sobrescrever no fim. Enquanto isso não for feito, os 4 ficam — mas então o contador oficial é **95** e a meta `<= 91` anterior precisa ser renegociada com o Pedro, não silenciada.
- `home.css` 698: qualquer trabalho em S2/S5 estoura 750. A divisão em partials (`LIMITES-ARQUIVOS.md` §2) deixa de ser opcional: mover `.about*`/`.stats-grid*` para `styles/about.css` e `.purpose*` para `styles/purpose.css` **antes** de continuar.

### D4 — [média] S5: texto por cima do braço/busto e hierarquia sem foco

- Layout atual: `figure` em x 100–562, `copy` em x 695–1255. O texto cai direto sobre o braço apontando e o disco (medido 7.23:1 no parágrafo — passa, mas o título `VOZ / para todos.` está **dentro** da imagem, duplicando a leitura).
- Pedro pediu nesta rodada: "VOZ PRA TODOS sobre a foto, foto mais estreita, texto surgindo sobre ela, foto levemente escurecida quando o texto entra".
- **Correção:** `figure` a ~46–50% com `.purpose-section__media::after` já existente (`.9 → transparente`) servindo de scrim; `copy` sobreposto à direita da foto (não ao lado), com o título **saindo** da imagem e indo para o HTML; revelar por linha (`translateY(16px)`) e escurecer a foto via `data-text-in` (uma classe, sem JS por parágrafo).

### D5 — [baixa] S6: altura 1975px para 1 frame parado

`experiencia` tem 1975px de altura com o backdrop fixo — o mesmo frame acompanha 2+ telas. Se for intencional (wallpaper), ok; se não, o scrub por scroll resolve (cada trecho do vídeo acompanha o trecho da timeline).

### D6 — [nota] Reveals em navegação direta

Com scroll real, resolvem. Ainda há **resíduo**: `RELOAD + SALTO` para S2 deixou `about__focus-pills=0.9375`, `about__action=0.3757` e 4 `DIV=0` (células do stats) por ~1.8s. Se o Pedro navegar por âncora/refresh, vê o mesmo efeito de antes por ~1s. Não é bloqueio se o caminho principal (scroll) está resolvido, mas a "rede de segurança" de `009f05d` não cobre salto.

---

## 3. O que já está validado e não deve ser mexido

- Busto com posição e escala corretas no hero (texto no topo, CTAs fora do disco — conferido em `hero-1440x900.png`).
- S3 rail: alternância e contraste ok (11.51:1), busto visível atrás.
- S4 Stack: legível, 4/2/1 colunas.
- Scroll-scrub: `t=0` e `paused=true` com o `<video>` montado, `mode=video` — o comportamento pretendido (parado, travado no scroll).

## 4. Ordem recomendada

1. **D3** (consolidar background na origem para derrubar os 4 `!important` + dividir `home.css`) — senão o próximo commit estoura o teto.
2. **D1 e D2** (S2 stats e contraste do corpo) — é a imagem que o Pedro abriu primeiro.
3. **D4** (S5 conforme o pedido dele).
4. **D5/D6** — polimento.
