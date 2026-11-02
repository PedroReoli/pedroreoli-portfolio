# Portões de qualidade e avaliação — v1

Origem: auditoria manual semântica de 2026-10-09, lote B; nota documental de base 57.5/100. Este arquivo converte achados em instruções normativas, mas **não declara avaliação comportamental executada**.

## Correções obrigatórias antes da entrega

- Substituir o exemplo por stdin/interativo e nunca mostrar valor com prefixo de chave realista.
- Verificar ou remover afirmações locais sobre workflows do ReoliOS; mover operações destrutivas para fluxo com confirmação.

## Padrões proibidos e conflitos a evitar

- material_active_contradiction
- unsafe_instruction_without_guardrail
- Guardrail 6 contradiz diretamente o comando de segredo inline na seção GitHub CLI.

## Riscos que exigem tratamento explícito

- Nenhum teste comportamental foi executado; a nota cobre somente maturidade documental.

## Patrimônio legado aproveitável sob validação

- Nenhum conteúdo exclusivo indispensável identificado; os trechos úteis do legado estão incorporados, reescritos ou arquivados no canônico.

## Cenários mínimos de avaliação

- Auth ausente; branch protegida; push/release autorizado; segredo sem eco; repo não Git.

## Registro mínimo de evidência

Para cada avaliação, registrar: `case_id`, prompt, modelo e versão, ferramentas disponíveis, artefatos/trace, resultado observado, critérios objetivos, falha e decisão. Um cenário descrito sem execução permanece `proposto`.

## Gate de saída

A entrega deve separar `proposto`, `escrito`, `validado` e `executado`; citar a origem de fatos externos; indicar testes realmente rodados; e recusar qualquer etapa destrutiva, externa ou privilegiada sem autorização suficiente.
