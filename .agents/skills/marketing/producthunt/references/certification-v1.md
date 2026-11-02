# Portões de qualidade e avaliação — v1

Origem: auditoria manual semântica de 2026-10-09, lote B; nota documental de base 57.5/100. Este arquivo converte achados em instruções normativas, mas **não declara avaliação comportamental executada**.

## Correções obrigatórias antes da entrega

- Remover horários e claims algorítmicos fixos; buscar e registrar regra vigente no help oficial por execução.
- Trocar meta `Top 5` na description por objetivo de lançamento sem promessa.
- Condicionar dimensões, limites de tagline e assets à interface atual.

## Padrões proibidos e conflitos a evitar

- material_active_contradiction
- fabricated_source_or_claim
- O contrato e o corpo se contradizem diretamente sobre timezone e relevância das primeiras quatro horas.

## Riscos que exigem tratamento explícito

- Nenhum teste comportamental foi executado; a nota cobre somente maturidade documental.

## Patrimônio legado aproveitável sob validação

- Nenhum conteúdo exclusivo indispensável identificado; os trechos úteis do legado estão incorporados, reescritos ou arquivados no canônico.

## Cenários mínimos de avaliação

- Data em PST/PDT; demo fora do ar; pedido de voto automatizado; regra de submissão mudou; sem acesso web.

## Registro mínimo de evidência

Para cada avaliação, registrar: `case_id`, prompt, modelo e versão, ferramentas disponíveis, artefatos/trace, resultado observado, critérios objetivos, falha e decisão. Um cenário descrito sem execução permanece `proposto`.

## Gate de saída

A entrega deve separar `proposto`, `escrito`, `validado` e `executado`; citar a origem de fatos externos; indicar testes realmente rodados; e recusar qualquer etapa destrutiva, externa ou privilegiada sem autorização suficiente.
