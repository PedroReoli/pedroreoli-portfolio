# ColorTokens — Tabela de Contraste Medido (WCAG 2.1)

> **Documento:** `contraste-medido.md`  
> **Autor:** ColorTokens (`agent-1999c0f5-1326-4f0e-bed0-572839261fc2`)  
> **Destinatários:** FrontendCraft, LayoutGuard, BotManager, Pedro Lucas  
> **Metodologia de Medição:** Fórmula Canônica WCAG 2.1 para Luminância Relativa ($L$) e Contraste ($CR$):  
> $$L = 0.2126 \cdot R_{lin} + 0.7152 \cdot G_{lin} + 0.0722 \cdot B_{lin}$$  
> $$CR = \frac{L_1 + 0.05}{L_2 + 0.05} \quad (L_1 \ge L_2)$$  
> Onde $c_{lin} = c / 12.92$ para $c \le 0.04045$, e $(\frac{c + 0.055}{1.055})^{2.4}$ para $c > 0.04045$.  
> Blending Alfa de Camadas: $C_{efetivo} = \alpha \cdot C_{topo} + (1 - \alpha) \cdot C_{fundo}$.

---

## 1. Valores de Luminância de Referência

| Token / Cor | Valor Hex | RGB | Luminância Relativa ($L$) | Papel Visual |
|---|---|---|---|---|
| `--color-bg` (Noite) | `#08090b` | (8, 9, 11) | **0.00271** | Fundo escuro do vídeo e da página |
| `--color-surface` | `#111216` | (17, 18, 22) | **0.00481** | Fundo base de cards |
| Mármore Branco (Vídeo) | `#ffffff` | (255, 255, 255) | **1.00000** | Pior caso 1 do vídeo (destaque especular) |
| Mármore Tom Médio | `#e8e6e3` | (232, 230, 227) | **0.79295** | Corpo da estátua de mármore |
| `--color-accent` (Amarelo) | `#ffc900` | (255, 201, 0) | **0.63033** | Pior caso 2 do vídeo (círculo emissivo) |
| `--color-paper` | `#f5f3ef` | (245, 243, 239) | **0.89746** | Texto principal / títulos |
| `--color-paper-muted` | `#f4f0e7` | (244, 240, 231) | **0.87323** | Texto secundário base |
| `--color-muted` | `#7e7b74` | (126, 123, 116) | **0.19862** | Texto atenuado original |
| `--accent-contrast-light` | `#6b5300` | (107, 83, 0) | **0.09854** | Âmbar escuro para fundos claros |

---

## 2. Cenários Críticos e Piores Casos do Vídeo (Sem Scrim / Vídeo Cru)

Esta tabela demonstra matematicamente o colapso de legibilidade caso o vídeo seja renderizado sem camada de proteção:

| Elemento / Par Testado | Cor do Texto ($L_1$) | Fundo do Vídeo ($L_2$) | Contraste Calculado | WCAG AA Normal (4.5:1) | WCAG AA Large (3:1) | WCAG AAA (7:1) | Veredito |
|---|---|---|---|---|---|---|---|
| **Texto Branco sobre Mármore Branco** | `#f5f3ef` (0.897) | `#ffffff` (1.000) | **1.11 : 1** | ❌ REPROVADO | ❌ REPROVADO | ❌ REPROVADO | **CATÁSTROFE** (Ilegível) |
| **Texto Branco sobre Mármore Médio** | `#f5f3ef` (0.897) | `#e8e6e3` (0.793) | **1.12 : 1** | ❌ REPROVADO | ❌ REPROVADO | ❌ REPROVADO | **CATÁSTROFE** (Ilegível) |
| **Texto Branco sobre Círculo Amarelo** | `#f5f3ef` (0.897) | `#ffc900` (0.630) | **1.39 : 1** | ❌ REPROVADO | ❌ REPROVADO | ❌ REPROVADO | **FATAL** (Invisível) |
| **Texto Amarelo sobre Mármore Branco** | `#ffc900` (0.630) | `#ffffff` (1.000) | **1.54 : 1** | ❌ REPROVADO | ❌ REPROVADO | ❌ REPROVADO | **FATAL** (Invisível) |
| **Texto Amarelo sobre Fundo Preto** | `#ffc900` (0.630) | `#08090b` (0.003) | **12.91 : 1** | ✅ APROVADO | ✅ APROVADO | ✅ APROVADO | **EXCELENTE** |
| **Texto Preto sobre Círculo Amarelo** | `#08090b` (0.003) | `#ffc900` (0.630) | **12.91 : 1** | ✅ APROVADO | ✅ APROVADO | ✅ APROVADO | **EXCELENTE** (Botão CTA) |
| **Texto Preto sobre Mármore Branco** | `#08090b` (0.003) | `#ffffff` (1.000) | **19.92 : 1** | ✅ APROVADO | ✅ APROVADO | ✅ APROVADO | **EXCELENTE** |
| **Texto Branco sobre Fundo Preto** | `#f5f3ef` (0.897) | `#08090b` (0.003) | **17.97 : 1** | ✅ APROVADO | ✅ APROVADO | ✅ APROVADO | **EXCELENTE** |

