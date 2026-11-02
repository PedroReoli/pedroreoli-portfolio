---
tipo: skill
nome: Pesquisa profunda de mercado e negócio
name: pesquisar
aliases:
  - pesquisar
  - /pesquisar
  - Pesquisa profunda de mercado e negócio
tags:
  - h4
  - skill
  - operacao
  - reolios
camada: 3_folha
dominio: operacao
categoria: operacao
subtipo: skill
hierarquia: 4
h: 4
hub_pai: '[[hubs/skills/Skills - Operacao]]'
description: >
  Pesquisa profunda sobre qualquer tema de negócio: mercado, concorrência,
  tendências, tecnologias, público-alvo, oportunidades. Usa WebSearch e WebFetch
  pra trazer dados reais, não achismo. Entrega relatório estruturado com fontes.
  Use quando o usuário pedir "pesquisa sobre", "analisa o mercado de", "quem são
  meus concorrentes", "tendências de", "/pesquisar".
---

# Pesquisa profunda de mercado e negócio

Skill de inteligência. Transforma uma pergunta vaga em relatório denso com dados reais, fontes citadas e recomendações acionáveis.

## Dependências

- **Contexto:** `sistema/memoria/empresa.md`, `sistema/memoria/estrategia.md`
- **Ferramentas:** WebSearch, WebFetch
- **Output:** `dados/pesquisas/`

---

## Workflow

### Passo 1 — Definir escopo

Se o usuário não especificou, perguntar:
1. "O que exatamente quer descobrir?"
2. "Tem algum concorrente específico que quer que eu analise?"
3. "É pra tomar qual decisão?" (ajuda a focar a pesquisa)

Se o contexto já estiver claro, seguir direto.

### Passo 2 — Pesquisa em camadas

**Camada 1 — Panorama geral:**
- WebSearch com 5-8 queries diferentes sobre o tema
- Mapear os players principais, tamanho do mercado, tendências

**Camada 2 — Profundidade:**
- WebFetch nos 3-5 resultados mais relevantes
- Extrair dados concretos: números, datas, nomes, preços
- Identificar padrões e contradições entre fontes

**Camada 3 — Concorrência (se aplicável):**
- Analisar sites dos concorrentes diretos
- Preços, posicionamento, pontos fortes, pontos fracos
- O que eles fazem que o usuário não faz (e vice-versa)

**Camada 4 — Oportunidades:**
- Gaps que ninguém está cobrindo
- Tendências emergentes que ainda não saturaram
- Ângulos de diferenciação possíveis

### Passo 3 — Relatório

Salvar em `dados/pesquisas/<tema>-<YYYY-MM-DD>.md`

### Passo 4 — Síntese

Mostrar no chat apenas resumo executivo + recomendação. Apontar pro arquivo completo.

---

## Regras

- Nunca inventar dados. Se não encontrou, dizer "não encontrei dados confiáveis sobre X"
- Sempre citar a fonte de cada afirmação factual
- Priorizar dados recentes (últimos 12 meses)
- Se o tema for muito amplo, propor recorte antes de pesquisar
- Pesquisa em português do Brasil primeiro, inglês se necessário
- Mínimo 5 fontes diferentes por relatório

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Operacao|Skills - Operacao]]
<!-- vault-navigation:end -->
