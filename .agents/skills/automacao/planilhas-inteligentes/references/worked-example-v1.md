# Exemplo reproduzível — v1

> Exemplo documental. Ele define entrada, decisões e critérios observáveis; não representa uma execução já realizada.

## Entrada

- **C01:** Coluna com texto monetário misturado: detectar tipo inválido.

## Procedimento esperado

1. Validar tipos, datas, moeda, unidade, chaves e valores faltantes antes de criar fórmulas.
2. Especificar cálculos com exemplos numéricos e casos de borda; testar totais e divisões por zero.
3. Usar tabelas estruturadas, validação de entrada, proteção de fórmulas e batches de API com escopo mínimo.
4. Ao importar/exportar, preservar cabeçalhos, data types, permissões e conferir resultados com amostra independente.

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
