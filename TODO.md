# TODO — Pedro Reoli Portfolio

Estado reconciliado com o código em 20/10/2026.

## Entregue e verificado por checks estáticos

- [x] Home editorial dividida em seções modulares.
- [x] Seções principais com contrato compartilhado de `100dvh` e fallback `100svh`.
- [x] Hero preparada para vídeos desktop e mobile, protegida por feature flag.
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
- [x] Vite 8, TypeScript 5.9 e TypeScript ESLint 8 validados no build.

## Pendente de conteúdo

- [ ] Substituir links gerais por artigos reais quando os textos forem publicados.

## Pendente de validação visual

- [ ] Revisar a home em 320, 390, 768, 1024, 1440 e 1920 px.
- [ ] Revisar viewports baixas e modo paisagem em celular.
- [ ] Validar navegação por teclado, zoom de 200% e leitores de tela.
- [ ] Conferir enquadramento dos dois vídeos finais na hero.

Esses itens permanecem pendentes porque validação estática não comprova composição visual em navegador.

## Otimização futura

- [ ] Avaliar AVIF depois da validação visual dos WebP já gerados.
- [ ] Criar imagem Open Graph específica para compartilhamento.
- [ ] Atualizar o banco do Browserslist em uma manutenção separada.
- [ ] Planejar a migração visual do Tailwind 3 para 4 para eliminar os alertas restantes da toolchain sem quebrar o layout.
