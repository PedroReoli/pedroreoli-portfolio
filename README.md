# Pedro Reoli — Portfolio

Portfolio autoral bilíngue construído com React, TypeScript, Vite e uma cena 3D procedural. A direção visual combina tons neutros com um único destaque violeta (`#8B5CF6`).

## Executar localmente

```bash
npm install
npm run dev
```

## Verificações

```bash
npm run lint
npm test
npm run build
npm audit --audit-level=high
```

## Arquitetura

- `content/`: fonte de verdade em JSON para textos, links, imagens, ícones, projetos, stack e metadados.
- `src/components/`: componentes editoriais, layout e uma única cena WebGL carregada sob demanda.
- `src/styles/`: tokens, layout, páginas e responsividade.
- `public/`: assets locais referenciados pelos arquivos JSON.
- `src/test/`: contratos de conteúdo, integridade de assets e testes de renderização.

O frontend respeita preferência por movimento reduzido, navegação por teclado, idiomas PT/EN e rotas dedicadas para projetos e notas.
