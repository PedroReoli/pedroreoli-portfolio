---
name: stripe
description: Integra pagamentos com Stripe. Cria checkout, assinaturas, webhooks e gestão de clientes. Use quando pedir "stripe", "pagamento", "checkout", "assinatura", "/stripe" ou "/pagamento".
license: Proprietary
metadata:
  tipo: skill
  nome-exibicao: Integração completa com Stripe
  aliases: stripe, /stripe, Integração completa com Stripe
  tags: h4, skill, pagamento, reolios
  camada: 3_folha
  dominio: vendas
  categoria: pagamento
  subtipo: skill
  hierarquia: "4"
  hub-pai: "[[hubs/skills/Skills - Pagamento]]"
---
# Stripe — checkout e assinaturas com reconciliação

## Objetivo
Implementar checkout, assinatura, portal e eventos com preço decidido **no servidor**, vínculo autenticado e estado de pagamento reconciliado. Para regras genéricas de webhook usar /webhook.

## Contrato da IA (qualquer agente)
1. Confirmar ferramentas, SDK, país, moeda, plataforma, modo sandbox, catálogo e autenticação. Não fingir conta Stripe ou testes reais.
2. **Nunca usar priceId, valor, customerId, currency ou redirect arbitrário do request**. Receber chave interna do plano; resolver IDs em catálogo permitido no servidor; vincular customer ao usuário autenticado.
3. `success_url` não prova pagamento. Ativar acesso só após confirmação assíncrona validada e persistida (checkout/invoice/payment) e conciliação de order.
4. Assinatura do webhook deve verificar bytes raw com segredo do endpoint; eventos podem duplicar, atrasar e chegar fora de ordem. Inbox única e worker de negócios idempotente.
5. Não fixar versões SDK/API antigas; verificar formato snapshot/thin, alterações do provider e modalidade de pagamento por conta.
6. Dados de cartão só na plataforma Stripe; não armazenar PAN/CVV e não registrar segredos.
7. Não criar cobranças nem publicar em produção sem autorização. Marcar trechos de adaptação que ainda não compilam isoladamente.

## Entrada
Tipo: pagamento único/recorrente, planos, moeda, usuário, fatura/impostos, banco, vencimento, cancelamento, reembolso, reconciliação e webhook.

## Checkout — fragmento de arquitetura (integrações obrigatórias)
~~~typescript
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const PLAN_PRICE = {
  starter: process.env.STRIPE_PRICE_STARTER!,
  pro: process.env.STRIPE_PRICE_PRO!
} as const;

export async function checkout(
  user: { id: string; email: string }, // obtido do middleware de autenticação
  plan: keyof typeof PLAN_PRICE
) {
  const priceId = PLAN_PRICE[plan];
  if (!user.id || !priceId) throw new Error('Plano/usuário inválido');
  // TODO obrigatório: criar pedido pendente em DB e vincular a user.id.
  const orderId = await createPendingOrder(user.id, plan);
  return stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{ price: priceId, quantity: 1 }],
    customer_email: user.email,
    client_reference_id: orderId,
    success_url: process.env.APP_URL! + '/sucesso?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: process.env.APP_URL! + '/cancelado',
    metadata: { orderId }
  }, { idempotencyKey: 'checkout-order-' + orderId });
}
~~~
**Não é exemplo autocontido:** `createPendingOrder` exige implementação transacional local e política de retry. Validar o plano antes da chamada; não utilizar ID vindo do cliente. Para assinatura usar `mode: 'subscription'` e preços recorrentes válidos.

## Fluxo de webhook
1. Registrar rota com raw body e verificar `stripe-signature` via `constructEvent` ou API de thin events conforme versão.
2. Persistir inbox UNIQUE(event.id) + outbox na mesma transação **antes** de 2xx; se DB falhar, não retornar sucesso.
3. Worker verifica order e customer pertencentes ao usuário e reconcilia valor/moeda esperados com estado Stripe.
4. Para assinatura, decidir concessão/revogação por estado real de invoices/subscription; criação de subscription não é prova de pagamento.
5. Customer Portal: derive customer do usuário autenticado e valide propriedade no DB, nunca confie em customerId do request.
6. Tratar reembolso, dispute, pagamento pendente/falho, chargeback e período de tolerância de modo explícito.

## Testes em sandbox
- Plano desconhecido, adulteração de preço e customerId trocado não produzem cobrança.
- Acesso manual a success URL sem pagamento não ativa produto.
- Assinatura de evento ausente/adulterada falha; replay/dobro não concede duas vezes; evento fora de ordem não restaura indevidamente acesso.
- Modo assinatura: cobrança paga, atrasada, falha e cancelada; portal somente do dono.
- Stripe CLI: `stripe listen` e `stripe trigger` apenas em sandbox configurado; registrar evidências reais ou estado 'não testado'.

## Fontes (08/10/2026)
- [Stripe — Receber eventos](https://docs.stripe.com/webhooks) — assinatura, snapshot/thin.
- [Stripe — Checkout fulfillment](https://docs.stripe.com/checkout/fulfillment) — confirmação e entrega.
- [Stripe — Idempotency](https://docs.stripe.com/api/idempotent_requests) — chave por operação.
- [OWASP — Webhook Security](https://cheatsheetseries.owasp.org/cheatsheets/Webhook_Security_Cheat_Sheet.html).

## Aceite
Código esboçado não é checkout pronto. Exigir testes executados de auth, catálogo, sandbox, pagamentos, reconciliação e idempotência, mais observabilidade antes de produção.

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Pagamento|Skills - Pagamento]]
<!-- vault-navigation:end -->

## Qualidade e avaliação

- [Portões de qualidade e cenários mínimos](references/certification-v1.md) — carregue antes de finalizar a entrega ou executar avaliações.
- [Exemplo reproduzível](references/worked-example-v1.md) — use como contrato de entrada, decisão, saída e reprovação.
- [Estado das fontes](references/source-status-v1.md) — consulte antes de sustentar afirmações externas.
