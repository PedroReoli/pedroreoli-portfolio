# Exemplo reproduzível — v1

> Exemplo documental. Ele define entrada, decisões e critérios observáveis; não representa uma execução já realizada.

## Entrada

- **C01:** Aprovação negativa retorna ao início: modelar loop.

## Procedimento esperado

1. Entrevistar/inspecionar responsáveis ou material existente, separando declarado de observado.
2. Desenhar fluxo as-is com eventos, decisões, transferências e sistemas.
3. Estimar gargalos com dados de tempo, retrabalho e volume, rotulando aproximações.
4. Propor to-be, controles e plano de piloto com métrica antes/depois e rollback.

## Resultado verificável

Produzir o artefato definido no contrato, com premissas, evidências, limitações, validações executadas e próximos passos.

A saída final deve conter uma tabela ou lista com `afirmação/decisão`, `evidência`, `status` e `limitação`. Para arquivos ou comandos, incluir caminho/comando e resultado observado; para ação externa, incluir ID/permalink/resposta da plataforma.

## Falha que deve reprovar

Não inventar dados, capacidades, execução, aprovação, publicação ou resultado.

Também reprova: usar a skill fora de escopo, ignorar ausência de ferramenta, executar efeito externo sem autorização ou declarar teste que não foi rodado.

## Como avaliar

- Compare a saída com o resultado verificável acima e com `certification-v1.md`.
- Rode ao menos o caso positivo, um negativo, um sem ferramentas e um near-miss de roteamento.
- Registre prompt, modelo/versão, ferramentas, trace/artefatos, decisão por critério e falhas.
