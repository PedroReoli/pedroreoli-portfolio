# Exemplo reproduzível — v1

> Exemplo documental. Ele define entrada, decisões e critérios observáveis; não representa uma execução já realizada.

## Entrada

- **C01:** Nome encontrado em texto mas sem WHOIS: marcar não verificado.

## Procedimento esperado

1. Gerar opções memoráveis sem conflito óbvio de significado e com variações claras.
2. Verificar disponibilidade diretamente em consulta atual de registrador/WHOIS, anotando data e limitações.
3. Comparar compra e renovação, privacidade, DNS, transferências e elegibilidade da extensão.
4. Checar riscos de marca e recomendar aquisição apenas depois de preço e disponibilidade atuais comprovados.

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
