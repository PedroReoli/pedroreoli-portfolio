# Pedro Reoli — portfólio

Portfólio bilíngue de Pedro Reoli, construído como uma experiência editorial de tela cheia: tipografia ampla, narrativa curta, poucos elementos por seção e movimento com propósito.

## Stack

- React 18 e TypeScript
- Vite
- React Router
- Framer Motion
- Tailwind CSS e CSS dividido por responsabilidade
- Lucide e React Icons

## Estrutura

```text
src/
├── components/   # átomos, organismos e templates reutilizáveis
├── content/      # conteúdo estruturado da home e dos projetos
├── hooks/        # preferências e comportamentos compartilhados
├── i18n/         # idioma e persistência da preferência
├── pages/        # composição das rotas
└── styles/       # fundação, seções e regras responsivas
```

## Desenvolvimento

```bash
npm ci
npm run dev
```

Validações disponíveis:

```bash
npm run typecheck
npm run lint
npm run test:render
npm run build
npm run check
```

`test:render` confere estrutura, conteúdo bilíngue e rótulos acessíveis. Não substitui validação visual e de interações em navegador.

As animações usam `hooks/useReducedMotion.ts`, que acompanha mudanças de `prefers-reduced-motion` com a página aberta. Novos componentes com movimento devem usar esse hook para controlar duração, deslocamento e scroll programático. A política fica na aplicação porque o modo `user` do Framer Motion 11 instalado captura a preferência na montagem. Não remonte a página ao mudar essa preferência: foco, URL e posição de leitura devem permanecer intactos.

Auditoria de navegação em navegador real, sem abrir janelas (CLI 0.1.22):

```bash
npx --yes --package @playwright/cli@0.1.22 playwright-cli -s=portfolio-qa open http://localhost:5173
npx --yes --package @playwright/cli@0.1.22 playwright-cli -s=portfolio-qa run-code --filename tests/browser/navigation.cli.js
npx --yes --package @playwright/cli@0.1.22 playwright-cli -s=portfolio-qa run-code --filename tests/browser/hero.cli.js
npx --yes --package @playwright/cli@0.1.22 playwright-cli -s=portfolio-qa run-code --filename tests/browser/sections.cli.js
npx --yes --package @playwright/cli@0.1.22 playwright-cli -s=portfolio-qa run-code --filename tests/browser/archives.cli.js
npx --yes --package @playwright/cli@0.1.22 playwright-cli -s=portfolio-qa run-code --filename tests/browser/experience.cli.js
npx --yes --package @playwright/cli@0.1.22 playwright-cli -s=portfolio-qa run-code --filename tests/browser/not-found.cli.js
npx --yes --package @playwright/cli@0.1.22 playwright-cli -s=portfolio-qa run-code --filename tests/browser/gallery.cli.js
npx --yes --package @playwright/cli@0.1.22 playwright-cli -s=portfolio-qa run-code --filename tests/browser/viewport-resize.cli.js
npx --yes --package @playwright/cli@0.1.22 playwright-cli -s=portfolio-qa run-code --filename tests/browser/film-motion.cli.js
npx --yes --package @playwright/cli@0.1.22 playwright-cli -s=portfolio-qa run-code --filename tests/browser/scene-navigation.cli.js
npx --yes --package @playwright/cli@0.1.22 playwright-cli -s=portfolio-qa run-code --filename tests/browser/scene-touch.cli.js
npx --yes --package @playwright/cli@0.1.22 playwright-cli -s=portfolio-qa run-code --filename tests/browser/motion-preference.cli.js
npx --yes --package @playwright/cli@0.1.22 playwright-cli -s=portfolio-qa run-code --filename tests/browser/projects.cli.js
npx --yes --package @playwright/cli@0.1.22 playwright-cli -s=portfolio-qa run-code --filename tests/browser/recovery.cli.js
npx --yes --package @playwright/cli@0.1.22 playwright-cli -s=portfolio-qa run-code --filename tests/browser/preferences.cli.js
npx --yes --package @playwright/cli@0.1.22 playwright-cli -s=portfolio-qa run-code --filename tests/browser/images.cli.js
npx --yes --package @playwright/cli@0.1.22 playwright-cli -s=portfolio-qa run-code --filename tests/browser/accessibility.cli.js
npx --yes --package @playwright/cli@0.1.22 playwright-cli -s=portfolio-qa run-code --filename tests/browser/contrast.cli.js
npx --yes --package @playwright/cli@0.1.22 playwright-cli -s=portfolio-qa close
```

