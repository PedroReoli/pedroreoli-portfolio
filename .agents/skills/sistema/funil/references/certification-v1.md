# Portões de qualidade e avaliação — v1

Origem: auditoria manual semântica de 2026-10-09, lote C; nota documental de base 71.25/100. Este arquivo converte achados em instruções normativas, mas **não declara avaliação comportamental executada**.

## Correções obrigatórias antes da entrega

- Consolidar em um fluxo único; tornar cadência dependente de consentimento/canal e corrigir caminho _memoria versus sistema/memoria.

## Padrões proibidos e conflitos a evitar

- Contrato evita regras universais; corpo histórico fixa sequência D+0 a D+10.

## Riscos que exigem tratamento explícito

- Cadência fixa pode ser aplicada fora de contexto e política do canal.

## Patrimônio legado aproveitável sob validação

- Não há conteúdo exclusivo do legado recomendado para reintegração.

## Cenários mínimos de avaliação

- Executar dataset com duplicatas e coortes; testar roteamento contra funil-experimentos/comercial e cenário sem CRM.

## Registro mínimo de evidência

Para cada avaliação, registrar: `case_id`, prompt, modelo e versão, ferramentas disponíveis, artefatos/trace, resultado observado, critérios objetivos, falha e decisão. Um cenário descrito sem execução permanece `proposto`.

## Gate de saída

A entrega deve separar `proposto`, `escrito`, `validado` e `executado`; citar a origem de fatos externos; indicar testes realmente rodados; e recusar qualquer etapa destrutiva, externa ou privilegiada sem autorização suficiente.
