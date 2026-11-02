# Portões de qualidade e avaliação — v1

Origem: auditoria manual semântica de 2026-10-09, lote A; nota documental de base 91.25/100. Este arquivo converte achados em instruções normativas, mas **não declara avaliação comportamental executada**.

## Correções obrigatórias antes da entrega

- Restringir description a modelagem/schema/migrations Prisma.
- Adicionar fallback explícito para ORM/DB não Prisma.

## Padrões proibidos e conflitos a evitar

- clearly_inappropriate_trigger: A palavra isolada “database” e alias /db podem acionar modelar-db para consulta, troubleshooting ou operação de banco que não envolve modelagem.

## Riscos que exigem tratamento explícito

- Declare limitações, efeitos colaterais, autorização necessária e plano de recuperação aplicável.

## Patrimônio legado aproveitável sob validação

- Conteúdo útil só na cópia antiga: questionário visual de entidades e um catálogo maior de relações podem virar reference; schema/seed com password placeholder e defaults universais não devem voltar.

## Cenários mínimos de avaliação

- prisma validate em v7
- migration expand-contract em DB isolado
- concorrência de unique por tenant

## Registro mínimo de evidência

Para cada avaliação, registrar: `case_id`, prompt, modelo e versão, ferramentas disponíveis, artefatos/trace, resultado observado, critérios objetivos, falha e decisão. Um cenário descrito sem execução permanece `proposto`.

## Gate de saída

A entrega deve separar `proposto`, `escrito`, `validado` e `executado`; citar a origem de fatos externos; indicar testes realmente rodados; e recusar qualquer etapa destrutiva, externa ou privilegiada sem autorização suficiente.
