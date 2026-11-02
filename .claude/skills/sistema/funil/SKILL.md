---
tipo: skill
nome: Funil de vendas completo
name: funil
aliases:
  - funil
  - /funil
  - Funil de vendas completo
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
  Monta funil de vendas completo: captura, nutrição e conversão. Define cada
  etapa com copy, páginas, emails e métricas. Integra com as outras skills
  (landing page, email, ads). Use quando o usuário pedir "funil de vendas",
  "funil pra", "estratégia de conversão", "como converter mais", "jornada do
  cliente", "/funil".
---

# Funil de vendas completo

Desenha o funil inteiro do negócio: de estranho a cliente. Define cada etapa, o que acontece em cada uma, e o que precisa ser criado.

## Dependências

- **Contexto:** `sistema/memoria/empresa.md`, `sistema/memoria/estrategia.md`
- **Tom:** `_memoria/preferencias.md`
- **Output:** `marketing/funil/`

---

## Workflow

### Passo 1 — Diagnóstico

Ler `_memoria/empresa.md` e perguntar o que faltar:
1. "Qual o produto/serviço principal que quer vender com esse funil?"
2. "Qual o ticket médio?"
3. "Como o cliente chega até você hoje? (Instagram, Google, indicação, outro)"
4. "Tem lista de emails ou contatos? Quantos?"
5. "Qual a maior objeção que o cliente tem antes de comprar?"

### Passo 2 — Arquitetura do funil

**TOPO (Atração):**
- Onde o público está (canais)
- O que vai atrair atenção (conteúdo, ads, SEO)
- Métrica: alcance, cliques, visitas

**MEIO (Nutrição):**
- Como capturar contato (isca digital, formulário, WhatsApp)
- Como nutrir (sequência de emails, conteúdo, remarketing)
- Métrica: leads capturados, taxa de abertura, engajamento

**FUNDO (Conversão):**
- Como converter (página de vendas, call, proposta, demo)
- Como quebrar objeções (prova social, garantia, urgência)
- Métrica: conversões, ticket médio, CAC

**PÓS-VENDA (Retenção):**
- Como manter (onboarding, suporte, upsell)
- Como gerar indicação
- Métrica: LTV, NPS, taxa de recompra

### Passo 3 — Plano de ação

Pra cada etapa, listar:
- O que precisa ser criado (landing page, email, post, ad)
- Qual skill do ReoliOS resolve
- Prioridade (o que fazer primeiro)

### Passo 4 — Sequência de emails (se aplicável)

Se o funil incluir nutrição por email:
- Email 1 (D+0): Entrega da isca + apresentação
- Email 2 (D+2): Conteúdo de valor
- Email 3 (D+4): Prova social
- Email 4 (D+6): Quebra de objeção principal
- Email 5 (D+8): Oferta + CTA direto
- Email 6 (D+10): Urgência/escassez

Cada email com assunto + corpo completo.

### Passo 5 — Output

```
marketing/funil/
  arquitetura.md
  plano-acao.md
  emails/
    01-boas-vindas.md
    02-valor.md
    03-prova-social.md
    04-objecao.md
    05-oferta.md
    06-urgencia.md
  metricas.md
```

---

## Regras

- Funil realista pro tamanho do negócio (dev solo)
- Priorizar o caminho mais curto até a primeira venda
- Não complicar — se vende por WhatsApp, o funil termina no WhatsApp
- Emails seguem `sistema/memoria/preferencias.md`
- Cada etapa precisa de métrica clara
- Se já tem clientes, começar pelo fundo antes do topo

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Sistema|Skills - Sistema]]
<!-- vault-navigation:end -->
