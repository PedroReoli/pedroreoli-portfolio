# Portões de qualidade e avaliação — v1

Origem: auditoria manual semântica de 2026-10-09, lote C; nota documental de base 71.25/100. Este arquivo converte achados em instruções normativas, mas **não declara avaliação comportamental executada**.

## Correções obrigatórias antes da entrega

- Adicionar referências progressivas com schema de eval, benchmark e revisão; alinhar ao processo completo da skill-creator oficial.

## Padrões proibidos e conflitos a evitar

- Não foram registrados bloqueios; ainda assim, não simule acesso, execução, validação ou publicação.

## Riscos que exigem tratamento explícito

- Pode produzir skill estruturalmente válida sem comportamento comprovado se o Passo 4 for interpretado como suficiente.

## Patrimônio legado aproveitável sob validação

- Não há conteúdo exclusivo do legado recomendado para reintegração.

## Cenários mínimos de avaliação

- Criar evals should/should-not-trigger, rodar baseline/with-skill, registrar custo/latência e revisão independente.

## Registro mínimo de evidência

Para cada avaliação, registrar: `case_id`, prompt, modelo e versão, ferramentas disponíveis, artefatos/trace, resultado observado, critérios objetivos, falha e decisão. Um cenário descrito sem execução permanece `proposto`.

## Gate de saída

A entrega deve separar `proposto`, `escrito`, `validado` e `executado`; citar a origem de fatos externos; indicar testes realmente rodados; e recusar qualquer etapa destrutiva, externa ou privilegiada sem autorização suficiente.
