# Estado das fontes — 2026-10-09

> Verificação automática de disponibilidade por GET. Resposta HTTP não prova correção do conteúdo; fontes mutáveis devem ser abertas novamente na execução que depender delas.

| URL | Estado observado | HTTP | Uso |
|---|---|---:|---|
| https://support.google.com/adspolicy/answer/6008942 | reachable | 200 | validar versão e afirmação antes de usar |
| https://support.google.com/google-ads/answer/1722022 | reachable | 200 | validar versão e afirmação antes de usar |
| https://support.google.com/google-ads/answer/6259715 | reachable | 200 | validar versão e afirmação antes de usar |

Estados `access_restricted` e `unverified_network_error` são inconclusivos, não aprovação. URLs de `example.com` são fixtures deliberadas. O relatório integral está em `docs/audits/reengineering-20261009/link-check.json`.
