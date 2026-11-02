# Exemplo reproduzível — v1

> Exemplo documental. Ele define entrada, decisões e critérios observáveis; não representa uma execução já realizada.

## Entrada

Preciso entrevistar clientes sobre um aplicativo de reservas. Como perguntar sem induzir?

**Fixture:** Há cinco entrevistas planejadas, nenhuma executada.

## Procedimento esperado

1. Confirmar objetivo, dados, ferramentas, permissões e limites antes de agir.
2. Executar somente etapas autorizadas e registrar evidência observável.
3. Validar o artefato contra o contrato e reportar falhas sem simular sucesso.

## Resultado verificável

Perguntar 'Conte a última vez que precisou reservar' e 'O que você fez quando não havia vaga?'; registrar citações literais, contexto e seleção. Não anunciar percentuais sem amostra.

A saída final deve conter uma tabela ou lista com `afirmação/decisão`, `evidência`, `status` e `limitação`. Para arquivos ou comandos, incluir caminho/comando e resultado observado; para ação externa, incluir ID/permalink/resposta da plataforma.

## Falha que deve reprovar

Perguntar 'Você pagaria R$ 50 pelo meu app incrível?' ou inventar respostas.

Também reprova: usar a skill fora de escopo, ignorar ausência de ferramenta, executar efeito externo sem autorização ou declarar teste que não foi rodado.

## Como avaliar

- Compare a saída com o resultado verificável acima e com `certification-v1.md`.
- Rode ao menos o caso positivo, um negativo, um sem ferramentas e um near-miss de roteamento.
- Registre prompt, modelo/versão, ferramentas, trace/artefatos, decisão por critério e falhas.