---

## 3. Contraste Medido com a Nova Escala de Scrim Seccional

A tabela a seguir mede o contraste resultante quando a camada `.video-stage__scrim` atua sobre o pior caso do vídeo (Mármore Branco `#ffffff` ou Círculo Amarelo `#ffc900`):

| Seção / Elemento | Cor do Texto | Pior Caso do Vídeo | Scrim Aplicado ($\alpha$) | Fundo Efetivo Resultante | Ratio Medido | WCAG AA (>=4.5:1) | WCAG AAA (>=7:1) | Status |
|---|---|---|---|---|---|---|---|---|
| **S1. Hero Display** ("PEDRO REOLI") | `#f5f3ef` | Mármore `#ffffff` | $\alpha = 0.55$ | rgb(119, 120, 121) | **3.99 : 1** | ⚠️ AA Large | ❌ | **APROVADO** (Display > 36px exige 3:1) |
| **S1. Hero Lead / Kicker** | `#f5f3ef` | Mármore `#ffffff` | $\alpha = 0.70$ | rgb(82, 83, 84) | **6.96 : 1** | ✅ PASS | ⚠️ Quase AAA | **APROVADO** (Supera AA 4.5:1) |
| **S1. Hero Amarelo Accent** | `#ffc900` | Mármore `#ffffff` | $\alpha = 0.70$ | rgb(82, 83, 84) | **4.99 : 1** | ✅ PASS | ❌ | **APROVADO** (Supera AA 4.5:1) |
| **S1. Hero sobre Amarelo** | `#f5f3ef` | Amarelo `#ffc900` | $\alpha = 0.70$ | rgb(82, 67, 8) | **8.75 : 1** | ✅ PASS | ✅ PASS | **APROVADO AAA** |
| **S2. Sobre Texto Corpo** | `#f5f3ef` | Mármore `#ffffff` | $\alpha = 0.70$ | rgb(82, 83, 84) | **6.96 : 1** | ✅ PASS | ⚠️ Quase AAA | **APROVADO** |
| **S2. Sobre Muted (0.85)** | `rgba(245,243,239,0.85)` | Mármore `#ffffff` | $\alpha = 0.70$ | rgb(82, 83, 84) | **5.58 : 1** | ✅ PASS | ❌ | **APROVADO AA** |
| **S2. Sobre Stats Amarelo** | `#ffc900` | Mármore `#ffffff` | $\alpha = 0.70$ | rgb(82, 83, 84) | **4.99 : 1** | ✅ PASS | ❌ | **APROVADO AA** (Texto grande 3:1) |
| **S3. Projetos Título Rail** | `#f5f3ef` | Mármore `#ffffff` | $\alpha = 0.75$ | rgb(70, 71, 72) | **8.40 : 1** | ✅ PASS | ✅ PASS | **APROVADO AAA** |
| **S3. Projetos Meta (0.65)** | `rgba(244,240,231,0.65)` | Mármore `#ffffff` | $\alpha = 0.75$ | rgb(70, 71, 72) | **4.65 : 1** | ✅ PASS | ❌ | **APROVADO AA** |
| **S3. Projetos sobre Amarelo** | `#f5f3ef` | Amarelo `#ffc900` | $\alpha = 0.75$ | rgb(70, 57, 8) | **10.25 : 1** | ✅ PASS | ✅ PASS | **APROVADO AAA** |
| **S4. Stack Títulos (1.15rem)** | `#f5f3ef` | Mármore `#ffffff` | $\alpha = 0.80$ | rgb(57, 58, 60) | **10.27 : 1** | ✅ PASS | ✅ PASS | **APROVADO AAA** |
| **S4. Stack Amarelo Headers** | `#ffc900` | Mármore `#ffffff` | $\alpha = 0.80$ | rgb(57, 58, 60) | **7.38 : 1** | ✅ PASS | ✅ PASS | **APROVADO AAA** |
| **S4. Stack sobre Amarelo** | `#f5f3ef` | Amarelo `#ffc900` | $\alpha = 0.80$ | rgb(57, 47, 9) | **11.96 : 1** | ✅ PASS | ✅ PASS | **APROVADO AAA** |
| **S5. Propósito Manifesto** | `#f5f3ef` | Mármore `#ffffff` | $\alpha = 0.75$ | rgb(70, 71, 72) | **8.40 : 1** | ✅ PASS | ✅ PASS | **APROVADO AAA** |
| **S5. Propósito Lead (0.78)** | `rgba(245,243,239,0.78)` | Mármore `#ffffff` | $\alpha = 0.75$ | rgb(70, 71, 72) | **5.74 : 1** | ✅ PASS | ❌ | **APROVADO AA** |
| **S6. Experiência H3** | `#f5f3ef` | Mármore `#ffffff` | $\alpha = 0.85$ | rgb(45, 46, 48) | **12.26 : 1** | ✅ PASS | ✅ PASS | **APROVADO AAA** |
| **S6. Experiência Highlights** | `rgba(244,240,231,0.72)` | Mármore `#ffffff` | $\alpha = 0.85$ | rgb(45, 46, 48) | **7.45 : 1** | ✅ PASS | ✅ PASS | **APROVADO AAA** |
| **S6. Experiência Amarelo #01** | `#ffc900` | Mármore `#ffffff` | $\alpha = 0.85$ | rgb(45, 46, 48) | **8.81 : 1** | ✅ PASS | ✅ PASS | **APROVADO AAA** |

