---
name: modelar-db
description: Modela entidades, relações, índices e migrações, priorizando o ORM e banco já adotados pelo projeto. Use para desenho de schema, integridade ou migrations e para Prisma quando ele estiver presente; não use para consulta ou troubleshooting operacional genérico de banco.
license: Proprietary
metadata:
  tipo: skill
  nome-exibicao: Modelagem de banco de dados
  aliases: modelar-db, /modelar-db, Modelagem de banco de dados
  tags: h4, skill, database, reolios
  camada: 3_folha
  dominio: tecnologia
  categoria: database
  subtipo: skill
  hierarquia: "4"
  hub-pai: "[[hubs/skills/Skills - Database]]"
---
# Modelar banco — Prisma com validação, migração e integridade

## Finalidade
Modelar entidades, relações, índices, integridade e migrações com Prisma ou outra ferramenta **se o projeto exigir**. O modelo deriva das regras do negócio, não da aparência de tabelas. APIs e autorização ficam em /criar-api e /auth-seguranca.

## Contrato para a IA
1. Detectar DB, versão instalada de Prisma, node/package manager, provedor, schema atual, `prisma.config.ts`, credenciais e status de migrations. Não presumir sintaxe da versão anterior: **Prisma v7 move a datasource URL para a configuração e altera o comportamento de seeds**.
2. **Nunca executar `prisma migrate reset`, `db push` potencialmente destrutivo, `deleteMany({})` ou seed contra DB compartilhado/produção.** Conferir host/nome do banco e permissão; backup antes de qualquer operação de risco.
3. Não inventar modelos, referências, tipos nativos compatíveis, relações inversas ou funções ausentes. Exemplos incompletos devem ser claramente identificados; só afirmar schema válido após `prisma validate`.
4. Definir PK/UK/FK, relações, cardinalidade, onDelete/onUpdate, escopo multi-tenant e consultas frequentes **antes** de escolher índices. CUID, UUID, serial e soft delete são opções, não obrigações universais.
5. Definir integridade no banco sempre que possível: FK, UNIQUE e CHECK compatíveis. Validação de UI/API não substitui constraint de banco. Políticas de autorização são adicionais.
6. Evitar `password: "hashed_password"` em seeds reais. Se for indispensável criar conta de teste, usar credencial gerada exclusivamente em ambiente de testes e hash forte; preferir dados não sensíveis.
7. Proteger privacidade: retenção, minimização, criptografia conforme risco, controle por tenant, backup e logs sem payload sensível.
8. Documentar migrações *expand-contract* e rollback possível, inclusive riscos de locks, backfill e mudanças irreversíveis. Não afirmar execução sem stdout/log.

## Workflow
### 1. Descobrir a regra de negócio
Criar tabela: `Entidade | Campos e tipo | Validações | Fonte do dado | Relações | Ciclo de vida | Dados sensíveis | Tenant | Consultas`.

### 2. Especificação conceitual
- Normalizar sem perder consultas críticas; justificar eventual denormalização.
- Identificar unicidade global x por tenant (ex.: `@@unique([tenantId, externalId])`).
- Selecionar comportamento de deleção: RESTRICT, CASCADE, SET NULL apenas quando consistente com domínio.
- Projetar índices para filtros, joins, ordenação e cardinalidade, medindo custo de escrita.
- Em soft delete, checar implicações de unicidade/índice parcial e filtros de vazamento.
- Cuidado com duplicidade por requisições paralelas; transação com constraint é defesa mais forte do que check inicial no app.

### 3. Gerar schema por versão
**Fragmento ilustrativo de duas entidades, sem se passar por schema completo de uma versão não verificada:**
~~~prisma
model Customer {
  id       String  @id @default(cuid())
  tenantId String
  email    String
  orders   Order[]
  @@unique([tenantId, email])
  @@index([tenantId])
}
model Order {
  id         String   @id @default(cuid())
  customerId String
  customer   Customer @relation(fields: [customerId], references: [id], onDelete: Restrict)
  totalCents Int
  createdAt  DateTime @default(now())
  @@index([customerId, createdAt])
}
~~~
Invariantes extras: totalCents não negativo requer validação de domínio e, quando disponível, CHECK via SQL migration; um Order deve herdar tenant autorizado do Customer. O fragmento não define `generator`, `datasource` nem conexão: configurá-los conforme Prisma instalado, sem adivinhar versão.

### 4. Migrar com segurança
- Desenvolvimento descartável: `npx prisma validate` → criar migration em ambiente de desenvolvimento isolado → inspecionar SQL → aplicar e testar.
- Produção/staging: revisar diff, lock e backfill; `npx prisma migrate deploy` **somente mediante autorização, backup testado e janela apropriada**.
- **`migrate reset` APAGA DADOS; proibido fora de DB descartável.**
- Na versão atual v7, `migrate reset` não executa seed automaticamente; `npx prisma db seed` é etapa explícita.
- Verificar status, migrations drift, schema validado, gerador/adapter correto e testes de consultas antes de concluir.

### 5. Entrega
ERD ou diagrama textual; schema compatível com versão selecionada; migrations SQL revisadas; estratégia de seed e fixtures; contrato de retenção; impacto e plano de rollback; queries/casos testados; pendências.

## Casos de teste
1. Modelo com relação sem inversa: validação deve acusar e IA deve corrigir.
2. Schema v6 copiado em projeto v7: detectar incompatibilidade no datasource/generator.
3. Produção com `migrate reset`: bloquear e explicar perda de dados.
4. Relação tenant incorreta: consulta não deve atravessar escopo de acesso.
5. Duas criações concorrentes do mesmo ID externo: constraint impede duplicata.
6. Migration que torna campo NOT NULL com registros existentes: plano de backfill ou migration expand-contract.
7. Banco inacessível: não declarar migration aplicada.

## Fontes oficiais (consulta 08/10/2026)
- [Prisma migrate CLI](https://www.prisma.io/docs/cli/v7/migrate): comandos de desenvolvimento e produção.
- [Prisma reset (v7)](https://www.prisma.io/docs/cli/v7/migrate/reset): perde dados, não roda seed automática.
- [Prisma schema reference](https://www.prisma.io/docs/orm/reference/prisma-schema-reference): relações e índices, com atenção à versão.
- [OWASP Database Security](https://cheatsheetseries.owasp.org/cheatsheets/Database_Security_Cheat_Sheet.html): controles de acesso e operação.
- [Skill Creator Anthropic](https://github.com/anthropics/skills/blob/main/skills/skill-creator/SKILL.md): casos positivos, negativos e validação progressiva.

## Aceite
Status: `proposta` → `schema gerado` → `prisma validate OK` → `migration testada em banco isolado` → `deploy autorizado`. **Não marcar fases futuras automaticamente.**

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Database|Skills - Database]]
<!-- vault-navigation:end -->

## Qualidade e avaliação

- [Portões de qualidade e cenários mínimos](references/certification-v1.md) — carregue antes de finalizar a entrega ou executar avaliações.
- [Exemplo reproduzível](references/worked-example-v1.md) — use como contrato de entrada, decisão, saída e reprovação.
- [Estado das fontes](references/source-status-v1.md) — consulte antes de sustentar afirmações externas.
