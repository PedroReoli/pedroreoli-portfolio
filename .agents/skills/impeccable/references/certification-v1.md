# Portões de qualidade e avaliação — v1

Origem: auditoria manual semântica de 2026-10-09, lote B; nota documental de base 63.75/100. Este arquivo converte achados em instruções normativas, mas **não declara avaliação comportamental executada**.

## Correções obrigatórias antes da entrega

- Restaurar no SKILL.md normativo o roteador de comandos e a regra de carregar uma referência por vez.
- Declarar efeitos dos scripts: rede no update check, arquivos/contexto, servidor local e injeção live.
- Adicionar manifesto de versão, licença e dependências do pacote.

## Padrões proibidos e conflitos a evitar

- Não foram registrados bloqueios; ainda assim, não simule acesso, execução, validação ou publicação.

## Riscos que exigem tratamento explícito

- Recursos poderosos podem ser ignorados ou usados fora de ordem porque o roteamento está apenas no legado.
- `context.mjs` pode acessar rede e `live.mjs` pode modificar/injetar arquivos; isso exige disclosure e validação isolada.

## Patrimônio legado aproveitável sob validação

- O conteúdo operacional completo da cópia antiga (preparação, tipos de superfície, tabela de comandos e verificação) está arquivado no canônico, mas deixou de ser normativo; deve ser recuperado seletivamente no entrypoint.

## Cenários mínimos de avaliação

- Roteamento por comando; sem argumento; web/native; sem browser; detector; live com consentimento; script em projeto temporário.

## Registro mínimo de evidência

Para cada avaliação, registrar: `case_id`, prompt, modelo e versão, ferramentas disponíveis, artefatos/trace, resultado observado, critérios objetivos, falha e decisão. Um cenário descrito sem execução permanece `proposto`.

## Gate de saída

A entrega deve separar `proposto`, `escrito`, `validado` e `executado`; citar a origem de fatos externos; indicar testes realmente rodados; e recusar qualquer etapa destrutiva, externa ou privilegiada sem autorização suficiente.
