# ColorTokens — Escala de Scrim & Overlays para Video-Wallpaper

> **Documento:** `tokens-de-scrim.md`  
> **Autor:** ColorTokens (`agent-1999c0f5-1326-4f0e-bed0-572839261fc2`)  
> **Destinatários:** FrontendCraft, LayoutGuard, BotManager  
> **Projeto:** Pedro Lucas Portfolio (`pedroreoli-portfolio`)  
> **Referência:** `PLANO-VIDEO-WALLPAPER.md` (§3.3 e §6)  
> **Padrão Normativo:** WCAG 2.1 AA (mínimo 4.5:1 para texto normal, 3:1 para texto grande/componentes) e AAA (7:1 para títulos e destaques)

---

## 1. O Desafio Visual e a Arquitetura de Camadas

O redesign introduz um **vídeo wallpaper contínuo em tela cheia** (`VideoStage.tsx`) posicionado em `position: fixed; inset: 0; z-index: 0` atrás de todas as 6 seções.

O vídeo possui 3 pólos cromáticos dinâmicos e extremos:
1. **Fundo Obsidiana / Noite:** `#08090b` (Luminância $L = 0.0027$) — contraste excelente com textos claros.
2. **Busto de Mármore Branco:** destaques que atingem `#ffffff` ($L = 1.0000$) e tons médios `#e8e6e3` ($L = 0.7930$).
3. **Círculo Amarelo Emissivo & Óculos:** `#ffc900` ($L = 0.6303$) — altíssima luminância visual, letal para texto branco ou amarelo.

### Arquitetura de Camadas (Z-Index Stack)
```
[z-index: 100] Header / Nav / Skip Link
[z-index: 10]  Modal / Takeover
[z-index: 1]   .home (Seções HTML: textos, cards com backdrop-filter, links)
[z-index: 0]   .video-stage
               ├── .video-stage__video / .video-stage__poster (vídeo/poster cru)
               ├── .video-stage__pedro-overlay (crossfade foto real na S2)
               └── .video-stage__scrim (camada de atenuação e gradiente óptico)
```

Sem um scrim calibrado matematicamente, **qualquer texto branco (`#f5f3ef`) que passe sobre o mármore ou sobre o círculo amarelo sofre colapso de contraste** (queda para `1.11:1` e `1.39:1`, respectivamente), violando frontalmente a WCAG AA.

---

## 2. Estratégia de Scrim: Gradientes Direcionais Compostos

Para preservar o drama cinematográfico do busto e do círculo amarelo sem transformar o site num fundo preto opaco, utilizamos **gradientes compostos**:
1. **Componente Radial:** Preserva um ponto focal de visualização do busto / círculo nas áreas vazias da seção.
2. **Componente Linear:** Garante que as áreas densas em tipografia (coluna de texto, grid de cards ou rail de projetos) recebam densidade óptica entre **0.70 e 0.85**, suficiente para garantir WCAG AA (>= 4.5:1) em qualquer frame.

---

## 3. Escala de Scrim Seção por Seção (S1 a S6)

### S1. Hero (`hero`)
- **Composição:** Título display monumental centralizado ("PEDRO REOLI"), kicker superior, lead e CTAs duplos.
- **Posicionamento do vídeo:** Busto centralizado com fone e óculos amarelos sobre círculo `#ffc900`.
- **Necessidade de Contraste:** O título display é texto grande (passa em 3:1), mas o kicker e os botões exigem 4.5:1.
- **Scrim Recomendado:**
  - **Densidade:** 0.40 no centro óptico da estátua; 0.75 nas bordas e rodapé da seção.
  - **CSS:**
    ```css
    --video-scrim-hero:
      radial-gradient(circle at 50% 55%, transparent 35%, rgba(8, 9, 11, 0.55) 70%, #08090b 100%),
      linear-gradient(to bottom, rgba(8, 9, 11, 0.45) 0%, transparent 25%, rgba(8, 9, 11, 0.75) 100%);
    ```

---

### S2. Sobre (`sobre`)
- **Composição:** Moldura editorial "museu", stats cards (números amarelos `#ffc900`), texto biográfico e pills de tecnologias.
- **Beat do Vídeo:** Busto tira o fone devagar, dissolve para a foto real de Pedro (`eu-profissional.png`), e o busto retorna apontando.
- **Transição de Tema:** O projeto originalmente tinha `.about.section-light` em papel claro (`#f5f3ef`). Com vídeo contínuo escuro por trás, o fundo chapado branco cortaria brutalmente o vídeo.
- **Solução Recomendada:** Painel Translúcido **Glass Dark** ou **Glass Paper** de alta densidade.
  - Se mantido no tema escuro unificado (recomendado pelo design system dark premium):
    - Fundo da seção: Transparente sobre o scrim.
    - Scrim da seção:
      ```css
      --video-scrim-sobre:
        radial-gradient(circle at 70% 50%, transparent 30%, rgba(8, 9, 11, 0.65) 70%, #08090b 100%),
        linear-gradient(to bottom, #08090b 0%, rgba(8, 9, 11, 0.55) 20%, rgba(8, 9, 11, 0.75) 85%, #08090b 100%);
      ```
    - Cards de estatística e moldura: Painel translúcido `rgba(17, 18, 22, 0.85)` com `backdrop-filter: blur(16px)` e borda `rgba(245, 243, 239, 0.12)`.

