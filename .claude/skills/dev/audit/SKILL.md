---
tipo: skill
nome: Auditoria completa de segurança
name: audit
aliases:
  - audit-security
  - /audit-security
  - /audit
  - Auditoria completa de segurança
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
  Audita APIs e sistemas em busca de vulnerabilidades. Analisa código, rotas,
  autenticação, autorização, e aplicação das práticas de segurança do OWASP. Use
  quando pedir "auditar segurança", "verificar vulnerabilidades", "testar API",
  "security audit", "/audit" ou "/security-audit".
---

# Auditoria completa de segurança

Analisa código existente e identifica vulnerabilidades, falhas de segurança e pontos de melhoria.

## Dependências

- **Referência:** `security.md` (documento de práticas de segurança)
- **Input:** projeto a ser auditado

---

## Workflow

### Passo 1 — Configuração

Perguntar ao usuário:
1. Qual projeto/endpoints quer auditar?
2. Qual a stack? (Node, Python, Go, etc)
3. Tem documentação da API?
4. Quais são as áreas críticas? (auth, pagamentos, dados sensíveis)

### Passo 2 — Análise Estática (Código)

**Verificar estrutura do projeto:**
- Pastas e arquivos organizados?
- Variáveis de ambiente (.env) no .gitignore?
- Credenciais hardcoded?

**Autenticação:**
```
├── Login/registro implementado?
├── JWT com expiração?
├── Refresh token com rotação?
├── Senhas com hash (bcrypt/argon2)?
├── Rate limiting em auth?
└── Cookie HttpOnly + Secure?
```

**Autorização:**
```
├── Middleware de autenticação em todas as rotas privadas?
├── Verificação de permissões?
├── Verificação de propriedade do recurso?
└── RBAC implementado?
```

**Validação:**
```
├── Schema em todos os inputs (Zod/Pydantic)?
├── Sanitização de inputs?
├── Validação de tipos e tamanhos?
└── Remoção de campos extras?
```

**Segurança:**
```
├── Helmet/headers de segurança?
├── CORS configurado (não "*")?
├── Rate limiting implementado?
├── Logs de auditoria?
└── Erros genéricos pro usuário?
```

### Passo 3 — Análise OWASP Top 10

Para cada vulnerabilidade do OWASP Top 10:

**A01 — Broken Access Control**
- [ ] Usuário pode acessar recursos que não deveria?
- [ ]IDOR (Insecure Direct Object Reference) presente?
- [ ] Princípio do menor privilégio respeitado?

**A02 — Cryptographic Failures**
- [ ] Dados sensíveis expostos (senhas, cards, tokens)?
- [ ] Hash de senhas implementado?
- [ ] HTTPS em produção?

**A03 — Injection**
- [ ] SQL injection possível?
- [ ] XSS possível?
- [ ] Input sanitizado?

**A04 — Insecure Design**
- [ ] Falta de autenticação em APIs críticas?
- [ ] Rate limiting ausente?
- [ ] Sem logout/invalidação de sessão?

**A05 — Security Misconfiguration**
- [ ] Headers de segurança configurados?
- [ ] CORS restrito?
- [ ] Stack traces expostas?

**A06 — Vulnerable Components**
- [ ] Dependências desatualizadas?
- [ ] Componentes com vulnerabilidades conhecidas?
- [ ] Uso de componentes não mantenidos?

**A07 — Auth Failures**
- [ ] Falta de MFA?
- [ ] Senhas fracas permitidas?
- [ ] Tokens sem expiração?

**A08 — Data Integrity Failures**
- [ ] Sem checksum em uploads?
- [ ] Sem validação de integridade?

**A09 — Logging & Monitoring**
- [ ] Falta de logs de segurança?
- [ ] Sem alertas para tentativas de invasão?
- [ ] Sem trilha de auditoria?

**A10 — SSRF**
- [ ] API faz chamadas externas?
- [ ] URL validada antes de buscar?
- [ ] Allowlist de domínios?

### Passo 4 — Testes Dinâmicos

Se possível, fazer testes práticos:
- Tentar acesso sem autenticação
- Tentar SQL injection em campos
- Tentar XSS em inputs
- Testar rate limit
- Verificar headers de segurança (curl)

```bash
# Testar headers
curl -I https://api.exemplo.com

# Testar CORS
curl -H "Origin: https://malicioso.com" -I https://api.exemplo.com

# Testar SQL injection
curl -X GET "https://api.exemplo.com/users?id=1' OR '1'='1"
```

### Passo 5 — Relatório

Gerar relatório em `clientes/templates/saidas/audit/<projeto>-<data>.md`:

```markdown
# Auditoria de Segurança: [Projeto]

## Resumo
- Total de vulnerabilidades encontradas: X
- Críticas: X
- Altas: X
- Médias: X
- Baixas: X

## Vulnerabilidades Críticas

### [Nome]
- **Severidade:** Crítica/Alta/Média/Baixa
- **Localização:** arquivo/rota
- **Descrição:** o que foi encontrado
- **Impacto:** como pode ser explorado
- **Recomendação:** como corrigir

[...]

## Vulnerabilidades Médias
[...]

## Vulnerabilidades Baixas
[...]

## Checklist OWASP

| Categoria | Status |
|-----------|--------|
| A01 - Broken Access Control | ✅/❌ |
| A02 - Cryptographic Failures | ✅/❌ |
| A03 - Injection | ✅/❌ |
| ... | ... |

## Recomendações Prioritárias

1. [ ] Prioridade 1
2. [ ] Prioridade 2
3. [ ] Prioridade 3

## Checklist Geral

- [ ] Autenticação implementada
- [ ] Autorização em todas as rotas
- [ ] Validação de inputs
- [ ] Headers de segurança
- [ ] Rate limiting
- [ ] Logs de auditoria
- [ ] Erros genéricos
- [ ] HTTPS
- [ ] Dependencies atualizadas
```

---

## Regras

- Analisar TODO o código, não só endpoints
- Verificar dependências (npm audit, safety)
- Testar na prática quando possível
- Reportar SEMPRE todas as vulnerabilidades
- Classificar por severidade (Crítica/Alta/Média/Baixa)
- Dar recomendações claras de correção
- Seguir OWASP Top 10
- Nunca inventar vulnerabilidades que não existem
- Documentar false positives se houver

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Dev Eng|Skills - Dev Eng]]
<!-- vault-navigation:end -->
