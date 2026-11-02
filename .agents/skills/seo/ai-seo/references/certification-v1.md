# Portões de qualidade e avaliação — v1

Origem: auditoria manual semântica de 2026-10-09, lote C; nota documental de base 67.5/100. Este arquivo converte achados em instruções normativas, mas **não declara avaliação comportamental executada**.

## Correções obrigatórias antes da entrega

- Remover/rotular a faixa R$25–60 mil, reescrever claims sobre o que modelos citam e consolidar contrato+legado em um fluxo único.

## Padrões proibidos e conflitos a evitar

- Contrato veda números inventados, enquanto exemplo histórico usa faixa monetária sem origem.

## Riscos que exigem tratamento explícito

- Exemplo numérico sem fonte pode gerar claim falso; comportamento de motores de resposta muda rapidamente.

## Patrimônio legado aproveitável sob validação

- Não há conteúdo exclusivo do legado recomendado para reintegração.

## Cenários mínimos de avaliação

- Executar queries reproduzíveis em plataformas realmente disponíveis, com logs, variação de prompts e schema/HTML fixture divergente.

## Registro mínimo de evidência

Para cada avaliação, registrar: `case_id`, prompt, modelo e versão, ferramentas disponíveis, artefatos/trace, resultado observado, critérios objetivos, falha e decisão. Um cenário descrito sem execução permanece `proposto`.

## Gate de saída

A entrega deve separar `proposto`, `escrito`, `validado` e `executado`; citar a origem de fatos externos; indicar testes realmente rodados; e recusar qualquer etapa destrutiva, externa ou privilegiada sem autorização suficiente.