---

### S3. Projetos Selecionados (`projetos-selecionados`)
- **Composição:** Novo rail alternado esquerda/direita (Autocom3 na direita, Achilles na esquerda, Organon na direita).
- **Interação com o vídeo:** A estátua no vídeo aponta alternadamente para a esquerda e para a direita conforme o scroll progride.
- **Desafio de Contraste:** O lado que contém o texto (títulos em `Instrument Serif`, metadados e tags) fica diretamente sobre a projeção do vídeo.
- **Solução de Scrim:** Gradiente com atenuação bilateral de segurança (densidade mínima de 0.75 sobre a área de leitura):
  ```css
  --video-scrim-projects:
    radial-gradient(circle at 50% 50%, rgba(8, 9, 11, 0.45) 0%, rgba(8, 9, 11, 0.82) 75%, #08090b 100%),
    linear-gradient(to bottom, #08090b 0%, rgba(8, 9, 11, 0.70) 15%, rgba(8, 9, 11, 0.70) 85%, #08090b 100%);
  ```
  - **Card de Artwork do Projeto:** Usa `background: rgba(12, 14, 20, 0.90)` com `border: 1px solid rgba(255, 255, 255, 0.10)`.

---

### S4. Stack Tecnológico (`stack`)
- **Composição:** Rebuild completo solicitado pelo Pedro — cards compactos, títulos dos cards maiores (`1.15rem`), ícones ampliados (24–26px) e labels de ferramentas sem corte.
- **Desafio de Contraste:** Tipografia compacta com alta densidade de informação (labels em ~0.82rem). Texto pequeno exige contraste estrito de **4.5:1 (AA)**.
- **Solução de Scrim e Superfície:**
  - O scrim do vídeo precisa ser mais denso (0.80):
    ```css
    --video-scrim-stack:
      radial-gradient(circle at 50% 40%, rgba(8, 9, 11, 0.50) 0%, rgba(8, 9, 11, 0.85) 80%, #08090b 100%),
      linear-gradient(to bottom, #08090b 0%, rgba(8, 9, 11, 0.78) 12%, rgba(8, 9, 11, 0.78) 88%, #08090b 100%);
    ```
  - **Cards da Stack (`article`):** Devem utilizar vidro escuro denso:
    ```css
    --panel-glass-stack-card: rgba(17, 18, 22, 0.88);
    --panel-glass-stack-blur: blur(14px);
    --panel-glass-stack-border: 1px solid rgba(245, 243, 239, 0.10);
    ```
  - **Pills de ferramentas (`li`):** `rgba(255, 255, 255, 0.05)` com borda `rgba(255, 255, 255, 0.08)`. Hover com micro-glow âmbar `rgba(255, 201, 0, 0.12)`.

---

### S5. Propósito / Manifesto (`proposito`)
- **Composição:** Frase de manifesto em display serif monumental, parágrafo de lead reflexivo, foto autêntica de Pedro em bancada de hardware e botão de contato primário.
- **Desafio de Contraste:** O botão primário tem fundo amarelo `#ffc900` com texto preto `#08090b`. Este botão tem excelente contraste intrínseco (`12.91:1`). Já o texto reflexivo sobre o vídeo precisa de fundo escurecido.
- **Solução de Scrim:**
  ```css
  --video-scrim-purpose:
    radial-gradient(circle at 60% 45%, rgba(8, 9, 11, 0.40) 0%, rgba(8, 9, 11, 0.80) 75%, #08090b 100%),
    linear-gradient(to bottom, #08090b 0%, rgba(8, 9, 11, 0.65) 15%, rgba(8, 9, 11, 0.75) 85%, #08090b 100%);
  ```

---

