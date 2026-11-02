# Estado das fontes — 2026-10-09

> Verificação automática de disponibilidade por GET. Resposta HTTP não prova correção do conteúdo; fontes mutáveis devem ser abertas novamente na execução que depender delas.

| URL | Estado observado | HTTP | Uso |
|---|---|---:|---|
| https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html | reachable | 206 | validar versão e afirmação antes de usar |
| https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html | reachable | 206 | validar versão e afirmação antes de usar |
| https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html | reachable | 206 | validar versão e afirmação antes de usar |
| https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html | reachable | 206 | validar versão e afirmação antes de usar |
| https://www.rfc-editor.org/rfc/rfc9700 | reachable | 200 | validar versão e afirmação antes de usar |

Estados `access_restricted` e `unverified_network_error` são inconclusivos, não aprovação. URLs de `example.com` são fixtures deliberadas. O relatório integral está em `docs/audits/reengineering-20261009/link-check.json`.
