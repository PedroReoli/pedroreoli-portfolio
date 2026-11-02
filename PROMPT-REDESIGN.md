# Prompt mestre — reconstrução completa do portfólio Pedro Reoli

Você é uma IA frontend de nível excepcional, responsável por conceber e implementar do zero um portfólio autoral para Pedro Reoli.

## Regra absoluta de originalidade

- Não consulte o histórico Git, commits antigos, branches antigas, caches, builds, screenshots ou arquivos deletados.
- Não tente recuperar, reproduzir ou inferir a interface anterior.
- Não use o projeto antigo como referência estética, estrutural ou técnica.
- Comece a direção visual do zero usando exclusivamente este briefing, os JSONs em `content/` e os assets em `public/`.
- Não escreva textos, URLs, caminhos de imagem, nomes de ícones ou listas diretamente nos componentes quando esses dados puderem existir em JSON.

## Objetivo

Criar um portfólio memorável para um engenheiro de software Full Stack com forte atuação em frontend, arquitetura, sistemas corporativos, SaaS, integrações e agentes de IA.

O site deve comunicar simultaneamente:

1. Engenharia séria e competência técnica.
2. Sensibilidade visual e domínio de produto.
3. Capacidade de transformar sistemas complexos em experiências claras.
4. Personalidade autoral, sem parecer template de portfólio, dashboard SaaS ou landing page genérica.
5. Facilidade de manutenção: todo conteúdo deve permanecer separado da implementação visual.

## Fontes de verdade

Use estes arquivos como contrato de dados:

- `content/siteContent.json`: identidade, perfil, contatos, redes, rotas, SEO, flags e fallback sem JavaScript.
- `content/interfaceContent.json`: textos da interface, estrutura da home, ordem das seções, estados, navegação e metadados das cenas.
- `content/homeContent.json`: projetos destacados e experiência profissional.
- `content/projectsContent.json`: projetos corporativos, independentes, imagens e `srcSet`.
- `content/mediaContent.json`: notas, links e referências.
- `content/technologyContent.json`: grupos da stack, nomes, IDs de ícones, imagens e cores.
- `public/`: imagens e assets reais citados pelos JSONs.

Não altere fatos profissionais, números, nomes, URLs ou afirmações materiais sem autorização. Você pode melhorar hierarquia, composição e apresentação, mas não inventar cases, métricas, clientes, depoimentos ou resultados.

## Direção criativa inédita

Crie uma linguagem visual chamada **Ateliê Digital Brasileiro**: editorial, precisa, calorosa e tecnológica. A sensação deve misturar revista de design contemporâneo, estúdio de arquitetura e laboratório de software.

Evite completamente:

- estética hacker/cyberpunk;
- fundo preto dominante;
- chuva de código, terminal falso ou grid neon;
- hero com nome gigantesco ocupando quase toda a tela;
- sequência de seções full-screen cinematográficas;
- scroll hijacking ou navegação por cenas;
- bento grid genérico de SaaS;
- excesso de glassmorphism;
- gradiente roxo/azul padrão de IA;
- cards iguais repetidos em grade;
- animação decorativa constante;
- ícones usados como enfeite sem função.

## Paleta cromática

Use a paleta abaixo como sistema, não como coleção aleatória:

### Bases

- `Paper`: `#F4F0E7` — fundo principal quente, semelhante a papel editorial.
- `Paper Light`: `#FBF9F4` — superfícies elevadas e áreas de leitura.
- `Ink`: `#182033` — texto principal e blocos de alto contraste.
- `Ink Soft`: `#3D465B` — texto secundário.
- `Line`: `#D7D0C2` — bordas e divisórias.

### Cores de expressão

- `Signal Orange`: `#FF5A36` — CTA principal, estados ativos e detalhes de energia.
- `Cobalt`: `#315EFB` — links, tecnologia, foco e informação interativa.
- `Mint`: `#B9E8D0` — áreas de respiro, destaques de processo e fundos auxiliares.
- `Sun`: `#FFD166` — pequenos marcadores e ênfase pontual.

### Regras de uso