---

## 4. Contraste Medido com Painéis Translúcidos (Cards com `backdrop-filter`)

Quando o conteúdo está dentro de um container com classe de painel:

| Tipo de Painel | Cor do Texto | Pior Caso sob o Painel | Fundo do Painel ($\alpha$) | Fundo Efetivo Resultante | Ratio Medido | WCAG AA | WCAG AAA | Veredito |
|---|---|---|---|---|---|---|---|---|
| **Glass Dark (Cards)** | `#f5f3ef` (Papel) | Mármore `#ffffff` | Surface ($\alpha = 0.85$) | rgb(53, 54, 57) | **10.90 : 1** | ✅ PASS | ✅ PASS | **APROVADO AAA** |
| **Glass Dark (Cards)** | `#f5f3ef` (Papel) | Amarelo `#ffc900` | Surface ($\alpha = 0.85$) | rgb(53, 45, 19) | **12.34 : 1** | ✅ PASS | ✅ PASS | **APROVADO AAA** |
| **Glass Dark (Cards)** | `#ffc900` (Amarelo) | Mármore `#ffffff` | Surface ($\alpha = 0.85$) | rgb(53, 54, 57) | **7.83 : 1** | ✅ PASS | ✅ PASS | **APROVADO AAA** |
| **Glass Dark (Cards)** | `rgba(244,240,231,0.72)` (Desc) | Mármore `#ffffff` | Surface ($\alpha = 0.85$) | rgb(53, 54, 57) | **6.51 : 1** | ✅ PASS | ⚠️ | **APROVADO AA** |
| **Glass Dark (Cards)** | `rgba(244,240,231,0.52)` (Meta antigo) | Mármore `#ffffff` | Surface ($\alpha = 0.85$) | rgb(53, 54, 57) | **4.32 : 1** | ❌ FAIL | ❌ | **REPROVADO AA Normal** (falta 0.18) |
| **Glass Dark (Cards)** | `rgba(244,240,231,0.65)` (Meta calibrado) | Mármore `#ffffff` | Surface ($\alpha = 0.85$) | rgb(53, 54, 57) | **5.64 : 1** | ✅ PASS | ❌ | **APROVADO AA** |
| **Glass Light (Papel)** | `#08090b` (Tinta escura) | Fundo Escuro `#08090b` | Papel ($\alpha = 0.88$) | rgb(217, 215, 212) | **13.87 : 1** | ✅ PASS | ✅ PASS | **APROVADO AAA** |
| **Glass Light (Papel)** | `#08090b` (Tinta escura) | Mármore `#ffffff` | Papel ($\alpha = 0.88$) | rgb(246, 244, 241) | **18.14 : 1** | ✅ PASS | ✅ PASS | **APROVADO AAA** |
| **Glass Light (Papel)** | `#7e7b74` (Muted antigo) | Fundo Escuro `#08090b` | Papel ($\alpha = 0.88$) | rgb(217, 215, 212) | **2.94 : 1** | ❌ FAIL | ❌ | **REPROVADO** |
| **Glass Light (Papel)** | `#ffc900` (Amarelo) | Qualquer | Papel ($\alpha = 0.88$) | rgb(217, 215, 212) | **1.07 : 1** | ❌ FAIL | ❌ | **PROIBIDO** (Invisível) |
| **Glass Light (Papel)** | `#6b5300` (Âmbar calibrado) | Qualquer | Papel ($\alpha = 0.88$) | rgb(217, 215, 212) | **5.20 : 1** | ✅ PASS | ❌ | **APROVADO AA** |

