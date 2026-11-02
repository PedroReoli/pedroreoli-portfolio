# Portões de qualidade e avaliação — v1

Origem: auditoria manual semântica de 2026-10-09, lote C; nota documental de base 40/100. Este arquivo converte achados em instruções normativas, mas **não declara avaliação comportamental executada**.

## Correções obrigatórias antes da entrega

- Gerar catálogo a partir do router, substituir quick start placeholder por comandos comprovados, remover compatibilidade universal e alinhar narrativa multiagente.

## Padrões proibidos e conflitos a evitar

- material_active_contradiction
- Contrato diz não inventar suporte e usar catálogo atual; FAQ afirma qualquer SO e tabelas históricas são apresentadas como "Todas as Skills".

## Riscos que exigem tratamento explícito

- Novos usuários podem seguir comando inexistente ou confiar em cobertura de skills desatualizada.

## Patrimônio legado aproveitável sob validação

- Não há conteúdo exclusivo do legado recomendado para reintegração.

## Cenários mínimos de avaliação

- Validar instalação/uso em cada SO/agente alegado; testar todos os comandos/aliases exibidos e links de suporte.

## Registro mínimo de evidência

Para cada avaliação, registrar: `case_id`, prompt, modelo e versão, ferramentas disponíveis, artefatos/trace, resultado observado, critérios objetivos, falha e decisão. Um cenário descrito sem execução permanece `proposto`.

## Gate de saída

A entrega deve separar `proposto`, `escrito`, `validado` e `executado`; citar a origem de fatos externos; indicar testes realmente rodados; e recusar qualquer etapa destrutiva, externa ou privilegiada sem autorização suficiente.
