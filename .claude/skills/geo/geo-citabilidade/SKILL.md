---
tipo: skill
nome: Auditoria e Otimização para Motores de Busca com IA (GEO)
name: geo-citabilidade
aliases:
  - geo-citabilidade
  - /geo
  - generative-engine-optimization
tags:
  - h4
  - skill
  - seo
  - geo
  - ai-search
  - reolios
camada: 3_folha
dominio: marketing
categoria: geo
subtipo: skill
hierarquia: 4
h: 4
hub_pai: '[[hubs/skills/Skills - SEO]]'
description: >
  Audita e otimiza páginas web, artigos e landing pages para citação direta
  em buscas com IA. Avalia rastreabilidade, utilidade original e afirmações com
  evidência; use para auditoria GEO de uma URL e consultas específicas.
---

# Auditoria e Otimização para Motores de Busca com IA (GEO)

Avalie descoberta e utilidade da página com evidências verificáveis. Nenhum ajuste garante citação em respostas de IA.

---

## 🧭 Os 4 Pilares da Citabilidade por IA

1. **Afirmações Diretas e Respondíveis:**
   - LLMs procuram respostas claras logo nas primeiras linhas de uma seção.
   - Evite introduções prolixas. Comece com a definição ou o dado central.
2. **Densidade Factual e Estatística:**
   - Use números apenas com fonte, período e método identificáveis. Não estime probabilidade de citação sem estudo aplicável.
3. **Marcação Estruturada (Schema JSON-LD):**
   - Use apenas tipos compatíveis com o conteúdo visível e com recursos documentados. Schema não é requisito especial para aparecer em buscas com IA.
4. **Resumos Executivos em Listas:**
   - Estruture seções para leitores humanos. Use listas e tabelas quando ajudarem a explicar, sem assumir preferência universal de sistemas de IA.

---

## 📋 Checklist de Auditoria GEO

Ao avaliar uma página ou artigo:

- [ ] O título responde diretamente a uma intenção de busca específica?
- [ ] O primeiro parágrafo define o tópico sem enrolação?
- [ ] Cada número publicado tem fonte, período e contexto?
- [ ] As seções são divididas com cabeçalhos H2 e H3 que simulam perguntas comuns dos usuários?
- [ ] A URL responde, pode ser rastreada, é indexável e permite snippet?
- [ ] O dado estruturado, se usado, corresponde ao texto visível e passa na validação?

## Execução e entrega

**Briefing de entrada:** URL, país/idioma, consulta alvo, público e acesso disponível ao Search Console. Exemplo: “Audite /servicos/automacao para ‘automação de cobrança em clínicas’ no Brasil”.

1. Registre URL canônica, data e fonte da observação. Verifique HTTP, robots, `noindex`, conteúdo renderizado e Search Console se disponível.
2. Compare consulta e resposta visível. Classifique cada achado como `observado`, `inferido` ou `sem dados`.
3. Entregue tabela `achado | evidência/URL | impacto provável | ação | validação`. Exemplo: `noindex | HTML de 2026-10-01 | impede indexação | revisar regra | inspeção de URL`.
4. Informe as verificações impossíveis. Não invente métricas de plataformas externas nem prometa tráfego.

**Referências:** [Google Search Central: IA na Busca](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) e [diretrizes de dados estruturados](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).