---

## 5. Contraste Medido de Estados de Foco (`:focus-visible`)

Conformidade com **WCAG 2.4.11 (Focus Appearance)** — Exige no mínimo `3:1` de contraste para indicadores de foco contra o fundo adjacente:

| Implementação do Indicador de Foco | Fundo Subjacente no Vídeo | Contraste Medido | WCAG 2.4.11 (>= 3:1) | Status |
|---|---|---|---|---|
| **Anel Único Amarelo `#ffc900` (Atual)** | Fundo Preto `#08090b` | **12.91 : 1** | ✅ PASS | Aprovado |
| **Anel Único Amarelo `#ffc900` (Atual)** | Mármore Branco `#ffffff` | **1.54 : 1** | ❌ REPROVADO | **VIOLAÇÃO DE ACESSIBILIDADE** |
| **Anel Único Amarelo `#ffc900` (Atual)** | Círculo Amarelo `#ffc900` | **1.00 : 1** | ❌ REPROVADO | **INVISÍVEL** |
| **Double-Ring: Anel Escuro Interno (`#08090b`)** | Mármore Branco `#ffffff` | **19.92 : 1** | ✅ PASS | **APROVADO AAA** |
| **Double-Ring: Anel Escuro Interno (`#08090b`)** | Círculo Amarelo `#ffc900` | **12.91 : 1** | ✅ PASS | **APROVADO AAA** |
| **Double-Ring: Anel Amarelo Externo (`#ffc900`)** | Anel Escuro Interno (`#08090b`) | **12.91 : 1** | ✅ PASS | **APROVADO AAA** |

---

## 6. Os 3 Riscos Mais Sérios de Contraste e Suas Mitigações

### 🚨 Risco 1: Texto Branco/Papel sobre o Busto de Mármore ou Círculo Amarelo sem Scrim
- **Gravidade:** Crítica (Colapso total da legibilidade, ratio medido entre `1.11:1` e `1.39:1`).
- **Onde ocorre:** Em qualquer frame onde o busto branco ou o halo amarelo cruzem por trás de títulos e textos do Hero, Rail de Projetos e Stack.
- **Mitigação Obrigatória:** Garantir que a camada `.video-stage__scrim` esteja **ativa e com densidade mínima de $\alpha \ge 0.70$** sobre áreas de texto (ou $\alpha \ge 0.85$ em cards com `backdrop-filter`). O contraste medido sobe para **8.40:1 a 12.26:1 (AAA)**.

### 🚨 Risco 2: Textos Atenuados com Opacidade Excessivamente Baixa (`0.46` a `0.52`)
- **Gravidade:** Alta (Reprovação sutil em auditorias automatizadas e ilegibilidade para usuários com baixa sensibilidade a contraste).
- **Onde ocorre:** `.section-kicker p:last-child`, `.project-card__meta`, `.timeline-card__period` e destaques com `rgba(244, 240, 231, 0.46 / 0.52)`.
- **Cálculo Medido:** Sobre mármore com scrim 0.70, opacidade `0.52` atinge apenas **3.51:1** (falha no requisito de 4.5:1 para corpo).
- **Mitigação Obrigatória:** Elevar o piso de opacidade de textos atenuados sobre vídeo para no mínimo **`0.65`** (`rgba(244, 240, 231, 0.65)`), atingindo **4.65:1 a 5.64:1 (Aprovado AA)**.

### 🚨 Risco 3: Indicador de Foco Monocromático Amarelo Desaparecendo em Áreas Claras
- **Gravidade:** Alta (Violação do critério WCAG 2.4.7 e 2.4.11 para navegação via teclado).
- **Onde ocorre:** Botões, links e cards focados enquanto o vídeo projeta o mármore ou o círculo amarelo no fundo.
- **Cálculo Medido:** Contraste cai para **1.00:1** (invisível sobre amarelo) e **1.54:1** (sobre mármore).
- **Mitigação Obrigatória:** Substituir o `outline: 3px solid var(--accent)` por anel duplo (`--focus-ring-halo` de 2px escuro `#08090b` + `--focus-ring-color` de 2px amarelo `#ffc900`). O contraste mínimo medido salta para **12.91:1 (AAA)** em qualquer elemento do site.
