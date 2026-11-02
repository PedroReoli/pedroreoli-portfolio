# Portões de qualidade e avaliação — v1

Origem: auditoria manual semântica de 2026-10-09, lote A; nota documental de base 91.25/100. Este arquivo converte achados em instruções normativas, mas **não declara avaliação comportamental executada**.

## Correções obrigatórias antes da entrega

- Remover newsletter dos gatilhos ou adicionar modo de marketing completo e separado.
- Testar example e documentar renderer seguro para atributos/URLs.

## Padrões proibidos e conflitos a evitar

- clearly_inappropriate_trigger: Frontmatter aciona também por “newsletter”, enquanto objetivo e aceite são transacionais; marketing em massa exige contrato distinto de consentimento, opt-out e reputação.
- Description ampla de newsletter versus objetivo explicitamente transacional.

## Riscos que exigem tratamento explícito

- Declare limitações, efeitos colaterais, autorização necessária e plano de recuperação aplicável.

## Patrimônio legado aproveitável sob validação

- Conteúdo útil só na cópia antiga: catálogo de templates e layout base HTML podem ser reaproveitados após remover ano fixo, escapar placeholders e separar unsubscribe transacional/marketing; os snippets de envio sem validação não devem voltar.

## Cenários mínimos de avaliação

- execução do escapeHtml
- idempotência concorrente
- reset expirado/single-use
- callback assinado

## Registro mínimo de evidência

Para cada avaliação, registrar: `case_id`, prompt, modelo e versão, ferramentas disponíveis, artefatos/trace, resultado observado, critérios objetivos, falha e decisão. Um cenário descrito sem execução permanece `proposto`.

## Gate de saída

A entrega deve separar `proposto`, `escrito`, `validado` e `executado`; citar a origem de fatos externos; indicar testes realmente rodados; e recusar qualquer etapa destrutiva, externa ou privilegiada sem autorização suficiente.
