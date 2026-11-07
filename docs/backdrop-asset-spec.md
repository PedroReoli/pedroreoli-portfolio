# Backdrop — cadeia de 6 clipes (v3, MediaForge)

Cada clipe é **1 arquivo + 1 receita**. Para refazer um só, rode apenas a entrada
correspondente em `flow/v3/render-all.mjs` (ou `render01.mjs` para o 01) e depois
`flow/v3/validate.mjs` no arquivo. Nada mais é afetado.

## Identidade e cor de óculos (regra do Pedro)

- Rosto = `public/eu-profissional.png`, igual em todos os clipes.
- **Modo estátua** → óculos **AMARELOS** (`#ffc900`), mármore.
- **Modo real** (sem estátua) → óculos **PRETOS**, pele, camiseta preta.

## Referências canônicas

| arquivo | conteúdo | círculo |
|---|---|---|
| `public/media/busto/ref-statue-1920.jpg` | Pedro em mármore, óculos amarelo, frente | 745px |
| `public/media/busto/ref-real-1920.jpg` | Pedro real, óculos preto, mesmo enquadramento | 753px |

Ambas 1920×1080, fundo `#050609`, sujeito alinhado em x 557–1361, topo y 61.
Foram geradas no Gemini a partir do `eu-profissional.png` e validadas.

## Como o enquadramento é travado

Os clipes **não** passam por Veo. Cada quadro é composto por código a partir das
duas referências acima (`flow/v3/chain.mjs`), então o círculo amarelo e o fundo são
literalmente os mesmos pixels em todos os frames. O movimento é um respiro interno
do busto (zoom/offset pequeno aplicados à arte), com a moldura fixa. Por construção,
não existe zoom/pan de enquadramento.

> Histórico: Flow/Veo foi descartado porque o seletor de frames não registrava os
> frames escolhidos e o modelo escorregava o círculo (646→903px) mesmo com prompt
> de câmera fixa.

## Receita por clipe

| # | arquivo | duração | Início | Fim | movimento |
|---|---|---|---|---|---|
| 1 | `01-hero-to-about.mp4` | 6.5s | estátua (amarelo) | real (preto) | dissolve `smoothstep` + respiro 1.2% |
| 2 | `02-about-to-projects.mp4` | 6.5s | real (preto) | estátua (amarelo) | dissolve + respiro 1.0% |
| 3 | `03-projects-to-stack.mp4` | 7.0s | estátua | estátua | aproximação suave 2.2% + drift 10px |
| 4 | `04-stack-to-purpose.mp4` | 7.0s | estátua | estátua | respiro 1.8% + drift vertical 8px |
| 5 | `05-purpose-to-experience.mp4` | 7.0s | estátua | estátua | respiro 1.6% (fase oposta) + drift 8px |
| 6 | `06-experience-loop.mp4` | 7.0s | estátua | real | dissolve + respiro 1.4% |

- 1920×1080, 24fps, H.264, `-g 12 -sc_threshold 0 -movflags +faststart` (GOP curto
  para o scrub não engasgar).
- Poster de cada seção = primeiro frame do próprio clipe.

## Validação obrigatória (antes de instalar)

`flow/v3/validate.mjs` roda em UM arquivo e devolve PASS/FAIL com motivo:

1. círculo amarelo: variação ≤ 6% entre 5 frames (acima = zoom/pan)
2. rosto: diff ≤ 26/255 contra a referência (acima = derivou)
3. modo: mármore ≈ 0.57 de pixels neutros, pele ≈ 0.04; corte em 0.45
4. duração 2.0–8.2s, formato 1920×1080

Estado medido dos 6 clipes instalados:

| clipe | var. círculo | diff rosto | neutro | resultado |
|---|---|---|---|---|
| 01 | 1.1% | 1.5 | 0.58 | PASS |
| 02 | 2.1% | 1.8 | 0.04 | PASS |
| 03 | 2.1% | 1.1 | 0.58 | PASS |
| 04 | 1.7% | 2.1 | 0.58 | PASS |
| 05 | 1.5% | 1.1 | 0.58 | PASS |
| 06 | 1.3% | 1.5 | 0.58 | PASS |

## Regenerar um clipe isolado

```bash
# 1. edite só a entrada do clipe desejado em flow/v3/render-all.mjs
node flow/v3/render-all.mjs          # regera os 6 (ou comente os outros)
node flow/v3/validate.mjs <arquivo>  # confere
node flow/v3/install.mjs             # copia para public/media/backdrop + posters
```

Se um clipe falhar, os outros cinco continuam válidos — basta refazer aquele.

## Descartado

| arquivo | motivo |
|---|---|
| `flow/v3/REJEITADO-rosto-errado-real.jpg` | geração pediu óculos pretos e veio **outra pessoa** (nariz, mandíbula e barba diferentes) |

## Reversibilidade

`_assets-backup-pre-reset/` guarda os assets anteriores à v3 (backdrop + busto).
