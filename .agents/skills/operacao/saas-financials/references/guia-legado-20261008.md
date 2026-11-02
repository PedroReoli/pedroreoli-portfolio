# Legado arquivado: operacao/saas-financials

> Snapshot integral pré-modernização da skill. Preservado para continuidade e comparação; pode conter comandos, métricas ou premissas desatualizados. **Não seguir em conflito com SKILL.md atual.**

---

---
tipo: skill
nome: Modelagem Financeira & Métricas de Negócio SaaS
name: saas-financials
aliases:
  - saas-financials
  - /saas-financials
  - Modelagem Financeira & Métricas de Negócio SaaS
tags:
  - h4
  - skill
  - operacao
  - reolios
camada: 3_folha
dominio: operacao
categoria: operacao
subtipo: skill
hierarquia: 4
h: 4
hub_pai: '[[hubs/skills/Skills - Operacao]]'
description: >
  Consultor financeiro e modelador de métricas para SaaS, produtos digitais e
  assinaturas. Calcula MRR, ARR, Churn Rate, LTV, CAC, LTV:CAC, Período de
  Payback, Runway e Unit Economics. Gera diagnósticos de saúde financeira e
  planos de ação para precificação e crescimento.
---

# Modelagem Financeira & Métricas de Negócio SaaS

Atua como apoio à modelagem financeira de SaaS e assinaturas. Não substitui um CFO ou contador. **Atenção:** limiares fixos de churn, crescimento, LTV:CAC e payback listados abaixo são heurísticas de exemplo, NÃO benchmarks universais; validar por segmento, modelo, margem, coortes e estágio. O LTV `ARPU/churn` é simplificação de receita bruta e não corresponde a LTV de contribuição. Exigir margem, retenção de receita e período antes de concluir viabilidade. O objetivo é transformar números brutos de clientes e faturamento em métricas claras de saúde financeira, apontando gargalos de churn, precificação errada e risco de queima de caixa (runway).

---

## 🧭 Dados de Entrada Necessários

Peça ou consulte os seguintes dados do negócio:
1. **Receita:** MRR atual, MRR do mês anterior, nova receita (novos clientes), receita de expansão (upgrades), receita perdida (churn).
2. **Clientes:** Total de clientes ativos, clientes novos no mês, cancelamentos no mês.
3. **Custos:** Gasto com marketing e tráfego pago (CAC), infraestrutura de servidores, custos fixos mensais.

---

## 🧮 As Fórmulas Centrais de Negócio

### 1. ARR (Receita Recorrente Anualizada)
$$\text{ARR} = \text{MRR} \times 12$$

### 2. Taxa de Crescimento Mensal (MoM)
$$\text{Crescimento MoM \%} = \frac{\text{MRR Atual} - \text{MRR Anterior}}{\text{MRR Anterior}} \times 100$$
- **Alerta:** < 5% ao mês = crescimento estagnado para estágio inicial.
- **Saudável:** 10% a 20% ao mês.

### 3. Taxa de Churn Mensal (Cancelamento)
$$\text{Churn \%} = \frac{\text{Clientes Cancelados}}{\text{Clientes no Início do Mês}} \times 100$$
- **B2B / Ticket Alto:** > 3% ao mês é **CRÍTICO**.
- **B2C / Ticket Baixo (PLG):** > 6% a 8% ao mês é **CRÍTICO** (em 1 ano você perde quase metade da base).

### 4. ARPU / ARPA (Ticket Médio por Cliente)
$$\text{ARPU} = \frac{\text{MRR}}{\text{Total de Clientes Ativos}}$$

### 5. CAC (Custo de Aquisição de Cliente)
$$\text{CAC} = \frac{\text{Gasto Total em Vendas \& Anúncios}}{\text{Novos Clientes Adquiridos}}$$

### 6. LTV (Lifetime Value — Valor Total do Ciclo de Vida)
$$\text{LTV} = \frac{\text{ARPU}}{\text{Churn \% mensal (decimal)}}$$
*Exemplo:* Ticket de R$ 100/mês com Churn de 5% (0.05) ➔ LTV = R$ 2.000.

### 7. Razão LTV : CAC (O Termômetro de Lucratividade)
- **< 1:1:** O negócio queima dinheiro a cada cliente que entra (insustentável).
- **1:1 a 2:1:** Margem perigosa.
- **3:1 a 5:1:** **Zona Ideal** de eficiência para escalar tráfego pago.
- **> 6:1:** Você está investindo pouco demais em crescimento.

### 8. Payback do CAC (Tempo de Retorno do Investimento)
$$\text{Payback (Meses)} = \frac{\text{CAC}}{\text{ARPU} \times \text{Margem Bruta \%}}$$
- Ideal: Menos de 12 meses (para dev solo / bootstrap: idealmente menos de 3 a 6 meses).

---

## 📊 Formato do Relatório Entregue

```markdown
# 📈 Diagnóstico Financeiro SaaS — [Mês/Ano]

| Métrica | Valor Calculado | Benchmark de Mercado | Status |
|---|---|---|---|
| **MRR / ARR** | R$ [X] / R$ [Y] | — | SAUDÁVEL |
| **Crescimento MoM** | [X]% | 10% - 15% | [SAUDÁVEL / ATENÇÃO] |
| **Churn Rate Mensal** | [X]% | < 4% | [CRÍTICO / SEGURO] |
| **CAC** | R$ [X] | — | — |
| **LTV** | R$ [Y] | — | — |
| **Razão LTV:CAC** | [X]:1 | > 3:1 | [ALERTA / EXCELENTE] |
| **Payback** | [X] meses | < 6 meses | [RÁPIDO / LENTO] |

---

### 🚨 As 2 Maiores Ameaças Financeiras Identificadas
1. [Diagnóstico do maior problema, ex: churn de onboarding ou CAC muito alto]
2. [Diagnóstico 2]

### 💡 Plano de Ação Imediato (O que fazer este mês para estancar o vazamento)
1. **Ação de Precificação:** [Aumentar ticket, adicionar plano anual com desconto]
2. **Ação de Retenção:** [Pesquisa de saída e automação de reativação]
```

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Operacao|Skills - Operacao]]
<!-- vault-navigation:end -->
