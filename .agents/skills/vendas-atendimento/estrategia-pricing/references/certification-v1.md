# Portões de qualidade e avaliação — v1

Origem: auditoria manual semântica de 2026-10-09, lote C; nota documental de base 67.5/100. Este arquivo converte achados em instruções normativas, mas **não declara avaliação comportamental executada**.

## Correções obrigatórias antes da entrega

- Prompt estruturado de inputs, hierarquia da página e FAQ do legado podem virar template de saída.

## Padrões proibidos e conflitos a evitar

- Há sobreposição forte com viral-pricing e precificacao sem contrato explícito de roteamento.

## Riscos que exigem tratamento explícito

- Título "Copy para Tela de Pricing" não corresponde à missão mais ampla de estratégia de preço; alinhar nome/escopo.

## Patrimônio legado aproveitável sob validação

- Não há conteúdo exclusivo do legado recomendado para reintegração.

## Cenários mínimos de avaliação

- Executar casos C01–C03, cenário sem ferramentas e near-miss de roteamento; registrar modelo, versão, ferramentas, prompt, saída e falha.
- Comparar saída com e sem skill; os casos atuais são apenas propostos.

## Registro mínimo de evidência

Para cada avaliação, registrar: `case_id`, prompt, modelo e versão, ferramentas disponíveis, artefatos/trace, resultado observado, critérios objetivos, falha e decisão. Um cenário descrito sem execução permanece `proposto`.

## Gate de saída

A entrega deve separar `proposto`, `escrito`, `validado` e `executado`; citar a origem de fatos externos; indicar testes realmente rodados; e recusar qualquer etapa destrutiva, externa ou privilegiada sem autorização suficiente.
