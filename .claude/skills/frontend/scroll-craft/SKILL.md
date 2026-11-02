---
tipo: skill
nome: Engenharia de Experiências Orientadas a Scroll
name: scroll-craft
aliases:
  - scroll-craft
  - /scroll-craft
  - Engenharia de Experiências Orientadas a Scroll
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
  Engenharia de landing pages cinematográficas e experiências orientadas a
  scroll com 8 gramáticas visuais e verificação via browser headless.
---

# Engenharia de Experiências Orientadas a Scroll

Use movimento ligado ao scroll apenas quando ajuda o usuário a entender sequência ou relação espacial. Planeje uma apresentação estática equivalente para acessibilidade e dispositivos limitados.

---

## 1. As 8 Gramáticas Visuais de Scroll

Ao projetar uma página com Scrollcraft, escolha uma ou duas gramáticas principais:

1. **Pinned Reveal (Revelação Fixa)**: A seção fica fixa (`sticky`) na tela enquanto o usuário rola, revelando novos textos ou trocando imagens sobrepostas.
2. **Parallax Layering (Camadas em Paralaxe)**: Elementos de fundo, meio e primeiro plano movem-se em velocidades diferentes criando profundidade 3D.
3. **Horizontal Canvas (Linha do Tempo Horizontal)**: O scroll vertical da página é traduzido em deslocamento horizontal para mostrar cases ou roadmaps.
4. **Zooming Tunnel (Túnel de Zoom)**: O elemento central da tela aumenta de escala (scale 1 -> 5) à medida que o scroll avança, levando o usuário "para dentro" do produto.
5. **Text Unmasking (Desenrolar de Texto)**: Frases em tom cinza apagado ganham cor e brilho palavra por palavra acompanhando a porcentagem do scroll.
6. **Sticky Progress (Indicadores de Progresso)**: Barras laterais ou números numéricos que sincronizam com a leitura de seções longas.
7. **Video Scrubbing (Controle de Vídeo por Scroll)**: O avanço do vídeo em HTML5 é atrelado diretamente à posição da barra de rolagem.
8. **Morphing Cards (Transformação de Cards)**: Cards empilhados que se expandem para tela cheia conforme entram no viewport.

---

## 2. Arquitetura Técnica Recomendada

- **Framer Motion + React**:
  ```jsx
  import { useScroll, useTransform, motion } from 'framer-motion';

  const { scrollYProgress } = useScroll({ target: containerRef });
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 1]);
  ```

- **CSS Pure Scroll-Driven Animations** (para navegadores modernos):
  ```css
  @keyframes reveal {
    from { opacity: 0; transform: translateY(50px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .scroll-section {
    animation: reveal linear both;
    animation-timeline: view();
    animation-range: entry 20% cover 40%;
  }
  ```

---

## 3. Protocolo de Verificação Automática (Headless Pass)

Após gerar o código da landing page:
1. Simule a rolagem de 0% até 100% da página.
2. Verifique se o scroll não travou em seções sticky.
3. Garanta que o contraste do texto permaneça visível sobre fundos em movimento.
4. Verifique se a página é fluida e não gera layout shifts bruscos (CLS).
5. Teste teclado, conteúdo sem JavaScript e `prefers-reduced-motion: reduce`; a informação e ações devem continuar disponíveis.

**Briefing de exemplo:** “Página de lançamento com três etapas do produto e comparação antes/depois; público usa muito celular”. Entregue mapa `seção | informação | animação opcional | alternativa estática`, código e capturas em 400 e 1280 px. Registre navegador e versão testados. Se `animation-timeline` não for suportado no alvo, mantenha conteúdo visível sem animação.

**Fonte:** [MDN: preferência por movimento reduzido](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion).

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Frontend|Skills - Frontend]]
<!-- vault-navigation:end -->
