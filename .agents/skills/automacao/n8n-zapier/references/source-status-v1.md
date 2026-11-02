# Estado das fontes — 2026-10-09

> Verificação automática de disponibilidade por GET. Resposta HTTP não prova correção do conteúdo; fontes mutáveis devem ser abertas novamente na execução que depender delas.

| URL | Estado observado | HTTP | Uso |
|---|---|---:|---|
| https://docs.n8n.io/build/flow-logic/handle-errors-gracefully/ | reachable | 206 | validar versão e afirmação antes de usar |
| https://docs.n8n.io/build/understand-workflows/create-and-edit-credentials/ | reachable | 206 | validar versão e afirmação antes de usar |
| https://help.zapier.com/hc/en-us/articles/8496309697421-What-is-a-Zap | reachable | 206 | validar versão e afirmação antes de usar |

Estados `access_restricted` e `unverified_network_error` são inconclusivos, não aprovação. URLs de `example.com` são fixtures deliberadas. O relatório integral está em `docs/audits/reengineering-20261009/link-check.json`.
