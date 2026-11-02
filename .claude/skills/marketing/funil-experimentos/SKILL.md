---
tipo: skill
nome: Funil comercial com experimentos mensuráveis
name: funil-experimentos
aliases: [funil-experimentos, /funil-experimentos, medir-funil]
tags: [skill, marketing, vendas, funil, analytics, reolios]
camada: 3_folha
dominio: marketing
categoria: marketing
subtipo: skill
hierarquia: 4
h: 4
hub_pai: '[[hubs/skills/Skills - Marketing]]'
description: >
  Mapeia um funil de aquisição e define eventos, hipóteses e experimentos com critérios de decisão.
  Use quando pedir melhoria de conversão, análise de gargalos ou teste de ofertas.
---

# Funil comercial com experimentos mensuráveis

## Entrada

Leia `sistema/memoria/empresa.md`, `publico-alvo.md`, `produtos.md` e `estrategia.md` se pertinentes. Receba canal, oferta, etapa de venda, janela de análise, dados existentes e limite de investimento. Exemplo: “Temos 800 visitas, 32 formulários e 6 contratos no mês; queremos melhorar a passagem de formulário para reunião”.

## Processo

1. Defina unidades e denominadores: visitante, lead enviado, lead qualificado, contato, proposta e venda. Documente deduplicação e janela temporal antes de calcular taxa.
2. Mapeie eventos ao estado real. Em GA4, use `generate_lead`, `qualify_lead`, `working_lead` e `close_convert_lead` quando cada evento de fato ocorrer; configure parâmetros conforme a documentação. Não marque clique ou scroll como venda.
3. Calcule conversões por etapa com contagens observadas e classifique lacunas de instrumentação. Não invente benchmark de mercado.
4. Formule hipóteses específicas: mudança, público, métrica principal, limite de risco, duração e critério de decisão. Isole uma alteração por comparação quando possível.
5. Considere qualidade dos leads, margem e capacidade operacional além de volume. Registre sazonalidade e alterações simultâneas que prejudiquem atribuição.

## Saída esperada

Entregue tabela `etapa | entradas | saídas | taxa | fonte | confiabilidade`, seguida de até três experimentos `hipótese | intervenção | métrica | guarda | decisão`. Para o exemplo, `visita → formulário = 32/800 = 4%`; `formulário → contrato = 6/32 = 18,75%`, desde que os períodos e coortes sejam compatíveis.

## Fonte

- [Google Analytics: eventos recomendados de geração de leads](https://support.google.com/analytics/answer/9267735?hl=en).
