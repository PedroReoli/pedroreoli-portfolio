# Bugscan BotManager — navegador headless

Data: rodada atual. Porta preview 5203.

## Achados (medidos)

1. **Footer sem scroll room (bug sério 5→6).** `.home` = 5635px (7 telas × 805px). `maxScroll` = 4830 (6 telas). O painel do Footer (índice 6) começa em 4830 = maxScroll, então **nunca aparece**. A experiência (painel 5) tem só 430px úteis (4400→4830), então o topo dela e a troca do clipe purpose→experience ficam espremidos.
   - Causa raiz: 7 painéis de texto (`film-panel` 0..6), 6 clipes (`sceneClips.clips` 0..5). O `--film-count: 7` vale, mas o último painel (footer) não ganha espaço de scroll próprio porque `isLast` é calculado sobre `clips.length - 1 = 5`, não sobre os painéis.
   - Correção: ou o footer entra como ANEXO ao painel 5 (experiência), ou `--film-count` deve ser 7 e o último painel precisa de `height: 100svh` extra no final do track. Ver `HomePage.tsx` (SECTIONS 6 + Footer separado).

2. **Scroll trava em 4830 mesmo com docH 5635** — confirma o item 1. Os 805px finais (footer) são inalcançáveis.

3. **Sem erros de console.** `window.__errs` vazio em todo o percurso. Não é erro de runtime, é desalinhamento de layout/mapeamento.

4. **Reduced-motion = reduce no headless** (não forcei, usei o default do OS; mas na máquina do Pedro é `reduce` por causa do Windows). As transições de opacidade funcionam porque agora são rampa por scroll, não CSS transition.

## Recomendação (para o FrontendCraft)
- O footer deve compartilhar o espaço do último clipe (experiência-loop), não ganhar uma 7ª tela que não tem scroll. Ou seja: `SECTIONS.length` painéis = `clips.length` (6 = 6), e o footer mora DENTRO do painel da experiência (como `contact-section--embedded` já tenta fazer). Revisar `HomePage.tsx` para não adicionar um painel extra além dos 6 clipes.
