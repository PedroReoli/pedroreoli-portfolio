# Portões de qualidade e avaliação — v1

Origem: auditoria manual semântica de 2026-10-09, lote A; nota documental de base 91.25/100. Este arquivo converte achados em instruções normativas, mas **não declara avaliação comportamental executada**.

## Correções obrigatórias antes da entrega

- Restringir gatilhos a webhook/event delivery.
- Adicionar vetores oficiais e teste executável do verificador GitHub.

## Padrões proibidos e conflitos a evitar

- clearly_inappropriate_trigger: “integrar API” e “/integrar” roteiam integrações síncronas genéricas para uma skill de webhook.

## Riscos que exigem tratamento explícito

- Declare limitações, efeitos colaterais, autorização necessária e plano de recuperação aplicável.

## Patrimônio legado aproveitável sob validação

- Conteúdo útil só na cópia antiga: árvore de arquivos e checklist entrada/saída são reaproveitáveis; verificadores Stripe/Meta genéricos e retries em memória devem permanecer descartados.

## Cenários mínimos de avaliação

- vetor HMAC oficial
- duas entregas simultâneas
- DB indisponível sem 200
- DNS rebinding/redirect

## Registro mínimo de evidência

Para cada avaliação, registrar: `case_id`, prompt, modelo e versão, ferramentas disponíveis, artefatos/trace, resultado observado, critérios objetivos, falha e decisão. Um cenário descrito sem execução permanece `proposto`.

## Gate de saída

A entrega deve separar `proposto`, `escrito`, `validado` e `executado`; citar a origem de fatos externos; indicar testes realmente rodados; e recusar qualquer etapa destrutiva, externa ou privilegiada sem autorização suficiente.
