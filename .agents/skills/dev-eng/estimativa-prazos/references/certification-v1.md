# Portões de qualidade e avaliação — v1

Origem: auditoria manual semântica de 2026-10-09, lote B; nota documental de base 65/100. Este arquivo converte achados em instruções normativas, mas **não declara avaliação comportamental executada**.

## Correções obrigatórias antes da entrega

- Trocar buffer fixo por intervalo calibrado ou hipótese explicitamente marcada.
- Adicionar exemplo numérico completo com P50/P80 ou três pontos e erro posterior.

## Padrões proibidos e conflitos a evitar

- O contrato pede contingência conforme histórico, mas a saída antiga ainda ordena 25–40%.

## Riscos que exigem tratamento explícito

- Nenhum teste comportamental foi executado; a nota cobre somente maturidade documental.

## Patrimônio legado aproveitável sob validação

- Nenhum conteúdo exclusivo indispensável identificado; os trechos úteis do legado estão incorporados, reescritos ou arquivados no canônico.

## Cenários mínimos de avaliação

- Dependência sem prazo; capacidade parcial; sem histórico; recalibração após descoberta.

## Registro mínimo de evidência

Para cada avaliação, registrar: `case_id`, prompt, modelo e versão, ferramentas disponíveis, artefatos/trace, resultado observado, critérios objetivos, falha e decisão. Um cenário descrito sem execução permanece `proposto`.

## Gate de saída

A entrega deve separar `proposto`, `escrito`, `validado` e `executado`; citar a origem de fatos externos; indicar testes realmente rodados; e recusar qualquer etapa destrutiva, externa ou privilegiada sem autorização suficiente.
