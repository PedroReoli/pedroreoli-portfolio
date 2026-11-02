# Portões de qualidade e avaliação — v1

Origem: auditoria manual semântica de 2026-10-09, lote B; nota documental de base 63.75/100. Este arquivo converte achados em instruções normativas, mas **não declara avaliação comportamental executada**.

## Correções obrigatórias antes da entrega

- Transformar em roteador: carregar apenas pesquisa, local, on-page, conteúdo, Ads ou GEO conforme intenção.
- Corrigir dependências de ferramentas `WebSearch/WebFetch` para capacidades portáveis.
- Substituir frequências fixas e tamanhos de artigo por decisões justificadas.

## Padrões proibidos e conflitos a evitar

- Fronteira diz separar SEO de Ads, mas o workflow inclui Passo 6 Google Ads e manda executar os oito passos em sequência.

## Riscos que exigem tratamento explícito

- Nenhum teste comportamental foi executado; a nota cobre somente maturidade documental.

## Patrimônio legado aproveitável sob validação

- Nenhum conteúdo exclusivo indispensável identificado; os trechos úteis do legado estão incorporados, reescritos ou arquivados no canônico.

## Cenários mínimos de avaliação

- Sem Search Console; local sem loja; Ads fora do escopo; schema inelegível; atribuição; roteamento com geo/seo-tecnico/anuncio-google.

## Registro mínimo de evidência

Para cada avaliação, registrar: `case_id`, prompt, modelo e versão, ferramentas disponíveis, artefatos/trace, resultado observado, critérios objetivos, falha e decisão. Um cenário descrito sem execução permanece `proposto`.

## Gate de saída

A entrega deve separar `proposto`, `escrito`, `validado` e `executado`; citar a origem de fatos externos; indicar testes realmente rodados; e recusar qualquer etapa destrutiva, externa ou privilegiada sem autorização suficiente.
