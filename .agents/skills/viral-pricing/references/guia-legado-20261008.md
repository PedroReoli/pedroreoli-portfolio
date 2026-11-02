# Legado arquivado: viral-pricing

> Snapshot integral pré-modernização da skill. Preservado para continuidade e comparação; pode conter comandos, métricas ou premissas desatualizados. **Não seguir em conflito com SKILL.md atual.**

---

---
tipo: skill
nome: Precificação Viral (Marc Lou Principles)
name: viral-pricing
aliases:
  - viral-pricing
  - /viral-pricing
  - Precificação Viral (Marc Lou Principles)
tags:
  - h4
  - skill
  - pricing
  - reolios
camada: 3_folha
dominio: vendas
categoria: viral-pricing
subtipo: skill
hierarquia: 4
h: 4
hub_pai: '[[hubs/skills/Skills - Viral Pricing]]'
description: >
  Estrutura precificação viral usando os princípios de Marc Lou (@marclou). Foco
  em Popcorn Pricing (3 tiers), sem plano free, hard paywall, preço mais alto
  que concorrentes, sem assinatura sempre que possível, e pricing visível no
  header. Use quando o usuário pedir precificação, planos, pricing page, ou
  /viral-pricing.
---

# Precificação Viral (Marc Lou Principles)

> Baseado nos 32 princípios de produto viral de **Marc Lou** (@marclou).
> Use como bússola, não como checklist.

---

## Princípios Aplicados

### Princípio 1 — Sem plano free
Usuários gratuitos podem gerar custos operacionais, mas também podem ampliar aquisição e distribuição. Avalie economia unitária e taxa de ativação antes de decidir sobre free tier.

**Hipótese a testar:** a conversão de free para pago varia muito conforme público e produto. Não adote o número de 3% sem estudo aplicável; compare opções free, trial, demo e pagas com métricas do negócio.

**Alternativas ao free:**
- Trial com cartão de crédito (princípio 8)
- Demo interativa (princípio 25)
- Garantia de reembolso (reduz risco sem atrair sanguessugas)

### Princípio 8 — Hard paywall
Cadastros não pagam as contas. Se ninguém está disposto a tirar o cartão de crédito, você não tem validação.

**Regra:** Peça pagamento ANTES de pedir dados. Não peça email primeiro e preço depois.

### Princípio 12 — Popcorn Pricing
Seus visitantes vieram comprar um produto, não estudar uma planilha. Cada tier extra cria outra decisão e outro motivo pra sair.

**Regra:** 3 tiers. Good. Better. Best.

```
┌─────────┬──────────┬──────────┐
│  Good   │  Better  │   Best   │
│  $XX    │  $XXX    │   $XXXX  │
│         │          │          │
│  Básico │ Popular  │  Completo│
│  p/ solo│ p/ times │ p/ empresa│
└─────────┴──────────┴──────────┘
```

### Princípio 16 — Pricing impossível de não ver
A seção de preço é um dos primeiros lugares que visitantes olham. Eles usam pra entender o produto, não só o preço.

**Regra:** Coloque "Preço" no header. Não esconda atrás de "Planos" ou "Precificação".

### Princípio 27 — Sem assinatura (quando possível)
As pessoas já pagam assinaturas demais. Não adicione outra cobrança mensal a menos que não consiga operar sem ela.

**Hipótese a testar:** compare pagamento único e recorrente para o público e a oferta reais; registre conversão, ticket, retenção e custo de atendimento antes de recomendar o modelo.

**Quando usar assinatura:**
- Seu custo por usuário escala (SaaS com infraestrutura)
- Você entrega valor contínuo (dados atualizados, suporte)
- Não tem como operar sem receita recorrente

**Quando usar pagamento único:**
- Produto que se entrega uma vez (template, ebook, curso)
- Ferramenta que roda local
- Licença perpétua

### Princípio 32 — Mais caro que concorrentes
Ninguém fala sobre a segunda opção mais barata.

**Regra:** Cobre mais. Seja o premium. Dê mais valor. Não entre em guerra de preço.

---

## Workflow

### Passo 1 — Diagnóstico
Perguntar:
1. Qual o custo de entrega por cliente? (infra, suporte, etc.)
2. Quanto vale o resultado pro cliente? (ex: "economiza 10h/semana" → vale R$500+)
3. Quem são os concorrentes e quanto cobram?
4. O produto é entrega única ou serviço contínuo?

### Passo 2 — Estrutura de preço
Gerar:

```markdown
## Header
[Preço] — link direto, sem eufemismo

## Tiers (3)
| Good | Better | Best |
|------|--------|------|
| R$ XX | R$ XXX | R$ XXXX |
| Pra quem quer [resultado básico] | Pra quem quer [resultado ideal] | Pra quem quer [resultado máximo] |
| [feature 1] | [feature 1] | [feature 1] |
| [feature 2] | [feature 2] | [feature 2] |
| | [feature 3] | [feature 3] |
| | | [feature 4] |

## CTA
[Comprar Good] | [Comprar Better ★] | [Comprar Best]

## Garantia
[Garantia de reembolso X dias] — sem risco
```

### Passo 3 — Revisão viral
Checklist:
- [ ] Sem plano free? (princípio 1)
- [ ] Hard paywall — pede cartão antes de dados? (princípio 8)
- [ ] 3 tiers no máximo? (princípio 12)
- [ ] "Preço" no header? (princípio 16)
- [ ] Pagamento único se possível? (princípio 27)
- [ ] Preço maior que concorrentes? (princípio 32)
- [ ] CTA diz exatamente o que acontece? (princípio 28)

---

## Regras

- Avaliar plano free, trial ou demo conforme custo de aquisição, retenção e margem; não há proibição universal de plano gratuito.
- Solicitar pagamento e dados somente na etapa adequada ao produto, com informação transparente, segurança e consentimentos quando exigidos.
- **Nunca** ter mais de 3 tiers
- **Sempre** colocar preço no header
- Definir preço conforme valor comprovado, disposição a pagar, margem e posicionamento; preço premium é uma hipótese, não uma regra.
- **Sempre** preferir pagamento único a assinatura
- Oferecer garantia somente quando aprovada e juridicamente aplicável; esclarecer condições e direitos legais sem prometer coberturas inexistentes.

---

## Créditos

**Marc Lou** (@marclou) — 32 Princípios de Produto Viral.
5 anos construindo 35 startups em público.
Use como bússola, não como checklist.

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Viral Pricing|Skills - Viral Pricing]]
<!-- vault-navigation:end -->
