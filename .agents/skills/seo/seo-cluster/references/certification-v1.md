# Portões de qualidade e avaliação — v1

Origem: auditoria manual semântica de 2026-10-09, lote C; nota documental de base 71.25/100. Este arquivo converte achados em instruções normativas, mas **não declara avaliação comportamental executada**.

## Correções obrigatórias antes da entrega

- Fundir as duas camadas e acrescentar matriz de canibalização com evidência/decisão.

## Padrões proibidos e conflitos a evitar

- Não foram registrados bloqueios; ainda assim, não simule acesso, execução, validação ou publicação.

## Riscos que exigem tratamento explícito

- Sem execução, o número e a forma dos spokes podem continuar arbitrários.

## Patrimônio legado aproveitável sob validação

- Não há conteúdo exclusivo do legado recomendado para reintegração.

## Cenários mínimos de avaliação

- Testar site fixture com duas páginas sobrepostas, 404 interno e ausência de volume; medir precisão do roteamento.

## Registro mínimo de evidência

Para cada avaliação, registrar: `case_id`, prompt, modelo e versão, ferramentas disponíveis, artefatos/trace, resultado observado, critérios objetivos, falha e decisão. Um cenário descrito sem execução permanece `proposto`.

## Gate de saída

A entrega deve separar `proposto`, `escrito`, `validado` e `executado`; citar a origem de fatos externos; indicar testes realmente rodados; e recusar qualquer etapa destrutiva, externa ou privilegiada sem autorização suficiente.
