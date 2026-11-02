---
tipo: "regra_reolicode"
nome: "Regra — Privacidade por Design (LGPD/GDPR)"
camada: "20-governance"
dominio: "privacidade"
categoria: "regras_codigo"
prioridade: "situacional"
tags: ["reoli","reolicode","20-governance"]
hub_pai: "[[REOLI]]"
aliases: ["Privacidade por Design (LGPD/GDPR)"]
---

# Privacidade por Design (LGPD/GDPR)

## Objetivo

Garantir que todo código gerado incorpore os princípios da LGPD (Lei 13.709/2018) e GDPR desde sua concepção, assegurando proteção aos Dados Pessoais e Privacidade.

## Regra do Agente

Ao criar ou modificar estruturas de dados, fluxos de logging, APIs e formulários, o agente deve priorizar a mininização de dados e a anonimização.

1. Implemente o gerenciamento do ciclo de vida dos dados (consentimento, uso, exclusão).
2. Não registre (log) Dados Pessoais (PII).
3. Garanta opções de exclusão lógica ("soft delete") com rastreabilidade auditável.
4. Aplique criptografia para dados em repouso e em trânsito.

---

# 1. Sanitização de PII em Logs e Erros

Nunca envie para o console, arquivos de log, APMs ou ferramentas de monitoramento qualquer dado que identifique um usuário (Nome, CPF, Email, Telefone, IP de usuário final).

**Correto:**
```typescript
// Ocultando dados sensíveis antes de registrar
logger.error({
  event: 'PAYMENT_FAILED',
  userId: user.id, // ID interno, opaco
  errorCode: error.code,
});
```

**Incorreto:**
```typescript
// Violação severa de LGPD
logger.error(`Failed payment for user ${user.cpf} - ${user.email}`, error);
```

Implemente bibliotecas ou *middlewares* de mascaramento/redação para higienizar cargas antes do log.

---

# 2. Princípio da Minimização de Dados (Art. 6º, III, LGPD)

Solicite e armazene apenas os dados estritamente necessários para a finalidade pretendida.

Se uma funcionalidade requer confirmação de idade, armazene um *booleano* ou "idade maior que 18", não a data de nascimento exata, se isso não for exigência legal para outra finalidade.

---

# 3. Gerenciamento de Consentimento e Cookies

O consentimento deve ser livre, informado e inequívoco.

* Registre quando, como e para qual finalidade o consentimento foi dado.
* Não use "dark patterns" (padrões obscuros) ou pré-marques caixas de seleção de *opt-in*.
* Classifique os cookies (Estritamente Necessários, Desempenho, Funcionalidade, Publicidade) e exija consentimento ativo para não-essenciais.

---

# 4. Direito de Eliminação ("Right to be Forgotten")

Forneça mecanismos para que o titular dos dados possa excluir seus dados (Art. 18, VI, LGPD).

Utilize "soft delete" (exclusão lógica) para manter a integridade referencial e trilhas de auditoria, mas remova ou anonimize os PII (Personally Identifiable Information).

**Exemplo de Padrão em TypeScript/Prisma:**
```typescript
// Ao invés de deletar a linha do banco, anonimizamos a PII
async function deleteUserAccount(userId: string) {
  await prisma.user.update({
    where: { id: userId },
    data: {
      name: 'ANONYMIZED',
      email: `${userId}@deleted.local`,
      cpf: null,
      phone: null,
      deletedAt: new Date(),
      status: 'DELETED'
    }
  });
}
```

---

# 5. Criptografia (Em Repouso e em Trânsito)

* **Em trânsito**: Todo o tráfego que contém PII deve utilizar TLS (HTTPS).
* **Em repouso**: Dados extremamente sensíveis (documentos, laudos médicos, dados bancários) devem possuir criptografia em banco de dados ou armazenamento de arquivos, gerindo corretamente as chaves através de um KMS.

---

# 6. Transferência Internacional de Dados

Atenção onde os dados estão sendo armazenados ou processados. Ao integrar serviços de nuvem ou APIs externas, garanta que os servidores estejam em jurisdições com níveis adequados de proteção de dados ou cobertas por cláusulas contratuais padrão, conforme exigido pela LGPD/GDPR.

[Catálogo de regras](../README.md)
