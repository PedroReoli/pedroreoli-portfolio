# Exemplo reproduzível — v1

> Exemplo documental. Ele define entrada, decisões e critérios observáveis; não representa uma execução já realizada.

## Entrada

- **C01:** Webhook chega duas vezes e não duplica fatura.

## Procedimento esperado

1. Mapear origem, transformações e efeitos em sistemas externos; documentar consentimentos e campos mínimos.
2. Comparar limitações reais de n8n self-host/Cloud e Zapier por conectores, custo, quotas e suporte.
3. Definir autenticação via credential vault, teste em sandbox, filtros, exceções, retry/backoff e deduplicação.
4. Validar execução ponta a ponta com payload fictício e confirmar logs, falha, replay e desativação.

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
