---
tipo: "regra_reolicode"
nome: "Regra — Regra para Gateways de Pagamento e Checkout"
camada: "90-integrations"
dominio: "stack"
categoria: "regras_codigo"
prioridade: "situacional"
tags: ["reoli","reolicode","90-integrations"]
hub_pai: "[[REOLI]]"
aliases: ["Regra para Gateways de Pagamento e Checkout"]
---

# Regra para Gateways de Pagamento e Checkout

## Objetivo

Garantir segurança financeira, integridade de transações, prevenção de fraude e auditoria em integrações com gateways de pagamento (Stripe, Mercado Pago, Asaas, Pagar.me).

## Regras

* **Segurança PCI e Dados de Cartão**:
  - NUNCA trafegue ou armazene dados brutos de cartão de crédito nos seus próprios servidores ou banco de dados.
  - Utilize componentes seguros de checkout fornecidos pelo provedor (Stripe Elements, Mercado Pago SDK, etc.) para tokenizar os dados de cartão diretamente no cliente.

* **Cálculo de Valores no Backend**:
  - Os valores de itens, frete, descontos e total da compra DEVEM ser calculados e confirmados exclusivamente pelo servidor backend.
  - NUNCA confie em preços ou totais enviados pelo cliente frontend.

* **Status de Transação e Webhooks**:
  - A confirmação final do pagamento (mudança de status para `pago`) DEVE ser acionada via recepção de webhook assinado ou consulta direta à API do gateway, nunca pela confirmação visual do frontend.
  - Trate estados intermediários com clareza: `pendente`, `processando`, `aprovado`, `recusado`, `estornado`.

* **Trilha de Auditoria e Logs**:
  - Mantenha registro dos identificadores da transação no gateway (`charge_id`, `payment_intent_id`) associados aos pedidos do sistema para conciliação financeira.

[Catálogo de regras](../README.md)