- Paper deve dominar a experiência.
- Ink sustenta legibilidade e autoridade.
- Signal Orange deve aparecer pouco e com intenção.
- Cobalt identifica interação e conteúdo técnico.
- Mint e Sun não devem competir com os CTAs.
- Valide contraste WCAG AA em texto, controles, foco e estados.
- Não aplique todas as cores dentro do mesmo componente.

## Tipografia

Escolha fontes reais, carregadas de forma eficiente e com licenças adequadas.

Direção recomendada:

- Display: `Instrument Serif`, `DM Serif Display` ou equivalente editorial expressivo.
- Sans: `Manrope`, `Inter Tight`, `Satoshi` ou equivalente preciso e contemporâneo.
- Mono: `IBM Plex Mono`, `Geist Mono` ou equivalente, somente para metadados, períodos e tecnologia.

Regras:

- A tipografia display deve introduzir personalidade, não prejudicar leitura.
- Corpo de texto com largura entre 55 e 72 caracteres.
- Escala tipográfica fluida com `clamp()`.
- Evite uppercase em parágrafos e elementos longos.
- Use mono com moderação.
- Não use mais de três famílias tipográficas.

## Composição e grid

- Use uma grade editorial de 12 colunas no desktop, 6 no tablet e 4 no mobile.
- Container máximo entre `1280px` e `1440px`.
- Margens generosas e ritmo vertical consistente.
- Combine blocos assimétricos, linhas editoriais, recortes de imagem e grandes áreas de respiro.
- Permita que algumas imagens escapem do grid, sem criar overflow horizontal.
- Evite transformar todas as informações em cards.
- Use divisórias, números, notas laterais e legendas para organizar densidade.
- O layout deve funcionar em `320px`, `390px`, `768px`, `1024px`, `1440px` e telas ultrawide.

## Estrutura sugerida da home

Use a ordem declarada em `interfaceContent.json` como conteúdo disponível, mas você pode propor uma narrativa visual própria.

### 1. Abertura

- Apresente nome, atuação e posicionamento em uma composição editorial assimétrica.
- Inclua CTA para projetos e acesso visível a contato.
- Use uma imagem profissional apenas se ela fortalecer a composição.
- Não faça o nome ocupar praticamente toda a viewport.
- Mostre rapidamente a combinação: produto, sistemas e IA aplicada.

### 2. Sobre

- Combine retrato, resumo profissional e estatísticas.
- Estatísticas devem parecer evidência editorial, não cards de dashboard.
- Preserve os textos e valores dos JSONs.

### 3. Projetos em destaque

- Cada projeto deve ter tratamento visual próprio.
- Imagens reais devem ser protagonistas.
- Mostre contexto, descrição, tecnologias e ação.
- Diferencie projeto corporativo de projeto independente.
- Não use carrossel se ele esconder conteúdo essencial.

### 4. Stack

- Renderize os grupos e ferramentas de `technologyContent.json`.
- Cada ferramenta possui `name`, `icon`, `color` e, quando aplicável, `image`.
- Crie uma composição semelhante a um índice de materiais ou mapa de capacidades.
- Não use uma simples grade uniforme de logotipos.
- Ícones devem permanecer reconhecíveis, acessíveis e visualmente equilibrados.

### 5. Tecnologia com propósito

- Use o case FalaAtípica como pausa humana na narrativa.
- Trate a imagem e o texto com sensibilidade editorial.
- O link externo deve ser explícito.

### 6. Trajetória

- Apresente experiência como narrativa cronológica legível.
- Todo item precisa estar acessível sem depender de hover.
- No mobile, não esconda descrições importantes.
- Evite timeline genérica com linha e bolinhas.

### 7. Contato

- Final forte, simples e direto.
- Use contatos declarados no JSON.
- Diferencie links externos e e-mail.
- Não use formulário se não houver backend real.

## Páginas adicionais

### Projetos

- Permita alternar entre projetos corporativos e independentes.
- Galeria corporativa com imagens responsivas, legendas e visualização ampliada acessível.
- Preserve os filtros na URL.
- Projetos independentes devem mostrar claramente destino externo.

### Notas e mídia

- Destaque a reportagem do FalaAtípica.
- Liste referências e repositórios com hierarquia editorial.
- Links externos devem ter indicação visual e texto acessível.

### 404

- Mantenha identidade do site.
- Ofereça rotas claras para início e projetos.
- Não transforme a página em piada que prejudique orientação.

