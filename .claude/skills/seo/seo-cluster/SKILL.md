---
tipo: skill
nome: Arquitetura de Conteúdo Semântico (Hub-and-Spoke)
name: seo-cluster
aliases:
  - seo-cluster
  - /seo-cluster
  - Arquitetura de Conteúdo Semântico (Hub-and-Spoke)
tags:
  - h4
  - skill
  - seo
  - reolios
camada: 3_folha
dominio: marketing
categoria: seo
subtipo: skill
hierarquia: 4
h: 4
hub_pai: '[[hubs/skills/Skills - Seo]]'
description: >
  Planeja arquitetura de conteúdo semântico em modelo Hub-and-Spoke (Página
  Pilar + Satélites). Conecta tópicos por intenção de busca para dominar
  palavras-chave no Google e motores de IA. Use quando pedir "topic cluster",
  "cluster de conteúdo", "página pilar", "hub and spoke", "arquitetura de
  conteúdo", "seo cluster" ou "/seo-cluster".
---

# Arquitetura de Conteúdo Semântico (Hub-and-Spoke)

Organiza páginas por intenção e relações úteis ao leitor. Estrutura de links não garante posições no Google nem citação em respostas de IA.

---

## 🏗️ O Modelo Hub-and-Spoke

```
                    ┌─────────────────────────┐
                    │   PÁGINA PILAR (HUB)    │
                    │ Guia Completo / Termo   │
                    │   Amplo de Alto Volume  │
                    └───────────┬─────────────┘
                                │ Links Internos Cruzados
        ┌───────────────────────┼───────────────────────┐
        ▼                       ▼                       ▼
┌──────────────┐        ┌──────────────┐        ┌──────────────┐
│  SATÉLITE 1  │◄──────►│  SATÉLITE 2  │◄──────►│  SATÉLITE 3  │
│  Subtópico   │        │   Tutorial   │        │  Comparativo │
│  Específico  │        │   Prático    │        │  Comercial   │
└──────────────┘        └──────────────┘        └──────────────┘
```

---

## 📋 Fluxo de Criação do Cluster

### 1. Escolha do Tema Central (Pilar)
- Tema amplo e relevante ao público, com demanda sustentada por dados disponíveis; não invente volume.
- A página pilar deve responder ao tema com utilidade própria e apontar para aprofundamentos quando houver conteúdo distinto.

### 2. Mapeamento dos Satélites (Long-Tail)
Gerar apenas páginas para dúvidas distintas com material original:
- **Como fazer:** *"Como calcular o preço da sua hora de trabalho"*
- **Comparativo:** *"PJ vs MEI para desenvolvedores: qual compensa mais?"*
- **Ferramentas:** *"Top 5 apps de controle financeiro para autônomos"*
- **Erros comuns:** *"7 erros contábeis que fazem o dev pagar imposto a mais"*

### 3. Matriz de Linkagem Interna
- Cada página satélite DEVE conter pelo menos 1 link para a Página Pilar com texto âncora contextual.
- Satélites relacionados podem se conectar por links rastreáveis e texto âncora descritivo quando ajudarem a navegação; não há número mágico de links.

---

## 🎯 Entregável do Agente

Ao rodar `/seo-cluster <tema>`, o ReoliOS gera:
1. **Nome e URL proposta para a Página Pilar**.
2. **Lista priorizada de satélites justificáveis** com título, consulta, intenção, evidência e distinção da página pilar.
3. **Pauta executiva (Content Brief)** para o primeiro artigo ser escrito.

**Briefing de exemplo:** “Temos artigos sobre precificação de freelancer; organize sem criar páginas repetidas”. Mapeie URLs atuais, consultas do Search Console e lacunas verificadas. Entregue tabela `URL atual/proposta | intenção | evidência | conteúdo exclusivo | link contextual | prioridade`. Marque volume e concorrência como desconhecidos se não houver fonte.

**Fontes:** [Google: conteúdo útil](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) e [boas práticas de links](https://developers.google.com/search/docs/crawling-indexing/links-crawlable).

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Seo|Skills - Seo]]
<!-- vault-navigation:end -->
