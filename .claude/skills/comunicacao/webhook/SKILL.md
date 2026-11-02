---
tipo: skill
nome: Gestão completa de webhooks
name: webhook
aliases:
  - webhook
  - /webhook
  - Gestão completa de webhooks
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
  Cria e gerencia webhooks. Recebe webhooks de serviços externos (Stripe,
  GitHub, Meta) e envia webhooks para notificar outros serviços. Use quando
  pedir "webhook", "integrar API", "stripe webhook", "/webhook" ou "/integrar".
---

# Gestão completa de webhooks

Cria sistema de webhooks para receber e enviar notificações entre serviços.

## Dependências

- **Stack:** Node.js (Express/Fastify)
- **Output:** `src/routes/webhooks.ts`, `src/services/webhook.ts`

---

## Workflow

### Passo 1 — Briefing

Perguntar ao usuário:
1. Webhook de entrada ou saída? (ou ambos)
2. De qual serviço? (Stripe, GitHub, Meta, Telegram, etc)
3. O que fazer quando receber? (atualizar DB, enviar email, etc)
4. Precisa de retry em caso de falha?

### Passo 2 — Webhook de Entrada (Receber)

**Estrutura base:**
```
src/
├── routes/
│   └── webhooks.ts     ← endpoints para receber webhooks
├── services/
│   └── webhook.ts      ← handlers e processamento
└── lib/
    └── webhook-client.ts ← cliente para enviar webhooks
```

**1. Middleware de validação:**
```typescript
// src/middleware/webhook.middleware.ts
import crypto from 'crypto'

export function verifyStripeWebhook(
  payload: Buffer,
  signature: string,
  secret: string
): any {
  return crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex')

  const event = crypto.subtle.verifySignature(
    'RSA-SHA256',
    key,
    signature,
    payload
  )
  return event
}

export function verifyGitHubWebhook(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const expectedSignature = 'sha256=' + crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex')

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  )
}
```

**2. Router de Webhooks:**
```typescript
// src/routes/webhooks.ts
import { Router } from 'express'
import { stripe } from '../lib/stripe'
import { handleStripeWebhook } from '../services/webhook/stripe'
import { handleGitHubWebhook } from '../services/webhook/github'
import { handleMetaWebhook } from '../services/webhook/meta'

const router = Router()

// Stripe
router.post(
  '/stripe',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    const signature = req.headers['stripe-signature'] as string
    
    try {
      const event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      )
      
      await handleStripeWebhook(event)
      res.json({ received: true })
    } catch (err) {
      console.error('Webhook error:', err)
      res.status(400).json({ error: 'Webhook error' })
    }
  }
)

// GitHub
router.post('/github', (req, res) => {
  const signature = req.headers['x-hub-signature-256'] as string
  
  if (!verifyGitHubWebhook(
    JSON.stringify(req.body),
    signature,
    process.env.GITHUB_WEBHOOK_SECRET!
  )) {
    return res.status(401).json({ error: 'Invalid signature' })
  }
  
  handleGitHubWebhook(req.body)
  res.json({ ok: true })
})

// Meta (Facebook/Instagram)
router.get('/meta', (req, res) => {
  // Verificação inicial do webhook
  const mode = req.query['hub.mode']
  const token = req.query['hub.verify_token']
  const challenge = req.query['hub.challenge']
  
  if (mode === 'subscribe' && token === process.env.META_VERIFY_TOKEN) {
    return res.status(200).send(challenge)
  }
  
  res.status(403).send('Forbidden')
})

router.post('/meta', express.json(), async (req, res) => {
  await handleMetaWebhook(req.body)
  res.json({ status: 'ok' })
})
```

### Passo 3 — Handlers de Webhook

**Stripe handler:**
```typescript
// src/services/webhook/stripe.ts
import Stripe from 'stripe'

export async function handleStripeWebhook(event: Stripe.Event) {
  switch (event.type) {
    case 'checkout.session.completed':
      await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session)
      break
      
    case 'customer.subscription.created':
      await handleSubscriptionCreated(event.data.object as Stripe.Subscription)
      break
      
    case 'customer.subscription.deleted':
      await handleSubscriptionDeleted(event.data.object as Stripe.Subscription)
      break
      
    case 'invoice.payment_succeeded':
      await handleInvoicePaid(event.data.object as Stripe.Invoice)
      break
      
    case 'invoice.payment_failed':
      await handleInvoiceFailed(event.data.object as Stripe.Invoice)
      break
      
    default:
      console.log(`Unhandled event: ${event.type}`)
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const { userId, productId } = session.metadata || {}
  
  // Atualizar status do pedido
  await prisma.order.update({
    where: { stripeSessionId: session.id },
    data: { status: 'PAID', paidAt: new Date() }
  })
  
  // Enviar email de confirmação
  await sendEmail({
    to: session.customer_email!,
    template: 'payment-confirmed',
    data: { orderId: session.id }
  })
  
  // Log
  await createAuditLog({
    action: 'PAYMENT_RECEIVED',
    data: { sessionId: session.id, amount: session.amount_total }
  })
}
```

