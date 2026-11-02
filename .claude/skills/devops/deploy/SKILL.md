---
tipo: skill
nome: Configuração completa de deploy
name: deploy
aliases:
  - deploy
  - /deploy
  - Configuração completa de deploy
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
  Cria scripts e configurações para deploy. Vercel, Railway, AWS, Docker,
  Fly.io. Use quando pedir "deploy", "production", "hosting", "/deploy" ou
  "/publicar".
---

# Configuração completa de deploy

Cria configurações e scripts para deploy em diversas plataformas.

## Dependências

- **Stack:** detectar automaticamente
- **Output:** raiz do projeto

---

## Workflow

### Passo 1 — Briefing

Perguntar ao usuário:
1. Onde quer fazer deploy? (Vercel, Railway, AWS, Docker, Fly.io)
2. Qual ambiente? (staging, production, ambos)
3. Precisa de .env configurado?
4. Build command padrão? (npm run build)

### Passo 2 — Vercel (Recomendado para Next.js)

**1. vercel.json:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "framework": "nextjs",
  "env": {
    "NODE_ENV": "production"
  },
  "regions": ["gru1"],
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Origin", "value": "*" },
        { "key": "Cache-Control", "value": "no-cache" }
      ]
    }
  ]
}
```

**2. .vercelignore:**
```
node_modules
.env
.env.local
tests
*.test.ts
coverage
```

**3. GitHub Actions (ver /ci-cd):**
- Ver skill `/ci-cd` para pipeline completa

### Passo 3 — Railway

**1. railway.json:**
```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "numReplicas": 1,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMax": 3
  }
}
```

**2. Dockerfile (se precisar customizar):**
```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

**3. .dockerignore:**
```
node_modules
npm-debug.log
.git
.env
.env.local
coverage
tests
```

### Passo 4 — Docker (Deploy manual)

**Dockerfile:**
```dockerfile
# ---- Build Stage ----
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---- Production Stage ----
FROM node:20-alpine AS production

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

ENV NODE_ENV=production

EXPOSE 3000

USER node

CMD ["sh", "-c", "node server.js"]
```

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - NODE_ENV=production
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=app
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  postgres_data:
```

### Passo 5 — Fly.io

**fly.toml:**
```toml
app = "reolios-app"

[build]
  builder = "heroku/buildpacks:20"

[env]
  PORT = "8080"

[[services]]
  internal_port = 8080

  [[services.ports]]
    port = 80
    handlers = ["http"]

  [[services.ports]]
    port = 443
    handlers = ["tls", "http"]

  [services.concurrency]
    hard_limit = 25
    soft_limit = 20

[[services.http_checks]]
  interval = 10000
  timeout = 2000
  path = "/health"
```

### Passo 6 — AWS (ECS)

**Dockerrun.aws.json:**
```json
{
  "AWSEBDockerrunVersion": "1",
  "Image": {
    "Name": "reolios/app:latest",
    "Update": "true"
  },
  "Ports": [
    {
      "ContainerPort": 3000
    }
  ],
  "Logging": "/var/log/nginx",
  "Environment": [
    {
      "Name": "DATABASE_URL",
      "Value": "..."
    }
  ]
}
```

### Passo 7 — Health Check

```typescript
// src/routes/health.ts
import { Router } from 'express'

const router = Router()

router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
  })
})

router.get('/health/ready', async (req, res) => {
  try {
    // Check database
    await prisma.$queryRaw`SELECT 1`
    
    res.json({ status: 'ready' })
  } catch (error) {
    res.status(503).json({ status: 'not ready', error })
  }
})

export default router
```

### Passo 8 — Variáveis de Ambiente

**.env.production:**
```env
# App
NODE_ENV=production
PORT=3000
APP_URL=https://seudominio.com

# Database
DATABASE_URL=postgresql://user:password@host:5432/db

# JWT
JWT_SECRET=your-super-secret-key
ACCESS_TOKEN_EXPIRES=15m
REFRESH_TOKEN_EXPIRES=7d

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Sentry
SENTRY_DSN=https://...@sentry.io/...

# Redis (se usar)
REDIS_URL=redis://localhost:6379
```

### Passo 9 — Nginx (proxy reverso)

```nginx
# /etc/nginx/sites-available/default
server {
    listen 80;
    server_nameseudominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## Deploy Checklist

```
┌─────────────────────────────────────────────────────────────┐
│                    DEPLOY CHECKLIST                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ANTES DO DEPLOY:                                          │
│  ├── [ ] .env.prod configurado                             │
│  ├── [ ] Build funciona localmente                         │
│  ├── [ ] Tests passando                                    │
│  ├── [ ] secrets no dashboard da plataforma               │
│  └── [ ] Health check implementado                        │
│                                                             │
│  DEPOIS DO DEPLOY:                                         │
│  ├── [ ] Verificar health endpoint                        │
│  ├── [ ] Testar fluxo principal                           │
│  ├── [ ] Verificar logs                                   │
│  ├── [ ] Monitorar erros (Sentry)                        │
│  └── [ ] SSL configurado                                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Regras

- Sempre criar health check endpoint
- Variáveis sensíveis via dashboard/plataforma, nunca no código
- Build command verificado
- Health check antes de marcar como "deployed"
- Logs agregados (datadog, logtail, etc)
- Rollback procedure documentada

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Devops|Skills - Devops]]
<!-- vault-navigation:end -->
