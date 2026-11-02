---
tipo: skill
nome: Geração de Apresentações Executivas PPTX
name: apresentacao-pptx
aliases:
  - apresentacao-pptx
  - /apresentacao-pptx
  - Geração de Apresentações Executivas PPTX
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
  Gera e estrutura apresentações comerciais, pitch decks para investidores e
  relatórios executivos em formato PowerPoint nativo (.pptx). Use quando pedir
  "criar apresentação", "fazer slides", "apresentação pptx", "pitch deck",
  "gerar ppt", "/apresentacao-pptx" ou "/slides".
---

# Geração de Apresentações Executivas PPTX

Gera apresentações profissionais completas em PowerPoint (.pptx) prontas para edição, envio para clientes ou apresentação comercial.

---

## 🎯 Quando Usar

- Apresentações de propostas comerciais de alto valor para clientes
- Pitch decks para captação de investimento ou validação de produto
- Relatórios executivos de entrega de projetos (SEO, Ads, Software)
- Aulas, workshops e materiais educativos em slides

---

## 🛠️ Modos de Geração

O ReoliOS oferece 2 formas ágeis de materializar a apresentação:

### Opção 1: Via Script Python (`python-pptx`)
Gera o arquivo binário `.pptx` diretamente na pasta do cliente ou raiz do projeto.

```bash
pip install python-pptx
python sistema/scripts/gerar_slides.py --tema "Proposta Comercial" --cliente "Cliente X"
```

### Opção 2: Via Código Marp / Slidev (Markdown para PPTX/PDF)
Estrutura o conteúdo em Markdown com marcações de slide e converte via CLI:
```bash
npx @marp-team/marp-cli slides.md --pptx -o apresentacao.pptx
```

---

## 📐 Estrutura Padrão de um Deck de Alta Conversão (8 Slides)

```
[Slide 1] Capa de Impacto: Título forte + Subtítulo de posicionamento + Data e Cliente
[Slide 2] O Problema / Oportunidade: Dor atual do cliente com métricas de perda
[Slide 3] A Solução ReoliOS: A virada de jogo, arquitetura e fluxo de valor
[Slide 4] Como Funciona (Etapas): Roadmap em 3 passos claros (Diagnóstico → Implementação → Escala)
[Slide 5] Diferenciais Técnicos: Por que esta solução supera agências e abordagens tradicionais
[Slide 6] Resultados Esperados & ROI: Métricas estimadas (CAC menor, tempo economizado, aumento de vendas)
[Slide 7] Proposta Comercial / Investimento: Pacotes, valores, prazos e garantia
[Slide 8] Encerramento & Próximos Passos: CTA direto para início imediato e contatos
```

---

## 🎨 Princípios de Design para Slides Executivos

1. **Uma Ideia por Slide:** Nunca entupa um slide com 5 tópicos diferentes. Se tem 3 pontos, use 3 cards ou 3 colunas.
2. **Hierarquia Tipográfica:** Título (32-40pt bold), Subtítulo (18-24pt regular), Corpo (14-16pt).
3. **Contraste e Cores:** Fundo escuro (#0F172A) com texto claro e acentos em destaque, ou Fundo claro clean (#F8FAFC) com cartões brancos com sombra sutil.
4. **Métricas Gigantes:** Destaque números chave (ex: **+140%**, **R$ 25k/mês**, **5x mais rápido**) em fontes grandes (44-60pt).

---

## 📋 Checklist de Validação do Slide Deck

- [ ] A mensagem central é compreendida em menos de 5 segundos por slide?
- [ ] Os dados e números estão formatados e destacados?
- [ ] O arquivo `.pptx` gerado abre sem erros de formatação no PowerPoint e Google Slides?
- [ ] O CTA final está claro e direciona para o fechamento?

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Operacao|Skills - Operacao]]
<!-- vault-navigation:end -->
