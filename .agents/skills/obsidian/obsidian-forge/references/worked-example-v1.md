# Exemplo reproduzível — v1

> Exemplo documental. Ele define entrada, decisões e critérios observáveis; não representa uma execução já realizada.

## Entrada

- **C01:** Título colide com nota existente: resolver antes de escrever.

## Procedimento esperado

1. Inspecionar paths e convenções do vault (frontmatter, tags, links e nomes), sem presumir estrutura.
2. Extrair objetivo, decisões e próximos passos de conteúdo efetivamente fornecido.
3. Preparar nota com YAML válido, links existentes ou explicitamente pendentes e títulos claros.
4. Gravar somente com autorização e verificar nota/links via vault API ou arquivos locais acessíveis.

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
