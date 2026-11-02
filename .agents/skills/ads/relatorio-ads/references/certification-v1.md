# Portões de qualidade e avaliação — v1

Origem: auditoria manual semântica de 2026-10-09, lote A; nota documental de base 77.5/100. Este arquivo converte achados em instruções normativas, mas **não declara avaliação comportamental executada**.

## Correções obrigatórias antes da entrega

- Substituir limiares do quadro por campos configuráveis e exemplo de baseline.
- Definir fórmula e estado n/d para todos os KPIs e variações.

## Padrões proibidos e conflitos a evitar

- Tabela histórica sugere frequência >3, CTR -30% e conversão <1% como alertas, enquanto contrato diz que limiar fixo não prova saturação.

## Riscos que exigem tratamento explícito

- Declare limitações, efeitos colaterais, autorização necessária e plano de recuperação aplicável.

## Patrimônio legado aproveitável sob validação

- Nenhum conteúdo útil exclusivamente antigo; template, frontmatter e alertas continuam inline no atual.

## Cenários mínimos de avaliação

- fixture Google e Meta com moeda/timezone
- teste de dupla atribuição
- recalculo independente de CTR/CPC/CPA/ROAS

## Registro mínimo de evidência

Para cada avaliação, registrar: `case_id`, prompt, modelo e versão, ferramentas disponíveis, artefatos/trace, resultado observado, critérios objetivos, falha e decisão. Um cenário descrito sem execução permanece `proposto`.

## Gate de saída

A entrega deve separar `proposto`, `escrito`, `validado` e `executado`; citar a origem de fatos externos; indicar testes realmente rodados; e recusar qualquer etapa destrutiva, externa ou privilegiada sem autorização suficiente.
