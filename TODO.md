# TODO — Pedro Reoli Portfolio

Validação visual atualizada em 22/10/2026. Os checks históricos abaixo foram registrados em revisões anteriores.

## Entregue e verificado por checks estáticos

- [x] Home editorial dividida em seções modulares.
- [x] Seções principais com contrato compartilhado de `100dvh` e fallback `100svh`.
- [x] Hero tipográfica; retrato na seção Sobre, sem vídeo de fundo.
- [x] Projetos selecionados sem repetição do case FalaAtípica.
- [x] Imagens abaixo da dobra com lazy loading e decodificação assíncrona.
- [x] Animações com suporte a `prefers-reduced-motion`.
- [x] Navegação que desaparece ao descer e reaparece ao subir.
- [x] Conteúdo principal disponível em português e inglês.
- [x] Build TypeScript/Vite e lint sem erros na última revisão.
- [x] Dependências sem uso, componentes de cortina órfãos e regras CSS do layout anterior removidos. As animações atuais usam `SlideSection`, `Reveal` e os componentes de seção.
- [x] Auditoria das dependências de produção sem vulnerabilidades conhecidas.
- [x] Imagens de projeto com variantes WebP responsivas e fallback PNG.
- [x] Tipografia variável empacotada localmente, sem dependência do Google Fonts.
- [x] Breakpoints alinhados entre Tailwind e CSS, com composição própria para tablets.
- [x] Trocas de rota reposicionam a nova página no início.
- [x] Lint de acessibilidade JSX aplicado às imagens, links e controles.
- [x] Notas distingue links de repositório e perfil; stack com símbolo próprio do Claude, fonte registrada e Design System.
- [x] Vite 8, TypeScript 5.9 e TypeScript ESLint 8 validados no build.

## Pendente de conteúdo

- [ ] Substituir links gerais por artigos reais quando os textos forem publicados.

## Validado em Chrome headless em 22/10/2026

- [x] Limites das sete seções em 14 viewports, de 320×480 a 2560×1440, em PT e EN: 196 medições sem extravasamento detectado.
- [x] Todos os slides de projetos e experiências em sete viewports, incluindo 667×375 e 844×390: 112 verificações em PT e EN sem cortes internos detectados após os ajustes.
- [x] Projetos e Notas em seis viewports e dois idiomas: 36 verificações de largura, imagens e preservação do filtro/query string.
- [x] Sequência Pedro → Reoli → cargo e transição escura/clara no scroll. Entradas concluídas nas demais seções, inclusive com rolagem rápida.
- [x] Reduced motion, navbar por direção de scroll, recuperação por foco, Escape e retorno do foco no menu mobile.
- [x] Capturas de desktop, mobile e paisagem inspecionadas. Artefatos locais em `output/playwright/` (não versionados).
- [x] Menu mobile fecha ao virar desktop, sair pelo teclado ou clicar fora, sem bloquear a rolagem; confirmação de idioma compacta e troca imediata.
- [x] Foco no conteúdo após navegação, inclusive em rota lazy; regressões de navegação versionadas em `tests/browser/navigation.cli.js`.
- [x] Slides de projetos com apresentação reutilizável e conteúdo centralizado; 56 verificações de scroll, encaixe, teclado, destinos e transições em `tests/browser/projects.cli.js`.
- [x] Falhas em módulos lazy e renderização isoladas por página/seção, com recuperação manual bilíngue; 28 verificações em `tests/browser/recovery.cli.js`, incluindo falhas consecutivas e preservação de parâmetros.
- [x] Idioma inicial respeita a escolha salva e a ordem de preferência do navegador; sete casos headless, incluindo navegação com armazenamento bloqueado, em `tests/browser/preferences.cli.js`.
- [x] Imagens responsivas recuperam o PNG original quando o WebP falha, sem repetição automática; 15 verificações em `tests/browser/images.cli.js`.
- [x] Botão de topo devolve o foco ao conteúdo, e contatos permanecem disponíveis sem JavaScript; 34 verificações em `tests/browser/accessibility.cli.js`, também aprovadas no build de produção. Capturas da alternativa estática em mobile, paisagem e desktop inspecionadas.
- [x] Zoom nativo de 200% no Chrome headless: 142 verificações em PT/EN, quatro áreas úteis, sete seções, todos os slides, menu e arquivos de Projetos/Notas. Roteiro versionado em `tests/browser/zoom.cli.js`, aprovado também no build de produção. Hero, stack e propósito inspecionados visualmente com zoom.
- [x] Seleção e foco distinguíveis em cores forçadas, sem depender dos fundos removidos pelo alto contraste. 93 verificações em `tests/browser/contrast.cli.js`, em dois temas e duas viewports, incluindo regressão do modo normal e build de produção. Capturas de projetos e trajetória inspecionadas.
- [x] Limpeza de estilos antigos sem alteração visual: 20 pares de capturas em 390×844 e 1440×900 idênticos por SHA-256, cobrindo sete seções e três arquivos de conteúdo. Regressões de projetos (56) e navegação (15) aprovadas. CSS de produção reduzido de 52.620 para 51.471 bytes nesta revisão; isso não é medição de Core Web Vitals.
- [x] Hero com espaçamento de Reoli proporcional às letras e cargo ampliado: 33 verificações em `tests/browser/hero.cli.js`, aprovadas em desenvolvimento e no build de produção. Encaixe em 14 viewports e dois idiomas, reduced motion, sequência Pedro → Reoli → cargo e transição de fundo. Capturas de 320×480, 667×375 e 1440×900 inspecionadas; sem cortes ou colisões detectados nesses cenários.
- [x] Preferência de movimento reativa e compartilhada, sem reload: 49 verificações em `tests/browser/motion-preference.cli.js`, aprovadas em desenvolvimento e produção. Incluem PT/EN, arquivos de projetos/notas, mudança durante scroll da hero, reativação de movimento e navbar, preservação de URL/posição e entrada do título das referências. Regressões de hero (33), projetos (56) e navegação (15) aprovadas também em produção. Capturas da seção de referências em 390×480 e 1440×480 inspecionadas. A preferência foi emulada somente no navegador de teste, sem alterar o sistema operacional.

