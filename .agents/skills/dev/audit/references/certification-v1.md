# Portões de qualidade e avaliação — v1

Origem: auditoria manual semântica de 2026-10-09, lote A; nota documental de base 70/100. Este arquivo converte achados em instruções normativas, mas **não declara avaliação comportamental executada**.

## Correções obrigatórias antes da entrega

- Restringir gatilhos a auditoria de segurança/pentest autorizado.
- Mover checks dinâmicos para reference com confirmação de alvo, ambiente e safe test plan.

## Padrões proibidos e conflitos a evitar

- clearly_inappropriate_trigger: “testar API” no frontmatter roteia testes funcionais/contratuais comuns para uma auditoria de vulnerabilidades com exemplos de ataque.
- Contrato proíbe pentest não autorizado; legado manda tentar SQLi/XSS/curl “se possível”.
- Contrato pede evidência; legado exige analisar TODO e reportar SEMPRE sem definir cobertura observável.

## Riscos que exigem tratamento explícito

- Declare limitações, efeitos colaterais, autorização necessária e plano de recuperação aplicável.

## Patrimônio legado aproveitável sob validação

- Nenhum conteúdo útil exclusivo; checklist e formato de relatório permanecem inline, embora partes devam ser reescritas por segurança.

## Cenários mínimos de avaliação

- fixture local vulnerável
- falso positivo de segredo
- tenant cruzado
- cobertura do inventário

## Registro mínimo de evidência

Para cada avaliação, registrar: `case_id`, prompt, modelo e versão, ferramentas disponíveis, artefatos/trace, resultado observado, critérios objetivos, falha e decisão. Um cenário descrito sem execução permanece `proposto`.

## Gate de saída

A entrega deve separar `proposto`, `escrito`, `validado` e `executado`; citar a origem de fatos externos; indicar testes realmente rodados; e recusar qualquer etapa destrutiva, externa ou privilegiada sem autorização suficiente.
