# Portões de qualidade e avaliação — v1

Origem: auditoria manual semântica de 2026-10-09, lote A; nota documental de base 66.25/100. Este arquivo converte achados em instruções normativas, mas **não declara avaliação comportamental executada**.

## Correções obrigatórias antes da entrega

- Remover dependência obrigatória de fornecedor ou definir fallback explícito.
- Mover scaffolds por stack/library para references condicionais.
- Trocar componentização máxima por coesão e uso real.

## Padrões proibidos e conflitos a evitar

- Contrato diz conferir package.json e não inventar libs; legado manda escolher/instalar shadcn ou Base UI.
- Contrato privilegia comportamento real; legado força frontend-design do Claude Code em agentes onde pode não existir.

## Riscos que exigem tratamento explícito

- Declare limitações, efeitos colaterais, autorização necessária e plano de recuperação aplicável.

## Patrimônio legado aproveitável sob validação

- Nenhum conteúdo útil exclusivo; scaffolds e comparativo de libraries permanecem inline, mas precisam ser tornados condicionais.

## Cenários mínimos de avaliação

- render desktop/mobile
- keyboard/focus
- 401/403 e erro de rede
- build/lint/test real

## Registro mínimo de evidência

Para cada avaliação, registrar: `case_id`, prompt, modelo e versão, ferramentas disponíveis, artefatos/trace, resultado observado, critérios objetivos, falha e decisão. Um cenário descrito sem execução permanece `proposto`.

## Gate de saída

A entrega deve separar `proposto`, `escrito`, `validado` e `executado`; citar a origem de fatos externos; indicar testes realmente rodados; e recusar qualquer etapa destrutiva, externa ou privilegiada sem autorização suficiente.
