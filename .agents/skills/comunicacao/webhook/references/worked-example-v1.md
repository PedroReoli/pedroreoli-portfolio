# Exemplo reproduzível — v1

> Exemplo documental. Ele define entrada, decisões e critérios observáveis; não representa uma execução já realizada.

## Entrada

Crie endpoint para webhook de pagamentos com eventos repetidos e assinatura HMAC.

**Fixture:** Um evento EVT-001 é entregue duas vezes, e uma tentativa chega com assinatura incorreta.

## Procedimento esperado

1. Determinar provedor, eventos permitidos, auth, schema, política de replay, janela, destino e efeito de negócio.
2. Configurar parser **raw** antes de JSON nas rotas assinadas e rejeitar assinatura ausente, inválida ou corpo modificado.
3. Persistir inbox e publicação em fila na mesma transação ou via outbox transacional; deduplicar por ID do provedor.
4. Responder 2xx após persistência, retornar falha real em erro transitório; worker processa com idempotência e retry.
5. Implementar monitoramento, alerta e replay controlado; rodar testes negativos e concorrentes.
6. Se o projeto não tiver DB/fila, declarar dependência e apresentar arquitetura, não código supostamente pronto.

## Resultado verificável

Verificar HMAC sobre bytes brutos antes do parse; recusar assinatura incorreta; deduplicar EVT-001 em armazenamento transacional; separar aceite HTTP de execução assíncrona; mencionar diferenças de assinatura por provedor.

A saída final deve conter uma tabela ou lista com `afirmação/decisão`, `evidência`, `status` e `limitação`. Para arquivos ou comandos, incluir caminho/comando e resultado observado; para ação externa, incluir ID/permalink/resposta da plataforma.

## Falha que deve reprovar

Confiar em header criado pelo cliente ou processar duas cobranças.

Também reprova: usar a skill fora de escopo, ignorar ausência de ferramenta, executar efeito externo sem autorização ou declarar teste que não foi rodado.

## Como avaliar

- Compare a saída com o resultado verificável acima e com `certification-v1.md`.
- Rode ao menos o caso positivo, um negativo, um sem ferramentas e um near-miss de roteamento.
- Registre prompt, modelo/versão, ferramentas, trace/artefatos, decisão por critério e falhas.
