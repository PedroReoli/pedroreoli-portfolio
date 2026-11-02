---
tipo: skill
nome: Qualificação de leads B2B
name: qualificacao-leads
aliases: [qualificacao-leads, /qualificacao-leads, scoring-leads]
tags: [skill, vendas, b2b, leads, reolios]
camada: 3_folha
dominio: vendas
categoria: vendas-atendimento
subtipo: skill
hierarquia: 4
h: 4
hub_pai: '[[hubs/skills/Skills - Vendas Atendimento]]'
description: >
  Qualifica leads B2B com critérios explícitos de aderência, momento e evidência.
  Use ao priorizar oportunidades, classificar formulários ou preparar descoberta comercial.
---

# Qualificação de leads B2B

## Entrada

Leia `sistema/memoria/empresa.md`, `publico-alvo.md` e `produtos.md` se forem pertinentes. Receba perfil ideal, critérios eliminatórios, dados de cada lead, origem, data de coleta e capacidade comercial. Exemplo: “Priorize 15 formulários para software de cobrança de clínicas com 2 a 20 unidades; temos setor, cargo, tamanho e problema descrito”.

## Processo

1. Defina critérios antes de ver os leads: setor, porte, problema, autoridade de compra, prazo e compatibilidade com a oferta. Distinga dado observado de inferido.
2. Valide campos e elimine duplicatas por chave legítima. Campo ausente não vira resposta negativa; marque `não informado`.
3. Aplique regras determinísticas para critérios objetivos. Para texto livre, use julgamento restrito a categorias descritas com opção `indeterminado`; saída estruturada não torna a classificação verdadeira.
4. Calibre pesos e limiares com histórico rotulado de ganhos e perdas, se houver. Sem histórico, entregue faixas `priorizar agora`, `pesquisar` e `fora de escopo` como hipótese operacional, não probabilidade de fechamento.
5. Verifique falsos negativos em amostra e evite usar atributos pessoais sem necessidade. Contato e envio de mensagem seguem regras do canal e finalidade registrada.

## Saída esperada

Tabela `lead_id | aderência | momento | evidências | dados ausentes | próxima ação | responsável`, mais definição dos critérios e exemplos de revisão. Exemplo: `L-12 | aderente | indeterminado | clínica com 4 unidades, cobrança manual declarada | prazo e decisor | reunião de descoberta | comercial`.

Não invente faturamento, orçamento, cargo ou urgência a partir do nome da empresa. Separe a lista priorizada do texto de abordagem comercial.

## Referência

- [TypeSafe: princípios de julgamentos tipados e confiança](https://docs.typesafe.ai/llms.txt). Use a documentação atual se integrar Jev; limiares dependem dos dados do negócio.
