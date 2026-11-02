---
tipo: skill
nome: Pipelines CI/CD completas
name: ci-cd
aliases:
  - ci-cd
  - /ci-cd
  - Pipelines CI/CD completas
tags:
  - h4
  - skill
  - devops
  - reolios
camada: 3_folha
dominio: tecnologia
categoria: devops
subtipo: skill
hierarquia: 4
h: 4
hub_pai: '[[hubs/skills/Skills - Devops]]'
description: >
  Cria pipelines CI/CD completas com GitHub Actions. Automatiza build, testes,
  deploy e notificações. Use quando pedir "ci cd", "github actions", "pipeline",
  "automação deploy", "/ci-cd" ou "/pipeline".
---

# Pipelines CI/CD completas

Cria pipelines automáticas de build, teste e deploy usando GitHub Actions.

## Dependências

- **Stack:** detectar automáticamente (Node, Python, Go, etc)
- **Output:** `.github/workflows/`

---

## Workflow

### Passo 1 — Briefing

Perguntar ao usuário:
1. Qual a stack do projeto? (Node, Python, Go, etc)
2. Onde vai fazer deploy? (Vercel, Railway, AWS, Docker)
3. Quais etapas quer na pipeline? (testes, lint, build, deploy)
4. Precisa de ambiente staging e production?

### Passo 2 — Estrutura Base

```
.github/
└── workflows/
    ├── ci.yml           ← testes e build
    ├── deploy-staging.yml ← deploy staging
    └── deploy-production.yml ← deploy production
```

### Passo 3 — Pipeline CI (Testes e Build)

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  lint:
    name: Lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node
        if: needs(node)
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linter
        run: npm run lint

  test:
    name: Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Upload coverage
        uses: codecov/codecov-action@v4
        with:
          token: ${{ secrets.CODECOV_TOKEN }}

  build:
    name: Build
    runs-on: ubuntu-latest
    needs: [lint, test]
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/
```

### Passo 4 — Pipeline Deploy (Vercel)

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches:
      - main
      - develop

env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

jobs:
  deploy-staging:
    name: Deploy Staging
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/develop'
    environment: staging
    steps:
      - uses: actions/checkout@v4
      
      - name: Install Vercel
        run: npm install -g vercel
      
      - name: Pull Vercel Environment
        run: vercel pull --environment=staging --token=${{ secrets.VERCEL_TOKEN }}
      
      - name: Build Project
        run: vercel build --token=${{ secrets.VERCEL_TOKEN }}
      
      - name: Deploy to Vercel
        run: vercel deploy --prebuilt --token=${{ secrets.VERCEL_TOKEN }}

  deploy-production:
    name: Deploy Production
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    environment: production
    needs: [lint, test]
    steps:
      - uses: actions/checkout@v4
      
      - name: Install Vercel
        run: npm install -g vercel
      
      - name: Pull Vercel Environment
        run: vercel pull --environment=production --token=${{ secrets.VERCEL_TOKEN }}
      
      - name: Build Project
        run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}
      
      - name: Deploy to Vercel
        run: vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}
```

### Passo 5 — Pipeline Deploy (Railway)

```yaml
# .github/workflows/deploy-railway.yml
name: Deploy Railway

on:
  push:
    branches: [main]

jobs:
  deploy:
    name: Deploy
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Install Railway
        run: npm install -g @railway/cli
      
      - name: Login to Railway
        run: railway login --token=${{ secrets.RAILWAY_TOKEN }}
      
      - name: Deploy
        run: railway up --environment=production
```

### Passo 6 — Notificações

Adicionar notificações no final da pipeline:

```yaml
  notify-failure:
    name: Notify on Failure
    runs-on: ubuntu-latest
    needs: [deploy-production]
    if: failure()
    steps:
      - name: Send Discord notification
        run: |
          curl -H "Content-Type: application/json" \
            -d '{"content":"❌ Deploy falhou! Verifique: https://github.com/${{ github.repository }}/actions"}' \
            ${{ secrets.DISCORD_WEBHOOK }}
      
      - name: Send Slack notification
        if: secrets.SLACK_WEBHOOK
        run: |
          curl -X POST -H 'Content-type: application/json' \
            --data '{"text":"❌ Deploy falhou! <https://github.com/${{ github.repository }}/actions|Ver detalhes>"}' \
            ${{ secrets.SLACK_WEBHOOK }}
```

---

## Templates por Stack

### Node.js + Vercel
```yaml
# Básico pra Node + Vercel
name: CI/CD

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm test
```

### Python + Railway
```yaml
name: CI/CD

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.11'
      - run: pip install -r requirements.txt
      - run: pytest
```

---

## Estrutura de Entrega

```
.github/
├── workflows/
│   ├── ci.yml              ← testes + lint
│   ├── deploy-staging.yml  ← staging (develop)
│   └── deploy-production.yml ← production (main)
├── ISSUE_TEMPLATE/
│   └── bug_report.md
└── PULL_REQUEST_TEMPLATE.md
```

---

## Secrets Necessários

```
┌─────────────────────────────────────────────────────────────┐
│                    SECRETS DO GITHUB                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  VERCEL                                                    │
│  ├── VERCEL_TOKEN                                         │
│  ├── VERCEL_ORG_ID                                        │
│  └── VERCEL_PROJECT_ID                                    │
│                                                             │
│  RAILWAY                                                   │
│  └── RAILWAY_TOKEN                                         │
│                                                             │
│  NOTIFICAÇÕES                                              │
│  ├── DISCORD_WEBHOOK                                      │
│  ├── SLACK_WEBHOOK                                        │
│  └── TELEGRAM_BOT_TOKEN                                   │
│                                                             │
│  MONITORAMENTO                                            │
│  ├── SENTRY_DSN                                           │
│  └── DATADOG_API_KEY                                      │
│                                                             │
│  CODECOV                                                   │
│  └── CODECOV_TOKEN                                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Regras

- Sempre separar CI (testes) de CD (deploy)
- Deploy só executa se testes passarem
- Environments (staging/production) separados
- Notificar em caso de falha
- Secrets nunca expostos em logs
- Cache de dependências pra加快
- Artifacts compartilhados entre jobs

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Devops|Skills - Devops]]
<!-- vault-navigation:end -->
