# Portões de qualidade e avaliação — v1

Origem: auditoria manual semântica de 2026-10-09, lote C; nota documental de base 46.25/100. Este arquivo converte achados em instruções normativas, mas **não declara avaliação comportamental executada**.

## Correções obrigatórias antes da entrega

- Remover o catálogo fictício do corpo normativo; separar modo design-first explicitamente rotulado; restringir gatilhos a documentação; mover SDKs para exemplo claramente não publicável.

## Padrões proibidos e conflitos a evitar

- material_active_contradiction
- clearly_inappropriate_trigger
- Contrato proíbe instruir instalação sem verificar publicação; seção ativa instrui pip/npm install.
- Contrato diz documentar APIs reais; catálogo ativo apresenta endpoints propostos como principais.

## Riscos que exigem tratamento explícito

- Usuário pode instalar pacote inexistente ou documentar/publicar endpoint que não existe.

## Patrimônio legado aproveitável sob validação

- Não há conteúdo exclusivo do legado recomendado para reintegração.

## Cenários mínimos de avaliação

- Inspecionar servidor real e provar cada rota; validar OpenAPI; npm view/pip index em sandbox; near-miss /api versus criar-api.

## Registro mínimo de evidência

Para cada avaliação, registrar: `case_id`, prompt, modelo e versão, ferramentas disponíveis, artefatos/trace, resultado observado, critérios objetivos, falha e decisão. Um cenário descrito sem execução permanece `proposto`.

## Gate de saída

A entrega deve separar `proposto`, `escrito`, `validado` e `executado`; citar a origem de fatos externos; indicar testes realmente rodados; e recusar qualquer etapa destrutiva, externa ou privilegiada sem autorização suficiente.
