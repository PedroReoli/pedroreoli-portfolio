# Exemplo reproduzível — v1

> Exemplo documental. Ele define entrada, decisões e critérios observáveis; não representa uma execução já realizada.

## Entrada

- **C01:** Gráfico usa base diferente do texto: corrigir.

## Procedimento esperado

1. Construir narrativa de decisão, mensagem por slide e nível de detalhe compatível com público.
2. Definir estrutura com fontes para cifras, gráficos e fotos, sem criar dados ilustrativos não rotulados.
3. Aplicar hierarquia, contraste, fontes legíveis, alt text e notas de apresentação.
4. Renderizar/inspecionar slides e ajustar clipping antes de entregar arquivo; sem ferramenta, fornecer deck textual.

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
