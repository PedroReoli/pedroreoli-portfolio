# Portões de qualidade e avaliação — v1

Origem: auditoria manual semântica de 2026-10-09, lote A; nota documental de base 71.25/100. Este arquivo converte achados em instruções normativas, mas **não declara avaliação comportamental executada**.

## Correções obrigatórias antes da entrega

- Tornar a description mais discriminante entre blueprint, n8n-workflow-gen e automação genérica.
- Adicionar matriz comparativa verificável de custo/limites por data.

## Padrões proibidos e conflitos a evitar

- Não foram registrados bloqueios; ainda assim, não simule acesso, execução, validação ou publicação.

## Riscos que exigem tratamento explícito

- Declare limitações, efeitos colaterais, autorização necessária e plano de recuperação aplicável.

## Patrimônio legado aproveitável sob validação

- O blueprint detalhado é útil, mas não é exclusivo da cópia antiga: está arquivado e corrigido em references/guia-legado-20261008.md.

## Cenários mínimos de avaliação

- payload duplicado
- credencial expirada
- conector ausente
- teste com/sem skill

## Registro mínimo de evidência

Para cada avaliação, registrar: `case_id`, prompt, modelo e versão, ferramentas disponíveis, artefatos/trace, resultado observado, critérios objetivos, falha e decisão. Um cenário descrito sem execução permanece `proposto`.

## Gate de saída

A entrega deve separar `proposto`, `escrito`, `validado` e `executado`; citar a origem de fatos externos; indicar testes realmente rodados; e recusar qualquer etapa destrutiva, externa ou privilegiada sem autorização suficiente.
