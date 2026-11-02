---
tipo: skill
nome: Sistema completo de email transacional
name: email
aliases:
  - email
  - /email
  - Sistema completo de email transacional
tags:
  - h4
  - skill
  - comunicacao
  - reolios
camada: 3_folha
dominio: operacao
categoria: comunicacao
subtipo: skill
hierarquia: 4
h: 4
hub_pai: '[[hubs/skills/Skills - Comunicacao]]'
description: >
  Cria sistema de email transacional. Resend, SendGrid, templates HTML,
  automações. Use quando pedir "email", "newsletter", "enviar email", "resend",
  "sendgrid", "/email" ou "/mail".
---

# Sistema completo de email transacional

Cria configuração de email com templates, automações e delivery garantido.

## Dependências

- **Stack:** Node.js
- **Provider:** Resend (recomendado), SendGrid, AWS SES
- **Output:** `src/services/email.ts`, `emails/`

---

## Workflow

### Passo 1 — Briefing

Perguntar ao usuário:
1. Qual provider? (Resend, SendGrid, SES)
2. Quais emails precisa? (welcome, recovery, receipt, etc)
3. Template custom ou usar MJML?
4. Precisa de analytics? (aberturas, cliques)

### Passo 2 — Configuração Resend (Recomendado)

**1. Instalar:**
```bash
npm install resend
```

**2. Configuração:**
```typescript
// lib/email.ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail({
  to,
  subject,
  html,
  text,
  from = 'ReoliOS <noreply@seudominio.com>',
}: EmailOptions) {
  const { data, error } = await resend.emails.send({
    from,
    to,
    subject,
    html,
    text,
  })

  if (error) {
    console.error('Email error:', error)
    throw error
  }

  return data
}

interface EmailOptions {
  to: string | string[]
  subject: string
  html: string
  text?: string
  from?: string
}
```

**.env:**
```env
RESEND_API_KEY=re_...
EMAIL_FROM=noreply@seudominio.com
```

### Passo 3 — Template Base

**Layout HTML:**
```html
<!-- emails/base.html -->
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{subject}}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: #f4f4f4;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 8px;
      overflow: hidden;
    }
    .header {
      background: #6366F1;
      padding: 32px;
      text-align: center;
    }
    .header h1 {
      color: #ffffff;
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 32px;
      color: #1f2937;
      line-height: 1.6;
    }
    .button {
      display: inline-block;
      padding: 12px 24px;
      background: #6366F1;
      color: #ffffff;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 600;
    }
    .footer {
      padding: 24px 32px;
      background: #f9fafb;
      text-align: center;
      color: #6b7280;
      font-size: 14px;
    }
    .footer a {
      color: #6366F1;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <div class="container">
          <div class="header">
            <h1>{{title}}</h1>
          </div>
          <div class="content">
            {{content}}
          </div>
          <div class="footer">
            <p>© 2025 ReoliOS. Todos os direitos reservados.</p>
            <p>
              <a href="{{unsubscribeUrl}}">Desinscrever</a> |
              <a href="{{appUrl}}">Acessar aplicativo</a>
            </p>
          </div>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>
```

### Passo 4 — Templates Prontos

**1. Welcome email:**
```typescript
// emails/welcome.ts
export function welcomeEmail({ name, email }: { name: string; email: string }) {
  return {
    subject: 'Bem-vindo ao ReoliOS! 🚀',
    html: `
      <h2>Olá, ${name}!</h2>
      <p>Bem-vindo ao ReoliOS. Você agora tem acesso completo ao sistema.</p>
      <p>O que você pode fazer:</p>
      <ul>
        <li>✅ Criar carrosséis e posts</li>
        <li>✅ Gerar relatórios de ads</li>
        <li>✅ Criar propostas profissionais</li>
        <li>✅ E muito mais...</li>
      </ul>
      <p style="text-align: center; margin: 32px 0;">
        <a href="${process.env.APP_URL}/dashboard" class="button">
          Acessar Dashboard
        </a>
      </p>
      <p>Se tiver alguma dúvida, responda esse email.</p>
      <p>Abraços,<br>Pedro Reoli</p>
    `,
    text: `
      Olá, ${name}!
      
      Bem-vindo ao ReoliOS. Você agora tem acesso completo ao sistema.
      
      Acesse seu dashboard: ${process.env.APP_URL}/dashboard
      
      Abraços,
      Pedro Reoli
    `,
  }
}
```

**2. Password reset:**
```typescript
// emails/passwordReset.ts
export function passwordResetEmail({ name, resetUrl }: { name: string; resetUrl: string }) {
  return {
    subject: 'Redefinir sua senha',
    html: `
      <h2>Olá, ${name}!</h2>
      <p>Você pediu para redefinir sua senha. Clique no botão abaixo:</p>
      <p style="text-align: center; margin: 32px 0;">
        <a href="${resetUrl}" class="button">
          Redefinir Senha
        </a>
      </p>
      <p>Esse link expira em 1 hora.</p>
      <p>Se você não pediu essa redefinição, ignore este email.</p>
    `,
    text: `
      Olá, ${name}!
      
      Você pediu para redefinir sua senha.
      Acesse: ${resetUrl}
      
      Esse link expira em 1 hora.
    `,
  }
}
```

