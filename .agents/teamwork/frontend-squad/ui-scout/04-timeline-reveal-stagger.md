# UI-Scout: Microinterações de Surgimento de Cards em Timeline (Stagger com GSAP ScrollTrigger)

> **Projeto**: Redesign do Portfólio Pedro Reoli  
> **Diagnóstico da Seção 6 (Experiência)**: A timeline atualmente dispara o reveal em batch pelo hook `useReveal` (o bloco inteiro aparece de uma vez, sem sensação de progresso), e possui um ícone `<Sparkles>` desnecessário ao lado dos números dos capítulos (`#01`).  
> **Objetivo**: Implementar microinteração de surgimento individual por card com **stagger por scroll**, acionada via GSAP ScrollTrigger por card, removendo o ícone de estrela e ampliando os cards/fontes em +8% a 12%.

---

## 1. Apple — Career Milestones & History Timeline
- **URL**: [https://www.apple.com/careers/](https://www.apple.com/careers/)
- **Descrição Visual**: Linha do tempo vertical editorial em fundo escuro. Conforme o usuário rola a página, cada marco histórico surge individualmente com uma elevação suave e aumento de opacidade assim que cruza a linha de visão (threshold de 85% da viewport).
- **Mecânica da Animação**:
  - `opacity`: de 0 para 1.
  - `transform`: de `translateY(32px)` para `translateY(0)`.
  - Curva de transição suave (`cubic-bezier(0.16, 1, 0.3, 1)` ou `power2.out`), sem ricochete exagerado, transmitindo sofisticação e precisão técnica.
- **3 Adaptações ao nosso caso**:
  1. Configurar cada `.timeline-card` com trigger individual no GSAP: `start: 'top 85%'`, disparando o reveal no momento exato em que o card entra na viewport.
  2. Adicionar propriedade `once: true` no ScrollTrigger para evitar que o card suma e re-anime caso o usuário role para cima e para baixo repetidamente.
  3. Aumentar a largura dos cards em +8% a 12% (`clamp(360px, 27vw, 450px)`), dando presença imponente a cada marco da carreira.

---

## 2. CodePen: GSAP ScrollTrigger Individual Card Stagger (GreenSock Showcase)
- **URL**: [https://codepen.io/GreenSock/pen/LYVKZZp](https://codepen.io/GreenSock/pen/LYVKZZp)
- **Descrição Visual**: Implementação canônica da GreenSock demonstrando a diferença entre revelação em lote e revelação individual por elemento com respeito a acessibilidade.
- **Mecânica da Animação**:
  - Uso de `gsap.from(card, { scrollTrigger: { trigger: card, start: "top 88%", once: true }, y: 28, opacity: 0, duration: 0.65, ease: "power3.out" })`.
  - Quando dois cards entram no mesmo campo de visão simultaneamente (ex.: em telas ultrawide), o stagger de `0.08s` cria uma cascata sutil sem atrasar a leitura.
- **3 Adaptações ao nosso caso**:
  1. Remover totalmente o componente `<Sparkles>` ao lado do `#01`, deixando o número do capítulo puro em tipografia `Instrument Sans` em amarelo `#ffc900`.
  2. Aumentar a tipografia do cabeçalho do card: `h3` de `clamp(1.4rem, 1.9vw, 2.1rem)` para `clamp(1.55rem, 2.05vw, 2.3rem)`.
  3. Garantir fallback instantâneo para acessibilidade: se `window.matchMedia('(prefers-reduced-motion: reduce)').matches` for verdadeiro, aplicar `opacity: 1` e `transform: none` de imediato.

---

## 3. Stripe Climate — Annual Milestones Progress
- **URL**: [https://stripe.com/climate](https://stripe.com/climate)
- **Descrição Visual**: Linha do tempo corporativa de altíssimo nível. A linha vertical que conecta os marcos (a espinha dorsal da timeline) ganha cor conforme o scroll avança, e cada card ganha um micro-impulso de escala (`scale: 0.98 -> 1.0`) que ancora a atenção do leitor.
- **Mecânica da Animação**:
  - Micro-escala sutil combinada com fade-in: confere sensação tátil de que o card está se "assentando" na interface.
  - O marcador numérico permanece fixo ou ancora no topo do card com contraste elevado.
- **3 Adaptações ao nosso caso**:
  1. A espinha dorsal da timeline (`timeline__track`) mantém cor neutra (`rgba(245, 243, 239, 0.12)`), com acento em `#ffc900` apenas no marcador do item ativo.
  2. Ampliar a fonte das descrições (`0.78rem -> 0.84rem`) e dos tópicos de destaque (`li`: `0.68rem -> 0.74rem`) para eliminar qualquer sensação de texto diminuto.
  3. Sincronizar o fim da timeline com o clipe 5/6 do video backdrop (onde o busto retorna ao centro em órbita lenta de encerramento).

---

## Resumo e Top-3 Recomendações para a Timeline de Experiência:
1. **Top 1 (Gatilho Individual)**: Abandonar o `useReveal` em batch para a seção 6 e registrar cada card com `ScrollTrigger` dedicado (`start: 'top 85%'`, `once: true`).
2. **Top 2 (Higienização Visual & Escala)**: Remover o `<Sparkles>` do `#01` e expandir a área do card em +8% a 12% com tipografia maior e mais legível.
3. **Top 3 (Física da Microinteração)**: Animação refinada com `y: 28px -> 0`, `opacity: 0 -> 1` e `scale: 0.98 -> 1.0` com duração de 0.65s e easing `power3.out`, mantendo respeito irrestrito a `prefers-reduced-motion`.
