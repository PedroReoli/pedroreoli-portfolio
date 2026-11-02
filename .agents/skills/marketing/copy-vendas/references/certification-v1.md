# Portões de qualidade e avaliação — v1

Origem: auditoria manual semântica de 2026-10-09, lote B; nota documental de base 51.25/100. Este arquivo converte achados em instruções normativas, mas **não declara avaliação comportamental executada**.

## Correções obrigatórias antes da entrega

- Remover exemplos de gordura, glúten, indústria farmacêutica, fluência, riqueza e resultados não comprovados.
- Eliminar regra de urgência/escassez obrigatória e revisar todos os exemplos sob a tabela afirmação→fonte.
- Mover frameworks para referências e manter no entrypoint seleção, limites e verificação.

## Padrões proibidos e conflitos a evitar

- unsafe_instruction_without_guardrail
- material_active_contradiction
- Guardrail 4 proíbe garantias/escassez inventadas; checklist exige gatilho de urgência/escassez e exemplos fornecem claims não verificados.

## Riscos que exigem tratamento explícito

- Nenhum teste comportamental foi executado; a nota cobre somente maturidade documental.

## Patrimônio legado aproveitável sob validação

- Nenhum conteúdo exclusivo indispensável identificado; os trechos úteis do legado estão incorporados, reescritos ou arquivados no canônico.

## Cenários mínimos de avaliação

- Oferta sem prova; saúde/finanças; desconto expirado; headlines A/B; preço recorrente; depoimento ausente.

## Registro mínimo de evidência

Para cada avaliação, registrar: `case_id`, prompt, modelo e versão, ferramentas disponíveis, artefatos/trace, resultado observado, critérios objetivos, falha e decisão. Um cenário descrito sem execução permanece `proposto`.

## Gate de saída

A entrega deve separar `proposto`, `escrito`, `validado` e `executado`; citar a origem de fatos externos; indicar testes realmente rodados; e recusar qualquer etapa destrutiva, externa ou privilegiada sem autorização suficiente.