Use a URL exibida pelo seu servidor Vite. A sessão é headless por padrão; não use `--headed`. Os roteiros validam menu, teclado, foco entre rotas, idioma, viewport baixa e os três slides de projetos em sete viewports e dois idiomas. Conferem transições com e sem movimento reduzido, sem clicar em links externos. A preferência de idioma muda apenas na sessão isolada de teste.

`recovery.cli.js` intercepta módulos somente no navegador de teste para simular falhas de rede e renderização. Erros intencionais no console são esperados nesse roteiro. Verifica isolamento da falha, tentativa manual, preservação da URL e saída pelo menu, sem alterar arquivos ou o servidor. Essa proteção exige que o JavaScript inicial tenha carregado; não equivale a suporte offline.

`preferences.cli.js` usa contextos isolados para conferir a ordem dos idiomas do navegador, a preferência salva e o funcionamento com armazenamento bloqueado. `npm run check` reúne lint, testes de conteúdo/preferências, TypeScript e build; os ensaios headless continuam sendo executados separadamente.

`images.cli.js` verifica WebP em uso normal, recuperação com o PNG original e falha de ambos os formatos. A alternativa é tentada uma vez; se também falhar, a descrição alternativa e as dimensões são preservadas, sem novas tentativas automáticas. As falhas são simuladas apenas na sessão headless.

`accessibility.cli.js` verifica o retorno do foco ao conteúdo pelo botão de topo, com movimento normal e reduzido, e a alternativa estática nas três rotas em quatro viewports. Sem JavaScript, nome, cargo e contatos permanecem disponíveis; os projetos interativos não são reproduzidos. O roteiro também foi validado contra o build de produção servido por `vite preview`, onde os estilos globais são carregados sem depender do JavaScript. Não substitui uma auditoria com leitor de tela.

`contrast.cli.js` emula cores forçadas claras e escuras em 390×844 e 1440×900. Confere a página ativa, os três seletores de projetos, os cinco capítulos da trajetória, os filtros do arquivo e o foco por teclado, além de uma regressão do modo normal. A folha `styles/accessibility.css` usa cores do sistema e distingue seleção interna contínua de foco externo tracejado, sem mudar dimensões. As 93 verificações passaram também no build de produção; a emulação não certifica todos os temas de alto contraste do Windows.

### Zoom nativo de 200%

Use uma sessão Chrome headless com **perfil exclusivo de teste**, nunca o perfil pessoal do navegador:

```bash
npx --yes --package @playwright/cli@0.1.22 playwright-cli -s=portfolio-zoom open http://localhost:5173 --persistent --profile output/playwright/zoom-profile
npx --yes --package @playwright/cli@0.1.22 playwright-cli -s=portfolio-zoom run-code --filename tests/browser/zoom.cli.js
npx --yes --package @playwright/cli@0.1.22 playwright-cli -s=portfolio-zoom close
```

O roteiro altera o zoom pelo controle nativo em `chrome://settings/appearance`, confere a redução real da viewport CSS pela metade e restaura a configuração no fim. São 142 verificações em PT/EN: sete seções, todos os slides de projetos/experiências, menu, foco e largura dos arquivos de Projetos/Notas. As quatro janelas de teste correspondem a áreas CSS de 320×480, 640×360, 720×450 e 960×540. Aprovado em desenvolvimento e no build servido por `vite preview`.

Zoom de página não equivale a ampliar apenas a fonte. Texto-base de 32px em tela estreita permanece uma limitação registrada no TODO. Para capturas após rolagem com zoom nativo, foi necessário usar `Page.captureScreenshot` sem `clip` e com `captureBeyondViewport: false`: a captura comum do Playwright produziu imagens vazias nesses ensaios.

