# Estado das fontes — 2026-10-09

> Verificação automática de disponibilidade por GET. Resposta HTTP não prova correção do conteúdo; fontes mutáveis devem ser abertas novamente na execução que depender delas.

| URL | Estado observado | HTTP | Uso |
|---|---|---:|---|
| https://developers.google.com/search/docs/appearance/structured-data/sd-policies | reachable | 200 | validar versão e afirmação antes de usar |
| https://developers.google.com/search/docs/crawling-indexing/control-what-you-share | reachable | 200 | validar versão e afirmação antes de usar |
| https://developers.google.com/search/docs/crawling-indexing/robots/intro | reachable | 200 | validar versão e afirmação antes de usar |
| https://example.com/ | example_fixture | — | validar versão e afirmação antes de usar |
| https://example.com/sitemap.xml | example_fixture | — | validar versão e afirmação antes de usar |
| https://example.com/sobre | example_fixture | — | validar versão e afirmação antes de usar |
| https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots | reachable | 200 | validar versão e afirmação antes de usar |
| https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap | reachable | 200 | validar versão e afirmação antes de usar |

Estados `access_restricted` e `unverified_network_error` são inconclusivos, não aprovação. URLs de `example.com` são fixtures deliberadas. O relatório integral está em `docs/audits/reengineering-20261009/link-check.json`.
