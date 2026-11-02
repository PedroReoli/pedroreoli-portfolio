# Portões de qualidade e avaliação — v1

Origem: auditoria manual semântica de 2026-10-09, lote A; nota documental de base 77.5/100. Este arquivo converte achados em instruções normativas, mas **não declara avaliação comportamental executada**.

## Correções obrigatórias antes da entrega

- Mover detalhes de CSV/importação para reference e manter no entrypoint apenas roteamento, autorização e contrato.
- Adicionar exemplo mínimo de CSV por entidade validado em versão nomeada do Editor.

## Padrões proibidos e conflitos a evitar

- Regra histórica de match type e começo pausado é prescritiva; o contrato exige validar conta e versão.
- A pesquisa por WebSearch não substitui volume/CPC da conta, ressalva feita apenas mais adiante.

## Riscos que exigem tratamento explícito

- Declare limitações, efeitos colaterais, autorização necessária e plano de recuperação aplicável.

## Patrimônio legado aproveitável sob validação

- Nenhum conteúdo útil existe exclusivamente na cópia antiga; briefing, estrutura e formato de saída foram mantidos no SKILL atual com ajustes.

## Cenários mínimos de avaliação

- CSV fixture e log de import preview
- caso de política rejeitada e conversão duplicada executados
- teste positivo/negativo de acionamento

## Registro mínimo de evidência

Para cada avaliação, registrar: `case_id`, prompt, modelo e versão, ferramentas disponíveis, artefatos/trace, resultado observado, critérios objetivos, falha e decisão. Um cenário descrito sem execução permanece `proposto`.

## Gate de saída

A entrega deve separar `proposto`, `escrito`, `validado` e `executado`; citar a origem de fatos externos; indicar testes realmente rodados; e recusar qualquer etapa destrutiva, externa ou privilegiada sem autorização suficiente.
