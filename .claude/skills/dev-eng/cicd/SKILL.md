---
tipo: skill
nome: Pipeline CI/CD (GitHub Actions)
name: cicd
aliases:
  - cicd
  - /cicd
  - Pipeline CI/CD (GitHub Actions)
tags:
  - h4
  - skill
  - dev
  - reolios
camada: 3_folha
dominio: tecnologia
categoria: dev-eng
subtipo: skill
hierarquia: 4
h: 4
hub_pai: '[[hubs/skills/Skills - Dev Eng]]'
description: >
  Criar pipeline CI/CD completo com GitHub Actions.
---

# Pipeline CI/CD (GitHub Actions)

## Objetivo


Criar um pipeline de CI/CD completo com GitHub Actions — automatizando testes, build, linting e deploy — para que cada push/PR seja validado automaticamente e deploys aconteçam de forma segura e consistente.

## Quando usar


    Ao configurar CI/CD pela primeira vez no projeto
    Para automatizar testes que a equipe esquece de rodar
    Na padronização do processo de deploy
    Quando deploys manuais causam problemas


## Como usar


    1Copie o prompt abaixo no Claude ou ChatGPT
    2Descreva o projeto, stack e processo de deploy
    3Receba o workflow completo do GitHub Actions
    4Configure no repositório (.github/workflows/)


## O Prompt


Projete pipeline com etapas, critérios de falha, segregação de ambientes conforme o risco e procedimento de reversão testado. Meça duração e tempo de recuperação no projeto antes de definir metas numéricas.

Crie o pipeline de CI/CD para:

**Projeto:** [tipo — web app, API, mobile, monorepo]
**Stack:** [ex: Next.js, Node.js, Python/Django, Go]
**Repositório:** [GitHub — monorepo ou single]
**Testes:** [Jest, pytest, Go test — quais existem]
**Linting:** [ESLint, Prettier, Black — quais usa]
**Build:** [como faz build — npm run build, docker build, etc.]
**Deploy:** [onde deploya — Vercel, AWS, Railway, Docker, Kubernetes]
**Ambientes:** [staging, production, preview]
**Branches:** [main = prod? develop = staging? feature branches?]
**Banco de dados:** [precisa de migration no deploy?]
**Secrets:** [variáveis de ambiente necessárias]

Entregue:

**1. Estratégia de CI/CD** - Diagrama do fluxo completo
**2. Workflow de CI (Pull Request)** - YAML completo para .github/workflows/ci.yml
**3. Workflow de CD (Deploy)** - YAML para deploy staging/prod
**4. Workflow de Preview** - Deploy automático para cada PR
**5. Configuração de secrets** - Lista de secrets necessárias
**6. Branch protection rules** - Configurações recomendadas
**7. Monitoramento pós-deploy** - Health check e alertas
**8. Otimizações** - Cache, paralelização, skip CI


## Exemplo de uso


## Input


Projeto: API Node.js (Express + TypeScript) Testes: Jest (unit + integration) Linting: ESLint + Prettier Deploy: Docker → AWS ECS Branches: main = prod, develop = staging DB: PostgreSQL (precisa migration com Prisma)

## Output


name: CI
on:
  pull_request:
    branches: [main, develop]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run format:check

  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_DB: test
          POSTGRES_PASSWORD: test
        ports: ['5432:5432']
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npx prisma migrate deploy
        env:
          DATABASE_URL: postgresql://postgres:test@localhost:5432/test
      - run: npm test -- --coverage

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Dev Eng|Skills - Dev Eng]]
<!-- vault-navigation:end -->
