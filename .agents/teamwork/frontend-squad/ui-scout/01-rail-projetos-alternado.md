# UI-Scout: Referências de Layout de Projetos em Rail Alternado (Esquerda / Direita)

> **Projeto**: Redesign do Portfólio Pedro Reoli  
> **Direção Estética**: Editorial Premium, fundo obsidiana (`#08090b`), mármore branco, amarelo de destaque (`#ffc900`), serif de display (`Instrument Serif`) + sans estruturada (`Instrument Sans`).  
> **Escopo da Seção**: Seção 3 (Projetos Selecionados) — substituição completa do grid de 2 colunas por um **rail alternado assimétrico** que dialoga diretamente com o video backdrop da estátua.

---

## 1. Basement Studio — Work Index
- **URL**: [https://basement.studio/work](https://basement.studio/work)
- **Descrição Visual**: Layout editorial com proporção assimétrica marcante. Cada projeto ocupa uma linha generosa onde a mídia (mockup com acabamento refinado) alterna entre esquerda e direita, enquanto a coluna tipográfica contrabalanceia o peso visual.
- **O que copiar**:
  - **Proporção da Grid**: Split 60/40 (60% área de mídia visual, 40% conteúdo editorial).
  - **Tipografia Escalar**: Títulos grandes com kerning negativo e pequenos kickers em caixa alta com tracking aberto (`letter-spacing: 0.14em`).
  - **Tratamento de Mídia**: Bordas sutis (`1px solid rgba(245, 243, 239, 0.12)`), cantos limpos (`--radius-md: 20px`) e barra de janela customizada.
- **O que NÃO copiar**:
  - Efeitos de distorção WebGL com shaders ruidosos no hover (geram overhead de GPU desnecessário e brigam com o vídeo de fundo).
  - Cards de bordas grossas ou estética "cyberpunk".
- **3 Adaptações ao nosso caso**:
  1. Definir altura de linha editorial com `min-height: clamp(420px, 62svh, 640px)` para garantir respiro vertical.
  2. Alternar `flex-direction: row` e `flex-direction: row-reverse` nas linhas (Autocom3 na direita, Achilles na esquerda, Organon na direita).
  3. Alinhar o olhar/gesto da estátua no vídeo para apontar exatamente para o lado do projeto em destaque.

---

## 2. Locomotive — Selected Works Portfolio
- **URL**: [https://locomotive.ca/en/work](https://locomotive.ca/en/work)
- **Descrição Visual**: Linhas de projetos editoriais com contraste extremo entre número de série do case (`01`, `02`), título em serif refinada e tags de tecnologia minimalistas.
- **O que copiar**:
  - **Hierarquia Tipográfica**: O número do projeto e a categoria funcionam como âncora antes da leitura do título.
  - **Espaçamento Generoso**: `gap` de 80px a 120px entre projetos sucessivos, evitando poluição visual.
  - **Aspect Ratio Travado**: Imagens mantêm proporção `16:10` consistente independente do conteúdo.
- **O que NÃO copiar**:
  - Virtual scrolling / scroll hijack (`locomotive-scroll` intrusivo) que prejudica usabilidade e acessibilidade móvel.
  - Textos cinzas de baixo contraste que quebram WCAG AA.
- **3 Adaptações ao nosso caso**:
  1. Uso de `Instrument Serif` no título do projeto (`clamp(2.2rem, 3.2vw, 3.8rem)`) para conferir tom de monografia artística.
  2. Preservar o chrome bar customizado do Pedro (com os 3 controles de janela e a luz amarela `#ffc900`).
  3. Microinteração no botão "Ver Projeto": arrow SVG com translação suave de `4px` no hover.

---

## 3. Studio Freight — Case Studies Rail
- **URL**: [https://studiofreight.com/work](https://studiofreight.com/work)
- **Descrição Visual**: Linhas brutas e elegantes com separadores horizontais discretos, unindo a precisão suíça a um design contemporâneo de estúdio.
- **O que copiar**:
  - **Separadores Editoriais**: Linhas horizontais (`border-top: 1px solid var(--line-dark)`) demarcando cada item do rail.
  - **Meta-informações em Coluna Única**: Cliente, Ano, Escopo e Stack alinhados em formato de lista de dados compacta.
  - **Equilíbrio em Telas Grandes**: O conteúdo não se dispersa além de `1480px` (`.shell`).
- **O que NÃO copiar**:
  - Letreiros letárgicos (marquees rotativos) e tipografia rotacionada em 90 graus.
  - Layouts assimétricos caóticos que desalinham a leitura.
- **3 Adaptações ao nosso caso**:
  1. Incorporar um `.section-kicker` editorial no topo de cada linha de projeto contendo número, tag e ano.
  2. Responsividade: em telas `<= 1024px`, colapso suave para pilha vertical com mídia no topo e texto embaixo.
  3. Fundo da coluna de texto com leve gradiente de scrim para proteger a leitura caso a estátua de mármore passe por baixo.

---

## 4. Minimalissimo — Visual Monographs
- **URL**: [https://minimalissimo.com/](https://minimalissimo.com/)
- **Descrição Visual**: Referência máxima em minimalismo editorial para publicações e design físico. Foco absoluto no enquadramento, proporções áureas e espaços vazios calculados.
- **O que copiar**:
  - **Tratamento de Imagem**: Superfície limpa, sem sombras difusas excessivas; apenas um contorno milimétrico sutil.
  - **Pacing Visual**: O leitor respira entre um projeto e outro sem pressa.
  - **Paleta de Cores**: Preto obsidiana profundo, branco papel e um único ponto focal de cor.
- **O que NÃO copiar**:
  - Falta de botões ou links evidentes (minimalismo radical que compromete o descobrimento de links).
  - Cards fechados em caixas ou molduras grossas.
- **3 Adaptações ao nosso caso**:
  1. O ponto focal cromático é exclusivamente o amarelo `#ffc900` nos botões, links de ação e marcadores de estado.
  2. Tratamento da imagem do projeto como um quadro de galeria de arte com proporção bem definida.
  3. Tags de tecnologia exibidas em pequenos badges monocromáticos translúcidos com borda de 1px.

---

## 5. CodePen: Alternating Editorial Project Rail (Ryan Mulligan)
- **URL**: [https://codepen.io/hexagoncircle/pen/eYpNGRe](https://codepen.io/hexagoncircle/pen/eYpNGRe)
- **Descrição Visual**: Estrutura moderna em CSS Grid de 12 colunas para rails alternados, com código semanticamente limpo e zero JavaScript para posicionamento.
- **O que copiar**:
  - **Grid de 12 Colunas**: Linhas ímpares ocupam colunas 1–7 (mídia) e 8–12 (texto); linhas pares invertem para 1–5 (texto) e 6–12 (mídia).
  - **Fluidez do CSS**: Uso de `clamp()` em gaps e paddings, mantendo proporção ideal de 360px a 2560px.
  - **Sem Overlap Forçado**: Elimina bugs comuns de sobreposição de texto em resoluções intermediárias (como tablets).
- **O que NÃO copiar**:
  - Alturas fixas em pixels que cortam textos longos quando o conteúdo é atualizado.
- **3 Adaptações ao nosso caso**:
  1. Implementação no `.project-rail` com grid de 12 colunas ou flexbox `gap: clamp(32px, 5vw, 64px)`.
  2. Mapeamento direto de dados em `content/projectsContent.json` sem necessidade de classes utilitárias redundantes.
  3. Fallback gracioso para visualização em coluna única abaixo de 960px.

---

## 6. v0.dev: Modern Editorial Case Study Showcase
- **URL**: [https://v0.dev/t/editorial-work-showcase](https://v0.dev/t/editorial-work-showcase)
- **Descrição Visual**: Componente editorial moderno com tipografia serifada de alto impacto, métricas em destaque e preview de mockup de software em container minimalista.
- **O que copiar**:
  - **Bloco de Impacto/Métricas**: Destaque numérico conciso (ex.: "Latência < 20ms", "Zero Layout Shift").
  - **CTA com Sublinhado Elegante**: Link com linha animada e transição suave de cor.
  - **Layout de Camadas**: A mídia parece flutuar sobre o fundo com leve scrim de profundidade.
- **O que NÃO copiar**:
  - Estética bento-grid de SaaS (cards retangulares cheios de gradientes roxos e ícones de 3D genéricos).
- **3 Adaptações ao nosso caso**:
  1. Manter a estrutura de 3 projetos principais: Autocom3 (Direita), Achilles (Esquerda), Organon (Direita).
  2. Adicionar 2 a 3 métricas de impacto no rodapé da coluna de cada projeto.
  3. Preservar o botão principal "Explorar Case" com preenchimento amarelo `#ffc900` e texto em preto obsidiana.

---

## 7. B-Reel — Production Projects Sequence
- **URL**: [https://www.b-reel.com/](https://www.b-reel.com/)
- **Descrição Visual**: Apresentação de cases com ritmo cinematográfico, onde elementos de mídia e tipografia criam um percurso visual dinâmico pela página.
- **O que copiar**:
  - **Enquadramento Cinematográfico**: Mídia apresentada em containers largos com acabamento de alta resolução.
  - **Transição de Estados**: Ao scrollar, a imagem ganha nitidez e escala sutil (1.02x) sem descolar do fluxo.
  - **Uso de Espaço Negativo**: Áreas vazias intencionais que direcionam o olhar para a peça gráfica.
- **O que NÃO copiar**:
  - Autoplay forçado de múltiplos vídeos pesados simultâneos com áudio ativo.
  - Modais pesados que bloqueiam o fluxo da leitura.
- **3 Adaptações ao nosso caso**:
  1. Apenas o video backdrop central roda ao fundo; as mídias dos projetos usam imagens estáticas WebP otimizadas com lazy loading.
  2. Hover sobre a mídia ativa uma sutil elevação da janela (`transform: translateY(-4px)`).
  3. Manter o layout totalmente livre de grids de cartões em 2 colunas.

---

## Resumo e Top-3 Recomendações para a Seção de Projetos:
1. **Top 1 (Estrutura de Grid)**: Padrão Basement Studio / CodePen (Split 60/40 em 12 colunas, alternando ordem visual a cada projeto).
2. **Top 2 (Tipografia & Hierarquia)**: Padrão Locomotive / Minimalissimo (Títulos em `Instrument Serif` em escala display, com kickers e números de série em `Instrument Sans` uppercase).
3. **Top 3 (Integração com o Vídeo)**: Pacing amplo com `clamp(420px, 62svh, 640px)` por projeto, garantindo que o gesto do busto no video backdrop aponte sincronizadamente para o lado do item ativo.
