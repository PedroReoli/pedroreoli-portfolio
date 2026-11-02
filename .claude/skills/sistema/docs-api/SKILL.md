---
tipo: skill
nome: Documentação e API do ReoliOS
name: docs-api
aliases:
  - docs-api
  - /docs-api
  - Documentação e API do ReoliOS
tags:
  - h4
  - skill
  - sistema
  - reolios
camada: 3_folha
dominio: operacao
categoria: sistema
subtipo: skill
hierarquia: 4
h: 4
hub_pai: '[[hubs/skills/Skills - Sistema]]'
description: >
  Cria documentação completa, API REST e guides interativos para o ReoliOS. Use
  quando o usuário pedir "documentar", "criar API", "gerar docs", "/docs" ou
  "/api".
---

# Documentação e API do ReoliOS

## Quando usar

- `/docs` — gerar toda a documentação do projeto
- `/api` — criar ou documentar endpoints da API
- `/swagger` — gerar documentação OpenAPI
- "criar SDK" — gerar SDK em Python, JS ou Node
- "documentar skill" — documentar uma skill específica
- "gerar changelog" — criar changelog de versão

---

## Fluxo de Documentação

### 1. Identificar o escopo

Perguntar ao usuário:
- **Documentação completa** ou **específica** (skills, API, setup)?
- **Formato**: Markdown, HTML, PDF, Swagger?
- **Público-alvo**: devs técnicos, usuários finais, prospects?

### 2. Estrutura padrão

```
docs/
├── getting-started/     ← guia de início
├── guides/              ← tutoriais passo a passo
├── reference/           ← referência técnica (API, CLI)
├── api/                 ← documentação da API
│   ├── openapi.yaml     ← especificação OpenAPI
│   ├── endpoints/       ← cada endpoint documentado
│   └── sdks/            ← SDKs gerados
└── changelog.md         ← histórico de versões
```

### 3. Gerar documentação

Para **getting-started**:
1. Ler `README.md` atual
2. Identificar gaps (o que falta explicar)
3. Gerar seções: instalação, configuração, primeiro comando, FAQs
4. Incluir screenshots/ASCII mocks quando útil

Para **API Reference**:
1. Mapear todos os endpoints existentes
2. Criar arquivo `openapi.yaml` com spec completa
3. Gerar文档 para cada endpoint:
   - Método e path
   - Parâmetros (query, body, headers)
   - Autenticação
   - Request/Response examples
   - Códigos de erro

---

## Fluxo da API REST

### Estrutura base

```javascript
// api/routes/
// ├── auth.js          ← login, registro, senha
// ├── projects.js      ← CRUD de projetos
// ├── skills.js        ← executar skills
// ├── reports.js       ← gerar e buscar relatórios
// └── integrations.js  ← webhook endpoints
```

### Endpoints principais

#### Autenticação
```
POST /api/auth/register   — criar conta
POST /api/auth/login      — login
POST /api/auth/logout     — logout
POST /api/auth/refresh   — refresh token
```

#### Projetos
```
GET    /api/projects          — listar projetos
POST   /api/projects          — criar projeto
GET    /api/projects/:id      — detalhes do projeto
PUT    /api/projects/:id      — atualizar projeto
DELETE /api/projects/:id      — deletar projeto
```

#### Skills (Execução)
```
POST /api/skills/:name/execute  — executar skill
GET  /api/skills                — listar skills disponíveis
GET  /api/skills/:name          — info de uma skill
```

#### Relatórios
```
GET  /api/reports           — listar relatórios
GET  /api/reports/:id       — detalhes do relatório
POST /api/reports/generate  — gerar novo relatório
GET  /api/reports/export    — exportar (PDF, CSV, PNG)
```

#### Integrações
```
POST /api/webhooks/meta         — webhook Meta (Instagram/Facebook)
POST /api/webhooks/google-ads   — webhook Google Ads
GET  /api/integrations/status   — status das integrações
POST /api/integrations/connect   — conectar nova integração
```

### Autenticação

- JWT tokens com expiração de 7 dias
- Refresh token para renovação automática
- Rate limiting: 100 req/min por usuário
-Scopes: `read`, `write`, `admin`

### Response format

```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "timestamp": "2025-01-15T10:30:00Z",
    "requestId": "req_abc123"
  }
}
```

### Erros

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Parâmetros inválidos",
    "details": [
      { "field": "email", "message": "Email inválido" }
    ]
  }
}
```

---

## Gerar SDKs

### Python SDK

```python
# reolios-python/
# ├── __init__.py
# ├── client.py       ← cliente principal
# ├── projects.py     ← endpoints de projetos
# ├── skills.py       ← executar skills
# └── models.py       ← tipos/Pydantic
```

### JavaScript/Node SDK

```javascript
// reolios-js/
// ├── index.js       ← exports principais
// ├── client.js      ← cliente HTTP
// ├── projects.js    ← CRUD de projetos
// ├── skills.js      ← execução de skills
// └── types.ts       ← TypeScript types
```

### Instalar SDK

```bash
# Python
pip install reolios

# Node
npm install @reolios/sdk
```

### Uso básico

```python
from reolios import Reolios

client = Reolios(api_key="your-key")

# Listar projetos
projects = client.projects.list()

# Executar skill
result = client.skills.execute("carrossel", {
    "tema": "lançamento",
    "formato": "instagram"
})
```

---

## Swagger/OpenAPI

Gerar arquivo `openapi.yaml` completo com:
- Info (título, versão, descrição)
- Servers (local, production)
- Auth (Bearer JWT)
- Paths (todos os endpoints)
- Components (schemas, security schemes)
- Tags (group by resource)

Ferramentas recomendadas:
- [Swagger Editor](https://editor.swagger.io/)
- [Stoplight](https://stoplight.io/)
- [Postman](https://www.postman.com/)

---

## Checklist de entrega

- [ ] Documentação principal (`docs/README.md`)
- [ ] Getting started (`docs/getting-started/instalacao.md`)
- [ ] Guide rápido (`docs/guides/primeiros-passos.md`)
- [ ] API Reference (`docs/api/README.md`)
- [ ] `openapi.yaml` (se aplicável)
- [ ] SDK (Python e/ou JS, se aplicável)
- [ ] Changelog (`CHANGELOG.md`)
- [ ] Badges no README (build, version, license)

---

## Dicas

1. **Documentar antes de implementar** — ajuda a clarificar requisitos
2. **Usar exemplos reais** — dados fictícios mas realistas
3. **Versionar a API** — `/v1`, `/v2` no path
4. **Incluir erros comuns** — troubleshooting no docs
5. **Manter atualizado** — doc que enrosca é doc abandonada

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Sistema|Skills - Sistema]]
<!-- vault-navigation:end -->
