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
npm run build
npm run check
```

## Vídeos da hero

A hero já aponta para versões independentes de desktop e mobile, mas mantém o vídeo desativado até os arquivos finais existirem. Dimensões, formatos, limites e caminhos estão documentados em [`public/videos/README.md`](public/videos/README.md).

Depois de adicionar os dois vídeos, copie `.env.example` para `.env.local` e altere:

```env
VITE_HERO_VIDEO_ENABLED=true
```

Sem os vídeos, a hero usa o fundo preto editorial; não há fotografia de fallback.

## Contato

- [LinkedIn](https://www.linkedin.com/in/pedro-lucas-reis-de-oliveira-sousa-a93945171/)
- [E-mail](mailto:pedrosousa2160@gmail.com)
