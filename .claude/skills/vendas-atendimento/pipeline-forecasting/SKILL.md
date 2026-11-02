---
tipo: skill
nome: Pipeline Forecasting e Probabilidade
name: pipeline-forecasting
aliases:
  - pipeline-forecasting
  - /pipeline-forecasting
  - Pipeline Forecasting e Probabilidade
tags:
  - h4
  - skill
  - vendas
  - reolios
camada: 3_folha
dominio: vendas
categoria: vendas-atendimento
subtipo: skill
hierarquia: 4
h: 4
hub_pai: '[[hubs/skills/Skills - Vendas Atendimento]]'
description: >
  Analisa pipeline e estima receita com probabilidades calibradas pelo histórico da empresa.
  Use em previsão comercial, risco de oportunidades e revisão de estágios.
---

# Pipeline Forecasting e Probabilidade

Transforme oportunidades em cenários de receita com origem dos dados explícita. Pipeline ponderado é uma estimativa e não receita contratada; perda de uma oportunidade não é churn de cliente.

---

## 🧭 Contexto do Negócio

Antes de analisar, solicite ou consulte:
1. `sistema/memoria/empresa.md` — ticket médio, ciclo de vendas típico da empresa.
2. Os dados brutos do pipeline do usuário:
   - Lista de negócios em andamento.
   - Valores (ticket de cada negócio).
   - Estágio atual de cada negócio.
   - Tempo que cada negócio está no mesmo estágio (idade do deal).

---

## 📐 Framework de Estágios e Probabilidade

Defina critérios de passagem por estágio. Calibre probabilidades com coortes históricas comparáveis; se não houver histórico, use cenários declarados, não percentuais apresentados como fatos.

| Estágio | Probabilidade | Critério de Saída (Exit Criteria) |
| :--- | :--- | :--- |
| **Descoberta (Discovery)** | A calibrar | Dor identificada, fit confirmado e próximo passo agendado. |
| **Demonstração / Pitch** | A calibrar | Solução apresentada, decisor envolvido. |
| **Proposta Enviada** | A calibrar | Proposta customizada enviada e recebida pelo cliente. |
| **Negociação / Jurídico** | A calibrar | Valores aprovados, em fase de revisão de minutas. |
| **Fechado Ganho (Won)** | 100% observado | Contrato assinado. |

*Cálculo por oportunidade:* `valor elegível × probabilidade calibrada`; some apenas oportunidades dentro da janela e considere receita recorrente separadamente. Sem amostra suficiente, mostre faixas em vez de valor único.

---

## 🚩 Identificação de Sinais de Risco (Deal Risk)

Nem todo negócio no pipeline vai fechar. Ao analisar os dados, procure e alerte sobre:
1. **Deals Zumbis (Estagnação):** Negócios que estão no mesmo estágio por mais tempo que o dobro do ciclo de vendas médio.
2. **Ghosting:** Mais de 10 dias sem resposta do prospect após envio de proposta.
3. **Falta do Decisor:** Negócios avançados (fase de proposta) onde o decisor final (quem assina o cheque) ainda não participou de nenhuma call.
4. **Data de Fechamento Irrealista:** Todas as datas de fechamento jogadas para o último dia do mês (sintoma de "esperança" do vendedor, não de compromisso do cliente).

---

## 📤 Formato de Saída (Output)

Ao analisar o pipeline, entregue:
1. **Dashboard Executivo:**
   - Pipeline Total (Soma de todos os negócios).
   - Pipeline Ponderado (Forecast real).
   - Previsão de Gap (Falta R$ X para bater a meta do mês).
2. **Análise de Risco:** Tabela com sinais, evidência, próxima ação e responsável. Ajuste limites de estagnação ao ciclo observado da empresa.
3. **Template de Forecast Mensal:** Se solicitado, crie uma estrutura em markdown de uma tabela para o usuário atualizar semanalmente.

**Briefing de exemplo:** “Preveja outubro com 20 oportunidades, valor, estágio, data de entrada e 12 meses de histórico de ganhos e perdas”. Entregue também `amostra por estágio | taxa observada | período | incerteza` e a lista de oportunidades sem valor ou data.

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Vendas Atendimento|Skills - Vendas Atendimento]]
<!-- vault-navigation:end -->
