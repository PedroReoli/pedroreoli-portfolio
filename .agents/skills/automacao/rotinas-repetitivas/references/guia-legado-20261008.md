# Legado arquivado: automacao/rotinas-repetitivas

> Snapshot integral pré-modernização da skill. Preservado para continuidade e comparação; pode conter comandos, métricas ou premissas desatualizados. **Não seguir em conflito com SKILL.md atual.**

---

---
tipo: skill
nome: Mapear e priorizar rotinas repetitivas
name: rotinas-repetitivas
aliases: [rotinas-repetitivas, /rotinas-repetitivas, mapear-automacoes]
tags: [skill, automacao, operacao, reolios]
camada: 3_folha
dominio: tecnologia
categoria: automacao
subtipo: skill
hierarquia: 4
h: 4
hub_pai: '[[hubs/skills/Skills - Automacao]]'
description: >
  Inventaria rotinas e prioriza automações por tempo, erro e custo observados.
  Use quando o usuário pedir mapa de automações ou relatar trabalho administrativo repetitivo.
---

# Mapear e priorizar rotinas repetitivas

## Entrada

Consulte `sistema/memoria/automacoes.md` para evitar duplicação. Receba tarefas, frequência, duração medida ou estimada, volume, sistemas usados, responsável, custo do erro, dados sensíveis e orçamento. Exemplo: “Respondo 12 leads por semana (5 min cada), crio 2 propostas (90 min cada) e concilio cobranças 3 vezes por semana (20 min)”.

## Processo

1. Para cada rotina, registre gatilho, entrada, passos, decisão humana, saída e exceções. Separe tarefas repetíveis de decisões que exigem julgamento ou autorização.
2. Calcule tempo atual por semana como `frequência × duração`. Identifique fonte da duração; se for palpite, marque como estimativa e proponha medição de uma semana.
3. Estime tempo residual com automação, custo de implantação/manutenção e risco de erro. Não assuma que ferramentas no-code resolvem porcentagem fixa do trabalho.
4. Priorize pelo benefício líquido e risco, não só pelo tempo bruto. Teste uma rotina de cada vez com entrada real anonimizada, saída esperada e caminho de reversão.
5. Para mensagens externas, primeiro gere rascunho e revisão humana; envio automático depende de regras do canal, base legal e autorização da operação.

## Saída esperada

Entregue tabela `rotina | frequência | tempo atual | tempo residual estimado | risco | ferramenta candidata | evidência | prioridade` e plano das duas primeiras automações com teste e responsável. Exemplo: `propostas | 2/semana | 180 min | 50 min (estimativa) | preço incorreto | template + revisão | cronômetro de 2 propostas | alta`. Informe cálculo e premissas; não declare horas economizadas antes da implantação medida.

Se o pedido for implementar uma rotina local agendada, encaminhe para `/automacao-local`; para um workflow n8n, use `/n8n-workflow-gen` depois do mapeamento.

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Automacao|Skills - Automacao]]
<!-- vault-navigation:end -->
