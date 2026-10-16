# 📋 TODO & Roadmap — Pedro Lucas Portfolio

Este documento rastreia as entregas, refatorações, melhorias de UI/UX e próximos passos do portfólio profissional de **Pedro Lucas Reis** (`pedroreoli-portfolio`).

---

## ✅ Entregas Concluídas

### 🚀 Hero Section & Perfil Técnico
- [x] Atualização da bio oficial com foco em 4 anos de experiência, ERPs corporativos, produtos digitais e plataformas SaaS.
- [x] Foto de perfil expandida até proporções monumentais (`xl:w-96 xl:h-96`) com moldura executiva de alto contraste.
- [x] Título monumental limpo e caixa alta (`PEDRO LUCAS REIS`), bio cirúrgica e 3 CTAs de conversão (WhatsApp, GitHub, LinkedIn).
- [x] Faixa compacta de 5 métricas de engenharia com enquadramento de tela sem rolagem desnecessária.

### 📦 Seção de Projetos & Catálogo em 3 Tiers
- [x] **Tier 1 (Flagship):** Organon Desktop OS v6.23.2, Achilles CDP Agent e Portal Unificado ERP Autocom3.
- [x] **Tier 2 (Freelance & Web):** Fala Atípica – Tríade, GeoAmbiental VR e Doce Norte & LPs Comerciais (Front-end moderno + backend mínimo).
- [x] **Tier 3 (Módulos Corporativos Autocom3):** AC3 Flex (nome corrigido, sem "Cloud"), Autocom3 Aplicativo Mobile (com Expo e sincronismo offline), Gestão de Propostas, Portal Admin e Portal do Contador.
- [x] Ocultação temporária comentada do *Propose SaaS*.
- [x] **Eliminação de Modais Bloqueantes:** Introdução do novo `GitHubProjectPopup` com `z-[100]`, backdrop translúcido suave e fechamento ágil via ESC ou clique externo.

### 🎓 Formação Acadêmica & Idiomas
- [x] Harmonização e simetria completa de colunas (2 cards na esquerda e 2 cards na direita com mesmo ritmo visual).
- [x] Separação clara entre Idiomas de Trabalho (Português e Inglês) e Extensão/Mentoria (EvaTech / SEBRAE & UniFOA).
- [x] Faixa horizontal de CTA em largura total conectando o usuário ao WhatsApp sem desequilibrar o grid.

### 🛠️ Stack Técnica & Engenharia
- [x] Correção definitiva do bug de hover nos cards de tecnologias: pop-up flutuante absoluto (`z-[150]`) que nunca empurra cards vizinhos nem causa layout shift.
- [x] Alinhamento inteligente do pop-up para evitar corte nas bordas da viewport.

### 📱 Usabilidade & Regra de Viewport
- [x] Validação de responsividade mobile (390px) e desktop (1920px) com zero overflow horizontal (`hasHorizontalOverflow: false`).
- [x] Lazy loading em todas as imagens de preview e animações suaves e confortáveis com Framer Motion (350ms, easeOut).

### 💼 Seção de Experiências Profissionais
- [x] Conversão da visualização para estágio fixo (*sticky scroll stage*) com fluxo horizontal de transição de cards.
- [x] Remoção da barra redundante de botões das empresas.
- [x] Correção da experiência corporativa para **EvaTech** (parceria UniFOA & SEBRAE).
- [x] Padronização e síntese de todos os textos de entregas no padrão de alta densidade técnica (padrão Autocom3 / LinkedIn).

### 🎨 Design System, Atmosfera & Navegação
- [x] Modularização completa do CSS em `src/styles/` (`tokens.css`, `typography.css`, `buttons.css`, `cards.css`, `navigation.css`).
- [x] Dual-State Navbar: transição suave entre o topo aberto e a pílula compacta flutuante com WhatsApp e links rápidos.
- [x] Floating Section Nav (Sumário Lateral Direito): tema Dark Zinc / Obsidian com tooltips exclusivos no hover individual e indicador de seção ativa sincronizado.
- [x] Harmonização do Rodapé (`GitHubFooter.tsx`): remoção dos tons azuis e alinhamento com a paleta monocromática Dark Zinc.
- [x] Animações atmosféricas com aceleração suave e blur-in nos componentes.

---

## ⏳ Próximos Passos & Backlog

### 🌟 Novas Seções & Expansões
- [ ] **Revisão e reativação seletiva dos projetos ocultados** conforme novos cases forem redigidos.
- [ ] **Artigos Técnicos / Blog:** Conectar/renderizar pré-visualização de artigos e posts técnicos.
- [ ] **Depoimentos & Recomendações:** Espaço para feedbacks de clientes, gestores e mentorados.

### ⚡ Otimização & Performance
- [ ] Atualização de pacotes e banco do Browserslist (`npx update-browserslist-db@latest`).
- [ ] Geração de OpenGraph cards dinâmicos para redes sociais (LinkedIn / Twitter Preview).
- [ ] Otimização de WebP/AVIF para todas as imagens da pasta `public/` e `src/assets/`.

### 🌐 Internacionalização (i18n)
- [ ] Sincronização contínua entre `portfolio.ts` e `portfolio.en.ts`.
- [ ] Persistência da preferência de idioma no `localStorage`.
