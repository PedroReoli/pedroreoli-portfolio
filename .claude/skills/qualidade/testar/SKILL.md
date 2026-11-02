---
tipo: skill
nome: Suite completa de testes
name: testar
aliases:
  - testar
  - /testar
  - Suite completa de testes
tags:
  - h4
  - skill
  - qualidade
  - reolios
camada: 3_folha
dominio: tecnologia
categoria: qualidade
subtipo: skill
hierarquia: 4
h: 4
hub_pai: '[[hubs/skills/Skills - Qualidade]]'
description: >
  Cria suite de testes completa. Unit tests, integration tests, coverage. Usa
  Jest, Vitest ou Pytest. Use quando pedir "testar", "tests", "jest", "vitest",
  "cobertura", "/testar" ou "/tests".
---

# Suite completa de testes

Cria testes unitários, de integração e coverage report.

## Dependências

- **Stack:** detectar automaticamente (Node/Python)
- **Output:** `tests/`, `src/__tests__/`

---

## Workflow

### Passo 1 — Briefing

Perguntar ao usuário:
1. Qual framework? (Jest, Vitest, Pytest)
2. Quais arquivos/funções testar?
3. Precisa de mocks/stubs?
4. Coverage mínimo esperado?

### Passo 2 — Configuração Jest (Node.js)

**1. Instalar:**
```bash
npm install --save-dev jest @types/jest ts-jest @testing-library/react @testing-library/jest-dom
```

**2. jest.config.ts:**
```typescript
// jest.config.ts
import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  testMatch: ['**/*.test.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/**/*.test.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  verbose: true,
}

export default config
```

**3. tests/setup.ts:**
```typescript
// tests/setup.ts
import '@testing-library/jest-dom'

// Mock global
global.fetch = jest.fn()
```

### Passo 3 — Configuração Vitest

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 70,
        statements: 70,
      },
    },
  },
})
```

### Passo 4 — Testes Unitários

```typescript
// src/services/calculadora.test.ts
import { describe, it, expect, beforeEach } from '@jest/globals'
import { calcularFrete, calcularTotal } from '../services/calculadora'

describe('Calculadora', () => {
  describe('calcularFrete', () => {
    it('deve calcular frete com base no peso', () => {
      const resultado = calcularFrete(5) // 5kg
      expect(resultado).toBe(25) // R$ 5 por kg
    })

    it('deve aplicar desconto para pedidos acima de R$ 100', () => {
      const resultado = calcularFrete(3)
      expect(resultado).toBe(12) // 3kg, sem desconto extra
    })

    it('deve retornar 0 para peso negativo', () => {
      const resultado = calcularFrete(-1)
      expect(resultado).toBe(0)
    })
  })

  describe('calcularTotal', () => {
    it('deve somar produtos + frete - desconto', () => {
      const resultado = calcularTotal({
        produtos: 100,
        frete: 20,
        desconto: 10,
      })
      expect(resultado).toBe(110)
    })
  })
})
```

### Passo 5 — Testes de Componentes (React)

```typescript
// src/components/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('deve renderizar com texto', () => {
    render(<Button>Clique aqui</Button>)
    expect(screen.getByText('Clique aqui')).toBeInTheDocument()
  })

  it('deve chamar onClick quando clicado', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('deve estar desabilitado quando disabled=true', () => {
    render(<Button disabled>Disabled</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('deve aplicar classe variant="primary"', () => {
    const { container } = render(<Button variant="primary">Primary</Button>)
    
    expect(container.firstChild).toHaveClass('bg-indigo-600')
  })
})
```

### Passo 6 — Testes de API (Integration)

```typescript
// tests/api/users.test.ts
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals'
import request from 'supertest'
import { app } from '../../src/app'
import { prisma } from '../../src/lib/prisma'

describe('Users API', () => {
  beforeAll(async () => {
    await prisma.user.deleteMany({})
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  describe('GET /api/users', () => {
    it('deve retornar lista de usuários', async () => {
      // Criar usuário de teste
      await prisma.user.create({
        data: {
          email: 'test@example.com',
          name: 'Test',
          password: 'hashed',
        },
      })

      const response = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${testToken}`)

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('users')
      expect(Array.isArray(response.body.users)).toBe(true)
    })

    it('deve retornar 401 sem autenticação', async () => {
      const response = await request(app).get('/api/users')
      expect(response.status).toBe(401)
    })
  })

  describe('POST /api/users', () => {
    it('deve criar usuário com dados válidos', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({
          email: 'new@example.com',
          name: 'New User',
          password: 'Password123!',
        })

      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty('user')
      expect(response.body.user.email).toBe('new@example.com')
    })

    it('deve retornar erro com email inválido', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({
          email: 'invalid-email',
          name: 'Test',
          password: 'Password123!',
        })

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error')
    })
  })
})
```

### Passo 7 — Mocks

```typescript
// tests/mocks/axios.ts
import axios from 'axios'
import { jest } from '@jest/globals'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

// Uso
mockedAxios.get.mockResolvedValue({
  data: { users: [] }
})
```

### Passo 8 — Coverage Report

```bash
# Gerar coverage
npm test -- --coverage

# Coverage HTML
npm test -- --coverage --coverageReporters=html

# Coverage em CI
npm test -- --coverage --coverageThreshold='{"global":{"branches":70,"functions":70,"lines":70,"statements":70}}'
```

---

## Estrutura de Entrega

```
tests/
├── setup.ts              ← configuração global
├── mocks/
│   ├── axios.ts          ← mocks de libs externas
│   └── prisma.ts         ← mocks de banco
├── unit/
│   ├── services/
│   │   └── calculadora.test.ts
│   └── utils/
│       └── format.test.ts
├── integration/
│   └── api/
│       └── users.test.ts
├── components/
│   └── Button.test.tsx
└── __tests__/
    └── setup.test.ts

jest.config.ts
vitest.config.ts (escolher um)
```

---

## Scripts npm

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:ci": "jest --ci --coverage --coverageThreshold='{\"global\":{\"branches\":70,\"functions\":70,\"lines\":70}}'"
  }
}
```

---

## Regras

- Cada arquivo .ts/.tsx ter seu .test.ts/.test.tsx
- Nomes descritivos nos tests (describe/it)
- Arrange-Act-Assert em cada teste
- Um assertion por teste (mais fácil debugar)
- Mocks para dependências externas
- Coverage mínimo: 70%
- Testar casos de erro, não só sucesso
- Tests independentes (sem dependência de ordem)

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Qualidade|Skills - Qualidade]]
<!-- vault-navigation:end -->
