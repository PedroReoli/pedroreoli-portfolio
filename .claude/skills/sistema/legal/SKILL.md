---
tipo: skill
nome: Documentos legais do negocio
name: legal
aliases:
  - legal
  - /legal
  - Documentos legais do negocio
tags:
  - h4
  - skill
  - sistema
  - reolios
camada: 3_folha
dominio: operacao
categoria: sistema
subtipo: skill
hierarquia: 4
h: 4
hub_pai: '[[hubs/skills/Skills - Sistema]]'
description: >
  Gera documentos legais para produtos digitais: Termos de Uso, Politica de
  Privacidade, contratos de prestacao de servico. Adaptados a LGPD e ao contexto
  do negocio. Use quando o usuario pedir termos de uso, politica de privacidade,
  contrato, LGPD, /legal.
---

# Documentos legais do negocio

Coordene minutas jurídicas com lacunas explícitas. O texto gerado não confirma conformidade da operação.

## Dependencias

- **Contexto:** `sistema/memoria/empresa.md`
- **Output:** `clientes/templates/saidas/legal/`

---

## Workflow

### Passo 1 — Identificar o que precisa

Perguntar:
1. Qual documento precisa? (Termos de Uso / Politica de Privacidade / Contrato de Servico)
2. E pra qual produto ou servico?
3. Coleta dados de usuarios? Quais?
4. Usa cookies ou ferramentas de analytics?
5. Tem processamento de pagamento? Por qual gateway?

### Passo 2 — Gerar o documento

Para privacidade, carregue `/termos-privacidade`; para prestação de serviços, `/contrato-freelancer`. Não duplique cláusulas genéricas quando houver skill específica. Registre fatos fornecidos, hipóteses e dados ausentes antes de redigir.

**Termos de Uso:** identificacao da empresa, descricao do servico, condicoes de uso, propriedade intelectual, limitacao de responsabilidade, rescisao, foro (Brasil/LGPD).

**Politica de Privacidade (LGPD):** controlador dos dados, dados coletados e finalidade, base legal pra cada tratamento, compartilhamento com terceiros, cookies, direitos do titular (acesso, correcao, exclusao, portabilidade), retencao, seguranca, contato do DPO.

**Contrato de Prestacao de Servico:** partes, objeto, entregas e prazos, valor e pagamento, obrigacoes, confidencialidade, propriedade intelectual, rescisao e multas, foro.

### Passo 3 — Formato de entrega

Gerar em Markdown + HTML em `clientes/templates/saidas/legal/`.

### Passo 4 — Avisos

Sempre mostrar que o documento precisa de revisao juridica profissional antes de publicar.

---

## Regras

- Sempre baseado na LGPD (Lei 13.709/2018)
- Linguagem clara — nao e pra confundir o usuario
- Nunca omitir dados que sao coletados
- Sempre incluir aviso de revisao juridica necessaria
- Datas de vigencia e versao no documento
- Se o negócio é SaaS, documente disponibilidade e SLA apenas se forem compromissos reais e aprovados.

**Briefing de exemplo:** “Preciso de termos para um SaaS que cobra assinatura e usa analytics; ainda não definimos prazo de retenção”. Entregue minuta com `[PENDENTE: retenção]`, matriz de tratamentos e lista de revisão jurídica. Não invente bases legais, prazos ou política de cookies.

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Sistema|Skills - Sistema]]
<!-- vault-navigation:end -->
