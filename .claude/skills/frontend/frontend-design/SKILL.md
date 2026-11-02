---
tipo: skill
nome: Design intencional de interfaces
name: frontend-design
aliases:
  - frontend-design
  - /frontend-design
  - Design intencional de interfaces
tags:
  - h4
  - skill
  - frontend
  - reolios
camada: 3_folha
dominio: tecnologia
categoria: frontend
subtipo: skill
hierarquia: 4
h: 4
hub_pai: '[[hubs/skills/Skills - Frontend]]'
description: >
  Cria interfaces com direção visual, acessibilidade e teste responsivo.
  Use em páginas, componentes e revisão visual de frontend.
---

# Design intencional de interfaces

Defina uma direção visual a partir do produto, público e identidade existente; confirme qualidade com inspeção da interface real. Este documento não é uma norma oficial da Anthropic.

---

## 1. Regra de Ouro: Compromisso Estético Prévio

Antes de escrever HTML, CSS ou JSX, escolha uma direção coerente com a identidade do produto. Os estilos abaixo são referências, não uma lista obrigatória:

1. **Brutalist / Technical**: Bordas bem marcadas, tipografia monoespaçada em labels, paleta de alto contraste, sem bordas suaves gratuitas.
2. **Luxury / Editorial**: Fundo escuro sutil, tipografia display serifada grande, espaçamento generoso, detalhes em metais ou tons terrosos sutis.
3. **Neo-Brutalism**: Cores saturadas pop, sombras pretas sólidas deslocadas (`4px 4px 0px #000`), bordas pretas espessas, fontes garrafais.
4. **Clean Modern SaaS**: Tipografia geométrica extremamente refinada, micro-bordas (`1px solid rgba(...)`), glassmorphism funcional e cantos arredondados calculados.
5. **Retro-Futuristic / Cyber**: Linhas neon finas, modos de fusão, efeitos de varredura (scanlines), acentos verdes/azuis elétricos sobre superfícies pretas.

---

## 2. Lista Negra de Anti-Patterns ("AI Slop Blacklist")

❌ **PROIBIDO**:
- Gradientes roxos/azuis padrão sobre fundo escuro genérico sem identidade.
- Fontes genéricas não intencionais (`Inter` ou `Roboto` padrão sem estilização tipográfica marcante).
- Cards repetitivos com ícones centralizados dentro de círculos transparentes sem variação.
- Botões com gradiente azul/violeta genérico e brilho circular azulado sob o botão.
- Usar números mágicos no CSS em vez de escala lógica de tokens (`gap-4`, `gap-8`, `p-6`).

---

## 3. Diretrizes Rígidas de Implementação

### Tipografia Marcante
- Escolha fontes compatíveis com a identidade e legibilidade; uma única família com pesos suficientes pode ser adequada.
- Ajuste o `letter-spacing` (tracking): títulos grandes devem ter tracking ligeiramente negativo (`-0.02em` a `-0.04em`). Labels minúsculas (`text-xs`) em caixa alta devem ter tracking positivo (`0.1em` / `tracking-wider`).

### Acessibilidade & Contraste
- Verifique WCAG 2.2: texto comum com contraste mínimo de 4,5:1 e texto grande com 3:1 no critério 1.4.3.
- Todos os elementos interativos devem ter estados de **Hover**, **Focus-visible** (acessibilidade de teclado) e **Active**.

### Responsividade Fluida
- Teste e garanta funcionamento perfeito em três breakpoints principais:
  - **Mobile**: `360px` - `480px` (Layout vertical single-column, touch targets >= 44px).
  - **Tablet**: `768px` - `1024px` (Refluxo para grid de 2 colunas).
- **Desktop**: `1280px`+ (Grid completo com contenores centralizados max-w-7xl).

## Briefing e entrega

**Entrada de exemplo:** “Revisar dashboard do ReoliOS em 400, 900 e 1416 px mantendo ações acessíveis”. Receba referência visual, conteúdo real, stack e larguras alvo. Entregue direção visual em duas frases, implementação, capturas nas larguras alvo e lista de problemas de contraste, foco, overflow e conteúdo truncado. Verifique teclado e zoom; não declare qualidade visual apenas com build.

**Fonte:** [WCAG 2.2, contraste mínimo](https://www.w3.org/TR/WCAG22/).

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Frontend|Skills - Frontend]]
<!-- vault-navigation:end -->
