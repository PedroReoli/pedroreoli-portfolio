---
tipo: skill
nome: Implementação completa de segurança
name: security
aliases:
  - security
  - /security
  - Implementação completa de segurança
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
  Implementa segurança completa em APIs e sistemas. Baseado no OWASP Top 10,
  cobre autenticação JWT, autorização, proteção contra SQL injection, XSS, CSRF,
  rate limiting, headers de segurança e mais. Use quando pedir "segurança",
  "implementar auth", "proteger API", "/security" ou "/auth-seguro".
---

# Implementação completa de segurança

Aplica segurança de nível enterprise em qualquer sistema. Baseado no OWASP Top 10 e melhores práticas.

## Dependências

- **Referência:** `security.md` (documento completo de segurança)
- **Contexto:** `sistema/memoria/empresa.md`

---

## O que essa skill faz

Para **cada endpoint/rota/funcionalidade criada**, essa skill garante que:

```
┌─────────────────────────────────────────────────────────────┐
│                    CHECKLIST DE SEGURANÇA                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  AUTENTICAÇÃO                                               │
│  ├── JWT com access token curto (15min)                    │
│  ├── Refresh token com rotação                             │
│  ├── Cookie HttpOnly, Secure, SameSite                     │
│  └── Nunca salvar JWT sensível em localStorage             │
│                                                             │
│  AUTORIZAÇÃO                                                │
│  ├── Validar permissão em TODAS as rotas                   │
│  ├── Verificar propriedade do recurso                      │
│  ├── RBAC/ABAC implementado                                │
│  └── Deny by default                                       │
│                                                             │
│  VALIDAÇÃO                                                  │
│  ├── Schema em todo payload (Zod/Pydantic)                │
│  ├── Tipos, tamanhos, formatos                              │
│  ├── Remover campos extras                                  │
│  └── Sanitização de toda entrada                           │
│                                                             │
│  PROTEÇÃO CONTRA                                           │
│  ├── SQL Injection (ORM, queries parametrizadas)           │
│  ├── XSS (escapar saída, CSP, sanitização)                 │
│  ├── CSRF (SameSite, CSRF token)                           │
│  ├── Brute Force (rate limiting)                           │
│  ├── SSRF (allowlist, validar URLs)                        │
│  └── Broken Access Control (guards)                        │
│                                                             │
│  HEADERS                                                    │
│  ├── Strict-Transport-Security (HSTS)                      │
│  ├── X-Content-Type-Options                                │
│  ├── X-Frame-Options                                       │
│  ├── Content-Security-Policy                               │
│  └── Permissions-Policy                                     │
│                                                             │
│  ERROS                                                      │
│  ├── Mensagens genéricas pro usuário                        │
│  ├── Logs detalhados internamente                          │
│  └── Nunca expor stack, senhas, tokens                      │
│                                                             │
│  UPLOADS                                                    │
│  ├── Validar extensão e MIME                               │
│  ├── Limitar tamanho                                        │
│  ├── Renomear no servidor                                   │
│  └── Bloquear executáveis (.js, .exe, .php)               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Templates de Implementação

### JWT Auth (Node.js/Express)

```typescript
// middleware/auth.ts
import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const ACCESS_TOKEN_EXPIRES = '15m';

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;
const REFRESH_TOKEN_EXPIRES = '7d';

interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

export function generateAccessToken(payload: TokenPayload): string {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES });
}

export function generateRefreshToken(payload: TokenPayload): string {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES });
}

export function verifyAccessToken(token: string): TokenPayload {
  return jwt.verify(token, ACCESS_TOKEN_SECRET) as TokenPayload;
}

export function verifyRefreshToken(token: string): TokenPayload {
  return jwt.verify(token, REFRESH_TOKEN_SECRET) as TokenPayload;
}

// middleware requiring auth
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.accessToken || req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Não autenticado' });
  }
  
  try {
    const payload = verifyAccessToken(token);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ message: 'Token inválido ou expirado' });
  }
}

// Cookie seguro
export function setRefreshCookie(res: Response, token: string) {
  res.cookie('refreshToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
    path: '/auth/refresh'
  });
}
```

### Rate Limiting

```typescript
// middleware/rateLimit.ts
import rateLimit from 'express-rate-limit';

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // 5 tentativas
  message: 'Muitas tentativas. Tente novamente em 15 minutos.',
  standardHeaders: true,
  legacyHeaders: false,
});

export const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 100, // 100 requests
  message: 'Limite de requisições excedido.',
});
```

### Validação com Zod

```typescript
// schemas/user.ts
import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8).max(100)
    .regex(/[A-Z]/) // pelo menos 1 maiúscula
    .regex(/[a-z]/) // pelo menos 1 minúscula
    .regex(/[0-9]/) // pelo menos 1 número
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export const createUserSchema = registerSchema.omit({ password: true });
```

### Headers de Segurança

```typescript
// middleware/security.ts
import helmet from 'helmet';

export const securityMiddleware = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      fontSrc: ["'self'", "https:"],
      connectSrc: ["'self'", "https://api.seudominio.com"],
      frameAncestors: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"]
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
});

// CORS restrito
export const corsOptions = {
  origin: ['https://seudominio.com', 'https://www.seudominio.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
```

### SQL Injection Prevention

```typescript
// Usar ORM (Prisma) ou queries parametrizadas
// NUNCA fazer isso:
const query = `SELECT * FROM users WHERE email = '${email}'`; // ❌

// FAZER ISSO:
const user = await prisma.user.findUnique({
  where: { email }
}); // ✅ ORM

// Ou com query parametrizada:
const result = await db.query(
  'SELECT * FROM users WHERE email = $1',
  [email]
); // ✅
```

---

## Checklist por Endpoint

Para cada rota criada, verificar:

```markdown
### [ ] Rota `/api/recurso`
- [ ] Autenticação: quem pode acessar?
- [ ] Autorização: o usuário tem permissão?
- [ ] Propriedade: o recurso pertence ao usuário?
- [ ] Schema: payload validado com Zod/Pydantic?
- [ ] Tamanho: limite de body/body params?
- [ ] Rate limit: foi adicionado se rota sensível?
- [ ] Logs: ação crítica registrada?
- [ ] Resposta: dados sensíveis removidos?
- [ ] Erro: mensagem genérica pro usuário?
- [ ] Docs: documentado no Swagger?
```

---

## Regras

- Segurança NÃO é opcional — é padrão
- Nunca implementar apenas o "caminho feliz"
- Para cada feature, sempre perguntar:
  - Quem pode acessar?
  - Quem NÃO pode acessar?
  - O que pode ser visto?
  - O que NÃO pode ser retornado?
- Logs nunca devem conter senhas, tokens ou dados críticos
- Erros sempre genéricos pro usuário, detalhados nos logs
- Aplicar do zero, não como afterthought
- Seguir OWASP Top 10

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Dev Eng|Skills - Dev Eng]]
<!-- vault-navigation:end -->
