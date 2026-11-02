---
tipo: skill
nome: Geração de Workflows n8n
name: n8n-workflow-gen
aliases:
  - n8n-workflow-gen
  - /n8n-workflow-gen
  - Geração de Workflows n8n
tags:
  - h4
  - skill
  - automacao
  - n8n
  - reolios
camada: 3_folha
dominio: automacao
categoria: automacao
subtipo: skill
hierarquia: 4
h: 4
hub_pai: '[[hubs/skills/Skills - Automacao]]'
description: >
  Desenha workflows n8n e valida o JSON na versão alvo antes de chamar de importável.
---

# Geração de Workflows n8n

Traduza um processo em workflow n8n verificável. A estrutura de nós muda por versão; JSON sintaticamente válido não comprova importação nem execução.

---

## 🧭 Contexto do Negócio

Antes de gerar o JSON, valide:
1. Qual o gatilho da automação? (Webhook, Schedule, Polling de API, Evento de App específico).
2. Quais são os passos intermediários? (Filtros, formatações de dados, requisições HTTP secundárias).
3. Qual é o destino final ou ação esperada? (Salvar no banco, enviar e-mail, mandar mensagem no Slack).
4. Existem credenciais necessárias que o usuário precisará configurar posteriormente?

---

## 📐 Nós (Nodes) Mais Comuns e Boas Práticas

Para garantir um workflow funcional e fácil de entender, foque nos nós fundamentais do n8n:

1. **Webhook / Schedule Trigger:** O início do fluxo. Defina métodos HTTP (GET/POST) corretos se for Webhook.
2. **IF Node / Switch Node:** Para criar ramificações condicionais baseadas nos dados do gatilho.
3. **Set Node / Edit Fields:** Essencial para limpar e organizar os dados antes de enviá-los para o próximo app (mapeamento de variáveis).
4. **HTTP Request Node:** A "bala de prata" do n8n para APIs que não possuem nó nativo construído.
5. **Code Node:** Use apenas se a manipulação de dados for complexa demais para nós visuais (ex: loops complexos ou mapeamento avançado de arrays em JavaScript).

---

## Contrato e validação do JSON

**Briefing de exemplo:** “Receber um webhook de pedido, validar `order_id`, consultar o ERP e gravar resultado; n8n versão X, sem enviar dados pessoais a terceiros”. Registre versão exata do n8n, gatilho, payload de exemplo, credenciais disponíveis e destino.

1. Verifique na instalação ou documentação da versão alvo os tipos e `typeVersion` dos nós. Não use `n8n-nodes-base.start` nem conexões para nós inexistentes como molde universal.
2. Monte `nodes` e `connections` com IDs e nomes únicos, referências existentes, parâmetros validados e credenciais por referência, nunca com tokens no JSON.
3. Importe em ambiente de teste da mesma versão e execute com caso válido, inválido e falha do destino. Se não houver ambiente, entregue como **rascunho não validado para importação**.
4. Descreva idempotência, retentativas, tratamento de erro e campos sensíveis nos logs.

---

## 📋 Padrões por Caso de Uso (Templates)

- **Lead Capture:** Webhook (Recebe Lead) ➔ IF (Email válido?) ➔ HTTP (Envia pro CRM) ➔ Slack (Notifica time).
- **Sincronização Diária:** Schedule (Todo dia às 00h) ➔ HTTP Request (Busca dados ERP) ➔ Code Node (Formata lista) ➔ Google Sheets (Atualiza planilha).
- **Atendimento AI:** Telegram/WhatsApp Trigger ➔ OpenAI Node (Processa intenção) ➔ Switch (Suporte vs Vendas) ➔ Retorna mensagem.

---

## 📤 Formato de Saída (Output)

Sempre entregue:
1. **Resumo Visual do Fluxo:** Explicação em texto de como a automação vai funcionar passo a passo.
2. **Bloco de Código JSON:** JSON completo somente após confirmar os tipos de nós; indique a versão alvo e o nível de validação realizado.
3. **Instruções de Pós-Importação:** Indicação de quais nós precisarão de credenciais (`Credentials to Set`) e quais parâmetros precisarão de ajuste manual (URLs, IDs de conta).

**Fonte:** [n8n: importação e exportação de workflows](https://docs.n8n.io/workflows/export-import/).

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Automacao|Skills - Automacao]]
<!-- vault-navigation:end -->