## Revisão de conteúdo e transições em 23/10/2026

- [x] Descrições da trajetória reescritas a partir dos destaques já cadastrados, sem acrescentar resultados; competências da mentoria traduzidas em PT/EN.
- [x] Introduções de Projetos e Notas mais curtas, destinos do rodapé explícitos e mensagem de carregamento correspondente às seções lazy.
- [x] Troca direta entre períodos da mesma empresa reproduzida e corrigida: cada período tem uma identificação própria para a animação.
- [x] Build de produção: 317 verificações da home em 22 viewports e 72 da trajetória em sete viewports, nos dois idiomas. Capturas de conteúdo em 320×480 e 1440×900 inspecionadas. Lint, 14 testes de renderização, TypeScript e build aprovados.
- [x] Projetos e Notas: 125 verificações do build de produção em 16 viewports, PT/EN, incluindo entradas e filtros por teclado. Capturas revisadas em mobile e desktop após o ajuste dos textos.
- [x] Tela 404 com hierarquia editorial, ações visíveis em mobile/paisagem e entrada suave reutilizando `SlideSection`/`Reveal`. 44 verificações headless aprovadas em desenvolvimento e produção: oito viewports, PT/EN, teclado, movimento reduzido e texto ampliado. Capturas antes/depois inspecionadas em 320×480, 667×375 e 1440×900. Lint, 16 testes de renderização, TypeScript e build aprovados.
- [x] Galeria corporativa ampliada dentro da página com `dialog` nativo, legenda, quatro imagens, navegação por teclado, retorno ao foco/scroll e saída para o original. 174 verificações headless aprovadas no build de produção em seis viewports e PT/EN, incluindo carregamento lento, falha de imagem e fundo inerte. Capturas em 320×480, 667×375 e 1440×900 inspecionadas. Nenhuma dependência adicionada.

## Acabamento visual em 25/10/2026

- [x] Trabalhos selecionados com captura completa da interface, moldura clara, títulos maiores e tecnologias sem caixas. Links editoriais substituem os botões com fundo e sombra.
- [x] Composição própria para celulares altos, mantendo a compactação nas telas baixas. Descrição da Autocom3 explicita a atuação em frontend e integrações a partir da experiência já cadastrada.
- [x] Build de produção: 56 verificações dos três slides em sete viewports e PT/EN, além de 317 verificações da home em 22 viewports. Lint, 16 testes de renderização, TypeScript e build aprovados nesta revisão.

## Coreografia de motion em 25/10/2026

- [x] Páginas com saída curta e entrada, preservando foco, histórico e uma única página ativa. Conteúdo em saída fica inerte.
- [x] Seções reapresentam entradas ao retornar pelo scroll. Projetos, experiências, itens da stack e índice da trajetória entram em sequência; trocas de capítulos acompanham a direção da navegação.
- [x] Controles com resposta de pressão, categorias com transição, galeria com entrada/saída e imagens com aparecimento após carregar. Movimento reduzido continua reativo e compartilhado.
- [x] `film-motion.cli.js`: 40 verificações por amostragem de quadros em mobile/desktop, incluindo retorno às seções e ordem título → descrição. Regressões de galeria (174), navegação (15), projetos (56), trajetória (72), preferência de movimento (49), hero (33), arquivos (125) e home (317) aprovadas nesta revisão. Total de 881 verificações headless; lint, 16 testes de renderização, TypeScript e build aprovados.
- [x] Gravação de navegação em 390×844 e capturas finais salvas em `output/playwright/` e inspecionadas. Artefatos locais não versionados.

## Validação ainda pendente

- [ ] Texto-base ampliado de 16px para 32px em 320×480 causa cortes nas seções de altura fixa. Aguardando decisão sobre permitir crescimento vertical nesse cenário, preservando o padrão de uma tela na escala normal. Isso é distinto do zoom nativo de página, já validado.
- [ ] Navegação completa com leitores de tela. Sem JavaScript, há apenas a alternativa de apresentação e contato; projetos e demais interações exigem JavaScript.
- [ ] Safari/iOS e Firefox em dispositivos reais; o ensaio headless não certifica todos os navegadores ou dimensões possíveis.
- [ ] Medição de Core Web Vitals e fluidez em hardware móvel real. CPU simulada a 4× não equivale a benchmark de dispositivo.

## Otimização futura

- [ ] Avaliar AVIF depois da validação visual dos WebP já gerados.
- [ ] Criar imagem Open Graph específica para compartilhamento.
- [ ] Atualizar o banco do Browserslist em uma manutenção separada.
- [ ] Planejar a migração visual do Tailwind 3 para 4 para eliminar os alertas restantes da toolchain sem quebrar o layout.
