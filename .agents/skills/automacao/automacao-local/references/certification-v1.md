# Portões de qualidade e avaliação — v1

Origem: auditoria manual semântica de 2026-10-09, lote A; nota documental de base 77.5/100. Este arquivo converte achados em instruções normativas, mas **não declara avaliação comportamental executada**.

## Correções obrigatórias antes da entrega

- Adicionar exemplos versionados de Task Scheduler, cron e launchd apenas em references sob demanda.
- Definir formato de log e prova de rollback.

## Padrões proibidos e conflitos a evitar

- Não foram registrados bloqueios; ainda assim, não simule acesso, execução, validação ou publicação.

## Riscos que exigem tratamento explícito

- Declare limitações, efeitos colaterais, autorização necessária e plano de recuperação aplicável.

## Patrimônio legado aproveitável sob validação

- Nenhum conteúdo útil exclusivo: a cópia antiga foi preservada integralmente em references/guia-legado-20261008.md.

## Cenários mínimos de avaliação

- execução manual e agendada em sandbox
- concorrência/idempotência
- reinício e desativação

## Registro mínimo de evidência

Para cada avaliação, registrar: `case_id`, prompt, modelo e versão, ferramentas disponíveis, artefatos/trace, resultado observado, critérios objetivos, falha e decisão. Um cenário descrito sem execução permanece `proposto`.

## Gate de saída

A entrega deve separar `proposto`, `escrito`, `validado` e `executado`; citar a origem de fatos externos; indicar testes realmente rodados; e recusar qualquer etapa destrutiva, externa ou privilegiada sem autorização suficiente.
