# Portões de qualidade e avaliação — v1

Origem: auditoria manual semântica de 2026-10-09, lote B; nota documental de base 71.25/100. Este arquivo converte achados em instruções normativas, mas **não declara avaliação comportamental executada**.

## Correções obrigatórias antes da entrega

- Mover templates e exemplos para reference e rotular todos os valores como fictícios.
- Adicionar checagem de artefato/tag e exemplo de breaking change com migração.

## Padrões proibidos e conflitos a evitar

- Não foram registrados bloqueios; ainda assim, não simule acesso, execução, validação ou publicação.

## Riscos que exigem tratamento explícito

- Nenhum teste comportamental foi executado; a nota cobre somente maturidade documental.

## Patrimônio legado aproveitável sob validação

- Nenhum conteúdo exclusivo indispensável identificado; os trechos úteis do legado estão incorporados, reescritos ou arquivados no canônico.

## Cenários mínimos de avaliação

- Commit não implantado; breaking change; repositório inacessível; notas técnica e de usuário.

## Registro mínimo de evidência

Para cada avaliação, registrar: `case_id`, prompt, modelo e versão, ferramentas disponíveis, artefatos/trace, resultado observado, critérios objetivos, falha e decisão. Um cenário descrito sem execução permanece `proposto`.

## Gate de saída

A entrega deve separar `proposto`, `escrito`, `validado` e `executado`; citar a origem de fatos externos; indicar testes realmente rodados; e recusar qualquer etapa destrutiva, externa ou privilegiada sem autorização suficiente.
