# Portões de qualidade e avaliação — v1

Origem: auditoria manual semântica de 2026-10-09, lote C; nota documental de base 92.5/100. Este arquivo converte achados em instruções normativas, mas **não declara avaliação comportamental executada**.

## Correções obrigatórias antes da entrega

- Adicionar um schema curto de matriz de evidências diretamente no corpo ou referência indicada.

## Padrões proibidos e conflitos a evitar

- Não foram registrados bloqueios; ainda assim, não simule acesso, execução, validação ou publicação.

## Riscos que exigem tratamento explícito

- Nenhuma homologação multiagente comprova que a separação das classes seja obedecida.

## Patrimônio legado aproveitável sob validação

- Formato antigo de relatório em quatro passos pode servir como template opcional, mas o conteúdo substantivo foi superado.

## Cenários mínimos de avaliação

- Executar casos com fonte oficial, GitHub e Reddit; testar link descoberto mas não aberto e prompt injection; comparar com/sem skill.

## Registro mínimo de evidência

Para cada avaliação, registrar: `case_id`, prompt, modelo e versão, ferramentas disponíveis, artefatos/trace, resultado observado, critérios objetivos, falha e decisão. Um cenário descrito sem execução permanece `proposto`.

## Gate de saída

A entrega deve separar `proposto`, `escrito`, `validado` e `executado`; citar a origem de fatos externos; indicar testes realmente rodados; e recusar qualquer etapa destrutiva, externa ou privilegiada sem autorização suficiente.
