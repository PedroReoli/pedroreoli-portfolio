# Estado das fontes — 2026-10-09

> Verificação automática de disponibilidade por GET. Resposta HTTP não prova correção do conteúdo; fontes mutáveis devem ser abertas novamente na execução que depender delas.

| URL | Estado observado | HTTP | Uso |
|---|---|---:|---|
| https://www.gov.br/anpd/pt-br | reachable | 200 | validar versão e afirmação antes de usar |
| https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm | unverified_network_error | — | validar versão e afirmação antes de usar |
| https://www.planalto.gov.br/ccivil_03/leis/l10406compilada.htm | unverified_network_error | — | validar versão e afirmação antes de usar |

Estados `access_restricted` e `unverified_network_error` são inconclusivos, não aprovação. URLs de `example.com` são fixtures deliberadas. O relatório integral está em `docs/audits/reengineering-20261009/link-check.json`.
