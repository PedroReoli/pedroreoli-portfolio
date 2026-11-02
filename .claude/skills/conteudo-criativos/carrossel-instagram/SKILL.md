---
tipo: skill
nome: Engenharia e Design de Carrosséis para Instagram (1080x1350)
name: carrossel-instagram
aliases:
  - carrossel-instagram
  - /carrossel-instagram
  - instagram-carousel
tags:
  - h4
  - skill
  - instagram
  - carrossel
  - design
  - copy
  - reolios
camada: 3_folha
dominio: conteudo
categoria: conteudo-criativos
subtipo: skill
hierarquia: 4
h: 4
hub_pai: '[[hubs/skills/Skills - Conteudo Criativos]]'
description: >
  Planeja, redige e estrutura carrosséis de alta retenção para Instagram (proporção 4:5,
  1080x1350). Inclui 6 modelos arquiteturais (Educador, Contraintuitivo, Passo a Passo,
  Antes e Depois, Comparativo e Dark Premium) prontos para renderização via HTML/Playwright.
---

# Engenharia e Design de Carrosséis para Instagram (1080x1350)

Planeje carrosséis no formato solicitado e verifique legibilidade antes de publicar. Retenção e salvamentos dependem da audiência e devem ser medidos após a publicação.

---

## 🧱 As 6 Estruturas de Alta Conversão

### 1. O Educador (Framework Teardown)
- **Slide 1 (Capa):** Promessa clara + benefício tangível ("Como estruturar X em 5 minutos").
- **Slide 2:** O erro comum que todo mundo comete.
- **Slides 3 a 6:** Os passos práticos (1 conceito por slide com exemplo visual).
- **Slide 7:** Resumo executivo / Checklist.
- **Slide 8 (CTA):** "Salve para consultar quando for implementar".

### 2. O Contraintuitivo (Quebra de Padrão)
- **Slide 1:** Opinião forte contra o senso comum ("Por que você NÃO deveria fazer X").
- **Slide 2:** A evidência ou dado que comprova a tese.
- **Slides 3 a 5:** A nova abordagem recomendada.
- **Slide 6 (CTA):** "Concorda ou discorda? Deixe sua opinião nos comentários".

### 3. O Passo a Passo Técnico (Tutorial Prático)
- Cada slide representa uma tela ou comando específico, com destaque visual de código ou instrução única.

---

## 🎨 Especificações Visuais para Renderização HTML

Ao gerar templates HTML para serem impressos via Playwright (`sistema/scripts/render.js`):
- **Dimensões exatas:** `width: 1080px; height: 1350px;`
- **Área Segura (Safe Zone):** Manter respiro de 120px nas bordas superior e inferior (para não ser coberto por botões nativos do app).
- **Tipografia:** Títulos com pelo menos `56px` em negrito; corpo de texto com `32px` a `36px`.
- **Contraste:** siga `sistema/identidade/design-guide.md` e verifique leitura na imagem renderizada; não imponha roxo/ciano se a marca usar outra paleta.

## Briefing e saída

**Entrada de exemplo:** “Carrossel educativo sobre três erros de conciliação de pagamentos; marca em azul e creme; 6 slides; sem números de resultado”. Receba tema, público, prova, CTA, identidade e canal. Entregue roteiro `slide | mensagem | evidência | visual`, HTML/PNG se houver renderizador e legenda. Revise ortografia, bordas, contraste e legibilidade em miniatura. Não invente case, número ou regra da plataforma.
