---
tipo: skill
nome: Integração completa com Stripe
name: stripe
aliases:
  - stripe
  - /stripe
  - Integração completa com Stripe
tags:
  - h4
  - skill
  - pagamento
  - reolios
camada: 3_folha
dominio: vendas
categoria: pagamento
subtipo: skill
hierarquia: 4
h: 4
hub_pai: '[[hubs/skills/Skills - Pagamento]]'
description: >
  Integra pagamentos com Stripe. Cria checkout, assinaturas, webhooks e gestão
  de clientes. Use quando pedir "stripe", "pagamento", "checkout", "assinatura",
  "/stripe" ou "/pagamento".
---

# Integração completa com Stripe

Implementa pagamentos com Stripe: checkout, assinaturas, webhooks e gestão.

## Dependências

- **Stack:** Node.js (Express/Fastify/Next.js)
- **Output:** `src/services/stripe.ts`, `src/routes/`, etc
- **Docs:** https://stripe.com/docs

---

## Workflow

### Passo 1 — Briefing

Perguntar ao usuário:
1. Qual tipo de pagamento? (checkout único, assinatura, ambos)
2. Quais produtos/planos?
3. Precisa de webhooks? (confirmação de pagamento)
4. Qual a stack? (Express, Fastify, Next.js API routes)

### Passo 2 — Configuração Base

**1. Instalar dependências:**
```bash
npm install stripe @stripe/stripe-js
```

**2. Configurar cliente:**
```typescript
// lib/stripe.ts
import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
})
```

**.env:**
```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Passo 3 — Checkout Session (pagamento único)

```typescript
// src/services/stripe.ts

export async function createCheckoutSession({
  priceId,
  successUrl,
  cancelUrl,
  customerEmail,
  metadata = {},
}: {
  priceId: string
  successUrl: string
  cancelUrl: string
  customerEmail?: string
  metadata?: Record<string, string>
}) {
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card', 'pix'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    customer_email: customerEmail,
    metadata,
    allow_promotion_codes: true,
  })

  return session
}
```

**Rota da API:**
```typescript
// src/routes/payment.ts
import { Router } from 'express'
import { createCheckoutSession } from '../services/stripe'

const router = Router()

router.post('/create-checkout', async (req, res) => {
  try {
    const { priceId } = req.body
    
    const session = await createCheckoutSession({
      priceId,
      successUrl: `${process.env.APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${process.env.APP_URL}/cancel`,
      customerEmail: req.body.email,
    })
    
    res.json({ url: session.url })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar sessão' })
  }
})

export default router
```

### Passo 4 — Assinaturas

```typescript
// src/services/stripe.ts

export async function createSubscription({
  customerId,
  priceId,
}: {
  customerId: string
  priceId: string
}) {
  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    payment_behavior: 'default_incomplete',
    expand: ['latest_invoice.payment_intent'],
  })

  return subscription
}

export async function createCustomer({
  email,
  name,
  metadata = {},
}: {
  email: string
  name: string
  metadata?: Record<string, string>
}) {
  const customer = await stripe.customers.create({
    email,
    name,
    metadata,
  })

  return customer
}

export async function createCustomerPortalSession({
  customerId,
  returnUrl,
}: {
  customerId: string
  returnUrl: string
}) {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  })

  return session
}
```

### Passo 5 — Webhooks

```typescript
// src/routes/webhook.ts
import { Router } from 'express'
import { stripe } from '../lib/stripe'
import Stripe from 'stripe'

const router = Router()

// Stripe webhook handler
router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    const sig = req.headers['stripe-signature'] as string
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        webhookSecret
      )
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return res.status(400).send('Webhook Error')
    }

    // Handle events
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session)
        break

      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object as Stripe.Subscription)
        break

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription)
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
        console.log(`Unhandled event type: ${event.type}`)
    }

    res.json({ received: true })
  }
)

// Event handlers
async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const customerId = session.customer as string
  const email = session.customer_email || session.metadata?.email

  // TODO: Ativar acesso do usuário
  console.log(`Pagamento confirmado para: ${email}`)
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string
  // TODO: Ativar assinatura
  console.log(`Assinatura criada: ${subscription.id}`)
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  // TODO: Atualizar status da assinatura
  console.log(`Assinatura atualizada: ${subscription.status}`)
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  // TODO: Desativar acesso
  console.log(`Assinatura cancelada: ${subscription.id}`)
}
```

### Passo 6 — Frontend (Next.js)

```typescript
// app/api/create-checkout/route.ts
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function POST(req: Request) {
  const { priceId } = await req.json()

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card', 'pix'],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
  })

  return NextResponse.json({ url: session.url })
}
```

```typescript
// components/CheckoutButton.tsx
'use client'

import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!)

export function CheckoutButton({ priceId }: { priceId: string }) {
  async function handleCheckout() {
    const res = await fetch('/api/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId }),
    })

    const { url } = await res.json()
    window.location.href = url
  }

  return <button onClick={handleCheckout}>Comprar</button>
}
```

---

## Produtos e Preços (Stripe Dashboard)

Criar no Stripe Dashboard ou via API:

```typescript
// Criar produto
const product = await stripe.products.create({
  name: 'ReoliOS Pro',
  description: 'Acesso vitalício ao ReoliOS',
})

// Criar preço (único)
const price = await stripe.prices.create({
  product: product.id,
  unit_amount: 45000, // R$ 450,00 em centavos
  currency: 'brl',
})

// Criar preço (recorrente)
const recurringPrice = await stripe.prices.create({
  product: product.id,
  unit_amount: 19700,
  currency: 'brl',
  recurring: {
    interval: 'month',
  },
})
```

---

## Estrutura de Entrega

```
src/
├── lib/
│   └── stripe.ts          ← cliente Stripe
├── services/
│   └── stripe.ts          ← funções de pagamento
├── routes/
│   ├── payment.ts         ← criar sessão
│   ├── subscription.ts    ← gerenciar assinaturas
│   ├── portal.ts          ← portal do cliente
│   └── webhook.ts         ← webhooks
└── ...

.env                       ← secrets
.env.example               ← exemplo
```

---

## Regras

- Nunca expor Stripe Secret Key no frontend
- Validar webhook signatures
- Guardar customer_id no banco
- Tratar todos os eventos de webhook
- Guardar logs de transações
- Testar com Stripe CLI antes de produção
- Usar mode 'test' em desenvolvimento

### Stripe CLI (desenvolvimento)
```bash
# Login
stripe login

# Listen to webhooks
stripe listen --forward-to localhost:3000/webhook

# Trigger events
stripe trigger checkout.session.completed
```

---

## Checklist de Segurança

```
├── [ ] SECRET_KEY no .env (não no código)
├── [ ] WEBHOOK_SECRET configurado
├── [ ] Validação de webhook signature
├── [ ] Tratamento de erros
├── [ ] Logs de transações
├── [ ] Modo test em desenvolvimento
└── [ ] Modo live verificado antes de lançar
```

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Pagamento|Skills - Pagamento]]
<!-- vault-navigation:end -->
