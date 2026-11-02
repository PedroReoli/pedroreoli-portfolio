# Portões de qualidade e avaliação — v1

Origem: auditoria manual semântica de 2026-10-09, lote C; nota documental de base 61.25/100. Este arquivo converte achados em instruções normativas, mas **não declara avaliação comportamental executada**.

## Correções obrigatórias antes da entrega

- Criar/restaurar templates/perfis ou fallback documentado; substituir overwrite por merge/diff; implementar dry-run, backup, rollback e comandos por SO.

## Padrões proibidos e conflitos a evitar

- missing_required_dependency_without_fallback
- Contrato exige não sobrescrever memórias silenciosamente; corpo manda sobrescrever CLAUDE.md após selecionar template.

## Riscos que exigem tratamento explícito

- Dependência ReoliOS/templates/perfis não existe; execução não consegue cumprir a seleção de perfil.

## Patrimônio legado aproveitável sob validação

- Não há conteúdo exclusivo do legado recomendado para reintegração.

## Cenários mínimos de avaliação

- Testar instalação limpa, segunda instalação, arquivo alterado, falta de permissão e rollback em Windows/macOS/Linux conforme alegação.

## Registro mínimo de evidência

Para cada avaliação, registrar: `case_id`, prompt, modelo e versão, ferramentas disponíveis, artefatos/trace, resultado observado, critérios objetivos, falha e decisão. Um cenário descrito sem execução permanece `proposto`.

## Gate de saída

A entrega deve separar `proposto`, `escrito`, `validado` e `executado`; citar a origem de fatos externos; indicar testes realmente rodados; e recusar qualquer etapa destrutiva, externa ou privilegiada sem autorização suficiente.