`sections.cli.js` mede as sete seções da home em 22 viewports, nos dois idiomas, incluindo os limites de quebra do layout. Verifica altura de tela, overflow, encaixe dos itens da stack em suas linhas e amostra os surgimentos de Sobre, Stack, Propósito e Trajetória em mobile e desktop. Não substitui inspeção visual nem testes em dispositivos físicos.

`archives.cli.js` verifica Projetos (duas categorias) e Notas em 16 viewports, PT/EN: largura, título sem recorte, imagens carregadas, entradas progressivas, scroll rápido e filtros por teclado sem perder foco nem parâmetros da URL. As páginas de arquivo mantêm altura natural; não herdam o limite de uma tela da home. A galeria carrega a primeira captura imediatamente e mantém as demais imagens sob demanda.

`experience.cli.js` confere os cinco capítulos da trajetória em sete viewports e dois idiomas, com navegação por teclado, textos dentro do painel e competências traduzidas. Também verifica que períodos diferentes da mesma empresa recebem entradas próprias em mobile e desktop.

`not-found.cli.js` cobre a tela 404 em oito viewports e PT/EN: título, ações visíveis, saída por teclado, foco na página de destino, entrada suave e movimento reduzido. O teste de texto-base em 32px permite crescimento vertical nessa página, verificando que o conteúdo não é recortado horizontalmente.

`gallery.cli.js` verifica as quatro capturas corporativas em seis viewports e dois idiomas. O clique comum abre um `dialog` nativo com legenda, anterior/próxima, teclado, Escape e retorno ao ponto/foco original. O fundo fica inerte e sem rolagem. O teste inclui falha de imagem, entrada curta e movimento reduzido; o link para o arquivo original é conferido sem abrir outra aba. Ctrl/Cmd+clique conserva a ação nativa do link.

`viewport-resize.cli.js` redimensiona a janela durante a leitura das sete seções, incluindo todos os slides de projetos e capítulos da trajetória. Confere a preservação da posição relativa, seleção ativa, alterações consecutivas de altura e retomada do avanço por capítulos, em PT/EN e com/sem movimento reduzido. `useHomeScrollAnchor` centraliza essa restauração apenas na home; novas ações de mouse, toque ou teclado cancelam uma restauração pendente. A simulação headless não substitui a validação das barras dinâmicas em celulares físicos.

`film-motion.cli.js` amostra quadros das transições de páginas, resposta de pressão dos controles, filtros e entradas repetidas das seções. Confere a direção e a sequência título → descrição nos capítulos da trajetória, histórico, foco e movimento reduzido em mobile e desktop. As curvas e variantes estão centralizadas em `src/motion/choreography.ts`. A página anterior fica inerte durante sua saída; a nova recebe foco após montar o conteúdo real.

A home avança por cenas com `useHomeSceneNavigation`: um gesto de roda/trackpad, swipe vertical ou PageDown percorre uma seção ou capítulo. A transição dura 900ms; a cauda de inércia não pula etapas. Arrastar a scrollbar encaixa na etapa mais próxima ao soltar. Links, Tab, menus, áreas com scroll próprio e gestos de zoom mantêm sua função; Escape interrompe a transição. Com movimento reduzido, a troca é imediata. O controlador existe apenas na home, é removido ao sair dela e recalcula posições após resize. Projetos têm três paradas e Experiência tem cinco. `useHomeSceneParallax` move somente a composição interna, sem alterar as medidas de navegação. Os surgimentos começam quando 72% do palco estão visíveis e repetem ao retornar.

`scene-navigation.cli.js` percorre as 13 etapas, verifica inércia, teclado, altura do viewport, movimento reduzido e scroll nativo em outra rota. `scene-touch.cli.js` emula swipes por CDP em um contexto mobile isolado; não equivale a ensaio em aparelho físico.

## Contato

- [LinkedIn](https://www.linkedin.com/in/pedro-lucas-reis-de-oliveira-sousa-a93945171/)
- [E-mail](mailto:pedrosousa2160@gmail.com)
