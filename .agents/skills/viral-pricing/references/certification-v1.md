# Portões de qualidade e avaliação — v1

Origem: auditoria manual semântica de 2026-10-09, lote C; nota documental de base 67.5/100. Este arquivo converte achados em instruções normativas, mas **não declara avaliação comportamental executada**.

## Correções obrigatórias antes da entrega

- Alinhar com estrategia-pricing e remover atribuição não rastreada; adicionar exemplo numérico de COGS/margem e total anual.

## Padrões proibidos e conflitos a evitar

- Não foram registrados bloqueios; ainda assim, não simule acesso, execução, validação ou publicação.

## Riscos que exigem tratamento explícito

- Sobreposição com estrategia-pricing e título "viral" sem critério mensurável.

## Patrimônio legado aproveitável sob validação

- Diagnóstico de custos/valor/concorrência e template de três tiers do legado podem ser aproveitados; regras "sempre/nunca" devem ser descartadas.

## Cenários mínimos de avaliação

- Executar casos C01–C03, cenário sem ferramentas e near-miss de roteamento; registrar modelo, versão, ferramentas, prompt, saída e falha.
- Comparar saída com e sem skill; os casos atuais são apenas propostos.

## Registro mínimo de evidência

Para cada avaliação, registrar: `case_id`, prompt, modelo e versão, ferramentas disponíveis, artefatos/trace, resultado observado, critérios objetivos, falha e decisão. Um cenário descrito sem execução permanece `proposto`.

## Gate de saída

A entrega deve separar `proposto`, `escrito`, `validado` e `executado`; citar a origem de fatos externos; indicar testes realmente rodados; e recusar qualquer etapa destrutiva, externa ou privilegiada sem autorização suficiente.
