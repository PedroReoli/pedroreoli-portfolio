# Estado das fontes — 2026-10-09

> Verificação automática de disponibilidade por GET. Resposta HTTP não prova correção do conteúdo; fontes mutáveis devem ser abertas novamente na execução que depender delas.

| URL | Estado observado | HTTP | Uso |
|---|---|---:|---|
| https://www.nngroup.com/articles/visual-design-in-ux-study-guide/ | reachable | 200 | validar versão e afirmação antes de usar |
| https://www.toastmasters.org/resources/public-speaking-tips | reachable | 200 | validar versão e afirmação antes de usar |
| https://www.w3.org/WAI/WCAG22/quickref/ | reachable | 206 | validar versão e afirmação antes de usar |

Estados `access_restricted` e `unverified_network_error` são inconclusivos, não aprovação. URLs de `example.com` são fixtures deliberadas. O relatório integral está em `docs/audits/reengineering-20261009/link-check.json`.
