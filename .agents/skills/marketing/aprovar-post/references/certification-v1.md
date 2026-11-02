# Portões de qualidade e avaliação — v1

Origem: auditoria manual semântica de 2026-10-09, lote B; nota documental de base 62.5/100. Este arquivo converte achados em instruções normativas, mas **não declara avaliação comportamental executada**.

## Correções obrigatórias antes da entrega

- Corrigir caminhos para scripts reais ou empacotá-los com a skill; criar/indicar guia de setup existente.
- Separar aprovação editorial de autorização para commit, push, deploy e postagem por canal.
- Definir transação/compensação para publicação parcial.

## Padrões proibidos e conflitos a evitar

- missing_required_dependency_without_fallback
- O Passo 5 executa commit e push após `Confirma publicação?`, sem consentimento separado para efeitos Git/deploy.

## Riscos que exigem tratamento explícito

- Nenhum teste comportamental foi executado; a nota cobre somente maturidade documental.

## Patrimônio legado aproveitável sob validação

- Nenhum conteúdo exclusivo indispensável identificado; os trechos úteis do legado estão incorporados, reescritos ou arquivados no canônico.

## Cenários mínimos de avaliação

- Dry-run; 429; timeout deploy; idempotência; canal parcial; branch protegida; paths reais.

## Registro mínimo de evidência

Para cada avaliação, registrar: `case_id`, prompt, modelo e versão, ferramentas disponíveis, artefatos/trace, resultado observado, critérios objetivos, falha e decisão. Um cenário descrito sem execução permanece `proposto`.

## Gate de saída

A entrega deve separar `proposto`, `escrito`, `validado` e `executado`; citar a origem de fatos externos; indicar testes realmente rodados; e recusar qualquer etapa destrutiva, externa ou privilegiada sem autorização suficiente.