**3. Order receipt:**
```typescript
// emails/receipt.ts
export function receiptEmail(order: Order) {
  return {
    subject: `Confirmação de pagamento #${order.id}`,
    html: `
      <h2>Pagamento confirmado! ✅</h2>
      <p>Obrigado pela sua compra, ${order.customerName}!</p>
      
      <table style="width: 100%; margin: 24px 0; border-collapse: collapse;">
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
            <strong>Pedido:</strong>
          </td>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
            #${order.id}
          </td>
        </tr>
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
            <strong>Produto:</strong>
          </td>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
            ${order.product}
          </td>
        </tr>
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
            <strong>Valor:</strong>
          </td>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
            R$ ${order.amount.toFixed(2)}
          </td>
        </tr>
      </table>
      
      <p style="text-align: center; margin: 32px 0;">
        <a href="${process.env.APP_URL}/access" class="button">
          Acessar ReoliOS
        </a>
      </p>
    `,
    text: `
      Pagamento confirmado!
      
      Pedido: #${order.id}
      Produto: ${order.product}
      Valor: R$ ${order.amount.toFixed(2)}
      
      Acesse: ${process.env.APP_URL}/access
    `,
  }
}
```

### Passo 5 — Service de Email

```typescript
// src/services/email.ts
import { sendEmail as send } from '../lib/email'
import { welcomeEmail } from '../emails/welcome'
import { passwordResetEmail } from '../emails/passwordReset'
import { receiptEmail } from '../emails/receipt'

export const emailService = {
  async sendWelcome(name: string, email: string) {
    return send({
      to: email,
      ...welcomeEmail({ name, email }),
    })
  },

  async sendPasswordReset(name: string, email: string, resetUrl: string) {
    return send({
      to: email,
      ...passwordResetEmail({ name, resetUrl }),
    })
  },

  async sendReceipt(order: Order) {
    return send({
      to: order.customerEmail,
      ...receiptEmail(order),
    })
  },
}
```

### Passo 6 — Queue (async)

```typescript
// src/jobs/email.job.ts
import { emailService } from '../services/email'
import { prisma } from '../lib/prisma'

// Processar emails pendentes
export async function processEmailQueue() {
  const pending = await prisma.emailQueue.findMany({
    where: { status: 'PENDING' },
    take: 10,
    orderBy: { createdAt: 'asc' },
  })

  for (const email of pending) {
    try {
      await emailService.sendWelcome(email.name, email.email)
      
      await prisma.emailQueue.update({
        where: { id: email.id },
        data: { status: 'SENT', sentAt: new Date() },
      })
    } catch (error) {
      await prisma.emailQueue.update({
        where: { id: email.id },
        data: {
          status: 'FAILED',
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      })
    }
  }
}
```

### Passo 7 — React Email (Templates modernos)

```bash
npm install @react-email/components
```

```typescript
// emails/WelcomeEmail.tsx
import { Html, Body, Container, Head, Heading, Text, Link, Button } from '@react-email/components'

export function WelcomeEmail({ name }: { name: string }) {
  return (
    <Html lang="pt-BR">
      <Head />
      <Body style={{ fontFamily: 'sans-serif', backgroundColor: '#f4f4f4' }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#fff', borderRadius: '8px' }}>
          <Heading style={{ backgroundColor: '#6366F1', color: '#fff', padding: '32px', textAlign: 'center', margin: 0 }}>
            Bem-vindo ao ReoliOS!
          </Heading>
          
          <Container style={{ padding: '32px' }}>
            <Text style={{ fontSize: '16px', lineHeight: '1.6' }}>
              Olá, {name}!
            </Text>
            <Text style={{ fontSize: '16px', lineHeight: '1.6' }}>
              Bem-vindo ao ReoliOS. Você agora tem acesso completo ao sistema.
            </Text>
            
            <Button
              href={`${process.env.APP_URL}/dashboard`}
              style={{ backgroundColor: '#6366F1', color: '#fff', padding: '12px 24px', borderRadius: '6px', textDecoration: 'none' }}
            >
              Acessar Dashboard
            </Button>
          </Container>
        </Container>
      </Body>
    </Html>
  )
}
```

---

## Estrutura de Entrega

```
emails/
├── base.html          ← template base
├── welcome.ts          ← email de boas-vindas
├── passwordReset.ts    ← redefinição de senha
├── receipt.ts         ← confirmação de pagamento
└── notification.ts    ← notificações gerais

src/
├── lib/
│   └── email.ts        ← cliente do provider
├── services/
│   └── email.ts        ← funções de envio
└── jobs/
    └── email.ts        ← processamento async
```

---

## Providers Comparação

| Provider | Preço | Vantagem | Desvantagem |
|----------|-------|----------|-------------|
| **Resend** | Grátis 3k/mês | API moderna, React Email | Pouco histórico |
| **SendGrid** | Grátis 100/dia | Mature, muitos recursos | Complexo |
| **AWS SES** | $0.10/1k | Barato, confiável | Config mais complexa |
| **Postmark** | $15/mês | Entrega excelente | Preço |

---

## Regras

- Sempre ter versão HTML e texto
- Unsubscribe link em todos os emails
- Usar domínio verificado
- SPF/DKIM/DMARC configurados
- Testar em múltiplos clientes (Gmail, Outlook, Apple)
- Analytics de aberturas (tracking pixel)
- Rate limiting (não enviar spam)

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Comunicacao|Skills - Comunicacao]]
<!-- vault-navigation:end -->
