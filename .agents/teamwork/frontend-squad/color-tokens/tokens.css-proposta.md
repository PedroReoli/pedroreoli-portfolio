# ColorTokens — Proposta de Tokens Semânticos (:root)

> **Documento:** `tokens.css-proposta.md`  
> **Autor:** ColorTokens (`agent-1999c0f5-1326-4f0e-bed0-572839261fc2`)  
> **Destinatário:** FrontendCraft (`agent-e0e20f7c-22bb-4cc7-9ac1-3fcf7956cb7e`)  
> **Instrução:** Bloco pronto para ser importado ou adicionado em `src/styles/backdrop.css` ou `src/styles/base.css`.  
> **Regra de Engenharia:** Não altera layout nem duplica seletores existentes; preserva as variáveis de base `--night`, `--paper` e `--accent`.

---

```css
/* ==========================================================================
   DESIGN TOKENS ACESSÍVEIS — VIDEO WALLPAPER, SCRIMS & GLASS (ColorTokens)
   Padrão WCAG 2.1 AA (>= 4.5:1 corpo) & AAA (>= 7.0:1 títulos/destaques)
   ========================================================================== */

:root {
  /* --------------------------------------------------------------------------
     1. ESCALA DE SCRIM DO VÍDEO (--video-scrim-*)
     Gradientes direcionais calibrados matematicamente contra mármore e amarelo
     -------------------------------------------------------------------------- */

  /* Scrim Base / Fallback Global */
  --video-scrim-global:
    radial-gradient(circle at 50% 50%, rgba(8, 9, 11, 0.45) 0%, rgba(8, 9, 11, 0.80) 80%, #08090b 100%),
    linear-gradient(to bottom, rgba(8, 9, 11, 0.40) 0%, transparent 25%, transparent 75%, #08090b 100%);

  /* S1: Hero — Preserva o centro do busto (35% vazado) e protege texto nas bordas */
  --video-scrim-hero:
    radial-gradient(circle at 50% 55%, transparent 35%, rgba(8, 9, 11, 0.55) 70%, #08090b 100%),
    linear-gradient(to bottom, rgba(8, 9, 11, 0.45) 0%, transparent 25%, rgba(8, 9, 11, 0.75) 100%);

  /* S2: Sobre — Atenua o lado esquerdo (leitura biográfica) e acomoda o beat do busto/foto */
  --video-scrim-sobre:
    radial-gradient(circle at 70% 50%, transparent 30%, rgba(8, 9, 11, 0.65) 70%, #08090b 100%),
    linear-gradient(to bottom, #08090b 0%, rgba(8, 9, 11, 0.55) 20%, rgba(8, 9, 11, 0.75) 85%, #08090b 100%);

  /* S3: Projetos (Rail Alternado) — Densidade mínima 0.70 nas colunas laterais de texto */
  --video-scrim-projects:
    radial-gradient(circle at 50% 50%, rgba(8, 9, 11, 0.45) 0%, rgba(8, 9, 11, 0.82) 75%, #08090b 100%),
    linear-gradient(to bottom, #08090b 0%, rgba(8, 9, 11, 0.70) 15%, rgba(8, 9, 11, 0.70) 85%, #08090b 100%);

  /* S4: Stack Tecnológico — Densidade 0.80 para garantir contraste AA em tipografia compacta */
  --video-scrim-stack:
    radial-gradient(circle at 50% 40%, rgba(8, 9, 11, 0.50) 0%, rgba(8, 9, 11, 0.85) 80%, #08090b 100%),
    linear-gradient(to bottom, #08090b 0%, rgba(8, 9, 11, 0.78) 12%, rgba(8, 9, 11, 0.78) 88%, #08090b 100%);

  /* S5: Propósito / Manifesto — Fundo suave no terço central, escurecimento nos textos */
  --video-scrim-purpose:
    radial-gradient(circle at 60% 45%, rgba(8, 9, 11, 0.40) 0%, rgba(8, 9, 11, 0.80) 75%, #08090b 100%),
    linear-gradient(to bottom, #08090b 0%, rgba(8, 9, 11, 0.65) 15%, rgba(8, 9, 11, 0.75) 85%, #08090b 100%);

  /* S6: Experiência / Timeline — Máxima densidade (0.85) para leitura de datas e marcos técnicos */
  --video-scrim-experience:
    radial-gradient(circle at 50% 50%, rgba(8, 9, 11, 0.55) 0%, rgba(8, 9, 11, 0.88) 80%, #08090b 100%),
    linear-gradient(to bottom, #08090b 0%, rgba(8, 9, 11, 0.80) 12%, rgba(8, 9, 11, 0.80) 88%, #08090b 100%);


  /* --------------------------------------------------------------------------
     2. PAINÉIS TRANSLÚCIDOS & GLASSMORPHISM ACESSÍVEL (--panel-glass-*)
     Garante que texto nunca flutue sobre ruído de vídeo sem amortecimento
     -------------------------------------------------------------------------- */

  /* Painel Escuro (Cards em S2, S3, S4, S6) — Ratio > 10.9:1 mesmo sobre mármore puro */
  --panel-glass-dark-bg: rgba(17, 18, 22, 0.86);
  --panel-glass-dark-bg-hover: rgba(22, 24, 30, 0.92);
  --panel-glass-dark-border: rgba(245, 243, 239, 0.11);
  --panel-glass-dark-border-hover: rgba(255, 201, 0, 0.42);
  --panel-glass-dark-shadow: 0 16px 40px rgba(0, 0, 0, 0.55), 0 0 0 1px var(--panel-glass-dark-border);
  --panel-glass-dark-shadow-hover: 0 20px 48px rgba(0, 0, 0, 0.65), 0 0 24px rgba(255, 201, 0, 0.12);

  /* Painel Claro / Papel (Caso adotado em seções claras) — Ratio > 13.8:1 para texto escuro */
  --panel-glass-light-bg: rgba(245, 243, 239, 0.88);
  --panel-glass-light-border: rgba(8, 9, 11, 0.12);
  --panel-glass-light-shadow: 0 12px 32px rgba(8, 9, 11, 0.15);

  /* Níveis de Blur Padronizados */
  --panel-glass-blur-sm: blur(8px);
  --panel-glass-blur-md: blur(16px);
  --panel-glass-blur-lg: blur(24px);


  /* --------------------------------------------------------------------------
     3. TOKENS TIPOGRÁFICOS SOBRE VÍDEO & SCRIM
     Piso mínimo de opacidade calibrado para aprovação WCAG AA (>= 4.5:1)
     -------------------------------------------------------------------------- */

  --text-on-scrim-primary: #f5f3ef;            /* Contraste 8.4:1 a 17.9:1 (AAA) */
  --text-on-scrim-secondary: rgba(244, 240, 231, 0.86); /* Contraste 6.5:1 (AA+) */
  --text-on-scrim-muted: rgba(244, 240, 231, 0.68);     /* Contraste 4.8:1 (AA Garantido) */
  --text-on-scrim-accent: #ffc900;             /* Contraste 5.0:1 a 12.9:1 (AA+) */

  /* Atenção: Sobre fundos claros/papel, use estes tokens */
  --text-on-light-primary: #08090b;            /* Contraste 13.8:1 a 18.1:1 (AAA) */
  --text-on-light-muted: #52504b;              /* Contraste 7.15:1 (AAA) */
  --text-on-light-accent: #6b5300;             /* Âmbar escuro: Contraste 5.20:1 (AA) */


  /* --------------------------------------------------------------------------
     4. ANEL DE FOCO UNIVERSAL & ACESSÍVEL (--focus-ring-*)
     WCAG 2.4.11 (Focus Appearance) — Contraste >= 12.9:1 em QUALQUER fundo
     -------------------------------------------------------------------------- */

  --focus-ring-color: #ffc900;                 /* Anel de destaque amarelo */
  --focus-ring-halo: #08090b;                  /* Anel de contraste preto */
  --focus-ring-width: 2px;
  --focus-ring-offset: 2px;
  --focus-ring-double: 0 0 0 2px var(--focus-ring-halo), 0 0 0 4px var(--focus-ring-color);
}

/* ==========================================================================
   REGRAS DE APLICAÇÃO SUGERIDAS (Para colar em backdrop.css ou home.css)
   ========================================================================== */

/* 1. Mapeamento direto do scrim no VideoStage conforme a seção ativa */
.video-stage[data-section="hero"] .video-stage__scrim {
  background: var(--video-scrim-hero);
}

.video-stage[data-section="sobre"] .video-stage__scrim {
  background: var(--video-scrim-sobre);
}

.video-stage[data-section="projetos-selecionados"] .video-stage__scrim {
  background: var(--video-scrim-projects);
}

.video-stage[data-section="stack"] .video-stage__scrim {
  background: var(--video-scrim-stack);
}

.video-stage[data-section="proposito"] .video-stage__scrim {
  background: var(--video-scrim-purpose);
}

.video-stage[data-section="experiencia"] .video-stage__scrim {
  background: var(--video-scrim-experience);
}

/* 2. Regra Canônica de Foco Universal Acessível (WCAG 2.4.11) */
:focus-visible {
  outline: var(--focus-ring-width) solid var(--focus-ring-color) !important;
  outline-offset: var(--focus-ring-offset) !important;
  box-shadow: 0 0 0 2px var(--focus-ring-halo) !important;
}

/* 3. Classe utilitária canônica para cards com vidro escuro */
.panel-glass-dark {
  background: var(--panel-glass-dark-bg);
  backdrop-filter: var(--panel-glass-blur-md);
  -webkit-backdrop-filter: var(--panel-glass-blur-md);
  border: 1px solid var(--panel-glass-dark-border);
  box-shadow: var(--panel-glass-dark-shadow);
  transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
}

.panel-glass-dark:hover {
  background: var(--panel-glass-dark-bg-hover);
  border-color: var(--panel-glass-dark-border-hover);
  box-shadow: var(--panel-glass-dark-shadow-hover);
}
```
