---
tipo: skill
nome: Cria API completa em qualquer stack
name: criar-api
aliases:
  - criar-api
  - /criar-api
  - Cria API completa em qualquer stack
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
  Cria APIs completas do zero. Pergunta a stack preferida (Node.js, Python, Go,
  etc), estrutura o projeto, define rotas, autenticação, banco de dados e
  documentação. Use quando o usuário pedir "criar API", "montar backend",
  "desenvolver API REST", "/criar-api" ou "/backend".
---

# Cria API completa em qualquer stack

Gera uma API robusta, segura e documentada. Pergunta a stack, estrutura o projeto completo e entrega código production-ready.

## Dependências

- **Contexto:** `sistema/memoria/empresa.md` (para entender o domínio)
- **Output:** `projetos/<nome-da-api>/`

---

## Workflow

### Passo 1 — Briefing

Perguntar ao usuário:

**1. Stack preferida:**
- Node.js + Express ou Fastify
- Python + FastAPI ou Flask
- Go + Gin ou Echo
- TypeScript + Node.js
- Outro (especificar)

**2. Banco de dados:**
- PostgreSQL
- MySQL
- MongoDB
- SQLite (MVP)
- Nenhum (apenas processamento)

**3. Autenticação:**
- JWT
- OAuth (Google, GitHub, etc)
- API Key
- Nenhuma

**4. Propósito da API:**
- Para que serve?
- Quais endpoints principais?
- Quem vai consumir? (web, mobile, outros serviços)

**5. Recursos/Entidades principais:**
- Quais são os principais recursos? (usuários, produtos, pedidos, etc)
- Quais operações em cada um? (CRUD, listar, buscar, etc)

### Passo 2 — Estrutura do Projeto

Criar estrutura baseada na stack:

**Node.js/Express:**
```
projetos/<nome>/
├── src/
│   ├── routes/          ← rotas da API
│   ├── controllers/     ← lógica de negócio
│   ├── models/          ← schemas/validação
│   ├── middleware/      ← auth, errors, logging
│   ├── services/       ← lógica reutilizável
│   ├── utils/          ← helpers
│   └── config/         ← variáveis de ambiente
├── tests/
├── prisma/             ← schemas do banco
├── package.json
├── tsconfig.json
└── README.md
```

**Python/FastAPI:**
```
projetos/<nome>/
├── app/
│   ├── routers/        ← rotas
│   ├── models/         ← Pydantic/schemas
│   ├── services/       ← lógica
│   ├── core/           ← config, security
│   └── main.py         ← entry point
├── tests/
├── requirements.txt
└── README.md
```

### Passo 3 — Implementar

**Módulos a criar:**

1. **Configuração base**
   - Variáveis de ambiente
   - Conexão com banco
   - Logging

2. **Modelos/Schemas**
   - Validação com Zod (TS) ou Pydantic (Python)
   - Tipos seguros

3. **Rotas básicas**
   ```
   CRUD completo para cada recurso:
   - GET    /recurso         → listar
   - POST   /recurso         → criar
   - GET    /recurso/:id     → buscar um
   - PUT    /recurso/:id     → atualizar
   - DELETE /recurso/:id     → deletar
   ```

4. **Autenticação**
   - Registro/Login
   - JWT com refresh token
   - Middleware de proteção

5. **Segurança** (aplicar de `security.md`)
   - Rate limiting
   - Validação de input
   - Sanitização
   - Headers de segurança

6. **Error handling**
   - Middleware de erros genéricos
   - Logs estruturados

7. **Testes básicos**
   - Unit tests
   - Integration tests

### Passo 4 — Documentação

Gerar `README.md` com:
- Como rodar localmente
- Variáveis de ambiente necessárias
- Endpoints disponíveis
- Exemplos de requisição/resposta
- Autenticação (como usar)

### Passo 5 — Entrega

```
projetos/<nome>/
├── src/                   ← código fonte
├── tests/                 ← testes
├── prisma/ ou migrations/  ← banco
├── .env.example            ← exemplo de variáveis
├── package.json ou requirements.txt
├── tsconfig.json (se TS)
├── docker-compose.yml (se aplicável)
├── SPEC.md                 ← especificação da API
└── README.md               ← documentação
```

---

## Regras

- Perguntar a stack antes de começar
- Código limpo e documentado
- Aplicar segurança desde o início (não como afterthought)
- Usar TypeScript se possível (mais segurança)
- Validação estrita em todos os inputs
- Logs em todas as operações críticas
- Nomes descritivos de arquivos e funções
- Separar rotas, controllers e services
- Sempre criar README com instruções
- Incluir docker-compose para facilitar deploy

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Dev Eng|Skills - Dev Eng]]
<!-- vault-navigation:end -->
