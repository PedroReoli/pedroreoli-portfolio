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
- [x] Código legado e dependências sem uso removidos.
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

## Validação ainda pendente

- [ ] Zoom real de 200%, navegação completa com leitores de tela e operação sem JavaScript.
- [ ] Safari/iOS e Firefox em dispositivos reais; o ensaio headless não certifica todos os navegadores ou dimensões possíveis.
- [ ] Medição de Core Web Vitals e fluidez em hardware móvel real. CPU simulada a 4× não equivale a benchmark de dispositivo.

## Otimização futura

- [ ] Avaliar AVIF depois da validação visual dos WebP já gerados.
- [ ] Criar imagem Open Graph específica para compartilhamento.
- [ ] Atualizar o banco do Browserslist em uma manutenção separada.
- [ ] Planejar a migração visual do Tailwind 3 para 4 para eliminar os alertas restantes da toolchain sem quebrar o layout.
