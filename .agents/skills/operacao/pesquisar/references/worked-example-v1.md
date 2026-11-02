# Exemplo reproduzível — v1

> Exemplo documental. Ele define entrada, decisões e critérios observáveis; não representa uma execução já realizada.

## Entrada

Compare duas bibliotecas abertas de skills para pesquisa técnica. Preciso decidir qual adotar.

**Fixture:** Repositório A com licença MIT, releases e testes; B com 800 estrelas, sem release e sem licença verificável.

## Procedimento esperado

1. Confirmar objetivo, dados, ferramentas, permissões e limites antes de agir.
2. Executar somente etapas autorizadas e registrar evidência observável.
3. Validar o artefato contra o contrato e reportar falhas sem simular sucesso.

## Resultado verificável

Entregar matriz por licença, atividade de manutenção, contrato de acionamento, limites e testes. Dizer que 800 estrelas não validam segurança. Sem web, solicitar URLs e deixar resultados em aberto.

A saída final deve conter uma tabela ou lista com `afirmação/decisão`, `evidência`, `status` e `limitação`. Para arquivos ou comandos, incluir caminho/comando e resultado observado; para ação externa, incluir ID/permalink/resposta da plataforma.

## Falha que deve reprovar

Classificar B como melhor apenas por estrelas ou inventar versão/benchmark.

Também reprova: usar a skill fora de escopo, ignorar ausência de ferramenta, executar efeito externo sem autorização ou declarar teste que não foi rodado.

## Como avaliar

- Compare a saída com o resultado verificável acima e com `certification-v1.md`.
- Rode ao menos o caso positivo, um negativo, um sem ferramentas e um near-miss de roteamento.
- Registre prompt, modelo/versão, ferramentas, trace/artefatos, decisão por critério e falhas.
