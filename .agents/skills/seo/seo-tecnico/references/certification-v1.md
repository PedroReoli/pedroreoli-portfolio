# Portões de qualidade e avaliação — v1

Origem: auditoria manual semântica de 2026-10-09, lote C; nota documental de base 92.5/100. Este arquivo converte achados em instruções normativas, mas **não declara avaliação comportamental executada**.

## Correções obrigatórias antes da entrega

- Mover checklist revisado para reference e incluir validação automatizada dos snippets Next.js em versão alvo.

## Padrões proibidos e conflitos a evitar

- Não foram registrados bloqueios; ainda assim, não simule acesso, execução, validação ou publicação.

## Riscos que exigem tratamento explícito

- APIs de framework e políticas de rich results podem mudar.

## Patrimônio legado aproveitável sob validação

- Checklist amplo de SEO técnico e exemplos de hreflang/redirect podem ser reaproveitados após revisão; snippets antigos contêm dados fictícios e erros.

## Cenários mínimos de avaliação

- Compilar snippets em Next.js alvo; testar robots/sitemap via HTTP e schema em fixture, inclusive rotas privadas.

## Registro mínimo de evidência

Para cada avaliação, registrar: `case_id`, prompt, modelo e versão, ferramentas disponíveis, artefatos/trace, resultado observado, critérios objetivos, falha e decisão. Um cenário descrito sem execução permanece `proposto`.

## Gate de saída

A entrega deve separar `proposto`, `escrito`, `validado` e `executado`; citar a origem de fatos externos; indicar testes realmente rodados; e recusar qualquer etapa destrutiva, externa ou privilegiada sem autorização suficiente.