**GitHub handler:**
```typescript
// src/services/webhook/github.ts
export async function handleGitHubWebhook(payload: any) {
  const action = payload.action
  const repository = payload.repository
  
  switch (payload.action) {
    case 'push':
      // Trigger deploy
      await triggerDeploy(repository.full_name)
      break
      
    case 'pull_request.opened':
      // Notificar equipe
      await sendSlackMessage({
        channel: '#dev',
        text: `PR aberto: ${payload.pull_request.html_url}`
      })
      break
      
    case 'release.published':
      // Changelog e notificação
      await createReleaseNotes(payload.release)
      break
  }
}
```

### Passo 4 — Webhook de Saída (Enviar)

**Cliente para enviar webhooks:**
```typescript
// src/lib/webhook-client.ts
import crypto from 'crypto'

interface WebhookPayload {
  event: string
  data: any
  timestamp: string
  signature?: string
}

export class WebhookClient {
  private url: string
  private secret: string
  private retries: number
  private timeout: number

  constructor(url: string, secret: string) {
    this.url = url
    this.secret = secret
    this.retries = 3
    this.timeout = 10000
  }

  private sign(payload: object): string {
    const hmac = crypto.createHmac('sha256', this.secret)
    hmac.update(JSON.stringify(payload))
    return hmac.digest('hex')
  }

  async send(event: string, data: any): Promise<boolean> {
    const payload: WebhookPayload = {
      event,
      data,
      timestamp: new Date().toISOString(),
    }

    // Adicionar assinatura
    const signature = this.sign(payload)
    
    for (let attempt = 0; attempt < this.retries; attempt++) {
      try {
        const response = await fetch(this.url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Webhook-Signature': signature,
            'X-Webhook-Event': event,
          },
          body: JSON.stringify(payload),
          signal: AbortSignal.timeout(this.timeout),
        })

        if (response.ok) return true
        
        console.error(`Webhook failed: ${response.status}`)
      } catch (error) {
        console.error(`Webhook attempt ${attempt + 1} failed:`, error)
        
        // Espera exponencial
        await new Promise(r => setTimeout(r, Math.pow(2, attempt) * 1000))
      }
    }

    // Salvar para retry posterior
    await saveFailedWebhook({ url: this.url, payload, event })
    return false
  }
}

// Uso
const webhook = new WebhookClient(
  process.env.WEBHOOK_URL!,
  process.env.WEBHOOK_SECRET!
)

await webhook.send('user.created', { userId: '123', email: 'user@example.com' })
```

### Passo 5 — Retry e Failed Webhooks

```typescript
// src/services/webhook/retry.ts
import { prisma } from '../lib/prisma'

// Job para processar webhooks falhados
export async function retryFailedWebhooks() {
  const failed = await prisma.failedWebhook.findMany({
    where: {
      attempts: { lt: 5 },
      nextRetry: { lte: new Date() }
    },
    orderBy: { nextRetry: 'asc' },
    take: 10
  })

  for (const webhook of failed) {
    try {
      await sendWebhook(webhook.url, webhook.payload)
      await prisma.failedWebhook.delete({ where: { id: webhook.id } })
    } catch {
      await prisma.failedWebhook.update({
        where: { id: webhook.id },
        data: {
          attempts: { increment: 1 },
          nextRetry: calculateNextRetry(webhook.attempts + 1)
        }
      })
    }
  }
}

function calculateNextRetry(attempts: number): Date {
  // Backoff exponencial: 1min, 5min, 30min, 2h, 8h
  const delays = [1, 5, 30, 120, 480]
  const minutes = delays[Math.min(attempts, delays.length - 1)]
  return new Date(Date.now() + minutes * 60 * 1000)
}
```

### Passo 6 — Prisma para Failed Webhooks

```prisma
// Adicionar ao schema.prisma
model FailedWebhook {
  id        String   @id @default(cuid())
  url       String
  event     String
  payload   Json
  attempts  Int      @default(0)
  nextRetry DateTime
  createdAt DateTime @default(now())
  
  @@index([nextRetry])
}
```

---

## Estrutura de Entrega

```
src/
├── routes/
│   └── webhooks.ts        ← endpoints de entrada
├── services/
│   └── webhook/
│       ├── stripe.ts       ← handlers Stripe
│       ├── github.ts      ← handlers GitHub
│       ├── meta.ts        ← handlers Meta
│       └── retry.ts       ← retry logic
├── lib/
│   └── webhook-client.ts  ← cliente para enviar
└── middleware/
    └── webhook.middleware.ts ← validação

prisma/
└── schema.prisma (com FailedWebhook)
```

---

## Regras

- **Sempre** verificar assinatura do webhook
- Usar raw body para Stripe
- Tratar erros graciosamente (retornar 200 mesmo se falhar)
- Logs de todos os webhooks recebidos
- Retry com backoff exponencial
- Não fazer trabalho pesado no handler (usar filas)
- Verificar idempotência (same event twice)
- Timeout adequado (10-30s)

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Comunicacao|Skills - Comunicacao]]
<!-- vault-navigation:end -->
