# UI-Scout: Referências de Stack / Tech Grid Compacto com Ícones e Títulos Grandes

> **Projeto**: Redesign do Portfólio Pedro Reoli  
> **Diagnóstico Atual da Seção 4 (Stack)**: Grid de 4 colunas com cards excessivamente altos/pesados, tipografia diminuta (títulos em 0.68rem - 0.82rem) e ícones pequenos (20px), truncados em ellipsis de 1 linha.  
> **Objetivo**: Reconstrução total em **cards compactos**, com ícones dominantes (`24px - 26px`), títulos legíveis (`clamp(1rem, 1.15vw, 1.2rem)`), remoção da trava artificial de `100svh` e acabamento editorial escuro com toques de amarelo `#ffc900`.

---

## 1. Linear.app — Method & Tech Specs
- **URL**: [https://linear.app/method](https://linear.app/method)
- **Descrição Visual**: Padrão de ouro em design de alta densidade de informação com extrema clareza e sofisticação. Os cartões são compactos, a geometria é precisa e a hierarquia visual é instantânea.
- **Estrutura dos Cards**:
  - Altura contida (`auto`, tipicamente entre 100px e 120px).
  - Ícone vetorial nítido em caixa dedicada com fundo levemente iluminado (`rgba(255, 255, 255, 0.04)`).
  - Título do card em caixa alta sutil com peso semibold, seguido de label explicativa curta em 2 linhas sem truncar.
- **3 Adaptações ao nosso caso**:
  1. Aumentar o título do card para `clamp(1rem, 1.15vw, 1.2rem)` em caixa alta estruturada com tracking refinado.
  2. Ampliar o ícone da tecnologia para `24px - 26px` dentro de um container quadrado de `36px x 36px` com raio sutil (`--radius-xs: 8px`).
  3. Permitir que a descrição da ferramenta quebre em até 2 linhas naturais (`clamp(0.78rem, 0.9vw, 0.9rem)`), eliminando o corte com reticências.

---

## 2. Raycast — Store & Extension Grid
- **URL**: [https://www.raycast.com/store](https://www.raycast.com/store)
- **Descrição Visual**: Microcards minimalistas para atalhos e ferramentas com foco primordial no glifo/ícone da aplicação e no nome limpo, em fundo dark obsidiana.
- **Estrutura dos Cards**:
  - Layout horizontal ou vertical compacto com borda translúcida fina (`1px solid rgba(245, 243, 239, 0.08)`).
  - Microinteração de hover: a borda ilumina com a cor primária (`#ffc900`) e o card sobe discretamente `2px`.
  - Tags de contexto mínimas (ex: "Core", "Agentes", "Cloud") para rápida escaneabilidade.
- **3 Adaptações ao nosso caso**:
  1. Utilizar grid de 5 colunas em telas amplas (`>= 1280px`), 4 colunas em laptops (`1024px`) e 2 colunas no mobile (`360px - 768px`).
  2. Adicionar micro-glow amarelo sutil no hover (`box-shadow: 0 4px 16px var(--accent-glow)`).
  3. Remover o travamento da seção em `100svh`, permitindo que a lista de tecnologias respire com `min-height: auto` e padding vertical proporcional.

---

## 3. Vercel — Integrations & Ecosystem Directory
- **URL**: [https://vercel.com/integrations](https://vercel.com/integrations)
- **Descrição Visual**: Grid utilitária monocromática de altíssimo contraste, onde cada bloco de tecnologia é reconhecido imediatamente pelo ícone proeminente e pelo nome forte.
- **Estrutura dos Cards**:
  - Fundo translúcido escuro: `background: rgba(17, 18, 22, 0.75)` com `backdrop-filter: blur(8px)`.
  - Ícone monocromático ou colorido com contraste certificado WCAG AAA contra o fundo de obsidiana.
  - Alinhamento em subgrid garantindo que títulos e ícones mantenham a mesma linha de base horizontal em todas as colunas.
- **3 Adaptações ao nosso caso**:
  1. Fundo do card em vidro fumê translúcido, permitindo que a textura do vídeo de fundo (a sombra e o mármore) seja percebida sutilmente por trás do painel.
  2. Contraste mínimo de 7:1 para os títulos (`--paper: #f5f3ef` sobre `--night: #08090b`).
  3. Divisão clara entre categorias (ex.: Frontend & Design System, Arquitetura & Next.js, AI & Automação).

---

## 4. CodePen: Minimal Dark Tech Stack Grid (Kevin Powell)
- **URL**: [https://codepen.io/kevinpowell/pen/xxYwZgL](https://codepen.io/kevinpowell/pen/xxYwZgL)
- **Descrição Visual**: Implementação moderna em CSS Grid com cartões flexíveis e tipografia responsiva baseada em `clamp()`, eliminando quebras de layout em qualquer viewport.
- **Estrutura dos Cards**:
  - Grid com `grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))`.
  - Padding interno compacto (`16px` em desktop, `12px` em mobile), maximizando o espaço útil da tela.
  - Zero dependência de JavaScript para alinhamento ou ajuste de escala.
- **3 Adaptações ao nosso caso**:
  1. Estruturação interna do card com grid de 3 linhas automáticas: ícone, título e descrição curta.
  2. Ponto de contato tátil acessível: bounding box com clique/foco de no mínimo `44px` para navegação via teclado.
  3. Estilo de anel de foco destacado com `--accent: #ffc900` para conformidade WCAG 2.2.

---

## Resumo e Top-3 Recomendações para a Seção de Stack:
1. **Top 1 (Proporção dos Cards)**: Padrão Linear (Cards compactos de ~110px de altura, padding contido de 14-16px, eliminando a sensação de "bloco vazio").
2. **Top 2 (Dominância Visual)**: Padrão Raycast / Vercel (Ícones ampliados para 24-26px com caixa de 36px, e títulos em `clamp(1rem, 1.15vw, 1.2rem)` sem truncamento).
3. **Top 3 (Fluxo de Página)**: Remover `height: 100svh` que forçava compactação ou scroll interno quebrado; usar grid responsivo de 4 a 5 colunas com fluxo natural de rolagem.
