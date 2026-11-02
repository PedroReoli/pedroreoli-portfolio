# Portões de qualidade e avaliação — v1

Origem: auditoria manual semântica de 2026-10-09, lote C; nota documental de base 63.75/100. Este arquivo converte achados em instruções normativas, mas **não declara avaliação comportamental executada**.

## Correções obrigatórias antes da entrega

- Integrar um template de estado de projeto sem impor sprint de uma semana ou tarefas de 1–4h como universais.

## Padrões proibidos e conflitos a evitar

- Não foram registrados bloqueios; ainda assim, não simule acesso, execução, validação ou publicação.

## Riscos que exigem tratamento explícito

- Name/alias "projeto" e frase "pedido de projeto" têm alta sobreposição com novo-projeto, abrir e tarefas genéricas.

## Patrimônio legado aproveitável sob validação

- Template tarefas.md com tarefas atômicas, responsáveis, prazos, sprint/backlog e formato de status.

## Cenários mínimos de avaliação

- Executar casos C01–C03, cenário sem ferramentas e near-miss de roteamento; registrar modelo, versão, ferramentas, prompt, saída e falha.
- Comparar saída com e sem skill; os casos atuais são apenas propostos.

## Registro mínimo de evidência

Para cada avaliação, registrar: `case_id`, prompt, modelo e versão, ferramentas disponíveis, artefatos/trace, resultado observado, critérios objetivos, falha e decisão. Um cenário descrito sem execução permanece `proposto`.

## Gate de saída

A entrega deve separar `proposto`, `escrito`, `validado` e `executado`; citar a origem de fatos externos; indicar testes realmente rodados; e recusar qualquer etapa destrutiva, externa ou privilegiada sem autorização suficiente.
