# Estado das fontes — 2026-10-09

> Verificação automática de disponibilidade por GET. Resposta HTTP não prova correção do conteúdo; fontes mutáveis devem ser abertas novamente na execução que depender delas.

| URL | Estado observado | HTTP | Uso |
|---|---|---:|---|
| https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html | reachable | 206 | validar versão e afirmação antes de usar |
| https://cheatsheetseries.owasp.org/cheatsheets/Webhook_Security_Cheat_Sheet.html | reachable | 206 | validar versão e afirmação antes de usar |
| https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries | reachable | 206 | validar versão e afirmação antes de usar |
| https://docs.stripe.com/webhooks | reachable | 200 | validar versão e afirmação antes de usar |

Estados `access_restricted` e `unverified_network_error` são inconclusivos, não aprovação. URLs de `example.com` são fixtures deliberadas. O relatório integral está em `docs/audits/reengineering-20261009/link-check.json`.