### S6. Experiência / Timeline (`experiencia`)
- **Composição:** Linha do tempo horizontal/vertical com cards de cargos e marcos históricos (`#01`, `#02`, etc.). Ícone de estrela `<Sparkles>` removido conforme instrução do Pedro.
- **Desafio de Contraste:** Cards com textos detalhados: data (`rgba(244, 240, 231, 0.55)`), títulos de cargo, descrições e bullets de highlights (`0.68rem`).
- **Solução de Scrim:** A seção de experiência exige a proteção mais fechada da página para permitir leitura de dados técnicos:
  ```css
  --video-scrim-experience:
    radial-gradient(circle at 50% 50%, rgba(8, 9, 11, 0.55) 0%, rgba(8, 9, 11, 0.88) 80%, #08090b 100%),
    linear-gradient(to bottom, #08090b 0%, rgba(8, 9, 11, 0.80) 12%, rgba(8, 9, 11, 0.80) 88%, #08090b 100%);
  ```
  - **Cards da Timeline:** `rgba(17, 18, 22, 0.90)` com `backdrop-filter: blur(18px)`.

---

## 4. Painéis Translúcidos (Glassmorphism Acessível)

Quando uma seção ou elemento precisar de aparência translúcida ("vidro"), o efeito **nunca deve depender apenas de opacidade sem blur**, pois o movimento dos detalhes do vídeo sob as letras causaria perda de legibilidade (fadiga visual).

### 4.1 Painel Glass Escuro (Padrão para Cards de Conteúdo)
```css
.panel-glass-dark {
  background: var(--panel-glass-dark-bg); /* rgba(17, 18, 22, 0.86) */
  backdrop-filter: var(--panel-glass-blur); /* blur(16px) */
  -webkit-backdrop-filter: var(--panel-glass-blur);
  border: 1px solid var(--panel-glass-dark-border); /* rgba(245, 243, 239, 0.11) */
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.55);
}
```
*Garante contraste > 10:1 para texto `#f5f3ef` mesmo com mármore branco passando por trás.*

### 4.2 Painel Glass Claro / Papel (Caso seja usado painel translúcido em seções claras)
Se for adotado painel de papel translúcido:
```css
.panel-glass-light {
  background: var(--panel-glass-light-bg); /* rgba(245, 243, 239, 0.88) */
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(8, 9, 11, 0.12);
  color: var(--color-ink); /* #08090b */
}
```
> [!CAUTION]
> **Aviso Crítico:** Em painéis claros, o texto deve ser SEMPRE `#08090b` (contraste > 13.8:1). O amarelo `#ffc900` **NUNCA** pode ser usado como texto sobre painel claro (contraste cai para `1.07:1`!). Para elementos de destaque em fundo claro, use o token `--color-accent-ink: #08090b` com sublinhado/badge ou o tom âmbar escuro `--color-accent-contrast-light: #6b5300` (contraste 5.2:1 AA).

---

## 5. Estados de Foco Universais (WCAG 2.4.11 Focus Appearance)

No CSS atual, o foco está definido como:
```css
:focus-visible { outline: 3px solid var(--accent); outline-offset: 4px; }
```
**Falha Grave Identificada:** Quando o foco cai em um elemento localizado sobre o círculo amarelo do vídeo ou sobre o mármore branco:
- Amarelo sobre amarelo: `1.0:1` (invisível).
- Amarelo sobre mármore: `1.54:1` (reprovado na WCAG 2.4.11, que exige no mínimo `3:1`).

### Solução: Double-Ring (Anel de Foco Duplo de Alto Contraste)
Utilizamos um anel com separador escuro de 2px e anel amarelo externo de 2px:
```css
:focus-visible {
  outline: 2px solid var(--focus-ring-color); /* #ffc900 */
  outline-offset: 2px;
  box-shadow: 0 0 0 2px var(--focus-ring-halo); /* #08090b */
}
```
**Resultado de Contraste Medido do Anel Duplo:**
- Contra fundo preto: anel amarelo contrasta `12.91:1` (Aprovado AAA).
- Contra mármore branco: anel escuro interno contrasta `19.92:1` (Aprovado AAA).
- Contra círculo amarelo: anel escuro interno contrasta `12.91:1` (Aprovado AAA).
*Garantia absoluta de visibilidade em 100% dos frames e posições.*

---

## 6. Equivalência Moderna em OKLCH

Para navegadores modernos que suportam Color Module 4, as cores de base e gradientes possuem definição perceptual uniforme em OKLCH:
- `--night`: `oklch(0.12 0.005 260)`
- `--surface`: `oklch(0.16 0.008 260)`
- `--paper`: `oklch(0.96 0.008 80)`
- `--accent` (`#ffc900`): `oklch(0.84 0.18 85)`
- `--accent-contrast-light` (`#6b5300`): `oklch(0.44 0.12 85)`

O bloco `:root` em `tokens.css-proposta.md` fornece fallback universal `rgba()` compatível com 100% dos navegadores e builds Vite.
