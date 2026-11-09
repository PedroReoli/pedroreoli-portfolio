# UI-Scout: Referências de Video Wallpaper & Video Backdrop por Seção

> **Projeto**: Redesign do Portfólio Pedro Reoli  
> **Conceito**: Video Backdrop Contínuo (`VideoStage`) com cadeia de clipes do busto de mármore e círculo amarelo `#ffc900` sobre obsidiana, congelando em cada seção (`holdAt`), servindo de wallpaper vivo para o site todo.

---

## 1. Apple — Vision Pro & Mac Pro Architecture Showcases
- **URL**: [https://www.apple.com/apple-vision-pro/](https://www.apple.com/apple-vision-pro/)
- **Descrição Visual**: Padrão de excelência da indústria em video backdrop full-bleed. O vídeo roda em momentos-chave, atinge um frame congelado que ancora a seção, e textos/interfaces refinadas rolam com legibilidade cristalina por cima.
- **Padrão Técnico de CSS**:
  ```css
  .video-stage {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100svh;
    z-index: 0;
    pointer-events: none;
    overflow: hidden;
  }
  .video-stage video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
  }
  ```
- **Como Evitam Texto Ilegível**:
  - **Gradientes Radiais e Scrims Direcionais**: Máscara escura sutil onde o texto se posiciona, mantendo a área do objeto visual mais vívida.
  - **Posicionamento Calculado**: Textos nunca ficam diretamente em cima de zonas reflexivas claras sem um scrim atenuador.
- **3 Adaptações ao nosso caso**:
  1. Componente único fixo `VideoStage` montado na raiz do layout, independente do roteamento interno das seções.
  2. Implementar a cadeia de clipes com freeze frame (`holdAt`) definido no `content/sceneClips.json`, sem corte visível de frame.
  3. Desativar completamente o elemento `<video>` em telas `<= 768px`, conexões lentas (`saveData`) ou `prefers-reduced-motion`, exibindo exclusivamente o `poster.webp`.

---

## 2. Stripe Press — Ambient Monograph Backdrops
- **URL**: [https://press.stripe.com/](https://press.stripe.com/)
- **Descrição Visual**: Publicação editorial de luxo onde vídeos ambientais lentos rodam ao fundo sob uma textura discreta de filme, conferindo atmosfera erudita e sofisticada à leitura.
- **Padrão Técnico de CSS**:
  ```css
  .video-stage__scrim {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 50% 50%, rgba(8, 9, 11, 0.45) 0%, rgba(8, 9, 11, 0.88) 100%);
    backdrop-filter: blur(0px);
    transition: background 0.6s ease;
  }
  ```
- **Como Evitam Texto Ilegível**:
  - O vídeo tem opacidade calibrada (`0.40 - 0.65`) e fica assentado sobre uma base sólida `#08090b`.
  - Tratamento de grão (noise texture) em SVG que quebra gradientes agressivos e confere tom de filme analógico ao mármore.
- **3 Adaptações ao nosso caso**:
  1. Utilizar scrim adaptativo que intensifica o escurecimento conforme o usuário navega da Hero para seções densas de texto (como Sobre e Stack).
  2. Aplicar `backdrop-filter: blur(12px) saturate(140%)` nos painéis de conteúdo quando passarem pelas áreas mais claras da estátua de mármore.
  3. Garantir contraste mínimo WCAG AA (4.5:1 para corpo de texto, 3:1 para títulos display).

---

## 3. Resn — Scroll-Linked Narrative Experiences
- **URL**: [https://resn.co.nz/](https://resn.co.nz/)
- **Descrição Visual**: Estúdio premiado que orquestra transições suaves entre vídeos e modelos 3D pré-renderizados conforme o usuário desce a página, integrando a física do scroll com timelines pausadas.
- **Padrão Técnico de Scroll-Linked Video**:
  - Evitar scrub frame-a-frame por pixel (que sobrecarrega CPU/GPU com decodificação contínua de H.264).
  - Em vez disso, usar gatilhos de seção via GSAP ScrollTrigger: ao entrar na seção, dispara `video.play()` até atingir o `holdAt`, congelando no frame exato.
- **Como Evitam Texto Ilegível**:
  - Separação rígida de camadas em z-index:
    - Camada 0: VideoStage (`z-index: 0`)
    - Camada 1: Scrim / Vinheta / Grain (`z-index: 1`)
    - Camada 2: Conteúdo HTML / UI / Links interativos (`z-index: 2`)
- **3 Adaptações ao nosso caso**:
  1. A sincronização do vídeo com o HTML deve usar a lógica de marcadores do `sceneClips.json` (`holdAt` e `markers`), evitando timers arbitrários no React.
  2. No caso da Seção 2 (Sobre), o beat onde Pedro real aparece (`eu-profissional.png`) entra como uma camada HTML com crossfade sincronizado com o evento `pedro-photo`.
  3. Implementar listener de `onError` no elemento de vídeo para fazer fallback imediato e silencioso para o poster sem quebrar o layout.

---

## 4. CodePen: Seamless Full-Bleed Video Scrim (Chris Coyier / CSS-Tricks)
- **URL**: [https://codepen.io/geoffgraham/pen/YzWPbzM](https://codepen.io/geoffgraham/pen/YzWPbzM)
- **Descrição Visual**: Arquitetura padrão e limpa em CSS Grid para vídeos de fundo de página inteira com camadas sobrepostas perfeitas.
- **Padrão Técnico de CSS**:
  ```css
  .viewport-wrapper {
    display: grid;
    grid-template-areas: "stage";
    min-height: 100svh;
  }
  .video-stage, .content-layer {
    grid-area: stage;
  }
  ```
- **Como Evitam Texto Ilegível**:
  - Uso de camada intermediária `::after` com gradiente linear vertical que escurece 60% do terço inferior da tela, garantindo que botões e links de navegação permaneçam 100% legíveis.
- **3 Adaptações ao nosso caso**:
  1. Adicionar `aria-hidden="true"` e `tabindex="-1"` em todo o container do vídeo para manter a árvore de acessibilidade totalmente limpa.
  2. Preload inteligente: apenas o primeiro clipe/poster (`01-hero-poster.webp`) recebe `loading="eager"` / `preload="auto"`; os clipes seguintes são cacheados sob demanda.
  3. Utilizar unidades modernas `100svh` para evitar saltos de altura causados pelo aparecimento e sumiço da barra de navegação no Safari e Chrome mobile.

---

## 5. Awwwards Site of the Day: The Balvenie — Stories of Craft
- **URL**: [https://www.awwwards.com/sites/the-balvenie-stories](https://www.awwwards.com/sites/the-balvenie-stories)
- **Descrição Visual**: Narrativa de artesanato de luxo com filmagens em close de materiais nobres (pedra, madeira polida, metais) atrás de tipografia display em serif clássica.
- **Padrão Técnico de CSS**:
  - Iluminação pontual no centro da imagem com vinheta radial periférica profunda (`#08090b` nos cantos).
  - O conteúdo de texto ocupa as áreas laterais onde a vinheta atinge quase 90% de opacidade.
- **Como Evitam Texto Ilegível**:
  - A composição do vídeo já é pensada para deixar "espaço de texto" (negative copy space).
  - Como a estátua de mármore do Pedro está centralizada, as margens laterais permanecem no preto profundo, permitindo que os títulos e parágrafos mantenham contraste máximo natural.
- **3 Adaptações ao nosso caso**:
  1. Alinhar a direção de arte das gerações no Google Flow: busto no terço inferior/centro, permitindo que a metade superior e laterais mantenham obsidiana limpa.
  2. Aplicar vinheta radial com centro no busto (`circle at 50% 60%`), preservando o brilho do mármore e a cor `#ffc900` sem clarear as bordas de leitura.
  3. O último frame de cada clipe deve ser exportado e otimizado em WebP idêntico ao frame de congelamento para servir de poster instantâneo.

---

## Resumo e Top-3 Recomendações para Video Wallpaper:
1. **Top 1 (Arquitetura de Camadas)**: Padrão Apple / CSS-Tricks (Container fixo com `object-fit: cover` + camada `video-stage__scrim` intermediária + `z-index` estrito).
2. **Top 2 (Gatilhos e Freeze Frame)**: Padrão Resn (`sceneClips.json` com `holdAt` e `markers` disparados por GSAP ScrollTrigger, sem scrubbing por pixel).
3. **Top 3 (Blindagem A11y & Performance)**: Desligamento do vídeo em mobile, `prefers-reduced-motion` e conexões limitadas, rodando 100% em posters WebP de alta fidelidade.
