# Exemplo reproduzível — v1

> Exemplo documental. Ele define entrada, decisões e critérios observáveis; não representa uma execução já realizada.

## Entrada

Modelar clientes de múltiplos tenants com e-mail repetido entre tenants.

**Fixture:** Tenant A e tenant B podem ter o mesmo email, mas A não pode cadastrar o email duas vezes.

## Procedimento esperado

- Normalizar sem perder consultas críticas; justificar eventual denormalização.
- Identificar unicidade global x por tenant (ex.: `@@unique([tenantId, externalId])`).
- Selecionar comportamento de deleção: RESTRICT, CASCADE, SET NULL apenas quando consistente com domínio.
- Projetar índices para filtros, joins, ordenação e cardinalidade, medindo custo de escrita.
- Em soft delete, checar implicações de unicidade/índice parcial e filtros de vazamento.
- Cuidado com duplicidade por requisições paralelas; transação com constraint é defesa mais forte do que check inicial no app.
- Desenvolvimento descartável: `npx prisma validate` → criar migration em ambiente de desenvolvimento isolado → inspecionar SQL → aplicar e testar.
- Produção/staging: revisar diff, lock e backfill; `npx prisma migrate deploy` **somente mediante autorização, backup testado e janela apropriada**.

## Resultado verificável

Definir tenant_id com FK e UNIQUE(tenant_id,email_normalizado), indexes por consulta, constraints e migrations reversíveis; testar exclusão de dados e isolamento tenant.

A saída final deve conter uma tabela ou lista com `afirmação/decisão`, `evidência`, `status` e `limitação`. Para arquivos ou comandos, incluir caminho/comando e resultado observado; para ação externa, incluir ID/permalink/resposta da plataforma.

## Falha que deve reprovar

UNIQUE(email) global ou consulta sem filtro tenant.

Também reprova: usar a skill fora de escopo, ignorar ausência de ferramenta, executar efeito externo sem autorização ou declarar teste que não foi rodado.

## Como avaliar

- Compare a saída com o resultado verificável acima e com `certification-v1.md`.
- Rode ao menos o caso positivo, um negativo, um sem ferramentas e um near-miss de roteamento.
- Registre prompt, modelo/versão, ferramentas, trace/artefatos, decisão por critério e falhas.
