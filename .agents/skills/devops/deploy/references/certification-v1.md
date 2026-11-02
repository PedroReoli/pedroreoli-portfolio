# Portões de qualidade e avaliação — v1

Origem: auditoria manual semântica de 2026-10-09, lote B; nota documental de base 92.5/100. Este arquivo converte achados em instruções normativas, mas **não declara avaliação comportamental executada**.

## Correções obrigatórias antes da entrega

- Separar receitas por provider em referências versionadas.
- Adicionar validação automatizada do Dockerfile de referência com fixture dist/server.js.

## Padrões proibidos e conflitos a evitar

- Não foram registrados bloqueios; ainda assim, não simule acesso, execução, validação ou publicação.

## Riscos que exigem tratamento explícito

- Nenhum teste comportamental foi executado; a nota cobre somente maturidade documental.

## Patrimônio legado aproveitável sob validação

- A cópia antiga detalha Fly.io, AWS ECS e Nginx; preservar apenas como backlog para referências por provider após revalidação.

## Cenários mínimos de avaliação

- Build/start real; readiness 503 com DB off; segredo ausente; CORS; rollback descartável.

## Registro mínimo de evidência

Para cada avaliação, registrar: `case_id`, prompt, modelo e versão, ferramentas disponíveis, artefatos/trace, resultado observado, critérios objetivos, falha e decisão. Um cenário descrito sem execução permanece `proposto`.

## Gate de saída

A entrega deve separar `proposto`, `escrito`, `validado` e `executado`; citar a origem de fatos externos; indicar testes realmente rodados; e recusar qualquer etapa destrutiva, externa ou privilegiada sem autorização suficiente.
