Revisão do layout da aplicação de portfólio, implementando ajustes de design, animações e organização de componentes com base nas diretrizes do encontro e no documento sobre o autor na raiz do repositório.

Working directory: f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio
Integrity mode: development

## Requirements

### R1. Navegação com Barra Fixa e Barra Pós-Hero
Manter uma barra de navegação fixa na seção Hero; após a rolagem ultrapassar a seção Hero, exibir uma segunda barra de navegação dedicada ao restante da página.

### R2. Botões ATS
Implementar três botões ATS funcionais na interface, com posicionamento, rótulos e ações definidos pela equipe de acordo com as melhores práticas de portfólio.

### R3. Animações de Surgimento
Adicionar animações de surgimento acionadas pela rolagem na seção de projetos, na terceira seção e na quarta seção da aplicação.

### R4. Cards de Projetos e Imagens
Ajustar o enquadramento das fotos nos cards de projetos e corrigir o formato das imagens, inserindo descrições mais detalhadas para cada projeto baseadas nas informações do arquivo `Sobre Mim.md`.

### R5. Layout Compacto e Tipografia
Tornar a quarta seção mais compacta com aumento proporcional de ícones e títulos. Alterar o título da quinta seção para corrigir espaçamento indevido gerado por caracteres acentuados da tipografia, utilizando textos fundamentados no `Sobre Mim.md`.

### R6. Trajetória em Timeline Vertical
Reformular a seção de trajetória no formato de timeline vertical com disposição alternada (esquerda e direita em visualização desktop), preservando a estrutura de dados e conteúdo dos cards existentes.

## Acceptance Criteria

### Navegação
- [ ] A barra de navegação da Hero permanece fixa durante a exibição da Hero.
- [ ] Uma barra de navegação secundária surge suavemente quando a rolagem ultrapassa a seção Hero.

### Botões ATS
- [ ] Três botões ATS estão integrados, visíveis e interativos na interface.

### Animações
- [ ] Efeitos de animação de surgimento são executados quando a seção de projetos, a terceira seção e a quarta seção entram no viewport.

### Cards de Projetos
- [ ] Imagens dos cards de projetos possuem enquadramento corrigido, sem cortes inadequados ou distorções de proporção.
- [ ] Cada card de projeto contém descrição detalhada baseada no conteúdo de `Sobre Mim.md`.

### Quarta e Quinta Seções
- [ ] A quarta seção apresenta espaçamento mais compacto, com ícones e títulos destacados.
- [ ] O novo título da quinta seção está legível, sem falhas de renderização de acentos ou espaços verticais indesejados.
- [ ] Textos ajustados ou incluídos refletem fielmente o perfil em `Sobre Mim.md`.

### Trajetória
- [ ] A seção de trajetória está estruturada visualmente como timeline vertical com cards alternando entre esquerda e direita no desktop.
- [ ] As informações históricas e conteúdo original dos cards de trajetória estão mantidos.

### Build e Integridade
- [ ] O projeto compila com sucesso (`npm run build`) sem erros de lint ou TypeScript.
