---
tipo: skill
nome: Orquestração de Agentes Especialistas
name: subagentes
aliases:
  - subagentes
  - /subagentes
  - Orquestração de Agentes Especialistas
tags:
  - h4
  - skill
  - dev
  - reolios
camada: 3_folha
dominio: tecnologia
categoria: dev
subtipo: skill
hierarquia: 4
h: 4
hub_pai: '[[hubs/skills/Skills - Dev Eng]]'
description: >
  Orquestra e despacha sub-agentes especializados em paralelo para tarefas
  complexas de pesquisa, auditoria, testes ou processamento em lote. Use quando
  pedir "despachar subagente", "rodar agentes em paralelo", "subagents",
  "orquestrar agentes" ou "/subagentes".
---

# Orquestração de Agentes Especialistas

Delega etapas pesadas ou independentes para subagentes paralelos, condensando os resultados em um único relatório executivo consolidado.

---

## 🎯 Quando Despachar Subagentes?

- **Auditoria de Grande Escala:** Um subagente audita segurança das rotas, outro audita o frontend, e outro valida o banco de dados.
- **Pesquisa de Mercado Multi-Fonte:** Um subagente garimpa concorrentes no Google, outro pesquisa no Reddit/Twitter e outro analisa pricing.
- **Refatoração com TDD:** Um subagente escreve testes de regressão enquanto outro refatora o código do módulo.

---

## ⚡ Protocolo de Despacho Eficiente

1. **Definição de Fronteira Estrita:**
   Cada subagente recebe um escopo único e não concorrente (para evitar conflito de edição no mesmo arquivo).
2. **Entrada Clara (Input Mínimo):**
   Envie apenas o contexto necessário para a tarefa do subagente para não inflar a janela de contexto.
3. **Saída Estruturada (Contrato de Resposta):**
   O subagente deve responder em formato padronizado (JSON, lista de tópicos ou diff), sem narrativas longas.
4. **Consolidação Central:**
   O agente principal junta os relatórios, valida a coerência e apresenta o resultado final para o usuário.

---

## ⚠️ Anti-Padrões a Evitar

- ❌ Não despache subagentes para tarefas triviais de 1 linha (o custo de inicialização é maior que o ganho).
- ❌ Nunca deixe dois subagentes editarem o mesmo arquivo simultaneamente.
- ❌ Não termine a execução sem validar se todos os subagentes concluíram suas tarefas com sucesso.

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Dev Eng|Skills - Dev Eng]]
<!-- vault-navigation:end -->
