# Busto canônico — fonte de verdade da identidade

Decisão do Pedro (2026-11-06): **uma única imagem de busto**, reaproveitada em todas as
seções, e **vídeos sem zoom/pan** (o busto fica sempre no mesmo lugar, no mesmo tamanho).

## Por que isso existe

Os 6 clipes anteriores (01–06) foram feitos em cadeia: cada vídeo partia do frame final do
anterior. Em cada geração o Veo re-interpretava o rosto, então a identidade **derivou** do
Pedro real para um filósofo grego de barba cheia. Além disso o enquadramento mudava a cada
clipe (zoom e pan), e é exatamente isso que faz a coisa parecer "paralaxe" com as seções.

Regra nova: **a identidade e o enquadramento param de mudar.** Todo clipe parte desta imagem
e a câmera não se move.

## Arquivos

| Arquivo | Papel |
|---|---|
| `busto-v1.jpg` | busto canônico — modo estátua (mármore + óculos amarelos + círculo amarelo), 2K |
| `rosto-normal.jpg` | Pedro sem efeito de estátua, mesmo enquadramento/círculo — 2K |
| `03-estatua-para-rosto.mp4` | transição estátua → rosto normal, 1920×1080, 3.71s, 1.27 MB |

### Sobre `03-estatua-para-rosto.mp4`
O Veo entregou oito segundos, mas medindo frame a frame o trecho de **3.2s a 6.6s**
derivava para um homem barbudo e sem camisa (mesmo defeito de antes, agora no meio do
clipe) e voltava ao Pedro só no fim. Foi cortado:

- **0 → 2.6s** — Veo original: o mármore derrete e a pele do Pedro aparece (o rosto nunca muda)
- **2.1 → 2.7s** — crossfade de 0,6s
- **2.6 → 3.71s** — still de `rosto-normal.jpg` (o frame que o Veo pedia como último)

Custo do descarte: ~30% do clipe original. **Regra:** qualquer clipe cujo frame do meio
derive é cortado ou refeito — identidade no meio do movimento vale o mesmo que no começo.

## Como o `busto-v1.jpg` foi gerado

- Modelo: **Nano Banana 2.1** (imagem do Gemini) no Google Flow, 16:9, 1K, download 2K.
- Imagem de referência: `public/eu-profissional.png` (foto real do Pedro).
- Prompt: mármore branco polido, cortado no peito, **preservando fielmente a estrutura facial**
  da referência (nariz, sobrancelhas, cavanhaque curto + bigode, orelhas, topete),
  cabelo esculpido, os mesmos óculos redondos com armação amarela #FFC900,
  sem fone, sem barba longa, fundo preto absoluto, círculo amarelo chapado centralizado,
  enquadramento centrado e simétrico, luz de estúdio suave.

Resultado: é reconhecivelmente o Pedro, com o rosto em frente — não mais um filósofo genérico.

## Regra para os próximos clipes

1. Primeiro frame = **sempre** `busto-v1.jpg` (nunca o frame final do clipe anterior).
2. A ação autorizada é só a do enunciado (`holdAt`, `03`…`06`), **sem zoom, sem pan, sem dolly**.
3. Se um clipe voltar com rosto diferente ou enquadramento deslocado, ele é refeito — não
   entra na cadeia.
4. O clipe final (transição estátua → rosto normal) terá `busto-v1.jpg` como primeiro frame e
   `rosto-normal.jpg` como último.