## Arquitetura de conteúdo

- Componentes recebem dados por props ou por uma camada de conteúdo tipada.
- Nenhum componente deve conter copy editorial, URL externa, caminho de imagem ou lista de tecnologias.
- Ícones no JSON são IDs estáveis como `react`, `github` e `arrow-up-right`.
- Implemente um registro único que converta IDs de ícone em componentes.
- Quando `icon` for `image`, use o campo `image` do próprio item.
- Valide IDs inexistentes com erro claro durante desenvolvimento.
- Preserve `pt` e `en` como idiomas completos.
- Nunca use o texto em português como chave técnica.
- Mantenha schemas e tipos derivados ou validados para os JSONs.

## Escolha técnica

Construa a aplicação do zero. Preferência inicial:

- React;
- TypeScript estrito;
- Vite ou framework equivalente com justificativa;
- CSS moderno, CSS Modules, Tailwind ou solução equivalente bem organizada;
- animações leves com CSS, Motion ou GSAP somente quando houver benefício claro;
- roteamento acessível;
- geração de SEO, Open Graph e JSON-LD a partir de `siteContent.json`.

Não instale biblioteca apenas para resolver comportamento trivial. Verifique existência, manutenção e impacto no bundle antes de adicionar dependências.

## Motion

- Movimento deve comunicar hierarquia e causalidade.
- Entrada de conteúdo: 180–450ms.
- Hover: 120–220ms.
- Use curvas naturais, sem bounce excessivo.
- Respeite `prefers-reduced-motion` em toda animação.
- Não bloqueie rolagem nativa.
- Não anime textos longos palavra por palavra.
- Evite parallax intenso e efeitos que prejudiquem leitura.

## Interação e acessibilidade

- HTML semântico.
- Skip link funcional.
- Um `h1` por página.
- Ordem correta de headings.
- Navegação completa por teclado.
- Foco visível com contraste forte.
- Diálogos com foco gerenciado, Escape e retorno ao acionador.
- Imagens com `alt` dos JSONs.
- Ícones decorativos com `aria-hidden`.
- Links externos identificados para leitores de tela.
- Áreas de toque com pelo menos `44px`.
- Idioma do documento sincronizado com PT/EN.
- Estados de loading, erro e vazio legíveis.

## Responsividade

- Comece pelo mobile real, não apenas reduzindo desktop.
- Em `320px`, não pode existir corte de conteúdo essencial.
- Textos não podem depender de `vw` sem limites.
- Menus devem funcionar com teclado, toque e leitores de tela.
- Galerias não podem causar overflow horizontal.
- Imagens devem usar dimensões, `srcSet`, `sizes` e loading adequados.

## Performance

- Meta Lighthouse em produção: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95 e SEO ≥ 95.
- Divida rotas pesadas.
- Evite JavaScript para comportamentos possíveis em CSS/HTML.
- Preserve imagens responsivas existentes.
- Não carregue todas as imagens grandes no primeiro viewport.
- Evite layout shift definindo largura e altura.
- Analise tamanho do bundle e dependências.

## SEO

- Gere title, description, canonical, Open Graph, Twitter Card e JSON-LD a partir dos JSONs.
- Preserve `robots.txt` e `sitemap.xml` somente se forem recriados coerentemente com as rotas finais.
- O HTML inicial precisa conter metadados úteis antes da hidratação.
- Não invente keywords ou dados estruturados sem correspondência com o conteúdo real.

## Qualidade esperada

Antes de concluir:

1. Execute lint e TypeScript.
2. Crie testes para contrato dos JSONs, rotas e renderização essencial.
3. Valide todos os IDs de ícones.
4. Valide existência dos assets referenciados.
5. Teste PT e EN.
6. Teste teclado e `prefers-reduced-motion`.
7. Renderize e inspecione visualmente desktop e mobile.
8. Verifique console, overflow, imagens quebradas e links.
9. Gere build de produção.
10. Documente decisões visuais e limitações reais.

## Entrega

Entregue uma implementação completa, autoral e pronta para evolução. O novo código deve permitir trocar a direção visual no futuro sem editar conteúdo editorial. Explique a arquitetura criada, os arquivos principais, os testes executados e qualquer pendência observada.

