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

Auditoria de navegação em navegador real, sem abrir janelas (CLI 0.1.22):

```bash
npx --yes --package @playwright/cli@0.1.22 playwright-cli -s=portfolio-qa open http://localhost:5173
npx --yes --package @playwright/cli@0.1.22 playwright-cli -s=portfolio-qa run-code --filename tests/browser/navigation.cli.js
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

## Contato

- [LinkedIn](https://www.linkedin.com/in/pedro-lucas-reis-de-oliveira-sousa-a93945171/)
- [E-mail](mailto:pedrosousa2160@gmail.com)
