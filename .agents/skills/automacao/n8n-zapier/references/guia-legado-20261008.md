# Legado arquivado: automacao/n8n-zapier

> Snapshot integral pré-modernização da skill. Preservado para continuidade e comparação; pode conter comandos, métricas ou premissas desatualizados. **Não seguir em conflito com SKILL.md atual.**

---

---
tipo: skill
nome: n8n e Zapier
name: n8n-zapier
aliases:
  - n8n-zapier
  - /n8n-zapier
  - n8n e Zapier
tags:
  - h4
  - skill
  - automacao
  - reolios
camada: 3_folha
dominio: tecnologia
categoria: automacao
subtipo: skill
hierarquia: 4
h: 4
hub_pai: '[[hubs/skills/Skills - Automacao]]'
description: >
  Criação e integração de fluxos no-code/low-code.
---

# n8n e Zapier

## Objetivo


Criar o blueprint completo de um fluxo de automação no-code — descrevendo cada nó, gatilho, condição e ação em linguagem visual e passo a passo — para implementar no n8n ou Zapier sem precisar escrever código. Permite ao consultor de IA construir automações para si e para clientes usando ferramentas visuais, com um roteiro tão claro que qualquer pessoa consegue seguir.

## Quando usar


    Para automatizar processos do próprio negócio sem precisar de desenvolvedor
    Para entregar automações a clientes como parte da implementação de IA
    Quando quer documentar um fluxo de automação antes de construí-lo
    Para criar um template de automação replicável para diferentes clientes do mesmo setor


## Como usar


    1Copie o prompt abaixo no Claude ou ChatGPT
    2Descreva o processo que quer automatizar em linguagem livre
    3Informe as ferramentas que o cliente ou você usa
    4Receba o blueprint completo com cada passo do fluxo e instruções de implementação


## O Prompt


Descreva gatilho, entradas, passos, exceções e destino antes de escolher n8n, Zapier ou Make. Verifique conectores e limites na documentação atual da ferramenta escolhida. Entregue blueprint compreensível para quem manterá o fluxo.

**Processo a automatizar (descreva livremente):**
[ex: "quando um lead preenche o formulário do site, quero que: (1) ele receba um email de boas-vindas automático, (2) seu contato seja adicionado no CRM, (3) eu receba uma notificação no WhatsApp"]

**Ferramentas que estão em uso (ou preferidas):**
[liste todas as ferramentas envolvidas — ex: site WordPress, formulário Typeform, CRM HubSpot, email via Gmail, WhatsApp via Z-API]

**Plataforma de automação preferida:**
[n8n Community self-hosted (licença gratuita para usos permitidos, mas infraestrutura, manutenção e integrações podem gerar custos) / n8n Cloud (pago) / Zapier / Make / sem preferência]

**Frequência / gatilho:**
[ex: em tempo real quando o formulário é preenchido / toda manhã às 8h / quando um arquivo é adicionado ao Google Drive]

**Volume estimado:**
[ex: 10 ativações por dia / 200 por mês / imprevisível]

**Nível de complexidade do cliente:**
[básico — poucas ferramentas / intermediário / avançado com banco de dados]

Entregue:

**1. Visão geral do fluxo**
Diagrama textual do fluxo completo: GATILHO → Passo 1 → Passo 2 → [Condição] → Passo 3a / 3b → Resultado final.

**2. Blueprint detalhado — passo a passo**
Para cada nó/etapa: Nome do nó | Tipo (trigger/ação/condição) | Ferramenta | O que configura | Dados que usa | Dados que passa adiante

**3. Configuração de cada integração**
Para cada ferramenta: como conectar a conta, quais permissões dar, qual campo mapear para qual.

**4. Tratamento de erros**
O que configurar para quando: um campo vier vazio / a API retornar erro / a automação falhar silenciosamente.

**5. Como testar antes de ativar**
Passo a passo para testar o fluxo com dados fictícios sem afetar dados reais.

**6. Estimativa de custo**
Para qualquer plataforma, discrimine plano/licenciamento, volume de execuções ou tarefas faturáveis, chamadas de API, infraestrutura, manutenção, observabilidade e suporte. Para Zapier/Make, confirme regras atuais de cobrança e limites do plano. Para n8n Community self-hosted, a licença pode ser gratuita no uso permitido, mas o custo total de operação não é necessariamente zero. Verifique as condições de licença se o fluxo for vendido, hospedado para terceiros ou incorporado a um produto. Não invente valores nem trate estimativas como cotações.


## Exemplo de uso


## Input


- Processo: lead preenche formulário → email automático → adicionar no Notion → notificação no WhatsApp - Ferramentas: Typeform, Gmail, Notion, WhatsApp (Z-API) - Plataforma: n8n - Volume: 5-15 leads por semana

## Output


```
[GATILHO] Typeform — novo preenchimento
    ↓
[AÇÃO 1] Formatar dados (nome, email, telefone, empresa)
    ↓
[CONDIÇÃO] Email é válido?
    ↓ SIM                    ↓ NÃO
[AÇÃO 2a] Gmail —         [AÇÃO 2b] Log de erro
enviar email boas-vindas   no Google Sheets
    ↓
[AÇÃO 3] Notion — criar página em "Leads" com todos os dados
    ↓
[AÇÃO 4] Z-API — enviar mensagem WhatsApp para Pedro
"Novo lead: [Nome] da [Empresa] — ver no Notion: [link]"
```

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Automacao|Skills - Automacao]]
<!-- vault-navigation:end -->
