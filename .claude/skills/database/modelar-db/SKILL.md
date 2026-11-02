---
tipo: skill
nome: Modelagem de banco de dados
name: modelar-db
aliases:
  - modelar-db
  - /modelar-db
  - Modelagem de banco de dados
tags:
  - h4
  - skill
  - database
  - reolios
camada: 3_folha
dominio: tecnologia
categoria: database
subtipo: skill
hierarquia: 4
h: 4
hub_pai: '[[hubs/skills/Skills - Database]]'
description: >
  Modela bancos de dados com Prisma. Cria schemas, relações, migrations e seed.
  Pergunta a estrutura e gera tudo pronto. Use quando pedir "modelar banco",
  "criar schema", "prisma", "database", "/modelar-db" ou "/db".
---

# Modelagem de banco de dados

Modela banco de dados usando Prisma ORM. Cria schemas, relações, validações e migrations.

## Dependências

- **Stack:** Node.js (Prisma é principalmente Node)
- **Output:** `prisma/schema.prisma`, `prisma/migrations/`

---

## Workflow

### Passo 1 — Briefing

Perguntar ao usuário:
1. Qual banco usar? (PostgreSQL, MySQL, SQLite, MongoDB)
2. Quais entidades/modelos precisa? (Lista de recursos)
3. Quais campos cada um tem?
4. Quais relações entre eles?
5. Precisa de soft delete? (exclusão lógica)
6. Precisa de timestamps automáticos?

### Passo 2 — Entidades

Para cada entidade, definir:

```
┌─────────────────────────────────────────────────────────────┐
│                    ENTIDADE: [Nome]                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  CAMPOS:                                                   │
│  ├── id:            auto (cuid)                           │
│  ├── name:          string (obrigatório)                   │
│  ├── email:         string (único)                         │
│  ├── status:        enum (active, inactive)               │
│  ├── createdAt:     datetime (auto)                        │
│  ├── updatedAt:     datetime (auto)                        │
│  └── deletedAt:     datetime? (soft delete)                │
│                                                             │
│  RELAÇÕES:                                                 │
│  ├── 1:N com User (cliente tem vários pedidos)            │
│  ├── N:M com Tag (posts têm várias tags)                 │
│  └── 1:1 com Profile (usuário tem um perfil)             │
│                                                             │
│  REGRAS:                                                   │
│  ├── email único                                           │
│  ├── nome com mínimo de caracteres                        │
│  └── status padrão: active                                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Passo 3 — Gerar Schema

Gerar `prisma/schema.prisma`:

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============================================
// USER
// ============================================
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  password  String
  role      Role     @default(USER)
  status    Status   @default(ACTIVE)
  
  // Relations
  posts     Post[]
  orders    Order[]
  
  // Timestamps
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Soft delete
  deletedAt DateTime?
  
  @@map("users")
}

// ============================================
// POST
// ============================================
model Post {
  id        String   @id @default(cuid())
  title     String
  content   String   @db.Text
  slug      String   @unique
  published Boolean  @default(false)
  
  // Author
  authorId  String
  author    User     @relation(fields: [authorId], references: [id])
  
  // Relations
  tags      Tag[]
  comments  Comment[]
  
  // Timestamps
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@map("posts")
}

// ============================================
// ENUMS
// ============================================
enum Role {
  USER
  ADMIN
  SUPERADMIN
}

enum Status {
  ACTIVE
  INACTIVE
  PENDING
}
```

### Passo 4 — Relações

Exemplos de tipos de relação:

**1:N (um usuário tem vários posts)**
```prisma
model User {
  posts Post[]
}

model Post {
  author   User @relation(fields: [authorId], references: [id])
  authorId String
}
```

**N:M (posts têm várias tags)**
```prisma
model Post {
  tags Tag[]
}

model Tag {
  posts Post[]
}
```

**1:1 (usuário tem um perfil)**
```prisma
model User {
  profile Profile?
}

model Profile {
  userId String @unique
  user   User   @relation(fields: [userId], references: [id])
}
```

### Passo 5 — Validações

Adicionar validações no schema:

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique  // único
  name      String              // obrigatório
  password  String   @db.VarChar(255)
  age       Int?                // opcional
  role      Role     @default(USER)
  
  // Validações via @db
  bio       String?  @db.VarChar(500) // max 500 chars
  
  // Index
  @@index([email])
  @@index([role])
}
```

### Passo 6 — Migrations

```bash
# Criar migration inicial
npx prisma migrate dev --name init

# Aplicar migration em produção
npx prisma migrate deploy

# Resetar banco (DEV ONLY)
npx prisma migrate reset
```

### Passo 7 — Seed

Gerar arquivo de seed:

```typescript
// prisma/seed.ts
import { PrismaClient, Role, Status } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Criar usuários
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin',
      password: 'hashed_password',
      role: Role.ADMIN,
      status: Status.ACTIVE,
    },
  })

  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: 'User',
      password: 'hashed_password',
      role: Role.USER,
      status: Status.ACTIVE,
    },
  })

  // Criar posts
  await prisma.post.createMany({
    data: [
      { title: 'Post 1', content: 'Content 1', authorId: admin.id },
      { title: 'Post 2', content: 'Content 2', authorId: user.id },
    ],
  })

  console.log('Seed completed!')
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect())
```

### Passo 8 — Prisma Client

```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

---

## Estrutura de Entrega

```
prisma/
├── schema.prisma       ← modelo do banco
├── migrations/          ← histórico de migrations
├── seed.ts             ← dados iniciais
└── .env                ← variáveis (gitignored)

src/
├── lib/
│   └── prisma.ts       ← cliente singleton
└── ...

package.json (scripts atualizados)
```

---

## Comandos Úteis

```bash
# Iniciar Prisma
npx prisma init

# Criar migration
npx prisma migrate dev --name nome-da-migration

# Aplicar migrations
npx prisma migrate deploy

# Gerar Prisma Client
npx prisma generate

# Seed
npx prisma db seed

# Resetar (DEV)
npx prisma migrate reset

# Abrir Prisma Studio
npx prisma studio
```

---

## Regras

- Sempre usar CUID para IDs
- Adicionar timestamps em todas as tabelas
- Usar soft delete quando apropriado
- Criar índices para campos frequentemente buscados
- Validações no schema (not null, unique, length)
- Enums para campos com opções fixas
- Mapear nomes das tabelas (@@map)
- Separar schema em blocos com comentários

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Database|Skills - Database]]
<!-- vault-navigation:end -->
