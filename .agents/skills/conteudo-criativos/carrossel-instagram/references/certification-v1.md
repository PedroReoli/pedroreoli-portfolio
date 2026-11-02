# Portões de qualidade e avaliação — v1

Origem: auditoria manual semântica de 2026-10-09, lote A; nota documental de base 77.5/100. Este arquivo converte achados em instruções normativas, mas **não declara avaliação comportamental executada**.

## Correções obrigatórias antes da entrega

- Adicionar wireframe/rubrica de leitura com unidades verificáveis.
- Registrar versão/data da dimensão recomendada.

## Padrões proibidos e conflitos a evitar

- Não foram registrados bloqueios; ainda assim, não simule acesso, execução, validação ou publicação.

## Riscos que exigem tratamento explícito

- Declare limitações, efeitos colaterais, autorização necessária e plano de recuperação aplicável.

## Patrimônio legado aproveitável sob validação

- Nenhum conteúdo útil exclusivo; templates estão no guia legado.

## Cenários mínimos de avaliação

- render 1080x1350
- inspeção em viewport mobile
- alt text e contraste

## Registro mínimo de evidência

Para cada avaliação, registrar: `case_id`, prompt, modelo e versão, ferramentas disponíveis, artefatos/trace, resultado observado, critérios objetivos, falha e decisão. Um cenário descrito sem execução permanece `proposto`.

## Gate de saída

A entrega deve separar `proposto`, `escrito`, `validado` e `executado`; citar a origem de fatos externos; indicar testes realmente rodados; e recusar qualquer etapa destrutiva, externa ou privilegiada sem autorização suficiente.
