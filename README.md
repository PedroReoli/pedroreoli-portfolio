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
npx --yes --package @playwright/cli@0.1.22 playwright-cli -s=portfolio-qa close
```

Use a URL exibida pelo seu servidor Vite. A sessão é headless por padrão; não use `--headed`. Os roteiros validam menu, teclado, foco entre rotas, idioma, viewport baixa e os três slides de projetos em sete viewports e dois idiomas. Conferem transições com e sem movimento reduzido, sem clicar em links externos. A preferência de idioma muda apenas na sessão isolada de teste.

`recovery.cli.js` intercepta módulos somente no navegador de teste para simular falhas de rede e renderização. Erros intencionais no console são esperados nesse roteiro. Verifica isolamento da falha, tentativa manual, preservação da URL e saída pelo menu, sem alterar arquivos ou o servidor. Essa proteção exige que o JavaScript inicial tenha carregado; não equivale a suporte offline.

## Contato

- [LinkedIn](https://www.linkedin.com/in/pedro-lucas-reis-de-oliveira-sousa-a93945171/)
- [E-mail](mailto:pedrosousa2160@gmail.com)
