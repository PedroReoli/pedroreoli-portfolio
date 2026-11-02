---
tipo: skill
nome: Defesa Cibernética Ativa & Hardening do Sistema
name: cyber-defense
aliases:
  - cyber-defense
  - /cyber-defense
  - Defesa Cibernética Ativa & Hardening do Sistema
tags:
  - h4
  - skill
  - dev
  - reolios
camada: 3_folha
dominio: tecnologia
categoria: dev
subtipo: skill
hierarquia: 4
h: 4
hub_pai: '[[hubs/skills/Skills - Dev Eng]]'
description: >
  Proteção ativa, hardening de servidores e aplicação de contra-medidas contra
  ataques cibernéticos. Analisa código contra injeção SQL, IDOR, SSRF, vazamento
  de chaves e ataques de força bruta. Use quando pedir "segurança cibernética",
  "proteger contra ataques", "hardening", "blindar sistema", "cyber defense",
  "cybersec", "/cyber-defense" ou "/proteger".
---

# Defesa Cibernética Ativa & Hardening do Sistema

Aplica técnicas de defesa cibernética de elite para blindar suas aplicações web, bancos de dados e APIs contra invasores, vazamento de credenciais e exploração automatizada de brechas.

---

## 🛡️ Vetores Críticos de Defesa

### 1. Prevenção de Injeções (SQLi, NoSQLi & Command Injection)
- **Regra de Ouro:** NUNCA concatenar strings em queries SQL ou comandos de sistema (`exec`, `eval`).
- **Solução:** Usar queries parametrizadas (Prepared Statements via Prisma, Drizzle ou TypeORM) e validação de schema estrita com Zod antes de tocar no banco de dados.

### 2. Blindagem de Autorização (Prevenção de IDOR)
- **O que é:** Quando um invasor altera a URL de `/api/pedidos/10` para `/api/pedidos/11` e vê os dados de outro cliente.
- **Contra-medida:** Todo select/update no banco DEVE filtrar explicitamente pelo ID do usuário autenticado no JWT:
  ```typescript
  // SEGURO:
  const order = await db.orders.findFirst({
    where: { id: req.params.id, userId: req.user.id }
  });
  if (!order) return res.status(404).json({ error: "Não encontrado" });
  ```

### 3. Proteção contra SSRF (Server-Side Request Forgery)
- **O que é:** Quando sua aplicação faz requisições HTTP para URLs enviadas pelo usuário (ex: baixar avatar ou webhook) e o invasor envia `http://169.254.169.254` para roubar chaves de metadados da AWS/nuvem ou varrer sua rede interna (`http://localhost:6379`).
- **Contra-medida:** Validar URLs com whitelist de domínios e bloquear faixas privadas (`127.0.0.1`, `10.0.0.0/8`, `192.168.0.0/16`).

### 4. Varredura e Proteção de Segredos
- Bloquear commits com chaves de API (`AIza...`, `sk-proj...`, senhas de banco).
- Armazenar sempre dados sensíveis em `.privado/` ou em variáveis de ambiente gerenciadas pela nuvem.

### 5. Headers de Hardening HTTP (Helmet)
```typescript
app.use(helmet({
  contentSecurityPolicy: true, // Bloqueia scripts maliciosos de fora (XSS)
  hsts: { maxAge: 31536000, includeSubDomains: true }, // Força HTTPS estrito
  frameguard: { action: 'deny' }, // Impede ataques de Clickjacking (iframes)
  noSniff: true // Previne ataques de MIME-sniffing
}));
```

---

## 📋 Checklist de Defesa Ativa

- [ ] Rate Limiter ativo em endpoints de Login e Recuperação de Senha (máx 5 tentativas por minuto)?
- [ ] Todas as rotas autenticadas verificam se o recurso pertence ao usuário autenticado?
- [ ] O banco de dados está rodando com usuário de privilégios mínimos (não usar `root`/`postgres`)?
- [ ] Não há tokens ou senhas expostas nos repositórios públicos?
- [ ] Dependências auditadas contra vulnerabilidades conhecidas (`npm audit` sem vulnerabilidades críticas)?

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Dev Eng|Skills - Dev Eng]]
<!-- vault-navigation:end -->
