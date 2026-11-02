# Exemplo reproduzível — v1

> Exemplo documental. Ele define entrada, decisões e critérios observáveis; não representa uma execução já realizada.

## Entrada

- **C01:** Planos anuais precisam normalização mensal.

## Procedimento esperado

1. Definir receita recorrente mensal normalizada, tipos de plano e tratamento de trial/past_due/cancelados.
2. Separar gross MRR, descontos, churn MRR, expansion/contraction e recebimentos de caixa.
3. Calcular margem de contribuição, CAC/payback e LTV apenas com coortes e hipóteses explícitas.
4. Simular cenários e sensitivity a churn/ARPU/COGS; documentar dados faltantes e precisão.

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
