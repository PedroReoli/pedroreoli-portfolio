# Portões de qualidade e avaliação — v1

Origem: auditoria manual semântica de 2026-10-09, lote B; nota documental de base 65/100. Este arquivo converte achados em instruções normativas, mas **não declara avaliação comportamental executada**.

## Correções obrigatórias antes da entrega

- Corrigir o caminho da skill carrossel e validar todos os paths relativos a partir da raiz ReoliOS.
- Tornar blog/carrossel/legendas modos opcionais conforme pedido, em vez de gerar todos sem perguntar.
- Separar roteiros por canal em referências.

## Padrões proibidos e conflitos a evitar

- missing_required_dependency_without_fallback
- Contrato pede canais autorizados; corpo ordena criar carrossel `sem perguntar` e três legendas.

## Riscos que exigem tratamento explícito

- Nenhum teste comportamental foi executado; a nota cobre somente maturidade documental.

## Patrimônio legado aproveitável sob validação

- Nenhum conteúdo exclusivo indispensável identificado; os trechos úteis do legado estão incorporados, reescritos ou arquivados no canônico.

## Cenários mínimos de avaliação

- Tema sem pesquisa; caminho de blog ausente; dependência carrossel; draft preservado; publicação não autorizada.

## Registro mínimo de evidência

Para cada avaliação, registrar: `case_id`, prompt, modelo e versão, ferramentas disponíveis, artefatos/trace, resultado observado, critérios objetivos, falha e decisão. Um cenário descrito sem execução permanece `proposto`.

## Gate de saída

A entrega deve separar `proposto`, `escrito`, `validado` e `executado`; citar a origem de fatos externos; indicar testes realmente rodados; e recusar qualquer etapa destrutiva, externa ou privilegiada sem autorização suficiente.
